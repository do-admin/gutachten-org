import type {
  SubpageContent,
  HeroWithFeatureCardsComponent,
  BaresGeldSparenSectionComponent,
  ServiceOffersComponent,
  StructuredDataComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import {
  getTemplateVariables,
  getImagePath,
  getAbsoluteImageUrl,
  getOrganizationStructuredData,
} from "@/lib/site-config-helper";

// Get template variables for this site
const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Kontakt | Gutachten anfragen",
  description:
    "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/kontakt/",
  openGraph: {
    title: "Kontakt | Gutachten anfragen",
    description:
      "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/kontakt/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1200,
        height: 630,
        alt: "Kontakt für Immobiliengutachten - Professionelle Beratung von Gutachten.org",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | Gutachten anfragen",
    description:
      "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1200,
        height: 630,
        alt: "Kontakt für Immobiliengutachten - Professionelle Beratung von Gutachten.org",
      },
    ],
  },
};

// Page content
const kontaktContent: SubpageContent = validateContent([
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
          name: "Kontakt",
          // Last item doesn't need item field
        },
      ],
    },
  }),
  // Organization structured data for Contact page
  getOrganizationStructuredData(),
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer",
    variant: "hero-programatic-image",
    title: "Wir sind für Sie\nerreichbar",
    subtitle:
      "Wenn Sie Fragen haben oder wir Ihnen bei Ihrem Anliegen weiterhelfen können, erreichen Sie uns über den Kanal, der für Sie am besten passt: über das Kontaktformular oder telefonisch unter 030 754 364 81. Unser Team meldet sich zeitnah und persönlich bei Ihnen.",
    subtitleHighlightWords: [
      "Kontaktformular",
      "telefonisch",
      "030 754 364 81",
    ],
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0! pt-0! container-gutachten",
    titleClassName: "sm:!leading-15 xl:!leading-20 max-sm:text-2xl",
    subHeadingClassName: "!text-base md:!text-[32px]/15 whitespace-pre-line",
    subtitleClassName:
      "!text-sm xl:whitespace-pre-line space-y-0 leading-relaxed text-[#4F5A60]",
    imgClassName: "object-cover",
    heroTitleClassName:
      "text-3xl md:text-[56px] whitespace-pre-line md:leading-[80px]",
    ctas: [
      {
        label: "E-Mail schreiben",
        href: "mailto:support@gutachten.org",
        external: true,
        variant: "default",
        icon: "ArrowUpRight",
        className: "!px-4.5 w-full md:!max-w-max",
      },
      {
        label: "Anrufen",
        href: "tel:+493075436481",
        external: true,
        variant: "default",
        icon: "ArrowUpRight",
        className: "!px-4.5 w-full md:!max-w-max",
      },
    ],
    className: "py-[40px] md:py-[60px]",
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
    contactForm: {
      title: "",
      subtitle: "",
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
      formClassName: "",
      privacyCheckboxClassName: "data-[state=checked]:bg-slate-900!",
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
    },
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
    cards: [
      {
        title: "Felix Holfert (DIN EN ISO 17 0 24)",
        description: "Gutachter & Leiter des Sachverständigenteams",
        iconImage: getImagePath(
          "/images/{{siteId}}/kontakt/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
        overlayImage: getImagePath(
          "/images/{{siteId}}/kontakt/din-en-iso.webp"
        ),
        overlayImageAlt: "DIN EN ISO / IEC 17024 Zertifizierung",
      },
      {
        title: "Gerrit J. Kolweyh",
        description: "Geschäftsführer",
        iconImage: getImagePath(
          "/images/{{siteId}}/kontakt/gerrit-kolweyh.webp"
        ),
        iconImageAlt: "Gerrit J. Kolweyh",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Kolja Czudnochowski",
        description: "Geschäftsführung",
        iconImage: getImagePath(
          "/images/{{siteId}}/kontakt/kolja-czudnochowski.webp"
        ),
        iconImageAlt: "Kolja Czudnochowski",
      },
    ],
    cards2: [
      {
        title: "Sascha Matussek",
        description: "Steuerberater",
        iconImage: getImagePath(
          "/images/{{siteId}}/kontakt/sascha-matussek.webp"
        ),
        iconImageAlt: "Sascha Matussek",
      },
      {
        title: "Dr. Christopher Hahn, LL.M.",
        description: "Rechtsanwalt",
        iconImage: getImagePath(
          "/images/{{siteId}}/kontakt/christopher-hahn.webp"
        ),
        iconImageAlt: "Dr. Christopher Hahn, LL.M.",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Simon Mill",
        description: "Kundenbetreuung",
        iconImage: getImagePath("/images/{{siteId}}/kontakt/simon-mill.webp"),
        iconImageAlt: "Simon Mill",
      },
    ],
    cardsGridClassName:
      "gap-0 md:mt-16 mt-8 border border-[rgba(39,50,56,0.10)]",
    ctaIconClassName: "text-[#FF985C]",
    summaryContainerClassName: "max-w-[592px] ml-auto",
    containerClassName: "container-gutachten",
    headerContainerClassName: "m-0!",
    className: "!py-[60px]",
  }),
  createComponent<ServiceOffersComponent>({
    type: "ServiceOffers",
    id: "service-offers",
    title: "Unsere Angebote",
    subtitle:
      "Ihre zertifizierten & erfahrenen Sachverständigen erstellen Ihre Gutachten und Dokumente - inklusive unverbindlichem Angebot und kostenloser Ersteinschätzung.",
    moreInfoText: "Mehr erfahren",
    moreInfoLink: "/angebote",
    moreInfoButtonClassName: "w-full md:w-fit!",
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
    containerClassName: "container-gutachten",
  }),
]);

export default kontaktContent;
