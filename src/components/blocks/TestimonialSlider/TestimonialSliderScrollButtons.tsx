"use client";

import { useCallback, type FC } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TestimonialSliderScrollButtonsProps {
  containerId: string;
  previousLabel: string;
  nextLabel: string;
  className?: string;
  buttonClassName?: string;
  ariaHidden?: boolean;
}

export const TestimonialSliderScrollButtons: FC<
  TestimonialSliderScrollButtonsProps
> = ({
  containerId,
  previousLabel,
  nextLabel,
  className,
  buttonClassName,
  ariaHidden,
}) => {
  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      const container = document.getElementById(containerId);

      if (!(container instanceof HTMLElement)) {
        return;
      }

      // Find the first visible card
      const firstCard = container.querySelector<HTMLElement>(
        'div[role="listitem"]'
      );
      let scrollAmount = 360;

      if (firstCard) {
        const { width } = firstCard.getBoundingClientRect();
        const style = window.getComputedStyle(container);
        const gapValue = parseFloat(style.columnGap || style.gap || "0") || 0;
        scrollAmount = width + gapValue;
      }

      const distance = (direction === "left" ? -1 : 1) * scrollAmount;
      container.scrollBy({ left: distance, behavior: "smooth" });
    },
    [containerId]
  );

  return (
    <div
      role="toolbar"
      aria-label="Bewertungen navigieren"
      className={className}
      aria-hidden={ariaHidden}
    >
      <Button
        type="button"
        variant="secondary"
        size="lg"
        aria-label={previousLabel}
        onClick={() => handleScroll("left")}
        tabIndex={ariaHidden ? -1 : undefined}
        className={cn(
          "h-12 w-[52px] rounded-[0.5rem] bg-[#273238] px-4 py-3 text-white hover:bg-[#273238]/80",
          buttonClassName
        )}
      >
        <ArrowLeft className="h-5 w-5" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        aria-label={nextLabel}
        onClick={() => handleScroll("right")}
        tabIndex={ariaHidden ? -1 : undefined}
        className={cn(
          "h-12 w-[52px] rounded-[0.5rem] bg-[#273238] px-4 py-3 text-white hover:bg-[#273238]/80",
          buttonClassName
        )}
      >
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Button>
    </div>
  );
};
