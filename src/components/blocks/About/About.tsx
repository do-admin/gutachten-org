import React from "react";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

// Base props for the About component
export interface AboutProps {
  // Content props
  title: string;
  subtitle?: string;
  subtitleHighlight?: string;
  subtitleHighlightOne?: string;
  subtitleHighlightTwo?: string;
  subtitleHighlightThree?: string;
  description: string[];
  highlights: Array<{
    icon: LucideIcon;
    value: string;
    label: string;
    className?: string;
  }>;

  // Section props
  sectionId?: string;
  variant?: "default" | "secondary";

  // Styling props
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "6xl" | "full";
  textAlign?: "left" | "center" | "right";

  // Custom styling
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  subtitleHighlightClassName?: string;
  cardClassName?: string;
  highlightCardClassName?: string;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;
}

export const About: React.FC<AboutProps> = ({
  title,
  subtitle,
  subtitleHighlight,
  subtitleHighlightOne,
  subtitleHighlightTwo,
  subtitleHighlightThree,
  description,
  highlights,
  sectionId = "about",
  variant = "secondary",
  maxWidth = "4xl",
  textAlign = "center",
  className,
  containerClassName,
  titleClassName,
  subtitleClassName,
  subtitleHighlightClassName = "strong",
  cardClassName,
  highlightCardClassName,
  enableAnimation = true,
  animationDelay = 0.1,
}) => {
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
      case "3xl":
        return "max-w-3xl";
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

  const renderSubtitle = (className: string) => {
    if (!subtitle) return null;

    const highlightTexts: string[] = [];
    if (subtitleHighlightOne) highlightTexts.push(subtitleHighlightOne);
    if (subtitleHighlightTwo) highlightTexts.push(subtitleHighlightTwo);
    if (subtitleHighlightThree) highlightTexts.push(subtitleHighlightThree);

    if (subtitleHighlight && highlightTexts.length === 0) {
      highlightTexts.push(subtitleHighlight);
    }

    if (highlightTexts.length === 0) {
      return (
        <span
          className={className}
          herokit-id="1a5e3209-5b30-4c47-ae81-b99fcc50065b"
        >
          {subtitle}
        </span>
      );
    }

    const parts: React.ReactNode[] = [];
    let remainingText = subtitle;
    let keyCounter = 0;

    highlightTexts.forEach((highlightText) => {
      const splitIndex = remainingText.indexOf(highlightText);

      if (splitIndex !== -1) {
        if (splitIndex > 0) {
          parts.push(
            <span
              key={`text-${keyCounter++}`}
              herokit-id="846dda62-7aeb-445c-84ce-766b3cbca984"
            >
              {remainingText.substring(0, splitIndex)}
            </span>
          );
        }

        parts.push(
          <span
            key={`highlight-${keyCounter++}`}
            className={subtitleHighlightClassName || "strong"}
            herokit-id="f64c1262-a53b-43a5-9cef-9661b98fb715"
          >
            {highlightText}
          </span>
        );

        remainingText = remainingText.substring(
          splitIndex + highlightText.length
        );
      }
    });

    if (remainingText.length > 0) {
      parts.push(
        <span
          key={`text-${keyCounter++}`}
          herokit-id="5700eb80-3ec9-42e1-b367-a691d4f732a2"
        >
          {remainingText}
        </span>
      );
    }

    if (parts.length === 0) {
      return (
        <span
          className={className}
          herokit-id="9933a3d5-cd15-4a18-afee-9a908f90e13c"
        >
          {subtitle}
        </span>
      );
    }

    return (
      <span
        className={className}
        herokit-id="ea586804-e2d0-4890-a768-3fdf35712289"
      >
        {parts}
      </span>
    );
  };

  return (
    <Section id={sectionId} variant={variant} className={className}>
      <Container className={containerClassName}>
        <div className={`mx-auto ${getMaxWidthClass()}`}>
          <div
            className={`mb-12 space-y-4 ${getTextAlignClass()}`}
            herokit-id="31e72382-7769-4737-ad3c-f4c3f96cda47"
          >
            <h2
              id={`${sectionId}-title`}
              className={titleClassName}
              herokit-id="b52bfa11-dc29-4dff-a240-b675a5a5b4fc"
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`text-muted-foreground text-sm ${subtitleClassName}`}
                herokit-id="f2639082-4950-4380-8fa3-5413ce5fafa5"
              >
                {renderSubtitle("")}
              </p>
            )}
          </div>

          <div className="space-y-8">
            <Card className={cardClassName}>
              <CardContent
                className="p-6"
                herokit-id="24eb2700-c866-4083-91bb-63a01092c95c"
              >
                {description.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-muted-foreground text-sm leading-relaxed ${
                      index > 0 ? "mt-4" : ""
                    }`}
                    herokit-id="05f796f2-0569-48bd-bdc3-08f210445d7a"
                  >
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            <div
              className="grid gap-6 md:grid-cols-3"
              herokit-id="a4c1a6dd-060d-487b-a9ff-a5047e6ee6ff"
            >
              {highlights.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card
                    key={item.label}
                    className={`text-center ${highlightCardClassName || ""} ${
                      enableAnimation ? "animate-fade-in" : ""
                    } ${item.className || ""}`}
                    style={
                      enableAnimation
                        ? { animationDelay: `${index * animationDelay}s` }
                        : undefined
                    }
                  >
                    <CardContent className="space-y-4 p-6">
                      <div className="bg-accent/10 mx-auto flex h-12 w-12 items-center justify-center rounded-lg">
                        <IconComponent className="text-accent h-6 w-6" />
                      </div>
                      <div
                        className="text-primary text-3xl font-bold"
                        herokit-id="636bdfdd-486b-4efc-bfac-c4b8b1d288a4"
                      >
                        {item.value}
                      </div>
                      <div
                        className="text-muted-foreground text-sm"
                        herokit-id="15d7c254-7046-494b-b4fa-24eb3553861c"
                      >
                        {item.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
