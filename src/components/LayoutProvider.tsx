//------------ not used right now ------------

"use client";

import { useEffect, useState } from "react";
import {
  getSiteConfigWithLayout,
  getSiteConfig,
  SiteConfig,
} from "@/lib/config";

interface LayoutProviderProps {
  children: React.ReactNode;
  fallbackConfig: SiteConfig;
}

export function LayoutProvider({
  children,
  fallbackConfig,
}: LayoutProviderProps) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(fallbackConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLayoutConfig() {
      try {
        const configWithLayout = await getSiteConfigWithLayout();
        setSiteConfig(configWithLayout);
      } catch (error) {
        console.error("Failed to load layout configuration:", error);
        // Keep using fallback config
      } finally {
        setIsLoading(false);
      }
    }

    loadLayoutConfig();
  }, []);

  // Return children with updated config context if needed
  // For now, we'll just return children since the layout components
  // will use the updated siteConfig from the state
  return <>{children}</>;
}

// Hook to get the current site config with layout data
export function useSiteConfigWithLayout(): {
  config: SiteConfig;
  isLoading: boolean;
} {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLayoutConfig() {
      try {
        const configWithLayout = await getSiteConfigWithLayout();
        setSiteConfig(configWithLayout);
      } catch (error) {
        console.error("Failed to load layout configuration:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLayoutConfig();
  }, []);

  return { config: siteConfig || getSiteConfig(), isLoading };
}
