#!/usr/bin/env node

/**
 * Optimize specific images identified by Lighthouse Performance audit
 * Resizes images to match their actual display dimensions
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

// Image optimization configs based on Lighthouse report
// Format: { filename, width, height, quality, description }
const IMAGE_CONFIGS = [
  {
    filename: "hero-mobile.webp",
    width: 380,
    height: 314,
    quality: 85,
    description: "Hero mobile image - displayed at 380x314",
  },
  {
    filename: "hero-logo-din-17024.webp",
    width: 72,
    height: 72,
    quality: 85,
    description: "DIN 17024 logo - displayed at 72x72",
  },
  {
    filename: "hero-logo-bdsf.webp",
    width: 77,
    height: 72,
    quality: 85,
    description: "BDSF logo - displayed at 77x72",
  },
  {
    filename: "hero-logo-rev.webp",
    width: 71,
    height: 72,
    quality: 85,
    description: "REV logo - displayed at 71x72",
  },
  {
    filename: "hero-logo-dia-zert.webp",
    width: 55,
    height: 72,
    quality: 85,
    description: "DIA Zert logo - displayed at 55x72",
  },
  {
    filename: "restnutzungsdauer.webp",
    width: 36,
    height: 36,
    quality: 85,
    description: "Restnutzungsdauer icon - displayed at 36x36",
  },
];

/**
 * Find all instances of images matching the configs
 */
function findImageInstances() {
  const imagesDir = path.join(
    rootDir,
    "src",
    "data",
    "gutachten-org",
    "images"
  );
  const instances = [];

  function searchDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        searchDirectory(fullPath);
      } else if (entry.isFile()) {
        const config = IMAGE_CONFIGS.find((c) => c.filename === entry.name);
        if (config) {
          instances.push({
            path: fullPath,
            config,
          });
        }
      }
    }
  }

  searchDirectory(imagesDir);
  return instances;
}

/**
 * Optimize a single image
 */
async function optimizeImage(instance) {
  const imagePath = instance.path;
  const config = instance.config;
  const relativePath = path.relative(rootDir, imagePath);

  if (!fs.existsSync(imagePath)) {
    console.error(`   ❌ Image not found: ${relativePath}`);
    return { error: "File not found" };
  }

  try {
    // Get original file stats
    const originalStats = fs.statSync(imagePath);
    const originalSize = originalStats.size;

    // Read and process image
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Skip if already at target size (within 5px tolerance)
    if (
      Math.abs(metadata.width - config.width) <= 5 &&
      Math.abs(metadata.height - config.height) <= 5
    ) {
      console.log(
        `   ⏭️  Skipping ${relativePath} (already optimized: ${metadata.width}x${metadata.height})`
      );
      return { skipped: true };
    }

    console.log(`\n   📸 Processing: ${relativePath}`);
    console.log(
      `      Original: ${metadata.width}x${metadata.height} (${(originalSize / 1024).toFixed(1)}KB)`
    );
    console.log(`      Target: ${config.width}x${config.height}`);

    // Resize image to exact dimensions
    await image
      .resize(config.width, config.height, {
        fit: "contain", // Maintain aspect ratio, fit within dimensions
        background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
      })
      .webp({ quality: config.quality })
      .toFile(imagePath + ".tmp");

    // Replace original with optimized version
    fs.renameSync(imagePath + ".tmp", imagePath);

    const newStats = fs.statSync(imagePath);
    const newSize = newStats.size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    const savingsKB = ((originalSize - newSize) / 1024).toFixed(1);

    console.log(
      `      ✅ Optimized: ${config.width}x${config.height} (${(newSize / 1024).toFixed(1)}KB, saved ${savingsKB}KB / ${savings}%)`
    );

    return {
      success: true,
      originalSize,
      newSize,
      savings: parseFloat(savings),
      savingsKB: parseFloat(savingsKB),
    };
  } catch (error) {
    console.error(`   ❌ Error optimizing ${relativePath}:`, error.message);
    // Clean up temp file if it exists
    if (fs.existsSync(imagePath + ".tmp")) {
      fs.unlinkSync(imagePath + ".tmp");
    }
    return { error: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🖼️  Optimizing Lighthouse-identified images...\n");

  // Find all instances of images to optimize
  const instances = findImageInstances();
  console.log(`   📁 Found ${instances.length} image(s) to process\n`);

  let totalSavings = 0;
  let totalSavingsKB = 0;
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const instance of instances) {
    const result = await optimizeImage(instance);

    if (result.error) {
      errorCount++;
    } else if (result.skipped) {
      skippedCount++;
    } else if (result.success) {
      successCount++;
      totalSavingsKB += result.savingsKB;
      totalSavings += result.savings;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ Image optimization completed!");
  console.log(`   📊 Successfully optimized: ${successCount} images`);
  if (skippedCount > 0) {
    console.log(`   ⏭️  Skipped: ${skippedCount} (already optimized)`);
  }
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }
  if (successCount > 0) {
    console.log(`   💾 Total savings: ${totalSavingsKB.toFixed(1)}KB`);
    console.log(
      `   📉 Average reduction: ${(totalSavings / successCount).toFixed(1)}%`
    );
  }
  console.log("=".repeat(60));
}

// Run the script
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
