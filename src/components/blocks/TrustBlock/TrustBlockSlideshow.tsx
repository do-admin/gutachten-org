"use client";

import React from "react";
import Image from "next/image";
import { Section, Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { LogoItem } from "./TrustBlock";

export interface TrustBlockSlideshowProps {
  title?: string;
  subtitle?: string;
  logos: LogoItem[];
  sectionId?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  gridClassName?: string;
  logoCardClassName?: string;
  logoImageClassName?: string;
  imageClassName?: string;
  animationSpeed?: number;
  backgroundColor?: string;
  hideTitle?: boolean;
  borderClassName?: string;
  titleContainerClassName?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  enableAnimation?: boolean;
  animationDelay?: number;
  /**
   * When true, removes borders, shadows and transition / hover effects
   * from logo cards and images.
   */
  disableCardEffects?: boolean;
}

export const TrustBlockSlideshow: React.FC<TrustBlockSlideshowProps> = ({
  title,
  subtitle,
  logos,
  sectionId = "trust-block",
  className = "",
  containerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  gridClassName = "",
  logoCardClassName = "",
  logoImageClassName = "",
  imageClassName = "",
  animationSpeed = 30,
  backgroundColor = "bg-gradient-to-r from-emerald-50 via-white to-emerald-50",
  hideTitle = false,
  borderClassName = "",
  titleContainerClassName = "",
  columns = 5,
  enableAnimation = true,
  animationDelay = 0.1,
  disableCardEffects = false,
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

  // Animation duration in seconds - lower = faster
  // ~8s matches the original Splide auto-scroll speed
  const animationDuration = 8;

  const renderLogoItem = (logo: LogoItem, index: number, key: string) => {
    const sharedProps = {
      className: cn(
        "group relative flex h-28 min-w-[200px] w-[200px] md:min-w-[240px] md:w-[240px] flex-shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white p-6",
        !disableCardEffects && [
          "border border-gray-200 shadow-none transition-all duration-300",
          "hover:-translate-y-1 hover:border-gray-300",
          borderClassName ||
            "border border-emerald-100/70 hover:border-emerald-200",
        ],
        logoCardClassName
      ),
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
            className={cn(
              logo.image.height ? "" : "h-full max-h-20",
              "w-auto max-w-full object-contain",
              !disableCardEffects &&
                "grayscale transition duration-300 group-hover:scale-[1.02] group-hover:grayscale-0",
              imageClassName,
              logo.image.className
            )}
            style={
              logo.image.height
                ? { height: `${logo.image.height}px`, width: "auto" }
                : undefined
            }
            loading="lazy"
          />
        </div>
        <span
          className="sr-only"
          herokit-id="1471f2ad-0b0b-4c21-895e-7cf1787a1647"
        >
          {logo.title}
        </span>
      </>
    );

    if (logo.href) {
      return (
        <a
          key={key}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          {...sharedProps}
          herokit-id="1bd90430-203e-4b44-8835-49e80212b67b"
        >
          {content}
        </a>
      );
    }

    return (
      <div
        key={key}
        {...sharedProps}
        herokit-id="7694ed95-8ac6-4a63-83f6-5d81686ff4d6"
      >
        {content}
      </div>
    );
  };

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
      <Container
        className={cn("relative z-[1]", containerClassName)}
        herokit-id="f40adbfa-1e47-411e-a52e-4404e103ac69"
      >
        {!hideTitle && (title || subtitle) && (
          <div
            className={cn(
              "mb-12 flex flex-col items-center space-y-4 text-center",
              titleContainerClassName
            )}
            herokit-id="5f7600c7-f025-444f-83b7-63d359e1f3a5"
          >
            {title && (
              <h2
                className={cn(titleClassName)}
                herokit-id="058c0fc4-11fb-40ee-af42-34870d4bfb71"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(subtitleClassName)}
                herokit-id="cda80f84-a758-485d-8310-affb25626a36"
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Mobile & Tablet CSS Marquee - visible only below LG breakpoint (1024px) */}
        <div
          className={cn(
            "group/marquee mx-auto w-full overflow-hidden lg:hidden",
            gridClassName
          )}
          herokit-id="ba86e41e-9c04-4b81-87f8-9f5aca0335ea"
        >
          <div
            className="flex w-max gap-5 group-hover/marquee:[animation-play-state:paused]"
            style={{
              animation: `marquee ${animationDuration}s linear infinite`,
            }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) =>
              renderLogoItem(logo, index, `logo-mobile-1-${index}`)
            )}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) =>
              renderLogoItem(logo, index, `logo-mobile-2-${index}`)
            )}
          </div>
        </div>

        {/* Desktop Grid - visible only on LG and above (1024px+) */}
        <div
          className={cn(
            "mx-auto hidden w-full flex-wrap items-center justify-center gap-5 lg:flex",
            gridClassName
          )}
          herokit-id="c8e7bad2-47ce-4160-ac1d-c5f4e0cef40f"
        >
          {logos.map((logo, index) => {
            const sharedProps = {
              className: cn(
                "group relative flex h-28 w-full flex-shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white/80 p-6",
                !disableCardEffects && [
                  "shadow-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  borderClassName ||
                    "border border-emerald-100/70 hover:border-emerald-200",
                  enableAnimation && "animate-fade-in",
                ],
                getLogoItemWidth(),
                logoCardClassName
              ),
              style:
                enableAnimation && !disableCardEffects
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
                    className={cn(
                      logo.image.height ? "" : "h-full max-h-20",
                      "w-auto max-w-full object-contain",
                      !disableCardEffects &&
                        "transition duration-300 group-hover:scale-[1.02]",
                      imageClassName,
                      logo.image.className
                    )}
                    style={
                      logo.image.height
                        ? { height: `${logo.image.height}px`, width: "auto" }
                        : undefined
                    }
                    loading="lazy"
                  />
                </div>
                <span
                  className="sr-only"
                  herokit-id="c80a70e2-e3d2-451b-8678-eb7d1351865f"
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
                  herokit-id="32b58128-d467-44e0-bf66-b95dd35de78e"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={index}
                {...sharedProps}
                herokit-id="a328a7be-150a-493c-aa95-b24f6980a8e1"
              >
                {content}
              </div>
            );
          })}
        </div>
      </Container>

      {/* CSS Keyframes for marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Section>
  );
};
