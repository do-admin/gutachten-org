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
  // This normalizes all whitespace (spaces, newlines, tabs) to single spaces
  // For HTML content, we strip HTML tags for comparison but preserve them in replacement
  const normalizeText = (text: string, stripHtml: boolean = false) => {
    let processed = text;
    // First replace literal \n with actual newline for matching
    processed = processed.replace(/\\n/g, "\n");
    // If stripHtml is true, remove HTML tags for comparison
    if (stripHtml) {
      processed = processed.replace(/<[^>]*>/g, "");
    }
    return processed.trim().replace(/\s+/g, " ");
  };

  // Check if newText contains HTML
  const containsHtml = /<[a-z][\s\S]*>/i.test(newText);
  const normalizedOriginal = normalizeText(originalText, containsHtml);

  // Create a flexible search pattern that matches words with any whitespace between them
  // This allows matching text even if whitespace differs (spaces vs newlines vs tabs vs literal \n)
  const createFlexiblePattern = (text: string) => {
    // Split text into words, treating any whitespace as separators
    // This creates a pattern that matches words with flexible whitespace between them
    const words = text.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) return null;

    // Build regex pattern: word + flexible whitespace + word + ...
    const patternParts = words.map((word, index) => {
      // Escape special regex characters
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Add flexible whitespace pattern after each word (except the last)
      if (index < words.length - 1) {
        // Match any whitespace sequence (spaces, newlines, tabs) OR literal \n sequence
        // This pattern matches: (whitespace OR literal backslash-n) one or more times
        // The pattern (?:\\s|\\\\n)+ matches any combination of whitespace and \n
        return escaped + "(?:\\s|\\\\n)+";
      }
      return escaped;
    });

    // Use word boundaries to ensure we match complete words, not substrings
    return new RegExp(patternParts.join(""), "gi");
  };

  const flexiblePattern = createFlexiblePattern(originalText);
  if (!flexiblePattern) {
    return { updatedLines: lines, found: false, lineNumber: 0 };
  }

  // Helper function to replace text while preserving whitespace structure
  const replaceWithPreservedWhitespace = (
    sourceText: string,
    originalText: string,
    newText: string
  ): string => {
    // Try to find all matches using the flexible pattern
    const allMatches = [...sourceText.matchAll(flexiblePattern)];
    if (allMatches.length === 0) return sourceText;

    // Find the match that corresponds to our text (by normalizing and comparing)
    const normalizedOriginalText = normalizeText(originalText);

    for (const match of allMatches) {
      const matchedText = match[0];
      const matchIndex = match.index || 0;

      // Normalize both to compare content (ignoring whitespace)
      const normalizedMatched = normalizeText(matchedText);

      // If the content matches (ignoring whitespace), replace the entire matched text
      if (normalizedMatched === normalizedOriginalText) {
        // Replace the entire matched text with the new text
        return (
          sourceText.substring(0, matchIndex) +
          newText +
          sourceText.substring(matchIndex + matchedText.length)
        );
      }
    }

    return sourceText;
  };

  // First, try to find the text in string literals within single lines
  // Handle both single-line and multi-line strings
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Normalize the line (including handling literal \n)
    const normalizedLine = normalizeText(line);

    // Normalize the line for comparison (strip HTML if needed)
    const normalizedLineForComparison = normalizeText(line, containsHtml);

    // Check if this line contains the original text (normalized)
    if (normalizedLineForComparison.includes(normalizedOriginal)) {
      // Try different quote patterns to find the exact match
      // Updated patterns to handle strings with newlines and literal \n
      const patterns = [
        // Double quotes - handles strings with newlines and literal \n
        // This pattern matches: property: "string content" where content can include \n
        /(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"/g,
        // Single quotes - handles strings with newlines and literal \n
        /(\w+)\s*:\s*'((?:[^'\\]|\\.)*)'/g,
        // Template literals - handles strings with newlines
        /(\w+)\s*:\s*`((?:[^`\\]|\\.)*)`/g,
      ];

      for (const pattern of patterns) {
        let match;
        // Reset regex lastIndex
        pattern.lastIndex = 0;
        while ((match = pattern.exec(line)) !== null) {
          const propertyValue = match[2];
          const normalizedValue = normalizeText(propertyValue, containsHtml);

          if (normalizedValue.includes(normalizedOriginal)) {
            // Replace the text within the string, preserving whitespace structure
            const updatedValue = replaceWithPreservedWhitespace(
              propertyValue,
              originalText,
              newText
            );

            // Only proceed if the replacement actually changed something
            if (updatedValue !== propertyValue) {
              // Determine the quote character used in the original match
              let quoteChar = match[0].includes('"')
                ? '"'
                : match[0].includes("'")
                  ? "'"
                  : "`";

              // CRITICAL FIX: If newText contains HTML and current quote is double quotes,
              // switch to template literals (backticks) to avoid quote conflicts
              if (
                containsHtml &&
                quoteChar === '"' &&
                /<[a-z][\s\S]*>/i.test(updatedValue)
              ) {
                quoteChar = "`";
              }

              // Escape the new text for the quote style being used
              let escapedValue = updatedValue;
              if (quoteChar === '"') {
                // Escape double quotes and backslashes
                escapedValue = escapedValue
                  .replace(/\\/g, "\\\\")
                  .replace(/"/g, '\\"');
              } else if (quoteChar === "'") {
                // Escape single quotes and backslashes
                escapedValue = escapedValue
                  .replace(/\\/g, "\\\\")
                  .replace(/'/g, "\\'");
              } else if (quoteChar === "`") {
                // For template literals, escape backticks and ${} expressions
                escapedValue = escapedValue
                  .replace(/\\/g, "\\\\")
                  .replace(/`/g, "\\`")
                  .replace(/\$\{/g, "\\${");
              }

              // Reconstruct the line with updated value, using the determined quote style
              const updatedLine = line.replace(
                match[0],
                `${match[1]}: ${quoteChar}${escapedValue}${quoteChar}`
              );

              const updatedLines = [...lines];
              updatedLines[i] = updatedLine;

              return { updatedLines, found: true, lineNumber: i };
            }
          }
        }
      }

      // If no pattern matched but text is in line, try direct replacement
      // This handles multiline strings or complex cases
      if (flexiblePattern.test(line)) {
        const updatedLine = replaceWithPreservedWhitespace(
          line,
          originalText,
          newText
        );

        if (updatedLine !== line) {
          const updatedLines = [...lines];
          updatedLines[i] = updatedLine;

          return { updatedLines, found: true, lineNumber: i };
        }
      }
    }
  }

  // Handle multiline strings - check across multiple lines
  // This is important for strings that span multiple lines or have literal \n
  for (let i = 0; i < lines.length - 1; i++) {
    const multiLineContent = lines
      .slice(i, Math.min(i + 10, lines.length))
      .join("\n");
    const normalizedMultiLine = normalizeText(multiLineContent, containsHtml);

    if (normalizedMultiLine.includes(normalizedOriginal)) {
      // Try to find and replace in multiline context
      const updatedMultiLine = replaceWithPreservedWhitespace(
        multiLineContent,
        originalText,
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

    // Check if newText contains HTML
    const containsHtml = /<[a-z][\s\S]*>/i.test(newText);

    // Normalize whitespace for comparison (handle \n in strings)
    const normalizeText = (text: string, stripHtml: boolean = false) => {
      let processed = text;
      // First replace literal \n with actual newline for matching
      processed = processed.replace(/\\n/g, "\n");
      // If stripHtml is true, remove HTML tags for comparison
      if (stripHtml) {
        processed = processed.replace(/<[^>]*>/g, "");
      }
      return processed.trim().replace(/\s+/g, " ");
    };
    const normalizedOriginal = normalizeText(originalText, containsHtml);

    // Create a flexible search pattern that matches words with any whitespace between them
    const createFlexiblePattern = (text: string) => {
      const words = text.trim().split(/\s+/).filter(Boolean);

      if (words.length === 0) return null;

      const patternParts = words.map((word, index) => {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (index < words.length - 1) {
          // Match any whitespace sequence (spaces, newlines, tabs) OR literal \n sequence
          return escaped + "(?:\\s|\\\\n)+";
        }
        return escaped;
      });
      return new RegExp(patternParts.join(""), "gi");
    };

    const flexiblePattern = createFlexiblePattern(originalText);
    if (!flexiblePattern) {
      return { updatedContent: jsonContent, found: false, lineNumber: 0 };
    }

    // Helper function to replace text while preserving whitespace structure
    const replaceWithPreservedWhitespace = (
      sourceText: string,
      originalText: string,
      newText: string
    ): string => {
      // Try to find all matches using the flexible pattern
      const allMatches = [...sourceText.matchAll(flexiblePattern)];
      if (allMatches.length === 0) return sourceText;

      // Find the match that corresponds to our text (by normalizing and comparing)
      const normalizedOriginalText = normalizeText(originalText);

      for (const match of allMatches) {
        const matchedText = match[0];
        const matchIndex = match.index || 0;

        // Normalize both to compare content (ignoring whitespace)
        const normalizedMatched = normalizeText(matchedText);

        // If the content matches (ignoring whitespace), replace the entire matched text
        if (normalizedMatched === normalizedOriginalText) {
          // Replace the entire matched text with the new text
          return (
            sourceText.substring(0, matchIndex) +
            newText +
            sourceText.substring(matchIndex + matchedText.length)
          );
        }
      }

      return sourceText;
    };

    let found = false;
    let foundLineNumber = 0;
    let currentArrayIndex = 0;

    // Recursively search and update all string values in the JSON structure
    function updateTextInValue(obj: any, isRootArray: boolean = false): void {
      if (typeof obj === "string") {
        const normalizedValue = normalizeText(obj, containsHtml);
        if (normalizedValue.includes(normalizedOriginal)) {
          const updated = replaceWithPreservedWhitespace(
            obj,
            originalText,
            newText
          );
          if (updated !== obj) {
            obj = updated;
            found = true;
            if (foundLineNumber === 0) {
              foundLineNumber = currentArrayIndex + 1;
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
            const normalizedValue = normalizeText(obj[i], containsHtml);
            if (normalizedValue.includes(normalizedOriginal)) {
              obj[i] = replaceWithPreservedWhitespace(
                obj[i],
                originalText,
                newText
              );
              found = true;
              if (foundLineNumber === 0) {
                foundLineNumber = i + 1;
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
              const normalizedValue = normalizeText(obj[key], containsHtml);
              if (normalizedValue.includes(normalizedOriginal)) {
                obj[key] = replaceWithPreservedWhitespace(
                  obj[key],
                  originalText,
                  newText
                );
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
