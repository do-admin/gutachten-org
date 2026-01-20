/**
 * Shared slugify utility for both TypeScript and JavaScript files
 * Matches the logic in slug-utils.ts
 */

/**
 * Converts a string to a URL-friendly slug
 * Handles German umlauts (ä→ae, ö→oe, ü→ue, ß→ss)
 */
export function slugify(name) {
    if (!name) return "";

    return (
        name
            .toLowerCase()
            .trim()
            // Replace German umlauts and special characters
            .replace(/ä/g, "ae")
            .replace(/ö/g, "oe")
            .replace(/ü/g, "ue")
            .replace(/ß/g, "ss")
            // Replace spaces and multiple hyphens with single hyphen
            .replace(/[\s\-_]+/g, "-")
            // Remove any remaining special characters except hyphens
            .replace(/[^a-z0-9\-]/g, "")
            // Remove leading/trailing hyphens
            .replace(/^-+|-+$/g, "")
    );
}

/**
 * Slugify filename to ASCII-only (preserves extension)
 */
export function slugifyFilename(filename) {
    // Extract extension (simple string manipulation, no path module needed)
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
        // No extension, just slugify the whole thing
        return slugify(filename);
    }

    const ext = filename.substring(lastDotIndex);
    const nameWithoutExt = filename.substring(0, lastDotIndex);

    // Use slugify function, then add extension back
    return slugify(nameWithoutExt) + ext;
}

