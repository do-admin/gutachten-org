import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DynamicIcon, type LucideIconName } from "@/lib/icon-utils";

export interface PricingSectionProps {
  sectionId?: string;
  title?: string;
  titleClassName?: string;
  cta?: {
    label: string;
    href: string;
    icon?: LucideIconName;
    external?: boolean;
  };
  ctaIconClassName?: string;
  fairPricesBox?: {
    iconImage?: string;
    iconImageAlt?: string;
    title: string;
    description: string;
    priceGross: string;
    priceNet: string;
  };
  inspectionBox?: {
    title: string;
    description: string;
  };
  priceListBox?: {
    title: string;
    description: string;
    priceListLink: string;
    priceListLinkText: string;
  };
  backgroundClassName?: string;
  containerClassName?: string;
  headerClassName?: string;
  className?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  sectionId = "pricing-section",
  title,
  titleClassName,
  cta,
  ctaIconClassName = "text-[#FF985C]",
  fairPricesBox,
  inspectionBox,
  priceListBox,
  backgroundClassName = "bg-[rgba(143,181,170,0.1)]",
  containerClassName,
  headerClassName,
  className,
}) => {
  const CTAIconName: LucideIconName | null =
    (cta?.icon as LucideIconName | undefined) ?? "ArrowUpRight";

  return (
    <Section
      id={sectionId}
      className={cn("py-[60px] lg:py-[120px]", backgroundClassName, className)}
    >
      <Container
        className={cn("mx-auto max-w-6xl", containerClassName)}
        herokit-id="pricing-section-container"
      >
        {/* Header with title and CTA */}
        <div
          className={cn(
            "mb-8 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-center",
            headerClassName
          )}
          herokit-id="pricing-section-header"
        >
          <h2
            className={cn(
              "text-base leading-tight font-semibold text-[#243239] md:text-2xl xl:text-[32px]",
              titleClassName
            )}
            herokit-id="pricing-section-title"
          >
            {title}
          </h2>
          {cta && (
            <Button
              asChild
              variant="default"
              className={cn(
                "inline-flex items-center gap-2 rounded-[8px] bg-[#273238] px-6 py-6 text-sm! font-semibold text-white hover:bg-[#273238]/90"
              )}
            >
              <Link
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                herokit-id="pricing-section-cta"
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

        {/* Two-column layout */}
        <div
          className="grid gap-4 md:grid-cols-2"
          herokit-id="pricing-section-grid"
        >
          {fairPricesBox && (
            <Card
              className="flex flex-col gap-10 rounded-[8px] border border-[#273238]/20 bg-transparent p-6 shadow-sm"
              herokit-id="pricing-section-fair-prices-card"
            >
              <CardContent className="flex flex-col gap-10 p-0">
                {fairPricesBox.iconImage && (
                  <div
                    className="flex items-start justify-start"
                    herokit-id="pricing-section-fair-prices-icon"
                  >
                    <Image
                      src={fairPricesBox.iconImage}
                      alt={fairPricesBox.iconImageAlt || "Faire Preise"}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-6">
                  <h3
                    className="text-xl leading-tight font-normal text-[#243239]"
                    herokit-id="pricing-section-fair-prices-title"
                  >
                    {fairPricesBox.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed font-normal text-[#4F5A60]"
                    herokit-id="pricing-section-fair-prices-description"
                  >
                    {fairPricesBox.description}
                  </p>
                </div>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-row justify-between md:grid md:grid-cols-2">
                    <span
                      className="text-[28px] leading-tight font-semibold text-[#FF914C]"
                      herokit-id="pricing-section-fair-prices-gross"
                    >
                      {fairPricesBox.priceGross}
                    </span>
                    <span className="text-[28px] leading-tight font-normal text-[#FF914C]">
                      brutto
                    </span>
                  </div>
                  <div className="flex flex-row justify-between md:grid md:grid-cols-2">
                    <span
                      className="text-[28px] leading-tight font-semibold text-[#4F5A60]"
                      herokit-id="pricing-section-fair-prices-net"
                    >
                      {fairPricesBox.priceNet}
                    </span>
                    <span className="text-[28px] leading-tight font-normal text-[#4F5A60]">
                      netto
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Right column - Two stacked boxes */}
          <div
            className="flex h-full flex-col gap-4"
            herokit-id="pricing-section-right-column"
          >
            {inspectionBox && (
              <Card
                className="flex h-full flex-col gap-10 rounded-[8px] border border-[#273238]/20 bg-transparent p-6 shadow-sm md:h-1/2"
                herokit-id="pricing-section-inspection-card"
              >
                <CardContent className="flex h-full flex-col justify-between p-0">
                  <div className="flex h-full flex-col justify-between gap-10 md:gap-0">
                    <h3
                      className="text-xl leading-tight font-normal text-[#243239]"
                      herokit-id="pricing-section-inspection-title"
                    >
                      {inspectionBox.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed font-normal text-[#4F5A60]"
                      herokit-id="pricing-section-inspection-description"
                    >
                      {inspectionBox.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {priceListBox && (
              <Card
                className="flex h-full flex-col gap-10 rounded-[8px] border border-[#273238]/20 bg-transparent p-6 shadow-sm md:h-1/2"
                herokit-id="pricing-section-price-list-card"
              >
                <CardContent className="flex h-full flex-col justify-between p-0">
                  <div className="flex h-full flex-col justify-between gap-10 md:gap-0">
                    <h3
                      className="text-xl leading-tight font-normal text-[#243239]"
                      herokit-id="pricing-section-price-list-title"
                    >
                      {priceListBox.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed font-normal text-[#4F5A60]"
                      herokit-id="pricing-section-price-list-description"
                    >
                      {priceListBox.description}{" "}
                      <Link
                        href={priceListBox.priceListLink}
                        className="font-bold text-[#4F5A60] underline transition-colors"
                        herokit-id="pricing-section-price-list-link"
                      >
                        {priceListBox.priceListLinkText}
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default PricingSection;
