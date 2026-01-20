import { NextResponse } from "next/server";

/**
 * Get list of allowed origins from environment variables
 * Supports comma-separated list in ALLOWED_ORIGINS
 * Also supports wildcard patterns for development
 */
function getAllowedOrigins(): string[] {
  // Default allowed origins (production and Vercel deployments)
  const defaultOrigins = [
    "https://gutachten.org",
    "https://www.gutachten.org",
    "https://gutachten-org.vercel.app",
    "https://*.vercel.app", // Allow all Vercel preview deployments
    // Localhost for development
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ];

  const envOrigins = process.env.ALLOWED_ORIGINS;

  if (!envOrigins) {
    return defaultOrigins;
  }

  // Merge environment origins with defaults
  const envOriginList = envOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  // Combine defaults with environment origins, removing duplicates
  const allOrigins = [...defaultOrigins, ...envOriginList];
  return Array.from(new Set(allOrigins));
}

/**
 * Check if an origin is allowed
 * Supports wildcard matching for development (e.g., "http://localhost:*")
 * Note: If origin is empty/null, it's a same-origin request and should be allowed
 */
export async function isAllowedOrigin(origin: string): Promise<boolean> {
  // Same-origin requests don't have an Origin header - allow them
  if (!origin) {
    return true;
  }

  const allowedOrigins = getAllowedOrigins();

  // Check for exact match
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Check for wildcard patterns (e.g., https://*.vercel.app)
  for (const allowedOrigin of allowedOrigins) {
    if (allowedOrigin.includes("*")) {
      // Escape special regex characters except *
      const escaped = allowedOrigin
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");
      const regex = new RegExp(`^${escaped}$`);
      if (regex.test(origin)) {
        return true;
      }
    }
  }

  // In development, allow all origins if explicitly configured
  if (
    process.env.NODE_ENV === "development" &&
    process.env.ALLOW_CORS_ALL === "true"
  ) {
    return true;
  }

  return false;
}

/**
 * Add CORS headers to a NextResponse
 */
export function addCorsHeaders(
  response: NextResponse,
  origin?: string
): NextResponse {
  if (!origin) {
    return response;
  }

  // Check if origin is allowed (synchronously for header setting)
  const allowedOrigins = getAllowedOrigins();
  let isAllowed = allowedOrigins.includes(origin);

  // Check wildcard patterns (e.g., https://*.vercel.app)
  if (!isAllowed) {
    for (const allowedOrigin of allowedOrigins) {
      if (allowedOrigin.includes("*")) {
        // Escape special regex characters except *
        const escaped = allowedOrigin
          .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*");
        const regex = new RegExp(`^${escaped}$`);
        if (regex.test(origin)) {
          isAllowed = true;
          break;
        }
      }
    }
  }

  // Allow all in development if configured
  if (
    !isAllowed &&
    process.env.NODE_ENV === "development" &&
    process.env.ALLOW_CORS_ALL === "true"
  ) {
    isAllowed = true;
  }

  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE, PATCH"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");
  }

  return response;
}
