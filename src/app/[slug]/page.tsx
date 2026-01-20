import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import { getPageDataWithContent, getCurrentSite } from "@/lib/config";
import { getNextJsMetadata } from "@/lib/metadata-loader";
import BlockRenderer from "@/components/BlockRenderer";
import { findInstanceBySlug, getInstanceSlug } from "@/lib/slug-utils";
import logger from "@/lib/logger";
import { StructuredData } from "@/components/StructuredData";
import multiPageConfig from "@/data/multi-page-config.json";
import { HeroImagePreload } from "@/components/utils/HeroImagePreload";
import { checkLlmTxtExists, readLlmTxt } from "@/lib/llm-txt-parser";
import { extractAllContent } from "@/lib/llm-txt-complete-parser";
import { Heading } from "@/components/blocks/Heading/Heading";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to parse programmatic page slug dynamically
function parseProgrammaticSlug(
  slug: string,
  currentSite: Record<string, unknown>
) {
  console.log(`🔍 [parseProgrammaticSlug] Input slug: "${slug}"`);

  const programmaticConfig = currentSite.programmatic as Record<
    string,
    unknown
  >;
  if (!programmaticConfig) {
    console.log(`❌ [parseProgrammaticSlug] No programmatic config found`);
    return null;
  }

  const programmaticInstances =
    (programmaticConfig.programmaticInstances as string[]) || [];
  const pages = (programmaticConfig.pages as string[]) || [];

  console.log(`📋 [parseProgrammaticSlug] Config:`, {
    instancesCount: programmaticInstances.length,
    pages,
  });

  // Generate URL patterns dynamically from slugToPageKeyMap configuration
  // This replaces hardcoded patterns with config-driven patterns
  // Patterns match: {slugKey}-{city} format (e.g., "nutzungsdauer-berlin")
  const slugToPageKeyMap =
    (programmaticConfig.slugToPageKeyMap as Record<string, string>) || {};

  // Sort keys by length (longest first) to match more specific patterns first
  // This ensures "restnutzungsdauer-gutachten" matches before "restnutzungsdauer"
  const sortedSlugKeys = Object.keys(slugToPageKeyMap).sort(
    (a, b) => b.length - a.length
  );

  const urlPatterns = sortedSlugKeys.map((slugKey) => ({
    pattern: new RegExp(
      `^${slugKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-(.+)$`,
      "i"
    ),
    pageKey: slugToPageKeyMap[slugKey],
  }));

  // Try to match slug against URL patterns
  for (const { pattern, pageKey } of urlPatterns) {
    const match = slug.match(pattern);
    if (match) {
      const citySlug = match[1];
      console.log(
        `🎯 [parseProgrammaticSlug] Matched pattern, citySlug: "${citySlug}", pageKey: "${pageKey}"`
      );

      // Find the city name by matching the slug
      const matchedInstance = findInstanceBySlug(
        citySlug,
        programmaticInstances
      );
      if (matchedInstance) {
        console.log(`✅ [parseProgrammaticSlug] Match found! Returning:`, {
          programmaticInstance: matchedInstance,
          pageKey: pageKey,
        });

        return {
          programmaticInstance: matchedInstance,
          pageKey: pageKey,
        };
      }
    }
  }

  // If no pattern matched, check if the slug itself is a city name (home route)
  // e.g., /Hamburg should render nutzungsdauer-city page
  const matchedInstance = findInstanceBySlug(slug, programmaticInstances);
  if (matchedInstance) {
    // Use the first page in the pages array as the default (usually "nutzungsdauer-city")
    const defaultPageKey = pages.length > 0 ? pages[0] : "nutzungsdauer-city";
    console.log(
      `✅ [parseProgrammaticSlug] Direct city match found! Returning:`,
      {
        programmaticInstance: matchedInstance,
        pageKey: defaultPageKey,
      }
    );

    return {
      programmaticInstance: matchedInstance,
      pageKey: defaultPageKey,
    };
  }

  console.log(
    `❌ [parseProgrammaticSlug] No programmatic page found for "${slug}"`
  );
  return null;
}

// Helper function to load lexicon JSON file
function loadLexikonJson(siteId: string): Array<{ term: string; definition: string }> {
  try {
    const lexikonDir = path.join(process.cwd(), "src", "data", siteId, "json", "lexikon");
    
    // Look for any JSON file in the lexikon directory
    if (!fs.existsSync(lexikonDir)) {
      logger.warn(`Lexikon directory not found at ${lexikonDir}`);
      return [];
    }
    
    const files = fs.readdirSync(lexikonDir);
    const jsonFile = files.find((file) => file.endsWith(".json") && file.includes("lexikon"));
    
    if (!jsonFile) {
      logger.warn(`No lexikon JSON file found in ${lexikonDir}`);
      return [];
    }
    
    const lexikonPath = path.join(lexikonDir, jsonFile);
    const fileContent = fs.readFileSync(lexikonPath, "utf-8");
    const lexikonData = JSON.parse(fileContent);
    
    // Extract only term and definition, matching the expected structure
    return lexikonData.map((item: { term: string; definition: string }) => ({
      term: item.term,
      definition: item.definition,
    }));
  } catch (error) {
    logger.error(`Error loading lexikon JSON for site ${siteId}:`, error);
    return [];
  }
}

// Grounding page component
async function GroundingPageContent({
  siteConfig,
}: {
  siteConfig: (typeof multiPageConfig.sites)[0];
}) {
  const baseUrl = siteConfig.domain?.startsWith("http")
    ? siteConfig.domain
    : `https://${siteConfig.domain}`;
  const siteUrl = baseUrl;

  // Check for llm.txt
  const llmTxtExists = checkLlmTxtExists();
  const llmTxtContent = llmTxtExists ? readLlmTxt() : null;
  if (!llmTxtExists) {
    logger.error(
      "Die llm.txt-Datei wurde im public/-Verzeichnis nicht gefunden. Diese Grounding-Seite kann ohne die Quelldatei nicht erstellt werden. Bitte generiere zuerst die llm.txt-Datei mit dem LLM_TXT_GENERATION_PROMPT unter data/prompts/LLM_TXT_GENERATION_PROMPT.md."
    );
    notFound();
  }

  // Extract ALL content if llm.txt exists
  let extractedContent = null;
  if (llmTxtContent) {
    extractedContent = extractAllContent(llmTxtContent);
  }

  // Load lexicon from JSON file
  const currentSite = getCurrentSite();
  const siteId = currentSite.id;
  const lexikonData = loadLexikonJson(siteId);
  
  // Override lexicon data from JSON if available
  if (extractedContent && lexikonData.length > 0) {
    extractedContent.lexikon = lexikonData;
  } else if (lexikonData.length > 0) {
    // If no extracted content but we have lexicon data, create minimal content structure
    extractedContent = {
      siteOverview: [],
      coreEntities: [],
      siteStructure: [],
      pageContent: [],
      faqContent: [],
      lexikon: lexikonData,
      articles: [],
      servicesFeatures: [],
      legalCompliance: [],
      contactOrganization: [],
    };
  }

  const siteName = siteConfig.name || "Gutachten.org";
  const generatedDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  return (
    <main className="container mx-24 flex max-w-[1180px] flex-col items-start pb-12">
      <article>
        <header>
          <Heading level={1} center={false}>
            Grounding-Informationen: {siteName}
          </Heading>
          <p>Erstellt am: {generatedDate}</p>
          <p>
            Website-URL: <a href={siteUrl}>{siteUrl}</a>
          </p>
        </header>

        {llmTxtExists && extractedContent ? (
          <>
            {extractedContent.siteOverview.length > 0 && (
              <section id="site-overview">
                <Heading level={2} center={false}>
                  Website-Übersicht
                </Heading>
                {extractedContent.siteOverview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            )}

            {extractedContent.coreEntities.length > 0 && (
              <section id="core-entities">
                <Heading level={2} center={false}>
                  Kern-Entitäten
                </Heading>
                {extractedContent.coreEntities.map((entity, idx) => (
                  <article key={idx} className="entity">
                    <Heading level={3} center={false}>
                      {entity.name}
                      {entity.type && ` (${entity.type})`}
                    </Heading>
                    <dl>
                      {entity.type && (
                        <>
                          <dt>Typ</dt>
                          <dd>{entity.type}</dd>
                        </>
                      )}
                      <dt className="font-bold">Beschreibung</dt>
                      <dd>
                        <p>{entity.description}</p>
                      </dd>
                      {entity.relationships.length > 0 && (
                        <>
                          <dt>Beziehungen</dt>
                          <dd>
                            <ul>
                              {entity.relationships.map((rel, relIdx) => (
                                <li key={relIdx}>{rel}</li>
                              ))}
                            </ul>
                          </dd>
                        </>
                      )}
                      {entity.context && (
                        <>
                          <dt>Kontext</dt>
                          <dd>{entity.context}</dd>
                        </>
                      )}
                    </dl>
                  </article>
                ))}
              </section>
            )}

            {extractedContent.siteStructure.length > 0 && (
              <section id="site-structure">
                <Heading level={2} center={false}>
                  Website-Struktur
                </Heading>
                {extractedContent.siteStructure.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            )}

            {extractedContent.pageContent.length > 0 && (
              <section id="page-content">
                <Heading level={2} center={false}>
                  Seiteninhalte
                </Heading>
                {extractedContent.pageContent.map((page, pageIdx) => (
                  <React.Fragment key={pageIdx}>
                    <Heading level={3} center={false}>
                      {page.pageTitle}
                    </Heading>
                    {page.paragraphs.map((para, paraIdx) => (
                      <p key={paraIdx}>{para}</p>
                    ))}
                  </React.Fragment>
                ))}
              </section>
            )}

            {extractedContent.faqContent.length > 0 && (
              <section id="faq-content">
                <Heading level={2} center={false}>
                  FAQ-Inhalte
                </Heading>
                {extractedContent.faqContent.map((faq, idx) => (
                  <article key={idx} className="faq-item">
                    <Heading level={3} center={false}>
                      {faq.question}
                    </Heading>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </section>
            )}

            {extractedContent.lexikon.length > 0 && (
              <section id="lexikon">
                <Heading level={2} center={false}>
                  Lexikon (Glossar)
                </Heading>
                <dl className="space-y-4">
                  {extractedContent.lexikon.map((term, idx) => (
                    <div key={idx}>
                      <dt className="font-bold">{term.term}</dt>
                      <dd>
                        <p>definition: {term.definition}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {extractedContent.articles.length > 0 && (
              <section id="articles">
                <Heading level={2} center={false}>
                  Artikel & Ratgeber
                </Heading>
                {extractedContent.articles.map((article, idx) => (
                  <article key={idx}>
                    <Heading level={3} center={false}>
                      {article.title}
                    </Heading>
                    <p>{article.content}</p>
                  </article>
                ))}
              </section>
            )}

            {extractedContent.servicesFeatures.length > 0 && (
              <section id="services-features">
                <Heading level={2} center={false}>
                  Services & Features
                </Heading>
                {extractedContent.servicesFeatures.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            )}

            {extractedContent.legalCompliance.length > 0 && (
              <section id="legal-compliance">
                <Heading level={2} center={false}>
                  Rechtliches & Compliance
                </Heading>
                {extractedContent.legalCompliance.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            )}

            {extractedContent.contactOrganization.length > 0 && (
              <section id="contact-organization">
                <Heading level={2} center={false}>
                  Kontakt & Organisation
                </Heading>
                {extractedContent.contactOrganization.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            )}
          </>
        ) : null}
      </article>
    </main>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { getCurrentSite } = await import("@/lib/config");
  const currentSite = getCurrentSite();
  const siteConfig = multiPageConfig.sites[0];
  const siteName = siteConfig.name || "Gutachten.org";

  // Handle grounding page
  if (slug === "grounding" || slug === "groundingpage") {
    const baseUrl = siteConfig.domain?.startsWith("http")
      ? siteConfig.domain
      : `https://${siteConfig.domain}`;

    return {
      title: `Grounding-Seite: ${siteName}`,
      description: `Umfassende Grounding-Informationen für ${siteName} - maschinenlesbare Fakten für KI-Systeme`,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${baseUrl}/grounding`,
      },
    };
  }

  // Check if this is a programmatic page
  const programmaticInfo = parseProgrammaticSlug(slug, currentSite);

  console.log(
    `📝 [generateMetadata] Slug: "${slug}", programmaticInfo:`,
    programmaticInfo
  );

  try {
    if (programmaticInfo) {
      // This is a programmatic page - pass programmaticInstance for SEO enhancement
      console.log(`📝 [generateMetadata] Calling getNextJsMetadata with:`, {
        pageKey: programmaticInfo.pageKey,
        programmaticInstance: programmaticInfo.programmaticInstance,
      });

      return await getNextJsMetadata(
        programmaticInfo.pageKey,
        {},
        {},
        {},
        programmaticInfo.programmaticInstance
      );
    } else {
      // This is a regular page
      console.log(
        `📝 [generateMetadata] Calling getNextJsMetadata with pageKey: "${slug}"`
      );
      return await getNextJsMetadata(slug);
    }
  } catch (error) {
    logger.error(
      `❌ [generateMetadata] Error loading metadata for ${slug}:`,
      error
    );
    return {
      title: "Page Not Found",
    };
  }
}

export async function generateStaticParams() {
  // Get subpages from the current site's structure
  const { getSiteStructure, getCurrentSite } = await import("@/lib/config");
  const siteStructure = getSiteStructure();
  const currentSite = getCurrentSite();

  const params: Array<{ slug: string }> = [];

  // Add regular pages only (not programmatic pages)
  if (siteStructure && siteStructure.pages) {
    Object.keys(siteStructure.pages).forEach((pageKey) => {
      params.push({ slug: pageKey });
    });
  }

  // Add programmatic pages (e.g., /hamburg, /berlin based on configured pages)
  const programmaticConfig = (currentSite as Record<string, unknown>)
    .programmatic as Record<string, unknown>;
  if (programmaticConfig) {
    const programmaticInstances =
      (programmaticConfig.programmaticInstances as string[]) || [];
    const slugStructure =
      (programmaticConfig.slugStructure as string) ||
      "{programmaticInstanceName}";

    // Generate programmatic pages for each instance
    // The page to load is determined by the "pages" array in config (defaults to "home")
    // Use slug utility to generate proper slugs with German character handling
    programmaticInstances.forEach((programmaticInstance) => {
      const slug = slugStructure.replace(
        "{programmaticInstanceName}",
        getInstanceSlug(programmaticInstance)
      );
      params.push({ slug });
    });
  }

  // Add grounding page and its common typo variant
  if (!params.some((p) => p.slug === "grounding")) {
    params.push({ slug: "grounding" });
  }
  if (!params.some((p) => p.slug === "groundingpage")) {
    params.push({ slug: "groundingpage" });
  }

  // For static export, we need to provide at least one param
  // If no subpages exist, return a placeholder that will show 404
  if (params.length === 0) {
    return [{ slug: "placeholder" }];
  }

  return params;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const { getCurrentSite } = await import("@/lib/config");
  const currentSite = getCurrentSite();
  const siteConfig = multiPageConfig.sites[0];

  // Handle grounding page (including "groundingpage" typo)
  if (slug === "grounding" || slug === "groundingpage") {
    return <GroundingPageContent siteConfig={siteConfig} />;
  }

  // Check if this is a programmatic page
  const programmaticInfo = parseProgrammaticSlug(slug, currentSite);

  console.log(
    `🔍 [DynamicPage] Parsing slug: "${slug}"`,
    programmaticInfo
      ? `→ Programmatic page for ${programmaticInfo.programmaticInstance}`
      : "→ Regular page"
  );

  let pageData;
  if (programmaticInfo) {
    // This is a programmatic page
    pageData = getPageDataWithContent(
      programmaticInfo.pageKey,
      programmaticInfo.programmaticInstance
    );
  } else {
    // This is a regular page
    pageData = getPageDataWithContent(slug);
  }

  if (!pageData || pageData.components.length === 0) {
    notFound();
  }

  // Build base URL
  const baseUrl = siteConfig.domain?.startsWith("http://www.")
    ? siteConfig.domain
    : `https://www.${siteConfig.domain}`;

  // Get page-specific metadata for description
  const pageMetadata = programmaticInfo
    ? await getNextJsMetadata(
        programmaticInfo.pageKey,
        {},
        {},
        {},
        programmaticInfo.programmaticInstance
      )
    : await getNextJsMetadata(slug);
  const pageDescription = pageMetadata?.description || siteConfig.description;

  // Build social URLs array
  const socialUrls = [];
  if (siteConfig.social?.facebook) socialUrls.push(siteConfig.social.facebook);
  if (siteConfig.social?.instagram)
    socialUrls.push(siteConfig.social.instagram);
  if (siteConfig.social?.linkedin) socialUrls.push(siteConfig.social.linkedin);

  // Pages that should use min-h-[100%] instead of min-h-screen
  const pagesWithMinHeight100 = [
    "energieausweis-anfrage",
    "grundrisszeichnung-anfrage",
    "kaufpreisaufteilung-anfrage",
    "nutzungsdauer-anfrage",
    "restnutzungsdauergutachten-ersteinschaetzung",
    "verkehrswertgutachten-anfrage",
  ];

  // Determine the min-height class based on the page slug
  const minHeightClass = pagesWithMinHeight100.includes(slug)
    ? "min-h-[100%]"
    : "min-h-screen";

  return (
    <>
      {/* Page-specific hero image preloading for LCP optimization */}
      <HeroImagePreload slug={slug} />


      <main className={minHeightClass}>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <BlockRenderer blocks={pageData.components} />
        {/* </Suspense> */}
      </main>
    </>
  );
}
