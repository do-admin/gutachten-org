import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DynamicIcon, type LucideIconName } from "@/lib/icon-utils";

export interface PricingFeature {
  text: string;
  subtitle?: string;
  icon?: LucideIconName;
  iconClassName?: string;
  iconImage?: string;
  iconImageAlt?: string;
  iconImageClassName?: string;
}

export interface PricingTier {
  title?: string;
  price?: string;
  pricePrefix?: string;
  priceNote?: string;
  features?: PricingFeature[];
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  external?: boolean;
  ctaVariant?: "default" | "accent" | "secondary";
  badge?: string;
  highlighted?: boolean;
  priceClassName?: string;
  lastFeatureMarginBottom?: string;
}

export interface TableRow {
  title: string;
  secondColumnCard: PricingTier;
  thirdColumnCard: PricingTier;
  isHeader?: boolean;
}

export interface PricingComparisonProps {
  sectionId?: string;
  variant?: "three-column";
  heading: string;
  headingClassName?: string;
  topCtaLabel?: string;
  topCtaHref?: string;
  topCtaIcon?: LucideIconName;
  topCtaClassName?: string;
  topCtaLabelClassName?: string;
  topCtaIconClassName?: string;
  tiers?: [PricingTier, PricingTier, PricingTier];
  tableRows?: TableRow[];
  backgroundClassName?: string;
  containerClassName?: string;
  className?: string;
  titleClassName?: string;
}

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  sectionId = "pricing-comparison",
  heading,
  headingClassName,
  variant = "",
  topCtaLabel,
  topCtaHref,
  topCtaIcon = "ArrowUpRight",
  topCtaClassName,
  topCtaLabelClassName,
  topCtaIconClassName,
  tiers,
  tableRows,
  backgroundClassName = "bg-gradient-to-b from-[rgba(143,181,170,0.1)] to-white",
  containerClassName,
  className,
  titleClassName,
}) => {
  const renderFeature = (
    feature: PricingFeature,
    featureIndex: number,
    isLast: boolean = false,
    lastFeatureMarginBottom?: string
  ) => {
    const iconName = feature.icon;
    const iconImage = feature.iconImage;
    return (
      <li
        key={featureIndex}
        className={cn(
          "flex w-full min-w-0 items-start gap-2",
          isLast && lastFeatureMarginBottom && lastFeatureMarginBottom
        )}
        herokit-id="9f1e35ba-462e-46f9-bbe7-5dc33a25f7f6"
      >
        {iconImage ? (
          <Image
            src={iconImage}
            alt={feature.iconImageAlt || ""}
            width={32}
            height={32}
            className={cn(
              "h-8 w-8 max-w-full flex-shrink-0 object-contain",
              feature.iconImageClassName
            )}
            loading="lazy"
          />
        ) : iconName ? (
          <DynamicIcon
            name={iconName}
            className={cn(
              "h-8 w-8 flex-shrink-0",
              feature.iconClassName || "text-[#00A36F]"
            )}
            aria-hidden="true"
          />
        ) : (
          <DynamicIcon
            name="Check"
            className="h-8 w-8 flex-shrink-0 text-[#00A36F]"
            aria-hidden="true"
          />
        )}
        <div
          className="m-auto flex min-w-0 flex-1 flex-col"
          herokit-id="bf6215b3-a465-4a46-8c89-451d5e12855f"
        >
          <span
            className="text-sm font-medium text-[#243239]"
            herokit-id="ad93cd8c-fe53-4bd5-a7d6-65c3dedd9d34"
          >
            {feature.text}
          </span>
          {feature.subtitle && (
            <span
              className="mt-1 text-xs text-[#4F5A60]"
              herokit-id="cb9d882d-987e-4238-b070-87df67c7237a"
            >
              {feature.subtitle}
            </span>
          )}
        </div>
      </li>
    );
  };

  const renderPricingCardHeader = (
    tier: PricingTier,
    isFirst: boolean,
    isLast: boolean
  ) => {
    // isFirst indicates it's the second column (secondColumnCard)
    return (
      <div
        key={tier.title || `header-${isFirst ? "second" : "third"}`}
        className={cn(
          "flex w-full max-w-full flex-col",
          isFirst && "bg-[#F4F8F7]"
        )}
      >
        <div
          className="flex w-full max-w-full flex-col gap-6 overflow-hidden p-4 md:gap-10 md:p-6"
          herokit-id="75a48927-e0b3-4bbf-9091-3eabe6566c70"
        >
          {/* Badge and Title */}
          {(tier.badge || tier.title) && (
            <div
              className="flex items-center justify-between"
              herokit-id="fbdf3026-81c6-4a1d-b446-fd68d389d9b7"
            >
              {tier.title && (
                <h3
                  className={cn(
                    "text-base font-normal text-[#243239]",
                    titleClassName
                  )}
                  herokit-id="932824f4-c9ee-4f18-a32a-b624176c2247"
                >
                  {tier.title}
                </h3>
              )}
              {tier.badge && (
                <div className="flex justify-end">
                  <div
                    className="flex h-7 items-center gap-2 rounded-[8px] border border-[#FF985C] px-2"
                    style={{
                      background:
                        "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(255, 152, 92, 0) 0%, rgba(255, 152, 92, 0.1) 100%)",
                    }}
                  >
                    <span
                      className="text-xs leading-[144%] font-semibold text-[#273238] uppercase"
                      herokit-id="8eea09c4-8ef6-44de-b410-1f4a6b179545"
                    >
                      {tier.badge}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          {tier.price && (
            <div
              className="flex flex-col gap-1"
              herokit-id="96543b4a-5dfc-4932-9437-d4e68602932f"
            >
              <div
                className={cn(
                  "font-heading text-[32px] leading-[144%] !font-semibold",
                  tier.priceClassName || tier.badge
                    ? "text-[#EB6613]"
                    : "text-[#273238]"
                )}
                herokit-id="2986ccd4-161d-4a96-a1dd-91dbbf2bbc66"
              >
                {tier.pricePrefix && (
                  <span
                    className="mr-1"
                    herokit-id="3c3f16c7-7f84-4254-b1c3-0bb285d306d3"
                  >
                    {tier.pricePrefix}
                  </span>
                )}
                {tier.price}
              </div>
              {tier.priceNote && (
                <p
                  className="font-heading text-sm leading-[144%] !font-normal text-[#4F5A60]"
                  herokit-id="1f062a91-f5f3-4290-b780-02196de7589b"
                >
                  {tier.priceNote}
                </p>
              )}
            </div>
          )}

          {/* CTA Button */}
          {tier.ctaLabel && tier.ctaHref && (
            <Button
              asChild
              className={cn(
                "h-12 w-max rounded-[8px] font-semibold",
                tier.ctaVariant === "accent" &&
                  "bg-[#FF985C] text-[#273238] hover:bg-[#FF985C]/90",
                tier.ctaVariant === "default" &&
                  "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90",
                !tier.ctaVariant &&
                  "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90"
              )}
            >
              <Link
                href={tier.ctaHref}
                className="flex items-center justify-center gap-2"
                target={tier.external ? "_blank" : undefined}
                rel={tier.external ? "noopener noreferrer" : undefined}
              >
                <span
                  className="text-sm leading-none"
                  herokit-id="a3227fcb-7e04-4a55-a955-0125491fdce5"
                >
                  {tier.ctaLabel}
                </span>
                <DynamicIcon
                  name="ArrowUpRight"
                  className="h-4 w-4 text-[#FF914C]"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          )}

          {/* Features */}
          {tier.features && tier.features.length > 0 && (
            <ul className="flex flex-col gap-6 md:gap-10">
              {tier.features.map((feature, featureIndex) => {
                const isLast = featureIndex === tier.features!.length - 1;
                return renderFeature(
                  feature,
                  featureIndex,
                  isLast,
                  tier.lastFeatureMarginBottom
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  };

  const renderPricingCard = (
    tier: PricingTier,
    isFirst: boolean,
    isLast: boolean,
    isMiddle?: boolean,
    inTable?: boolean
  ) => {
    return (
      <div
        key={
          tier.title || `card-${isFirst ? "first" : isLast ? "last" : "middle"}`
        }
        className={cn(
          "flex w-full max-w-full flex-col",
          !inTable && "border border-[rgba(39,50,56,0.2)]",
          !inTable &&
            isFirst &&
            "rounded-t-lg md:rounded-l-lg md:rounded-tr-none",
          !inTable &&
            isLast &&
            "rounded-b-lg md:rounded-r-lg md:rounded-bl-none",
          !inTable && isMiddle && "border-x md:border-x md:border-y",
          tier.highlighted && "bg-[rgba(255,152,92,0.1)]",
          !isFirst && !inTable && "md:mt-0"
        )}
        herokit-id="522ddb22-365a-4003-957a-9f4468b5ee94"
      >
        <div
          className="flex w-full max-w-full flex-1 flex-col gap-10 overflow-hidden p-6"
          herokit-id="3094122a-315b-4a18-bbdc-a16259c1cbe9"
        >
          <div className="flex flex-col gap-10">
            <div
              className={cn(
                "flex min-h-[28px] w-full min-w-0 items-center",
                tier.badge ? "justify-between" : "justify-start"
              )}
              herokit-id="fb0ee96a-e220-4789-b2a2-bcae488817ef"
            >
              <h3
                className={cn(
                  "min-w-0 flex-1 text-base font-medium break-words text-[#273238]",
                  titleClassName
                )}
                herokit-id="6c730580-86fc-4acc-8834-ac2b322a293d"
              >
                {tier.title}
              </h3>
              {tier.badge && (
                <div
                  className="flex h-7 items-center gap-2 rounded-[8px] border border-[#FF985C] px-2"
                  style={{
                    background:
                      "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(255, 152, 92, 0) 0%, rgba(255, 152, 92, 0.1) 100%)",
                  }}
                >
                  <span
                    className="text-xs leading-[144%] font-semibold text-[#273238] uppercase"
                    herokit-id="892cc81f-cdc2-4a90-a470-370ed346e473"
                  >
                    {tier.badge}
                  </span>
                </div>
              )}
            </div>

            <div
              className="flex flex-col gap-4"
              herokit-id="a62a141b-9c36-44ba-8879-7f44d4b685a9"
            >
              <div
                className={cn(
                  "font-heading text-[32px] leading-[144%] !font-semibold",
                  tier.priceClassName || "text-[#273238]"
                )}
                herokit-id="a6ede3dd-8da9-42ca-9b94-1be1771bef23"
              >
                {tier.pricePrefix && (
                  <span
                    className="mr-1"
                    herokit-id="9d6ecbe3-ef5d-4761-85b0-653b1378ca8c"
                  >
                    {tier.pricePrefix}
                  </span>
                )}
                {tier.price}
              </div>
              {tier.priceNote && (
                <p
                  className="font-heading text-sm leading-[144%] !font-normal text-[#515A5F]"
                  herokit-id="7b5368d7-30f6-4182-b0ee-44286360a01e"
                >
                  {tier.priceNote}
                </p>
              )}
            </div>
          </div>

          {tier.features && tier.features.length > 0 && (
            <ul className="flex flex-1 flex-col gap-2">
              {tier.features.map((feature, featureIndex) => {
                const isLast = featureIndex === tier.features!.length - 1;
                return renderFeature(
                  feature,
                  featureIndex,
                  isLast,
                  tier.lastFeatureMarginBottom
                );
              })}
            </ul>
          )}
        </div>

        {tier.ctaLabel && tier.ctaHref && (
          <Button
            asChild
            className={cn(
              "h-[68px] w-full font-semibold",
              !inTable && "rounded-none rounded-b-lg",
              tier.ctaVariant === "accent" &&
                "bg-[#FF985C] text-[#273238] hover:bg-[#FF985C]/90",
              tier.ctaVariant === "default" &&
                "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90",
              !tier.ctaVariant &&
                "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90"
            )}
          >
            <Link href={tier.ctaHref}>
              <span
                className="text-sm leading-none"
                herokit-id="1ee82da4-aa96-490d-bdd7-128f794df1d1"
              >
                {tier.ctaLabel}
              </span>
            </Link>
          </Button>
        )}
      </div>
    );
  };

  // Helper function to render a column cell (desktop only)
  const renderColumnCell = (
    card: PricingTier,
    isHeader: boolean,
    isLastRow: boolean,
    isFirstColumn: boolean,
    isLastColumn: boolean,
    columnIndex: number,
    rowIndex: number,
    totalRows: number
  ) => {
    const paddingClass = isLastRow && !isHeader ? "p-0" : "p-4 md:p-6";
    const borderClass = !isLastColumn
      ? "border-r border-[rgba(39,50,56,0.2)]"
      : "";
    const isSecondColumn = columnIndex === 1;
    const backgroundColorClass = isSecondColumn ? "bg-[#F4F8F7]" : "";

    // Add bottom border for all rows except last
    const bottomBorderClass = !isLastRow
      ? "border-b border-[rgba(39,50,56,0.2)]"
      : "";

    if (isHeader) {
      return (
        <div
          key={`header-col-${columnIndex}`}
          className={cn(
            borderClass,
            backgroundColorClass,
            columnIndex === 1 && "rounded-tr-lg",
            columnIndex === 2 && "rounded-tr-lg"
          )}
          herokit-id="f89bea3d-0076-420c-a290-7043df05beeb"
        >
          {renderPricingCardHeader(card, columnIndex === 1, columnIndex === 2)}
        </div>
      );
    }

    return (
      <div
        key={`col-${columnIndex}`}
        className={cn(
          "flex flex-col gap-6 md:gap-10",
          borderClass,
          paddingClass,
          backgroundColorClass,
          bottomBorderClass,
          isLastRow && columnIndex === 1 && "rounded-br-lg",
          isLastRow && columnIndex === 2 && "rounded-br-lg"
        )}
        herokit-id="954bb23a-e858-48e8-b0f5-ad4fd283f885"
      >
        {card.features && card.features.length > 0 && (
          <ul className="flex flex-col gap-6 md:gap-10">
            {card.features.map((feature, featureIndex) => {
              const isLast = featureIndex === card.features!.length - 1;
              return renderFeature(
                feature,
                featureIndex,
                isLast,
                card.lastFeatureMarginBottom
              );
            })}
          </ul>
        )}
        {card.description && (
          <p
            className="text-sm leading-[144%] text-[#4F5A60]"
            herokit-id="46ced9e5-80bf-4105-93a5-569ada608bea"
          >
            {card.description}
          </p>
        )}
        {card.ctaLabel && card.ctaHref && (
          <Button
            asChild
            className={cn(
              "w-full py-7 font-semibold",
              card.ctaVariant === "accent" &&
                "bg-[#FF985C] text-[#273238] hover:bg-[#FF985C]/90",
              card.ctaVariant === "default" &&
                "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90",
              !card.ctaVariant &&
                "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90"
            )}
          >
            <Link
              href={card.ctaHref}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
            >
              <span
                className="text-sm leading-none"
                herokit-id="97743753-92ff-4d52-9ef7-4652c2b4c146"
              >
                {card.ctaLabel}
              </span>
            </Link>
          </Button>
        )}
      </div>
    );
  };

  // Helper function to render mobile header without CTA
  const renderMobileHeader = (tier: PricingTier, isFirstColumn: boolean) => {
    return (
      <div
        className={cn(
          "flex w-full max-w-full flex-col",
          isFirstColumn && "bg-[#F4F8F7]"
        )}
      >
        <div
          className="flex w-full max-w-full flex-col gap-6 overflow-hidden p-4 md:gap-10 md:p-6"
          herokit-id="mobile-header-container"
        >
          {/* Badge and Title */}
          {(tier.badge || tier.title) && (
            <div
              className="flex items-center justify-between"
              herokit-id="mobile-header-badge-title"
            >
              {tier.title && (
                <h3
                  className={cn(
                    "text-base font-normal text-[#243239]",
                    titleClassName
                  )}
                  herokit-id="mobile-header-title"
                >
                  {tier.title}
                </h3>
              )}
              {tier.badge && (
                <div className="flex justify-end">
                  <div
                    className="flex h-7 items-center gap-2 rounded-[8px] border border-[#FF985C] px-2"
                    style={{
                      background:
                        "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(255, 152, 92, 0) 0%, rgba(255, 152, 92, 0.1) 100%)",
                    }}
                  >
                    <span
                      className="text-xs leading-[144%] font-semibold text-[#273238] uppercase"
                      herokit-id="mobile-header-badge"
                    >
                      {tier.badge}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          {tier.price && (
            <div
              className="flex flex-col gap-1"
              herokit-id="mobile-header-price"
            >
              <div
                className={cn(
                  "font-heading text-[32px] leading-[144%] !font-semibold",
                  tier.priceClassName || tier.badge
                    ? "text-[#EB6613]"
                    : "text-[#273238]"
                )}
                herokit-id="mobile-header-price-value"
              >
                {tier.pricePrefix && (
                  <span
                    className="mr-1"
                    herokit-id="mobile-header-price-prefix"
                  >
                    {tier.pricePrefix}
                  </span>
                )}
                {tier.price}
              </div>
              {tier.priceNote && (
                <p
                  className="font-heading text-sm leading-[144%] !font-normal text-[#4F5A60]"
                  herokit-id="mobile-header-price-note"
                >
                  {tier.priceNote}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Helper function to render a full column/card for mobile (Kurzgutachten / Verkehrswertgutachten)
  const renderMobileColumn = (
    columnKey: "secondColumnCard" | "thirdColumnCard",
    isFirstColumn: boolean
  ) => {
    if (!tableRows || tableRows.length === 0) return null;

    const headerRow = tableRows[0];
    const headerTier = headerRow[columnKey];

    // Use all rows except the header and the last CTA-only row
    const contentRows = tableRows.slice(1, tableRows.length - 1);

    return (
      <div
        key={columnKey}
        className={cn(
          "flex flex-col overflow-hidden rounded-lg border border-[rgba(39,50,56,0.2)]",
          isFirstColumn && "bg-[#F4F8F7]"
        )}
        herokit-id={`mobile-column-${columnKey}`}
      >
        {/* Column header with title and price (no CTA) */}
        {renderMobileHeader(headerTier, isFirstColumn)}

        {/* Column content grouped by row titles (e.g. Zusammenfassung, Geeignet für, …) */}
        <div className="flex flex-col gap-8 p-4 md:p-6">
          {contentRows.map((row, rowIndex) => {
            const card = row[columnKey];
            const hasContent =
              (card.features && card.features.length > 0) || card.description;

            if (!row.title && !hasContent) {
              return null;
            }

            return (
              <div
                key={`${columnKey}-row-${rowIndex + 1}`}
                className="flex flex-col gap-4"
                herokit-id={`mobile-section-${columnKey}-${rowIndex + 1}`}
              >
                {row.title && (
                  <h3
                    className={cn(
                      "text-base font-medium text-[#273238]",
                      titleClassName
                    )}
                  >
                    {row.title}
                  </h3>
                )}

                {card.features && card.features.length > 0 && (
                  <ul className="flex flex-col gap-4">
                    {card.features.map((feature, featureIndex) => {
                      const isLast = featureIndex === card.features!.length - 1;
                      return renderFeature(
                        feature,
                        featureIndex,
                        isLast,
                        card.lastFeatureMarginBottom
                      );
                    })}
                  </ul>
                )}

                {card.description && (
                  <p className="text-sm leading-[144%] text-[#4F5A60]">
                    {card.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button at the end */}
        {headerTier.ctaLabel && headerTier.ctaHref && (
          <div className="p-4 pt-0 md:p-6">
            <Button
              asChild
              className={cn(
                "w-full rounded-[8px] py-7 font-semibold",
                isFirstColumn
                  ? "bg-[#FF985C] text-[#273238] hover:bg-[#FF985C]/90"
                  : headerTier.ctaVariant === "accent" &&
                      "bg-[#FF985C] text-[#273238] hover:bg-[#FF985C]/90",
                !isFirstColumn &&
                  headerTier.ctaVariant === "default" &&
                  "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90",
                !isFirstColumn &&
                  !headerTier.ctaVariant &&
                  "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90"
              )}
            >
              <Link
                href={headerTier.ctaHref}
                target={headerTier.external ? "_blank" : undefined}
                rel={headerTier.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-2"
              >
                <span
                  className="text-sm leading-none"
                  herokit-id={`mobile-cta-${columnKey}`}
                >
                  {headerTier.ctaLabel}
                </span>
                <DynamicIcon
                  name="ArrowUpRight"
                  className="h-4 w-4 text-[#FF914C]"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Helper function to render a table row (desktop)
  const renderTableRow = (
    row: TableRow,
    rowIndex: number,
    totalRows: number
  ) => {
    const isHeader = row.isHeader ?? rowIndex === 0;
    const isLastRow = rowIndex === totalRows - 1;
    const columns = [
      { card: row.secondColumnCard, index: 1 },
      { card: row.thirdColumnCard, index: 2 },
    ];

    return (
      <div
        key={rowIndex}
        className={cn("hidden grid-cols-3 gap-0 md:grid")}
        herokit-id="342db5ff-ef38-4c0b-ae39-be4e2bcebb6f"
      >
        {/* First Column - Title/Label */}
        <div
          className={cn(
            "flex items-start border-r border-[rgba(39,50,56,0.2)] p-4 md:p-6",
            !isHeader && !isLastRow && "border-b border-[rgba(39,50,56,0.2)]"
          )}
          herokit-id="18c92d1e-a112-41f6-a107-6c989449e744"
        >
          {row.title && (
            <h3
              className={cn(
                "text-base font-medium text-[#273238]",
                titleClassName
              )}
              herokit-id="9b679185-4b17-4d10-a127-fc54e3eed423"
            >
              {row.title}
            </h3>
          )}
        </div>

        {/* Dynamic Columns */}
        {columns.map(({ card, index }, colIndex) =>
          renderColumnCell(
            card,
            isHeader,
            isLastRow,
            false,
            colIndex === columns.length - 1,
            index,
            rowIndex,
            totalRows
          )
        )}
      </div>
    );
  };

  if (variant === "three-column") {
    // If tableRows is provided, render table-like structure
    if (tableRows && tableRows.length > 0) {
      return (
        <Section
          id={sectionId}
          className={cn("py-16 md:py-[120px]", backgroundClassName, className)}
        >
          <Container className={cn("mx-auto max-w-7xl", containerClassName)}>
            <div
              className="mb-16 flex flex-col items-start justify-center gap-6 md:flex-row md:items-end md:justify-center"
              herokit-id="a6f3f37c-6f7d-408d-8e8c-77beab09a3d2"
            >
              <h2
                className={cn(
                  "max-w-md text-2xl leading-[144%] font-medium text-[#273238] md:text-[32px]",
                  headingClassName
                )}
                herokit-id="6f97d7c0-d2ae-45d8-bbcb-97f1fae7f148"
              >
                {heading}
              </h2>
              {topCtaLabel && topCtaHref && (
                <Button
                  asChild
                  className={cn(
                    "flex h-12 items-center gap-6 rounded-[8px] bg-[#273238] px-[18px] py-2 font-semibold text-[#F8FAFB] hover:bg-[#273238]/90",
                    topCtaClassName
                  )}
                >
                  <Link
                    href={topCtaHref}
                    herokit-id="7345a17d-58e8-4345-b717-6cd0155a6dd3"
                  >
                    <span
                      className={cn(
                        "flex-1 text-sm leading-none",
                        topCtaLabelClassName
                      )}
                      herokit-id="fc95dcd9-27bc-4d0a-810e-eccc3e5e0955"
                    >
                      {topCtaLabel}
                    </span>
                    {topCtaIcon && (
                      <DynamicIcon
                        name={topCtaIcon}
                        className={cn(
                          "h-3 w-3 stroke-[#FF985C] stroke-[1.5px]",
                          topCtaIconClassName
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile Layout - One card per option (Kurzgutachten / (Voll) Verkehrswertgutachten) */}
            <div
              className="flex flex-col gap-6 md:hidden"
              herokit-id="mobile-column-container"
            >
              {renderMobileColumn("secondColumnCard", true)}
              {renderMobileColumn("thirdColumnCard", false)}
            </div>

            {/* Desktop Layout - Table format */}
            <div
              className="hidden flex-col gap-0 overflow-hidden rounded-lg border border-[rgba(39,50,56,0.2)] md:flex"
              herokit-id="3180a43b-d6f0-45bc-8911-ad1811be6416"
            >
              {tableRows.map((row, rowIndex) =>
                renderTableRow(row, rowIndex, tableRows.length)
              )}
            </div>
          </Container>
        </Section>
      );
    }

    // Fallback to original three-column layout
    return (
      <Section
        id={sectionId}
        className={cn("py-16 md:py-[120px]", backgroundClassName, className)}
      >
        <Container className={cn("mx-auto max-w-7xl", containerClassName)}>
          <div
            className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
            herokit-id="6fbcdc01-0a54-4fea-8180-cceb7ac7f571"
          >
            <h2
              className={cn(
                "max-w-md text-2xl leading-[144%] font-medium text-[#273238] md:text-[32px]",
                headingClassName
              )}
              herokit-id="4e36c863-2671-4aaa-8382-989e7b7ff9c6"
            >
              {heading}
            </h2>
            {topCtaLabel && topCtaHref && (
              <Button
                asChild
                className={cn(
                  "flex h-12 items-center gap-6 rounded-[8px] bg-[#273238] px-[18px] py-2 font-semibold text-[#F8FAFB] hover:bg-[#273238]/90",
                  topCtaClassName
                )}
              >
                <Link
                  href={topCtaHref}
                  herokit-id="e9149cc0-36d5-46ac-a610-3a0e1ac796ee"
                >
                  <span
                    className={cn(
                      "flex-1 text-sm leading-none",
                      topCtaLabelClassName
                    )}
                    herokit-id="2af70fce-f8fc-491f-a0b3-6137e2a13d14"
                  >
                    {topCtaLabel}
                  </span>
                  {topCtaIcon && (
                    <DynamicIcon
                      name={topCtaIcon}
                      className={cn(
                        "h-3 w-3 stroke-[#FF985C] stroke-[1.5px]",
                        topCtaIconClassName
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </Button>
            )}
          </div>

          <div className="overflow-x-auto md:overflow-x-visible">
            <div
              className="grid w-full max-w-full min-w-[1024px] grid-cols-3 gap-0 md:min-w-0"
              herokit-id="032569e8-351b-48db-9ea2-1672bef37f55"
            >
              {tiers &&
                tiers?.map((tier, index) => {
                  const isFirst = index === 0;
                  const isLast = index === 2;
                  const isMiddle = index === 1;

                  return renderPricingCard(tier, isFirst, isLast, isMiddle);
                })}
            </div>
          </div>
        </Container>
      </Section>
    );
  }
  return (
    <Section
      id={sectionId}
      className={cn("py-16 md:py-[120px]", backgroundClassName, className)}
    >
      <Container className={cn("mx-auto max-w-7xl", containerClassName)}>
        <div
          className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          herokit-id="05ec3b84-1cfc-4747-b65f-82ef933490d6"
        >
          <h2
            className={cn(
              "max-w-md text-2xl leading-[144%] font-medium text-[#273238] md:text-[32px]",
              headingClassName
            )}
            herokit-id="70fefbfd-d80f-4e3d-9273-871167eeb8d9"
          >
            {heading}
          </h2>
          {topCtaLabel && topCtaHref && (
            <Button
              asChild
              className={cn(
                "flex h-12 items-center gap-6 rounded-[8px] bg-[#273238] px-[18px] py-2 font-semibold text-[#F8FAFB] hover:bg-[#273238]/90",
                topCtaClassName
              )}
            >
              <Link
                href={topCtaHref}
                herokit-id="44bab88d-4d4e-48d8-8eb9-22005e40b0f3"
              >
                <span
                  className={cn(
                    "flex-1 text-sm leading-none",
                    topCtaLabelClassName
                  )}
                  herokit-id="95f2e419-1eda-42d5-9ade-0828f914948b"
                >
                  {topCtaLabel}
                </span>
                {topCtaIcon && (
                  <DynamicIcon
                    name={topCtaIcon}
                    className={cn(
                      "h-3 w-3 stroke-[#FF985C] stroke-[1.5px]",
                      topCtaIconClassName
                    )}
                    aria-hidden="true"
                  />
                )}
              </Link>
            </Button>
          )}
        </div>

        <div
          className="grid w-full max-w-full grid-cols-1 gap-0 md:grid-cols-3"
          herokit-id="a2b8c141-6163-41de-a462-fcf7b3f47b55"
        >
          {tiers &&
            tiers?.map((tier, index) => {
              const isFirst = index === 0;
              const isLast = index === 2;
              const isMiddle = index === 1;

              return (
                <div
                  key={tier.title || `tier-${index}`}
                  className={cn(
                    "flex w-full max-w-full flex-col border border-[rgba(39,50,56,0.2)]",
                    isFirst &&
                      "rounded-t-lg md:rounded-l-lg md:rounded-tr-none",
                    isLast && "rounded-b-lg md:rounded-r-lg md:rounded-bl-none",
                    isMiddle && "border-x md:border-x md:border-y",
                    tier.highlighted && "bg-[rgba(255,152,92,0.1)]",
                    !isFirst && "md:mt-0"
                  )}
                  herokit-id="48efd171-fa1c-48e4-92aa-74fd8cf052ab"
                >
                  <div
                    className="flex w-full max-w-full flex-1 flex-col gap-10 overflow-hidden p-6"
                    herokit-id="4f41b283-9665-40d4-8a85-819d32de87b4"
                  >
                    <div className="flex flex-col gap-10">
                      <div
                        className={cn(
                          "flex min-h-[28px] w-full min-w-0 items-start justify-start"
                        )}
                        herokit-id="b1f8e3c8-28c0-4d84-890f-df6d77d41b72"
                      >
                        <h3
                          className={cn(
                            "min-w-0 flex-1 text-base font-medium break-words text-[#273238]",
                            titleClassName
                          )}
                          herokit-id="e08dd243-d31c-4cf4-83f9-ed15f0790735"
                        >
                          {tier.title}
                        </h3>
                        {tier.badge && (
                          <div
                            className="flex h-7 items-center gap-2 rounded-[8px] border border-[#FF985C] px-2"
                            style={{
                              background:
                                "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(255, 152, 92, 0) 0%, rgba(255, 152, 92, 0.1) 100%)",
                            }}
                          >
                            <span
                              className="text-xs leading-[144%] font-semibold text-[#273238] uppercase"
                              herokit-id="f452a8d2-835d-4ae0-834b-d5202a5eb156"
                            >
                              {tier.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      <div
                        className="flex flex-col"
                        herokit-id="6ba415e2-9ee5-42c3-b595-f1282980a050"
                      >
                        <div
                          className={cn(
                            "font-heading text-[32px] !font-semibold",
                            tier.priceClassName || "text-[#273238]"
                          )}
                          herokit-id="1851b38a-9dfb-4908-98b2-6da17163db7f"
                        >
                          {tier.pricePrefix && (
                            <span
                              className="mr-1"
                              herokit-id="418353ae-eba9-4e9d-9fbe-8455b6e0e92d"
                            >
                              {tier.pricePrefix}
                            </span>
                          )}
                          {tier.price}
                        </div>
                        {tier.priceNote && (
                          <p
                            className="font-heading text-sm !font-normal text-[#515A5F]"
                            herokit-id="7797169f-b19f-4bf1-bda3-d1db8378ad00"
                          >
                            {tier.priceNote}
                          </p>
                        )}
                      </div>
                    </div>

                    {tier.features && tier.features.length > 0 && (
                      <ul className="flex flex-1 flex-col gap-2">
                        {tier.features.map((feature, featureIndex) => {
                          const isLast =
                            featureIndex === tier.features!.length - 1;
                          return renderFeature(
                            feature,
                            featureIndex,
                            isLast,
                            tier.lastFeatureMarginBottom
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {tier.ctaLabel && tier.ctaHref && (
                    <Button
                      asChild
                      className={cn(
                        "h-[68px] w-full rounded-none rounded-b-lg font-semibold",
                        tier.ctaVariant === "accent" &&
                          "bg-[#FF985C] text-[#273238] hover:bg-[#FF985C]/90",
                        tier.ctaVariant === "default" &&
                          "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90",
                        !tier.ctaVariant &&
                          "bg-[#273238] text-[#F8FAFB] hover:bg-[#273238]/90"
                      )}
                    >
                      <Link
                        href={tier.ctaHref}
                        target={tier.external ? "_blank" : undefined}
                        rel={tier.external ? "noopener noreferrer" : undefined}
                      >
                        <span
                          className="text-sm leading-none"
                          herokit-id="ba52d21f-8b49-4716-afce-df280b94a66e"
                        >
                          {tier.ctaLabel}
                        </span>
                      </Link>
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
      </Container>
    </Section>
  );
};

export default PricingComparison;
