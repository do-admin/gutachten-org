import type {
  HeroComponent,
  SubpageContent,
  StructuredDataComponent,
  LexikonComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
// Icons are now referenced by string names instead of importing components
import lexiconDataRaw from "../json/lexikon/gutachten-lexikon.json";
import {
  getTemplateVariables,
  getImagePath,
  getAbsoluteImageUrl,
} from "@/lib/site-config-helper";
import { BookOpen } from "lucide-react";
import type { LexikonEntryItem } from "@/components/blocks/Lexikon";

// Type assertion for lexicon data - now it's an array
const lexiconData = lexiconDataRaw as LexikonEntryItem[];

// Get template variables for this site
const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Immobilienlexikon Gutachten und Bewertung - Gutachten.org",
  description:
    "Das große Immobilienlexikon für Eigentümer & Investoren: Alle Begriffe zu Gutachten, Bewertung, Steuern & AfA verständlich erklärt.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/lexikon/",
  openGraph: {
    title: "Immobilienlexikon Gutachten und Bewertung - Gutachten.org",
    description:
      "Das große Immobilienlexikon für Eigentümer & Investoren: Alle Begriffe zu Gutachten, Bewertung, Steuern & AfA verständlich erklärt.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/lexikon/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobilienlexikon Gutachten und Bewertung - Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Immobilienlexikon Gutachten und Bewertung - Gutachten.org",
    description:
      "Das große Immobilienlexikon für Eigentümer & Investoren: Alle Begriffe zu Gutachten, Bewertung, Steuern & AfA verständlich erklärt.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobilienlexikon Gutachten und Bewertung - Gutachten.org",
      },
    ],
  },
};

const lexikonContent: SubpageContent = validateContent([
  // Breadcrumb structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-breadcrumb",
    schemaType: "breadcrumb",
    data: {
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: templateVariables.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lexikon",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-article",
    schemaType: "article",
    data: {
      headline: `Lexikon - Immobilien-Gutachten Begriffe | ${templateVariables.siteName}`,
      description:
        "Umfassendes Lexikon zu allen wichtigen Begriffen rund um Immobilien-Gutachten, Wertermittlung, Abschreibung und Restnutzungsdauer. Verständliche Erklärungen für Vermieter, Eigentümer und Investoren.",
      image: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
      author: {
        "@type": "Organization",
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
      },
      publisher: {
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
        logo: {
          url: getImagePath("/images/{{siteId}}/logo/{siteId}-dark.png"),
          width: 200,
          height: 60,
        },
      },
      datePublished: new Date().toISOString().split("T")[0],
      dateModified: new Date().toISOString().split("T")[0],
    },
  }),
  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-lexikon",
    layout: "document",
    h1Text: "Lexikon",
    titleClassName: "text-start m-0!",
  }),
  createComponent<LexikonComponent>({
    type: "Lexikon",
    id: "lexikon-content",
    title: "Lexikon: Immobilien-Gutachten Begriffe",
    subtitle: `Über ${lexiconData.length} Begriffe aus der Welt der Immobilien-Gutachten, Wertermittlung, Abschreibung und Restnutzungsdauer verständlich erklärt für Vermieter, Eigentümer und Investoren.`,
    lexicon: lexiconData,
    icon: BookOpen,
    iconAriaLabel: "Lexikon Icon",
    iconOnTop: true,
    imageAlt: `Lexikon Immobilien-Gutachten Begriffe verständlich erklärt | ${templateVariables.siteName}`,
    showHero: false,
    showImage: true,
    showTableOfContents: true,
    headingLevel: 2,
    stickyTableOfContents: true,
    scrollableContent: true,
    titleClassName: "mt-0",
    className: "mb-0 pb-16",
    contentWrapperClassName: "px-4 md:px-8 lg:px-20",
    contentContainerClassName: "space-y-16",
    linkColor: "text-[#ff985c]",
  }),
]);

export default lexikonContent;
