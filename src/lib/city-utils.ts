// City-specific utility functions for navigation and routing

import { usePathname } from "next/navigation";
import { NavigationItem } from "./types/navigation";

export interface CityContext {
  city?: string;
  isCityPage: boolean;
}

/**
 * Extracts city context from the current pathname
 * Returns city name if on a city page, undefined otherwise
 */
export function getCityFromPathname(pathname: string): CityContext {
  const segments = pathname.split("/").filter(Boolean);

  // Check if this is a city page (starts with /city/[city])
  if (segments.length >= 2 && segments[0] === "city") {
    return {
      city: segments[1],
      isCityPage: true,
    };
  }

  return {
    city: undefined,
    isCityPage: false,
  };
}

/**
 * Creates city-aware navigation URLs
 * If on a city page, prepends city to all navigation URLs
 */
export function createCityAwareNavigation(
  navigation: NavigationItem[],
  city?: string
): NavigationItem[] {
  if (!city) {
    return navigation;
  }

  return navigation.map((item) => ({
    ...item,
    href: `/city/${city}${item.href}`,
    children: item.children?.map((child) => ({
      ...child,
      href: `/city/${city}${child.href}`,
    })),
  }));
}

/**
 * Creates city-aware page URLs
 * If on a city page, prepends city to the URL
 */
export function createCityAwareUrl(href: string, city?: string): string {
  if (!city) {
    return href;
  }

  // Remove leading slash if present
  const cleanHref = href.startsWith("/") ? href.slice(1) : href;
  return `/city/${city}/${cleanHref}`;
}

/**
 * Hook to get current city context (for client components)
 */
export function useCityContext(): CityContext {
  const pathname = usePathname();
  return getCityFromPathname(pathname);
}
