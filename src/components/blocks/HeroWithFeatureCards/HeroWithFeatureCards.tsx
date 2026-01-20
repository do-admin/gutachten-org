import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import Link from "next/link";
import Image from "next/image";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { CSSProperties } from "react";
import type {
  HeroFeature,
  HeroLayoutLogo,
  HeroCta,
} from "@/components/blocks/HeroSection/Hero";
import {
  CardLayout,
  CardLayoutWithModal,
  type CardLayoutItem,
} from "@/components/blocks/CardLayout";
import {
  LeadForm,
  type LeadFormProps,
} from "@/components/blocks/LeadForm/LeadForm";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

export interface HeroWithFeatureCardsProps {
  // Main content - support both naming conventions
  h1Text?: string; // HeroSection style
  title?: string; // Hero/Hero style
  titleHighlight?: string; // HeroSection style
  highlightText?: string; // Hero/Hero style
  subtitle?: string;
  subtitleHighlight?: string;
  subtitleHighlightWords?: string[]; // Array of words to highlight in subtitle
  description?: string;
  subHeading?: string; // Additional h1 sub-heading
  preTitleText?: string; // Text to display before the title (as regular paragraph)

  // Visual elements
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    sizes?: string;
    mobileSrc?: string;
    desktopSrc?: string;
    srcSet?: string;
    className?: string;
  };
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    sizes?: string;
    mobileSrc?: string;
    desktopSrc?: string;
    className?: string;
  };

  // Interactive elements
  features?: HeroFeature[];
  logos?: HeroLayoutLogo[];
  imageOverlay?: {
    title?: string;
    subtitle?: string;
    // Feature card for hero-evatax variant (overlay at top of image)
    featureCard?: {
      icon?: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
      };
      iconName?: LucideIconName; // Alternative to icon image
      title: string;
      subtitle?: string;
      className?: string;
      containerClassName?: string;
      iconClassName?: string;
      titleClassName?: string;
      subtitleClassName?: string;
    };
    // Profile card for hero-programatic-image variant
    profileCard?: {
      image: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
      };
      name: string;
      title: string;
      // Styling props for profile card
      className?: string;
      containerClassName?: string;
      imageClassName?: string;
      imageWrapperClassName?: string;
      nameClassName?: string;
      titleClassName?: string;
      textContainerClassName?: string;
      // Position and size props
      style?: CSSProperties;
      width?: string | number;
      height?: string | number;
      padding?: string | number;
    };
    // Mobile-only profile card
    mobileProfileCard?: {
      image: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
      };
      name: string;
      title: string;
      badges?: Array<{
        image: {
          src: string;
          alt: string;
          width?: number;
          height?: number;
        };
        className?: string;
        imageClassName?: string;
      }>;
      // Styling props for mobile profile card
      className?: string;
      containerClassName?: string;
      imageClassName?: string;
      imageWrapperClassName?: string;
      nameClassName?: string;
      titleClassName?: string;
      textContainerClassName?: string;
    };
  };
  cta?: HeroCta;
  ctas?: HeroCta[]; // Array of CTAs for side-by-side layout
  ctaIconName?: LucideIconName;
  ctaIconClassName?: string;

  // Layout variant
  variant?: "hero-links" | "hero-programatic-image" | "hero-evatax";

  // Tag/Badge for hero-evatax variant
  tag?: {
    text: string;
    dotColor?: string;
    className?: string;
  };

  // Section props
  sectionId?: string;
  componentId?: string;

  // Styling props
  paddingTop?: "sm" | "md" | "lg" | "xl";
  paddingBottom?: "sm" | "md" | "lg" | "xl";

  // Styling - extended from Hero/Hero
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  subHeadingClassName?: string;
  highlightClassName?: string;
  subtitleClassName?: string;
  heroTitleClassName?: string;
  subtitleHighlightClassName?: string;
  descriptionClassName?: string;
  preTitleTextClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  imgClassName?: string;
  customBackgroundClass?: string;

  // Logo styling props
  logoWrapperClassName?: string;
  logoClassName?: string;

  // Logos styling props
  logosContainerClassName?: string;
  logoItemClassName?: string;
  logoImageClassName?: string;
  logoTextClassName?: string;

  // CardLayout props - allow parent to customize CardLayout component
  cardLayoutVariant?: "icon-top" | "cta" | "step" | "link";
  cardLayoutColumns?: 2 | 3 | 4;
  cardLayoutGridClassName?: string;
  cardLayoutCardClassName?: string;
  cardLayoutEnableAnimation?: boolean;
  cardLayoutAnimationDelay?: number;

  // Customer testimonial / social proof section
  customerTestimonial?: {
    images: Array<{
      src: string;
      alt: string;
    }>;
    text: string;
    cta?: {
      label: string;
      href: string;
      external?: boolean;
      variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | "accent";
      size?: "default" | "sm" | "lg" | "icon";
      icon?: LucideIconName;
      className?: string;
    };
    className?: string;
    containerClassName?: string;
    imagesContainerClassName?: string;
    imageClassName?: string;
    textClassName?: string;
    ctaClassName?: string;
  };

  // LeadForm integration (image-form variant)
  contactForm?: Omit<LeadFormProps, "variant"> & {
    formClassName?: string;
  };
}

const HeroWithFeatureCards = ({
  h1Text,
  title,
  titleHighlight,
  highlightText,
  subtitle,
  subtitleHighlight,
  subtitleHighlightWords,
  description,
  subHeading,
  preTitleText,
  image,
  logo,
  features = [],
  logos = [],
  imageOverlay,
  variant = "hero-links",
  sectionId = "hero",
  componentId,
  paddingTop,
  paddingBottom,
  className,
  containerClassName,
  contentClassName,
  titleClassName = "",
  subHeadingClassName = "",
  highlightClassName,
  subtitleClassName = "",
  heroTitleClassName = "",
  subtitleHighlightClassName = "font-semibold",
  descriptionClassName = "",
  preTitleTextClassName = "",
  imageWrapperClassName,
  imageClassName,
  imgClassName,
  customBackgroundClass,
  logoWrapperClassName,
  logoClassName,
  cta,
  ctas,
  ctaIconName,
  ctaIconClassName,
  logosContainerClassName,
  logoItemClassName,
  logoImageClassName,
  logoTextClassName,
  // CardLayout props
  cardLayoutVariant = "cta",
  cardLayoutColumns = 4,
  cardLayoutGridClassName,
  cardLayoutCardClassName,
  cardLayoutEnableAnimation = false,
  cardLayoutAnimationDelay = 0.1,
  customerTestimonial,
  contactForm,
  tag,
}: HeroWithFeatureCardsProps) => {
  // Normalize title - support both h1Text and title
  const normalizedTitle = h1Text || title || "";
  // Normalize highlight - support both titleHighlight and highlightText
  const normalizedHighlight = titleHighlight || highlightText || "";

  // Get padding classes
  const getPaddingTopClass = () => {
    if (paddingTop) {
      switch (paddingTop) {
        case "sm":
          return "pt-4";
        case "md":
          return "pt-8 md:pt-12";
        case "lg":
          return "pt-12 md:pt-16";
        case "xl":
          return "pt-16 md:pt-24";
        default:
          return "pt-8 md:pt-12";
      }
    }
    return "";
  };

  const getPaddingBottomClass = () => {
    if (paddingBottom) {
      switch (paddingBottom) {
        case "sm":
          return "pb-8";
        case "md":
          return "pb-12";
        case "lg":
          return "pb-16";
        case "xl":
          return "pb-16 md:pb-24";
        default:
          return "pb-16 md:pb-24";
      }
    }
    return "";
  };

  // Render title with optional highlighting
  const renderTitle = (className: string) => {
    if (!normalizedHighlight) {
      return normalizedTitle;
    }

    // Split title by highlight text
    const parts = normalizedTitle.split(normalizedHighlight);
    if (parts.length === 1) {
      // Highlight text not found, return original title
      return normalizedTitle;
    }

    return (
      <span
        className={`text-foreground ${className}`}
        herokit-id="837adf55-d7de-41c8-8d51-7bb0e3025e82"
      >
        {parts.map((part, index) => (
          <span key={index} herokit-id="eba13bba-252a-4ab0-a8c8-097aae9a47ad">
            {part}
            {index < parts.length - 1 && (
              <span
                className={highlightClassName || "text-accent"}
                herokit-id="2c15726a-40f9-49f2-9ea0-fae45883292c"
              >
                {normalizedHighlight}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  };

  const renderSubtitle = (className: string, textToRender?: string) => {
    const text = textToRender !== undefined ? textToRender : subtitle;
    if (!text) return null;

    // If subtitleHighlightWords is provided, use it for multiple word highlighting
    if (subtitleHighlightWords && subtitleHighlightWords.length > 0) {
      // Create a regex pattern that matches any of the highlight words (case-insensitive)
      // Escape special regex characters in the words
      const escapedWords = subtitleHighlightWords.map((word) =>
        word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
      const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

      // Split the text by the highlight pattern while preserving the matches
      const parts: Array<{ text: string; isHighlight: boolean }> = [];
      let lastIndex = 0;
      let match;

      // Reset regex to start from beginning
      regex.lastIndex = 0;

      while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push({
            text: text.substring(lastIndex, match.index),
            isHighlight: false,
          });
        }
        // Add the matched word
        parts.push({
          text: match[0],
          isHighlight: true,
        });
        lastIndex = regex.lastIndex;
      }

      // Add remaining text after last match
      if (lastIndex < text.length) {
        parts.push({
          text: text.substring(lastIndex),
          isHighlight: false,
        });
      }

      // If no matches found, return original text
      if (parts.length === 0 || parts.every((p) => !p.isHighlight)) {
        return (
          <span
            className={className}
            herokit-id="c9e0802c-d288-477b-bcf0-5d1194475666"
          >
            {text}
          </span>
        );
      }

      return (
        <span
          className={className}
          herokit-id="471b1622-5e61-4a3f-9874-45ab5edf524b"
        >
          {parts.map((part, index) =>
            part.isHighlight ? (
              <span
                key={index}
                className="font-bold"
                herokit-id="20b8614b-107a-4e44-8de1-7f7fb073b8e1"
              >
                {part.text}
              </span>
            ) : (
              <span
                key={index}
                herokit-id="6ba72eb2-50d0-44bc-b164-091b729f7e9a"
              >
                {part.text}
              </span>
            )
          )}
        </span>
      );
    }

    // Fallback to single subtitleHighlight for backward compatibility
    if (!subtitleHighlight) {
      return text;
    }

    const parts = text.split(subtitleHighlight);
    if (parts.length === 1) {
      return text;
    }

    return (
      <span
        className={className}
        herokit-id="ede4f11d-cadc-445d-a27f-66dcc4411f11"
      >
        {parts.map((part, index) => (
          <span key={index} herokit-id="413528db-8697-41fa-9cd3-aed198187089">
            {part}
            {index < parts.length - 1 && (
              <span
                className={subtitleHighlightClassName || "font-semibold"}
                herokit-id="a3a5652c-5c6c-47d3-ab59-86a53202a152"
              >
                {subtitleHighlight}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  };

  const renderCustomerTestimonial = () => {
    if (!customerTestimonial || customerTestimonial.images.length === 0)
      return null;

    return (
      <div
        className={cn(
          "flex flex-col gap-3 xl:flex-row xl:items-center",
          customerTestimonial.containerClassName
        )}
        herokit-id="b3817114-4194-4a04-8786-f24062c798fe"
      >
        <div
          className="flex items-center gap-3"
          herokit-id="d9a38649-eabc-4ed3-86a6-dd1e886b4f90"
        >
          <div
            className={cn(
              "flex -space-x-2",
              customerTestimonial.imagesContainerClassName
            )}
            herokit-id="a002e357-2f82-462e-b42b-db722933f5a8"
          >
            {customerTestimonial.images.map((image, index) => {
              const fallbackText = image.alt
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={index}
                  data-slot="avatar"
                  className={cn(
                    "ring-background relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2",
                    customerTestimonial.imageClassName
                  )}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={40}
                    height={40}
                    className="aspect-square h-full w-full object-cover"
                    loading="lazy"
                    priority={false}
                    sizes="40px"
                  />
                  <div
                    className="bg-muted absolute inset-0 hidden h-full w-full items-center justify-center rounded-full text-xs font-medium"
                    aria-hidden="true"
                  >
                    {fallbackText}
                  </div>
                </div>
              );
            })}
          </div>
          {customerTestimonial.text && (
            <span
              className={cn(
                "text-[15px] font-normal text-[#243239]",
                customerTestimonial.textClassName
              )}
              herokit-id="f44e0a2a-4001-41a2-ab8c-7c90bdb8d6fc"
            >
              {customerTestimonial.text}
            </span>
          )}
        </div>
        {customerTestimonial.cta && (
          <Button
            asChild
            variant={customerTestimonial.cta.variant || "default"}
            className={cn(
              "inline-flex w-full items-center justify-start gap-2 rounded-[8px] px-6 py-6 text-sm font-semibold",
              "gap-6 bg-slate-900 text-white hover:bg-slate-900/90",
              customerTestimonial.cta.className
            )}
          >
            <Link
              href={customerTestimonial.cta.href}
              target={customerTestimonial.cta.external ? "_blank" : undefined}
              rel={
                customerTestimonial.cta.external
                  ? "noopener noreferrer"
                  : undefined
              }
              className="flex w-full items-center !justify-between md:w-auto md:gap-4"
              herokit-id="766603cc-8d69-4a19-b8a0-9983bb358b67"
            >
              <span herokit-id="38bf223d-cfc4-460d-8988-52a7f38b7916">
                {customerTestimonial.cta.label}
              </span>
              {customerTestimonial.cta.icon && (
                <DynamicIcon
                  name={customerTestimonial.cta.icon || "ArrowUpRight"}
                  className={cn(
                    "h-3 w-3 flex-shrink-0 text-[#FF985C]",
                    ctaIconClassName
                  )}
                  aria-hidden="true"
                />
              )}
            </Link>
          </Button>
        )}
      </div>
    );
  };

  const renderFeatureCards = () => {
    if (features.length === 0) return null;

    // Convert HeroFeature[] to CardLayoutItem[]
    const cardLayoutItems: CardLayoutItem[] = features.map((feature) => ({
      title: feature.title,
      description: feature.description,
      href: feature.href,
      ctaText: feature.ctaText,
      ctaLabel: feature.ctaLabel,
      highlight: feature.highlight,
    }));

    return (
      <CardLayout
        cards={cardLayoutItems}
        variant={cardLayoutVariant}
        columns={cardLayoutColumns}
        gridClassName={cardLayoutGridClassName}
        cardClassName={cardLayoutCardClassName}
        enableAnimation={cardLayoutEnableAnimation}
        animationDelay={cardLayoutAnimationDelay}
        noWrapper={true}
      />
    );
  };

  const renderCTA = () => {
    // Support both single cta and multiple ctas array
    const ctaList = ctas && ctas.length > 0 ? ctas : cta ? [cta] : [];

    if (ctaList.length === 0) return null;

    // If multiple CTAs, render side-by-side on tablet+, stacked on mobile
    if (ctaList.length > 1) {
      const isEvataxVariant = variant === "hero-evatax";

      return (
        <div
          className="flex flex-col gap-3 md:flex-row md:gap-6 xl:gap-8"
          herokit-id="3a979e33-dfb4-4ef5-9ff8-cf96817fcf0d"
        >
          {ctaList.map((ctaItem, index) => {
            const isOutline = ctaItem.variant === "outline";
            const CTAIconName =
              ctaItem?.icon || ctaIconName
                ? ctaItem?.icon || ctaIconName
                : "ArrowUpRight";

            // Apply styling based on variant prop
            const buttonClasses = isOutline
              ? "bg-white border border-[#243239] text-[#243239] hover:bg-gray-50"
              : isEvataxVariant
                ? "bg-[#243239] text-white hover:bg-[#243239]/90"
                : "bg-[#243239] text-white hover:bg-[#243239]/90";

            return (
              <Button
                key={index}
                asChild
                variant={ctaItem.variant || "default"}
                className={cn(
                  "inline-flex w-full items-center justify-start gap-2 rounded-[8px] px-6 py-6 text-sm font-semibold",
                  "gap-6",
                  buttonClasses,
                  ctaItem.className
                )}
              >
                <Link
                  href={ctaItem.href}
                  target={ctaItem.external ? "_blank" : undefined}
                  rel={ctaItem.external ? "noopener noreferrer" : undefined}
                  className="flex w-full items-center !justify-between md:w-auto md:gap-6"
                  herokit-id="caaeae91-96fa-440e-ad0c-10090199cc75"
                >
                  <span herokit-id="c63a21fe-8b34-4672-9a5f-fcdc737eb08a">
                    {ctaItem.label}
                  </span>
                  {CTAIconName && (
                    <DynamicIcon
                      name={CTAIconName}
                      className={cn(
                        "h-3 w-3 flex-shrink-0",
                        isOutline ? "text-[#243239]" : ctaIconClassName
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </Button>
            );
          })}
        </div>
      );
    }

    // Single CTA (backward compatibility)
    const singleCta = ctaList[0];
    const CTAIconName =
      singleCta?.icon || ctaIconName
        ? singleCta?.icon || ctaIconName
        : undefined;

    return (
      <Button
        asChild
        variant={singleCta.variant || "default"}
        className={cn(
          "inline-flex items-center justify-start gap-2 rounded-[8px] px-6 py-6 text-sm font-semibold",
          "gap-6 bg-slate-900 text-white hover:bg-slate-900/90",
          singleCta.className
        )}
      >
        <Link
          href={singleCta.href}
          target={singleCta.external ? "_blank" : undefined}
          rel={singleCta.external ? "noopener noreferrer" : undefined}
          herokit-id="3eb6bbfb-32f4-48d8-828a-5403a30d873c"
        >
          {singleCta.label}
          {CTAIconName && (
            <DynamicIcon
              name={CTAIconName}
              className={cn("h-3 w-3", ctaIconClassName)}
              aria-hidden="true"
            />
          )}
        </Link>
      </Button>
    );
  };

  // Render content section (common for both variants)
  const renderContentSection = () => {
    const isEvataxVariant = variant === "hero-evatax";

    return (
      <div
        className={cn(
          isEvataxVariant
            ? "space-y-4 md:space-y-5"
            : "space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10",
          contentClassName
        )}
      >
        <div
          className={cn(
            isEvataxVariant
              ? "flex flex-col gap-4 md:gap-8"
              : "flex flex-col gap-5 md:gap-6 xl:gap-8"
          )}
          herokit-id="b07279bd-6658-4408-9f31-43357dd3f2c5"
        >
          {/* Logo - for evatax variant, show single logo at top */}
          {isEvataxVariant && logo && (
            <div
              className={cn("flex items-center", logoWrapperClassName)}
              herokit-id="evatax-logo-wrapper"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 200}
                height={logo.height || 60}
                className={cn("h-auto object-contain", logoClassName)}
                priority={logo.priority !== false}
                sizes="(max-width: 768px) 150px, 200px"
              />
            </div>
          )}

          {/* Tag/Badge - only for evatax variant */}
          {isEvataxVariant && tag && (
            <div
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full border bg-[#F5F5F5] px-3 py-[5px]",
                tag.className
              )}
              herokit-id="evatax-tag"
              style={{
                height: "26px",
              }}
            >
              <div
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{
                  backgroundColor: tag.dotColor || "#FF985C",
                }}
              />
              <span className="text-xs leading-[16px] font-normal whitespace-nowrap text-[#243239]">
                {tag.text}
              </span>
            </div>
          )}

          {/* Logos array - for other variants */}
          {!isEvataxVariant && logos.length > 0 && (
            <div
              className={cn(
                "flex items-center gap-3 md:gap-6",
                logosContainerClassName
              )}
              herokit-id="13358144-6971-4090-9634-24a532aeb2f1"
            >
              {logos.map((logoItem, index) => {
                if (!logoItem.image) return null;
                const logoWidth = logoItem.image.width || 150;
                const logoHeight = logoItem.image.height || 60;
                const aspectRatio = logoWidth / logoHeight;
                return (
                  <div
                    key={index}
                    className={cn(
                      "relative flex items-center justify-center",
                      logoItemClassName
                    )}
                    style={{
                      aspectRatio: `${aspectRatio}`,
                      minWidth: `${logoWidth}px`,
                      width: `${logoWidth}px`,
                    }}
                    herokit-id="767154ca-63ff-4f50-942a-d248a316b685"
                  >
                    {logoItem.href ? (
                      <Link
                        href={logoItem.href}
                        className="block h-full w-full"
                      >
                        <Image
                          src={logoItem.image.src}
                          alt={logoItem.image.alt}
                          width={logoWidth}
                          height={logoHeight}
                          className={cn(
                            "h-full w-full object-contain",
                            logoImageClassName
                          )}
                          priority={false}
                          loading="lazy"
                          sizes="(max-width: 768px) 120px, 150px"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={logoItem.image.src}
                        alt={logoItem.image.alt}
                        width={logoWidth}
                        height={logoHeight}
                        className={cn(
                          "h-full w-full object-contain",
                          logoImageClassName
                        )}
                        priority={false}
                        loading="lazy"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {preTitleText && (
            <p
              className={cn(
                "text-sm font-normal",
                preTitleTextClassName
              )}
              herokit-id="pre-title-text"
            >
              {preTitleText}
            </p>
          )}
          <h1
            lang="de"
            className={cn(
              isEvataxVariant
                ? "text-3xl font-semibold text-[#243239] md:text-4xl lg:text-5xl lg:leading-16 xl:text-6xl xl:leading-18"
                : "text-3xl font-semibold text-slate-900 md:text-4xl xl:text-5xl",
              titleClassName
            )}
            herokit-id="a018b9ea-d73d-4a93-b821-04f7b24cb17c"
          >
            {renderTitle(heroTitleClassName || "")}
          </h1>

          {subHeading && (
            <h2
              className={cn(
                "text-lg font-semibold text-slate-900 md:text-xl lg:text-2xl",
                subHeadingClassName
              )}
              herokit-id="c2bc5d0f-f2a0-4a88-9009-897b1f64a84d"
            >
              {subHeading}
            </h2>
          )}

          {description && (
            <div
              className={cn(
                isEvataxVariant
                  ? "text-base! leading-[180%]! text-slate-600"
                  : "space-y-2 text-sm leading-relaxed text-slate-600 md:space-y-3 md:text-base lg:text-lg xl:text-lg",
                descriptionClassName
              )}
              herokit-id="3785a33d-d023-452c-9142-3248fde0fa43"
            >
              {description.includes("\n") ? (
                description.split("\n").map((line, index) => (
                  <p
                    key={index}
                    herokit-id="02da22b8-89b0-42c3-ab2b-24a1c11585fd"
                  >
                    {line}
                  </p>
                ))
              ) : (
                <p herokit-id="5ba9c139-8222-4f7c-a35b-4a565401e1c4">
                  {description}
                </p>
              )}
            </div>
          )}

          {subtitle && (
            <div
              className={cn(
                isEvataxVariant
                  ? "text-base leading-[32px] text-[#4F5A60] md:text-base md:leading-[32px]"
                  : "text-base text-slate-600 md:text-lg lg:text-xl xl:text-xl",
                subtitleClassName
              )}
              herokit-id="8d9864dc-3125-4b7b-bec0-e3ab556c407f"
            >
              {subtitle.includes("\n")
                ? subtitle.split("\n").map((line, index) => (
                    <p
                      key={index}
                      herokit-id="1dbd473e-365b-4e5f-806b-60ba76891d19"
                    >
                      {renderSubtitle("", line)}
                    </p>
                  ))
                : renderSubtitle("")}
            </div>
          )}
          {renderCTA()}
          {renderCustomerTestimonial()}
        </div>
      </div>
    );
  };

  // Render mobile-only profile card
  const renderMobileProfileCard = () => {
    if (!imageOverlay?.mobileProfileCard) return null;

    const mobileCard = imageOverlay.mobileProfileCard;

    return (
      <div className={cn("mx-auto w-full", mobileCard.containerClassName)}>
        <div
          className={cn(
            "flex flex-col gap-y-6 overflow-hidden",
            mobileCard.className
          )}
        >
          {/* Image section (upper 2/3) */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-2xl",
              mobileCard.imageWrapperClassName
            )}
            style={{ aspectRatio: "3/2", minHeight: "200px" }}
          >
            <OptimizedImage
              src={mobileCard.image.src}
              alt={mobileCard.image.alt}
              width={mobileCard.image.width || 300}
              height={mobileCard.image.height || 200}
              className={cn(
                "h-full w-full object-cover",
                mobileCard.imageClassName
              )}
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 300px"
              mobileSrc={mobileCard.image.src}
              desktopSrc={mobileCard.image.src}
            />
            {/* Badges/Overlays */}
            {mobileCard.badges &&
              mobileCard.badges.map((badge, index) => {
                return (
                  <div
                    key={index}
                    className={cn("absolute z-10", badge.className)}
                  >
                    <OptimizedImage
                      src={badge.image.src}
                      alt={badge.image.alt}
                      width={badge.image.width || 60}
                      height={badge.image.height || 60}
                      className={cn(
                        "h-auto w-auto object-contain",
                        badge.imageClassName
                      )}
                      priority={false}
                      mobileSrc={badge.image.src}
                      desktopSrc={badge.image.src}
                    />
                  </div>
                );
              })}
          </div>

          {/* Text section (lower 1/3) */}
          <div
            className={cn(
              "flex flex-col gap-3",
              mobileCard.textContainerClassName
            )}
          >
            <h3
              className={cn(
                "text-xl font-semibold text-[#273238]",
                mobileCard.nameClassName
              )}
            >
              {mobileCard.name}
            </h3>
            <p
              className={cn(
                "text-sm font-normal text-[#515A5F]",
                mobileCard.titleClassName
              )}
              herokit-id="2b183976-89e1-4658-9e6b-760a4d42b2cf"
            >
              {mobileCard.title}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render image section (variant-aware)
  const renderImageSection = () => {
    // If contactForm is provided, render it instead of image
    if (contactForm) {
      return (
        <div className={cn("relative w-full", imageWrapperClassName)}>
          <LeadForm
            {...contactForm}
            variant="image-form"
            formClassName={contactForm.formClassName}
            privacyCheckboxClassName={contactForm.privacyCheckboxClassName}
          />
        </div>
      );
    }

    const isProgramaticVariant = variant === "hero-programatic-image";
    const isEvataxVariant = variant === "hero-evatax";

    // Variant-specific classes
    const imageWrapperBaseClass = isProgramaticVariant
      ? "relative h-full min-h-[250px] md:min-h-[300px] w-full lg:min-h-full"
      : isEvataxVariant
        ? "relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
        : "relative flex w-full items-center justify-end";
    const imageContainerClass = isProgramaticVariant
      ? "relative h-full w-full overflow-hidden"
      : isEvataxVariant
        ? "relative h-full w-full overflow-hidden rounded-xl"
        : "relative w-full overflow-hidden";
    const imageClass = isProgramaticVariant
      ? `h-full w-full object-cover ${imgClassName || ""}`
      : isEvataxVariant
        ? `h-full w-full object-cover ${imgClassName || ""}`
        : `${imgClassName || "w-full h-auto object-contain"}`;
    const defaultImageWidth = isProgramaticVariant
      ? 1200
      : isEvataxVariant
        ? 800
        : 520;
    const defaultImageHeight = isProgramaticVariant
      ? 800
      : isEvataxVariant
        ? 600
        : 416;
    const defaultSizes = isProgramaticVariant
      ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
      : isEvataxVariant
        ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
        : "(min-width: 1024px) 647px, 100vw";

    return (
      <div className={cn(imageWrapperBaseClass, imageWrapperClassName)}>
        <div
          className={
            isProgramaticVariant || isEvataxVariant
              ? "relative h-full w-full"
              : "relative w-full"
          }
          herokit-id="4c0cdb6c-c5cc-4e08-9cd3-263cc080ce94"
        >
          <div
            className={cn(imageContainerClass, imageClassName)}
            herokit-id="99f9efa3-e5bf-449b-b1dd-69837f919dcf"
          >
            {image ? (
              <OptimizedImage
                src={image.src}
                mobileSrc={image.mobileSrc}
                desktopSrc={image.desktopSrc}
                alt={image.alt}
                className={cn(imageClass, image.className)}
                width={image.width || defaultImageWidth}
                height={image.height || defaultImageHeight}
                priority={image.priority !== false}
                fetchPriority="high"
                sizes={image.sizes || defaultSizes}
              />
            ) : null}
          </div>
          {/* Feature card overlay for evatax variant */}
          {imageOverlay?.featureCard && isEvataxVariant && (
            <div
              className={cn(
                "absolute z-10 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm",
                imageOverlay.featureCard.containerClassName
              )}
              herokit-id="evatax-feature-card"
            >
              {(imageOverlay.featureCard.icon ||
                imageOverlay.featureCard.iconName) && (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#243239]">
                  {imageOverlay.featureCard.icon ? (
                    <OptimizedImage
                      src={imageOverlay.featureCard.icon.src}
                      alt={imageOverlay.featureCard.icon.alt}
                      width={imageOverlay.featureCard.icon.width || 20}
                      height={imageOverlay.featureCard.icon.height || 20}
                      className={cn(
                        "h-5 w-5 object-contain",
                        imageOverlay.featureCard.iconClassName
                      )}
                      priority={false}
                      sizes="20px"
                    />
                  ) : imageOverlay.featureCard.iconName ? (
                    <DynamicIcon
                      name={imageOverlay.featureCard.iconName}
                      className={cn(
                        "h-5 w-5 text-[#D4A574]",
                        imageOverlay.featureCard.iconClassName
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    "text-xs leading-[14px] font-medium tracking-wide text-[#94A3B8] uppercase",
                    imageOverlay.featureCard.titleClassName
                  )}
                >
                  {imageOverlay.featureCard.title}
                </span>
                {imageOverlay.featureCard.subtitle && (
                  <span
                    className={cn(
                      "text-sm leading-[18px] font-semibold text-[#243239]",
                      imageOverlay.featureCard.subtitleClassName
                    )}
                  >
                    {imageOverlay.featureCard.subtitle}
                  </span>
                )}
              </div>
            </div>
          )}
          {imageOverlay?.profileCard &&
            isProgramaticVariant &&
            (() => {
              const profileCard = imageOverlay.profileCard;
              const cardWidth = profileCard.width || 248;
              const cardHeight = profileCard.height || 284;
              const cardPadding = profileCard.padding || 16;

              return (
                <div
                  className={cn(
                    "absolute right-2 bottom-2 z-10 flex flex-col rounded-2xl bg-white shadow-sm md:right-4 md:bottom-4 lg:right-[24px] lg:bottom-[35px]",
                    profileCard.className
                  )}
                  style={{
                    width:
                      typeof cardWidth === "number"
                        ? undefined // Let className handle responsive width via max-width
                        : cardWidth,
                    height:
                      typeof cardHeight === "number" ? "auto" : cardHeight,
                    padding:
                      typeof cardPadding === "number"
                        ? `${cardPadding}px`
                        : cardPadding,
                    gap: "16px",
                    ...profileCard.style,
                  }}
                >
                  <div
                    className={cn(
                      "relative w-full flex-1 overflow-hidden",
                      profileCard.imageWrapperClassName
                    )}
                  >
                    <OptimizedImage
                      src={profileCard.image.src}
                      alt={profileCard.image.alt}
                      width={profileCard.image.width || 216}
                      height={profileCard.image.height || 155}
                      className={cn(
                        "h-full w-full object-cover",
                        profileCard.imageClassName
                      )}
                      priority={false}
                      sizes="(max-width: 768px) 200px, 216px"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-2",
                      profileCard.textContainerClassName
                    )}
                  >
                    <h3
                      className={cn(
                        "text-base leading-tight font-semibold text-[#273238] md:text-lg md:leading-[28.8px] lg:text-xl",
                        profileCard.nameClassName
                      )}
                      herokit-id="51a9e5c9-ceeb-43f1-bfb1-c0e7b67a40f5"
                    >
                      {profileCard.name}
                    </h3>
                    <SafeHtmlRenderer
                      content={profileCard.title}
                      className={cn(
                        "text-[10px] leading-tight font-normal text-[#515A5F] md:text-xs md:leading-[25.2px]",
                        profileCard.titleClassName
                      )}
                      tag="p"
                      herokit-id="2b183976-89e1-4658-9e6b-760a4d42b2cf"
                    />
                  </div>
                </div>
              );
            })()}
          {imageOverlay && !imageOverlay.profileCard && (
            <div
              className="absolute right-3.5 bottom-3.5 flex flex-col gap-2 text-white"
              herokit-id="5c4c1a43-7660-4d99-b1f6-05f9949cc8aa"
            >
              <p
                className="text-xl font-semibold text-[#F8FAFB]"
                herokit-id="161f0689-93c9-4dad-bcc0-694235e1c385"
              >
                {imageOverlay.title}
              </p>
              {imageOverlay.subtitle && (
                <SafeHtmlRenderer
                  content={imageOverlay.subtitle}
                  className="text-sm font-normal text-[#F8FAFB]"
                  tag="p"
                  herokit-id="2b183976-89e1-4658-9e6b-760a4d42b2cf"
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const sectionBackground = customBackgroundClass || "bg-white";
  const sectionClassName = [
    sectionBackground,
    className,
    getPaddingTopClass(),
    getPaddingBottomClass(),
  ]
    .filter(Boolean)
    .join(" ");

  // Check if mobile profile card should replace image section on mobile
  const shouldShowMobileProfileCard =
    variant === "hero-programatic-image" && imageOverlay?.mobileProfileCard;

  return (
    <Section
      id={sectionId}
      className={sectionClassName}
      data-component-id={componentId}
    >
      <Container
        className={cn(
          "flex flex-col gap-6 md:gap-10 lg:gap-14 xl:gap-16",
          containerClassName
        )}
        herokit-id="2287720a-f729-4750-9204-6ace1ecacda9"
      >
        <div
          className={cn(
            variant === "hero-evatax"
              ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
              : variant === "hero-programatic-image"
                ? "grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] xl:gap-16"
                : "grid items-center gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] xl:gap-16"
          )}
          herokit-id="877d4bda-757c-49d6-9e3b-31fd926e3963"
        >
          {renderContentSection()}
          {/* Show mobile profile card on mobile, image section on desktop when conditions are met */}
          {shouldShowMobileProfileCard ? (
            <>
              {/* Mobile: Show profile card */}
              <div className="md:hidden">{renderMobileProfileCard()}</div>
              {/* Desktop: Show image section */}
              <div className="hidden md:block">{renderImageSection()}</div>
            </>
          ) : (
            renderImageSection()
          )}
        </div>

        {renderFeatureCards()}
      </Container>
    </Section>
  );
};

export default HeroWithFeatureCards;
