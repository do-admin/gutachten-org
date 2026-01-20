import { getSiteConfig } from "./config";

/**
 * Common Google Fonts that work well with the system
 * Note: Any Google Font can be used, this is just a reference list
 */
export const COMMON_GOOGLE_FONTS = [
  "Inter",
  "JetBrains Mono",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Nunito",
  "Source Sans Pro",
  "Playfair Display",
  "Merriweather",
  "Crimson Text",
  "Fira Code",
  "IBM Plex Sans",
  "Work Sans",
  "DM Sans",
  "Space Grotesk",
  "Outfit",
  "Plus Jakarta Sans",
  "Manrope",
  "Jost",
] as const;

export type CommonGoogleFont = (typeof COMMON_GOOGLE_FONTS)[number];

/**
 * Get the current font configuration from site config
 */
export function getCurrentFontConfig() {
  const siteConfig = getSiteConfig();

  return {
    primary: {
      name: siteConfig.fonts.primary.name,
      fallback: siteConfig.fonts.primary.fallback,
      weights: siteConfig.fonts.primary.weights,
      display: siteConfig.fonts.primary.display,
    },
    secondary: {
      name: siteConfig.fonts.secondary.name,
      fallback: siteConfig.fonts.secondary.fallback,
      weights: siteConfig.fonts.secondary.weights,
      display: siteConfig.fonts.secondary.display,
    },
    heading: {
      name: siteConfig.fonts.heading.name,
      fallback: siteConfig.fonts.heading.fallback,
      weights: siteConfig.fonts.heading.weights,
      display: siteConfig.fonts.heading.display,
    },
  };
}

/**
 * Validate if a font name is a common Google Font
 * Note: This is just for reference - any Google Font name can be used
 */
export function isCommonGoogleFont(
  fontName: string
): fontName is CommonGoogleFont {
  return COMMON_GOOGLE_FONTS.includes(fontName as CommonGoogleFont);
}

/**
 * Convert font name to Google Fonts URL format
 */
export function formatFontNameForGoogleFonts(fontName: string): string {
  return fontName.replace(/\s+/g, "+");
}

/**
 * Get font fallback stack for a given font name
 */
export function getFontFallback(
  fontName: string,
  isMonospace: boolean = false
): string {
  if (isMonospace) {
    return 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace';
  }

  // Check if it's a serif font (common serif fonts)
  const serifFonts = [
    "Playfair Display",
    "Merriweather",
    "Crimson Text",
    "Times New Roman",
    "Georgia",
  ];
  const isSerif = serifFonts.some((serif) =>
    fontName.toLowerCase().includes(serif.toLowerCase())
  );

  if (isSerif) {
    return 'Georgia, "Times New Roman", Times, serif';
  }

  // Default to sans-serif fallback
  return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
}

/**
 * Get recommended font weights for a given font
 */
export function getRecommendedWeights(
  fontName: string,
  isMonospace: boolean = false
): number[] {
  if (isMonospace) {
    return [400, 500, 600, 700];
  }

  // Check if it's a serif font
  const serifFonts = ["Playfair Display", "Merriweather", "Crimson Text"];
  const isSerif = serifFonts.some((serif) =>
    fontName.toLowerCase().includes(serif.toLowerCase())
  );

  if (isSerif) {
    return [400, 600, 700];
  }

  // Default weights for most fonts
  return [400, 500, 600, 700];
}

// Generate Google Fonts URLs for static loading
export function generateFontCSS() {
  const siteConfig = getSiteConfig();

  // Convert font names to Google Fonts format
  const primaryFontName = formatFontNameForGoogleFonts(
    siteConfig.fonts.primary.name
  );
  const secondaryFontName = formatFontNameForGoogleFonts(
    siteConfig.fonts.secondary.name
  );
  const headingFontName = formatFontNameForGoogleFonts(
    siteConfig.fonts.heading.name
  );

  // Generate weights strings
  const primaryWeights = siteConfig.fonts.primary.weights.join(";");
  const secondaryWeights = siteConfig.fonts.secondary.weights.join(";");
  const headingWeights = siteConfig.fonts.heading.weights.join(";");

  // Generate Google Fonts URLs
  const primaryUrl = `https://fonts.googleapis.com/css2?family=${primaryFontName}:wght@${primaryWeights}&display=${siteConfig.fonts.primary.display}`;
  const secondaryUrl = `https://fonts.googleapis.com/css2?family=${secondaryFontName}:wght@${secondaryWeights}&display=${siteConfig.fonts.secondary.display}`;
  const headingUrl = `https://fonts.googleapis.com/css2?family=${headingFontName}:wght@${headingWeights}&display=${siteConfig.fonts.heading.display}`;

  return {
    primary: primaryUrl,
    secondary: secondaryUrl,
    heading: headingUrl,
  };
}

// Generate font preload links for static builds
export function getFontPreloadLinks() {
  const fontUrls = generateFontCSS();

  return [
    {
      rel: "preload",
      href: fontUrls.primary,
      as: "style",
    },
    {
      rel: "preload",
      href: fontUrls.secondary,
      as: "style",
    },
    {
      rel: "preload",
      href: fontUrls.heading,
      as: "style",
    },
  ];
}

// Generate CSS variables for fonts
export function getFontCSSVariables() {
  const siteConfig = getSiteConfig();

  return {
    "--font-primary": `'${siteConfig.fonts.primary.name}', ${siteConfig.fonts.primary.fallback}`,
    "--font-secondary": `'${siteConfig.fonts.secondary.name}', ${siteConfig.fonts.secondary.fallback}`,
    "--font-heading": `'${siteConfig.fonts.heading.name}', ${siteConfig.fonts.heading.fallback}`,
  };
}

// Get font class names for use in components (now using CSS variables)
export function getFontClasses() {
  return {
    primary: "font-primary",
    secondary: "font-secondary",
    heading: "font-heading",
  };
}
