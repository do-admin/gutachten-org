import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollButton } from "@/components/ui/scroll-button";
import { Container, Section } from "@/components/ui/section";
import Link from "next/link";
import { ReactNode, CSSProperties } from "react";
import { LucideIcon } from "lucide-react";
import { Heading } from "@/components/blocks/Heading/Heading";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SafeHtml } from "@/lib/safe-html-renderer";

export interface HeroButton {
  href: string;
  label?: string; // For backward compatibility with HeroSection style
  text?: string; // For Hero/Hero style
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "accent"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: string | LucideIcon; // Support both string (icon name) and LucideIcon
  onClick?: () => void;
}

export interface HeroFeature {
  icon?: string;
  title: string;
  description?: string;
  href?: string;
  ctaText?: string;
  ctaLabel?: string;
  ctaVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "accent"
    | "link";
  highlight?: boolean;
}

export interface HeroTrustBadge {
  text: string;
  icon?: LucideIcon;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export interface HeroLayoutLogo {
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  lines?: string[];
  href?: string;
}

export interface HeroCta {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  icon?: LucideIconName;
}

export interface HeroProps {
  type: "Hero";
  // Main content - support both naming conventions
  h1Text?: string; // HeroSection style
  title?: string; // Hero/Hero style
  titleHighlight?: string; // HeroSection style
  highlightText?: string; // Hero/Hero style
  subtitle?: string;
  subtitleHighlight?: string;
  description?: string;
  subHeading?: string; // Additional h1 sub-heading for hero-links layout

  // Visual elements
  icon?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    sizes?: string; // Responsive image sizes, e.g., "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
    mobileSrc?: string; // Optional: different image source for mobile (different crop/composition)
    desktopSrc?: string; // Optional: different image source for desktop (different crop/composition)
    srcSet?: string; // Optional: multiple sizes of the same image, e.g., "/img-400w.webp 400w, /img-800w.webp 800w, /img-1200w.webp 1200w"
  };

  // Layout options - support both systems
  layout?:
    | "centered"
    | "split"
    | "minimal"
    | "default"
    | "image-left"
    | "document";
  background?: "gradient" | "white" | "custom";
  customBackgroundClass?: string;
  imagePosition?: "right" | "left"; // For Hero/Hero style layouts

  // Interactive elements
  buttons?: HeroButton[];
  features?: HeroFeature[]; // HeroSection style
  trustBadges?: HeroTrustBadge[]; // Hero/Hero style
  logos?: HeroLayoutLogo[];
  imageOverlay?: {
    title?: string;
    subtitle?: string;
    // Profile card for hero-programatic-image layout
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
  };
  cta?: HeroCta;
  ctaIconName?: LucideIconName;
  ctaIconClassName?: string;

  // Section props
  sectionId?: string;

  // Styling props
  paddingTop?: "sm" | "md" | "lg" | "xl";
  paddingBottom?: "sm" | "md" | "lg" | "xl";

  // Styling - extended from Hero/Hero
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  sectionTextClassName?: string;
  subHeadingClassName?: string;
  highlightClassName?: string;
  subtitleClassName?: string;
  heroTitleClassName?: string;
  subtitleHighlightClassName?: string;
  descriptionClassName?: string;
  buttonsWrapperClassName?: string;
  badgesWrapperClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  imgClassName?: string;
  iconClassName?: string;

  // Animation
  enableAnimation?: boolean;
  imageAnimationDelay?: number;

  // Behavior
  enableScrollTo?: boolean;

  // Additional content
  children?: ReactNode;
  _htmlProps?: Record<string, boolean>; // Metadata about which props contain HTML
}

const Hero = ({
  h1Text,
  title,
  titleHighlight,
  highlightText,
  subtitle,
  subtitleHighlight,
  description,
  subHeading,
  icon,
  image,
  layout = "centered",
  background = "gradient",
  customBackgroundClass,
  imagePosition = "right",
  buttons = [],
  features = [],
  trustBadges = [],
  logos = [],
  imageOverlay,
  sectionId = "hero",
  paddingTop,
  paddingBottom,
  className,
  containerClassName,
  contentClassName,
  titleClassName = "",
  sectionTextClassName = "",
  subHeadingClassName = "",
  highlightClassName,
  subtitleClassName = "",
  heroTitleClassName = "",
  subtitleHighlightClassName = "font-semibold",
  descriptionClassName = "",
  buttonsWrapperClassName,
  badgesWrapperClassName,
  imageWrapperClassName,
  imageClassName,
  imgClassName,
  iconClassName,
  enableAnimation = true,
  imageAnimationDelay = 0.2,
  enableScrollTo = true,
  cta,
  ctaIconName,
  ctaIconClassName,
  children,
  _htmlProps,
}: HeroProps) => {
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

  // Determine background class
  const getBackgroundClass = () => {
    if (customBackgroundClass) return customBackgroundClass;

    switch (background) {
      case "gradient":
        return "bg-gradient-to-br from-red-50 to-orange-50";
      case "white":
        return "bg-white";
      default:
        return "bg-gradient-to-br from-red-50 to-orange-50";
    }
  };

  // Determine if we should use Hero/Hero style (Section/Container) or HeroSection style
  const useModernLayout =
    layout === "default" ||
    layout === "image-left" ||
    paddingTop ||
    paddingBottom ||
    className ||
    containerClassName;

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
        herokit-id="d0cdd755-fd05-48d1-bbfd-f8088c802327"
      >
        {parts.map((part, index) => (
          <>
            {part}
            <span key={index} herokit-id="73a7551c-4af1-4083-9d12-4b009bb69776">
              {index < parts.length - 1 && (
                <span
                  className={highlightClassName || "text-accent"}
                  herokit-id="3ab3ff6b-e797-454c-a9e5-ef33a6bbd95e"
                >
                  {normalizedHighlight}
                </span>
              )}
            </span>
          </>
        ))}
      </span>
    );
  };

  const renderSubtitle = (className: string) => {
    if (!subtitle) return null;

    if (!subtitleHighlight) {
      return subtitle;
    }

    const parts = subtitle.split(subtitleHighlight);
    if (parts.length === 1) {
      return subtitle;
    }

    return (
      <span
        className={className}
        herokit-id="1a0dac60-8c4f-4d77-a402-b17415628e97"
      >
        {parts.map((part, index) => (
          <>
            {part}
            {index < parts.length - 1 && (
              <span
                className={subtitleHighlightClassName || "font-semibold"}
                herokit-id="24063d6f-d02b-4f8c-91f4-73a51aaef795"
              >
                {subtitleHighlight}
              </span>
            )}
          </>
        ))}
      </span>
    );
  };

  // Render icon
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div className="mb-6 flex justify-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ${iconClassName || "bg-accent"}`}
        >
          <DynamicIcon name={icon} className="h-8 w-8 text-white" />
        </div>
      </div>
    );
  };

  // Render features
  const renderFeatures = () => {
    if (features.length === 0) return null;

    return (
      <div
        className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"
        herokit-id="3ac86c28-f75e-44e5-9bc6-432cdbb2529a"
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-background/50 border-border/50 backdrop-blur-sm"
          >
            <CardContent
              className="text-center"
              herokit-id="00904104-d2c6-4336-b743-388ce2e24221"
            >
              {feature.icon && (
                <DynamicIcon
                  name={feature.icon}
                  className="text-accent mx-auto mb-2 h-8 w-8"
                />
              )}
              <h2
                className="text-sm font-semibold"
                herokit-id="3e03d117-5368-4379-9269-07c910bc103f"
              >
                {feature.title}
              </h2>
              {feature.description && (
                <p
                  className="text-muted-foreground mt-1 text-xs"
                  herokit-id="489681e6-60f5-4fd3-a77c-93e12d0a64df"
                >
                  {feature.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Render buttons - support both HeroSection style (label, string icon) and Hero/Hero style (text, LucideIcon)
  const renderButtons = () => {
    if (buttons.length === 0) return null;

    const buttonText = (button: HeroButton) =>
      button.label || button.text || "";
    const hasLucideIcons = buttons.some(
      (b) => b.icon && typeof b.icon !== "string"
    );
    const useScrollButtons = hasLucideIcons || enableScrollTo;

    return (
      <div
        className={`flex flex-col gap-4 sm:flex-row ${buttonsWrapperClassName || ""}`}
        herokit-id="71d39112-c000-4c04-b50a-8a50b5f7ac39"
      >
        {buttons.map((button, index) => {
          const buttonLabel = buttonText(button);

          if (
            useScrollButtons &&
            (typeof button.icon !== "string" || enableScrollTo)
          ) {
            // Use ScrollButton for Hero/Hero style with LucideIcon or when enableScrollTo is true
            return (
              <ScrollButton
                key={index}
                href={button.href}
                text={buttonLabel}
                size={button.size || "lg"}
                variant={button.variant}
                icon={typeof button.icon !== "string" ? button.icon : undefined}
                onClick={button.onClick}
                enableScrollTo={enableScrollTo}
              />
            );
          }

          // Use Button/Link for HeroSection style with string icons
          return (
            <Button
              key={index}
              asChild
              variant={button.variant || "default"}
              size={button.size || "lg"}
            >
              <Link
                href={button.href}
                onClick={button.onClick}
                herokit-id="6d319d78-b84f-46ce-84ef-8ea8e1fb2097"
              >
                {button.icon && typeof button.icon === "string" && (
                  <DynamicIcon name={button.icon} className="mr-2 h-5 w-5" />
                )}
                {buttonLabel}
              </Link>
            </Button>
          );
        })}
      </div>
    );
  };

  // Render trust badges (Hero/Hero style)
  const renderTrustBadges = () => {
    if (trustBadges.length === 0) return null;

    return (
      <div
        className={`flex flex-wrap gap-4 pt-4 ${badgesWrapperClassName || ""}`}
        herokit-id="e20a6592-e764-43ee-b113-77e567305409"
      >
        {trustBadges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <Badge
              key={index}
              variant={badge.variant || "secondary"}
              className="px-4 py-2 text-sm"
              herokit-id="dfd642f0-b1ba-47dc-8f2f-2c62ff468b32"
            >
              {IconComponent && (
                <IconComponent className="text-accent mr-2 h-4 w-4" />
              )}
              {badge.text}
            </Badge>
          );
        })}
      </div>
    );
  };

  // Render image - support both styles
  const renderImage = () => {
    if (!image) return null;

    // Determine responsive sizes based on layout
    const defaultSizes = useModernLayout
      ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      : "(max-width: 768px) 100vw, 600px";
    const sizes = image.sizes || defaultSizes;

    const imageWrapper = (
      <div
        className={`relative ${enableAnimation ? "animate-fade-in" : ""} ${imageWrapperClassName || ""}`}
        style={
          enableAnimation
            ? { animationDelay: `${imageAnimationDelay}s` }
            : undefined
        }
      >
        <div
          className={`${useModernLayout ? "aspect-video overflow-hidden rounded-lg shadow-2xl" : "rounded-lg shadow-2xl"} ${imageClassName || ""}`}
        >
          <OptimizedImage
            src={image.src}
            mobileSrc={image.mobileSrc}
            desktopSrc={image.desktopSrc}
            alt={image.alt}
            width={image.width || (useModernLayout ? 1200 : 600)}
            height={image.height || (useModernLayout ? 800 : 600)}
            className={`${useModernLayout ? "h-full w-full object-cover" : ""} ${imgClassName || ""}`}
            priority={image.priority !== false}
            fetchPriority="high"
            sizes={sizes}
            {...(image.srcSet ? { srcSet: image.srcSet } : {})}
          />
        </div>
      </div>
    );

    return imageWrapper;
  };

  // Render content section - used by both old and new layouts
  const renderContent = () => (
    <div
      className={`space-y-8 ${enableAnimation ? "animate-fade-in" : ""} ${contentClassName || ""}`}
      herokit-id="7f3a17a4-c41a-4414-af7b-c37e8829586a"
    >
      <div
        className="space-y-4"
        herokit-id="8e94103e-6bae-49cc-a084-b93fa13ff10a"
      >
        {useModernLayout ? (
          <h1
            lang="de"
            className={`text-balance break-words hyphens-auto ${titleClassName || ""}`}
            herokit-id="5f4f23c8-e28a-4537-b73b-a1859647d179"
          >
            {renderTitle("")}
          </h1>
        ) : (
          <Heading
            level={1}
            className={`break-words hyphens-auto ${titleClassName}`}
            herokit-id="7fd72b26-f764-4018-90f6-24679373a476"
          >
            {renderTitle("")}
          </Heading>
        )}

        {subtitle && (
          <p
            className={`text-muted-foreground max-w-2xl text-xl text-balance ${subtitleClassName || ""}`}
            herokit-id="1001b117-3ad4-498a-a2b4-e2a69b197c80"
          >
            {renderSubtitle("")}
          </p>
        )}

        {description &&
          (_htmlProps?.description ? (
            <SafeHtml
              content={description}
              tag="p"
              className={`text-muted-foreground max-w-2xl text-lg text-balance ${descriptionClassName || ""}`}
              herokit-id="d8576f6d-016c-45ff-a1d0-825f7f03b9c9"
            />
          ) : (
            <p
              className={`text-muted-foreground max-w-2xl text-lg text-balance ${descriptionClassName || ""}`}
              herokit-id="d8576f6d-016c-45ff-a1d0-825f7f03b9c9"
            >
              {description}
            </p>
          ))}
      </div>

      {renderFeatures()}
      {renderButtons()}
      {renderTrustBadges()}
      {children}
    </div>
  );

  // Hero/Hero style layouts (default, image-left, centered with modern props)
  if (useModernLayout) {
    const sectionClass =
      `${getPaddingTopClass()} ${getPaddingBottomClass()} ${className || ""}`.trim();
    const bgClass =
      !className && !customBackgroundClass ? getBackgroundClass() : "";

    if (layout === "centered") {
      return (
        <Section id={sectionId} className={sectionClass || bgClass}>
          <Container className={containerClassName}>
            <div
              className="mx-auto max-w-4xl space-y-8 text-center"
              herokit-id="38b03539-771d-4329-acde-b31b9d343e79"
            >
              {renderIcon()}
              {renderContent()}
              {renderImage()}
            </div>
          </Container>
        </Section>
      );
    }

    // Default or image-left layout
    return (
      <Section id={sectionId} className={sectionClass || bgClass}>
        <Container className={containerClassName}>
          <div
            className={`grid items-center gap-12 lg:grid-cols-2 ${
              imagePosition === "left" || layout === "image-left"
                ? "lg:grid-flow-dense"
                : ""
            }`}
          >
            <div
              className={
                imagePosition === "left" || layout === "image-left"
                  ? "lg:col-start-2"
                  : ""
              }
              herokit-id="f6966aa3-e58a-4439-a950-0e604921c641"
            >
              {renderContent()}
            </div>
            <div
              className={
                imagePosition === "left" || layout === "image-left"
                  ? "lg:col-start-1 lg:row-start-1"
                  : ""
              }
              herokit-id="39bc16db-db20-44a3-9099-54b2d92268f4"
            >
              {renderImage()}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // HeroSection style layouts (centered, split, minimal)
  // Centered layout
  if (layout === "centered") {
    return (
      <section className={`py-8 md:py-16 ${getBackgroundClass()}`}>
        <div className="container">
          <div
            className="mx-auto max-w-4xl text-center"
            herokit-id="97b2c201-b1a4-4573-bea8-bfbbb4e9f484"
          >
            {renderIcon()}

            <Heading
              level={1}
              className={`break-words hyphens-auto ${titleClassName}`}
              herokit-id="b57c6f4d-53ab-404e-a5eb-8954602bbcbf"
            >
              {renderTitle("")}
            </Heading>

            {subtitle && (
              <p
                className={`mb-2 text-lg ${subtitleClassName}`}
                herokit-id="276fd5b2-fe3a-454d-a599-92c224a3e14d"
              >
                {renderSubtitle("")}
              </p>
            )}

            {description && (
              <p
                className={`text-muted-foreground mx-auto max-w-2xl text-base ${descriptionClassName}`}
                herokit-id="75c8bf98-dd50-49a3-97ab-023bd0bfbbaf"
              >
                {description}
              </p>
            )}

            {renderFeatures()}
            {renderButtons()}
            {renderTrustBadges()}
            {children}
          </div>
        </div>
      </section>
    );
  }

  // Split layout
  if (layout === "split") {
    return (
      <section className={`py-8 md:py-16 ${getBackgroundClass()}`}>
        <div className="container">
          <div className="max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-6 md:gap-12 lg:grid-cols-2">
              {/* Left side - Text content */}
              <div
                className="order-2 space-y-8 lg:order-1"
                herokit-id="ac50b6bf-6d09-4779-8bd4-bfed374e8109"
              >
                <h1
                  lang="de"
                  className={`font-heading text-foreground mb-6 text-4xl font-bold break-words hyphens-auto md:text-5xl lg:text-6xl ${titleClassName}`}
                  herokit-id="c8b7b244-2434-4a54-83c2-17d76e088813"
                >
                  {renderTitle("")}
                </h1>

                {subtitle && (
                  <p
                    className={`text-muted-foreground mb-8 text-xl ${subtitleClassName}`}
                    herokit-id="a7031f60-61b3-4bb8-b5be-89cf7ea37e46"
                  >
                    {renderSubtitle("")}
                  </p>
                )}

                {description && (
                  <p
                    className={`text-muted-foreground mb-8 text-base ${descriptionClassName}`}
                    herokit-id="96940953-f723-42e6-b115-6a632dbe5d39"
                  >
                    {description}
                  </p>
                )}

                {renderFeatures()}
                {renderButtons()}
                {renderTrustBadges()}
                {children}
              </div>

              {/* Right side - Image */}
              <div
                className="order-1 lg:order-2"
                herokit-id="7eda24d3-8f70-4730-a359-c915f2be6318"
              >
                {renderImage()}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Minimal layout
  if (layout === "minimal") {
    return (
      <section className={`py-8 md:py-16 ${getBackgroundClass()}`}>
        <div className="container">
          <div
            className={`mx-auto max-w-4xl text-center ${sectionTextClassName}`}
            herokit-id="8428312b-778c-44d3-a21b-c15db069fdeb"
          >
            {renderIcon()}

            <h1
              lang="de"
              className={`font-heading text-gray-900 mb-4 text-xl font-bold break-words hyphens-auto md:text-3xl xl:text-5xl ${titleClassName}`}
              herokit-id="9cc65f5e-ac33-4273-bd75-3f770a222ac9"
            >
              {renderTitle(titleClassName)}
            </h1>

            {subtitle && (
              <p
                className={`text-muted-foreground mb-2 text-lg ${subtitleClassName}`}
                herokit-id="db71b60a-c636-49c1-afc8-888fd8275872"
              >
                {renderSubtitle("")}
              </p>
            )}

            {description &&
              (_htmlProps?.description ? (
                <SafeHtml
                  content={description}
                  tag="p"
                  className={`text-muted-foreground mx-auto mb-8 max-w-2xl text-base ${descriptionClassName}`}
                  herokit-id="fc0aed86-d7da-4399-9b30-c89da53ade23"
                />
              ) : (
                <p
                  className={`text-muted-foreground mx-auto mb-8 max-w-2xl text-base ${descriptionClassName}`}
                  herokit-id="fc0aed86-d7da-4399-9b30-c89da53ade23"
                >
                  {description}
                </p>
              ))}

            {renderButtons()}
            {renderTrustBadges()}

            {children}
          </div>
        </div>
      </section>
    );
  }

  if (layout === "document") {
    return (
      <section className={`bg-[#F8FAFB] py-8 md:py-16 ${className || ""}`}>
        <div className="container-gutachten">
          <div className={`max-w-4xl ${sectionTextClassName}`}>
            <Heading
              level={1}
              className={`break-words hyphens-auto ${titleClassName}`}
              herokit-id="69242140-0fa7-4a2f-ba12-e19c11edd672"
            >
              {renderTitle("")}
            </Heading>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default Hero;
