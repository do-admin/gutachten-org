import React from "react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Reference item configuration
export interface ReferenceItem {
  title: string;
  kpis: string[];
  quote: string;
  author: string;
  rating?: number;
  className?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    wrapperClassName?: string;
  };
}

// Base props for the References component
export interface ReferencesProps {
  // Content props
  title: string;
  subtitle?: string;
  references: ReferenceItem[];

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

  // Custom styling
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  gridClassName?: string;
  cardClassName?: string;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;

  // Rating
  showRating?: boolean;
  ratingIcon?: LucideIcon;
  maxRating?: number;
}

export const References: React.FC<ReferencesProps> = ({
  title,
  subtitle,
  references,
  sectionId = "referenzen",
  variant = "default",
  columns = 3,
  maxWidth = "7xl",
  textAlign = "center",
  className,
  containerClassName,
  titleClassName,
  subtitleClassName,
  gridClassName,
  cardClassName,
  enableAnimation = true,
  animationDelay = 0.15,
  showRating = true,
  ratingIcon = Star,
  maxRating = 5,
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

  const getImageJustifyClass = () => {
    switch (textAlign) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
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

  const RatingIcon = ratingIcon;

  return (
    <Section id={sectionId} variant={variant} className={className}>
      <Container className={containerClassName}>
        <div
          className={`${getTextAlignClass()} mb-12 space-y-4`}
          herokit-id="b92b781e-7275-45fb-892b-75b7528f0cd1"
        >
          <h2
            id={`${sectionId}-title`}
            className={titleClassName}
            herokit-id="28c88da8-d35e-4bc7-a6c2-e6c5a5fb3884"
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-muted-foreground mx-auto text-xl ${getMaxWidthClass()} ${subtitleClassName || ""}`}
              herokit-id="9d4ab683-62b3-46fa-9798-f73116a03bcf"
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid gap-8 ${getColumnsClass()} ${gridClassName || ""}`}
          herokit-id="7845711e-cf18-4f6a-a642-9c93bda928c9"
        >
          {references.map((ref, index) => {
            const rating = ref.rating || maxRating;

            return (
              <Card
                key={index}
                className={`${cardClassName || ""} ${ref.className || ""} ${
                  enableAnimation ? "animate-fade-in" : ""
                }`}
                style={
                  enableAnimation
                    ? { animationDelay: `${index * animationDelay}s` }
                    : undefined
                }
              >
                <CardContent
                  className="space-y-6 p-0"
                  herokit-id="a081018a-fdd6-4e5c-aaa4-a56552f03b7a"
                >
                  {ref.image && (
                    <div
                      className={`flex ${getImageJustifyClass()} ${ref.image.wrapperClassName || ""}`.trim()}
                    >
                      <Image
                        src={ref.image.src}
                        alt={ref.image.alt}
                        width={ref.image.width ?? 80}
                        height={ref.image.height ?? 80}
                        className={`h-48 w-full rounded-xl object-cover ${ref.image.className || ""}`.trim()}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="px-6">
                    <h3
                      className="mb-4 text-xl font-semibold"
                      herokit-id="d3b0d1f6-8c39-448e-813a-fc68ac2c729a"
                    >
                      {ref.title}
                    </h3>
                    <div
                      className="space-y-2"
                      herokit-id="67371e36-b30b-4d69-9e71-ade8838fbd8b"
                    >
                      {ref.kpis.map((kpi, kpiIndex) => (
                        <div key={kpiIndex} className="flex items-center gap-2">
                          <span
                            className="text-accent"
                            herokit-id="e3fd68f0-f57b-4888-97cf-4c1b1ec65211"
                          >
                            ✓
                          </span>
                          <span
                            className="text-sm font-medium"
                            herokit-id="985e7b60-6cb8-4088-a352-b1e653f7815c"
                          >
                            {kpi}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="mx-auto my-0 max-w-[90%]" />

                  <div
                    className="space-y-3 p-6 pt-4"
                    herokit-id="8eac5a7b-fa4b-46af-a678-a680c9ccc032"
                  >
                    {showRating && (
                      <div
                        className="flex gap-1"
                        aria-label={`Rating: ${rating} out of ${maxRating}`}
                        herokit-id="af8449cf-bf7a-4b62-9c22-c1a69a8c069d"
                      >
                        {[...Array(maxRating)].map((_, i) => (
                          <RatingIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    )}
                    <p
                      className="text-muted-foreground text-sm leading-relaxed italic"
                      herokit-id="656c185e-5a3a-415d-82b0-4fdd0647e597"
                    >
                      "{ref.quote}"
                    </p>
                    <p
                      className="text-foreground text-sm font-medium"
                      herokit-id="72c17604-d858-4eef-9198-0bf6e09f85f2"
                    >
                      – {ref.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
