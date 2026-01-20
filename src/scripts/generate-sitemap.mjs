#!/usr/bin/env node

/**
 * Generate sitemap.xml for static Next.js export
 * This script discovers all static pages and generates a sitemap.xml file
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local", quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

// Set the site ID via environment variable (matches getCurrentSiteId logic)
// This is set during build time
let siteId = process.env.SITE_ID || process.env.NEXT_PUBLIC_SITE_ID;

// Load the multi-site config
const configPath = path.join(
  projectRoot,
  "src",
  "data",
  "multi-page-config.json"
);
const multiSiteConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

// Default to first site if SITE_ID not set (matches getCurrentSiteId logic)
if (!siteId) {
  siteId = multiSiteConfig.sites[0]?.id || "site-1";
}

const currentSite = multiSiteConfig.sites.find((site) => site.id === siteId);

if (!currentSite) {
  console.error(`Site with id ${siteId} not found`);
  process.exit(1);
}

// Get base URL
const baseUrl = currentSite.domain.startsWith("http://www.")
  ? currentSite.domain
  : `https://www.${currentSite.domain}`;

// Ensure base URL doesn't have trailing slash
const baseUrlClean = baseUrl.replace(/\/$/, "");

// Get site structure (pages from subpages directory)
function getSiteStructure() {
  const subpagesDir = path.join(projectRoot, "src", "data", siteId, "subpages");

  const pages = {};

  if (fs.existsSync(subpagesDir)) {
    const files = fs.readdirSync(subpagesDir);
    files.forEach((file) => {
      const filePath = path.join(subpagesDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && file.endsWith(".ts")) {
        const pageKey = file.replace(".ts", "");
        // Skip not-found page (Next.js 404 page, not a real route)
        if (pageKey === "not-found") {
          return;
        }
        pages[pageKey] = {
          path: pageKey === "home" ? "/" : `/${pageKey}`,
        };
      }
    });
  }

  // Fallback: add home page if no pages found
  if (Object.keys(pages).length === 0) {
    pages["home"] = {
      path: "/",
    };
  }

  return { pages };
}

// Get all article slugs using gray-matter (same as article-loader)
function getAllArticleSlugs() {
  const articlesDir = path.join(projectRoot, "src", "data", siteId, "articles");

  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  const files = fs.readdirSync(articlesDir);
  const slugs = [];

  files.forEach((file) => {
    if (file.endsWith(".md")) {
      try {
        const filePath = path.join(articlesDir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        // Validate required fields (same as article-loader)
        if (data.title && data.slug) {
          slugs.push(data.slug);
        } else {
          console.warn(
            `Article ${file} is missing required fields (title or slug)`
          );
        }
      } catch (error) {
        console.warn(`Error reading article file ${file}:`, error);
      }
    }
  });

  return slugs;
}
const SLUG_MAPPINGS = {
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
}
// Slug mappings (matches slug-utils.ts)

// Slugify function (matches slug-utils.ts)
function slugify(name) {
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

// Get instance slug (matches slug-utils.ts getInstanceSlug function)
function getInstanceSlug(instanceName) {
  // Check if there's a predefined mapping
  if (SLUG_MAPPINGS[instanceName]) {
    return SLUG_MAPPINGS[instanceName];
  }

  // Otherwise, generate slug automatically
  return slugify(instanceName);
}

// Collect all URLs
function collectUrls() {
  const siteStructure = getSiteStructure();
  const urls = [];

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Add home page (priority 1.0)
  urls.push({
    loc: `${baseUrlClean}/`,
    lastmod: today,
    changefreq: "weekly",
    priority: "1.0",
  });

  // Add regular pages from site structure
  if (siteStructure.pages) {
    Object.entries(siteStructure.pages).forEach(([pageKey, pageData]) => {
      // Skip home page (already added)
      if (pageKey === "home") return;

      // Skip pages that contain "-city" in the name
      if (pageKey.includes("-city")) return;

      // Check if page is enabled (if subpages config exists)
      const subpages = currentSite.subpages || {};
      const subpageConfig = subpages[pageKey];
      if (subpageConfig && subpageConfig.enabled === false) {
        return; // Skip disabled pages
      }

      const path = pageData.path;
      // Ensure trailing slash (since trailingSlash: true in next.config)
      const urlPath = path.endsWith("/") ? path : `${path}/`;

      urls.push({
        loc: `${baseUrlClean}${urlPath}`,
        lastmod: today,
        changefreq: "monthly",
        priority: "0.8",
      });
    });
  }

  // Add programmatic pages (e.g., /hamburg)
  const programmaticConfig = currentSite.programmatic;
  if (programmaticConfig) {
    const programmaticInstances =
      programmaticConfig.programmaticInstances || [];
    const slugStructure =
      programmaticConfig.slugStructure || "{programmaticInstanceName}";

    programmaticInstances.forEach((instance) => {
      const slug = slugStructure.replace(
        "{programmaticInstanceName}",
        getInstanceSlug(instance)
      );
      const urlPath = `/${slug}/`;

      urls.push({
        loc: `${baseUrlClean}${urlPath}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.9",
      });
    });
  }

  // Add nested programmatic pages (e.g., /nutzungsdauer-gutachten/hamburg)
  // Only generate for pages listed in slugToPageKeyMap keys
  if (programmaticConfig && siteStructure.pages) {
    const programmaticInstances =
      programmaticConfig.programmaticInstances || [];
    const slugToPageKeyMap = programmaticConfig.slugToPageKeyMap || {};

    // Use the keys from slugToPageKeyMap as the page keys
    Object.keys(slugToPageKeyMap).forEach((pageKey) => {
      // Check if page exists in site structure
      if (!siteStructure.pages[pageKey]) {
        return;
      }

      // Check if page is enabled
      const subpages = currentSite.subpages || {};
      const subpageConfig = subpages[pageKey];
      if (subpageConfig && subpageConfig.enabled === false) {
        return;
      }

      programmaticInstances.forEach((instance) => {
        const instanceSlug = getInstanceSlug(instance);
        const urlPath = `/${pageKey}/${instanceSlug}/`;

        urls.push({
          loc: `${baseUrlClean}${urlPath}`,
          lastmod: today,
          changefreq: "monthly",
          priority: "0.7",
        });
      });
    });
  }

  // Add /ratgeber page
  const ratgeberPage = siteStructure.pages?.ratgeber;
  if (ratgeberPage) {
    // Check if ratgeber page is enabled
    const subpages = currentSite.subpages || {};
    const subpageConfig = subpages.ratgeber;
    if (!subpageConfig || subpageConfig.enabled !== false) {
      urls.push({
        loc: `${baseUrlClean}/ratgeber/`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.8",
      });

      // Add all ratgeber articles
      const articleSlugs = getAllArticleSlugs();
      articleSlugs.forEach((slug) => {
        urls.push({
          loc: `${baseUrlClean}/ratgeber/${slug}/`,
          lastmod: today,
          changefreq: "monthly",
          priority: "0.6",
        });
      });
    }
  }

  // Add llm.txt if it exists
  const publicDir = path.join(projectRoot, "public");
  const llmTxtPath = path.join(publicDir, "llm.txt");
  if (fs.existsSync(llmTxtPath)) {
    urls.push({
      loc: `${baseUrlClean}/llm.txt`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.5",
    });
  }

  // Remove duplicates (by loc)
  const uniqueUrls = [];
  const seen = new Set();
  urls.forEach((url) => {
    if (!seen.has(url.loc)) {
      seen.add(url.loc);
      uniqueUrls.push(url);
    }
  });

  // Sort by priority (descending), then by path
  uniqueUrls.sort((a, b) => {
    const priorityDiff = parseFloat(b.priority) - parseFloat(a.priority);
    if (priorityDiff !== 0) return priorityDiff;
    return a.loc.localeCompare(b.loc);
  });

  return uniqueUrls;
}

// Generate XML
function generateXML(urls) {
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  urls.forEach((url) => {
    xmlLines.push("  <url>");
    xmlLines.push(`    <loc>${escapeXML(url.loc)}</loc>`);
    xmlLines.push(`    <lastmod>${url.lastmod}</lastmod>`);
    xmlLines.push(`    <changefreq>${url.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${url.priority}</priority>`);
    xmlLines.push("  </url>");
  });

  xmlLines.push("</urlset>");

  return xmlLines.join("\n");
}

// Escape XML special characters
function escapeXML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Main execution
try {
  console.log(`Generating sitemap.xml for site: ${siteId}`);
  console.log(`Base URL: ${baseUrlClean}`);

  const urls = collectUrls();
  console.log(`Found ${urls.length} URLs`);

  const xml = generateXML(urls);

  // Ensure public directory exists
  const publicDir = path.join(projectRoot, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap.xml
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf8");

  console.log(`✅ Sitemap generated successfully: ${sitemapPath}`);
  console.log(`   Total URLs: ${urls.length}`);
} catch (error) {
  console.error("Error generating sitemap:", error);
  process.exit(1);
}
