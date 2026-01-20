"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StickyScrollButtonProps {
  // Main content
  targetId: string;
  children: React.ReactNode;

  // Visual elements
  icon?: LucideIcon;
  iconPosition?: "left" | "right";

  // Styling
  className?: string;
  variant?: "default" | "button" | "link" | "ghost";
  size?: "sm" | "md" | "lg";

  // Behavior
  stickyHeaderSelector?: string;
  scrollContainerSelector?: string;
  scrollBehavior?: "smooth" | "auto" | "instant";
  disabled?: boolean;
  title?: string;

  // Accessibility
  ariaLabel?: string;

  // Additional props
  [key: string]: unknown;
}

export const StickyScrollButton = ({
  targetId,
  children,
  icon: Icon,
  iconPosition = "left",
  className = "",
  variant = "default",
  size = "md",
  stickyHeaderSelector = '[data-hero-page-element-id="810473075558"]',
  scrollContainerSelector,
  scrollBehavior = "smooth",
  disabled = false,
  title,
  ariaLabel,
  ...props
}: StickyScrollButtonProps) => {
  // Handle click with custom scroll behavior for sticky headers
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (disabled || !targetId) return;

    const element = document.getElementById(targetId);
    if (!element) {
      console.warn(`Element with id "${targetId}" not found`);
      return;
    }

    // Find the scroll container (if specified) or use window
    const scrollContainer = scrollContainerSelector
      ? (document.querySelector(scrollContainerSelector) as HTMLElement)
      : null;

    if (scrollContainer) {
      // Scroll within container
      // Calculate element position by walking up from element to scroll container
      let elementTop = 0;
      let currentElement: HTMLElement | null = element as HTMLElement;
      
      // Walk up the DOM tree until we reach the scroll container
      while (currentElement && currentElement !== scrollContainer) {
        elementTop += currentElement.offsetTop;
        const parent = currentElement.offsetParent as HTMLElement | null;
        
        // Stop if we've reached the scroll container or document body
        if (!parent || parent === scrollContainer) {
          break;
        }
        
        // If parent is body or html, we've gone too far
        if (parent === document.body || parent === document.documentElement) {
          // Recalculate using getBoundingClientRect as fallback
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const currentScrollTop = scrollContainer.scrollTop;
          const elementTopRelativeToContainer = elementRect.top - containerRect.top + currentScrollTop;
          
          scrollContainer.scrollTo({
            top: Math.max(0, elementTopRelativeToContainer),
            behavior: scrollBehavior,
          });
          return;
        }
        
        currentElement = parent;
      }
      
      scrollContainer.scrollTo({
        top: Math.max(0, elementTop),
        behavior: scrollBehavior,
      });
    } else {
      // Scroll window
      // Calculate sticky header height dynamically
      let offset = 0;
      const stickyHeader = document.querySelector(stickyHeaderSelector);
      if (stickyHeader) {
        const rect = stickyHeader.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(stickyHeader);
        const topValue = computedStyle.top;
        const topPx = topValue === "auto" ? 0 : parseFloat(topValue) || 0;
        offset = rect.height + topPx;
      }
      // Scroll window
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;

      window.scrollTo({
        top: elementTop - offset,
        behavior: scrollBehavior,
      });
    }
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "button":
        return "inline-flex items-center justify-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors";
      case "link":
        return "text-accent hover:text-accent/80 underline transition-colors";
      case "ghost":
        return "inline-flex items-center justify-center px-4 py-2 hover:bg-gray-100 rounded-md transition-colors";
      default:
        return "cursor-pointer transition-colors inline";
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-sm px-2 py-1";
      case "lg":
        return "text-lg px-6 py-3";
      default:
        return "text-base px-4 py-2";
    }
  };

  // Generate title
  const buttonTitle = title || `Scroll to ${targetId}`;
  const buttonAriaLabel = ariaLabel || `Scroll to ${targetId}`;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !targetId}
      title={buttonTitle}
      aria-label={buttonAriaLabel}
      className={cn(
        getVariantStyles(),
        variant !== "default" && getSizeStyles(),
        (disabled || !targetId) && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
      herokit-id="7625e40f-c8d1-4e7a-905c-7a6b55971984"
    >
      {Icon && iconPosition === "left" && <Icon className="mr-2 h-4 w-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="ml-2 h-4 w-4" />}
    </button>
  );
};

