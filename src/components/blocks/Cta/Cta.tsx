import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/lib/icon-utils";
import { Heading } from "../Heading/Heading";

// Base props that are common to all variants
interface BaseCtaProps {
  // Content props
  title: string;
  description?: string;
  button: {
    text: string;
    href: string;
    alt?: string;
    icon?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "accent";
    size?: "default" | "sm" | "lg" | "icon";
  };
  disclaimerTitle?: string;
  disclaimerContent?: string | React.ReactNode;

  // Styling props
  size?: "sm" | "md" | "lg";

  // Layout props
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "full";
  textAlign?: "left" | "center" | "right";
  showDisclaimer?: boolean;

  // Custom styling
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  buttonClassName?: string;
  disclaimerClassName?: string;

  // Background and spacing
  backgroundColor?: string;
  padding?: "sm" | "md" | "lg" | "xl";
  margin?: "sm" | "md" | "lg" | "xl";
}

// Banner variant props
interface BannerCtaProps extends BaseCtaProps {
  variant: "banner";
  icon: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    className?: string;
  }>;
  trustText: string;
}

// Other variant props
interface OtherCtaProps extends BaseCtaProps {
  variant?: "default" | "primary" | "secondary" | "accent";
}

// Union type for all CTA props
export type CtaProps = BannerCtaProps | OtherCtaProps;

const Cta: React.FC<CtaProps> = (props) => {
  const {
    title,
    description,
    button,
    disclaimerTitle = "Rechtlicher Hinweis",
    disclaimerContent,
    variant = "default",
    size = "md",
    maxWidth = "4xl",
    textAlign = "center",
    showDisclaimer = true,
    className,
    containerClassName,
    contentClassName,
    buttonClassName,
    disclaimerClassName,
    backgroundColor,
    padding = "md",
    margin = "md",
  } = props;

  // Extract banner-specific props when variant is 'banner'
  const icon =
    "variant" in props && props.variant === "banner" ? props.icon : undefined;
  const features =
    "variant" in props && props.variant === "banner"
      ? props.features
      : undefined;
  const trustText =
    "variant" in props && props.variant === "banner"
      ? props.trustText
      : undefined;
  // Variant-based styling
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          container: "bg-primary/5 border-primary/20",
          title: "text-primary",
          description: "text-primary/80",
          disclaimer: "bg-primary/10 border-primary/30",
        };
      case "secondary":
        return {
          container: "bg-secondary/50 border-secondary/30",
          title: "text-secondary-foreground",
          description: "text-secondary-foreground/80",
          disclaimer: "bg-secondary/30 border-secondary/40",
        };
      case "accent":
        return {
          container: "bg-accent/10 border-accent/20",
          title: "text-accent-foreground",
          description: "text-accent-foreground/80",
          disclaimer: "bg-accent/20 border-accent/30",
        };
      case "banner":
        return {
          container:
            "bg-gradient-to-br from-accent to-accent/90 text-white border-0",
          title: "text-white",
          description: "text-white/90",
          disclaimer: "bg-white/10 border-white/20",
        };
      default:
        return {
          container: "bg-background border-border",
          title: "text-foreground",
          description: "text-muted-foreground",
          disclaimer: "bg-muted/50 border-border",
        };
    }
  };

  // Size-based styling
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          title: "text-xl",
          description: "text-sm",
          spacing: "mb-4",
          disclaimer: "text-sm",
        };
      case "lg":
        return {
          title: "text-3xl",
          description: "text-lg",
          spacing: "mb-8",
          disclaimer: "text-base",
        };
      default:
        return {
          title: "text-2xl",
          description: "text-sm",
          spacing: "mb-6",
          disclaimer: "text-sm",
        };
    }
  };

  // Max width classes
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
      case "4xl":
        return "max-w-4xl";
      case "6xl":
        return "max-w-6xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-4xl";
    }
  };

  // Padding classes
  const getPaddingClass = () => {
    switch (padding) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      case "xl":
        return "p-12";
      default:
        return "p-6";
    }
  };

  // Margin classes
  const getMarginClass = () => {
    switch (margin) {
      case "sm":
        return "my-4";
      case "lg":
        return "my-12";
      case "xl":
        return "my-16";
      default:
        return "my-8";
    }
  };

  // Text alignment classes
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

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Banner variant has a completely different layout
  if (variant === "banner") {
    return (
      <section
        id="cta"
        className={cn(
          "py-20",
          variantStyles.container,
          getMarginClass(),
          className
        )}
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4">
          <div
            className={cn("mx-auto max-w-4xl text-center", getMaxWidthClass())}
            herokit-id="c192e32a-cdef-4b7e-9361-c055edf8cc8c"
          >
            {icon && (
              <DynamicIcon
                name={icon}
                className="mx-auto mb-6 h-16 w-16 text-white/80"
                aria-hidden="true"
              />
            )}

            <Heading
              level={2}
              id="cta-heading"
              className={cn(
                "font-heading mb-6 text-4xl leading-tight font-bold md:text-5xl",
                variantStyles.title
              )}
              herokit-id="7dcb16e8-bdd3-4bbd-b242-a5abbfd40938"
            >
              {title}
            </Heading>

            {description && (
              <p
                className={cn(
                  "mb-8 text-sm leading-relaxed",
                  variantStyles.description
                )}
                herokit-id="ee7b4c2e-6d9e-4f32-afae-efbbe8c4de85"
              >
                {description}
              </p>
            )}

            {features && features.length > 0 && (
              <div
                className="mx-auto mb-10 grid max-w-3xl gap-6 md:grid-cols-3"
                role="list"
                aria-label="Vorteile der kostenlosen Ersteinschätzung"
                herokit-id="c0bc8011-0d27-4a1f-8336-846ae5858571"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center space-y-2 rounded-lg bg-white/10 p-6 backdrop-blur-sm",
                      feature.className
                    )}
                    role="listitem"
                  >
                    <DynamicIcon
                      name={feature.icon}
                      className="h-8 w-8 text-white/80"
                      aria-hidden="true"
                    />
                    <span
                      className="font-medium"
                      herokit-id="a0130f67-ede9-4a41-a32f-cb5c5c72e4d5"
                    >
                      {feature.title}
                    </span>
                    <span
                      className="text-sm text-white/80"
                      herokit-id="c5dadd43-505a-4ea3-9de2-4092b8426cf1"
                    >
                      {feature.description}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Button
                asChild
                variant={button.variant || "default"}
                size={button.size || "lg"}
                className={buttonClassName}
                title={button.alt}
              >
                <Link
                  href={button.href}
                  herokit-id="201786ac-cc5b-48ca-bf72-4ebd32eaff28"
                >
                  {button.text}
                  {button.icon && (
                    <DynamicIcon name={button.icon} className="ml-2 h-4 w-4" />
                  )}
                </Link>
              </Button>
            </div>

            {trustText && (
              <p
                className="mt-6 text-sm text-white/80"
                herokit-id="d1c0d011-4997-49c0-8e16-3f0a91faa714"
              >
                {trustText}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default layout for other variants
  return (
    <div
      className={cn("mx-auto", getMaxWidthClass(), getMarginClass(), className)}
    >
      <div
        className={cn(
          "rounded-lg border",
          variantStyles.container,
          backgroundColor,
          getPaddingClass(),
          containerClassName
        )}
        herokit-id="f81297f0-f582-456d-963c-09d2c043c362"
      >
        <div
          className={cn(
            getTextAlignClass(),
            sizeStyles.spacing,
            contentClassName
          )}
          herokit-id="94969371-bb9b-4bbc-b0c2-53d5deafe2ae"
        >
          <h2
            className={cn(
              "font-heading mb-4 font-semibold",
              sizeStyles.title,
              variantStyles.title
            )}
            herokit-id="12d07353-fcc4-43f6-8669-157facb937fb"
          >
            {title}
          </h2>

          {description && (
            <p
              className={cn(
                "mb-6",
                sizeStyles.description,
                variantStyles.description
              )}
              herokit-id="5e33e15e-3f5b-4526-9f09-762cf9d28a46"
            >
              {description}
            </p>
          )}

          <Button
            asChild
            variant={button.variant || "accent"}
            size={button.size || "lg"}
            className={buttonClassName}
            title={button.alt}
          >
            <Link
              href={button.href}
              herokit-id="3a33a411-8c92-4545-9091-9af2ad82e881"
            >
              {button.text}
              {button.icon && (
                <DynamicIcon name={button.icon} className="ml-2 h-4 w-4" />
              )}
            </Link>
          </Button>
        </div>

        {showDisclaimer && (disclaimerContent || disclaimerTitle) && (
          <Card
            className={cn(
              "mt-6",
              variantStyles.disclaimer,
              disclaimerClassName
            )}
          >
            <CardContent
              className="p-4"
              herokit-id="07921cdd-a736-45ac-a996-56cd71ae903d"
            >
              {disclaimerTitle && (
                <h3
                  className={cn(
                    "mb-2 font-semibold",
                    sizeStyles.disclaimer,
                    variantStyles.title
                  )}
                  herokit-id="ff87f970-47ec-47af-990c-06b383d8c212"
                >
                  {disclaimerTitle}
                </h3>
              )}
              <div
                className={cn(sizeStyles.disclaimer, variantStyles.description)}
                herokit-id="68eb2ea1-d6c8-4e39-b3f4-605d2679da4a"
              >
                {disclaimerContent || (
                  <div>
                    <p
                      className="mb-2"
                      herokit-id="aed03652-0105-412e-937a-749a812bcafe"
                    >
                      Die hier dargestellten Inhalte dienen ausschließlich der
                      allgemeinen Information und stellen keine Rechtsberatung
                      dar.
                    </p>
                    <p herokit-id="489f1f32-1bb6-48c4-a8b8-02d0221274ae">
                      Für die Richtigkeit, Vollständigkeit und Aktualität der
                      Angaben wird keine Gewähr übernommen. Maßgeblich sind
                      stets die aktuellen Gesetzestexte und die Rechtsprechung.
                      Bei konkreten Rechtsfragen wenden Sie sich an einen
                      Rechtsanwalt oder Steuerberater.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cta;
