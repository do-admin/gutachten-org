import * as fs from "fs";
import { glob } from "glob";
import * as path from "path";

export interface ComponentEditResult {
  success: boolean;
  filePath?: string;
  lineNumber?: number;
  updatedContent?: string;
  errorMessage?: string;
}

function findComponentInConfigFile(
  fileContent: string,
  componentId: string
): { startLine: number; endLine: number; lines: string[] } | null {
  // Escape special regex characters in componentId
  const escapedId = componentId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Pattern to match id: "component-id" in createComponent call
  const idPattern = new RegExp(`id\\s*:\\s*["']${escapedId}["']`, "i");

  const lines = fileContent.split("\n");

  // Find the line with the component id
  for (let i = 0; i < lines.length; i++) {
    if (idPattern.test(lines[i])) {
      // Found the component, now find the createComponent call start
      let componentStart = i;
      let componentEnd = i;
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

      // Find the end of the component object (matching braces)
      for (let j = componentStart; j < lines.length; j++) {
        const line = lines[j];
        for (const char of line) {
          if (char === "{") braceDepth++;
          if (char === "}") {
            braceDepth--;
            if (braceDepth === 0 && j >= i) {
              componentEnd = j;
              return {
                startLine: componentStart,
                endLine: componentEnd,
                lines: lines.slice(componentStart, componentEnd + 1),
              };
            }
          }
        }
      }
    }
  }

  return null;
}

function updateTextInComponent(
  componentLines: string[],
  originalText: string,
  newText: string
): { updatedLines: string[]; found: boolean; lineNumber: number } {
  const lines = componentLines;

  // Normalize whitespace for comparison (handle \n in strings)
  const normalizeText = (text: string) => text.trim().replace(/\s+/g, " ");
  const normalizedOriginal = normalizeText(originalText);

  // Escape special regex characters in originalText
  const escapedOriginal = originalText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Try to find the original text in string literals
  // Handle both single-line and multi-line strings
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const normalizedLine = normalizeText(line);

    // Check if this line contains the original text (normalized)
    if (normalizedLine.includes(normalizedOriginal)) {
      // Try different quote patterns to find the exact match
      const patterns = [
        // Double quotes - single line
        /(\w+)\s*:\s*"([^"]+)"/g,
        // Single quotes - single line
        /(\w+)\s*:\s*'([^']+)'/g,
        // Template literals - single line
        /(\w+)\s*:\s*`([^`]+)`/g,
      ];

      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(line)) !== null) {
          const propertyValue = match[2];
          const normalizedValue = normalizeText(propertyValue);

          if (normalizedValue.includes(normalizedOriginal)) {
            // Replace the text within the string
            const updatedValue = propertyValue.replace(
              new RegExp(escapedOriginal.replace(/\s+/g, "\\s+"), "gi"),
              newText
            );

            // Reconstruct the line with updated value
            const updatedLine = line.replace(
              match[0],
              `${match[1]}: ${
                match[0].includes('"')
                  ? `"${updatedValue}"`
                  : match[0].includes("'")
                    ? `'${updatedValue}'`
                    : `\`${updatedValue}\``
              }`
            );

            const updatedLines = [...lines];
            updatedLines[i] = updatedLine;

            return { updatedLines, found: true, lineNumber: i };
          }
        }
      }

      // If no pattern matched but text is in line, try direct replacement
      // This handles multiline strings or complex cases
      if (line.includes(originalText)) {
        const updatedLine = line.replace(
          new RegExp(escapedOriginal.replace(/\s+/g, "\\s+"), "gi"),
          newText
        );

        const updatedLines = [...lines];
        updatedLines[i] = updatedLine;

        return { updatedLines, found: true, lineNumber: i };
      }
    }
  }

  // Handle multiline strings - check across multiple lines
  for (let i = 0; i < lines.length - 1; i++) {
    const multiLineContent = lines
      .slice(i, Math.min(i + 5, lines.length))
      .join("\n");
    const normalizedMultiLine = normalizeText(multiLineContent);

    if (normalizedMultiLine.includes(normalizedOriginal)) {
      // Try to find and replace in multiline context
      const updatedMultiLine = multiLineContent.replace(
        new RegExp(escapedOriginal.replace(/\s+/g, "\\s+"), "gi"),
        newText
      );

      if (updatedMultiLine !== multiLineContent) {
        const updatedLines = [...lines];
        const updatedMultiLines = updatedMultiLine.split("\n");
        for (
          let j = 0;
          j < updatedMultiLines.length && i + j < lines.length;
          j++
        ) {
          updatedLines[i + j] = updatedMultiLines[j];
        }

        return { updatedLines, found: true, lineNumber: i };
      }
    }
  }

  return { updatedLines: lines, found: false, lineNumber: 0 };
}

function updateTextInJsonFile(
  jsonContent: string,
  originalText: string,
  newText: string
): { updatedContent: string; found: boolean; lineNumber: number } {
  try {
    const data = JSON.parse(jsonContent);

    // Normalize whitespace for comparison
    const normalizeText = (text: string) => text.trim().replace(/\s+/g, " ");
    const normalizedOriginal = normalizeText(originalText);

    // Escape special regex characters and handle whitespace
    const escapedPattern = originalText
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\s+/g, "\\s+");
    const regex = new RegExp(escapedPattern, "gi");

    let found = false;
    let foundLineNumber = 0;
    let currentArrayIndex = 0;

    // Recursively search and update all string values in the JSON structure
    function updateTextInValue(obj: any, isRootArray: boolean = false): void {
      if (typeof obj === "string") {
        const normalizedValue = normalizeText(obj);
        if (normalizedValue.includes(normalizedOriginal)) {
          const updated = obj.replace(regex, newText);
          if (updated !== obj) {
            found = true;
            if (foundLineNumber === 0) {
              foundLineNumber = currentArrayIndex + 1; // Track first found location (1-indexed)
            }
          }
        }
        return;
      }

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          const oldIndex = currentArrayIndex;
          if (isRootArray) {
            currentArrayIndex = i;
          }

          // Check if current element is a string and needs updating
          if (typeof obj[i] === "string") {
            const normalizedValue = normalizeText(obj[i]);
            if (normalizedValue.includes(normalizedOriginal)) {
              obj[i] = obj[i].replace(regex, newText);
              found = true;
              if (foundLineNumber === 0) {
                foundLineNumber = i + 1; // Track first found location (1-indexed)
              }
            }
          } else {
            // Recursively process nested objects/arrays
            updateTextInValue(obj[i], false);
          }

          currentArrayIndex = oldIndex;
        }
        return;
      }

      if (obj !== null && typeof obj === "object") {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Check if current property is a string and needs updating
            if (typeof obj[key] === "string") {
              const normalizedValue = normalizeText(obj[key]);
              if (normalizedValue.includes(normalizedOriginal)) {
                obj[key] = obj[key].replace(regex, newText);
                found = true;
                if (foundLineNumber === 0) {
                  foundLineNumber = currentArrayIndex + 1;
                }
              }
            } else {
              // Recursively process nested objects/arrays
              updateTextInValue(obj[key], false);
            }
          }
        }
        return;
      }
    }

    // Determine if root is an array
    const isRootArray = Array.isArray(data);

    // Start recursive search from root
    updateTextInValue(data, isRootArray);

    if (found) {
      // Re-stringify with pretty formatting (2 spaces indentation)
      const updatedContent = JSON.stringify(data, null, 2) + "\n";
      return { updatedContent, found: true, lineNumber: foundLineNumber };
    }

    return { updatedContent: jsonContent, found: false, lineNumber: 0 };
  } catch (error) {
    // If JSON parsing fails, return unchanged
    return { updatedContent: jsonContent, found: false, lineNumber: 0 };
  }
}

export async function findAndUpdateComponent(
  componentId: string,
  originalText: string,
  newText: string,
  projectRoot: string = process.cwd()
): Promise<ComponentEditResult> {
  // First, search in subpages config files (TypeScript)
  const tsSearchPatterns = ["src/data/**/subpages/**/*.ts"];

  const tsFiles: string[] = [];
  for (const pattern of tsSearchPatterns) {
    const matches = await glob(pattern, {
      cwd: projectRoot,
      ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
    });
    tsFiles.push(...matches.map((f) => path.join(projectRoot, f)));
  }

  let componentFoundInTs = false;
  let tsFilePath: string | null = null;

  for (const filePath of tsFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Find component by componentId
      const component = findComponentInConfigFile(fileContent, componentId);

      if (component) {
        componentFoundInTs = true;
        tsFilePath = filePath;

        // Update text in the component
        const { updatedLines, found, lineNumber } = updateTextInComponent(
          component.lines,
          originalText,
          newText
        );

        if (found) {
          // Reconstruct file with updated content
          const lines = fileContent.split("\n");
          const newLines = [
            ...lines.slice(0, component.startLine),
            ...updatedLines,
            ...lines.slice(component.endLine + 1),
          ];

          return {
            success: true,
            filePath,
            lineNumber: component.startLine + lineNumber + 1, // 1-indexed for display
            updatedContent: newLines.join("\n"),
          };
        }
        // If component found but text not found, continue to search JSON files
        // (the text might be in a referenced JSON file)
      }
    } catch (error) {
      // Continue searching other files
      continue;
    }
  }

  // If component was found in TS but text wasn't, or if component wasn't found at all,
  // search in JSON FAQ files. The text might be in a JSON file referenced by the component.
  const jsonSearchPatterns = ["src/data/**/json/**/*.json"];

  const jsonFiles: string[] = [];
  for (const pattern of jsonSearchPatterns) {
    const matches = await glob(pattern, {
      cwd: projectRoot,
      ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
    });
    jsonFiles.push(...matches.map((f) => path.join(projectRoot, f)));
  }

  for (const filePath of jsonFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Try to update text in JSON file
      const { updatedContent, found, lineNumber } = updateTextInJsonFile(
        fileContent,
        originalText,
        newText
      );

      if (found) {
        return {
          success: true,
          filePath,
          lineNumber,
          updatedContent,
        };
      }
    } catch (error) {
      // Continue searching other files
      continue;
    }
  }

  // If we found the component in TS but not the text, and also didn't find it in JSON
  if (componentFoundInTs) {
    return {
      success: false,
      filePath: tsFilePath || undefined,
      errorMessage: `Found component with id "${componentId}" but could not find text "${originalText}" within it or in any referenced JSON files`,
    };
  }

  return {
    success: false,
    errorMessage: `Could not find component with id "${componentId}" or text "${originalText}" in any config or JSON files`,
  };
}

