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
  title: `Grundrisszeichnung Anfrage | ${templateVariables.siteName}`,
  description:
    "Professionelle Grundrisszeichnung auf Basis Ihrer Unterlagen oder unseres Aufmaßes - ideal für Verkauf, Vermietung und Finanzierung.",
  authors: [{ name: templateVariables.siteName }],
  creator: templateVariables.siteName,
  publisher: templateVariables.siteName,
  canonical: templateVariables.siteUrl + "/grundrisszeichnung-anfrage/",
  openGraph: {
    title: `Grundrisszeichnung Anfrage | ${templateVariables.siteName}`,
    description:
      "Professionelle Grundrisszeichnung auf Basis Ihrer Unterlagen oder unseres Aufmaßes - ideal für Verkauf, Vermietung und Finanzierung.",
    siteName: templateVariables.siteName,
    url: templateVariables.siteUrl + "/grundrisszeichnung-anfrage/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 1200,
        height: 630,
        alt: "Grundrisszeichnung Anfrage",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Grundrisszeichnung Anfrage | ${templateVariables.siteName}`,
    description:
      "Professionelle Grundrisszeichnung auf Basis Ihrer Unterlagen oder unseres Aufmaßes - ideal für Verkauf, Vermietung und Finanzierung.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 1200,
        height: 630,
        alt: "Grundrisszeichnung Anfrage",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const grundrisszeichnungAnfrageContent: SubpageContent = validateContent([
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
          name: "Grundrisszeichnung Anfrage",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-grundrisszeichnung-anfrage",
    schemaType: "article",
    data: {
      headline: `Grundrisszeichnung Anfrage – ${templateVariables.siteName}`,
      description:
        "Professionelle Grundrisszeichnung auf Basis Ihrer Unterlagen oder unseres Aufmaßes - ideal für Verkauf, Vermietung und Finanzierung.",
      url: `${templateVariables.siteUrl}/grundrisszeichnung-anfrage/`,
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
      datePublished: "2020-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "grundrisszeichnung-iframe",
    componentName: "IframeEmbed",
    props: {
      src: "https://app-embed.evalion.net/?formId=grundrisszeichnung&pId=Gutachten_org",
      title: "Grundrisszeichnung Anfrage Formular",
      className: "mx-auto !mt-16 max-w-[900px]",
      heading: "Grundrisszeichnung Anfrage",
      headingClassName: "mb-8",
    },
  }),
]);

export default grundrisszeichnungAnfrageContent;
