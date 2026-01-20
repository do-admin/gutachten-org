import { navigation } from "@/data/gutachten-org/layout/navigation";
import { footer } from "@/data/gutachten-org/layout/footer";
import multiSiteConfig from "@/data/multi-page-config.json";
import { getPageDataWithContent } from "./config";
import { getInstanceSlug } from "./slug-utils";

export interface ExtractedLink {
  label: string;
  href: string;
  isExternal: boolean;
  category?: string;
}

/**
 * Determines if a URL is external (absolute URL) or internal (relative path)
 */
function isExternalUrl(href: string): boolean {
  if (!href) return false;
  // Check for protocol (http://, https://, mailto:, tel:, etc.)
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href)) {
    return true;
  }
  return false;
}

/**
 * Extract all links from navigation configuration
 */
function extractNavigationLinks(): ExtractedLink[] {
  const links: ExtractedLink[] = [];

  // Main navigation links
  navigation.main.forEach((item) => {
    links.push({
      label: item.name,
      href: item.href,
      isExternal: isExternalUrl(item.href),
      category: "Navigation",
    });
  });

  // Legal navigation links
  navigation.legal.forEach((item) => {
    links.push({
      label: item.name,
      href: item.href,
      isExternal: isExternalUrl(item.href),
      category: "Legal",
    });
  });

  return links;
}

/**
 * Extract all links from footer configuration
 */
function extractFooterLinks(): ExtractedLink[] {
  const links: ExtractedLink[] = [];

  // Footer sections
  if (footer.sections) {
    footer.sections.forEach((section) => {
      if (section.links) {
        section.links.forEach((link) => {
          links.push({
            label: link.label || link.href,
            href: link.href,
            isExternal: link.isExternal || isExternalUrl(link.href),
            category: section.title || "Footer",
          });
        });
      }
    });
  }

  // Social links
  if (footer.socialLinks) {
    footer.socialLinks.forEach((socialLink) => {
      links.push({
        label: socialLink.ariaLabel || socialLink.platform || socialLink.href,
        href: socialLink.href,
        isExternal: true, // Social links are always external
        category: "Social",
      });
    });
  }

  return links;
}

/**
 * Extract links from subpages configuration
 */
function extractSubpageLinks(): ExtractedLink[] {
  const links: ExtractedLink[] = [];
  const currentSite = multiSiteConfig.sites.find(
    (site) => site.id === "gutachten-org"
  );

  if (!currentSite?.subpages) {
    return links;
  }

  Object.entries(currentSite.subpages).forEach(([key, config]) => {
    if (config && typeof config === "object" && config.enabled) {
      links.push({
        label: config.title.split(" - ")[0], // Remove site name suffix
        href: `/${key}`,
        isExternal: false,
        category: "Pages",
      });
    }
  });

  return links;
}

/**
 * Extract links from programmatic instances
 */
function extractProgrammaticLinks(): ExtractedLink[] {
  const links: ExtractedLink[] = [];
  const currentSite = multiSiteConfig.sites.find(
    (site) => site.id === "gutachten-org"
  );

  if (!currentSite?.programmatic) {
    return links;
  }

  const programmaticInstances =
    currentSite.programmatic.programmaticInstances || [];
  const slugStructure =
    currentSite.programmatic.slugStructure || "{programmaticInstanceName}";

  programmaticInstances.forEach((instance) => {
    const slug = slugStructure.replace(
      "{programmaticInstanceName}",
      getInstanceSlug(instance)
    );
    links.push({
      label: instance,
      href: `/${slug}`,
      isExternal: false,
      category: "Programmatic",
    });
  });

  // Also check for nested programmatic pages if they exist
  const programmaticPages = currentSite.programmatic.programmaticPages || [];
  programmaticPages.forEach((page) => {
    const pageKey = page.pageKey || "";
    programmaticInstances.forEach((instance) => {
      const instanceSlug = getInstanceSlug(instance);
      const pageSlug = page.slugStructure
        ? page.slugStructure.replace("{programmaticInstanceName}", instanceSlug)
        : `${pageKey}-${instanceSlug}`;
      links.push({
        label: `${page.title || pageKey} - ${instance}`,
        href: `/${pageKey}/${pageSlug}`,
        isExternal: false,
        category: "Programmatic",
      });
    });
  });

  return links;
}

/**
 * Extract all available links from the application configuration
 * @returns Array of extracted links with label, href, and external flag
 */
export function extractAllLinks(): ExtractedLink[] {
  const links: ExtractedLink[] = [];

  // Extract from different sources
  links.push(...extractNavigationLinks());
  links.push(...extractFooterLinks());
  links.push(...extractSubpageLinks());
  links.push(...extractProgrammaticLinks());

  // Remove duplicates based on href
  const uniqueLinks = new Map<string, ExtractedLink>();
  links.forEach((link) => {
    if (!uniqueLinks.has(link.href)) {
      uniqueLinks.set(link.href, link);
    } else {
      // If duplicate, prefer the one with a better label
      const existing = uniqueLinks.get(link.href)!;
      if (link.label.length > existing.label.length) {
        uniqueLinks.set(link.href, link);
      }
    }
  });

  // Sort by category, then by label
  return Array.from(uniqueLinks.values()).sort((a, b) => {
    if (a.category !== b.category) {
      return (a.category || "").localeCompare(b.category || "");
    }
    return a.label.localeCompare(b.label);
  });
}

/**
 * Get links formatted for dropdown display
 * Groups links by category for better UX
 */
export function getLinksForDropdown(): {
  categories: Array<{
    name: string;
    links: ExtractedLink[];
  }>;
  allLinks: ExtractedLink[];
} {
  const allLinks = extractAllLinks();
  const categories = new Map<string, ExtractedLink[]>();

  allLinks.forEach((link) => {
    const category = link.category || "Other";
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(link);
  });

  return {
    categories: Array.from(categories.entries()).map(([name, links]) => ({
      name,
      links,
    })),
    allLinks,
  };
}
