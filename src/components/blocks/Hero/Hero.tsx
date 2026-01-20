import React from "react";
import { ScrollButton } from "@/components/ui/scroll-button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

// Base props for the Hero component
export interface HeroProps {
  // Content props
  title: string;
  highlightText?: string;
  description: string;
  buttons: Array<{
    text: string;
    href: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "accent";
    size?: "default" | "sm" | "lg" | "icon";
    icon?: LucideIcon;
    onClick?: () => void;
  }>;
  trustBadges?: Array<{
    text: string;
    icon?: LucideIcon;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;

  // Image props
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
  };

  // Section props
  sectionId?: string;

  // Layout props
  layout?: "default" | "centered" | "image-left";
  imagePosition?: "right" | "left";

  // Styling props
  paddingTop?: "sm" | "md" | "lg" | "xl";
  paddingBottom?: "sm" | "md" | "lg" | "xl";

  // Custom styling
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  highlightClassName?: string;
  descriptionClassName?: string;
  buttonsWrapperClassName?: string;
  badgesWrapperClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;

  // Animation
  enableAnimation?: boolean;
  imageAnimationDelay?: number;

  // Behavior
  enableScrollTo?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  highlightText,
  description,
  buttons,
  trustBadges = [],
  image,
  sectionId = "hero",
  layout = "default",
  imagePosition = "right",
  paddingTop = "md",
  paddingBottom = "xl",
  className,
  containerClassName,
  contentClassName,
  titleClassName,
  highlightClassName,
  descriptionClassName,
  buttonsWrapperClassName,
  badgesWrapperClassName,
  imageWrapperClassName,
  imageClassName,
  enableAnimation = true,
  imageAnimationDelay = 0.2,
  enableScrollTo = true,
}) => {
  // Get padding classes
  const getPaddingTopClass = () => {
    switch (paddingTop) {
      case "sm":
        return "pt-4";
      case "md":
        return "pt-8 md:pt-12";
      case "lg":
        return "pt-12 md:pt-16";
      case "xl":
        return "pt-16 md:pt-24";
      default:
        return "pt-8 md:pt-12";
    }
  };

  const getPaddingBottomClass = () => {
    switch (paddingBottom) {
      case "sm":
        return "pb-8";
      case "md":
        return "pb-12";
      case "lg":
        return "pb-16";
      case "xl":
        return "pb-16 md:pb-24";
      default:
        return "pb-16 md:pb-24";
    }
  };

  const renderContent = () => (
    <div
      className={`space-y-8 ${enableAnimation ? "animate-fade-in" : ""} ${contentClassName || ""}`}
      herokit-id="ffb294fb-738f-4860-91bc-8ae61d4a1ede"
    >
      <div className="space-y-4">
        <h1
          className={`text-balance ${titleClassName || ""}`}
          herokit-id="b1da9d64-b645-4572-9526-6f484b19b298"
        >
          {highlightText ? (
            <>
              {title.split(highlightText)[0]}
              <span
                className={highlightClassName || "text-accent"}
                herokit-id="20156c02-9a05-4206-a7f5-70c4ef4fee37"
              >
                {highlightText}
              </span>
              {title.split(highlightText)[1]}
            </>
          ) : (
            title
          )}
        </h1>
        <p
          className={`text-muted-foreground max-w-2xl text-sm text-balance ${descriptionClassName || ""}`}
          herokit-id="301099ef-d84f-436f-b4d0-5586cda75685"
        >
          {description}
        </p>
      </div>

      <div
        className={`flex flex-wrap gap-4 ${buttonsWrapperClassName || ""}`}
        herokit-id="675091bb-6938-4e29-96b2-c4fece7a1939"
      >
        {buttons.map((button, index) => (
          <ScrollButton
            key={index}
            href={button.href}
            text={button.text}
            size={button.size || "lg"}
            variant={button.variant}
            icon={button.icon}
            onClick={button.onClick}
            enableScrollTo={enableScrollTo}
          />
        ))}
      </div>

      {trustBadges.length > 0 && (
        <div
          className={`flex flex-wrap gap-4 pt-4 ${badgesWrapperClassName || ""}`}
          herokit-id="3c63b350-00e3-47dc-96b9-3a123f9a2db0"
        >
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <Badge
                key={index}
                variant={badge.variant || "secondary"}
                className="px-4 py-2 text-sm"
                herokit-id="cf5ecd5c-ba0c-4e71-b07e-68476062df8a"
              >
                {IconComponent && (
                  <IconComponent className="text-accent mr-2 h-4 w-4" />
                )}
                {badge.text}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderImage = () => {
    if (!image) return null;

    return (
      <div
        className={`relative ${enableAnimation ? "animate-fade-in" : ""} ${imageWrapperClassName || ""}`}
        style={
          enableAnimation
            ? { animationDelay: `${imageAnimationDelay}s` }
            : undefined
        }
      >
        <div
          className={`aspect-video overflow-hidden rounded-lg shadow-2xl ${imageClassName || ""}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
            priority={image.priority !== false}
            width={image.width || 1200}
            height={image.height || 800}
          />
        </div>
      </div>
    );
  };

  return (
    <Section
      id={sectionId}
      className={`${getPaddingTopClass()} ${getPaddingBottomClass()} ${className || ""}`}
    >
      <Container
        className={containerClassName}
        herokit-id="9bebbfac-523a-4211-a5b2-7d38bcc32ab3"
      >
        {layout === "centered" ? (
          <div
            className="mx-auto max-w-4xl space-y-8 text-center"
            herokit-id="2c5990b6-ccd7-48e8-b45b-760cdb33c7c4"
          >
            {renderContent()}
            {renderImage()}
          </div>
        ) : (
          <div
            className={`grid items-center gap-12 lg:grid-cols-2 ${
              imagePosition === "left" ? "lg:grid-flow-dense" : ""
            }`}
          >
            <div
              className={imagePosition === "left" ? "lg:col-start-2" : ""}
              herokit-id="2225ab4d-1390-427d-add0-de051bca26cb"
            >
              {renderContent()}
            </div>
            <div
              className={
                imagePosition === "left" ? "lg:col-start-1 lg:row-start-1" : ""
              }
              herokit-id="fc565a82-e2f1-4e9a-94ab-ffffbb0d7e29"
            >
              {renderImage()}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};
