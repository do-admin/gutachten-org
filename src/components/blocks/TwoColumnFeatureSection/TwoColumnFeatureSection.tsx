import React from "react";
import Image from "next/image";
import { Section, Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";

export interface FeatureCard {
  icon?: string | LucideIconName;
  title: string;
  description: string;
  iconClassName?: string;
  cardClassName?: string;
}

export interface TwoColumnFeatureSectionProps {
  // Left column content
  heading: string;
  paragraphs: string[];

  // Right column content
  features: FeatureCard[];

  // Styling
  sectionId?: string;
  className?: string;
  containerClassName?: string;
  headingClassName?: string;
  paragraphClassName?: string;
  leftColumnClassName?: string;
  rightColumnClassName?: string;

  // Border styling
  borderColor?: string;
}

export const TwoColumnFeatureSection: React.FC<
  TwoColumnFeatureSectionProps
> = ({
  heading,
  paragraphs,
  features,
  sectionId = "two-column-feature-section",
  className = "",
  containerClassName = "",
  headingClassName = "",
  paragraphClassName = "",
  leftColumnClassName = "",
  rightColumnClassName = "",
  borderColor = "#F0F5F9",
}) => {
  return (
    <>
      <style>
        {`
          .two-column-feature-border {
            border-color: color(display-p3 0.9451 0.9608 0.9765);
            border-color: ${borderColor};
          }
          .two-column-feature-card:not(:first-child) {
            border-top-width: 1px;
            border-top-style: solid;
          }
        `}
      </style>
      <Section
        id={sectionId}
        className={cn("bg-white py-12 md:py-16 lg:py-20", className)}
      >
        <Container className={cn("relative z-[1]", containerClassName)}>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
              {/* Left Column - Text Content */}
              <div
                className={cn(
                  "flex flex-col py-6 md:py-12 lg:py-20",
                  leftColumnClassName
                )}
              >
                <h2
                  className={cn(
                    "mb-6 text-xl leading-tight font-semibold text-[#0F172A] md:mb-8 md:text-2xl lg:mb-10 lg:text-3xl",
                    headingClassName
                  )}
                >
                  {heading}
                </h2>
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={cn(
                        "font-sora font-normal text-slate-600",
                        paragraphClassName
                      )}
                      style={{
                        fontSize: "16px",
                        lineHeight: "180%",
                        fontWeight: 400,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Column - Feature Cards */}
              <div
                className={cn(
                  "two-column-feature-border flex flex-col py-6 lg:border-l lg:py-14",
                  rightColumnClassName
                )}
                style={{
                  borderLeftStyle: "solid",
                  borderLeftColor: borderColor,
                  backgroundColor: "rgba(248, 250, 252, 0.5)",
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "two-column-feature-border two-column-feature-card px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10",
                      feature.cardClassName
                    )}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* Icon Container */}
                      {feature.icon && (
                        <div
                          className="flex-shrink-0 rounded"
                          style={{
                            padding: "8px",
                            backgroundColor: "#FFF7ED",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#FFEDD5",
                          }}
                        >
                          {typeof feature.icon === "string" &&
                          (feature.icon.endsWith(".svg") ||
                            feature.icon.endsWith(".png") ||
                            feature.icon.endsWith(".jpg") ||
                            feature.icon.endsWith(".webp") ||
                            feature.icon.endsWith(".gif")) ? (
                            <Image
                              src={feature.icon}
                              alt={feature.title}
                              width={20}
                              height={20}
                              className={cn("h-5 w-5", feature.iconClassName)}
                            />
                          ) : (
                            <DynamicIcon
                              name={feature.icon as LucideIconName}
                              className={cn(
                                "h-5 w-5 text-orange-500",
                                feature.iconClassName
                              )}
                            />
                          )}
                        </div>
                      )}

                      {/* Title and Description */}
                      <div className="flex-1 space-y-1">
                        {/* Title */}
                        <h3 className="text-sm leading-tight font-semibold text-[#0F172A] md:text-base">
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed font-normal text-slate-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TwoColumnFeatureSection;
