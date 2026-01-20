import { findInstanceBySlug } from "./slug-utils";

/**
 * Parse programmatic slug to extract page key and instance
 * This is a simplified version for grounding pages
 */
export function parseProgrammaticSlug(
  slug: string,
  currentSite: Record<string, unknown>
): { pageKey: string; programmaticInstance: string } | null {
  const programmaticConfig = currentSite.programmatic as Record<
    string,
    unknown
  >;
  if (!programmaticConfig) {
    return null;
  }

  const programmaticInstances =
    (programmaticConfig.programmaticInstances as string[]) || [];
  const slugToPageKeyMap =
    (programmaticConfig.slugToPageKeyMap as Record<string, string>) || {};

  // Sort keys by length (longest first) to match more specific patterns first
  const sortedSlugKeys = Object.keys(slugToPageKeyMap).sort(
    (a, b) => b.length - a.length
  );

  const urlPatterns = sortedSlugKeys.map((slugKey) => ({
    pattern: new RegExp(
      `^${slugKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-(.+)$`,
      "i"
    ),
    pageKey: slugToPageKeyMap[slugKey],
  }));

  // Try to match slug against URL patterns
  for (const { pattern, pageKey } of urlPatterns) {
    const match = slug.match(pattern);
    if (match) {
      const citySlug = match[1];
      const matchedInstance = findInstanceBySlug(
        citySlug,
        programmaticInstances
      );
      if (matchedInstance) {
        return {
          programmaticInstance: matchedInstance,
          pageKey: pageKey,
        };
      }
    }
  }

  // If no pattern matched, check if the slug itself is a city name
  const matchedInstance = findInstanceBySlug(slug, programmaticInstances);
  if (matchedInstance) {
    const pages = (programmaticConfig.pages as string[]) || [];
    const defaultPageKey = pages.length > 0 ? pages[0] : "nutzungsdauer-city";
    return {
      programmaticInstance: matchedInstance,
      pageKey: defaultPageKey,
    };
  }

  return null;
}
