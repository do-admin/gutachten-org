import React from "react";
import { Container, Section } from "@/components/ui/section";
import { LucideIcon } from "lucide-react";
import { DynamicIcon } from "@/lib/icon-utils";

// Feature card item configuration
export interface FeatureCardItem {
  id?: number;
  icon: LucideIcon | string;
  title: string;
  description: string;
}

// Props for the FeatureCards component
export interface FeatureCardsProps {
  // Content props
  cards: FeatureCardItem[];

  // Section props
  sectionId?: string;

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
    | "7xl"
    | "full";

  // Custom styling
  className?: string;
  containerClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  cards,
  sectionId = "feature-cards",
  columns = 2,
  maxWidth = "7xl",
  className,
  containerClassName,
  gridClassName,
  cardClassName,
  iconWrapperClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
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
      case "7xl":
        return "max-w-7xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-7xl";
    }
  };

  // Get columns class
  const getColumnsClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
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

  return (
    <Section id={sectionId} className={className}>
      <Container
        className={`${getMaxWidthClass()} ${containerClassName || ""}`}
      >
        <div
          className={`grid ${getColumnsClass()} gap-8 lg:gap-12 ${gridClassName || ""}`}
          herokit-id="136b10ad-87f4-4b4b-8f42-1408499a0dd6"
        >
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id || index}
                className={`flex gap-4 sm:gap-6 ${cardClassName || ""}`}
              >
                <div
                  className={`flex-shrink-0 ${iconWrapperClassName || ""}`}
                  herokit-id="8ab16393-aa0c-4b9c-878b-f7c9e37a7721"
                >
                  {typeof IconComponent === "string" ? (
                    <DynamicIcon
                      name={IconComponent}
                      className={`text-foreground h-12 w-12 sm:h-16 sm:w-16 ${iconClassName || ""}`}
                      strokeWidth={1.5}
                    />
                  ) : (
                    <IconComponent
                      className={`text-foreground h-12 w-12 sm:h-16 sm:w-16 ${iconClassName || ""}`}
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h2
                    className={`text-foreground mb-4 text-2xl font-bold sm:text-3xl ${titleClassName || ""}`}
                    herokit-id="a699fe78-ff9e-4590-b9ff-a93798b7df78"
                  >
                    {card.title}
                  </h2>
                  <p
                    className={`text-mutedForeground text-justify leading-relaxed ${descriptionClassName || ""}`}
                    herokit-id="edeed225-4af8-4d68-b0b4-3998495e8422"
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default FeatureCards;
