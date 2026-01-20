import React from "react";

// Custom component registry entry
export interface CustomComponentRegistryEntry {
  name: string;
  component: React.ComponentType<any>;
  description?: string;
  category?: string;
  tags?: string[];
  componentType?: "client" | "server" | "hybrid";
  importPath?: string;
  serverDataFetcher?: (
    props?: Record<string, unknown>
  ) => Promise<Record<string, unknown>>;
  renderMode?: "immediate" | "lazy" | "dynamic";
  dependencies?: string[];
  version?: string;
}

// Custom component registry type
export type CustomComponentRegistry = CustomComponentRegistryEntry[];

// Import various component types
// import AfACalculatorClient from '@/examples/AfACalculatorClient';

// Custom component registry - can contain any type of component
export const customComponentRegistry: CustomComponentRegistry = [
  // Client Components
  // {
  //   name: 'AfACalculatorClient',
  //   component: AfACalculatorClient,
  //   description: 'AfA Calculator for real estate depreciation calculations',
  //   category: 'calculator',
  //   tags: ['calculator', 'afa', 'real-estate', 'depreciation', 'tax'],
  //   componentType: 'client',
  //   serverDataFetcher: async (props) => {
  //     return {
  //       faqData: await fetchFAQData(),
  //       taxRates: await fetchTaxRates(),
  //     };
  //   },
  //   renderMode: 'immediate',
  // },
  // Example server component (would be imported if it existed)
  // {
  //   name: 'ServerDataTable',
  //   component: ServerDataTable,
  //   description: 'Server-rendered data table with SEO optimization',
  //   category: 'data-display',
  //   tags: ['table', 'data', 'server', 'seo'],
  //   componentType: 'server',
  //   serverDataFetcher: async (props) => {
  //     return {
  //       data: await fetchTableData(),
  //       columns: await getTableColumns(),
  //     };
  //   },
  //   renderMode: 'immediate',
  // },
  // Example hybrid component (would be imported if it existed)
  // {
  //   name: 'HybridChart',
  //   component: HybridChart,
  //   description: 'Chart component with server-side data and client-side interactivity',
  //   category: 'visualization',
  //   tags: ['chart', 'data', 'interactive', 'hybrid'],
  //   componentType: 'hybrid',
  //   serverDataFetcher: async (props) => {
  //     return {
  //       chartData: await fetchChartData(),
  //       config: await getChartConfig(),
  //     };
  //   },
  //   renderMode: 'lazy',
  // },
];

// Registry utility functions
export class CustomComponentRegistryService {
  private static registry = customComponentRegistry;

  /**
   * Get a custom component by name
   */
  static getComponent(name: string): React.ComponentType<any> | null {
    const entry = this.registry.find((entry) => entry.name === name);
    return entry ? entry.component : null;
  }

  /**
   * Get custom component registry entry
   */
  static getEntry(name: string): CustomComponentRegistryEntry | null {
    return this.registry.find((entry) => entry.name === name) || null;
  }

  /**
   * Get all registered custom components
   */
  static getAllComponents(): CustomComponentRegistry {
    return this.registry;
  }

  /**
   * Get custom components by category
   */
  static getComponentsByCategory(category: string): CustomComponentRegistry {
    return this.registry.filter((entry) => entry.category === category);
  }

  /**
   * Get custom components by tag
   */
  static getComponentsByTag(tag: string): CustomComponentRegistry {
    return this.registry.filter((entry) => entry.tags?.includes(tag));
  }

  /**
   * Get custom components by type
   */
  static getComponentsByType(
    componentType: "client" | "server" | "hybrid"
  ): CustomComponentRegistry {
    return this.registry.filter(
      (entry) => entry.componentType === componentType
    );
  }

  /**
   * Check if a custom component exists
   */
  static hasComponent(name: string): boolean {
    return this.registry.some((entry) => entry.name === name);
  }

  /**
   * Register a new custom component
   */
  static registerComponent(
    name: string,
    component: React.ComponentType<any>,
    options?: {
      description?: string;
      category?: string;
      tags?: string[];
      componentType?: "client" | "server" | "hybrid";
      importPath?: string;
      serverDataFetcher?: (
        props?: Record<string, unknown>
      ) => Promise<Record<string, unknown>>;
      renderMode?: "immediate" | "lazy" | "dynamic";
      dependencies?: string[];
      version?: string;
    }
  ): void {
    const existingIndex = this.registry.findIndex(
      (entry) => entry.name === name
    );
    const newEntry: CustomComponentRegistryEntry = {
      name,
      component,
      description: options?.description,
      category: options?.category,
      tags: options?.tags,
      componentType: options?.componentType || "client",
      importPath: options?.importPath,
      serverDataFetcher: options?.serverDataFetcher,
      renderMode: options?.renderMode || "immediate",
      dependencies: options?.dependencies,
      version: options?.version,
    };

    if (existingIndex >= 0) {
      this.registry[existingIndex] = newEntry;
    } else {
      this.registry.push(newEntry);
    }
  }

  /**
   * Unregister a custom component
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
   * Get custom component documentation
   */
  static getDocumentation(): Record<
    string,
    {
      name: string;
      description?: string;
      category?: string;
      tags?: string[];
      componentType?: "client" | "server" | "hybrid";
      hasServerDataFetcher: boolean;
      renderMode?: "immediate" | "lazy" | "dynamic";
      version?: string;
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
          componentType: entry.componentType,
          hasServerDataFetcher: !!entry.serverDataFetcher,
          renderMode: entry.renderMode,
          version: entry.version,
        },
      ])
    );
  }

  /**
   * Validate component dependencies
   */
  static validateDependencies(componentName: string): {
    valid: boolean;
    missingDependencies: string[];
  } {
    const entry = this.getEntry(componentName);
    if (!entry || !entry.dependencies) {
      return { valid: true, missingDependencies: [] };
    }

    const missingDependencies = entry.dependencies.filter(
      (dep) => !this.hasComponent(dep)
    );

    return {
      valid: missingDependencies.length === 0,
      missingDependencies,
    };
  }

  /**
   * Get component by import path (for dynamic imports)
   */
  static getComponentByImportPath(
    importPath: string
  ): CustomComponentRegistryEntry | null {
    return (
      this.registry.find((entry) => entry.importPath === importPath) || null
    );
  }
}

// Helper functions for common data fetching patterns
async function fetchFAQData(): Promise<any[]> {
  // This would typically fetch from an API or database
  return [
    {
      question: "Test FAQ Question?",
      answer: "Test FAQ Answer.",
    },
  ];
}

async function fetchTaxRates(): Promise<any> {
  // This would typically fetch from an API or database
  return {
    default: 0.3,
    ranges: [
      { min: 0, max: 10000, rate: 0.14 },
      { min: 10000, max: 50000, rate: 0.24 },
      { min: 50000, max: 100000, rate: 0.35 },
      { min: 100000, max: Infinity, rate: 0.42 },
    ],
  };
}

// Export the service as default
export default CustomComponentRegistryService;
