import type {
  HeroWithFeatureCardsComponent,
  StructuredDataComponent,
  SubpageContent,
  BaresGeldSparenSectionComponent,
  TextImageComponent,
  TestimonialSliderComponent,
  FAQComponent,
  ServiceOffersComponent,
  TrustBlockSlideshowComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import {
  ProcessOverviewComponent,
  createComponent,
  validateContent,
} from "@/lib/component-schemas";
import {
  getAbsoluteImageUrl,
  getImagePath,
  getOrganizationStructuredData,
  getResponsiveOptimizedImagePaths,
  getTemplateVariables,
} from "@/lib/site-config-helper";
// FAQ data loaded from local file
import homeFaqData from "../json/home/gutachten-org-home-faq.json";
import homeGestellteFragenData from "../json/home/gutachten-org-home-gestellte-fragen.json";

// Get template variables for constructing absolute URLs
const templateVariables = getTemplateVariables();
const imagePath = getAbsoluteImageUrl(
  "/images/{{siteId}}/og-image/gutachten-org-og.webp"
);

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Digitale Immobiliengutachten online beantragen",
  description:
    "Immobilien-Gutachten online beantragen: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung & Energieausweis - zertifizierte Sachverständige.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/",
  openGraph: {
    title: "Digitale Immobiliengutachten online beantragen",
    description:
      "Immobilien-Gutachten online beantragen: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung & Energieausweis - zertifizierte Sachverständige.",
    url: templateVariables.siteUrl,
    siteName: "Gutachten.org",
    images: [
      {
        url: imagePath,
        width: 574,
        height: 234,
        alt: "Gutachten.org Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitale Immobiliengutachten online beantragen",
    description:
      "Immobilien-Gutachten online beantragen: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung & Energieausweis - zertifizierte Sachverständige.",
    images: [
      {
        url: imagePath,
        width: 574,
        height: 234,
        alt: "Gutachten.org Logo",
      },
    ],
  },
};

const homeContent: SubpageContent = validateContent([
  // Breadcrumb structured data (home page doesn't need breadcrumb, but adding for consistency)
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
          // Last item doesn't need item field
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
      items: homeFaqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: templateVariables.siteUrl,
      name: "Gutachten.org - Häufig gestellte Fragen zu Immobiliengutachten",
    },
  }),
  // Organization structured data
  getOrganizationStructuredData(),
  // Website structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-website",
    schemaType: "website",
    data: {
      name: "Gutachten.org - Professionelle Immobiliengutachten",
      url: templateVariables.siteUrl,
      description:
        "Professionelle Immobiliengutachten für Verkauf, Kauf und Steueroptimierung. Zertifizierte Sachverständige nach DIN ISO 17024. Kostenlose Ersteinschätzung.",
      inLanguage: "de-DE",
      publisher: {
        name: "Gutachten.org",
        url: templateVariables.siteUrl,
        logo: {
          url: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
          width: 200,
          height: 60,
        },
      },
    },
  }),
  // HeroWithFeatureCards component
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards",
    h1Text: "Ihre Experten für Immobiliengutachten",
    subtitle:
      "Ob Ankauf, Verkauf, Optimierung oder beim\n Steuernsparen – wir sind Ihr Ansprechpartner!",
    containerClassName: "gap-0 pt-9 pb-14 container-gutachten",
    customBackgroundClass: "bg-[#F8FAFB]",
    titleClassName: "sm:!leading-15 xl:!leading-20 max-sm:text-2xl",
    subtitleClassName: "!text-sm !leading-[25.2px]",
    image: {
      ...getResponsiveOptimizedImagePaths(
        "/images/{{siteId}}/home/home-hero.webp"
      ),
      // mobileSrc: getImagePath("/images/{{siteId}}/home/home-hero-mobile.webp"),
      alt: "Experten für Immobiliengutachten im Gespräch",
      width: 647,
      height: 534,
    },
    imageOverlay: {
      title: "Felix Holfert",
      subtitle: "Gutachter nach <br/> DIN EN ISO / IEC 17024",
    },
    imgClassName: "w-full h-auto object-contain",
    cardLayoutGridClassName: "gap-0",
    ctas: [
      {
        label: "Kostenlose Ersteinschätzung",
        href: "/angebot",
        external: false,
        className:
          "!px-4.5 w-full md:w-fit md:justify-between justify-center! md:gap-6 gap-2",
        icon: "ArrowUpRight",
      },
      {
        label: "Kontakt",
        href: "/kontakt/",
        className:
          "!px-4.5 w-full md:w-fit md:justify-between justify-center! md:gap-6 gap-2",
        external: false,
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
    logoCardClassName: "p-4! h-24",
    gridClassName: "md:gap-20",
    imageClassName:
      "md:opacity-60 md:grayscale transition-all duration-500 group-hover:scale-[1.1] group-hover:opacity-100 group-hover:grayscale-0",
    className: "pt-7 pb-6 bg-white",
    subtitleClassName: "text-muted-foreground mx-auto text-xl max-w-7xl",
    titleContainerClassName: "mb-6",
  }),

  createComponent<ServiceOffersComponent>({
    type: "ServiceOffers",
    id: "service-offers",
    title: "Unsere Angebote",
    subtitle:
      "Ihre zertifizierten & erfahrenen Sachverständigen erstellen Ihre Gutachten und Dokumente - inklusive unverbindlichem Angebot und kostenloser Ersteinschätzung.",
    moreInfoText: "Mehr erfahren",
    moreInfoLink: "/angebot",
    moreInfoButtonClassName: "w-full md:w-fit!",
    gap: "gap-9",
    cards: [
      {
        icon: getImagePath("/images/{{siteId}}/kontakt/restnutzungsdauer.webp"),
        title: "Restnutzungsdauer",
        description:
          "Senken Sie Ihre AfA-Dauer (z.B. auf 25 Jahre) und sparen Sie spürbar Steuern. Finanzamt-konform.",
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
        external: false,
      },
    ],
    containerClassName: "container-gutachten",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "bares-geld-sparen",
    eyebrow: "Bares geld sparen",
    title: "Nutzungsdauergutachten",
    bulletItems: [
      {
        text: "Einfach & schnell",
        iconImage: getImagePath(
          "/images/{{siteId}}/home/bitcoin-icons_verify-filled.webp"
        ),
        iconImageAlt: "Prüfzeichen",
      },
      {
        text: "Transparent & seriös",
        iconImage: getImagePath(
          "/images/{{siteId}}/home/bitcoin-icons_verify-filled.webp"
        ),
        iconImageAlt: "Prüfzeichen",
      },
      {
        text: "Unverbindlich anfragen",
        iconImage: getImagePath(
          "/images/{{siteId}}/home/bitcoin-icons_verify-filled.webp"
        ),
        iconImageAlt: "Prüfzeichen",
      },
    ],
    summary: [
      "Vermeiden Sie Fehlinvestitionen, planen Sie realistisch und nutzen Sie steuerliche Vorteile – mit einer fundierten Einschätzung der Restnutzungsdauer durch unsere Sachverständigen.",
    ],
    cta: {
      label: "Kostenlose Ersteinschätzung",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      external: true,
      className: "!w-full md:max-w-max! !text-sm !px-4.5",
    },
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
    eyebrowClassName: "text-[#515A5F]",
    bulletTextClassName: "text-[#515A5F]",
    ctaIconClassName: "text-[#FF985C]",
    containerClassName: "container-gutachten",
    eyebrowContainerClassName: "flex flex-col gap-10",
    summaryContainerClassName: "items-end",
  }),
  createComponent<ProcessOverviewComponent>({
    type: "ProcessOverview",
    id: "process-overview",
    sectionId: "process-overview",
    title: "Der Ablauf",
    highlights: [
      { text: "Einfach" },
      { text: "Transparent" },
      { text: "Unverbindlich" },
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
      className: "!w-full md:max-w-max! !text-sm !px-4.5",
    },
    media: (() => {
      const imagePaths = getResponsiveOptimizedImagePaths(
        "/images/{{siteId}}/home/der-ablauf.webp"
      );
      return {
        ...imagePaths,
        alt: "Gutachterteam bespricht Prozessschritte",
        overlayImage: {
          src: getImagePath("/images/{{siteId}}/home/vector.webp"),
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
          "bg-[#FF985C] hover:bg-[#FF985C]/90 text-gray-900 [&_svg]:text-gray-900 !px-4.5 text-sm !w-full md:max-w-max! md:gap-6 gap-2",
      },
      {
        label: "Nutzungsdauer prüfen",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        icon: "ArrowUpRight",
        variant: "outline",
        className:
          "!px-4.5 border-primary text-sm !w-full md:max-w-max! md:gap-6 gap-2",
      },
    ],
    cards: [
      {
        title: "Felix Holfert",
        description: "Immobiliengutachter nach DIN ISO EN 17 0 24",
        iconImage: getImagePath("/images/{{siteId}}/home/felix-holfert.webp"),
        iconImageAlt: "Felix Holfert",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Immobilienexperte & Berater",
        iconImage: getImagePath("/images/{{siteId}}/home/gerrit-kolweyh.webp"),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Simon Mill",
        description: "Kundenbetreuung",
        iconImage: getImagePath("/images/{{siteId}}/home/simon-mill.webp"),
        iconImageAlt: "Simon Mill",
      },
    ],
    cardsGridClassName:
      "gap-0 md:mt-16 mt-8 border border-[rgba(39,50,56,0.10)]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "xl:max-w-[592px] ml-auto",
    containerClassName: "container-gutachten",
    headerContainerClassName: "m-0!",
  }),
  createComponent<TestimonialSliderComponent>({
    type: "TestimonialSlider",
    id: "user-reviews",
    title: "Was unsere Kunden sagen",
    sectionId: "referenzen",
    reviews: [
      {
        message:
          "Reibungslose professionelle Abwicklung. Kann ich jedem empfehlen.",
        name: "Christian H.",
        role: "Privatinvestor",
      },
      {
        message:
          "100% Empfehlung! Schnelle, unkomplizierte und vor allem transparente Erstellung des Gutachtens.",
        name: "Angelina O.",
        role: "Erstkäuferin",
      },
      {
        message:
          "Ich kam durch Weiterempfehlung und werde diese definitiv selbst aussprechen: telefonische Beratung vorab, zügige Abwicklung, telefonische Nachbetreuung. Note 1!",
        name: "Horst C.",
        role: "Investor",
      },
      {
        message:
          "Ich habe vor dem Hauskauf eine Kurzbewertung machen lassen – und zum Glück! Die Expertin hat auf einige Mängel hingewiesen, die ich übersehen hätte.",
        name: "Julia S.",
        role: "Besitzerin eines Eigenheims",
      },
      {
        message:
          "Schnell, freundlich und sehr gründlich. Ich hatte erst Bedenken wegen der Kosten – aber rückblickend war es das auf jeden Fall wert.",
        name: "Andreas M.",
        role: "Privatinvestor",
      },
    ],
    reviewCardClassName: "justify-between",
    controls: {
      previousLabel: "Vorherige Bewertung anzeigen",
      nextLabel: "Nächste Bewertung anzeigen",
      showDesktopArrows: true,
      showMobileArrows: true,
    },
    titleClassName: "text-[#273238] m-0!",
    containerClassName: "container-gutachten !max-w-full xl:!pl-[40px]",
    listClassName: "px-0",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "tax-savings-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      title: "Steuern sparen durch kürzere Abschreibungsdauer bei Immobilien.",
      mediaPosition: "left",
      intro:
        "Mit einem Gutachten können Immobilienbesitzer ihre Abschreibungsdauer verkürzen und so mehr Steuern sparen – besonders bei älteren Objekten.",
      benefitIcon: {
        src: getImagePath("/images/{{siteId}}/home/bullet-point.webp"),
        alt: "Bullet point",
        position: "left",
      },
      benefits: [
        {
          content: "Ihre jährlichen Abschreibungsraten erhöhen",
        },
        {
          content: "Steuervorteile maximieren",
        },
        {
          content: "Ihr Nettoeinkommen spürbar steigern",
        },
      ],
      conclusion:
        "Profitieren Sie von diesem legalen Hebel zur Optimierung Ihrer Immobilienrendite.",
      cta: {
        label: "Mehr erfahren",
        href: "/nutzungsdauer",
        external: false,
        className:
          "md:w-[222px] w-full !px-4.5 md:justify-between justify-center! md:gap-6 gap-2",
      },
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/home/verkehrswert-kennen.webp"
        ),
        alt: "Steuern sparen mit verkürzter Abschreibungsdauer",
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
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "tax-savings-section-2",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      title:
        "Verkehrswert kennen - sicherer entscheiden, besser kaufen und verkaufen",
      mediaPosition: "right",
      intro:
        "Ein Verkehrswertgutachten liefert eine objektive, marktkonforme Wertermittlung als belastbare Grundlage für Kauf-, Verkaufs-, Finanzierungs- und Vermögensentscheidungen.",
      cta: {
        label: "Mehr erfahren",
        href: "/immobilienbewertung",
        external: false,
        className:
          "md:w-[222px] w-full !px-4.5 md:justify-between justify-center! md:gap-6 gap-2",
      },
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/home/seitenansicht-mehrfamilienhaus-gutachten.webp"
        ),
        alt: "Steuern sparen mit verkürzter Abschreibungsdauer",
        width: 644,
        height: 720,
      },
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "pt-0 place-content-end justify-between xl:gap-16 gap-8",
      contentClassName: "max-w-[644px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
    },
    className: "pt-0!",
  }),
  // createComponent<TaxSavingsShowcaseComponent>({
  //   type: "TaxSavingsShowcase",
  //   id: "tax-savings-showcase",
  //   eyebrow: "echte Praxisbeispiele und überzeugende Ergebnisse.",
  //   title: "Steuerersparnis mit verkürzter Nutzungsdauer",
  //   description:
  //     "Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte Abschreibungen Ihre Steuerlast deutlich senken können.",
  //   cta: {
  //     label: "Steuerersparnis berechnen",
  //     href: "/afa-rechner",
  //     external: false,
  //     className: "w-max",
  //   },
  //   benefitIcon: {
  //     src: getImagePath("/images/{{siteId}}/home/bullet-point.webp"),
  //     alt: "Bullet point",
  //     position: "left",
  //   },
  //   properties: [
  //     {
  //       image: getResponsiveOptimizedImagePaths(
  //         "/images/{{siteId}}/home/mehrfamilienhaus-42-einheiten.webp"
  //       ).src,
  //       propertyType: "Mehrfamilienhaus",
  //       buildingValue: "8.413.000 €",
  //       buildingValueLabel: "Gebäudewert",
  //       taxSavings: "3.350 € / Jahr",
  //       taxSavingsLabel: "Steuerersparnis",
  //       remainingUsefulLife: "23 Jahre",
  //       remainingUsefulLifeLabel: "Restnutzungsdauer",
  //       features: [
  //         { text: "Modernisierung der Heizungsanlage: 2016" },
  //         { text: "keine Außendämmung vorhanden" },
  //       ],
  //       stats: [
  //         { label: "Bj. 1996", value: "1904" },
  //         { label: "Einheiten", value: "42" },
  //         { label: "m2", value: "4206,6" },
  //       ],
  //       imageOverlay: {
  //         text: "Mehrfamilienhaus",
  //       },
  //     },
  //     {
  //       image: getResponsiveOptimizedImagePaths(
  //         "/images/{{siteId}}/home/mehrfamilienhaus-4206qm.webp"
  //       ).src,
  //       propertyType: "Mehrfamilienhaus",
  //       buildingValue: "8.413.000 €",
  //       buildingValueLabel: "Gebäudewert",
  //       taxSavings: "3.350 € / Jahr",
  //       taxSavingsLabel: "Steuerersparnis",
  //       remainingUsefulLife: "23 Jahre",
  //       remainingUsefulLifeLabel: "Restnutzungsdauer",
  //       features: [
  //         { text: "Modernisierung der Heizungsanlage: 2016" },
  //         { text: "keine Außendämmung vorhanden" },
  //       ],
  //       stats: [
  //         { label: "Bj. 1996", value: "1904" },
  //         { label: "Einheiten", value: "42" },
  //         { label: "m2", value: "4206,6" },
  //       ],
  //       imageOverlay: {
  //         text: "Mehrfamilienhaus",
  //       },
  //     },
  //     {
  //       image: getResponsiveOptimizedImagePaths(
  //         "/images/{{siteId}}/home/mehrfamilienhaus-baujahr-1996.webp"
  //       ).src,
  //       propertyType: "Mehrfamilienhaus",
  //       buildingValue: "8.413.000 €",
  //       buildingValueLabel: "Gebäudewert",
  //       taxSavings: "3.350 € / Jahr",
  //       taxSavingsLabel: "Steuerersparnis",
  //       remainingUsefulLife: "23 Jahre",
  //       remainingUsefulLifeLabel: "Restnutzungsdauer",
  //       features: [
  //         { text: "Modernisierung der Heizungsanlage: 2016" },
  //         { text: "keine Außendämmung vorhanden" },
  //       ],
  //       stats: [
  //         { label: "Bj. 1996", value: "1904" },
  //         { label: "Einheiten", value: "42" },
  //         { label: "m2", value: "4206,6" },
  //       ],
  //       imageOverlay: {
  //         text: "Mehrfamilienhaus",
  //       },
  //     },
  //   ],
  //   ctaIconName: "ArrowUpRight",
  //   ctaIconClassName: "text-[#FF985C]",
  //   containerClassName: "container-gutachten",
  // }),

  // createComponent<RecommendedLinksComponent>({
  //   type: "RecommendedLinks",
  //   id: "recommended-links",
  //   title:
  //     "Erhalten Sie von uns problemlos weitere Gutachten\nund Dokumente für Ihre Immobilien",
  //   sectionId: "recommended-links",
  //   links: [
  //     {
  //       title: "Restnutzungsdauergutachten",
  //       excerpt:
  //         "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
  //       href: "/restnutzungsdauergutachten-ersteinschaetzung/",
  //     },
  //     {
  //       title: "Kaufpreisteilungsberechnung",
  //       excerpt:
  //         "Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.",
  //       href: "/kaufpreisaufteilung-anfrage/",
  //     },
  //     {
  //       title: "Verkehrswergutachten",
  //       excerpt:
  //         "Ein Gutachten für die Restnutzungsdauer Ihrer Immobilie hat mehrere Vorteile für Sie:",
  //       href: "/energieausweis-anfrage/",
  //     },
  //     {
  //       title: "(Technische) Kaufberatungs",
  //       excerpt:
  //         "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
  //       href: "/verkehrswertgutachten-anfrage/",
  //     },
  //     {
  //       title: "Energieausweis: Bedarf",
  //       excerpt:
  //         "Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.",
  //       href: "/verkehrswertgutachten-anfrage/",
  //     },
  //     {
  //       title: "Energieausweis: Verbrauch",
  //       excerpt:
  //         "Fundierte Wertgutachten vom Experten - für Kauf, Verkauf oder Erbschaftssteuer",
  //       href: "/nutzungsdauer-anfrage",
  //     },
  //   ],
  //   icon: ArrowUpRight,
  //   titleClassName: "mb-4 md:mb-16",
  //   containerClassName: "md:pb-16 pb-8! container-gutachten",
  // }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "gestellte-fragen-section",
    variant: "accordion",
    title: "Häufig gestellte Fragen",
    items: homeGestellteFragenData,
    sectionId: "gestellte-fragen",
    defaultOpenIds: [
      "welche-zertifizierungen-haben-unsere-sachverstaendigen-und-gutachter",
    ],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Alles rund um das Thema Gutachten und AfA",
    items: homeFaqData,
    sectionId: "faq",
    defaultOpenIds: ["was-ist-ein-nutzungsdauer-gutachten"],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default homeContent;
