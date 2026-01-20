import { cn } from "@/lib/utils";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  CardLayout,
  type CardLayoutItem,
} from "@/components/blocks/CardLayout";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ProcessHighlight {
  text: string;
}

export type CTAConfig = {
  label: string;
  href: string;
  icon?: LucideIconName;
  external?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  className?: string;
};

export interface ProcessOverviewMedia {
  src: string;
  alt: string;
  mobileSrc?: string;
  desktopSrc?: string;
  overlayImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  };
}

export interface ProcessOverviewProps {
  title?: string;
  highlights?: ProcessHighlight[];
  descriptionIntro?: string;
  steps?: ProcessStep[];
  cta?: CTAConfig;
  media?: ProcessOverviewMedia;
  sectionId?: string;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  stepsClassName?: string;
  mediaClassName?: string;
  ctaIconClassName?: string;
  descriptionClassName?: string;
  // CardLayout props - allow parent to customize CardLayout component
  cardLayoutVariant?: "icon-top" | "cta" | "step" | "link";
  cardLayoutColumns?: 2 | 3 | 4;
  cardLayoutGridClassName?: string;
  cardLayoutCardClassName?: string;
  cardLayoutCardTitleClassName?: string;
  cardLayoutCardDescriptionClassName?: string;
  cardLayoutEnableAnimation?: boolean;
  cardLayoutAnimationDelay?: number;
  headerContainerClassName?: string;
  headerTitleClassName?: string;
}

export function ProcessOverview({
  title,
  highlights = [],
  descriptionIntro,
  steps = [],
  cta,
  media,
  sectionId,
  className,
  containerClassName,
  headerClassName,
  stepsClassName,
  mediaClassName,
  ctaIconClassName,
  descriptionClassName,
  // CardLayout props
  cardLayoutVariant = "step",
  cardLayoutColumns = 3,
  cardLayoutGridClassName,
  cardLayoutCardClassName,
  cardLayoutCardTitleClassName,
  cardLayoutCardDescriptionClassName,
  cardLayoutEnableAnimation = false,
  cardLayoutAnimationDelay = 0.1,
  headerContainerClassName,
  headerTitleClassName,
}: ProcessOverviewProps) {
  if (steps.length === 0) {
    return null;
  }

  const headingId = sectionId ? `${sectionId}-title` : undefined;

  const CTAIconName: LucideIconName | null =
    (cta?.icon as LucideIconName | undefined) ?? "ArrowUpRight";

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className={cn("bg-[#F4F8F7]", className)}
    >
      <div
        className={cn(
          "container mx-auto flex flex-col gap-12 py-[60px] lg:flex-row lg:gap-6 lg:py-[120px]",
          containerClassName
        )}
        herokit-id="25a9f2ec-43c5-4894-a279-263ef60220f3"
      >
        <div
          className={cn(
            "flex w-full flex-col justify-between space-y-10 lg:flex-[2]",
            headerClassName
          )}
        >
          <header
            className={cn(
              "flex flex-col gap-5 px-4 md:p-0 lg:flex-row",
              headerContainerClassName
            )}
          >
            <div
              className={cn(
                "flex w-full max-w-[296px] flex-col justify-between gap-8 md:gap-0",
                headerTitleClassName
              )}
              herokit-id="09db5c22-266b-437a-b498-c03beb21c8cb"
            >
              <h2
                id={headingId}
                className="text-2xl leading-[1.3] font-medium text-[#273238] lg:text-[32px] xl:whitespace-pre-line"
                herokit-id="55356928-29fc-4538-9d38-75f579894555"
              >
                {title}
              </h2>
              {highlights.length > 0 && (
                <div
                  className="flex flex-col"
                  herokit-id="ecefc24e-17f6-4ee5-ba7e-4511dc1400aa"
                >
                  {highlights.map((highlight) => (
                    <span
                      key={highlight.text}
                      className="text-sm font-semibold text-[#515A5F] uppercase"
                      herokit-id="bc594081-49eb-4222-b2ff-cecc0a11e896"
                    >
                      {highlight.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div
              className="flex flex-col space-y-8"
              herokit-id="5ba503b0-479e-494b-a2f6-06ad870eb923"
            >
              <p
                className={cn(
                  "font-normal text-[#515A5F] md:text-sm",
                  descriptionClassName
                )}
                herokit-id="c1cc66d8-a4ea-48d6-b09a-725c5b606e70"
              >
                {descriptionIntro}
              </p>
              {cta && (
                <Button
                  asChild
                  variant={cta.variant || "default"}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[8px] px-6 py-6 text-base font-semibold",
                    "bg-slate-900 text-white hover:bg-slate-900/90",
                    cta.className
                  )}
                >
                  <Link
                    href={cta.href}
                    target={cta.external ? "_blank" : undefined}
                    rel={cta.external ? "noopener noreferrer" : undefined}
                    herokit-id="862a5f7e-ae84-46f9-a0b1-015e3073e540"
                  >
                    {cta.label}
                    {CTAIconName && (
                      <DynamicIcon
                        name={CTAIconName}
                        className={cn(`h-3 w-3 ${ctaIconClassName}`)}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </Button>
              )}
            </div>
          </header>
          {/* CardLayout component with step variant */}
          <CardLayout
            cards={
              steps.map((step) => ({
                step: step.step,
                title: step.title,
                description: step.description,
              })) as CardLayoutItem[]
            }
            variant={cardLayoutVariant}
            columns={cardLayoutColumns}
            gridClassName={cardLayoutGridClassName}
            cardClassName={cardLayoutCardClassName}
            cardTitleClassName={cardLayoutCardTitleClassName}
            cardDescriptionClassName={cardLayoutCardDescriptionClassName}
            enableAnimation={cardLayoutEnableAnimation}
            animationDelay={cardLayoutAnimationDelay}
            noWrapper={true}
          />
        </div>

        {media && (
          <div className="flex w-full lg:w-auto">
            <div
              className={cn(
                "relative flex w-full items-center justify-center overflow-hidden lg:w-auto",
                mediaClassName
              )}
              herokit-id="5f759ce4-3b8d-4a18-ac6d-1618ff6e4ee4"
            >
              {/* Mobile Image */}
              {media.mobileSrc && (
                <Image
                  src={media.mobileSrc}
                  alt={media.alt}
                  width={421}
                  height={584}
                  className="object-cover lg:hidden"
                  sizes="100vw"
                  loading="lazy"
                />
              )}
              {/* Desktop Image */}
              <Image
                src={media.desktopSrc || media.src}
                alt={media.alt}
                width={421}
                height={584}
                className={cn(
                  "object-cover",
                  media.mobileSrc && "hidden lg:block"
                )}
                sizes="(max-width: 1024px) 100vw, auto"
                loading="lazy"
              />
              {media.overlayImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={media.overlayImage.src}
                    alt={media.overlayImage.alt}
                    width={media.overlayImage.width || 286}
                    height={media.overlayImage.height || 300}
                    className={cn(
                      "w-[60%] max-w-[286px] object-contain lg:w-auto lg:max-w-none",
                      media.overlayImage.className
                    )}
                    sizes="(max-width: 1024px) 60vw, 286px"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProcessOverview;
