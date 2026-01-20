/**
 * CMS File Manager
 * General file management system for any file type uploaded to CMS
 * Supports API-based file loading and local fallbacks
 */

/**
 * File types supported by the system
 */
export type SupportedFileType =
  | "json"
  | "image"
  | "text"
  | "markdown"
  | "csv"
  | "pdf"
  | "video"
  | "audio"
  | "other";

/**
 * File metadata extracted from uploaded files
 */
export interface CmsFileMetadata {
  id: string;
  filename: string;
  displayName: string;
  description?: string;
  tags?: string[];
  fileType: SupportedFileType;
  mimeType: string;
  fileSize: number;
  lastModified: string;
  uploadedBy?: string;
  version?: string;
  // Type-specific metadata
  typeSpecificData?: {
    // For JSON files
    jsonStructure?: {
      isArray: boolean;
      hasSchema: boolean;
      estimatedRecords?: number;
    };
    // For images
    imageData?: {
      width?: number;
      height?: number;
      format: string;
    };
    // For text files
    textData?: {
      lineCount: number;
      wordCount: number;
      encoding: string;
    };
  };
}

/**
 * File loading result
 */
export interface FileLoadResult<T = any> {
  success: boolean;
  data?: T;
  metadata?: CmsFileMetadata;
  error?: string;
  source: "cms" | "local" | "fallback";
}

/**
 * CMS File Manager
 * Handles file loading and management from CMS API
 */
export class CmsFileManager {
  private static apiBaseUrl: string = "/api/cms/files";
  private static localFiles: Map<string, CmsFileMetadata> = new Map();
  private static cache: Map<string, any> = new Map();

  /**
   * Configure the API base URL
   */
  static configure(apiBaseUrl: string): void {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Load file data by ID
   */
  static async loadFile<T = any>(fileId: string): Promise<FileLoadResult<T>> {
    try {
      // Check cache first
      if (this.cache.has(fileId)) {
        const cachedData = this.cache.get(fileId);
        const metadata = this.localFiles.get(fileId);
        return {
          success: true,
          data: cachedData,
          metadata,
          source: "cms",
        };
      }

      // Try to load from CMS API
      try {
        const response = await fetch(`${this.apiBaseUrl}/${fileId}`);
        if (response.ok) {
          const data = await response.json();
          const metadata = this.localFiles.get(fileId);

          // Cache the result
          this.cache.set(fileId, data);

          return {
            success: true,
            data,
            metadata,
            source: "cms",
          };
        }
      } catch (apiError) {
        console.warn(
          "Failed to load from CMS API, trying local fallback:",
          apiError
        );
      }

      // Fallback to local file
      const localResult = await this.loadLocalFile<T>(fileId);
      if (localResult.success) {
        return {
          ...localResult,
          source: "local",
        };
      }

      return {
        success: false,
        error: `File not found: ${fileId}`,
        source: "fallback",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        source: "fallback",
      };
    }
  }

  /**
   * Get all available files
   */
  static async getAvailableFiles(): Promise<CmsFileMetadata[]> {
    try {
      // Try to fetch from CMS API
      const response = await fetch(`${this.apiBaseUrl}/list`);
      if (response.ok) {
        const files = await response.json();
        // Update local cache
        files.forEach((file: CmsFileMetadata) => {
          this.localFiles.set(file.id, file);
        });
        return files;
      }
    } catch (error) {
      console.warn("Failed to fetch files from CMS API:", error);
    }

    // Fallback to local files
    return Array.from(this.localFiles.values());
  }

  /**
   * Get files by type
   */
  static async getFilesByType(
    fileType: SupportedFileType
  ): Promise<CmsFileMetadata[]> {
    const allFiles = await this.getAvailableFiles();
    return allFiles.filter((file) => file.fileType === fileType);
  }

  /**
   * Get file metadata
   */
  static getFileMetadata(fileId: string): CmsFileMetadata | undefined {
    return this.localFiles.get(fileId);
  }

  /**
   * Delete a file
   */
  static async deleteFile(fileId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/${fileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local cache
        this.localFiles.delete(fileId);
        this.cache.delete(fileId);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete file:", error);
      return false;
    }
  }

  /**
   * Update file metadata
   */
  static async updateFileMetadata(
    fileId: string,
    updates: {
      displayName?: string;
      description?: string;
      tags?: string[];
    }
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/${fileId}/metadata`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedMetadata = await response.json();
        this.localFiles.set(fileId, updatedMetadata);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update file metadata:", error);
      return false;
    }
  }

  /**
   * Load local file as fallback
   */
  private static async loadLocalFile<T = any>(
    fileId: string
  ): Promise<FileLoadResult<T>> {
    try {
      // This would be implemented based on your local file structure
      // For now, return error to indicate no local fallback
      return {
        success: false,
        error: "Local file not found",
        source: "local",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Local load failed",
        source: "local",
      };
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
