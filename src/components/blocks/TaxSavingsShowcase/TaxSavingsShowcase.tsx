import React from "react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface PropertyDetail {
  label: string;
  value: string;
}

export interface PropertyFeatureIcon {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  position?: "left" | "right";
  className?: string;
}

export interface PropertyFeature {
  text: string;
}

export interface PropertyStat {
  label: string;
  value: string;
}

export interface PropertyCard {
  image: string;
  propertyType?: string;
  width?: number;
  height?: number;
  buildingValue: string;
  buildingValueLabel: string;
  taxSavings: string;
  taxSavingsLabel: string;
  remainingUsefulLife: string;
  remainingUsefulLifeLabel: string;
  features: PropertyFeature[];
  stats: PropertyStat[];
  imageOverlay?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export interface TextImageSectionCta {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  icon?: LucideIconName;
}

export interface TaxSavingsVariantCta extends TextImageSectionCta {}

export interface TaxSavingsShowcaseProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: TaxSavingsVariantCta;
  ctaIconName?: LucideIconName;
  ctaIconClassName?: string;
  ctaPosition?: "default" | "between-properties";
  properties?: PropertyCard[];
  benefitIcon?: PropertyFeatureIcon;
  propertyImageClassName?: string;
  sectionId?: string;
  variant?: "default" | "secondary";
  className?: string;
  containerClassName?: string;
}

const TaxSavingsShowcase = ({
  eyebrow,
  title,
  description,
  cta,
  ctaIconName,
  ctaIconClassName,
  ctaPosition = "default",
  properties,
  benefitIcon,
  propertyImageClassName,
  sectionId = "tax-savings-showcase",
  variant = "default",
  className,
  containerClassName,
}: TaxSavingsShowcaseProps) => {
  const CTAIconName =
    cta?.icon || ctaIconName ? cta?.icon || ctaIconName : undefined;

  // Render property details section
  const renderPropertyDetails = (property: PropertyCard) => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span
          className="flex-1 text-sm leading-[180%] tracking-[-0.1px] text-[#515A5F]"
          herokit-id="f3be4df1-6805-4841-8e38-94442ca8baad"
        >
          {property.buildingValueLabel}
        </span>
        <span
          className="flex-1 text-sm leading-[88%] font-semibold tracking-[-0.1px] text-[#273238]"
          herokit-id="771d772c-271c-4cba-aa99-cfba27ff7f53"
        >
          {property.buildingValue}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span
          className="flex-1 text-sm leading-[180%] tracking-[-0.1px] text-[#515A5F]"
          herokit-id="1ee3a5e5-07c3-488c-9523-e9a4d1b003bc"
        >
          {property.taxSavingsLabel}
        </span>
        <span
          className="flex-1 text-sm leading-[88%] font-semibold tracking-[-0.1px] text-[#273238]"
          herokit-id="eb3f61e5-6ef4-426b-9d59-104fe795b0e1"
        >
          {property.taxSavings}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span
          className="flex-1 text-sm leading-[180%] tracking-[-0.1px] text-[#515A5F]"
          herokit-id="b10ad321-4d84-43df-9fb2-55db5009621a"
        >
          {property.remainingUsefulLifeLabel}
        </span>
        <span
          className="flex-1 text-sm leading-[88%] font-semibold tracking-[-0.1px] text-[#273238]"
          herokit-id="f647499d-683c-4ab1-b878-24b66bce196e"
        >
          {property.remainingUsefulLife}
        </span>
      </div>
    </div>
  );

  // Render property features
  const renderPropertyFeatures = (property: PropertyCard) => (
    <div
      className="flex flex-col gap-6"
      herokit-id="ab0a5077-5b2e-449f-a6fb-853e8fe51bc9"
    >
      {property.features.map((feature, featureIndex) => (
        <div
          key={featureIndex}
          className={cn(
            "flex items-center gap-2",
            benefitIcon?.position === "right" && "justify-between"
          )}
          herokit-id="43ae0563-aef3-47d8-922b-cae35a2cabd7"
        >
          {benefitIcon && benefitIcon.position !== "right" && (
            <Image
              src={benefitIcon.src}
              alt={benefitIcon.alt || ""}
              width={benefitIcon.width || 16}
              height={benefitIcon.height || 16}
              className={cn("flex-shrink-0", benefitIcon.className)}
              loading="lazy"
            />
          )}
          <span
            className="flex-1 text-sm leading-[180%] tracking-[-0.1px] text-[#273238]"
            herokit-id="a48dcd43-582c-490b-b22f-a994f4183627"
          >
            {feature.text}
          </span>
          {benefitIcon && benefitIcon.position === "right" && (
            <Image
              src={benefitIcon.src}
              alt={benefitIcon.alt || ""}
              width={benefitIcon.width || 16}
              height={benefitIcon.height || 16}
              className={cn("flex-shrink-0", benefitIcon.className)}
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  );

  // Render property stats
  const renderPropertyStats = (property: PropertyCard) => (
    <div
      className="flex gap-6"
      herokit-id="ba7d15e6-5671-4b1a-8ea2-a079ffae491a"
    >
      {property.stats.map((stat, statIndex) => (
        <div key={statIndex} className="flex flex-col gap-4">
          <span
            className="text-sm leading-[180%] font-semibold tracking-[-0.1px] text-[#273238]"
            herokit-id="13953e46-1517-4c49-ad58-b3b2f24c6429"
          >
            {stat.label}
          </span>
          <span
            className="text-sm leading-[180%] tracking-[-0.1px] text-[#515A5F]"
            herokit-id="cc753369-bb20-48a7-8e51-5af5e46cfbc1"
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );

  // Render property image
  const renderPropertyImage = (property: PropertyCard) => (
    <div className="relative" herokit-id="5afb1cdf-6965-4832-a6c6-e232ad8f7dd6">
      <Image
        src={property.image}
        alt={property.propertyType || ""}
        width={property.width || 382}
        height={property.height || 424}
        className={cn("h-full w-full object-cover", propertyImageClassName)}
        loading="lazy"
      />
      {property.imageOverlay && (
        <div
          className={cn(
            "absolute top-4 left-4 flex items-center justify-center gap-2 rounded-[99px] border border-[rgba(39,50,56,0.20)] bg-white p-3",
            property.imageOverlay.href || property.imageOverlay.onClick
              ? "cursor-pointer hover:opacity-90"
              : ""
          )}
          onClick={property.imageOverlay.onClick}
          role={
            property.imageOverlay.href || property.imageOverlay.onClick
              ? "button"
              : undefined
          }
          tabIndex={
            property.imageOverlay.href || property.imageOverlay.onClick
              ? 0
              : undefined
          }
          herokit-id="14354976-f6bc-4bb9-a363-85b59ae05ae6"
        >
          {property.imageOverlay.href ? (
            <Link
              href={property.imageOverlay.href}
              className="text-sm leading-[180%] tracking-[-0.1px] text-[#273238]"
              herokit-id="49c40602-414b-472e-af1a-8d113af285d9"
            >
              {property.imageOverlay.text}
            </Link>
          ) : (
            <span
              className="text-sm leading-[180%] tracking-[-0.1px] text-[#273238]"
              herokit-id="4383224d-a1ab-4663-be37-70513228fa58"
            >
              {property.imageOverlay.text}
            </span>
          )}
        </div>
      )}
    </div>
  );

  // Render property card
  const renderPropertyCard = (property: PropertyCard, index: number) => (
    <div
      key={index}
      className="flex flex-col gap-8 md:flex-row"
      herokit-id="209fef59-5882-420a-bc54-f3e9294cf635"
    >
      {renderPropertyImage(property)}

      <div className="flex flex-1 flex-col justify-between gap-6 lg:py-6">
        <div
          className="flex h-full flex-col justify-between gap-6"
          herokit-id="d7c0e452-ff1d-4133-8185-d413c1f37bfa"
        >
          {renderPropertyDetails(property)}
          {renderPropertyFeatures(property)}
          {renderPropertyStats(property)}
        </div>
      </div>
    </div>
  );

  // Render properties list
  const renderProperties = () => {
    if (!properties || properties.length === 0) return null;

    return (
      <div
        className="flex flex-col gap-16 lg:gap-[72px]"
        herokit-id="4331a326-4cd2-446a-9468-c0dd30d64058"
      >
        {properties.map((property, index) => {
          const shouldInsertCTA =
            ctaPosition === "between-properties" &&
            cta &&
            index === 1 &&
            properties.length > 1;

          return (
            <React.Fragment
              key={index}
              herokit-id="afc544ac-5f6f-4b1d-843f-c02ba4e4f4b9"
            >
              {shouldInsertCTA && (
                <div
                  className="flex justify-start lg:justify-start"
                  herokit-id="e4b66a35-374e-429b-8d3e-7357f05d9ab9"
                >
                  {renderCTA()}
                </div>
              )}
              {renderPropertyCard(property, index)}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // Render CTA button
  const renderCTA = () => {
    if (!cta) return null;

    return (
      <Button
        asChild
        variant={cta.variant || "default"}
        className={cn(
          "flex h-12 items-center justify-center gap-6 rounded-[8px] px-[18px] py-2 text-sm font-semibold",
          "bg-[#243239] text-white hover:bg-[#243239]/90",
          cta.className
        )}
      >
        <Link
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          herokit-id="15d2c90f-5893-4e0b-997e-6bf613353333"
        >
          {cta.label}
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

  // Render content section
  const renderContent = () => (
    <div className="flex w-full flex-col gap-10 lg:flex-shrink-0 xl:w-[421px]">
      <div
        className="flex flex-col gap-6"
        herokit-id="9ffe2526-36be-4684-8bae-8d46fa01731e"
      >
        {eyebrow && (
          <p
            className="text-sm font-semibold tracking-tight text-[#515A5F] uppercase"
            herokit-id="78ddde04-e359-41db-8547-3b46a10a1a13"
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className="text-3xl leading-[144%] font-medium text-[#273238] sm:text-4xl lg:text-[32px]"
            herokit-id="ec4c1444-524e-49fe-8b72-e8200e391943"
          >
            {title}
          </h2>
        )}
      </div>

      <div
        className="flex flex-col gap-10"
        herokit-id="e85bf264-aac6-474d-b744-712926812d09"
      >
        {description && (
          <p
            className="text-base leading-[180%] tracking-[-0.1px] text-[#515A5F]"
            herokit-id="d44c1c67-e15a-4fca-a98e-582448ba0466"
          >
            {description}
          </p>
        )}

        {ctaPosition === "default" && renderCTA()}
      </div>
    </div>
  );

  return (
    <Section
      id={sectionId}
      variant={variant}
      className={cn("py-16 md:py-24 lg:py-28", className)}
    >
      <Container
        className={cn(
          "mx-auto flex w-full flex-col px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        <div
          className="flex flex-col gap-12 xl:flex-row"
          herokit-id="c2f1bc12-12b0-46d9-9c61-3ef5b5e3ec0f"
        >
          {renderContent()}

          <div
            className="flex-1"
            herokit-id="11958731-78b2-4331-8073-cbc2ae3bf1ac"
          >
            {renderProperties()}
          </div>
        </div>
      </Container>
    </Section>
  );
};

TaxSavingsShowcase.displayName = "TaxSavingsShowcase";

export default TaxSavingsShowcase;
