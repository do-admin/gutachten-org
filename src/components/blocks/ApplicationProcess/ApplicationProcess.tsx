import React from "react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X, Check, FileText, Calculator, AlertCircle } from "lucide-react";

// Step item configuration
export interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  className?: string;
}

// Comparison item configuration for comparison variant
export interface ComparisonItem {
  title: string;
  iconType: "x" | "check";
  iconImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  workflow: Array<{
    icon: "document" | "alert" | "calculator" | "check";
    iconImage?: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
    };
  }>;
  description: string;
  recommended?: boolean;
  customStyles?: {
    padding?: string;
    gap?: string;
    borderRadius?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderDashPattern?: string;
    boxShadow?: string;
  };
}

// Contact person configuration
export interface ContactPerson {
  name: string;
  email: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  };
  linkedinUrl?: string;
  linkedinImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  };
  joinUrl?: string;
  joinImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  };
}

// Base props for the ApplicationProcess component
export interface ApplicationProcessProps {
  // Content props
  eyebrow: string;
  title: string;
  steps: StepItem[];
  contactPerson?: ContactPerson;
  questionText?: string;

  // Section props
  sectionId?: string;
  variant?: "default" | "secondary" | "comparison" | "process-steps";

  // Comparison variant props
  comparisonItems?: ComparisonItem[];
  recommendedBadgeText?: string;

  // Process-steps variant props
  processSteps?: Array<{
    stepNumber: number;
    title: string;
    description: string;
    isActive?: boolean;
  }>;

  // Styling props
  backgroundColor?: string;

  // Custom styling
  className?: string;
  containerClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  timelineClassName?: string;
  stepsGridClassName?: string;
  stepCardClassName?: string;
  contactSectionClassName?: string;
  questionTextClassName?: string;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;
  enableHoverEffect?: boolean;
}

export const ApplicationProcess: React.FC<ApplicationProcessProps> = ({
  eyebrow,
  title,
  steps,
  contactPerson,
  questionText,
  sectionId = "application-process",
  variant = "default",
  backgroundColor = "bg-white",
  className,
  containerClassName,
  eyebrowClassName,
  titleClassName,
  timelineClassName,
  stepsGridClassName,
  stepCardClassName,
  contactSectionClassName,
  questionTextClassName,
  enableAnimation = true,
  animationDelay = 0.1,
  enableHoverEffect = true,
  comparisonItems,
  recommendedBadgeText,
  processSteps,
}) => {
  // Comparison variant rendering
  if (variant === "comparison" && comparisonItems) {
    const getWorkflowIcon = (iconType: string) => {
      switch (iconType) {
        case "document":
          return <FileText className="h-6 w-6" />;
        case "alert":
          return <AlertCircle className="h-6 w-6 text-red-500" />;
        case "calculator":
          return <Calculator className="h-6 w-6" />;
        case "check":
          return <Check className="h-6 w-6 text-green-500" />;
        default:
          return null;
      }
    };

    return (
      <Section
        id={sectionId}
        className={cn(
          backgroundColor,
          "relative overflow-hidden py-10 sm:py-12 lg:py-20",
          className
        )}
      >
        <Container
          className={cn("relative", containerClassName)}
          herokit-id="83452332-f62e-451d-a732-e97799257e25"
        >
          <div className="mb-6 flex flex-col items-center gap-3 md:mb-8 md:gap-4 xl:mb-11">
            {eyebrow && (
              <h2
                className={cn(
                  "text-center text-xl leading-tight font-semibold text-[#0F172A] sm:text-2xl md:text-3xl",
                  eyebrowClassName
                )}
              >
                {eyebrow}
              </h2>
            )}
            {title && (
              <p
                className={cn(
                  "max-w-3xl text-center text-sm leading-relaxed font-normal text-slate-600",
                  titleClassName
                )}
              >
                {title}
              </p>
            )}
          </div>

          {/* Recommended Badge */}
          {recommendedBadgeText && (
            <div className="mb-4 flex justify-center md:mb-5 lg:mr-[74px] lg:justify-end">
              <div
                className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white uppercase"
                style={{ backgroundColor: "#EA580C" }}
              >
                {recommendedBadgeText}
              </div>
            </div>
          )}

          {/* Comparison Boxes */}
          <div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
              {comparisonItems.map((item, index) => {
                const customStyles = item.customStyles || {};
                const isDashed = customStyles.borderStyle === "dashed";

                // Calculate border dash pattern if specified
                let borderDashArray = undefined;
                if (isDashed && customStyles.borderDashPattern) {
                  const [dash, gap] = customStyles.borderDashPattern
                    .split(", ")
                    .map(Number);
                  borderDashArray = `${dash}px ${gap}px`;
                }

                return (
                  <Card
                    key={index}
                    className={cn(
                      "relative w-full shadow-sm md:w-[488px]",
                      enableHoverEffect && "transition-all hover:shadow-md",
                      // Border styling
                      !isDashed &&
                        (item.recommended
                          ? "border-2 border-orange-500"
                          : "border border-gray-200"),
                      // Padding
                      customStyles.padding
                        ? ""
                        : item.recommended
                          ? "p-6 md:p-8"
                          : "p-6 md:p-8",
                      // Border radius
                      customStyles.borderRadius ? "" : "rounded-xl"
                      // Background color - use inline for custom colors/opacity
                    )}
                    style={{
                      ...(customStyles.padding && {
                        padding: customStyles.padding,
                      }),
                      ...(customStyles.borderRadius && {
                        borderRadius: customStyles.borderRadius,
                      }),
                      backgroundColor:
                        customStyles.backgroundColor ||
                        (item.recommended
                          ? "white"
                          : "rgba(248, 250, 252, 0.5)"),
                      borderColor:
                        customStyles.borderColor ||
                        (item.recommended ? "#F97316" : "#E2E8F0"),
                      borderStyle:
                        customStyles.borderStyle ||
                        (item.recommended ? "solid" : "dashed"),
                      borderWidth:
                        customStyles.borderWidth ||
                        (item.recommended ? "2px" : "1px"),
                      boxShadow: customStyles.boxShadow || undefined,
                      ...(borderDashArray && {
                        borderStyle: "dashed",
                        borderDasharray: borderDashArray,
                      }),
                    }}
                  >
                    <CardContent
                      className={cn(
                        "flex flex-col p-0",
                        customStyles.gap ? "" : "gap-6"
                      )}
                      style={{
                        ...(customStyles.gap && {
                          gap: customStyles.gap,
                        }),
                      }}
                    >
                      {/* Title with Icon */}
                      <div className="flex items-center gap-3">
                        {item.iconImage ? (
                          <Image
                            src={item.iconImage.src}
                            alt={item.iconImage.alt || item.title}
                            width={item.iconImage.width || 24}
                            height={item.iconImage.height || 24}
                            className="h-6 w-6"
                          />
                        ) : item.iconType === "x" ? (
                          <X className="h-6 w-6 text-red-500" />
                        ) : (
                          <Check className="h-6 w-6 text-orange-500" />
                        )}
                        <h3 className="text-base font-semibold text-[#334155] md:text-lg">
                          {item.title}
                        </h3>
                      </div>

                      {/* Workflow */}
                      <div className="flex items-center gap-4">
                        {item.workflow.map((step, stepIndex) => {
                          const isAlert = step.icon === "alert";
                          const isDocument = step.icon === "document";
                          const isCalculator = step.icon === "calculator";
                          const isCheck = step.icon === "check";
                          const isRecommended = item.recommended;

                          // Build className for icon container
                          let iconContainerClassName = "";
                          if (isAlert) {
                            iconContainerClassName = cn(
                              "flex h-10 w-10 items-center justify-center rounded-[4px]! border bg-[#FEF2F2] p-[7px]",
                              "border-[#FECACA]"
                            );
                          } else if (isDocument && isRecommended) {
                            iconContainerClassName = cn(
                              "flex h-10 w-10 items-center justify-center rounded-[4px]! border bg-white p-[9px]",
                              "border-[#FED7AA]"
                            );
                          } else if (isCheck && isRecommended) {
                            iconContainerClassName = cn(
                              "flex h-10 w-10 items-center justify-center rounded-[4px]! bg-[#0F172A] p-[9px]"
                            );
                          } else {
                            iconContainerClassName = cn(
                              "flex h-10 w-10 items-center justify-center rounded-[4px]! border bg-white p-[9px]",
                              "border-[#E2E8F0]"
                            );
                          }

                          return (
                            <React.Fragment key={stepIndex}>
                              <div className={iconContainerClassName}>
                                {step.iconImage ? (
                                  <Image
                                    src={step.iconImage.src}
                                    alt={step.iconImage.alt || step.icon}
                                    width={step.iconImage.width || 20}
                                    height={step.iconImage.height || 20}
                                    className="h-5 w-5"
                                    style={{
                                      filter:
                                        isDocument && isRecommended
                                          ? "none"
                                          : isCheck && isRecommended
                                            ? "brightness(0) invert(1)"
                                            : "none",
                                    }}
                                  />
                                ) : (
                                  getWorkflowIcon(step.icon)
                                )}
                              </div>
                              {/* Horizontal divider between steps */}
                              {stepIndex < item.workflow.length - 1 && (
                                <div
                                  className={cn(
                                    isRecommended
                                      ? "h-0.5 w-24 bg-[#F97316]"
                                      : "h-px w-8 bg-[#CBD5E1]"
                                  )}
                                />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed font-normal text-slate-600">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Process-steps variant rendering
  if (variant === "process-steps" && processSteps) {
    return (
      <Section
        id={sectionId}
        className={cn(
          backgroundColor,
          "relative overflow-hidden py-10 sm:py-12 lg:py-20",
          className
        )}
      >
        <Container
          className={cn("relative", containerClassName)}
          herokit-id="83452332-f62e-451d-a732-e97799257e25"
        >
          {/* Header */}
          <div className="mb-6 flex flex-col items-start gap-2 sm:mb-8 md:mb-16 md:gap-3">
            {eyebrow && (
              <h2
                className={cn(
                  "text-lg leading-tight font-semibold text-[#0F172A] sm:text-xl md:text-3xl",
                  eyebrowClassName
                )}
              >
                {eyebrow}
              </h2>
            )}
            {title && (
              <p
                className={cn(
                  "text-sm leading-relaxed font-normal text-slate-600",
                  titleClassName
                )}
              >
                {title}
              </p>
            )}
          </div>

          {/* Process Steps */}
          <div className="relative w-full">
            {/* Steps Grid - 3 columns on desktop, stacked on mobile */}
            <div className="relative grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-3 md:gap-6 lg:gap-8">
              {processSteps.map((step, index) => {
                const isActive =
                  step.isActive !== undefined ? step.isActive : index === 1; // Step 2 is active by default
                const isFirst = index === 0;
                const isSecond = index === 1;

                return (
                  <div
                    key={index}
                    className="relative flex w-full flex-col items-center md:items-start"
                  >
                    {/* Horizontal Line - For Step 1 and Step 2, same width as container, desktop only */}
                    {(isFirst || isSecond) && (
                      <div className="absolute top-5 left-0 hidden h-px w-full bg-gray-300 md:block" />
                    )}

                    {/* Step Number Indicator */}
                    <div
                      className={cn(
                        "relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold sm:mb-5 sm:text-base md:mb-6",
                        isActive
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-gray-300 bg-white text-gray-700"
                      )}
                    >
                      {step.stepNumber}
                    </div>

                    {/* Step Content - Left aligned */}
                    <div className="flex w-full flex-col gap-1.5 text-left">
                      <h3 className="text-base leading-tight font-semibold text-[#0F172A] sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed font-normal text-slate-600 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      id={sectionId}
      variant={
        variant !== "comparison" && variant !== "process-steps"
          ? variant
          : "default"
      }
      className={cn(
        backgroundColor,
        "relative overflow-hidden py-10 sm:py-12 lg:py-20",
        className
      )}
    >
      <Container
        className={cn("relative", containerClassName)}
        herokit-id="83452332-f62e-451d-a732-e97799257e25"
      >
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:mb-7 sm:gap-6">
          <p
            className={cn(
              "text-xs font-semibold text-[#E45600] uppercase sm:text-sm",
              eyebrowClassName
            )}
            herokit-id="5098defc-393e-4198-bb1a-3ed103bce6ca"
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "text-center text-xl font-semibold text-[#243239] sm:text-2xl lg:text-[32px]",
              titleClassName
            )}
            herokit-id="e9e88d3a-f92f-4e7e-8068-ceab10922956"
          >
            {title}
          </h2>
        </div>

        {/* Steps Grid with Timeline - 3 columns on desktop, then 2 columns for last 2 items */}
        <div
          className="mb-0 md:mb-0"
          herokit-id="44c56ef1-4c85-4284-87a8-6a8ae8a4b8eb"
        >
          {/* First 3 cards with timeline above */}
          <div className="mb-8 md:mb-8">
            {/* Timeline for first 3 steps - Desktop only */}
            <div
              className={cn(
                "mb-8 hidden lg:grid lg:grid-cols-3 lg:gap-6",
                timelineClassName
              )}
              herokit-id="2632d82a-dd84-401a-991b-8c6084597588"
            >
              {steps.slice(0, 3).map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center"
                  herokit-id="b700e7a5-9594-4ca0-9818-8920012448a6"
                >
                  {/* Step circle */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-sm font-medium text-[#1a1a1a]"
                    herokit-id="e6b457e8-7b3d-457d-9bde-52a7a45b4b5b"
                  >
                    {step.step}
                  </div>
                  {/* Connecting line to next step */}
                  {index < 2 && (
                    <div
                      className="absolute top-1/2 left-1/2 h-px w-full -translate-y-1/2 bg-[#D1D5DB]"
                      style={{ marginLeft: "20px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* First 3 cards - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
            <div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
              herokit-id="2f8d08a8-bd28-4493-854d-d22b3125a0ea"
            >
              {steps.slice(0, 3).map((step, index) => (
                <Card
                  key={index}
                  className={cn(
                    "rounded-[13px] border border-[#E5E7EB] bg-white p-0 shadow-sm",
                    stepCardClassName,
                    step.className,
                    enableAnimation ? "animate-fade-in" : "",
                    enableHoverEffect ? "transition-all hover:shadow-md" : ""
                  )}
                  style={
                    enableAnimation
                      ? { animationDelay: `${index * animationDelay}s` }
                      : undefined
                  }
                >
                  <CardContent className="p-5 sm:p-6 lg:p-6">
                    {/* Step number for mobile and tablet */}
                    <div
                      className="mb-4 flex items-center gap-3 lg:hidden"
                      herokit-id="af1b7ba6-fefc-4d16-8ec0-7d453694a122"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-sm font-medium text-[#1a1a1a] sm:h-10 sm:w-10"
                        herokit-id="b6881153-8a09-4b24-805f-b3fb86535cd2"
                      >
                        {step.step}
                      </div>
                    </div>

                    <div className="mb-3 flex min-h-14 items-center gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className="shrink-0">
                        <Image
                          src={step.icon.src}
                          alt={step.icon.alt}
                          loading="lazy"
                          width={step.icon.width || 48}
                          height={step.icon.height || 48}
                          className="h-10 w-10 object-contain sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className="text-base font-semibold text-[#1a1a1a] sm:text-lg lg:text-lg"
                        herokit-id="bfd4e608-f799-4713-9cf9-659a70ef4aae"
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed text-[#4B5563] md:text-base"
                      herokit-id="3c12a40f-5122-4660-a6f0-31837669e892"
                    >
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Last 2 cards with timeline above - left aligned */}
          {steps.length > 3 && (
            <div>
              {/* Timeline for last 2 steps - Desktop only */}
              <div
                className={cn(
                  "mb-8 hidden lg:grid lg:grid-cols-3 lg:gap-6",
                  timelineClassName
                )}
                herokit-id="e02f75d0-ae68-41cd-bfd2-5224c944c7a6"
              >
                {steps.slice(3).map((step, index) => (
                  <div
                    key={index + 3}
                    className="relative flex items-center justify-center"
                    herokit-id="1a185dcc-3346-4515-bba8-ac58f7b05c57"
                  >
                    {/* Step circle */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-sm font-medium text-[#1a1a1a]"
                      herokit-id="3ab7ad45-0d7f-49ae-8333-1896ceed884d"
                    >
                      {step.step}
                    </div>
                    {/* Connecting line to next step */}
                    {index < steps.slice(3).length - 1 && (
                      <div
                        className="absolute top-1/2 left-1/2 h-px w-full -translate-y-1/2 bg-[#D1D5DB]"
                        style={{ marginLeft: "20px" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Last 2 cards - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns (left aligned) */}
              <div
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                herokit-id="08e208ed-801b-4777-af44-bc2866f2152a"
              >
                {steps.slice(3).map((step, index) => (
                  <Card
                    key={index + 3}
                    className={cn(
                      "rounded-[13px] border border-[#E5E7EB] bg-white p-0 shadow-sm",
                      stepCardClassName,
                      step.className,
                      enableAnimation ? "animate-fade-in" : "",
                      enableHoverEffect ? "transition-all hover:shadow-md" : ""
                    )}
                    style={
                      enableAnimation
                        ? { animationDelay: `${(index + 3) * animationDelay}s` }
                        : undefined
                    }
                  >
                    <CardContent className="p-5 sm:p-6 lg:p-6">
                      {/* Step number for mobile and tablet */}
                      <div
                        className="mb-4 flex items-center gap-3 lg:hidden"
                        herokit-id="7d77f5b5-c787-42bc-90d6-e204d2983be9"
                      >
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-sm font-medium text-[#1a1a1a] sm:h-10 sm:w-10"
                          herokit-id="247eb5a6-f336-4653-9623-650adc663f0b"
                        >
                          {step.step}
                        </div>
                      </div>

                      <div className="mb-3 flex min-h-14 items-center gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="shrink-0">
                          <Image
                            src={step.icon.src}
                            alt={step.icon.alt}
                            loading="lazy"
                            width={step.icon.width || 48}
                            height={step.icon.height || 48}
                            className="h-10 w-10 object-contain sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                          />
                        </div>

                        {/* Title */}
                        <h3
                          className="text-base font-semibold text-[#1a1a1a] sm:text-lg lg:text-lg"
                          herokit-id="6abb9bff-9f12-4c2b-8e7d-fd272f95ac36"
                        >
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed text-[#4B5563] sm:text-sm"
                        herokit-id="84fb1551-d3ca-45e5-9e86-c54ae46cb9de"
                      >
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Person Section */}
        {contactPerson && (
          <div className="relative mx-auto -mt-8 sm:-mt-10 lg:-mt-44">
            <div className="relative">
              {/* Contact Box with overlapping image on desktop */}
              <div className="relative">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
                  {/* Contact Info - Left Side - White box */}
                  <div
                    className={cn(
                      "relative z-20 flex flex-col justify-center lg:z-20",
                      contactSectionClassName
                    )}
                    herokit-id="134827c7-8ca6-4627-988a-4ccc625c9217"
                  >
                    {/* Question Text */}
                    {questionText && (
                      <div className="relative z-20 mb-6 sm:mb-8">
                        <p
                          className={cn(
                            "text-justify text-base leading-relaxed font-normal text-[#4F5A60]",
                            questionTextClassName
                          )}
                          herokit-id="ae195131-9f6f-4b33-a12a-880656e8d75c"
                        >
                          {questionText}
                        </p>
                      </div>
                    )}

                    <h3
                      className="mb-2 text-xl font-semibold text-[#243239] sm:text-2xl lg:text-[32px]"
                      herokit-id="1e8cd6f4-9c46-4ced-82f2-c991f98cdde1"
                    >
                      {contactPerson.name}
                    </h3>
                    <p
                      className="mb-6 text-sm text-[#1a1a1a]"
                      herokit-id="81454283-46e6-476b-8b7c-8b51c916acda"
                    >
                      Mail:{" "}
                      <a
                        href={`mailto:${contactPerson.email}`}
                        className="text-[#1a1a1a] hover:underline"
                        herokit-id="28e64f82-2b4c-4318-b006-143e4f4f33be"
                      >
                        {contactPerson.email}
                      </a>
                    </p>

                    {/* Social Links */}
                    {(contactPerson.linkedinUrl || contactPerson.joinUrl) && (
                      <div
                        className="flex items-center gap-4"
                        herokit-id="f7487026-9f3b-45d2-a9a4-338bd8fd312d"
                      >
                        {contactPerson.linkedinUrl &&
                          contactPerson.linkedinImage && (
                            <a
                              href={contactPerson.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block transition-opacity hover:opacity-80"
                            >
                              <Image
                                src={contactPerson.linkedinImage.src}
                                alt={contactPerson.linkedinImage.alt}
                                loading="lazy"
                                width={contactPerson.linkedinImage.width || 200}
                                height={
                                  contactPerson.linkedinImage.height || 200
                                }
                                className={
                                  contactPerson.linkedinImage.className ||
                                  "h-auto w-auto max-w-none"
                                }
                              />
                            </a>
                          )}
                        {contactPerson.joinUrl && contactPerson.joinImage && (
                          <a
                            href={contactPerson.joinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-opacity hover:opacity-80"
                          >
                            <Image
                              src={contactPerson.joinImage.src}
                              alt={contactPerson.joinImage.alt}
                              loading="lazy"
                              width={contactPerson.joinImage.width || 200}
                              height={contactPerson.joinImage.height || 200}
                              className={
                                contactPerson.joinImage.className ||
                                "h-auto w-auto max-w-none"
                              }
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Person Image - Right Side - Stacked on mobile/tablet, overlapping on desktop */}
                  <div className="relative z-0 flex items-end justify-end lg:-ml-2">
                    <div className="relative h-[400px] w-full md:h-[600px]">
                      <Image
                        src={contactPerson.image.src}
                        alt={contactPerson.image.alt}
                        loading="lazy"
                        width={contactPerson.image.width || 700}
                        height={contactPerson.image.height || 700}
                        className={cn(
                          "h-[400px] w-full object-contain md:h-[600px]",
                          contactPerson.image.className
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default ApplicationProcess;
