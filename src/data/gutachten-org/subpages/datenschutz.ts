import type {
  DatenschutzComponent,
  HeroComponent,
  StructuredDataComponent,
  SubpageContent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath, getAbsoluteImageUrl } from "@/lib/site-config-helper";

// Get template variables for this site
const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Datenschutz Gutachten.org",
  description:
    "Hier finden Sie die Datenschutzerklärung von Gutachten.org: Alle Infos zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/datenschutz/",
  openGraph: {
    title: "Datenschutz Gutachten.org",
    description:
      "Hier finden Sie die Datenschutzerklärung von Gutachten.org: Alle Infos zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/datenschutz/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Datenschutz Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Datenschutz Gutachten.org",
    description:
      "Hier finden Sie die Datenschutzerklärung von Gutachten.org: Alle Infos zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "Datenschutz Gutachten.org",
      },
    ],
  },
};

// Define the Datenschutz content
const datenschutzContent: SubpageContent = validateContent([
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
          name: "Datenschutz",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-article-datenschutz",
    schemaType: "article",
    data: {
      headline: `Datenschutzerklärung - ${templateVariables.siteName}`,
      description:
        "Informationen zum Datenschutz und zur Verarbeitung Ihrer personenbezogenen Daten bei Evalion GmbH.",
      author: {
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
      },
      publisher: {
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
        logo: {
          url: getImagePath("/images/{{siteId}}/logo/gutachten-org.webp"),
          width: 200,
          height: 60,
        },
      },
      datePublished: new Date().toISOString().split("T")[0],
      dateModified: new Date().toISOString().split("T")[0],
      url: `${templateVariables.siteUrl}/datenschutz/`,
    },
  }),

  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-datenschutz",
    layout: "document",
    h1Text: "Datenschutzerklärung",
    sectionTextClassName: "m-auto! max-w-4xl! ",
    titleClassName: "text-start! m-0!",
  }),

  createComponent<DatenschutzComponent>({
    type: "Datenschutz",
    id: "datenschutz-content",
    variant: "minimal",
    title: "",
    description:
      "Mit den folgenden Informationen möchten wir Ihnen einen Überblick über die Verarbeitung Ihrer personenbezogenen Daten durch uns und Ihre Rechte aus dem Datenschutzrecht geben.\n\nPersonenbezogene Daten werden nur dann verarbeitet, wenn dies zur Durchführung vorvertraglicher Maßnahmen oder eines Vertrags erforderlich ist, der Betroffene eingewilligt hat, oder die EU-Datenschutzgrundverordnung (DSGVO) oder ein anderes Gesetz die Verarbeitung erlaubt oder vorschreibt.",
    headingClassName: "text-2xl",
    minimalSections: [
      {
        heading: "1. Verantwortlicher",
        subsections: [
          {
            content: "**Evalion GmbH**, Brunnenstr. 178, 10119 Berlin",
          },
          {
            content:
              "Vertreten durch den Geschäftsführer: Kolja Czudnochowski, Gerrit J. Kolweyh",
          },
          {
            content: "Telefon: +49 30 754 364 81",
          },
          {
            content: "E-Mail: support@gutachten.org",
          },
          {
            content:
              'Die Evalion GmbH (nachfolgend „Evalion", „wir" oder „uns") ist eine Gesellschaft mit beschränkter Haftung mit Sitz in Berlin, eingetragen im Handelsregister des Amtsgerichts Berlin unter HRB 293235.',
          },
        ],
      },
      {
        heading: "2. Zwecke und Rechtsgrundlagen der Datenverarbeitung",
        subsections: [
          {
            content:
              "**2.1. Besuch unserer Website**\n\nBeim Aufrufen unserer Website www.gutachten.org werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert:\n\n• IP-Adresse des anfragenden Rechners\n• Datum und Uhrzeit des Zugriffs\n• Name und URL der abgerufenen Datei\n• Website, von der aus der Zugriff erfolgt (Referrer-URL)\n• verwendeter Browser, Betriebssystem und Name des Access-Providers\n\n**Zwecke:**\n\n• Gewährleistung eines reibungslosen Verbindungsaufbaus\n• Gewährleistung einer komfortablen Nutzung unserer Website\n• Auswertung der Systemsicherheit und -stabilität\n• weitere administrative Zwecke\n\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).",
          },
          {
            content:
              "**2.2. Kostenlose Ersteinschätzung**\n\nWenn Sie über unsere Website eine **kostenlose Ersteinschätzung** anfordern, verarbeiten wir die von Ihnen angegebenen personenbezogenen Daten (z. B. Name, Kontaktdaten, objektspezifische Informationen wie Adressen oder Gebäudedaten), um Ihre Anfrage zu bearbeiten und Ihnen die Einschätzung bereitzustellen.\n\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahme).",
          },
          {
            content:
              "**2.3. Kostenpflichtige Gutachten**\n\nWenn Sie über unsere Website ein **Gutachten oder Dokument beauftragen**, verarbeiten wir die von Ihnen angegebenen personenbezogenen Daten sowie objektspezifische Informationen, um den Vertrag zu erfüllen.\n\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).",
          },
          {
            content:
              "**2.4. Weitergabe an externe Partner**\n\nZur ordnungsgemäßen Bearbeitung Ihres Auftrags geben wir Daten an externe Dienstleister (z. B. Gutachtenbüros, Behörden oder Datenanbieter) weiter, soweit dies zur Erstellung des Gutachtens notwendig ist.\n\nEine darüber hinausgehende Weitergabe erfolgt nicht, es sei denn, sie ist gesetzlich vorgeschrieben oder Sie haben ausdrücklich eingewilligt.\n\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).",
          },
          {
            content:
              "**2.5. E-Mail-Kommunikation & Direktwerbung**\n\nWir nutzen Ihre E-Mail-Adresse zur Abwicklung Ihrer Anfrage (z. B. Bestätigung, Zustellung der Ersteinschätzung, Rückfragen).\n\nDarüber hinaus können wir Sie per E-Mail auf ähnliche Leistungen hinweisen (z. B. Erinnerung an die Möglichkeit, ein vollständiges Gutachten zu beauftragen), sofern Sie dem nicht widersprochen haben.\n\n**Rechtsgrundlagen:**\n\n• Art. 6 Abs. 1 lit. b DSGVO (Kommunikation zur Erfüllung der Anfrage)\n• § 7 Abs. 3 UWG (Direktwerbung für eigene ähnliche Leistungen gegenüber Bestandskunden)\n• Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), sofern Sie optional den Erhalt weiterer Angebote ausdrücklich bestätigen\n\nSie können dem Erhalt von Direktwerbung jederzeit widersprechen.",
          },
          {
            content:
              "**2.6. Cookies und Tracking-Tools**\n\n**Cookies**\n\nWir setzen Cookies ein, um unsere Website nutzerfreundlicher zu machen. Details hierzu finden Sie in unserer Cookie-Richtlinie.\n\n**Analyse-Tools**\n\nWir nutzen u. a. Google Analytics, Hotjar und Microsoft Clarity zur Analyse des Nutzerverhaltens. Diese Dienste verwenden Cookies und ähnliche Technologien. Eine Verarbeitung erfolgt nur mit Ihrer Einwilligung.\n\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).",
          },
        ],
      },
      {
        heading: "3. Speicherdauer",
        subsections: [
          {
            content:
              "Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.\n\nNach Wegfall des Verarbeitungszwecks oder Ablauf gesetzlicher Fristen werden die Daten gelöscht.",
          },
        ],
      },
      {
        heading: "4. Ihre Rechte",
        subsections: [
          {
            content:
              "Sie haben nach der DSGVO insbesondere das Recht:\n\n• Auskunft zu verlangen (Art. 15 DSGVO)\n• Daten berichtigen oder löschen zu lassen (Art. 16, 17 DSGVO)\n• die Verarbeitung einzuschränken (Art. 18 DSGVO)\n• Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)\n• der Datenverarbeitung zu widersprechen (Art. 21 DSGVO)\n• eine erteilte Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO)",
          },
        ],
      },
      {
        heading: "5. Datensicherheit",
        subsections: [
          {
            content:
              "Wir verwenden SSL-Verschlüsselung sowie geeignete technische und organisatorische Maßnahmen, um Ihre Daten gegen Manipulation, Verlust oder unbefugten Zugriff zu schützen.",
          },
        ],
      },
      {
        heading: "6. Datenschutzbeauftragter",
        subsections: [
          {
            content:
              "Sofern Sie Fragen zum Datenschutz haben, wenden Sie sich bitte an:\n\nE-Mail: datenschutz@gutachten.org\n\nEin Datenschutzbeauftragter ist derzeit nicht bestellt, da die gesetzlichen Voraussetzungen hierfür nicht erfüllt sind.",
          },
        ],
      },
      {
        heading: "7. Aktualisierung dieser Datenschutzerklärung",
        subsections: [
          {
            content: "Diese Datenschutzerklärung hat den Stand September 2026.",
          },
        ],
      },
    ],
  }),
]);

export default datenschutzContent;
