import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { SmoothScrollButton } from "@/components/blocks/SmoothScrollButton/SmoothScrollButton";
import { Heading, HeadingLevel } from "@/components/blocks/Heading/Heading";
import { StickyScrollButton } from "@/components/blocks/StickyScrollButton";
import { cn, processBoldMarkers, processStyledEmailLinks } from "@/lib/utils";
import { LexikonLetterSelector } from "./LexikonLetterSelector";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

export interface LexikonEntryItem {
  id: string;
  term: string;
  definition: string;
}

// Support both old format (object) and new format (array)
export type LexikonEntry = LexikonEntryItem[] | { [key: string]: string };

export interface LexikonProps {
  // Main content
  lexicon: LexikonEntry;

  // Hero section (optional)
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconAriaLabel?: string;
  iconOnTop?: boolean;
  imageSrc?: string;
  imageAlt?: string;

  // Layout options
  showHero?: boolean;
  showImage?: boolean;
  showTableOfContents?: boolean;
  headingLevel?: HeadingLevel;
  stickyTableOfContents?: boolean;
  scrollableContent?: boolean;
  maxCardHeight?: string;

  // Styling
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  backgroundClassName?: string;
  tableOfContentsClassName?: string;
  contentContainerClassName?: string;
  contentWrapperClassName?: string;
  entryClassName?: string;

  // Content customization
  tableOfContentsTitle?: string;
  sortBy?: "alphabetical" | "custom";
  locale?: string;
  linkColor?: string; // Custom link color class (e.g., "text-[#ff985c]", "text-orange-500")

  // Additional content
  children?: React.ReactNode;
}

export const Lexikon: React.FC<LexikonProps> = ({
  lexicon,
  title,
  subtitle,
  icon: Icon,
  iconAriaLabel,
  iconOnTop = false,
  imageSrc,
  imageAlt,
  showHero = true,
  showImage = true,
  showTableOfContents = true,
  headingLevel = 1,
  stickyTableOfContents = false,
  scrollableContent = false,
  maxCardHeight = "",
  className = "",
  containerClassName = "",
  cardClassName = "",
  contentClassName = "",
  titleClassName = "",
  backgroundClassName = `min-h-screen from-slate-50 via-white to-orange-50 ${showHero ? "pt-16" : "pt-8"}`,
  tableOfContentsClassName = "mb-12 p-6 bg-gray-50 rounded-lg",
  entryClassName = "border-l-4 border-[#ff985c] pl-4",
  contentWrapperClassName = "",
  contentContainerClassName = "",
  tableOfContentsTitle = "Inhaltsverzeichnis",
  sortBy = "alphabetical", // Currently only alphabetical sorting is implemented
  locale = "de",
  linkColor = "text-[#ff985c]", // Default to orange color
  children,
}) => {
  // Normalize lexicon data: convert array to object format for processing
  let normalizedLexicon: { [key: string]: string };
  let lexiconEntries: LexikonEntryItem[] = [];

  if (Array.isArray(lexicon)) {
    // New format: array of objects with id, term, definition
    lexiconEntries = lexicon;
    normalizedLexicon = lexicon.reduce(
      (acc, item) => {
        acc[item.term] = item.definition;
        return acc;
      },
      {} as { [key: string]: string }
    );
  } else {
    // Old format: object with term as key, definition as value
    normalizedLexicon = lexicon;
    lexiconEntries = Object.entries(lexicon).map(([term, definition]) => ({
      id: `legacy-${term.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      term,
      definition: definition as string,
    }));
  }

  // Sort lexicon entries by term name
  const sortedLexiconEntries = lexiconEntries.sort((a, b) => {
    const termA = a.term;
    const termB = b.term;
    // "0-9" always comes first
    if (termA === "0-9") return -1;
    if (termB === "0-9") return 1;
    // Check if terms start with numbers
    const aFirstChar = termA.charAt(0);
    const bFirstChar = termB.charAt(0);
    const aIsNumber = /[0-9]/.test(aFirstChar);
    const bIsNumber = /[0-9]/.test(bFirstChar);
    // Numbers come before letters
    if (aIsNumber && !bIsNumber) return -1;
    if (!aIsNumber && bIsNumber) return 1;
    // Within same category, use localeCompare
    return termA.localeCompare(termB, locale, { sensitivity: "base" });
  });

  // Convert sorted entries back to an object for backward compatibility
  const sortedLexicon = Object.fromEntries(
    sortedLexiconEntries.map((item) => [item.term, item.definition])
  );

  // Create anchor ID from term name
  const createAnchorId = (term: string) => {
    return term
      .toLowerCase()
      .replace(/[^a-z0-9äöüß]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Get first term starting with each letter
  // Use sortedLexiconEntries to ensure we get the first term as it appears on the page
  const getFirstTermForLetter = (letter: string) => {
    // Handle numeric values (0-9)
    if (letter === "0-9") {
      const firstTerm = sortedLexiconEntries.find((item) =>
        /^[0-9]/.test(item.term)
      );
      return firstTerm ? createAnchorId(firstTerm.term) : null;
    }
    // Handle letters - find the first term that starts with the letter
    // Use locale-aware comparison to handle special characters correctly
    const letterLower = letter.toLowerCase();
    const firstTerm = sortedLexiconEntries.find((item) => {
      const termLower = item.term.toLowerCase();
      // Check if term starts with the letter (case-insensitive)
      return termLower.startsWith(letterLower);
    });
    return firstTerm ? createAnchorId(firstTerm.term) : null;
  };

  const renderTextWithLinks = (text: string, currentTerm: string) => {
    // First, process styled email links [[email:address]]
    let processedText = processStyledEmailLinks(text);
    // Then, process bold markers to convert **text** to HTML
    const textWithBold = processBoldMarkers(processedText);
    const hasBoldMarkers = textWithBold !== processedText;
    const hasEmailLinks = processedText !== text;

    const links: Array<{
      start: number;
      end: number;
      href: string;
      text: string;
    }> = [];

    // Get all lexicon terms and create patterns for each
    // Use original text (without HTML) for link matching
    const lexiconTerms = sortedLexiconEntries.map((item) => item.term);

    // Sort terms by length (longest first) to handle overlapping matches properly
    const sortedTerms = lexiconTerms.sort((a, b) => b.length - a.length);

    // Find all occurrences of lexicon terms in the original text
    sortedTerms.forEach((term) => {
      // Skip if this term is the same as the current section's term
      if (term === currentTerm) {
        return;
      }

      // Create word boundary pattern for the term
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`\\b${escapedTerm}\\b`, "gi");
      const anchorId = createAnchorId(term);

      let match: RegExpExecArray | null;
      while ((match = pattern.exec(text)) !== null) {
        // Check if this position overlaps with existing links
        const overlaps = links.some(
          (existingLink) =>
            (match!.index >= existingLink.start &&
              match!.index < existingLink.end) ||
            (match!.index + match![0].length > existingLink.start &&
              match!.index + match![0].length <= existingLink.end) ||
            (match!.index <= existingLink.start &&
              match!.index + match![0].length >= existingLink.end)
        );

        if (!overlaps) {
          links.push({
            start: match.index,
            end: match.index + match[0].length,
            href: `#${anchorId}`,
            text: term,
          });
        }
      }
    });

    // Sort links by start position
    links.sort((a, b) => a.start - b.start);

    // Remove any remaining overlaps (in case sorting changed things)
    const filteredLinks = links.filter((link, index) => {
      if (index === 0) return true;
      const previousLink = links[index - 1];
      return link.start >= previousLink.end;
    });

    // If there are no links and no formatting, return plain text
    if (filteredLinks.length === 0 && !hasBoldMarkers && !hasEmailLinks) {
      return (
        <span herokit-id="f344abb5-e318-4fa2-ba6a-14b8ca75a34b">{text}</span>
      );
    }

    // If there are no links but there are bold markers or email links, render with HTML
    if (filteredLinks.length === 0 && (hasBoldMarkers || hasEmailLinks)) {
      return (
        <SafeHtmlRenderer
          content={textWithBold}
          herokit-id="f344abb5-e318-4fa2-ba6a-14b8ca75a34b"
          tag="span"
        />
      );
    }

    // If there are links, we need to handle both links and bold markers
    // For simplicity, we'll render the text with bold markers as HTML
    // and add links as React components
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    filteredLinks.forEach((link, index) => {
      // Add text before the link (may contain bold HTML or email links)
      if (link.start > lastIndex) {
        const textBefore = textWithBold.slice(lastIndex, link.start);
        // Check if this segment contains HTML (from bold markers or email links)
        if (textBefore.includes("<strong>") || textBefore.includes("<a")) {
          parts.push(
            <SafeHtmlRenderer
              key={`text-${index}`}
              content={textBefore}
              herokit-id="868222ba-a50a-4fa3-80f9-827046fd7fa4"
              tag="span"
            />
          );
        } else {
          parts.push(
            <span
              key={`text-${index}`}
              herokit-id="868222ba-a50a-4fa3-80f9-827046fd7fa4"
            >
              {textBefore}
            </span>
          );
        }
      }

      // Add the link
      // Generate hover color by darkening the base color
      const hoverColor = linkColor.includes("600")
        ? linkColor.replace("600", "700")
        : linkColor.includes("500")
          ? linkColor.replace("500", "600")
          : linkColor.includes("#ff985c")
            ? linkColor.replace("#ff985c", "#ff7a3d") // Darker orange for hover
            : `${linkColor}/80`;

      parts.push(
        <SmoothScrollButton
          key={`link-${index}`}
          targetId={link.href.substring(1)} // Remove the # from href
          className={`${linkColor} hover:${hoverColor} text-md m-0 cursor-pointer p-0 leading-none transition-colors`}
          scrollContainerSelector={
            scrollableContent
              ? '[data-hero-page-element-id="810473075561"]'
              : undefined
          }
          data-hero-page-element-id="810473075547"
          herokit-id="dba69ed6-9293-4005-ba73-08e112192672"
        >
          {link.text}
        </SmoothScrollButton>
      );

      lastIndex = link.end;
    });

    // Add remaining text (may contain bold HTML or email links)
    if (lastIndex < text.length) {
      const textAfter = textWithBold.slice(lastIndex);
      if (textAfter.includes("<strong>") || textAfter.includes("<a")) {
        parts.push(
          <SafeHtmlRenderer
            key="text-end"
            content={textAfter}
            data-hero-page-element-id="810473075548"
            herokit-id="d769c28a-fae6-464b-bcf0-9294179aeb0d"
            tag="span"
          />
        );
      } else {
        parts.push(
          <span
            key="text-end"
            data-hero-page-element-id="810473075548"
            herokit-id="d769c28a-fae6-464b-bcf0-9294179aeb0d"
          >
            {textAfter}
          </span>
        );
      }
    }

    return <>{parts}</>;
  };

  // Generate alphabet for navigation including "0-9"
  const alphabet = ["0-9", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  // Precompute anchor ids for each letter so we can reuse them in both
  // the desktop button grid and the mobile dropdown
  const letterAnchors = alphabet.map((letter) => ({
    letter,
    anchorId: getFirstTermForLetter(letter),
  }));

  return (
    <div
      className={`${backgroundClassName} ${className}`}
      herokit-id="8ab56eda-e36a-40c9-9182-54153f295685"
    >
      {/* Hero Section */}
      {showHero && (title || subtitle || imageSrc || Icon) && (
        <>
          {/* Image visualization */}
          {showImage && imageSrc && (
            <div
              className="flex justify-center py-8"
              data-hero-page-element-id="810473075549"
            >
              <Image
                src={imageSrc}
                alt={imageAlt || "Knowledge visualization"}
                loading="lazy"
                className="h-auto w-full max-w-xs rounded-2xl shadow-lg"
                width={280}
                height={180}
                priority={false}
              />
            </div>
          )}

          {(title || subtitle) && (
            <>
              {/* Header */}
              <div
                className="text-center"
                data-hero-page-element-id="810473075550"
                herokit-id="fe6a7b87-adea-4658-b3dd-dcfd2e0db45d"
              >
                {Icon && iconOnTop && (
                  <div
                    className="mb-4 flex justify-center"
                    data-hero-page-element-id="810473075551"
                  >
                    <Icon
                      className="h-24 w-24 text-[#ff985c]"
                      aria-label={iconAriaLabel}
                    />
                  </div>
                )}
                {title && (
                  <Heading
                    data-hero-page-element-id="810473075552"
                    level={headingLevel}
                    className={titleClassName}
                    herokit-id="b5f54c90-7e97-4217-a941-8ac9547bc001"
                  >
                    {title}
                  </Heading>
                )}
                {subtitle && (
                  <p
                    className="mx-auto max-w-2xl text-lg text-gray-600"
                    data-hero-page-element-id="810473075553"
                    herokit-id="64ec2750-8be9-4d7d-bee9-f23b38f8c2d1"
                  >
                    {subtitle}
                  </p>
                )}
                {Icon && !iconOnTop && (
                  <div
                    className="mt-4 flex justify-center"
                    data-hero-page-element-id="810473075554"
                  >
                    <Icon
                      className="h-8 w-8 text-[#ff985c]"
                      aria-label={iconAriaLabel}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Content */}
      <section
        className={`${showHero ? "py-16" : "py-0"}`}
        data-hero-page-element-id="810473075555"
      >
        <div className={`container mx-auto px-4 ${containerClassName}`}>
          <div
            className="mx-auto max-w-6xl"
            data-hero-page-element-id="810473075556"
          >
            <Card
              className={`${stickyTableOfContents || scrollableContent ? "flex flex-col" : ""} ${cardClassName}`}
              style={
                stickyTableOfContents || scrollableContent
                  ? { maxHeight: maxCardHeight }
                  : undefined
              }
            >
              <CardContent
                className={`${stickyTableOfContents || scrollableContent ? "flex min-h-0 flex-1 flex-col" : ""} p-4 md:p-8 ${contentClassName}`}
                herokit-id="89a2457a-8f27-4445-b7f5-afa7fe0ffe6e"
              >
                {/* Table of Contents */}
                {showTableOfContents && (
                  <div
                    className={`${stickyTableOfContents ? "sticky top-0 z-10 flex-shrink-0 md:top-15" : ""} ${tableOfContentsClassName} ${stickyTableOfContents ? "shadow-sm" : ""}`}
                    data-hero-page-element-id="810473075558"
                  >
                    <h3
                      className="text-primary mb-4 text-xl font-semibold"
                      data-hero-page-element-id="810473075559"
                      herokit-id="3f528a98-3021-45a9-a890-c868ac9d14d8"
                    >
                      {tableOfContentsTitle}
                    </h3>

                    {/* Mobile: dropdown selector for letters */}
                    <LexikonLetterSelector
                      letterAnchors={letterAnchors}
                      scrollableContent={scrollableContent}
                      stickyTableOfContents={stickyTableOfContents}
                    />

                    {/* Desktop / tablet: letter buttons grid */}
                    <div
                      className="hidden flex-wrap gap-2 md:flex"
                      data-hero-page-element-id="810473075560"
                      herokit-id="c585bc20-4374-4e8d-822c-9a56adafa321"
                    >
                      {letterAnchors.map(({ letter, anchorId }) =>
                        stickyTableOfContents ? (
                          <StickyScrollButton
                            key={letter}
                            targetId={anchorId || ""}
                            disabled={!anchorId}
                            scrollContainerSelector='[data-hero-page-element-id="810473075561"]'
                            className={
                              anchorId
                                ? "cursor-pointer rounded-md bg-orange-100 px-3 py-2 text-sm font-medium text-orange-800 transition-colors hover:bg-orange-200"
                                : "cursor-not-allowed rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-500 transition-colors"
                            }
                            herokit-id="7625e40f-c8d1-4e7a-905c-7a6b55971984"
                          >
                            {letter}
                          </StickyScrollButton>
                        ) : (
                          <SmoothScrollButton
                            key={letter}
                            targetId={anchorId ? anchorId : ""}
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                              anchorId
                                ? "cursor-pointer bg-orange-100 text-orange-800 hover:bg-orange-200"
                                : "cursor-not-allowed bg-gray-200 text-gray-500"
                            }`}
                            herokit-id="7625e40f-c8d1-4e7a-905c-7a6b55971984"
                          >
                            {letter}
                          </SmoothScrollButton>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "space-y-6 overflow-x-hidden overflow-y-auto",
                    scrollableContent
                      ? "h-[calc(100vh-12rem)] md:h-[800px]"
                      : "",
                    contentContainerClassName
                  )}
                  style={
                    scrollableContent
                      ? {
                          flexShrink: 0,
                          WebkitOverflowScrolling: "touch",
                          overscrollBehavior: "contain",
                        }
                      : undefined
                  }
                  data-hero-page-element-id="810473075561"
                  herokit-id="1ebad6e8-b82f-47fb-8712-c5cc04213a29"
                >
                  {sortedLexiconEntries.map((item) => (
                    <div
                      key={item.id}
                      id={createAnchorId(item.term)}
                      className={cn(contentWrapperClassName)}
                      data-hero-page-element-id="810473075562"
                    >
                      <div
                        className={cn(
                          entryClassName,
                          stickyTableOfContents
                            ? "scroll-mt-24 md:scroll-mt-20"
                            : "scroll-mt-20"
                        )}
                      >
                        <h3
                          className="text-primary mb-2 text-lg font-bold"
                          data-hero-page-element-id="810473075563"
                          herokit-id="c4be7e15-f087-46a8-a766-0cfbf5f4d9bc"
                        >
                          {item.term}
                        </h3>
                        <p
                          className="text-primary"
                          data-hero-page-element-id="810473075564"
                          herokit-id="727ad624-2e02-49af-aed2-a3703e5a6a94"
                        >
                          {renderTextWithLinks(item.definition, item.term)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional content */}
                {children && (
                  <div
                    className={`mt-8 ${stickyTableOfContents ? "flex-shrink-0" : ""}`}
                    herokit-id="7e588e01-84ab-4979-b906-07633d918a6e"
                  >
                    {children}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
