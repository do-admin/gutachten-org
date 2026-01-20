import React from "react";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

// Card item configuration
export interface CardLayoutItem {
  title: string;
  description?: string;
  icon?: LucideIconName;
  iconClassName?: string;
  iconImage?: string;
  iconImageAlt?: string;
  iconImageClassName?: string;
  // Link variant: React component icon (takes precedence over icon/iconImage)
  iconComponent?: LucideIcon;
  className?: string;
  // CTA variant props
  href?: string;
  ctaText?: string;
  ctaLabel?: string;
  highlight?: boolean;
  // Step variant props
  step?: string; // Step number (e.g., "1", "2", "3")
  // Link variant props
  target?: "_blank" | "_self";
  rel?: string;
}

// Base props for the CardLayout component
export interface CardLayoutProps {
  // Content props
  title?: string;
  subtitle?: string;
  cards: CardLayoutItem[];

  // Section props
  sectionId?: string;
  variant?: "icon-top" | "cta" | "step" | "link" | "feature";

  // Layout props
  columns?: 2 | 3 | 4;

  // Styling props
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  textAlign?: "left" | "center" | "right";
  iconSize?: "sm" | "md" | "lg";

  // Icon (for link variant - global fallback)
  icon?: LucideIcon;

  // Custom styling
  className?: string;
  containerClassName?: string;
  titleContainerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  cardIconClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;

  // Background
  backgroundClassName?: string;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;

  // Layout options
  noWrapper?: boolean; // If true, render only the grid without Section/Container wrapper
}

export const CardLayout: React.FC<CardLayoutProps> = ({
  title,
  subtitle,
  cards,
  sectionId = "card-layout",
  variant = "icon-top",
  columns = 3,
  maxWidth = "6xl",
  textAlign = "left",
  iconSize = "md",
  icon,
  className,
  containerClassName,
  titleContainerClassName,
  titleClassName,
  subtitleClassName,
  gridClassName,
  cardClassName,
  cardIconClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  backgroundClassName = "bg-white",
  enableAnimation = false,
  animationDelay = 0.1,
  noWrapper = false,
}) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  // Get max width class
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "3xl":
        return "max-w-3xl";
      case "4xl":
        return "max-w-4xl";
      case "5xl":
        return "max-w-5xl";
      case "6xl":
        return "max-w-6xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-6xl";
    }
  };

  // Get text alignment class
  const getTextAlignClass = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  // Get columns class
  const getColumnsClass = () => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-3";
    }
  };

  // Render variant cta (with CTA button on hover)
  const renderVariantCta = () => {
    // CTA variant uses different column layout - default to 4 columns
    const getCtaColumnsClass = () => {
      switch (columns) {
        case 2:
          return "sm:grid-cols-2";
        case 3:
          return "sm:grid-cols-2 lg:grid-cols-3";
        case 4:
          return "sm:grid-cols-2 xl:grid-cols-4";
        default:
          return "sm:grid-cols-2 xl:grid-cols-4";
      }
    };

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          getCtaColumnsClass(),
          gridClassName
        )}
        herokit-id="f1943411-5747-4b2e-9c2e-cf9c90e1fe80"
      >
        {cards.map((card, index) => {
          const ctaCopy = card.ctaText || card.ctaLabel;
          const cardContent = (
            <>
              <div
                className={cn(
                  "link-content flex flex-1 flex-col p-5 transition-colors duration-300 hover:bg-transparent lg:group-hover:bg-[radial-gradient(85.74%_85.74%_at_50%_100%,rgba(252,112,25,0.20)_0%,rgba(252,112,25,0)_100%)]",
                  card.highlight ? "bg-slate-50" : ""
                )}
                herokit-id="423562a7-2a5b-486b-a50b-09d5521a3b41"
              >
                <h2 className="flex items-start justify-between text-base font-medium text-slate-900 sm:min-h-[72px]">
                  <span
                    className="flex-1"
                    herokit-id="0edea35c-da86-469c-996f-107020959e5f"
                  >
                    {card.title}
                  </span>
                </h2>
                {card.description && (
                  <div
                    className="related-link-excerpt mt-8 text-sm leading-relaxed text-[#526E68]"
                    herokit-id="b77430dc-6022-49f6-b962-b23eba13d49c"
                  >
                    {card.description}
                  </div>
                )}
              </div>
              {ctaCopy && (
                <div className="related-button hidden max-h-0 overflow-hidden bg-[#FF985C] transition-[max-height] duration-300 ease-in-out group-hover:max-h-[3.9rem] md:block">
                  <div className="flex items-center justify-center gap-2 px-6 py-6">
                    <p
                      className="link-label text-center text-sm leading-none font-semibold text-black"
                      herokit-id="56b7cf08-cf62-433a-a042-585a438b146b"
                    >
                      {ctaCopy}
                    </p>
                    <span className="material-icons hidden-content hidden text-black group-hover:inline-flex">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              )}
            </>
          );

          if (card.href) {
            return (
              <div
                key={index}
                className={cn(
                  "related-link flex h-full min-h-[280px] flex-col",
                  card.highlight ? "bg-slate-50" : "",
                  card.className,
                  enableAnimation ? "animate-fade-in" : ""
                )}
                style={
                  enableAnimation
                    ? { animationDelay: `${index * animationDelay}s` }
                    : undefined
                }
                herokit-id="b64dd024-04db-48cb-9cef-860f56e1c93c"
              >
                <Link
                  href={card.href}
                  className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-[#9999994A] text-current no-underline transition-colors focus-visible:ring-2 focus-visible:ring-[#FC7019] focus-visible:ring-offset-2 focus-visible:outline-none"
                  target={card.target}
                  rel={card.rel}
                  herokit-id="afe20e43-88d5-4974-b69f-bf5a5ffc1b1d"
                >
                  {cardContent}
                </Link>
                {/* Mobile button */}
                {ctaCopy && card.href && (
                  <div className="mt-0 md:hidden">
                    <Button
                      asChild
                      className="w-full rounded-t-none rounded-b-lg border-0 border-t border-[#9999994A] bg-slate-900 px-6 py-6 text-sm font-semibold text-white hover:bg-slate-900/90"
                    >
                      <Link
                        href={card.href}
                        herokit-id="079793c8-e81d-49f9-9a58-7bdccb45a636"
                      >
                        {ctaCopy}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={cn(
                "related-link h-full min-h-[300px] bg-[#f8fafb]",
                card.highlight ? "bg-slate-50" : "",
                card.className,
                enableAnimation ? "animate-fade-in" : ""
              )}
              style={
                enableAnimation
                  ? { animationDelay: `${index * animationDelay}s` }
                  : undefined
              }
            >
              <div
                className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-[#9999994A] text-current no-underline transition-colors"
                herokit-id="e5f3a855-d146-455e-a3cf-944d93e1cf1a"
              >
                {cardContent}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render variant step (numbered steps with step badge)
  const renderVariantStep = () => {
    // Step variant uses different column layout - matches ProcessOverview
    const getStepColumnsClass = () => {
      switch (columns) {
        case 2:
          return "md:grid-cols-2";
        case 3:
          return "md:grid-cols-2 xl:grid-cols-3";
        case 4:
          return "md:grid-cols-2 lg:grid-cols-4";
        default:
          return "md:grid-cols-2 xl:grid-cols-3";
      }
    };

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          getStepColumnsClass(),
          gridClassName
        )}
        herokit-id="05813f68-58e8-4dbf-91a7-7756d86198ac"
      >
        {cards.map((card, index) => {
          return (
            <article
              key={index}
              className={cn(
                "flex h-full flex-col gap-4 rounded-[0.75rem] border border-[#27323833] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]",
                cardClassName,
                card.className,
                enableAnimation ? "animate-fade-in" : ""
              )}
              style={
                enableAnimation
                  ? { animationDelay: `${index * animationDelay}s` }
                  : undefined
              }
              herokit-id="fd2ba901-20f1-4530-8317-85e117f4788f"
            >
              <div
                className="flex flex-col gap-4"
                herokit-id="7ed1b6a3-e5d1-4f0b-8a17-4724da38ab90"
              >
                {card.step && (
                  <span
                    className="text-xl font-bold text-[#FF985C]"
                    herokit-id="b5871193-1ab0-43c3-95d8-2505f71a411f"
                  >
                    {card.step}
                  </span>
                )}
                <h3
                  className={cn(
                    "text-lg leading-snug font-normal text-[#273238]",
                    cardTitleClassName
                  )}
                  herokit-id="0c8fe146-b4b0-467d-bfff-291cfd7f6fb7"
                >
                  {card.title}
                </h3>
              </div>
              {card.description && (
                <p
                  className={cn(
                    "text-sm leading-relaxed font-normal text-[#515A5F]",
                    cardDescriptionClassName
                  )}
                  herokit-id="4d54589e-1f8b-440c-a795-5d52c705a5b2"
                >
                  {card.description}
                </p>
              )}
            </article>
          );
        })}
      </div>
    );
  };

  // Render variant link (icon in top-right, clickable cards)
  const renderVariantLink = () => {
    // Link variant uses different column layout - matches RecommendedLinks
    const getLinkColumnsClass = () => {
      switch (columns) {
        case 2:
          return "md:grid-cols-2";
        case 3:
          return "md:grid-cols-2 xl:grid-cols-3";
        case 4:
          return "md:grid-cols-2 lg:grid-cols-4";
        default:
          return "md:grid-cols-2 xl:grid-cols-3";
      }
    };

    // Get icon size classes - matches RecommendedLinks
    const getIconSizeClasses = () => {
      switch (iconSize) {
        case "sm":
          return { icon: "h-4 w-4" };
        case "lg":
          return { icon: "h-6 w-6" };
        default:
          return { icon: "h-5 w-5" };
      }
    };

    const iconSizeClasses = getIconSizeClasses();
    const IconComponent = icon; // Global icon fallback

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          getLinkColumnsClass(),
          gridClassName
        )}
        herokit-id="03747bb3-b0d4-4a4b-83ea-17690ae6ce62"
      >
        {cards.map((card, index) => {
          // Priority: card.iconComponent > global icon > card.iconImage > card.icon
          const CardIconComponent = card.iconComponent || IconComponent;
          const cardIconImage = card.iconImage;
          const cardIconName = card.icon;

          const cardContent = (
            <>
              <div
                className="flex items-center justify-between"
                herokit-id="ac7c430f-d35a-4ec3-9e1a-85f7d5bae051"
              >
                <h3
                  className={cn(
                    "text-base font-normal text-[#273238] md:min-h-[55px] md:text-xl",
                    cardTitleClassName
                  )}
                  herokit-id="633457e3-0a88-4091-b5dd-50f4d4c889f4"
                >
                  {card.title}
                </h3>
                {(CardIconComponent || cardIconImage || cardIconName) && (
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center text-[#FF985C]"
                    herokit-id="053b8d6c-7659-4ad3-9fed-875a3fbcbfeb"
                  >
                    {CardIconComponent ? (
                      <CardIconComponent
                        className={cn(
                          "text-[#FF985C]",
                          iconSizeClasses.icon,
                          card.iconClassName
                        )}
                      />
                    ) : cardIconImage ? (
                      <Image
                        src={cardIconImage}
                        alt={card.iconImageAlt || ""}
                        width={20}
                        height={20}
                        loading="lazy"
                        className={cn("h-5 w-5", card.iconImageClassName)}
                      />
                    ) : cardIconName ? (
                      <DynamicIcon
                        name={cardIconName}
                        className={cn(
                          "h-5 w-5 text-[#FF985C]",
                          card.iconClassName
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </span>
                )}
              </div>

              {card.description && (
                <p
                  className={cn(
                    "text-sm leading-relaxed font-normal text-[#515A5F]",
                    cardDescriptionClassName
                  )}
                  herokit-id="ecb37e7d-f6ba-43ae-98ca-d51e896d651f"
                >
                  {card.description}
                </p>
              )}
            </>
          );

          if (card.href) {
            return (
              <Card
                key={index}
                className={cn(
                  "rounded-[8px] border border-[#27323833] bg-gradient-to-br from-white via-white to-slate-50 p-0 shadow-none transition-all hover:bg-[linear-gradient(180deg,rgba(39,50,56,0.04)_0%,rgba(39,50,56,0)_100%)]",
                  cardClassName,
                  card.className,
                  enableAnimation ? "animate-fade-in" : ""
                )}
                style={
                  enableAnimation
                    ? { animationDelay: `${index * animationDelay}s` }
                    : undefined
                }
              >
                <CardContent className="space-y-10 p-6">
                  <a
                    href={card.href}
                    className="group flex h-full flex-col gap-14 text-left transition-all duration-200"
                    target={card.target}
                    rel={card.rel}
                    herokit-id="e678df99-8657-4cf2-a197-cc99094dad8f"
                  >
                    {cardContent}
                  </a>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card
              key={index}
              className={cn(
                "rounded-[8px] border border-[#27323833] bg-gradient-to-br from-white via-white to-slate-50 p-0 shadow-none transition-all hover:bg-[linear-gradient(180deg,rgba(39,50,56,0.04)_0%,rgba(39,50,56,0)_100%)]",
                cardClassName,
                card.className,
                enableAnimation ? "animate-fade-in" : ""
              )}
              style={
                enableAnimation
                  ? { animationDelay: `${index * animationDelay}s` }
                  : undefined
              }
            >
              <CardContent className="space-y-10 p-6">
                <div
                  className="group flex h-full flex-col gap-14 text-left transition-all duration-200"
                  herokit-id="65d524d5-c87f-45c0-8454-fff584b27253"
                >
                  {cardContent}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // Render variant feature (horizontal icon + content layout with shadcn UI)
  const renderVariantFeature = () => {
    // Feature variant uses different column layout - matches FeatureCards
    const getFeatureColumnsClass = () => {
      switch (columns) {
        case 2:
          return "grid-cols-1 lg:grid-cols-2";
        case 3:
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        case 4:
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        default:
          return "grid-cols-1 lg:grid-cols-2";
      }
    };

    // Get icon size classes for feature variant
    const getFeatureIconSizeClasses = () => {
      switch (iconSize) {
        case "sm":
          return "h-8 w-8 sm:h-10 sm:w-10";
        case "lg":
          return "h-16 w-16 sm:h-20 sm:w-20";
        default:
          return "h-full w-full ";
      }
    };

    return (
      <div
        className={cn(
          "grid gap-8 lg:gap-12",
          getFeatureColumnsClass(),
          gridClassName
        )}
        herokit-id="3e2b9c93-a66f-454d-a17e-f6b1157f4cf3"
      >
        {cards.map((card, index) => {
          const cardIconImage = card.iconImage;
          const cardIconName = card.icon;
          const CardIconComponent = card.iconComponent;

          return (
            <Card
              key={index}
              className={cn(
                "border-border bg-card text-cardForeground flex flex-row gap-4 rounded-xl border p-6 shadow-sm transition-all hover:shadow-md",
                cardClassName,
                card.className,
                enableAnimation ? "animate-fade-in" : ""
              )}
              style={
                enableAnimation
                  ? { animationDelay: `${index * animationDelay}s` }
                  : undefined
              }
            >
              <div
                className={cn(
                  "flex shrink-0 items-start justify-start",
                  cardIconClassName
                )}
                herokit-id="f2bf55ac-26ff-48b5-b288-2748693ebc76"
              >
                {CardIconComponent ? (
                  <CardIconComponent
                    className={cn(
                      "text-foreground",
                      getFeatureIconSizeClasses(),
                      card.iconClassName
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ) : cardIconImage ? (
                  <Image
                    src={cardIconImage}
                    alt={card.iconImageAlt || ""}
                    width={64}
                    height={64}
                    loading="lazy"
                    className={cn(
                      getFeatureIconSizeClasses(),
                      card.iconImageClassName
                    )}
                  />
                ) : cardIconName ? (
                  <DynamicIcon
                    name={cardIconName}
                    className={cn(
                      "text-foreground",
                      getFeatureIconSizeClasses(),
                      card.iconClassName
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <CardContent
                className="flex-1 p-0"
                herokit-id="8feb1008-ebe8-40ea-9700-7ca5c50ef700"
              >
                <h3
                  className={cn(
                    "text-foreground mb-4 text-2xl font-bold sm:text-3xl",
                    cardTitleClassName
                  )}
                  herokit-id="70a49966-53a7-44c8-9e9b-22c4cd786cca"
                >
                  {card.title}
                </h3>

                {card.description && (
                  <p
                    className={cn(
                      "text-mutedForeground leading-relaxed",
                      cardDescriptionClassName
                    )}
                    herokit-id="0c2a2027-ac6d-48a9-8b59-b23d259e9a08"
                  >
                    {card.description}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // Render variant icon-top
  const renderVariantIconTop = () => {
    return (
      <div
        className={cn("grid gap-6", getColumnsClass(), gridClassName)}
        herokit-id="912cf6c1-4754-4430-83a7-98e308d8954f"
      >
        {cards.map((card, index) => {
          const cardIconImage = card.iconImage;
          const cardIconName = card.icon;

          return (
            <Card
              key={index}
              className={cn(
                "rounded-[8px] border border-[#27323833] bg-gradient-to-br from-white via-white to-slate-50 p-0 shadow-none transition-all hover:bg-[linear-gradient(180deg,rgba(39,50,56,0.04)_0%,rgba(39,50,56,0)_100%)]",
                cardClassName,
                card.className,
                enableAnimation ? "animate-fade-in" : ""
              )}
              style={
                enableAnimation
                  ? { animationDelay: `${index * animationDelay}s` }
                  : undefined
              }
            >
              <CardContent className="space-y-10 p-6">
                <div
                  className={cn(
                    "flex items-start justify-start",
                    cardIconClassName
                  )}
                  herokit-id="2e8dcf36-2bc4-4295-8f56-3ea7090be808"
                >
                  {cardIconImage ? (
                    <Image
                      src={cardIconImage}
                      alt={card.iconImageAlt || ""}
                      loading="lazy"
                      width={24}
                      height={24}
                      className={cn(
                        "h-6 w-6 shrink-0",
                        card.iconImageClassName
                      )}
                    />
                  ) : cardIconName ? (
                    <DynamicIcon
                      name={cardIconName}
                      className={cn(card.iconClassName)}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <h3
                  className={cn(
                    "text-base font-normal text-[#273238] md:text-lg xl:text-xl",
                    cardTitleClassName
                  )}
                  herokit-id="2b183976-89e1-4658-9e6b-760a4d42b2cf"
                >
                  {card.title}
                </h3>
                <SafeHtmlRenderer
                  content={card.description || ""}
                  className={cn(
                    "text-sm leading-relaxed font-normal text-[#273238]",
                    cardDescriptionClassName
                  )}
                  herokit-id="2b183976-89e1-4658-9e6b-760a4d42b2cf"
                  tag="p"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // If noWrapper is true, render only the grid content
  if (noWrapper) {
    return (
      <>
        {variant === "icon-top" && renderVariantIconTop()}
        {variant === "cta" && renderVariantCta()}
        {variant === "step" && renderVariantStep()}
        {variant === "link" && renderVariantLink()}
        {variant === "feature" && renderVariantFeature()}
      </>
    );
  }

  return (
    <Section id={sectionId} className={cn(backgroundClassName, className)}>
      <Container
        className={cn(
          "mx-auto flex w-full flex-col px-4 py-12 lg:px-0 lg:py-28",
          getMaxWidthClass(),
          containerClassName
        )}
        herokit-id="164e574e-f6fd-45ad-9bb6-927e375befbd"
      >
        {(title || subtitle) && (
          <div
            className={cn(
              "mb-12 flex flex-col gap-4",
              getTextAlignClass(),
              titleContainerClassName
            )}
            herokit-id="67a1aa9d-6cf7-45de-aa74-49d5bb22f386"
          >
            {title && (
              <h2
                id={`${sectionId}-title`}
                className={cn(
                  "text-start text-2xl leading-10 font-[500] whitespace-pre-line text-[#243239] md:text-[2rem]",
                  titleClassName
                )}
                herokit-id="0c047eab-3348-439d-aec7-9438e6972394"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-muted-foreground text-xl",
                  subtitleClassName || ""
                )}
                herokit-id="46d6e25e-75c0-4db6-978a-16372ceeeea8"
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {variant === "icon-top" && renderVariantIconTop()}
        {variant === "cta" && renderVariantCta()}
        {variant === "step" && renderVariantStep()}
        {variant === "link" && renderVariantLink()}
        {variant === "feature" && renderVariantFeature()}
      </Container>
    </Section>
  );
};

export default CardLayout;
