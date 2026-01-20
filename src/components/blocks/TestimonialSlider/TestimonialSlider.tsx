import type { FC } from "react";

import { Section, Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/blocks/Heading/Heading";
import { TestimonialSliderScrollButtons } from "./TestimonialSliderScrollButtons";

export interface TestimonialItem {
  message: string;
  name: string;
  role?: string;
}

export interface TestimonialSliderControls {
  previousLabel?: string;
  nextLabel?: string;
  showDesktopArrows?: boolean;
  showMobileArrows?: boolean;
}

export interface TestimonialSliderProps {
  title: string;
  subtitle?: string;
  description?: string;
  reviews: TestimonialItem[];
  sectionId?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  headerClassName?: string;
  listClassName?: string;
  reviewCardClassName?: string;
  controls?: TestimonialSliderControls;
  ariaLabel?: string;
}

const DEFAULT_CONTROLS: Required<TestimonialSliderControls> = {
  previousLabel: "Vorherige Bewertungen",
  nextLabel: "Nächste Bewertungen",
  showDesktopArrows: true,
  showMobileArrows: true,
};

export const TestimonialSlider: FC<TestimonialSliderProps> = ({
  title,
  subtitle,
  description,
  reviews,
  sectionId = "user-reviews",
  className,
  containerClassName,
  titleClassName,
  headerClassName,
  listClassName,
  reviewCardClassName,
  controls,
  ariaLabel = "Kundenbewertungen",
}) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const mergedControls = { ...DEFAULT_CONTROLS, ...controls };
  const scrollContainerId = `${sectionId}-list`;

  return (
    <Section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className={cn("bg-[#F4F8F7]", className)}
    >
      <Container
        className={cn(
          "mx-auto flex w-full flex-col gap-6 py-[60px] md:gap-10 lg:py-[120px]",
          containerClassName
        )}
        herokit-id="8fc56402-d0e4-464a-ac32-811a8a32a019"
      >
        <header
          className={cn(
            "flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-0",
            headerClassName
          )}
          herokit-id="c7803719-da3b-4c33-9977-a007fe82960c"
        >
          <div
            className="space-y-3"
            role="group"
            aria-labelledby={`${sectionId}-title`}
            herokit-id="2a90d710-d8a3-4716-85df-bc37072364c9"
          >
            <Heading
              level={2}
              id={`${sectionId}-title`}
              className={cn(
                "text-[16px] !font-medium md:text-[32px]",
                titleClassName
              )}
              herokit-id="14c4dae8-a19a-4cbd-96fb-1567808c0e3e"
            >
              {title}
            </Heading>
            {subtitle && (
              <p
                className="text-muted-foreground text-base md:text-lg"
                herokit-id="13789857-2cbf-4f52-8c8c-5b56e34c9990"
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="text-muted-foreground/90 text-base md:text-lg"
                herokit-id="d092920c-e767-4442-a5e9-c3603fb35891"
              >
                {description}
              </p>
            )}
          </div>

          {mergedControls.showDesktopArrows && (
            <TestimonialSliderScrollButtons
              className="hidden items-center gap-4 md:flex"
              containerId={scrollContainerId}
              previousLabel={mergedControls.previousLabel}
              nextLabel={mergedControls.nextLabel}
              ariaHidden
            />
          )}
        </header>

        <div
          id={scrollContainerId}
          role="list"
          aria-label={ariaLabel}
          aria-live="polite"
          tabIndex={0}
          className={cn(
            "flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth",
            "px-4 md:px-0",
            "snap-x snap-mandatory",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            listClassName
          )}
          herokit-id="978f1d89-9968-4e4e-a97f-897413846211"
        >
          {reviews.map((review, index) => {
            const reviewId = `${sectionId}-review-${index}`;
            const authorId = `${reviewId}-author`;
            return (
              <div
                key={`${review.name}-${review.message}`}
                role="listitem"
                aria-labelledby={authorId}
                aria-describedby={`${reviewId}-message`}
                className={cn(
                  "border-border flex h-full min-h-[304px] flex-shrink-0 flex-col rounded-[0.5rem] border p-6",
                  "w-full snap-start",
                  "sm:w-[calc(100%-16px)]",
                  "md:w-[calc((100%-24px)/2)]",
                  "xl:w-[500px]",
                  reviewCardClassName
                )}
              >
                <blockquote
                  id={`${reviewId}-message`}
                  className="text-base leading-relaxed font-medium text-[#273238] md:text-xl"
                  herokit-id="ffd5f4aa-61ee-4f7f-996a-a99573c5ead1"
                >
                  {review.message}
                </blockquote>
                <footer
                  id={authorId}
                  role="group"
                  className="flex flex-col gap-4"
                  aria-label={`Autor: ${review.name}${review.role ? `, ${review.role}` : ""}`}
                  herokit-id="2ed8c9ee-3e27-4ed6-a59a-c23821b43003"
                >
                  <span
                    className="text-base font-medium text-[#273238]"
                    herokit-id="103bdfa8-2ebc-4459-beee-5193e2fcb27c"
                  >
                    {review.name}
                  </span>
                  {review.role && (
                    <span
                      className="text-sm font-normal text-[#515A5F]"
                      herokit-id="21e4e0c6-db0f-4dc3-822a-0adccde51363"
                    >
                      {review.role}
                    </span>
                  )}
                </footer>
              </div>
            );
          })}
        </div>

        {mergedControls.showMobileArrows && (
          <TestimonialSliderScrollButtons
            className="flex items-center justify-end gap-4 px-4 md:hidden"
            containerId={scrollContainerId}
            previousLabel={mergedControls.previousLabel}
            nextLabel={mergedControls.nextLabel}
          />
        )}
      </Container>
    </Section>
  );
};
