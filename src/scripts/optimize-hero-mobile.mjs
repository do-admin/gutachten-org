#!/usr/bin/env node

/**
 * Optimize hero-mobile.webp in public folder
 * This image is displayed at 380x314 but is currently 800x660
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

const imagePath = path.join(
  rootDir,
  "public/images/gutachten-org/home/hero-mobile.webp"
);

if (!fs.existsSync(imagePath)) {
  console.error(`❌ Image not found: ${imagePath}`);
  process.exit(1);
}

try {
  // Get original file stats
  const originalStats = fs.statSync(imagePath);
  const originalSize = originalStats.size;

  // Read and process image
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  console.log(`📸 Processing: hero-mobile.webp`);
  console.log(
    `   Original: ${metadata.width}x${metadata.height} (${(originalSize / 1024).toFixed(1)}KB)`
  );
  console.log(`   Target: 380x314`);

  // Resize image to exact dimensions
  await image
    .resize(380, 314, {
      fit: "contain", // Maintain aspect ratio, fit within dimensions
      background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
    })
    .webp({ quality: 85 })
    .toFile(imagePath + ".tmp");

  // Replace original with optimized version
  fs.renameSync(imagePath + ".tmp", imagePath);

  const newStats = fs.statSync(imagePath);
  const newSize = newStats.size;
  const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
  const savingsKB = ((originalSize - newSize) / 1024).toFixed(1);

  console.log(
    `   ✅ Optimized: 380x314 (${(newSize / 1024).toFixed(1)}KB, saved ${savingsKB}KB / ${savings}%)`
  );
  console.log(`\n✅ Image optimization completed!`);
} catch (error) {
  console.error(`❌ Error optimizing image:`, error.message);
  // Clean up temp file if it exists
  if (fs.existsSync(imagePath + ".tmp")) {
    fs.unlinkSync(imagePath + ".tmp");
  }
  process.exit(1);
}
