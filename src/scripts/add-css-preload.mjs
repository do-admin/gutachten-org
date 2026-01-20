#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from "fs";
import { glob } from "glob";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Post-build script to add CSS preload links to HTML files
 * This reduces critical path latency by preloading CSS before it's discovered
 *
 * Usage: node src/scripts/add-css-preload.mjs [buildDir]
 *
 * @param {string} buildDir - Directory containing built HTML files (default: 'static-builds')
 */
function addCssPreloads(buildDir = "static-builds") {
  const rootPath = join(__dirname, "..", "..");
  const fullBuildPath = join(rootPath, buildDir);

  if (!existsSync(fullBuildPath)) {
    console.log(`⚠️  Build directory not found: ${fullBuildPath}`);
    console.log(`   Skipping CSS preload optimization.`);
    return;
  }

  console.log(`\n🔍 Searching for HTML files in: ${fullBuildPath}`);

  const htmlFiles = glob.sync(`${buildDir}/**/*.html`, {
    cwd: rootPath,
    absolute: false,
  });

  if (htmlFiles.length === 0) {
    console.log(`⚠️  No HTML files found in ${buildDir}`);
    return;
  }

  console.log(`📄 Found ${htmlFiles.length} HTML file(s) to process\n`);

  let processedCount = 0;
  let skippedCount = 0;

  htmlFiles.forEach((filePath) => {
    const fullPath = join(rootPath, filePath);

    try {
      let html = readFileSync(fullPath, "utf-8");

      // Find all CSS stylesheet links
      // Match: <link rel="stylesheet" href="..." ... />
      const cssLinkRegex =
        /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css[^"']*)["'][^>]*>/g;
      const cssLinks = [];
      let match;

      while ((match = cssLinkRegex.exec(html)) !== null) {
        cssLinks.push({
          fullMatch: match[0],
          cssPath: match[1],
          index: match.index,
        });
      }

      if (cssLinks.length === 0) {
        skippedCount++;
        return;
      }

      // Check if preload already exists for any CSS file
      const hasPreload = cssLinks.some((link) => {
        const preloadPattern = new RegExp(
          `rel=["']preload["'][^>]*href=["']${link.cssPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
          "i"
        );
        return html.match(preloadPattern);
      });

      if (hasPreload) {
        skippedCount++;
        return;
      }

      // Add preload links before each stylesheet link
      // Process in reverse order to maintain correct indices (inserting from end to start)
      let modifiedHtml = html;

      for (let i = cssLinks.length - 1; i >= 0; i--) {
        const link = cssLinks[i];

        // Check if the stylesheet link has crossorigin attribute
        // Match the crossorigin value from the stylesheet link, or omit it for same-origin resources
        const crossoriginMatch = link.fullMatch.match(
          /crossorigin=["']([^"']+)["']/i
        );
        const crossoriginValue = crossoriginMatch ? crossoriginMatch[1] : null;

        // Build preload link with matching crossorigin attribute
        const preloadLink = crossoriginValue
          ? `<link rel="preload" href="${link.cssPath}" as="style" crossorigin="${crossoriginValue}"/>`
          : `<link rel="preload" href="${link.cssPath}" as="style"/>`;

        const insertion = preloadLink + "\n";
        modifiedHtml =
          modifiedHtml.slice(0, link.index) +
          insertion +
          modifiedHtml.slice(link.index);
      }

      writeFileSync(fullPath, modifiedHtml, "utf-8");
      processedCount++;

      // Log which CSS files were preloaded
      const cssFiles = cssLinks.map((l) => l.cssPath).join(", ");
      console.log(`✓ ${filePath}`);
      console.log(`  → Preloaded: ${cssFiles}`);
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });

  console.log(`\n✅ CSS preload optimization complete!`);
  console.log(`   Processed: ${processedCount} file(s)`);
  if (skippedCount > 0) {
    console.log(
      `   Skipped: ${skippedCount} file(s) (no CSS links or already preloaded)`
    );
  }
}

// Run if called directly
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("add-css-preload.mjs")
) {
  const buildDir = process.argv[2] || "static-builds";
  addCssPreloads(buildDir);
}

export { addCssPreloads };
