// Dynamic imports for subpage content
// This file automatically discovers and loads subpage content at runtime

import { processTemplateObject } from "./template-processor";
import { createTemplateContext } from "./template-variables";
import { getCurrentSite } from "./config";
import { getInstanceSlug } from "./slug-utils";
import type { SubpageContent } from "./component-schemas";
import { validateSubpageContent } from "./component-schemas";
import logger from "./logger";

// Cache for dynamically loaded content
const contentCache: Record<string, Record<string, SubpageContent>> = {};

// Function to dynamically load subpage content with programmatic instance support
async function loadSubpageContent(
  siteId: string,
  pageKey: string,
  programmaticInstance?: string
): Promise<SubpageContent | null> {
  try {
    let content: any = null;
    let contentPath = "";

    // First, try to load programmatic content if programmatic instance is provided
    if (programmaticInstance) {
      try {
        contentPath = `@/data/${siteId}/subpages/programmatic/${pageKey}.ts`;
        content = await import(contentPath);
        // logger.log(`✅ Loaded programmatic content: ${contentPath}`);
      } catch (programmaticError) {
        logger.log(
          `[INFO]  No programmatic content found for ${pageKey}, falling back to default`
        );
        content = null;
      }
    }

    // If no programmatic content found, try default content
    if (!content) {
      try {
        contentPath = `@/data/${siteId}/subpages/${pageKey}.ts`;
        content = await import(contentPath);
        logger.log(`[INFO] Loaded default content: ${contentPath}`);
      } catch (defaultError) {
        logger.warn(
          `❌ Could not load subpage content for ${siteId}/subpages/${pageKey}:`,
          defaultError
        );
        return null;
      }
    }

    const rawContent = content.default as SubpageContent;

    // Process template variables in the content
    const currentSite = getCurrentSite();
    const programmaticInstanceSlug = programmaticInstance
      ? getInstanceSlug(programmaticInstance)
      : undefined;
    const templateContext = createTemplateContext(
      currentSite,
      programmaticInstance,
      programmaticInstanceSlug
    );
    const processedContent = processTemplateObject(
      rawContent,
      templateContext
    ) as SubpageContent;

    // Validate the processed content against component schemas
    const validation = validateSubpageContent(processedContent);
    if (!validation.valid) {
      // console.error(`Validation errors in ${contentPath}:`, validation.errors);
      // In development, you might want to throw an error here
      throw new Error(
        `Invalid subpage content: ${validation.errors.join(", ")}`
      );
    }

    return processedContent;
  } catch (error) {
    logger.warn(
      `Could not load subpage content for ${siteId}/subpages/${pageKey}:`,
      error
    );
    return null;
  }
}

// Function to get all available subpage files for a site
async function getAvailableSubpageFiles(siteId: string): Promise<string[]> {
  try {
    // Try common page names by attempting to import them
    const commonPageNames = [
      "contact",
      "faq",
      "pricing",
      "blog",
      "portfolio",
      "services",
      "about",
      "team",
      "testimonials",
      "gallery",
      "news",
      "events",
      "careers",
      "privacy",
      "terms",
      "support",
      "help",
      "documentation",
      "api",
      "home",
      "imprint",
      "legal",
      "cookies",
      "sitemap",
      "gesetze",
      "lexikon",
      "afa-rechner",
    ];

    const availablePages: string[] = [];

    // Try to import each possible page file from the subpages directory
    for (const page of commonPageNames) {
      try {
        await import(`@/data/${siteId}/subpages/${page}.ts`);
        availablePages.push(page);
      } catch {
        // Page doesn't exist, skip it
      }
    }

    return availablePages;
  } catch (error) {
    logger.warn(`Could not discover subpage files for ${siteId}:`, error);
    return [];
  }
}

// Function to get subpage content (synchronous version for backward compatibility)
export function getSubpageContent(
  siteId: string,
  pageKey: string,
  programmaticInstance?: string
): SubpageContent | null {
  // Create cache key that includes city if provided
  const cacheKey = programmaticInstance
    ? `${pageKey}_${programmaticInstance}`
    : pageKey;

  // Check cache first
  if (contentCache[siteId] && contentCache[siteId][cacheKey]) {
    return contentCache[siteId][cacheKey];
  }

  // For synchronous usage, we need to use require instead of dynamic import
  try {
    let content: any = null;
    let contentPath = `@/data/${siteId}/subpages/${pageKey}.ts`;

    // Strategy: Try to load programmatic content first if instance is provided
    // Programmatic content can import and compose base content using mergeProgrammaticContent()
    // This allows selective overrides without duplicating entire page configs
    if (programmaticInstance) {
      try {
        contentPath = `@/data/${siteId}/subpages/programmatic/${pageKey}.ts`;
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        content = require(contentPath);
        // console.log(
        //   `✅ Loaded programmatic content (may be composed with base): ${contentPath}`
        // );
      } catch (programmaticError) {
        // console.log(
        //   `[INFO]  No programmatic override for ${pageKey}, using base content with template variables`
        // );
        content = null;
      }
    }

    // If no programmatic content found, or not a programmatic instance, load base content
    if (!content) {
      try {
        contentPath = `@/data/${siteId}/subpages/${pageKey}.ts`;
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        content = require(contentPath);
        // logger.log(`✅ Loaded base content: ${contentPath}`);
      } catch (defaultError) {
        logger.warn(
          `❌ Could not load subpage content for ${siteId}/subpages/${pageKey}:`,
          defaultError
        );
        return null;
      }
    }

    const rawContent = content.default as SubpageContent;

    // Process template variables in the content
    const currentSite = getCurrentSite();
    const programmaticInstanceSlug = programmaticInstance
      ? getInstanceSlug(programmaticInstance)
      : undefined;
    const templateContext = createTemplateContext(
      currentSite,
      programmaticInstance,
      programmaticInstanceSlug
    );
    const processedContent = processTemplateObject(
      rawContent,
      templateContext
    ) as SubpageContent;

    // Validate the processed content against component schemas
    const validation = validateSubpageContent(processedContent);
    if (!validation.valid) {
      // console.error(`Validation errors in ${contentPath}:`, validation.errors);
      // In development, you might want to throw an error here
      // throw new Error(`Invalid subpage content: ${validation.errors.join(', ')}`);
    }

    // Cache the result
    if (!contentCache[siteId]) {
      contentCache[siteId] = {};
    }
    contentCache[siteId][cacheKey] = processedContent;

    return processedContent;
  } catch (error) {
    logger.warn(
      `Could not load subpage content for ${siteId}/subpages/${pageKey}:`,
      error
    );
    return null;
  }
}

// Async version for better error handling
export async function getSubpageContentAsync(
  siteId: string,
  pageKey: string,
  programmaticInstance?: string
): Promise<SubpageContent | null> {
  // Create cache key that includes city if provided
  const cacheKey = programmaticInstance
    ? `${pageKey}_${programmaticInstance}`
    : pageKey;

  // Check cache first
  if (contentCache[siteId] && contentCache[siteId][cacheKey]) {
    return contentCache[siteId][cacheKey];
  }

  const content = await loadSubpageContent(
    siteId,
    pageKey,
    programmaticInstance
  );

  if (content) {
    // Cache the result
    if (!contentCache[siteId]) {
      contentCache[siteId] = {};
    }
    contentCache[siteId][cacheKey] = content;
  }

  return content;
}

// Function to get all available subpages for a site
export async function getAvailableSubpages(siteId: string): Promise<string[]> {
  return await getAvailableSubpageFiles(siteId);
}

// Synchronous version for backward compatibility
export function getAvailableSubpagesSync(siteId: string): string[] {
  try {
    // Try common page names by attempting to import them
    const commonPageNames = [
      "contact",
      "faq",
      "pricing",
      "blog",
      "portfolio",
      "services",
      "about",
      "team",
      "testimonials",
      "gallery",
      "news",
      "events",
      "careers",
      "privacy",
      "terms",
      "support",
      "help",
      "documentation",
      "api",
      "home",
      "imprint",
      "legal",
      "cookies",
      "sitemap",
      "gesetze",
      "lexikon",
      "afa-rechner",
    ];

    const availablePages: string[] = [];

    // Try to import each possible page file from the subpages directory
    for (const page of commonPageNames) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require(`@/data/${siteId}/subpages/${page}.ts`);
        availablePages.push(page);
      } catch {
        // Page doesn't exist, skip it
      }
    }

    return availablePages;
  } catch (error) {
    logger.warn(`Could not discover subpage files for ${siteId}:`, error);
    return [];
  }
}
