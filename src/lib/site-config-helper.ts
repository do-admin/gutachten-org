import multiSiteConfig from "@/data/multi-page-config.json";
import { getCurrentSite } from "./config";
import { slugifyFilename as slugifyFilenameUtil } from "./slug-utils.mjs";
import { createComponent } from "./component-schemas";
import type { StructuredDataComponent } from "./component-schemas";

/**
 * Centralized configuration helper for subpage content
 * This allows subpage files to reuse data from multi-page-config.json
 */

export interface SiteConfigData {
  // Basic site information
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  siteDomain: string;

  // Branding
  logo: {
    light: string;
    dark: string;
  };
  favicon: string;

  // Contact information (if available in layout)
  contact?: {
    email: string;
    phone: string;
    address: {
      street: string;
      location: string;
      postalCode: string;
      country: string;
      region: string;
    };
  };

  // Social media links (if available in layout)
  social?: Record<string, string>;

  // Colors for theming
  colors: Record<string, string>;

  // Fonts
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
}

/**
 * Get centralized site configuration data
 */
export function getSiteConfigData(): SiteConfigData {
  const currentSite = getCurrentSite();

  return {
    siteName: currentSite.name,
    siteDescription: currentSite.description,
    siteUrl: currentSite.domain,
    siteDomain: currentSite.domain,
    logo: currentSite.logo,
    favicon: currentSite.favicon,
    colors: currentSite.colors,
    fonts: currentSite.fonts,
    // Extract contact and social from site config
    contact: (currentSite as any).contact,
    social: (currentSite as any).social,
  };
}

/**
 * Template variables that can be used in subpage content
 * These replace placeholders like {{siteName}}, {{siteUrl}}, etc.
 */
export function getTemplateVariables(
  programmaticInstance?: string
): Record<string, string> {
  const config = getSiteConfigData();
  const currentSite = getCurrentSite();

  const baseVariables = {
    // Site information
    siteName: config.siteName,
    siteDescription: config.siteDescription,
    siteUrl: config.siteUrl.startsWith("https://www.")
      ? config.siteUrl
      : `https://www.${config.siteUrl}`,
    siteDomain: config.siteDomain,

    // Assets
    logoLight: config.logo.light,
    logoDark: config.logo.dark,
    favicon: config.favicon,

    // Common paths
    imagesPath: `/images/${currentSite.id}`,
    homePath: "/",
    aboutPath: "/about",
    contactPath: "/contact",
    faqPath: "/faq",
    pricingPath: "/pricing",
    teamPath: "/team",

    // Common content
    companyName: config.siteName,
    companyDescription: config.siteDescription,
    companyUrl: config.siteUrl,

    // Contact info from site config
    contactEmail: config.contact?.email || "",
    contactPhone: config.contact?.phone || "",
    contactStreet: config.contact?.address?.street || "",
    contactLocation: config.contact?.address?.location || "",
    contactPostalCode: config.contact?.address?.postalCode || "",
    contactCountry: config.contact?.address?.country || "",
    contactRegion: config.contact?.address?.region || "",

    // Social media URLs from site config
    facebookUrl: config.social?.facebook || "",
    linkedinUrl: config.social?.linkedin || "",
    instagramUrl: config.social?.instagram || "",
  };

  // Add programmatic instance specific variables if provided
  if (programmaticInstance) {
    return {
      ...baseVariables,
      city: programmaticInstance,
      cityName: programmaticInstance,
      programmaticInstance: programmaticInstance,
      programmaticInstanceName: programmaticInstance,
      programmaticInstanceSlug: programmaticInstance.toLowerCase(),
      // City-specific URLs
      cityHomePath: `/${programmaticInstance.toLowerCase()}`,
      cityAboutPath: `/${programmaticInstance.toLowerCase()}/about`,
      cityContactPath: `/${programmaticInstance.toLowerCase()}/contact`,
      cityFaqPath: `/${programmaticInstance.toLowerCase()}/faq`,
      cityPricingPath: `/${programmaticInstance.toLowerCase()}/pricing`,
      cityTeamPath: `/${programmaticInstance.toLowerCase()}/team`,
      // City-specific map URL
      cityMapUrl: getCityMapEmbedUrl(programmaticInstance),
    };
  }

  return baseVariables;
}

/**
 * Replace template variables in a string
 */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string> = getTemplateVariables()
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
}

/**
 * Replace template variables in an object recursively
 */
export function replaceTemplateVariablesInObject(
  obj: any,
  variables: Record<string, string> = getTemplateVariables()
): any {
  if (typeof obj === "string") {
    return replaceTemplateVariables(obj, variables);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceTemplateVariablesInObject(item, variables));
  }

  if (obj && typeof obj === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceTemplateVariablesInObject(value, variables);
    }
    return result;
  }

  return obj;
}


/**
 * Slugify only the filename part of an image path (handles special characters like ä, ö, ü)
 * Converts special characters to ASCII equivalents (ä→ae, ö→oe, ü→ue, ß→ss)
 * This preserves the directory structure while making the filename URL-safe
 * Uses the shared slugifyFilename utility from slug-utils.mjs
 * @param imagePath - Image path (e.g., "/images/site/file-ä.png")
 * @returns Slugified path (e.g., "/images/site/file-ae.png")
 */
function slugifyImageFilename(imagePath: string): string {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const pathParts = imagePath.split("/");
  const filename = pathParts[pathParts.length - 1];

  // Only slugify if there's a filename with an extension (not just a directory path)
  if (filename && filename.includes(".")) {
    // Use shared slugifyFilename utility
    const slugifiedFilename = slugifyFilenameUtil(filename);
    const directory = pathParts.slice(0, -1).join("/");
    return directory
      ? `${directory}/${slugifiedFilename}`
      : `/${slugifiedFilename}`;
  }

  return imagePath;
}

/**
 * Get site-specific image paths
 * @param imagePath - Image path with optional {{siteId}} placeholder
 * @param siteId - Optional site ID override
 * @param slugify - Whether to slugify the filename for URL safety (default: true)
 * @returns Resolved image path with optional slugification
 */
export function getImagePath(
  imagePath: string,
  siteId?: string,
  slugify: boolean = true
): string {
  const currentSiteId = siteId || getCurrentSite().id;
  const resolvedPath = imagePath.replace("{{siteId}}", currentSiteId);

  // Slugify filename for URL-safe paths (converts ä→ae, ö→oe, ü→ue, ß→ss)
  return slugify ? slugifyImageFilename(resolvedPath) : resolvedPath;
}

/**
 * Get absolute URL for an image (for use in og:image, twitter:image, etc.)
 * Returns a full URL with the site domain prepended and filename slugified for URL safety
 * @param imagePath - Image path with optional {{siteId}} placeholder
 * @param siteId - Optional site ID override
 * @returns Full URL with slugified filename
 */
export function getAbsoluteImageUrl(
  imagePath: string,
  siteId?: string
): string {
  // Always slugify for URLs (meta tags, structured data, etc.)
  const slugifiedPath = getImagePath(imagePath, siteId, true);
  const templateVariables = getTemplateVariables();
  return `${templateVariables.siteUrl}${slugifiedPath}`;
}

/**
 * Generate optimized image paths (mobile and desktop) from a base image path
 * Automatically creates paths for -mobile and -desktop variants
 * Filenames are slugified for URL safety (converts special characters to ASCII)
 *
 * @param imagePath - Base image path (e.g., "/images/{{siteId}}/home/home-hero.webp")
 * @param siteId - Optional site ID override
 * @returns Object with src, mobileSrc, and desktopSrc paths (all with slugified filenames)
 *
 * @example
 * const paths = getOptimizedImagePaths("/images/{{siteId}}/home/home-hero.webp");
 * // Returns: {
 * //   src: "/images/gutachten-org/home/home-hero.webp",
 * //   mobileSrc: "/images/gutachten-org/home/home-hero-mobile.webp",
 * //   desktopSrc: "/images/gutachten-org/home/home-hero-desktop.webp"
 * // }
 */
export function getResponsiveOptimizedImagePaths(
  imagePath: string,
  siteId?: string
): {
  src: string;
  mobileSrc: string;
  desktopSrc: string;
} {
  // Get base path with slugification (for URL safety)
  const basePath = getImagePath(imagePath, siteId, true);

  // Extract path parts
  const lastDotIndex = basePath.lastIndexOf(".");
  if (lastDotIndex === -1) {
    // No extension found, return base path for all
    return {
      src: basePath,
      mobileSrc: basePath,
      desktopSrc: basePath,
    };
  }

  const pathWithoutExt = basePath.substring(0, lastDotIndex);
  const ext = basePath.substring(lastDotIndex);

  return {
    src: basePath,
    mobileSrc: `${pathWithoutExt}-mobile${ext}`,
    desktopSrc: `${pathWithoutExt}-desktop${ext}`,
  };
}

/**
 * Get programmatic instance aware paths
 */
export function getCityAwarePath(path: string, city?: string): string {
  if (!city) return path;
  return `/${city.toLowerCase()}${path}`;
}

/**
 * Get Google Maps embed URL for a specific city
 * Uses specific addresses for Berlin, Bremen, and Dresden
 * Uses city center for all other cities
 */
export function getCityMapEmbedUrl(cityName: string): string {
  // City-specific address mappings
  const cityAddresses: Record<string, string> = {
    Berlin: "Brunnenstraße 178, 10119 Berlin, Deutschland",
    Bremen: "Schwarmer Weg 4, 28277 Bremen, Deutschland",
    Dresden: "Plauenscher Ring 31, 01187 Dresden, Deutschland",
  };

  // Get address for specific cities, or use city center for others
  const address = cityAddresses[cityName] || `${cityName}, Deutschland`;

  // Generate Google Maps embed URL using the standard format (works without API key)
  // The q parameter works for both addresses and city names
  const encodedAddress = encodeURIComponent(address);

  // Using Google Maps embed URL format that works without API key
  // This format embeds a map showing the location
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed&hl=de&z=13`;
}

/**
 * Get the standardized Organization structured data for Gutachten.org
 * Based on information from llm.txt and company details
 * This function returns a complete StructuredDataComponent with all organization information
 * including the full OfferCatalog with all services
 */
export function getOrganizationStructuredData(): StructuredDataComponent {
  const templateVariables = getTemplateVariables();

  return createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-organization",
    schemaType: "organization",
    data: {
      name: "Gutachten.org",
      alternateName: "Evalion GmbH",
      legalName: "Evalion GmbH",
      description:
        "Digitale Plattform für Immobiliengutachten und Bewertungsdienstleistungen in Deutschland. Vermittlung und Erstellung von rechtssicheren Gutachten durch zertifizierte Sachverständige nach DIN ISO 17024. Spezialisiert auf Restnutzungsdauergutachten, Verkehrswertgutachten, Kaufpreisaufteilung und Energieausweise.",
      url: templateVariables.siteUrl,
      logo: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
      image: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
      sameAs: [
        templateVariables.facebookUrl,
        templateVariables.linkedinUrl,
        templateVariables.instagramUrl,
      ].filter(Boolean),
      address: {
        addressCountry: "DE",
        addressRegion: "Berlin",
        addressLocality: "Berlin",
        postalCode: "10119",
        streetAddress: "Brunnenstr. 178",
      },
      legalAddress: {
        addressCountry: "DE",
        addressRegion: "Niedersachsen",
        addressLocality: "Hannover",
        postalCode: "30159",
        streetAddress: "Köbelingerstraße 1",
      },
      contactPoint: {
        telephone: templateVariables.contactPhone || "+49 30 754 364 81",
        email: templateVariables.contactEmail || "support@gutachten.org",
        contactType: "customer service",
      },
      email: templateVariables.contactEmail || "support@gutachten.org",
      telephone: templateVariables.contactPhone || "+49 30 754 364 81",
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      serviceArea: {
        "@type": "Country",
        name: "Deutschland",
      },
      location: {
        addressCountry: "DE",
        addressRegion: "Berlin",
        addressLocality: "Berlin",
        postalCode: "10119",
        streetAddress: "Brunnenstr. 178",
      },
      foundingDate: "2020",
      foundingLocation: {
        "@type": "Place",
        name: "Berlin, Deutschland",
        address: {
          addressCountry: "DE",
          addressRegion: "Berlin",
          addressLocality: "Berlin",
          postalCode: "10119",
          streetAddress: "Brunnenstr. 178",
        },
      },
      founder: [
        {
          "@type": "Person",
          name: "Kolja Czudnochowski",
        },
        {
          "@type": "Person",
          name: "Gerrit J. Kolweyh",
        },
      ],
      mission:
        "Immobilieneigentümern durch professionelle Gutachten zu Steuerersparnis, fundierter Wertermittlung und rechtssicheren Dokumenten verhelfen. Verbindung von digitaler Effizienz mit zertifizierter Fachexpertise.",
      slogan: "Professionelle Immobiliengutachten - digital, zertifiziert, rechtssicher",
      priceRange: "$$",
      companyRegistration: {
        "@type": "Certification",
        name: "Handelsregister",
        identifier: "HRB 270864 B",
      },
      brand: {
        "@type": "Brand",
        name: "Gutachten.org",
        logo: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
      },
      knowsAbout: [
        "Immobiliengutachten",
        "Restnutzungsdauergutachten",
        "Verkehrswertgutachten",
        "Kaufpreisaufteilung",
        "Energieausweis",
        "Immobilienbewertung",
        "AfA-Abschreibung",
        "Steueroptimierung",
        "ImmoWertV",
        "DIN ISO 17024",
        "Sachverständige",
        "Immobilienwertermittlung",
      ],
      knowsLanguage: ["de", "de-DE", "German"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Immobiliengutachten-Dienstleistungen",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Restnutzungsdauergutachten",
              description:
                "Bautechnisches Gutachten zur Ermittlung der tatsächlichen verbleibenden Nutzungsdauer gemäß § 7 Abs. 4 Satz 2 EStG. Ermöglicht kürzere Abschreibungsdauer als die gesetzliche Pauschale und führt zu höherer jährlicher AfA sowie steuerlicher Entlastung. Erstellt von zertifizierten Sachverständigen nach DIN ISO 17024.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Verkehrswertgutachten",
              description:
                "Gerichtsfestes Vollgutachten zur Ermittlung des Verkehrswerts (Marktwerts) gemäß § 194 BauGB nach ImmoWertV. Umfassende Wertermittlung für Scheidung, Erbschaft, Finanzamt, Verkauf und Finanzierung. Erstellt durch unabhängige, zertifizierte Sachverständige.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kaufpreisaufteilung",
              description:
                "Fachliche Aufteilung des Kaufpreises in Boden- und Gebäudewert zur steuerlichen Optimierung. Nachweis eines angemessenen Gebäudeanteils gegenüber dem Finanzamt, der oft höher liegt als die pauschale Berechnung der Finanzverwaltung. Erhöht die AfA-Bemessungsgrundlage und führt zu mehr Steuerersparnis.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Energieausweis",
              description:
                "Gesetzlich vorgeschriebenes Dokument zur Bewertung der Energieeffizienz von Gebäuden. Erforderlich bei Verkauf, Vermietung oder Verpachtung. Erstellung von Verbrauchs- und Bedarfsausweisen durch qualifizierte Energie-Experten nach Gebäudeenergiegesetz (GEG). Gültig für 10 Jahre.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Wertermittlung",
              description:
                "Fachliche Marktwertermittlung von zertifizierten Sachverständigen nach ImmoWertV. Anwendung von Vergleichswert-, Ertragswert- oder Sachwertverfahren je nach Immobilienart. Für Verkauf, Kauf, Beleihung oder andere individuelle Zwecke.",
            },
          },
        ],
      },
    },
  });
}
