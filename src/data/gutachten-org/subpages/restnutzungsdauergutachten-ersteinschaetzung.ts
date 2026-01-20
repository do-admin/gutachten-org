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
  title: `Restnutzungsdauergutachten Ersteinschätzung | ${templateVariables.siteName}`,
  description:
    "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
  authors: [{ name: templateVariables.siteName }],
  creator: templateVariables.siteName,
  publisher: templateVariables.siteName,
  canonical: templateVariables.siteUrl + "/restnutzungsdauergutachten-ersteinschaetzung/",
  openGraph: {
    title: `Restnutzungsdauergutachten Ersteinschätzung | ${templateVariables.siteName}`,
    description:
      "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
    siteName: templateVariables.siteName,
    url: templateVariables.siteUrl + "/restnutzungsdauergutachten-ersteinschaetzung/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 1200,
        height: 630,
        alt: "Restnutzungsdauergutachten Ersteinschätzung",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Restnutzungsdauergutachten Ersteinschätzung | ${templateVariables.siteName}`,
    description:
      "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 1200,
        height: 630,
        alt: "Restnutzungsdauergutachten Ersteinschätzung",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const restnutzungsdauerErsteinschaetzungContent: SubpageContent =
  validateContent([
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
            name: "Ersteinschätzung",
          },
        ],
      },
    }),
    getOrganizationStructuredData(),
    createComponent<StructuredDataComponent>({
      type: "StructuredData",
      id: "structured-data-restnutzungsdauer-ersteinschaetzung",
      schemaType: "article",
      data: {
        headline: "Kostenlose Ersteinschätzung für Restnutzungsdauergutachten",
        description:
          "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
        url: `${templateVariables.siteUrl}/restnutzungsdauergutachten-ersteinschaetzung/`,
        image: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        publisher: {
          name: templateVariables.siteName,
          logo: {
            url: siteLogoPath,
          },
        },
        author: {
          "@type": "Organization",
          name: templateVariables.siteName,
          url: templateVariables.siteUrl,
        },
        datePublished: "2025-10-17",
        dateModified: "2025-10-28",
      },
    }),
    createComponent<ClientComponentComponent>({
      type: "ClientComponent",
      id: "restnutzungsdauer-iframe",
      componentName: "IframeEmbed",
      props: {
        src: "https://app-embed.evalion.net/?formId=nutzungsdauer&pId=Gutachten_org&v=lite",
        title: "Restnutzungsdauergutachten Ersteinschätzung Formular",
        className: "mx-auto !mt-16 max-w-[900px]!",
        heading: "Restnutzungsdauergutachten Ersteinschätzung",
        headingClassName: "mb-8",
      },
    }),
  ]);

export default restnutzungsdauerErsteinschaetzungContent;
