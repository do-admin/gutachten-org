/**
 * Cloudflare Worker Routes Manager
 *
 * Manages custom domain routes for Cloudflare Workers.
 * Automatically adds/removes routes when deploying sites.
 *
 * Note: Domains must be added to a Cloudflare zone first before routes can be configured.
 * This service attempts to add custom domains, but manual configuration may be required
 * if the domain is not yet in Cloudflare or DNS is not configured.
 */

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const WORKER_NAME =
  process.env.CLOUDFLARE_WORKER_NAME || "herokit-static-router";

/**
 * Cloudflare Workers API base URL
 */
function getWorkersApiUrl(): string {
  if (!CLOUDFLARE_ACCOUNT_ID) {
    throw new Error(
      "CLOUDFLARE_R2_ACCOUNT_ID is required for Workers API access"
    );
  }
  return `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/services/${WORKER_NAME}`;
}

/**
 * Get zone ID for a domain (if it exists in Cloudflare)
 */
async function getZoneId(hostname: string): Promise<string | null> {
  try {
    if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
      return null;
    }

    // Extract root domain (e.g., "jonas-straube.de" from "preview-42.jonas-straube.de")
    const rootDomain = hostname.split(".").slice(-2).join(".");

    const url = `https://api.cloudflare.com/client/v4/zones?name=${rootDomain}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.success && data.result && data.result.length > 0) {
      return data.result[0].id;
    }

    return null;
  } catch (error) {
    console.warn(
      `[Worker Routes] Could not get zone ID for ${hostname}:`,
      error
    );
    return null;
  }
}

/**
 * Get DNS records for a zone
 */
async function getDnsRecords(zoneId: string, name?: string): Promise<any[]> {
  try {
    if (!CLOUDFLARE_API_TOKEN) {
      return [];
    }

    let url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
    if (name) {
      url += `?name=${encodeURIComponent(name)}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (data.success && data.result) {
      return data.result;
    }

    return [];
  } catch (error) {
    console.warn(`[DNS] Could not get DNS records:`, error);
    return [];
  }
}

/**
 * Create or update a DNS CNAME record
 */
async function createDnsRecord(
  zoneId: string,
  name: string,
  target: string,
  proxied: boolean = true
): Promise<boolean> {
  try {
    if (!CLOUDFLARE_API_TOKEN) {
      throw new Error("CLOUDFLARE_API_TOKEN is required for DNS API access");
    }

    // Check if record already exists
    const existingRecords = await getDnsRecords(zoneId, name);
    const existingRecord = existingRecords.find(
      (record: any) => record.name === name || record.name === `${name}.`
    );

    const recordData = {
      type: "CNAME",
      name: name,
      content: target,
      ttl: 1, // Automatic TTL
      proxied: proxied,
    };

    if (existingRecord) {
      // Update existing record
      const updateUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existingRecord.id}`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log(
            `[DNS] ✅ Updated DNS record: ${name} → ${target} (proxied: ${proxied})`
          );
          return true;
        }
      }
    } else {
      // Create new record
      const createUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
      const response = await fetch(createUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log(
            `[DNS] ✅ Created DNS record: ${name} → ${target} (proxied: ${proxied})`
          );
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[DNS] ⚠️  Could not create DNS record ${name}:`,
      errorMessage
    );
    return false;
  }
}

/**
 * Create DNS records for a subdomain on hero-pages.com
 * Creates both the subdomain and www subdomain CNAME records
 * Points to the worker's domain (workers.dev or custom domain)
 */
export async function createSubdomainDnsRecords(
  subdomain: string,
  target?: string
): Promise<boolean> {
  try {
    const zoneId = await getZoneId("hero-pages.com");
    if (!zoneId) {
      console.warn(
        `[DNS] ⚠️  hero-pages.com zone not found, cannot create DNS records`
      );
      return false;
    }

    // Determine target: use provided target, env variable, or default
    if (!target) {
      // Check for environment variable first
      target = process.env.CLOUDFLARE_WORKER_DNS_TARGET;

      if (!target) {
        // Default: use worker name with workers.dev format
        // Format: {worker-name}.{account-subdomain}.workers.dev
        // For hero-pages.com account, this would be: herokit-static-router.hero-pages.workers.dev
        target = `${WORKER_NAME}.hero-pages.workers.dev`;
        console.log(`[DNS] ℹ️  Using default target: ${target}`);
        console.log(
          `[DNS] 💡 To use a different target, set CLOUDFLARE_WORKER_DNS_TARGET environment variable`
        );
      } else {
        console.log(
          `[DNS] ℹ️  Using target from CLOUDFLARE_WORKER_DNS_TARGET: ${target}`
        );
      }
    }

    const subdomainName = `${subdomain}.hero-pages.com`;
    const wwwSubdomainName = `www.${subdomain}.hero-pages.com`;

    // IMPORTANT: Add custom domains to worker BEFORE creating DNS records
    // This ensures SSL certificates are provisioned
    console.log(
      `[DNS] 🔧 Adding custom domains to worker for SSL certificate provisioning...`
    );

    // Add subdomain to worker
    try {
      await addCustomDomain(subdomainName);
    } catch (error) {
      console.warn(
        `[DNS] ⚠️  Could not add ${subdomainName} to worker:`,
        error instanceof Error ? error.message : "Unknown error"
      );
    }

    // Add www subdomain to worker
    try {
      await addCustomDomain(wwwSubdomainName);
    } catch (error) {
      console.warn(
        `[DNS] ⚠️  Could not add ${wwwSubdomainName} to worker:`,
        error instanceof Error ? error.message : "Unknown error"
      );
    }

    // Wait a moment for worker to process the custom domains
    console.log(`[DNS] ⏳ Waiting for worker to process custom domains...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create subdomain record (e.g., gutachten-org.hero-pages.com)
    console.log(
      `[DNS] 🔧 Creating DNS record: ${subdomainName} → ${target} (CNAME, proxied)`
    );
    const subdomainSuccess = await createDnsRecord(
      zoneId,
      subdomainName,
      target,
      true
    );

    // Create www subdomain record (e.g., www.gutachten-org.hero-pages.com)
    console.log(
      `[DNS] 🔧 Creating DNS record: ${wwwSubdomainName} → ${target} (CNAME, proxied)`
    );
    const wwwSubdomainSuccess = await createDnsRecord(
      zoneId,
      wwwSubdomainName,
      target,
      true
    );

    if (subdomainSuccess && wwwSubdomainSuccess) {
      console.log(
        `[DNS] ✅ Created DNS records for ${subdomain}.hero-pages.com and www.${subdomain}.hero-pages.com`
      );
      console.log(
        `[DNS] 💡 SSL certificates are being provisioned. This may take a few minutes.`
      );
      console.log(
        `[DNS] 💡 You can check certificate status in Cloudflare Dashboard → SSL/TLS → Edge Certificates`
      );
    }

    return subdomainSuccess && wwwSubdomainSuccess;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[DNS] ⚠️  Could not create DNS records for ${subdomain}:`,
      errorMessage
    );
    return false;
  }
}

/**
 * Make authenticated request to Cloudflare Workers API
 */
async function makeWorkersApiRequest(
  method: string,
  path: string,
  body?: any
): Promise<any> {
  if (!CLOUDFLARE_API_TOKEN) {
    throw new Error("CLOUDFLARE_API_TOKEN is required for Workers API access");
  }

  const url = `${getWorkersApiUrl()}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Cloudflare Workers API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

/**
 * Get all custom domains for the worker
 */
export async function getCustomDomains(): Promise<string[]> {
  try {
    const response = await makeWorkersApiRequest("GET", "/domains");

    // Handle different response structures
    if (response && response.success) {
      // Check if result is an array
      if (Array.isArray(response.result)) {
        return response.result.map((domain: any) => domain.hostname || domain);
      }
      // Check if result exists but is not an array (might be an object)
      if (response.result && typeof response.result === "object") {
        // Try to extract domains from the result object
        if (Array.isArray(response.result.items)) {
          return response.result.items.map(
            (domain: any) => domain.hostname || domain
          );
        }
        // If result is a single domain object
        if (response.result.hostname) {
          return [response.result.hostname];
        }
      }
    }

    // If response structure is different, try to handle it
    if (Array.isArray(response)) {
      return response.map((domain: any) => domain.hostname || domain);
    }

    return [];
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    // Don't log as error - this is expected for some worker configurations
    // The routes API will be used as fallback
    return [];
  }
}

/**
 * Add a custom domain to the worker
 * Tries both custom domains API and routes API
 */
export async function addCustomDomain(hostname: string): Promise<boolean> {
  try {
    // Check if domain already exists
    const existingDomains = await getCustomDomains();
    if (existingDomains.includes(hostname)) {
      console.log(`[Worker Routes] ℹ️  Domain ${hostname} already configured`);
      return true;
    }

    // Try custom domains API first (for Workers Sites/Pages)
    try {
      const response = await makeWorkersApiRequest("POST", "/domains", {
        hostname,
      });

      if (response.success) {
        console.log(`[Worker Routes] ✅ Added custom domain: ${hostname}`);
        return true;
      }
    } catch (customDomainError) {
      // If custom domain API fails, try routes API (requires zone)
      console.log(
        `[Worker Routes] Custom domain API failed, trying routes API...`
      );

      const zoneId = await getZoneId(hostname);
      if (zoneId) {
        try {
          const routesUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/workers/routes`;
          const routesResponse = await fetch(routesUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pattern: `${hostname}/*`,
              script: WORKER_NAME,
            }),
          });

          if (routesResponse.ok) {
            const routesData = await routesResponse.json();
            if (routesData.success) {
              console.log(
                `[Worker Routes] ✅ Added route for ${hostname} via zone ${zoneId}`
              );
              return true;
            }
          }
        } catch (routesError) {
          console.warn(`[Worker Routes] Routes API also failed:`, routesError);
        }
      } else {
        console.log(
          `[Worker Routes] ℹ️  Domain ${hostname} not found in Cloudflare zones. Manual setup required.`
        );
      }
    }

    console.warn(
      `[Worker Routes] ⚠️  Could not automatically add domain ${hostname}`
    );
    console.warn(
      `[Worker Routes] 💡 Manual setup: Add ${hostname}/* as a route in Cloudflare Dashboard`
    );
    return false;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      `[Worker Routes] ❌ Failed to add custom domain ${hostname}:`,
      errorMessage
    );

    // Don't throw - route addition failure shouldn't break deployment
    // The domain might need to be added manually or DNS might not be configured yet
    return false;
  }
}

/**
 * Remove a custom domain from the worker
 */
export async function removeCustomDomain(hostname: string): Promise<boolean> {
  try {
    const response = await makeWorkersApiRequest(
      "DELETE",
      `/domains/${hostname}`
    );

    if (response.success) {
      console.log(`[Worker Routes] ✅ Removed custom domain: ${hostname}`);
      return true;
    }

    console.warn(
      `[Worker Routes] ⚠️  Failed to remove domain ${hostname}:`,
      response
    );
    return false;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      `[Worker Routes] ❌ Failed to remove custom domain ${hostname}:`,
      errorMessage
    );
    return false;
  }
}

/**
 * Check if a hostname is a preview domain on hero-pages.com
 * Preview domains are subdomains like: benevi-lid-guide.hero-pages.com
 */
function isPreviewDomainOnHeroPages(hostname: string): boolean {
  // Check if it's a subdomain of hero-pages.com
  // Format: {something}.hero-pages.com
  const heroPagesPattern = /^[^.]+\.hero-pages\.com$/;
  return heroPagesPattern.test(hostname);
}

/**
 * Check and configure SSL settings for hero-pages.com zone
 * This ensures SSL certificates can be provisioned for subdomains
 */
async function ensureSSLConfiguration(zoneId: string): Promise<boolean> {
  try {
    // Get current SSL settings
    const sslUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/ssl`;
    const sslResponse = await fetch(sslUrl, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (sslResponse.ok) {
      const sslData = await sslResponse.json();
      if (sslData.success && sslData.result) {
        const sslMode = sslData.result.value;
        // SSL mode should be 'full' or 'full_strict' for proper SSL handling
        if (sslMode === "full" || sslMode === "full_strict") {
          console.log(
            `[Worker Routes] ✅ SSL mode is correctly set to: ${sslMode}`
          );
          return true;
        } else {
          console.log(`[Worker Routes] ⚠️  SSL mode is set to: ${sslMode}`);
          console.log(
            `[Worker Routes] 💡 For proper SSL, set SSL/TLS mode to "Full" or "Full (strict)" in Cloudflare Dashboard`
          );
          console.log(
            `[Worker Routes] 💡 Go to: hero-pages.com → SSL/TLS → Overview → Set to "Full"`
          );
        }
      }
    }
    return false;
  } catch (error) {
    console.warn(
      `[Worker Routes] ⚠️  Could not check SSL configuration:`,
      error
    );
    return false;
  }
}

/**
 * Ensure a wildcard route for hero-pages.com subdomains
 * This sets up *.hero-pages.com/* route pattern to handle all preview domains
 */
export async function ensureHeroPagesWildcardRoute(): Promise<boolean> {
  try {
    const zoneId = await getZoneId("hero-pages.com");
    if (!zoneId) {
      console.log(
        `[Worker Routes] ⚠️  hero-pages.com zone not found in Cloudflare.`
      );
      console.log(
        `[Worker Routes] 💡 Please add hero-pages.com as a zone in Cloudflare Dashboard.`
      );
      console.log(
        `[Worker Routes] 💡 You can keep DNS in do.de - just add the zone for Worker routes.`
      );
      return false;
    }

    // Check SSL configuration
    await ensureSSLConfiguration(zoneId);

    // Check if wildcard route already exists
    const routesUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/workers/routes`;
    const checkResponse = await fetch(routesUrl, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (checkResponse.ok) {
      const routesData = await checkResponse.json();
      if (routesData.success && routesData.result) {
        const existingRoute = routesData.result.find(
          (route: any) =>
            (route.pattern === "*.hero-pages.com/*" ||
              route.pattern === "*hero-pages.com/*") &&
            route.script === WORKER_NAME
        );
        if (existingRoute) {
          console.log(
            `[Worker Routes] ✅ Wildcard route *.hero-pages.com/* already exists`
          );
          return true;
        }
      }
    } else {
      const errorText = await checkResponse.text();
      console.warn(
        `[Worker Routes] ⚠️  Failed to check existing routes: ${checkResponse.status} - ${errorText}`
      );
    }

    // Add wildcard route
    console.log(
      `[Worker Routes] 🔧 Adding wildcard route *.hero-pages.com/*...`
    );
    const addResponse = await fetch(routesUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pattern: "*.hero-pages.com/*",
        script: WORKER_NAME,
      }),
    });

    if (addResponse.ok) {
      const addData = await addResponse.json();
      if (addData.success) {
        console.log(
          `[Worker Routes] ✅ Successfully added wildcard route *.hero-pages.com/*`
        );
        console.log(
          `[Worker Routes] 💡 Note: SSL certificates will be automatically provisioned by Cloudflare.`
        );
        return true;
      } else {
        const errorText = JSON.stringify(addData);
        console.warn(
          `[Worker Routes] ⚠️  Route API returned success=false: ${errorText}`
        );
      }
    } else {
      const errorText = await addResponse.text();
      console.warn(
        `[Worker Routes] ⚠️  Failed to add route: ${addResponse.status} - ${errorText}`
      );
      console.warn(
        `[Worker Routes] 💡 You may need to add the route manually in Cloudflare Dashboard:`
      );
      console.warn(
        `[Worker Routes] 💡 Workers & Pages → herokit-static-router → Settings → Triggers → Add route: *.hero-pages.com/*`
      );
    }

    return false;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[Worker Routes] ⚠️  Could not ensure wildcard route for hero-pages.com:`,
      errorMessage
    );
    console.warn(
      `[Worker Routes] 💡 Manual setup required: Add route *.hero-pages.com/* in Cloudflare Dashboard`
    );
    return false;
  }
}

/**
 * Ensure a custom domain is configured for the worker
 * This is called during deployment to automatically set up routing
 */
export async function ensureCustomDomain(hostname: string): Promise<void> {
  try {
    // Skip for workers.dev domains - they don't need custom domain setup
    if (hostname.includes(".workers.dev")) {
      return;
    }

    // Handle preview domains on hero-pages.com
    // These can be configured even if DNS is managed elsewhere (like do.de)
    if (isPreviewDomainOnHeroPages(hostname)) {
      console.log(
        `[Worker Routes] ℹ️  Preview domain on hero-pages.com detected: ${hostname}`
      );

      // Ensure wildcard route exists (handles all *.hero-pages.com subdomains)
      await ensureHeroPagesWildcardRoute();

      // Note: Individual preview domains don't need separate routes
      // The wildcard route *.hero-pages.com/* handles all of them
      console.log(
        `[Worker Routes] ℹ️  Preview domain ${hostname} will be handled by wildcard route *.hero-pages.com/*`
      );
      return;
    }

    // Skip for other preview domains that might not have DNS configured
    // Only add production domains automatically
    if (hostname.startsWith("preview-")) {
      console.log(
        `[Worker Routes] ℹ️  Skipping preview domain ${hostname} - DNS may not be configured`
      );
      return;
    }

    await addCustomDomain(hostname);
  } catch (error) {
    // Log but don't throw - this is a best-effort operation
    // Domains can be added manually if automatic addition fails
    console.warn(
      `[Worker Routes] ⚠️  Could not ensure custom domain ${hostname}:`,
      error
    );
  }
}

/**
 * Create a redirect rule to redirect www subdomain to apex domain
 * Uses Cloudflare's Redirect Rules (Rulesets API) at the ZONE level
 * Correct Phase: http_request_dynamic_redirect
 */
export async function createWwwRedirect(apexDomain: string): Promise<boolean> {
  try {
    const zoneId = await getZoneId(apexDomain);
    if (!zoneId) {
      console.log(
        `[Redirect Rules] ⚠️  Zone not found for ${apexDomain}, skipping www redirect setup`
      );
      return false;
    }

    const wwwDomain = `www.${apexDomain}`;
    console.log(
      `[Redirect Rules] 🔧 Setting up www redirect (Zone Level, preserves path and query)...`
    );
    console.log(
      `[Redirect Rules] 💡 This rule will redirect all www.* subdomains in the zone to their naked equivalents`
    );

    // FIX: Use 'http_request_dynamic_redirect' for Zone-level Single Redirects
    // 'http_request_redirect' is strictly for Account-level Bulk Redirects
    const entrypointUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`;

    let existingRulesetId: string | null = null;
    let existingRules: any[] = [];

    // Get the entrypoint ruleset
    try {
      const getEntrypointResponse = await fetch(entrypointUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (getEntrypointResponse.ok) {
        const entrypointData = await getEntrypointResponse.json();
        if (entrypointData.success && entrypointData.result) {
          existingRulesetId = entrypointData.result.id;

          // Get the actual ruleset
          if (existingRulesetId) {
            const getRulesetUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/${existingRulesetId}`;
            const getRulesetResponse = await fetch(getRulesetUrl, {
              headers: {
                Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                "Content-Type": "application/json",
              },
            });

            if (getRulesetResponse.ok) {
              const rulesetData = await getRulesetResponse.json();
              if (
                rulesetData.success &&
                rulesetData.result &&
                rulesetData.result.rules
              ) {
                existingRules = rulesetData.result.rules || [];

                // Check if www redirect rule already exists (look for starts_with pattern)
                const existingRule = existingRules.find(
                  (rule: any) =>
                    rule.expression &&
                    (rule.expression.includes(
                      `starts_with(http.host, "www.")`
                    ) ||
                      rule.expression.includes(
                        `http.host eq "${wwwDomain}"`
                      )) &&
                    rule.action === "redirect"
                );
                if (existingRule) {
                  console.log(
                    `[Redirect Rules] ✅ www redirect rule already exists (covers all www subdomains)`
                  );
                  return true;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(
        `[Redirect Rules] ℹ️  Could not get existing ruleset, will create new one`
      );
    }

    // Create the redirect rule using dynamic expressions to preserve path and query
    // This single rule works for all www subdomains in the zone
    const newRule = {
      action: "redirect",
      expression: `(starts_with(http.host, "www."))`,
      description: "Redirect all www to naked (preserves path and query)",
      action_parameters: {
        from_value: {
          status_code: 301,
          target_url: {
            expression: `concat("https://", substring(http.host, 4), http.request.uri.path)`,
          },
          preserve_query_string: true,
        },
      },
    };

    // Prepare payload - ensure www redirect rule is first
    // Find the index of trailing slash rule if it exists (to insert www rule before it)
    const trailingSlashRuleIndex = existingRules.findIndex(
      (rule: any) =>
        rule.expression &&
        rule.expression.includes(`not ends_with(http.request.uri.path, "/")`) &&
        rule.action === "redirect"
    );

    let allRules: any[];
    if (trailingSlashRuleIndex >= 0) {
      // Insert www rule before trailing slash rule
      allRules = [
        newRule,
        ...existingRules.slice(0, trailingSlashRuleIndex),
        ...existingRules.slice(trailingSlashRuleIndex),
      ];
    } else {
      // No trailing slash rule found, place www rule at the beginning
      allRules = [newRule, ...existingRules];
    }

    const rulesetPayload = {
      rules: allRules,
    };

    let response: Response;
    if (existingRulesetId) {
      // Update existing ruleset
      const updateUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/${existingRulesetId}`;
      response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rulesetPayload),
      });
    } else {
      // Create new ruleset
      response = await fetch(entrypointUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Zone Redirect Rules",
          rules: rulesetPayload.rules,
        }),
      });
    }

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log(
          `[Redirect Rules] ✅ Created www redirect rule (preserves path and query)`
        );
        console.log(
          `[Redirect Rules] 💡 Example: https://www.${apexDomain}/foo/bar?x=1 → https://${apexDomain}/foo/bar?x=1`
        );
        return true;
      } else {
        console.warn(
          `[Redirect Rules] ⚠️  API returned success=false:`,
          JSON.stringify(data)
        );
      }
    } else {
      const errorText = await response.text();
      console.warn(
        `[Redirect Rules] ⚠️  Failed to create redirect: ${response.status} - ${errorText}`
      );
    }

    return false;
  } catch (error) {
    console.warn(`[Redirect Rules] ⚠️  Could not create www redirect:`, error);
    return false;
  }
}

/**
 * Create a trailing slash normalization rule
 * Adds trailing slash to paths that don't have one (ignores files and paths that already end with /)
 * Uses Cloudflare's Redirect Rules (Rulesets API) at the ZONE level
 * Correct Phase: http_request_dynamic_redirect
 */
export async function createTrailingSlashRule(
  apexDomain: string
): Promise<boolean> {
  try {
    const zoneId = await getZoneId(apexDomain);
    if (!zoneId) {
      console.log(
        `[Redirect Rules] ⚠️  Zone not found for ${apexDomain}, skipping trailing slash rule setup`
      );
      return false;
    }

    console.log(
      `[Redirect Rules] 🔧 Setting up trailing slash normalization rule (Zone Level)...`
    );
    console.log(
      `[Redirect Rules] 💡 This rule will add trailing slashes to paths (ignores files and paths that already end with /)`
    );

    // Use 'http_request_dynamic_redirect' for Zone-level Single Redirects
    const entrypointUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`;

    let existingRulesetId: string | null = null;
    let existingRules: any[] = [];

    // Get the entrypoint ruleset
    try {
      const getEntrypointResponse = await fetch(entrypointUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (getEntrypointResponse.ok) {
        const entrypointData = await getEntrypointResponse.json();
        if (entrypointData.success && entrypointData.result) {
          existingRulesetId = entrypointData.result.id;

          // Get the actual ruleset
          if (existingRulesetId) {
            const getRulesetUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/${existingRulesetId}`;
            const getRulesetResponse = await fetch(getRulesetUrl, {
              headers: {
                Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                "Content-Type": "application/json",
              },
            });

            if (getRulesetResponse.ok) {
              const rulesetData = await getRulesetResponse.json();
              if (
                rulesetData.success &&
                rulesetData.result &&
                rulesetData.result.rules
              ) {
                existingRules = rulesetData.result.rules || [];

                // Check if trailing slash rule already exists
                const existingRule = existingRules.find(
                  (rule: any) =>
                    rule.expression &&
                    rule.expression.includes(
                      `not ends_with(http.request.uri.path, "/")`
                    ) &&
                    (rule.expression.includes(
                      `not contains(http.request.uri.path, ".")`
                    ) ||
                      rule.expression.includes(
                        `not http.request.uri.path contains "."`
                      ) ||
                      rule.expression.includes(
                        `not matches(http.request.uri.path`
                      ) ||
                      rule.expression.includes(
                        `not regex_match(http.request.uri.path`
                      )) &&
                    rule.action === "redirect"
                );
                if (existingRule) {
                  console.log(
                    `[Redirect Rules] ✅ Trailing slash normalization rule already exists`
                  );
                  return true;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(
        `[Redirect Rules] ℹ️  Could not get existing ruleset, will create new one`
      );
    }

    // Create the trailing slash normalization rule
    // Expression: paths that don't end with "/" and don't contain "." (files)
    // Target: add "/" to path and preserve query string
    const newRule = {
      action: "redirect",
      expression: `(not ends_with(http.request.uri.path, "/")) and not http.request.uri.path contains "."`,
      description:
        "Normalize trailing slash (add trailing slash to paths, ignore files)",
      action_parameters: {
        from_value: {
          status_code: 301,
          target_url: {
            expression: `concat(http.request.uri.path, "/")`,
          },
          preserve_query_string: true,
        },
      },
    };

    // Prepare payload - ensure www redirect rule comes first, then trailing slash rule
    // Find the index of the www redirect rule if it exists
    const wwwRuleIndex = existingRules.findIndex(
      (rule: any) =>
        rule.expression &&
        (rule.expression.includes(`starts_with(http.host, "www.")`) ||
          rule.expression.includes(`http.host eq "www.`)) &&
        rule.action === "redirect"
    );

    let allRules: any[];
    if (wwwRuleIndex >= 0) {
      // Insert trailing slash rule right after www redirect rule
      allRules = [
        ...existingRules.slice(0, wwwRuleIndex + 1),
        newRule,
        ...existingRules.slice(wwwRuleIndex + 1),
      ];
    } else {
      // No www rule found, just append the trailing slash rule
      allRules = [...existingRules, newRule];
    }

    const rulesetPayload = {
      rules: allRules,
    };

    let response: Response;
    if (existingRulesetId) {
      // Update existing ruleset
      const updateUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/${existingRulesetId}`;
      response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rulesetPayload),
      });
    } else {
      // Create new ruleset
      response = await fetch(entrypointUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Zone Redirect Rules",
          rules: rulesetPayload.rules,
        }),
      });
    }

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log(
          `[Redirect Rules] ✅ Created trailing slash normalization rule`
        );
        console.log(
          `[Redirect Rules] 💡 Example: https://${apexDomain}/abc?x=1 → https://${apexDomain}/abc/?x=1`
        );
        return true;
      } else {
        console.warn(
          `[Redirect Rules] ⚠️  API returned success=false:`,
          JSON.stringify(data)
        );
      }
    } else {
      const errorText = await response.text();
      console.warn(
        `[Redirect Rules] ⚠️  Failed to create trailing slash rule: ${response.status} - ${errorText}`
      );
    }

    return false;
  } catch (error) {
    console.warn(
      `[Redirect Rules] ⚠️  Could not create trailing slash rule:`,
      error
    );
    return false;
  }
}
