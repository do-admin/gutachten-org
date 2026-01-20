import type {
  SubpageContent,
  HeroComponent,
  FAQComponent,
  StructuredDataComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath, getAbsoluteImageUrl, getOrganizationStructuredData } from "@/lib/site-config-helper";
// FAQ data loaded from local file
import faqData from "../json/faq/gutachten-org-faq.json";

// Get template variables for this site
const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Häufige Fragen zu Immobiliengutachten - Gutachten.org",
  description:
    "Antworten auf häufige Fragen zu Immobiliengutachten: Restnutzungsdauer, Besichtigung, Steuer, Kaufpreisaufteilung & mehr.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/haeufig-gestellte-fragen/",
  openGraph: {
    title: "Häufige Fragen zu Immobiliengutachten - Gutachten.org",
    description:
      "Antworten auf häufige Fragen zu Immobiliengutachten: Restnutzungsdauer, Besichtigung, Steuer, Kaufpreisaufteilung & mehr.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/haeufig-gestellte-fragen/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Häufige Fragen zu Immobiliengutachten - Gutachten.org",
      },
    ],
    locale: "de_DE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Häufige Fragen zu Immobiliengutachten - Gutachten.org",
    description:
      "Antworten auf häufige Fragen zu Immobiliengutachten: Restnutzungsdauer, Besichtigung, Steuer, Kaufpreisaufteilung & mehr.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Häufige Fragen zu Immobiliengutachten - Gutachten.org",
      },
    ],
  },
};

const faqContent: SubpageContent = validateContent([
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
          name: "Häufig gestellte Fragen",
          // Last item doesn't need item field
        },
      ],
    },
  }),
  // FAQ structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: faqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: `${templateVariables.siteUrl}/faq`,
      name: "Gutachten.org - FAQ zu Immobiliengutachten",
    },
  }),
  // Organization structured data
  getOrganizationStructuredData(),
  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-faq",
    layout: "document",
    h1Text: "FAQ",
    titleClassName: "text-start m-0!",
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    defaultOpenIds: ["nutzungsdauer-definition"],
    title: "Häufig gestellte Fragen",
    items: faqData,
    sectionId: "faq",
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "py-[60px] lg:py-[120px]",
    titleClassName: "text-[#333333]",
  }),
]);

export default faqContent;
