/**
 * Programmatic Home Page
 *
 * This file demonstrates the composition pattern for programmatic content.
 * Instead of duplicating the entire page, we import the base content and
 * only override specific parts that need to be different for programmatic pages.
 *
 * Benefits:
 * - No duplication of content
 * - Easy maintenance - update base, all variations update
 * - Clear separation of what's different
 * - Can reference originalConfig properties
 */

import originalConfig from "../home";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { overrideComponentByIdDeep } from "@/lib/programmatic-helper";
import { getAbsoluteImageUrl, getImagePath } from "@/lib/site-config-helper";
import { MapPin, Shield, Globe, FileCheck } from "lucide-react";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Digitale Immobiliengutachten online beantragen",
  description:
    "Immobilien-Gutachten online beantragen: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung & Energieausweis - zertifizierte Sachverständige.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/",
  openGraph: {
    title: "Digitale Immobiliengutachten online beantragen",
    description:
      "Immobilien-Gutachten online beantragen: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung & Energieausweis - zertifizierte Sachverständige.",
    url: templateVariables.siteUrl + "/",
    siteName: "Gutachten.org",
    images: [
      {
        url: getAbsoluteImageUrl("/images/gutachten-org/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Gutachten.org Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitale Immobiliengutachten online beantragen",
    description:
      "Immobilien-Gutachten online beantragen: Restnutzungsdauer, Verkehrswert, Kaufpreisaufteilung & Energieausweis - zertifizierte Sachverständige.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/gutachten-org/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Gutachten.org Logo",
      },
    ],
  },
};

// Replace "Hannover" with {{programmaticInstanceName}} in all relevant components
// Using deep merge to handle nested properties

let programmaticHome = originalConfig;

// Structured Data - Organization
programmaticHome = overrideComponentByIdDeep(
  programmaticHome,
  "structured-data-organization",
  {
    data: {
      name: "Immobilienmakler {{programmaticInstanceName}}",
      alternateName: "Immobilienmakler {{programmaticInstanceName}}",
      description:
        "Professioneller Immobilienmakler in {{programmaticInstanceName}}. Vermittlung von Immobilien, Verkauf, Vermietung, Wertermittlung und Immobilienberatung mit lokaler Expertise und transparenten Kosten.",
      mission:
        "Immobilieneigentümern und -suchenden in {{programmaticInstanceName}} durch professionelle Vermittlung und Beratung zu maximalen Erfolgen verhelfen.",
    },
  }
);

// Structured Data - Website
programmaticHome = overrideComponentByIdDeep(
  programmaticHome,
  "structured-data-website",
  {
    data: {
      name: "Immobilienmakler {{programmaticInstanceName}} - Professionelle Immobilienvermittlung",
      description:
        "Professioneller Immobilienmakler in {{programmaticInstanceName}}. Vermittlung von Immobilien, Verkauf, Vermietung, Wertermittlung und Beratung mit lokaler Expertise.",
      publisher: {
        name: "Immobilienmakler {{programmaticInstanceName}}",
      },
    },
  }
);

// Hero Section
programmaticHome = overrideComponentByIdDeep(programmaticHome, "hero-main", {
  h1Text:
    "Immobilienmakler {{programmaticInstanceName}} – Professionelle\nVermittlung für Ihre Immobilie",
  subtitle:
    "Maximaler Erfolg bei Verkauf und Vermietung – wir vermitteln Ihre\nImmobilie professionell und erfolgreich in {{programmaticInstanceName}}.",
  image: {
    alt: "Professioneller Immobilienmakler in {{programmaticInstanceName}}",
  },
});

// USPs Section
programmaticHome = overrideComponentByIdDeep(programmaticHome, "usps-section", {
  subtitle:
    "Ihr verlässlicher Partner für professionelle Immobilienvermittlung in {{programmaticInstanceName}}",
  usps: [
    {
      icon: MapPin,
      title: "Lokale Marktkenntnis",
      description:
        "Tiefgreifende Marktkenntnis in {{programmaticInstanceName}} und Region – wir kennen die lokalen Besonderheiten, Preise und Trends des Immobilienmarkts.",
    },
    {
      icon: Shield,
      title: "Professionelle Vermittlung",
      description:
        "Von der Wertermittlung über die Vermarktung bis zur Vertragsabwicklung – wir begleiten Sie durch den gesamten Prozess.",
    },
    {
      icon: Globe,
      title: "Moderne Vermarktung",
      description:
        "Hochwertige Exposés, professionelle Fotos, 3D-Rundgänge und Vermarktung auf allen relevanten Portalen für maximale Sichtbarkeit.",
    },
    {
      icon: FileCheck,
      title: "Rechtssichere Abwicklung",
      description:
        "Einhaltung aller rechtlichen Vorschriften, professionelle Vertragsgestaltung und Begleitung bis zum Notartermin.",
    },
  ],
});

// About Section
programmaticHome = overrideComponentByIdDeep(
  programmaticHome,
  "about-section",
  {
    subtitle:
      "Wir verbinden lokale Marktkenntnis mit moderner Vermarktung – für schnelle, erfolgreiche Immobilientransaktionen in {{programmaticInstanceName}} und Umgebung.",
    description: [
      "Als etablierter Immobilienmakler im {{programmaticInstanceName}}er Immobilienmarkt kombinieren wir jahrelange Erfahrung mit modernsten digitalen Tools. Ob Verkauf, Vermietung oder Wertermittlung – wir bieten Ihnen professionelle Dienstleistungen aus einer Hand.",
      "Unser Team kennt den lokalen Markt genau und weiß, worauf es ankommt. Persönliche Betreuung, transparente Kommunikation und messbare Erfolge sind unsere Grundprinzipien.",
    ],
  }
);

// References Section - replace location in author names
programmaticHome = overrideComponentByIdDeep(
  programmaticHome,
  "references-section",
  {
    references: [
      {
        title: "Schneller Verkauf",
        image: {
          src: getImagePath("/images/{{siteId}}/home/schneller-verkauf.webp"),
          alt: "Illustration eines erfolgreichen und schnellen Immobilienverkaufs",
        },
        kpis: [
          "Verkauft in 28 Tagen",
          "+8% über Angebotspreis",
          "12 qualifizierte Anfragen",
        ],
        quote:
          "Die Zusammenarbeit mit Immoverde war professionell und unkompliziert. Unser Haus war schneller verkauft als erwartet!",
        author: "Familie Weber, {{programmaticInstanceName}}-Linden",
        rating: 5,
      },
      {
        title: "Erfolgreiche Vermietung",
        image: {
          src: getImagePath(
            "/images/{{siteId}}/home/erfolgreiche-vermietung.webp"
          ),
          alt: "Schlüssel-Illustration für eine erfolgreiche Immobilienvermietung",
        },
        kpis: [
          "Vermietet in 14 Tagen",
          "100% Marktpreis",
          "Bonitätsprüfung inklusive",
        ],
        quote:
          "Dank der guten Betreuung und Interessentenauswahl haben wir zuverlässige Mieter gefunden. Sehr empfehlenswert!",
        author: "Herr Schneider, {{programmaticInstanceName}}-Südstadt",
        rating: 5,
      },
      {
        title: "Professionelle Beratung",
        image: {
          src: getImagePath(
            "/images/{{siteId}}/home/professionelle-beratung.webp"
          ),
          alt: "Grafische Darstellung für eine professionelle Immobilienberatung",
        },
        kpis: [
          "> 500 vermittelte Objekte",
          "Ø Verkaufszeit 35 Tage",
          "Erfolgsquote 95%",
        ],
        quote:
          "Die Beratung war sehr kompetent und die Vermittlung unseres Hauses verlief reibungslos. Wir können den Makler nur weiterempfehlen!",
        author: "Familie Müller, {{programmaticInstanceName}}-Kirchrode",
        rating: 5,
      },
    ],
  }
);

// Lead Form - update email subject, emailTags, and placeholder
// Note: For nested array structures like sections, we need to provide the complete structure
programmaticHome = overrideComponentByIdDeep(
  programmaticHome,
  "lead-form-bewertung",
  {
    emailSubject:
      "Neue Immobilienwertermittlungsanfrage von {name} - Immobilienmakler {{programmaticInstanceName}}",
    emailTags: [
      { name: "source", value: "immobilien-wertermittlung-form" },
      {
        name: "website",
        value: "immobilienmakler-{{programmaticInstanceName}}",
      },
    ],
    sections: [
      {
        fields: [
          {
            id: "propertyType",
            name: "propertyType",
            placeholder: "Bitte wählen",
            label: "Objektart",
            type: "select",
            required: true,
            gridColumns: 2,
            options: [
              { value: "house", label: "Einfamilienhaus" },
              { value: "apartment", label: "Eigentumswohnung" },
              { value: "multi", label: "Mehrfamilienhaus" },
              { value: "land", label: "Grundstück" },
              { value: "commercial", label: "Gewerbe" },
            ],
          },
          {
            id: "zipCode",
            name: "zipCode",
            placeholder: "z.B. 30159 {{programmaticInstanceName}}",
            label: "PLZ / Ort",
            type: "text",
            required: true,
            gridColumns: 2,
          },
          {
            id: "area",
            name: "area",
            placeholder: "z.B. 120",
            label: "Wohnfläche (m²)",
            type: "number",
            required: true,
            gridColumns: 3,
            breakRow: true,
          },
          {
            id: "rooms",
            name: "rooms",
            placeholder: "z.B. 4",
            label: "Zimmer",
            type: "number",
            required: true,
            gridColumns: 3,
          },
          {
            id: "yearBuilt",
            name: "yearBuilt",
            placeholder: "z.B. 1995",
            label: "Baujahr",
            type: "number",
            required: false,
            gridColumns: 3,
          },
          {
            id: "condition",
            name: "condition",
            placeholder: "Bitte wählen",
            label: "Zustand",
            type: "select",
            required: true,
            gridColumns: 2,
            breakRow: true,
            gridSpan: 2,
            options: [
              { value: "new", label: "Neuwertig" },
              { value: "renovated", label: "Saniert" },
              { value: "good", label: "Gepflegt" },
              { value: "moderate", label: "Modernisierungsbedarf" },
              { value: "renovation", label: "Sanierungsbedürftig" },
            ],
          },
        ],
      },
      {
        title: "Ihre Kontaktdaten",
        fields: [
          {
            id: "name",
            name: "name",
            placeholder: "Vor- und Nachname",
            label: "Name",
            type: "text",
            required: true,
            gridColumns: 2,
          },
          {
            id: "email",
            name: "email",
            placeholder: "ihre@email.de",
            label: "E-Mail",
            type: "email",
            required: true,
            gridColumns: 2,
          },
          {
            id: "phone",
            name: "phone",
            placeholder: "+49 511 1234567",
            label: "Telefon (optional)",
            type: "tel",
            required: false,
            gridColumns: 2,
            breakRow: true,
            gridSpan: 2,
          },
          {
            id: "phoneContact",
            name: "phoneContact",
            label: "Kontakt per Telefon gewünscht",
            type: "checkbox",
            breakRow: true,
          },
          {
            id: "privacy",
            name: "privacy",
            label:
              "Ich habe die Datenschutzbestimmungen gelesen und akzeptiere diese.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
  }
);

export default programmaticHome;

/**
 * Alternative approaches you could use:
 *
 * 1. Override multiple components by ID with deep merge:
 *
 * import { overrideComponentByIdDeep } from '@/lib/programmatic-helper';
 *
 * let config = originalConfig;
 * config = overrideComponentByIdDeep(config, 'hero-main', {
 *   h1Text: 'Immobilienmakler {{programmaticInstanceName}} – Professionelle Vermittlung',
 *   subtitle: '... in {{programmaticInstanceName}}'
 * });
 * config = overrideComponentByIdDeep(config, 'usps-section', {
 *   subtitle: '... in {{programmaticInstanceName}}'
 * });
 * export default config;
 *
 * 2. Override individual components one by one:
 *
 * import { overrideComponentById } from '@/lib/programmatic-helper';
 *
 * let config = originalConfig;
 * config = overrideComponentById(config, 'hero-main', {
 *   h1Text: 'Immobilienmakler {{programmaticInstanceName}} – Professionelle Vermittlung'
 * });
 * // ... more overrides
 * export default config;
 *
 * Note: Using mergeProgrammaticContent with overridesById is recommended because:
 * - All overrides in one place - easy to see what changes
 * - Clean and maintainable
 * - Supports deep merging for nested properties
 */
