import type {
  HeroWithFeatureCardsComponent,
  SubpageContent,
  StructuredDataComponent,
  TrustBlockComponent,
  ServiceOffersComponent,
  BaresGeldSparenSectionComponent,
  TextImageComponent,
  FAQComponent,
  DetailedPriceListComponent,
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
import homeFaqData from "../json/home/gutachten-org-home-faq.json";

const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "RNDG Preisliste | Transparente Preise für Immobiliengutachten",
  description:
    "Übersichtliche Preisliste für alle unsere Gutachten und Dienstleistungen. Transparente Preise für Restnutzungsdauer, Verkehrswertgutachten, Kaufpreisaufteilung und mehr.",
  authors: [{ name: templateVariables.siteName }],
  creator: templateVariables.siteName,
  publisher: templateVariables.siteName,
  canonical: templateVariables.siteUrl + "/nutzungsdauergutachten-preisliste/",
  openGraph: {
    title: "RNDG Preisliste | Transparente Preise für Immobiliengutachten",
    description:
      "Übersichtliche Preisliste für alle unsere Gutachten und Dienstleistungen. Transparente Preise für Restnutzungsdauer, Verkehrswertgutachten, Kaufpreisaufteilung und mehr.",
    siteName: templateVariables.siteName,
    url: templateVariables.siteUrl + "/nutzungsdauergutachten-preisliste/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1200,
        height: 630,
        alt: "RNDG Preisliste - Transparente Preise für Immobiliengutachten",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RNDG Preisliste | Transparente Preise für Immobiliengutachten",
    description:
      "Übersichtliche Preisliste für alle unsere Gutachten und Dienstleistungen. Transparente Preise für Restnutzungsdauer, Verkehrswertgutachten, Kaufpreisaufteilung und mehr.",
    url: templateVariables.siteUrl + "/nutzungsdauergutachten-preisliste/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1200,
        height: 630,
        alt: "RNDG Preisliste - Transparente Preise für Immobiliengutachten",
      },
    ],
  },
};

export default validateContent([
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
          name: "Preisliste",
        },
      ],
    },
  }),
  // Organization structured data
  getOrganizationStructuredData(),

  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-ueber-uns",
    variant: "hero-programatic-image",
    title: "Unsere vollständige\nRestnutzungsdauer\nPreisliste",
    subtitle:
      "Über 90 % aller vermieteten Immobilien in Deutschland werden\nstandardmäßig über 50 Jahre abgeschrieben. Unsere Gutachten zur\nkürzeren Nutzungsdauer ermöglichen eine Steuerersparnis durch\nhöhere Abschreibung. Das Ergebnis: Jedes Jahr mehr Cashflow!\nUnsere Gutachter sind zertifiziert nach DIN EN ISO/IEC 17024 und\nentsprechen somit den Anforderungen der Finanzbehörden.",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0! pt-0! container-gutachten",
    titleClassName: "!leading-none !text-sm",
    subHeadingClassName:
      "xl:!text-[32px] !leading-[1.6] lg:whitespace-pre-line",
    subtitleClassName: "!text-sm !leading-[1.8]",
    imgClassName: "object-cover",
    heroTitleClassName: "text-lg md:text-[32px] whitespace-pre-line",
    image: {
      src: getImagePath(
        "/images/{{siteId}}/nutzungsdauergutachten-preisliste/gutachten-vector.webp"
      ),
      alt: "gutachten-vector.webp",
      width: 589,
      height: 597,
      className:
        "object-cover ml-auto! mt-auto! max-h-[597px] max-w-[589px] hidden lg:block",
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
    imageWrapperClassName: "hidden lg:block",
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
  createComponent<DetailedPriceListComponent>({
    type: "DetailedPriceList",
    id: "detailed-price-list",
    sectionId: "detailed-price-list",
    title: "Preisliste Restnutzungsdauergutachten (RNDG)",
    introText:
      "Für jedes Gutachten gibt es (auf Wunsch) eine kostenlose Ersteinschätzung, nach der Sie entscheiden können, ob Sie das kostenpflichtige Gutachten beauftragen möchten.",
    basePricesTitle: "Grundpreise je nach Objektgröße (Wohn- und Nutzfläche):",
    basePrices: [
      {
        sizeRange: "BIS 150 M²",
        price: "950,81 €",
        note: "*",
      },
      {
        sizeRange: "151-300 M²",
        price: "1.065,81 €",
        note: "*",
      },
      {
        sizeRange: "301-500 M²",
        price: "1.184,05 €",
        note: "*",
      },
      {
        sizeRange: "501-1000 M²",
        price: "1.541,05 €",
        note: "*",
      },
      {
        sizeRange: "1001-2500 M²",
        price: "2.017,05 €",
        note: "*",
      },
      {
        sizeRange: "ÜBER 2500 M²",
        price: "2.612,05 €",
        note: "*",
      },
    ],
    basePricesNote:
      "*Alle Preise sind inklusive MwSt. → Objekte über 2500m² und für Gewerbe- sowie sonstige Objekte kann ein individueller Preis anfallen, über den wir vor Bestellung informieren",
    basePricesWarningText:
      "Die gewöhnliche Bearbeitungszeit beträgt 2-3 Wochen, hierbei handelt es sich jedoch um eine unverbindliche Angabe ohne Garantie und setzt voraus, dass uns vollständige und aussagekräftige Unterlagen zur Verfügung gestellt werden. Eine kostenfreie Ersteinschätzung erfolgt in der Regel innerhalb von 1-5 Werktagen, sofern die Daten vollständig vorliegen.",
    extrasTitle: "Zubuchbare Extras",
    extras: [
      {
        title: "Vor-Ort-Außenbesichtigung",
        price: "177,31 €*",
        description:
          "Nicht verpflichtend, aber von zahlreichen Finanzierern gefordert (empfohlen)",
        recommended: true,
      },
      {
        title: "Vor-Ort-Innen- und Außenbesichtigung",
        price: "ab 471,81 €*",
        description: "Optional - indes teils sehr selten gefordert",
        optional: true,
      },
      {
        title: "Expresszuschlag",
        price: "236,31 €*",
        description: "Herstellung binnen 1 Woche",
      },
      {
        title: "Dateneingabe durch unser Team",
        price: "171,31 €*",
        description:
          "Sollten Sie Ihre Daten nicht über unsere mobilen Formulare und Vorlagen eingeben",
      },
    ],
    extrasWarningText:
      "Die gewöhnliche Bearbeitungszeit beträgt 2-3 Wochen, hierbei handelt es sich jedoch um eine unverbindliche Angabe ohne Garantie und setzt voraus, dass uns vollständige und aussagekräftige Unterlagen zur Verfügung gestellt werden. Eine kostenfreie Ersteinschätzung erfolgt in der Regel innerhalb von 1-5 Werktagen, sofern die Daten vollständig vorliegen.",
    extrasNote:
      "Alle Preise sind inklusive MwSt. Bei Vor-Ort-Besichtigungen ist der Auftraggeber für die Bereitstellung des Zugangs und aller notwendigen Unterlagen verantwortlich.",
    notesTitle: "Hinweise zur Erstellung",
    notesText:
      "Die Gutachten werden auf Basis der bereitgestellten Daten, nach bestem Wissen und Gewissen und nach fachkundiger Prüfung sowie Plausibilisierung durch zertifizierte, erfahrene Immobilienbegutachter erstellt.",
    discountsTitle: "Mengenrabatte*",
    discounts: [
      {
        threshold: "Ab 10 Gutachten",
        discount: "10% Rabatt",
      },
      {
        threshold: "Ab 20 Gutachten",
        discount: "15% Rabatt",
      },
      {
        threshold: "Ab 50 Gutachten",
        discount: "20% Rabatt",
      },
      {
        threshold: "Ab 100 Gutachten",
        discount: "25% Rabatt",
      },
    ],
    discountsNote: "*Bei Beauftragung binnen 2 Wochen",
    containerClassName: "container-gutachten",
    backgroundClassName: "bg-white",
    sectionClassName: "pt-0!",
    titleClassName: "!text-left",
    introTextClassName: "max-w-4xl",
    basePricesTitleClassName: "!text-left",
    extrasTitleClassName: "!text-left",
    notesTitleClassName: "!text-left",
    discountsTitleClassName: "!text-left",
    extrasNoteClassName: "italic font-medium",
    basePricesNoteClassName: "italic font-medium",
    basePricesWarningTextClassName: "font-medium bg-[#EAEEF0] px-6.5 py-4",
    extrasWarningTextClassName: "font-medium bg-[#EAEEF0] px-6.5 py-4",
  }),
  createComponent<ServiceOffersComponent>({
    type: "ServiceOffers",
    id: "service-offers",
    title: "Unsere Angebote",
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
      },
    ],
    containerClassName: "container-gutachten",
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
        icon: "ArrowUpRight",
        variant: "default",
        external: false,
        className:
          "bg-[#FF985C] hover:bg-[#FF985C]/90 text-gray-900 [&_svg]:text-gray-900 !px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
      },
      {
        label: "Nutzungsdauer prüfen",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
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
          "/images/{{siteId}}/nutzungsdauergutachten-preisliste/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Immobilienexperte & Berater",
        iconImage: getImagePath(
          "/images/{{siteId}}/nutzungsdauergutachten-preisliste/gerrit-kolweyh.webp"
        ),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Simon Mill",
        description: "Kundenbetreuung",
        iconImage: getImagePath(
          "/images/{{siteId}}/nutzungsdauergutachten-preisliste/simon-mill.webp"
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
          href: "https://www.evalion.net",
          external: true,
          variant: "outline",
          className: "w-max !px-4.5 bg-transparent",
        },
      ],
      media: {
        src: getImagePath(
          "/images/{{siteId}}/nutzungsdauergutachten-preisliste/nutzen-sie.webp"
        ),
        alt: "Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin",
        width: 656,
        height: 455,
        className: "object-contain",
      },
      ctaContainerClassName: "justify-start gap-4!",
      mediaClassName: "w-full md:w-auto",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "md:gap-16 gap-6 place-content-end",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
      contentClassName: "md:gap-[50px] gap-6",
      contentTitleClassName: "md:gap-[50px] gap-6",
    },
    className: "py-12 md:py-20!",
    backgroundColor: "bg-[#F4F8F7]",
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
