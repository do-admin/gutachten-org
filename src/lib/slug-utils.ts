/**
 * Utility functions for generating URL-friendly slugs from German location names
 */

/**
 * Converts a German location name to a URL-friendly slug
 * Handles:
 * - Spaces → hyphens
 * - German umlauts (ä→ae, ö→oe, ü→ue, ß→ss)
 * - Lowercase conversion
 * - Special character removal
 *
 * @param name - The location name (e.g., "Calenberger Neustadt")
 * @returns URL-friendly slug (e.g., "calenberger-neustadt")
 *
 * @example
 * slugify("Calenberger Neustadt") // "calenberger-neustadt"
 * slugify("Isernhagen Süd") // "isernhagen-sued"
 * slugify("Groß-Buchholz") // "gross-buchholz"
 */
export function slugify(name: string): string {
  if (!name) return "";

  return (
    name
      .toLowerCase()
      .trim()
      // Replace German umlauts and special characters
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      // Replace spaces and multiple hyphens with single hyphen
      .replace(/[\s\-_]+/g, "-")
      // Remove any remaining special characters except hyphens
      .replace(/[^a-z0-9\-]/g, "")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}

/**
 * Predefined slug mappings for locations that need custom slugs
 * This allows exact control over URL structure when needed
 * Maps display names to URL-friendly slugs
 */
export const SLUG_MAPPINGS: Record<string, string> = {
  // Major cities (already handled by auto-slugify, but explicit for clarity)
  Berlin: "berlin",
  Hamburg: "hamburg",
  München: "muenchen",
  Köln: "koeln",
  Frankfurt: "frankfurt",
  Stuttgart: "stuttgart",
  Düsseldorf: "duesseldorf",
  Dortmund: "dortmund",
  Essen: "essen",
  Leipzig: "leipzig",
  Bremen: "bremen",
  Dresden: "dresden",
  Hannover: "hannover",
  Nürnberg: "nuernberg",
  Duisburg: "duisburg",
  Bochum: "bochum",
  Wuppertal: "wuppertal",
  Bielefeld: "bielefeld",
  Bonn: "bonn",
  Münster: "muenster",
  Karlsruhe: "karlsruhe",
  Mannheim: "mannheim",
  Augsburg: "augsburg",
  Wiesbaden: "wiesbaden",
  Gelsenkirchen: "gelsenkirchen",
  Mönchengladbach: "moenchengladbach",
  Braunschweig: "braunschweig",
  Chemnitz: "chemnitz",
  Kiel: "kiel",
  Aachen: "aachen",
  Halle: "halle",
  Magdeburg: "magdeburg",
  Freiburg: "freiburg",
  Krefeld: "krefeld",
  Lübeck: "luebeck",
  Oberhausen: "oberhausen",
  Erfurt: "erfurt",
  Mainz: "mainz",
  Rostock: "rostock",
  Kassel: "kassel",
  Hagen: "hagen",
  Hamm: "hamm",
  Saarbrücken: "saarbruecken",
  Mülheim: "muelheim",
  Potsdam: "potsdam",
  Ludwigshafen: "ludwigshafen",
  Oldenburg: "oldenburg",
  Leverkusen: "leverkusen",
  Osnabrück: "osnabrueck",
  Solingen: "solingen",
  Heidelberg: "heidelberg",
  Herne: "herne",
  Neuss: "neuss",
  Darmstadt: "darmstadt",
  Paderborn: "paderborn",
  Regensburg: "regensburg",
  Ingolstadt: "ingolstadt",
  Würzburg: "wuerzburg",
  Fürth: "fuerth",
  Wolfsburg: "wolfsburg",
  Ulm: "ulm",
  Heilbronn: "heilbronn",
  Pforzheim: "pforzheim",
  Göttingen: "goettingen",
  Bottrop: "bottrop",
  Trier: "trier",
  Recklinghausen: "recklinghausen",
  Reutlingen: "reutlingen",
  Bremerhaven: "bremerhaven",
  Koblenz: "koblenz",
  "Bergisch Gladbach": "bergisch-gladbach",
  Jena: "jena",
  Remscheid: "remscheid",
  Erlangen: "erlangen",
  Moers: "moers",
  Siegen: "siegen",
  Hildesheim: "hildesheim",
  Salzgitter: "salzgitter",
  "Frankfurt am Main": "frankfurt-am-main",
};

/**
 * Generates a slug for a programmatic instance name
 * Uses predefined mappings if available, otherwise generates slug automatically
 *
 * @param instanceName - The programmatic instance name
 * @returns URL-friendly slug
 */
export function getInstanceSlug(instanceName: string): string {
  // Check if there's a predefined mapping
  if (SLUG_MAPPINGS[instanceName]) {
    return SLUG_MAPPINGS[instanceName];
  }

  // Otherwise, generate slug automatically
  return slugify(instanceName);
}

/**
 * Finds a programmatic instance by its slug (case-insensitive)
 * Handles both predefined mappings and auto-generated slugs
 * Also handles URL-encoded special characters and direct city name matches
 *
 * @param slug - The URL slug to match (may be slugified like "muenchen" or original like "München")
 * @param instances - Array of programmatic instance names
 * @returns The matched instance name or undefined
 */
export function findInstanceBySlug(
  slug: string,
  instances: string[]
): string | undefined {
  if (!slug) return undefined;

  // Decode URL-encoded characters (e.g., %C3%BC -> ü)
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch (e) {
    // If decoding fails, use original slug
    decodedSlug = slug;
  }

  const normalizedSlug = decodedSlug.toLowerCase().trim();
  const slugifiedInput = slugify(decodedSlug).toLowerCase();

  // First, try to find by predefined mapping
  for (const [instanceName, mappedSlug] of Object.entries(SLUG_MAPPINGS)) {
    if (mappedSlug.toLowerCase() === normalizedSlug || mappedSlug.toLowerCase() === slugifiedInput) {
      return instanceName;
    }
  }

  // Then, try to find by auto-generated slug
  for (const instance of instances) {
    const instanceSlug = slugify(instance);
    // Match against both normalized input and slugified input
    if (
      instanceSlug.toLowerCase() === normalizedSlug ||
      instanceSlug.toLowerCase() === slugifiedInput
    ) {
      return instance;
    }
  }

  // Try case-insensitive direct match (for original city names like "München")
  const directMatch = instances.find(
    (instance) => instance.toLowerCase() === normalizedSlug
  );
  if (directMatch) {
    return directMatch;
  }

  // Finally, try matching slugified versions
  for (const instance of instances) {
    if (slugify(instance).toLowerCase() === slugifiedInput) {
      return instance;
    }
  }

  return undefined;
}
