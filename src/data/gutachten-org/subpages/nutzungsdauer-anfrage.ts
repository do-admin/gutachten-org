import type {
  SubpageContent,
  ClientComponentComponent,
  StructuredDataComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath, getAbsoluteImageUrl } from "@/lib/site-config-helper";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Restnutzungsdauergutachten beantragen online- Gutachten.org",
  description:
    "Jetzt steuerlich anerkanntes Restnutzungsdauergutachten online beauftragen – schnell, digital & bundesweit. Ideal zur Optimierung der AfA.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/nutzungsdauer-anfrage/",
  openGraph: {
    title: "Restnutzungsdauergutachten beantragen online- Gutachten.org",
    description:
      "Jetzt steuerlich anerkanntes Restnutzungsdauergutachten online beauftragen – schnell, digital & bundesweit. Ideal zur Optimierung der AfA.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/nutzungsdauer-anfrage/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Restnutzungsdauergutachten beantragen",
      },
    ],
    locale: "de_DE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restnutzungsdauergutachten beantragen online- Gutachten.org",
    description:
      "Jetzt steuerlich anerkanntes Restnutzungsdauergutachten online beauftragen – schnell, digital & bundesweit. Ideal zur Optimierung der AfA.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Restnutzungsdauergutachten beantragen",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const nutzungsdauerAnfrageContent: SubpageContent = validateContent([
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
          name: "Nutzungsdauer Anfrage",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-nutzungsdauer-anfrage",
    schemaType: "article",
    data: {
      headline: "Restnutzungsdauergutachten beantragen online- Gutachten.org",
      description:
        "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
      url: templateVariables.siteUrl + "/nutzungsdauer-anfrage/",
      publisher: {
        name: templateVariables.siteName,
        logo: {
          url: siteLogoPath,
        },
      },
      author: {
        name: templateVariables.siteName,
        type: "Organization",
      },
      datePublished: "2025-05-22T07:40:19+00:00",
      dateModified: "2025-07-24T16:00:53+00:00",
    },
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "nutzungsdauer-iframe",
    componentName: "IframeEmbed",
    props: {
      // TODO: Update with the actual iframe embed URL from gutachten.org
      // This should be the form embed URL (e.g., from Typeform, JotForm, etc.)
      // not the page URL itself
      src: "https://app-embed.evalion.net/?formId=nutzungsdauer&pId=Gutachten_org",
      title: "Nutzungsdauer Anfrage Formular",
      className: "mx-auto !mt-16 max-w-[900px]!",
      heading: "Nutzungsdauer Anfrage",
      headingClassName: "mb-8",
    },
  }),
]);

export default nutzungsdauerAnfrageContent;
