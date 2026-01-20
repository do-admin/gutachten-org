#!/usr/bin/env node

// This script synchronizes the data and images folder for all sites. It performs the following:
// 1. Parses multi-page-config.json and subpages directory to extract image paths
// 2. Copies referenced images to public/images/{siteId}/
// 3. Copies additional image directories (articles, ratgeber, blog, etc.) that aren't in config
// 4. Copies favicon files to both public/ and src/app/ directories
// 5. Cleans up images from other sites
// This script synchronizes the data and images folder for all sites. It performs the following:
// 1. Parses multi-page-config.json and subpages directory to extract image paths
// 2. Copies referenced images to public/images/{siteId}/
// 3. Copies additional image directories (articles, ratgeber, blog, etc.) that aren't in config
// 4. Copies favicon files to both public/ and src/app/ directories
// 5. Cleans up images from other sites
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import { slugifyFilename } from "../lib/slug-utils.mjs";

// Load environment variables from .env file
dotenv.config({ path: ".env.local", quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Centralized template variable definitions (inline to avoid import issues in.mjs)
const TEMPLATE_VARIABLES = [
  {
    key: "siteId",
    description: "The id of the site from multi-page-config.json",
    extractor: (config) => config.id,
    fallback: "service-1",
  },
  {
    key: "siteName",
    description: "The name of the site from multi-page-config.json",
    extractor: (config) => config.name,
    fallback: "Our Service",
  },
  {
    key: "siteDescription",
    description: "The description of the site",
    extractor: (config) => config.description,
    fallback: "Professional service solutions",
  },
  {
    key: "contactEmail",
    description: "Contact email address",
    extractor: (config) => config.contact?.email,
    fallback: "contact@example.com",
  },
  {
    key: "contactPhone",
    description: "Contact phone number",
    extractor: (config) => config.contact?.phone,
    fallback: "+49 123 456 789",
  },
  {
    key: "domain",
    description: "Site domain",
    extractor: (config) => config.domain,
    fallback: "example.com",
  },
  {
    key: "address.street",
    description: "Street address",
    extractor: (config) => config.contact?.address?.street,
    fallback: "Service Street 123",
  },
  {
    key: "address.city",
    description: "City",
    extractor: (config) => config.contact?.address?.city,
    fallback: "Berlin",
  },
  {
    key: "address.postalCode",
    description: "Postal code",
    extractor: (config) => config.contact?.address?.postalCode,
    fallback: "10115",
  },
  {
    key: "address.country",
    description: "Country",
    extractor: (config) => config.contact?.address?.country,
    fallback: "Germany",
  },
  {
    key: "social.facebook",
    description: "Facebook URL",
    extractor: (config) => config.social?.facebook,
    fallback: undefined,
  },
  {
    key: "social.twitter",
    description: "Twitter URL",
    extractor: (config) => config.social?.twitter,
    fallback: undefined,
  },
  {
    key: "social.instagram",
    description: "Instagram URL",
    extractor: (config) => config.social?.instagram,
    fallback: undefined,
  },
  {
    key: "social.linkedin",
    description: "LinkedIn URL",
    extractor: (config) => config.social?.linkedin,
    fallback: undefined,
  },
];

// Template processor functions using centralized definitions
function createTemplateContext(siteConfig) {
  const context = {};

  // Process each template variable definition
  for (const variable of TEMPLATE_VARIABLES) {
    const value = variable.extractor(siteConfig);
    setNestedValue(
      context,
      variable.key,
      value !== undefined ? value : variable.fallback
    );
  }

  // Add any additional properties from the site config
  Object.assign(context, siteConfig);

  return context;
}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

function processTemplate(template, context) {
  if (typeof template !== "string") {
    return template;
  }

  return template.replace(/\{([^}]+)\}/g, (match, variablePath) => {
    const value = getNestedValue(context, variablePath.trim());
    return value !== undefined ? String(value) : match;
  });
}

function processTemplateObject(obj, context) {
  if (typeof obj === "string") {
    return processTemplate(obj, context);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processTemplateObject(item, context));
  }

  if (obj && typeof obj === "object") {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      processed[key] = processTemplateObject(value, context);
    }
    return processed;
  }

  return obj;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// Get site ID from environment
const siteId = process.env.SITE_ID || "immobilien-hannover";
const dataDir = path.join(__dirname, "../data");
const publicDir = path.join(__dirname, "../../public");
const siteDir = path.join(dataDir, siteId);

console.log(`🖼️  Syncing images and assets for site: ${siteId}`);
console.log(`   📂 Source: ${siteDir}`);
console.log(`   📂 Destination: ${publicDir}`);

// Function to extract image paths from JSON content
function extractImagePaths(obj, paths = []) {
  if (typeof obj === "string") {
    // Check for various image path patterns
    if (
      obj.startsWith("/images/") ||
      obj.startsWith("/favicon") ||
      obj.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i) ||
      obj.includes("/images/") ||
      obj.includes("favicon")
    ) {
      paths.push(obj);
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const value of Object.values(obj)) {
      extractImagePaths(value, paths);
    }
  }
  return paths;
}

// Function to copy entire directories (like articles, ratgeber, etc.)
function copyEntireDirectory(sourceDir, destDir) {
  const copiedFiles = [];

  if (!fs.existsSync(sourceDir)) {
    return copiedFiles;
  }

  // Create destination directory
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Read all files and subdirectories
  const items = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const item of items) {
    // Skip .DS_Store and other hidden/system files
    if (item.name.startsWith(".")) {
      continue;
    }

    const sourcePath = path.join(sourceDir, item.name);

    if (item.isDirectory()) {
      // Recursively copy subdirectories (keep directory names as-is)
      const destPath = path.join(destDir, item.name);
      const subCopied = copyEntireDirectory(sourcePath, destPath);
      copiedFiles.push(...subCopied);
    } else if (item.isFile()) {
      // Slugify filename to ASCII-only for URL safety
      const slugifiedName = slugifyFilename(item.name);
      const destPath = path.join(destDir, slugifiedName);

      // Copy file with slugified name
      fs.copyFileSync(sourcePath, destPath);
      copiedFiles.push(destPath);

      // Log if filename was changed
      if (item.name !== slugifiedName) {
        // console.log(
        //   `   ✅ Renamed: ${item.name} → ${slugifiedName}`
        // );
      }

      // console.log(
      //   `   ✅ Copied: ${path.relative(siteDir, sourcePath)} → ${path.relative(publicDir, destPath)}`
      // );
    }
  }

  return copiedFiles;
}

// Function to copy favicon files to both public and app directories
function copyFaviconFiles() {
  const copiedFiles = [];
  const appDir = path.join(__dirname, "../app");
  const faviconSources = [
    path.join(siteDir, "images", "favicon"),
    path.join(siteDir, "images", "logo"),
    path.join(siteDir, "images"),
  ];

  // Common favicon file names
  const faviconFiles = ["favicon.ico", "favicon.png", "favicon.svg"];

  for (const faviconFile of faviconFiles) {
    let sourcePath = null;

    // Try to find the favicon in various source directories
    for (const sourceDir of faviconSources) {
      const testPath = path.join(sourceDir, faviconFile);
      if (fs.existsSync(testPath)) {
        sourcePath = testPath;
        break;
      }
    }

    if (sourcePath) {
      // Copy to public root
      const publicDest = path.join(publicDir, faviconFile);
      fs.copyFileSync(sourcePath, publicDest);
      copiedFiles.push(publicDest);
      console.log(
        `   ✅ Copied favicon: ${path.relative(siteDir, sourcePath)} → ${path.relative(publicDir, publicDest)}`
      );

      // Copy to app directory
      const appDest = path.join(appDir, faviconFile);
      fs.copyFileSync(sourcePath, appDest);
      copiedFiles.push(appDest);
      console.log(
        `   ✅ Copied favicon: ${path.relative(siteDir, sourcePath)} → src/app/${faviconFile}`
      );
    }
  }

  return copiedFiles;
}

// Function to clean a directory but preserve optimized images (-mobile, -desktop)
function cleanDirectoryPreservingOptimized(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively clean subdirectories
      cleanDirectoryPreservingOptimized(fullPath);
      // Remove empty directories
      try {
        const remaining = fs.readdirSync(fullPath);
        if (remaining.length === 0) {
          fs.rmdirSync(fullPath);
        }
      } catch (error) {
        // Directory might have content, ignore
      }
    } else if (entry.isFile()) {
      // Skip optimized images (preserve -mobile and -desktop versions)
      if (entry.name.includes("-mobile") || entry.name.includes("-desktop")) {
        continue;
      }
      // Delete non-optimized files (they will be re-copied)
      try {
        fs.unlinkSync(fullPath);
      } catch (error) {
        console.warn(`   ⚠️  Could not remove ${entry.name}: ${error.message}`);
      }
    }
  }
}

// Function to copy image files while preserving folder structure
function copyImageFiles(imagePaths) {
  const copiedFiles = [];
  const siteImagesDir = path.join(publicDir, "images", siteId);

  // Clean existing site images directory, but preserve optimized images (-mobile, -desktop)
  if (fs.existsSync(siteImagesDir)) {
    cleanDirectoryPreservingOptimized(siteImagesDir);
  }

  for (const imagePath of imagePaths) {
    const filename = path.basename(imagePath);
    let destPath;
    let possibleSources = [];

    // Handle different types of files
    if (imagePath.includes("favicon")) {
      // Skip favicons here - they're handled by copyFaviconFiles()
      continue;
    } else {
      // For regular images, try to find the source file and preserve its folder structure
      const possibleSourceDirs = [
        "content",
        "hero",
        "team",
        "logo",
        "pages",
        "home",
        "about",
        "contact",
        "faq",
        "pricing",
        "ratgeber",
        "angebot-new",
        "karriere",
        "og-images"
      ];

      let sourcePath = null;
      let relativePath = "";

      // First, try to match the exact path structure from the imagePath
      // Remove leading slash and 'images/' prefix to get relative path
      let pathFromImagePath = imagePath
        .replace(/^\/images\//, "")
        .replace(/^images\//, "");

      // If the path contains the siteId, try to find it in the source structure
      if (pathFromImagePath.includes(siteId)) {
        // Try to find the file by reconstructing the path
        const testPath = path.join(siteDir, "images", pathFromImagePath);
        if (fs.existsSync(testPath)) {
          sourcePath = testPath;
          relativePath = pathFromImagePath;
        }
      }

      // If not found, try to find the file in various subdirectories
      if (!sourcePath) {
        for (const subDir of possibleSourceDirs) {
          const testPath = path.join(siteDir, "images", subDir, filename);
          if (fs.existsSync(testPath)) {
            sourcePath = testPath;
            relativePath = path.join(subDir, filename);
            break;
          }
        }
      }

      // Also try direct path in images directory
      if (!sourcePath) {
        const directPath = path.join(siteDir, "images", filename);
        if (fs.existsSync(directPath)) {
          sourcePath = directPath;
          relativePath = filename;
        }
      }

      if (sourcePath) {
        // Preserve the folder structure in the destination, but slugify the filename
        const dirPath = path.dirname(relativePath);
        const slugifiedFilename = slugifyFilename(path.basename(relativePath));
        const slugifiedRelativePath = dirPath
          ? path.join(dirPath, slugifiedFilename)
          : slugifiedFilename;
        destPath = path.join(siteImagesDir, slugifiedRelativePath);

        // Create destination directory if it doesn't exist
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // Copy the file with slugified name
        fs.copyFileSync(sourcePath, destPath);
        copiedFiles.push(destPath);

        // Log if filename was changed
        if (filename !== slugifiedFilename) {
          // console.log(
          //   `   ✅ Renamed: ${filename} → ${slugifiedFilename}`
          // );
        }

        // console.log(
        //   `   ✅ Copied: ${path.relative(siteDir, sourcePath)} → ${path.relative(publicDir, destPath)}`
        // );
      } else {
        console.warn(
          `   ⚠️  Image not found: ${filename} (searched in ${siteDir}/images/ and subdirectories)`
        );
      }
    }
  }

  return copiedFiles;
}

// Function to clean unused images (now just removes other site directories)
function cleanUnusedImages(usedImages) {
  const imagesDir = path.join(publicDir, "images");

  if (!fs.existsSync(imagesDir)) {
    return;
  }
  if (!fs.existsSync(imagesDir)) {
    return;
  }

  // Directories that should be kept (current site and common directories)
  const keepDirectories = [
    siteId,
    "articles",
    "ratgeber",
    "blog",
    "gallery",
    "portfolio",
    "ueber-uns",
    "nutzungsdauer",
    "nutzungsdauer-city",
    "afa-rechner",
    "angebot",
    "kontakt",
    "immobilienbewertung",
    "nutzungsdauergutachten-preisliste",
    "immobilienbewertung-city",
    "ratgeber",
    "angebot-new",
    "karriere",
    "steuerberatung",
  ];

  const files = fs.readdirSync(imagesDir, { withFileTypes: true });
  let removedCount = 0;

  for (const file of files) {
    // Skip .DS_Store and other hidden/system files
    if (file.name.startsWith(".")) {
      continue;
    }

    if (file.isDirectory()) {
      // Remove directories that are not in the keep list
      if (!keepDirectories.includes(file.name)) {
        const filePath = path.join(imagesDir, file.name);
        if (fs.existsSync(filePath)) {
          try {
            fs.rmSync(filePath, { recursive: true, force: true });
            removedCount++;
            console.log(`   🗑️  Removed unused directory: ${file.name}/`);
          } catch (error) {
            if (error.code !== "ENOENT") {
              console.warn(
                `   ⚠️  Could not remove directory ${file.name}: ${error.message}`
              );
            }
          }
        }
      }
    } else if (file.isFile()) {
      // Remove any loose files in the images directory (not in keepDirectories)
      if (!keepDirectories.includes(file.name)) {
        const filePath = path.join(imagesDir, file.name);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
            removedCount++;
            console.log(`   🗑️  Removed unused file: ${file.name}`);
          } catch (error) {
            // File might have been deleted already, ignore
            if (error.code !== "ENOENT") {
              console.warn(
                `   ⚠️  Could not remove ${file.name}: ${error.message}`
              );
            }
          }
        }
      }
    }
  }

  if (removedCount > 0) {
    console.log(`   📊 Removed ${removedCount} unused images/directories`);
  }
}

try {
  // Load the multi-page configuration to get site config
  const configPath = path.join(dataDir, "multi-page-config.json");
  if (!fs.existsSync(configPath)) {
    console.error("❌ multi-page-config.json not found");
    process.exit(1);
  }

  const multiPageConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const siteConfig = multiPageConfig.sites.find((site) => site.id === siteId);

  if (!siteConfig) {
    console.error(`❌ Site configuration not found for site ID: ${siteId}`);
    process.exit(1);
  }

  console.log(`   📋 Loaded configuration for: ${siteConfig.name}`);

  // Create template context
  const templateContext = createTemplateContext(siteConfig);
  console.log(
    `   🔧 Created template context with ${Object.keys(templateContext).length} variables`
  );

  // Read all subpage JSON files
  const subpagesDir = path.join(siteDir, "subpages");
  if (!fs.existsSync(subpagesDir)) {
    console.log(`   ⚠️  No subpages directory found for ${siteId}`);
    process.exit(0);
  }

  const files = fs.readdirSync(subpagesDir, { withFileTypes: true });
  const tsFiles = files.filter(
    (file) => file.isFile() && file.name.endsWith(".ts")
  );

  console.log(`   📁 Found ${tsFiles.length} subpage files`);

  // Extract all image paths (after processing template variables)
  const allImagePaths = new Set();

  // First, extract images from the multi-page-config.json for the current site
  console.log(`   📋 Processing multi-page-config.json for site: ${siteId}`);
  try {
    const siteConfigProcessed = processTemplateObject(
      siteConfig,
      templateContext
    );
    const configImagePaths = extractImagePaths(siteConfigProcessed);

    if (configImagePaths.length > 0) {
      console.log(
        `   📄 multi-page-config.json: Found ${configImagePaths.length} image references (processed template variables)`
      );
      configImagePaths.forEach((path) => allImagePaths.add(path));
    }
  } catch (error) {
    console.warn(
      `   ⚠️  Error processing multi-page-config.json: ${error.message}`
    );
    // Fallback: extract images from raw config without template processing
    const configImagePaths = extractImagePaths(siteConfig);
    if (configImagePaths.length > 0) {
      console.log(
        `   📄 multi-page-config.json: Found ${configImagePaths.length} image references (raw, no template processing)`
      );
      configImagePaths.forEach((path) => allImagePaths.add(path));
    }
  }

  // Then, extract images from subpage TypeScript files
  for (const file of tsFiles) {
    const filePath = path.join(subpagesDir, file.name);
    try {
      // For TypeScript files, extract image paths directly using regex
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Extract all image paths from the file content using regex
      const imageMatches = fileContent.match(/["']\/images\/[^"']*["']/g);
      if (imageMatches) {
        imageMatches.forEach((match) => {
          const cleanPath = match.replace(/["']/g, "");
          allImagePaths.add(cleanPath);
        });
        console.log(
          `   📄 ${file.name}: Found ${imageMatches.length} image references (direct extraction)`
        );
      } else {
        console.log(`   📄 ${file.name}: No image references found`);
      }
    } catch (error) {
      console.error(`   ❌ Error processing ${file.name}: ${error.message}`);
      // Try to extract images from raw content without template processing
      try {
        // For TypeScript files, try to parse them again without template processing
        const fileContent = fs.readFileSync(filePath, "utf8");
        const assignmentMatch = fileContent.match(
          /const\s+\w+:\s*\w+\s*=\s*validateContent\s*\(\s*(\[[\s\S]*?\])\s*\)\s*;?\s*export default/m
        );
        if (!assignmentMatch) {
          throw new Error("Could not find content assignment");
        }

        let contentStr = assignmentMatch[1].trim();
        const rawContent = eval(`(${contentStr})`);
        const imagePaths = extractImagePaths(rawContent);
        if (imagePaths.length > 0) {
          console.log(
            `   📄 ${file.name}: Found ${imagePaths.length} image references (raw, no template processing)`
          );
          imagePaths.forEach((path) => allImagePaths.add(path));
        }
      } catch (rawError) {
        console.error(
          `   ❌ Failed to parse ${file.name} even without template processing: ${rawError.message}`
        );
      }
    }
  }

  console.log(`   🖼️  Found ${allImagePaths.size} unique image references`);

  // Copy image files from referenced paths
  let copiedFiles = copyImageFiles(Array.from(allImagePaths));

  // Copy favicon files to both public and app directories
  console.log(`\n   📦 Copying favicon files...`);
  const faviconFiles = copyFaviconFiles();
  copiedFiles.push(...faviconFiles);

  // Copy entire directories that aren't referenced in config but are used in the app
  console.log(`\n   📦 Copying additional image directories...`);
  const additionalDirs = [
    "articles", // For blog/ratgeber article images
    "og-image",
    "logo", // For logo images (light/dark variants)
    "ueber-uns",
    "nutzungsdauer",
    "nutzungsdauer-city",
    "afa-rechner",
    "angebot",
    "favicon",
    "kontakt",
    "immobilienbewertung",
    "nutzungsdauergutachten-preisliste",
    "immobilienbewertung-city",
    "ratgeber",
    "angebot-new",
    "karriere",
    "steuerberatung",
  ];

  for (const dirName of additionalDirs) {
    const sourceDir = path.join(siteDir, "images", dirName);
    const destDir = path.join(publicDir, "images", siteConfig.id, dirName);

    if (fs.existsSync(sourceDir)) {
      console.log(`   📁 Copying ${dirName}/ directory...`);
      const dirCopiedFiles = copyEntireDirectory(sourceDir, destDir);
      copiedFiles.push(...dirCopiedFiles);
      console.log(
        `   ✅ Copied ${dirCopiedFiles.length} files from ${dirName}/`
      );
    } else {
      console.log(`   ⏭️  Skipping ${dirName}/ (directory not found)`);
    }
  }

  // Clean unused images
  cleanUnusedImages(copiedFiles);

  console.log(`\n✅ Image copying completed for ${siteId}`);
  console.log(`   📊 Copied ${copiedFiles.length} images`);
  console.log(`\n✅ Image copying completed for ${siteId}`);
  console.log(`   📊 Copied ${copiedFiles.length} total files`);
} catch (error) {
  console.error("❌ Error copying images:", error.message);
  process.exit(1);
}
