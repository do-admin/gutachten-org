import React from "react";
import { Container, Section } from "@/components/ui/section";
import { ScrollButton } from "@/components/ui/scroll-button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

// Base props for the FinalCTA component
export interface FinalCTAProps {
  // Content props
  title: string;
  description?: string;
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
    className?: string;
    outlineClassName?: string;
  }>;

  // Section props
  sectionId?: string;
  variant?: "default" | "secondary";

  // Card styling
  cardVariant?: "default" | "primary" | "accent" | "secondary";

  // Styling props
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "6xl" | "full";
  textAlign?: "left" | "center" | "right";
  padding?: "sm" | "md" | "lg" | "xl";

  // Custom styling
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonsWrapperClassName?: string;

  // Behavior
  enableScrollTo?: boolean;
  scrollToSelector?: string;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  title,
  description,
  buttons,
  sectionId = "cta",
  variant = "secondary",
  cardVariant = "primary",
  maxWidth = "2xl",
  textAlign = "center",
  padding = "lg",
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  buttonsWrapperClassName,
  enableScrollTo = true,
  scrollToSelector = "#bewertung",
}) => {
  // Get card variant styles
  const getCardVariantStyles = () => {
    switch (cardVariant) {
      case "primary":
        return "bg-primary text-primary-foreground border-0";
      case "accent":
        return "bg-accent text-accent-foreground border-0";
      case "secondary":
        return "bg-secondary text-secondary-foreground border-0";
      default:
        return "";
    }
  };

  // Get padding class
  const getPaddingClass = () => {
    switch (padding) {
      case "sm":
        return "py-8";
      case "md":
        return "py-10";
      case "lg":
        return "py-12";
      case "xl":
        return "py-16";
      default:
        return "py-12";
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

  // Get button justify class
  const getButtonsJustifyClass = () => {
    switch (textAlign) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  return (
    <Section id={sectionId} variant={variant} className={className}>
      <Container className={containerClassName}>
        <Card className={`${getCardVariantStyles()} ${cardClassName || ""}`}>
          <CardContent
            className={`${getPaddingClass()} ${getTextAlignClass()} space-y-6 ${contentClassName || ""}`}
            herokit-id="9a4c2500-8c99-46b0-a24d-ff2cadffd13c"
          >
            <h2
              className={
                titleClassName ||
                (cardVariant === "primary" ? "text-primary-foreground" : "")
              }
              herokit-id="0bf5dde6-c8bf-4a8b-9b05-497f1cc81fab"
            >
              {title}
            </h2>
            {description && (
              <p
                className={`mx-auto max-w-2xl text-xl ${
                  descriptionClassName ||
                  (cardVariant === "primary"
                    ? "text-primary-foreground/90"
                    : "text-muted-foreground")
                }`}
                herokit-id="8aa882eb-f99f-4fac-a18f-f859402dfb9a"
              >
                {description}
              </p>
            )}
            <div
              className={`flex flex-wrap gap-4 pt-4 ${getButtonsJustifyClass()} ${buttonsWrapperClassName || ""}`}
              herokit-id="1ce8912c-54de-48b3-a755-0967b646558f"
            >
              {buttons.map((button, index) => (
                <ScrollButton
                  key={index}
                  href={button.href}
                  text={button.text}
                  size={button.size || "lg"}
                  variant={button.variant || "secondary"}
                  icon={button.icon}
                  onClick={button.onClick}
                  enableScrollTo={enableScrollTo}
                  className={[
                    button.variant === "outline" && cardVariant === "primary"
                      ? "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                      : "",
                    button.variant === "outline" ? button.outlineClassName : "",
                    button.className || "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
};
