import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollButton } from "@/components/ui/scroll-button";
import { LucideIcon } from "lucide-react";

// Service item configuration
export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description?: string;
  bullets: string[];
  buttonText?: string;
  buttonHref?: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  onButtonClick?: () => void;
  className?: string;
}

// Base props for the Services component
export interface ServicesProps {
  // Content props
  title: string;
  subtitle?: string;
  services: ServiceItem[];

  // Section props
  sectionId?: string;
  variant?: "default" | "secondary";

  // Layout props
  columns?: 1 | 2 | 3 | 4;

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
  titleClassName?: string;
  subtitleClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;

  // Behavior
  enableScrollTo?: boolean;
  defaultButtonText?: string;
  defaultScrollTarget?: string;
  showButtons?: boolean;
}

export const Services: React.FC<ServicesProps> = ({
  title,
  subtitle,
  services,
  sectionId = "services",
  variant = "default",
  columns = 2,
  maxWidth = "7xl",
  textAlign = "center",
  iconSize = "md",
  className,
  containerClassName,
  titleClassName,
  subtitleClassName,
  gridClassName,
  cardClassName,
  iconWrapperClassName,
  enableAnimation = true,
  animationDelay = 0.1,
  enableScrollTo = true,
  defaultButtonText = "Learn more",
  defaultScrollTarget = "#contact",
  showButtons = true,
}) => {
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
        return "max-w-7xl";
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
      case 1:
        return "grid-cols-1";
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-2";
    }
  };

  // Get icon size classes
  const getIconSizeClasses = () => {
    switch (iconSize) {
      case "sm":
        return { wrapper: "h-10 w-10", icon: "h-5 w-5" };
      case "lg":
        return { wrapper: "h-14 w-14", icon: "h-7 w-7" };
      default:
        return { wrapper: "h-12 w-12", icon: "h-6 w-6" };
    }
  };

  const iconSizeClasses = getIconSizeClasses();

  return (
    <Section id={sectionId} variant={variant} className={className}>
      <Container className={containerClassName}>
        <div
          className={`${getTextAlignClass()} mb-12 space-y-4`}
          herokit-id="93965ca2-49cb-406f-9a89-f7b4ccdcbf57"
        >
          <h2
            id={`${sectionId}-title`}
            className={titleClassName}
            herokit-id="d5e2526b-9c70-4ee7-bf14-3413b2daa4cb"
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-muted-foreground mx-auto text-sm ${getMaxWidthClass()} ${subtitleClassName || ""}`}
              herokit-id="1e373d23-1a20-43db-9c56-d87ac10acba3"
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid gap-8 ${getColumnsClass()} ${gridClassName || ""}`}
          herokit-id="b97dbb42-0ba0-44fd-b8d2-412911c70f7b"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const buttonText = service.buttonText || defaultButtonText;
            const buttonHref = service.buttonHref || defaultScrollTarget;
            
            // Determine if the card should be clickable (for non-hash links)
            const isCardClickable = buttonHref && !buttonHref.startsWith("#") && (buttonHref.startsWith("/") || buttonHref.startsWith("http"));
            const isHashLink = buttonHref && buttonHref.startsWith("#");

            const handleCardClick = () => {
              if (isHashLink && enableScrollTo) {
                const element = document.querySelector(buttonHref);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
              if (service.onButtonClick) {
                service.onButtonClick();
              }
            };

            const cardContent = (
              <Card
                key={index}
                className={`flex h-full flex-col ${cardClassName || ""} ${service.className || ""} ${
                  enableAnimation ? "animate-fade-in" : ""
                } ${isCardClickable || isHashLink ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
                style={
                  enableAnimation
                    ? { animationDelay: `${index * animationDelay}s` }
                    : undefined
                }
                onClick={isHashLink ? handleCardClick : undefined}
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-4">
                    <div
                      className={`bg-primary/10 flex items-center justify-center rounded-lg ${iconSizeClasses.wrapper} ${iconWrapperClassName || ""}`}
                    >
                      <IconComponent
                        className={`text-primary ${iconSizeClasses.icon}`}
                      />
                    </div>
                    <CardTitle
                      className="text-2xl"
                      herokit-id="3cbc4239-a4ec-4c97-b58b-53cdb13bbf03"
                    >
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent
                  className="flex flex-1 flex-col space-y-4"
                  herokit-id="a2bc3a6c-b0a4-4b24-9298-cc154005170b"
                >
                  {service.description && (
                    <p
                      className="text-muted-foreground"
                      herokit-id="a198c17a-0ee1-46c3-92c5-61bd0314c302"
                    >
                      {service.description}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span
                          className="text-accent mt-0"
                          herokit-id="9704e2ad-78b5-484a-beb7-c7383ad8703e"
                        >
                          ✓
                        </span>
                        <span
                          className="text-muted-foreground"
                          herokit-id="d23b0ac5-71fb-42f9-803a-c7d35aacbf78"
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {showButtons && (
                    <div className="mt-auto pt-4" onClick={(e) => e.stopPropagation()}>
                      {isCardClickable || isHashLink ? (
                        <div
                          className={`w-full rounded-md border px-4 py-2 text-center text-sm font-medium ${
                            service.buttonVariant === "outline"
                              ? "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                          }`}
                          role="button"
                          aria-label={buttonText}
                        >
                          {buttonText}
                        </div>
                      ) : (
                        <ScrollButton
                          href={buttonHref}
                          text={buttonText}
                          variant={service.buttonVariant || "outline"}
                          onClick={service.onButtonClick}
                          enableScrollTo={enableScrollTo}
                          className="w-full"
                        />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            // Wrap card in Link if it's a regular URL
            if (isCardClickable) {
              return (
                <Link
                  href={buttonHref}
                  className="block"
                  key={index}
                >
                  {cardContent}
                </Link>
              );
            }

            return cardContent;
          })}
        </div>
      </Container>
    </Section>
  );
};
