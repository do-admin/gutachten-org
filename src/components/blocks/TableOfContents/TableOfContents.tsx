"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@/lib/extract-headings";
import { cn } from "@/lib/utils";

export interface TableOfContentsProps {
  // Main content
  headings: Heading[];

  // Styling
  className?: string;
  title?: string;
  titleClassName?: string;
  containerClassName?: string;
  stickyTop?: string;
  listClassName?: string;
  linkBaseClassName?: string;

  // Behavior
  scrollOffset?: number;
  activeHeadingClassName?: string;
  inactiveHeadingClassName?: string;

  // Accessibility
  ariaLabel?: string;

  // Additional props
  [key: string]: unknown;
}

/**
 * Sticky Table of Contents Component
 * Matches the design from gutachten.org
 * Automatically highlights the active section while scrolling
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  className = "",
  title = "Themenübersicht",
  titleClassName = "",
  containerClassName = "",
  stickyTop = "top-24",
  scrollOffset = 100,
  activeHeadingClassName = "",
  inactiveHeadingClassName = "",
  ariaLabel = "Table of contents",
  listClassName = "",
  linkBaseClassName = "inline-block text-sm leading-relaxed transition-colors",
  ...props
}) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active heading
    const firstHeading = headings[0];
    if (firstHeading) {
      const element = document.getElementById(firstHeading.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) {
          setActiveId(firstHeading.id);
        }
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without triggering scroll
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  // Default classes for active/inactive states
  const defaultActiveClass = "font-semibold text-gray-900";
  const defaultInactiveClass = "font-normal text-gray-700 hover:text-gray-900";

  // Determine if should be sticky based on stickyTop prop
  const isSticky = stickyTop && stickyTop.trim() !== "";
  const wrapperClasses = isSticky
    ? cn("sticky self-start", stickyTop, className)
    : cn("static", className);

  return (
    <div className={wrapperClasses} id="table-of-contents-wrapper" {...props}>
      <div
        className={cn("rounded-lg bg-white p-6 shadow-sm", containerClassName)}
      >
        <h2
          className={cn(
            "mb-4 text-base font-bold text-gray-900",
            titleClassName
          )}
        >
          {title}
        </h2>
        <nav aria-label={ariaLabel}>
          <ul className={cn("space-y-2", listClassName)}>
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <li
                  key={heading.id}
                  className="flex items-start gap-3"
                  style={{
                    marginLeft:
                      heading.level > 2
                        ? `${(heading.level - 2) * 0.75}rem`
                        : "0.5rem",
                  }}
                >
                  <div className="custom-dot-marker-dot" />
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className={cn(
                      linkBaseClassName,
                      isActive
                        ? activeHeadingClassName || defaultActiveClass
                        : inactiveHeadingClassName || defaultInactiveClass
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
