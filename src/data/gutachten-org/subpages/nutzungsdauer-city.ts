import type {
  HeroWithFeatureCardsComponent,
  SubpageContent,
  TextImageComponent,
  StructuredDataComponent,
  RecommendedLinksComponent,
  ProcessOverviewComponent,
  TaxSavingsShowcaseComponent,
  BaresGeldSparenSectionComponent,
  FAQComponent,
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

import homeFaqData from "../json/home/gutachten-org-home-faq.json";
import nutzungsdauerCityFaqData from "../json/nutzungsdauer-city/nutzungsdauer-city.json";

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
  faqData: typeof nutzungsdauerCityFaqData
): typeof homeFaqData {
  // Process the data structure and map template variable names
  // JSON uses snake_case (list_of_city_districts) but system uses camelCase (listOfCityDistricts)
  // Also map city_name to programmaticInstanceName
  const processedItems = faqData.faq_items.map((item) => {
    // Map template variable names from JSON format to system format
    let question = item.question
      .replace(/\{\{city_name\}\}/g, "{{programmaticInstanceName}}")
      .replace(/\{\{list_of_city_districts\}\}/g, "{{listOfCityDistricts}}")
      .replace(
        /\{\{list_of_surrounding_cities\}\}/g,
        "{{listOfSurroundingCities}}"
      );

    let answer = item.answer
      .replace(/\{\{city_name\}\}/g, "{{programmaticInstanceName}}")
      .replace(/\{\{list_of_city_districts\}\}/g, "{{listOfCityDistricts}}")
      .replace(
        /\{\{list_of_surrounding_cities\}\}/g,
        "{{listOfSurroundingCities}}"
      );

    // Use the ID from JSON if available, otherwise generate from question
    const id = item.id || generateFaqId(question);

    return {
      id,
      question,
      answer,
    };
  });

  return processedItems;
}

// Process FAQ data - template variables will be resolved at runtime
const processedFaqData = processFaqData(nutzungsdauerCityFaqData);

export const metadata: SubpageMetadata = {
  title:
    "Nutzungsdauergutachten {{programmaticInstanceName}}",
  description:
    "Professionelles Nutzungsdauergutachten in {{programmaticInstanceName}} vom Sachverständigen - Restnutzungsdauer für Immobilien sicher ermitteln & abschreiben",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical:
    templateVariables.siteUrl + "/nutzungsdauergutachten/{{programmaticInstanceSlug}}/",
  openGraph: {
    title:
      "Nutzungsdauergutachten {{programmaticInstanceName}}",
    description:
      "Professionelles Nutzungsdauergutachten in {{programmaticInstanceName}} vom Sachverständigen - Restnutzungsdauer für Immobilien sicher ermitteln & abschreiben",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/nutzungsdauergutachten/{{programmaticInstanceSlug}}/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 634,
        height: 452,
        alt: "Nutzungsdauergutachten {{programmaticInstanceName}}",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nutzungsdauergutachten {{programmaticInstanceName}}",
    description:
      "Professionelles Nutzungsdauergutachten in {{programmaticInstanceName}} vom Sachverständigen - Restnutzungsdauer für Immobilien sicher ermitteln & abschreiben",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 634,
        height: 452,
        alt: "Nutzungsdauergutachten {{programmaticInstanceName}} - Restnutzungsdauer prüfen",
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
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: processedFaqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: templateVariables.siteUrl + "/nutzungsdauergutachten/{{programmaticInstanceSlug}}",
      name: `Gutachten.org - ${nutzungsdauerCityFaqData.faq_title.replace(/\{\{city_name\}\}/g, "{{programmaticInstanceName}}")}`,
    },
  }),
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-nutzungsdauer-city",
    schemaType: "article",
    data: {
      headline: `Nutzungsdauergutachten {{programmaticInstanceName}} – ${templateVariables.siteName}`,
      description:
        "Nutzungsdauergutachten in {{programmaticInstanceName}}: AfA-Dauer verkürzen und Steuern sparen durch professionelle Restnutzungsdauer-Ermittlung.",
      url: templateVariables.siteUrl + "/nutzungsdauer-{{programmaticInstanceSlug}}",
      image: getImagePath(
        "/images/{{siteId}}/nutzungsdauer-city/nutzungsdauer-hero.webp"
      ),
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
      articleSection: "Nutzungsdauergutachten",
    },
  }),
];

const nutzungsdauerCityContent: SubpageContent = validateContent([
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
          name: "Restnutzungsdauer {{programmaticInstanceName}}",
        },
      ],
    },
  }),
  ...structuredDataComponents,

  // HeroWithFeatureCards component
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer-city",
    variant: "hero-programatic-image",
    title: "Nutzungsdauer - Berlin",
    subHeading:
      "Restnutzungsdauer Gutachten\nin Berlin - kostenlose\nErsteinschätzung",
    description:
      "Ein Restnutzungsdauergutachten in Berlin ermöglicht es Eigentümern, die Abschreibungsdauer (AfA) ihrer vermieteten Immobilie realistisch zu verkürzen – und dadurch jährlich Steuern zu sparen. Statt der pauschalen 50 Jahre kann ein fachlich begründetes Gutachten z. B. eine Restnutzungsdauer von nur 30 oder 25 Jahren ansetzen. Unsere Sachverständigen erstellen rechtssichere Gutachten nach § 7 Abs. 4 EStG – anerkannt vom Finanzamt.",
    subtitle:
      "Jetzt kostenlose Ersteinschätzung sichern und individuelles Sparpotenzial prüfen lassen!",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0 pt-0! container-gutachten",
    heroTitleClassName: "!text-[#D35F17] uppercase text-sm",
    titleClassName: "!leading-none !text-sm",
    subHeadingClassName:
      "xl:!text-[32px] !leading-[1.6] lg:whitespace-pre-line",
    subtitleClassName: "!text-sm !leading-[1.8]",
    imageWrapperClassName: "w-auto!",
    imgClassName: "object-cover",
    className: "bg-gray-50",
    descriptionClassName: "text-sm!",
    imageClassName: "w-auto!",
    contentClassName: "flex flex-col items-start justify-center py-8 xl:py-16",
    image: {
      src: getImagePath(
        "/images/{{siteId}}/nutzungsdauer-city/nutzungsdauer-berlin.webp"
      ),
      alt: "Experten für Immobiliengutachten im Gespräch",
      width: 600,
      height: 400,
    },
    imageOverlay: {
      profileCard: {
        image: {
          src: getImagePath(
            "/images/{{siteId}}/nutzungsdauer-city/felix-holfert.webp"
          ),
          alt: "Felix Holfert",
          width: 216,
          height: 155,
        },
        name: "Felix Holfert",
        title: "Immobilienbewerter gemäß <br/> to DIN ISO 17 0 24",
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
    ctas: [
      {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        icon: "ArrowUpRight",
        className:
          "!px-4.5 w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
      {
        label: "Gutachten bestellen",
        href: "/nutzungsdauer-anfrage",
        external: true,
        icon: "ArrowUpRight",
        className:
          "!px-4.5 w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
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
    ctaIconName: "ArrowUpRight",
    ctaIconClassName: "text-[#FF985C]",
  }),

  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "team-section",
    title: "Was ist ein\nNutzungsdauergutachten –\nund warum lohnt es sich?",
    bulletItems: [],
    summary: [
      "Ein Nutzungsdauergutachten ist ein fachlich fundierter Nachweis über die tatsächliche wirtschaftliche Lebensdauer eines Gebäudes. Es wird von einem zertifizierten Sachverständigen erstellt und berücksichtigt Baujahr, Modernisierungen, baulichen Zustand und die zu erwartende Instandhaltungsintensität. Mit diesem Gutachten können Eigentümer gegenüber dem Finanzamt belegen, dass die pauschale 50-jährige Nutzungsdauer nicht zutrifft. Dadurch wird eine höhere jährliche Abschreibung möglich - gesetzeskonform, transparent und nachvollziehbar. Für Eigentümer bedeutet das: geringere Steuerlast, höhere Liquidität und langfristig ein besserer Cashflow.",
    ],
    highlight: [
      "Nutzungsdauergutachten",
      "tatsächliche wirtschaftliche Lebensdauer",
      "zertifizierten Sachverständigen",
      "Finanzamt",
      "höhere jährliche Abschreibung",
      "gesetzeskonform, transparent und nachvollziehbar",
      "geringere Steuerlast, höhere Liquidität und langfristig ein besserer Cashflow",
    ],
    cards: [],
    cardsGridClassName: "m-0!",
    ctaIconClassName: "text-[#FF985C]",
    headerTitle:
      "Steuervorteile sichern durch den Nachweis einer kürzeren Restnutzungsdauer",
    titleClassName: "whitespace-pre-line",
    backgroundClassName: "bg-gray-50",
    headerTitleClassName: "uppercase",
    containerClassName: "container-gutachten",
    summaryClassName: "!text-base",
    cardLayoutCardClassName: "bg-transparent",
  }),

  createComponent<RecommendedLinksComponent>({
    type: "RecommendedLinks",
    id: "recommended-links-city",
    title: "Die Vorteile von\nNutzungsdauer-Gutachten",
    sectionId: "recommended-links-city",
    cardLayoutGridClassName: "pt-8 md:pt-16 lg:grid-cols-3",
    cardLayoutCardClassName: "bg-transparent",
    links: [
      {
        title: "Höhere Abschreibungen",
        excerpt:
          "Ein Nutzungsdauergutachten ermöglicht höhere jährliche Abschreibungen – und senkt dadurch steuerpflichtigen Gewinn spürbar.",
        href: "#",
      },
      {
        title: "Steuervorteile für Vermieter nutzen",
        excerpt:
          "Durch die verkürzte AfA-Dauer zahlen Sie deutlich weniger Einkommensteuer auf Ihre Mieteinnahmen – und steigern so Ihre Nachsteuerrendite.",
        href: "#",
      },
      {
        title: "Mehr Netto aus der Vermietung",
        excerpt:
          "Die geringere Steuerbelastung verbessert Ihren monatlichen Cashflow – für mehr Liquidität und eine bessere Gesamtrendite Ihrer Immobilie.",
        href: "#",
      },
    ],
    cta: {
      label: "Kostenlose Ersteinschätzung",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      external: true,
      className:
        "md:w-max w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6 mt-auto! !px-4.5",
    },
    className: "bg-[#F8FAFB]",
    titleContainerClassName:
      "justify-between flex-wrap md:flex-nowrap gap-4 md:gap-0 !flex-row-reverse",
    titleClassName: "text-end",
    gridClassName: "mt-8! md:mt-16!",
    ctaIconName: "ArrowUpRight",
    ctaIconClassName: "text-[#FF985C]",
    cardClassName: "bg-none!",
    iconItems: [
      {
        icon: "Timer",
        name: "Verkürzte Nutzungsdauer",
      },
      {
        icon: "TrendingUp",
        name: "Höhere Abschreibungen",
      },
      {
        icon: "Percent",
        name: "Höhere Einsparung",
      },
      {
        icon: "ChevronsDown",
        name: "Niedrigere Steuerlast",
      },
      {
        icon: "ChevronsUp",
        name: "Höhere Rendite",
      },
    ],
    iconItemsClassName: "md:mt-16! mt-8!",
    containerClassName: "container-gutachten !pt-11",
  }),

  createComponent<ProcessOverviewComponent>({
    type: "ProcessOverview",
    id: "process-overview-city",
    sectionId: "process-overview-city",
    title: "Der Ablauf",
    highlights: [
      { text: "Einfach" },
      { text: "Transparent" },
      { text: "unverbindlich" },
    ],
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
      label: "Kostenlose Ersteinschätzung",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      external: true,
      className:
        "md:w-max w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6 !px-4.5 text-sm",
    },
    media: (() => {
      const imagePaths = getResponsiveOptimizedImagePaths(
        "/images/{{siteId}}/nutzungsdauer-city/der-ablauf-orange.webp"
      );
      return {
        ...imagePaths,
        alt: "Gutachterteam bespricht Prozessschritte",
        overlayImage: {
          src: getImagePath(
            "/images/{{siteId}}/nutzungsdauer-city/vector.webp"
          ),
          alt: "Dekoratives Vektorelement",
          width: 286,
          height: 300,
        },
      };
    })(),
    stepsClassName: "mt-0!",
    ctaIconClassName: "text-[#FF985C]",
    headerContainerClassName: "gap-10!",
    descriptionClassName: "leading-[28px]",
    containerClassName: "container-gutachten",
    cardLayoutCardTitleClassName: "min-h-[75px]",
  }),

  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "team-section",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "team-section",
      title: "Über uns: Felix Holfert",
      heading: "Immobiliengutachter nach DIN EN ISO 170 24",
      mediaPosition: "left",
      intro:
        "Unser erfahrenes Sachverständigen-Team rund um Felix Holfert, der die Gutachtenkoordination verantwortet, steht für höchste fachliche Qualität. Felix Holfert ist Geprüfter Sachverständiger für Immobilien- und Grundstückswertermittlung, zertifiziert durch zwei nach DIN EN ISO / IEC 17024 akkreditierte Stellen. Zudem ist er TEGoVA-zertifizierter Recognised European Valuer (REV) sowie International Appraiser (DIA) und bringt langjährige Praxiserfahrung in der Bewertung von Immobilien und Grundstücken mit.",
      ctas: [
        {
          label: "Immobilie kostenfrei prüfen",
          href: "/restnutzungsdauergutachten-ersteinschaetzung/",
          external: true,
          icon: "ArrowUpRight",
          variant: "default",
          className:
            "!px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
        },
        {
          label: "Termin buchen",
          href: "/kontakt/",
          external: false,
          icon: "ArrowUpRight",
          variant: "default",
          className:
            "!px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
        },
      ],
      media: {
        src: getImagePath(
          "/images/{{siteId}}/nutzungsdauer-city/felix-holfert.webp"
        ),
        alt: "Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin",
        width: 644,
        height: 720,
      },

      contentHeadingClassName: "flex-col-reverse gap-4",
      headingClassName: "font-normal text-[#515A5F] text-base",
      ctaContainerClassName: "md:justify-start! flex-col md:flex-row gap-4",
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "place-content-end justify-between xl:gap-16 gap-8",
      contentClassName: "max-w-[644px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
    },
    className: "py-20 md:py-[120px] bg-white",
  }),

  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "nutzungsdauer-city-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "nutzungsdauer-city-section-1",
      title:
        "Steuersparpotenzial nutzen –\nmit verkürzter\nAbschreibungsdauer in Berlin",
      mediaPosition: "right",
      intro:
        "Als Vermieter in Berlin können Sie Ihre Immobilie deutlich schneller abschreiben – und dadurch jedes Jahr bares Geld sparen. Anstelle der pauschalen 50 Jahre Nutzungsdauer erlaubt der Gesetzgeber eine verkürzte AfA, wenn Sie diese durch ein qualifiziertes Restnutzungsdauergutachten belegen.",
      secondIntro:
        "Gerade bei älteren Immobilien – insbesondere mit Baujahr vor 2000 – ist eine reale Restnutzungsdauer von 25 bis 35 Jahren oft plausibel. Das Gutachten dient als offizieller Nachweis gegenüber dem Finanzamt und ermöglicht höhere Abschreibungen und spürbare Steuervorteile.\n\nJetzt kostenlose Ersteinschätzung für Ihre Immobilie in Berlin anfordern!",
      cta: {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        className:
          "md:w-max w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6 !px-4.5",
      },
      media: {
        src: getImagePath(
          "/images/{{siteId}}/nutzungsdauer-city/berlin-two.webp"
        ),
        alt: "Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin",
        width: 644,
        height: 720,
      },
      introClassName: "xl:whitespace-pre-line! whitespace-normal",
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "place-content-end justify-between xl:gap-16 gap-8",
      contentClassName: "max-w-[644px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
    },
    className: "pt-0!",
  }),

  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "nutzungsdauer-city-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "nutzungsdauer-city-section-1",
      title: "Steuervorteile sichern durch verkürzte Abschreibung in\nBerlin",
      mediaPosition: "left",
      intro:
        "Ein Restnutzungsdauergutachten für Ihre Immobilie in Berlin kann Ihre steuerliche Abschreibung spürbar verkürzen – oft auf 30 oder 15 Jahre. Das senkt Ihre Steuerlast und steigert Ihre jährliche Nachsteuerrendite. Besonders bei vermieteten Bestandsimmobilien ist das ein einfacher Hebel für mehr Netto vom Brutto.",
      secondIntro:
        "Unsere Gutachten sind fundiert, finanzamttauglich und schnell erstellt. Jetzt kostenlose Ersteinschätzung erhalten!",
      cta: {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        className:
          "md:w-max w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6 !px-4.5",
      },
      media: {
        src: getImagePath(
          "/images/{{siteId}}/nutzungsdauer-city/berlin-one.webp"
        ),
        alt: "Steuervorteile sichern durch verkürzte Abschreibung in Berlin",
        width: 644,
        height: 720,
      },
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "place-content-start justify-between xl:gap-16 gap-8",
      contentClassName: "max-w-[644px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
    },
  }),

  createComponent<TaxSavingsShowcaseComponent>({
    type: "TaxSavingsShowcase",
    id: "tax-savings-showcase-city",
    eyebrow: "echte Praxisbeispiele und überzeugende Ergebnisse.﻿",
    title: "Steuerersparnis mit verkürzter Nutzungsdauer",
    description:
      "Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte Abschreibungen Ihre Steuerlast deutlich senken können.",
    cta: {
      label: "Mein Objekt prüfen",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      external: true,
      className:
        "md:w-max w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6 !px-4.5",
    },
    benefitIcon: {
      src: getImagePath(
        "/images/{{siteId}}/nutzungsdauer-city/bullet-point.webp"
      ),
      alt: "Bullet point",
      position: "left",
    },
    properties: [
      {
        image: getImagePath(
          "/images/{{siteId}}/nutzungsdauer-city/mehrfamilienhaus-42-einheiten.webp"
        ),
        propertyType: "Mehrfamilienhaus",
        width: 600,
        height: 333,
        buildingValue: "8.413.000 €",
        buildingValueLabel: "Gebäudewert",
        taxSavings: "3.350 € / Jahr",
        taxSavingsLabel: "Steuerersparnis",
        remainingUsefulLife: "23 Jahre",
        remainingUsefulLifeLabel: "Restnutzungsdauer",
        features: [
          { text: "Modernisierung der Heizungsanlage: 2016" },
          { text: "keine Außendämmung vorhanden" },
        ],
        stats: [
          { label: "Bj. 1996", value: "1904" },
          { label: "Einheiten", value: "42" },
          { label: "m2", value: "4206,6" },
        ],
        imageOverlay: {
          text: "Mehrfamilienhaus",
        },
      },
      {
        image: getImagePath(
          "/images/{{siteId}}/nutzungsdauer-city/mehrfamilienhaus-4206qm.webp"
        ),
        propertyType: "Mehrfamilienhaus",
        width: 600,
        height: 333,
        buildingValue: "8.413.000 €",
        buildingValueLabel: "Gebäudewert",
        taxSavings: "3.350 € / Jahr",
        taxSavingsLabel: "Steuerersparnis",
        remainingUsefulLife: "23 Jahre",
        remainingUsefulLifeLabel: "Restnutzungsdauer",
        features: [
          { text: "Modernisierung der Heizungsanlage: 2016" },
          { text: "keine Außendämmung vorhanden" },
        ],
        stats: [
          { label: "Bj. 1996", value: "1904" },
          { label: "Einheiten", value: "42" },
          { label: "m2", value: "4206,6" },
        ],
        imageOverlay: {
          text: "Mehrfamilienhaus",
        },
      },
      {
        image: getImagePath(
          "/images/{{siteId}}/nutzungsdauer-city/mehrfamilienhaus-baujahr-1996.webp"
        ),
        propertyType: "Mehrfamilienhaus",
        width: 600,
        height: 333,
        buildingValue: "8.413.000 €",
        buildingValueLabel: "Gebäudewert",
        taxSavings: "3.350 € / Jahr",
        taxSavingsLabel: "Steuerersparnis",
        remainingUsefulLife: "23 Jahre",
        remainingUsefulLifeLabel: "Restnutzungsdauer",
        features: [
          { text: "Modernisierung der Heizungsanlage: 2016" },
          { text: "keine Außendämmung vorhanden" },
        ],
        stats: [
          { label: "Bj. 1996", value: "1904" },
          { label: "Einheiten", value: "42" },
          { label: "m2", value: "4206,6" },
        ],
        imageOverlay: {
          text: "Mehrfamilienhaus",
        },
      },
    ],
    ctaIconName: "ArrowUpRight",
    ctaIconClassName: "text-[#FF985C]",
    className: "bg-[#F8FAFB]",
    containerClassName: "container-gutachten",
  }),

  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "bares-geld-sparen-city",
    title:
      "Restnutzungsdauergutachten in Berlin -\neinfach, schnell und steuerwirksam: worauf es ankommt",
    bulletItems: [],
    cardLayoutColumns: 2,
    cards: [
      {
        title: "Art der Immobilie - Einfluss auf die Restnutzungsdauer",
        description:
          "Die Art der Immobilie hat erheblichen Einfluss auf die Einschätzung der Restnutzungsdauer. Ob Einfamilienhaus, Eigentumswohnung oder Gewerbeeinheit – jeder Immobilientyp ist unterschiedlichen Nutzungsbelastungen und Abnutzungsfaktoren ausgesetzt. Diese Unterschiede werden im Nutzungsdauergutachten berücksichtigt und fließen direkt in die Bewertung der tatsächlichen Lebensdauer ein.",
      },
      {
        title: "Baujahr - Basis für die technische Lebensdauer Ihrer Immobilie",
        description:
          "Das Baujahr liefert zentrale Hinweise zur Bauweise, zum verwendeten Material und zum typischen Verschleißverhalten einer Immobilie. Je älter das Gebäude, desto relevanter ist eine individuelle Einschätzung der Restnutzungsdauer. Ein professionelles Nutzungsdauergutachten bewertet genau diese Faktoren – und schafft so die Grundlage für eine fundierte steuerliche Optimierung.",
      },
      {
        title: "Modernisierungen - Verlängern sie die Restnutzungsdauer?",
        description:
          "Durchgeführte Modernisierungen beeinflussen die Restnutzungsdauer oft erheblich. Erneuerungen an Dach, Fassade, Fenstern, Heizung oder Bädern können die technische Lebensdauer verlängern und den baulichen Zustand verbessern. Diese Angaben fließen direkt in das Restnutzungsdauergutachten ein – und helfen dabei, eine realistische und steuerlich wirksame Einschätzung vorzunehmen.",
      },
      {
        title:
          "Baulicher Zustand & Besonderheiten - entscheidend für die Bewertung",
        description:
          "Der bauliche Zustand einer Immobilie ist ein zentraler Faktor im Nutzungsdauergutachten. Schäden, Abnutzung oder Sanierungsbedarf verkürzen die Restnutzungsdauer – während ein gepflegter Zustand diese deutlich verlängern kann. Auch individuelle Besonderheiten wie Ausstattungsqualität oder energetische Sanierungen werden berücksichtigt und beeinflussen das Ergebnis des Gutachtens direkt.",
      },
    ],
    cardIconClassName: "m-0",
    eyebrowClassName: "text-[#515A5F] mb-6",
    titleClassName: "text-[#273238] md:whitespace-pre-line",
    bulletTextClassName: "text-[#515A5F]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "md:items-end md:justify-end hidden",
    cardsGridClassName: "md:grid-cols-2",
    eyebrowContainerClassName: "space-y-0! w-full!",
    contentGridClassName: "gap-0!",
    containerClassName: "container-gutachten",
  }),

  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: nutzungsdauerCityFaqData.faq_title.replace(
      /\{\{city_name\}\}/g,
      "{{programmaticInstanceName}}"
    ),
    items: processedFaqData,
    sectionId: "faq",
    defaultOpenIds: ["was-ist-ein-nutzungsdauergutachten"],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default nutzungsdauerCityContent;
