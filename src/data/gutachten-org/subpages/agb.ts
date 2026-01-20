import type {
  DatenschutzComponent,
  HeroComponent,
  StructuredDataComponent,
  SubpageContent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath, getAbsoluteImageUrl } from "@/lib/site-config-helper";

const templateVariables = getTemplateVariables();

export const metadata: SubpageMetadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description:
    "AGB von Gutachten.org: Die Allgemeinen Geschäftsbedingungen für die Nutzung der Plattform zur Vermittlung von Immobiliengutachten.",
  authors: [{ name: "Gutachten.org" }],
  creator: "Gutachten.org",
  publisher: "Gutachten.org",
  canonical: templateVariables.siteUrl + "/agb/",
  openGraph: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    description:
      "AGB von Gutachten.org: Die Allgemeinen Geschäftsbedingungen für die Nutzung der Plattform zur Vermittlung von Immobiliengutachten.",
    siteName: "Gutachten.org",
    url: templateVariables.siteUrl + "/agb/",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "AGB - Gutachten.org",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    description:
      "AGB von Gutachten.org: Die Allgemeinen Geschäftsbedingungen für die Nutzung der Plattform zur Vermittlung von Immobiliengutachten.",
    images: [
      {
        url: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        width: 574,
        height: 234,
        alt: "AGB - Gutachten.org",
      },
    ],
  },
};

const agbContent: SubpageContent = validateContent([
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
          name: "AGB",
        },
      ],
    },
  }),
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-article-agb",
    schemaType: "article",
    data: {
      headline: `Allgemeine Geschäftsbedingungen - ${templateVariables.siteName}`,
      description:
        "Die Allgemeinen Geschäftsbedingungen der ImmoVerde Immobiliengesellschaft mbH regeln Maklerverträge, Provisionen, Haftung und rechtliche Grundlagen.",
        image: getAbsoluteImageUrl("/images/{{siteId}}/og-image/gutachten-org-og.webp"),
        author: {
          "@type": "Organization",
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
      datePublished: "2020-11-05",
      dateModified: new Date().toISOString().split("T")[0],
      url: `${templateVariables.siteUrl}/agb`,
    },
  }),

  createComponent<HeroComponent>({
    type: "Hero",
    id: "hero-agb",
    layout: "document",
    h1Text: "AGB",
    sectionTextClassName: "m-auto! max-w-4xl! ",
    titleClassName: "text-start! m-0!",
  }),
  createComponent<DatenschutzComponent>({
    type: "Datenschutz",
    id: "agb-content",
    variant: "minimal",
    title:
      "Allgemeine Geschäftsbedingungen (AGB) für die Nutzung der Software-Plattform Evalion",
    minimalSections: [
      {
        heading: "§1 Geltungsbereich",
        subsections: [
          {
            content:
              "1.1. Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Seite Gutachten.org und Plattform Evalion (nachfolgend „Plattform“), die von der Evalion GmbH, Brunnenstr. 178, 10119 Berlin (nachfolgend„Evalion“) betrieben wird.",
          },
          {
            content:
              "1.2. Mit der Registrierung und Nutzung der Plattform akzeptieren die Nutzer:innen diese AGB.",
          },
        ],
      },
      {
        heading: "§2 Leistungsbeschreibung",
        subsections: [
          {
            content:
              "2.1. Evalion bietet eine digitale Plattform an, über die Nutzer:innen verschiedene Gutachten und Dokumente im Bereich der Immobilienbewertung und -dokumentation beantragen und verwalten können.",
          },
          {
            content:
              "2.2. Evalion ist ausschließlich die technische Plattform und vermittelt zwischen den Nutzer:innen und einem Gutachtenbüro, das den jeweiligen Auftrag ausführt. Evalion selbst erbringt keine Gutachterleistungen und übernimmt keine Verantwortung für deren Inhalte, Qualität oder Korrektheit.",
          },
          {
            content:
              "2.3. Die Nutzung der Plattform ist kostenfrei. Kosten entstehen erst, wenn ein konkreter Auftrag an ein Gutachtenbüro erteilt wird. Die Rechnungsstellung und Abrechnung erfolgen direkt durch das jeweilige Gutachtenbüro, die Zahlungsabwicklung kann über die Plattform erfolgen.",
          },
        ],
      },
      {
        heading: "§3 Vertragsschluss",
        subsections: [
          {
            content:
              "3.1. Der Vertrag über die Erbringung von Gutachter- oder Dokumentenleistungen kommt direkt zwischen dem/der Nutzer:in und dem beauftragten Gutachtenbüro zustande. Evalion handelt dabei ausschließlich als Plattformbetreiber und technischer Vermittler, ohne selbst Vertragspartner zu werden.",
          },
          {
            content:
              "3.2. Die Annahme eines Auftrags durch das Gutachtenbüro erfolgt über die Plattform. Evalion bestätigt den Eingang des Auftrags gegenüber dem/der Nutzer:in, dies stellt jedoch keine Annahme des Auftrags dar. Es liegt im alleinigen Ermessen des Gutachtenbüros, ob es einen Auftrag annimmt oder ablehnt. Eine Verpflichtung zur Auftragsannahme besteht nicht.",
          },
        ],
      },
      {
        heading: "§4 Angaben der Nutzer:innen",
        subsections: [
          {
            content:
              "4.1. Die Nutzer:innen sind dafür verantwortlich, dass alle von ihnen im Rahmen der Auftragserteilung gemachten Angaben vollständig, wahrheitsgemäß und korrekt sind",
          },
          {
            content:
              "4.3. Evalion ist nicht verpflichtet, die Angaben derNutzer:innen auf Richtigkeit oder Vollständigkeit zu prüfen.",
          },
          {
            content:
              "4.3. Die Nutzer:innen haften allein für Schäden oder Verzögerungen, die durch unrichtige, unvollständige oder unklare Angaben entstehen.",
          },
        ],
      },
      {
        heading: "§5 Abrechnung und Zahlung",
        subsections: [
          {
            content:
              "5.1. Die Rechnungsstellung erfolgt durch das beauftragte Gutachtenbüro. Die Zahlungsabwicklung kann über die Plattform erfolgen, wobei Evalion ausschließlich als technischer Dienstleister agiert. Die Zahlungsabwicklung selbst erfolgt über externe Zahlungsanbieter (z. B. Stripe). Evalion übernimmt jedoch keine Haftung für Zahlungsverpflichtungen zwischen den Vertragsparteien.",
          },
          {
            content:
              "5.2. Alle Preise werden auf der Plattform klar ausgewiesen und beinhalten die gesetzliche Mehrwertsteuer, wenn dies so angegeben ist.",
          },
          {
            content:
              "5.3. Der/die Nutzer:in ist verpflichtet, die ausgewiesenen Beträge fristgerecht zu zahlen.",
          },
        ],
      },
      {
        heading: "§6 Haftung von Evalion",
        subsections: [
          {
            content:
              "6.1. Evalion haftet ausschließlich für Schäden, die durch vorsätzliches oder grob fahrlässiges Verhalten seiner gesetzlichen Vertreter:innen oder Erfüllungsgehilfen verursacht wurden.",
          },
          {
            content:
              "6.2. Für einfache Fahrlässigkeit haftet Evalion nur bei derVerletzung wesentlicher Vertragspflichten (Kardinalpflichten), jedoch beschränkt auf den vertragstypischen und vorhersehbaren Schaden. Eine Haftung für entgangenen Gewinn, Datenverluste oder sonstige mittelbare Schäden ist ausgeschlossen.",
          },
          {
            content:
              "6.3. Evalion haftet nicht für die Inhalte, Qualität, Korrektheit, Vollständigkeit oder Termintreue der erstellten Gutachten oder Dokumente. Die Verantwortung hierfür liegt ausschließlich beim jeweiligen Gutachtenbüro.",
          },
          {
            content:
              "6.4. Evalion haftet nicht für Schäden, die durch unrichtige oder unvollständige Angaben der Nutzer:innen entstehen.",
          },
          {
            content:
              "6.5. Evalion übernimmt keine Haftung für die ständige Verfügbarkeit der Plattform. Eine temporäre Nichterreichbarkeit der Plattform begründet keinen Anspruch auf Schadensersatz.",
          },
          {
            content:
              "6.6. Die Haftung für leicht fahrlässige Pflichtverletzungen, soweit nicht in Ziffer 6.2 geregelt, ist ausgeschlossen.",
          },
        ],
      },
      {
        heading: "§7 Pflichten der Nutzer:innen",
        subsections: [
          {
            content:
              "7.1. Die Nutzer:innen sind verpflichtet, bei der Registrierung und Auftragserteilung vollständige und wahrheitsgemäße Angaben zumachen.",
          },
          {
            content:
              "7.2. Die Nutzer:innen sind insbesondere verpflichtet, korrekte und wahrheitsgemäße Angaben zu den Objekten zu machen, für die Leistungen beauftragt werden. Falschangaben, insbesondere bewusst falsche Angaben, sind untersagt.",
          },
          {
            content:
              "7.3. Die Plattform darf nur im Rahmen der geltenden Gesetze genutzt werden. Ein Missbrauch der Plattform ist untersagt.",
          },
        ],
      },
      {
        heading: "§8 Widerrufsrecht",
        subsections: [
          {
            content:
              "8.1. Sofern der/die Nutzer:in Verbraucher:in im Sinne des §13 BGB ist, steht ihm/ihr ein gesetzliches Widerrufsrecht zu.",
          },
          {
            content:
              "8.2. Ein Widerrufsrecht entfällt, wenn das beauftragte Gutachtenbüro die Leistung vollständig erbracht hat und der/die Nutzer:in dies ausdrücklich vor Beginn der Leistungserbringung bestätigt hat.",
          },
        ],
      },
      {
        heading: "§9 Datenschutz",
        subsections: [
          {
            content:
              "Evalion verarbeitet personenbezogene Daten gemäß der Datenschutz-Grundverordnung (DSGVO). Näheres ist in der Datenschutzerklärung: https://www.evalion.net/datenschutz geregelt.",
          },
        ],
      },
      {
        heading: "Gerichtsstand und anwendbares Recht",
        subsections: [
          {
            content:
              "10.1. Für alle Rechtsstreitigkeiten im Zusammenhang mit derNutzung der Plattform gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.",
          },
          {
            content: "10.2. Gerichtsstand ist Berlin.",
          },
        ],
      },
      {
        heading: "§11 Schlussbestimmungen",
        subsections: [
          {
            content:
              "11.1. Änderungen dieser AGB werden den Nutzer:innen in Textform mitgeteilt. Widerspricht der/die Nutzer:in den Änderungen nicht innerhalb von vier Wochen nach Zugang der Mitteilung, gelten die Änderungen als angenommen.",
          },
          {
            content:
              "11.2. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
          },
        ],
      },
    ],
    minimalContactInfo: {
      companyName: "Evalion GmbH",
      address: "Brunnenstrasse 178",
      city: "10119 Berlin",
      lastUpdated: "Februar 2026",
    },
  }),
]);

export default agbContent;
