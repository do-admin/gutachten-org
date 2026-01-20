import multiSiteConfig from "@/data/multi-page-config.json";
import { getSubpageContent } from "./subpage-content";
import {
  loadLayoutData,
  LayoutData,
  getPreloadedLayoutData,
} from "./layout-loader";
import {
  createTemplateContext,
  processTemplateObject,
} from "./template-variables";
import { getInstanceSlug } from "./slug-utils";
import { NavigationConfig, NavigationItem } from "./types/navigation";
import { HeaderProps } from "@/components/blocks/Header/Header";
import { FooterProps } from "@/components/blocks/Footer/Footer";
import dotenv from "dotenv";
import logger from "./logger";

// Load environment variables from .env file
dotenv.config({ path: ".env.local", quiet: true });

export interface SubpageConfig {
  title: string;
  description: string;
  enabled: boolean;
}

export interface MultiSiteConfig {
  sites: Array<{
    id: string;
    name: string;
    description: string;
    domain: string;
    logo: {
      light: string;
      dark: string;
    };
    favicon: string;
    fonts: {
      primary: {
        name: string;
        fallback: string;
        weights: number[];
        display: string;
      };
      secondary: {
        name: string;
        fallback: string;
        weights: number[];
        display: string;
      };
      heading: {
        name: string;
        fallback: string;
        weights: number[];
        display: string;
      };
    };
    colors: Record<string, string>;
    layout?: {
      navigation?: string;
      footer?: string;
      cookieBanner?: string;
      contact?: string;
      social?: string;
      analytics?: string;
    };
    subpages?: {
      [key: string]:
        | {
            title: string;
            description: string;
            enabled: boolean;
          }
        | undefined;
    };
    content?: {
      hero: {
        title: string;
        subtitle: string;
        description: string;
        buttons: Array<{
          label: string;
          href: string;
          variant: string;
        }>;
        features: Array<{
          title: string;
          description: string;
        }>;
      };
      textImage: {
        title: string;
        content: string;
        image: string;
        imageAlt: string;
        features: Array<{
          title: string;
          description: string;
        }>;
      };
    };
    footer?: {
      tagline: string;
      description: string;
      ctaButton?: {
        text: string;
        href: string;
      };
      copyright: {
        text: string;
        year?: boolean;
      };
      attribution?: {
        text: string;
        link: string;
        linkText: string;
      };
    };
    cookieBanner?: {
      title?: string;
      description: string;
      acceptButton: {
        text: string;
        variant?:
          | "default"
          | "outline"
          | "secondary"
          | "ghost"
          | "link"
          | "destructive";
      };
      rejectButton: {
        text: string;
        variant?:
          | "default"
          | "outline"
          | "secondary"
          | "ghost"
          | "link"
          | "destructive";
      };
      position?: "bottom-left" | "bottom-right" | "bottom-center";
    };
  }>;
}

export interface SiteConfig {
  site: {
    name: string;
    description: string;
    url: string;
    logo: {
      light: string;
      dark: string;
    };
    favicon: string;
  };
  fonts: {
    primary: {
      name: string;
      fallback: string;
      weights: number[];
      display: string;
    };
    secondary: {
      name: string;
      fallback: string;
      weights: number[];
      display: string;
    };
    heading: {
      name: string;
      fallback: string;
      weights: number[];
      display: string;
    };
  };
  colors: Record<string, string>;
  navigation: NavigationConfig;
  header?: HeaderProps;
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      location: string;
      postalCode: string;
      country: string;
    };
  };
  social: Record<string, string>;
  analytics: {
    gaId?: string;
    gtmId?: string;
    enabled: boolean;
  };
  footer?: FooterProps;
  cookieBanner?: {
    title?: string;
    description: string;
    acceptButton: {
      text: string;
      variant?:
        | "default"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | "destructive";
    };
    rejectButton: {
      text: string;
      variant?:
        | "default"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | "destructive";
    };
    position?: "bottom-left" | "bottom-right" | "bottom-center";
  };
}

export interface SiteStructure {
  pages: {
    [key: string]: {
      path: string;
      components: Array<{
        type: string;
        props: Record<string, unknown>;
      }>;
    };
  };
}

// Template variable resolver
export function resolveTemplateVariables(
  template: unknown,
  data: unknown
): unknown {
  if (typeof template === "string") {
    // Check if the entire string is a template variable
    const templateMatch = template.match(/^\{\{([^}]+)\}\}$/);
    if (templateMatch) {
      const keys = templateMatch[1].trim().split(".");
      let value = data;

      for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
          value = (value as Record<string, unknown>)[key];
        } else {
          return template; // Return original if path not found
        }
      }

      return value !== undefined ? value : template;
    }

    // Handle simple string templates like "{{home.hero.title}}"
    return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const keys = path.trim().split(".");
      let value = data;

      for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
          value = (value as Record<string, unknown>)[key];
        } else {
          return match; // Return original if path not found
        }
      }

      return value !== undefined ? String(value) : match;
    });
  }

  if (Array.isArray(template)) {
    return template.map((item) => resolveTemplateVariables(item, data));
  }

  if (typeof template === "object" && template !== null) {
    const resolved: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(template)) {
      resolved[key] = resolveTemplateVariables(value, data);
    }
    return resolved;
  }

  return template;
}

// Get current site ID from environment or default to first site
function getCurrentSiteId(): string {
  return process.env.SITE_ID || multiSiteConfig.sites[0]?.id || "site-1";
}

// Get current site configuration
export function getCurrentSite() {
  const siteId = getCurrentSiteId();
  const config = multiSiteConfig.sites.find((site) => site.id === siteId);
  if (!config) {
    logger.error(`Site with id ${siteId} not found`);
    throw new Error(`Site with id ${siteId} not found`);
  }
  return config;
}

// Get resolved page data (dynamic approach using subpage content)
export function getPageData(pageKey: string): {
  path: string;
  components: Array<{
    type: string;
    contentRef?: string;
    props?: Record<string, unknown>;
  }>;
} {
  // Since we now use array-based subpage content, we don't need pageStructure
  // The page structure is implicitly defined by the components in the subpage JSON files
  return {
    path: `/${pageKey}`,
    components: [],
  };
}

// Get page data with resolved content for BlockRenderer
export function getPageDataWithContent(
  pageKey: string,
  programmaticInstance?: string
): {
  path: string;
  components: Array<{ type: string; props: Record<string, unknown> }>;
} {
  const siteId = getCurrentSiteId();
  const subpageContent = getSubpageContent(
    siteId,
    pageKey,
    programmaticInstance
  );

  if (!subpageContent || !Array.isArray(subpageContent)) {
    return {
      path: `/${pageKey}`,
      components: [],
    };
  }

  // Create template context with programmatic instance if provided
  const currentSite = getCurrentSite();
  const programmaticInstanceSlug = programmaticInstance
    ? getInstanceSlug(programmaticInstance)
    : undefined;
  const templateContext = createTemplateContext(
    currentSite,
    programmaticInstance,
    programmaticInstanceSlug
  );

  const resolvedComponents = subpageContent.map((component) => {
    const blockType = (component as unknown as Record<string, unknown>)
      .type as string;

    // Process component props with template variables
    const processedProps = processTemplateObject(
      component as unknown as Record<string, unknown>,
      templateContext
    );

    return {
      type: blockType,
      props: processedProps,
    };
  });

  return {
    path: `/${pageKey}`,
    components: resolvedComponents,
  };
}

// Get site configuration (converted from multi-site config)
export function getSiteConfig(): SiteConfig {
  const currentSite = getCurrentSite();
  const siteId = getCurrentSiteId();

  // Load layout data from TypeScript files synchronously
  let layoutData: LayoutData = {};
  if (currentSite.layout) {
    layoutData = getPreloadedLayoutData(siteId);
  }

  // Build navigation with enabled subpages
  const mainNavigation = [
    // Add navigation from layout data
    ...(layoutData.navigation?.main || []),
    // Add enabled subpages to navigation
    ...((currentSite as any).subpages
      ? Object.entries((currentSite as any).subpages)
          .filter(
            ([, config]) =>
              config &&
              typeof config === "object" &&
              "enabled" in config &&
              config.enabled
          )
          .map(([key, config]) => ({
            name: (config as SubpageConfig).title.split(" - ")[0], // Remove site name suffix
            href: `/${key}`,
            section: "navigation",
          }))
      : []),
  ];

  return {
    site: {
      name: currentSite.name,
      description: currentSite.description,
      url: currentSite.domain,
      logo: currentSite.logo,
      favicon: currentSite.favicon,
    },
    fonts: currentSite.fonts,
    colors: currentSite.colors,
    navigation: {
      main: mainNavigation,
      legal: layoutData.navigation?.legal || [],
    },
    ...(layoutData.header && { header: layoutData.header }),
    contact: (currentSite as any).contact || {
      email: "",
      phone: "",
      address: {
        street: "",
        location: "",
        postalCode: "",
        country: "",
      },
    },
    social: (currentSite as any).social || {},
    analytics: layoutData.analytics || {
      enabled: false,
    },
    ...(layoutData.footer && { footer: layoutData.footer }),
    cookieBanner: layoutData.cookieBanner?.enabled
      ? layoutData.cookieBanner
      : undefined,
  };
}

// Get site configuration with layout data loaded from TypeScript files
export async function getSiteConfigWithLayout(): Promise<SiteConfig> {
  const currentSite = getCurrentSite();
  const siteId = getCurrentSiteId();

  // Load layout data from TypeScript files
  let layoutData: LayoutData = {};
  if (currentSite.layout) {
    layoutData = await loadLayoutData(siteId, currentSite.layout);
  }

  // Build navigation with enabled subpages
  const mainNavigation = [
    // Add navigation from layout data
    ...(layoutData.navigation?.main || []),
    // Add enabled subpages to navigation
    ...((currentSite as any).subpages
      ? Object.entries((currentSite as any).subpages)
          .filter(
            ([, config]) =>
              config &&
              typeof config === "object" &&
              "enabled" in config &&
              config.enabled
          )
          .map(([key, config]) => ({
            name: (config as SubpageConfig).title.split(" - ")[0], // Remove site name suffix
            href: `/${key}`,
            section: "navigation",
          }))
      : []),
  ];

  return {
    site: {
      name: currentSite.name,
      description: currentSite.description,
      url: currentSite.domain,
      logo: currentSite.logo,
      favicon: currentSite.favicon,
    },
    fonts: currentSite.fonts,
    colors: currentSite.colors,
    navigation: {
      main: mainNavigation,
      legal: layoutData.navigation?.legal || [],
    },
    ...(layoutData.header && { header: layoutData.header }),
    contact: (currentSite as any).contact || {
      email: "",
      phone: "",
      address: {
        street: "",
        location: "",
        postalCode: "",
        country: "",
      },
    },
    social: (currentSite as any).social || {},
    analytics: layoutData.analytics || {
      enabled: false,
    },
    ...(layoutData.footer && { footer: layoutData.footer }),
    ...(layoutData.cookieBanner && { cookieBanner: layoutData.cookieBanner }),
  };
}

// Check if an image file exists in the public directory
function checkImageExists(imagePath: string): boolean {
  try {
    const fs = require("fs");
    const path = require("path");

    // Convert URL path to file system path
    const publicPath = path.join(process.cwd(), "public");
    const fullPath = path.join(publicPath, imagePath.replace(/^\//, ""));

    return fs.existsSync(fullPath);
  } catch (error) {
    logger.warn(`Error checking image existence for ${imagePath}:`, error);
    return false;
  }
}

// Get site structure (from subpage content)
export function getSiteStructure() {
  const siteId = getCurrentSiteId();
  const pages: Record<string, any> = {};

  try {
    // Dynamically load pages by reading the subpages directory
    const fs = require("fs");
    const path = require("path");

    // Build the path to the subpages directory
    const subpagesDir = path.join(
      process.cwd(),
      "src",
      "data",
      siteId,
      "subpages"
    );

    // Check if directory exists
    if (fs.existsSync(subpagesDir)) {
      // Read all files in the directory
      const files = fs.readdirSync(subpagesDir);

      // Filter for .ts files only (excluding directories)
      files.forEach((file: string) => {
        const filePath = path.join(subpagesDir, file);
        const stat = fs.statSync(filePath);

        // Only process files (not directories) with .ts extension
        if (stat.isFile() && file.endsWith(".ts")) {
          // Remove .ts extension to get the page key
          const pageKey = file.replace(".ts", "");

          pages[pageKey] = {
            path: pageKey === "home" ? "/" : `/${pageKey}`,
            components: [],
          };
        }
      });
    }
  } catch (error) {
    logger.warn(
      `Could not load pages from subpages directory for site ${siteId}:`,
      error
    );
  }

  // Fallback: add home page if no pages found
  if (Object.keys(pages).length === 0) {
    pages["home"] = {
      path: "/",
      components: [],
    };
  }

  return { pages };
}

// Additional utility functions from multi-page-config.ts
export function getAllMultiSites(): MultiSiteConfig["sites"][0][] {
  return multiSiteConfig.sites;
}

export function getMultiSiteByDomain(
  domain: string
): MultiSiteConfig["sites"][0] | null {
  return multiSiteConfig.sites.find((site) => site.domain === domain) || null;
}

export function getEnabledSubpages(siteId: string): {
  [key: string]: SubpageConfig;
} {
  const site = multiSiteConfig.sites.find((site) => site.id === siteId);
  if (!site || !(site as any).subpages) {
    return {};
  }

  return Object.fromEntries(
    Object.entries((site as any).subpages).filter(
      ([, config]) =>
        config &&
        typeof config === "object" &&
        "enabled" in config &&
        config.enabled
    )
  ) as { [key: string]: SubpageConfig };
}
