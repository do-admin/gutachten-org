import { getCurrentSite } from "./config";
import type {
  PageMetadata,
  PageStructuredData,
  SubpageMetadata,
} from "./metadata-types";
import { Metadata } from "next";
import logger from "./logger";

/**
 * Normalize URL to include trailing slash when trailingSlash is enabled
 * Matches Next.js trailingSlash: true behavior
 */
function normalizeUrlWithTrailingSlash(url: string): string {
  if (!url) return url;
  
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    // Don't add trailing slash to root path
    if (pathname === "/") {
      return url;
    }
    
    // Add trailing slash if not present and pathname is not empty
    if (pathname && !pathname.endsWith("/")) {
      urlObj.pathname = pathname + "/";
      return urlObj.toString();
    }
    
    return url;
  } catch {
    // If URL parsing fails, try simple string manipulation for relative paths
    if (url.startsWith("/") && url !== "/" && !url.endsWith("/")) {
      return url + "/";
    }
    
    // Handle full URLs that failed to parse
    const urlMatch = url.match(/^(https?:\/\/[^\/]+)(\/.*)?$/);
    if (urlMatch) {
      const [, base, path] = urlMatch;
      if (!path || path === "/") {
        return url;
      }
      if (!path.endsWith("/")) {
        return base + path + "/";
      }
    }
    
    return url;
  }
}

/**
 * Get structured data for a specific page
 * Attempts to load from subpage file, returns empty object if not found
 */
export async function getPageStructuredData(
  pageKey: string
): Promise<PageStructuredData> {
  const currentSite = getCurrentSite();
  const siteId = currentSite.id || "nutzungsdauer";

  try {
    const module = await import(`@/data/${siteId}/subpages/${pageKey}`);
    if (module.metadata?.structuredData) {
      return module.metadata.structuredData;
    }
  } catch (error) {
    // No structured data found - this is expected for many pages
  }

  return {};
}

/**
 * Get Next.js metadata for a specific page (ASYNC)
 * Loads metadata from subpage files with fallback to legacy system
 */
export async function getNextJsMetadata(
  pageKey: string,
  additionalMetadata: any = {},
  additionalOpenGraph: any = {},
  additionalTwitter: any = {},
  programmaticInstance?: string
): Promise<Metadata> {
  const currentSite = getCurrentSite();
  const siteId = currentSite.id || "nutzungsdauer";
  const siteUrl = currentSite.domain || "https://example.com";

  console.log(`📚 [getNextJsMetadata] Called with:`, {
    pageKey,
    siteId,
    programmaticInstance,
  });

  // Try to load metadata from subpage file using dynamic import
  // If programmaticInstance is provided, try programmatic folder first
  try {
    let module: any = null;

    // Try programmatic override first if instance provided
    if (programmaticInstance) {
      try {
        const programmaticPath = `@/data/${siteId}/subpages/programmatic/${pageKey}`;
        console.log(
          `📚 [getNextJsMetadata] Trying programmatic file:`,
          programmaticPath
        );
        module = await import(
          `@/data/${siteId}/subpages/programmatic/${pageKey}`
        );
        console.log(`✅ [getNextJsMetadata] Found programmatic metadata`);
      } catch (programmaticError) {
        console.log(
          `⚠️ [getNextJsMetadata] No programmatic file, trying base file`
        );
        // No programmatic override, will fall back to base file
        module = null;
      }
    }

    // If no programmatic file found, try base file
    if (!module) {
      const basePath = `@/data/${siteId}/subpages/${pageKey}`;
      console.log(`📚 [getNextJsMetadata] Trying base file:`, basePath);
      module = await import(`@/data/${siteId}/subpages/${pageKey}`);
      console.log(`✅ [getNextJsMetadata] Found base metadata`);
    }

    if (module.metadata) {
      const subpageMetadata = module.metadata;
      console.log(
        `✅ [getNextJsMetadata] Metadata loaded successfully for "${pageKey}"`
      );

      // Process metadata with programmatic instance context if provided
      const processedMetadata = programmaticInstance
        ? processProgrammaticMetadata(
            subpageMetadata,
            programmaticInstance,
            currentSite
          )
        : subpageMetadata;

      // Build base URL
      const baseUrl = siteUrl.startsWith("http://")
        ? siteUrl
        : siteUrl.startsWith("https://")
          ? siteUrl
          : `https://${siteUrl}`;

      // Build canonical URL with programmatic instance if provided
      const programmaticSlug = programmaticInstance
        ? programmaticInstance.toLowerCase()
        : null;

      // Check if canonical is already a full URL - if so, use it directly without modification
      const isFullUrl =
        processedMetadata.canonical &&
        (processedMetadata.canonical.startsWith("http://") ||
          processedMetadata.canonical.startsWith("https://"));

      let canonicalPath: string;
      if (isFullUrl) {
        // If canonical is already a full URL, use it as-is (even for programmatic instances)
        canonicalPath = processedMetadata.canonical;
      } else if (programmaticSlug) {
        // For programmatic instances, prepend the slug to the relative path
        canonicalPath = `/${programmaticSlug}${processedMetadata.canonical || `/${pageKey}`}`;
      } else {
        // Use the canonical path as-is (relative path)
        canonicalPath = processedMetadata.canonical || `/${pageKey}`;
      }

      // Build final canonical URL - if it's already a full URL, use it directly, otherwise prepend baseUrl
      const canonicalUrl =
        canonicalPath &&
        (canonicalPath.startsWith("http://") ||
          canonicalPath.startsWith("https://"))
          ? canonicalPath
          : `${baseUrl}${canonicalPath}`;

      // Normalize canonical URL to include trailing slash (matching trailingSlash: true in next.config.ts)
      const normalizedCanonicalUrl = normalizeUrlWithTrailingSlash(canonicalUrl);
      
      // Normalize OpenGraph URL if provided
      const normalizedOpenGraphUrl = processedMetadata.openGraph?.url
        ? normalizeUrlWithTrailingSlash(processedMetadata.openGraph.url)
        : normalizedCanonicalUrl;

      return {
        title: processedMetadata.title,
        description: processedMetadata.description,
        authors: processedMetadata.authors || [
          { name: currentSite.name || "Author" },
        ],
        creator: processedMetadata.creator || currentSite.name,
        publisher: processedMetadata.publisher || currentSite.name,
        formatDetection: {
          email: false,
          address: false,
          telephone: false,
        },
        metadataBase: new URL(
          siteUrl.startsWith("http://") || siteUrl.startsWith("https://")
            ? siteUrl
            : `https://${siteUrl}`
        ),
        alternates: {
          canonical: normalizedCanonicalUrl,
        },
        openGraph: {
          title: processedMetadata.openGraph?.title || processedMetadata.title,
          description:
            processedMetadata.openGraph?.description ||
            processedMetadata.description,
          url: normalizedOpenGraphUrl,
          siteName: processedMetadata.openGraph?.siteName || currentSite.name,
          locale: processedMetadata.openGraph?.locale || "de_DE",
          type: (processedMetadata.openGraph?.type as any) || "website",
          images: processedMetadata.openGraph?.images || [],
          ...additionalOpenGraph,
        },
        twitter: {
          card:
            (processedMetadata.twitter?.card as any) || "summary_large_image",
          title: processedMetadata.twitter?.title || processedMetadata.title,
          description:
            processedMetadata.twitter?.description ||
            processedMetadata.description,
          images: processedMetadata.twitter?.images || [],
          ...additionalTwitter,
        },
        ...additionalMetadata,
      };
    }
  } catch (error) {
    // Subpage file doesn't exist or no metadata export, continue to fallback
    // No logging needed - this is expected for many pages
  }
  const error = `No metadata found for page: ${pageKey} on site: ${siteId}`;
  throw error;
}

/**
 * Process metadata with programmatic instance context
 * Enhances titles, descriptions, and URLs with location/instance information
 */
function processProgrammaticMetadata(
  metadata: SubpageMetadata,
  programmaticInstance: string,
  currentSite: any
): SubpageMetadata {
  const { processTemplate } = require("./template-variables");
  const { createTemplateContext } = require("./template-variables");
  const { getInstanceSlug } = require("./slug-utils");

  // Create template context with programmatic instance
  const programmaticInstanceSlug = programmaticInstance
    ? getInstanceSlug(programmaticInstance)
    : undefined;
  const context = createTemplateContext(
    currentSite,
    programmaticInstance,
    programmaticInstanceSlug
  );

  // Process title - add location context if not already present
  let title = processTemplate(metadata.title, context);
  if (!title.toLowerCase().includes(programmaticInstance.toLowerCase())) {
    // Add location to title for better local SEO
    title = `${title} in ${programmaticInstance}`;
  }

  // Process description - add local context
  let description = processTemplate(metadata.description, context);
  if (!description.toLowerCase().includes(programmaticInstance.toLowerCase())) {
    // Add local expertise statement
    if (description.length < 140) {
      description = `${description} Professionelle Dienstleistungen in ${programmaticInstance}. Lokale Expertise und individuelle Beratung.`;
    } else {
      description = `${description} Spezialisiert auf ${programmaticInstance}.`;
    }
  }

  // Process OpenGraph data
  const openGraph = metadata.openGraph
    ? {
        ...metadata.openGraph,
        title: metadata.openGraph.title
          ? processTemplate(metadata.openGraph.title, context)
          : title,
        description: metadata.openGraph.description
          ? processTemplate(metadata.openGraph.description, context)
          : description,
        url: metadata.openGraph.url
          ? processTemplate(metadata.openGraph.url, context)
          : undefined,
      }
    : undefined;

  // Process Twitter data
  const twitter = metadata.twitter
    ? {
        ...metadata.twitter,
        title: metadata.twitter.title
          ? processTemplate(metadata.twitter.title, context)
          : title,
        description: metadata.twitter.description
          ? processTemplate(metadata.twitter.description, context)
          : description,
        url: metadata.twitter.url
          ? processTemplate(metadata.twitter.url, context)
          : undefined,
      }
    : undefined;

  // Process canonical URL
  const canonical = metadata.canonical
    ? processTemplate(metadata.canonical, context)
    : undefined;

  return {
    ...metadata,
    title,
    description,
    canonical,
    openGraph,
    twitter,
  };
}

/**
 * Get all available page keys for the current site
 * @deprecated This function relies on the old metadata system and is deprecated.
 * Page keys should be defined in your site structure configuration.
 */
export function getAvailablePageKeys(): string[] {
  logger.warn(
    "getAvailablePageKeys is deprecated - use site structure configuration instead"
  );
  return [];
}

/**
 * Get site information for the current site
 * Returns the site configuration from getCurrentSite()
 */
export function getSiteInfo() {
  const currentSite = getCurrentSite();

  if (!currentSite) {
    logger.warn(`getSiteInfo - No site configuration found`);
    return null;
  }

  // Return site information from current site configuration
  return {
    name: currentSite.name,
    sitename: currentSite.name,
    url: currentSite.domain || "https://example.com",
    locale: "de-DE",
    defaultAuthor: currentSite.name,
    defaultCreator: currentSite.name,
    defaultPublisher: currentSite.name,
    slug: currentSite.id,
  };
}
