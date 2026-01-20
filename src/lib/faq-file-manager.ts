/**
 * FAQ File Manager
 * Specialized manager for FAQ files using the general CMS file system
 */

import type { FaqItem, FaqGroup } from "@/components/blocks/FAQ/FAQ";
import {
  CmsFileManager,
  type CmsFileMetadata,
  type FileLoadResult,
} from "./cms-file-manager";

/**
 * FAQ-specific file metadata
 */
export interface FaqFileMetadata extends CmsFileMetadata {
  fileType: "json";
  typeSpecificData: {
    jsonStructure: {
      isArray: true;
      hasSchema: boolean;
      estimatedRecords: number;
      faqStructure: "flat" | "grouped";
      questionCount: number;
    };
  };
}

/**
 * FAQ file selection for CMS
 */
export interface FaqFileSelection {
  fileId: string;
  displayName: string;
  description: string;
  questionCount: number;
  hasGroups: boolean;
  tags: string[];
  filename: string;
}

/**
 * FAQ File Manager
 * Handles FAQ-specific operations for files loaded from CMS
 */
export class FaqFileManager {
  /**
   * Load FAQ data from file
   */
  static async loadFaqData(
    fileId: string
  ): Promise<FileLoadResult<FaqItem[] | FaqGroup[]>> {
    const result = await CmsFileManager.loadFile<FaqItem[] | FaqGroup[]>(
      fileId
    );

    if (result.success && result.data) {
      // Validate the loaded data
      const validation = this.validateFaqData(result.data);
      if (!validation.valid) {
        return {
          success: false,
          error: "Invalid FAQ data structure",
          source: result.source,
        };
      }
    }

    return result;
  }

  /**
   * Get all FAQ files
   */
  static async getFaqFiles(): Promise<FaqFileSelection[]> {
    const allFiles = await CmsFileManager.getAvailableFiles();
    const faqFiles = allFiles.filter(
      (file) => file.fileType === "json" && file.tags?.includes("faq")
    );

    return faqFiles.map((file) => ({
      fileId: file.id,
      displayName: file.displayName,
      description: file.description || "",
      questionCount:
        file.typeSpecificData?.jsonStructure?.estimatedRecords || 0,
      hasGroups:
        file.typeSpecificData?.jsonStructure?.faqStructure === "grouped",
      tags: file.tags || [],
      filename: file.filename,
    }));
  }

  /**
   * Get FAQ file metadata
   */
  static getFaqFileMetadata(fileId: string): FaqFileMetadata | undefined {
    const metadata = CmsFileManager.getFileMetadata(fileId);
    if (
      metadata &&
      metadata.fileType === "json" &&
      metadata.tags?.includes("faq")
    ) {
      return metadata as FaqFileMetadata;
    }
    return undefined;
  }

  /**
   * Delete FAQ file
   */
  static async deleteFaqFile(fileId: string): Promise<boolean> {
    return CmsFileManager.deleteFile(fileId);
  }

  /**
   * Update FAQ file metadata
   */
  static async updateFaqFileMetadata(
    fileId: string,
    updates: {
      displayName?: string;
      description?: string;
      tags?: string[];
    }
  ): Promise<boolean> {
    return CmsFileManager.updateFileMetadata(fileId, updates);
  }

  /**
   * Validate FAQ JSON content
   */
  static validateFaqJson(jsonContent: string): {
    valid: boolean;
    error?: string;
    preview?: {
      questionCount: number;
      hasGroups: boolean;
      sampleQuestions: string[];
    };
  } {
    try {
      const data = JSON.parse(jsonContent);

      // Basic structure validation
      if (!Array.isArray(data)) {
        return {
          valid: false,
          error: "FAQ data must be an array",
        };
      }

      if (data.length === 0) {
        return {
          valid: false,
          error: "FAQ data cannot be empty",
        };
      }

      // Check if it's FaqItem[] or FaqGroup[]
      const firstItem = data[0];
      let questionCount = 0;
      let hasGroups = false;
      let sampleQuestions: string[] = [];

      if ("question" in firstItem && "answer" in firstItem) {
        // FaqItem[] structure
        questionCount = data.length;
        sampleQuestions = data.slice(0, 3).map((item: any) => item.question);
      } else if ("groupName" in firstItem && "faqs" in firstItem) {
        // FaqGroup[] structure
        hasGroups = true;
        questionCount = data.reduce(
          (total: number, group: any) => total + group.faqs.length,
          0
        );
        sampleQuestions = data
          .slice(0, 2)
          .flatMap((group: any) =>
            group.faqs.slice(0, 2).map((faq: any) => faq.question)
          );
      } else {
        return {
          valid: false,
          error:
            "Invalid FAQ data structure. Must contain either question/answer pairs or grouped FAQs",
        };
      }

      return {
        valid: true,
        preview: {
          questionCount,
          hasGroups,
          sampleQuestions,
        },
      };
    } catch (error) {
      return {
        valid: false,
        error: "Invalid JSON format",
      };
    }
  }

  /**
   * Validate FAQ data structure
   */
  static validateFaqData(data: any): { valid: boolean; error?: string } {
    if (!Array.isArray(data)) {
      return { valid: false, error: "FAQ data must be an array" };
    }

    if (data.length === 0) {
      return { valid: true }; // Empty array is valid
    }

    const firstItem = data[0];

    // Check for FaqItem structure
    if ("question" in firstItem && "answer" in firstItem) {
      return data.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "question" in item &&
          "answer" in item &&
          typeof item.question === "string" &&
          typeof item.answer === "string"
      )
        ? { valid: true }
        : { valid: false, error: "Invalid FAQ item structure" };
    }

    // Check for FaqGroup structure
    if ("groupName" in firstItem && "faqs" in firstItem) {
      return data.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "groupName" in item &&
          "faqs" in item &&
          typeof item.groupName === "string" &&
          Array.isArray(item.faqs)
      )
        ? { valid: true }
        : { valid: false, error: "Invalid FAQ group structure" };
    }

    return { valid: false, error: "Unknown FAQ data structure" };
  }
}
