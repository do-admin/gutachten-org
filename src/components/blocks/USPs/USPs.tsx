import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// USP item configuration
export interface USPItem {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

// Base props for the USPs component
export interface USPsProps {
  // Content props
  title: string;
  subtitle?: string;
  usps: USPItem[];

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
  titleClassName?: string;
  subtitleClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  contentClassName?: string;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;
  enableHoverEffect?: boolean;
  cta?: {
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
    size?: "default" | "sm" | "lg";
    className?: string;
  };
}

export const USPs: React.FC<USPsProps> = ({
  title,
  subtitle,
  usps,
  sectionId = "usps",
  variant = "secondary",
  columns = 4,
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
  iconClassName,
  contentClassName,
  enableAnimation = true,
  animationDelay = 0.1,
  enableHoverEffect = true,
  cta,
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
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-2 lg:grid-cols-4";
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
      <Container
        className={containerClassName}
        herokit-id="14b85b36-497d-4e89-95b9-b54fafe32578"
      >
        <div
          className={`${getTextAlignClass()} mb-12 space-y-4`}
          herokit-id="608a68f6-9054-4890-8e14-d4d26fa6df7e"
        >
          <h2
            id={`${sectionId}-title`}
            className={titleClassName}
            herokit-id="ea6bc4ed-a367-4514-bc83-30941340e5ca"
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-muted-foreground mx-auto text-sm ${getMaxWidthClass()} ${subtitleClassName || ""}`}
              herokit-id="cbbf222f-7702-4ff8-ae0d-668d05cab905"
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid gap-6 ${getColumnsClass()} ${gridClassName || ""}`}
          herokit-id="d2d70f47-dd4c-42bd-bd4a-dcb775f29716"
        >
          {usps.map((usp, index) => {
            const IconComponent = usp.icon;

            return (
              <Card
                key={index}
                className={`${cardClassName || ""} ${usp.className || ""} ${
                  enableAnimation ? "animate-fade-in" : ""
                } ${enableHoverEffect ? "transition-shadow hover:shadow-lg" : ""}`}
                style={
                  enableAnimation
                    ? { animationDelay: `${index * animationDelay}s` }
                    : undefined
                }
              >
                <CardContent
                  className={`space-y-4 p-6 ${contentClassName || ""}`}
                >
                  <div
                    className={`bg-accent/10 flex items-center justify-center rounded-lg ${iconSizeClasses.wrapper} ${iconWrapperClassName || ""}`}
                  >
                    <IconComponent
                      className={`text-accent ${iconSizeClasses.icon} ${iconClassName || ""}`}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    herokit-id="b3bc15e0-1c66-4725-a97d-2c5c629a6d97"
                  >
                    {usp.title}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    herokit-id="f4872791-0419-4f33-a9c4-9564ef3da0b5"
                  >
                    {usp.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {cta && (
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              variant={cta.variant || "accent"}
              size={cta.size || "lg"}
              className={cta.className}
            >
              <Link
                href={cta.href}
                herokit-id="b47f1269-f5c1-4c28-9bd9-5a431ae2a9ee"
              >
                {cta.text}
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
};
