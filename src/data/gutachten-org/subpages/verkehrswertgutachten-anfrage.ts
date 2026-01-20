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
  title: "Verkehrswertgutachten online beantragen- Gutachten.org",
  description:
    "Jetzt Verkehrswertgutachten online beantragen: Für Verkauf, Scheidung, Erbe oder Finanzierung – unverbindlich und rechtssicher.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/verkehrswertgutachten-anfrage/",
  openGraph: {
    title: "Verkehrswertgutachten online beantragen- Gutachten.org",
    description:
      "Jetzt Verkehrswertgutachten online beantragen: Für Verkauf, Scheidung, Erbe oder Finanzierung – unverbindlich und rechtssicher.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/verkehrswertgutachten-anfrage/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Verkehrswertgutachten online beantragen- Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verkehrswertgutachten online beantragen- Gutachten.org",
    description:
      "Jetzt Verkehrswertgutachten online beantragen: Für Verkauf, Scheidung, Erbe oder Finanzierung – unverbindlich und rechtssicher.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Verkehrswertgutachten online beantragen- Gutachten.org",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const verkehrswertgutachtenAnfrageContent: SubpageContent = validateContent([
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
          name: "Verkehrswertgutachten Anfrage",
        },
      ],
    },
  }),
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-verkehrswertgutachten-anfrage",
    schemaType: "article",
    data: {
      headline: `Verkehrswertgutachten Anfrage – ${templateVariables.siteName}`,
      description:
        "Lassen Sie den Verkehrswert Ihrer Immobilie professionell ermitteln.",
      url: `${templateVariables.siteUrl}/verkehrswertgutachten-anfrage/`,
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
      datePublished: "2020-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "verkehrswertgutachten-iframe",
    componentName: "IframeEmbed",
    props: {
      // TODO: Update with the actual iframe embed URL from gutachten.org
      // This should be the form embed URL (e.g., from Typeform, JotForm, etc.)
      // not the page URL itself
      src: "https://app-embed.evalion.net/?formId=verkehrswert&pId=Gutachten_org",
      title: "Verkehrswertgutachten Anfrage Formular",
      className: "mx-auto !mt-16 max-w-[900px]!",
      heading: "Verkehrswertgutachten Anfrage",
      headingClassName: "mb-8",
    },
  }),
]);

export default verkehrswertgutachtenAnfrageContent;
