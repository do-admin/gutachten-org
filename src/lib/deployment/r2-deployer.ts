/**
 * Cloudflare R2 Deployer
 *
 * Uploads static sites to Cloudflare R2 storage with proper path structure.
 * Supports both production (main) and preview deployments.
 *
 * Uses rclone for fast uploads (5-20x faster) with automatic fallback to
 * custom S3 SDK implementation if rclone is not available.
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { createReadStream, existsSync, writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import { tmpdir } from "os";
import * as path from "path";
import * as http from "http";
import * as https from "https";

// R2 Configuration from environment variables
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "herokit-sites";
const R2_ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT;

export interface R2DeployOptions {
  siteId: string;
  sitePath: string;
  branch: string; // 'main' | 'preview-1' | etc.
}

export interface R2DeployResult {
  success: boolean;
  r2Path?: string; // e.g., 'sites/{siteId}/{branch}'
  error?: string;
}

// Initialize S3 client for R2 (R2 is S3-compatible)
let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    if (
      !R2_ACCOUNT_ID ||
      !R2_ACCESS_KEY_ID ||
      !R2_SECRET_ACCESS_KEY ||
      !R2_ENDPOINT
    ) {
      throw new Error(
        "Cloudflare R2 credentials not configured. Please set CLOUDFLARE_R2_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, and CLOUDFLARE_R2_ENDPOINT environment variables."
      );
    }

    // Create HTTP agents with keepAlive for connection reuse (major performance boost)
    const httpAgent = new http.Agent({
      keepAlive: true,
      keepAliveMsecs: 30000,
      maxSockets: 200,
      maxFreeSockets: 50,
    });

    const httpsAgent = new https.Agent({
      keepAlive: true,
      keepAliveMsecs: 30000,
      maxSockets: 200,
      maxFreeSockets: 50,
    });

    // Configure HTTP handler with optimized settings
    const requestHandler = new NodeHttpHandler({
      httpAgent,
      httpsAgent,
      socketAcquisitionWarningTimeout: 180000, // 3 minutes
      connectionTimeout: 10000, // 10 seconds
      requestTimeout: 180000, // 3 minutes for very large files
    });

    s3Client = new S3Client({
      region: "auto", // R2 uses 'auto' region
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
      requestHandler,
      maxAttempts: 2, // Reduced to 2 for speed (we handle retries manually)
    });
  }

  return s3Client;
}

/**
 * Get MIME type from file extension (no I/O needed)
 */
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".ico": "image/x-icon",
    ".xml": "application/xml",
    ".txt": "text/plain",
  };

  return mimeTypes[ext] || "application/octet-stream";
}

/**
 * Get cache control header based on file type (no I/O needed)
 */
function getCacheControl(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();

  // Long cache for hashed assets (JS, CSS with hash in filename)
  if (ext === ".js" || ext === ".css") {
    // Check if filename contains hash (e.g., main.abc123.js)
    const basename = path.basename(filePath);
    if (/\.[a-f0-9]{8,}\./.test(basename)) {
      return "public, max-age=31536000, immutable"; // 1 year
    }
  }

  // Long cache for images and fonts
  if (
    [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".svg",
      ".woff",
      ".woff2",
      ".ttf",
    ].includes(ext)
  ) {
    return "public, max-age=31536000, immutable"; // 1 year
  }

  // Short cache for HTML
  if (ext === ".html") {
    return "public, max-age=300"; // 5 minutes
  }

  // Default cache
  return "public, max-age=3600"; // 1 hour
}

/**
 * Get all files recursively from a directory
 */
async function getAllFiles(
  dirPath: string,
  basePath: string = dirPath
): Promise<string[]> {
  const files: string[] = [];
  const { readdir } = await import("fs/promises");
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(basePath, fullPath);

    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, basePath);
      files.push(...subFiles);
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Process items with concurrency control - optimized version
 */
async function processWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  processor: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;
  let completed = 0;
  const total = items.length;
  const startTime = Date.now();

  const workers: Promise<void>[] = [];

  for (let i = 0; i < concurrency; i++) {
    workers.push(
      (async () => {
        while (currentIndex < total) {
          const index = currentIndex++;
          const item = items[index];
          try {
            const result = await processor(item, index);
            results[index] = result;
            completed++;

            // Log progress every 500 files or at milestones (less frequent for speed)
            if (completed % 500 === 0 || completed === total) {
              const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
              const rate = (
                completed /
                ((Date.now() - startTime) / 1000)
              ).toFixed(1);
              console.log(
                `[R2 Deploy] Progress: ${completed}/${total} files (${Math.round((completed / total) * 100)}%) | ${rate} files/sec | ${elapsed}s elapsed`
              );
            }
          } catch (error) {
            throw error;
          }
        }
      })()
    );
  }

  await Promise.all(workers);
  return results;
}

export class R2Deployer {
  /**
   * Check if rclone is available on the system
   */
  private isRcloneAvailable(): boolean {
    try {
      execSync("rclone version", { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deploy using rclone (MUCH FASTER - 5-20x speed improvement)
   *
   * Uses rclone sync for incremental uploads:
   * - Only uploads changed files (fast subsequent deployments)
   * - Deletes removed files from R2 (keeps bucket clean)
   * - Uses modtime comparison for speed
   *
   * Note: Cache headers are best set in the Cloudflare Worker when serving files.
   * This allows per-file-type cache control (HTML: short cache, assets: long cache).
   */
  private async deployWithRclone(
    options: R2DeployOptions
  ): Promise<R2DeployResult> {
    const { siteId, sitePath, branch } = options;
    const r2Prefix = `sites/${siteId}/${branch}`;

    // Validate site path
    if (!existsSync(sitePath)) {
      return {
        success: false,
        error: `Site path does not exist: ${sitePath}`,
      };
    }

    // Get R2 config from environment
    const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "herokit-sites";
    const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;

    if (!accountId || !accessKeyId || !secretAccessKey || !endpoint) {
      return {
        success: false,
        error: "R2 credentials not configured",
      };
    }

    // Create temporary rclone config file
    const configPath = path.join(
      tmpdir(),
      `rclone-${Date.now()}-${Math.random().toString(36).substring(7)}.conf`
    );

    try {
      // Write rclone config
      const configContent = `[r2-temp]
type = s3
provider = Cloudflare
access_key_id = ${accessKeyId}
secret_access_key = ${secretAccessKey}
endpoint = ${endpoint}
region = auto
`;
      writeFileSync(configPath, configContent, { mode: 0o600 }); // Secure permissions

      // Count files for progress
      const files = await getAllFiles(sitePath, sitePath);
      console.log(
        `[R2 Deploy] 🚀 Using rclone sync to upload ${files.length} files (incremental, 5-20x faster)...`
      );
      console.log(
        `[R2 Deploy] ℹ️  Only changed files will be uploaded (incremental deployment)`
      );
      console.log(
        `[R2 Deploy] ℹ️  Deleted files will be removed from R2 (keeps bucket clean)`
      );

      const r2Path = `${bucketName}/${r2Prefix}`;
      const startTime = Date.now();

      // Use rclone sync for incremental uploads
      // KEY DIFFERENCES from 'copy':
      // - sync only uploads changed files (incremental)
      // - sync can delete files that were removed locally
      // - sync uses modtime comparison for speed
      const syncCommand = [
        "rclone",
        "sync", // Use sync instead of copy for incremental uploads
        sitePath,
        `r2-temp:${r2Path}`,
        "--config",
        configPath,
        "--transfers",
        "32", // Parallel file transfers (optimized for speed)
        "--checkers",
        "32", // Parallel checkers for faster file comparison
        "--s3-upload-concurrency",
        "4", // S3 upload concurrency per file
        "--s3-chunk-size",
        "64M", // Large chunks for better performance
        "--s3-disable-checksum", // Skip checksum for speed (rclone handles integrity)
        "--progress", // Show progress
        "--stats",
        "5s", // Update stats every 5 seconds
        "--log-level",
        "INFO", // Info level logging
        "--retries",
        "3", // Retry failed transfers
        "--low-level-retries",
        "10", // Low-level retries for network issues
        "--buffer-size",
        "64M", // Large buffer for better throughput
        "--use-server-modtime", // Use server modtime for faster checks (enables incremental)
        "--fast-list", // Use fast list (if supported)
        "--delete-after", // Delete files in R2 that don't exist locally (keeps bucket clean)
        // Note: Cache headers are set per-file-type in the custom fallback implementation
        // For rclone, we rely on the Worker to set appropriate cache headers when serving
        // This is more flexible and allows cache control per request
      ].join(" ");

      console.log(`[R2 Deploy] Starting rclone sync (incremental upload)...`);
      execSync(syncCommand, {
        stdio: "inherit",
        env: { ...process.env },
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`[R2 Deploy] ✅ Sync completed in ${duration}s using rclone`);
      console.log(
        `[R2 Deploy] ✅ Incremental upload: Only changed files were transferred`
      );
      console.log(
        `[R2 Deploy] 💡 Cache headers should be set in Cloudflare Worker for optimal performance`
      );

      return {
        success: true,
        r2Path: r2Prefix,
      };
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("[R2 Deploy] ❌ rclone deployment failed:", errorMessage);

      // Provide helpful error messages
      if (
        errorMessage.includes("command not found") ||
        errorMessage.includes("rclone: not found")
      ) {
        console.error(
          "[R2 Deploy] 💡 Install rclone: https://rclone.org/install/"
        );
        console.error("[R2 Deploy] 💡 macOS: brew install rclone");
        console.error(
          "[R2 Deploy] 💡 Linux: curl https://rclone.org/install.sh | sudo bash"
        );
      }

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      // Cleanup config file
      try {
        if (existsSync(configPath)) {
          unlinkSync(configPath);
        }
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
  }

  /**
   * Upload static site to R2 - Custom S3 SDK implementation (fallback)
   */
  private async deployWithCustom(
    options: R2DeployOptions
  ): Promise<R2DeployResult> {
    // Declare error handler at function scope for cleanup
    let unhandledErrorHandler: ((err: Error) => void) | undefined;

    try {
      const { siteId, sitePath, branch } = options;

      // Validate site path exists
      const { access } = await import("fs/promises");
      try {
        await access(sitePath);
      } catch {
        throw new Error(`Site path does not exist: ${sitePath}`);
      }

      // Construct R2 prefix: sites/{siteId}/{branch}/
      const r2Prefix = `sites/${siteId}/${branch}`;

      // Get all files from site directory
      const files = await getAllFiles(sitePath, sitePath);

      console.log(
        `[R2 Deploy] Uploading ${files.length} files to ${r2Prefix}/ with adaptive concurrency...`
      );

      // Start with lower concurrency to avoid overwhelming R2
      // R2 can be rate-limited, so we start conservative and adapt
      let currentConcurrency = 30; // Reduced from 100 to avoid 502 errors
      const MIN_CONCURRENCY = 10;
      const MAX_CONCURRENCY = 50;
      const client = getS3Client();

      // Track 502 errors to adapt concurrency
      let serverErrorCount = 0;
      let lastErrorCheck = Date.now();
      const ERROR_CHECK_INTERVAL = 5000; // Check every 5 seconds

      // Add unhandled error handler for EPIPE errors (common with high concurrency)
      unhandledErrorHandler = (err: Error) => {
        const nodeErr = err as NodeJS.ErrnoException;
        if (nodeErr.code === "EPIPE" || nodeErr.code === "ECONNRESET") {
          // These are handled by retry logic - suppress to prevent crash
          return;
        }
        // Re-throw other errors
        throw err;
      };

      process.on("uncaughtException", unhandledErrorHandler);

      // Track failed files but continue deployment
      const failedFiles: Array<{ file: string; error: string }> = [];

      // Adaptive concurrency processor that adjusts based on errors
      const processFile = async (file: string, index: number) => {
        const filePath = path.join(sitePath, file);
        const r2Key = `${r2Prefix}/${file.replace(/\\/g, "/")}`; // Normalize path separators

        try {
          // Pre-compute metadata (no I/O, just string operations)
          const contentType = getContentType(filePath);
          const cacheControl = getCacheControl(filePath);

          // For very small files (< 1MB), read into memory for better reliability
          // For larger files, use streaming for performance
          const SMALL_FILE_THRESHOLD = 1024 * 1024; // 1MB
          const { stat, readFile } = await import("fs/promises");
          let useBuffered = false;
          let body: Buffer | ReturnType<typeof createReadStream>;

          try {
            const stats = await stat(filePath);
            useBuffered = stats.size < SMALL_FILE_THRESHOLD;
          } catch {
            // If stat fails, default to streaming
            useBuffered = false;
          }

          if (useBuffered) {
            body = await readFile(filePath);
          } else {
            // Use streaming for larger files - eliminates readFile overhead
            body = createReadStream(filePath);

            // Comprehensive error handling for streams
            body.on("error", (err: NodeJS.ErrnoException) => {
              // EPIPE and ECONNRESET are common with high concurrency - handle gracefully
              if (err.code === "EPIPE" || err.code === "ECONNRESET") {
                // These are handled by retry logic, just log for debugging
                return;
              }
              console.error(
                `[R2 Deploy] Stream error for ${file}:`,
                err.message
              );
            });

            // Handle stream close events
            body.on("close", () => {
              // Stream closed normally
            });

            // Prevent unhandled errors from crashing the process
            body.on("unpipe", () => {
              // Stream was unpiped - this is normal
            });
          }

          const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: r2Key,
            Body: body,
            ContentType: contentType,
            CacheControl: cacheControl,
          });

          // Enhanced retry logic with better error handling
          const MAX_RETRIES = 3;
          let attempt = 0;
          let currentCommand = command;

          while (attempt <= MAX_RETRIES) {
            try {
              await client.send(currentCommand);
              return r2Key;
            } catch (error: any) {
              attempt++;
              const statusCode = error.$metadata?.httpStatusCode;

              // Enhanced error logging to identify problematic files
              const errorDetails = {
                file,
                r2Key,
                attempt,
                errorName: error.name,
                errorMessage: error.message,
                statusCode,
                requestId: error.$metadata?.requestId,
              };

              // Check for XML/deserialization errors - these often indicate R2 returned HTML error page
              const isDeserializationError =
                error.message?.includes("Deserialization error") ||
                error.message?.includes("Expected closing tag") ||
                error.message?.includes("fast-xml-parser");

              // Check for server errors (502, 503, 504) - these are retryable
              const isServerError =
                statusCode === 502 || statusCode === 503 || statusCode === 504;

              // Track server errors for adaptive concurrency
              if (isServerError) {
                serverErrorCount++;
                const now = Date.now();
                if (now - lastErrorCheck > ERROR_CHECK_INTERVAL) {
                  // If we're seeing many 502 errors, reduce concurrency
                  if (serverErrorCount > 10) {
                    currentConcurrency = Math.max(
                      MIN_CONCURRENCY,
                      Math.floor(currentConcurrency * 0.7)
                    );
                    console.log(
                      `[R2 Deploy] ⚠️  High error rate detected (${serverErrorCount} errors). Reducing concurrency to ${currentConcurrency}`
                    );
                  }
                  serverErrorCount = 0;
                  lastErrorCheck = now;
                }
              }

              // Check for timeout and connection errors
              const isTimeoutError =
                error.name === "TimeoutError" ||
                error.message?.includes("socket hang up") ||
                error.message?.includes("ETIMEDOUT") ||
                error.message?.includes("timeout");

              // Check for EPIPE and other stream errors
              const isStreamError =
                error.code === "EPIPE" ||
                error.code === "ECONNRESET" ||
                error.message?.includes("EPIPE") ||
                error.message?.includes("ECONNRESET") ||
                error.message?.includes("socket hang up");

              const isRetryableError =
                error.name === "RequestTimeTooSkewed" ||
                error.name === "TimeoutError" ||
                error.name === "ECONNRESET" ||
                error.name === "ETIMEDOUT" ||
                isStreamError ||
                isTimeoutError ||
                error.message?.includes("request time and the server's time") ||
                error.message?.includes("ECONNRESET") ||
                error.message?.includes("ETIMEDOUT") ||
                error.message?.includes("socket hang up");

              // Determine if we should retry
              const shouldRetry =
                (isDeserializationError || isServerError || isRetryableError) &&
                attempt <= MAX_RETRIES;

              if (shouldRetry) {
                const errorType = isDeserializationError
                  ? "Deserialization"
                  : isServerError
                    ? "Server"
                    : isTimeoutError
                      ? "Timeout"
                      : "Connection";
                console.error(
                  `[R2 Deploy] ⚠️  ${errorType} error for file: ${file}`
                );
                console.error(`[R2 Deploy]   R2 Key: ${r2Key}`);
                console.error(
                  `[R2 Deploy]   Status: ${statusCode || "unknown"}`
                );
                console.error(`[R2 Deploy]   Error: ${error.message}`);

                // Try to get raw response if available (only for server errors)
                if (isServerError && error.$response) {
                  try {
                    const rawResponse =
                      await error.$response.body?.transformToString();
                    if (rawResponse) {
                      console.error(
                        `[R2 Deploy]   Raw response: ${rawResponse.substring(0, 500)}`
                      );
                    }
                  } catch (e) {
                    // Ignore errors reading response
                  }
                }

                // Calculate exponential backoff delay
                // Add extra delay for server errors to give R2 time to recover
                let backoffDelay = Math.min(
                  1000 * Math.pow(2, attempt - 1),
                  10000
                ); // Exponential backoff: 1s, 2s, 4s, 8s (max 10s)

                // Add extra delay for 502 errors (R2 is overwhelmed)
                if (isServerError && statusCode === 502) {
                  backoffDelay += 2000; // Add 2 seconds for 502 errors
                }

                console.log(
                  `[R2 Deploy]   Retrying ${file} (attempt ${attempt}/${MAX_RETRIES}) with ${backoffDelay}ms delay...`
                );
                await new Promise((resolve) =>
                  setTimeout(resolve, backoffDelay)
                );

                // Always use buffered upload on retry for better reliability
                const fileContent = await readFile(filePath);
                currentCommand = new PutObjectCommand({
                  Bucket: R2_BUCKET_NAME,
                  Key: r2Key,
                  Body: fileContent,
                  ContentType: contentType,
                  CacheControl: cacheControl,
                });
                useBuffered = true;
                continue;
              } else {
                // After all retries exhausted or non-retryable error
                const errorMsg = `${attempt > MAX_RETRIES ? "Failed after all retries" : "Non-retryable error"}: ${error.message}`;
                console.error(`[R2 Deploy] ❌ ${errorMsg} for file: ${file}`);
                // Collect error but don't throw - continue with other files
                failedFiles.push({ file, error: errorMsg });
                return null; // Return null to indicate failure but continue
              }
            }
          }
          return r2Key;
        } catch (error: any) {
          // Catch any unexpected errors during file processing
          const errorMsg =
            error instanceof Error ? error.message : "Unknown error";
          console.error(
            `[R2 Deploy] ❌ Unexpected error for file: ${file}`,
            errorMsg
          );
          failedFiles.push({ file, error: errorMsg });
          return null; // Return null to indicate failure but continue
        }
      };

      // Process files with adaptive concurrency
      // Start with lower concurrency and process in batches to avoid overwhelming R2
      const BATCH_SIZE = 1000; // Process 1000 files at a time
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        console.log(
          `[R2 Deploy] Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(files.length / BATCH_SIZE)} (${batch.length} files) with concurrency ${currentConcurrency}...`
        );
        await processWithConcurrency(batch, currentConcurrency, processFile);

        // Small delay between batches to avoid overwhelming R2
        if (i + BATCH_SIZE < files.length) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      // Filter out null results (failed files)
      const successfulFiles = files.length - failedFiles.length;

      // Report results
      if (failedFiles.length === 0) {
        console.log(
          `[R2 Deploy] ✅ Successfully uploaded ${files.length} files to ${r2Prefix}/`
        );
      } else {
        const successRate = ((successfulFiles / files.length) * 100).toFixed(1);
        console.log(
          `[R2 Deploy] ⚠️  Uploaded ${successfulFiles}/${files.length} files (${successRate}% success rate) to ${r2Prefix}/`
        );
        console.error(
          `[R2 Deploy] ❌ Failed to upload ${failedFiles.length} file(s):`
        );
        // Show first 10 failed files
        failedFiles.slice(0, 10).forEach(({ file, error }) => {
          console.error(`[R2 Deploy]   - ${file}: ${error}`);
        });
        if (failedFiles.length > 10) {
          console.error(
            `[R2 Deploy]   ... and ${failedFiles.length - 10} more file(s)`
          );
        }

        // Fail deployment if more than 1% of files failed
        const failureRate = (failedFiles.length / files.length) * 100;
        if (failureRate > 1) {
          const errorMessage = `Too many files failed (${failedFiles.length}/${files.length}, ${failureRate.toFixed(1)}%)`;
          console.error(`[R2 Deploy] ❌ Deployment failed: ${errorMessage}`);
          // Remove error handler
          process.removeListener("uncaughtException", unhandledErrorHandler);
          return {
            success: false,
            error: errorMessage,
          };
        } else {
          console.log(
            `[R2 Deploy] ⚠️  Deployment completed with minor failures (${failureRate.toFixed(2)}% failure rate)`
          );
        }
      }

      // Remove error handler
      process.removeListener("uncaughtException", unhandledErrorHandler);

      return {
        success: true,
        r2Path: r2Prefix,
      };
    } catch (error) {
      // Remove error handler in case of error
      if (typeof unhandledErrorHandler !== "undefined") {
        process.removeListener("uncaughtException", unhandledErrorHandler);
      }

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("[R2 Deploy] ❌ Deployment failed:", errorMessage);

      // Log additional context for debugging
      if (error instanceof Error && error.stack) {
        console.error("[R2 Deploy] Stack trace:", error.stack);
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Upload static site to R2 - Hybrid approach
   * Tries rclone first (5-20x faster), falls back to custom implementation
   */
  async deploy(options: R2DeployOptions): Promise<R2DeployResult> {
    // Try rclone first if available
    if (this.isRcloneAvailable()) {
      console.log("[R2 Deploy] 🚀 rclone detected - using fast upload method");
      const rcloneResult = await this.deployWithRclone(options);
      if (rcloneResult.success) {
        return rcloneResult;
      }
      // If rclone fails, fallback to custom implementation
      console.log(
        "[R2 Deploy] ⚠️  rclone upload failed, falling back to custom uploader"
      );
    } else {
      console.log(
        "[R2 Deploy] ℹ️  rclone not available, using custom uploader"
      );
      console.log(
        "[R2 Deploy] 💡 Install rclone for 5-20x faster uploads: https://rclone.org/install/"
      );
    }

    // Fallback to custom implementation
    return await this.deployWithCustom(options);
  }
}
