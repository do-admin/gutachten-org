// Import types from actual components - this is the source of truth
import React from "react";
import type { TextImageBlockProps } from "@/components/blocks/TextImageSection/TextImageSection";
import type { HeroProps } from "@/components/blocks/HeroSection/Hero";
import { StepsBlockProps } from "@/components/blocks/Steps/Steps";
import type { HeaderProps } from "@/components/blocks/Header/Header";
import type { StructuredDataProps } from "@/components/StructuredData";
import type { CtaProps } from "@/components/blocks/Cta/Cta";
import type { FaqProps } from "@/components/blocks/FAQ/FAQ";
import type {
  FooterProps,
  LinkItem,
  FooterSection,
} from "@/components/blocks/Footer/Footer";
import type { AboutProps } from "@/components/blocks/About/About";
import type { FinalCTAProps } from "@/components/blocks/FinalCTA/FinalCTA";
import type { USPsProps } from "@/components/blocks/USPs/USPs";
import type { ApplicationProcessProps } from "@/components/blocks/ApplicationProcess/ApplicationProcess";
import type { BaresGeldSparenSectionProps } from "@/components/blocks/BaresGeldSparenSection";
import type { PricingSectionProps } from "@/components/blocks/PricingSection";
import type { ReferencesProps } from "@/components/blocks/References/References";
import type { ServicesProps } from "@/components/blocks/Services/Services";
import type { LeadFormProps } from "@/components/blocks/LeadForm/LeadForm";
import type { FlexibleCardProps } from "@/components/blocks/FlexibleCard/FlexibleCard";
import type { DatenschutzProps } from "@/components/blocks/Datenschutz/Datenschutz";
import type { ImpressumProps } from "@/components/blocks/Impressum/Impressum";
import type { ClientComponentProps } from "@/components/blocks/ClientComponent/types";
import type { CustomComponentProps } from "@/components/blocks/CustomComponent/CustomComponent";
import type { LexikonProps } from "@/components/blocks/Lexikon/Lexikon";
import type { RatgeberProps } from "@/components/blocks/Ratgeber/Ratgeber";
import type { LegalSectionProps } from "@/components/blocks/LegalSection/LegalSection";
import type { TaxTopicSectionProps } from "@/components/blocks/TaxTopicSection/TaxTopicSection";
import type { ProcessOverviewProps } from "@/components/blocks/ProcessOverview";
import type { TrustBlockProps } from "@/components/blocks/TrustBlock/TrustBlock";
import type { TrustBlockSlideshowProps } from "@/components/blocks/TrustBlock/TrustBlockSlideshow";
import type { TwoColumnFeatureSectionProps } from "@/components/blocks/TwoColumnFeatureSection/TwoColumnFeatureSection";
import type { TeamGridProps } from "@/components/blocks/TeamGrid/TeamGrid";
import type { PricingComparisonProps } from "@/components/blocks/PricingComparison/PricingComparison";
import type { DetailedPriceListProps } from "@/components/blocks/DetailedPriceList/DetailedPriceList";
import type { TestimonialSliderProps } from "@/components/blocks/TestimonialSlider";
import type { RecommendedLinksProps } from "@/components/blocks/RecommendedLinks";
import type { TaxSavingsShowcaseProps } from "@/components/blocks/TaxSavingsShowcase";
import type { HeroWithFeatureCardsProps } from "@/components/blocks/HeroWithFeatureCards";
import type { ServiceSpectrumProps } from "@/components/blocks/ServiceSpectrum/ServiceSpectrum";
import type { CenteredCtaStatementProps } from "@/components/blocks/CenteredCtaStatement/CenteredCtaStatement";
import type { CardLayoutProps } from "@/components/blocks/CardLayout";
import type { PaginationProps } from "@/components/blocks/Pagination/Pagination";
import type { EmbedScriptProps } from "@/components/blocks/EmbedScript/EmbedScript";
import type { IframeProps } from "@/components/blocks/Iframe/Iframe";

import type { ServiceOffersProps } from "@/components/blocks/ServiceOffers/ServiceOffers";
import { validateIconNames } from "@/lib/icon-utils";

// Re-export FAQ types for convenience
export type { FaqItem, FaqGroup } from "@/components/blocks/FAQ/FAQ";

// Component prop schemas for validation and documentation
export interface ComponentSchema {
  type: string;
  name: string;
  description: string;
  props: Record<
    string,
    {
      type: string;
      required?: boolean;
      default?: unknown;
      description?: string;
    }
  >;
}

// Component type definitions
// Base component interface - more restrictive
export interface BaseComponent {
  type: string;
  /**
   * Optional unique identifier for the component.
   * Used for stable component references in programmatic overrides.
   * If not provided, components can still be referenced by index.
   */
  id?: string;
}

// Hero component interface - uses exact same types as the component
export interface HeroComponent extends HeroProps, BaseComponent {
  type: "Hero";
}

// TextImage component interface - uses exact same types as the component
export type TextImageComponent =
  | (TextImageBlockProps &
      BaseComponent & {
        type: "TextImageSection";
      })
  | (TextImageBlockProps &
      BaseComponent & {
        type: "TextImageSection";
        variant: "taxSavings";
      });

export interface StepsComponent extends StepsBlockProps, BaseComponent {
  type: "Steps";
}

export interface HeaderComponent extends HeaderProps, BaseComponent {
  type: "Header";
}

export interface StructuredDataComponent extends BaseComponent {
  type: "StructuredData";
  schemaType: StructuredDataProps["schemaType"] | StructuredDataProps["type"];
  data: StructuredDataProps["data"];
}

export interface FAQComponent extends FaqProps, BaseComponent {
  type: "FAQ";
}

export type CtaComponent = CtaProps &
  BaseComponent & {
    type: "Cta";
  };

// About component interface
export interface AboutComponent extends AboutProps, BaseComponent {
  type: "About";
}

// FinalCTA component interface
export interface FinalCTAComponent extends FinalCTAProps, BaseComponent {
  type: "FinalCTA";
}

// USPs component interface
export interface USPsComponent extends USPsProps, BaseComponent {
  type: "USPs";
}

// ApplicationProcess component interface
export interface ApplicationProcessComponent
  extends ApplicationProcessProps,
    BaseComponent {
  type: "ApplicationProcess";
}

// BaresGeldSparenSection component interface
export interface BaresGeldSparenSectionComponent
  extends BaresGeldSparenSectionProps,
    BaseComponent {
  type: "BaresGeldSparenSection";
}

// PricingSection component interface
export interface PricingSectionComponent
  extends PricingSectionProps,
    BaseComponent {
  type: "PricingSection";
}

// References component interface
export interface ReferencesComponent extends ReferencesProps, BaseComponent {
  type: "References";
}

// Services component interface
export interface ServicesComponent extends ServicesProps, BaseComponent {
  type: "Services";
}

// LeadForm component interface
export interface LeadFormComponent extends LeadFormProps, BaseComponent {
  type: "LeadForm";
}

// FlexibleCard component interface
export interface FlexibleCardComponent
  extends FlexibleCardProps,
    BaseComponent {
  type: "FlexibleCard";
}

// Datenschutz component interface
export interface DatenschutzComponent extends DatenschutzProps, BaseComponent {
  type: "Datenschutz";
}

// Impressum component interface
export interface ImpressumComponent extends ImpressumProps, BaseComponent {
  type: "Impressum";
}

// ClientComponent component interface
export interface ClientComponentComponent
  extends ClientComponentProps,
    BaseComponent {
  type: "ClientComponent";
}

// CustomComponent component interface
export interface CustomComponentComponent
  extends CustomComponentProps,
    BaseComponent {
  type: "CustomComponent";
}

// Lexikon component interface
export interface LexikonComponent extends LexikonProps, BaseComponent {
  type: "Lexikon";
}

// Ratgeber component interface
export interface RatgeberComponent extends RatgeberProps, BaseComponent {
  type: "Ratgeber";
}

// LegalSection component interface
export interface LegalSectionComponent
  extends LegalSectionProps,
    BaseComponent {
  type: "LegalSection";
}

// TaxTopicSection component interface
export interface TaxTopicSectionComponent
  extends TaxTopicSectionProps,
    BaseComponent {
  type: "TaxTopicSection";
}

export interface ProcessOverviewComponent
  extends ProcessOverviewProps,
    BaseComponent {
  type: "ProcessOverview";
}

// TrustBlock component interface
export interface TrustBlockComponent extends TrustBlockProps, BaseComponent {
  type: "TrustBlock";
}

// TrustBlockSlideshow component interface
export interface TrustBlockSlideshowComponent
  extends TrustBlockSlideshowProps,
    BaseComponent {
  type: "TrustBlockSlideshow";
}

// TwoColumnFeatureSection component interface
export interface TwoColumnFeatureSectionComponent
  extends TwoColumnFeatureSectionProps,
    BaseComponent {
  type: "TwoColumnFeatureSection";
}

// TeamGrid component interface
export interface TeamGridComponent extends TeamGridProps, BaseComponent {
  type: "TeamGrid";
}

// PricingComparison component interface
export interface PricingComparisonComponent
  extends PricingComparisonProps,
    BaseComponent {
  type: "PricingComparison";
}

// DetailedPriceList component interface
export interface DetailedPriceListComponent
  extends DetailedPriceListProps,
    BaseComponent {
  type: "DetailedPriceList";
}

// TestimonialSlider component interface
export interface TestimonialSliderComponent
  extends TestimonialSliderProps,
    BaseComponent {
  type: "TestimonialSlider";
}

// RecommendedLinks component interface
export interface RecommendedLinksComponent
  extends RecommendedLinksProps,
    BaseComponent {
  type: "RecommendedLinks";
}

// HeroWithFeatureCards component interface
export interface HeroWithFeatureCardsComponent
  extends HeroWithFeatureCardsProps,
    BaseComponent {
  type: "HeroWithFeatureCards";
}

// ServiceSpectrum component interface
export interface ServiceSpectrumComponent
  extends ServiceSpectrumProps,
    BaseComponent {
  type: "ServiceSpectrum";
}

// CenteredCtaStatement component interface
export interface CenteredCtaStatementComponent
  extends CenteredCtaStatementProps,
    BaseComponent {
  type: "CenteredCtaStatement";
}

// CardLayout component interface
export interface CardLayoutComponent extends CardLayoutProps, BaseComponent {
  type: "CardLayout";
}

// ServiceOffers component interface
export interface ServiceOffersComponent
  extends ServiceOffersProps,
    BaseComponent {
  type: "ServiceOffers";
}

// Pagination component interface
export interface PaginationComponent extends PaginationProps, BaseComponent {
  type: "Pagination";
}

// EmbedScript component interface
export interface EmbedScriptComponent
  extends Omit<EmbedScriptProps, "id">,
    BaseComponent {
  type: "EmbedScript";
  id: string; // Override to make it required for this component
}

// Iframe component interface
export interface IframeComponent extends IframeProps, BaseComponent {
  type: "Iframe";
}

// TaxSavingsShowcase component interface
export interface TaxSavingsShowcaseComponent
  extends TaxSavingsShowcaseProps,
    BaseComponent {
  type: "TaxSavingsShowcase";
}

// Re-export component types for centralized access
export type {
  TextImageBlockProps,
  FeatureItem,
  ContentBlock,
  Paragraph,
  HighlightBox,
} from "@/components/blocks/TextImageSection/TextImageSection";
export type {
  HeroProps,
  HeroButton,
  HeroFeature,
  HeroTrustBadge,
} from "@/components/blocks/HeroSection/Hero";
export type {
  StepsBlockProps,
  StepsBlockStepItem,
  StepsBlockSubtitleLine,
  StepsBlockCTAButton,
} from "@/components/blocks/Steps/Steps";

export type { HeaderProps } from "@/components/blocks/Header/Header";
export type { StructuredDataProps } from "@/components/StructuredData";
export type { CtaProps } from "@/components/blocks/Cta/Cta";
export type { AboutProps } from "@/components/blocks/About/About";
export type { FinalCTAProps } from "@/components/blocks/FinalCTA/FinalCTA";
export type { USPsProps, USPItem } from "@/components/blocks/USPs/USPs";
export type {
  ApplicationProcessProps,
  StepItem,
  ContactPerson,
} from "@/components/blocks/ApplicationProcess/ApplicationProcess";
export type {
  ReferencesProps,
  ReferenceItem,
} from "@/components/blocks/References/References";
export type {
  ServicesProps,
  ServiceItem,
} from "@/components/blocks/Services/Services";
export type {
  LeadFormProps,
  FormField,
  FormSection,
} from "@/components/blocks/LeadForm/LeadForm";
export type { FlexibleCardProps } from "@/components/blocks/FlexibleCard/FlexibleCard";
export type {
  BaresGeldSparenSectionProps,
  BulletItem as BaresGeldSparenBulletItem,
  CTAConfig as BaresGeldSparenCTAConfig,
  CardItem as BaresGeldSparenCardItem,
} from "@/components/blocks/BaresGeldSparenSection";
export type {
  DatenschutzProps,
  DatenschutzSection,
} from "@/components/blocks/Datenschutz/Datenschutz";
export type {
  ImpressumProps,
  ImpressumSection,
} from "@/components/blocks/Impressum/Impressum";
export type {
  ClientComponentProps,
  CTAConfig as ClientComponentCTAConfig,
} from "@/components/blocks/ClientComponent/types";
export type { CustomComponentProps } from "@/components/blocks/CustomComponent/CustomComponent";
export type {
  LexikonProps,
  LexikonEntry,
} from "@/components/blocks/Lexikon/Lexikon";
export type { RatgeberProps } from "@/components/blocks/Ratgeber/Ratgeber";
export type { LegalSectionProps } from "@/components/blocks/LegalSection/LegalSection";
export type { TaxTopicSectionProps } from "@/components/blocks/TaxTopicSection/TaxTopicSection";
export type {
  TrustBlockProps,
  LogoItem,
  TrustBlockVariant,
} from "@/components/blocks/TrustBlock/TrustBlock";
export type { TrustBlockSlideshowProps } from "@/components/blocks/TrustBlock/TrustBlockSlideshow";
export type {
  TwoColumnFeatureSectionProps,
  FeatureCard,
} from "@/components/blocks/TwoColumnFeatureSection/TwoColumnFeatureSection";
export type {
  TeamGridProps,
  TeamMember,
  TeamMemberContactLink,
  TeamMemberImage,
} from "@/components/blocks/TeamGrid/TeamGrid";
export type {
  ProcessOverviewProps,
  ProcessOverviewCta,
  ProcessStep,
  ProcessHighlight,
  ProcessOverviewMedia,
} from "@/components/blocks/ProcessOverview";
export type {
  PricingComparisonProps,
  PricingTier,
  PricingFeature,
} from "@/components/blocks/PricingComparison/PricingComparison";
export type {
  DetailedPriceListProps,
  PriceItem,
  ExtraService,
  VolumeDiscount,
} from "@/components/blocks/DetailedPriceList/DetailedPriceList";
export type {
  TestimonialSliderProps,
  TestimonialItem,
  TestimonialSliderControls,
} from "@/components/blocks/TestimonialSlider";
export type {
  RecommendedLinksProps,
  RecommendedLinkItem,
} from "@/components/blocks/RecommendedLinks";
export type {
  TaxSavingsShowcaseProps,
  PropertyCard,
  PropertyFeature,
  PropertyFeatureIcon,
  PropertyStat,
} from "@/components/blocks/TaxSavingsShowcase";
export type {
  CardLayoutProps,
  CardLayoutItem,
} from "@/components/blocks/CardLayout";
export type {
  ServiceOffersProps,
  OfferCard,
} from "@/components/blocks/ServiceOffers/ServiceOffers";
export type { PaginationProps } from "@/components/blocks/Pagination/Pagination";
export type { EmbedScriptProps } from "@/components/blocks/EmbedScript/EmbedScript";
export type { IframeProps } from "@/components/blocks/Iframe/Iframe";

// Footer types are already imported above and re-exported
export type { FooterProps, LinkItem, FooterSection };

// Footer component interface
export interface FooterComponent
  extends Omit<FooterProps, "brandIcon">,
    BaseComponent {
  type: "Footer";
  brandIcon?: string; // Icon name as string for schema
}

// Union type for all component types
export type PageComponent =
  | HeroComponent
  | TextImageComponent
  | StepsComponent
  | BaseComponent
  | HeaderComponent
  | StructuredDataComponent
  | FAQComponent
  | CtaComponent
  | FooterComponent
  | AboutComponent
  | FinalCTAComponent
  | USPsComponent
  | ApplicationProcessComponent
  | BaresGeldSparenSectionComponent
  | PricingSectionComponent
  | ReferencesComponent
  | ServicesComponent
  | LeadFormComponent
  | FlexibleCardComponent
  | DatenschutzComponent
  | ImpressumComponent
  | ClientComponentComponent
  | CustomComponentComponent
  | LexikonComponent
  | RatgeberComponent
  | LegalSectionComponent
  | TaxTopicSectionComponent
  | ProcessOverviewComponent
  | TrustBlockComponent
  | TrustBlockSlideshowComponent
  | TwoColumnFeatureSectionComponent
  | TeamGridComponent
  | PricingComparisonComponent
  | DetailedPriceListComponent
  | TestimonialSliderComponent
  | RecommendedLinksComponent
  | TaxSavingsShowcaseComponent
  | HeroWithFeatureCardsComponent
  | ServiceSpectrumComponent
  | CenteredCtaStatementComponent
  | CardLayoutComponent
  | ServiceOffersComponent
  | PaginationComponent
  | EmbedScriptComponent
  | IframeComponent;

// Type for subpage content - now an array of components
export type SubpageContent = PageComponent[];

/**
 * Development-time validation function for subpage content
 * This function validates the content and provides helpful error messages
 * Use this in your subpage TypeScript files for compile-time validation
 */
export function validateContent<T extends SubpageContent>(content: T): T {
  if (process.env.NODE_ENV === "development") {
    const validation = validateSubpageContent(content);
    if (!validation.valid) {
      //console.error("Subpage content validation errors:", validation.errors);
      // In development, you might want to throw an error to catch issues early
      // throw new Error(`Invalid subpage content: ${validation.errors.join(', ')}`);
    }
  }
  return content;
}

/**
 * Strict validation function that enforces exact component types
 * This will show TypeScript errors in your IDE for invalid properties
 */
export function strictValidateContent<T extends SubpageContent>(content: T): T {
  // This function signature enforces that all components must match their exact interfaces
  return content;
}

/**
 * Helper function to create a hero component with strict typing
 * This will show TypeScript errors for invalid properties
 */
export function createHeroComponent(props: HeroComponent): HeroComponent {
  return props;
}

/**
 * Helper function to create a textImage component with strict typing
 * This will show TypeScript errors for invalid properties
 */
export function createTextImageComponent(
  props: TextImageComponent
): TextImageComponent {
  return props;
}

/**
 * Type-safe component creator that enforces strict typing
 * Use this instead of plain objects to get TypeScript errors for invalid properties
 */
export function createComponent<T extends PageComponent>(component: T): T {
  return component;
}

/**
 * Strict textImage component creator - this will show TypeScript errors for invalid properties
 */
export function createTextImageComponentStrict(
  component: TextImageComponent
): TextImageComponent {
  return component;
}

/**
 * Strict hero component creator - this will show TypeScript errors for invalid properties
 */
export function createHeroComponentStrict(
  component: HeroComponent
): HeroComponent {
  return component;
}

/**
 * Helper function to create a structured data component with strict typing
 */
export function createStructuredDataComponent(
  props: StructuredDataComponent
): StructuredDataComponent {
  return props;
}

/**
 * Helper function to create a CTA component with strict typing
 */
export function createCtaComponent(props: CtaComponent): CtaComponent {
  return props;
}

/**
 * Helper function to create a Footer component with strict typing
 */
export function createFooterComponent(props: FooterComponent): FooterComponent {
  return props;
}

/**
 * Component schemas for validation and documentation
 *
 * This file contains the schema definitions for all registered components.
 * Each schema defines the component's props, their types, requirements, and descriptions.
 *
 * Schema structure:
 * - name: Human-readable component name
 * - description: Component purpose and usage
 * - props: Object defining each prop with type, requirement, and description
 */

export const componentSchemas: ComponentSchema[] = [
  {
    type: "TextImageSection",
    name: "Text Image Section",
    description:
      "A flexible section that displays text content alongside an image. Supports various content types including paragraphs with highlighting, feature lists, and highlight boxes.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description:
          "Layout variant for the section (default, saving for the marketing layout, or taxSavings for the dedicated tax savings layout).",
      },
      cta: {
        type: "object",
        required: false,
        description:
          "Optional call-to-action configuration for the default and saving variants.",
      },
      ctaIconClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for styling the CTA icon.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the section",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional description text displayed above content blocks",
      },
      contentBlocks: {
        type: "array",
        required: false,
        description: "Array of content blocks (paragraphs and highlight boxes)",
      },
      features: {
        type: "array",
        required: false,
        description:
          "Array of feature items with icons, titles, and descriptions",
      },
      imageSrc: {
        type: "string",
        required: false,
        description: "Path to the image file",
      },
      imageAlt: {
        type: "string",
        required: false,
        description: "Alt text for the image (accessibility)",
      },
      imageWidth: {
        type: "number",
        required: false,
        default: 500,
        description: "Width of the image in pixels",
      },
      imageHeight: {
        type: "number",
        required: false,
        default: 500,
        description: "Height of the image in pixels",
      },
      textPosition: {
        type: "string",
        required: false,
        default: "left",
        description:
          "Position of text content relative to image (left or right)",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color class for the section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for custom styling",
      },
    },
  },
  {
    type: "Header",
    name: "Header",
    description:
      "A responsive, fixed navigation header that provides site navigation, logo display, and call-to-action buttons. Features mobile-friendly hamburger menu and dropdown navigation support.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      variant: {
        type: "string",
        required: false,
        default: "light",
        description: "Theme variant for the header (light or dark)",
      },
      logo: {
        type: "object",
        required: false,
        description:
          "Logo configuration with light and dark variants, and optional mobile icon",
      },
      navigation: {
        type: "array",
        required: false,
        description:
          "Array of navigation items with optional children for dropdowns",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for custom styling",
      },
    },
  },
  {
    type: "Footer",
    name: "Footer",
    description:
      "Flexible footer component with branding, navigation sections, contact info, and legal links. Highly customizable with support for dynamic sections and styling options.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      brandName: {
        type: "string",
        required: true,
        description: "Brand or company name",
      },
      brandIcon: {
        type: "string",
        required: false,
        description: "Optional brand icon (Lucide icon name)",
      },
      brandDescription: {
        type: "string",
        required: false,
        description: "Optional brand description text",
      },
      sections: {
        type: "array",
        required: true,
        description:
          "Array of footer sections with links, contacts, or custom content",
      },
      legalLinks: {
        type: "array",
        required: false,
        description: "Legal links displayed in the bottom section",
      },
      copyrightText: {
        type: "string",
        required: false,
        description: "Custom copyright text",
      },
      showYear: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the current year in copyright",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-primary",
        description: "Background color class",
      },
      textColor: {
        type: "string",
        required: false,
        default: "text-primary-foreground",
        description: "Text color class",
      },
      borderColor: {
        type: "string",
        required: false,
        default: "border-primary-foreground/20",
        description: "Border color class",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for custom styling",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the container element",
      },
      topSectionClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the top section grid",
      },
      bottomSectionClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the bottom section",
      },
      brandClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the brand section",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description: "CSS classes for each section",
      },
      linkClassName: {
        type: "string",
        required: false,
        description: "CSS classes for links",
      },
      enableScrollTo: {
        type: "boolean",
        required: false,
        default: true,
        description: "Enable smooth scrolling for anchor links",
      },
    },
  },
  {
    type: "Heading",
    name: "Heading",
    description:
      "A flexible, semantic heading component that maintains proper heading hierarchy while providing extensive customization options. Automatically handles sizing, spacing, and accessibility.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      level: {
        type: "number",
        required: false,
        default: 1,
        description: "Semantic heading level (1-6)",
      },
      variant: {
        type: "string",
        required: false,
        default: "primary",
        description: "Visual color variant (default, primary, accent, muted)",
      },
      as: {
        type: "string",
        required: false,
        description:
          "Override rendered HTML tag while keeping accessible semantics",
      },
      underline: {
        type: "boolean",
        required: false,
        default: false,
        description: "Show decorative underline",
      },
      underlineClassName: {
        type: "string",
        required: false,
        default: "w-24 h-1 bg-accent rounded-full mx-auto mt-2",
        description: "Custom className for the underline element",
      },
      center: {
        type: "boolean",
        required: false,
        default: false,
        description: "Center align the heading",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes",
      },
      children: {
        type: "string",
        required: true,
        description: "Heading text content",
      },
    },
  },
  {
    type: "Lexikon",
    name: "Lexikon",
    description:
      "A comprehensive lexicon/glossary component that displays terms and definitions in an organized, searchable format. Perfect for educational content and reference materials.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      lexicon: {
        type: "object",
        required: true,
        description:
          "Object containing terms as keys and definitions as values",
      },
      title: {
        type: "string",
        required: false,
        description:
          "Main title for the lexicon section (shown when showHero is true)",
      },
      subtitle: {
        type: "string",
        required: false,
      },
      icon: {
        type: "string",
        required: false,
        description:
          'Lucide icon name (e.g., "Calculator", "Shield", "TrendingUp")',
      },
      iconAriaLabel: {
        type: "string",
        required: false,
        description: "Accessibility label for the icon",
      },
      iconOnTop: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to display icon above the title",
      },
      imageSrc: {
        type: "string",
        required: false,
        description: "Path to the image file",
      },
      imageAlt: {
        type: "string",
        required: false,
        description: "Alt text for the image",
      },
      showHero: {
        type: "boolean",
        required: false,
        default: true,
        description:
          "Whether to show the hero section (title, subtitle, icon, image)",
      },
      showImage: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to display the image in hero section",
      },
      showTableOfContents: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the table of contents",
      },
      headingLevel: {
        type: "number",
        required: false,
        default: 1,
        description: "Heading level for the title (1-6)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the main container",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the container element",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the card element",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the content area",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title element",
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default:
          "min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16",
        description: "CSS classes for the background styling",
      },
      tableOfContentsClassName: {
        type: "string",
        required: false,
        default: "mb-12 p-6 bg-gray-50 rounded-lg",
        description: "CSS classes for the table of contents container",
      },
      entryClassName: {
        type: "string",
        required: false,
        default: "border-l-4 border-[#ff985c] pl-4 scroll-mt-20",
        description: "CSS classes for individual lexicon entries",
      },
      tableOfContentsTitle: {
        type: "string",
        required: false,
        default: "Inhaltsverzeichnis",
        description: "Title for the table of contents section",
      },
      sortBy: {
        type: "string",
        required: false,
        default: "alphabetical",
        description: "Sorting method for lexicon entries",
      },
      locale: {
        type: "string",
        required: false,
        default: "de",
        description: "Locale for sorting and text processing",
      },
      children: {
        type: "object",
        required: false,
        description: "Additional content to render within the lexicon",
      },
    },
  },
  {
    type: "SmoothScrollButton",
    name: "Smooth Scroll Button",
    description:
      "A versatile button component that provides smooth scrolling to a target element on the page. Supports multiple variants, sizes, and custom scroll behavior. Perfect for navigation within long pages and improving user experience.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      targetId: {
        type: "string",
        required: true,
        description: "ID of the target element to scroll to (without #)",
      },
      children: {
        type: "string",
        required: true,
        description: "Button content/text",
      },
      icon: {
        type: "string",
        required: false,
        description:
          'Lucide icon name (e.g., "Calculator", "Shield", "TrendingUp")',
      },
      iconPosition: {
        type: "string",
        required: false,
        default: "left",
        description: "Position of the icon relative to text (left or right)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for styling",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description: "Visual variant (default, button, link, ghost)",
      },
      size: {
        type: "string",
        required: false,
        default: "md",
        description: "Size of the button (sm, md, lg)",
      },
      scrollOffset: {
        type: "number",
        required: false,
        default: 0,
        description: "Offset in pixels from the target element",
      },
      scrollBehavior: {
        type: "string",
        required: false,
        default: "smooth",
        description: "Scroll behavior (smooth, auto, instant)",
      },
      title: {
        type: "string",
        required: false,
        description: "Custom title attribute for the button",
      },
      ariaLabel: {
        type: "string",
        required: false,
        description: "Custom ARIA label for accessibility",
      },
    },
  },
  {
    type: "Steps",
    name: "Steps",
    description:
      "A versatile steps component that displays a list of steps with optional badges, icons, and customizations. Perfect for displaying process flows, tutorials, or any sequential content.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      steps: {
        type: "array",
        required: true,
        description: "Array of step items",
      },
      title: {
        type: "string",
        required: false,
        description: "Title for the steps section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle for the steps section",
      },
      backgroundColor: {
        type: "string",
        required: false,
        description: "Background color for the steps section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the steps section",
      },
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns for the steps",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the steps card",
      },
      iconSize: {
        type: "string",
        required: false,
        default: "md",
        description: "Size of the icon (sm, md, lg)",
      },
      ctaButton: {
        type: "object",
        required: false,
        description: "CTA button object",
      },
    },
  },
  {
    type: "StructuredData",
    name: "Structured Data",
    description:
      "A component that generates JSON-LD structured data for SEO and search engines. Supports multiple schema types including organization, website, article, FAQ, course, learning resource, and donation data.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      schemaType: {
        type: "string",
        required: true,
        description:
          "Type of structured data (organization, website, article, donation, faq, course, learningResource)",
      },
      data: {
        type: "object",
        required: true,
        description:
          "Structured data object containing the specific data for the chosen type",
      },
    },
  },
  {
    type: "Cta",
    name: "Call to Action",
    description:
      "A versatile call-to-action component that displays compelling content with buttons and optional disclaimers. Supports multiple variants including banner layout with features and trust indicators.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main title for the CTA section",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional description text below the title",
      },
      button: {
        type: "object",
        required: true,
        description:
          "Button configuration object with text, href, and optional styling",
      },
      disclaimerTitle: {
        type: "string",
        required: false,
        default: "Rechtlicher Hinweis",
        description: "Title for the disclaimer section",
      },
      disclaimerContent: {
        type: "string",
        required: false,
        description: "Custom disclaimer content (string or React node)",
      },
      icon: {
        type: "string",
        required: false,
        description:
          'Lucide icon name (e.g., "Calculator", "Shield", "TrendingUp")',
      },
      features: {
        type: "array",
        required: false,
        description:
          "Array of feature items with icons, titles, and descriptions (for banner variant)",
      },
      trustText: {
        type: "string",
        required: false,
        description:
          "Trust indicator text displayed below buttons (for banner variant)",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description:
          "Visual variant (default, primary, secondary, accent, banner)",
      },
      size: {
        type: "string",
        required: false,
        default: "md",
        description: "Size variant (sm, md, lg)",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "4xl",
        description:
          "Maximum width of the CTA container (sm, md, lg, xl, 2xl, 4xl, 6xl, full)",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
        description: "Text alignment (left, center, right)",
      },
      showDisclaimer: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the disclaimer section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the main container",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the inner container",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the content area",
      },
      buttonClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the button",
      },
      disclaimerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the disclaimer section",
      },
      backgroundColor: {
        type: "string",
        required: false,
        description: "Custom background color class",
      },
      padding: {
        type: "string",
        required: false,
        default: "md",
        description: "Padding size (sm, md, lg, xl)",
      },
      margin: {
        type: "string",
        required: false,
        default: "md",
        description: "Margin size (sm, md, lg, xl)",
      },
    },
  },
  {
    type: "Hero",
    name: "Hero Section",
    description:
      "A flexible hero section component that displays prominent content at the top of pages. Supports multiple layouts (centered, split, minimal, default, image-left) with optional images, buttons, features, trust badges, and extensive styling options. Merged to support both HeroSection and Hero/Hero APIs.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      h1Text: {
        type: "string",
        required: true,
        description: "Main heading text for the hero section",
      },
      titleHighlight: {
        type: "string",
        required: false,
        description: "Part of h1Text to highlight in accent color",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle text displayed below the main heading",
      },
      subtitleHighlight: {
        type: "string",
        required: false,
        description: "Part of subtitle to highlight with custom styling",
      },
      description: {
        type: "string",
        required: false,
        description: "Description text displayed below the subtitle",
      },
      icon: {
        type: "string",
        required: false,
        description:
          'Lucide icon name to display above the title (e.g., "Calculator", "Shield")',
      },
      image: {
        type: "object",
        required: false,
        description:
          "Image object with src, alt, width, height, and optional priority properties",
      },
      layout: {
        type: "string",
        required: false,
        default: "centered",
        description:
          "Layout variant (centered, split, minimal, default, image-left)",
      },
      background: {
        type: "string",
        required: false,
        default: "gradient",
        description: "Background type (gradient, white, custom)",
      },
      customBackgroundClass: {
        type: "string",
        required: false,
        description:
          "Custom background CSS class (used when background is custom)",
      },
      buttons: {
        type: "array",
        required: false,
        description:
          "Array of button objects. Supports both HeroSection style (href, label, icon as string) and Hero/Hero style (href, text, icon as LucideIcon, onClick)",
      },
      features: {
        type: "array",
        required: false,
        description:
          "Array of feature objects with icon, title, and optional description",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title element",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle element",
      },
      subtitleHighlightClassName: {
        type: "string",
        required: false,
        default: "font-semibold",
        description:
          "CSS classes for the highlighted subtitle text (defaults to font-semibold)",
      },
      descriptionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the description element",
      },
      children: {
        type: "object",
        required: false,
        description: "Additional React content to render within the hero",
      },
      // Support both naming conventions (merged from Hero/Hero)
      title: {
        type: "string",
        required: false,
        description: "Main heading text (alternative to h1Text)",
      },
      highlightText: {
        type: "string",
        required: false,
        description:
          "Part of title to highlight (alternative to titleHighlight)",
      },
      // Trust badges support (from Hero/Hero)
      trustBadges: {
        type: "array",
        required: false,
        description:
          "Array of trust badge objects with text, optional icon (LucideIcon), and variant",
      },
      // Section props
      sectionId: {
        type: "string",
        required: false,
        default: "hero",
        description: "ID for the hero section",
      },
      // Extended layout options (from Hero/Hero)
      imagePosition: {
        type: "string",
        required: false,
        default: "right",
        description: "Position of image relative to content (right or left)",
      },
      // Styling props (from Hero/Hero)
      paddingTop: {
        type: "string",
        required: false,
        description: "Top padding size (sm, md, lg, xl)",
      },
      paddingBottom: {
        type: "string",
        required: false,
        description: "Bottom padding size (sm, md, lg, xl)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the main container",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the inner container",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the content area",
      },
      highlightClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the highlighted text",
      },
      buttonsWrapperClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the buttons wrapper",
      },
      badgesWrapperClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the badges wrapper",
      },
      imageWrapperClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the image wrapper",
      },
      imageClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the image element",
      },
      // Animation props (from Hero/Hero)
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to enable fade-in animations",
      },
      imageAnimationDelay: {
        type: "number",
        required: false,
        default: 0.2,
        description: "Animation delay for image in seconds",
      },
      // Behavior props (from Hero/Hero)
      enableScrollTo: {
        type: "boolean",
        required: false,
        default: true,
        description: "Enable smooth scrolling for buttons",
      },
    },
  },
  {
    type: "FAQ",
    name: "FAQ",
    description:
      "A component that displays frequently asked questions in an accordion format. Supports both simple FAQ items and grouped FAQs. Includes multiple variants: 'default' (shadcn/ui Accordion with single item open) and 'accordion' (custom accordion with multiple items open support).",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: false,
        description: "Main title for the FAQ section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle text displayed below the main title",
      },
      items: {
        type: "array",
        required: true,
        description: "Array of FAQ items or FAQ groups",
      },
      showTitle: {
        type: "boolean",
        required: false,
        description: "Whether to show the title section",
      },
      sectionId: {
        type: "string",
        required: false,
        description: "ID for the FAQ section",
      },
      enableAnchorLinks: {
        type: "boolean",
        required: false,
        description: "Whether to enable anchor links for FAQ items",
      },
      ariaLabel: {
        type: "string",
        required: false,
        description: "ARIA label for accessibility",
      },
      renderAsH1: {
        type: "boolean",
        required: false,
        description: "Whether to render the title as an H1 element",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section element",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title element",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle element",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description:
          "Visual variant of the FAQ component. 'default' uses shadcn/ui Accordion (single item open). 'accordion' uses custom accordion with multiple items open support.",
      },
      defaultOpenIds: {
        type: "array",
        required: false,
        default: [],
        description:
          "IDs of FAQ items that should be open by default (for accordion variant only)",
      },
      containerClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for the container element (for accordion variant)",
      },
      headerClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for the header element (for accordion variant)",
      },
      itemClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for each FAQ item (for accordion variant)",
      },
      questionClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for the question text (for accordion variant)",
      },
    },
  },
  {
    type: "About",
    name: "About",
    description:
      "About section component with highlights showcasing company information, statistics, and key metrics",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the about section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      subtitleHighlight: {
        type: "string",
        required: false,
        description:
          "Part of subtitle to highlight with custom styling (deprecated, use subtitleHighlightOne)",
      },
      subtitleHighlightOne: {
        type: "string",
        required: false,
        description: "First part of subtitle to highlight with custom styling",
      },
      subtitleHighlightTwo: {
        type: "string",
        required: false,
        description: "Second part of subtitle to highlight with custom styling",
      },
      subtitleHighlightThree: {
        type: "string",
        required: false,
        description: "Third part of subtitle to highlight with custom styling",
      },
      description: {
        type: "array",
        required: true,
        description: "Array of paragraph strings for the description content",
      },
      highlights: {
        type: "array",
        required: true,
        description: "Array of highlight items with icons, values, and labels",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "about",
      },
      variant: {
        type: "string",
        required: false,
        default: "secondary",
        description: "Section variant (default or secondary)",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "4xl",
        description: "Maximum width of the container",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
        description: "Text alignment (left, center, right)",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      borderClassName: {
        type: "string",
        required: false,
        description:
          "Border classes applied to each logo card. Only applies to the 'default' variant.",
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      subtitleHighlightClassName: {
        type: "string",
        required: false,
        default: "font-semibold",
        description:
          "CSS classes for the highlighted subtitle text (defaults to font-semibold)",
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      highlightCardClassName: {
        type: "string",
        required: false,
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
      },
    },
  },
  {
    type: "FinalCTA",
    name: "Final CTA",
    description:
      "Final call-to-action section component with customizable buttons and card variants",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the CTA section",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional description text below the title",
      },
      buttons: {
        type: "array",
        required: true,
        description: "Array of button configurations",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "cta",
      },
      variant: {
        type: "string",
        required: false,
        default: "secondary",
      },
      cardVariant: {
        type: "string",
        required: false,
        default: "primary",
        description: "Card variant (default, primary, accent, secondary)",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "2xl",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
      },
      padding: {
        type: "string",
        required: false,
        default: "lg",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      contentClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      descriptionClassName: {
        type: "string",
        required: false,
      },
      buttonsWrapperClassName: {
        type: "string",
        required: false,
      },
      enableScrollTo: {
        type: "boolean",
        required: false,
        default: true,
      },
      scrollToSelector: {
        type: "string",
        required: false,
        default: "#bewertung",
      },
    },
  },
  {
    type: "USPs",
    name: "USPs",
    description:
      "Unique Selling Points section component displaying key benefits with icons in a grid layout",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the USPs section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      usps: {
        type: "array",
        required: true,
        description: "Array of USP items with icons, titles, and descriptions",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "usps",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
      },
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns (2, 3, or 4)",
      },
      maxWidth: {
        type: "string",
        required: false,
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
      },
      iconSize: {
        type: "string",
        required: false,
        default: "md",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      gridClassName: {
        type: "string",
        required: false,
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      iconWrapperClassName: {
        type: "string",
        required: false,
      },
      iconClassName: {
        type: "string",
        required: false,
      },
      contentClassName: {
        type: "string",
        required: false,
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
      },
      enableHoverEffect: {
        type: "boolean",
        required: false,
        default: true,
      },
    },
  },
  {
    type: "ApplicationProcess",
    name: "Application Process",
    description:
      "Application/hiring process flow component with timeline, step cards, and contact person section. Perfect for displaying recruitment or onboarding workflows.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      eyebrow: {
        type: "string",
        required: true,
        description: "Small text above the title (e.g., 'BEWERBUNGSPROZESS')",
      },
      title: {
        type: "string",
        required: true,
        description:
          "Main heading for the process section (e.g., 'So funktioniert's!')",
      },
      steps: {
        type: "array",
        required: true,
        description:
          "Array of process step items with icons, titles, and descriptions",
      },
      contactPerson: {
        type: "object",
        required: false,
        description:
          "Contact person information section with image and contact details",
      },
      decorativeBadges: {
        type: "array",
        required: false,
        description:
          "Decorative badges with letters positioned around the section",
      },
      questionText: {
        type: "string",
        required: false,
        description: "Optional question text displayed above contact section",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "application-process",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color using Tailwind classes",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      eyebrowClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      timelineClassName: {
        type: "string",
        required: false,
      },
      stepsGridClassName: {
        type: "string",
        required: false,
      },
      stepCardClassName: {
        type: "string",
        required: false,
      },
      contactSectionClassName: {
        type: "string",
        required: false,
      },
      questionTextClassName: {
        type: "string",
        required: false,
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
      },
      enableHoverEffect: {
        type: "boolean",
        required: false,
        default: true,
      },
    },
  },
  {
    type: "BaresGeldSparenSection",
    name: "Bares Geld Sparen Section",
    description:
      "Marketing section combining checklist bullet points, summary text, primary CTA, and a grid of advantage cards for Nutzungsdauergutachten.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable references in programmatic overrides.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "bares-geld-sparen",
        description: "HTML id attribute used for in-page navigation.",
      },
      eyebrow: {
        type: "string",
        required: false,
        description: "Uppercase eyebrow label displayed above the headline.",
      },
      eyebrowClassName: {
        type: "string",
        required: false,
      },
      title: {
        type: "string",
        required: true,
        description: "Main headline for the section.",
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      bulletItems: {
        type: "array",
        required: true,
        description:
          "Checklist style bullet items displayed with optional icons.",
      },
      bulletListClassName: {
        type: "string",
        required: false,
      },
      bulletTextClassName: {
        type: "string",
        required: false,
      },
      summary: {
        type: "array",
        required: false,
        description:
          "Paragraphs of descriptive copy rendered next to the bullet list.",
      },
      summaryClassName: {
        type: "string",
        required: false,
      },
      summaryContainerClassName: {
        type: "string",
        required: false,
      },
      headerTitle: {
        type: "string",
        required: false,
      },
      headerTitleClassName: {
        type: "string",
        required: false,
      },
      highlight: {
        type: "array",
        required: false,
        description:
          "Array of words or phrases to highlight in the summary text. Words will be highlighted in orange by default.",
      },
      highlightClassName: {
        type: "string",
        required: false,
        description:
          "Custom CSS class for highlighted text. Defaults to orange color (text-[#FC7019]).",
      },
      cta: {
        type: "object",
        required: false,
        description: "Primary call-to-action button configuration.",
      },
      ctas: {
        type: "array",
        required: false,
        description: "Array of call-to-action buttons (for imagecard variant).",
      },
      headerCta: {
        type: "object",
        required: false,
        description:
          "Call-to-action button in the header (for imagecard variant).",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description:
          "Variant of the section: 'default', 'imagecard', 'imagecard-shadow' (enhanced card design with shadow effects), or 'contacts' (team/contact cards).",
      },
      ctaIconClassName: {
        type: "string",
        required: false,
      },
      cards: {
        type: "array",
        required: true,
        description: "Grid of benefit cards displayed below the main content.",
      },
      cardsGridClassName: {
        type: "string",
        required: false,
      },
      cardTitleClassName: {
        type: "string",
        required: false,
      },
      cardDescriptionClassName: {
        type: "string",
        required: false,
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color utility classes applied to the section.",
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      className: {
        type: "string",
        required: false,
      },
      // New props for 'contacts' variant
      contacts: {
        type: "array",
        required: false,
        description:
          "Array of contact/team items for the 'contacts' variant. Each item supports: name, role, bio, image, imageAlt, imageClassName, socialHref.",
      },
      contactsGridClassName: {
        type: "string",
        required: false,
      },
      contactNameClassName: {
        type: "string",
        required: false,
      },
      contactRoleClassName: {
        type: "string",
        required: false,
      },
      contactBioClassName: {
        type: "string",
        required: false,
      },
    },
  },
  {
    type: "PricingSection",
    name: "Pricing Section",
    description:
      "Generic pricing section component displaying pricing information with a header CTA, main pricing box, and additional information boxes in a two-column layout.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable references in programmatic overrides.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "pricing-section",
        description: "HTML id attribute used for in-page navigation.",
      },
      title: {
        type: "string",
        required: false,
        description: "Main headline for the pricing section.",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title.",
      },
      cta: {
        type: "object",
        required: false,
        description: "Call-to-action button configuration in the header.",
      },
      ctaIconClassName: {
        type: "string",
        required: false,
        default: "text-[#FF985C]",
        description: "CSS classes for the CTA icon.",
      },
      fairPricesBox: {
        type: "object",
        required: false,
        description: "Configuration for the fair prices box (left column).",
      },
      inspectionBox: {
        type: "object",
        required: false,
        description:
          "Configuration for the inspection costs box (right column, top).",
      },
      priceListBox: {
        type: "object",
        required: false,
        description:
          "Configuration for the price list box (right column, bottom).",
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default: "bg-[rgba(143,181,170,0.1)]",
        description: "Background color utility classes applied to the section.",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the container element.",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section element.",
      },
    },
  },
  {
    type: "References",
    name: "References",
    description:
      "References section component displaying testimonials, case studies, or customer reviews with optional ratings",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the references section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      references: {
        type: "array",
        required: true,
        description: "Array of reference items",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "references",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
      },
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns (2, 3, or 4)",
      },
      maxWidth: {
        type: "string",
        required: false,
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      gridClassName: {
        type: "string",
        required: false,
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
      },
      showRating: {
        type: "boolean",
        required: false,
        default: true,
      },
      ratingIcon: {
        type: "string",
        required: false,
        description: "Lucide icon name for rating display",
      },
      maxRating: {
        type: "number",
        required: false,
        default: 5,
      },
    },
  },
  {
    type: "Services",
    name: "Services",
    description:
      "Services section component with icons, descriptions, bullet points, and action buttons",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the services section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      services: {
        type: "array",
        required: true,
        description: "Array of service items",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "services",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
      },
      columns: {
        type: "number",
        required: false,
        default: 2,
        description: "Number of columns (1, 2, 3, or 4)",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "7xl",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
      },
      iconSize: {
        type: "string",
        required: false,
        default: "md",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      gridClassName: {
        type: "string",
        required: false,
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      iconWrapperClassName: {
        type: "string",
        required: false,
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
      },
      enableScrollTo: {
        type: "boolean",
        required: false,
        default: true,
      },
      defaultButtonText: {
        type: "string",
        required: false,
        default: "Learn more",
      },
      defaultScrollTarget: {
        type: "string",
        required: false,
        default: "#contact",
      },
      showButtons: {
        type: "boolean",
        required: false,
        default: true,
      },
    },
  },
  {
    type: "LeadForm",
    name: "Lead Form",
    description:
      "Lead form component with customizable fields, sections, validation, and success states",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the form section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      cardTitle: {
        type: "string",
        required: false,
        description: "Title for the form card",
      },
      sections: {
        type: "array",
        required: true,
        description: "Array of form sections with fields",
      },
      submitButtonText: {
        type: "string",
        required: false,
        default: "Submit",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional description text (e.g., for privacy notices)",
      },
      successTitle: {
        type: "string",
        required: false,
        default: "Success!",
      },
      successMessage: {
        type: "string",
        required: false,
        description: "Success message to display after submission",
      },
      successIcon: {
        type: "string",
        required: false,
        default: "✓",
      },
      resetButtonText: {
        type: "string",
        required: false,
        default: "Submit Another",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "lead-form",
      },
      variant: {
        type: "string",
        required: false,
        default: "secondary",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "2xl",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "center",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      formClassName: {
        type: "string",
        required: false,
      },
      onSubmit: {
        type: "function",
        required: false,
        description: "Callback function when form is submitted",
      },
      enableToast: {
        type: "boolean",
        required: false,
        default: true,
      },
      toastSuccessTitle: {
        type: "string",
        required: false,
      },
      toastSuccessDescription: {
        type: "string",
        required: false,
      },
      toastErrorTitle: {
        type: "string",
        required: false,
      },
      toastErrorDescription: {
        type: "string",
        required: false,
      },
      privacyFieldId: {
        type: "string",
        required: false,
        default: "privacy",
      },
      customValidation: {
        type: "function",
        required: false,
        description: "Custom validation function",
      },
      privacyLinkUrl: {
        type: "string",
        required: false,
        default: "/datenschutz",
      },
      privacyLinkText: {
        type: "string",
        required: false,
        default: "Datenschutzerklärung",
      },
      privacyText: {
        type: "string",
        required: false,
        description: "Custom privacy text (overrides default)",
      },
      privacyLinkColor: {
        type: "string",
        required: false,
        description: "Color for the privacy policy link (e.g., #FF6200)",
      },
      imageSrc: {
        type: "string",
        required: false,
        description:
          "URL to the image displayed on the left side of the form (for image-form variant)",
      },
      imageAlt: {
        type: "string",
        required: false,
        description: "Alt text for the image",
      },
      submitButtonColor: {
        type: "string",
        required: false,
        description: "Background color for the submit button (e.g., #FF914C)",
      },
    },
  },
  {
    type: "FlexibleCard",
    name: "Flexible Card",
    description:
      "Flexible card component with customizable content, actions, icons, and styling variants",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main title of the card",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional description text below the title",
      },
      category: {
        type: "string",
        required: false,
        description: "Optional category badge text",
      },
      icon: {
        type: "string",
        required: false,
        description: "Lucide icon name",
      },
      iconAriaLabel: {
        type: "string",
        required: false,
      },
      keyPoints: {
        type: "array",
        required: false,
        default: [],
      },
      keyPointsTitle: {
        type: "string",
        required: false,
        default: "Kernpunkte:",
      },
      primaryAction: {
        type: "object",
        required: false,
      },
      secondaryActions: {
        type: "array",
        required: false,
        default: [],
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
      },
      size: {
        type: "string",
        required: false,
        default: "md",
      },
      className: {
        type: "string",
        required: false,
      },
      cardClassName: {
        type: "string",
        required: false,
      },
      headerClassName: {
        type: "string",
        required: false,
      },
      contentClassName: {
        type: "string",
        required: false,
      },
      footerClassName: {
        type: "string",
        required: false,
      },
      showIcon: {
        type: "boolean",
        required: false,
        default: true,
      },
      showCategory: {
        type: "boolean",
        required: false,
        default: true,
      },
      showKeyPoints: {
        type: "boolean",
        required: false,
        default: true,
      },
      showActions: {
        type: "boolean",
        required: false,
        default: true,
      },
      fullHeight: {
        type: "boolean",
        required: false,
        default: true,
      },
      iconColor: {
        type: "string",
        required: false,
        default: "primary",
      },
      categoryVariant: {
        type: "string",
        required: false,
        default: "secondary",
      },
      primaryActionVariant: {
        type: "string",
        required: false,
        default: "default",
      },
      secondaryActionVariant: {
        type: "string",
        required: false,
        default: "outline",
      },
    },
  },
  {
    type: "Datenschutz",
    name: "Datenschutz",
    description:
      "Privacy policy component (Datenschutzerklärung) with customizable sections, contact information, and legal content",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: false,
        default: "Datenschutzerklärung",
      },
      subtitle: {
        type: "string",
        required: false,
      },
      lastUpdated: {
        type: "string",
        required: false,
      },
      companyName: {
        type: "string",
        required: false,
        default: "Unternehmen",
      },
      sections: {
        type: "array",
        required: false,
        default: [],
        description: "Array of privacy policy sections",
      },
      contactInfo: {
        type: "object",
        required: false,
        default: {},
      },
      className: {
        type: "string",
        required: false,
        default: "",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description:
          'Visual variant: "default" for styled layout with icons, "simple" for plain text version, "minimal" for AGB style, "afaGuide" for AfA guide content',
      },
      afaGuideProps: {
        type: "object",
        required: false,
        description:
          "Props for afaGuide variant (backgroundColor, padding, content)",
        default: {
          backgroundColor: {
            type: "string",
            required: false,
            description: "Background color class for the section",
          },
          padding: {
            type: "string",
            required: false,
            description: "Padding classes for the section",
          },
          content: {
            type: "object",
            required: false,
            description: "Configurable content for all sections",
            properties: {
              heroTitle: { type: "string", required: false },
              heroDescription: { type: "string", required: false },
              grundlagenTitle: { type: "string", required: false },
              grundlagenDescription: { type: "string", required: false },
              grundlagenSubtitle: { type: "string", required: false },
              grundlagenItems: {
                type: "array",
                required: false,
                description: "Array of items for Grundlagen section",
              },
              schnellerenTitle: { type: "string", required: false },
              schnellerenDescription: { type: "string", required: false },
              anschaffungskostenTitle: { type: "string", required: false },
              anschaffungskostenDescription: {
                type: "string",
                required: false,
              },
              anschaffungskostenItems: {
                type: "array",
                required: false,
                description: "Array of strings for Anschaffungskosten items",
              },
              anschaffungskostenNote: { type: "string", required: false },
              berechnungTitle: { type: "string", required: false },
              formelTitle: { type: "string", required: false },
              formelDescription: { type: "string", required: false },
              beispielTitle: { type: "string", required: false },
              beispielDescription: { type: "string", required: false },
              fazitTitle: { type: "string", required: false },
              fazitDescription: { type: "string", required: false },
              bulletPointImage: {
                type: "object",
                required: false,
                description:
                  "Image configuration for bullet points in anschaffungskostenItems",
                properties: {
                  src: {
                    type: "string",
                    required: false,
                    description:
                      "Image source path (supports {{siteId}} template variable)",
                    default: "/images/{{siteId}}/home/bullet-point.webp",
                  },
                  alt: {
                    type: "string",
                    required: false,
                    description: "Alt text for the image",
                    default: "Bullet point",
                  },
                  width: {
                    type: "number",
                    required: false,
                    description: "Image width in pixels",
                    default: 16,
                  },
                  height: {
                    type: "number",
                    required: false,
                    description: "Image height in pixels",
                    default: 16,
                  },
                  className: {
                    type: "string",
                    required: false,
                    description: "Additional CSS classes for the image",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    type: "Impressum",
    name: "Impressum",
    description:
      "Legal notice component (Impressum) with company information, legal details, and customizable sections according to German TMG requirements",
    props: {
      title: {
        type: "string",
        required: false,
        default: "Impressum",
      },
      subtitle: {
        type: "string",
        required: false,
        default: "Angaben gemäß § 5 TMG",
      },
      companyInfo: {
        type: "object",
        required: false,
        default: {},
      },
      sections: {
        type: "array",
        required: false,
        default: [],
      },
      className: {
        type: "string",
        required: false,
        default: "",
      },
    },
  },
  {
    type: "ClientComponent",
    name: "Client Component",
    description:
      "Client-side component wrapper that dynamically loads and renders components from the client component registry",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      componentName: {
        type: "string",
        required: true,
        description: "Name of the client component to load from the registry",
      },
      props: {
        type: "object",
        required: false,
        default: {},
        description: "Props to pass to the loaded component",
      },
      serverData: {
        type: "object",
        required: false,
        default: {},
        description: "Server-side data to merge with props",
      },
      className: {
        type: "string",
        required: false,
        default: "",
      },
      title: {
        type: "string",
        required: false,
        description: "Title text to pass to the client component",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle text to pass to the client component",
      },
      titleContainerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title/subtitle container wrapper",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title element",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the subtitle element",
      },
      cta: {
        type: "object",
        required: false,
        description:
          "Call-to-action button configuration with label, href, optional icon, variant, and styling",
      },
    },
  },
  {
    type: "CustomComponent",
    name: "Custom Component",
    description:
      "Flexible component wrapper that dynamically loads custom components from the custom component registry with support for client, server, and hybrid component types",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      componentName: {
        type: "string",
        required: true,
        description: "Name of the custom component to load from the registry",
      },
      componentType: {
        type: "string",
        required: false,
        default: "client",
        description: "Type of component to load (client, server, hybrid)",
      },
      props: {
        type: "object",
        required: false,
        default: {},
      },
      serverData: {
        type: "object",
        required: false,
        default: {},
      },
      className: {
        type: "string",
        required: false,
        default: "",
      },
      importPath: {
        type: "string",
        required: false,
        description: "Optional import path for dynamic component loading",
      },
      renderMode: {
        type: "string",
        required: false,
        default: "immediate",
        description: "Rendering mode (immediate, lazy, dynamic)",
      },
    },
  },
  {
    type: "Ratgeber",
    name: "Ratgeber",
    description:
      "Blog/article listing component with featured articles and article cards. Automatically loads articles from markdown files with frontmatter. Supports three variants: 'top-article' (single featured article layout), 'grid' (default grid layout with Card components), and 'blog-card' (grid layout with BlogCard-style components).",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      variant: {
        type: "string",
        required: false,
        default: "grid",
        description:
          "Layout variant: 'top-article' (single featured article with large image and content), 'grid' (default grid layout with Card components), or 'blog-card' (grid layout with BlogCard-style components featuring category badges, author info, and read more links).",
      },
      title: {
        type: "string",
        required: true,
        default: "Ratgeber",
        description: "Main title for the ratgeber section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle text below the title",
      },
      description: {
        type: "string",
        required: false,
        description: "Description text below the subtitle",
      },
      showFeatured: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the featured article section",
      },
      showCategories: {
        type: "boolean",
        required: false,
        description: "Whether to show category badges (for grid variant)",
      },
      showAllArticles: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show all articles grid",
      },
      articlesPerRow: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of articles per row (2, 3, or 4)",
      },
      headingLevel: {
        type: "number",
        required: false,
        default: 1,
        description: "Heading level for the title (1-6)",
      },
      showTitle: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to display the title",
      },
      categoryFilter: {
        type: "string",
        required: false,
        description: "Filter articles by category",
      },
      maxArticles: {
        type: "number",
        required: false,
        description: "Maximum number of articles to display",
      },
      featuredLabel: {
        type: "string",
        required: false,
        default: "Empfohlener Artikel",
        description: "Label for featured section",
      },
      allArticlesLabel: {
        type: "string",
        required: false,
        default: "Alle Artikel",
        description: "Label for all articles section",
      },
      readMoreText: {
        type: "string",
        required: false,
        default: "Artikel lesen",
        description: "Text for read more button",
      },
      ctaText: {
        type: "string",
        required: false,
        default: "Mehr lesen",
        description:
          "Text for the call-to-action button (for top-article variant)",
      },
      ctaLink: {
        type: "string",
        required: false,
        description:
          "Link URL for the call-to-action button (for top-article variant)",
      },
      ctaIcon: {
        type: "string",
        required: false,
        description:
          "Lucide icon name for the CTA button (for top-article variant)",
      },
      enablePagination: {
        type: "boolean",
        required: false,
        default: false,
        description: "Enable pagination for the All Articles section",
      },
      articlesPerPage: {
        type: "number",
        required: false,
        default: 9,
        description:
          "Number of articles to display per page when pagination is enabled",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "ratgeber",
        description:
          "HTML id attribute for the section (for top-article variant)",
      },
      baseImage: {
        type: "string",
        required: false,
        description:
          "Image URL for the featured article (for top-article variant)",
      },
      baseImageAlt: {
        type: "string",
        required: false,
        default: "Article image",
        description: "Alt text for the base image (for top-article variant)",
      },
      authorName: {
        type: "string",
        required: false,
        description:
          "Author name for the featured article (for top-article variant)",
      },
      authorImage: {
        type: "string",
        required: false,
        description: "Author image URL (for top-article variant)",
      },
      authorImageAlt: {
        type: "string",
        required: false,
        default: "Author avatar",
        description: "Alt text for the author image (for top-article variant)",
      },
      publishDate: {
        type: "string",
        required: false,
        description:
          "Publication date for the featured article (for top-article variant)",
      },
      category: {
        type: "string",
        required: false,
        description:
          "Category for the featured article (for top-article variant)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the main container",
      },
      containerClassName: {
        type: "string",
        required: false,
        default: "container mx-auto px-4",
        description: "CSS classes for the container element",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for article cards",
      },
      featuredClassName: {
        type: "string",
        required: false,
        description: "CSS classes for featured card",
      },
      headingClassName: {
        type: "string",
        required: false,
        description:
          "CSS classes for the heading element (for top-article variant)",
      },
      authorSectionClassName: {
        type: "string",
        required: false,
        description:
          "CSS classes for the author section (for top-article variant)",
      },
      contentSectionClassName: {
        type: "string",
        required: false,
        description:
          "CSS classes for the content section (for top-article variant)",
      },
      buttonClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the CTA button (for top-article variant)",
      },
      imageContainerClassName: {
        type: "string",
        required: false,
        description:
          "CSS classes for the image container (for top-article variant)",
      },
      baseImageClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the base image (for top-article variant)",
      },
      titleClassName: {
        type: "string",
        required: false,
        description:
          "CSS classes for the article title (for top-article variant)",
      },
      children: {
        type: "object",
        required: false,
        description: "Additional React content to render within the component",
      },
    },
  },
  {
    type: "LegalSection",
    name: "Legal Section",
    description:
      "Component for displaying legal and regulatory information with structured key facts, impacts, and requirements",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      abbreviation: {
        type: "string",
        required: true,
        description: "Short form/abbreviation of the law (e.g., BGB, WEG)",
      },
      fullName: {
        type: "string",
        required: true,
        description: "Complete official name of the law or regulation",
      },
      category: {
        type: "string",
        required: true,
        description:
          "Type of regulation (Gesetz, Verordnung, Richtlinie, Norm, Satzung)",
      },
      description: {
        type: "string",
        required: true,
        description: "Brief overview of what the law/regulation covers",
      },
      keyFacts: {
        type: "array",
        required: false,
        description:
          "Array of important facts with label, value, and optional icon",
      },
      whatItRegulates: {
        type: "array",
        required: true,
        description: "Array of strings describing what areas it regulates",
      },
      impactOnPropertyManagement: {
        type: "string",
        required: true,
        description: "Description of how it affects property management",
      },
      keyRequirements: {
        type: "array",
        required: true,
        description: "Array of main compliance requirements",
      },
      icon: {
        type: "string",
        required: false,
        default: "Scale",
        description: "Lucide icon name for visual identification",
      },
      accentColor: {
        type: "string",
        required: false,
        default: "blue",
        description:
          "Accent color theme (blue, green, purple, orange, red, indigo, teal)",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color CSS class for the section",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
    },
  },
  {
    type: "ProcessOverview",
    name: "Process Overview",
    description:
      "Zeigt einen mehrstufigen Prozess mit Highlights, Einleitungstext, optionalem CTA-Link und begleitendem Bild.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "process-overview",
        description: "Optional anchor id for the section element.",
      },
      title: {
        type: "string",
        required: false,
        default: "Der Ablauf",
        description: "Headline describing the overall process.",
      },
      highlights: {
        type: "array",
        required: false,
        default: [
          { text: "Einfach" },
          { text: "Transparent" },
          { text: "Unverbindlich" },
        ],
        description:
          "Bullet list of key selling points displayed next to the headline.",
      },
      descriptionIntro: {
        type: "string",
        required: false,
        default:
          "Ein Immobiliengutachten muss nicht kompliziert sein. Bei uns starten Sie mit einer kostenfreien Ersteinschätzung – ohne Verpflichtung, aber mit maximaler Transparenz. So wissen Sie von Anfang an, was sinnvoll und wirtschaftlich ist.",
        description: "Introductory paragraph explaining the process.",
      },
      steps: {
        type: "array",
        required: false,
        default: [
          {
            step: "1",
            title: "Angebot & unverbindliche Ersteinschätzung",
            description:
              "Unsere Sachverständigen prüfen kostenlos, ob sich ein Gutachten für Sie lohnt. Sie erhalten eine unverbindliche Ersteinschätung.",
          },
          {
            step: "2",
            title: "Detailliertes Gutachten erhalten",
            description:
              "Bei Bestellung plausibilisieren wir Ihre Daten und erstellen Ihr vollumfängliches, fachlich detailliertes Gutachten - inkl. persönlicher Beratung.",
          },
          {
            step: "3",
            title: "Individuelle Beratung & Erstellung",
            description:
              "Sie bekommen Ihr individuell erstelltes Gutachten -als verlässliche Grundlage für Ihre nächsten Schritte. Auf Wunsch beraten wir Sie dazu persönlich.",
          },
        ],
        description:
          "List of process steps including the step identifier, title, and descriptive text.",
      },
      callToAction: {
        type: "object",
        required: false,
        default: {
          label: "Unverbindlich anfragen",
          href: "https://www.gutachten.org/angebote/",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        description:
          "Configuration for the optional primary call-to-action button.",
      },
      media: {
        type: "object",
        required: false,
        default: {
          src: "https://www.gutachten.org/wp-content/uploads/2025/06/wohnimmobilie-objektfoto-rndg-1.webp",
          alt: "Wohnimmobilie als Hintergrundbild",
        },
        description:
          "Background image configuration shown in the accompanying media column.",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section wrapper.",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Custom classes for the inner container layout.",
      },
      headerClassName: {
        type: "string",
        required: false,
        description: "Custom classes applied to the header column.",
      },
      stepsClassName: {
        type: "string",
        required: false,
        description: "Additional classes for the steps grid wrapper.",
      },
      mediaClassName: {
        type: "string",
        required: false,
        description: "Custom classes for the media container.",
      },
      cardLayoutVariant: {
        type: "string",
        required: false,
        default: "step",
        description:
          "CardLayout variant: 'icon-top', 'cta', 'step', 'link', or 'feature'",
      },
      cardLayoutColumns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns for CardLayout grid (2, 3, or 4)",
      },
      cardLayoutGridClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the CardLayout grid wrapper",
      },
      cardLayoutCardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for individual CardLayout cards",
      },
      cardLayoutCardTitleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for CardLayout card titles",
      },
      cardLayoutCardDescriptionClassName: {
        type: "string",
        required: false,
        description: "CSS classes for CardLayout card descriptions",
      },
      cardLayoutEnableAnimation: {
        type: "boolean",
        required: false,
        default: false,
        description:
          "Whether to enable fade-in animations for CardLayout cards",
      },
      cardLayoutAnimationDelay: {
        type: "number",
        required: false,
        default: 0.1,
        description: "Delay between CardLayout card animations in seconds",
      },
    },
  },
  {
    type: "TaxTopicSection",
    name: "Tax Topic Section",
    description:
      "Component for displaying tax and financial information with key figures, deductions, and practical advice",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main title of the tax topic",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle or abbreviation",
      },
      description: {
        type: "string",
        required: true,
        description: "Detailed explanation of the tax concept",
      },
      keyFigures: {
        type: "array",
        required: false,
        description:
          "Array of important amounts, percentages, or limits with label, value, highlight, and icon",
      },
      whatIsTaxDeductible: {
        type: "array",
        required: false,
        description: "Array of strings describing tax deductible items",
      },
      whatIsNotDeductible: {
        type: "array",
        required: false,
        description: "Array of strings describing non-deductible items",
      },
      practicalAdvice: {
        type: "array",
        required: false,
        description: "Array of practical tips for tax optimization",
      },
      warnings: {
        type: "array",
        required: false,
        description: "Array of important warnings or pitfalls",
      },
      taxLawReference: {
        type: "string",
        required: false,
        description: "Legal reference (e.g., § 21 EStG)",
      },
      icon: {
        type: "string",
        required: false,
        default: "Calculator",
        description: "Lucide icon name for visual identification",
      },
      accentColor: {
        type: "string",
        required: false,
        default: "emerald",
        description:
          "Accent color theme (emerald, blue, amber, purple, rose, teal, indigo)",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color CSS class for the section",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
    },
  },
  {
    type: "TrustBlock",
    name: "Trust Block",
    description:
      "Trust block component displaying logos/certifications in a grid layout with titles and descriptions. Supports two variants: 'default' (card-based layout) and 'glassmorphism' (glassmorphic design with gradient fade effects). Perfect for showcasing partnerships, certifications, or sustainability goals.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description:
          "Visual variant of the trust block. 'default' uses card-based layout, 'glassmorphism' uses glassmorphic design with gradient fade effects. Valid values: 'default', 'glassmorphism'.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the trust block section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional description text",
      },
      logos: {
        type: "array",
        required: true,
        description:
          "Array of logo items. Each item must have 'image' object (with src, alt, width, height), 'title', and optional 'href' and 'description'. Both variants use the same LogoItem format.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "trust-block",
      },
      columns: {
        type: "number",
        required: false,
        default: 5,
        description:
          "Number of columns in the grid (2, 3, 4, 5, or 6). Only applies to 'default' variant.",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      descriptionClassName: {
        type: "string",
        required: false,
      },
      gridClassName: {
        type: "string",
        required: false,
      },
      logoCardClassName: {
        type: "string",
        required: false,
        description:
          "CSS classes for logo cards. Only applies to 'default' variant.",
      },
      logoImageClassName: {
        type: "string",
        required: false,
      },
      logoTitleClassName: {
        type: "string",
        required: false,
      },
      logoDescriptionClassName: {
        type: "string",
        required: false,
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
        description:
          "Enable fade-in animation. Only applies to 'default' variant.",
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
        description:
          "Delay between logo animations in seconds. Only applies to 'default' variant.",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-gradient-to-b from-green-50/30 to-white",
        description:
          "Background color classes. Only applies to 'default' variant.",
      },
      // Glassmorphism variant specific props
      showTitle: {
        type: "boolean",
        required: false,
        default: true,
        description:
          "Whether to display the section title. Only applies to 'glassmorphism' variant.",
      },
      blurAmount: {
        type: "number",
        required: false,
        default: 1.45,
        description:
          "Blur filter amount in pixels for first and last logos. Only applies to 'glassmorphism' variant.",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for the section element. Only applies to 'glassmorphism' variant.",
      },
      logosWrapperClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for the logos wrapper container. Only applies to 'glassmorphism' variant.",
      },
      logoItemClassName: {
        type: "string",
        required: false,
        description:
          "Additional CSS classes for individual logo items. Only applies to 'glassmorphism' variant.",
      },
      underline: {
        type: "boolean",
        required: false,
        default: false,
        description:
          "Show decorative underline on title. Only applies to 'glassmorphism' variant.",
      },
      logoHeight: {
        type: "string",
        required: false,
        default: "h-20",
        description:
          "Height of logo items (CSS class string or number in pixels). Only applies to 'glassmorphism' variant.",
      },
    },
  },
  {
    type: "TrustBlockSlideshow",
    name: "Trust Block Slideshow",
    description:
      "Animated horizontal slideshow component for displaying logos/certifications. Features infinite scroll animation that automatically plays on mobile screens. Perfect for showcasing partnerships or certifications with smooth, continuous scrolling.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: false,
        description: "Main heading for the trust block section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      logos: {
        type: "array",
        required: true,
        description:
          "Array of logo items. Each item must have 'image' object (with src, alt, width, height), 'title', and optional 'href'.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "trust-block",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      titleClassName: {
        type: "string",
        required: false,
      },
      subtitleClassName: {
        type: "string",
        required: false,
      },
      gridClassName: {
        type: "string",
        required: false,
      },
      logoCardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for logo cards",
      },
      logoImageClassName: {
        type: "string",
        required: false,
      },
      animationSpeed: {
        type: "number",
        required: false,
        default: 30,
        description: "Speed of the scroll animation (higher = faster)",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default: "bg-gradient-to-r from-emerald-50 via-white to-emerald-50",
        description: "Background color classes",
      },
      hideTitle: {
        type: "boolean",
        required: false,
        default: false,
        description: "Hide the title and subtitle section",
      },
      borderClassName: {
        type: "string",
        required: false,
        description: "CSS classes for logo card borders",
      },
      titleContainerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title container",
      },
      columns: {
        type: "number",
        required: false,
        default: 5,
        description:
          "Number of columns in the desktop grid (2, 3, 4, 5, or 6). Only applies to desktop view.",
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
        description:
          "Enable fade-in animation for desktop grid. Only applies to desktop view.",
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
        description:
          "Delay between logo animations in seconds for desktop grid. Only applies to desktop view.",
      },
    },
  },
  {
    type: "TeamGrid",
    name: "Team Grid",
    description:
      "Responsive Team Grid component that showcases team members with portraits, roles, highlights and optional contact links.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the team section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle displayed below the title",
      },
      description: {
        type: "string",
        required: false,
        description: "Introductory paragraph for the team section",
      },
      members: {
        type: "array",
        required: true,
        description:
          "Array of team member objects with name, role, image, highlights and optional contact links",
      },
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns to use on larger screens (2, 3 or 4)",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "team",
        description: "Optional HTML id attribute for anchor links",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description: "Background variant for the section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the Section wrapper",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the inner container",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Custom CSS classes for the title",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Custom CSS classes for the subtitle",
      },
      descriptionClassName: {
        type: "string",
        required: false,
        description: "Custom CSS classes for the description paragraph",
      },
      gridClassName: {
        type: "string",
        required: false,
        description: "Custom CSS classes for the grid wrapper",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "Custom CSS classes for each team member card",
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: true,
        description: "Toggle fade-in animation for the cards",
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.08,
        description: "Delay between card animations in seconds",
      },
    },
  },
  {
    type: "PricingComparison",
    name: "Pricing Comparison",
    description:
      "A pricing comparison component that displays multiple pricing tiers side by side. Perfect for showcasing service packages, subscription plans, or product offerings with different feature sets.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "pricing-comparison",
        description: "ID for the pricing section",
      },
      heading: {
        type: "string",
        required: true,
        description: "Main heading for the pricing section",
      },
      headingClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the heading",
      },
      topCtaLabel: {
        type: "string",
        required: false,
        description: "Label for the top CTA button",
      },
      topCtaHref: {
        type: "string",
        required: false,
        description: "Link URL for the top CTA button",
      },
      topCtaIcon: {
        type: "string",
        required: false,
        default: "ArrowUpRight",
        description: "Lucide icon name for the top CTA button",
      },
      topCtaClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the top CTA button",
      },
      tiers: {
        type: "array",
        required: true,
        description:
          "Array of exactly 3 pricing tier objects with title, price, features, and CTA configuration",
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default: "bg-gradient-to-b from-[rgba(143,181,170,0.1)] to-white",
        description: "Background color CSS class for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
    },
  },
  {
    type: "DetailedPriceList",
    name: "Detailed Price List",
    description:
      "A comprehensive price list component that displays base prices, extras, notes, and volume discounts. Perfect for showcasing detailed pricing information for services or products.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "detailed-price-list",
        description: "ID for the price list section",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the price list section",
      },
      introText: {
        type: "string",
        required: false,
        description: "Introductory text displayed below the title",
      },
      basePricesTitle: {
        type: "string",
        required: false,
        default: "Grundpreise je nach Objektgröße (Wohn- und Nutzfläche)",
        description: "Title for the base prices section",
      },
      basePrices: {
        type: "array",
        required: true,
        description: "Array of base price items with size range and price",
      },
      basePricesNote: {
        type: "string",
        required: false,
        description: "Additional note text below the base prices table",
      },
      basePricesWarningText: {
        type: "string",
        required: false,
        description:
          "Warning/description text displayed after the base prices note",
      },
      extrasTitle: {
        type: "string",
        required: false,
        default: "Zubuchbare Extras",
        description: "Title for the extras section",
      },
      extras: {
        type: "array",
        required: true,
        description:
          "Array of extra services with title, price, and description",
      },
      extrasNote: {
        type: "string",
        required: false,
        description: "Additional note text below the extras section",
      },
      extrasWarningText: {
        type: "string",
        required: false,
        description: "Warning/description text displayed after the extras note",
      },
      notesTitle: {
        type: "string",
        required: false,
        default: "Hinweise zur Erstellung",
        description: "Title for the notes section",
      },
      notesText: {
        type: "string",
        required: false,
        description: "Text content for the notes section",
      },
      discountsTitle: {
        type: "string",
        required: false,
        default: "Mengenrabatte*",
        description: "Title for the volume discounts section",
      },
      discounts: {
        type: "array",
        required: false,
        description: "Array of volume discount items",
      },
      discountsNote: {
        type: "string",
        required: false,
        description: "Additional note text below the discounts section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color CSS class for the section",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title",
      },
      introTextClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the intro text",
      },
      titleContainerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title container",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section wrapper",
      },
      basePricesSectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the base prices section",
      },
      basePricesTitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the base prices title",
      },
      basePricesTableClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the base prices table wrapper",
      },
      basePricesTableHeaderClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the table header row",
      },
      basePricesTableRowClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for table rows",
      },
      basePricesTableCellClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for table cells",
      },
      basePricesNoteClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the base prices note",
      },
      basePricesWarningTextClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the base prices warning text",
      },
      extrasSectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the extras section",
      },
      extrasTitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the extras title",
      },
      extrasListClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the extras list",
      },
      extrasItemClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for each extra item",
      },
      extrasNoteClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the extras note",
      },
      extrasWarningTextClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the extras warning text",
      },
      notesSectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the notes section",
      },
      notesTitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the notes title",
      },
      notesTextClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the notes text",
      },
      discountsSectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the discounts section",
      },
      discountsTitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the discounts title",
      },
      discountsListClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the discounts list",
      },
      discountsItemClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for each discount item",
      },
      discountsNoteClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the discounts note",
      },
    },
  },
  {
    type: "TestimonialSlider",
    name: "Testimonial Slider",
    description:
      "Horizontal carousel for customer testimonials with optional controls and configurable text. Perfect for showcasing reviews, testimonials, and social proof.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Main heading for the testimonials section.",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle displayed below the title.",
      },
      description: {
        type: "string",
        required: false,
        description: "Optional descriptive text introducing the testimonials.",
      },
      reviews: {
        type: "array",
        required: true,
        description:
          "Array of individual testimonial items with message, name, and optional role.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "testimonial-slider",
        description: "Optional HTML id attribute for anchor links",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
      headerClassName: {
        type: "string",
        required: false,
        description: "Custom classes for the header region containing titles.",
      },
      listClassName: {
        type: "string",
        required: false,
        description: "Custom classes for the scrollable testimonials list.",
      },
      reviewCardClassName: {
        type: "string",
        required: false,
        description: "Custom classes applied to each testimonial card.",
      },
      controls: {
        type: "object",
        required: false,
        description:
          "Configuration for navigation controls including labels and display options for arrows.",
      },
      ariaLabel: {
        type: "string",
        required: false,
        default: "Kundenbewertungen",
        description: "Accessible label describing the list of testimonials.",
      },
    },
  },
  {
    type: "RecommendedLinks",
    name: "Recommended Links",
    description:
      "Link grid component for displaying recommended resources with hover effects and responsive columns. Perfect for showcasing related services, articles, or navigation links.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: false,
        description: "Main heading for the recommended links section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      links: {
        type: "array",
        required: true,
        description: "Array of link items to display",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "recommended-links",
        description: "HTML id attribute for the section element",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        description: "Theme variant for the section (default or secondary)",
      },
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns (2, 3, or 4)",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "6xl",
        description:
          "Maximum width of the container (sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, full)",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "left",
        description: "Text alignment (left, center, right)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section element",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the container element",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title element",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the subtitle element",
      },
      gridClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the grid layout",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for individual link cards",
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to enable fade-in animations",
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
        description: "Delay between card animations in seconds",
      },
    },
  },
  {
    type: "TaxSavingsShowcase",
    name: "Tax Savings Showcase",
    description:
      "Showcase component displaying property tax savings examples with images, property details, and statistics",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      eyebrow: {
        type: "string",
        required: false,
        default: "echte Praxisbeispiele und überzeugende Ergebnisse.",
        description: "Eyebrow text displayed above the title",
      },
      title: {
        type: "string",
        required: false,
        default: "Steuerersparnis mit verkürzter Nutzungsdauer",
        description: "Main heading for the showcase section",
      },
      description: {
        type: "string",
        required: false,
        default:
          "Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte Abschreibungen Ihre Steuerlast deutlich senken können.",
        description: "Description text displayed below the title",
      },
      ctaText: {
        type: "string",
        required: false,
        default: "Steuerersparnis berechnen",
        description: "Text for the call-to-action button",
      },
      ctaLink: {
        type: "string",
        required: false,
        default: "#",
        description: "URL for the call-to-action button",
      },
      properties: {
        type: "array",
        required: false,
        description: "Array of property cards to display",
      },
      benefitIcon: {
        type: "object",
        required: false,
        description: "Icon configuration for property features (bullet points)",
      },
      ctaPosition: {
        type: "string",
        required: false,
        default: "default",
        description:
          "Position of the CTA button: 'default' (in content section) or 'between-properties' (between first and second property)",
      },
      className: {
        type: "string",
        required: false,
        default: "",
        description: "Additional CSS classes for the component",
      },
    },
  },
  {
    type: "HeroWithFeatureCards",
    name: "Hero With Feature Cards",
    description:
      "Hero section with feature cards grid, logos, and two-column layout with content and image. Displays a hero section with title, description, image, and a grid of feature cards below.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      h1Text: {
        type: "string",
        required: false,
        description: "Main heading text (HeroSection style)",
      },
      title: {
        type: "string",
        required: false,
        description: "Main heading text (Hero/Hero style)",
      },
      titleHighlight: {
        type: "string",
        required: false,
        description: "Text to highlight within the title (HeroSection style)",
      },
      highlightText: {
        type: "string",
        required: false,
        description: "Text to highlight within the title (Hero/Hero style)",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle text",
      },
      subtitleHighlight: {
        type: "string",
        required: false,
        description: "Text to highlight within the subtitle",
      },
      description: {
        type: "string",
        required: false,
        description: "Description text",
      },
      subHeading: {
        type: "string",
        required: false,
        description: "Additional h2 sub-heading",
      },
      image: {
        type: "object",
        required: false,
        description: "Hero image configuration",
      },
      features: {
        type: "array",
        required: false,
        description: "Array of feature cards to display in grid",
      },
      logos: {
        type: "array",
        required: false,
        description: "Array of logos to display above the title",
      },
      imageOverlay: {
        type: "object",
        required: false,
        description:
          "Overlay text to display on the image. Supports profileCard for hero-programatic-image variant",
      },
      variant: {
        type: "string",
        required: false,
        default: "hero-links",
        description:
          "Layout variant: 'hero-links' (default) or 'hero-programatic-image'",
      },
      cta: {
        type: "object",
        required: false,
        description: "Call-to-action button configuration (single button)",
      },
      ctas: {
        type: "array",
        required: false,
        description: "Array of call-to-action buttons for side-by-side layout",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "hero",
        description: "HTML id attribute for the section",
      },
      paddingTop: {
        type: "string",
        required: false,
        description: "Top padding size (sm, md, lg, xl)",
      },
      paddingBottom: {
        type: "string",
        required: false,
        description: "Bottom padding size (sm, md, lg, xl)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the content area",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title",
      },
      subHeadingClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the sub-heading",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle",
      },
      descriptionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the description",
      },
      imageWrapperClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the image wrapper",
      },
      imageClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the image container",
      },
      imgClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the image element",
      },
      customBackgroundClass: {
        type: "string",
        required: false,
        description: "Custom background CSS class",
      },
      logosContainerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the logos container wrapper",
      },
      logoItemClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for individual logo items",
      },
      logoImageClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for logo images",
      },
      logoTextClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for text-based logos",
      },
    },
  },
  {
    type: "ServiceSpectrum",
    name: "Service Spectrum",
    description:
      "A three-column service spectrum section with a header, optional link, and bordered card grid with dividers. Ideal for 'Leistungsspektrum' layouts with icons and bullet points.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: true,
        description: "Section title",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      link: {
        type: "object",
        required: false,
        description:
          "Optional top-right link configuration (label, href, optional icon, external).",
      },
      cards: {
        type: "array",
        required: true,
        description:
          "Array of cards displayed in a 3-column grid. Each card supports icon, title, description, optional badgeText and bullets.",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "leistungsspektrum",
        description: "HTML id attribute for the section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
      headerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the header wrapper",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle",
      },
      linkClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the header link",
      },
      cardsWrapperClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the bordered cards wrapper",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for each card",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the card icon",
      },
      badgeClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the badge",
      },
      bulletDotClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for bullet dot",
      },
      bulletTextClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for bullet text",
      },
    },
  },
  {
    type: "CenteredCtaStatement",
    name: "Centered CTA Statement",
    description:
      "Centered statement section with an icon, large headline, supporting subtitle, and a prominent CTA button. Includes optional vertical center line for the design.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      icon: {
        type: "string",
        required: false,
        default: "Scale",
        description: "Lucide icon name displayed above the title",
      },
      title: {
        type: "string",
        required: true,
        description: "Main headline text",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Supporting subtitle text (supports line breaks)",
      },
      cta: {
        type: "object",
        required: false,
        description: "Primary call-to-action button configuration",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "centered-cta-statement",
        description: "HTML id attribute for the section",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the inner content wrapper",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the icon",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle",
      },
      lineClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the vertical center line",
      },
    },
  },
  {
    type: "CardLayout",
    name: "Card Layout",
    description:
      "Flexible card grid component with multiple layout variants. Displays cards in a responsive grid with icons, titles, and descriptions. Perfect for showcasing features, benefits, or content items.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      title: {
        type: "string",
        required: false,
        description: "Main heading for the card layout section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle text below the title",
      },
      cards: {
        type: "array",
        required: true,
        description: "Array of card items to display in the grid",
      },
      sectionId: {
        type: "string",
        required: false,
        default: "card-layout",
        description: "HTML id attribute for the section element",
      },
      variant: {
        type: "string",
        required: false,
        default: "icon-top",
        description:
          "Layout variant: 'icon-top' (icon at top-left, title, description), 'cta' (with CTA button), 'step' (numbered steps), 'link' (icon top-right), 'feature' (horizontal icon + content with shadcn UI)",
      },
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns in the grid (2, 3, or 4)",
      },
      maxWidth: {
        type: "string",
        required: false,
        default: "6xl",
        description:
          "Maximum width of the container (sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, full)",
      },
      textAlign: {
        type: "string",
        required: false,
        default: "left",
        description: "Text alignment (left, center, right)",
      },
      iconSize: {
        type: "string",
        required: false,
        default: "md",
        description: "Size of icons in the link variant (sm, md, lg)",
      },
      icon: {
        type: "object",
        required: false,
        description:
          "Global icon component (LucideIcon) for link variant - used as fallback when card doesn't have its own icon",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section element",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the container element",
      },
      titleContainerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title container",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title element",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the subtitle element",
      },
      gridClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the grid layout",
      },
      cardClassName: {
        type: "string",
        required: false,
        description: "CSS classes for individual cards",
      },
      cardTitleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for card titles",
      },
      cardDescriptionClassName: {
        type: "string",
        required: false,
        description: "CSS classes for card descriptions",
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default: "bg-white",
        description: "Background color CSS class for the section",
      },
      enableAnimation: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to enable fade-in animations",
      },
      animationDelay: {
        type: "number",
        required: false,
        default: 0.1,
        description: "Delay between card animations in seconds",
      },
      noWrapper: {
        type: "boolean",
        required: false,
        default: false,
        description:
          "If true, render only the grid without Section/Container wrapper (useful for embedding in other components)",
      },
    },
  },
  {
    type: "AfaGuide",
    name: "AfA Guide",
    description:
      "Educational section about German property tax depreciation (AfA - Absetzung für Abnutzung). Displays comprehensive information on calculation methods, applicable costs, and practical examples.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section element",
      },
      backgroundColor: {
        type: "string",
        required: false,
        default:
          "bg-gradient-to-br from-emerald-50 via-emerald-50/70 to-transparent",
        description: "Background color CSS class for the section",
      },
      padding: {
        type: "string",
        required: false,
        default: "py-24 px-4 md:py-32 md:px-8 lg:px-16",
        description: "Padding CSS classes for the section",
      },
    },
  },
  {
    type: "ServiceOffers",
    name: "Service Offers",
    description:
      "Responsive service offers section with featured card and service grid displaying different service offerings. Highly customizable with extensive styling props for layout, colors, spacing, and content visibility.",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      sectionId: {
        type: "string",
        required: false,
        description: "HTML id attribute for the section element",
      },
      title: {
        type: "string",
        required: false,
        default: "Unsere Angebote",
        description: "Main heading for the service offers section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Subtitle text displayed below the title",
      },
      moreInfoText: {
        type: "string",
        required: false,
        default: "Mehr erfahren",
        description: "Text for the more info button",
      },
      moreInfoLink: {
        type: "string",
        required: false,
        default: "#",
        description: "Link URL for the more info button",
      },
      featuredCard: {
        type: "object",
        required: false,
        description:
          "Featured card configuration with icon, title, description, and button",
      },
      cards: {
        type: "array",
        required: false,
        description: "Array of service offer cards to display in the grid",
      },
      // Section styling
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section",
      },
      sectionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section wrapper",
      },
      backgroundClassName: {
        type: "string",
        required: false,
        default: "bg-gray-50",
        description: "Background color CSS class for the section",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container element",
      },
      // Header/Title section
      showTitle: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the title",
      },
      showSubtitle: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the subtitle",
      },
      showMoreInfoButton: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the more info button",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title element",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle element",
      },
      headerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the header section",
      },
      // Button styling
      moreInfoButtonClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the more info button",
      },
      cardButtonClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for card buttons",
      },
      cardButtonIconClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for card button icons",
      },
      // Card styling
      cardClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for all cards",
      },
      cardContentClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for card content",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for card icons",
      },
      cardTitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for card titles",
      },
      cardDescriptionClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for card descriptions",
      },
      // Layout
      columns: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns in the grid (1, 2, 3, or 4)",
      },
      gap: {
        type: "string",
        required: false,
        default: "gap-6",
        description:
          "Gap spacing between cards (e.g., 'gap-4', 'gap-6', 'gap-8')",
      },
      enableHoverEffect: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to enable hover effects on cards",
      },
      hoverClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for hover effects",
      },
    },
  },
  {
    type: "Pagination",
    name: "Pagination",
    description:
      "Pagination component with Zurück/Weiter buttons and page numbers, matching the exact design specification",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      currentPage: {
        type: "number",
        required: true,
        description: "Current active page (1-indexed)",
      },
      totalPages: {
        type: "number",
        required: true,
        description: "Total number of pages",
      },
      onPageChange: {
        type: "function",
        required: true,
        description:
          "Callback function when page changes. Receives the new page number as argument.",
      },
      className: {
        type: "string",
        required: false,
        description: "Custom className for the container",
      },
      backLabel: {
        type: "string",
        required: false,
        default: "Zurück",
        description: "Custom text for the Back button",
      },
      nextLabel: {
        type: "string",
        required: false,
        default: "Weiter",
        description: "Custom text for the Next button",
      },
      maxVisiblePages: {
        type: "number",
        required: false,
        default: 2,
        description:
          "Maximum number of page numbers to show before/after current page",
      },
    },
  },
  {
    type: "EmbedScript",
    name: "Embed Script",
    description:
      "A reusable component for embedding external scripts and widgets like job boards, calendars, forms, and other third-party integrations. Supports custom script attributes and flexible styling options.",
    props: {
      id: {
        type: "string",
        required: true,
        description: "Unique identifier for the embed container and section",
      },
      scriptSrc: {
        type: "string",
        required: true,
        description: "The script source URL to load",
      },
      mountId: {
        type: "string",
        required: true,
        description:
          "The container ID where the script should mount its content",
      },
      title: {
        type: "string",
        required: false,
        description: "Optional title for the section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle/description text",
      },
      titleLevel: {
        type: "number",
        required: false,
        default: 2,
        description: "Heading level for the title (1-6)",
      },
      scriptAttributes: {
        type: "object",
        required: false,
        default: {},
        description:
          "Additional script attributes as key-value pairs (e.g., data-mount-in)",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the section container",
      },
      titleContainerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title container",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle",
      },
      embedContainerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the embed container div",
      },
      defer: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to defer script loading",
      },
      async: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to async load script",
      },
      scriptType: {
        type: "string",
        required: false,
        default: "text/javascript",
        description: "Script type attribute",
      },
    },
  },
  {
    type: "Iframe",
    name: "Iframe",
    description:
      "A server-side rendered component for embedding iframes. Perfect for embedding external content like Cal.com booking widgets, forms, and other third-party integrations. This component is server-rendered for better SEO and performance.",
    props: {
      id: {
        type: "string",
        required: false,
        description: "Unique identifier for the iframe container",
      },
      src: {
        type: "string",
        required: true,
        description: "The iframe source URL",
      },
      title: {
        type: "string",
        required: false,
        default: "Embedded content",
        description: "Title for the iframe (accessibility)",
      },
      height: {
        type: "string | number",
        required: false,
        default: 600,
        description: "Height of the iframe (number in pixels or string like '600px')",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the iframe",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the container",
      },
      allowFullScreen: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to allow fullscreen",
      },
      loading: {
        type: "string",
        required: false,
        default: "lazy",
        description: "Loading strategy ('lazy' or 'eager')",
      },
      sectionTitle: {
        type: "string",
        required: false,
        description: "Optional title for the section",
      },
      subtitle: {
        type: "string",
        required: false,
        description: "Optional subtitle/description text",
      },
      titleLevel: {
        type: "number",
        required: false,
        default: 2,
        description: "Heading level for the title (1-6)",
      },
      titleContainerClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title container",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the title",
      },
      subtitleClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the subtitle",
      },
      allow: {
        type: "string",
        required: false,
        description: "Additional iframe allow attribute",
      },
      name: {
        type: "string",
        required: false,
        description: "Name attribute for the iframe",
      },
      dataCalLink: {
        type: "string",
        required: false,
        description: "Data attribute for Cal.com links",
      },
    },
  },
  {
    type: "TwoColumnFeatureSection",
    name: "TwoColumnFeatureSection",
    description:
      "A two-column layout component with text content on the left and feature cards on the right",
    props: {
      id: {
        type: "string",
        required: false,
        description:
          "Optional unique identifier for the component. Used for stable component references in programmatic overrides.",
      },
      heading: {
        type: "string",
        required: true,
        description: "Main heading for the left column",
      },
      paragraphs: {
        type: "array",
        required: true,
        description: "Array of paragraph texts for the left column",
        items: {
          type: "string",
        },
      },
      features: {
        type: "array",
        required: true,
        description: "Array of feature cards for the right column",
        items: {
          type: "object",
          properties: {
            icon: {
              type: "string",
              description: "Icon name or image path",
            },
            title: {
              type: "string",
              required: true,
            },
            description: {
              type: "string",
              required: true,
            },
          },
        },
      },
      sectionId: {
        type: "string",
        default: "two-column-feature-section",
      },
      className: {
        type: "string",
        required: false,
      },
      containerClassName: {
        type: "string",
        required: false,
      },
      headingClassName: {
        type: "string",
        required: false,
      },
      paragraphClassName: {
        type: "string",
        required: false,
      },
      borderColor: {
        type: "string",
        default: "#F0F5F9",
      },
    },
  },
];

/**
 * Get schema for a specific component by type
 */
export function getComponentSchema(
  componentType: string
): ComponentSchema | undefined {
  return componentSchemas.find((schema) => schema.type === componentType);
}

/**
 * Get all component schemas
 */
export function getAllComponentSchemas(): ComponentSchema[] {
  return componentSchemas;
}

/**
 * Get list of all registered component types
 */
export function getComponentTypes(): string[] {
  return componentSchemas.map((schema) => schema.type);
}

/**
 * Validate if a component type exists in schemas
 */
export function hasComponentSchema(componentType: string): boolean {
  return componentSchemas.some((schema) => schema.type === componentType);
}

/**
 * Validate component properties against schema
 */
export function validateComponentProps(component: PageComponent): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const schema = getComponentSchema(component.type);

  if (!schema) {
    errors.push(`Unknown component type: ${component.type}`);
    return { valid: false, errors };
  }

  // Check required properties
  for (const [propName, propSchema] of Object.entries(schema.props)) {
    if (propSchema.required && !(propName in component)) {
      errors.push(
        `Missing required property '${propName}' for component type '${component.type}'`
      );
    }
  }

  // Check for unknown properties
  for (const propName of Object.keys(component)) {
    if (propName === "type") continue; // Skip the type property
    if (!(propName in schema.props)) {
      errors.push(
        `Unknown property '${propName}' for component type '${component.type}'. Valid properties are: ${Object.keys(schema.props).join(", ")}`
      );
    }
  }

  // Validate icon names
  const iconErrors = validateIconNames(component, component.type);
  errors.push(...iconErrors);

  return { valid: errors.length === 0, errors };
}

/**
 * Validate subpage content against component schemas
 */
export function validateSubpageContent(content: SubpageContent): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!Array.isArray(content)) {
    errors.push("Subpage content must be an array of components");
    return { valid: false, errors };
  }

  content.forEach((component, index) => {
    const validation = validateComponentProps(component);
    if (!validation.valid) {
      // Build component identifier with metadata
      const componentInfo: string[] = [];
      componentInfo.push(`#${index + 1}`); // 1-based index for readability
      componentInfo.push(`type="${component.type}"`);
      if (component.id) {
        componentInfo.push(`id="${component.id}"`);
      }
      const componentIdentifier = componentInfo.join(", ");

      validation.errors.forEach((error) => {
        errors.push(`Component ${componentIdentifier}: ${error}`);
      });
    }
  });

  return { valid: errors.length === 0, errors };
}
