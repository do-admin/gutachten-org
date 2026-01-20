#!/usr/bin/env node

/**
 * Generate vercel.json configuration file for programmatic instances
 *
 * This script reads the multi-page-config.json and generates a vercel.json
 * file for a specific site in its static-builds folder.
 *
 * Usage:
 *   node generate-vercel-config.mjs [site-id]
 *
 * If no site-id is provided, generates for all sites with programmatic instances.
 *
 * Note: For pure static hosting, do NOT use the deprecated `builds` array.
 * Without `builds`, Vercel serves files as static content without triggering
 * a build process. This avoids body size limits and build warnings.
 * Vercel supports rewrites for static sites, but headers and redirects
 * are not supported with static exports.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to multi-page-config.json
const configPath = path.join(__dirname, "../data/multi-page-config.json");

// Static builds root directory
const STATIC_BUILDS_ROOT = path.join(__dirname, "../../static-builds");

/**
 * Convert instance name to slug (simple version, matches getInstanceSlug logic)
 * This should match the logic in src/lib/slug-utils.ts
 */
function getInstanceSlug(instanceName) {
  // Simple slug generation - matches the basic logic
  // For exact matching, we'd need to import the actual slug-utils, but
  // for vercel.json generation, this approximation is sufficient
  return instanceName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generate vercel.json configuration for a specific site
 */
function generateVercelConfigForSite(site) {
  if (!site.programmatic || !site.programmatic.programmaticInstances) {
    console.log(
      `   ⚠️  Site ${site.id} has no programmatic instances, skipping`
    );
    return false;
  }

  const instances = site.programmatic.programmaticInstances;
  const slugStructure =
    site.programmatic.slugStructure || "{programmaticInstanceName}";

  console.log(
    `\n🔧 Processing site: ${site.id} (${instances.length} instances)`
  );

  // IMPORTANT: Do NOT use the deprecated `builds` array!
  // The `builds` key triggers Vercel's build pipeline, which we don't want for static files.
  // Without `builds`, Vercel automatically serves files as pure static content.
  const vercelConfig = {
    version: 2,
    // Explicitly disable framework detection and build process for pure static hosting
    framework: null,
    buildCommand: "",
    outputDirectory: ".",
    // Enable clean URLs for static exports (removes .html extension)
    cleanUrls: true,
    trailingSlash: true, // S3/R2 compatible: matches next.config.ts
    // Rewrites for programmatic instances
    // For static exports, only rewrites are supported (not redirects or headers)
    rewrites: [],
  };

  // Get available pages for this site
  const subpagesPath = path.join(__dirname, `../data/${site.id}/subpages`);

  let pageKeys = ["home"]; // Home is always available
  if (fs.existsSync(subpagesPath)) {
    const subpageFiles = fs.readdirSync(subpagesPath);
    // Get page keys from filenames (excluding programmatic folder and .ts extension)
    const additionalPages = subpageFiles
      .filter((file) => {
        return (
          file.endsWith(".ts") &&
          !file.startsWith("_") &&
          file !== "home.ts" &&
          !file.includes("programmatic")
        );
      })
      .map((file) => file.replace(".ts", ""));
    pageKeys = [...pageKeys, ...additionalPages];
  }

  console.log(`   - Found ${pageKeys.length} pages: ${pageKeys.join(", ")}`);

  // Use wildcard patterns instead of generating one rewrite per instance
  // This is much more efficient for large numbers of programmatic instances

  // Rewrite pattern for home pages: /:instance -> /:instance.html
  // Matches any single-segment path (e.g., /hamburg, /berlin) and rewrites to .html
  vercelConfig.rewrites.push({
    source: "/:instance",
    destination: "/:instance.html",
  });

  // Rewrite pattern for other pages: /:pageKey/:instance -> /:pageKey/:instance.html
  // Matches any two-segment path (e.g., /about/hamburg, /contact/berlin) and rewrites to .html
  // Note: This will match all pageKey/instance combinations, including programmatic ones
  vercelConfig.rewrites.push({
    source: "/:pageKey/:instance",
    destination: "/:pageKey/:instance.html",
  });

  // Write vercel.json to the site's static-builds folder
  const siteBuildDir = path.join(STATIC_BUILDS_ROOT, site.id);

  // Check if the directory exists and has content (not just vercel.json)
  if (!fs.existsSync(siteBuildDir)) {
    console.log(`   ⚠️  Build directory doesn't exist yet: ${siteBuildDir}`);
    console.log(`   ❌ ERROR: Static build output was not found!`);
    console.log(
      `   💡 The build may have failed or the output wasn't moved correctly.`
    );
    console.log(`   📁 Creating directory for vercel.json only...`);
    fs.mkdirSync(siteBuildDir, { recursive: true });
  } else {
    // Check if directory only contains vercel.json (empty build)
    const dirContents = fs.readdirSync(siteBuildDir);
    const hasContent = dirContents.some(
      (item) => item !== "vercel.json" && !item.startsWith(".")
    );
    if (!hasContent) {
      console.log(
        `   ⚠️  WARNING: Build directory exists but appears to be empty (only vercel.json found)`
      );
      console.log(
        `   💡 This suggests the build output wasn't moved correctly.`
      );
    }
  }

  const outputPath = path.join(siteBuildDir, "vercel.json");

  console.log(`\n📝 Writing vercel.json to ${outputPath}...`);
  fs.writeFileSync(
    outputPath,
    JSON.stringify(vercelConfig, null, 2) + "\n",
    "utf8"
  );

  console.log(`✅ vercel.json generated for ${site.id}!`);
  console.log(`   - Location: ${path.resolve(outputPath)}`);
  console.log(`   - Total rewrites: ${vercelConfig.rewrites.length}`);
  console.log(
    `   - Rewrites map routes to static HTML files (e.g., /hamburg -> /hamburg.html)\n`
  );

  return true;
}

/**
 * Generate vercel.json configuration for all sites or a specific site
 */
function generateVercelConfig() {
  console.log("📋 Reading multi-page-config.json...");

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  // Get site ID from command line arguments
  const siteId = process.argv[2];

  let sitesToProcess = [];
  if (siteId) {
    // Process specific site
    const site = config.sites.find((s) => s.id === siteId);
    if (!site) {
      console.error(`❌ Site with id "${siteId}" not found`);
      console.error(
        `Available sites: ${config.sites.map((s) => s.id).join(", ")}`
      );
      process.exit(1);
    }
    sitesToProcess = [site];
  } else {
    // Process all sites with programmatic instances
    sitesToProcess = config.sites.filter(
      (site) => site.programmatic && site.programmatic.programmaticInstances
    );
  }

  if (sitesToProcess.length === 0) {
    console.log("⚠️  No sites with programmatic instances found");
    return true;
  }

  console.log(
    `\n🎯 Generating vercel.json for ${sitesToProcess.length} site(s)...\n`
  );

  let successCount = 0;
  sitesToProcess.forEach((site) => {
    if (generateVercelConfigForSite(site)) {
      successCount++;
    }
  });

  console.log(
    `\n✅ Successfully generated vercel.json for ${successCount}/${sitesToProcess.length} site(s)`
  );
  console.log(`   - Note: Only rewrites are supported for static exports\n`);

  return successCount === sitesToProcess.length;
}

// Run the generator
try {
  generateVercelConfig();
} catch (error) {
  console.error("\n❌ Error generating vercel.json:", error.message);
  process.exit(1);
}
