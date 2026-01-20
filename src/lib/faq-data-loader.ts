import type { FaqItem, FaqGroup } from "@/components/blocks/FAQ/FAQ";

/**
 * FAQ Data Source Types
 * These define how FAQ data can be loaded from different sources
 */
export type FaqDataSource =
  | { type: "json"; path: string } // JSON file path
  | { type: "cms"; datasetId: string } // Future CMS dataset ID
  | { type: "inline"; data: FaqItem[] | FaqGroup[] }; // Direct data

/**
 * FAQ Data Configuration
 * This is what would be stored in the CMS for each FAQ component
 */
export interface FaqDataConfig {
  id: string;
  name: string;
  description?: string;
  source: FaqDataSource;
  // Future CMS fields
  lastModified?: string;
  version?: string;
  tags?: string[];
}

/**
 * FAQ Data Registry
 * This would be populated by the CMS or manually maintained
 * In a CMS, this would be automatically generated from uploaded datasets
 */
export interface FaqDataRegistry {
  [datasetId: string]: FaqDataConfig;
}

/**
 * Load FAQ data from various sources
 */
export class FaqDataLoader {
  private static registry: FaqDataRegistry = {};
  private static autoDiscoveryEnabled = false;

  /**
   * Register available FAQ datasets
   * In a CMS, this would be called when datasets are uploaded/updated
   */
  static registerDatasets(registry: FaqDataRegistry): void {
    this.registry = { ...this.registry, ...registry };
  }

  /**
   * Enable auto-discovery mode
   * When enabled, the loader will automatically discover FAQ files
   */
  static enableAutoDiscovery(): void {
    this.autoDiscoveryEnabled = true;
  }

  /**
   * Disable auto-discovery mode
   */
  static disableAutoDiscovery(): void {
    this.autoDiscoveryEnabled = false;
  }

  /**
   * Get all available FAQ datasets
   */
  static getAvailableDatasets(): FaqDataConfig[] {
    return Object.values(this.registry);
  }

  /**
   * Get a specific FAQ dataset configuration
   */
  static getDatasetConfig(datasetId: string): FaqDataConfig | undefined {
    return this.registry[datasetId];
  }

  /**
   * Load FAQ data from a configuration
   */
  static async loadFaqData(
    config: FaqDataConfig
  ): Promise<FaqItem[] | FaqGroup[]> {
    switch (config.source.type) {
      case "json":
        return this.loadFromJson(config.source.path);
      case "cms":
        return this.loadFromCms(config.source.datasetId);
      case "inline":
        return config.source.data;
      default:
        throw new Error(
          `Unsupported FAQ data source type: ${(config.source as any).type}`
        );
    }
  }

  /**
   * Load FAQ data by dataset ID
   */
  static async loadFaqDataById(
    datasetId: string
  ): Promise<FaqItem[] | FaqGroup[]> {
    // First try to find in registry
    const config = this.getDatasetConfig(datasetId);
    if (config) {
      return this.loadFaqData(config);
    }

    // If auto-discovery is enabled, try to find in auto-discovered files
    if (this.autoDiscoveryEnabled) {
      try {
        const { FaqAutoDiscovery } = await import("./faq-auto-discovery");
        return await FaqAutoDiscovery.getFaqData(datasetId);
      } catch (error) {
        // Auto-discovery failed, continue with error
      }
    }

    throw new Error(`FAQ dataset not found: ${datasetId}`);
  }

  /**
   * Load FAQ data from JSON file
   */
  private static async loadFromJson(
    path: string
  ): Promise<FaqItem[] | FaqGroup[]> {
    try {
      // Handle different path formats
      let importPath = path;

      // Convert @/ paths to relative paths for dynamic imports
      if (path.startsWith("@/")) {
        importPath = path.replace("@/", "../../");
      }

      // Dynamic import for JSON files
      const module = await import(importPath);
      return module.default || module;
    } catch (error) {
      console.error(`Failed to load FAQ data from ${path}:`, error);
      throw new Error(`Failed to load FAQ data from ${path}`);
    }
  }

  /**
   * Load FAQ data from CMS (future implementation)
   */
  private static async loadFromCms(
    datasetId: string
  ): Promise<FaqItem[] | FaqGroup[]> {
    // This would be implemented when CMS is ready
    // For now, throw an error to indicate it's not implemented
    throw new Error(
      `CMS FAQ data loading not yet implemented for dataset: ${datasetId}`
    );
  }

  /**
   * Validate FAQ data structure
   */
  static validateFaqData(data: unknown): data is FaqItem[] | FaqGroup[] {
    if (!Array.isArray(data)) {
      return false;
    }

    if (data.length === 0) {
      return true; // Empty array is valid
    }

    // Check if it's FaqItem[] or FaqGroup[]
    const firstItem = data[0];

    // Check for FaqItem structure
    if ("question" in firstItem && "answer" in firstItem) {
      return data.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "question" in item &&
          "answer" in item &&
          typeof (item as any).question === "string" &&
          typeof (item as any).answer === "string"
      );
    }

    // Check for FaqGroup structure
    if ("groupName" in firstItem && "faqs" in firstItem) {
      return data.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "groupName" in item &&
          "faqs" in item &&
          typeof (item as any).groupName === "string" &&
          Array.isArray((item as any).faqs)
      );
    }

    return false;
  }
}

/**
 * Helper function to create FAQ data configuration
 */
export function createFaqDataConfig(
  id: string,
  name: string,
  source: FaqDataSource,
  options?: {
    description?: string;
    tags?: string[];
  }
): FaqDataConfig {
  return {
    id,
    name,
    source,
    description: options?.description,
    tags: options?.tags,
  };
}

/**
 * Helper function to create JSON-based FAQ data configuration
 */
export function createJsonFaqConfig(
  id: string,
  name: string,
  jsonPath: string,
  options?: {
    description?: string;
    tags?: string[];
  }
): FaqDataConfig {
  return createFaqDataConfig(
    id,
    name,
    { type: "json", path: jsonPath },
    options
  );
}

/**
 * Helper function to create inline FAQ data configuration
 */
export function createInlineFaqConfig(
  id: string,
  name: string,
  data: FaqItem[] | FaqGroup[],
  options?: {
    description?: string;
    tags?: string[];
  }
): FaqDataConfig {
  return createFaqDataConfig(id, name, { type: "inline", data }, options);
}
