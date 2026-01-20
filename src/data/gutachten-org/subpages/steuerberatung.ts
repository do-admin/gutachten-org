import type {
  SubpageContent,
  TextImageComponent,
  StructuredDataComponent,
  HeroWithFeatureCardsComponent,
  ServiceSpectrumComponent,
  CenteredCtaStatementComponent,
  BaresGeldSparenSectionComponent,
  FAQComponent,
  TrustBlockComponent,
  TwoColumnFeatureSectionComponent,
  ApplicationProcessComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import {
  getImagePath,
  getAbsoluteImageUrl,
  getOrganizationStructuredData,
  getTemplateVariables,
} from "@/lib/site-config-helper";

import SteuerberatungFaqData from "../json/steuerberatung/steuerberatung-faq.json";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Steuerberatung | Zertifizierte Gutachter | Gutachten.org",
  description:
    "Professionelle Steuerberatung für Immobilieninvestoren. Steueroptimierung, AfA-Beratung und rechtssichere Gutachten mit deutschlandweiter Expertise.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/steuerberatung/",
  openGraph: {
    title: "Steuerberatung | Zertifizierte Gutachter | Gutachten.org",
    description:
      "Professionelle Steuerberatung für Immobilieninvestoren. Steueroptimierung, AfA-Beratung und rechtssichere Gutachten mit deutschlandweiter Expertise.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/steuerberatung/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1920,
        height: 1280,
        alt: "Steuerberatung für Immobilieninvestoren - Gutachten.org",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steuerberatung | Zertifizierte Gutachter | Gutachten.org",
    description:
      "Professionelle Steuerberatung für Immobilieninvestoren. Steueroptimierung, AfA-Beratung und rechtssichere Gutachten mit deutschlandweiter Expertise.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1920,
        height: 1280,
        alt: "Steuerberatung für Immobilieninvestoren - Gutachten.org",
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
    id: "structured-data-article",
    schemaType: "article",
    data: {
      headline: `Steuerberatung – ${templateVariables.siteName}`,
      description:
        "Professionelle Steuerberatung für Immobilieninvestoren. Steueroptimierung, AfA-Beratung und rechtssichere Gutachten mit deutschlandweiter Expertise.",
      url: `${templateVariables.siteUrl}/steuerberatung/`,
      image: getImagePath(
        "/images/{{siteId}}/steuerberatung/steuerberatung-hero.webp"
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
      articleSection: "Steuerberatung",
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: SteuerberatungFaqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: `${templateVariables.siteUrl}/steuerberatung/`,
      name: `${templateVariables.siteName} - Steuerberatung FAQ`,
    },
  }),
];

const steuerberatungContent: SubpageContent = validateContent([
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
          name: "Steuerberatung",
        },
      ],
    },
  }),
  ...structuredDataComponents,
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-steuerberatung",
    variant: "hero-evatax",
    title: "Vom Gutachten zur individuellen Steuerstrategie",
    titleHighlight: "individuellen",
    description:
      "EVATAX & LEGAL verbindet steuerrechtliche Präzision mit zertifizierter Bewertungskompetenz. Wir betreuen und vertreten Investoren, die ihre Immobilienwerte nicht nur verwalten, sondern strategisch entwickeln wollen.",
    customBackgroundClass: "bg-white",
    containerClassName: "container-gutachten",
    highlightClassName: "text-[#FF985C]",
    descriptionClassName: "md:text-sm",
    image: {
      src: getImagePath(
        "/images/{{siteId}}/steuerberatung/moderne-architektur.webp"
      ),
      alt: "Moderne Architektur",
      width: 800,
      height: 600,
      priority: true,
    },
    logo: {
      src: getImagePath("/images/{{siteId}}/steuerberatung/evatax-logo.webp"),
      alt: "EVATAX & LEGAL Logo",
      width: 200,
      height: 60,
      priority: true,
    },
    tag: {
      text: "Steuer- und Rechtsberatung",
      dotColor: "#FF985C",
    },
    ctas: [
      {
        label: "Persönliches Gespräch vereinbaren",
        href: "/kontakt/",
        icon: "ArrowUpRight",
        variant: "default",
      },
      {
        label: "Kontakt anfragen",
        href: "/kontakt/",
        variant: "outline",
      },
    ],
    imageOverlay: {
      featureCard: {
        iconName: "FileCheck",
        title: "IMMOBILIEN-STRATEGIEN",
        subtitle: "Steuerlich optimiert",
        containerClassName: "bottom-0 right-0 p-6 rounded-tl-2xl",
      },
    },
    ctaIconClassName: "text-[#FF985C]",
    className: "py-8 md:py-12 lg:py-16",
    imageClassName: "rounded-2xl",
  }),
  createComponent<TrustBlockComponent>({
    type: "TrustBlock",
    id: "trust-block-data-summary",
    variant: "metric-summary",
    title: "",
    logos: [
      {
        image: {
          src: "",
          alt: "100 Mio. €+",
        },
        title: "VERWALTETES VOLUMEN",
        description: "100 Mio. €+",
        valueClassName: "trust-block-data-summary-value-30px",
      },
      {
        image: {
          src: "",
          alt: "Gutachten + Steuern + Recht",
        },
        title: "SYNERGIE",
        description: "Gutachten + Steuern + Recht",
        valueClassName: "min-h-9 flex items-center",
      },
      {
        image: {
          src: "",
          alt: "Asset-Optimierung",
        },
        title: "FOKUS",
        description: "Asset-Optimierung",
        valueClassName: "min-h-9 flex items-center",
      },
    ],
    className: "py-0!",
    containerClassName: "container-gutachten",
  }),
  createComponent<TwoColumnFeatureSectionComponent>({
    type: "TwoColumnFeatureSection",
    id: "two-column-feature-section-evatax",
    heading: "Der Marktstandard genügt nicht.",
    paragraphs: [
      'Immobilieninvestoren standen in der Vergangenheit vor derselben Frage: "Ich habe jetzt das Gutachten, aber wer setzt das steuerlich sicher durch?"',
      "Deshalb haben wir EVATAX & LEGAL gegründet.. Externe Schnittstellen kosten Geld und Präzision. Bei uns erfolgen Gutachtenerstellung und die laufende steuerliche Optimierung nun integriert. Ohne Informationsverlust zwischen Gutachter und Steuerberater.",
    ],
    features: [
      {
        icon: getImagePath(
          "/images/{{siteId}}/steuerberatung/integrierte-bewertung.webp"
        ),
        title: "Integrierte Bewertung & Gutachten",
        description:
          "Das Gutachten kommt direkt aus unserem Haus - optimiert für Ihren Nutzen.",
      },
      {
        icon: getImagePath(
          "/images/{{siteId}}/steuerberatung/rechtssicherheit.webp"
        ),
        title: "Rechtssicherheit",
        description:
          "Wir verteidigen Gutachten & Bewertungen fundiert gegenüber der Finanzverwaltung.",
      },
      {
        icon: getImagePath(
          "/images/{{siteId}}/steuerberatung/ganzheitliche-struktur.webp"
        ),
        title: "Ganzheitliche Struktur",
        description:
          "Von der Bewertung über die Holding-Gründung bis zur laufenden Optimierung.",
      },
    ],
    className: "",
    containerClassName: "container-gutachten",
  }),
  createComponent<ApplicationProcessComponent>({
    type: "ApplicationProcess",
    id: "comparison-section",
    variant: "comparison",
    eyebrow: 'Schluss mit "Stille Post"',
    title:
      "Abstimmungen zwischen verschiedenen Parteien sind\nineffizient, kosten Zeit und Geld.\nWir eliminieren die Reibungsverluste.",
    steps: [],
    comparisonItems: [
      {
        title: "Klassisches Modell",
        iconType: "x",
        iconImage: {
          src: getImagePath("/images/{{siteId}}/steuerberatung/x-icon.webp"),
          alt: "X Icon",
          width: 24,
          height: 24,
        },
        workflow: [
          {
            icon: "document",
            iconImage: {
              src: getImagePath(
                "/images/{{siteId}}/steuerberatung/document-icon.webp"
              ),
              alt: "Document Icon",
              width: 20,
              height: 20,
            },
          },
          {
            icon: "alert",
            iconImage: {
              src: getImagePath(
                "/images/{{siteId}}/steuerberatung/alert-icon.webp"
              ),
              alt: "Alert Icon",
              width: 20,
              height: 20,
            },
          },
          {
            icon: "calculator",
            iconImage: {
              src: getImagePath(
                "/images/{{siteId}}/steuerberatung/calculator-icon.webp"
              ),
              alt: "Calculator Icon",
              width: 20,
              height: 20,
            },
          },
        ],
        description:
          "Potenzielle Verluste an der Schnittstelle zwischen Gutachter und Steuerberater durch Informationsverlust und Missverständnisse.",
        customStyles: {
          padding: "32px",
          gap: "24px",
          borderRadius: "12px",
          backgroundColor: "rgba(248, 250, 252, 0.5)",
          borderColor: "#E2E8F0",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderDashPattern: "3, 2",
        },
      },
      {
        title: "Der EVATAX Ansatz",
        iconType: "check",
        iconImage: {
          src: getImagePath("/images/{{siteId}}/steuerberatung/true-icon.webp"),
          alt: "Check Icon",
          width: 24,
          height: 24,
        },
        workflow: [
          {
            icon: "document",
            iconImage: {
              src: getImagePath(
                "/images/{{siteId}}/steuerberatung/document-red-icon.webp"
              ),
              alt: "Document Icon",
              width: 20,
              height: 20,
            },
          },
          {
            icon: "check",
            iconImage: {
              src: getImagePath(
                "/images/{{siteId}}/steuerberatung/check-icon.webp"
              ),
              alt: "Check Icon",
              width: 20,
              height: 20,
            },
          },
        ],
        description:
          "Integrierte Bewertung und Steuererklärung aus einer Hand. Keine Schnittstellenverluste, maximale Effizienz und Präzision.",
        recommended: true,
        customStyles: {
          padding: "32px",
          gap: "24px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 247, 237, 0.3)",
          borderColor: "#FED7AA",
          borderStyle: "solid",
          borderWidth: "1px",
          boxShadow: "0px 0px 20px -5px rgba(249, 115, 22, 0.15)",
        },
      },
    ],
    recommendedBadgeText: "EMPFOHLEN",
    titleClassName: "md:whitespace-pre-line text-center",
    containerClassName: "container-gutachten",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "steuerberatung-ansprechpartner",
    variant: "contacts",
    title: "Ihre Ansprechpartner",
    bulletItems: [],
    cards: [],
    contacts: [
      {
        name: "Dr. Christopher Hahn",
        role: "Rechtsanwalt",
        image: getImagePath(
          "/images/{{siteId}}/steuerberatung/christopher-hahn.webp"
        ),
        bio: "Dr. Christopher Hahn ist Rechtsanwalt und Partner bei EVATAX & Legal mit Schwerpunkt auf Gesellschaftsrecht, M&A sowie der Strukturierung von Finanzierungen und Transaktionen inkl. Immobilien.",
        socialHref: "https://www.linkedin.com/in/christopher-hahn/",
      },
      {
        name: "Sascha Matussek",
        role: "Steuerberater",
        image: getImagePath(
          "/images/{{siteId}}/steuerberatung/sascha-matussek.webp"
        ),
        bio: "Sascha Matussek kennt das Finanzamt von innen. Seit 2007 in der Steuerberatung, seit 2014 mit eigener Kanzlei. Fokus Immobilien – strategische, vorausschauende Steuerplanung für EVATAX.",
        socialHref: "https://www.linkedin.com/in/sascha-matussek/",
      },
      {
        name: "Nicholas Bethge",
        role: "Jurist / Legal Associate",
        image: getImagePath(
          "/images/{{siteId}}/steuerberatung/nicholas-bethge.webp"
        ),
        bio: "Nicholas Bethge verbindet juristische Expertise mit betriebswirtschaftlichem Denken und begleitet die strukturierte Umsetzung von Gutachten- und Steuerstrategien an der Schnittstelle von Recht, Immobilie und Wirtschaftlichkeit.",
        socialHref: "https://www.linkedin.com/in/nicholas-bethge/",
      },
    ],
    contactsGridClassName: "mt-4",
    containerClassName: "container-gutachten",
    backgroundClassName: "bg-white",
    className: "pt-0!",
  }),
  createComponent<ApplicationProcessComponent>({
    type: "ApplicationProcess",
    id: "process-steps-section",
    variant: "process-steps",
    eyebrow: "Der Weg zum Mandat",
    title: "So einfach wechseln Sie in eine optimierte Struktur.",
    steps: [],
    processSteps: [
      {
        stepNumber: 1,
        title: "Kontaktaufnahme & Erstgespräch",
        description:
          "Wir freuen uns darauf, Sie uns Ihre aktuellen Herausforderungen kennenzulernen. Teilen Sie uns gerne vorab mit, wo Ihre Bedarfe liegen.",
        isActive: false,
      },
      {
        stepNumber: 2,
        title: "Analyse & Bewertung",
        description:
          "Wir analysieren Ihr Setup und Ihre Potenziale für steuerliche Optimierungen und rechtliche Herausforderungen - gutachterlich, steuerlich, rechtlich.",
        isActive: true,
      },
      {
        stepNumber: 3,
        title: "Lösungsfindung & Betreuung",
        description:
          "Wir finden pragmatische, rechtssichere Lösungen und betreuen Sie und Ihr Immobilienportfolio gerne langfristig und zielorientiert.",
        isActive: false,
      },
    ],
    backgroundColor: "bg-[#F8FAFC]",
    containerClassName: "container-gutachten",
  }),
  createComponent<ServiceSpectrumComponent>({
    type: "ServiceSpectrum",
    id: "steuerberatung-service-spectrum",
    title: "Unser Leistungsspektrum",
    subtitle:
      "Unser Full-Service Ansatz für Immobilieninvestoren. Pragmatisch,\nlösungsorientiert und koordiniert.",
    link: {
      label: "Zur Leistungsübersicht",
      href: "https://evatax.de/home#leistungen-detail",
      external: true,
      icon: "ArrowRight",
    },
    cards: [
      {
        icon: "ChartPie",
        title: "Verteidigung Restnutzungsdauer",
        description:
          "Wir formulieren den rechtssicheren Einspruch, liefern ergänzende Argumente und führen die Kommunikation mit Steuerberatern und dem Finanzamt für Sie.",
        bullets: [{ text: "Vollservice" }, { text: "Erfolgschancen" }],
      },
      {
        icon: "TrendingUp",
        badgeText: "KERNKOMPETENZ",
        title: "Analyse & Steueroptimierung",
        description:
          "Identifikation und Durchsetzung von ungenutzten Potenzialen durch Analyse durch unsere Anwälte, Steuerberater und Immobiliengutachter – holistisch und abgestimmt.",
        bullets: [
          { text: "Portfolioanalyse" },
          { text: "Potenzialanalyse" },
          { text: "Handlungsempfehlungen" },
        ],
      },
      {
        icon: "Landmark",
        title: "Rechtliche Strukturierung",
        description:
          "Gründung von vVGmbHs, Stiftungen oder Holdingstrukturen zur langfristigen Steueroptimierung und Asset Protection.",
        bullets: [{ text: "Gestaltungsberatung" }, { text: "Rechtsberatung" }],
      },
    ],
    sectionId: "leistungsspektrum",
    containerClassName: "container-gutachten",
    headerClassName: "items-end!",
  }),
  createComponent<CenteredCtaStatementComponent>({
    type: "CenteredCtaStatement",
    id: "steuerberatung-centered-cta",
    icon: "Scale",
    title: "Gutachten, Recht und Steuer\nsynchronisiert.",
    subtitle:
      "Wir schließen die Lücke zwischen Immobilienbewertung und\nSteuerberatung. Ein Ansprechpartner für alle Dimensionen Ihres\nInvestments.",
    cta: {
      label: "Mandat anfragen",
      href: "/kontakt/",
      icon: "ArrowRight",
    },
    sectionId: "mandat",
    containerClassName: "container-gutachten",
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "afa-recht-legal-steps",
    variant: "legalSteps",
    taxSavingsProps: {
      sectionId: "afa-recht-legal-steps",
      title: "Wir setzen Ihre Steuerersparnis durch.",
      heading: "AFA-RECHT.DE",
      mediaPosition: "left",
      intro:
        "Finanzämter zweifeln Gutachten zur Restnutzungsdauer zunehmend pauschal an. Ohne spezialisierte Gegenwehr verlieren Sie massive Liquiditätsvorteile. Standardmäßige Steuerberatung reicht hier oft nicht aus – es bedarf juristischer Strategie.",
      secondIntro:
        "Wir prüfen Ihr Recht unter Anwendung der aktuellen Rechtslage und Optimierungspotenziale. Anschließend übernimmt unser interdisziplinäres Team die Auseinandersetzungen für Sie.",
      problemCard: {
        eyebrow: "PROBLEMSTELLUNG",
        title: "Das Finanzamt lehnt Ihr\nGutachten ab?",
        subtitle:
          "Unser Team weiß Ihr Gutachten zu verteidigen –\nerfahren und bewährt.",
      },
      steps: [
        {
          title: "1. Prüfung & Analyse",
          description: "Wir sichten Ihr Gutachten und den Ablehnungsbescheid.",
          icon: "FileSearch",
        },
        {
          title: "2. Strategie & Angebot",
          description:
            "Wir entwickeln die passende juristische Strategie für Ihren Einspruch.",
          icon: "ScrollText",
        },
        {
          title: "3. Einspruch & Verteidigung",
          description:
            "Wir übernehmen die Kommunikation mit dem Finanzamt für Sie.",
          icon: "ShieldCheck",
        },
      ],
      ctas: [
        {
          label: "Mehr erfahren",
          href: "https://www.afa-recht.de/",
          external: true,
          icon: "ArrowUpRight",
          variant: "default",
          className:
            "!px-4.5 text-sm w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
        },
      ],
      media: {
        src: getImagePath(
          "/images/{{siteId}}/steuerberatung/afa-recht-bibliothek.webp"
        ),
        alt: "Bücherei mit Statue – Symbol für rechtliche Durchsetzung Ihrer Steuerersparnis",
        width: 644,
        height: 720,
      },

      contentHeadingClassName: "flex-col-reverse gap-4",
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
  createComponent<FAQComponent>({
    type: "FAQ",
    id: "faq-section",
    variant: "accordion",
    title: "Häufige Fragen",
    items: SteuerberatungFaqData,
    sectionId: "faq",
    defaultOpenIds: [
      "welche-zertifizierungen-haben-unsere-sachverstaendigen-und-gutachter",
    ],
    showTitle: true,
    arrowClassName: "text-[#FF985C]",
    sectionClassName: "bg-[#F8FAFB] py-[60px] lg:py-[120px]",
  }),
]);

export default steuerberatungContent;
