import type {
  SubpageContent,
  TextImageComponent,
  StructuredDataComponent,
  HeroWithFeatureCardsComponent,
  BaresGeldSparenSectionComponent,
  ServiceOffersComponent,
  TestimonialSliderComponent,
  FAQComponent,
  TrustBlockSlideshowComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import {
  getImagePath,
  getAbsoluteImageUrl,
  getOrganizationStructuredData,
  getTemplateVariables,
} from "@/lib/site-config-helper";
import { getResponsiveOptimizedImagePaths } from "../../../lib/site-config-helper";

import homeFaqData from "../json/home/gutachten-org-home-faq.json";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Über uns | Zertifizierte Gutachter | Gutachten.org",
  description:
    "Lernen Sie unser Team von zertifizierten Immobiliensachverständigen kennen. DIN ISO 17024 zertifiziert. Deutschlandweite Expertise für Immobiliengutachten.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/ueber-uns/",
  openGraph: {
    title: "Über uns | Zertifizierte Gutachter | Gutachten.org",
    description:
      "Lernen Sie unser Team von zertifizierten Immobiliensachverständigen kennen. DIN ISO 17024 zertifiziert. Deutschlandweite Expertise für Immobiliengutachten.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/ueber-uns/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1920,
        height: 1280,
        alt: "Team von zertifizierten Immobiliensachverständigen - Gutachten.org",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns | Zertifizierte Gutachter | Gutachten.org",
    description:
      "Lernen Sie unser Team von zertifizierten Immobiliensachverständigen kennen. DIN ISO 17024 zertifiziert. Deutschlandweite Expertise für Immobiliengutachten.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1920,
        height: 1280,
        alt: "Team von zertifizierten Immobiliensachverständigen - Gutachten.org",
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
          name: "Über uns",
          // Last item doesn't need item field
        },
      ],
    },
  }),
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-about",
    schemaType: "article",
    data: {
      headline: `Über uns – ${templateVariables.siteName}`,
      description:
        "Lernen Sie unser Team von zertifizierten Immobiliensachverständigen kennen. DIN ISO 17024 zertifiziert. Deutschlandweite Expertise für Immobiliengutachten.",
      url: `${templateVariables.siteUrl}/ueber-uns/`,
      image: getImagePath("/images/{{siteId}}/ueber-uns/team-immoverde.webp"),
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

const ueberUnsContent: SubpageContent = validateContent([
  ...structuredDataComponents,
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-ueber-uns",
    variant: "hero-programatic-image",
    title: "Digitale Effizienz trifft zertifizierte Exzellenz.",
    subtitle:
      "Wir sind Ihr spezialisiertes Gutachtenbüro für Immobilien in ganz Deutschland - das weiter denkt, als bis zur Fertigstellung des Gutachtens. Fundierte Immobiliengutachten, digitale Abläufe, erfahrene Sachverständige, Gutachter und Steuerberater - für Entscheidungen, die vor Bank und Finanzamt bestehen.",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0! pt-0! container-gutachten",
    titleClassName: "!leading-none !text-sm",
    subHeadingClassName: "!text-base md:!text-[32px]/15 whitespace-pre-line",
    imgClassName: "object-cover",
    heroTitleClassName: "md:text-2xl xl:text-[56px] font-bold",
    image: {
      src: getImagePath(
        "/images/{{siteId}}/ueber-uns/czudnochowski-document.webp"
      ),
      alt: "Kolja Czudnochowski, Sachverständiger",
      width: 600,
      height: 400,
      className: "max-w-full max-h-full object-cover",
    },
    className: "py-4 md:py-0",
    cardLayoutGridClassName: "gap-0",
    ctaIconClassName: "text-[#FF985C]",
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
    contentClassName: "flex flex-col items-start justify-center py-10 md:py-16",
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
    subtitleClassName: "text-[#4F5A60]!",
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
          height: 22,
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
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "ueber-uns-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "ueber-uns-section-1",
      title: "Wer sind wir",
      heading: "Über uns",
      headingClassName: "text-[#D35F17]! md:text-lg! font-semibold!",
      mediaPosition: "right",
      intro:
        "Gutachten.org ist ein unabhängiges Gutachtenbüro für Immobilienbewertung. Unsere zertifizierten Sachverständigen verbinden langjährige Praxiserfahrung mit klaren, nachvollziehbaren Gutachten - für Eigentümer, Investoren, Banken und Steuerberater. Unterstützt durch Immobilienexperten, Anwälte und Steuerberater - um Ihre Immobilienanliegen ganzheitlich zu betreuen.",
      media: {
        src: getImagePath("/images/{{siteId}}/ueber-uns/wer-sind-wir.webp"),
        alt: "Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin",
        width: 580,
        height: 500,
        className: "object-contain",
      },
      introClassName: "md:text-base text-[#4F5A60]!",
      mediaClassName: "w-full md:w-auto max-w-[580px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName:
        "md:gap-16 gap-6 place-content-end items-start",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentClassName: "xl:gap-[50px] gap-6",
      contentTitleClassName: "xl:gap-[50px] gap-6",
      titleClassName:
        "text-4xl xl:text-6xl font-bold text-[#243239] leading-tight",
    },
    className: "md:py-[78px]! py-[40px]!",
    backgroundColor: "bg-white",
  }),
  createComponent<ServiceOffersComponent>({
    type: "ServiceOffers",
    id: "ueber-uns-section-2",
    title: "Unsere Leistungen",
    subtitle:
      "Ihre zertifizierten & erfahrenen Sachverständigen erstellen Ihre Gutachten und Dokumente - inklusive unverbindlichem Angebot und kostenloser Ersteinschätzung.",
    moreInfoText: "Mehr erfahren",
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
    className: "pt-0! pb-[78px]! bg-transparent",
    cardClassName: "border-1",
    containerClassName: "container-gutachten",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "ueber-uns-section-3",
    variant: "imagecard",
    title: "Ein erfahrenes Team für\nIhre Immobilienfragen",
    titleClassName: "whitespace-pre-line",
    bulletItems: [],
    summary: [
      "Hinter Gutachten.org steht ein interdisziplinäres Team aus Sachverständigen & Experten. Unsere Gutachter verfügen über langjährige Praxiserfahrung und anerkannte Zertifizierungen. Ergänzt wird unser Kernteam durch unsere Spezialisten. So stellen wir sicher, dass unsere Gutachten nicht nur fachlich überzeugen, sondern auch rechtlich und steuerlich sauber durchdacht sind.",
    ],
    ctas: [
      {
        label: "Kontakt",
        href: "/kontakt/",
        icon: "ArrowUpRight",
        variant: "outline",
        external: false,
        className:
          "w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
    ],
    cards: [
      {
        title: "Felix Holfert (DIN EN ISO 17 0 24)",
        description: "Gutachter & Leiter des Sachverständigenteams",
        iconImage: getImagePath(
          "/images/{{siteId}}/ueber-uns/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Geschäftsführer",
        iconImage: getImagePath(
          "/images/{{siteId}}/ueber-uns/gerrit-kolweyh.webp"
        ),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Kolja Czudnochowski",
        description: "Geschäftsführer",
        iconImage: getImagePath(
          "/images/{{siteId}}/ueber-uns/kolja-czudnochowski.webp"
        ),
        iconImageAlt: "Kolja Czudnochowski",
      },
    ],
    cards2: [
      {
        title: "Sascha Matussek",
        description: "Steuerberater",
        iconImage: getImagePath(
          "/images/{{siteId}}/ueber-uns/sascha-matussek.webp"
        ),
        iconImageAlt: "Sascha Matussek",
      },
      {
        title: "Dr. Christopher Hahn, LL.M.",
        description: "Rechtsanwalt",
        iconImage: getImagePath(
          "/images/{{siteId}}/ueber-uns/christopher-hahn.webp"
        ),
        iconImageAlt: "Dr. Christopher Hahn, LL.M.",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Simon Mill",
        description: "Kundenbetreuung",
        iconImage: getImagePath("/images/{{siteId}}/ueber-uns/simon-mill.webp"),
        iconImageAlt: "Simon Mill",
      },
    ],
    cardsGridClassName:
      "gap-0 md:mt-16 mt-8 border border-[rgba(39,50,56,0.10)]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "whitespace-pre-line",
    containerClassName: "container-gutachten",
    headerContainerClassName: "m-0!",
    className: "md:py-[60px] py-[40px]",
  }),
  createComponent<TestimonialSliderComponent>({
    type: "TestimonialSlider",
    id: "ueber-uns-section-4",
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
          "Professionelle Abwicklung und nachvollziehbare Ergebnisse. AfA anerkannt, Unterlagen top aufbereitet – jederzeit wieder.",
        name: "Dieter L.",
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
    containerClassName:
      "container-gutachten !max-w-full !pr-[40px] xl:!pl-[40px]",
    className: "bg-white",
  }),

  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "ueber-uns-section-5",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      heading: "UNSER PARTNER",
      title: "Evalion - Ihre Plattform für Gutachtenverwaltung",
      mediaPosition: "left",
      intro:
        "Mit Evalion verwalten Sie alle Gutachten digital: Aufträge auslösen, Status prüfen, Dokumente wiederfinden - ideal für alle, die regelmäßig Gutachten & Dokumente benötigen.",
      benefitIcon: {
        src: getImagePath("/images/{{siteId}}/ueber-uns/bullet-point.webp"),
        alt: "Bullet point",
        position: "left",
      },
      benefits: [
        {
          content: "Zentrale Übersicht aller Objekte und Gutachten",
        },
        {
          content: "Schnelle Online-Beauftragung neuer Gutachten",
        },
        {
          content: "Daten, Fotos, Gutachten & Rechnungen auf einen Blick",
        },
      ],
      conclusion:
        "Beenden Sie Ihr E-Mail-Chaos. Nutzen Sie kostenlos Evalion und verwalten Ihre Gutachten bequem.",
      cta: {
        label: "Mehr erfahren",
        href: "https://www.evalion.net/",
        external: true,
        className:
          "!px-4.5 w-full md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/ueber-uns/seitenansicht-mehrfamilienhaus-gutachten.webp"
        ),
        alt: "seitenansicht-mehrfamilienhaus-gutachten.webp",
        width: 644,
        height: 720,
      },
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "place-content-start xl:gap-16 gap-8",
      contentClassName: "max-w-[516px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      headingClassName: "text-lg! text-[#D35F17]! font-semibold",
    },
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "ueber-uns-section-6",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "ueber-uns-section-6",
      title: "Nutzen Sie unsere App!",
      mediaPosition: "right",
      intro:
        "Sie benötigen regelmäßig Gutachten & Dokumente und wollen diese komfortabel verwalten? Kein Problem!\n\n Mit Evalion können Sie innerhalb weniger Klicks neue Gutachten anfragen und Ihre Anfragen in Echtzeit überblicken. Alle Dokumente, Daten, Fotos, Rechnungen und Gutachten an einem Ort - und das kostenfrei.",
      ctas: [
        {
          label: "Jetzt registrieren",
          href: "https://app.evalion.net/auth/register?step=1",
          external: true,
          variant: "default",
          className: "w-max !px-4.5",
        },
        {
          label: "Mehr erfahren",
          href: "https://www.evalion.net/",
          external: true,
          variant: "outline",
          className: "w-max !px-4.5 bg-transparent",
        },
      ],
      media: {
        src: getImagePath("/images/{{siteId}}/ueber-uns/nutzen-sie.webp"),
        alt: "Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin",
        width: 656,
        height: 455,
        className: "object-contain",
      },
      ctaContainerClassName: "justify-start gap-4!",
      mediaClassName: "w-full md:w-auto",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "xl:gap-16 gap-8 place-content-end",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentClassName: "md:gap-[50px] gap-6",
      contentTitleClassName: "md:gap-[50px] gap-6",
    },
    className: "py-12 md:py-20!",
    backgroundColor: "bg-[#F4F8F7]",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "ueber-uns-section-7",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      heading: "UNSER PARTNER",
      title:
        "AfA-Recht.de - wenn das Finanzamt widerspricht, bleiben wir an Ihrer Seite",
      mediaPosition: "left",
      intro:
        "Bei AFA-Gutachten und strittigen Bewertungen begleiten wir Sie gemeinsam mit unserer Partnerkanzlei: von der fachlichen Begründung bis zu Widersprüchen und Klagen.\n\nGutachten, steuerliche Argumentation und rechtliche Durchsetzung - koordiniert aus einer Hand.",
      cta: {
        label: "AFA-Fall unverbindlich prüfen lassen",
        href: "https://www.afa-recht.de/",
        external: true,
        className:
          "!px-4.5 w-full md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/ueber-uns/verkehrswert-kennen.webp"
        ),
        alt: "verkehrswert-kennen.webp",
        width: 644,
        height: 720,
      },
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "pt-0 place-content-start xl:gap-16 gap-8",
      contentClassName: "max-w-[516px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      headingClassName: "text-lg! text-[#D35F17]! font-semibold",
    },
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Häufig gestellte Fragen",
    items: homeFaqData,
    sectionId: "faq",
    defaultOpenIds: [
      "welche-zertifizierungen-haben-unsere-sachverstaendigen-und-gutachter",
    ],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default ueberUnsContent;
