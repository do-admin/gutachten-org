"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Callback function when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom text for the "Back" button (default: "Zurück")
   */
  backLabel?: string;
  /**
   * Custom text for the "Next" button (default: "Weiter")
   */
  nextLabel?: string;
  /**
   * Maximum number of page numbers to show before/after current page
   * @default 2
   */
  maxVisiblePages?: number;
}

/**
 * Pagination component matching the exact design from the image.
 * Features:
 * - "Zurück" button with left arrow (light gray border, white background, dark gray text)
 * - Page numbers (1, 2, 3, ..., 8) in dark gray
 * - "Weiter" button with right arrow (dark gray background, orange text and icon)
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  backLabel = "Zurück",
  nextLabel = "Weiter",
  maxVisiblePages = 2,
}) => {
  // Calculate which page numbers to display
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > maxVisiblePages * 2 + 3;

    if (!showEllipsis) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible range around current page
    let start = Math.max(2, currentPage - maxVisiblePages);
    let end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

    // Adjust if we're near the start
    if (currentPage <= maxVisiblePages + 2) {
      end = Math.min(totalPages - 1, maxVisiblePages * 2 + 2);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - maxVisiblePages - 1) {
      start = Math.max(2, totalPages - maxVisiblePages * 2 - 1);
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("ellipsis");
    }

    // Add visible page range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // For mobile, show fewer page numbers
  const getMobilePageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      return pageNumbers;
    }

    const mobilePages: (number | "ellipsis")[] = [];

    // Always show first page
    mobilePages.push(1);

    // Show current page and adjacent pages
    if (currentPage > 2 && currentPage < totalPages - 1) {
      if (currentPage > 3) {
        mobilePages.push("ellipsis");
      }
      mobilePages.push(currentPage - 1);
      mobilePages.push(currentPage);
      if (currentPage < totalPages - 2) {
        mobilePages.push(currentPage + 1);
        mobilePages.push("ellipsis");
      } else {
        mobilePages.push(currentPage + 1);
      }
    } else if (currentPage <= 2) {
      // Near the start
      for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
        mobilePages.push(i);
      }
      if (totalPages > 5) {
        mobilePages.push("ellipsis");
      }
    } else {
      // Near the end
      if (totalPages > 5) {
        mobilePages.push("ellipsis");
      }
      for (let i = Math.max(2, totalPages - 3); i < totalPages; i++) {
        mobilePages.push(i);
      }
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      mobilePages.push(totalPages);
    }

    return mobilePages;
  };

  const mobilePageNumbers = getMobilePageNumbers();

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={cn(
        "flex w-full items-center justify-center gap-2 sm:gap-[64px]",
        className
      )}
      aria-label="Pagination"
    >
      {/* Zurück (Back) Button */}
      <button
        onClick={handlePrevious}
        disabled={isFirstPage}
        className={cn(
          "flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border px-4 py-2.5 text-sm font-medium transition-all",
          "sm:px-4.5 sm:py-2",
          "border-gray-300 bg-white text-gray-700",
          "hover:border-gray-400 hover:bg-gray-50",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white",
          "focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none",
          "active:bg-gray-100"
        )}
        aria-label={backLabel}
      >
        <ArrowLeft className="h-4 w-4 sm:h-4 sm:w-4" />
        <span
          className="hidden sm:inline"
          herokit-id="5775cf6f-d75a-4e7f-8b7f-1b7b2431536d"
        >
          {backLabel}
        </span>
      </button>

      {/* Page Numbers - Show mobile version on small screens, desktop version on larger */}
      <div
        className="flex flex-1 items-center justify-center gap-2 overflow-x-auto sm:flex-none sm:gap-[64px]"
        herokit-id="4afb6219-0bdd-415c-ae75-d54972e67f1d"
      >
        {/* Mobile: Show fewer page numbers */}
        <div className="flex min-w-0 items-center gap-2 sm:hidden">
          {mobilePageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-mobile-${index}`}
                  className="px-2 text-sm text-gray-700"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={`mobile-${page}`}
                onClick={() => handlePageClick(page)}
                className={cn(
                  "cursor-pointer min-h-[44px] min-w-[44px] rounded-[8px] px-3 py-2 text-sm font-medium transition-colors",
                  "text-gray-700",
                  "hover:bg-gray-100 hover:text-gray-900",
                  "focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none",
                  "active:bg-gray-200",
                  isActive && "bg-gray-100 font-semibold"
                )}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Desktop: Show full page numbers */}
        <div className="hidden min-w-0 items-center gap-[64px] sm:flex">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-gray-700"
                  aria-hidden="true"
                  herokit-id="b88b60ba-ce1f-4c33-988e-a2a4774dff54"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            // Active page: Dark button with white text
            if (isActive) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={cn(
                    "cursor-pointer rounded-[8px] px-3 py-2 text-sm font-medium transition-colors",
                    "bg-gray-800 text-white",
                    "hover:bg-gray-900",
                    "focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                  )}
                  aria-label={`Go to page ${page}`}
                  aria-current="page"
                  herokit-id="9f5c2929-1a83-4bb5-8d05-208af6cf89d9"
                >
                  {page}
                </button>
              );
            }

            // Inactive pages: Simple text labels (not buttons)
            return (
              <span
                key={page}
                onClick={() => handlePageClick(page)}
                className="cursor-pointer px-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePageClick(page);
                  }
                }}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </span>
            );
          })}
        </div>
      </div>

      {/* Weiter (Next) Button */}
      <button
        onClick={handleNext}
        disabled={isLastPage}
        className={cn(
          "flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-medium transition-all",
          "sm:px-4.5 sm:py-2",
          "bg-gray-800 text-white",
          "hover:bg-gray-900/90 hover:text-white",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-800 disabled:hover:text-orange-500",
          "focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none",
          "active:bg-gray-900"
        )}
        aria-label={nextLabel}
      >
        <span
          className="hidden sm:inline"
          herokit-id="0eae4cb2-8d30-4816-8760-24346dd3bce7"
        >
          {nextLabel}
        </span>
        <ArrowRight className="h-4 w-4 text-[#FF914C] sm:h-4 sm:w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
