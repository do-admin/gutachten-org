"use client";

import { useCallback, type FC } from "react";
import { cn } from "@/lib/utils";

interface LetterAnchor {
  letter: string;
  anchorId: string | null;
}

interface LexikonLetterSelectorProps {
  letterAnchors: LetterAnchor[];
  scrollableContent?: boolean;
  stickyTableOfContents?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export const LexikonLetterSelector: FC<LexikonLetterSelectorProps> = ({
  letterAnchors,
  scrollableContent = false,
  stickyTableOfContents = false,
  className,
  labelClassName,
  selectClassName,
}) => {
  const handleLetterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      const selectedLetter = event.target.value;
      if (!selectedLetter) {
        event.currentTarget.value = "";
        return;
      }

      const match = letterAnchors.find(
        (item) => item.letter === selectedLetter
      );
      if (!match || !match.anchorId) {
        event.currentTarget.value = "";
        return;
      }

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Double-check anchorId exists (TypeScript safety)
        if (!match.anchorId) {
          event.currentTarget.value = "";
          return;
        }

        const targetElement = document.getElementById(match.anchorId);
        if (!targetElement) {
          console.warn(
            `Lexikon: Could not find element with id "${match.anchorId}"`
          );
          event.currentTarget.value = "";
          return;
        }

        // Find the scroll container (if scrollableContent is true)
        const scrollContainer = scrollableContent
          ? (document.querySelector(
              '[data-hero-page-element-id="810473075561"]'
            ) as HTMLElement)
          : null;

        if (scrollContainer) {
          // Scroll within container - use same logic as StickyScrollButton or SmoothScrollButton
          if (stickyTableOfContents) {
            // Use StickyScrollButton logic: calculate element position by walking up from element to scroll container
            let elementTop = 0;
            let currentElement: HTMLElement | null =
              targetElement as HTMLElement;

            // Walk up the DOM tree until we reach the scroll container
            while (currentElement && currentElement !== scrollContainer) {
              elementTop += currentElement.offsetTop;
              const parent = currentElement.offsetParent as HTMLElement | null;

              // Stop if we've reached the scroll container or document body
              if (!parent || parent === scrollContainer) {
                break;
              }

              // If parent is body or html, we've gone too far
              if (
                parent === document.body ||
                parent === document.documentElement
              ) {
                // Recalculate using getBoundingClientRect as fallback
                const containerRect = scrollContainer.getBoundingClientRect();
                const elementRect = targetElement.getBoundingClientRect();
                const currentScrollTop = scrollContainer.scrollTop;
                const elementTopRelativeToContainer =
                  elementRect.top - containerRect.top + currentScrollTop;

                scrollContainer.scrollTo({
                  top: Math.max(0, elementTopRelativeToContainer),
                  behavior: "smooth",
                });
                // Reset select after scrolling
                setTimeout(() => {
                  event.currentTarget.value = "";
                }, 100);
                return;
              }

              currentElement = parent;
            }

            scrollContainer.scrollTo({
              top: Math.max(0, elementTop),
              behavior: "smooth",
            });
          } else {
            // Use SmoothScrollButton logic: use getBoundingClientRect
            const containerRect = scrollContainer.getBoundingClientRect();
            const elementRect = targetElement.getBoundingClientRect();
            const currentScrollTop = scrollContainer.scrollTop;
            const elementTopRelativeToContainer =
              elementRect.top - containerRect.top + currentScrollTop;

            scrollContainer.scrollTo({
              top: Math.max(0, elementTopRelativeToContainer),
              behavior: "smooth",
            });
          }
        } else {
          // Scroll window - use same logic as StickyScrollButton or SmoothScrollButton
          if (stickyTableOfContents) {
            // Use StickyScrollButton logic: calculate sticky header height dynamically
            let offset = 0;
            const stickyHeaderSelector =
              '[data-hero-page-element-id="810473075558"]';
            const stickyHeader = document.querySelector(stickyHeaderSelector);
            if (stickyHeader) {
              const rect = stickyHeader.getBoundingClientRect();
              const computedStyle = window.getComputedStyle(stickyHeader);
              const topValue = computedStyle.top;
              const topPx = topValue === "auto" ? 0 : parseFloat(topValue) || 0;
              offset = rect.height + topPx;
            }
            // Scroll window
            const elementRect = targetElement.getBoundingClientRect();
            const elementTop = elementRect.top + window.pageYOffset;

            window.scrollTo({
              top: elementTop - offset,
              behavior: "smooth",
            });
          } else {
            // Use SmoothScrollButton logic: use scrollIntoView which respects CSS scroll-margin
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }
        }

        // Reset select after scrolling
        setTimeout(() => {
          event.currentTarget.value = "";
        }, 100);
      });
    },
    [letterAnchors, scrollableContent, stickyTableOfContents]
  );

  return (
    <div className={cn("mb-4 md:hidden", className)}>
      <label
        htmlFor="lexikon-letter-select"
        className={cn(
          "mb-2 block text-sm font-medium text-gray-700",
          labelClassName
        )}
      >
        Buchstabe auswählen
      </label>
      <select
        id="lexikon-letter-select"
        className={cn(
          "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none",
          selectClassName
        )}
        defaultValue=""
        onChange={handleLetterChange}
      >
        <option value="">Bitte auswählen</option>
        {letterAnchors
          .filter((item) => item.anchorId)
          .map((item) => (
            <option key={item.letter} value={item.letter}>
              {item.letter}
            </option>
          ))}
      </select>
    </div>
  );
};
