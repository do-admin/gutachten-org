import type {
  HeroWithFeatureCardsComponent,
  SubpageContent,
  TextImageComponent,
  StructuredDataComponent,
  BaresGeldSparenSectionComponent,
  PricingComparisonComponent,
  ProcessOverviewComponent,
  TaxSavingsShowcaseComponent,
  FAQComponent,
  TrustBlockSlideshowComponent,
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

import nutzungsdauerFaqData from "../json/nutzungsdauer/nutzungsdauer-faq.json";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Restnutzungsdauer berechnen - Gutachten.org",
  description:
    "Restnutzungsdauer einer Immobilie ermitteln & Abschreibung (AfA) optimieren: Steuerlich anerkanntes Gutachten schnell & digital beauftragen.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/nutzungsdauer/",
  openGraph: {
    title: "Restnutzungsdauer berechnen - Gutachten.org",
    description:
      "Restnutzungsdauer einer Immobilie ermitteln & Abschreibung (AfA) optimieren: Steuerlich anerkanntes Gutachten schnell & digital beauftragen.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/nutzungsdauer/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Restnutzungsdauer berechnen - Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restnutzungsdauer berechnen - Gutachten.org",
    description:
      "Restnutzungsdauer einer Immobilie ermitteln & Abschreibung (AfA) optimieren: Steuerlich anerkanntes Gutachten schnell & digital beauftragen.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Restnutzungsdauer berechnen - Gutachten.org",
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
          name: "Restnutzungsdauer",
          // Last item doesn't need item field
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: nutzungsdauerFaqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: templateVariables.siteUrl + "/nutzungsdauer/",
      name: "Gutachten.org - FAQ zu Nutzungsdauergutachten",
    },
  }),
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-nutzungsdauer",
    schemaType: "article",
    data: {
      headline: `Nutzungsdauer – ${templateVariables.siteName}`,
      description:
        "Informationen zur Nutzungsdauer von Immobilien und deren Bedeutung für die Abschreibung und steuerliche Behandlung.",
      url: templateVariables.siteUrl + "/nutzungsdauer/",
      image: [
        {
          "@type": "ImageObject",
          url: getAbsoluteImageUrl(
            "/images/{{siteId}}/nutzungsdauer/nutzungsdauer-hero.webp"
          ),
          width: 1200,
          height: 630,
        },
      ],
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": templateVariables.siteUrl + "/nutzungsdauer/",
      },
      inLanguage: "de-DE",
      articleSection: "Immobilien",
    },
  }),
];

const nutzungsdauerContent: SubpageContent = validateContent([
  ...structuredDataComponents,

  // HeroWithFeatureCards component
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer",
    variant: "hero-programatic-image",
    title: "Nutzungsdauer",
    subHeading:
      "Nutzungsdauergutachten –\njetzt Restnutzungsdauer prüfen\nund Steuern sparen",
    subtitle:
      "Sie möchten wissen, ob sich ein Nutzungsdauergutachten für Ihre Immobilie lohnt? Fragen Sie jetzt unverbindlich ihre kostenfreie Ersteinschätzung an.",
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
        "/images/{{siteId}}/nutzungsdauer/nutzungsdauer-hero.webp"
      ),
      alt: "Experten für Immobiliengutachten im Gespräch",
      width: 600,
      height: 400,
    },
    imageOverlay: {
      profileCard: {
        image: {
          src: getImagePath(
            "/images/{{siteId}}/nutzungsdauer/felix-holfert.webp"
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
    ctas: [
      {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        className:
          "!px-4.5 md:max-w-max! w-full md:justify-between justify-center! md:gap-6 gap-2",
        icon: "ArrowUpRight",
      },
      {
        label: "Gutachten bestellen",
        href: "/nutzungsdauer-anfrage/",
        external: true,
        className:
          "!px-4.5 md:max-w-max! w-full md:justify-between justify-center! md:gap-6 gap-2",
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
    cards: [
      {
        title: "Steuerlast senken",
        description:
          "Erhöhen Sie Ihre Abschreibungen gezielt mit einem professionellen Nutzungsdauergutachten.",
        iconImage: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/strategy-success.webp"
        ),
        iconImageAlt: "Geld investieren",
      },
      {
        title: "Nettoeinkommen steigern",
        description:
          "Sparen Sie Steuern mit smarter Abschreibung – spürbar mehr Geld im Jahr.",
        iconImage: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/money-invest.webp"
        ),
        iconImageAlt: "Diagramm",
      },
      {
        title: "Zertifizierte Expertise",
        description:
          "Anerkannte Gutachten von DIN ISO/IEC 17024 Experten – finanzamtskonform.",
        iconImage: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/pie-chart.webp"
        ),
        iconImageAlt: "Strategie",
      },
    ],
    ctaIconClassName: "text-[#FF985C]",
    headerTitle:
      "Steuervorteile sichern durch den Nachweis einer kürzeren Restnutzungsdauer",
    headerCta: {
      label: "Meine Immobilie prüfen",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      external: true,
      className:
        "md:w-[270px]! w-full flex md:justify-between justify-center! md:gap-6 gap-2 text-sm !px-4.5 mb-0",
    },
    eyebrowContainerClassName: "flex flex-col gap-4 md:gap-[50px]",
    titleClassName: "whitespace-pre-line text-xl",
    backgroundClassName: "bg-gray-50",
    headerTitleClassName: "uppercase",
    containerClassName: "container-gutachten",
    summaryClassName: "!text-sm sm:!text-base",
    cardLayoutCardClassName: "bg-transparent",
  }),

  createComponent<ProcessOverviewComponent>({
    type: "ProcessOverview",
    id: "process-overview",
    sectionId: "process-overview",
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
      className: "text-sm !px-4.5 md:w-[270px]",
    },
    media: (() => {
      const imagePaths = getResponsiveOptimizedImagePaths(
        "/images/{{siteId}}/nutzungsdauer/der-ablauf-orange.webp"
      );
      return {
        ...imagePaths,
        alt: "Gutachterteam bespricht Prozessschritte",
        overlayImage: {
          src: getImagePath("/images/{{siteId}}/nutzungsdauer/vector.webp"),
          alt: "Dekoratives Vektorelement",
          width: 286,
          height: 300,
        },
      };
    })(),
    ctaIconClassName: "text-[#FF985C]",
    containerClassName: "container-gutachten",
    descriptionClassName: "leading-7",
    cardLayoutCardClassName: "shadow-none",
    cardLayoutCardDescriptionClassName: "leading-7",
    cardLayoutCardTitleClassName: "min-h-[74.25px]",
  }),

  createComponent<PricingComparisonComponent>({
    type: "PricingComparison",
    id: "pricing-comparison",
    sectionId: "pricing",
    heading: "Was kostet ein Nutzungsdauergutachten?",
    topCtaLabel: "Unsere Preisliste",
    topCtaHref: "/nutzungsdauergutachten-preisliste",
    topCtaIcon: "ArrowUpRight",
    tiers: [
      {
        title: "Restnutzungsdauergutachten\n(ohne Vor-Ort-Besichtigung)",
        price: "ab 950,00 €",
        priceNote: "(inkl. MwSt)",
        features: [
          {
            text: "Erstellt durch zertifizierte Gutachter\n(DIN EN ISO/IEC 17024)",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Komplexe Gutachten mit fundierter Berechnung",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Nach geltender Rechtssprechung zur Anerkennung beim Finanzamt",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
        ],
        ctaLabel: "Kostenlose Ersteinschätzung",
        ctaHref: "/restnutzungsdauergutachten-ersteinschaetzung/",
        ctaVariant: "default",
        external: true,
      },
      {
        title: "Mit Vor-Ort-Außenbesichtigung",
        price: "179,00 €",
        pricePrefix: "",
        priceNote: "(inkl. MwSt)",
        priceClassName: "text-[#EB6613]",
        features: [
          {
            text: "Außenbesichtigung",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Fotodokumentation",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Erhöhte Wertigkeit des Gutachtens",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
        ],
        ctaLabel: "Kostenlose Ersteinschätzung",
        ctaHref: "/restnutzungsdauergutachten-ersteinschaetzung/",
        ctaVariant: "accent",
        badge: "EMPFOHLEN",
        highlighted: true,
      },
      {
        title: "Mit Vor-Ort-Innen-und-Außenbesichtigung",
        price: "475,00 €",
        pricePrefix: "",
        priceNote: "(inkl. MwSt)",
        features: [
          {
            text: "Außenbesichtigung",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Innenbesichtigung",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Umfangreiche Fotodokumentation",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
          {
            text: "Maximale Wertigkeit des Gutachtens",
            iconImage: getImagePath(
              "/images/{{siteId}}/nutzungsdauer/bitcoin-icons_verify-filled.webp"
            ),
            iconImageAlt: "Prüfzeichen",
          },
        ],
        ctaLabel: "Kostenlose Ersteinschätzung",
        ctaHref: "/restnutzungsdauergutachten-ersteinschaetzung/",
        ctaVariant: "default",
        external: true,
      },
    ],
    titleClassName: "md:whitespace-pre-line md:min-h-[48px]",
    containerClassName: "container-gutachten",
    topCtaClassName:
      "!px-4.5 md:w-[274px] w-full md:justify-between justify-center! md:gap-6 gap-2",
    headingClassName: "text-xl",
    topCtaLabelClassName: "text-center max-w-max!",
  }),

  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "nutzungsdauer-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "nutzungsdauer-section-1",
      title: "Weniger Steuern zahlen – mehr\nNetto pro Jahr sichern",
      mediaPosition: "left",
      intro:
        "In Deutschland werden die meisten vermieteten Immobilien pauschal über 50 Jahre abgeschrieben - unabhängig von Zustand oder Baujahr. In der Realität haben viele Gebäude jedoch eine deutlich kürzere Restnutzungsdauer, besonders ältere oder teilsanierte Objekte.",
      secondIntro:
        "Genau hier setzt unser Nutzungsdauergutachten an. Es zeigt auf, wie lange Ihre Immobilie tatsächlich noch wirtschaftlich genutzt werden kann und dient als fundierte Grundlage gegenüber dem Finanzamt. So können Sie Ihre Abschreibung beschleunigen, Ihre Steuerlast senken und Ihre Rendite nachhaltig steigern.",
      highlight: [
        "deutlich kürzere Restnutzungsdauer",
        "Nutzungsdauergutachten",
        "Abschreibung beschleunigen",
      ],
      cta: {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        className:
          "md:w-fit w-full md:justify-between justify-center! md:gap-6 gap-2 !px-4.5",
      },
      media: {
        src: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/kostenlose-erstberatung.webp"
        ),
        alt: "Steuern sparen mit verkürzter Abschreibungsdauer",
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
    },
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "nutzungsdauer-section-2",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "nutzungsdauer-section-2",
      title:
        "Steuerliche Abschreibung optimieren - mit Nachweis der verkürzten Restnutzungsdauer",
      mediaPosition: "right",
      intro:
        "Viele Eigentümer wissen gar nicht, dass sich durch eine verkürzte Restnutzungsdauer erhebliche steuerliche Vorteile ergeben können. Bereits wenige Jahre Unterschied machen einen deutlichen Effekt in der jährlichen Steuerbilanz aus.",
      secondIntro:
        "Unsere nach DIN ISO/IEC 17024 zertifizierten Sachverständigen erstellen die Gutachten so, dass sie steuerlich anerkannt sind und reibungslos beim Finanzamt eingebracht werden können. Dabei legen wir größten Wert auf Nachvollziehbarkeit, Plausibilität und eine transparente Dokumentation aller Einflussfaktoren.",
      highlight: [
        "erhebliche steuerliche Vorteile",
        "DIN ISO/IEC 17024 zertifizierten Sachverständigen",
        "steuerlich anerkannt",
        "Nachvollziehbarkeit, Plausibilität",
        "transparente Dokumentation",
      ],
      cta: {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        className:
          "md:w-fit w-full md:justify-between justify-center! md:gap-6 gap-2 !px-4.5 ",
      },
      media: {
        src: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/kostenlose-ersteinschätzung.webp"
        ),
        alt: "Steuern sparen mit verkürzter Abschreibungsdauer",
        width: 644,
        height: 720,
      },
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

  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "bares-geld-sparen",
    eyebrow: "WIE Funktioniert’s?",
    title: "Die wichtigsten Parameter zur Bestimmung der Restnutzungsdauer",
    bulletItems: [],
    cardLayoutColumns: 2,
    cards: [
      {
        title: "Art der Immobilie - Einfluss auf die Restnutzungsdauer",
        description:
          "Die Art der Immobilie hat erheblichen Einfluss auf die Einschätzung der Restnutzungsdauer. Ob Einfamilienhaus, Eigentumswohnung oder Gewerbeeinheit - jeder Immobilientyp ist unterschiedlichen Nutzungsbelastungen und Abnutzungsfaktoren ausgesetzt. Diese Unterschiede werden im Nutzungsdauergutachten berücksichtigt und fließen direkt in die Bewertung der tatsächlichen Lebensdauer ein.",
        iconImage: getImagePath("/images/{{siteId}}/nutzungsdauer/office.webp"),
        iconImageAlt: "Art der Immobilie",
      },
      {
        title: "Baujahr - Basis für die technische Lebensdauer Ihrer Immobilie",
        description:
          "Das Baujahr liefert zentrale Hinweise zur Bauweise, zum verwendeten Material und zum typischen Verschleißverhalten einer Immobilie. Je älter das Gebäude, desto relevanter ist eine individuelle Einschätzung der Restnutzungsdauer. Ein professionelles Nutzungsdauergutachten bewertet genau diese Faktoren - und schafft so die Grundlage für eine fundierte steuerliche Optimierung.",
        iconImage: getImagePath("/images/{{siteId}}/nutzungsdauer/clock.webp"),
        iconImageAlt: "Baujahr",
      },
      {
        title: "Modernisierungen - Verlängern sie die Restnutzungsdauer?",
        description:
          "Durchgeführte Modernisierungen beeinflussen die Restnutzungsdauer oft erheblich. Erneuerungen an Dach, Fassade, Fenstern, Heizung oder Bädern können die technische Lebensdauer verlängern und den baulichen Zustand verbessern. Diese Angaben fließen direkt in das Restnutzungsdauergutachten ein - und helfen dabei, eine realistische und steuerlich wirksame Einschätzung vorzunehmen.",
        iconImage: getImagePath("/images/{{siteId}}/nutzungsdauer/pen.webp"),
        iconImageAlt: "Modernisierungen",
      },
      {
        title:
          "Baulicher Zustand & Besonderheiten - entscheidend für die Bewertung",
        description:
          "Der bauliche Zustand einer Immobilie ist ein zentraler Faktor im Nutzungsdauergutachten. Schäden, Abnutzung oder Sanierungsbedarf verkürzen die Restnutzungsdauer - während ein gepflegter Zustand diese deutlich verlängern kann. Auch individuelle Besonderheiten wie Ausstattungsqualität oder energetische Sanierungen werden berücksichtigt und beeinflussen das Ergebnis des Gutachtens direkt.",
        iconImage: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/baulicher.webp"
        ),
        iconImageAlt: "Baulicher Zustand",
      },
    ],
    cardTitleClassName: "whitespace-pre-line max-h-[56px] h-full",
    eyebrowClassName: "text-[#515A5F]",
    titleClassName: "text-[#273238]",
    bulletTextClassName: "text-[#515A5F]",
    ctaIconClassName: "text-[#FF985C]",
    cardsGridClassName: "md:grid-cols-2 md:mt-16 mt-8",
    eyebrowContainerClassName: "space-y-0! lg:w-full!",
    summaryContainerClassName: "hidden",
    containerClassName: "container-gutachten",
  }),

  createComponent<TaxSavingsShowcaseComponent>({
    type: "TaxSavingsShowcase",
    id: "tax-savings-showcase",
    eyebrow: "echte Praxisbeispiele und überzeugende Ergebnisse.",
    title: "Steuerersparnis mit verkürzter Nutzungsdauer",
    description:
      "Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte Abschreibungen Ihre Steuerlast deutlich senken können.",
    cta: {
      label: "Kostenlose Ersteinschätzung",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      external: true,
      className:
        "md:w-max w-full md:justify-between justify-center! md:gap-6 gap-2 !px-4.5",
    },
    benefitIcon: {
      src: getImagePath("/images/{{siteId}}/nutzungsdauer/bullet-point.webp"),
      alt: "Bullet point",
      position: "left",
    },
    properties: [
      {
        image: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/mehrfamilienhaus-42-einheiten.webp"
        ),
        propertyType: "Eigentumswohnung",
        width: 600,
        height: 333,
        buildingValue: "450.000 €",
        buildingValueLabel: "Objektwert",
        taxSavings: "7.516 € / Jahr",
        taxSavingsLabel: "Steuerersparnis",
        remainingUsefulLife: "24 Jahre",
        remainingUsefulLifeLabel: "Restnutzungsdauer",
        features: [
          { text: "Modernisierung des Innenausbau: 2016" },
          { text: "keine Außendämmung vorhanden" },
        ],
        stats: [
          { label: "Baujahr", value: "1965" },
          { label: "Einheiten", value: "6" },
          { label: "m²", value: "134" },
        ],
        imageOverlay: {
          text: "Eigentumswohnung",
        },
      },
      {
        image: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/mehrfamilienhaus-4206qm.webp"
        ),
        propertyType: "Eigentumswohnung",
        width: 600,
        height: 333,
        buildingValue: "200.000 €",
        buildingValueLabel: "Objektwert",
        taxSavings: "6.000 € / Jahr",
        taxSavingsLabel: "Steuerersparnis",
        remainingUsefulLife: "20 Jahre",
        remainingUsefulLifeLabel: "Restnutzungsdauer",
        features: [
          { text: "Neue Heizung: 2023" },
          { text: "keine weiteren Modernisierungen in den letzten 20 Jahren" },
        ],
        stats: [
          { label: "Baujahr", value: "1904" },
          { label: "Einheiten", value: "4" },
          { label: "m²", value: "98,7" },
        ],
        imageOverlay: {
          text: "Eigentumswohnung",
        },
      },
      {
        image: getImagePath(
          "/images/{{siteId}}/nutzungsdauer/mehrfamilienhaus-baujahr-1996.webp"
        ),
        propertyType: "Mehrfamilienhaus",
        width: 600,
        height: 333,
        buildingValue: "8.413.000 €",
        buildingValueLabel: "Objektwert",
        taxSavings: "186.000 € / Jahr",
        taxSavingsLabel: "Steuerersparnis",
        remainingUsefulLife: "23 Jahre",
        remainingUsefulLifeLabel: "Restnutzungsdauer",
        features: [
          { text: "Modernisierung der Heizungsanlage: 2016" },
          { text: "keine Außendämmung vorhanden" },
        ],
        stats: [
          { label: "Baujahr", value: "1996" },
          { label: "Einheiten", value: "42" },
          { label: "m²", value: "4206,6" },
        ],
        imageOverlay: {
          text: "Mehrfamilienhaus",
        },
      },
    ],
    ctaIconName: "ArrowUpRight",
    ctaIconClassName: "text-[#FF985C]",
    containerClassName: "container-gutachten",
    propertyImageClassName: "max-w-[382px] object-cover",
  }),

  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Alles rund um das Nutzungsdauer Gutachten und AfA",
    items: nutzungsdauerFaqData,
    sectionId: "faq",
    defaultOpenIds: [
      "welche-zertifizierungen-haben-unsere-sachverstaendigen-und-gutachter",
    ],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default nutzungsdauerContent;
