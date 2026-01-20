/**
 * FAQ Loader
 * Simplified FAQ loading using the general file system
 */

import type { FaqItem, FaqGroup } from "@/components/blocks/FAQ/FAQ";
import {
  FileReferenceManager,
  type FileReference,
} from "./file-reference-manager";
import { FaqFileManager } from "./faq-file-manager";

/**
 * FAQ Loader
 * Provides simple interface for loading FAQ data from various sources
 */
export class FaqLoader {
  /**
   * Load FAQ data from CMS file
   */
  static async loadFromCms(fileId: string): Promise<FaqItem[] | FaqGroup[]> {
    const reference = FileReferenceManager.createReference.cmsFile(fileId);
    const result = await FileReferenceManager.loadFile<FaqItem[] | FaqGroup[]>(
      reference
    );

    if (!result.success) {
      throw new Error(`Failed to load FAQ from CMS: ${result.error}`);
    }

    return result.data!;
  }

  /**
   * Load FAQ data from local file
   */
  static async loadFromLocal(path: string): Promise<FaqItem[] | FaqGroup[]> {
    const reference = FileReferenceManager.createReference.localFile(path);
    const result = await FileReferenceManager.loadFile<FaqItem[] | FaqGroup[]>(
      reference
    );

    if (!result.success) {
      throw new Error(`Failed to load FAQ from local file: ${result.error}`);
    }

    return result.data!;
  }

  /**
   * Load FAQ data with fallback
   */
  static async loadWithFallback(
    primary: FileReference,
    fallback: FileReference
  ): Promise<FaqItem[] | FaqGroup[]> {
    const reference: FileReference = {
      ...primary,
      fallback,
    };

    const result = await FileReferenceManager.loadFile<FaqItem[] | FaqGroup[]>(
      reference
    );

    if (!result.success) {
      throw new Error(`Failed to load FAQ data: ${result.error}`);
    }

    return result.data!;
  }

  /**
   * Load FAQ data from reference
   */
  static async loadFromReference(
    reference: FileReference
  ): Promise<FaqItem[] | FaqGroup[]> {
    const result = await FileReferenceManager.loadFile<FaqItem[] | FaqGroup[]>(
      reference
    );

    if (!result.success) {
      throw new Error(`Failed to load FAQ data: ${result.error}`);
    }

    return result.data!;
  }

  /**
   * Get available FAQ files from CMS
   */
  static async getAvailableFaqFiles() {
    return FaqFileManager.getFaqFiles();
  }
}

/**
 * Convenience functions for common use cases
 */
export const FaqHelpers = {
  /**
   * Load FAQ with CMS fallback to local
   */
  async loadFaqWithFallback(
    fileId: string,
    localPath: string
  ): Promise<FaqItem[] | FaqGroup[]> {
    const cmsRef = FileReferenceManager.createReference.cmsFile(fileId);
    const localRef = FileReferenceManager.createReference.localFile(localPath);

    return FaqLoader.loadWithFallback(cmsRef, localRef);
  },

  /**
   * Load FAQ from CMS or local file
   */
  async loadFaq(
    fileIdOrPath: string,
    isCms: boolean = false
  ): Promise<FaqItem[] | FaqGroup[]> {
    if (isCms) {
      return FaqLoader.loadFromCms(fileIdOrPath);
    } else {
      return FaqLoader.loadFromLocal(fileIdOrPath);
    }
  },

  /**
   * Create FAQ reference for subpage configuration
   */
  createFaqReference(fileId: string, localFallback?: string): FileReference {
    const cmsRef = FileReferenceManager.createReference.cmsFile(fileId);

    if (localFallback) {
      const localRef =
        FileReferenceManager.createReference.localFile(localFallback);
      return { ...cmsRef, fallback: localRef };
    }

    return cmsRef;
  },
};

// Export for easy access
export { FileReferenceManager, type FileReference };
export { FaqFileManager };
