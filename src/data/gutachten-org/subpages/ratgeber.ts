import {
  createComponent,
  validateContent,
  type RatgeberComponent,
  type CtaComponent,
  type HeroComponent,
  type LeadFormComponent,
  type StructuredDataComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { getImagePath, getAbsoluteImageUrl, getOrganizationStructuredData, getTemplateVariables } from "@/lib/site-config-helper";

const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Ratgeber rund um Immobiliengutachten",
  description:
    "Der große Immobilien-Ratgeber: Alles zu Gutachten, Bewertung, Steuern & Eigentum. Jetzt informieren und fundierte Entscheidungen treffen.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/ratgeber/",
  openGraph: {
    title: "Ratgeber rund um Immobiliengutachten",
    description:
      "Der große Immobilien-Ratgeber: Alles zu Gutachten, Bewertung, Steuern & Eigentum. Jetzt informieren und fundierte Entscheidungen treffen.",
    url: templateVariables.siteUrl + "/ratgeber/",
    siteName: "Gutachten.org",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Ratgeber rund um Immobiliengutachten",
      },
    ],
    locale: "de_DE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ratgeber rund um Immobiliengutachten",
    description:
      "Der große Immobilien-Ratgeber: Alles zu Gutachten, Bewertung, Steuern & Eigentum. Jetzt informieren und fundierte Entscheidungen treffen.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 574,
        height: 234,
        alt: "Ratgeber rund um Immobiliengutachten",
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
          name: "Ratgeber",
          // Last item doesn't need item field
        },
      ],
    },
  }),
  // Organization structured data for Ratgeber
  getOrganizationStructuredData(),
  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-ratgeber",
    h1Text: "Ratgeber rund um Immobiliengutachten",
    subtitle:
      "Entdecken Sie hilfreiche Artikel und Ratgeber zu Immobiliengutachten, Nutzungsdauer, Steueroptimierung und mehr. Profitieren Sie von unserem Expertenwissen.",
    layout: "minimal",
    icon: "BookText",
    customBackgroundClass: "bg-white",
    iconClassName: "bg-[#FF914C]",
    titleClassName: "mt-0",
  }),
  // createComponent<TopArticleComponent>({
  //   type: "TopArticle",
  //   heading: "Top-Artikel",
  //   authorName: "Isaac Newton",
  //   publishDate: "11. Januar 2022",
  //   title:
  //     "Blog title heading will go here lorem ipsum dolor sit\namet, consectetur adipiscing elit. Ut et massa mi.",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
  //   ctaText: "Mehr lesen",
  //   ctaLink: "#",
  //   baseImage: getImagePath("/images/{{siteId}}/ratgeber/bg-empty.png"),
  //   baseImageAlt: "Base background image",
  //   titleClassName: "whitespace-pre-line",
  // }),
  createComponent<RatgeberComponent>({
    type: "Ratgeber",
    id: "ratgeber-top-article",
    title: "Top-Artikel",
    showTitle: true,
    variant: "top-article",
    imageContainerClassName: "w-full object-cover",
    authorImage: getImagePath(
      "/images/{{siteId}}/articles/authors/gerrit-kolweyh.webp"
    ),
    authorImageAlt: "Gerrit Kolweyh",
    authorName: "Gerrit Kolweyh",
    buttonClassName: "px-4.5!",
  }),
  createComponent<RatgeberComponent>({
    type: "Ratgeber",
    id: "ratgeber-blog-cards",
    variant: "blog-card",
    title: "Ratgeber: Immobilien & Wohnen in Hannover",
    showTitle: false,
    subtitle: "Praktische Tipps und Anleitungen",
    description:
      "Entdecken Sie hilfreiche Artikel rund um Wohnungssuche, Mietpreise, Kauf und Verkauf in Hannover. Profitieren Sie von unserem Expertenwissen.",
    showFeatured: false,
    showAllArticles: true,
    articlesPerRow: 3,
    headingLevel: 2,
    featuredLabel: "Empfohlener Artikel",
    allArticlesLabel: "Neueste Artikel",
    readMoreText: "Mehr lesen",
    enablePagination: true,
    articlesPerPage: 3,
    containerClassName: "container-gutachten mx-auto px-4",
    cardClassName: "pt-0",
    className: " !p-0",
    buttonClassName: "w-full!",
  }),
  createComponent<LeadFormComponent>({
    type: "LeadForm",
    id: "lead-form-ratgeber",
    title: "Sie haben Fragen?",
    subtitle: "Wir haben Antworten.",
    variant: "image-form",
    imageSrc: getImagePath("/images/{{siteId}}/ratgeber/felix-holfert.webp"),
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
    className: "mb-0 pb-16 pt-12",
    containerClassName: "container-gutachten",
    privacyCheckboxClassName: "data-[state=checked]:bg-slate-900!",
    successTitle: "Anfrage erfolgreich übermittelt!",
    successMessage:
      "Vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.",
    successIcon: "✓",
    resetButtonText: "Weitere Anfrage senden",
    toastSuccessTitle: "Erfolgreich!",
    toastSuccessDescription:
      "Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  }),
]);
