/**
 * Cloudflare KV Router
 *
 * Manages hostname → R2 path mappings in Cloudflare KV store.
 * Used during deployment to set up routes for the Cloudflare Worker.
 */

export interface RouteConfig {
  siteId: string;
  branch: string; // 'main' | 'preview-{id}'
  prefix: string; // 'sites/{siteId}/{branch}'
  domain: string; // customer domain
  updatedAt: string;
}

const CLOUDFLARE_KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;

/**
 * Cloudflare KV API base URL
 */
function getKVApiUrl(): string {
  if (!CLOUDFLARE_ACCOUNT_ID) {
    throw new Error("CLOUDFLARE_R2_ACCOUNT_ID is required for KV API access");
  }
  return `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_KV_NAMESPACE_ID}`;
}

/**
 * Make authenticated request to Cloudflare API
 */
async function makeKVRequest(
  method: string,
  path: string,
  body?: any
): Promise<any> {
  if (!CLOUDFLARE_API_TOKEN) {
    throw new Error("CLOUDFLARE_API_TOKEN is required for KV API access");
  }

  if (!CLOUDFLARE_KV_NAMESPACE_ID) {
    throw new Error("CLOUDFLARE_KV_NAMESPACE_ID is required for KV API access");
  }

  const url = `${getKVApiUrl()}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
  };

  // For PUT requests, use text/plain (KV stores values as strings)
  if (method === "PUT" && body) {
    headers["Content-Type"] = "text/plain";
  } else if (body) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    // For PUT, body is already a string (JSON stringified value)
    // For other methods, stringify if needed
    options.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Cloudflare KV API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  // For GET requests, return text (KV values are strings)
  if (method === "GET") {
    return response.text();
  }

  // For other requests, try to parse JSON, fallback to text
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

/**
 * Get route mapping from KV
 */
export async function getRoute(hostname: string): Promise<RouteConfig | null> {
  try {
    const key = encodeURIComponent(hostname);
    const value = await makeKVRequest("GET", `/values/${key}`);

    if (!value) {
      return null;
    }

    // KV returns values as strings, parse JSON
    const route = JSON.parse(value);
    return route as RouteConfig;
  } catch (error) {
    // If route doesn't exist, return null (not an error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("404") || errorMessage.includes("not found")) {
      return null;
    }
    // For other errors, log but don't throw
    console.warn(
      `[KV Router] ⚠️  Could not get route for ${hostname}:`,
      errorMessage
    );
    return null;
  }
}

/**
 * Set route mapping in KV
 */
export async function setRoute(
  hostname: string,
  route: RouteConfig
): Promise<void> {
  try {
    const key = encodeURIComponent(hostname);
    const value = JSON.stringify({
      ...route,
      updatedAt: new Date().toISOString(),
    });

    // Cloudflare KV API uses PUT for setting values
    await makeKVRequest("PUT", `/values/${key}`, value);

    console.log(`[KV Router] ✅ Set route: ${hostname} → ${route.prefix}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      `[KV Router] ❌ Failed to set route for ${hostname}:`,
      errorMessage
    );

    // Provide more context for debugging
    if (!CLOUDFLARE_API_TOKEN) {
      throw new Error("CLOUDFLARE_API_TOKEN is required but not configured");
    }
    if (!CLOUDFLARE_KV_NAMESPACE_ID) {
      throw new Error(
        "CLOUDFLARE_KV_NAMESPACE_ID is required but not configured"
      );
    }

    throw error;
  }
}
