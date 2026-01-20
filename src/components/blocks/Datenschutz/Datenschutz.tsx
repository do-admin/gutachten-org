import React from "react";
import {
  Shield,
  Eye,
  Database,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { Heading } from "@/components/blocks/Heading/Heading";
import { cn } from "@/lib/utils";
import Image from "next/image";
import DateDisplay from "@/components/utils/DateDisplay";

// Helper function to parse **text** markers and convert to bold
const parseBoldText = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        parts.push(beforeText);
      }
    }
    // Add bold text
    parts.push(
      <strong
        key={`bold-${keyCounter++}`}
        herokit-id="8a2c3fd2-1abf-413d-92b1-bd365708b563"
      >
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(remainingText);
    }
  }

  return parts.length > 0 ? <>{parts}</> : text;
};

// Helper function to parse year patterns and replace with DateDisplay component
// Matches patterns like "2025", "September 2025", "Februar 2025", etc.
const parseYearPatterns = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  // Match German month names followed by year, or just year at word boundaries
  const monthYearRegex =
    /\b(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\s+(2025|2026)\b/gi;
  const yearRegex = /\b(2025|2026)\b/g;
  let lastIndex = 0;
  let keyCounter = 0;

  const monthMap: { [key: string]: string } = {
    Januar: "01",
    Februar: "02",
    März: "03",
    April: "04",
    Mai: "05",
    Juni: "06",
    Juli: "07",
    August: "08",
    September: "09",
    Oktober: "10",
    November: "11",
    Dezember: "12",
  };

  // Collect all matches (month-year first, then standalone years)
  const matches: Array<{
    index: number;
    length: number;
    type: "month-year" | "year";
    month?: string;
    year: string;
  }> = [];

  // Find all month-year matches
  let match: RegExpExecArray | null;
  monthYearRegex.lastIndex = 0; // Reset regex
  while ((match = monthYearRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      type: "month-year",
      month: match[1],
      year: match[2],
    });
  }

  // Find all standalone year matches (excluding those already in month-year patterns)
  yearRegex.lastIndex = 0; // Reset regex
  while ((match = yearRegex.exec(text)) !== null) {
    // Check if this year is already part of a month-year match
    const isInMonthYear = matches.some(
      (m) =>
        m.type === "month-year" &&
        match !== null &&
        typeof match.index === "number" &&
        match.index >= m.index &&
        match.index < m.index + m.length
    );
    if (match !== null && !isInMonthYear) {
      matches.push({
        index: match.index,
        length: match[0].length,
        type: "year",
        year: match[1],
      });
    }
  }

  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);

  // Process matches in order
  for (const match of matches) {
    // Add text before the match
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        parts.push(parseBoldText(beforeText));
      }
    }

    // Add DateDisplay component
    if (match.type === "month-year" && match.month) {
      const monthNum = monthMap[match.month] || "01";
      const dateString = `01.${monthNum}.${match.year}`;
      parts.push(
        <DateDisplay
          key={`date-${keyCounter++}`}
          date={dateString}
          dateFormat="long"
        />
      );
    } else {
      parts.push(
        <DateDisplay
          key={`date-${keyCounter++}`}
          date={`01.01.${match.year}`}
          dateFormat="year"
        />
      );
    }

    lastIndex = match.index + match.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(parseBoldText(remainingText));
    }
  }

  return parts.length > 0 ? <>{parts}</> : parseBoldText(text);
};

export interface DatenschutzSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

export interface AfaGuideVariantContent {
  heroTitle?: string;
  heroDescription?: string;
  grundlagenTitle?: string;
  grundlagenDescription?: string;
  grundlagenSubtitle?: string;
  grundlagenItems?: Array<{
    text: string;
  }>;
  schnellerenTitle?: string;
  schnellerenDescription?: string;
  anschaffungskostenTitle?: string;
  anschaffungskostenDescription?: string;
  anschaffungskostenItems?: string[];
  anschaffungskostenNote?: string;
  berechnungTitle?: string;
  formelTitle?: string;
  formelDescription?: string;
  beispielTitle?: string;
  beispielDescription?: string;
  fazitTitle?: string;
  fazitDescription?: string;
  bulletPointImage?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  };
}

export interface DatenschutzProps {
  title?: string;
  subtitle?: string;
  description?: string;
  lastUpdated?: string;
  companyName?: string;
  sections?: DatenschutzSection[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    website?: string;
  };
  className?: string;
  variant?: "default" | "simple" | "minimal" | "afaGuide";
  // Props for afaGuide variant
  afaGuideProps?: {
    backgroundColor?: string;
    padding?: string;
    content?: AfaGuideVariantContent;
  };
  // Props for minimal variant (AGB style with § sections)
  minimalSections?: Array<{
    heading: string;
    headingMarginBottom?: boolean;
    subsections?: Array<{
      content: string;
    }>;
  }>;
  quote?: {
    text: string;
    position?: number;
  };
  // Contact information block for minimal variant
  minimalContactInfo?: {
    companyName: string;
    address: string;
    city: string;
    lastUpdated?: string;
  };
  padding?: string;
  maxWidth?: string;
  backgroundColor?: string;
  contentClassName?: string;
  titleClassName?: string;
  sectionClassName?: string;
  subsectionClassName?: string;
  headingClassName?: string;
}

const Datenschutz: React.FC<DatenschutzProps> = ({
  title = "Datenschutzerklärung",
  subtitle = "Informationen zum Datenschutz und zur Verarbeitung Ihrer personenbezogenen Daten",
  description,
  lastUpdated = new Date().toLocaleDateString("de-DE"),
  companyName = "Unternehmen",
  sections = [],
  contactInfo = {},
  className = "",
  variant = "default",
  afaGuideProps,
  minimalSections = [],
  quote,
  minimalContactInfo,
  padding = "py-16 px-4 md:py-20 md:px-8 lg:py-24 lg:px-16",
  maxWidth = "max-w-4xl",
  backgroundColor = "bg-white",
  contentClassName,
  titleClassName,
  sectionClassName,
  subsectionClassName,
  headingClassName,
}) => {
  // Default sections if none provided
  const defaultSections: DatenschutzSection[] = [
    {
      id: "verantwortlicher",
      title: "Verantwortlicher",
      content: `Verantwortlicher für die Datenverarbeitung auf dieser Website ist ${companyName}.`,
      subsections: [
        {
          title: "Kontaktdaten",
          content: `Bei Fragen zum Datenschutz können Sie uns unter folgenden Kontaktdaten erreichen:`,
        },
      ],
    },
    {
      id: "datenerhebung",
      title: "Datenerhebung und -verwendung",
      content:
        "Wir erheben und verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen.",
      subsections: [
        {
          title: "Automatische Datenerhebung",
          content:
            "Beim Besuch unserer Website werden automatisch Informationen über den Zugriff gespeichert.",
        },
        {
          title: "Kontaktformulare",
          content:
            "Daten, die Sie uns über Kontaktformulare mitteilen, werden zur Bearbeitung Ihrer Anfrage verwendet.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies und Tracking",
      content: "Unsere Website verwendet Cookies und ähnliche Technologien.",
      subsections: [
        {
          title: "Notwendige Cookies",
          content:
            "Notwendige Cookies sind für das Funktionieren der Website erforderlich.",
        },
        {
          title: "Analyse-Cookies",
          content:
            "Wir verwenden Analyse-Cookies, um die Nutzung unserer Website zu verbessern.",
        },
      ],
    },
    {
      id: "rechte",
      title: "Ihre Rechte",
      content:
        "Sie haben verschiedene Rechte bezüglich Ihrer personenbezogenen Daten.",
      subsections: [
        {
          title: "Auskunftsrecht",
          content:
            "Sie haben das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu verlangen.",
        },
        {
          title: "Löschungsrecht",
          content:
            "Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen.",
        },
        {
          title: "Widerspruchsrecht",
          content:
            "Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen.",
        },
      ],
    },
    {
      id: "datensicherheit",
      title: "Datensicherheit",
      content:
        "Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer Daten.",
    },
    {
      id: "aenderungen",
      title: "Änderungen der Datenschutzerklärung",
      content:
        "Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren.",
    },
  ];

  const sectionsToRender = sections.length > 0 ? sections : defaultSections;

  // AfaGuide variant - renders the AfA guide content inline
  if (variant === "afaGuide") {
    if (!afaGuideProps?.content) {
      return null;
    }

    const { backgroundColor, padding, content } = afaGuideProps;

    return (
      <section className={cn(backgroundColor, padding, className)}>
        <div
          className="container-gutachten mx-auto space-y-6"
          herokit-id="d889a5be-6009-4dcb-87f5-05e1ae95469f"
        >
          {/* Hero Section */}
          {content.heroTitle && (
            <div
              className="space-y-6"
              herokit-id="18a4c581-5229-4742-91e5-326f3ae5b02f"
            >
              <Heading
                level={1}
                variant="primary"
                className="!m-0 !text-start !text-3xl !font-medium text-gray-800"
                center
                herokit-id="51f6eb57-12e6-40ea-a47e-41e6d259d066"
              >
                {content.heroTitle}
              </Heading>

              {content.heroDescription && (
                <p
                  className="text-sm leading-6 font-normal text-gray-600"
                  herokit-id="f6c30b85-40a9-44a7-a87b-5766e7f7cf73"
                >
                  {content.heroDescription}
                </p>
              )}
            </div>
          )}

          {/* Grundlagen der AfA Section */}
          {content.grundlagenTitle && (
            <div
              className="space-y-6"
              herokit-id="d4108b94-65be-499c-8d98-c2f5278c83e0"
            >
              <Heading
                level={2}
                variant="primary"
                className="!m-0 !text-start !text-3xl !font-medium text-gray-800"
                center
                herokit-id="f73629ef-5865-46e7-932b-e600aaee32db"
              >
                {content.grundlagenTitle}
              </Heading>

              {content.grundlagenDescription && (
                <p
                  className="text-sm leading-6 font-normal text-gray-600"
                  herokit-id="4efc6581-7c5b-4916-a42c-49cc3a3db83d"
                >
                  {content.grundlagenDescription}
                </p>
              )}

              {content.grundlagenSubtitle && (
                <div
                  className="flex flex-col gap-6"
                  herokit-id="7ed685a0-f493-495c-b228-ecfbbf11537d"
                >
                  <p
                    className="text-sm leading-6 font-semibold text-gray-800"
                    herokit-id="0842925e-b8a1-4d13-bfb3-cc65195f2046"
                  >
                    {content.grundlagenSubtitle}
                  </p>

                  {content.grundlagenItems &&
                    content.grundlagenItems.length > 0 && (
                      <div
                        className="space-y-6"
                        herokit-id="8e8749e3-22e0-466a-9c4c-f83fb0c74f1f"
                      >
                        {content.grundlagenItems.map((item, index) => (
                          <p
                            key={index}
                            className="text-sm leading-6 font-normal text-gray-600"
                            herokit-id="6642063c-3ab4-48e4-a169-b135dbb7f9dd"
                          >
                            {item.text}
                          </p>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          )}

          {/* Möglichkeit zur schnelleren Abschreibung Section */}
          {content.schnellerenTitle && (
            <div
              className="space-y-6"
              herokit-id="5fac71ba-3b92-4c71-a895-4bef37656dde"
            >
              <Heading
                level={2}
                variant="primary"
                className="!m-0 !text-start !text-3xl !font-medium text-gray-800"
                center
                herokit-id="ae7f2b69-27c0-42e7-b4b8-ea702fe5dd4c"
              >
                {content.schnellerenTitle}
              </Heading>

              {content.schnellerenDescription && (
                <p
                  className="text-sm leading-6 font-normal text-gray-600"
                  herokit-id="139709af-0d83-41fe-91f9-4fba80afcf1b"
                >
                  {content.schnellerenDescription}
                </p>
              )}
            </div>
          )}

          {/* Was zu den Anschaffungskosten gehört Section */}
          {content.anschaffungskostenTitle && (
            <div
              className="flex flex-col gap-6"
              herokit-id="56b4d63f-299d-4c58-b9bc-6f965e1e9ea0"
            >
              <p
                className="text-dark-neutral text-sm font-semibold md:text-base"
                herokit-id="c89773bb-988b-4944-8369-3feeef58ddd3"
              >
                {content.anschaffungskostenTitle}
              </p>

              {content.anschaffungskostenDescription && (
                <p
                  className="text-dark-gray text-sm leading-relaxed md:text-base"
                  herokit-id="60106890-71f5-4806-a499-9ae0f804c913"
                >
                  {content.anschaffungskostenDescription}
                </p>
              )}

              {content.anschaffungskostenItems &&
                content.anschaffungskostenItems.length > 0 && (
                  <div
                    className="space-y-6"
                    herokit-id="6b5a3785-e0a3-42e2-b880-35cde54f084e"
                  >
                    {content.anschaffungskostenItems.map((item, index) => (
                      <div
                        key={index}
                        className="text-dark-neutral flex items-center gap-3"
                      >
                        <Image
                          src={
                            content.bulletPointImage?.src
                              ? content.bulletPointImage.src
                              : ""
                          }
                          alt={content.bulletPointImage?.alt || "Bullet point"}
                          loading="lazy"
                          width={content.bulletPointImage?.width || 16}
                          height={content.bulletPointImage?.height || 16}
                          className={content.bulletPointImage?.className}
                        />
                        <span
                          className="text-sm font-medium md:text-base"
                          herokit-id="63a9af16-bf89-4a83-94af-fa3b4f980e71"
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              {content.anschaffungskostenNote && (
                <p
                  className="text-dark-gray text-sm leading-relaxed md:text-base"
                  herokit-id="9a4d6f4f-d931-4c36-897f-2c72f6176b26"
                >
                  {content.anschaffungskostenNote}
                </p>
              )}
            </div>
          )}

          {/* So wird gerechnet Section */}
          {content.berechnungTitle && (
            <div className="flex flex-col gap-6">
              <Heading
                level={2}
                variant="primary"
                className="!m-0 !text-start !text-lg font-semibold text-gray-800"
                center
                herokit-id="9408416b-8ef7-44bb-a199-bdc2cff6bab3"
              >
                {content.berechnungTitle}
              </Heading>

              <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                herokit-id="fa9724f1-603a-449f-b17f-11c7b17a1409"
              >
                {/* Formel */}
                {content.formelTitle && (
                  <div
                    className="flex flex-col gap-6"
                    herokit-id="7bd5be2a-1585-4a80-994b-93b6b749b07f"
                  >
                    <p
                      className="text-dark-neutral text-sm font-semibold md:text-base"
                      herokit-id="df3bf71a-0b22-4a7c-b4a8-aa4f207e2d3c"
                    >
                      {content.formelTitle}
                    </p>
                    {content.formelDescription && (
                      <p
                        className="text-dark-gray text-sm leading-relaxed md:text-base"
                        herokit-id="7e68dd5a-008d-4fda-988b-c0a985a869b9"
                      >
                        {content.formelDescription}
                      </p>
                    )}
                  </div>
                )}

                {/* Beispiel */}
                {content.beispielTitle && (
                  <div
                    className="flex flex-col gap-6"
                    herokit-id="4452d8b5-d626-4875-8dd5-646048e81195"
                  >
                    <p
                      className="text-dark-neutral text-sm font-semibold md:text-base"
                      herokit-id="2bff64e5-0c21-4e32-b383-613ba05bfef4"
                    >
                      {content.beispielTitle}
                    </p>
                    {content.beispielDescription && (
                      <p
                        className="text-dark-gray text-sm leading-relaxed md:text-base"
                        herokit-id="35448a58-836a-4598-820c-1ec04368c68b"
                      >
                        {content.beispielDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fazit Section */}
          {content.fazitTitle && (
            <div
              className="flex flex-col gap-6"
              herokit-id="ccced2d3-24ef-4367-ba97-8bd50021611d"
            >
              <Heading
                level={2}
                variant="primary"
                className="!m-0 !text-start !text-3xl !font-medium text-gray-800"
                center
                herokit-id="fd8e8b67-5cfa-42ae-83f8-090eab5a7496"
              >
                {content.fazitTitle}
              </Heading>

              {content.fazitDescription && (
                <p
                  className="text-sm leading-6 font-normal text-gray-600"
                  herokit-id="58f18f60-c7a7-4cb1-8452-b683a186aace"
                >
                  {content.fazitDescription}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Minimal variant - AGB style design and layout
  if (variant === "minimal") {
    type MinimalSection = NonNullable<
      DatenschutzProps["minimalSections"]
    >[number];

    return (
      <div
        className={cn(
          "flex items-start justify-center",
          backgroundColor,
          padding,
          className
        )}
      >
        <div
          className={cn("flex w-full flex-col", maxWidth, contentClassName)}
          herokit-id="357dd8e3-717d-48e2-aebb-196d3f206914"
        >
          {/* Main Title */}
          {title && (
            <h1
              className={`text-dark-gray mb-4 text-sm leading-tight font-bold ${titleClassName}`}
              herokit-id="46d14fa4-f213-48eb-a44a-b5bcf12a2d53"
            >
              {title}
            </h1>
          )}

          {/* Description */}
          {description && (
            <p
              className="text-dark-gray mb-4 text-sm font-normal whitespace-pre-line"
              herokit-id="1eaecd64-560e-4182-9fa1-d4cdcbb2e035"
            >
              {description}
            </p>
          )}

          {/* Sections */}
          <div
            className="flex flex-col gap-4"
            herokit-id="9265b40e-30a4-464e-a48a-c029d9a3b1b8"
          >
            {minimalSections.map((section, sectionIndex) => {
              if (!section) return null;

              return (
                <section
                  key={sectionIndex}
                  className={cn("flex flex-col gap-4", sectionClassName)}
                  herokit-id="cdc5d429-2591-466a-928f-a71c6cf04817"
                >
                  {/* Section Heading with § symbol */}
                  <h2
                    className={cn(
                      "text-dark-gray text-sm leading-tight font-bold",
                      section.headingMarginBottom && "mb-4",
                      headingClassName
                    )}
                    herokit-id="3bab335c-11a3-4a0a-916a-9e76560d071c"
                  >
                    {section.heading}
                  </h2>

                  {/* Subsections */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div
                      className={cn("flex flex-col gap-4", subsectionClassName)}
                      herokit-id="d266f0d9-644d-4f43-85ed-702c3dd30616"
                    >
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="flex flex-col gap-2">
                          <p
                            className="text-dark-gray text-sm font-normal whitespace-pre-line"
                            herokit-id="7cce6069-af37-4da0-a228-590d91483bff"
                          >
                            {parseYearPatterns(subsection.content)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Contact Information Block */}
          {minimalContactInfo && (
            <div
              className="mt-4 flex flex-col"
              herokit-id="f569fd70-0c76-45d2-9786-1004a606320e"
            >
              <p
                className="text-dark-gray text-sm font-bold"
                herokit-id="24b091bf-122d-492f-9147-7a265c45a3d2"
              >
                {minimalContactInfo.companyName}
              </p>
              <p
                className="text-dark-gray text-sm font-normal"
                herokit-id="37e565bf-e774-4199-a575-219cd9eb15d2"
              >
                {minimalContactInfo.address}
              </p>
              <p
                className="text-dark-gray text-sm font-normal"
                herokit-id="87181074-cea6-4dd6-82df-111371f2a6db"
              >
                {minimalContactInfo.city}
              </p>
              {minimalContactInfo.lastUpdated && (
                <p
                  className="text-dark-gray mt-4 text-sm font-normal"
                  herokit-id="c0d14661-7b01-40ea-b627-b5e3d5b57749"
                >
                  Stand:{" "}
                  <DateDisplay
                    date={minimalContactInfo.lastUpdated}
                    dateFormat="long"
                  />
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Simple variant - plain text layout
  if (variant === "simple") {
    return (
      <div
        className={`container mx-auto max-w-4xl px-4 py-8 ${className}`}
        herokit-id="5be8f5ee-b9c2-453b-a269-afe6e343a802"
      >
        {/* Header */}
        <div className="mb-8" herokit-id="f64f2e91-2f56-426c-b99f-3c339a412839">
          <Heading
            level={1}
            className="mb-4 text-left"
            herokit-id="c9357856-d5e5-4e71-9232-1e41e4450669"
          >
            {title}
          </Heading>
          {subtitle && (
            <p
              className="mb-4"
              herokit-id="4acb724d-860a-4a58-84c4-3d7cfcf6c288"
            >
              {subtitle}
            </p>
          )}
          <p
            className="text-sm"
            herokit-id="2fad8ba7-9618-420c-b746-539387e877b2"
          >
            Stand: <DateDisplay date={lastUpdated} dateFormat="long" />
          </p>
        </div>

        {/* Contact Information */}
        {contactInfo &&
          (contactInfo.email || contactInfo.phone || contactInfo.address) && (
            <div
              className="mb-8"
              herokit-id="613a38fb-9dce-4be8-b079-a6d011bff198"
            >
              <Heading
                level={2}
                className="mb-4 text-left"
                herokit-id="aa4d2385-3543-43b5-ab8a-d2c77044126c"
              >
                Kontakt
              </Heading>
              {contactInfo.email && (
                <p
                  className="mb-2"
                  herokit-id="c9257e80-8c38-45ed-b432-d9b3abb59bcf"
                >
                  E-Mail:{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="underline"
                    herokit-id="cbaaa235-d951-44e2-9f31-a4fa3e3cf7f1"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              )}
              {contactInfo.phone && (
                <p
                  className="mb-2"
                  herokit-id="3644935c-e8cf-491d-a5db-6285f8d1749d"
                >
                  Telefon:{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="underline"
                    herokit-id="027f66f4-9d8f-49e6-bd5f-8a768c096cc3"
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              )}
              {contactInfo.address && (
                <p
                  className="mb-2"
                  herokit-id="e26ea830-7428-4f41-9a56-5bcd6ff6457a"
                >
                  Adresse: {contactInfo.address}
                </p>
              )}
            </div>
          )}

        {/* Sections */}
        <div
          className="space-y-6"
          herokit-id="d0bb2cc0-1b5c-41bb-b226-adb9ae1419ef"
        >
          {sectionsToRender.map((section) => (
            <section
              key={section.id}
              className="mb-6"
              herokit-id="38a9b9d4-66cb-4b72-b595-818b093d39a9"
            >
              <Heading
                level={2}
                className="mb-3 text-left"
                herokit-id="60973b5b-0e3c-443d-b819-4967220132e4"
              >
                {section.title}
              </Heading>
              <p
                className="mb-4 whitespace-pre-line"
                herokit-id="f85b7e50-b094-4c78-b07c-99a5aba00ad2"
              >
                {parseYearPatterns(section.content)}
              </p>

              {section.subsections && section.subsections.length > 0 && (
                <div
                  className="ml-4 space-y-4"
                  herokit-id="26c5c73b-b4e9-435a-8d30-61eee5f01973"
                >
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="mb-4">
                      <Heading
                        level={3}
                        className="mb-2 text-left"
                        herokit-id="fb5b5085-514e-4ac3-84d3-1cbc23c283fb"
                      >
                        {subsection.title}
                      </Heading>
                      <p
                        className="whitespace-pre-line"
                        herokit-id="cf5e80dd-6ac1-40aa-af28-25b686377b5c"
                      >
                        {parseYearPatterns(subsection.content)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    );
  }

  // Default variant with styled layout
  return (
    <>
      <div
        className={`container mx-auto max-w-4xl px-4 py-16 ${className}`}
        herokit-id="ff86398a-06c9-4630-8a55-5deef2c387ea"
      >
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center">
            <Shield className="text-primary mr-4 h-12 w-12" />
            <Heading
              level={1}
              className="text-foreground m-0 mt-0 mb-0 text-4xl font-bold"
              herokit-id="943fac73-7d33-4129-b594-f336bf3bc30c"
            >
              {title}
            </Heading>
          </div>
          <p
            className="text-muted-foreground mb-4 text-xl"
            herokit-id="e2f43bd3-ec61-4d76-8233-5cff6fac7e9d"
          >
            {subtitle}
          </p>
          <div className="text-muted-foreground flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span herokit-id="e708b446-d0b2-4c57-8e7c-e27327b8119e">
              Stand: <DateDisplay date={lastUpdated} dateFormat="long" />
            </span>
          </div>
        </div>

        {/* Contact Information */}
        {contactInfo &&
          (contactInfo.email || contactInfo.phone || contactInfo.address) && (
            <div className="bg-secondary/30 mb-8 rounded-lg p-6">
              <Heading
                level={2}
                className="text-foreground mt-0 mb-4 flex items-center text-left text-2xl font-semibold"
                herokit-id="7628ab76-8af6-4bff-a663-9ed5ad1d01b5"
              >
                <Mail className="text-primary mr-2 h-6 w-6" />
                Kontakt
              </Heading>
              <div
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
                herokit-id="fa6ef5df-73b2-4de5-9f70-b3a950537b8c"
              >
                {contactInfo.email && (
                  <div className="flex items-center">
                    <Mail className="text-muted-foreground mr-3 h-5 w-5" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary hover:text-primary/80"
                      herokit-id="653998ee-3468-4d33-87ab-a611bfde8383"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="text-muted-foreground mr-3 h-5 w-5" />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-primary hover:text-primary/80"
                      herokit-id="d9665109-062b-49cc-9ec1-680772229ba0"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                {contactInfo.address && (
                  <div className="flex items-start md:col-span-2">
                    <MapPin className="text-muted-foreground mt-0.5 mr-3 h-5 w-5" />
                    <span
                      className="text-muted-foreground"
                      herokit-id="dd1f7cf8-61b7-4e3f-a6a5-b0b9f9eb7491"
                    >
                      {contactInfo.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Sections */}
        <div
          className="space-y-8"
          herokit-id="33aa0233-1799-48b8-8454-1428f2034140"
        >
          {sectionsToRender.map((section, index) => (
            <section
              key={section.id}
              className="border-border border-b pb-8 last:border-b-0"
            >
              <div className="mb-4 flex items-start">
                <div className="bg-primary/10 mt-1 mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  <span
                    className="text-primary text-sm font-semibold"
                    herokit-id="9b670a13-48c3-4c15-959e-11572b8d96cc"
                  >
                    {index + 1}
                  </span>
                </div>
                <Heading
                  level={2}
                  className="text-foreground mt-0 mb-0 text-left text-2xl font-semibold"
                  herokit-id="daa4ae54-a163-4cf3-b223-605d80fe13b9"
                >
                  {section.title}
                </Heading>
              </div>

              <div
                className="ml-12"
                herokit-id="517d9e02-b6c8-40c5-bf5f-8fcd9ba54946"
              >
                <p
                  className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-line"
                  herokit-id="7872f229-5407-4b15-b6be-99f810dbc5fc"
                >
                  {section.content}
                </p>

                {section.subsections && section.subsections.length > 0 && (
                  <div
                    className="space-y-4"
                    herokit-id="f52f1cd4-2e2c-4b33-9798-36b8905baa3f"
                  >
                    {section.subsections.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className="bg-muted/50 rounded-lg p-4"
                      >
                        <Heading
                          level={3}
                          className="text-foreground mt-0 mb-2 text-left text-lg font-medium"
                          herokit-id="b3f9a50f-cada-4d53-a4da-28393c116888"
                        >
                          {subsection.title}
                        </Heading>
                        <p
                          className="text-muted-foreground leading-relaxed whitespace-pre-line"
                          herokit-id="303b70b8-43f3-4758-a3c3-b005d9e78175"
                        >
                          {parseYearPatterns(subsection.content)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="border-border mt-12 border-t pt-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="mb-4 flex items-center">
              <Eye className="text-muted-foreground mr-2 h-6 w-6" />
              <Heading
                level={3}
                className="text-foreground mt-0 mb-0 text-left text-lg font-medium"
                herokit-id="2f12e08c-7b43-4b13-9b62-6f4b07864567"
              >
                Transparenz und Vertrauen
              </Heading>
            </div>
            <p
              className="text-muted-foreground leading-relaxed"
              herokit-id="2b268b2a-a562-49e3-8f82-68f60937d5f2"
            >
              Wir legen großen Wert auf Transparenz im Umgang mit Ihren
              personenbezogenen Daten. Bei Fragen oder Anliegen zum Datenschutz
              stehen wir Ihnen gerne zur Verfügung.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Datenschutz;
