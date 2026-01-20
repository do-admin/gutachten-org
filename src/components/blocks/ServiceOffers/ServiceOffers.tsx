"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/blocks/Heading/Heading";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface OfferCard {
  id?: string;
  icon: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  external?: boolean;
  iconClassName?: string;
  cardClassName?: string;
  cardContentClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  buttonClassName?: string;
  buttonIconClassName?: string;
}

export interface ServiceOffersProps {
  title?: string;
  subtitle?: string;
  moreInfoText?: string;
  moreInfoLink?: string;
  featuredCard?: OfferCard;
  cards?: OfferCard[];
  // Section styling
  className?: string;
  sectionClassName?: string;
  backgroundClassName?: string;
  containerClassName?: string;
  // Header/Title section
  showTitle?: boolean;
  showSubtitle?: boolean;
  showMoreInfoButton?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  headerClassName?: string;
  // Button styling
  moreInfoButtonClassName?: string;
  cardButtonClassName?: string;
  cardButtonIconClassName?: string;
  // Card styling
  cardClassName?: string;
  cardContentClassName?: string;
  iconClassName?: string;
  iconWidth?: number;
  iconHeight?: number;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  // Layout
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
  gridContainerClassName?: string;
  enableHoverEffect?: boolean;
  hoverClassName?: string;
  // Content
  sectionId?: string;
}

// Constants
const GRID_COLUMNS_MAP: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
} as const;

const DEFAULT_ICON_SIZE = 36;
const DEFAULT_COLUMNS: 1 | 2 | 3 | 4 = 3;
const DEFAULT_GAP = "gap-6";

// Sub-components for better organization
interface CardButtonProps {
  card: OfferCard;
  cardButtonClassName?: string;
  cardButtonIconClassName?: string;
  isCardClickable?: boolean;
}

const CardButton: React.FC<CardButtonProps> = ({
  card,
  cardButtonClassName,
  cardButtonIconClassName,
  isCardClickable = false,
}) => {
  const buttonContent = (
    <>
      {card.buttonText}
      <ArrowUpRight
        className={cn(
          "h-4 w-4 text-[#FF985C]",
          card.buttonIconClassName,
          cardButtonIconClassName
        )}
      />
    </>
  );

  const buttonClassName = cn(
    "mt-4 w-full rounded-[8px] px-4.5 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm",
    card.buttonClassName,
    cardButtonClassName
  );

  // If the card is already clickable, render just a button (not a link)
  if (isCardClickable) {
    return (
      <div
        className={buttonClassName}
        role="button"
        aria-label={card.buttonText}
      >
        {buttonContent}
      </div>
    );
  }

  // Otherwise, render as before with Link wrapper
  if (card.buttonLink) {
    if (card.external) {
      return (
        <Link href={card.buttonLink} target="_blank" rel="noopener noreferrer">
          <Button
            variant="default"
            className={buttonClassName}
            herokit-id="ad6d2b60-9ef9-4efa-919c-b6616b03ef3e"
          >
            {buttonContent}
          </Button>
        </Link>
      );
    }
    return (
      <Link href={card.buttonLink}>
        <Button
          variant="default"
          className={buttonClassName}
          herokit-id="8c37c6d8-43ae-4efe-9b22-c9dccdc04867"
        >
          {buttonContent}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="default"
      className={buttonClassName}
      herokit-id="367041cf-ea27-4ae8-bc78-3c9acb8881f7"
    >
      {buttonContent}
    </Button>
  );
};

interface ServiceCardProps {
  card: OfferCard;
  index: number;
  cardClassName?: string;
  cardContentClassName?: string;
  iconClassName?: string;
  iconWidth?: number;
  iconHeight?: number;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  cardButtonClassName?: string;
  cardButtonIconClassName?: string;
  enableHoverEffect: boolean;
  hoverClassName?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  card,
  index,
  cardClassName,
  cardContentClassName,
  iconClassName,
  iconWidth = DEFAULT_ICON_SIZE,
  iconHeight = DEFAULT_ICON_SIZE,
  cardTitleClassName,
  cardDescriptionClassName,
  cardButtonClassName,
  cardButtonIconClassName,
  enableHoverEffect,
  hoverClassName,
}) => {
  const hoverClasses = enableHoverEffect
    ? "group transition-all duration-300 hover:cursor-pointer hover:-rotate-2 hover:bg-[#FF985C]"
    : "";

  const cardContent = (
    <Card
      className={cn(
        "gap-0 space-y-1.5 rounded-[5px] border-0 bg-white p-5 shadow-none lg:px-10 lg:py-5.5",
        hoverClasses,
        hoverClassName,
        card.cardClassName,
        cardClassName
      )}
    >
      <CardContent
        className={cn(
          "flex flex-col gap-4 p-0 lg:!gap-6",
          card.cardContentClassName,
          cardContentClassName
        )}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Image
            src={card.icon}
            alt={card.iconAlt || card.title}
            loading="lazy"
            width={card.iconWidth || iconWidth}
            height={card.iconHeight || iconHeight}
            className={cn(
              "h-9 w-9 flex-shrink-0 md:h-10 md:w-10",
              card.iconClassName,
              iconClassName
            )}
          />
          <Heading
            level={3}
            variant="default"
            className={cn(
              "!m-0 text-start !text-[22px] !font-normal whitespace-nowrap text-gray-900",
              card.cardTitleClassName,
              cardTitleClassName
            )}
            herokit-id="ba437c50-87d8-4851-accf-6168578c418f"
          >
            {card.title}
          </Heading>
        </div>
        <p
          className={cn(
            "text-sm/6 font-normal text-gray-600 group-hover:text-black",
            card.cardDescriptionClassName,
            cardDescriptionClassName
          )}
          herokit-id="847b279f-a94b-4953-a2f1-6ee70c773e9a"
        >
          {card.description}
        </p>
      </CardContent>
      <CardFooter className="!mt-auto p-0">
        <div className="w-full">
          <CardButton
            card={card}
            cardButtonClassName={cardButtonClassName}
            cardButtonIconClassName={cardButtonIconClassName}
            isCardClickable={!!card.buttonLink}
          />
        </div>
      </CardFooter>
    </Card>
  );

  // If card has a buttonLink, wrap the entire card in a Link
  if (card.buttonLink) {
    return (
      <Link
        href={card.buttonLink}
        target={card.external ? "_blank" : undefined}
        rel={card.external ? "noopener noreferrer" : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export const ServiceOffers: React.FC<ServiceOffersProps> = ({
  title,
  subtitle,
  moreInfoText,
  moreInfoLink = "#",
  cards = [],
  // Section styling
  className = "",
  sectionClassName,
  backgroundClassName = "bg-gray-50",
  containerClassName,
  // Header/Title section
  showTitle = true,
  showSubtitle = true,
  showMoreInfoButton = true,
  titleClassName,
  subtitleClassName,
  headerClassName,
  // Button styling
  moreInfoButtonClassName,
  cardButtonClassName,
  cardButtonIconClassName,
  // Card styling
  cardClassName,
  cardContentClassName,
  iconClassName,
  iconWidth = DEFAULT_ICON_SIZE,
  iconHeight = DEFAULT_ICON_SIZE,
  cardTitleClassName,
  cardDescriptionClassName,
  // Layout
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
  gridContainerClassName,
  enableHoverEffect = true,
  hoverClassName,
  // Content
  sectionId,
}) => {
  // Memoize grid columns class
  const gridColsClass = useMemo(
    () => GRID_COLUMNS_MAP[columns] || GRID_COLUMNS_MAP[DEFAULT_COLUMNS],
    [columns]
  );

  // Early return if no cards
  if (!cards || cards.length === 0) {
    return null;
  }

  const hasHeader =
    (showTitle && title) ||
    (showSubtitle && subtitle) ||
    (showMoreInfoButton && moreInfoText);

  return (
    <section
      id={sectionId}
      className={cn(
        "relative w-full py-16 md:py-24 lg:py-32",
        backgroundClassName,
        sectionClassName,
        className
      )}
    >
      <div
        className={cn(
          "container mx-auto max-w-7xl px-4 md:px-6 lg:px-8",
          containerClassName
        )}
      >
        <div
          className={cn(
            "grid",
            gap,
            "grid-cols-1",
            gridColsClass,
            gridContainerClassName
          )}
          herokit-id="9991d63c-f759-4187-bbc2-8e61ecc8b419"
        >
          {/* Header Section */}
          {hasHeader && (
            <div
              className={cn(
                "flex flex-col gap-5 px-5 md:gap-6 md:p-0",
                headerClassName
              )}
              herokit-id="67fcc6e4-ad28-4c65-9cac-36d35f9adc06"
            >
              {showTitle && title && (
                <Heading
                  level={2}
                  variant="default"
                  className={cn(
                    "mt-0 mb-0! text-start !font-semibold",
                    titleClassName
                  )}
                  herokit-id="fd1f392d-4826-4c24-b619-b7708f9321e1"
                >
                  {title}
                </Heading>
              )}
              {showSubtitle && subtitle && (
                <p
                  className={cn(
                    "max-w-xl text-sm leading-6 font-normal text-gray-600",
                    subtitleClassName
                  )}
                  herokit-id="0405a432-1f29-47f4-8c34-48e141c172a8"
                >
                  {subtitle}
                </p>
              )}
              {showMoreInfoButton && moreInfoText && moreInfoLink && (
                <Link href={moreInfoLink}>
                  <Button
                    variant="default"
                    className={cn(
                      "rounded-[8px] bg-[#FF985C] p-5.5 font-semibold text-gray-900 hover:bg-[#FF985C]/90",
                      moreInfoButtonClassName
                    )}
                    herokit-id="ea90b76d-9c7e-4b9b-b40d-11d055ef3fcf"
                  >
                    {moreInfoText}
                  </Button>
                </Link>
              )}
            </div>
          )}
          {/* Cards */}
          {cards.map((card, index) => (
            <ServiceCard
              key={card.id || `card-${index}`}
              card={card}
              index={index}
              cardClassName={cardClassName}
              cardContentClassName={cardContentClassName}
              iconClassName={iconClassName}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
              cardTitleClassName={cardTitleClassName}
              cardDescriptionClassName={cardDescriptionClassName}
              cardButtonClassName={cardButtonClassName}
              cardButtonIconClassName={cardButtonIconClassName}
              enableHoverEffect={enableHoverEffect}
              hoverClassName={hoverClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOffers;
