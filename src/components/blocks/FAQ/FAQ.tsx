"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  cn,
  createSlug,
  processBoldMarkers,
  processStyledEmailLinks,
} from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "@/components/blocks/Heading/Heading";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

// Helper function to convert markdown **bold**, links, and lists to HTML
const markdownToHtml = (text: string): string => {
  // First, process styled email links [[email:address]]
  let processedText = processStyledEmailLinks(text);

  // Helper to convert markdown links [text](url) to HTML with blue color
  const convertLinks = (str: string): string => {
    return str.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#005B8A] font-medium hover:underline">$1</a>'
    );
  };

  // Check if text already contains HTML tags (like <ul>, <li>, etc.)
  const hasHtmlTags = /<(ul|ol|li|p|div|span|strong|em|b|i|a)[\s>\/]/.test(
    processedText
  );

  if (hasHtmlTags) {
    // Text already contains HTML - preserve HTML structure and wrap plain text in paragraphs
    // Split by double newlines to identify paragraph boundaries
    const parts = processedText.split(/\n\n+/);
    const processed: string[] = [];

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      // Check if this part contains HTML tags
      if (/<(ul|ol|li|p|div|a)[\s>\/]/.test(trimmed)) {
        // This is HTML - preserve it, convert bold markdown, and convert markdown links
        let processedPart = processBoldMarkers(trimmed);
        processedPart = convertLinks(processedPart);
        processed.push(processedPart);
      } else {
        // This is plain text - wrap in paragraph, convert bold, and convert links
        let withBold = processBoldMarkers(trimmed);
        withBold = convertLinks(withBold);
        processed.push(`<p>${withBold}</p>`);
      }
    }

    return processed.join("");
  }

  // Otherwise, process as markdown
  // Split by lines to process sequentially
  const lines = processedText.split("\n");
  const processed: string[] = [];
  let currentParagraph: string[] = [];
  let listItems: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this is a list item
    const isListItem = trimmed.match(/^[-*]\s+/);

    if (isListItem) {
      // If we were building a paragraph, close it first
      if (currentParagraph.length > 0) {
        let paraText = processBoldMarkers(currentParagraph.join(" "));
        paraText = convertLinks(paraText);
        processed.push(`<p>${paraText}</p>`);
        currentParagraph = [];
      }

      // Start or continue list
      if (!inList) {
        inList = true;
      }

      // Process list item
      const content = trimmed.replace(/^[-*]\s+/, "");
      let withBold = processBoldMarkers(content);
      withBold = convertLinks(withBold);
      listItems.push(`<li>${withBold}</li>`);
    } else {
      // Not a list item
      if (inList) {
        // Close the list
        processed.push(`<ul>${listItems.join("")}</ul>`);
        listItems = [];
        inList = false;
      }

      if (trimmed) {
        currentParagraph.push(trimmed);
      } else if (currentParagraph.length > 0) {
        // Empty line - close current paragraph
        let paraText = processBoldMarkers(currentParagraph.join(" "));
        paraText = convertLinks(paraText);
        processed.push(`<p>${paraText}</p>`);
        currentParagraph = [];
      }
    }
  }

  // Close any remaining list
  if (inList && listItems.length > 0) {
    processed.push(`<ul>${listItems.join("")}</ul>`);
  }

  // Close any remaining paragraph
  if (currentParagraph.length > 0) {
    let paraText = processBoldMarkers(currentParagraph.join(" "));
    paraText = convertLinks(paraText);
    processed.push(`<p>${paraText}</p>`);
  }

  return processed.join("");
};

// Helper function to generate stable herokit-id from item ID
const generateAnswerHerokitId = (itemId: string): string => {
  // Create a simple hash from the item ID to generate a stable UUID-like string
  let hash = 0;
  const str = `faq-answer-${itemId}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to UUID-like format (8-4-4-4-12)
  const hex = Math.abs(hash).toString(16).padStart(32, "0");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  categoryTitle?: string;
}

export interface FaqGroup {
  groupName: string;
  faqs: FaqItem[];
}

export interface FaqProps {
  title?: string;
  underline?: boolean;
  subtitle?: string;
  items: FaqItem[] | FaqGroup[];
  variant?: "default" | "accordion";
  sectionClassName?: string;
  titleWrapperClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  triggerClassName?: string;
  answerClassName?: string;
  accordionItemClassName?: string;
  accordionClassName?: string;
  groupTitleClassName?: string;
  showTitle?: boolean;
  sectionId?: string;
  enableAnchorLinks?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  renderAsH1?: boolean;
  // Accordion variant props
  defaultOpenIds?: string[];
  containerClassName?: string;
  headerClassName?: string;
  itemClassName?: string;
  questionClassName?: string;
  arrowClassName?: string;
  categoryTitleClassName?: string;
  arrowIcon?: React.ComponentType<{ className?: string }>;
}

export const FAQ = ({
  answerClassName,
  accordionItemClassName,
  accordionClassName,
  ariaLabel = "Häufig gestellte Fragen",
  ariaDescribedBy,
  enableAnchorLinks = true,
  groupTitleClassName,
  items = [],
  sectionId = "faq",
  showTitle = true,
  sectionClassName,
  subtitleClassName,
  subtitle,
  title = "Häufige Fragen",
  titleWrapperClassName,
  titleClassName,
  triggerClassName,
  underline = true,
  renderAsH1 = false,
  variant = "default",
  defaultOpenIds = [],
  containerClassName,
  headerClassName,
  itemClassName,
  questionClassName,
  arrowClassName,
  categoryTitleClassName,
  arrowIcon,
}: FaqProps) => {
  // Default class names
  const defaultAnswerClassName =
    "text-primary leading-relaxed whitespace-pre-wrap";
  const defaultAccordionItemClassName =
    "border-t border-gray-200 cursor-pointer";
  const defaultGroupTitleClassName =
    "text-left text-2xl font-semibold text-primary mb-4 mt-12 border-l-4 border-primary pl-4";
  const defaultSectionClassName = `${showTitle ? "py-12" : "py-0"}`;
  const defaultSubtitleClassName = "text-xl text-primary max-w-3xl mx-auto";
  const defaultTitleWrapperClassName = "text-center mb-12";
  const defaultTitleClassName = "";
  const defaultTriggerClassName =
    "text-xl text-left text-primary !cursor-pointer";

  // Use conditional logic: custom classes OR defaults, not both
  const finalAnswerClassName = answerClassName || defaultAnswerClassName;
  const finalAccordionItemClassName =
    accordionItemClassName || defaultAccordionItemClassName;
  const finalGroupTitleClassName =
    groupTitleClassName || defaultGroupTitleClassName;
  const finalSectionClassName = sectionClassName || defaultSectionClassName;
  const finalSubtitleClassName = subtitleClassName || defaultSubtitleClassName;
  const finalTitleWrapperClassName =
    titleWrapperClassName || defaultTitleWrapperClassName;
  const finalTitleClassName = titleClassName || defaultTitleClassName;
  const finalTriggerClassName = triggerClassName || defaultTriggerClassName;
  if (!items || items.length === 0) {
    return null;
  }

  // Check if items are grouped (have groupName property)
  const isGrouped = items.length > 0 && "groupName" in items[0];

  // Flatten all FAQ items for rendering
  const getAllFaqItems = (): {
    item: FaqItem;
    groupName?: string;
    globalIndex: number;
  }[] => {
    const allItems: {
      item: FaqItem;
      groupName?: string;
      globalIndex: number;
    }[] = [];
    let globalIndex = 0;

    if (isGrouped) {
      (items as FaqGroup[]).forEach((group) => {
        group.faqs.forEach((faqItem) => {
          allItems.push({
            item: faqItem,
            groupName: group.groupName,
            globalIndex: globalIndex++,
          });
        });
      });
    } else {
      (items as FaqItem[]).forEach((faqItem) => {
        allItems.push({
          item: faqItem,
          globalIndex: globalIndex++,
        });
      });
    }

    return allItems;
  };

  const allFaqItems = useMemo(() => getAllFaqItems(), [items, isGrouped]);

  // Accordion variant state management
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    if (variant === "accordion") {
      return defaultOpenIds.reduce<Record<string, boolean>>((acc, id) => {
        acc[id] = true;
        return acc;
      }, {});
    }
    return {};
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll to FAQ item when hash changes (mobile only)
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    // Check if device is mobile (screens < 768px)
    const isMobile = () => {
      if (typeof window === "undefined") return false;
      return window.innerWidth < 768;
    };

    const scrollToElement = (hash: string) => {
      if (!hash || !isMobile()) return;

      // Try to find the element by ID
      let element: HTMLElement | null =
        document.getElementById(hash) ||
        document.getElementById(`faq-trigger-${hash}`);

      if (!element) {
        const faqSection = document.getElementById(sectionId);
        if (faqSection) {
          const allH4Elements = faqSection.querySelectorAll(`h4[id="${hash}"]`);
          if (allH4Elements.length > 0) {
            element = allH4Elements[0] as HTMLElement;
          }
        }
      }

      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const offsetPosition = elementTop - 80; // 80px header offset

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
    };

    const handleHashChange = () => {
      if (!isMobile()) return;

      // Clear any pending scrolls
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const hash = window.location.hash.slice(1);
      if (!hash) return;

      // Find the trigger element to open accordion if needed
      const triggerElement = document.getElementById(`faq-trigger-${hash}`);

      if (triggerElement && variant === "accordion") {
        // Check if accordion is closed by checking data-state on trigger or parent item
        const accordionItem = triggerElement.closest("[data-state]");
        const isOpen =
          triggerElement.getAttribute("data-state") === "open" ||
          (accordionItem &&
            accordionItem.getAttribute("data-state") === "open");

        if (!isOpen) {
          // Open accordion first by clicking the trigger
          (triggerElement as HTMLElement).click();

          // Wait for accordion animation to complete before scrolling
          // Check when content is visible with a retry mechanism
          const checkAndScroll = (attempts = 0) => {
            const contentElement = document.getElementById(
              `faq-content-${hash}`
            );
            const accordionItem = triggerElement.closest("[data-state]");
            const isNowOpen =
              triggerElement.getAttribute("data-state") === "open" ||
              (accordionItem &&
                accordionItem.getAttribute("data-state") === "open");

            // Check if content is visible (has height > 0)
            const contentVisible =
              contentElement &&
              contentElement.offsetHeight > 0 &&
              contentElement.getBoundingClientRect().height > 0;

            if (isNowOpen && contentVisible) {
              // Accordion is open and content is visible, now scroll
              scrollToElement(hash);
            } else if (attempts < 10) {
              // Not ready yet, check again in 50ms (max 500ms wait)
              scrollTimeout = setTimeout(() => {
                checkAndScroll(attempts + 1);
              }, 500);
            } else {
              // Fallback: scroll anyway after max attempts
              scrollToElement(hash);
            }
          };

          // Start checking after initial delay for animation
          scrollTimeout = setTimeout(() => {
            checkAndScroll(0);
          }, 800);
        } else {
          // Already open, wait a moment for any layout shifts, then scroll
          scrollTimeout = setTimeout(() => {
            scrollToElement(hash);
          }, 800);
        }
      } else {
        // Not accordion variant, just scroll
        scrollTimeout = setTimeout(() => {
          scrollToElement(hash);
        }, 800);
      }
    };

    // Handle initial hash on page load
    if (window.location.hash && isMobile()) {
      scrollTimeout = setTimeout(() => {
        handleHashChange();
      }, 400);
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener("hashchange", handleHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId, variant]);

  // Render accordion variant
  if (variant === "accordion") {
    const finalSectionClassName = sectionClassName || "py-[60px] lg:py-[120px]";
    const finalContainerClassName =
      containerClassName ||
      "mx-auto container-gutachten flex w-full flex-col gap-8 px-4 lg:flex-row lg:gap-12 lg:px-0";
    const finalHeaderClassName = headerClassName || "w-full lg:max-w-sm";
    const finalItemClassName = itemClassName;
    const finalQuestionClassName =
      questionClassName ||
      "text-sm sm:text-base md:text-lg font-normal text-[#273238]";
    const finalAnswerClassName =
      answerClassName || "text-sm leading-[1.75] text-[#515A5F]";
    const finalCategoryTitleClassName =
      categoryTitleClassName ||
      "text-base sm:text-xl md:text-2xl font-semibold text-[#333333]";

    // Use custom arrow icon or default to ArrowDown
    const ArrowIcon = arrowIcon || ArrowDown;

    // Group items by categoryTitle or groupName
    const groupedItems = new Map<string, typeof allFaqItems>();
    const ungroupedItems: typeof allFaqItems = [];

    allFaqItems.forEach((faqItem) => {
      // Check for categoryTitle on item first, then fall back to groupName from grouped structure
      const category = faqItem.item.categoryTitle || faqItem.groupName;
      if (category) {
        if (!groupedItems.has(category)) {
          groupedItems.set(category, []);
        }
        groupedItems.get(category)!.push(faqItem);
      } else {
        ungroupedItems.push(faqItem);
      }
    });

    // Get default value for accordion
    const getDefaultValue = () => {
      if (defaultOpenIds.length > 0) {
        const firstOpenId = defaultOpenIds[0];
        const item = allFaqItems.find(
          (faqItem) =>
            faqItem.item.id === firstOpenId ||
            createSlug(faqItem.item.question.replace(/<[^>]+>/g, "")) ===
              firstOpenId
        );
        if (item) {
          const index = allFaqItems.indexOf(item);
          return `item-${index + 1}`;
        }
      }
      return undefined;
    };

    return (
      <section
        id={sectionId}
        aria-labelledby={showTitle ? `${sectionId}-title` : undefined}
        className={finalSectionClassName}
      >
        <div
          className={cn(finalContainerClassName)}
          herokit-id="909a196d-45d0-416e-930d-c66b2bbfa8bc"
        >
          {showTitle && (
            <div
              className={cn(finalHeaderClassName)}
              herokit-id="a9d23832-6f46-4af9-bc4c-00092c4be68a"
            >
              <h2
                id={`${sectionId}-title`}
                className={cn(
                  "text-2xl font-medium md:text-3xl xl:text-[2rem]",
                  titleClassName
                )}
                herokit-id="851b75af-89c4-472a-99fa-a938d8d78d2b"
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className={cn(
                    "text-muted-foreground mt-4 text-base",
                    subtitleClassName
                  )}
                  herokit-id="ae893b25-62e1-4c88-848c-d1afcdaca7d9"
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div
            className="flex w-full flex-col gap-0"
            herokit-id="dca1f4a7-a1c6-4dab-b513-9a32120982ac"
          >
            {(() => {
              const renderedSections: React.ReactNode[] = [];
              let globalIndex = 0;

              // Render grouped categories
              let isFirstCategory = true;
              groupedItems.forEach((items, categoryTitle) => {
                const categoryAccordionItems: React.ReactNode[] = [];

                // Render all items in this category
                items.forEach(({ item }) => {
                  const questionHtml = item.question || "";
                  const questionText = questionHtml.replace(/<[^>]+>/g, "");
                  // Ensure slug and itemId always match - use item.id or generate from question
                  const itemId =
                    item.id ||
                    createSlug(questionText) ||
                    `faq-item-${globalIndex}`;
                  const slug = itemId; // Slug should match itemId exactly
                  const accordionValue = `item-${globalIndex + 1}`;
                  const contentId = `faq-content-${itemId}`;
                  const triggerId = `faq-trigger-${itemId}`;
                  // Use globalIndex in key to ensure uniqueness even with duplicate questions
                  const uniqueKey = `${itemId}-${globalIndex}`;

                  categoryAccordionItems.push(
                    <AccordionItem
                      key={uniqueKey}
                      value={accordionValue}
                      className={cn(finalItemClassName)}
                    >
                      <AccordionTrigger
                        id={triggerId}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition"
                        aria-controls={contentId}
                        icon={ArrowIcon}
                        iconClassName={cn(
                          "text-primary h-5 w-5 transition-transform",
                          arrowClassName
                        )}
                        onClick={
                          enableAnchorLinks
                            ? (e) => {
                                // Don't prevent default - let accordion toggle normally
                                // Set hash using pushState to avoid browser's default scroll behavior
                                const currentHash = window.location.hash;
                                if (history.pushState) {
                                  history.pushState(null, "", `#${slug}`);
                                  // Manually trigger hashchange event only if hash actually changed
                                  if (currentHash !== `#${slug}`) {
                                    window.dispatchEvent(
                                      new Event("hashchange")
                                    );
                                  }
                                } else {
                                  window.location.hash = slug;
                                }
                              }
                            : undefined
                        }
                      >
                        <h4 id={itemId} className={cn(finalQuestionClassName)}>
                          {questionHtml}
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent
                        id={contentId}
                        aria-labelledby={triggerId}
                        className={cn(
                          "px-5 transition-all duration-300 ease-in-out",
                          finalAnswerClassName
                        )}
                      >
                        <SafeHtmlRenderer
                          content={markdownToHtml(item.answer)}
                          herokit-id={generateAnswerHerokitId(itemId)}
                          className={cn(
                            finalAnswerClassName,
                            "[&_li]:mb-2 [&_p]:mb-4 [&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc"
                          )}
                          tag="div"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  );
                  globalIndex++;
                });

                // Render category section with title and accordion
                renderedSections.push(
                  <div key={`category-section-${categoryTitle}`}>
                    <div
                      className={cn(
                        "px-5",
                        isFirstCategory ? "mt-0" : "mt-8 mb-2"
                      )}
                    >
                      <h3
                        className={cn(finalCategoryTitleClassName)}
                        herokit-id="ac7ac67f-fa5e-4217-b6ce-e93de53f4faf"
                      >
                        {categoryTitle}
                      </h3>
                    </div>
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={
                        isFirstCategory ? getDefaultValue() : undefined
                      }
                      className={cn(
                        "w-full !cursor-pointer",
                        accordionClassName
                      )}
                      aria-label={ariaLabel}
                      herokit-id="bf659633-bcbf-4df1-9cdf-117d5ecee856"
                    >
                      {categoryAccordionItems}
                    </Accordion>
                  </div>
                );
                isFirstCategory = false;
              });

              // Render ungrouped items (items without categoryTitle)
              if (ungroupedItems.length > 0) {
                const ungroupedAccordionItems: React.ReactNode[] = [];
                ungroupedItems.forEach(({ item }) => {
                  const questionHtml = item.question || "";
                  const questionText = questionHtml.replace(/<[^>]+>/g, "");
                  // Ensure slug and itemId always match - use item.id or generate from question
                  const itemId =
                    item.id ||
                    createSlug(questionText) ||
                    `faq-item-${globalIndex}`;
                  const slug = itemId; // Slug should match itemId exactly
                  const accordionValue = `item-${globalIndex + 1}`;
                  const contentId = `faq-content-${itemId}`;
                  const triggerId = `faq-trigger-${itemId}`;
                  // Use globalIndex in key to ensure uniqueness even with duplicate questions
                  const uniqueKey = `${itemId}-${globalIndex}`;

                  ungroupedAccordionItems.push(
                    <AccordionItem
                      key={uniqueKey}
                      value={accordionValue}
                      className={cn(finalItemClassName)}
                    >
                      <AccordionTrigger
                        id={triggerId}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition [&[data-state=open]>svg]:rotate-180"
                        aria-controls={contentId}
                        icon={ArrowIcon}
                        iconClassName={cn(
                          "text-primary h-5 w-5 transition-transform",
                          arrowClassName
                        )}
                        onClick={
                          enableAnchorLinks
                            ? (e) => {
                                // Don't prevent default - let accordion toggle normally
                                // Set hash using pushState to avoid browser's default scroll behavior
                                const currentHash = window.location.hash;
                                if (history.pushState) {
                                  history.pushState(null, "", `#${slug}`);
                                  // Manually trigger hashchange event only if hash actually changed
                                  if (currentHash !== `#${slug}`) {
                                    window.dispatchEvent(
                                      new Event("hashchange")
                                    );
                                  }
                                } else {
                                  window.location.hash = slug;
                                }
                              }
                            : undefined
                        }
                      >
                        <SafeHtmlRenderer
                          content={questionHtml}
                          className={cn(finalQuestionClassName)}
                          tag="h4"
                        />
                      </AccordionTrigger>
                      <AccordionContent
                        id={contentId}
                        aria-labelledby={triggerId}
                        className={cn(
                          "px-5 transition-all duration-300 ease-in-out",
                          finalAnswerClassName
                        )}
                      >
                        <SafeHtmlRenderer
                          content={markdownToHtml(item.answer)}
                          herokit-id={generateAnswerHerokitId(itemId)}
                          className={cn(
                            finalAnswerClassName,
                            "[&_li]:mb-2 [&_p]:mb-4 [&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc"
                          )}
                          tag="div"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  );
                  globalIndex++;
                });

                renderedSections.push(
                  <Accordion
                    key="ungrouped-accordion"
                    type="single"
                    collapsible
                    className={cn("w-full !cursor-pointer", accordionClassName)}
                    aria-label={ariaLabel}
                    herokit-id="11862637-3f74-4522-b1c7-938be59e63ad"
                  >
                    {ungroupedAccordionItems}
                  </Accordion>
                );
              }

              return renderedSections;
            })()}
          </div>
        </div>
      </section>
    );
  }

  // Render default variant (using shadcn/ui Accordion)
  return (
    <section
      className={finalSectionClassName}
      id={sectionId}
      aria-labelledby={showTitle ? `${sectionId}-title` : undefined}
      aria-describedby={ariaDescribedBy}
    >
      <div
        className="container mx-auto max-w-4xl"
        data-hero-page-element-id="810473075690"
        herokit-id="18b2c564-a3a7-49a5-96ac-0d0be6343b41"
      >
        {showTitle && (
          <div
            className={finalTitleWrapperClassName}
            herokit-id="5cdbe034-b252-4347-b291-df18ff12e408"
          >
            <Heading
              id={`${sectionId}-title`}
              className={finalTitleClassName}
              level={renderAsH1 ? 1 : 2}
              underline={renderAsH1 ? false : underline}
              herokit-id="b0743610-2c0e-4a0f-b574-7fd48548b22a"
            >
              {title}
            </Heading>
            {subtitle && (
              <p
                id={`${sectionId}-subtitle`}
                className={finalSubtitleClassName}
                herokit-id="7e0ce219-9477-40b0-a2fb-4458e7828fc0"
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          className="mx-auto max-w-4xl"
          data-hero-page-element-id="810473075691"
        >
          <Accordion
            type="single"
            collapsible
            className={cn("w-full !cursor-pointer", accordionClassName)}
            aria-label={ariaLabel}
            data-hero-page-element-id="810473075692"
            herokit-id="b1e555c8-2a90-4fcd-90f1-e24292ab602b"
          >
            {allFaqItems.map(({ item, groupName, globalIndex }) => {
              const questionHtml = item.question || "";
              const questionText = questionHtml.replace(/<[^>]+>/g, "");
              // Ensure slug and itemId always match
              const itemId =
                item.id ||
                createSlug(questionText) ||
                `faq-item-${globalIndex}`;
              const slug = itemId; // Slug should match itemId exactly
              const accordionValue = `item-${globalIndex + 1}`;
              const contentId = `faq-content-${itemId}`;
              const triggerId = `faq-trigger-${itemId}`;

              return (
                <div
                  key={`faq-${itemId}`}
                  herokit-id="69025eba-3246-4795-9bb2-f1e432f9b3a5"
                >
                  {/* Render group heading if this is the first item in a group */}
                  {isGrouped &&
                    groupName &&
                    (() => {
                      const isFirstInGroup =
                        globalIndex === 0 ||
                        allFaqItems[globalIndex - 1]?.groupName !== groupName;
                      return isFirstInGroup ? (
                        <Heading
                          className={finalGroupTitleClassName}
                          level={3}
                          underline={false}
                          herokit-id="44160c91-3bfc-4c73-8c55-3c66f38ea3d0"
                        >
                          {groupName}
                        </Heading>
                      ) : null;
                    })()}
                  <AccordionItem
                    value={accordionValue}
                    className={finalAccordionItemClassName}
                  >
                    <AccordionTrigger
                      id={triggerId}
                      className={finalTriggerClassName}
                      aria-controls={contentId}
                      onClick={
                        enableAnchorLinks
                          ? (e) => {
                              // Don't prevent default - let accordion toggle normally
                              // Set hash using pushState to avoid browser's default scroll behavior
                              const currentHash = window.location.hash;
                              if (history.pushState) {
                                history.pushState(null, "", `#${slug}`);
                                // Manually trigger hashchange event only if hash actually changed
                                if (currentHash !== `#${slug}`) {
                                  window.dispatchEvent(new Event("hashchange"));
                                }
                              } else {
                                window.location.hash = slug;
                              }
                            }
                          : undefined
                      }
                    >
                      <SafeHtmlRenderer
                        content={questionHtml}
                        id={`${itemId}`}
                        className={finalTriggerClassName}
                        tag="h4"
                      />
                    </AccordionTrigger>
                    <AccordionContent
                      id={contentId}
                      aria-labelledby={triggerId}
                      data-hero-page-element-id="810473075693"
                    >
                      <div
                        className="prose max-w-none"
                        data-hero-page-element-id="810473075694"
                      >
                        <SafeHtmlRenderer
                          content={markdownToHtml(item.answer)}
                          herokit-id={generateAnswerHerokitId(itemId)}
                          className={cn(
                            finalAnswerClassName,
                            "[&_li]:mb-2 [&_p]:mb-4 [&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc"
                          )}
                          tag="div"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
