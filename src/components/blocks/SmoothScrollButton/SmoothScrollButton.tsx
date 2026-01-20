"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

export interface SmoothScrollButtonProps {
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
  scrollOffset?: number;
  scrollBehavior?: "smooth" | "auto" | "instant";
  scrollContainerSelector?: string;
  title?: string;

  // Accessibility
  ariaLabel?: string;

  // Additional props
  [key: string]: unknown;
}

export const SmoothScrollButton = ({
  targetId,
  children,
  icon: Icon,
  iconPosition = "left",
  className = "",
  variant = "default",
  size = "md",
  scrollOffset = 0,
  scrollBehavior = "smooth",
  scrollContainerSelector,
  title,
  ariaLabel,
  ...props
}: SmoothScrollButtonProps) => {
  // Handle click with custom scroll behavior
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (!element) return;

    // Find the scroll container (if specified) or use window
    const scrollContainer = scrollContainerSelector
      ? (document.querySelector(scrollContainerSelector) as HTMLElement)
      : null;

    if (scrollContainer) {
      // Scroll within container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const currentScrollTop = scrollContainer.scrollTop;
      const elementTopRelativeToContainer = elementRect.top - containerRect.top + currentScrollTop;
      
      scrollContainer.scrollTo({
        top: Math.max(0, elementTopRelativeToContainer - (scrollOffset || 0)),
        behavior: scrollBehavior,
      });
    } else {
      // Use scrollIntoView which respects CSS scroll-margin
      // This ensures proper positioning with fixed headers
      element.scrollIntoView({
        behavior: scrollBehavior,
        block: "start",
        inline: "nearest",
      });

      // Apply additional scrollOffset if specified
      if (scrollOffset !== 0) {
        // Use setTimeout to ensure scrollIntoView completes first
        setTimeout(
          () => {
            window.scrollBy({
              top: -scrollOffset,
              behavior: scrollBehavior === "instant" ? "auto" : scrollBehavior,
            });
          },
          scrollBehavior === "instant" ? 0 : 10
        );
      }
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
    <Link
      href={`#${targetId}`}
      title={buttonTitle}
      aria-label={buttonAriaLabel}
      className={cn(
        getVariantStyles(),
        variant !== "default" && getSizeStyles(),
        className
      )}
      onClick={handleClick}
      {...props}
      herokit-id="5a230285-43b9-4615-b627-6252a829876d"
    >
      {Icon && iconPosition === "left" && <Icon className="mr-2 h-4 w-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="ml-2 h-4 w-4" />}
    </Link>
  );
};
