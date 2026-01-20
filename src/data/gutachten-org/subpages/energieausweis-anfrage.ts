import type {
  HeroComponent,
  SubpageContent,
  ClientComponentComponent,
  StructuredDataComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath, getAbsoluteImageUrl } from "@/lib/site-config-helper";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: `Energieausweis beantragen - ${templateVariables.siteName}`,
  description:
    "Energieausweis beantragen Gutachten.org: Jetzt Verbrauchs- oder Bedarfsausweis online anfordern – rechtssicher & bundesweit.",
  authors: [{ name: templateVariables.siteName }],
  creator: templateVariables.siteName,
  publisher: templateVariables.siteName,
  canonical: templateVariables.siteUrl + "/energieausweis-anfrage/",
  openGraph: {
    title: `Energieausweis beantragen - ${templateVariables.siteName}`,
    description:
      "Energieausweis beantragen Gutachten.org: Jetzt Verbrauchs- oder Bedarfsausweis online anfordern – rechtssicher & bundesweit.",
    siteName: templateVariables.siteName,
    url: templateVariables.siteUrl + "/energieausweis-anfrage/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Energieausweis beantragen",
      },
    ],
    locale: "de_DE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `Energieausweis beantragen - ${templateVariables.siteName}`,
    description:
      "Energieausweis beantragen Gutachten.org: Jetzt Verbrauchs- oder Bedarfsausweis online anfordern – rechtssicher & bundesweit.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Energieausweis beantragen",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const energieausweisAnfrageContent: SubpageContent = validateContent([
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
          name: "Energieausweis Anfrage",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-energieausweis-anfrage",
    schemaType: "article",
    data: {
      headline: `Energieausweis beantragen - ${templateVariables.siteName}`,
      description:
        "Erstellen Sie einen rechtssicheren Bedarfsausweis – fundiert, unabhängig und schnell verfügbar.",
      url: `${templateVariables.siteUrl}/energieausweis-anfrage/`,
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
      datePublished: "2025-07-18",
      dateModified: "2025-07-24",
    },
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "energieausweis-iframe",
    componentName: "IframeEmbed",
    props: {
      // TODO: Update with the actual iframe embed URL from gutachten.org
      // This should be the form embed URL (e.g., from Typeform, JotForm, etc.)
      // not the page URL itself
      src: "https://app-embed.evalion.net/?formId=energieausweis-bedarfsausweis&pId=Gutachten_org",
      title: "Energieausweis Anfrage Formular",
      className: "mx-auto !mt-16 max-w-[900px]! h-full!",
      heading: "Energieausweis Anfrage",
      headingClassName: "mb-8",
    },
  }),
]);

export default energieausweisAnfrageContent;
