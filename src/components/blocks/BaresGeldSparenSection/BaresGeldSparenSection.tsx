import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DynamicIcon, type LucideIconName } from "@/lib/icon-utils";
import {
  CardLayout,
  type CardLayoutItem,
} from "@/components/blocks/CardLayout";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderHighlightedText = (
  content: string,
  highlight?: string | string[],
  highlightClassName?: string
) => {
  if (!highlight || content.length === 0) {
    return content;
  }

  const highlightArray = Array.isArray(highlight) ? highlight : [highlight];
  const pattern = new RegExp(
    `(${highlightArray.map(escapeRegExp).join("|")})`,
    "gi"
  );

  const parts = content.split(pattern);
  const defaultHighlightClass = highlightClassName || "text-[#FC7019]";

  return parts.map((part, index) => {
    const match = highlightArray.find(
      (word) => word.toLowerCase() === part.toLowerCase()
    );

    if (match) {
      return (
        <span
          key={`highlight-${match}-${index}`}
          className={defaultHighlightClass}
          herokit-id="af3cd197-e05c-4e3b-91ab-f0788f039265"
        >
          {part}
        </span>
      );
    }

    return (
      <React.Fragment
        key={`text-${index}`}
        herokit-id="6c06261f-8c87-4a8c-9fbf-e72c1ae1e8f9"
      >
        {part}
      </React.Fragment>
    );
  });
};

export type BulletItem = {
  text: string;
  icon?: LucideIconName;
  iconClassName?: string;
  iconImage?: string;
  iconImageAlt?: string;
  iconImageClassName?: string;
};

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

export type CardItem = {
  title: string;
  description: string;
  icon?: LucideIconName;
  iconClassName?: string;
  iconImage?: string;
  iconImageAlt?: string;
  iconImageClassName?: string;
  overlayImage?: string;
  overlayImageAlt?: string;
  overlayImageClassName?: string;
  className?: string;
};

// New: team/contacts item
export type ContactItem = {
  name: string;
  role?: string;
  bio?: string;
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  socialHref?: string;
};

export interface BaresGeldSparenSectionProps {
  sectionId?: string;
  eyebrow?: string;
  eyebrowClassName?: string;
  title?: string;
  titleClassName?: string;
  bulletItems: BulletItem[];
  bulletListClassName?: string;
  bulletTextClassName?: string;
  summary?: string | string[];
  summaryClassName?: string;
  summaryContainerClassName?: string;
  headerTitle?: string;
  headerTitleClassName?: string;
  headerDescription?: string;
  headerDescriptionClassName?: string;
  headerContainerClassName?: string;
  headerImage?: string;
  headerImageAlt?: string;
  headerImageClassName?: string;
  highlight?: string | string[];
  highlightClassName?: string;
  cta?: CTAConfig;
  ctas?: CTAConfig[];
  headerCta?: CTAConfig;
  eyebrowContainerClassName?: string;
  contentGridClassName?: string;
  contentFlexClassName?: string;
  cards: CardItem[];
  cards2?: CardItem[];
  cardsGridClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  backgroundClassName?: string;
  containerClassName?: string;
  className?: string;
  ctaIconClassName?: string;
  variant?: "default" | "imagecard" | "imagecard-shadow" | "contacts";
  // CardLayout props - allow parent to customize CardLayout component
  cardLayoutVariant?: "icon-top" | "cta" | "step" | "link";
  cardLayoutColumns?: 2 | 3 | 4;
  cardLayoutGridClassName?: string;
  cardLayoutCardClassName?: string;
  cardLayoutEnableAnimation?: boolean;
  cardLayoutAnimationDelay?: number;
  cardIconClassName?: string;
  // New: contacts variant props
  contacts?: ContactItem[];
  contactsGridClassName?: string;
  contactNameClassName?: string;
  contactRoleClassName?: string;
  contactBioClassName?: string;
}

export const BaresGeldSparenSection: React.FC<BaresGeldSparenSectionProps> = ({
  sectionId = "bares-geld-sparen",
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  bulletItems,
  bulletListClassName,
  bulletTextClassName,
  summary,
  summaryClassName,
  summaryContainerClassName,
  headerTitle,
  headerTitleClassName,
  headerContainerClassName,
  headerDescription,
  headerDescriptionClassName,
  headerImage,
  headerImageAlt,
  headerImageClassName,
  highlight,
  highlightClassName,
  cta,
  ctas,
  headerCta,
  eyebrowContainerClassName,
  contentGridClassName,
  contentFlexClassName,
  cards,
  cards2,
  cardsGridClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  backgroundClassName = "bg-white",
  containerClassName,
  className,
  ctaIconClassName,
  variant = "default",
  // CardLayout props
  cardLayoutVariant = "icon-top",
  cardLayoutColumns = 3,
  cardLayoutGridClassName,
  cardLayoutCardClassName,
  cardLayoutEnableAnimation = false,
  cardLayoutAnimationDelay = 0.1,
  cardIconClassName,
  // contacts variant props
  contacts,
  contactsGridClassName,
  contactNameClassName,
  contactRoleClassName,
  contactBioClassName,
}) => {
  const summaryParagraphs = Array.isArray(summary)
    ? summary.filter((paragraph) => paragraph && paragraph.trim().length > 0)
    : summary
      ? [summary]
      : [];

  const CTAIconName: LucideIconName | null =
    (cta?.icon as LucideIconName | undefined) ?? "ArrowUpRight";

  // For imagecard and imagecard-shadow variants, use ctas array if provided, otherwise fall back to single cta
  const imageCardCTAs =
    variant === "imagecard" || variant === "imagecard-shadow"
      ? ctas || (cta ? [cta] : [])
      : [];

  // Render imagecard variant
  if (variant === "imagecard") {
    return (
      <Section
        id={sectionId}
        className={cn("py-20 md:py-[120px]", backgroundClassName, className)}
      >
        <Container
          className={cn("mx-auto max-w-6xl", containerClassName)}
          herokit-id="2b466e27-589a-4ee6-9b3b-32b005b0c7b3"
        >
          <div
            className={cn(
              "grid items-start gap-8 px-4 md:p-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16",
              contentGridClassName
            )}
          >
            <div
              className="bares-geld-image-container space-y-10"
              herokit-id="d1eafe7f-085c-4363-b339-41f249283b10"
            >
              {eyebrow && (
                <span
                  className={cn(
                    "text-dark-gray text-sm font-semibold tracking-tight uppercase",
                    eyebrowClassName
                  )}
                  herokit-id="248b6dcb-4b1f-4a62-97bc-0ce5dfc0e4a2"
                >
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2
                  className={cn(
                    "text-2xl leading-[144%] font-medium text-[#273238] md:text-[32px]",
                    titleClassName
                  )}
                  herokit-id="6e9bc873-43c2-4909-a4e2-1b4a3c0c3361"
                >
                  {title}
                </h2>
              )}
              {headerImage && (
                <div className="flex items-start justify-start">
                  <Image
                    src={headerImage}
                    alt={headerImageAlt || ""}
                    width={200}
                    height={200}
                    className={cn(
                      "h-auto w-full rounded-lg object-cover",
                      headerImageClassName
                    )}
                    loading="lazy"
                  />
                </div>
              )}
              {headerCta && (
                <Button
                  asChild
                  variant={headerCta.variant || "default"}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[8px] px-6 py-6 text-base font-semibold",
                    "bg-slate-900 text-white hover:bg-slate-900/90",
                    headerCta.className
                  )}
                >
                  <Link
                    href={headerCta.href}
                    target={headerCta.external ? "_blank" : undefined}
                    rel={headerCta.external ? "noopener noreferrer" : undefined}
                    herokit-id="20d9ac9c-26d7-4cea-8b00-bd26f240740b"
                  >
                    {headerCta.label}
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

            <div
              className={cn(
                "bares-geld-text-container flex flex-col justify-start space-y-10",
                summaryContainerClassName
              )}
              herokit-id="39656a33-d87f-466a-9860-60345be5ded0"
            >
              <div
                className={cn("space-y-2", headerContainerClassName)}
                herokit-id="28f50adf-fa34-405f-953d-bb1083e9ff74"
              >
                {headerTitle && (
                  <h3
                    className={cn(
                      "text-sm leading-[144%] font-semibold text-[#273238]",
                      headerTitleClassName
                    )}
                    herokit-id="ffb216ab-882c-40d6-9214-3eabd2499588"
                  >
                    {headerTitle}
                  </h3>
                )}
                {headerDescription && (
                  <p
                    className={cn(
                      "text-base leading-relaxed font-normal text-[#515A5F]",
                      headerDescriptionClassName
                    )}
                    herokit-id="715e8357-76fc-4b9b-b8fb-8cf668666a7c"
                  >
                    {headerDescription}
                  </p>
                )}
              </div>
              {summaryParagraphs.length > 0 && (
                <div
                  className="space-y-6"
                  herokit-id="1a8b7d92-5938-4a9f-b295-98b7ec3d691d"
                >
                  {summaryParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={cn(
                        "text-base leading-relaxed font-normal text-[#515A5F]",
                        summaryClassName
                      )}
                      herokit-id="86fd585b-72cf-4d5a-ae3f-84e255778f79"
                    >
                      {renderHighlightedText(
                        paragraph,
                        highlight,
                        highlightClassName
                      )}
                    </p>
                  ))}
                </div>
              )}

              {imageCardCTAs.length > 0 && (
                <div
                  className="flex flex-wrap gap-3 md:gap-6"
                  herokit-id="9adfe5ee-779b-4e2e-bd82-cb9a1d4b2f3c"
                >
                  {imageCardCTAs.map((ctaItem, index) => {
                    const iconName: LucideIconName | null =
                      (ctaItem?.icon as LucideIconName | undefined) ??
                      "ArrowUpRight";
                    return (
                      <Button
                        key={index}
                        asChild
                        variant={ctaItem.variant || "default"}
                        className={cn(
                          "inline-flex items-center gap-6 rounded-[8px] px-6 py-6 text-base font-semibold",
                          ctaItem.variant === "outline"
                            ? "border border-slate-300 bg-white text-black hover:bg-slate-50"
                            : "bg-slate-900 text-white hover:bg-slate-900/90",
                          ctaItem.className
                        )}
                      >
                        <Link
                          href={ctaItem.href}
                          target={ctaItem.external ? "_blank" : undefined}
                          rel={
                            ctaItem.external ? "noopener noreferrer" : undefined
                          }
                          herokit-id="4fc1b840-8181-43a8-8051-416919c8d817"
                        >
                          {ctaItem.label}
                          {iconName && (
                            <DynamicIcon
                              name={iconName}
                              className={cn(`h-3 w-3 ${ctaIconClassName}`)}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {[cards, cards2].map((cardArray, arrayIndex) => {
            if (!cardArray || cardArray.length === 0) return null;

            // First array (cards) gets priority loading for instant display
            const isPriorityArray = arrayIndex === 0;

            return (
              <div
                key={`card-grid-${arrayIndex}`}
                className={cn("grid gap-6 md:grid-cols-3", cardsGridClassName)}
                herokit-id="c0d194f5-199d-4a68-b395-37ee71d8a185"
              >
                {cardArray.map((card, cardIndex) => {
                  const cardImage = card.iconImage;

                  return (
                    <Card
                      key={card.title}
                      className={cn(
                        "border-none p-0 shadow-none",
                        card.className
                      )}
                    >
                      <CardContent
                        className="space-y-6 p-4"
                        herokit-id="2ad892dd-d5c3-44fd-8f85-b85d6c796e00"
                      >
                        {cardImage && (
                          <div
                            className="relative flex items-start justify-start"
                            herokit-id="7b995f86-feba-43dd-bd5f-23f974f99fb9"
                          >
                            <Image
                              src={cardImage}
                              alt={card.iconImageAlt || card.title}
                              width={600}
                              height={800}
                              priority={isPriorityArray && cardIndex < 3}
                              loading={
                                isPriorityArray && cardIndex < 3
                                  ? "eager"
                                  : "lazy"
                              }
                              className={cn(
                                "h-auto w-full object-cover md:h-[220px] lg:h-[260px]",
                                card.iconImageClassName
                              )}
                              quality={90}
                            />
                            {card.overlayImage && (
                              <div className="absolute top-2 right-2">
                                <Image
                                  src={card.overlayImage}
                                  alt={card.overlayImageAlt || ""}
                                  width={80}
                                  height={80}
                                  className={cn(
                                    "h-auto w-16 object-contain md:w-20",
                                    card.overlayImageClassName
                                  )}
                                  loading={
                                    isPriorityArray && cardIndex < 3
                                      ? "eager"
                                      : "lazy"
                                  }
                                  priority={isPriorityArray && cardIndex < 3}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <div className="space-y-2">
                          <h3
                            className={cn(
                              "text-base font-semibold text-[#273238] md:text-xl",
                              cardTitleClassName
                            )}
                            herokit-id="0567a652-349e-4a3d-b7b1-56a9d5a63343"
                          >
                            {card.title}
                          </h3>
                          <p
                            className={cn(
                              "text-sm leading-relaxed font-normal text-[#515A5F]",
                              cardDescriptionClassName
                            )}
                            herokit-id="c00de67b-cc6d-4e97-8a63-a961551dc620"
                          >
                            {card.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </Container>
      </Section>
    );
  }

  // New variant: contacts (team-style cards)
  if (variant === "contacts") {
    return (
      <Section
        id={sectionId}
        className={cn("py-20 md:py-[120px]", backgroundClassName, className)}
      >
        <Container className={cn("mx-auto max-w-6xl", containerClassName)}>
          {title && (
            <h2
              className={cn(
                "mb-10 text-center text-3xl font-semibold text-[#0F172A] md:mb-14 md:text-4xl",
                titleClassName
              )}
            >
              {title}
            </h2>
          )}
          <div
            className={cn("grid gap-8 md:grid-cols-3", contactsGridClassName)}
          >
            {(contacts || []).map((person, idx) => (
              <Card
                key={`${person.name}-${idx}`}
                className="border-none p-0 shadow-none"
              >
                <CardContent className="space-y-4 p-0">
                  <div className="relative">
                    <Image
                      src={person.image}
                      alt={person.imageAlt || person.name}
                      width={720}
                      height={900}
                      className={cn(
                        "h-auto w-full rounded-2xl object-cover",
                        person.imageClassName
                      )}
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2 px-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={cn(
                          "text-base font-semibold text-[#0F172A] md:text-lg",
                          contactNameClassName
                        )}
                      >
                        {person.name}
                      </h3>
                      {person.socialHref && (
                        <Link
                          href={person.socialHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name} auf LinkedIn`}
                          className="text-[#94A3B8] transition-colors hover:text-[#0A66C2]"
                        >
                          <DynamicIcon name="Linkedin" className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    {person.role && (
                      <div
                        className={cn(
                          "text-sm font-semibold text-[#FC7019]",
                          contactRoleClassName
                        )}
                      >
                        {person.role}
                      </div>
                    )}
                    {person.bio && (
                      <p
                        className={cn(
                          "text-sm leading-relaxed text-[#515A5F]",
                          contactBioClassName
                        )}
                      >
                        {person.bio}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  // Render imagecard-shadow variant (new enhanced card design)
  if (variant === "imagecard-shadow") {
    return (
      <Section
        id={sectionId}
        className={cn("py-20 md:py-[120px]", backgroundClassName, className)}
      >
        <Container
          className={cn("mx-auto max-w-6xl", containerClassName)}
          herokit-id="41ebc014-9692-4515-90a3-555a7039f71b"
        >
          <div
            className={cn(
              "grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16",
              contentGridClassName
            )}
          >
            <div
              className="flex flex-col gap-6"
              herokit-id="026e3862-0955-4fa4-a8e6-8ad173a9dfd5"
            >
              {eyebrow && (
                <span
                  className={cn(
                    "text-dark-gray text-sm font-semibold tracking-tight uppercase",
                    eyebrowClassName
                  )}
                  herokit-id="0a486dad-217e-49bc-a8d6-06a99498f250"
                >
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2
                  className={cn(
                    "text-2xl leading-[144%] font-medium text-[#273238] md:text-[32px]",
                    titleClassName
                  )}
                  herokit-id="6f7a79f6-0626-4885-b0db-a414ec1c180e"
                >
                  {title}
                </h2>
              )}
              {headerImage && (
                <div className="flex items-start justify-start">
                  <Image
                    src={headerImage}
                    alt={headerImageAlt || ""}
                    width={200}
                    height={200}
                    className={cn(
                      "h-auto w-full rounded-lg object-cover",
                      headerImageClassName
                    )}
                    loading="lazy"
                  />
                </div>
              )}
              {headerCta && (
                <Button
                  asChild
                  variant={headerCta.variant || "default"}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[8px] px-6 py-6 text-base font-semibold",
                    "bg-slate-900 text-white hover:bg-slate-900/90",
                    headerCta.className
                  )}
                >
                  <Link
                    href={headerCta.href}
                    target={headerCta.external ? "_blank" : undefined}
                    rel={headerCta.external ? "noopener noreferrer" : undefined}
                    herokit-id="5d1cb40d-dff8-4e46-a55d-53c5b8226314"
                  >
                    {headerCta.label}
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

            <div
              className={cn(
                "bares-geld-text-container flex flex-col justify-start space-y-10",
                summaryContainerClassName
              )}
              herokit-id="6ac8f7ca-0ade-4492-864a-b1fb3ebd4804"
            >
              <div
                className={cn("space-y-2", headerContainerClassName)}
                herokit-id="cda1f312-f188-48ff-acf3-5a6795852efc"
              >
                {headerTitle && (
                  <h3
                    className={cn(
                      "text-sm leading-[144%] font-semibold text-[#273238]",
                      headerTitleClassName
                    )}
                    herokit-id="63529c9c-41b2-4687-8e8e-50ae6101f62f"
                  >
                    {headerTitle}
                  </h3>
                )}
                {headerDescription && (
                  <p
                    className={cn(
                      "text-base leading-relaxed font-normal text-[#515A5F]",
                      headerDescriptionClassName
                    )}
                    herokit-id="8731790c-5822-4a29-b615-c90a3c409a87"
                  >
                    {headerDescription}
                  </p>
                )}
              </div>
              {summaryParagraphs.length > 0 && (
                <div
                  className="space-y-6"
                  herokit-id="7d97cc83-6c4f-4d7c-b60e-cd952eac250e"
                >
                  {summaryParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={cn(
                        "text-base leading-relaxed font-normal text-[#515A5F]",
                        summaryClassName
                      )}
                      herokit-id="8fb13122-49b2-4c41-afe0-b15c6c04299a"
                    >
                      {renderHighlightedText(
                        paragraph,
                        highlight,
                        highlightClassName
                      )}
                    </p>
                  ))}
                </div>
              )}

              {imageCardCTAs.length > 0 && (
                <div
                  className="flex flex-wrap gap-6"
                  herokit-id="d9d11a1a-6b9e-4a35-a68e-19576da985d6"
                >
                  {imageCardCTAs.map((ctaItem, index) => {
                    const iconName: LucideIconName | null =
                      (ctaItem?.icon as LucideIconName | undefined) ??
                      "ArrowUpRight";
                    return (
                      <Button
                        key={index}
                        asChild
                        variant={ctaItem.variant || "default"}
                        className={cn(
                          "inline-flex items-center gap-6 rounded-[8px] px-6 py-6 text-base font-semibold",
                          ctaItem.variant === "outline"
                            ? "border border-slate-300 bg-white text-black hover:bg-slate-50"
                            : "bg-slate-900 text-white hover:bg-slate-900/90",
                          ctaItem.className
                        )}
                      >
                        <Link
                          href={ctaItem.href}
                          target={ctaItem.external ? "_blank" : undefined}
                          rel={
                            ctaItem.external ? "noopener noreferrer" : undefined
                          }
                          herokit-id="af5a7c73-7ea7-49d5-80fa-927799f2b70e"
                        >
                          {ctaItem.label}
                          {iconName && (
                            <DynamicIcon
                              name={iconName}
                              className={cn(`h-3 w-3 ${ctaIconClassName}`)}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* NEW CARD DESIGN with enhanced shadow */}
          {[cards, cards2].map((cardArray, arrayIndex) => {
            if (!cardArray || cardArray.length === 0) return null;

            // First array (cards) gets priority loading for instant display
            const isPriorityArray = arrayIndex === 0;

            return (
              <div
                key={`card-grid-${arrayIndex}`}
                className={cn("grid gap-6 md:grid-cols-3", cardsGridClassName)}
                herokit-id="8f10cbe5-103f-43be-82db-86f45ce7e494"
              >
                {cardArray.map((card, cardIndex) => {
                  const cardImage = card.iconImage;

                  return (
                    <Card
                      key={card.title}
                      className={cn(
                        "flex flex-1 flex-col items-start gap-6 self-stretch rounded-2xl bg-white p-4",
                        "shadow-[0_18px_5px_0_rgba(0,0,0,0),0_12px_5px_0_rgba(0,0,0,0.02),0_6px_4px_0_rgba(0,0,0,0.05),0_3px_3px_0_rgba(0,0,0,0.09),0_1px_2px_0_rgba(0,0,0,0.10)]",
                        card.className
                      )}
                    >
                      <CardContent
                        className="flex flex-col gap-6 p-0"
                        herokit-id="62741f6f-eb60-402b-9165-0026a546d5c6"
                      >
                        {cardImage && (
                          <div
                            className="relative flex items-start justify-start"
                            herokit-id="7fb32e31-387a-4590-bea7-7063f38f6c23"
                          >
                            <Image
                              src={cardImage}
                              alt={card.iconImageAlt || card.title}
                              width={600}
                              height={800}
                              priority={isPriorityArray && cardIndex < 3}
                              loading={
                                isPriorityArray && cardIndex < 3
                                  ? "eager"
                                  : "lazy"
                              }
                              className={cn(
                                "h-auto w-full object-cover md:h-[220px] lg:h-[260px]",
                                card.iconImageClassName
                              )}
                              quality={90}
                            />
                            {card.overlayImage && (
                              <div className="absolute top-2 right-2">
                                <Image
                                  src={card.overlayImage}
                                  alt={card.overlayImageAlt || ""}
                                  width={80}
                                  height={80}
                                  className={cn(
                                    "h-auto w-16 object-contain md:w-20",
                                    card.overlayImageClassName
                                  )}
                                  loading={
                                    isPriorityArray && cardIndex < 3
                                      ? "eager"
                                      : "lazy"
                                  }
                                  priority={isPriorityArray && cardIndex < 3}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <h3
                            className={cn(
                              "text-xl font-semibold text-[#273238]",
                              cardTitleClassName
                            )}
                            herokit-id="7a4d72df-4d00-4e52-ae1e-0fec53f15d45"
                          >
                            {card.title}
                          </h3>
                          <p
                            className={cn(
                              "text-sm leading-relaxed font-normal text-[#515A5F]",
                              cardDescriptionClassName
                            )}
                            herokit-id="0b8a9e9e-2949-4d48-a03b-487f98b9c0e1"
                          >
                            {card.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </Container>
      </Section>
    );
  }

  // Default variant (existing code)
  return (
    <Section
      id={sectionId}
      className={cn("py-20 md:py-[120px]", backgroundClassName, className)}
    >
      <Container className={cn("mx-auto max-w-6xl", containerClassName)}>
        <div
          className={cn(
            "flex flex-col gap-6 md:flex-row",
            contentFlexClassName || contentGridClassName
          )}
        >
          <div
            className={cn(
              "w-full space-y-10 lg:w-1/2",
              eyebrowContainerClassName
            )}
            herokit-id="988c42c9-b858-4e31-9f0a-4c674a6488fa"
          >
            <div
              className="m-0! flex flex-col gap-6"
              herokit-id="e6ceac75-e820-428f-b69b-04c74fed0c45"
            >
              {eyebrow && (
                <span
                  className={cn(
                    "text-dark-gray text-sm font-semibold tracking-tight uppercase",
                    eyebrowClassName
                  )}
                  herokit-id="e6ea8bcf-851d-486a-a5b9-ab3dd0962a63"
                >
                  {eyebrow}
                </span>
              )}
              <h2
                className={cn(
                  "text-2xl leading-[144%] font-medium text-[#243239] md:text-xl lg:text-2xl xl:text-[32px]",
                  titleClassName
                )}
                herokit-id="c83d310e-4881-41cb-8e24-4ab7559d9e57"
              >
                {title}
              </h2>
            </div>

            {headerCta && (
              <Button
                asChild
                variant={headerCta.variant || "default"}
                className={cn(
                  "inline-flex items-center gap-2 rounded-[8px] px-6 py-6 text-base font-semibold",
                  "bg-slate-900 text-white hover:bg-slate-900/90",
                  headerCta.className
                )}
              >
                <Link
                  href={headerCta.href}
                  target={headerCta.external ? "_blank" : undefined}
                  rel={headerCta.external ? "noopener noreferrer" : undefined}
                  herokit-id="0f39b145-912b-422d-a5d3-4a00f5509a54"
                >
                  {headerCta.label}
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
            <ul className={cn("space-y-2", bulletListClassName)}>
              {bulletItems.map((item, index) => {
                const iconName = item.icon;
                const iconImage = item.iconImage;
                return (
                  <li
                    key={index}
                    className="flex items-center gap-2"
                    herokit-id="2ebc55f7-c612-44be-ac5f-0d2ee66a4a99"
                  >
                    {iconImage ? (
                      <Image
                        src={iconImage}
                        alt={item.iconImageAlt || ""}
                        loading="lazy"
                        width={32}
                        height={32}
                        className={cn(
                          "h-8 w-8 flex-shrink-0",
                          item.iconImageClassName
                        )}
                      />
                    ) : iconName ? (
                      <DynamicIcon
                        name={iconName}
                        className={cn(
                          "h-5 w-5 text-emerald-500",
                          item.iconClassName
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "font-primary text-base leading-[16px] font-normal text-[#515A5F]",
                        bulletTextClassName
                      )}
                      herokit-id="adc76a29-e804-4875-a82c-698bf53c8cee"
                    >
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={cn(
              "flex w-full flex-col justify-between space-y-10 lg:w-1/2",
              summaryContainerClassName
            )}
            herokit-id="8a120d83-577c-4868-adb5-911965448830"
          >
            {headerTitle && (
              <h3
                className={cn(
                  "text-sm leading-[144%] font-semibold text-[#273238]",
                  headerTitleClassName
                )}
                herokit-id="64f9bb2d-2b16-4b7e-bd47-fd4cd8cf98b8"
              >
                {headerTitle}
              </h3>
            )}

            {summaryParagraphs.length > 0 && (
              <div
                className="space-y-4"
                herokit-id="9ef4ceab-7317-4202-9a20-e8224d4af036"
              >
                {summaryParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "text-lg leading-relaxed font-normal text-slate-600 md:text-xl xl:text-2xl",
                      summaryClassName
                    )}
                    herokit-id="ecbe8b63-7257-4668-a954-4dd8fb528bb9"
                  >
                    {renderHighlightedText(
                      paragraph,
                      highlight,
                      highlightClassName
                    )}
                  </p>
                ))}
              </div>
            )}

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
                  herokit-id="89d415b3-725c-4821-9c11-74c5b5edda9a"
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
        </div>

        <div className={cn("mt-16", cardsGridClassName)}>
          <CardLayout
            cards={cards as CardLayoutItem[]}
            variant={cardLayoutVariant}
            columns={cardLayoutColumns}
            gridClassName={cn("grid gap-6", cardLayoutGridClassName)}
            cardClassName={cardLayoutCardClassName}
            cardTitleClassName={cardTitleClassName}
            cardDescriptionClassName={cardDescriptionClassName}
            enableAnimation={cardLayoutEnableAnimation}
            animationDelay={cardLayoutAnimationDelay}
            noWrapper={true}
            cardIconClassName={cardIconClassName}
          />
        </div>
      </Container>
    </Section>
  );
};

export default BaresGeldSparenSection;
