#!/usr/bin/env tsx
/**
 * Remove Stable IDs Script
 *
 * This script removes `id` props (that look like UUIDs) and `herokit-id` props
 * that were added by the add-stable-ids.ts script.
 *
 * Usage:
 *   pnpm remove-stable-ids:dry-run  # Preview changes without writing
 *   pnpm remove-stable-ids          # Apply changes
 *
 * Options:
 *   --dry-run    Preview changes without writing
 *   --write      Apply changes to files
 *   --include    Glob pattern to include specific files
 *   --exclude    Glob pattern to exclude files
 */

import { Project, SyntaxKind, Node, JsxAttribute } from "ts-morph";
import { glob as globAsync } from "glob";
import * as path from "path";
import * as fs from "fs/promises";

// UUID v4 regex pattern
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Default ignore patterns
const DEFAULT_IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/.next/**",
  "**/dist/**",
  "**/build/**",
  "**/out/**",
  "**/coverage/**",
  "**/.turbo/**",
  "**/.git/**",
  "**/public/static/**",
];

interface RemoveStats {
  filesChanged: number;
  idsRemoved: number;
  changedFiles: string[];
}

// Check if a string value looks like a UUID
function isUuidValue(value: string): boolean {
  // Remove quotes if present
  const cleanValue = value.replace(/^["']|["']$/g, "");
  return UUID_PATTERN.test(cleanValue);
}

// Process a TSX/JSX file to remove IDs
async function processTsxFile(
  filePath: string,
  project: Project,
  dryRun: boolean
): Promise<{ changed: boolean; idsRemoved: number }> {
  const sourceFile = project.addSourceFileAtPath(filePath);
  let fileChanged = false;
  let idsRemoved = 0;

  // Collect all JSX elements
  const openingElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxOpeningElement
  );
  const selfClosingElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement
  );

  const allElements = [...openingElements, ...selfClosingElements];

  // Collect attributes to remove (we'll remove them after iteration to avoid mutation issues)
  const attributesToRemove: JsxAttribute[] = [];

  for (const element of allElements) {
    const attributes = element.getAttributes();

    for (const attr of attributes) {
      if (!Node.isJsxAttribute(attr)) {
        continue;
      }

      const attrName = attr.getNameNode().getText();

      // Remove herokit-id props (always remove these)
      if (attrName === "herokit-id") {
        attributesToRemove.push(attr);
        idsRemoved++;
        fileChanged = true;
        continue;
      }

      // Remove id props that have UUID values
      if (attrName === "id") {
        const initializer = attr.getInitializer();
        if (initializer) {
          const initText = initializer.getText();
          // Check if the value is a UUID
          if (isUuidValue(initText)) {
            attributesToRemove.push(attr);
            idsRemoved++;
            fileChanged = true;
          }
        }
      }
    }
  }

  // Remove collected attributes
  if (!dryRun && attributesToRemove.length > 0) {
    for (const attr of attributesToRemove) {
      attr.remove();
    }
    await sourceFile.save();
  }

  // Remove from project to free memory
  project.removeSourceFile(sourceFile);

  return { changed: fileChanged, idsRemoved };
}

// Find TSX/JSX files
async function findTsxFiles(
  includePatterns: string[],
  excludePatterns: string[]
): Promise<string[]> {
  const patterns =
    includePatterns.length > 0
      ? includePatterns
      : ["**/*.tsx", "**/*.jsx", "**/*.ts", "**/*.js"];

  const allExclude = [...DEFAULT_IGNORE_PATTERNS, ...excludePatterns];

  // Always exclude layout.tsx and all page.tsx files in app directory
  allExclude.push(
    "src/app/layout.tsx",
    "**/app/layout.tsx",
    "**/app/**/page.tsx",
    "src/app/page.tsx"
  );

  const files: string[] = [];

  for (const pattern of patterns) {
    const matches = await globAsync(pattern, {
      ignore: allExclude,
      nodir: true,
      absolute: true,
    });
    files.push(...matches);
  }

  // Deduplicate
  return [...new Set(files)];
}

// Parse CLI arguments
function parseArgs(): {
  dryRun: boolean;
  include: string[];
  exclude: string[];
} {
  const args = process.argv.slice(2);
  let dryRun = true; // Default to dry-run for safety
  const include: string[] = [];
  const exclude: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--write") {
      dryRun = false;
    } else if (arg === "--include" && args[i + 1]) {
      include.push(args[++i]);
    } else if (arg === "--exclude" && args[i + 1]) {
      exclude.push(args[++i]);
    }
  }

  return { dryRun, include, exclude };
}

// Main function
async function main() {
  const { dryRun, include, exclude } = parseArgs();

  console.log("\n🗑️  Remove Stable IDs Script");
  console.log("============================");
  console.log(
    `Mode: ${dryRun ? "DRY RUN (no changes will be written)" : "WRITE MODE"}`
  );
  console.log("");

  const stats: RemoveStats = {
    filesChanged: 0,
    idsRemoved: 0,
    changedFiles: [],
  };

  // Create ts-morph project
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
  });

  // Find and process TSX/JSX files
  console.log("Scanning for TSX/JSX files...");
  const tsxFiles = await findTsxFiles(include, exclude);
  console.log(`Found ${tsxFiles.length} TSX/JSX files`);

  for (const filePath of tsxFiles) {
    try {
      const { changed, idsRemoved } = await processTsxFile(
        filePath,
        project,
        dryRun
      );

      if (changed) {
        stats.filesChanged++;
        stats.idsRemoved += idsRemoved;
        const relativePath = path.relative(process.cwd(), filePath);
        stats.changedFiles.push(relativePath);
        console.log(`  ${relativePath}: -${idsRemoved} IDs`);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  // Print summary
  console.log("\n📊 SUMMARY");
  console.log("==========");
  console.log(`TSX/JSX files:`);
  console.log(`  Files changed: ${stats.filesChanged}`);
  console.log(`  Total IDs removed: ${stats.idsRemoved}`);
  console.log("");
  console.log(`Total files changed: ${stats.filesChanged}`);
  console.log(`Total IDs removed: ${stats.idsRemoved}`);

  if (dryRun && stats.filesChanged > 0) {
    console.log("\n⚠️  This was a dry run. Run with --write to apply changes.");
  }

  if (!dryRun && stats.filesChanged > 0) {
    console.log("\n✅ Changes applied successfully.");
  }
}

main().catch(console.error);

