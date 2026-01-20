import type {
  HeroComponent,
  SubpageContent,
  ClientComponentComponent,
  StructuredDataComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath, getAbsoluteImageUrl, getOrganizationStructuredData } from "@/lib/site-config-helper";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Kaufpreisaufteilung: kostenlose Ersteinschätzung",
  description:
    "Fordern Sie jetzt Ihre individuelle Kaufpreisaufteilung bei Gutachten.org an: schnell, digital und professionell.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/kaufpreisaufteilung-anfrage/",
  openGraph: {
    title: "Kaufpreisaufteilung: kostenlose Ersteinschätzung",
    description:
      "Fordern Sie jetzt Ihre individuelle Kaufpreisaufteilung bei Gutachten.org an: schnell, digital und professionell.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/kaufpreisaufteilung-anfrage/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 1200,
        height: 630,
        alt: "Kaufpreisaufteilung: kostenlose Ersteinschätzung",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaufpreisaufteilung: kostenlose Ersteinschätzung",
    description:
      "Fordern Sie jetzt Ihre individuelle Kaufpreisaufteilung bei Gutachten.org an: schnell, digital und professionell.",
    url: templateVariables.siteUrl + "/kaufpreisaufteilung-anfrage/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 1200,
        height: 630,
        alt: "Kaufpreisaufteilung: kostenlose Ersteinschätzung",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const kaufpreisaufteilungAnfrageContent: SubpageContent = validateContent([
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
          name: "Kaufpreisaufteilung Anfrage",
        },
      ],
    },
  }),
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-kaufpreisaufteilung-anfrage",
    schemaType: "article",
    data: {
      headline: `Kaufpreisaufteilung Anfrage – ${templateVariables.siteName}`,
      description:
        "Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.",
      url: `${templateVariables.siteUrl}/kaufpreisaufteilung-anfrage/`,
      publisher: {
        name: templateVariables.siteName,
        logo: {
          url: siteLogoPath,
        },
      },
      author: {
        name: templateVariables.siteName,
      },
      datePublished: "2020-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "kaufpreisaufteilung-iframe",
    componentName: "IframeEmbed",
    props: {
      // TODO: Update with the actual iframe embed URL from gutachten.org
      // This should be the form embed URL (e.g., from Typeform, JotForm, etc.)
      // not the page URL itself
      src: "https://app-embed.evalion.net/?formId=kaufpreisteilung&pId=Gutachten_org",
      title: "Kaufpreisaufteilung Anfrage Formular",
      className: "mx-auto !mt-16 max-w-[900px]!",
      heading: "Kaufpreisaufteilung Anfrage",
      headingClassName: "mb-8",
    },
  }),
]);

export default kaufpreisaufteilungAnfrageContent;
