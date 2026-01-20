import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/blocks/Heading/Heading";
import { Button } from "@/components/ui/button";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";
import { SafeHtml } from "@/lib/safe-html-renderer";

export type TextImageSectionVariant =
  | "default"
  | "saving"
  | "taxSavings"
  | "legalSteps";

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

export interface Paragraph {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  allowMarkup?: boolean;
  customStyles?: Record<string, string>;
}

export interface ContentBlock {
  type: "paragraph" | "highlightBox";
  content: Paragraph | HighlightBox;
}

export interface HighlightBox {
  icon?: string;
  title: string;
  description: string;
  subline?: string;
}

export interface TextImageSectionCta {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  icon?: LucideIconName;
}

export interface TaxSavingsVariantBenefit {
  content: string;
  emphasis?: string | string[];
  description?: string;
}

export interface TaxSavingsVariantBenefitIcon {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  position?: "left" | "right";
  className?: string;
}

export interface TaxSavingsVariantMedia {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  overlayImage?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  };
}

export interface TaxSavingsVariantCta extends TextImageSectionCta {}

export interface TaxSavingsVariantProps {
  sectionId?: string;
  heading?: string;
  headingClassName?: string;
  title?: string;
  intro?: string;
  secondIntro?: string;
  highlight?: string | string[];
  benefits?: TaxSavingsVariantBenefit[];
  benefitIcon?: TaxSavingsVariantBenefitIcon;
  listClassName?: string;
  benefitsItemClassName?: string;
  benefitsItemDescriptionClassName?: string;
  conclusion?: string;
  conclusionClassName?: string;
  cta?: TaxSavingsVariantCta;
  ctas?: TaxSavingsVariantCta[];
  ctaIconClassName?: string;
  ctaIconName?: LucideIconName;
  ctaContainerClassName?: string;
  media?: TaxSavingsVariantMedia;
  mediaClassName?: string;
  mediaPosition?: "left" | "right";
  sectionContainerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  contentTitleClassName?: string;
  introClassName?: string;
  contentIntroClassName?: string;
  contentHeadingClassName?: string;
  titleClassName?: string;
  // Extra fields for specialised layouts (e.g. legalSteps)
  steps?: {
    title: string;
    description?: string;
    icon?: LucideIconName;
  }[];
  problemCard?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
}

export interface TextImageSectionBaseProps {
  backgroundColor?: string;
  className?: string;
}

export interface TextImageSectionDefaultVariantProps
  extends TextImageSectionBaseProps {
  variant?: Extract<TextImageSectionVariant, "default">;
  title: string;
  description?: string;
  contentBlocks?: ContentBlock[];
  features?: FeatureItem[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  textPosition?: "left" | "right";
  titleClassName?: string;
}

export interface TextImageSectionTaxSavingsVariantProps
  extends TextImageSectionBaseProps {
  variant: Extract<
    TextImageSectionVariant,
    "saving" | "taxSavings" | "legalSteps"
  >;
  taxSavingsProps: TaxSavingsVariantProps;
  _htmlProps?: Record<string, boolean>; // Metadata about which props contain HTML
}

export type TextImageSectionProps =
  | TextImageSectionDefaultVariantProps
  | TextImageSectionTaxSavingsVariantProps;

export type TextImageBlockProps = TextImageSectionProps & {
  type: "TextImageSection";
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderParagraphWithHighlights = (paragraph: Paragraph) => {
  if (!paragraph?.highlightWords || paragraph.highlightWords.length === 0) {
    return paragraph.text;
  }

  const text = paragraph.text;
  const highlightClassName =
    paragraph.highlightClassName || "text-accent font-semibold";

  const escapedWords = paragraph.highlightWords.map(escapeRegExp);
  const highlightPattern = new RegExp(`(${escapedWords.join("|")})`, "gi");

  const matches: Array<{
    text: string;
    start: number;
    end: number;
    originalWord: string;
  }> = [];
  let match: RegExpExecArray | null;

  while ((match = highlightPattern.exec(text)) !== null) {
    const originalWord = paragraph.highlightWords.find(
      (word) => word.toLowerCase() === match![1].toLowerCase()
    );

    if (originalWord) {
      matches.push({
        text: match[1],
        start: match.index,
        end: match.index + match[1].length,
        originalWord,
      });
    }
  }

  matches.sort((a, b) => b.start - a.start);

  let result = text;
  const elements: Array<{ content: React.ReactNode; key: number }> = [];
  let keyCounter = 0;

  matches.forEach((currentMatch) => {
    const before = result.substring(0, currentMatch.start);
    const after = result.substring(currentMatch.end);

    result = before + `__HIGHLIGHT_${keyCounter}__` + after;

    elements.push({
      content: (
        <span
          key={keyCounter}
          className={highlightClassName}
          herokit-id="f9607b3c-636c-4075-b605-897f4b03f10f"
        >
          {currentMatch.text}
        </span>
      ),
      key: keyCounter,
    });

    keyCounter += 1;
  });

  const parts = result.split(/(__HIGHLIGHT_\d+__)/);

  return parts.map((part) => {
    const highlightMatch = part.match(/__HIGHLIGHT_(\d+)__/);
    if (highlightMatch) {
      const highlightIndex = parseInt(highlightMatch[1], 10);
      return elements.find((el) => el.key === highlightIndex)?.content || part;
    }
    return part;
  });
};

const renderDefaultContentBlocks = (
  description: string | undefined,
  contentBlocks: ContentBlock[] = []
) => {
  const elements: React.ReactNode[] = [];

  if (description) {
    elements.push(
      <p
        key="description"
        className="text-muted-foreground mb-6 text-sm"
        herokit-id="3482d044-d3fd-49db-93cb-8d3f884bf75d"
      >
        {description}
      </p>
    );
  }

  contentBlocks.forEach((block, index) => {
    if (block.type === "paragraph") {
      const paragraph = block.content as Paragraph;
      elements.push(
        <p
          key={`paragraph-${index}`}
          className={paragraph.className || "text-muted-foreground"}
          herokit-id="548305cb-bb9c-4208-b54a-2b74787ea7b6"
        >
          {renderParagraphWithHighlights(paragraph)}
        </p>
      );
    } else if (block.type === "highlightBox") {
      const highlightBox = block.content as HighlightBox;
      elements.push(
        <div
          key={`highlightBox-${index}`}
          className="border-accent/20 bg-accent/10 my-6 rounded-lg border p-4"
        >
          <div
            className="flex items-center justify-center"
            herokit-id="ba80c1bb-45c3-4d23-8bf7-4cb12fe06b71"
          >
            {highlightBox.icon && (
              <DynamicIcon
                name={highlightBox.icon}
                className="text-accent mr-3 hidden h-6 w-6 shrink-0 md:block"
              />
            )}
            <div className="text-center">
              <h3
                className="text-accent mb-1 text-2xl font-semibold"
                herokit-id="f1aca697-e071-4e03-ae54-d63acb081f79"
              >
                {highlightBox.title}
              </h3>
              <p
                className="text-muted-foreground text-sm"
                herokit-id="706b5755-3431-4439-bd8c-89db9853026b"
              >
                {highlightBox.description}
              </p>
              <p
                className="text-foreground text-sm"
                herokit-id="c7d2fa48-736d-40b3-9da3-851932b01c27"
              >
                {highlightBox.subline}
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return elements;
};

const renderTaxSavingsEmphasizedText = (
  content: string,
  emphasis?: string | string[]
) => {
  if (!emphasis || content.length === 0) {
    return content;
  }

  const emphasisArray = Array.isArray(emphasis) ? emphasis : [emphasis];
  const pattern = new RegExp(
    `(${emphasisArray.map(escapeRegExp).join("|")})`,
    "gi"
  );

  const parts = content.split(pattern);

  return parts.map((part, index) => {
    const match = emphasisArray.find(
      (word) => word.toLowerCase() === part.toLowerCase()
    );

    if (match) {
      return (
        <span
          key={`${match}-${index}`}
          className="font-semibold text-[#FF985C]"
          herokit-id="d777a987-c459-4ad2-a4fe-4cb5f16ed091"
        >
          {part}
        </span>
      );
    }

    return (
      <React.Fragment
        key={`text-${index}`}
        herokit-id="3351e57f-0b63-4afd-89f5-5a7d0955dd8c"
      >
        {part}
      </React.Fragment>
    );
  });
};

const renderHighlightedText = (
  content: string,
  highlight?: string | string[]
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

  return parts.map((part, index) => {
    const match = highlightArray.find(
      (word) => word.toLowerCase() === part.toLowerCase()
    );

    if (match) {
      return (
        <span
          key={`highlight-${match}-${index}`}
          className="text-[#FC7019]"
          herokit-id="f685bb34-bca4-467c-9bfc-126bf1ff9943"
        >
          {part}
        </span>
      );
    }

    return (
      <React.Fragment
        key={`text-${index}`}
        herokit-id="f2b2331c-009e-46e6-91f1-ac2fbf30de2d"
      >
        {part}
      </React.Fragment>
    );
  });
};

type TextImageSectionComponentProps = Omit<TextImageBlockProps, "type"> & {
  _htmlProps?: Record<string, boolean>; // Metadata about which props contain HTML
};

const isTaxSavingsVariant = (
  props: TextImageSectionComponentProps
): props is TextImageSectionTaxSavingsVariantProps =>
  props.variant === "taxSavings" ||
  props.variant === "saving" ||
  props.variant === "legalSteps";

const DefaultVariant: React.FC<TextImageSectionDefaultVariantProps> = ({
  title,
  description,
  contentBlocks = [],
  features = [],
  imageSrc,
  imageAlt,
  imageWidth = 500,
  imageHeight = 500,
  textPosition = "left",
  backgroundColor = "bg-white",
  className = "",
  titleClassName = "",
}) => {
  const textOrder = textPosition === "left" ? "order-1" : "order-2";
  const imageOrder = textPosition === "left" ? "order-2" : "order-1";

  return (
    <section className={cn("py-8 md:py-16", backgroundColor, className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Heading
              level={2}
              underline
              className={titleClassName}
              herokit-id="d96f9fbf-1921-477e-80d6-d00101305beb"
            >
              {title}
            </Heading>
          </div>

          <div
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
            herokit-id="daac3e6c-476c-49bf-a4b5-b767fff242ca"
          >
            <div className={textOrder}>
              <Card className="shadow-medium p-0">
                <CardContent
                  className="p-8"
                  herokit-id="0fbeb442-39c4-4029-b6c1-0ac7fa08aba1"
                >
                  {renderDefaultContentBlocks(description, contentBlocks)}

                  {features.length > 0 && (
                    <div
                      className="grid grid-cols-1 gap-6 md:grid-cols-3"
                      herokit-id="8943f423-0ef2-432c-b707-3efd86809ad0"
                    >
                      {features.map((feature, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="bg-accent/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
                            herokit-id="063ac068-b72c-4296-a0cc-0c87d037cb8b"
                          >
                            {feature.icon && (
                              <DynamicIcon
                                name={feature.icon}
                                className="text-accent h-6 w-6"
                              />
                            )}
                          </div>
                          <h3
                            className="mb-2 font-semibold"
                            herokit-id="2f19b578-f18b-4e4b-8f33-fa9b54ba672d"
                          >
                            {feature.title}
                          </h3>
                          <p
                            className="text-muted-foreground text-sm"
                            herokit-id="bf2b4a74-4517-4647-a70d-d0da232ce4d3"
                          >
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {imageSrc && (
              <div className={imageOrder}>
                <Image
                  src={imageSrc}
                  alt={imageAlt || ""}
                  width={imageWidth}
                  height={imageHeight}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

type TaxSavingsVariantComponentProps = Pick<
  TextImageSectionTaxSavingsVariantProps,
  "taxSavingsProps" | "backgroundColor" | "className"
> & {
  _htmlProps?: Record<string, boolean>; // Metadata about which props contain HTML
};

type LegalStepsVariantComponentProps = Pick<
  TextImageSectionTaxSavingsVariantProps,
  "taxSavingsProps" | "backgroundColor" | "className"
>;

const TaxSavingsVariant: React.FC<TaxSavingsVariantComponentProps> = ({
  taxSavingsProps,
  backgroundColor = "bg-white",
  className = "",
  _htmlProps,
}) => {
  if (!taxSavingsProps) {
    return null;
  }

  const {
    sectionId,
    heading,
    headingClassName,
    title,
    intro,
    secondIntro,
    highlight,
    benefits = [],
    benefitIcon,
    listClassName,
    benefitsItemClassName,
    benefitsItemDescriptionClassName,
    conclusion,
    conclusionClassName,
    cta,
    ctas,
    ctaIconClassName,
    ctaIconName,
    ctaContainerClassName,
    media,
    mediaClassName,
    mediaPosition = "right",
    sectionContainerClassName,
    containerClassName,
    contentClassName,
    contentTitleClassName,
    contentHeadingClassName,
    contentIntroClassName,
    introClassName,
    titleClassName,
  } = taxSavingsProps;

  const generatedHeadingId = React.useId();
  const sectionHeadingId = title
    ? sectionId
      ? `${sectionId}-heading`
      : generatedHeadingId
    : undefined;

  const CTAIconName =
    cta?.icon || ctaIconName ? cta?.icon || ctaIconName : undefined;
  const hasBenefits = Array.isArray(benefits) && benefits.length > 0;

  // Support both single cta and array of ctas
  const allCTAs = ctas || (cta ? [cta] : []);

  return (
    <section
      id={sectionId}
      aria-labelledby={sectionHeadingId}
      className={cn("py-12 md:py-20", backgroundColor, className)}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "flex flex-col items-center gap-16 lg:flex-row",
            sectionContainerClassName,
            mediaPosition === "left" && "lg:flex-row-reverse"
          )}
          herokit-id="3dc17855-c6d4-4215-8ec1-9bda156eda27"
        >
          <div
            className={cn("flex w-full flex-col gap-6", contentClassName)}
            herokit-id="e3de6be4-fce8-4802-abae-635038c718d7"
          >
            <div className={cn("flex flex-col gap-6", contentTitleClassName)}>
              <div
                className={cn("flex flex-col gap-6", contentHeadingClassName)}
                herokit-id="2af6b315-1370-4136-8bf7-0e87fc78d3a1"
              >
                {heading && (
                  <h3
                    className={cn(
                      "text-sm leading-tight font-medium whitespace-pre-line text-[#273238]",
                      headingClassName
                    )}
                    herokit-id="0bc03713-f0a2-4da1-a0e7-5fe35ab4d974"
                  >
                    {heading}
                  </h3>
                )}

                {title && (
                  <h2
                    id={sectionHeadingId}
                    className={cn(
                      "text-2xl font-medium whitespace-pre-line text-[#273238] lg:text-3xl xl:text-[32px]",
                      titleClassName
                    )}
                    herokit-id="27edb8b0-d707-4423-866b-41d559751710"
                  >
                    {title}
                  </h2>
                )}
              </div>

              <div
                className={cn("flex flex-col gap-6", contentIntroClassName)}
                herokit-id="11631ed0-aafd-4db2-96d4-d98952bab428"
              >
                {intro &&
                  (_htmlProps?.["taxSavingsProps.intro"] ? (
                    <SafeHtml
                      content={intro}
                      tag="p"
                      className={cn(
                        "text-sm leading-relaxed font-normal text-[#515A5F]",
                        introClassName
                      )}
                      herokit-id="66ab070c-a193-4064-9c05-feeea48f4258"
                    />
                  ) : (
                    <p
                      className={cn(
                        "text-sm leading-relaxed font-normal text-[#515A5F]",
                        introClassName
                      )}
                      herokit-id="66ab070c-a193-4064-9c05-feeea48f4258"
                    >
                      {renderHighlightedText(intro, highlight)}
                    </p>
                  ))}
                {secondIntro &&
                  (_htmlProps?.["taxSavingsProps.secondIntro"] ? (
                    <SafeHtml
                      content={secondIntro}
                      tag="p"
                      className="text-sm leading-relaxed font-normal whitespace-normal text-[#515A5F] xl:whitespace-pre-line"
                      herokit-id="02995e54-5fcc-4a87-99ca-37b975462082"
                    />
                  ) : (
                    <p
                      className="text-sm leading-relaxed font-normal whitespace-normal text-[#515A5F] xl:whitespace-pre-line"
                      herokit-id="02995e54-5fcc-4a87-99ca-37b975462082"
                    >
                      {renderHighlightedText(secondIntro, highlight)}
                    </p>
                  ))}

                {hasBenefits && (
                  <ul
                    className={cn(
                      "ml-6 flex list-outside flex-col gap-6 text-sm",
                      benefitIcon && "ml-0 list-none pl-0",
                      listClassName
                    )}
                  >
                    {benefits.map((item, index) => (
                      <li
                        key={`${item.content}-${index}`}
                        className={cn(
                          "flex flex-col gap-2",
                          benefitsItemClassName
                        )}
                        herokit-id="5d9bf7dd-83af-4caf-bf36-db837bfba801"
                      >
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            benefitIcon?.position === "right" &&
                              "justify-between"
                          )}
                          herokit-id="bcc295c2-a408-4b8e-9f81-5367437908a1"
                        >
                          {benefitIcon && benefitIcon.position !== "right" && (
                            <Image
                              src={benefitIcon.src}
                              alt={benefitIcon.alt || ""}
                              width={benefitIcon.width || 16}
                              height={benefitIcon.height || 16}
                              className={cn(
                                "flex-shrink-0",
                                benefitIcon.className
                              )}
                              loading="lazy"
                            />
                          )}
                          <span
                            className="flex-1 text-sm font-medium text-[#273238]"
                            herokit-id="f7616730-1791-4475-8de0-bb5a2da346c5"
                          >
                            {renderTaxSavingsEmphasizedText(
                              item.content,
                              item.emphasis
                            )}
                          </span>

                          {benefitIcon && benefitIcon.position === "right" && (
                            <Image
                              src={benefitIcon.src}
                              alt={benefitIcon.alt || ""}
                              width={benefitIcon.width || 16}
                              height={benefitIcon.height || 16}
                              className={cn(
                                "flex-shrink-0",
                                benefitIcon.className
                              )}
                              loading="lazy"
                            />
                          )}
                        </div>
                        {item.description && (
                          <p
                            className={cn(
                              "justify-start self-stretch pl-6 text-sm leading-6 font-normal text-gray-600",
                              benefitsItemDescriptionClassName
                            )}
                            herokit-id="d4913288-babf-4e18-b699-5006c82fd479"
                          >
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {conclusion && (
                  <p
                    className={cn(
                      "text-sm leading-relaxed font-normal text-[#273238]",
                      conclusionClassName
                    )}
                    herokit-id="5e693c8a-4811-4dfe-a7cb-9b5d7a5ed338"
                  >
                    {conclusion}
                  </p>
                )}
              </div>
            </div>

            {allCTAs.length > 0 && (
              <div
                className={cn(
                  "flex justify-between max-[425px]:flex-col max-[425px]:gap-4 md:gap-6",
                  ctaContainerClassName
                )}
                herokit-id="b6ce1282-5b28-4b80-9503-e93ec5ae6bce"
              >
                {allCTAs.map((ctaItem, index) => {
                  const iconName: LucideIconName | null =
                    (ctaItem?.icon as LucideIconName | undefined) ??
                    ctaIconName ??
                    null;
                  return (
                    <Button
                      key={index}
                      asChild
                      variant={ctaItem.variant || "default"}
                      className={cn(
                        "inline-flex items-center justify-between gap-2 rounded-[8px] px-6 py-6 text-sm font-semibold",
                        "gap-6",
                        "max-[425px]:w-full",
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
                        herokit-id="206886cf-a515-4f2d-927f-a524c13c39f3"
                      >
                        {ctaItem.label}
                        {iconName && (
                          <DynamicIcon
                            name={iconName}
                            className={cn("h-3 w-3", ctaIconClassName)}
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

          {media?.src && (
            <div
              className={cn(
                "relative flex w-full justify-center",
                mediaClassName
              )}
              herokit-id="e531a6fd-323e-4a54-bb0b-70d6ad3a0c79"
            >
              <Image
                src={media.src}
                alt={media.alt || ""}
                width={media.width || 548}
                height={media.height || 612}
                className={cn(
                  "h-auto w-full max-w-full shrink-0",
                  media.className
                )}
                loading="lazy"
              />
              {media.overlayImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={media.overlayImage.src}
                    alt={media.overlayImage.alt || ""}
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
          )}
        </div>
      </div>
    </section>
  );
};

const LegalStepsVariant: React.FC<LegalStepsVariantComponentProps> = ({
  taxSavingsProps,
  backgroundColor = "bg-white",
  className = "",
}) => {
  if (!taxSavingsProps) return null;

  const {
    sectionId,
    heading,
    headingClassName,
    title,
    intro,
    secondIntro,
    cta,
    ctas,
    ctaIconClassName,
    ctaIconName,
    ctaContainerClassName,
    media,
    mediaClassName,
    sectionContainerClassName,
    containerClassName,
    contentClassName,
    contentTitleClassName,
    contentIntroClassName,
    titleClassName,
    steps = [],
    problemCard,
  } = taxSavingsProps;

  const generatedHeadingId = React.useId();
  const sectionHeadingId = title
    ? sectionId
      ? `${sectionId}-heading`
      : generatedHeadingId
    : undefined;

  const CTAIconName =
    cta?.icon || ctaIconName ? cta?.icon || ctaIconName : undefined;
  const allCTAs = ctas || (cta ? [cta] : []);

  return (
    <section
      id={sectionId}
      aria-labelledby={sectionHeadingId}
      className={cn("py-16 md:py-24 lg:py-[120px]", backgroundColor, className)}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
            sectionContainerClassName
          )}
        >
          {/* Image with overlay problem card */}
          {media?.src && (
            <div className="relative overflow-hidden rounded-3xl bg-slate-950">
              <Image
                src={media.src}
                alt={media.alt || ""}
                width={media.width || 640}
                height={media.height || 760}
                className={cn("h-full w-full object-cover", media.className)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/95" />

              {problemCard && (
                <div className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-10">
                  <div className="pointer-events-auto rounded-3xl bg-white/5 px-8 py-10 text-center text-white shadow-[0_40px_80px_rgba(15,23,42,0.8)] backdrop-blur-sm">
                    {problemCard.eyebrow && (
                      <p className="text-[11px] font-medium tracking-[0.24em] text-[#ff985c] uppercase">
                        {problemCard.eyebrow}
                      </p>
                    )}
                    <h3 className="mt-4 text-[24px] leading-[30px] font-semibold md:text-[28px] md:leading-[34px]">
                      {problemCard.title}
                    </h3>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#ff985c]" />
                    {problemCard.subtitle && (
                      <p className="mt-4 text-base leading-[22px] text-slate-200">
                        {problemCard.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Text + steps column */}
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            <div className={cn("space-y-4", contentTitleClassName)}>
              {heading && (
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-black"></div>
                  <span
                    className={cn(
                      "text-primary text-xs font-bold tracking-wider uppercase",
                      headingClassName
                    )}
                  >
                    {heading}
                  </span>
                </div>
              )}
              {title && (
                <h2
                  id={sectionHeadingId}
                  className={cn(
                    "text-[28px] leading-[36px] font-semibold text-[#0F172A] md:text-[32px] md:leading-[40px]",
                    titleClassName
                  )}
                >
                  {title}
                </h2>
              )}
            </div>

            <div className={cn("space-y-4", contentIntroClassName)}>
              {intro && (
                <p className="text-[15px] leading-[26px] text-[#4B5563]">
                  {intro}
                </p>
              )}
              {secondIntro && (
                <p className="text-[15px] leading-[26px] text-[#4B5563]">
                  {secondIntro}
                </p>
              )}
            </div>

            {steps.length > 0 && (
              <div className={cn("space-y-3")}>
                {steps.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border border-slate-100 bg-[#F5F7FB] px-4 py-4 md:px-6 md:py-5"
                    )}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] bg-white text-sm font-semibold text-[#0F172A]">
                      {step.icon ? (
                        <DynamicIcon
                          name={step.icon}
                          className="h-4 w-4 text-[#0F172A]"
                        />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-[16px] font-semibold text-[#0F172A]">
                        {step.title}
                      </p>
                      {step.description && (
                        <p className="text-[13px] leading-[20px] text-[#6B7280]">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {allCTAs.length > 0 && (
              <div className={cn("pt-2", ctaContainerClassName)}>
                {allCTAs.map((ctaItem, index) => {
                  const iconName: LucideIconName | null =
                    (ctaItem?.icon as LucideIconName | undefined) ??
                    ctaIconName ??
                    null;
                  return (
                    <Button
                      key={index}
                      asChild
                      variant={ctaItem.variant || "default"}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-[10px] bg-slate-900 px-6 py-5 text-sm font-semibold text-white hover:bg-slate-900/90",
                        ctaItem.className
                      )}
                    >
                      <Link
                        href={ctaItem.href}
                        target={ctaItem.external ? "_blank" : undefined}
                        rel={
                          ctaItem.external ? "noopener noreferrer" : undefined
                        }
                      >
                        {ctaItem.label}
                        {iconName && (
                          <DynamicIcon
                            name={iconName}
                            className={cn("h-3 w-3", ctaIconClassName)}
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
      </div>
    </section>
  );
};

export const TextImageSection = (
  props: TextImageSectionComponentProps
): React.ReactElement => {
  if (isTaxSavingsVariant(props)) {
    const { taxSavingsProps, backgroundColor, className, _htmlProps } = props;

    if (props.variant === "legalSteps") {
      return (
        <LegalStepsVariant
          taxSavingsProps={taxSavingsProps}
          backgroundColor={backgroundColor}
          className={className}
        />
      );
    }

    return (
      <TaxSavingsVariant
        taxSavingsProps={taxSavingsProps}
        _htmlProps={_htmlProps}
        backgroundColor={backgroundColor}
        className={className}
      />
    );
  }

  return <DefaultVariant {...(props as TextImageSectionDefaultVariantProps)} />;
};

export default TextImageSection;
