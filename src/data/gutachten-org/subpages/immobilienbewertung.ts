import type {
  HeroWithFeatureCardsComponent,
  SubpageContent,
  StructuredDataComponent,
  TrustBlockComponent,
  BaresGeldSparenSectionComponent,
  TextImageComponent,
  FAQComponent,
  PricingComparisonComponent,
  ProcessOverviewComponent,
  TrustBlockSlideshowComponent,
  FaqGroup,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import {
  getImagePath,
  getAbsoluteImageUrl,
  getOrganizationStructuredData,
  getResponsiveOptimizedImagePaths,
  getTemplateVariables,
} from "@/lib/site-config-helper";
import immobilienbewertungFaqData from "../json/immobilienbewertung/gutachten-org-immobilienbewertung.json";
import immobilienbewertungVerkehrswertFaqData from "../json/immobilienbewertung/gutachten-org-immobilienbewertung-verkehrswert.json";
import verkehrswertFaqData from "../json/immobilienbewertung/verkehrswert-faq.json";

function flattenFaqGroups(
  items: Array<{
    group_name?: string;
    faqs?: Array<{ question: string; answer: string }>;
    faq_groups?: any[];
  }>
): Array<{
  group_name: string;
  faqs: Array<{ question: string; answer: string }>;
}> {
  const result: Array<{
    group_name: string;
    faqs: Array<{ question: string; answer: string }>;
  }> = [];

  for (const item of items) {
    if (item.group_name && item.faqs) {
      // This is a direct group
      result.push({
        group_name: item.group_name,
        faqs: item.faqs,
      });
    } else if (item.faq_groups) {
      // This is a container with nested groups, recursively flatten
      result.push(...flattenFaqGroups(item.faq_groups));
    }
  }

  return result;
}

// Transform the JSON data to match the component's expected format
// The JSON uses "group_name" but the component expects "groupName"
// Handle nested structure by flattening first
const flattenedGroups = flattenFaqGroups(verkehrswertFaqData.faq_groups);
const faqData: FaqGroup[] = flattenedGroups.map(
  (group: {
    group_name: string;
    faqs: Array<{ question: string; answer: string }>;
  }) => ({
    groupName: group.group_name,
    faqs: group.faqs,
  })
);

const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Verkehrswert der Immobilie berechnen lassen - Gutachten.org",
  description:
    "Was ist der Verkehrswert einer Immobilie? Jetzt einfach & professionell berechnen lassen – für Verkauf, Erbe, Scheidung oder Finanzierung.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/immobilienbewertung/",
  openGraph: {
    title: "Verkehrswert der Immobilie berechnen lassen - Gutachten.org",
    description:
      "Was ist der Verkehrswert einer Immobilie? Jetzt einfach & professionell berechnen lassen – für Verkauf, Erbe, Scheidung oder Finanzierung.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/immobilienbewertung/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Verkehrswert der Immobilie berechnen lassen - Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verkehrswert der Immobilie berechnen lassen - Gutachten.org",
    description:
      "Was ist der Verkehrswert einer Immobilie? Jetzt einfach & professionell berechnen lassen – für Verkauf, Erbe, Scheidung oder Finanzierung.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Verkehrswert der Immobilie berechnen lassen - Gutachten.org",
      },
    ],
  },
};

const immobilienbewertungContent: SubpageContent = validateContent([
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
          name: "Immobilienbewertung",
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
      items: [
        ...immobilienbewertungFaqData.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
        ...immobilienbewertungVerkehrswertFaqData.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      ],
      url: `${templateVariables.siteUrl}/immobilienbewertung/`,
      name: "Gutachten.org - FAQ zu Immobilienbewertung",
    },
  }),
  // Organization structured data
  getOrganizationStructuredData(),
  // Hero section

  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer-city",
    variant: "hero-programatic-image",
    title: "Immobilienbewertung",
    subHeading: "Ihre Immobilie – professionell\nbewertet für jeden Zweck",
    description:
      "Ob für die Bankfinanzierung, im Scheidungs- oder Erbfall oder zur verlässlichen Wertfeststellung: Unsere zertifizierten Sachverständigen erstellen rechtskonforme Wertermittlungen und Verkehrswertgutachten (gemäß § 194 BauGB) – schnell, präzise und bundesweit.",
    subtitle:
      "Jetzt kostenlos & unverbindlich Ihr Angebot anfragen – in nur 5 Minuten!",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0 pt-0! container-gutachten",
    heroTitleClassName: "!text-[#D35F17] uppercase text-sm",
    titleClassName: "!leading-none !text-sm",
    subHeadingClassName:
      "xl:!text-[32px] !leading-[1.6] lg:whitespace-pre-line",
    subtitleClassName: "!text-sm !leading-[1.8]",
    imgClassName: "object-cover",
    className: "bg-gray-50",
    descriptionClassName: "text-sm!",
    imageClassName: "w-auto! flex items-center justify-end",
    contentClassName: "flex flex-col items-start justify-center py-[58px]",
    image: {
      src: getImagePath(
        "/images/{{siteId}}/immobilienbewertung/immobilienbewertung-hero.webp"
      ),
      alt: "Experten für Immobiliengutachten im Gespräch",
      width: 589,
      height: 597,
      className:
        "object-cover ml-auto! mt-auto! max-h-[597px] max-w-[589px] hidden lg:block",
    },
    ctas: [
      {
        label: "Unverbindliches Angebot anfragen",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
        className:
          "!px-4.5 text-xs sm:!text-sm w-full md:!max-w-max md:justify-between justify-center! md:gap-6 gap-2",
        icon: "ArrowUpRight",
      },
      {
        label: "Kontakt",
        href: "/kontakt/",
        external: false,
        variant: "outline",
        className:
          "!px-4.5 text-xs sm:!text-sm w-full md:!max-w-max md:justify-between justify-center! md:gap-6 gap-2",
        icon: "ArrowUpRight",
      },
    ],
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
    ctaIconName: "ArrowUpRight",
    ctaIconClassName: "text-[#FF985C]",
    imageWrapperClassName: "w-auto! hidden lg:block",
  }),
  createComponent<TrustBlockSlideshowComponent>({
    type: "TrustBlockSlideshow",
    id: "trust-block-partners",
    title: "Unsere Partner",
    logos: [
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/evalion.webp"),
          alt: "Evalion Logo",
          height: 15,
        },
        title: "Evalion",
        href: "https://www.evalion.net",
      },
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/evatax-logo.webp"),
          alt: "EvaTax Logo",
          height: 20,
          // className: "scale-110",
        },
        title: "EvaTax Logo",
        href: "https://www.evatax.de",
      },
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/afa-recht.webp"),
          alt: "AFA Recht Logo",
          height: 15,
        },
        title: "AFA Recht",
        href: "https://www.afa-recht.de",
      },
      {
        image: {
          src: getImagePath("/images/{{siteId}}/home/gutachten-logo.webp"),
          alt: "Gutachten.org Logo",
          height: 15,
        },
        title: "Gutachten Logo",
        href: "https://www.gutachten.org",
      },
    ],
    titleClassName: "text-[#83878C]! m-0! font-semibold text-base",
    disableCardEffects: true,
    gridClassName: "md:gap-20",
    imageClassName:
      "md:opacity-60 md:grayscale transition-all duration-500 group-hover:scale-[1.1] group-hover:opacity-100 group-hover:grayscale-0",
    logoCardClassName: "p-4! h-24",
    className: "pt-7 pb-6 bg-white",
    subtitleClassName: "text-muted-foreground mx-auto text-xl max-w-7xl",
    titleContainerClassName: "mb-6",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "bares-geld-sparen",
    eyebrow: "WOFÜR SIE EIN GUTACHTEN BENÖTIGEN",
    title: "Typische Anlässe für eine Immobilienbewertung",
    bulletItems: [],
    cardLayoutColumns: 2,
    cards: [
      {
        title: "Immobilienkauf",
        description:
          "Sie planen den Kauf einer Immobilie, sind sich beim geforderten Kaufpreis aber unsicher? Mit einer unabhängigen Wertermittlung erhalten Sie eine fundierte Entscheidungsgrundlage – für mehr Sicherheit bei Finanzierung, Kaufverhandlung und Bankgespräch.",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/office.webp"
        ),
        iconImageAlt: "Immobilienkauf",
      },
      {
        title: "Immobilienverkauf",
        description:
          "Sie möchten Ihr Haus oder Ihre Wohnung verkaufen, kennen den tatsächlichen Wert aber nicht? Wir erstellen eine professionelle Immobilienbewertung, damit Sie den richtigen Angebotspreis festlegen – realistisch, marktgerecht und überzeugend gegenüber Käufern.",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/clock.webp"
        ),
        iconImageAlt: "Immobilienverkauf",
      },
      {
        title: "Trennung oder Scheidung",
        description:
          "Im Rahmen einer Trennung oder Scheidung ist der Immobilienwert oft Grundlage für Ausgleichs- und Eigentumsregelungen. Ein neutrales Verkehrswertgutachten sorgt für Klarheit und vermeidet unnötige Streitigkeiten.",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/pen.webp"
        ),
        iconImageAlt: "Trennung oder Scheidung",
      },
      {
        title: "Erbschaft oder Schenkung",
        description:
          "Sie haben eine Immobilie geerbt oder geschenkt bekommen? Mit einer sachverständigen Immobilienbewertung schützen Sie sich vor überhöhten Steuerforderungen des Finanzamts – und erhalten eine faire Grundlage für mögliche Erbauseinandersetzungen.",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/baulicher.webp"
        ),
        iconImageAlt: "Erbschaft oder Schenkung",
      },
    ],
    eyebrowClassName: "text-[#515A5F]",
    titleClassName:
      "text-[#273238] md:mt-2 m-0! leading-[1] md:whitespace-nowrap",
    bulletTextClassName: "text-[#515A5F]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "md:items-end md:justify-end",
    cardsGridClassName: "md:grid-cols-2",
    contentGridClassName:
      "md:gap-0 flex md:flex-row flex-col items-start md:items-end justify-between",
    containerClassName: "container-gutachten",
    bulletListClassName: "space-y-0! m-0!",
    eyebrowContainerClassName: "lg:w-full!",
    cta: {
      label: "Angebot anfragen",
      href: "/verkehrswertgutachten-anfrage/",
      external: true,
      icon: "ArrowUpRight",
      className: "!px-4.5 text-sm",
    },
  }),
  createComponent<PricingComparisonComponent>({
    type: "PricingComparison",
    sectionId: "pricing",
    variant: "three-column",
    backgroundClassName: "bg-white",
    heading: "Welches Gutachen\nbenötigen Sie?",
    tableRows: [
      {
        title: "",
        secondColumnCard: {
          title: "Kurzgutachten",
          price: "ab 1300 €",
          priceNote: "(inkl. MwSt.)",
          badge: "EMPFOHLEN",
          ctaLabel: "Unverbindlich anfragen",
          ctaHref: "/verkehrswertgutachten-anfrage/",
          external: true,
          ctaVariant: "default",
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
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Kosteneffizient und bedarfsgerecht für Ihr Anliegen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Schnelle und genaue Ergebnisse",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
        },
        thirdColumnCard: {
          features: [
            {
              text: "Außenbesichtigung",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Fotodokumentation",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Erhöhte Wertigkeit des Gutachtens",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
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
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Private Vermögensermittlung",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Kaufentscheidungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Verkaufsvorbereitungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Renovierungsplanungen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
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
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gerichtliche Verfahren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Finanzielle Transaktionen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Immobiliengeschäfte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Behördliche und finanzielle Angelegenheiten",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
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
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Reihenhäuser und Doppelhaushälften",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Ein- und Zweifamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Mehrfamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Grundstücke",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gewerbeobjekte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
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
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Reihenhäuser & Doppelhaushälften",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Ein- und Zweifamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Mehrfamilienhäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Wohn- und Geschäftshäuser",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Spezialimmobilien",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Gewerbeobjekte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
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
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Berechnung des Immobilienwertes",
              subtitle:
                "nach den gesetzlich vorgeschriebenen Wertermittlungsverfahren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Bild- und Textdokumentation",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Optional: Besichtigung & Objektaufnahmetermin",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Prüfung vorhandener Objektunterlagen",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
          lastFeatureMarginBottom: "mb-6",
        },
        thirdColumnCard: {
          features: [
            {
              text: "Schriftliches Wertgutachten",
              subtitle:
                "erstellt durch zertifizierten Sachverständigen auf ca. 60–100 Seiten",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Berechnung des Immobilienwertes",
              subtitle:
                "nach den gesetzlich vorgeschriebenen Wertermittlungsverfahren",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Bild- und Textdokumentation",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Besichtigung & Objektaufnahmetermin",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Prüfung vorhandener Objektunterlagen",
              subtitle: "und ggf. Beschaffung fehlender Dokumente",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
            {
              text: "Zusätzliche Objektunterlagen",
              subtitle:
                "aktueller Grundbuchauszug, Bodenrichtwertkarte, Lageplan, detaillierte Lagebeschreibung, weitere objektbezogenen Planunterlagen/Auskünfte",
              iconImage: getImagePath(
                "/images/{{siteId}}/immobilienbewertung/bitcoin-icons_verify-filled.webp"
              ),
              iconImageAlt: "Prüfzeichen",
            },
          ],
          lastFeatureMarginBottom: "mb-8",
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
    className: "pt-0!",
    containerClassName: "container-gutachten",
    headingClassName:
      "max-w-full justify-center! whitespace-pre-line md:text-center!",
  }),
  createComponent<ProcessOverviewComponent>({
    type: "ProcessOverview",
    id: "process-overview",
    sectionId: "process-overview",
    title: "So funktioniert’s – in 3 einfachen\nSchritten",
    descriptionIntro:
      "Ein Immobiliengutachten muss nicht kompliziert sein. Bei uns starten Sie mit einer kostenfreien Ersteinschätzung – ohne Verpflichtung, aber mit maximaler Transparenz. So wissen Sie von Anfang an, was sinnvoll und wirtschaftlich ist.",
    steps: [
      {
        step: "1",
        title: "Unverbindliches Angebot / Einschätzung",
        description:
          "Ihre Sachverständigen prüfen kostenlos, ob sich ein Gutachten für Sie lohnt. Sie erhalten eine unverbindliche Ersteinschätung.",
      },
      {
        step: "2",
        title: "Bei Beauftragung: individuelle Prüfung",
        description:
          "Ihre Sachverständigen prüfen jede Anfrage individuell im Detail - um Ihre Daten zu plausibilisieren und Ihre Ziele zu erreichen.",
      },
      {
        step: "3",
        title: "Detailliertes Gutachten erhalten",
        description:
          "Sie bekommen Ihr individuell erstelltes Gutachten - als verlässliche Grundlage für Ihre nächsten Schritte.",
      },
    ],
    cta: {
      label: "Angebot anfragen",
      href: "/verkehrswertgutachten-anfrage/",
      external: true,
      className: "text-sm !px-4.5 md:w-fit",
    },
    cardLayoutCardTitleClassName: "min-h-[50px]",
    ctaIconClassName: "text-[#FF985C]",
    containerClassName: "container-gutachten",
    descriptionClassName: "leading-7 whitespace-pre-line max-w-[656px]",
    cardLayoutCardClassName: "shadow-none",
    cardLayoutCardDescriptionClassName: "leading-7",
    headerContainerClassName: "justify-between gap-6",
    headerClassName: "flex md:flex-col lg:gap-0",
    headerTitleClassName: "max-w-max!",
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
        label: "Angebot anfragen",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
        icon: "ArrowUpRight",
        variant: "default",
        className:
          "bg-[#FF985C] hover:bg-[#FF985C]/90 text-gray-900 [&_svg]:text-gray-900 !px-4.5 text-sm w-full md:max-w-max! md:justify-between justify-center! md:gap-6 gap-2",
      },
      {
        label: "Kontakt",
        href: "/kontakt/",
        external: false,
        icon: "ArrowUpRight",
        variant: "outline",
        className:
          "!px-4.5 border-primary text-sm w-full md:max-w-max! md:justify-between justify-center! md:gap-6 gap-2",
      },
    ],
    cards: [
      {
        title: "Felix Holfert",
        description: "Gutachter nach DIN EN ISO / IEC 17024",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Immobilienexperte & Berater",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/gerrit-kolweyh.webp"
        ),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Simon Mill",
        description: "Kundenbetreuung",
        iconImage: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/simon-mill.webp"
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
    backgroundClassName: "bg-[#F8FAFB]",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "tax-savings-section",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      title: "Wann brauche ich ein Verkehrswertgutachten?",
      mediaPosition: "left",
      intro:
        "Ein professionelles Verkehrswertgutachten ist oft gesetzlich gefordert oder dringend empfohlen, z. B.:",
      benefitIcon: {
        src: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/bullet-point.webp"
        ),
        alt: "Bullet point",
        position: "left",
      },
      benefits: [
        {
          content: "Für die Bank bei Immobilienfinanzierungen",
        },
        {
          content: "Bei Scheidung oder Erbschaft zur gerechten Aufteilung",
        },
        {
          content: "Für den Verkauf oder die interne Vermögensaufstellung",
        },
        {
          content: "Für das Finanzamt (z. B. Erbschaftssteuer)",
        },
        {
          content: "Bei Sanierungen, Teilverkäufen oder Nießbrauchregelungen",
        },
      ],
      conclusion:
        "Unsere zertifizierten Gutachter garantieren Ihnen eine neutrale, fundierte und marktgerechte Bewertung Ihrer Immobilie.",
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/immobilienbewertung/seitenansicht-mehrfamilienhaus-gutachten.webp"
        ),
        alt: "seitenansicht mehrfamilienhaus gutachten",
        width: 644,
        height: 720,
      },
      introClassName: "xl:whitespace-pre-line! whitespace-normal",
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "place-content-start justify-between xl:gap-16 gap-8",
      contentClassName: "max-w-[644px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentTitleClassName: "xl:gap-10 gap-6",
      contentIntroClassName: "xl:gap-10 gap-6",
    },
    className: "pb-[120px]!",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "tax-savings-section",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      title: "Was erhalten Sie mit einem Verkehrswertgutachten?",
      mediaPosition: "right",
      intro:
        "Ein professionelles Verkehrswertgutachten ist oft gesetzlich gefordert oder dringend empfohlen, z.B.:",
      cta: {
        label: "Angebot anfragen",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
        className:
          "!px-4.5 w-full md:max-w-max! md:justify-between justify-center! md:gap-6 gap-2",
      },
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/immobilienbewertung/verkehrswert-kennen.webp"
        ),
        alt: "verkehrswert kennen",
        width: 644,
        height: 720,
      },
      benefitIcon: {
        src: getImagePath(
          "/images/{{siteId}}/immobilienbewertung/bullet-point.webp"
        ),
        alt: "Bullet point",
        position: "left",
      },
      benefits: [
        {
          content: "Vollständige und nachvollziehbare Wertermittlung",
        },
        {
          content: "Rechtssichere Dokumentation",
        },
        {
          content: "Anerkennung bei Banken, Gerichten, Behörden & Ämtern",
        },
        {
          content: "Persönlicher Ansprechpartner – auch nach dem Gutachten",
        },
      ],
      conclusion:
        "Auch bekannt als: Immobilienbewertung durch Sachverständige & Marktwertgutachten",
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      introClassName: "xl:whitespace-pre-line! whitespace-normal",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "pt-0 place-content-end justify-between xl:gap-16 gap-8",
      contentClassName: "max-w-[644px] gap-10",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentTitleClassName: "xl:gap-10 gap-6",
      contentIntroClassName: "xl:gap-10 gap-6",
    },
    className: "pt-0!",
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Häufig gestellte Fragen",
    items: immobilienbewertungFaqData,
    sectionId: "faq",
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Verkehrswert",
    items: faqData,
    sectionId: "faq",
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default immobilienbewertungContent;
