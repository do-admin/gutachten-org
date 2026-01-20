#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Automatically generates mobile and desktop optimized versions of images.
 * - Mobile: 800px width (maintains original aspect ratio)
 * - Desktop: 1200px width (maintains original aspect ratio)
 *
 * Images are resized to the target width while preserving their original aspect ratio.
 * Images smaller than the target width are not upscaled.
 *
 * Skips images that already have optimized versions to avoid re-processing.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local", quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

// Check if sharp is available
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (error) {
  console.error(
    "❌ Error: 'sharp' package is required for image optimization."
  );
  console.error("   Please install it with: pnpm add -D sharp");
  process.exit(1);
}

// Image optimization presets
const OPTIMIZATION_PRESETS = {
  mobile: {
    width: 800,
    suffix: "-mobile",
  },
  desktop: {
    width: 1200,
    suffix: "-desktop",
  },
};

/**
 * Get all site directories from data folder
 */
function getSiteDirectories() {
  const dataDir = path.join(rootDir, "src", "data");
  if (!fs.existsSync(dataDir)) {
    return [];
  }

  return fs
    .readdirSync(dataDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/**
 * Find all images in a directory recursively
 */
function findImages(dir, extensions = [".webp", ".jpg", ".jpeg", ".png"]) {
  const images = [];
  if (!fs.existsSync(dir)) {
    return images;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and other common directories
      if (
        !entry.name.startsWith(".") &&
        entry.name !== "node_modules" &&
        entry.name !== ".next"
      ) {
        images.push(...findImages(fullPath, extensions));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        // Skip already optimized images
        if (
          !entry.name.includes("-mobile") &&
          !entry.name.includes("-desktop")
        ) {
          images.push(fullPath);
        }
      }
    }
  }

  return images;
}

/**
 * Process images for a single site
 */
async function processSiteImages(siteId) {
  const dataImagesDir = path.join(rootDir, "src", "data", siteId, "images");
  const publicImagesDir = path.join(rootDir, "public", "images", siteId);

  if (!fs.existsSync(dataImagesDir)) {
    return { processed: 0, skipped: 0, errors: 0 };
  }

  console.log(`\n   📸 Processing images for ${siteId}...`);

  // Find all source images in data directory (excluding already optimized ones)
  const dataImages = findImages(dataImagesDir);
  console.log(
    `   📁 Found ${dataImages.length} source images in data directory`
  );

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  // Process each source image from the data directory
  for (const dataImagePath of dataImages) {
    // Calculate the relative path and corresponding public paths
    const relativePath = path.relative(dataImagesDir, dataImagePath);
    const publicImagePath = path.join(publicImagesDir, relativePath);
    const publicDir = path.dirname(publicImagePath);

    // Ensure public directory exists for optimized versions
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Determine the source image to use (prefer public if synced, fallback to data)
    const sourceImagePath = fs.existsSync(publicImagePath)
      ? publicImagePath
      : dataImagePath;

    // Process mobile and desktop versions
    for (const [presetName, preset] of Object.entries(OPTIMIZATION_PRESETS)) {
      // Calculate optimized path - always in the public directory
      const ext = path.extname(relativePath);
      const baseName = path.basename(relativePath, ext);
      const relativeDir = path.dirname(relativePath);
      const optimizedFileName = `${baseName}${preset.suffix}${ext}`;
      const optimizedPath = path.join(
        publicImagesDir,
        relativeDir,
        optimizedFileName
      );

      // Check if optimized version already exists in public directory
      if (fs.existsSync(optimizedPath)) {
        skipped++;
        continue;
      }

      // Check if source exists
      if (!fs.existsSync(sourceImagePath)) {
        console.warn(`   ⚠️  Source image not found: ${sourceImagePath}`);
        continue;
      }

      // Optimize image - use sourceImagePath but output to optimizedPath
      try {
        const image = sharp(sourceImagePath);
        const metadata = await image.metadata();

        // Determine target width (don't upscale if image is smaller)
        const targetWidth = Math.min(metadata.width, preset.width);

        // Ensure output directory exists
        const optimizedDir = path.dirname(optimizedPath);
        if (!fs.existsSync(optimizedDir)) {
          fs.mkdirSync(optimizedDir, { recursive: true });
        }

        // Resize maintaining aspect ratio
        await image
          .resize(targetWidth, null, {
            withoutEnlargement: true,
          })
          .webp()
          .toFile(optimizedPath);

        const stats = fs.statSync(optimizedPath);
        const originalStats = fs.statSync(sourceImagePath);
        const savings =
          stats.size < originalStats.size
            ? ((1 - stats.size / originalStats.size) * 100).toFixed(1)
            : null;

        processed++;
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(
          `   ✅ Created ${presetName}: ${optimizedFileName} (${sizeKB}KB${savings ? `, ${savings}% smaller` : ""})`
        );
      } catch (error) {
        console.error(
          `   ❌ Error optimizing ${sourceImagePath}:`,
          error.message
        );
        errors++;
      }
    }
  }

  return { processed, skipped, errors };
}

/**
 * Main function
 */
async function main() {
  console.log("🖼️  Starting image optimization...\n");

  const sites = getSiteDirectories();
  if (sites.length === 0) {
    console.log("   ⚠️  No site directories found in src/data/");
    return;
  }

  console.log(`   📦 Found ${sites.length} site(s) to process`);

  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const siteId of sites) {
    const result = await processSiteImages(siteId);
    totalProcessed += result.processed;
    totalSkipped += result.skipped;
    totalErrors += result.errors;
  }

  console.log("\n✅ Image optimization completed!");
  console.log(`   📊 Processed: ${totalProcessed} images`);
  console.log(`   ⏭️  Skipped: ${totalSkipped} (already exist)`);
  if (totalErrors > 0) {
    console.log(`   ❌ Errors: ${totalErrors}`);
  }
}

// Run the script
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
