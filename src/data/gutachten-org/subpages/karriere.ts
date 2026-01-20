import type {
  HeroWithFeatureCardsComponent,
  SubpageContent,
  TextImageComponent,
  StructuredDataComponent,
  BaresGeldSparenSectionComponent,
  EmbedScriptComponent,
  ApplicationProcessComponent,
  CardLayoutComponent,
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

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Karriere bei Gutachten | Jobs & Stellenangebote",
  description:
    "Werden Sie Teil unseres Teams! Karrieremöglichkeiten bei Gutachten.org - moderne Arbeitsweise, starke Benefits und echte Entwicklungsmöglichkeiten.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/karriere/",
  openGraph: {
    title: "Karriere bei Gutachten.org | Jobs & Stellenangebote",
    description:
      "Karrieremöglichkeiten bei Gutachten.org - Moderne Arbeitsweise, starke Benefits und echte Entwicklungsmöglichkeiten in einem innovativen Team.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/karriere/",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1920,
        height: 1280,
        alt: "Karriere bei Gutachten.org",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karriere bei Gutachten.org",
    description:
      "Werden Sie Teil unseres Teams! Karrieremöglichkeiten bei Gutachten.org mit modernen Benefits und Entwicklungsmöglichkeiten.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1920,
        height: 1280,
        alt: "Karriere bei Gutachten.org",
      },
    ],
  },
};

const structuredDataComponents = [
  getOrganizationStructuredData(),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-karriere-article",
    schemaType: "article",
    data: {
      headline: "Karriere bei Gutachten.org | Jobs & Stellenangebote",
      description:
        "Karrieremöglichkeiten bei Gutachten.org - Moderne Arbeitsweise, starke Benefits und echte Entwicklungsmöglichkeiten in einem innovativen Team.",
      url: `${templateVariables.siteUrl}/karriere/`,
      image: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
      publisher: {
        name: templateVariables.siteName,
        logo: {
          url: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
        },
      },
      author: {
        "@type": "Organization",
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
      },
      datePublished: "2020-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      articleSection: "Karriere",
    },
  }),
];

const karriereContent: SubpageContent = validateContent([
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
          name: "Karriere",
        },
      ],
    },
  }),
  ...structuredDataComponents,
  // HeroWithFeatureCards component
  createComponent<HeroWithFeatureCardsComponent>({
    type: "HeroWithFeatureCards",
    id: "hero-with-feature-cards-nutzungsdauer",
    variant: "hero-programatic-image",
    title: "Werde Teil unseres Teams.",
    subtitle:
      "Starte deine Karriere bei Gutachten.org und werde Teil unseres Teams – moderne Arbeitsweise, starke Benefits und echte Entwicklungsmöglichkeiten. Jetzt informieren und bewerben!",
    subtitleClassName: "text-base! xl:text-lg text-[#515A5F] leading-[36px]",
    customBackgroundClass: "recommended-links bg-white",
    containerClassName: "gap-0 pt-0! container-gutachten",
    contentClassName: "flex flex-col items-start justify-center",
    heroTitleClassName: "!text-[#D35F17] uppercase text-sm",
    titleClassName: "m-0",
    subHeadingClassName:
      "!text-base md:text-4xl! xl:!text-[56px] font-bold !leading-[1.6]",
    imgClassName: "object-cover",
    className: "bg-gray-50",
    image: {
      src: getImagePath("/images/{{siteId}}/karriere/karriere-hero.webp"),
      alt: "Experten für Immobiliengutachten im Gespräch",
    },
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
      cta: {
        label: "Zu den offenen Stellen",
        href: "#join-widget",
        className:
          "text-sm md:max-w-max w-full! md:max-w-max! justify-center! gap-2 md:justify-between md:gap-6",
        icon: "ArrowUpRight",
        variant: "default",
      },
      containerClassName:
        "my-6 md:mb-0 max-w-full md:max-w-[569px] items-start xl:items-center justify-between xl:gap-3 gap-4",
    },
    logoImageClassName: "!h-18",
    logosContainerClassName: "mb-[50px]",
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
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "karriere-section",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "karriere-section",
      title: "Gutachten.org",
      heading: "ÜBER UNS",
      mediaPosition: "left",
      intro:
        "Gutachten.org ist unser modernes, deutschlandweites Gutachtenbüro für Immobilien. Unsere Gutachten sind kein Selbstzweck, sondern Werkzeug für bessere Finanzierungen, Steuern und Investment- entscheidungen. Wir liefern schnelle, klare und praxisorientierte Ergebnisse für Menschen, die mit Immobilien wirklich etwas vorhaben. Dabei arbeiten wir eng mit Investor:innen, Eigentümer:innen und Profis zusammen und richten unsere Arbeit konsequent an ihren Zielen aus.",
      media: {
        src: getImagePath("/images/{{siteId}}/karriere/uber-uns-orange.webp"),
        alt: "",
        width: 656,
        height: 645,
        overlayImage: {
          src: getImagePath("/images/{{siteId}}/karriere/vector.webp"),
          alt: "Dekoratives Vektorelement",
          width: 286,
          height: 300,
        },
      },
      headingClassName:
        "text-sm uppercase md:text-end text-[#D35F17] font-semibold",
      titleClassName:
        "!text-base md:text-4xl! xl:!text-[56px] font-bold !leading-none whitespace-nowrap",
      contentTitleClassName: "gap-6",
      introClassName:
        "text-base md:leading-[36px] md:whitespace-pre-line whitespace-normal",
      mediaClassName: "max-w-[656px] object-cover max-h-[645px]",
      sectionContainerClassName:
        "xl:gap-16 gap-8 place-content-start justify-between",
      contentClassName: "max-w-[656px]",
      containerClassName: "container-gutachten",
    },
  }),
  createComponent<TextImageComponent>({
    type: "TextImageSection",
    id: "karriere-section",
    variant: "taxSavings",
    taxSavingsProps: {
      sectionId: "karriere-section",
      title: "Unsere Mission",
      heading: "ÜBER UNS",
      mediaPosition: "right",
      intro:
        "Mit Evalion bauen wir das Betriebssystem für Immobiliengutachten und alles, was dazu gehört. Wir verbinden unser Gutachtenbüro Gutachten.org mit moderner Software sowie einer spezialisierten Rechtsanwalts- und Steuerberatungskanzlei zu einem ganzheitlichen Angebot rund um Immobilien-investments.  Unsere Mission: eine veraltete Branche neu denken, Prozesse radikal vereinfachen und Gutachten konsequent als Mittel zum Zweck für bessere Entscheidungen unserer Kund:innen verstehen. Dafür suchen wir Menschen mit echtem Drive, die gemeinsam mit uns diese Branche verändern wollen.",
      media: {
        src: getImagePath("/images/{{siteId}}/karriere/unsere-mission.webp"),
        alt: "",
        width: 656,
        height: 645,
      },
      headingClassName:
        "text-sm uppercase text-start text-[#D35F17] font-semibold",
      titleClassName:
        "!text-base md:text-4xl! xl:!text-[56px] font-bold !leading-none whitespace-nowrap",
      contentTitleClassName: "gap-6",
      introClassName:
        "text-base md:leading-[36px] md:whitespace-pre-line whitespace-normal",
      mediaClassName: "max-w-[656px] object-cover max-h-[645px]",
      sectionContainerClassName:
        "lg:gap-16 xl:gap-20.5 gap-8 place-content-start justify-between",
      contentClassName: "max-w-[656px]",
      containerClassName: "container-gutachten",
    },
    className: "pt-0!",
  }),
  createComponent<EmbedScriptComponent>({
    type: "EmbedScript",
    id: "join-widget",
    scriptSrc:
      "https://join.com/api/widget/bundle/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXR0aW5ncyI6eyJzaG93Q2F0ZWdvcnlGaWx0ZXIiOnRydWUsInNob3dMb2NhdGlvbkZpbHRlciI6dHJ1ZSwic2hvd0VtcGxveW1lbnRUeXBlRmlsdGVyIjp0cnVlLCJsYW5ndWFnZSI6ImRlIiwiam9ic1BlclBhZ2UiOjI1fSwiam9icyI6e30sImRlc2lnbiI6eyJzaG93TG9nbyI6dHJ1ZSwic2hvd0xvY2F0aW9uIjp0cnVlLCJzaG93RW1wbG95bWVudFR5cGUiOnRydWUsInNob3dDYXRlZ29yeSI6dHJ1ZSwiY29sb3JzIjp7IndpZGdldCI6eyJiYWNrZ3JvdW5kIjoiI0ZGRkZGRiIsImZpbHRlckJvcmRlciI6IiNENEQ0RDgiLCJwYWdpbmF0aW9uIjoiI0ZDNzAxOSJ9LCJqb2JDYXJkIjp7InNoYWRvdyI6IiNENEQ0RDgiLCJiYWNrZ3JvdW5kIjoiI0ZGRkZGRiIsInByaW1hcnlUZXh0IjoiIzNGM0Y0NiIsInNlY29uZGFyeVRleHQiOiIjNTI1MjVCIn19fSwidmVyc2lvbiI6MiwiY29tcGFueVB1YmxpY0lkIjoiZjk0MjFjMTE0ODM0NTJmYzI3MmUzMjg4YWI3NGI5ZTAiLCJpYXQiOjE3NjQ1ODgxMjYsImp0aSI6IjdjZTU0NTBhLTA4NWItNGRhMC04OTIzLTMyMjczMTZiMjlkNSJ9.G1AX-LsTrRH5Crj0JuS6uLqteOBkCLuv1ro7qECFVTc",
    mountId: "join-widget",
    title: "Offene Stellen",
    titleLevel: 2,
    scriptAttributes: {
      "data-mount-in": "#join-widget",
    },
    defer: true,
    scriptType: "text/javascript",
    className: "bg-background",
    titleClassName: "text-3xl font-bold text-[#273238] md:text-4xl m-0!",
    subtitleClassName: "text-base text-mutedForeground md:text-lg",
    embedContainerClassName: "min-h-[400px]",
  }),
  createComponent<ApplicationProcessComponent>({
    type: "ApplicationProcess",
    id: "application-process-section",
    eyebrow: "BEWERBUNGSPROZESS",
    title: "So funktioniert's!",
    questionText:
      "Du hast Fragen zu Deiner Bewerbung oder rund um den Bewerbungsprozess? Es ist nichts passendes für Dich dabei und Du möchtest Dich initiativ bewerben? Melde Dich gerne!",
    steps: [
      {
        step: "1",
        title: "Bewerbung und Erstkontakt",
        description:
          "Deine Bewerbung hat uns überzeugt. In einem ersten Gespräch finden wir heraus, ob wir zusammenpassen.",
        icon: {
          src: getImagePath(
            "/images/{{siteId}}/karriere/bewerbung-und-erstkontakt.webp"
          ),
          alt: "Bewerbung und Erstkontakt Icon",
          width: 40,
          height: 40,
        },
      },
      {
        step: "2",
        title: "Fachgespräch",
        description:
          "Du lernst Deinen Lead kennen und erhältst mehr zu Deiner Stelle und den Verantwortlichkeiten.",
        icon: {
          src: getImagePath("/images/{{siteId}}/karriere/fachgesprach.webp"),
          alt: "Fachgespräch Icon",
          width: 40,
          height: 40,
        },
      },
      {
        step: "3",
        title: "Challenge",
        description:
          "Du bekommst von uns eine Challenge, die Du Zuhause bearbeitest und uns im Anschluss vorstellst.",
        icon: {
          src: getImagePath("/images/{{siteId}}/karriere/challenge.webp"),
          alt: "Challenge Icon",
          width: 40,
          height: 40,
        },
      },
      {
        step: "4",
        title: "Gründer- und Team-Kennenlernen",
        description:
          "Du lernst erst einen unserer Co-Founder und danach einige Mitglieder unseres Teams kennen.",
        icon: {
          src: getImagePath(
            "/images/{{siteId}}/karriere/grunder- und-team-kennenlernen.webp"
          ),
          alt: "Team-Kennenlernen Icon",
          width: 40,
          height: 40,
        },
      },
      {
        step: "5",
        title: "Willkommen im Team!",
        description:
          "Wir machen Dir ein Angebot und Du startest bei uns. Das Team freut sich schon auf Dich!",
        icon: {
          src: getImagePath(
            "/images/{{siteId}}/karriere/willkommen-im-team.webp"
          ),
          alt: "Willkommen Icon",
          width: 40,
          height: 40,
        },
      },
    ],
    contactPerson: {
      name: "Kolja Czudnochowski",
      email: "personal@gutachten.org",
      image: {
        src: getImagePath(
          "/images/{{siteId}}/karriere/kolja-czudnochowski.webp"
        ),
        alt: "Kolja Czudnochowski Portrait",
        width: 400,
        height: 400,
      },
      linkedinUrl: "https://www.linkedin.com/company/gutachten-org/",
      linkedinImage: {
        src: getImagePath("/images/{{siteId}}/karriere/linkedin.webp"),
        alt: "LinkedIn",
        width: 200,
        height: 200,
        className: "h-10 w-20 object-contain grayscale opacity-50",
      },
      joinUrl: "https://join.com/companies/evalionnet",
      joinImage: {
        src: getImagePath("/images/{{siteId}}/karriere/join.webp"),
        alt: "Join",
        width: 200,
        height: 200,
        className: "h-10 w-20 object-contain opacity-50",
      },
    },
    backgroundColor: "bg-white",
    contactSectionClassName: "md:mt-46 mt-20",
    className: "pt-0!",
    containerClassName: "container-gutachten lg:overflow-hidden",
  }),
  createComponent<CardLayoutComponent>({
    type: "CardLayout",
    id: "wie-wir-arbeiten",
    variant: "feature",
    title: "Wie wir arbeiten",
    subtitle:
      "Bei Gutachten.org & Evalion triffst du auf viel Freiheit, echte Verantwortung und den Anspruch,\neine veraltete Branche grundlegend zu verändern.",
    columns: 2,
    cards: [
      {
        title: "Freiheit & Ownership",
        description:
          "Bei uns bekommst du echte Gestaltungsfreiheit statt Mikromanagement. Du übernimmst Verantwortung für eigene Themen, triffst Entscheidungen nah am Kunden und wirst daran gemessen, welche Wirkung du erzielst, nicht daran, wie voll dein Kalender ist.",
        iconImage: getImagePath("/images/{{siteId}}/karriere/key.webp"),
      },
      {
        title: "Sinn & Purpose",
        description:
          "Wir sorgen dafür, dass Menschen und Unternehmen bessere Entscheidungen rund um Immobilien treffen können. Deine Arbeit beeinflusst reale Vermögen, Investments und Lebenssituationen - du baust nichts Abstraktes, sondern etwas, das jeden Tag konkret gebraucht wird.",
        iconImage: getImagePath("/images/{{siteId}}/karriere/goal.webp"),
      },
      {
        title: "Kundennutzen im Fokus",
        description:
          "Wir denken immer vom Problem unserer Kund:innen aus. Wenn ein Gutachten keinen Mehrwert bringt, sagen wir das auch. Wir entwickeln Lösungen, die Prozesse vereinfachen, Risiko reduzieren und unseren Kund:innen helfen, ihre Ziele mit Immobilien schneller und sicherer zu erreichen.",
        iconImage: getImagePath("/images/{{siteId}}/karriere/healthcare.webp"),
      },
      {
        title: "Transparenz & Ehrlichkeit",
        description:
          "Wir reden Klartext - intern im Team und mit unseren Kund:innen. Zahlen, Entscheidungen und Fehler sprechen wir offen an, Politik und Fassaden interessieren uns nicht. So entsteht Vertrauen, und du weißt immer, woran du bist und wofür du arbeitest.",
        iconImage: getImagePath(
          "/images/{{siteId}}/karriere/online-support.webp"
        ),
      },
    ],
    maxWidth: "6xl",
    textAlign: "center",
    enableAnimation: true,
    animationDelay: 0.15,
    gridClassName: "gap-8!",
    cardClassName: "shadow-none hover:shadow-none border-none p-0",
    cardIconClassName: "h-8 md:h-12",
    cardTitleClassName:
      "text-lg font-bold text-foreground md:text-xl text-[#4F5A60]",
    cardDescriptionClassName: "text-base text-[#4F5A60]",
    titleClassName: "text-3xl font-semibold text-foreground md:text-[40px]",
    titleContainerClassName: "mb-16",
    containerClassName: "!py-0 container-gutachten",
    subtitleClassName:
      "text-xl text-mutedForeground whitespace-pre-line text-left",
  }),
  createComponent<BaresGeldSparenSectionComponent>({
    type: "BaresGeldSparenSection",
    id: "team-section",
    variant: "imagecard-shadow",
    title: "Wir freuen uns darauf, dich kennenzulernen!",
    eyebrow: "team",
    bulletItems: [],
    highlightClassName: "text-[#FC7019] font-bold",
    cards: [
      {
        title: "Kolja Czudnochowski",
        description: "Geschäftsführer",
        iconImage: getImagePath("/images/{{siteId}}/karriere/kolja.webp"),
        iconImageAlt: "Kolja Czudnochowski",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
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
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
    ],
    cards2: [
      {
        title: "Anna Liebhaber",
        description: "Interims Head of People",
        iconImage: getImagePath(
          "/images/{{siteId}}/karriere/anna-liebhaber.webp"
        ),
        iconImageAlt: "Anna Liebhaber",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Carolin Aust",
        description: "Sachverständige",
        iconImage: getImagePath(
          "/images/{{siteId}}/karriere/carolin-aust.webp"
        ),
        iconImageAlt: "Carolin Aust",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
      {
        title: "Felix Holfert",
        description: "Immobiliengutachter & Koordinator Sachverständige",
        iconImage: getImagePath(
          "/images/{{siteId}}/angebot/felix-holfert.webp"
        ),
        iconImageAlt: "Felix Holfert",
        className:
          "border-solid border-t border-b border-r-0 border-l-0 md:border-l md:border-r md:border-t-0 md:border-b-0 border-[rgba(39,50,56,0.10)]",
      },
    ],
    eyebrowClassName: "text-[#D35F17]",
    contentGridClassName: "grid-cols-1! gap-0!",
    cardsGridClassName: "md:mt-16 mt-8",
    headerContainerClassName: "m-0!",
    className: "md:py-[83px] py-[40px]",
    cardDescriptionClassName: "text-[13px]",
    containerClassName: "container-gutachten",
  }),
]);

export default karriereContent;
