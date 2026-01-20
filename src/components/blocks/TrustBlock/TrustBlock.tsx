import React from "react";
import Image from "next/image";
import { Section, Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/blocks/Heading/Heading";

export interface LogoItem {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  };
  title: string;
  description?: string;
  href?: string;
  valueClassName?: string;
}

export type TrustBlockVariant = "default" | "glassmorphism" | "metric-summary";

export interface TrustBlockProps {
  // Variant prop
  variant?: TrustBlockVariant;

  // Common props
  title: string;
  subtitle?: string;
  logos: LogoItem[];
  sectionId?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  titleContainerClassName?: string;
  showTitleContainerClassName?: string;
  gridClassName?: string;
  logoCardClassName?: string;
  logoImageClassName?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  enableAnimation?: boolean;
  animationDelay?: number;
  backgroundColor?: string;

  // Glassmorphism variant specific props
  showTitle?: boolean;
  blurAmount?: number;
  sectionClassName?: string;
  logosWrapperClassName?: string;
  logoItemClassName?: string;
  underline?: boolean;
  logoHeight?: string | number;

  // Metric-summary variant specific props
  dataSummaryValueClassName?: string;
}

export const TrustBlock: React.FC<TrustBlockProps> = ({
  variant = "default",
  title,
  subtitle,
  logos,
  sectionId = "trust-block",
  className = "",
  containerClassName = "",
  borderClassName = "",
  titleContainerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  showTitleContainerClassName = "",
  gridClassName = "",
  logoCardClassName = "",
  logoImageClassName = "",
  columns = 5,
  enableAnimation = true,
  animationDelay = 0.1,
  backgroundColor = "bg-gradient-to-r from-emerald-50 via-white to-emerald-50",
  // Glassmorphism variant props
  showTitle = true,
  blurAmount = 1.45,
  sectionClassName,
  logosWrapperClassName,
  logoItemClassName,
  underline = false,
  logoHeight = "h-20",
  // Data-summary variant props
  dataSummaryValueClassName,
}) => {
  const getLogoItemWidth = () => {
    switch (columns) {
      case 2:
        return "sm:basis-[calc(50%_-_1.25rem)]";
      case 3:
        return "sm:basis-[calc(50%_-_1.25rem)] lg:basis-[calc(33.333%_-_1.25rem)]";
      case 4:
        return "sm:basis-[calc(50%_-_1.25rem)] lg:basis-[calc(25%_-_1.25rem)]";
      case 6:
        return "sm:basis-[calc(50%_-_1.25rem)] lg:basis-[calc(16.666%_-_1.25rem)]";
      case 5:
      default:
        return "sm:basis-[calc(50%_-_1.25rem)] lg:basis-[calc(20%_-_1.25rem)]";
    }
  };

  // Metric-summary variant rendering
  if (variant === "metric-summary") {
    const borderWidth = "1px";

    return (
      <>
        <style>
          {`
            .trust-block-data-summary-border {
              border-color: color(display-p3 0.9451 0.9608 0.9765);
              border-color: #F0F5F9;
            }
            .trust-block-data-summary-item:not(:first-child) {
              border-top-width: 1px;
              border-top-style: solid;
            }
            @media (min-width: 768px) {
              .trust-block-data-summary-item:not(:first-child) {
                border-top-width: 0;
              }
              .trust-block-data-summary-item:not(:first-child) {
                border-left-width: 1px;
                border-left-style: solid;
              }
            }
            .trust-block-data-summary-value-30px {
              font-size: 24px;
            }
            @media (min-width: 768px) {
              .trust-block-data-summary-value-30px {
                font-size: 30px;
              }
            }
          `}
        </style>
        <Section
          id={sectionId}
          className={cn("bg-white py-12 md:py-16 lg:py-20", className)}
        >
          <Container className={cn("relative z-[1]", containerClassName)}>
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {logos.map((logo, index) => (
                  <div
                    key={index}
                    className="trust-block-data-summary-border trust-block-data-summary-item flex flex-col"
                  >
                    <div className="px-4 pt-6 md:px-12 md:pt-12">
                      <p className="mb-2 text-xs font-medium text-[#90A4BA] uppercase">
                        {logo.title}
                      </p>
                    </div>
                    <div
                      className="trust-block-data-summary-border mb-4 h-px w-full"
                      style={{
                        borderTopWidth: borderWidth,
                        borderTopStyle: "solid",
                        backgroundColor: "transparent",
                      }}
                    />
                    <div className="px-4 pb-6 md:px-12 md:pb-12">
                      <p
                        className={cn(
                          "text-lg leading-tight font-semibold text-[#0D172B] md:text-xl md:whitespace-nowrap",
                          logo.valueClassName || dataSummaryValueClassName
                        )}
                      >
                        {logo.description || logo.image.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="trust-block-data-summary-border h-px w-full"
                style={{
                  borderTopWidth: borderWidth,
                  borderTopStyle: "solid",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </Container>
        </Section>
      </>
    );
  }

  // Glassmorphism variant rendering
  if (variant === "glassmorphism") {
    return (
      <section
        id={sectionId}
        className={cn("py-12 md:py-16 lg:py-20", sectionClassName || className)}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            containerClassName
          )}
          herokit-id="81c53a88-d06f-4495-bcd3-591c9ce1b785"
        >
          {showTitle && (
            <div
              className={cn(
                "mb-12 text-center md:mb-16",
                showTitleContainerClassName
              )}
              herokit-id="67eaa776-618e-4bf4-9ae7-80c9bec11856"
            >
              <Heading
                level={2}
                variant="primary"
                underline={underline}
                className={titleClassName}
                herokit-id="a9ce5f37-2d7c-4a9d-ae74-9f42d05c0fac"
              >
                {title}
              </Heading>
              {subtitle && (
                <p
                  className={cn(
                    "mt-4 text-base text-gray-600 md:text-lg",
                    subtitleClassName
                  )}
                  herokit-id="574c3073-13e9-43d3-80e9-371012add33e"
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="relative">
            {/* Glassmorphism wrapper with gradient fade masks */}
            <div
              className={cn(
                "relative grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-12",
                "rounded-lg bg-white/80 p-6 backdrop-blur-md",
                "overflow-hidden",
                logosWrapperClassName || gridClassName
              )}
              herokit-id="6c111e00-548b-4bfa-a29a-7cced502c2a3"
            >
              {/* Left gradient fade overlay */}
              {/* <div
                className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 30%, transparent 100%)",
                }}
              /> */}

              {/* Right gradient fade overlay */}
              {/* <div
                className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24"
                style={{
                  background:
                    "linear-gradient(to left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 30%, transparent 100%)",
                }}
              /> */}

              {logos.map((logo, index) => {
                const isHeightString = typeof logoHeight === "string";
                const containerHeightClass = isHeightString ? logoHeight : "";
                const isFirst = index === 0;
                const isLast = index === logos.length - 1;

                const logoContent = (
                  <div
                    className={cn(
                      "relative z-0 flex flex-shrink-0 items-center justify-center",
                      containerHeightClass,
                      logoItemClassName
                    )}
                    style={{
                      // Fade effect for first and last items
                      ...(isFirst && {
                        opacity: 0.5,
                        filter: `blur(${blurAmount}px)`,
                        ...(typeof logoHeight === "number" && {
                          height: `${logoHeight}px`,
                        }),
                      }),
                      ...(isLast && {
                        opacity: 0.5,
                        filter: `blur(${blurAmount}px)`,
                        ...(typeof logoHeight === "number" && {
                          height: `${logoHeight}px`,
                        }),
                      }),
                    }}
                  >
                    <Image
                      src={logo.image.src}
                      alt={logo.image.alt || logo.title}
                      width={logo.image.width || 160}
                      height={logo.image.height || 80}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                );

                if (logo.href) {
                  return (
                    <a
                      key={index}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80"
                      aria-label={`Link to ${logo.image.alt || logo.title}`}
                      herokit-id="ed695a2e-6000-430d-b63d-7ed13549d23b"
                    >
                      {logoContent}
                    </a>
                  );
                }

                return (
                  <div
                    key={index}
                    herokit-id="57ff52b6-5972-4595-9d68-f947e5ad89a5"
                  >
                    {logoContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant rendering
  return (
    <Section
      id={sectionId}
      className={cn(
        "relative overflow-hidden py-16",
        backgroundColor,
        "before:absolute before:inset-y-6 before:left-1/2 before:h-[85%] before:w-[90%] before:-translate-x-1/2 before:rounded-[40px] before:bg-white/60 before:blur-3xl before:content-['']",
        className
      )}
    >
      <Container className={cn("relative z-[1]", containerClassName)}>
        <div
          className={cn(
            "mb-12 flex flex-col items-center space-y-4 text-center",
            titleContainerClassName
          )}
          herokit-id="3ce85ef6-8e4a-4a57-9f84-f1b484e4cb60"
        >
          {title && (
            <h2
              className={cn(titleClassName)}
              herokit-id="3625d06e-9a71-4395-8252-968b5f0f9b5e"
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={cn(subtitleClassName)}
              herokit-id="94551544-3976-4a03-bf9b-6bbff99e5fb7"
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-5",
            gridClassName
          )}
          herokit-id="c6eae0c0-6e93-4cff-9101-8206c482a09d"
        >
          {logos.map((logo, index) => {
            const sharedProps = {
              className: cn(
                "group relative flex h-28 w-full flex-shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white/80 p-6 shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg",
                borderClassName ||
                  "border border-emerald-100/70 hover:border-emerald-200",
                enableAnimation && "animate-fade-in",
                getLogoItemWidth(),
                logoCardClassName
              ),
              style: enableAnimation
                ? {
                    animationDelay: `${index * animationDelay}s`,
                    animationFillMode: "forwards",
                  }
                : undefined,
            };

            const content = (
              <>
                <div
                  className={cn(
                    "relative flex h-full w-full items-center justify-center",
                    logoImageClassName
                  )}
                >
                  <Image
                    src={logo.image.src}
                    alt={logo.image.alt || logo.title}
                    width={logo.image.width || 160}
                    height={logo.image.height || 80}
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 200px, 160px"
                    quality={100}
                    className="h-full max-h-20 w-auto max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <span
                  className="sr-only"
                  herokit-id="0f056a46-c3e5-4d42-90e1-2e1488bc9e15"
                >
                  {logo.title}
                </span>
              </>
            );

            if (logo.href) {
              return (
                <a
                  key={index}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedProps}
                  herokit-id="b01bf768-9cbd-4338-ad0c-cc2d452e4b8d"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={index}
                {...sharedProps}
                herokit-id="92d434ce-ef8b-4127-b3af-1fcb1f7c9c7d"
              >
                {content}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default TrustBlock;
