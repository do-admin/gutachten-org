import type {
  DatenschutzComponent,
  HeroComponent,
  ImpressumComponent,
  StructuredDataComponent,
  SubpageContent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import {
  getTemplateVariables,
  getImagePath,
  getAbsoluteImageUrl,
} from "@/lib/site-config-helper";

// Get template variables for this site
const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Impressum - Gutachten",
  description:
    "Impressum Gutachten.org: Rechtliche Angaben, Kontaktinformationen und Hinweise gemäß § 5 TMG",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
    canonical: templateVariables.siteUrl + "/impressum/",
  openGraph: {
    title: "Impressum - Gutachten",
    description:
      "Impressum Gutachten.org: Rechtliche Angaben, Kontaktinformationen und Hinweise gemäß § 5 TMG",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/impressum/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Impressum - Gutachten",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impressum - Gutachten",
    description:
      "Impressum Gutachten.org: Rechtliche Angaben, Kontaktinformationen und Hinweise gemäß § 5 TMG",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Gutachten.org Impressum",
      },
    ],
  },
};

// Define the Impressum content
const impressumContent: SubpageContent = validateContent([
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
          name: "Impressum",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-article-impressum",
    schemaType: "article",
    data: {
      headline: `Impressum - ${templateVariables.siteName}`,
      description:
        "Angaben gemäß § 5 TMG. Kontaktdaten, Unternehmensinformationen und rechtliche Hinweise der Evalion GmbH.",
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
          url: getImagePath("/images/{{siteId}}/logo/gutachten-org.webp"),
          width: 200,
          height: 60,
        },
      },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      url: `${templateVariables.siteUrl}/impressum/`,
    },
  }),

  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-impressum",
    layout: "document",
    h1Text: "Impressum",
    sectionTextClassName: "m-auto! max-w-4xl! ",
    titleClassName: "text-start! m-0!",
  }),

  createComponent<DatenschutzComponent>({
    type: "Datenschutz",
    id: "impressum-content",
    variant: "minimal",
    title:
      "Diese Internetseite und die dazugehörige Plattform wird betrieben von:",
    titleClassName: "font-normal",
    sectionClassName: "gap-0",
    subsectionClassName: "gap-0",
    minimalSections: [
      {
        heading: "",
        subsections: [
          {
            content: "Evalion GmbH",
          },
          {
            content: "Brunnenstr. 178",
          },
          {
            content: "10119 Berlin",
          },
        ],
      },
      {
        heading: "Vertreten durch:",
        subsections: [
          {
            content: "Geschäftsführer: Kolja Czudnochowski, Gerrit J. Kolweyh",
          },
        ],
      },
      {
        heading: "Kontakt:",
        subsections: [
          {
            content: "Telefon: +49 30 754 364 81",
          },
          {
            content: "E-Mail: support@evalion.net",
          },
          {
            content: "Website: www.evalion.net",
          },
        ],
      },
      {
        heading: "Registereintrag:",
        subsections: [
          {
            content: "Eintragung im Handelsregister",
          },
          {
            content: "Registergericht: Amtsgericht Charlottenburg",
          },
          {
            content: "Registernummer: HRB 270864 B",
          },
        ],
      },
      {
        heading: "Umsatzsteuer-ID:",
        subsections: [
          {
            content:
              "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE418052274",
          },
        ],
      },
      {
        heading: "Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV:",
        headingMarginBottom: true,
        subsections: [
          {
            content: "Evalion GmbH",
          },
          {
            content: "Brunnenstr. 178",
          },
          {
            content: "10119 Berlin",
          },
        ],
      },
      {
        heading: "Hinweis zur EU-Streitbeilegung:",
        headingMarginBottom: true,
        subsections: [
          {
            content:
              "Die Europäische Kommission stellt eine Plattform zurOnline-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/",
          },
          {
            content: "Unsere E-Mail-Adresse finden Sie oben im Impressum.",
          },
        ],
      },
      {
        heading: "Haftungsausschluss:",
        subsections: [
          {
            content:
              "Die Inhalte unserer Seiten wurden mit größter Sorgfalterstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhaltekönnen wir jedoch keine Gewähr übernehmen.",
          },
        ],
      },
      {
        heading: "Urheberrecht:",
        subsections: [
          {
            content:
              "Die durch die Evalion GmbH erstellten Inhalteund Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. DieVervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertungaußerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmungdes jeweiligen Autors bzw. Erstellers.",
          },
        ],
      },
      {
        heading: "Haftung für Links",
        subsections: [
          {
            content:
              "Unser Angebot enthält Links zu externen Websites Dritter,auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diesefremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinktenSeiten ist stets der jeweilige Anbieter oder Betreiber derSeitenverantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkungauf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zumZeitpunkt der Verlinkung nicht erkennbar.\n\nEine permanente inhaltliche Kontrolle der verlinkten Seitenist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
          },
        ],
      },
    ],
  }),
]);

export default impressumContent;
