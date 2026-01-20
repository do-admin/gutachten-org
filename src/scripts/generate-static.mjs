#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug logging
console.log("Script started");
console.log("Command line arguments:", process.argv);

import domains from "./config.mjs";

const siteDomains = domains;

// Function to execute shell commands
const exec = (command, { silent = false, env } = {}) => {
  try {
    execSync(command, {
      stdio: silent ? "pipe" : "inherit",
      encoding: "utf8",
      env: env || { ...process.env }, // Use provided env or fall back to process.env
    });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
};

// Create output directory for all sites
const STATIC_ROOT = path.join(__dirname, "..", "..", "static-builds");
if (!fs.existsSync(STATIC_ROOT)) {
  fs.mkdirSync(STATIC_ROOT);
}

// Function to generate static build for a single site
const generateSiteIdBuild = async (siteId) => {
  console.log(`\nGenerating static build for ${siteId}...`);

  try {
    // Set environment variables for static export
    // Use existing ENABLE_TEXT_EDITOR if set (from build-and-deploy.mjs), otherwise default to "false"
    const enableTextEditor = process.env.ENABLE_TEXT_EDITOR || "false";
    const externalApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const externalApiToken = process.env.NEXT_PUBLIC_API_TOKEN;

    process.env.SITE_ID = siteId;
    process.env.NODE_ENV = "production";
    process.env.ENABLE_TEXT_EDITOR = enableTextEditor;

    // Explicitly pass environment variables to the build command
    const buildEnv = {
      ...process.env,
      SITE_ID: siteId,
      NODE_ENV: "production",
      ENABLE_TEXT_EDITOR: enableTextEditor,
    };

    // Include external API URL and token if set (for Cloudflare static deployments)
    if (externalApiUrl) {
      buildEnv.NEXT_PUBLIC_API_URL = externalApiUrl;
    }
    if (externalApiToken) {
      buildEnv.NEXT_PUBLIC_API_TOKEN = externalApiToken;
    }

    console.log(`\n🔧 Build environment variables:`);
    console.log(`   NODE_ENV: ${buildEnv.NODE_ENV}`);
    console.log(`   ENABLE_TEXT_EDITOR: ${buildEnv.ENABLE_TEXT_EDITOR}`);
    console.log(`   SITE_ID: ${buildEnv.SITE_ID}`);
    if (externalApiUrl) {
      console.log(`   NEXT_PUBLIC_API_URL: ${externalApiUrl}`);
    }
    if (externalApiToken) {
      console.log(`   NEXT_PUBLIC_API_TOKEN: ${externalApiToken ? "***" : "not set"}`);
    }

    if (enableTextEditor === "true") {
      console.log(
        `   ⚠️  Text editor enabled - static export will be DISABLED\n`
      );
    } else {
      console.log(`   ✅ Static export will be ENABLED (output: "export")\n`);
    }

    // Set environment variables in the command itself to ensure they're available
    // when Next.js reads next.config.ts
    let buildCommand = `NODE_ENV=production ENABLE_TEXT_EDITOR=${enableTextEditor} SITE_ID=${siteId}`;
    if (externalApiUrl) {
      // Escape the URL for shell command
      const escapedUrl = externalApiUrl.replace(/'/g, "'\\''");
      buildCommand += ` NEXT_PUBLIC_API_URL='${escapedUrl}'`;
    }
    if (externalApiToken) {
      // Escape the token for shell command
      const escapedToken = externalApiToken.replace(/'/g, "'\\''");
      buildCommand += ` NEXT_PUBLIC_API_TOKEN='${escapedToken}'`;
    }
    buildCommand += ` pnpm build`;

    exec(buildCommand, {
      silent: false,
      env: buildEnv,
    });

    try {
      // Move the output to a site-specific directory
      const siteDir = path.join(STATIC_ROOT, siteId);
      if (fs.existsSync(siteDir)) {
        fs.rmSync(siteDir, { recursive: true });
      }

      // Move the out directory to the site-specific directory
      const outDir = path.resolve(__dirname, "..", "..", "out");
      console.log(`Looking for build output in: ${outDir}`);
      console.log(`Resolved out directory path: ${outDir}`);
      console.log(`Out directory exists: ${fs.existsSync(outDir)}`);

      // List what's in the parent directory to debug
      const parentDir = path.resolve(__dirname, "..", "..");
      console.log(`Parent directory: ${parentDir}`);
      if (fs.existsSync(parentDir)) {
        const parentContents = fs.readdirSync(parentDir);
        console.log(
          `Contents of parent directory: ${parentContents.slice(0, 10).join(", ")}...`
        );
      }

      if (fs.existsSync(outDir)) {
        console.log(`Moving build output from ${outDir} to ${siteDir}`);
        fs.renameSync(outDir, siteDir);
        console.log(`Successfully moved build output`);
      } else {
        console.log(`❌ Build output directory not found at ${outDir}`);
        console.log(`Creating empty directory structure for ${siteId}`);
      }

      // Ensure the siteDir exists before writing vercel.json
      if (!fs.existsSync(siteDir)) {
        fs.mkdirSync(siteDir, { recursive: true });
      }

      // Add CSS preload links to optimize critical path latency
      if (fs.existsSync(siteDir)) {
        try {
          const { addCssPreloads } = await import("./add-css-preload.mjs");
          addCssPreloads(`static-builds/${siteId}`);
        } catch (error) {
          console.warn(`⚠️  Could not add CSS preloads: ${error.message}`);
        }
      }

      // Note: With trailingSlash: true in next.config.ts, Next.js automatically generates
      // directories with index.html files, so no post-build fix is needed for S3/R2 compatibility
    } catch (error) {
      console.error(`Error renaming output directory: ${error}`);
    }

    console.log(`✅ Successfully generated static build for ${siteId}`);
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to generate static build for site-${siteId}:`,
      error
    );
    return false;
  } finally {
  }
};

// Generate static builds for all sites
const generateAllSites = async () => {
  console.log("Starting static build generation for all sites...\n");

  const results = [];

  // Generate each site in sequence
  for (const siteId of Object.keys(siteDomains))
    results.push({
      siteId,
      success: await generateSiteIdBuild(siteId),
    });

  // Print summary
  console.log("\nBuild Generation Summary:");
  console.log("------------------------");
  for (const result of results) {
    const status = result.success ? "✅ Success" : "❌ Failed";
    console.log(`${result.siteId}: ${status}`);
  }

  // Check if any generations failed
  const anyFailed = results.some((result) => !result.success);
  if (anyFailed) {
    console.error(
      "\nSome static builds failed. Please check the logs above for details."
    );
    process.exit(1);
  } else {
    console.log("\nAll static builds completed successfully! 🎉");
    console.log(`\nStatic files are available in: ${STATIC_ROOT}`);
  }
};

// Function to generate Vercel configuration
const generateVercelJsonFile = async () => {
  console.log("\n⚙️  Generating Vercel configuration...\n");

  try {
    // Generate the Vercel configuration
    // Note: trailingSlash matches next.config.ts for consistency
    const vercelConfig = {
      cleanUrls: true,
      trailingSlash: true, // Matches next.config.ts for S3/R2 compatibility
    };

    // Write the vercel.json file
    const vercelConfigPath = path.join(__dirname, "../vercel.json");
    fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));

    console.log("✅ Generated vercel.json with clean URLs enabled");

    return true;
  } catch (error) {
    console.error("❌ Failed to generate Vercel configuration:", error.message);
    return false;
  }
};

// Run the static generation based on input
const main = async () => {
  try {
    // Parse command line arguments in the correct order
    const args = process.argv.slice(2);
    const siteId = args[0];

    // Validate siteId if provided
    if (siteId && !siteDomains[siteId]) {
      console.error("\n❌ Error: Invalid site ID");
      console.error(`🚫 "${siteId}" is not a valid site identifier`);
      console.error("\n📋 Available sites:");
      Object.keys(siteDomains).forEach((id) => console.error(`  • ${id}`));
      console.error("\n💡 Usage: node generate-static.mjs [site-id]");
      process.exit(1);
    }

    if (siteId) {
      // Generate for specific site
      console.log(`\n🚀 Building static site for ${siteId}...\n`);

      generateVercelJsonFile();

      const success = await generateSiteIdBuild(siteId);
      if (!success) {
        process.exit(1);
      }

      console.log(
        `\nStatic files are available in: ${path.join(STATIC_ROOT, siteId)}`
      );
    } else {
      // Generate all sites
      console.log("\n🚀 Building static sites for all sites...\n");
      await generateAllSites();
    }
  } catch (error) {
    console.error("\n❌ Static generation failed:", error.message);
    process.exit(1);
  }
};

// Only run if validation passed
try {
  main().catch((error) => {
    console.error("\n❌ Static generation failed:", error.message);
    process.exit(1);
  });
} catch (error) {
  console.error("\n❌ Unexpected error:", error.message);
  process.exit(1);
}
