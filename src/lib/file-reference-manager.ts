/**
 * File Reference Manager
 * Handles file references in subpage configurations
 * Supports both CMS files and local files
 */

import {
  CmsFileManager,
  type CmsFileMetadata,
  type FileLoadResult,
} from "./cms-file-manager";

/**
 * File reference types
 */
export type FileReferenceType =
  | "cms-file" // File uploaded to CMS
  | "local-file" // Local file in project
  | "url" // External URL
  | "inline"; // Inline data

/**
 * File reference configuration
 */
export interface FileReference {
  type: FileReferenceType;
  id?: string; // For cms-file type
  path?: string; // For local-file type
  url?: string; // For url type
  data?: any; // For inline type
  fallback?: FileReference; // Fallback reference
}

/**
 * File reference result
 */
export interface FileReferenceResult<T = any> {
  success: boolean;
  data?: T;
  metadata?: CmsFileMetadata;
  error?: string;
  source: "cms" | "local" | "url" | "inline" | "fallback";
  reference: FileReference;
}

/**
 * File Reference Manager
 * Manages file references in subpage configurations
 */
export class FileReferenceManager {
  private static cache: Map<string, any> = new Map();

  /**
   * Load file from reference
   */
  static async loadFile<T = any>(
    reference: FileReference
  ): Promise<FileReferenceResult<T>> {
    try {
      switch (reference.type) {
        case "cms-file":
          return await this.loadCmsFile<T>(reference);
        case "local-file":
          return await this.loadLocalFile<T>(reference);
        case "url":
          return await this.loadUrlFile<T>(reference);
        case "inline":
          return await this.loadInlineData<T>(reference);
        default:
          return {
            success: false,
            error: `Unsupported reference type: ${reference.type}`,
            source: "fallback",
            reference,
          };
      }
    } catch (error) {
      // Try fallback if available
      if (reference.fallback) {
        console.warn(
          `Failed to load file from ${reference.type}, trying fallback:`,
          error
        );
        return this.loadFile<T>(reference.fallback);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        source: "fallback",
        reference,
      };
    }
  }

  /**
   * Load file from CMS
   */
  private static async loadCmsFile<T = any>(
    reference: FileReference
  ): Promise<FileReferenceResult<T>> {
    if (!reference.id) {
      return {
        success: false,
        error: "CMS file ID is required",
        source: "cms",
        reference,
      };
    }

    const result = await CmsFileManager.loadFile<T>(reference.id);

    return {
      success: result.success,
      data: result.data,
      metadata: result.metadata,
      error: result.error,
      source: result.source,
      reference,
    };
  }

  /**
   * Load local file
   */
  private static async loadLocalFile<T = any>(
    reference: FileReference
  ): Promise<FileReferenceResult<T>> {
    if (!reference.path) {
      return {
        success: false,
        error: "Local file path is required",
        source: "local",
        reference,
      };
    }

    try {
      // Dynamic import for local files
      const module = await import(reference.path);
      const data = module.default || module;

      return {
        success: true,
        data,
        source: "local",
        reference,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to load local file: ${reference.path}`,
        source: "local",
        reference,
      };
    }
  }

  /**
   * Load file from URL
   */
  private static async loadUrlFile<T = any>(
    reference: FileReference
  ): Promise<FileReferenceResult<T>> {
    if (!reference.url) {
      return {
        success: false,
        error: "URL is required",
        source: "url",
        reference,
      };
    }

    try {
      const response = await fetch(reference.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        data,
        source: "url",
        reference,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to load URL: ${reference.url}`,
        source: "url",
        reference,
      };
    }
  }

  /**
   * Load inline data
   */
  private static async loadInlineData<T = any>(
    reference: FileReference
  ): Promise<FileReferenceResult<T>> {
    return {
      success: true,
      data: reference.data,
      source: "inline",
      reference,
    };
  }

  /**
   * Create file reference helpers
   */
  static createReference = {
    /**
     * Create CMS file reference
     */
    cmsFile: (fileId: string, fallback?: FileReference): FileReference => ({
      type: "cms-file",
      id: fileId,
      fallback,
    }),

    /**
     * Create local file reference
     */
    localFile: (path: string, fallback?: FileReference): FileReference => ({
      type: "local-file",
      path,
      fallback,
    }),

    /**
     * Create URL reference
     */
    url: (url: string, fallback?: FileReference): FileReference => ({
      type: "url",
      url,
      fallback,
    }),

    /**
     * Create inline data reference
     */
    inline: (data: any): FileReference => ({
      type: "inline",
      data,
    }),
  };

  /**
   * Validate file reference
   */
  static validateReference(reference: FileReference): {
    valid: boolean;
    error?: string;
  } {
    switch (reference.type) {
      case "cms-file":
        if (!reference.id) {
          return { valid: false, error: "CMS file ID is required" };
        }
        break;
      case "local-file":
        if (!reference.path) {
          return { valid: false, error: "Local file path is required" };
        }
        break;
      case "url":
        if (!reference.url) {
          return { valid: false, error: "URL is required" };
        }
        try {
          new URL(reference.url);
        } catch {
          return { valid: false, error: "Invalid URL format" };
        }
        break;
      case "inline":
        if (reference.data === undefined) {
          return { valid: false, error: "Inline data is required" };
        }
        break;
      default:
        return {
          valid: false,
          error: `Unsupported reference type: ${reference.type}`,
        };
    }

    // Validate fallback if present
    if (reference.fallback) {
      const fallbackValidation = this.validateReference(reference.fallback);
      if (!fallbackValidation.valid) {
        return {
          valid: false,
          error: `Invalid fallback: ${fallbackValidation.error}`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Get reference summary for debugging
   */
  static getReferenceSummary(reference: FileReference): string {
    switch (reference.type) {
      case "cms-file":
        return `CMS file: ${reference.id}`;
      case "local-file":
        return `Local file: ${reference.path}`;
      case "url":
        return `URL: ${reference.url}`;
      case "inline":
        return `Inline data: ${typeof reference.data}`;
      default:
        return `Unknown type: ${reference.type}`;
    }
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}
