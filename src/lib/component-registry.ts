import React from "react";
import logger from "./logger";
import Hero from "@/components/blocks/HeroSection/Hero";
import TextImageSection from "@/components/blocks/TextImageSection/TextImageSection";
import Header from "@/components/blocks/Header/Header";
import Footer from "@/components/blocks/Footer/Footer";
import { Heading } from "@/components/blocks/Heading/Heading";
import { Lexikon } from "@/components/blocks/Lexikon/Lexikon";
import { Ratgeber } from "@/components/blocks/Ratgeber/Ratgeber";
import { LegalSection } from "@/components/blocks/LegalSection/LegalSection";
import { TaxTopicSection } from "@/components/blocks/TaxTopicSection/TaxTopicSection";
import ProcessOverview from "@/components/blocks/ProcessOverview";
import { SmoothScrollButton } from "@/components/blocks/SmoothScrollButton/SmoothScrollButton";
import { componentSchemas, ComponentSchema } from "./component-schemas";
import Steps from "@/components/blocks/Steps/Steps";
import { StructuredData } from "@/components/StructuredData";
import ClientComponent from "@/components/blocks/ClientComponent/ClientComponent";
import CustomComponent from "@/components/blocks/CustomComponent/CustomComponent";
import Datenschutz from "@/components/blocks/Datenschutz/Datenschutz";
import Impressum from "@/components/blocks/Impressum/Impressum";
import { FAQ } from "@/components/blocks/FAQ/FAQ";
import Cta from "@/components/blocks/Cta/Cta";
import FlexibleCard from "@/components/blocks/FlexibleCard/FlexibleCard";
import { About } from "@/components/blocks/About/About";
import { FinalCTA } from "@/components/blocks/FinalCTA/FinalCTA";
import { USPs } from "@/components/blocks/USPs/USPs";
import ApplicationProcess from "@/components/blocks/ApplicationProcess/ApplicationProcess";
import { BaresGeldSparenSection } from "@/components/blocks/BaresGeldSparenSection";
import { PricingSection } from "@/components/blocks/PricingSection";
import { References } from "@/components/blocks/References/References";
import { Services } from "@/components/blocks/Services/Services";
import { LeadForm } from "@/components/blocks/LeadForm/LeadForm";
import { TrustBlock } from "@/components/blocks/TrustBlock/TrustBlock";
import { TrustBlockSlideshow } from "@/components/blocks/TrustBlock/TrustBlockSlideshow";
import { TwoColumnFeatureSection } from "@/components/blocks/TwoColumnFeatureSection/TwoColumnFeatureSection";
import { TeamGrid } from "@/components/blocks/TeamGrid";
import { PricingComparison } from "@/components/blocks/PricingComparison";
import { DetailedPriceList } from "@/components/blocks/DetailedPriceList";
import { TestimonialSlider } from "@/components/blocks/TestimonialSlider";
import { RecommendedLinks } from "@/components/blocks/RecommendedLinks";
import { TaxSavingsShowcase } from "@/components/blocks/TaxSavingsShowcase";
import { HeroWithFeatureCards } from "@/components/blocks/HeroWithFeatureCards";
import { CenteredCtaStatement } from "@/components/blocks/CenteredCtaStatement";
import { CardLayout } from "@/components/blocks/CardLayout";
import ServiceOffers from "@/components/blocks/ServiceOffers/ServiceOffers";
import { Pagination } from "@/components/blocks/Pagination/Pagination";
import EmbedScript from "@/components/blocks/EmbedScript/EmbedScript";
import Iframe from "@/components/blocks/Iframe/Iframe";
import { ServiceSpectrum } from "@/components/blocks/ServiceSpectrum";

// Component registry entry
export interface ComponentRegistryEntry {
  name: string;
  component: React.ComponentType<any>;
  schema: ComponentSchema;
  category?: string;
  tags?: string[];
}

// Component registry type
export type ComponentRegistry = ComponentRegistryEntry[];

// Component registry
export const componentRegistry: ComponentRegistry = [
  {
    name: "Hero",
    component: Hero,
    schema: componentSchemas.find((s) => s.type === "Hero")!,
    category: "layout",
    tags: ["hero", "banner", "cta", "landing"],
  },
  {
    name: "TextImageSection",
    component: TextImageSection,
    schema: componentSchemas.find((s) => s.type === "TextImageSection")!,
    category: "content",
    tags: ["text", "image", "content", "section", "marketing"],
  },
  {
    name: "Header",
    component: Header,
    schema: componentSchemas.find((s) => s.type === "Header")!,
    category: "navigation",
    tags: ["header", "nav", "branding", "menu"],
  },
  {
    name: "Footer",
    component: Footer,
    schema: componentSchemas.find((s) => s.type === "Footer")!,
    category: "navigation",
    tags: ["footer", "links", "social", "contact"],
  },
  {
    name: "Heading",
    component: Heading,
    schema: componentSchemas.find((s) => s.type === "Heading")!,
    category: "typography",
    tags: ["heading", "title", "text", "semantic"],
  },
  {
    name: "Lexikon",
    component: Lexikon,
    schema: componentSchemas.find((s) => s.type === "Lexikon")!,
    category: "content",
    tags: ["lexicon", "glossary", "dictionary", "reference"],
  },
  {
    name: "Ratgeber",
    component: Ratgeber,
    schema: componentSchemas.find((s) => s.type === "Ratgeber")!,
    category: "content",
    tags: ["blog", "articles", "ratgeber", "content", "markdown"],
  },
  {
    name: "SmoothScrollButton",
    component: SmoothScrollButton,
    schema: componentSchemas.find((s) => s.type === "SmoothScrollButton")!,
    category: "interaction",
    tags: ["button", "scroll", "navigation", "smooth"],
  },
  {
    name: "Steps",
    component: Steps,
    schema: componentSchemas.find((s) => s.type === "Steps")!,
    category: "content",
    tags: ["steps", "process", "tutorial", "workflow"],
  },
  {
    name: "ProcessOverview",
    component: ProcessOverview,
    schema: componentSchemas.find((s) => s.type === "ProcessOverview")!,
    category: "content",
    tags: ["process", "workflow", "steps", "overview", "cta"],
  },
  {
    name: "StructuredData",
    component: StructuredData,
    schema: componentSchemas.find((s) => s.type === "StructuredData")!,
    category: "seo",
    tags: ["structured-data", "seo", "schema", "json-ld"],
  },
  {
    name: "ClientComponent",
    component: ClientComponent,
    schema: componentSchemas.find((s) => s.type === "ClientComponent")!,
    category: "interactive",
    tags: ["client", "interactive", "custom", "component"],
  },
  {
    name: "CustomComponent",
    component: CustomComponent,
    schema: componentSchemas.find((s) => s.type === "CustomComponent")!,
    category: "interactive",
    tags: ["custom", "flexible", "component", "dynamic"],
  },
  {
    name: "Cta",
    component: Cta,
    schema: componentSchemas.find((s) => s.type === "Cta")!,
    category: "cta",
    tags: ["cta", "call-to-action", "button", "conversion", "marketing"],
  },
  {
    name: "FlexibleCard",
    component: FlexibleCard,
    schema: componentSchemas.find((s) => s.type === "FlexibleCard")!,
    category: "content",
    tags: ["card", "content", "flexible", "interactive"],
  },
  {
    name: "Datenschutz",
    component: Datenschutz,
    schema: componentSchemas.find((s) => s.type === "Datenschutz")!,
    category: "legal",
    tags: ["datenschutz", "privacy", "gdpr", "legal", "compliance"],
  },
  {
    name: "Impressum",
    component: Impressum,
    schema: componentSchemas.find((s) => s.type === "Impressum")!,
    category: "legal",
    tags: ["impressum", "legal", "tmg", "company", "compliance"],
  },
  {
    name: "FAQ",
    component: FAQ,
    schema: componentSchemas.find((s) => s.type === "FAQ")!,
    category: "content",
    tags: ["faq", "accordion", "questions", "interactive", "content"],
  },
  {
    name: "About",
    component: About,
    schema: componentSchemas.find((s) => s.type === "About")!,
    category: "content",
    tags: ["about", "company", "information", "statistics", "highlights"],
  },
  {
    name: "FinalCTA",
    component: FinalCTA,
    schema: componentSchemas.find((s) => s.type === "FinalCTA")!,
    category: "cta",
    tags: ["cta", "call-to-action", "button", "conversion", "marketing"],
  },
  {
    name: "BaresGeldSparenSection",
    component: BaresGeldSparenSection,
    schema: componentSchemas.find((s) => s.type === "BaresGeldSparenSection")!,
    category: "content",
    tags: [
      "marketing",
      "benefits",
      "cta",
      "checklist",
      "cards",
      "restnutzungsdauer",
    ],
  },
  {
    name: "PricingSection",
    component: PricingSection,
    schema: componentSchemas.find((s) => s.type === "PricingSection")!,
    category: "content",
    tags: [
      "pricing",
      "costs",
      "pricing-section",
      "cta",
      "prices",
    ],
  },
  {
    name: "USPs",
    component: USPs,
    schema: componentSchemas.find((s) => s.type === "USPs")!,
    category: "content",
    tags: ["usps", "benefits", "features", "selling-points", "icons"],
  },
  {
    name: "ApplicationProcess",
    component: ApplicationProcess,
    schema: componentSchemas.find((s) => s.type === "ApplicationProcess")!,
    category: "content",
    tags: [
      "process",
      "workflow",
      "steps",
      "hiring",
      "recruitment",
      "timeline",
      "application",
    ],
  },
  {
    name: "References",
    component: References,
    schema: componentSchemas.find((s) => s.type === "References")!,
    category: "content",
    tags: ["references", "testimonials", "reviews", "case-studies", "ratings"],
  },
  {
    name: "Services",
    component: Services,
    schema: componentSchemas.find((s) => s.type === "Services")!,
    category: "content",
    tags: ["services", "features", "icons", "bullets", "action-buttons"],
  },
  {
    name: "LeadForm",
    component: LeadForm,
    schema: componentSchemas.find((s) => s.type === "LeadForm")!,
    category: "form",
    tags: ["form", "lead", "contact", "validation", "submit"],
  },
  {
    name: "LegalSection",
    component: LegalSection,
    schema: componentSchemas.find((s) => s.type === "LegalSection")!,
    category: "content",
    tags: ["legal", "regulation", "law", "compliance", "content"],
  },
  {
    name: "TaxTopicSection",
    component: TaxTopicSection,
    schema: componentSchemas.find((s) => s.type === "TaxTopicSection")!,
    category: "content",
    tags: ["tax", "finance", "deduction", "calculation", "money"],
  },
  {
    name: "TrustBlock",
    component: TrustBlock,
    schema: componentSchemas.find((s) => s.type === "TrustBlock")!,
    category: "content",
    tags: ["trust", "logos", "partners", "certifications", "badges"],
  },
  {
    name: "TrustBlockSlideshow",
    component: TrustBlockSlideshow,
    schema: componentSchemas.find((s) => s.type === "TrustBlockSlideshow")!,
    category: "content",
    tags: [
      "trust",
      "logos",
      "partners",
      "certifications",
      "badges",
      "slideshow",
      "animation",
    ],
  },
  {
    name: "TwoColumnFeatureSection",
    component: TwoColumnFeatureSection,
    schema: componentSchemas.find((s) => s.type === "TwoColumnFeatureSection")!,
    category: "content",
    tags: ["layout", "features", "two-column", "cards", "content"],
  },
  {
    name: "TeamGrid",
    component: TeamGrid,
    schema: componentSchemas.find((s) => s.type === "TeamGrid")!,
    category: "content",
    tags: ["team", "members", "culture", "people", "grid"],
  },
  {
    name: "PricingComparison",
    component: PricingComparison,
    schema: componentSchemas.find((s) => s.type === "PricingComparison")!,
    category: "content",
    tags: ["pricing", "comparison", "tiers", "plans", "packages", "cta"],
  },
  {
    name: "DetailedPriceList",
    component: DetailedPriceList,
    schema: componentSchemas.find((s) => s.type === "DetailedPriceList")!,
    category: "content",
    tags: ["pricing", "price-list", "extras", "discounts", "table"],
  },
  {
    name: "TestimonialSlider",
    component: TestimonialSlider,
    schema: componentSchemas.find((s) => s.type === "TestimonialSlider")!,
    category: "content",
    tags: ["reviews", "testimonials", "social-proof", "carousel"],
  },
  {
    name: "RecommendedLinks",
    component: RecommendedLinks,
    schema: componentSchemas.find((s) => s.type === "RecommendedLinks")!,
    category: "content",
    tags: ["links", "resources", "navigation", "grid"],
  },
  {
    name: "TaxSavingsShowcase",
    component: TaxSavingsShowcase,
    schema: componentSchemas.find((s) => s.type === "TaxSavingsShowcase")!,
    category: "content",
    tags: ["tax", "savings", "showcase", "properties", "finance"],
  },
  {
    name: "HeroWithFeatureCards",
    component: HeroWithFeatureCards,
    schema: componentSchemas.find((s) => s.type === "HeroWithFeatureCards")!,
    category: "hero",
    tags: ["hero", "banner", "feature-cards", "links", "grid"],
  },
  {
    name: "CenteredCtaStatement",
    component: CenteredCtaStatement,
    schema: componentSchemas.find((s) => s.type === "CenteredCtaStatement")!,
    category: "cta",
    tags: ["cta", "centered", "statement", "button"],
  },
  {
    name: "ServiceSpectrum",
    component: ServiceSpectrum,
    schema: componentSchemas.find((s) => s.type === "ServiceSpectrum")!,
    category: "content",
    tags: ["services", "spectrum", "cards", "grid", "overview"],
  },
  {
    name: "CardLayout",
    component: CardLayout,
    schema: componentSchemas.find((s) => s.type === "CardLayout")!,
    category: "content",
    tags: ["cards", "grid", "layout", "content", "features"],
  },
  {
    name: "ServiceOffers",
    component: ServiceOffers,
    schema: componentSchemas.find((s) => s.type === "ServiceOffers")!,
    category: "content",
    tags: ["services", "offers", "cards", "grid", "featured"],
  },
  {
    name: "Pagination",
    component: Pagination,
    schema: componentSchemas.find((s) => s.type === "Pagination")!,
    category: "navigation",
    tags: ["pagination", "navigation", "pages", "paging"],
  },
  {
    name: "EmbedScript",
    component: EmbedScript,
    schema: componentSchemas.find((s) => s.type === "EmbedScript")!,
    category: "embed",
    tags: ["embed", "script", "widget", "external", "integration"],
  },
  {
    name: "Iframe",
    component: Iframe,
    schema: componentSchemas.find((s) => s.type === "Iframe")!,
    category: "embed",
    tags: ["embed", "iframe", "external", "integration", "server"],
  },
];

// Validate all components are defined and schemas exist
if (typeof window === "undefined") {
  // Only run validation on server-side
  componentRegistry.forEach((entry) => {
    if (!entry.component) {
      logger.error(
        `❌ Component "${entry.name}" is undefined in registry. Check import.`
      );
    }
    if (!entry.schema) {
      logger.error(
        `❌ Schema for component "${entry.name}" is missing. Check componentSchemas.`
      );
    }
    // Check if component is actually a valid React component
    if (entry.component && typeof entry.component !== "function") {
      logger.error(
        `❌ Component "${entry.name}" is not a valid React component. Got: ${typeof entry.component}`
      );
    }
  });
}

// Registry utility functions
export class ComponentRegistryService {
  private static registry = componentRegistry;

  /**
   * Get a component by name
   */
  static getComponent(name: string): React.ComponentType<any> | null {
    const entry = this.registry.find((entry) => entry.name === name);
    if (!entry) {
      logger.warn(
        `Component "${name}" not found in registry. Available components: ${this.registry.map((e) => e.name).join(", ")}`
      );
      return null;
    }
    if (!entry.component) {
      logger.error(
        `Component "${name}" exists in registry but component is undefined. Check import.`
      );
      return null;
    }
    if (typeof entry.component !== "function") {
      logger.error(
        `Component "${name}" is not a valid React component. Got: ${typeof entry.component}`
      );
      return null;
    }
    return entry.component;
  }

  /**
   * Get component schema for validation and documentation
   */
  static getSchema(name: string): ComponentSchema | null {
    const entry = this.registry.find((entry) => entry.name === name);
    return entry ? entry.schema : null;
  }

  /**
   * Get all registered components
   */
  static getAllComponents(): ComponentRegistry {
    return this.registry;
  }

  /**
   * Get components by category
   */
  static getComponentsByCategory(category: string): ComponentRegistry {
    return this.registry.filter((entry) => entry.category === category);
  }

  /**
   * Get components by tag
   */
  static getComponentsByTag(tag: string): ComponentRegistry {
    return this.registry.filter((entry) => entry.tags?.includes(tag));
  }

  /**
   * Validate component props against schema
   */
  static validateProps(
    componentName: string,
    props: Record<string, unknown>
  ): {
    valid: boolean;
    errors: string[];
  } {
    const schema = this.getSchema(componentName);
    if (!schema) {
      return {
        valid: false,
        errors: [`Component "${componentName}" not found`],
      };
    }

    const errors: string[] = [];

    // Check required props
    for (const [propName, propSchema] of Object.entries(schema.props)) {
      if (propSchema.required && !(propName in props)) {
        errors.push(`Required prop "${propName}" is missing`);
      }
    }

    // Check prop types (basic validation)
    for (const [propName, value] of Object.entries(props)) {
      const propSchema = schema.props[propName];
      if (propSchema) {
        const expectedType = propSchema.type;
        const actualType = Array.isArray(value) ? "array" : typeof value;

        if (expectedType !== actualType) {
          errors.push(
            `Prop "${propName}" should be ${expectedType}, got ${actualType}`
          );
        }
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Register a new component
   */
  static registerComponent(
    name: string,
    component: React.ComponentType<any>,
    schema: ComponentSchema,
    category?: string,
    tags?: string[]
  ): void {
    const existingIndex = this.registry.findIndex(
      (entry) => entry.name === name
    );
    const newEntry = {
      name,
      component,
      schema,
      category,
      tags,
    };

    if (existingIndex >= 0) {
      this.registry[existingIndex] = newEntry;
    } else {
      this.registry.push(newEntry);
    }
  }

  /**
   * Unregister a component
   */
  static unregisterComponent(name: string): boolean {
    const index = this.registry.findIndex((entry) => entry.name === name);
    if (index >= 0) {
      this.registry.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get component documentation
   */
  static getDocumentation(): Record<
    string,
    {
      name: string;
      description: string;
      category?: string;
      tags?: string[];
      props: Record<string, any>;
    }
  > {
    return Object.fromEntries(
      Object.entries(this.registry).map(([name, entry]) => [
        name,
        {
          name: entry.schema.name,
          description: entry.schema.description,
          category: entry.category,
          tags: entry.tags,
          props: entry.schema.props,
        },
      ])
    );
  }
}

// Export the service as default
export default ComponentRegistryService;
