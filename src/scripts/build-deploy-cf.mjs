#!/usr/bin/env node

/**
 * Cloudflare Build and Deploy Script
 *
 * Similar to build:deploy but for Cloudflare R2 deployment.
 * Deploys sites to R2 and sets up routing via KV and Worker routes.
 *
 * Usage:
 *   pnpm build:deploy:cf [options] [product-ids...]
 *
 * Examples:
 *   pnpm build:deploy:cf --generate --all
 *   pnpm build:deploy:cf --deploy bayern
 *   pnpm build:deploy:cf bayern berlin brandenburg
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local (same as generate-sitemap.mjs)
const projectRoot = path.resolve(__dirname, "..", "..");
dotenv.config({ path: path.join(projectRoot, ".env.local"), quiet: true });
dotenv.config({ path: path.join(projectRoot, ".env"), quiet: true });

// Configuration
const HERO_SITES_DOMAIN = "hero-pages.com";
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "herokit-sites";
const WORKER_NAME =
  process.env.CLOUDFLARE_WORKER_NAME || "herokit-static-router";

// Ensure R2_BUCKET_NAME is set in environment for R2Deployer
if (!process.env.CLOUDFLARE_R2_BUCKET_NAME) {
  process.env.CLOUDFLARE_R2_BUCKET_NAME = R2_BUCKET_NAME;
}

// Import product/domain mappings - read JSON directly to avoid assert syntax issues
let domainsToPopulate = {};
try {
  const multiPageConfigPath = path.join(
    __dirname,
    "..",
    "data",
    "multi-page-config.json"
  );
  if (fs.existsSync(multiPageConfigPath)) {
    const multiPageConfig = JSON.parse(
      fs.readFileSync(multiPageConfigPath, "utf8")
    );
    if (multiPageConfig.sites && Array.isArray(multiPageConfig.sites)) {
      multiPageConfig.sites.forEach((site) => {
        if (site.id && site.domain) {
          domainsToPopulate[site.id] = site.domain;
        }
      });
    }
    if (Object.keys(domainsToPopulate).length > 0) {
      console.log(
        `✅ Loaded ${Object.keys(domainsToPopulate).length} site(s) from config`
      );
    }
  }
} catch (error) {
  console.warn("⚠️  Could not load config, using empty mapping");
  if (error.message) {
    console.warn(`   Error: ${error.message}`);
  }
}

// Function to execute shell commands
const exec = (command, options = {}) => {
  const { silent = false, ignoreError = false, cwd, env } = options;
  try {
    const output = execSync(command, {
      stdio: silent ? "pipe" : "inherit",
      encoding: "utf8",
      env: env || { ...process.env },
      cwd: cwd || process.cwd(),
    });
    return output ? output.toString().trim() : "";
  } catch (error) {
    if (!silent && !ignoreError) {
      console.error(`Error executing command: ${command}`);
      console.error(error.message);
      process.exit(1);
    }
    return "";
  }
};

// Function to validate Cloudflare environment variables
const validateCloudflareConfig = () => {
  const errors = [];
  const required = [
    "CLOUDFLARE_R2_ACCOUNT_ID",
    "CLOUDFLARE_R2_ACCESS_KEY_ID",
    "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
    "CLOUDFLARE_R2_ENDPOINT",
    "CLOUDFLARE_KV_NAMESPACE_ID",
    "CLOUDFLARE_API_TOKEN",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      errors.push(`${key} is not set`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Function to generate sitemap for a specific site
const generateSitemap = async (productId) => {
  console.log(`\n🗺️  Generating sitemap for ${productId}...`);

  try {
    const projectRoot = path.resolve(__dirname, "..", "..");
    const sitemapEnv = {
      ...process.env,
      SITE_ID: productId,
    };

    exec(`node src/scripts/generate-sitemap.mjs`, {
      silent: false,
      cwd: projectRoot,
      env: sitemapEnv,
    });

    console.log(`✅ Sitemap generated successfully for ${productId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate sitemap for ${productId}`);
    return false;
  }
};

// Function to generate llm.txt for a specific site
const generateLlmTxt = async (productId) => {
  console.log(`\n📝 Generating llm.txt for ${productId}...`);
  console.log(
    `\x1b[31m⚠️  WARNING: This step should only be run when the content on the website changes and the website is ready for final review.\x1b[0m`
  );

  try {
    const projectRoot = path.resolve(__dirname, "..", "..");

    exec(`node src/scripts/generate-llm-txt.mjs ${productId}`, {
      silent: false,
      cwd: projectRoot,
    });

    console.log(`✅ llm.txt generated successfully for ${productId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate llm.txt for ${productId}`);
    return false;
  }
};

// Function to run generate-static script for specific sites
const runGenerateStatic = async (productIds) => {
  console.log("\n🔨 Running generate-static script...\n");

  const results = [];

  for (const productId of productIds) {
    console.log(
      `\n📋 Generating static build for: ${productId} (${domainsToPopulate[productId]})`
    );
    console.log("=".repeat(50));

    try {
      const projectRoot = path.resolve(__dirname, "..", "..");
      exec(`node src/scripts/generate-static.mjs ${productId}`, {
        silent: false,
        cwd: projectRoot,
      });
      results.push({ productId, success: true });
    } catch (error) {
      console.error(`❌ Failed to generate static build for ${productId}`);
      results.push({ productId, success: false });
    }
  }

  return results;
};

// Function to run generate-static script for all sites
const runGenerateStaticAll = async () => {
  console.log("\n🔨 Running generate-static script for all sites...\n");

  try {
    const projectRoot = path.resolve(__dirname, "..", "..");
    exec("node src/scripts/generate-static.mjs", {
      silent: false,
      cwd: projectRoot,
    });
    return true;
  } catch (error) {
    console.error("❌ Failed to generate static builds for all sites");
    return false;
  }
};

// Function to generate sitemaps for all sites
const generateSitemapsAll = async () => {
  console.log("\n🗺️  Generating sitemaps for all sites...\n");

  const results = [];
  const productIds = Object.keys(domainsToPopulate);

  for (const productId of productIds) {
    const success = await generateSitemap(productId);
    results.push({ productId, success });
  }

  return results.every((result) => result.success);
};

// Function to generate sitemaps for specific sites
const generateSitemaps = async (productIds) => {
  console.log("\n🗺️  Generating sitemaps...\n");

  const results = [];

  for (const productId of productIds) {
    const success = await generateSitemap(productId);
    results.push({ productId, success });
  }

  return results.every((result) => result.success);
};

// Function to generate llm.txt files for all sites
const generateLlmTxtsAll = async () => {
  console.log("\n📝 Generating llm.txt files for all sites...\n");

  try {
    const projectRoot = path.resolve(__dirname, "..", "..");

    exec(`node src/scripts/generate-llm-txt.mjs all`, {
      silent: false,
      cwd: projectRoot,
    });

    console.log(`✅ llm.txt files generated successfully for all sites`);
    return true;
  } catch (error) {
    console.error("❌ Failed to generate llm.txt files for all sites");
    return false;
  }
};

// Function to generate llm.txt files for specific sites
const generateLlmTxts = async (productIds) => {
  console.log("\n📝 Generating llm.txt files...\n");

  const results = [];

  for (const productId of productIds) {
    const success = await generateLlmTxt(productId);
    results.push({ productId, success });
  }

  return results.every((result) => result.success);
};

// Function to get static build path for a product
const getStaticBuildPath = (productId) => {
  const projectRoot = path.resolve(__dirname, "..", "..");

  // Determine output path (based on generate-static script output)
  const possiblePaths = [
    path.join(projectRoot, "static-builds", productId),
    path.join(projectRoot, "tmp", "sites", productId),
    path.join(projectRoot, "out", productId),
    path.join(projectRoot, "dist", productId),
    path.join(projectRoot, "apps", "web", "tmp", "sites", productId),
  ];

  for (const sitePath of possiblePaths) {
    if (fs.existsSync(sitePath)) {
      return sitePath;
    }
  }

  return null;
};

// Function to deploy to R2
const deployToR2 = async (productId, sitePath, branch = "main") => {
  console.log(`\n📤 Deploying ${productId} to R2 bucket: ${R2_BUCKET_NAME}...`);
  console.log(`   Site path: ${sitePath}`);

  // Verify site path exists
  if (!fs.existsSync(sitePath)) {
    const errorMsg = `Site path does not exist: ${sitePath}`;
    console.error(`❌ ${errorMsg}`);
    return {
      success: false,
      error: errorMsg,
    };
  }

  try {
    // Ensure bucket name is in environment for R2Deployer
    process.env.CLOUDFLARE_R2_BUCKET_NAME = R2_BUCKET_NAME;

    // Dynamically import R2Deployer
    const r2DeployerModule = await import(
      path.join(__dirname, "..", "lib", "deployment", "r2-deployer.ts")
    );
    const R2Deployer = r2DeployerModule.R2Deployer;

    const deployer = new R2Deployer();
    // R2Deployer uses branch for internal R2 path organization: sites/{siteId}/{branch}/
    // Note: Branch is NOT part of the public URL (hostname is just {productId}.hero-pages.com)
    console.log(`   Uploading files from ${sitePath}...`);
    console.log(`   Using branch: ${branch}`);
    const result = await deployer.deploy({
      siteId: productId,
      sitePath,
      branch, // Internal R2 organization, not in public URL
    });

    if (result.success) {
      console.log(`✅ Deployed to R2: ${result.r2Path}`);
      console.log(`   Bucket: ${R2_BUCKET_NAME}`);
    } else {
      console.error(`❌ R2 deployment failed: ${result.error}`);
    }

    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`❌ Failed to deploy to R2:`, errorMessage);
    if (error instanceof Error && error.stack) {
      console.error(`   Stack: ${error.stack}`);
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Function to get R2 path from KV or construct it
const getR2Path = async (productId, branch = "main") => {
  try {
    // Try to get from KV first
    const kvRouterModule = await import(
      path.join(__dirname, "..", "lib", "deployment", "kv-router.ts")
    );
    const getRoute = kvRouterModule.getRoute;

    const hostname = `${productId}.${HERO_SITES_DOMAIN}`;
    const route = await getRoute(hostname);

    if (route && route.prefix) {
      return route.prefix;
    }
  } catch (error) {
    // If KV lookup fails, construct the path
    console.log(
      `ℹ️  Could not get R2 path from KV, constructing from siteId and branch`
    );
  }

  // Construct R2 path: sites/{siteId}/{branch}
  return `sites/${productId}/${branch}`;
};

// Function to set up post-deployment configuration (KV routes, redirects, etc.)
const setupPostDeployment = async (
  productId,
  r2Path,
  branch,
  deploymentType
) => {
  const hostname = `${productId}.${HERO_SITES_DOMAIN}`;
  const results = {
    heroPagesKv: false,
    mainDomainKv: false,
    workerRoute: false,
    wwwRedirect: false,
    trailingSlash: false,
  };

  // Always set up hero-pages.com subdomain route
  console.log(`\n🔗 Setting up hero-pages.com route: ${hostname}...`);

  // Create DNS records for hero-pages.com subdomain
  try {
    const workerRoutesModule = await import(
      path.join(__dirname, "..", "lib", "deployment", "worker-routes.ts")
    );

    if (workerRoutesModule.createSubdomainDnsRecords) {
      console.log(`📝 Creating DNS records for ${productId}.hero-pages.com...`);
      // Target will be determined automatically from worker's custom domains
      // or use default workers.dev domain
      await workerRoutesModule.createSubdomainDnsRecords(productId);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `⚠️  Could not create DNS records for ${hostname}:`,
      errorMessage
    );
    // Continue even if DNS creation fails
  }

  results.heroPagesKv = await setupKVRoute(hostname, productId, r2Path, branch);
  if (!results.heroPagesKv) {
    console.warn(
      `⚠️  KV route setup failed for ${hostname}, but continuing...`
    );
  }

  // Set up main domain route only for final deployments
  if (deploymentType === "final") {
    const mainDomain = domainsToPopulate[productId] || null;
    if (mainDomain) {
      console.log(`\n🌐 Setting up main domain: ${mainDomain}...`);

      // Set up KV route for main domain
      results.mainDomainKv = await setupKVRoute(
        mainDomain,
        productId,
        r2Path,
        branch
      );
      if (!results.mainDomainKv) {
        console.warn(
          `⚠️  KV route setup failed for ${mainDomain}, but continuing...`
        );
      }

      // Ensure worker route for main domain
      try {
        const workerRoutesModule = await import(
          path.join(__dirname, "..", "lib", "deployment", "worker-routes.ts")
        );
        const ensureCustomDomain = workerRoutesModule.ensureCustomDomain;

        await ensureCustomDomain(mainDomain);
        results.workerRoute = true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.warn(
          `⚠️  Could not ensure worker route for ${mainDomain}:`,
          errorMessage
        );
        console.warn(
          `💡 You may need to add the domain manually in Cloudflare Dashboard`
        );
      }

      // Set up www redirect (redirects www.domain to domain)
      try {
        const workerRoutesModule = await import(
          path.join(__dirname, "..", "lib", "deployment", "worker-routes.ts")
        );

        if (!workerRoutesModule.createWwwRedirect) {
          throw new Error(
            "createWwwRedirect function not found in worker-routes module"
          );
        }

        const createWwwRedirect = workerRoutesModule.createWwwRedirect;
        results.wwwRedirect = await createWwwRedirect(mainDomain);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.warn(
          `⚠️  Could not create www redirect for ${mainDomain}:`,
          errorMessage
        );
        if (error instanceof Error && error.stack) {
          console.warn(`   Stack: ${error.stack}`);
        }
        console.warn(
          `💡 You may need to set up the redirect manually in Cloudflare Dashboard`
        );
        console.warn(
          `💡 Rules → Redirect Rules → www.${mainDomain}/* → ${mainDomain}/$1 (301)`
        );
      }

      // Set up trailing slash normalization rule
      try {
        const workerRoutesModule = await import(
          path.join(__dirname, "..", "lib", "deployment", "worker-routes.ts")
        );

        if (!workerRoutesModule.createTrailingSlashRule) {
          throw new Error(
            "createTrailingSlashRule function not found in worker-routes module"
          );
        }

        const createTrailingSlashRule =
          workerRoutesModule.createTrailingSlashRule;
        results.trailingSlash = await createTrailingSlashRule(mainDomain);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.warn(
          `⚠️  Could not create trailing slash normalization rule for ${mainDomain}:`,
          errorMessage
        );
        if (error instanceof Error && error.stack) {
          console.warn(`   Stack: ${error.stack}`);
        }
        console.warn(
          `💡 You may need to set up the rule manually in Cloudflare Dashboard`
        );
        console.warn(
          `💡 Rules → Redirect Rules → Expression: (not ends_with(http.request.uri.path, "/")) and not http.request.uri.path contains "."`
        );
      }
    }
  } else {
    console.log(
      `\nℹ️  Test deployment - skipping main domain setup (hero-pages.com only)`
    );
  }

  return results;
};

// Function to set up KV route
const setupKVRoute = async (hostname, productId, r2Path, branch = "main") => {
  console.log(`\n🔗 Setting up KV route: ${hostname} → ${r2Path}...`);

  try {
    // Dynamically import KV router
    const kvRouterModule = await import(
      path.join(__dirname, "..", "lib", "deployment", "kv-router.ts")
    );
    const setRoute = kvRouterModule.setRoute;

    await setRoute(hostname, {
      siteId: productId,
      branch, // Internal organization in R2, not in public URL
      prefix: r2Path,
      domain: hostname,
      updatedAt: new Date().toISOString(),
    });

    console.log(`✅ KV route configured: ${hostname} → ${r2Path}`);
    return true;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`❌ Failed to set KV route:`, errorMessage);
    return false;
  }
};

// Function to ensure Worker route for wildcard domain
const ensureWorkerRoute = async () => {
  console.log(`\n🔗 Ensuring Worker route for *.${HERO_SITES_DOMAIN}...`);

  try {
    // Dynamically import worker routes
    const workerRoutesModule = await import(
      path.join(__dirname, "..", "lib", "deployment", "worker-routes.ts")
    );
    const ensureHeroPagesWildcardRoute =
      workerRoutesModule.ensureHeroPagesWildcardRoute;

    // Use the function from worker-routes.ts to set up the wildcard route
    return await ensureHeroPagesWildcardRoute();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn(`⚠️  Could not ensure Worker route:`, errorMessage);
    return false;
  }
};

// Function to process sites (generate and deploy)
const processSites = async (
  productIds,
  mode = "both",
  generateLlmTxtFile = false,
  deploymentType = "final"
) => {
  console.log(
    `\n🚀 Processing ${productIds.length} product(s) in ${mode} mode...\n`
  );
  console.log(
    `📦 Deployment type: ${deploymentType === "test" ? "🧪 Test (test branch, hero-pages.com only)" : "🚀 Final (main branch, client domain)"}\n`
  );

  // For Cloudflare static deployments, we must disable text editor
  // Cloudflare R2 deployments are static exports only
  // For final deployments, editor and SEO buttons should NOT appear
  console.log(
    "📝 Cloudflare deployment uses static export - text editor and SEO buttons disabled\n"
  );
  process.env.ENABLE_TEXT_EDITOR = "false";

  // Check for external API URL and token (used for email sending, reCAPTCHA verification, etc.)
  const externalApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const externalApiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  if (externalApiUrl) {
    console.log(`🔗 External API configured: ${externalApiUrl}\n`);
    if (externalApiToken) {
      console.log(`   ✅ Bearer token configured for authentication\n`);
    } else {
      console.log(
        `   ⚠️  No bearer token configured (NEXT_PUBLIC_API_TOKEN not set)\n`
      );
      console.log(`   💡 External API may require authentication\n`);
    }
  } else {
    console.log(
      "⚠️  No external API URL configured (NEXT_PUBLIC_API_URL not set)\n"
    );
    console.log(
      "   Email sending and reCAPTCHA verification will use default API endpoint\n"
    );
  }

  // Validate Cloudflare configuration
  const configValidation = validateCloudflareConfig();
  if (!configValidation.isValid) {
    console.error("\n❌ Cloudflare configuration is incomplete:");
    configValidation.errors.forEach((error) => {
      console.error(`   ❌ ${error}`);
    });
    console.error("\n💡 Please set the required environment variables:");
    console.error("   - CLOUDFLARE_R2_ACCOUNT_ID");
    console.error("   - CLOUDFLARE_R2_ACCESS_KEY_ID");
    console.error("   - CLOUDFLARE_R2_SECRET_ACCESS_KEY");
    console.error("   - CLOUDFLARE_R2_ENDPOINT");
    console.error("   - CLOUDFLARE_KV_NAMESPACE_ID");
    console.error("   - CLOUDFLARE_API_TOKEN");
    process.exit(1);
  }

  let sitemapSuccess = true; // Only used in generate/both mode
  let llmTxtSuccess = true; // Only used when generateLlmTxtFile is true
  let generateSuccess = true;
  let deploySuccess = true;

  // Generate sitemaps and llm.txt files BEFORE static builds
  if (mode === "generate" || mode === "both") {
    // Ensure Worker route for wildcard domain (only once)
    await ensureWorkerRoute();

    // Generate sitemaps first
    console.log("\n🗺️  Generating sitemaps...\n");
    if (productIds.length === Object.keys(domainsToPopulate).length) {
      // All products selected
      sitemapSuccess = await generateSitemapsAll();
    } else {
      // Specific products selected
      sitemapSuccess = await generateSitemaps(productIds);
    }

    // Generate llm.txt files if requested
    if (generateLlmTxtFile) {
      if (productIds.length === Object.keys(domainsToPopulate).length) {
        // All products selected
        llmTxtSuccess = await generateLlmTxtsAll();
      } else {
        // Specific products selected
        llmTxtSuccess = await generateLlmTxts(productIds);
      }
    }

    // Generate static builds after sitemaps and llm.txt are complete
    if (sitemapSuccess && (!generateLlmTxtFile || llmTxtSuccess)) {
      if (productIds.length === Object.keys(domainsToPopulate).length) {
        // All products selected, use the all-in-one approach
        generateSuccess = await runGenerateStaticAll();
      } else {
        // Specific products selected, run individually
        const results = await runGenerateStatic(productIds);
        generateSuccess = results.every((result) => result.success);
      }
    } else {
      generateSuccess = false;
    }
  }

  // Validate domain configuration for final deployments
  if (deploymentType === "final" && (mode === "deploy" || mode === "both")) {
    const sitesWithoutDomain = productIds.filter(
      (id) => !domainsToPopulate[id]
    );
    if (sitesWithoutDomain.length > 0) {
      console.error("\n❌ Final deployment requires domain configuration:");
      sitesWithoutDomain.forEach((id) => {
        console.error(`   • ${id} - no domain set in multi-page-config.json`);
      });
      console.error(
        "\n💡 Please add domain configuration for these sites in multi-page-config.json"
      );
      console.error(
        "💡 Or use test deployment which only requires hero-pages.com subdomain"
      );
      process.exit(1);
    }
  }

  // Deploy if generation was successful and deployment is requested
  if (mode === "generate") {
    console.log("\n⚠️  Running in 'generate' mode - deployment skipped");
    console.log("💡 To deploy, run with --both or --deploy flag");
    console.log("   Example: pnpm build:deploy:cf --both --all");
  }

  // Post-deployment setup only (no R2 deployment)
  if (mode === "post-deploy") {
    console.log(
      "\n🔧 Running in 'post-deploy' mode - setting up routes and redirects only..."
    );
    const branch = deploymentType === "test" ? "test" : "main";
    const results = [];

    for (const productId of productIds) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(
        `Setting up post-deployment: ${productId} (${domainsToPopulate[productId] || "N/A"})`
      );
      console.log("=".repeat(60));

      // Get R2 path from KV or construct it
      const r2Path = await getR2Path(productId, branch);
      console.log(`📦 Using R2 path: ${r2Path}`);

      // Set up post-deployment configuration
      const setupResults = await setupPostDeployment(
        productId,
        r2Path,
        branch,
        deploymentType
      );

      results.push({
        productId,
        setupSuccess:
          setupResults.heroPagesKv &&
          (deploymentType === "test" || setupResults.mainDomainKv),
        heroPagesHostname: `${productId}.${HERO_SITES_DOMAIN}`,
        mainDomain:
          deploymentType === "final"
            ? domainsToPopulate[productId] || null
            : null,
        r2Path,
        branch,
        deploymentType,
        setupResults,
      });
    }

    // Print setup summary
    console.log("\n" + "=".repeat(60));
    console.log("POST-DEPLOYMENT SETUP SUMMARY");
    console.log("=".repeat(60));

    for (const result of results) {
      console.log(`\n${result.productId}:`);
      console.log(
        `  Deployment Type: ${result.deploymentType === "test" ? "🧪 Test" : "🚀 Final"}`
      );
      console.log(`  Branch: ${result.branch}`);
      if (result.r2Path) {
        console.log(`  R2 Path: ${result.r2Path}`);
      }
      if (result.heroPagesHostname) {
        console.log(`  Hero Pages: https://${result.heroPagesHostname}`);
      }
      if (result.mainDomain) {
        console.log(`  Main Domain: https://${result.mainDomain}`);
        console.log(
          `  WWW Domain: https://www.${result.mainDomain} (redirects to ${result.mainDomain})`
        );
      }
      console.log(
        `  Hero Pages KV: ${result.setupResults.heroPagesKv ? "✅" : "❌"}`
      );
      if (result.deploymentType === "final") {
        console.log(
          `  Main Domain KV: ${result.setupResults.mainDomainKv ? "✅" : "❌"}`
        );
        console.log(
          `  Worker Route: ${result.setupResults.workerRoute ? "✅" : "❌"}`
        );
        console.log(
          `  WWW Redirect: ${result.setupResults.wwwRedirect ? "✅" : "❌"}`
        );
        console.log(
          `  Trailing Slash: ${result.setupResults.trailingSlash ? "✅" : "❌"}`
        );
      }
      console.log(
        `  Setup: ${result.setupSuccess ? "✅ Success" : "❌ Failed"}`
      );
    }

    const setupSuccess = results.every((result) => result.setupSuccess);
    if (!setupSuccess) {
      console.error(
        "\n❌ Some post-deployment setup failed. Please check the logs above for details."
      );
      process.exit(1);
    } else {
      console.log("\n🎉 All post-deployment setup completed successfully!");
    }

    return setupSuccess;
  }

  if (generateSuccess && (mode === "deploy" || mode === "both")) {
    const branch = deploymentType === "test" ? "test" : "main";
    const results = [];

    for (const productId of productIds) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(
        `Deploying: ${productId} (${domainsToPopulate[productId] || "N/A"})`
      );
      console.log("=".repeat(60));

      let sitePath = null;
      let r2Path;
      let deploySuccessForSite = false;
      const hostname = `${productId}.${HERO_SITES_DOMAIN}`;

      // Find the static build path
      sitePath = getStaticBuildPath(productId);

      if (!sitePath) {
        console.error(`❌ No site path found for ${productId}`);
        results.push({
          productId,
          deploySuccess: false,
        });
        continue;
      }

      const r2Result = await deployToR2(productId, sitePath, branch);
      deploySuccessForSite = r2Result.success;
      r2Path = r2Result.r2Path;

      // Set up KV routes and worker routes
      if (deploySuccessForSite && r2Path) {
        await setupPostDeployment(productId, r2Path, branch, deploymentType);
      }

      results.push({
        productId,
        deploySuccess: deploySuccessForSite,
        heroPagesHostname: hostname,
        mainDomain:
          deploymentType === "final"
            ? domainsToPopulate[productId] || null
            : null,
        r2Path,
        branch,
        deploymentType,
      });
    }

    deploySuccess = results.every((result) => result.deploySuccess);

    // Print deployment summary
    console.log("\n" + "=".repeat(60));
    console.log("DEPLOYMENT SUMMARY");
    console.log("=".repeat(60));

    for (const result of results) {
      console.log(`\n${result.productId}:`);
      console.log(
        `  Deployment Type: ${result.deploymentType === "test" ? "🧪 Test" : "🚀 Final"}`
      );
      console.log(`  Branch: ${result.branch}`);
      if (result.r2Path) {
        console.log(`  R2 Path: ${result.r2Path}`);
      }
      if (result.heroPagesHostname) {
        console.log(`  Hero Pages: https://${result.heroPagesHostname}`);
      }
      if (result.mainDomain) {
        console.log(`  Main Domain: https://${result.mainDomain}`);
        console.log(
          `  WWW Domain: https://www.${result.mainDomain} (redirects to ${result.mainDomain})`
        );
      }
      console.log(
        `  Deploy: ${result.deploySuccess ? "✅ Success" : "❌ Failed"}`
      );
    }
  }

  // Print overall summary
  console.log("\n" + "=".repeat(60));
  console.log("PROCESSING SUMMARY");
  console.log("=".repeat(60));

  const overallSuccess =
    mode === "generate"
      ? generateSuccess &&
        sitemapSuccess &&
        (!generateLlmTxtFile || llmTxtSuccess)
      : mode === "deploy"
        ? deploySuccess
        : generateSuccess &&
          deploySuccess &&
          sitemapSuccess &&
          (!generateLlmTxtFile || llmTxtSuccess);

  if (mode === "generate" || mode === "both") {
    console.log(`Sitemaps: ${sitemapSuccess ? "✅ Success" : "❌ Failed"}`);
    if (generateLlmTxtFile) {
      console.log(`llm.txt: ${llmTxtSuccess ? "✅ Success" : "❌ Failed"}`);
    }
    console.log(`Generate: ${generateSuccess ? "✅ Success" : "❌ Failed"}`);
  }
  if (mode === "deploy" || mode === "both") {
    console.log(`Deploy: ${deploySuccess ? "✅ Success" : "❌ Failed"}`);
  }

  if (!overallSuccess) {
    console.error(
      "\n❌ Some processes failed. Please check the logs above for details."
    );
    process.exit(1);
  } else {
    console.log("\n🎉 All processes completed successfully!");
    console.log(`\n💡 Sites are accessible at:`);
    console.log(`   • Hero Pages: https://{productId}.${HERO_SITES_DOMAIN}`);
    if (productIds.length > 0) {
      const firstProductId = productIds[0];
      const firstMainDomain = domainsToPopulate[firstProductId];
      console.log(
        `   • Example Hero Pages: https://${firstProductId}.${HERO_SITES_DOMAIN}`
      );
      if (deploymentType === "final" && firstMainDomain) {
        console.log(`   • Example Main Domain: https://${firstMainDomain}`);
        console.log(
          `   • Example WWW Domain: https://www.${firstMainDomain} (redirects to ${firstMainDomain})`
        );
      } else if (deploymentType === "test") {
        console.log(
          `   • Test deployments are only accessible via hero-pages.com subdomain`
        );
      }
    }
  }

  return overallSuccess;
};

// Function to prompt user for selection
const promptUserSelection = async () => {
  const { deploymentType } = await inquirer.prompt([
    {
      type: "list",
      name: "deploymentType",
      message: "Is this a test or final deployment?",
      choices: [
        {
          name: "🧪 Test deployment (test branch, hero-pages.com only)",
          value: "test",
        },
        {
          name: "🚀 Final deployment (main branch, client domain)",
          value: "final",
        },
      ],
    },
  ]);

  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "What would you like to do?",
      choices: [
        { name: "⚡ Generate and deploy (full pipeline)", value: "both" },
        { name: "🔨 Generate static builds only", value: "generate" },
        { name: "🚀 Deploy existing builds only", value: "deploy" },
        {
          name: "🔧 Post-deployment setup only (routes & redirects)",
          value: "post-deploy",
        },
      ],
    },
  ]);

  // Display warning in red before the prompt
  console.log(
    `\x1b[31m⚠️  WARNING: This step should only be run when the content on the website changes and the website is ready for final review.\x1b[0m`
  );

  const { generateLlmTxtFile: firstConfirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "generateLlmTxtFile",
      message: "Generate llm.txt file? (requires OPENROUTER_API_KEY)",
      default: false,
    },
  ]);

  // Double confirmation if user selected yes
  let generateLlmTxtFile = firstConfirm;
  if (firstConfirm) {
    const { confirmAgain } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmAgain",
        message:
          "\x1b[31mAre you sure? This will incur costs, so be careful with this. This should only be run when content is finalized and ready for review.\x1b[0m",
        default: false,
      },
    ]);
    generateLlmTxtFile = confirmAgain;
    if (!confirmAgain) {
      console.log("llm.txt generation cancelled.");
    }
  }

  const { selectionMode } = await inquirer.prompt([
    {
      type: "list",
      name: "selectionMode",
      message: "How would you like to proceed?",
      choices: [
        { name: "🎯 Select specific products", value: "select" },
        { name: "🌟 Process all products", value: "all" },
      ],
    },
  ]);

  let productIds;
  if (selectionMode === "all") {
    productIds = Object.keys(domainsToPopulate);
  } else {
    const { selectedProducts } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedProducts",
        message: "Select the products to process:",
        choices: Object.entries(domainsToPopulate).map(([id, domain]) => ({
          name: `${id} (${domain})`,
          value: id,
        })),
        validate: (answer) =>
          answer.length > 0 ? true : "Please select at least one product",
      },
    ]);
    productIds = selectedProducts;
  }

  return {
    mode,
    productIds,
    generateLlmTxtFile,
    deploymentType,
  };
};

// Main function
const main = async () => {
  try {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      // Interactive mode
      const selection = await promptUserSelection();
      await processSites(
        selection.productIds,
        selection.mode,
        selection.generateLlmTxtFile,
        selection.deploymentType
      );
      return;
    }

    // Prompt for deployment type even in command-line mode (user preference: always prompt)
    const { deploymentType } = await inquirer.prompt([
      {
        type: "list",
        name: "deploymentType",
        message: "Is this a test or final deployment?",
        choices: [
          {
            name: "🧪 Test deployment (test branch, hero-pages.com only)",
            value: "test",
          },
          {
            name: "🚀 Final deployment (main branch, client domain)",
            value: "final",
          },
        ],
      },
    ]);

    // Parse command line arguments
    let mode = "both";
    let productIds = [];
    let generateLlmTxtFile = false;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg === "--generate" || arg === "-g") {
        mode = "generate";
      } else if (arg === "--deploy" || arg === "-d") {
        mode = "deploy";
      } else if (arg === "--both" || arg === "-b") {
        mode = "both";
      } else if (arg === "--post-deploy" || arg === "-p") {
        mode = "post-deploy";
      } else if (arg === "--all" || arg === "-a") {
        productIds = Object.keys(domainsToPopulate);
      } else if (arg === "--generate-llm-txt" || arg === "-l") {
        generateLlmTxtFile = true;
      } else if (arg === "--help" || arg === "-h") {
        console.log("\n📖 Cloudflare Build and Deploy Script Usage");
        console.log("=".repeat(40));
        console.log("\nInteractive mode:");
        console.log("  pnpm build:deploy:cf");
        console.log("\nCommand line mode:");
        console.log("  pnpm build:deploy:cf [options] [product-ids...]");
        console.log("\nOptions:");
        console.log("  --generate, -g    Generate static builds only");
        console.log("  --deploy, -d      Deploy existing builds only");
        console.log("  --both, -b        Generate and deploy (default)");
        console.log(
          "  --post-deploy, -p Post-deployment setup only (routes & redirects)"
        );
        console.log("  --all, -a         Process all products");
        console.log(
          "  --generate-llm-txt, -l Generate llm.txt file (requires OPENROUTER_API_KEY)"
        );
        console.log("  --help, -h        Show this help message");
        console.log("\nExamples:");
        console.log("  pnpm build:deploy:cf --generate --all");
        console.log("  pnpm build:deploy:cf --deploy bayern");
        console.log("  pnpm build:deploy:cf --post-deploy bayern");
        console.log("  pnpm build:deploy:cf bayern berlin brandenburg");
        console.log("\nAvailable Products:");
        Object.entries(domainsToPopulate).forEach(([id, domain]) => {
          console.log(`  • ${id} (${domain})`);
        });
        return;
      } else if (!arg.startsWith("-")) {
        // This should be a product ID
        if (
          Object.keys(domainsToPopulate).length > 0 &&
          !domainsToPopulate[arg]
        ) {
          console.error("\n❌ Error: Invalid Product ID");
          console.error(`🚫 "${arg}" is not a valid Product identifier`);
          console.error("\n📋 Available Products:");
          Object.keys(domainsToPopulate).forEach((id) =>
            console.error(`  • ${id}`)
          );
          process.exit(1);
        }
        productIds.push(arg);
      }
    }

    // If no product IDs specified, show error
    if (productIds.length === 0) {
      console.error("\n❌ Error: No product IDs specified");
      console.error(
        "💡 Usage: pnpm build:deploy:cf [options] [product-ids...]"
      );
      console.error("   Use --help for more information");
      process.exit(1);
    }

    await processSites(productIds, mode, generateLlmTxtFile, deploymentType);
  } catch (error) {
    console.error("\n❌ Process failed:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
};

// Run the main function
main().catch((error) => {
  console.error("\n❌ Unexpected error:", error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
});
