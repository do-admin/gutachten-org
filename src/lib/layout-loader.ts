import { NavigationConfig } from "./types/navigation";
import { FooterProps } from "@/components/blocks/Footer/Footer";
import { HeaderProps } from "@/components/blocks/Header/Header";
import logger from "./logger";

export interface LayoutData {
  navigation?: NavigationConfig;
  header?: HeaderProps;
  footer?: FooterProps;
  cookieBanner?: {
    enabled: boolean;
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
  contact?: {
    email: string;
    phone: string;
    address: {
      street: string;
      location: string;
      postalCode: string;
      country: string;
    };
  };
  social?: Record<string, string>;
  analytics?: {
    gaId?: string;
    gtmId?: string;
    enabled: boolean;
  };
}

/**
 * Load layout data from TypeScript files for a specific site
 * This function uses static imports to avoid dynamic import issues with Turbopack
 */
export async function loadLayoutData(
  siteId: string,
  _layoutConfig: Record<string, string>
): Promise<LayoutData> {
  const layoutData: LayoutData = {};

  try {
    // Dynamically import layout data based on siteId
    const siteLayout = await import(`@/data/${siteId}/layout`);
    layoutData.navigation = siteLayout.navigation;
    layoutData.header = siteLayout.header as LayoutData["header"];
    layoutData.footer = siteLayout.footer;
    layoutData.cookieBanner = siteLayout.cookieBanner;
    layoutData.analytics = siteLayout.analytics;
  } catch (error) {
    logger.error(`Failed to load layout data for site ${siteId}:`, error);
  }

  return layoutData;
}

/**
 * Synchronous version for cases where async loading is not possible
 * This will return empty data and log a warning
 */
export function loadLayoutDataSync(
  siteId: string,
  _layoutConfig: Record<string, string>
): LayoutData {
  logger.warn(
    `Synchronous layout loading not supported for site ${siteId}. Use loadLayoutData() instead.`
  );
  return {};
}

/**
 * Pre-load layout data at build time and export it
 * This allows synchronous access to layout data
 */
export function getPreloadedLayoutData(siteId: string): LayoutData {
  try {
    // Dynamically import layout data based on siteId
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const layoutData = require(`@/data/${siteId}/layout`);
    return {
      navigation: layoutData.navigation,
      header: layoutData.header as LayoutData["header"],
      footer: layoutData.footer,
      cookieBanner: layoutData.cookieBanner,
      analytics: layoutData.analytics,
    };
  } catch (error) {
    logger.warn(`Failed to preload layout data for site ${siteId}:`, error);
  }

  return {};
}
