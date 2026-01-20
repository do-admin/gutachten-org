#!/usr/bin/env node
/**
 * Add Stable Unique IDs (UUID v4) to React Components and JSON Content
 *
 * This script scans the repository and adds UUID v4 IDs to:
 * 1. React component invocations in TSX/JSX files (when id prop is missing)
 * 2. Objects in JSON files (when id field is missing)
 *
 * The script is idempotent: running it multiple times will not change files
 * that already have IDs.
 *
 * Usage:
 *   pnpm add-stable-ids:dry-run    # Preview changes
 *   pnpm add-stable-ids            # Apply changes
 *
 * Options:
 *   --dry-run    Print planned changes without writing files
 *   --write      Apply changes to files
 *   --include    Glob pattern to include files
 *   --exclude    Glob pattern to exclude files
 */

import {
  Project,
  SyntaxKind,
  Node,
  JsxOpeningElement,
  JsxSelfClosingElement,
  ObjectLiteralExpression,
  CallExpression,
} from "ts-morph";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import * as path from "path";
import { glob as globAsync } from "glob";

interface FileStats {
  path: string;
  idsAdded: number;
  changed: boolean;
}

interface Summary {
  tsxFiles: FileStats[];
  jsonFiles: FileStats[];
  totalTsxIds: number;
  totalJsonIds: number;
  totalFilesChanged: number;
}

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

// React/Next.js built-in components that don't accept id prop
const BUILTIN_COMPONENTS = new Set([
  "Suspense",
  "Fragment",
  "StrictMode",
  "Profiler",
  "Image", // Next.js Image - self-closing, no text content
  "Script", // Next.js Script - typically no visible text
  // Note: Link is NOT skipped - it often contains text content
]);

// HTML elements that should not get IDs (non-visible or structural only)
const SKIP_HTML_ELEMENTS = new Set([
  "script",
  "style",
  "meta",
  "link",
  "head",
  "html",
  "body",
  "noscript",
  "template",
]);

// Check if a JSX element is a React component (capitalized tag name)
function isReactComponent(tagName: string): boolean {
  // React components start with uppercase letter
  return /^[A-Z]/.test(tagName);
}

// Check if an HTML element should get an ID (visible content elements)
function shouldAddIdToHtmlElement(tagName: string): boolean {
  const lowerTag = tagName.toLowerCase();
  // Skip non-visible or structural elements
  if (SKIP_HTML_ELEMENTS.has(lowerTag)) {
    return false;
  }
  // Add IDs to common content elements
  return true;
}

// Check if a JSX element has DIRECT text content (text or expression as immediate children)
function hasDirectTextContent(
  element: JsxOpeningElement | JsxSelfClosingElement
): boolean {
  // For self-closing elements, they can't have text children
  if (Node.isJsxSelfClosingElement(element)) {
    return false;
  }

  // For opening elements, check the parent JsxElement for direct text/expression children
  const parent = element.getParent();
  if (Node.isJsxElement(parent)) {
    const jsxChildren = parent.getJsxChildren();
    for (const child of jsxChildren) {
      // Check for direct text content (non-whitespace)
      if (Node.isJsxText(child)) {
        const text = child.getText().trim();
        if (text.length > 0) {
          return true;
        }
      }
      // Check for expressions like {item.value} or {children}
      if (Node.isJsxExpression(child)) {
        const expression = child.getExpression();
        // Skip empty expressions like {}
        if (expression) {
          return true;
        }
      }
    }
  }

  // Default: no direct text content
  return false;
}

// Check if a JSX element already has a herokit-id prop
// Note: We intentionally do NOT check for regular 'id' prop - elements can have both
function hasIdProp(
  element: JsxOpeningElement | JsxSelfClosingElement
): boolean {
  const attributes = element.getAttributes();
  for (const attr of attributes) {
    if (Node.isJsxAttribute(attr)) {
      const name = attr.getNameNode().getText();
      if (
        name === "herokit-id" ||
        name === "data-content-id" ||
        name === "data-hk-id"
      ) {
        return true;
      }
    }
  }
  return false;
}

// Check if an object literal already has a herokit-id or id property
function hasIdProperty(obj: ObjectLiteralExpression): boolean {
  const properties = obj.getProperties();
  for (const prop of properties) {
    if (Node.isPropertyAssignment(prop)) {
      const name = prop.getName();
      // Keep checking for 'id' for backward compatibility with createComponent
      if (name === "id" || name === "herokit-id") {
        return true;
      }
    }
  }
  return false;
}

// Check if a call expression is createComponent
function isCreateComponentCall(node: CallExpression): boolean {
  const expression = node.getExpression();
  if (Node.isIdentifier(expression)) {
    return expression.getText() === "createComponent";
  }
  if (Node.isPropertyAccessExpression(expression)) {
    return expression.getName() === "createComponent";
  }
  return false;
}

// Process a TSX/JSX file and add IDs to components
async function processTsxFile(
  filePath: string,
  dryRun: boolean
): Promise<FileStats> {
  const stats: FileStats = {
    path: filePath,
    idsAdded: 0,
    changed: false,
  };

  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    let fileChanged = false;

    // Process JSX elements
    const openingElements = sourceFile.getDescendantsOfKind(
      SyntaxKind.JsxOpeningElement
    );
    const selfClosingElements = sourceFile.getDescendantsOfKind(
      SyntaxKind.JsxSelfClosingElement
    );
    const jsxElements: (JsxOpeningElement | JsxSelfClosingElement)[] = [
      ...openingElements,
      ...selfClosingElements,
    ];

    for (const element of jsxElements) {
      const tagName = element.getTagNameNode().getText();
      const isComponent = isReactComponent(tagName);

      // Skip ALL self-closing elements - they can't contain text
      if (Node.isJsxSelfClosingElement(element)) {
        continue;
      }

      // Handle React components - only add herokit-id if they have direct text content
      if (isComponent) {
        // Skip React built-ins that don't accept herokit-id prop
        if (BUILTIN_COMPONENTS.has(tagName)) {
          continue;
        }

        // Skip if already has herokit-id prop
        if (hasIdProp(element)) {
          continue;
        }

        // Only add herokit-id to React components that have DIRECT text content
        if (!hasDirectTextContent(element)) {
          continue;
        }

        // Generate UUID
        const uuid = randomUUID();
        fileChanged = true;
        stats.idsAdded++;

        if (!dryRun) {
          // Add herokit-id prop at the end of attributes
          element.addAttribute({
            name: "herokit-id",
            initializer: `"${uuid}"`,
          });
        }
      } else {
        // Handle HTML host elements (lowercase tags)
        // Only add IDs to elements that should have them and might display text
        if (!shouldAddIdToHtmlElement(tagName)) {
          continue;
        }

        // Skip if already has id prop
        if (hasIdProp(element)) {
          continue;
        }

        // For HTML elements, add IDs to common content elements that typically display text
        const lowerTag = tagName.toLowerCase();
        const contentElements = [
          "div",
          "p",
          "span",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "a",
          "button",
          "label",
          "li",
          "td",
          "th",
          "article",
          "section",
          "header",
          "footer",
          "main",
          "aside",
          "nav",
          "blockquote",
          "cite",
          "em",
          "strong",
          "small",
          "mark",
          "del",
          "ins",
          "sub",
          "sup",
          "code",
          "pre",
          "kbd",
          "samp",
          "var",
          "time",
          "address",
          "abbr",
          "dfn",
          "q",
          "b",
          "i",
          "u",
          "s",
          "output",
          "progress",
          "meter",
          "details",
          "summary",
          "figcaption",
          "caption",
          "legend",
          "dt",
          "dd",
        ];

        // Only add IDs to content elements that have DIRECT text content
        if (
          contentElements.includes(lowerTag) &&
          hasDirectTextContent(element)
        ) {
          // Generate UUID
          const uuid = randomUUID();
          fileChanged = true;
          stats.idsAdded++;

          if (!dryRun) {
            // Add herokit-id prop at the end of attributes
            element.addAttribute({
              name: "herokit-id",
              initializer: `"${uuid}"`,
            });
          }
        }
      }
    }

    // Process createComponent calls
    const callExpressions = sourceFile.getDescendantsOfKind(
      SyntaxKind.CallExpression
    );
    for (const callExpr of callExpressions) {
      if (!isCreateComponentCall(callExpr)) {
        continue;
      }

      const args = callExpr.getArguments();
      if (args.length === 0) {
        continue;
      }

      const firstArg = args[0];
      if (!Node.isObjectLiteralExpression(firstArg)) {
        continue;
      }

      // Check if already has id
      if (hasIdProperty(firstArg)) {
        continue;
      }

      // Generate UUID
      const uuid = randomUUID();
      fileChanged = true;
      stats.idsAdded++;

      if (!dryRun) {
        // Add id as first property
        firstArg.insertProperty(0, {
          name: "id",
          initializer: `"${uuid}"`,
        } as any);
      }
    }

    if (fileChanged && !dryRun) {
      await sourceFile.save();
    }

    stats.changed = fileChanged;
    return stats;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return stats;
  }
}

// Detect indentation from JSON content
function detectIndent(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(\s+)/);
    if (match) {
      return match[1];
    }
  }
  return "  "; // Default to 2 spaces
}

// Check if JSON object already has an id field
function jsonHasId(obj: any): boolean {
  if (typeof obj !== "object" || obj === null) return false;
  return typeof obj.id === "string" && obj.id.length > 0;
}

// Add id to a JSON object (returns new object with id as first key)
function addIdToJsonObject(obj: any, uuid: string): any {
  const newObj: any = { id: uuid };
  for (const key in obj) {
    if (key !== "id") {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// Recursively process JSON and add IDs to objects
function processJsonValue(
  value: any,
  path: string[] = []
): { value: any; idsAdded: number; changed: boolean } {
  let idsAdded = 0;
  let changed = false;

  if (Array.isArray(value)) {
    const newArray: any[] = [];
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        // Object in array - add ID if missing
        if (!jsonHasId(item)) {
          const uuid = randomUUID();
          const newItem = addIdToJsonObject(item, uuid);
          // Recursively process nested objects/arrays in the new item
          const nested = processJsonValue(newItem, [...path, `[${i}]`]);
          newArray.push(nested.value);
          idsAdded += nested.idsAdded + 1; // +1 for the ID we just added
          changed = true;
        } else {
          // Recursively process nested objects/arrays
          const nested = processJsonValue(item, [...path, `[${i}]`]);
          if (nested.changed) {
            newArray.push(nested.value);
            idsAdded += nested.idsAdded;
            changed = true;
          } else {
            newArray.push(item);
          }
        }
      } else if (Array.isArray(item)) {
        // Nested array
        const nested = processJsonValue(item, [...path, `[${i}]`]);
        newArray.push(nested.value);
        idsAdded += nested.idsAdded;
        if (nested.changed) changed = true;
      } else {
        newArray.push(item);
      }
    }
    return { value: newArray, idsAdded, changed };
  } else if (typeof value === "object" && value !== null) {
    const newObj: any = {};
    let objChanged = false;

    // Check if this is a content object (has keys like title, question, answer, etc.)
    const contentKeys = [
      "title",
      "name",
      "question",
      "answer",
      "items",
      "faqs",
      "questions",
      "sections",
      "blocks",
    ];
    const isContentObject = Object.keys(value).some((key) =>
      contentKeys.includes(key)
    );

    // Add ID if it's a content object and missing
    if (isContentObject && !jsonHasId(value)) {
      const uuid = randomUUID();
      newObj.id = uuid;
      idsAdded++;
      changed = true;
      objChanged = true;
    }

    // Process all properties
    for (const key in value) {
      if (key === "id" && !objChanged) {
        // Preserve existing id
        newObj[key] = value[key];
        continue;
      }

      const nested = processJsonValue(value[key], [...path, key]);
      newObj[key] = nested.value;
      idsAdded += nested.idsAdded;
      if (nested.changed) changed = true;
    }

    return { value: newObj, idsAdded, changed };
  }

  return { value, idsAdded: 0, changed: false };
}

// Process a JSON file and add IDs
async function processJsonFile(
  filePath: string,
  dryRun: boolean
): Promise<FileStats> {
  const stats: FileStats = {
    path: filePath,
    idsAdded: 0,
    changed: false,
  };

  try {
    const content = await fs.readFile(filePath, "utf-8");
    if (!content.trim()) {
      // Skip empty files
      return stats;
    }
    const data = JSON.parse(content);

    // Skip config/metadata-only files (heuristic)
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      const configKeys = [
        "version",
        "build",
        "env",
        "compilerOptions",
        "scripts",
        "routes",
        "rewrites",
        "headers",
      ];
      const isConfigFile =
        Object.keys(data).some((key) => configKeys.includes(key)) &&
        !(
          "items" in data ||
          "faqs" in data ||
          "questions" in data ||
          "components" in data
        );
      if (isConfigFile) {
        return stats;
      }
    }

    const result = processJsonValue(data);

    if (result.changed && result.idsAdded > 0) {
      stats.idsAdded = result.idsAdded;
      stats.changed = true;

      if (!dryRun) {
        // Preserve formatting
        const indent = detectIndent(content);
        const newContent = JSON.stringify(result.value, null, indent);
        const hasTrailingNewline = content.endsWith("\n");
        await fs.writeFile(
          filePath,
          newContent + (hasTrailingNewline ? "\n" : ""),
          "utf-8"
        );
      }
    }

    return stats;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return stats;
  }
}

// Find all TSX/JSX files
async function findTsxFiles(
  rootDir: string,
  include?: string,
  exclude?: string
): Promise<string[]> {
  const patterns = include ? [include] : ["**/*.tsx", "**/*.jsx"];
  const allFiles: string[] = [];

  // Exclude src/app by default, but allow it if explicitly included
  const excludePatterns = [
    ...DEFAULT_IGNORE_PATTERNS,
    ...(exclude ? [exclude] : []),
  ];

  // Always exclude layout.tsx and all page.tsx files in app directory
  excludePatterns.push(
    "src/app/layout.tsx",
    "**/app/layout.tsx",
    "**/app/**/page.tsx", // Exclude all page.tsx files in app directory
    "src/app/page.tsx" // Also exclude root page.tsx
  );

  // Only exclude entire src/app directory if not explicitly included
  if (
    !include ||
    (!include.includes("src/app") && !include.includes("**/app/**"))
  ) {
    excludePatterns.push("src/app/**/*.tsx", "src/app/**/*.jsx");
  }

  for (const pattern of patterns) {
    const files = await globAsync(pattern, {
      cwd: rootDir,
      ignore: excludePatterns,
      absolute: true,
    });
    allFiles.push(...files);
  }

  // Remove duplicates
  return Array.from(new Set(allFiles));
}

// Find all JSON files
async function findJsonFiles(
  rootDir: string,
  include?: string,
  exclude?: string
): Promise<string[]> {
  const patterns = include ? [include] : ["**/*.json"];
  const allFiles: string[] = [];

  for (const pattern of patterns) {
    const files = await globAsync(pattern, {
      cwd: rootDir,
      ignore: [...DEFAULT_IGNORE_PATTERNS, ...(exclude ? [exclude] : [])],
      absolute: true,
    });
    allFiles.push(...files);
  }

  // Remove duplicates
  return Array.from(new Set(allFiles));
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const write = args.includes("--write");
  const includeIndex = args.indexOf("--include");
  const excludeIndex = args.indexOf("--exclude");

  if (!dryRun && !write) {
    console.error("Error: Must specify either --dry-run or --write");
    process.exit(1);
  }

  const include =
    includeIndex !== -1 && args[includeIndex + 1]
      ? args[includeIndex + 1]
      : undefined;
  const exclude =
    excludeIndex !== -1 && args[excludeIndex + 1]
      ? args[excludeIndex + 1]
      : undefined;

  const rootDir = process.cwd();
  console.log(`Scanning repository: ${rootDir}`);
  console.log(`Mode: ${dryRun ? "DRY RUN" : "WRITE"}`);
  if (include) console.log(`Include pattern: ${include}`);
  if (exclude) console.log(`Exclude pattern: ${exclude}`);
  console.log("");

  // Find files
  console.log("Finding TSX/JSX files...");
  const tsxFiles = await findTsxFiles(rootDir, include, exclude);
  console.log(`Found ${tsxFiles.length} TSX/JSX files`);

  // Only find JSON files if include pattern doesn't specify TSX/JSX only
  const isTsxOnly =
    include &&
    (include.includes("*.tsx") ||
      include.includes("*.jsx") ||
      include.includes("**/*.tsx") ||
      include.includes("**/*.jsx"));
  let jsonFiles: string[] = [];
  if (!isTsxOnly) {
    console.log("Finding JSON files...");
    jsonFiles = await findJsonFiles(rootDir, include, exclude);
    console.log(`Found ${jsonFiles.length} JSON files`);
  } else {
    console.log("Skipping JSON files (TSX/JSX only mode)");
  }
  console.log("");

  // Process TSX files
  console.log("Processing TSX/JSX files...");
  const tsxStats: FileStats[] = [];
  for (const file of tsxFiles) {
    const stats = await processTsxFile(file, dryRun);
    if (stats.changed) {
      tsxStats.push(stats);
      console.log(`  ${stats.path}: +${stats.idsAdded} IDs`);
    }
  }

  // Process JSON files
  console.log("Processing JSON files...");
  const jsonStats: FileStats[] = [];
  for (const file of jsonFiles) {
    const stats = await processJsonFile(file, dryRun);
    if (stats.changed) {
      jsonStats.push(stats);
      console.log(`  ${stats.path}: +${stats.idsAdded} IDs`);
    }
  }

  // Summary
  const summary: Summary = {
    tsxFiles: tsxStats,
    jsonFiles: jsonStats,
    totalTsxIds: tsxStats.reduce((sum, s) => sum + s.idsAdded, 0),
    totalJsonIds: jsonStats.reduce((sum, s) => sum + s.idsAdded, 0),
    totalFilesChanged: tsxStats.length + jsonStats.length,
  };

  console.log("");
  console.log("=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`TSX/JSX files changed: ${summary.tsxFiles.length}`);
  console.log(`  Total IDs added: ${summary.totalTsxIds}`);
  console.log(`JSON files changed: ${summary.jsonFiles.length}`);
  console.log(`  Total IDs added: ${summary.totalJsonIds}`);
  console.log(`Total files changed: ${summary.totalFilesChanged}`);
  console.log(`Total IDs added: ${summary.totalTsxIds + summary.totalJsonIds}`);
  console.log("");

  if (dryRun) {
    console.log("DRY RUN MODE - No files were modified");
    console.log("Run with --write to apply changes");
  } else {
    console.log("Changes have been written to files");
  }
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

