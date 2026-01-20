/**
 * Server-side utility to detect HTML in strings
 * This can be used in server components and during build time
 */

/**
 * Detects if a string contains HTML tags
 * Safe to use in server components
 */
export function containsHtml(text: string | unknown): boolean {
  if (!text || typeof text !== "string") return false;
  // Check for HTML tags (simple but effective)
  return /<[a-z][\s\S]*>/i.test(text);
}

/**
 * Scans an object recursively and marks which string properties contain HTML
 * Returns a map of property paths to boolean values
 */
export function detectHtmlInProps(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, boolean> {
  const htmlProps: Record<string, boolean> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      if (containsHtml(value)) {
        htmlProps[fullPath] = true;
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      // Recursively check nested objects
      const nestedHtml = detectHtmlInProps(
        value as Record<string, unknown>,
        fullPath
      );
      Object.assign(htmlProps, nestedHtml);
    } else if (Array.isArray(value)) {
      // Check array items
      value.forEach((item, index) => {
        if (typeof item === "string") {
          if (containsHtml(item)) {
            htmlProps[`${fullPath}[${index}]`] = true;
          }
        } else if (item && typeof item === "object") {
          const nestedHtml = detectHtmlInProps(
            item as Record<string, unknown>,
            `${fullPath}[${index}]`
          );
          Object.assign(htmlProps, nestedHtml);
        }
      });
    }
  }

  return htmlProps;
}

/**
 * Checks if a specific prop path contains HTML
 */
export function propContainsHtml(
  htmlPropsMap: Record<string, boolean>,
  propPath: string
): boolean {
  return htmlPropsMap[propPath] === true;
}


