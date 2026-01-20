/**
 * Utility functions for extracting headings from markdown content
 * Can be used on both server and client
 */

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Generate a URL-friendly ID from heading text
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Extract plain text from markdown for heading display
 */
function extractPlainText(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
    .replace(/\*([^*]+)\*/g, "$1") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
    .replace(/`([^`]+)`/g, "$1") // Remove inline code
    .trim();
}

/**
 * Extract headings from markdown content
 * Can be used on both server and client
 */
export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];
  let skipFirstHeading = true;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip the first H1 (usually the article title)
    if (trimmed.startsWith("# ") && skipFirstHeading) {
      skipFirstHeading = false;
      continue;
    }

    // Match headings (##, ###, ####, etc.)
    const match = trimmed.match(/^(#{2,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim();
      const plainText = extractPlainText(rawText);
      const id = generateId(plainText);

      headings.push({
        id,
        text: plainText,
        level,
      });
    }
  }

  return headings;
}

