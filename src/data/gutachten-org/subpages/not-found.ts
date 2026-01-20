import type {
  HeroComponent,
  CtaComponent,
  StructuredDataComponent,
  SubpageContent,
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
  title: "404 - Seite nicht gefunden | Gutachten.org",
  description:
    "Die angeforderte Seite konnte nicht gefunden werden. Zurück zur Startseite von Gutachten.org.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/404/",
  openGraph: {
    title: "404 - Seite nicht gefunden | Gutachten.org",
    description:
      "Die angeforderte Seite konnte nicht gefunden werden. Zurück zur Startseite von Gutachten.org.",
    url: templateVariables.siteUrl + "/404/",
    siteName: "Gutachten.org",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1200,
        height: 630,
        alt: "404 - Seite nicht gefunden",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "404 - Seite nicht gefunden | Gutachten.org",
    description:
      "Die angeforderte Seite konnte nicht gefunden werden. Zurück zur Startseite von Gutachten.org.",
    images: [
      {
        url: getAbsoluteImageUrl(
          "/images/{{siteId}}/og-image/gutachten-org-og.webp"
        ),
        width: 1200,
        height: 630,
        alt: "404 - Seite nicht gefunden",
      },
    ],
  },
};

const notFoundContent: SubpageContent = validateContent([
  // Organization structured data
  getOrganizationStructuredData(),

  // 404 Hero section - matching gutachten.org design
  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-404",
    h1Text: "404",
    titleHighlight: "Seite nicht gefunden",
    subtitle:
      "Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.",
    layout: "centered",
    icon: "AlertCircle",
    customBackgroundClass: "bg-[#F8FAFB]",
    titleClassName: "mt-0 text-6xl md:text-8xl font-bold text-foreground",
    subtitleClassName: "mb-8 text-lg text-muted-foreground text-center! mx-auto",
    containerClassName: "py-16 md:py-24",
  }),

  // CTA section to go back home - matching gutachten.org design
  createComponent<CtaComponent>({
    type: "Cta",
    id: "cta-404",
    title: "Zurück zur Startseite",
    description:
      "Kehren Sie zur Startseite zurück und erfahren Sie mehr über unsere Immobiliengutachten-Dienstleistungen.",
    button: {
      text: "Zur Startseite",
      href: "/",
    },
    variant: "default",
    textAlign: "center",
    className: "mb-0 pb-16 !px-4 bg-white",
    buttonClassName:
      "bg-[#243239] text-white hover:bg-[#243239]/90 rounded-[8px] h-12 px-6",
    padding: "lg",
  }),
]);

export default notFoundContent;
