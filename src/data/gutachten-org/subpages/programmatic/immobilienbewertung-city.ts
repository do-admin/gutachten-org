import type {
  HeroWithFeatureCardsComponent,
  SubpageContent,
  TextImageComponent,
  StructuredDataComponent,
  BaresGeldSparenSectionComponent,
  FAQComponent,
  ServiceOffersComponent,
  ClientComponentComponent,
  PricingComparisonComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import {
  getImagePath,
  getAbsoluteImageUrl,
  getOrganizationStructuredData,
  getTemplateVariables,
} from "@/lib/site-config-helper";

import homeFaqData from "../../json/home/gutachten-org-home-faq.json";
import immobilienbewertungCityFaq from "../../json/immobilienbewertung-city/faq-immobilienbewertung-city.json";

const templateVariables = getTemplateVariables();

/**
 * Generate a slug-like ID from a question string
 */
function generateFaqId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[äöü]/g, (char) => {
      const map: Record<string, string> = { ä: "ae", ö: "oe", ü: "ue" };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100); // Limit length
}

/**
 * Process FAQ data from JSON - keep template variables for runtime processing
 * Template variables will be processed by the template system at runtime
 * Maps JSON template variable names to system template variable names
 */
function processFaqData(
  faqData: typeof immobilienbewertungCityFaq
): typeof homeFaqData {
  // Process the data structure and map template variable names
  // JSON uses snake_case (stadtteile, umgebung_staedte) but system uses camelCase (listOfCityDistricts, listOfSurroundingCities)
  // Also map city_name to programmaticInstanceName
  const processedItems = faqData.faq.map((item) => {
    // Map template variable names from JSON format to system format
    let question = item.question
      .replace(/\{\{city_name\}\}/g, "{{programmaticInstanceName}}")
      .replace(/\{\{stadtteile\}\}/g, "{{listOfCityDistricts}}")
      .replace(/\{\{umgebung_staedte\}\}/g, "{{listOfSurroundingCities}}");

    let answer = item.answer
      .replace(/\{\{city_name\}\}/g, "{{programmaticInstanceName}}")
      .replace(/\{\{stadtteile\}\}/g, "{{listOfCityDistricts}}")
      .replace(/\{\{umgebung_staedte\}\}/g, "{{listOfSurroundingCities}}");

    // Use the ID from JSON if available, otherwise generate from question
    const id = (item as any).id || generateFaqId(question);

    return {
      id,
      question,
      answer,
    };
  });

  return processedItems;
}

// Process FAQ data - template variables will be resolved at runtime
const processedFaqData = processFaqData(immobilienbewertungCityFaq);

export const metadata: SubpageMetadata = {
  title: "Immobilienbewertung: {{programmaticInstanceName}}",
  description:
    "Immobilienbewertung in {{programmaticInstanceName}} - jetzt Verkehrswertgutachten oder Wertermittlung vom Sachverständigen beauftragen. Schnell & rechtssicher.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical:
    templateVariables.siteUrl + "/immobilienbewertung/{{programmaticInstanceSlug}}/",
  openGraph: {
    title: "Immobilienbewertung: {{programmaticInstanceName}}",
    description:
      "Immobilienbewertung in {{programmaticInstanceName}} - jetzt Verkehrswertgutachten oder Wertermittlung vom Sachverständigen beauftragen. Schnell & rechtssicher.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/immobilienbewertung/{{programmaticInstanceSlug}}/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobilienbewertung in {{programmaticInstanceName}} durch zertifizierte Sachverständige",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Immobilienbewertung: {{programmaticInstanceName}}",
    description:
      "Immobilienbewertung in {{programmaticInstanceName}} - jetzt Verkehrswertgutachten oder Wertermittlung vom Sachverständigen beauftragen. Schnell & rechtssicher.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobilienbewertung in {{programmaticInstanceName}} durch zertifizierte Sachverständige",
      },
    ],
  },
};

const siteLogoPath = templateVariables.logoDark
  ? templateVariables.logoDark.startsWith("http")
    ? templateVariables.logoDark
    : `${templateVariables.siteUrl}${templateVariables.logoDark}`
  : `${templateVariables.siteUrl}/images/gutachten-org/logo/gutachten-org-logo-light.webp`;

const structuredDataComponents = [
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: processedFaqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: `${templateVariables.siteUrl}/immobilienbewertung/{{programmaticInstanceSlug}}/`,
      name: "Gutachten.org - FAQ zu Immobilienbewertung in {{programmaticInstanceName}}",
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-immobilienbewertung-city",
    schemaType: "article",
    data: {
      headline: "Immobilienbewertung in {{programmaticInstanceName}}",
      description:
        "Informationen zur Immobilienbewertung in {{programmaticInstanceName}} und deren Bedeutung für den Immobilienverkauf, die Finanzierung und steuerliche Behandlung.",
      url: `${templateVariables.siteUrl}/immobilienbewertung-{{programmaticInstanceSlug}}`,
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
      datePublished: "2020-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  }),
];

const immobilienbewertungCityContent: SubpageContent = validateContent([
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
          name: "Immobilienbewertung {{programmaticInstanceName}}",
        },
      ],
    },
  }),
  ...structuredDataComponents,

  // HeroWithFeatureCards component
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer",
    variant: "hero-programatic-image",
    title: "Immobilienbewertung - {{programmaticInstanceName}}",
    subHeading:
      "Immobilienbewertung in {{programmaticInstanceName}}\nund Umgebung",
    subtitle:
      "Sie benötigen ein Verkehrswertgutachten für Ihre Immobilie? Ob für Verkauf, Erbe, Scheidung, Steuer oder Finanzierung, bei uns erhalten Sie rechtssichere und anerkannte Wertermittlungen zum Festpreis. Schnell, digital und deutschlandweit verfügbar – erstellt von zertifizierten Gutachtern mit Erfahrung.",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0 py-[58px] md:py-0 container-gutachten",
    contentClassName: "flex flex-col items-start justify-center",
    heroTitleClassName: "!text-[#D35F17] uppercase text-sm",
    titleClassName: "!leading-none !text-sm",
    subHeadingClassName:
      "xl:!text-[32px] !leading-[1.6] lg:whitespace-pre-line",
    subtitleClassName: "!text-sm !leading-[1.8]",
    imgClassName: "object-cover",
    className: "bg-gray-50",
    image: {
      src: getImagePath(
        "/images/{{siteId}}/immobilienbewertung-city/immobilienbewertung-city-hero.webp"
      ),
      alt: "Experten für Immobiliengutachten in {{programmaticInstanceName}} im Gespräch",
      width: 600,
      height: 400,
    },
    imageOverlay: {
      profileCard: {
        image: {
          src: getImagePath(
            "/images/{{siteId}}/immobilienbewertung-city/felix-holfert.webp"
          ),
          alt: "Felix Holfert",
          width: 216,
          height: 155,
        },
        name: "Felix Holfert",
        title: "Gutachter nach <br/> DIN EN ISO / IEC 17024",
        width: "248px",
        height: "284px",
        padding: 16,
      },
      mobileProfileCard: {
        image: {
          src: getImagePath(
            "/images/{{siteId}}/nutzungsdauer/felix-holfert-mobile-view.webp"
          ),
          alt: "felix-holfert-mobile-view",
          width: 300,
          height: 200,
        },
        name: "Felix Holfert",
        title: "Real estate appraiser according to DIN ISO 17 0 24",

        badges: [
          {
            image: {
              src: getImagePath(
                "/images/{{siteId}}/nutzungsdauer/gutachten-stamp.webp"
              ),
              alt: "Zertifiziert durch DIN EN ISO/IEC 17024",
              width: 80,
              height: 80,
            },
            className: "bottom-4 right-4",
            imageClassName: "h-22",
          },
        ],
      },
    },
    customerTestimonial: {
      images: [
        {
          src: getImagePath(
            "/images/{{siteId}}/ueber-uns/testimonial-kunde-5.webp"
          ),
          alt: "Zufriedener Kunde",
        },
        {
          src: getImagePath(
            "/images/{{siteId}}/ueber-uns/testimonial-kunde-6.webp"
          ),
          alt: "Zufriedener Kunde",
        },
        {
          src: getImagePath(
            "/images/{{siteId}}/ueber-uns/testimonial-kunde-7.webp"
          ),
          alt: "Zufriedener Kunde",
        },
        {
          src: getImagePath(
            "/images/{{siteId}}/ueber-uns/testimonial-kunde-8.webp"
          ),
          alt: "Zufriedener Kunde",
        },
      ],
      text: "1k+ zufriedene Kunden",
    },
    ctas: [
      {
        label: "Unverbindliches Angebot",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
        className:
          "!px-4.5 w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
        icon: "ArrowUpRight",
      },
    ],
    logos: [
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/bdsf.webp"),
          alt: "BD SF Logo",
          width: 78,
          height: 78,
        },
      },
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/dia-zert.webp"),
          alt: "DIA Zert Logo",
          width: 78,
          height: 78,
        },
      },
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/din-en-iso.webp"),
          alt: "DIN EN ISO Logo",
          width: 78,
          height: 78,
        },
      },
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/rev.webp"),
          alt: "REV Logo",
          width: 78,
          height: 78,
        },
      },
    ],
    logoItemClassName: "shrink-0",
    logoImageClassName: "max-w-[80px] max-h-[80px]",
    ctaIconClassName: "text-[#FF985C]",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "nutzungsdauer-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "nutzungsdauer-section-1",
      title:
        "Professionelle Immobilienbewertung: unabhängig, schnell, verlässlich",
      mediaPosition: "left",
      intro:
        "Eine fundierte Wertermittlung durch zertifizierte Sachverständige gibt Ihnen Sicherheit bei wichtigen Entscheidungen. Unsere Verkehrswertgutachten sind unabhängig, rechtssicher und deutschlandweit verfügbar. Dank digitaler Prozesse erhalten Sie Ihre Bewertung schnell, transparent und exakt auf Ihren Bedarf zugeschnitten.",
      cta: {
        label: "Unverbindlich anfragen",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
        className:
          "md:w-fit !px-4.5 w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
      media: {
        src: getImagePath(
          "/images/{{siteId}}/immobilienbewertung-city/seitenansicht-mehrfamilienhaus-gutachten.webp"
        ),
        alt: "Steuern sparen mit verkürzter Abschreibungsdauer",
        width: 644,
        height: 720,
      },
      introClassName: "xl:whitespace-pre-line! whitespace-normal",
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "place-content-start xl:gap-16 gap-8",
      contentClassName: "max-w-[516px] gap-10",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentTitleClassName: "gap-10",
    },
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "bares-geld-sparen",
    title:
      "Wann brauche ich eine Immobilienbewertung\nin {{programmaticInstanceName}}? Verkehrswertgutachten für jede\nSituation!",
    bulletItems: [],
    cardLayoutColumns: 2,
    cardLayoutVariant: "link",
    cardLayoutCardClassName: "bg-transparent",
    cards: [
      {
        title: "Beim Immobilienkauf: sicher entscheiden",
        description:
          "Sie planen den Kauf einer Immobilie, sind sich beim geforderten Kaufpreis aber unsicher? Mit einer unabhängigen Wertermittlung erhalten Sie eine fundierte Entscheidungsgrundlage – für mehr Sicherheit bei Finanzierung, Kaufverhandlung und Bankgespräch.",
      },
      {
        title: "Für den Immobilienverkauf: realistisch bewerten",
        description:
          "Sie möchten Ihr Haus oder Ihre Wohnung verkaufen, kennen den tatsächlichen Wert aber nicht? Wir erstellen eine professionelle Immobilienbewertung, damit Sie den richtigen Angebotspreis festlegen – realistisch, marktgerecht und überzeugend gegenüber Käufern.",
      },
      {
        title: "Bei Trennung oder Scheidung: Klarheit schaffen",
        description:
          "Im Rahmen einer Trennung oder Scheidung ist der Immobilienwert oft Grundlage für Ausgleichs- und Eigentumsregelungen. Ein neutrales Verkehrswertgutachten sorgt für Klarheit und vermeidet unnötige Streitigkeiten.",
      },
      {
        title: "Im Erbfall oder bei Schenkung: Streit und Steuern vermeiden",
        description:
          "Sie haben eine Immobilie geerbt oder geschenkt bekommen? Mit einer sachverständigen Immobilienbewertung schützen Sie sich vor überhöhten Steuerforderungen des Finanzamts – und erhalten eine faire Grundlage für mögliche Erbauseinandersetzungen.",
      },
    ],
    cardDescriptionClassName: "font-bold text-[#515A5F]",
    cta: {
      label: "Angebot anfragen",
      href: "/verkehrswertgutachten-anfrage/",
      external: true,
      className:
        "md:w-fit !px-4.5 w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
    },
    eyebrowClassName: "text-[#515A5F]",
    eyebrowContainerClassName: "lg:w-full! space-y-0!",
    titleClassName: "text-[#273238] xl:whitespace-pre-line font-semibold",
    bulletTextClassName: "text-[#515A5F]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "md:items-end md:justify-end",
    cardsGridClassName: "md:grid-cols-2",
    contentGridClassName:
      "md:gap-0! !flex flex-col md:!flex-row items-start md:items-end justify-between",
    containerClassName: "container-gutachten",
    backgroundClassName: "bg-[#F4F8F7]",
  }),
  createComponent<PricingComparisonComponent>({
    type: "PricingComparison",
    sectionId: "pricing",
    variant: "three-column",
    backgroundClassName: "bg-white",
    heading: "Unsere Leistungen und Preise",
    tableRows: [
      {
        title: "",
        secondColumnCard: {
          title: "Kurzgutachten (Wertermittlung)",
          price: "ab 1800 €",
          priceNote: "(inkl. MwSt.)",
          ctaLabel: "Unverbindlich anfragen",
          ctaHref: "/verkehrswertgutachten-anfrage/",
          external: true,
          ctaVariant: "default",
          priceClassName: "text-[#EB6613]",
        },
        thirdColumnCard: {
          title: "(Voll) Verkehrswertgutachten",
          price: "ab 2000€",
          priceNote: "(inkl. MwSt.)",
          ctaLabel: "Unverbindlich anfragen",
          ctaHref: "/verkehrswertgutachten-anfrage/",
          external: true,
          ctaVariant: "default",
        },
      },
      {
        title: "Zusammenfassung",
        secondColumnCard: {
          features: [
            {
              text: "Kompakt und präzise zur besseren Entscheidung",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Kosteneffizient und bedarfsgerecht für Ihr Anliegen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Schnelle und genaue Ergebnisse",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
          priceClassName: "text-[#EB6613]",
        },
        thirdColumnCard: {
          features: [
            {
              text: "Detailreich & Umfassend inkl. aller relevanter Faktoren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gerichtsfest für Finanzamt, Ämter & Behörden",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Als Basis für Komplexe Entscheidungen und Streitigkeiten",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
        },
      },
      {
        title: "Geeignet für",
        secondColumnCard: {
          features: [
            {
              text: "Marktpreiseinschätzungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Private Vermögensermittlung",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Kaufentscheidungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Verkaufsvorbereitungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Renovierungsplanungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
          description:
            "Für eine schnelle, kostengünstige und orientierende Wertermittlung, die einen guten Überblick bietet, ohne den vollen Umfang eines Verkehrswertgutachtens zu benötigen.",
        },
        thirdColumnCard: {
          features: [
            {
              text: "Rechtliche Auseinandersetzungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gerichtliche Verfahren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Finanzielle Transaktionen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Immobiliengeschäfte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Behördliche und finanzielle Angelegenheiten",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
          description:
            "Für eine objektive, verlässliche und rechtlich anerkannte Wertermittlung, die vor Gericht Bestand hat und von Behörden akzeptiert wird.",
        },
      },
      {
        title: "Immobilienarten",
        secondColumnCard: {
          features: [
            {
              text: "Eigentumswohnungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Reihenhäuser und Doppelhaushälften",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Ein- und Zweifamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Mehrfamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Wohn- und Geschäftshäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Grundstücke",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gewerbeobjekte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
        },
        thirdColumnCard: {
          features: [
            {
              text: "Eigentumswohnungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Reihenhäuser & Doppelhaushälften",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Ein- und Zweifamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Mehrfamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Wohn- und Geschäftshäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Spezialimmobilien",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gewerbeobjekte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
        },
      },
      {
        title: "Umfang",
        secondColumnCard: {
          features: [
            {
              text: "Schriftliches Wertgutachten",
              subtitle: "(auf ca. 30–50 Seite)",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Berechnung des Immobilienwertes",
              subtitle:
                "nach den gesetzlich vorgeschriebenen Wertermittlungsverfahren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Bild- und Textdokumentation",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Optional: Besichtigung & Objektaufnahmetermin",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Prüfung vorhandener Objektunterlagen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
        },
        thirdColumnCard: {
          features: [
            {
              text: "Schriftliches Wertgutachten",
              subtitle:
                "erstellt durch zertifizierten Sachverständigen auf ca. 60–100 Seiten",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Berechnung des Immobilienwertes",
              subtitle:
                "nach den gesetzlich vorgeschriebenen Wertermittlungsverfahren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Bild- und Textdokumentation",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Besichtigung & Objektaufnahmetermin",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Prüfung vorhandener Objektunterlagen",
              subtitle: "und ggf. Beschaffung fehlender Dokumente",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Zusätzliche Objektunterlagen",
              subtitle:
                "aktueller Grundbuchauszug, Bodenrichtwertkarte, Lageplan, detaillierte Lagebeschreibung, weitere objektbezogenen Planunterlagen/Auskünfte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung-city/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
        },
      },
      {
        title: "",
        secondColumnCard: {
          ctaLabel: "Unverbindliches Angebot",
          ctaHref: "/verkehrswertgutachten-anfrage/",
          ctaVariant: "accent",
          external: true,
        },
        thirdColumnCard: {
          ctaLabel: "Unverbindliches Angebot",
          ctaHref: "/verkehrswertgutachten-anfrage/",
          ctaVariant: "default",
          external: true,
        },
      },
    ],
    containerClassName: "container-gutachten",
    headingClassName: "max-w-full justify-center!",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "team-section",
    variant: "imagecard",
    title: "Wir sind für Sie da!",
    bulletItems: [],
    summary: [
      "Aus unseren Zentralen in Berlin, Dresden & Bremen koordinieren wir unser Team, um Ihnen deutschlandweit zur Verfügung zu stehen!",
      "Die Gutachter sind durch mehrere DAkkS-akkredidierte Stellen nach DIN EN ISO / IEC 17024 zertifiziert",
    ],
    ctas: [
      {
        label: "Kontakt",
        href: "/kontakt/",
        external: false,
        icon: "ArrowUpRight",
        variant: "default",
        className:
          "bg-[#FF985C] hover:bg-[#FF985C]/90 text-gray-900 [&_svg]:text-gray-900 !px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
      {
        label: "Angebot anfragen",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
        icon: "ArrowUpRight",
        variant: "outline",
        className:
          "!px-4.5 border-primary text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
    ],
    cards: [
      {
        title: "Felix Holfert",
        description: "Gutachter nach DIN EN ISO / IEC 17024",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung-city/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Immobilienexperte & Berater",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung-city/gerrit-kolweyh.webp"
        ),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Kolja Czudnochowski",
        description: "Kundenbetreuung",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung-city/simon-mill.webp"
        ),
        iconImageAlt: "Simon Mill",
      },
    ],
    cardsGridClassName:
      "gap-0 md:mt-16 mt-8 border border-[rgba(39,50,56,0.10)]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "max-w-[592px] ml-auto",
    containerClassName: "container-gutachten",
    headerContainerClassName: "m-0!",
    backgroundClassName: "bg-gray-50",
  }),
  createComponent<ServiceOffersComponent>({
    type: "ServiceOffers",
    id: "service-offers",
    title: "Weitere  Angebote",
    subtitle:
      "Ihre zertifizierten & erfahrenen Sachverständigen erstellen Ihre Gutachten und Dokumente - inklusive unverbindlichem Angebot und kostenloser Ersteinschätzung.",
    moreInfoText: "Kontakt",
    moreInfoLink: "/kontakt/",
    moreInfoButtonClassName:
      "w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
    gap: "gap-9",
    cards: [
      {
        icon: getImagePath("/images/{{siteId}}/kontakt/restnutzungsdauer.webp"),
        title: "Restnutzungsdauer",
        description:
          "Senken Sie Ihre AfA-Dauer (z.B. auf 25 Jahre) und sparen Sie massiv Steuern. Finanzamt-konform.",
        buttonText: "Kostenlose Ersteinschätzung",
        buttonLink: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
      },
      {
        icon: getImagePath("/images/{{siteId}}/kontakt/wertermittlung.webp"),
        title: "Wertermittlung",
        description:
          "Fachliche Marktwertermittlung von zertifizierten Sachverständigen - für Ihre individuellen Zwecke.",
        buttonText: "Angebot anfragen",
        buttonLink: "/verkehrswertgutachten-anfrage/",
        external: true,
      },
      {
        icon: getImagePath(
          "/images/{{siteId}}/kontakt/verkehrswertgutachten.webp"
        ),
        title: "Verkehrswertgutachten",
        description:
          "Das Vollgutachten für Scheidung, Erbe & Finanzamt. Professionell erstellt und für Behörden/Gerichte geeignet.",
        buttonText: "Angebot anfragen",
        buttonLink: "/verkehrswertgutachten-anfrage/",
        external: true,
      },
      {
        icon: getImagePath(
          "/images/{{siteId}}/kontakt/kaufpreisaufteilung.webp"
        ),
        title: "Kaufpreisaufteilung",
        description:
          "Korrigieren Sie die Schätzung des Finanzamts: Höherer Gebäudewert = Höhere Abschreibung.",
        buttonText: "Kostenlose Ersteinschätzung",
        buttonLink: "/kaufpreisaufteilung-anfrage/",
        external: true,
      },
      {
        icon: getImagePath("/images/{{siteId}}/kontakt/erstgesprach.webp"),
        title: "Erstgespräch",
        description:
          "Wir prüfen Ihren Fall und Ihre Erfolgschancen in 10 Minuten. Unverbindlich & ohne Druck.",
        buttonText: "Termin buchen",
        buttonLink: "/kontakt/",
      },
    ],
    className: "pt-0!",
    containerClassName: "container-gutachten",
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "immobilienbewertung-city-map",
    componentName: "IframeEmbed",
    props: {
      src: "{{cityMapUrl}}",
      title:
        "Standort Karte - Immobilienbewertung {{programmaticInstanceName}}",
      height: 600,
      className: "h-[600px]! w-full",
    },
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Häufig gestellte Fragen",
    items: processedFaqData,
    sectionId: "faq",
    defaultOpenIds: [
      "welche-zertifizierungen-haben-unsere-sachverstaendigen-und-gutachter",
    ],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default immobilienbewertungCityContent;
