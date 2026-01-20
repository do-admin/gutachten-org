import type {
  BaresGeldSparenSectionComponent,
  HeroWithFeatureCardsComponent,
  IframeComponent,
  RecommendedLinksComponent,
  StructuredDataComponent,
  SubpageContent,
  TextImageComponent,
  TrustBlockComponent,
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
import { ArrowUpRight } from "lucide-react";

const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Immobiliengutachten bei Gutachten - Unser Angebot für Sie",
  description:
    "Kostenlose Ersteinschätzung für Nutzungsdauer, Verkehrswert & mehr. Zertifizierte Gutachter - schnell, effizient, bundesweit verfügbar.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/angebote/",
  openGraph: {
    title: "Immobiliengutachten bei Gutachten - Unser Angebot für Sie",
    description:
      "Kostenlose Ersteinschätzung für Nutzungsdauer, Verkehrswert & mehr. Zertifizierte Gutachter - schnell, effizient, bundesweit verfügbar.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/angebote/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobiliengutachten bei Gutachten.org - Unser Angebot für Sie",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Immobiliengutachten bei Gutachten - Unser Angebot für Sie",
    description:
      "Kostenlose Ersteinschätzung für Nutzungsdauer, Verkehrswert & mehr. Zertifizierte Gutachter - schnell, effizient, bundesweit verfügbar.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobiliengutachten bei Gutachten.org - Unser Angebot für Sie",
      },
    ],
  },
};

const angebotContent: SubpageContent = validateContent([
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
          name: "Angebote",
        },
      ],
    },
  }),
  // Organization structured data
  getOrganizationStructuredData(),
  // Website structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-website-angebote",
    schemaType: "website",
    data: {
      name: "Gutachten.org - Professionelle Immobiliengutachten",
      url: `${templateVariables.siteUrl}/angebote`,
      description:
        "Professionelle Immobiliengutachten: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung. Zertifizierte Sachverständige deutschlandweit.",
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
  // HeroWithFeatureCards component - same as home.ts
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer",
    variant: "hero-programatic-image",
    title: "Ihre Experten für\nImmobiliengutachten",
    subtitle:
      "Ob Ankauf, Verkauf, Optimierung oder beim Steuernsparen –\nwir sind Ihr Ansprechpartner!",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0! pt-0! container-gutachten",
    titleClassName: "!leading-none !text-sm",
    subHeadingClassName: "!text-base md:!text-[32px]/15 whitespace-pre-line",
    subtitleClassName: "!text-sm whitespace-pre-line space-y-0 leading-relaxed",
    imgClassName: "object-cover",
    heroTitleClassName: "text-lg md:text-[32px] whitespace-pre-line",
    image: {
      src: getImagePath("/images/{{siteId}}/angebot/angebot-hero.webp"),
      alt: "angebot-hero.webp",
      width: 600,
      height: 800,
      className: "max-h-[470px]! object-cover",
    },
    className: "py-4 md:py-0",
    cardLayoutGridClassName: "gap-0",
    features: [
      {
        title: "Restnutzungsdauer: kostenlose Ersteinschätzung",
        description:
          "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        ctaLabel: "Kostenlose Ersteinschätzung",
      },
      {
        title: "Kaufpreisteilung: kostenlose Ersteinschätzung",
        description:
          "Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.",
        href: "/kaufpreisaufteilung-anfrage/",
        ctaLabel: "Kostenlose Ersteinschätzung",
      },
      {
        title: "Wertermittlung / Verkehrswert: unverbindliches Angebot",
        description:
          "Fundierte Wertgutachten vom Experten - für Kauf, Verkauf oder Erbschaftssteuer.",
        href: "/verkehrswertgutachten-anfrage/",
        ctaLabel: "Angebot anfragen",
      },
      {
        title: "Weitere Leistungen",
        description: "Unser Angebot im Überblick.",
        href: "/angebot",
        ctaLabel: "Angebot anfragen",
      },
    ],
    ctaIconClassName: "text-[#FF985C]",
    contentClassName: "flex flex-col items-start justify-center py-10",
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
    variant: "imagecard",
    title: "Wir sind für Sie da!",
    eyebrow: "Bares geld sparen",
    headerCta: {
      label: "Kontakt",
      href: "/kontakt/",
      external: false,
      icon: "ArrowUpRight",
      variant: "default",
      className:
        "gap-6 px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
    },
    bulletItems: [],
    summary: [
      "Aus unseren Zentralen in Berlin, Dresden & Bremen koordinieren wir unser Team, um Ihnen deutschlandweit zur Verfügung zu stehen!",
      "Unsere Gutachter sind durch mehrere DAkkS-akkredidierte Stellen nach\nDIN EN ISO / IEC 17024 zertifiziert",
    ],
    highlight: "DIN EN ISO / IEC 17024 zertifiziert",
    highlightClassName: "text-[#FC7019] font-bold",
    cards: [
      {
        title: "Felix Holfert",
        description: "Gutachter nach DIN EN ISO / IEC 17024",
        iconImage: getImagePath(
          "/images/{{siteId}}/angebot/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Immobilienexperte & Berater",
        iconImage: getImagePath(
          "/images/{{siteId}}/angebot/gerrit-kolweyh.webp"
        ),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Simon Mill",
        description: "Kundenbetreuung",
        iconImage: getImagePath("/images/{{siteId}}/angebot/simon-mill.webp"),
        iconImageAlt: "Simon Mill",
      },
    ],
    cardsGridClassName:
      "gap-0 md:mt-16 mt-8 border border-[rgba(39,50,56,0.10)]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName:
      "max-w-[592px] md:max-w-[655px] ml-auto md:mt-auto",
    containerClassName: "container-gutachten",
    headerContainerClassName: "m-0!",
    className: "md:py-[60px] py-[40px]",
  }),
  createComponent<RecommendedLinksComponent>({
    type: "RecommendedLinks",
    id: "recommended-links",
    title:
      "Sie wünschen direkt eine kostenfreie\nErsteinschätzung oder ein unverbindliches Angebot?",
    description:
      "Füllen Sie das entsprechende Formular aus und unser Team wird sich mit einem konkreten Angebot oder einer\nErsteinschätzung bei Ihnen melden",
    sectionId: "recommended-links",
    cta: {
      label: "Kontakt",
      href: "/kontakt/",
      external: false,
      icon: "ArrowUpRight",
      variant: "default",
      className:
        "!px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
    },
    titleContainerClassName:
      "flex items-start md:items-end justify-between md:mb-16 mb-8 md:flex-row flex-col gap-6 md:gap-0",
    links: [
      {
        title: "Restnutzungsdauergutachten",
        excerpt:
          "Ermitteln Sie die tatsächliche Restnutzungsdauer Ihrer Immobilie – fundiert, steuerlich belastbar und deutschlandweit anerkannt.",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
      },
      {
        title: "Kaufpreisteilung",
        excerpt:
          "Transparente und rechtssichere Aufteilung des Kaufpreises – für optimale steuerliche Abschreibung und klare Werte je Gebäudeteil.",
        href: "/kaufpreisaufteilung-anfrage/",
        external: true,
      },
      {
        title: "Verkehrswertgutachten",
        excerpt:
          "Erhalten Sie eine professionelle Immobilienbewertung nach anerkannten Standards - für Verkauf, Finanzierung, Erbschaft und weitere Auseinandersetzungen.",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
      },
      {
        title: "(Technische) Kaufberatung",
        excerpt:
          "Identifizieren Sie Chancen und Risiken vor dem Kauf: Wir prüfen Substanz und Investitionsbedarf - präzise, unabhängig und objektiv.",
        href: "/kontakt/",
        external: false,
      },
      {
        title: "Energieausweis: Bedarf",
        excerpt:
          "Erhalten Sie einen unabhängigen Bedarfsausweis – mit energetischer Bewertung und allen gesetzlich erforderlichen Angaben.",
        href: "/energieausweis-anfrage/",
        external: true,
      },
      {
        title: "Kurzgutachten",
        excerpt:
          "Kompakte, praxisnahe Bewertung mit klarer Ergebnisdarstellung - ideal, wenn Sie eine schnelle und kosteneffiziente Einschätzung benötigen.",
        href: "/verkehrswertgutachten-anfrage/",
        external: true,
      },
    ],
    icon: ArrowUpRight,
    ctaIconClassName: "text-[#FF985C]",
    containerClassName: "md:py-[60px]! py-[40px]! container-gutachten",
    descriptionClassName: "xl:whitespace-pre-line",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "nutzungsdauer-city-section-1",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "nutzungsdauer-city-section-1",
      title: "Nutzen Sie unsere App!",
      mediaPosition: "right",
      intro:
        "Sie benötigen regelmäßig Gutachten & Dokumente und wollen diese komfortabel verwalten? Kein Problem!",
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
        src: getImagePath("/images/{{siteId}}/angebot/nutzen-sie-unsere.webp"),
        alt: "Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin",
        width: 851,
        height: 621,
        className: "object-contain",
      },
      mediaClassName: "w-full md:w-auto",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "md:gap-16 gap-6 place-content-end",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentClassName: "md:gap-[50px] gap-6",
      contentTitleClassName: "md:gap-[50px] gap-6",
    },
    className: "md:py-[120px]! py-[40px]!",
    backgroundColor: "bg-[#F4F8F7]",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "team-section",
    variant: "imagecard",
    title: "",
    titleClassName: "m-0!",
    bulletItems: [],
    headerImage: getImagePath("/images/{{siteId}}/angebot/gerrit-kolweyh.webp"),
    headerImageAlt: "Gerrit J. Kolweyh",
    headerTitle: "Gerrit J. Kolweyh",
    headerTitleClassName: "text-base text-2xl xl:text-[32px]",
    headerDescription: "Immobilienexperte & Berater",
    headerDescriptionClassName: "text-sm",
    summaryClassName: "text-sm xl:whitespace-pre-line",
    summary: [
      "Nutzen Sie die Gelegenheit, signifikante Einsparungen für sich zu entdecken.\nKlicken Sie auf den Button unten, um eine unverbindliche und kostenfreie\nErstbewertung Ihrer Immobilie zu erhalten.\n\nErfahren Sie, wie viel Sie durch eine optimierte Nutzungsdauer sparen können –\nohne jegliche Verpflichtungen oder versteckte Kosten.",
    ],
    ctas: [
      {
        label: "Kontakt",
        href: "/kontakt/",
        external: false,
        icon: "ArrowUpRight",
        variant: "default",
        className:
          "!px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
    ],
    cards: [],
    ctaIconClassName: "text-[#FF985C]",
    containerClassName: "container-gutachten",
  }),
  createComponent<IframeComponent>({
    type: "Iframe",
    id: "cal-com-iframe-embed",
    src: "https://app.cal.com/team/gutachten-org/website-anfrage?theme=light",
    title: "Book a call",
    sectionTitle:
      "Sie wünschen direkt eine kostenfreie Ersteinschätzung\noder ein unverbindliches Angebot?",
    subtitle:
      "Füllen Sie das entsprechende Formular aus und unser Team wird sich mit einem konkreten Angebot oder Ihrer\nErsteinschätzung bei Ihnen melden",
    titleClassName:
      "text-2xl md:text-[32px] text-[#273238] !font-medium whitespace-pre-line m-0!",
    subtitleClassName: "text-base text-[#273238] whitespace-pre-line max-w-max",
    containerClassName: "container-gutachten mx-auto",
    allow: "payment",
    name: "cal-embed-website-anfrage",
    dataCalLink: "team/gutachten-org/website-anfrage",
    allowFullScreen: true,
    loading: "eager",
    className: "h-[750px]",
    height: 750,
  }),
]);

export default angebotContent;
