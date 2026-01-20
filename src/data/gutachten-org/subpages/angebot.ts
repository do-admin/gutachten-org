import type {
  BaresGeldSparenSectionComponent,
  HeroWithFeatureCardsComponent,
  StructuredDataComponent,
  SubpageContent,
  ProcessOverviewComponent,
  ServiceOffersComponent,
  LeadFormComponent,
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

const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Immobiliengutachten online beauftragen - Gutachten.org",
  description:
    "Jetzt Immobiliengutachten online beauftragen: Restnutzungsdauer, Kaufpreisaufteilung, Verkehrswert & mehr - digital & bundesweit verfügbar.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/angebot/",
  openGraph: {
    title: "Immobiliengutachten online beauftragen - Gutachten.org",
    description:
      "Jetzt Immobiliengutachten online beauftragen: Restnutzungsdauer, Kaufpreisaufteilung, Verkehrswert & mehr - digital & bundesweit verfügbar.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/angebot/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobiliengutachten online beauftragen - Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Immobiliengutachten online beauftragen - Gutachten.org",
    description:
      "Jetzt Immobiliengutachten online beauftragen: Restnutzungsdauer, Kaufpreisaufteilung, Verkehrswert & mehr - digital & bundesweit verfügbar.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Immobiliengutachten online beauftragen - Gutachten.org",
      },
    ],
  },
};

const angebotNewContent: SubpageContent = validateContent([
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
          name: "Angebot",
        },
      ],
    },
  }),
  // Organization structured data
  getOrganizationStructuredData(),

  // Website structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-website-angebot",
    schemaType: "website",
    data: {
      name: "Gutachten.org - Professionelle Immobiliengutachten",
      url: `${templateVariables.siteUrl}/angebot`,
      description:
        "Professionelle Immobiliengutachten von zertifizierten Sachverständigen. Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung und technische Beratung deutschlandweit.",
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
    id: "hero-with-feature-cards-angebot-new",
    variant: "hero-programatic-image",
    title: "Gutachten vom Profi - schnell\n rechtssicher, online beantragen",
    description:
      "Ob für Kauf, Verkauf, Steuer oder Finanzierung – bei uns erhalten Sie qualifizierte Gutachten und Dokumente direkt von zertifizierten Sachverständigen. Wählen Sie unten das passende Angebot und stellen Sie Ihre Anfrage unverbindlich und kostenfrei in wenigen Minuten online.",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0 pt-0! container-gutachten",
    titleClassName:
      "!leading-none !text-sm xl:whitespace-pre-line whitespace-normal",
    heroTitleClassName:
      "text-2xl xl:text-[32px] whitespace-pre-line leading-[1.6]",
    descriptionClassName: "!text-sm",
    imgClassName: "object-cover",
    image: {
      src: getImagePath("/images/{{siteId}}/angebot/angebot-hero.webp"),
      alt: "Immobiliengutachten Experten im Gespräch",
      width: 600,
      height: 800,
      className: "max-h-[540px]! object-cover",
    },
    className: "py-4 md:py-0",
    cardLayoutGridClassName: "gap-0",
    ctaIconClassName: "text-[#FF985C]",
    logoImageClassName: "!h-18",
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
  }),
  // ServiceOffers component
  createComponent<ServiceOffersComponent>({
    type: "ServiceOffers",
    id: "service-offers",
    title: "Unsere Leistungen",
    subtitle:
      "Ihre zertifizierten & erfahrenen Sachverständigen erstellen Ihre Gutachten und Dokumente - inklusive unverbindlichem Angebot und kostenloser Ersteinschätzung.",

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
          "Das gerichtsfeste Vollgutachten für Scheidung, Erbe, Finanzamt & Co. Rechtssicher und professionell.",
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
        icon: getImagePath("/images/{{siteId}}/angebot-new/battery.webp"),
        title: "Energieausweis",
        description:
          "Professioneller Energieausweis nach aktueller Gesetzeslage - z.B. für Verkauf, Bank, Vermietung oder Modernisierung.",
        buttonText: "Kostenlose Ersteinschätzung",
        buttonLink: "/energieausweis-anfrage/",
        external: true,
      },
      {
        icon: getImagePath("/images/{{siteId}}/angebot-new/frame.webp"),
        title: "Grundrisserstellung",
        description:
          "Professionelle Grundrisszeichnung auf Basis Ihrer Unterlagen oder unseres Aufmaßes - ideal für Verkauf, Vermietung und Finanzierung.",
        buttonText: "Angebot anfragen",
        buttonLink: "/grundrisszeichnung-anfrage",
        external: true,
      },
      {
        icon: getImagePath("/images/{{siteId}}/angebot-new/drawing.webp"),
        title: "Vermessung",
        description:
          "Exakte Vermessung von Grundstück und Gebäude als verlässliche Grundlage für Gutachten, Bank, Grundbuch, Planung oder Umbau.",
        buttonText: "Angebot anfragen",
        buttonLink: "/kontakt/",
        external: false,
      },
      {
        icon: getImagePath("/images/{{siteId}}/kontakt/erstgesprach.webp"),
        title: "Kontakt aufnehmen",
        description:
          "Wir nehmen uns Zeit für Sie und Ihr Anliegen. Teilen Sie uns gerne mit, womit wir Sie unterstützen können.",
        buttonText: "Kontakt",
        buttonLink: "/kontakt/",
        external: false,
      },
    ],
    containerClassName: "container-gutachten",
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
    descriptionClassName: "leading-[28px]",
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
  }),

  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "team-section",
    variant: "imagecard",
    title: "Wir sind für Sie da!",
    eyebrow: "unsere experten",
    bulletItems: [],
    summary: [
      "Aus unseren Zentralen in Berlin, Dresden & Bremen koordinieren wir unser Team, um Ihnen deutschlandweit zur Verfügung zu stehen!",
      "Unsere Gutachter sind durch mehrere DAkkS-akkredidierte Stellen nach\nDIN EN ISO / IEC 17024 zertifiziert.",
    ],
    highlight: "DIN EN ISO / IEC 17024 zertifiziert.",
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
    summaryContainerClassName: "max-w-[592px] ml-auto",
    summaryClassName: "text-sm! whitespace-pre-line",
    containerClassName: "container-gutachten",
    headerContainerClassName: "m-0!",
    className: "md:py-[83px] py-[40px]",
    titleClassName: "leading-[1]",
  }),

  createComponent<LeadFormComponent>({
    type: "LeadForm",
    title: "Sie haben Fragen?",
    subtitle: "Wir haben Antworten.",
    variant: "image-form",
    imageSrc: getImagePath(
      "/images/{{siteId}}/angebot-new/felix-holfert-leadform.webp"
    ),
    imageAlt: "Felix Holfert",
    sections: [
      {
        fields: [
          {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Name",
            inputClassName: "form-input-base h-14 sm:h-16",
            required: true,
          },
          {
            id: "email",
            name: "email",
            label: "E-Mail Adresse",
            type: "email",
            placeholder: "E-Mail Adresse",
            inputClassName: "form-input-base form-input-accent h-14 sm:h-16",
            required: true,
          },
          {
            id: "phone",
            name: "phone",
            label: "Telefonnummer",
            type: "tel",
            placeholder: "Telefonnummer",
            inputClassName: "form-input-base h-14 sm:h-16",
          },
          {
            id: "concern",
            name: "concern",
            label: "Anliegen",
            type: "select",
            placeholder: "Bitte wählen Sie ihr Anliegen aus",
            inputClassName: "form-input-base h-14 text-gray-900 sm:h-16",
            options: [
              { value: "restnutzungsdauer", label: "Restnutzungsdauer" },
              { value: "kaufpreisaufteilung", label: "Kaufpreisaufteilung" },
              { value: "wertermittlung", label: "Wertermittlung" },
              {
                value: "verkehrswertgutachten",
                label: "Verkehrswertgutachten",
              },
              { value: "steuerberatung", label: "Steuerberatung" },
              { value: "preise", label: "Preise" },
              { value: "schadensgutachten", label: "Schadensgutachten" },
              {
                value: "problem mit Finanzamt",
                label: "Problem mit Finanzamt",
              },
              { value: "sonstiges", label: "Sonstiges" },
            ],
            required: true,
          },
          {
            id: "message",
            name: "message",
            label: "Ihr Anliegen",
            type: "textarea",
            placeholder: "Ihr Anliegen (optional)",
            rows: 5,
            inputClassName:
              "form-input-base font-primary min-h-32 resize-none sm:min-h-40",
          },
        ],
      },
    ],
    submitButtonText: "Absenden",
    submitButtonColor: "#FF914C",
    privacyFieldId: "privacy",
    privacyLinkUrl: "/datenschutz",
    privacyLinkText: "Datenschutzerklärung",
    privacyText:
      "Mit Absenden des Formulars willige ich in die Verarbeitung meiner Daten gemäß der Datenschutzerklärung ein. Diese Einwilligung kann ich jederzeit widerrufen.",
    privacyLinkColor: "#CC4400",
    titleClassName: "text-[#243239] font-semibold!",
    subtitleClassName: "text-[#243239]",
    className:
      "mb-0 py-16 bg-[#F8FAFB] flex flex-col items-center justify-center",
    containerClassName: "container-gutachten",
    privacyCheckboxClassName: "data-[state=checked]:bg-slate-900!",
    resetButtonText: "Weitere Anfrage senden",
    resetButtonClassName:
      "h-14 w-full rounded-[8px] bg-[#ff985c] font-semibold hover:bg-[#ff985c]/90 sm:h-16",
    emailRecipients: ["support@gutachten.org"],
    emailFrom: "Gutachten.org <noreply@hero-pages.com>",
    replyTo: "support@gutachten.org",
    emailSubject: "Neue Kontaktanfrage von {name}",
    enableToast: true,
    toastSuccessTitle: "Erfolgreich gesendet!",
    toastSuccessDescription:
      "Vielen Dank für Ihre Anfrage. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.",
    enableRecaptcha: true,
    recaptchaTheme: "light",
    recaptchaSize: "normal",
  }),
]);

export default angebotNewContent;
