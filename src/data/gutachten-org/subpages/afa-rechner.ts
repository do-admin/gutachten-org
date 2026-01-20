import {
  createComponent,
  validateContent,
  type ClientComponentComponent,
  type FAQComponent,
  type StructuredDataComponent,
  HeroWithFeatureCardsComponent,
  BaresGeldSparenSectionComponent,
  PricingSectionComponent,
  TextImageComponent,
  DatenschutzComponent,
  FaqGroup,
  TrustBlockSlideshowComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import {
  getImagePath,
  getAbsoluteImageUrl,
  getResponsiveOptimizedImagePaths,
  getTemplateVariables,
} from "@/lib/site-config-helper";
import faqDataRaw from "../json/afa/faq-afa-rechner.json";

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
const flattenedGroups = flattenFaqGroups(faqDataRaw.faq_groups);
const faqData: FaqGroup[] = flattenedGroups.map(
  (group: {
    group_name: string;
    faqs: Array<{ question: string; answer: string }>;
  }) => ({
    groupName: group.group_name,
    faqs: group.faqs,
  })
);
const afaDescription =
  "Berechnen Sie mit dem AfA-Rechner die jährliche Abschreibung Ihrer vermieteten Immobilie - kostenlos, schnell & mit oder ohne Gutachten.";
  const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "AfA-Rechner für Immobilien - Abschreibung einfach berechnen",
  description: afaDescription,
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/afa-rechner/",
  openGraph: {
    title: "AfA-Rechner für Immobilien - Abschreibung einfach berechnen",
    description: afaDescription,
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/afa-rechner",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "AfA Rechner für Immobilien - Steuerersparnis berechnen bei Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfA-Rechner für Immobilien - Abschreibung einfach berechnen",
    description: afaDescription,
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "AfA Rechner für Immobilien - Steuerersparnis berechnen bei Gutachten.org",
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
          name: "AfA-Rechner",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-afa-rechner",
    schemaType: "article",
    data: {
      headline: "AfA Rechner für Immobilieneigentümer",
      description: afaDescription,
      image: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
      author: {
        "@type": "Organization",
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
      },
      publisher: {
        name: "Immobilienmakler Hannover",
        url: templateVariables.siteUrl,
        logo: {
          url: `${templateVariables.siteUrl}${getImagePath(
            "/images/{{siteId}}/logo/gutachten-org-logo-light.webp"
          )}`,
          width: 200,
          height: 60,
        },
      },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      url: `${templateVariables.siteUrl}/afa-rechner`,
    },
  }),
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "afa-rechner-hero",
    variant: "hero-programatic-image",
    preTitleText: "AfA-Rechner",
    title: "Immobilienabschreibung einfach berechnen und Steuern sparen",
    subtitle:
      "Wer eine Immobilie zur Vermietung kauft, kann mit der sogenannten Abschreibung für Abnutzung (AfA) einen Großteil der Anschaffungskosten über die Jahre steuerlich geltend machen. Dabei gilt: Abschreibungsfähig sind nur die Kosten für das Gebäude und die Kaufnebenkosten. Dabei bleibt der Wert des Grundstücks außen vor.",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0 py-[58px] md:py-0 container-gutachten",
    contentClassName: "flex flex-col items-start justify-center",
    preTitleTextClassName: "text-sm",
    titleClassName: "xl:!text-[32px] !leading-[1.6] lg:whitespace-pre-line",
    subtitleClassName: "!text-sm !leading-[1.8]",
    imgClassName: "object-cover",
    className: "bg-gray-50",
    image: {
      src: getImagePath("/images/{{siteId}}/afa-rechner/hero.webp"),
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
        label: "Mehr erfahren",
        href: "/",
        external: false,
        className:
          "!px-4.5 md:max-w-max! w-full md:justify-between justify-center! md:gap-6 gap-2",
        icon: "ArrowUpRight",
      },
      {
        label: "Jetzt kontaktieren",
        href: "/kontakt/",
        external: false,
        variant: "outline",
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
    logoCardClassName: "p-4! h-24",
    gridClassName: "md:gap-20",
    imageClassName:
      "md:opacity-60 md:grayscale transition-all duration-500 group-hover:scale-[1.1] group-hover:opacity-100 group-hover:grayscale-0",
    className: "pt-7 pb-6 bg-white",
    subtitleClassName: "text-muted-foreground mx-auto text-xl max-w-7xl",
    titleContainerClassName: "mb-6",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "bares-geld-sparen",
    bulletItems: [],
    cardLayoutColumns: 2,
    cards: [
      {
        title: "Welche Abschreibung ist bei Immobilien gesetzlich vorgesehen?",
        description:
          "Für Wohngebäude mit Baujahr zwischen 1925 und 2022 gilt der lineare AfA-Satz von 2 Prozent pro Jahr, was einer regulären Nutzungsdauer von 50 Jahren entspricht. Ab Baujahr 2023 wurde der Satz auf 3 Prozent jährlich erhöht; die steuerliche Abschreibungsdauer verkürzt sich damit auf 33 Jahre. Der Gesetzgeber möchte damit den Neubau stärker fördern.",
        iconImage: getImagePath("/images/{{siteId}}/afa-rechner/pen.webp"),
        iconImageAlt: "Modernisierungen",
      },
      {
        title: "Verkürzte Abschreibung durch Restnutzungsdauergutachten",
        description:
          "Wenn die tatsächliche Restnutzungsdauer eines Gebäudes kürzer ist als gesetzlich vorgesehen, können Sie per Gutachten eine höhere Abschreibung pro Jahr durchsetzen. So reduziert sich das zu versteuernde Einkommen deutlich schneller; und damit auch die Steuerlast. <br/> <br/>  Ob sich ein solches Gutachten für Ihr Objekt lohnt, lässt sich mit unserem AfA-Rechner für vermietete Immobilien einfach herausfinden. Er zeigt Ihnen, welche Steuerersparnis möglich ist und wie schnell sich die Investition in ein Gutachten amortisiert.",
        iconImage: getImagePath(
          "/images/{{siteId}}/afa-rechner/baulicher.webp"
        ),
        iconImageAlt: "Baulicher Zustand",
      },
    ],
    eyebrowClassName: "text-[#515A5F] mb-6",
    titleClassName: "text-[#273238]",
    bulletTextClassName: "text-[#515A5F]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "md:items-end md:justify-end",
    cardsGridClassName: "md:grid-cols-2 mt-0",
    eyebrowContainerClassName: "space-y-0!",
    contentGridClassName: "gap-0 md:gap-12 lg:gap-16",
    containerClassName: "container-gutachten",
    className: "py-[60px]!",
  }),
  createComponent<ClientComponentComponent>({
    type: "ClientComponent",
    id: "afa-rechner-widget",
    componentName: "AfACalculatorWidget",
    className: "container mx-auto px-4 pb-8 md:pb-30",
    title: "Einfach mal ausprobieren?",
    subtitle:
      "Geben Sie jetzt die individuellen Werte ihrer Immobilie ein und simulieren Sie in Echtzeit die Abschreibung Ihrer Immobilie.",
    cta: {
      label: "Kostenlose Ersteinschätzung",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      icon: "ArrowUpRight",
      external: true,
      variant: "default",
      iconClassName: "text-[#FF985C]",
    },
    titleClassName: "text-[#273238]!",
    subtitleClassName: "text-[#515A5F]",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "tax-savings-section",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "tax-savings",
      title: "Hauptgründe, die für AfA sprechen:",
      mediaPosition: "left",
      benefitIcon: {
        src: getImagePath("/images/{{siteId}}/afa-rechner/bullet-point.webp"),
        alt: "Bullet point",
        position: "left",
      },
      benefitsItemClassName: "flex flex-col gap-2",
      benefitsItemDescriptionClassName:
        "justify-start self-stretch pl-6 text-sm leading-6 font-normal text-gray-600",
      benefits: [
        {
          content: "Maximale Steuervorteile:",
          description:
            "Mit AfA senken Sie die Steuerlast für vermietete oder gewerblich genutzte Immobilien und steigern Ihre Netto-Mietrendite.",
        },
        {
          content: "Planungssicherheit über Jahrzehnte:",
          description:
            "AfA bietet nicht nur kurzfristige Entlastung, sondern ermöglicht eine präzise, langfristige Steuerplanung.",
        },
        {
          content: "Attraktiver für Investoren",
          description:
            "Immobilien mit klar kalkulierbarer Abschreibung wirken interessanter auf Käufer und Geschäftspartner.",
        },
        {
          content: "Wert beim Verkauf:",
          description:
            "Selbst bei einem Immobilienverkauf können Käufer den verbleibenden Abschreibungszeitraum übernehmen: ein zusätzlicher Vorteil.",
        },
      ],
      cta: {
        label: "Kostenlose Ersteinschätzung",
        href: "/restnutzungsdauergutachten-ersteinschaetzung/",
        external: true,
        className: "w-max",
      },
      media: {
        ...getResponsiveOptimizedImagePaths(
          "/images/{{siteId}}/afa-rechner/seitenansicht-mehrfamilienhaus-gutachten.webp"
        ),
        alt: "Steuern sparen mit verkürzter Abschreibungsdauer",
        width: 644,
        height: 720,
      },
      mediaClassName: "max-w-[644px] object-cover max-h-[720px]",
      conclusionClassName: "text-[#515A5F]",
      ctaIconClassName: "text-[#FF985C]",
      sectionContainerClassName: "place-content-start",
      contentClassName: "max-w-[516px]",
      ctaIconName: "ArrowUpRight",
      containerClassName: "container-gutachten",
    },
    className: "pt-0!",
  }),
  createComponent<DatenschutzComponent>({
    type: "Datenschutz",
    id: "afa-guide-section",
    className: "",
    variant: "afaGuide",
    afaGuideProps: {
      backgroundColor: "bg-gradient-to-b from-[rgba(143,181,170,0.1)] to-white",
      padding: "py-20 md:py-[120px]",
      content: {
        heroTitle: "AfA für Immobilien: das Wichtigste auf einen Blick",
        heroDescription:
          "Wer eine vermietete Immobilie kauft, kann die Anschaffungskosten, also den Gebäudeanteil und bestimmte Nebenkosten, nicht jedoch den Grundstückswert, über viele Jahre steuerlich abschreiben. Das reduziert Jahr für Jahr die Steuerlast.",
        grundlagenTitle: "Grundlagen der AfA",
        grundlagenDescription:
          "Die Absetzung für Abnutzung spiegelt den natürlichen Wertverlust einer Immobilie wider. Vermieter dürfen diesen rechnerischen Verlust steuerlich geltend machen und so ihren zu versteuernden Gewinn senken.",
        grundlagenSubtitle: "Für Wohngebäude gelten feste Sätze:",
        grundlagenItems: [
          {
            text: "Baujahr 1925 bis 2023 → lineare Abschreibung mit 2 Prozent pro Jahr bei einer Nutzungsdauer von 50 Jahren.",
          },
          {
            text: "Baujahr ab 2023 → 3 Prozent pro Jahr bei einer Nutzungsdauer von 33 Jahren und 4 Monaten.",
          },
        ],
        schnellerenTitle: "Möglichkeit zur schnelleren Abschreibung",
        schnellerenDescription:
          "Ein Gutachten, das eine kürzere Restnutzungsdauer bestätigt, ermöglicht eine höhere jährliche Abschreibung. Dadurch werden Anschaffungskosten schneller steuerlich wirksam und die Steuerlast sinkt früher. Ein AfA Rechner zeigt, wie hoch die jährliche Ersparnis ausfallen kann.",
        anschaffungskostenTitle: "Was zu den Anschaffungskosten gehört",
        anschaffungskostenDescription:
          "Für die AfA zählt nicht nur der Kaufpreis des Gebäudes, sondern auch alle erwerbsbezogenen Nebenkosten, die auf das Gebäude entfallen, wie zum Beispiel:",
        anschaffungskostenItems: [
          "Notargebühren und Grundbuchkosten",
          "Grunderwerbsteuer",
          "Maklerprovision",
          "Kosten für ein Notaranderkonto",
          "Reise-, Telefon- und Verwaltungskosten im Zusammenhang mit dem Kauf",
          "Bewertungs- und Gutachterkosten, etwa bei einer Zwangsversteigerung",
        ],
        bulletPointImage: {
          alt: "Bullet point",
          className: "text-[#FF985C]",
          width: 16,
          height: 16,
          src: getImagePath("/images/{{siteId}}/afa-rechner/bullet-point.webp"),
        },
        anschaffungskostenNote:
          "Der Grundstückswert wird bei der Berechnung immer herausgerechnet.",
        berechnungTitle: "So wird gerechnet",
        formelTitle: "Formel:",
        formelDescription:
          "(Gebäudepreis plus anrechenbare Nebenkosten) geteilt durch Nutzungsdauer = jährlicher Abschreibungsbetrag",
        beispielTitle: "Beispiel:",
        beispielDescription:
          "Eine Immobilie kostet 360.000 Euro, wovon 80.000 Euro auf das Grundstück entfallen. Die Kaufnebenkosten liegen bei 40.000 Euro. Damit ergibt sich ein anrechenbarer Betrag von 320.000 Euro. Bei einer Nutzungsdauer von 50 Jahren beträgt die jährliche Abschreibung 2 Prozent, also 6.400 Euro.",
        fazitTitle: "Fazit",
        fazitDescription:
          "Die AfA ist ein wirksames Steuerinstrument für Vermieter. Wer die Möglichkeit einer verkürzten Nutzungsdauer nutzt, erhöht den jährlichen Abschreibungsbetrag und profitiert schneller von spürbaren Steuerentlastungen.",
      },
    },
  }),
  createComponent<PricingSectionComponent>({
    type: "PricingSection",
    id: "pricing-section",
    title: "Was kostet ein\nNutzungsdauergutachten?",
    cta: {
      label: "Kostenlose Ersteinschätzung",
      href: "/restnutzungsdauergutachten-ersteinschaetzung/",
      icon: "ArrowUpRight",
      external: true,
    },
    ctaIconClassName: "text-[#FF985C]",
    fairPricesBox: {
      iconImage: getImagePath("/images/{{siteId}}/afa-rechner/vector.svg"),
      iconImageAlt: "Faire Preise",
      title: "Faire Preise - keine versteckten Zusatzkosten",
      description:
        "Bei uns kostet ein Nutzungsdauergutachten ab 950,00 € brutto (798,32€ netto) - bis zu einer Größe von 150m2. Danach steigt der Preis - nach Größe - leicht an.",
      priceGross: "ab €950.00",
      priceNet: "ab €798.32",
    },
    inspectionBox: {
      title: "Zusatzkosten durch Besichtigung",
      description:
        "Optional - und von uns empfohlen - können Sie eine Besichtigung dazubuchen, um die Wertigkeit Ihres Gutachtens zu erhöhen.",
    },
    priceListBox: {
      title: "Preisliste",
      description:
        "Die finalen Kosten Ihres Gutachtens entnehmen Sie unserer Preisliste.",
      priceListLink: "/nutzungsdauergutachten-preisliste",
      priceListLinkText: "Preisliste",
    },
    titleClassName: "md:whitespace-pre-line whitespace-nowrap",
    headerClassName: "md:items-end",
    containerClassName: "container-gutachten",
  }),
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Häufig gestellte Fragen",
    items: faqData,
    sectionId: "faq",
    defaultOpenIds: [
      "welche-zertifizierungen-haben-unsere-sachverstaendigen-und-gutachter",
    ],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);
