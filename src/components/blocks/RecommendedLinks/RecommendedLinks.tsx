import React from "react";
import { Container, Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import {
  CardLayout,
  type CardLayoutItem,
} from "@/components/blocks/CardLayout";

// Recommended link item configuration
export interface RecommendedLinkItem {
  title: string;
  excerpt: string;
  href: string;
  external?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
  className?: string;
  // Optional icon for CardLayout - if not provided, uses global icon prop
  icon?: LucideIconName;
}

// Base props for the RecommendedLinks component
export interface RecommendedLinksProps {
  // Content props
  title?: string;
  subtitle?: string;
  description?: string;
  links: RecommendedLinkItem[];

  // Section props
  sectionId?: string;
  variant?: "default" | "secondary";

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

  // Custom styling
  className?: string;
  containerClassName?: string;
  titleContainerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  gridClassName?: string;
  cardClassName?: string;

  // Icon
  icon?: LucideIcon;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;

  // CTA
  cta?: {
    label: string;
    href: string;
    external?: boolean;
    className?: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
    icon?: LucideIconName;
  };
  ctaIconName?: LucideIconName;
  ctaIconClassName?: string;

  // Icon Items
  iconItems?: {
    icon?: LucideIconName;
    image?: string;
    imageAlt?: string;
    name: string;
    className?: string;
  }[];
  iconItemsClassName?: string;

  // CardLayout props - allow parent to customize CardLayout component
  cardLayoutVariant?: "icon-top" | "cta" | "step" | "link";
  cardLayoutColumns?: 2 | 3 | 4;
  cardLayoutGridClassName?: string;
  cardLayoutCardClassName?: string;
  cardLayoutCardTitleClassName?: string;
  cardLayoutCardDescriptionClassName?: string;
  descriptionClassName?: string;
  cardLayoutEnableAnimation?: boolean;
  cardLayoutAnimationDelay?: number;
}

export const RecommendedLinks: React.FC<RecommendedLinksProps> = ({
  title,
  subtitle,
  description,
  links,
  sectionId = "recommended-links",
  variant = "default",
  columns = 3,
  maxWidth = "6xl",
  textAlign = "left",
  iconSize = "md",
  className,
  containerClassName,
  titleContainerClassName,
  titleClassName,
  subtitleClassName,
  gridClassName,
  cardClassName,
  icon,
  enableAnimation = false,
  animationDelay = 0.1,
  cta,
  ctaIconName,
  ctaIconClassName,
  iconItems,
  iconItemsClassName,
  // CardLayout props
  cardLayoutVariant = "link",
  cardLayoutColumns = 3,
  cardLayoutGridClassName,
  cardLayoutCardClassName,
  cardLayoutCardTitleClassName,
  cardLayoutCardDescriptionClassName,
  descriptionClassName,
  cardLayoutEnableAnimation = false,
  cardLayoutAnimationDelay = 0.1,
}) => {
  if (!links || links.length === 0) {
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
        return "md:grid-cols-2 xl:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-2 xl:grid-cols-3";
    }
  };

  // Get icon size classes
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
  const IconComponent = icon;
  const CTAIconName =
    cta?.icon || ctaIconName ? cta?.icon || ctaIconName : undefined;

  const renderCTA = () => {
    if (!cta) return null;

    return (
      <Button
        asChild
        variant={cta.variant || "default"}
        className={cn(
          "inline-flex items-center justify-start gap-2 rounded-[8px] px-6 py-6 text-sm font-semibold",
          "gap-6 bg-slate-900 text-white hover:bg-slate-900/90",
          cta.className
        )}
      >
        <Link
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          herokit-id="6320af48-7d4a-4caa-89db-f1db229378e5"
        >
          {cta.label}
          {CTAIconName && (
            <DynamicIcon
              name={CTAIconName}
              className={cn("h-3 w-3", ctaIconClassName)}
              aria-hidden="true"
            />
          )}
        </Link>
      </Button>
    );
  };

  return (
    <Section
      id={sectionId}
      variant={variant}
      className={cn("bg-white", className)}
    >
      <Container
        className={cn(
          "mx-auto flex w-full flex-col px-4 py-12 lg:px-0 lg:py-28",
          getMaxWidthClass(),
          containerClassName
        )}
        herokit-id="db964b99-208e-48e4-bd02-404829a0f8ef"
      >
        {(title || subtitle) && (
          <div
            className={cn("flex", getTextAlignClass(), titleContainerClassName)}
            herokit-id="79acecde-3daf-439b-9ef8-38c5f07f1336"
          >
            <div
              className="flex flex-col gap-4 md:gap-10"
              herokit-id="984aa2b0-cdc0-4abf-b249-66d084bb0411"
            >
              {title && (
                <h2
                  id={`${sectionId}-title`}
                  className={cn(
                    "text-start text-2xl leading-10 font-[500] text-[#273238] xl:text-[2rem] xl:whitespace-pre-line",
                    titleClassName
                  )}
                  herokit-id="108172fb-44b7-4b26-9bd0-1d740de096a2"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  className={cn(
                    "mx-auto text-base text-[#243239]",
                    getMaxWidthClass(),
                    descriptionClassName
                  )}
                  herokit-id="bb9c4627-8ae8-471d-9c20-d7bd3c9c07e6"
                >
                  {description}
                </p>
              )}
            </div>
            {renderCTA()}
          </div>
        )}
        {subtitle && (
          <p
            className={cn(
              "text-muted-foreground mx-auto text-xl",
              getMaxWidthClass(),
              subtitleClassName || ""
            )}
            herokit-id="11833665-7925-42a1-a15b-a8aec2193a23"
          >
            {subtitle}
          </p>
        )}

        {/* CardLayout component with link variant */}
        <CardLayout
          cards={
            links.map((link) => ({
              title: link.title,
              description: link.excerpt,
              href: link.href,
              target: link.external ? "_blank" : link.target,
              rel: link.external ? "noopener noreferrer" : link.rel,
              // Use per-link icon name if provided
              icon: link.icon,
            })) as CardLayoutItem[]
          }
          variant={cardLayoutVariant}
          columns={cardLayoutColumns}
          gridClassName={cardLayoutGridClassName}
          cardClassName={cardLayoutCardClassName}
          cardTitleClassName={cardLayoutCardTitleClassName}
          cardDescriptionClassName={cardLayoutCardDescriptionClassName}
          enableAnimation={cardLayoutEnableAnimation}
          animationDelay={cardLayoutAnimationDelay}
          icon={icon}
          iconSize={iconSize}
          noWrapper={true}
        />

        {iconItems && iconItems.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-2 gap-8 lg:flex lg:items-center lg:justify-between",
              iconItemsClassName
            )}
            herokit-id="6e703050-4e34-455e-ba3b-d3bedc04e327"
          >
            {iconItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center gap-6",
                  item.className
                )}
                herokit-id="49fcd42d-e1e5-4e02-9665-8209abbe845e"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.name}
                    loading="lazy"
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                    unoptimized
                  />
                ) : item.icon ? (
                  <DynamicIcon
                    name={item.icon}
                    className="h-6 w-6 text-[#FF985C]"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className="text-center text-sm font-normal text-[#273238] md:text-base"
                  herokit-id="b0dc6e5b-c0c4-4f5a-abc7-70fda90f9805"
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
};
