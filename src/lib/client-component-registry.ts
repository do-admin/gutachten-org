import React from "react";
import AfACalculatorWidget from "@/components/custom/AfACalculatorWidget/AfACalculatorWidget";
import ImmoverdeMapSection from "@/components/custom/ImmoverdeMapSection/ImmoverdeMapSection";
import IframeEmbed from "@/components/custom/IframeEmbed/IframeEmbed";

// Client component registry entry
export interface ClientComponentRegistryEntry {
  name: string;
  component: React.ComponentType<any>;
  description?: string;
  category?: string;
  tags?: string[];
  serverDataFetcher?: (
    props?: Record<string, unknown>
  ) => Promise<Record<string, unknown>>;
}

// Client component registry type
export type ClientComponentRegistry = ClientComponentRegistryEntry[];

// Import client components
// import AfACalculatorClient from '@/examples/AfACalculatorClient';

// Client component registry
export const clientComponentRegistry: ClientComponentRegistry = [
  {
    name: "AfACalculatorWidget",
    component: AfACalculatorWidget,
    description:
      "Interaktiver AfA Rechner zur Berechnung der Abschreibung für Immobilien mit grafischer Auswertung.",
    category: "tools",
    tags: ["calculator", "afa", "immobilien", "steuer", "abschreibung"],
  },
  {
    name: "ImmoverdeMapSection",
    component: ImmoverdeMapSection,
    description:
      "Standortsektion mit Ansprechpartnern, Öffnungszeiten und eingebettetem Google Maps Kartenausschnitt für das Immoverde Büro in Hannover.",
    category: "contact",
    tags: ["map", "standort", "immoverde", "kontakt"],
  },
  {
    name: "IframeEmbed",
    component: IframeEmbed,
    description:
      "Einfache Iframe-Einbettung für externe Formulare und Inhalte.",
    category: "embed",
    tags: ["iframe", "embed", "form", "external"],
  },
];

// Registry utility functions
export class ClientComponentRegistryService {
  private static registry = clientComponentRegistry;

  /**
   * Get a client component by name
   */
  static getComponent(name: string): React.ComponentType<any> | null {
    const entry = this.registry.find((entry) => entry.name === name);
    return entry ? entry.component : null;
  }

  /**
   * Get client component registry entry
   */
  static getEntry(name: string): ClientComponentRegistryEntry | null {
    return this.registry.find((entry) => entry.name === name) || null;
  }

  /**
   * Get all registered client components
   */
  static getAllComponents(): ClientComponentRegistry {
    return this.registry;
  }

  /**
   * Get client components by category
   */
  static getComponentsByCategory(category: string): ClientComponentRegistry {
    return this.registry.filter((entry) => entry.category === category);
  }

  /**
   * Get client components by tag
   */
  static getComponentsByTag(tag: string): ClientComponentRegistry {
    return this.registry.filter((entry) => entry.tags?.includes(tag));
  }

  /**
   * Check if a client component exists
   */
  static hasComponent(name: string): boolean {
    return this.registry.some((entry) => entry.name === name);
  }

  /**
   * Register a new client component
   */
  static registerComponent(
    name: string,
    component: React.ComponentType<any>,
    options?: {
      description?: string;
      category?: string;
      tags?: string[];
      serverDataFetcher?: (
        props?: Record<string, unknown>
      ) => Promise<Record<string, unknown>>;
    }
  ): void {
    const existingIndex = this.registry.findIndex(
      (entry) => entry.name === name
    );
    const newEntry: ClientComponentRegistryEntry = {
      name,
      component,
      description: options?.description,
      category: options?.category,
      tags: options?.tags,
      serverDataFetcher: options?.serverDataFetcher,
    };

    if (existingIndex >= 0) {
      this.registry[existingIndex] = newEntry;
    } else {
      this.registry.push(newEntry);
    }
  }

  /**
   * Unregister a client component
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
   * Get client component documentation
   */
  static getDocumentation(): Record<
    string,
    {
      name: string;
      description?: string;
      category?: string;
      tags?: string[];
      hasServerDataFetcher: boolean;
    }
  > {
    return Object.fromEntries(
      this.registry.map((entry) => [
        entry.name,
        {
          name: entry.name,
          description: entry.description,
          category: entry.category,
          tags: entry.tags,
          hasServerDataFetcher: !!entry.serverDataFetcher,
        },
      ])
    );
  }
}

// Export the service as default
export default ClientComponentRegistryService;
