import * as fs from "fs";
import { glob } from "glob";
import * as path from "path";

export interface SEOEditResult {
  success: boolean;
  filePath?: string;
  updatedContent?: string;
  errorMessage?: string;
}

export interface MetadataEdit {
  field: string; // e.g., "title", "description", "openGraph.title", "openGraph.images[0].alt"
  originalValue: any;
  newValue: any;
}

export interface StructuredDataEdit {
  componentId: string; // The id of the StructuredDataComponent
  field: string; // e.g., "data.name", "data.description", "data.items[0].question"
  originalValue: any;
  newValue: any;
}

/**
 * Find the subpage file for a given pageKey
 */
function findSubpageFile(
  pageKey: string,
  programmaticInstance?: string,
  siteId?: string
): string | null {
  const resolvedSiteId = siteId || "gutachten-org";
  const workspaceRoot = process.cwd();

  // Try programmatic file first if instance provided
  if (programmaticInstance) {
    const programmaticPath = path.join(
      workspaceRoot,
      "src",
      "data",
      resolvedSiteId,
      "subpages",
      "programmatic",
      `${pageKey}.ts`
    );
    if (fs.existsSync(programmaticPath)) {
      return programmaticPath;
    }
  }

  // Try base file
  const basePath = path.join(
    workspaceRoot,
    "src",
    "data",
    resolvedSiteId,
    "subpages",
    `${pageKey}.ts`
  );
  if (fs.existsSync(basePath)) {
    return basePath;
  }

  return null;
}

/**
 * Update metadata in a subpage file
 */
export async function updateMetadataInFile(
  pageKey: string,
  edits: MetadataEdit[],
  programmaticInstance?: string,
  siteId?: string
): Promise<SEOEditResult> {
  const filePath = findSubpageFile(pageKey, programmaticInstance, siteId);

  if (!filePath) {
    return {
      success: false,
      errorMessage: `Subpage file not found for pageKey: ${pageKey}`,
    };
  }

  try {
    let fileContent = fs.readFileSync(filePath, "utf8");

    // Apply each edit
    for (const edit of edits) {
      fileContent = updateMetadataField(
        fileContent,
        edit.field,
        edit.originalValue,
        edit.newValue
      );
    }

    return {
      success: true,
      filePath,
      updatedContent: fileContent,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Update a specific metadata field in the file content
 */
function updateMetadataField(
  content: string,
  fieldPath: string,
  originalValue: any,
  newValue: any
): string {
  // Find the metadata export
  const metadataMatch = content.match(
    /export\s+const\s+metadata[:\s]*SubpageMetadata\s*=\s*(\{[\s\S]*?\});/m
  );

  if (!metadataMatch) {
    throw new Error("Metadata export not found in file");
  }

  const metadataStart = metadataMatch.index!;
  const metadataEnd = metadataStart + metadataMatch[0].length;
  const metadataContent = metadataMatch[1];

  // Parse the field path (e.g., "openGraph.title" or "openGraph.images[0].alt")
  const parts = fieldPath.split(".");
  let currentContent = metadataContent;

  // Navigate to the field and update it
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

    if (arrayMatch) {
      // Handle array access like "images[0]"
      const arrayName = arrayMatch[1];
      const index = parseInt(arrayMatch[2], 10);

      // Find the array in the content
      const arrayRegex = new RegExp(
        `${arrayName}\\s*:\\s*\\[([\\s\\S]*?)\\]`,
        "m"
      );
      const arrayMatch2 = currentContent.match(arrayRegex);

      if (!arrayMatch2) {
        throw new Error(`Array ${arrayName} not found`);
      }

      // Split array items
      const arrayItems = parseArrayItems(arrayMatch2[1]);
      if (index >= arrayItems.length) {
        throw new Error(`Array index ${index} out of bounds`);
      }

      // Update the specific item
      const item = arrayItems[index];
      const itemField = parts[i + 1]; // Next part is the field within the item

      if (itemField) {
        // Update nested field in array item
        const updatedItem = updateObjectField(
          item,
          itemField,
          originalValue,
          newValue
        );
        arrayItems[index] = updatedItem;
      } else {
        // Replace entire array item
        arrayItems[index] = formatValue(newValue);
      }

      // Reconstruct array
      const updatedArray = `[${arrayItems.join(",\n    ")}]`;
      currentContent = currentContent.replace(
        arrayMatch2[0],
        `${arrayName}: ${updatedArray}`
      );

      // If this was the last part, we're done
      if (i === parts.length - 1 || !parts[i + 1]) {
        break;
      }
      i++; // Skip the next part as we already handled it
    } else {
      // Handle object property access
      if (i === parts.length - 1) {
        // Last part - update the value
        currentContent = updateObjectField(
          currentContent,
          part,
          originalValue,
          newValue
        );
      } else {
        // Navigate deeper into the object
        const nestedMatch = currentContent.match(
          new RegExp(`${part}\\s*:\\s*(\\{([\\s\\S]*?)\\})`, "m")
        );
        if (nestedMatch) {
          currentContent = nestedMatch[1];
        } else {
          throw new Error(`Field ${part} not found`);
        }
      }
    }
  }

  // Replace the metadata in the original content
  const beforeMetadata = content.substring(0, metadataStart);
  const afterMetadata = content.substring(metadataEnd);
  const newMetadataExport = `export const metadata: SubpageMetadata = ${currentContent};`;

  return beforeMetadata + newMetadataExport + afterMetadata;
}

/**
 * Update a field in an object string
 */
function updateObjectField(
  objectContent: string,
  fieldName: string,
  originalValue: any,
  newValue: any
): string {
  // Escape special regex characters
  const escapedFieldName = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedOriginal = String(originalValue).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  // Try to find the field with the original value
  const patterns = [
    // String value with double quotes
    new RegExp(
      `(${escapedFieldName}\\s*:\\s*)"${escapedOriginal}"`,
      "g"
    ),
    // String value with single quotes
    new RegExp(
      `(${escapedFieldName}\\s*:\\s*)'${escapedOriginal}'`,
      "g"
    ),
    // Template literal
    new RegExp(
      `(${escapedFieldName}\\s*:\\s*)\`${escapedOriginal}\``,
      "g"
    ),
    // Number or boolean
    new RegExp(
      `(${escapedFieldName}\\s*:\\s*)${escapedOriginal}(?=\\s*[,}])`,
      "g"
    ),
  ];

  for (const pattern of patterns) {
    if (pattern.test(objectContent)) {
      return objectContent.replace(pattern, `$1${formatValue(newValue)}`);
    }
  }

  // If not found, try to find the field and replace any value
  const fieldPattern = new RegExp(
    `(${escapedFieldName}\\s*:\\s*)([^,}\\n]+)`,
    "m"
  );
  if (fieldPattern.test(objectContent)) {
    return objectContent.replace(fieldPattern, `$1${formatValue(newValue)}`);
  }

  throw new Error(`Field ${fieldName} with value ${originalValue} not found`);
}

/**
 * Format a value for insertion into TypeScript code
 */
function formatValue(value: any): string {
  if (typeof value === "string") {
    // Check if it contains template variables or function calls
    if (
      value.includes("getImagePath") ||
      value.includes("getTemplateVariables") ||
      value.includes("{{")
    ) {
      return `"${value}"`;
    }
    // Escape quotes and format
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") {
    return String(value);
  }
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(", ")}]`;
  }
  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

/**
 * Parse array items from a string
 */
function parseArrayItems(arrayContent: string): string[] {
  const items: string[] = [];
  let currentItem = "";
  let depth = 0;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    const prevChar = i > 0 ? arrayContent[i - 1] : "";

    if (!inString && (char === '"' || char === "'" || char === "`")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && prevChar !== "\\") {
      inString = false;
    }

    if (!inString) {
      if (char === "{" || char === "[") {
        depth++;
      } else if (char === "}" || char === "]") {
        depth--;
      } else if (char === "," && depth === 0) {
        items.push(currentItem.trim());
        currentItem = "";
        continue;
      }
    }

    currentItem += char;
  }

  if (currentItem.trim()) {
    items.push(currentItem.trim());
  }

  return items;
}

/**
 * Update structured data in a subpage file
 */
export async function updateStructuredDataInFile(
  pageKey: string,
  edits: StructuredDataEdit[],
  programmaticInstance?: string,
  siteId?: string
): Promise<SEOEditResult> {
  const filePath = findSubpageFile(pageKey, programmaticInstance, siteId);

  if (!filePath) {
    return {
      success: false,
      errorMessage: `Subpage file not found for pageKey: ${pageKey}`,
    };
  }

  try {
    let fileContent = fs.readFileSync(filePath, "utf8");

    // Apply each edit
    for (const edit of edits) {
      fileContent = updateStructuredDataField(
        fileContent,
        edit.componentId,
        edit.field,
        edit.originalValue,
        edit.newValue
      );
    }

    return {
      success: true,
      filePath,
      updatedContent: fileContent,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Update a structured data field in a component
 */
function updateStructuredDataField(
  content: string,
  componentId: string,
  fieldPath: string,
  originalValue: any,
  newValue: any
): string {
  // Find the component by ID (similar to component-text-editor.ts)
  const escapedId = componentId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const idPattern = new RegExp(`id\\s*:\\s*["']${escapedId}["']`, "i");

  const lines = content.split("\n");
  let componentStart = -1;
  let componentEnd = -1;

  // Find the component
  for (let i = 0; i < lines.length; i++) {
    if (idPattern.test(lines[i])) {
      // Found the component, find its boundaries
      let braceDepth = 0;
      let inComponent = false;

      // Look backwards to find createComponent(
      for (let j = i; j >= 0; j--) {
        if (lines[j].includes("createComponent")) {
          componentStart = j;
          inComponent = true;
          break;
        }
      }

      if (!inComponent) {
        continue;
      }

      // Find the end of the component object
      for (let j = componentStart; j < lines.length; j++) {
        const line = lines[j];
        for (const char of line) {
          if (char === "{") braceDepth++;
          if (char === "}") {
            braceDepth--;
            if (braceDepth === 0 && j >= i) {
              componentEnd = j;
              break;
            }
          }
        }
        if (componentEnd !== -1) break;
      }

      if (componentEnd === -1) {
        throw new Error(`Could not find end of component ${componentId}`);
      }

      // Extract component content
      const componentLines = lines.slice(componentStart, componentEnd + 1);
      const componentContent = componentLines.join("\n");

      // Update the field in the component
      const updatedComponent = updateDataFieldInComponent(
        componentContent,
        fieldPath,
        originalValue,
        newValue
      );

      // Replace in original content
      const beforeComponent = lines.slice(0, componentStart).join("\n");
      const afterComponent = lines.slice(componentEnd + 1).join("\n");

      return (
        beforeComponent +
        (beforeComponent ? "\n" : "") +
        updatedComponent +
        (afterComponent ? "\n" : "") +
        afterComponent
      );
    }
  }

  throw new Error(`Component with id ${componentId} not found`);
}

/**
 * Update a field in the data object of a component
 */
function updateDataFieldInComponent(
  componentContent: string,
  fieldPath: string,
  originalValue: any,
  newValue: any
): string {
  // Find the data object
  const dataMatch = componentContent.match(/data\s*:\s*(\{[\s\S]*?\})/m);

  if (!dataMatch) {
    throw new Error("data object not found in component");
  }

  const dataContent = dataMatch[1];
  const parts = fieldPath.split(".").filter((p) => p !== "data"); // Remove "data" prefix if present

  // Navigate and update the field
  let updatedData = dataContent;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

    if (arrayMatch) {
      // Handle array access
      const arrayName = arrayMatch[1];
      const index = parseInt(arrayMatch[2], 10);
      const arrayRegex = new RegExp(
        `${arrayName}\\s*:\\s*\\[([\\s\\S]*?)\\]`,
        "m"
      );
      const arrayMatch2 = updatedData.match(arrayRegex);

      if (!arrayMatch2) {
        throw new Error(`Array ${arrayName} not found`);
      }

      const arrayItems = parseArrayItems(arrayMatch2[1]);
      if (index >= arrayItems.length) {
        throw new Error(`Array index ${index} out of bounds`);
      }

      const item = arrayItems[index];
      const itemField = parts[i + 1];

      if (itemField) {
        const updatedItem = updateObjectField(
          item,
          itemField,
          originalValue,
          newValue
        );
        arrayItems[index] = updatedItem;
      } else {
        arrayItems[index] = formatValue(newValue);
      }

      const updatedArray = `[${arrayItems.join(",\n        ")}]`;
      updatedData = updatedData.replace(
        arrayMatch2[0],
        `${arrayName}: ${updatedArray}`
      );

      if (i === parts.length - 1 || !parts[i + 1]) {
        break;
      }
      i++;
    } else {
      if (i === parts.length - 1) {
        updatedData = updateObjectField(
          updatedData,
          part,
          originalValue,
          newValue
        );
      } else {
        const nestedMatch = updatedData.match(
          new RegExp(`${part}\\s*:\\s*(\\{([\\s\\S]*?)\\})`, "m")
        );
        if (nestedMatch) {
          updatedData = nestedMatch[1];
        } else {
          throw new Error(`Field ${part} not found`);
        }
      }
    }
  }

  // Replace data in component
  return componentContent.replace(dataMatch[0], `data: ${updatedData}`);
}

