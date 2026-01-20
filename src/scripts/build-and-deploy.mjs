#!/usr/bin/env node

import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Debug logging
console.log("Script started");

import domainsToPopulate from "./config.mjs";

// Function to ensure .env is in .gitignore
const ensureEnvInGitignore = () => {
  const gitignorePath = path.join(__dirname, "..", "..", ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    // Create .gitignore if it doesn't exist
    fs.writeFileSync(gitignorePath, ".env\n.env*.local\n");
    return;
  }

  const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
  if (
    !gitignoreContent.includes(".env") &&
    !gitignoreContent.includes(".env*")
  ) {
    // Append .env to .gitignore
    fs.appendFileSync(
      gitignorePath,
      "\n# local env files\n.env\n.env*.local\n"
    );
  }
};

// Function to check and prompt for TEXT_EDITOR_DATABASE_URL in .env
const ensureDatabaseUrl = async () => {
  const envPath = path.join(__dirname, "..", "..", ".env");
  let envContent = "";

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }

  // Check if TEXT_EDITOR_DATABASE_URL already exists
  if (envContent.includes("TEXT_EDITOR_DATABASE_URL=")) {
    const lines = envContent.split("\n");
    const dbUrlLine = lines.find((line) =>
      line.trim().startsWith("TEXT_EDITOR_DATABASE_URL=")
    );
    if (dbUrlLine && dbUrlLine.split("=")[1]?.trim()) {
      // TEXT_EDITOR_DATABASE_URL exists and has a value
      return;
    }
  }

  // Prompt user for TEXT_EDITOR_DATABASE_URL
  console.log("\n📝 TEXT_EDITOR_DATABASE_URL is required for the text editor.");
  const { databaseUrl } = await inquirer.prompt([
    {
      type: "input",
      name: "databaseUrl",
      message: "Please enter your TEXT_EDITOR_DATABASE_URL:",
      validate: (input) => {
        if (!input || !input.trim()) {
          return "TEXT_EDITOR_DATABASE_URL cannot be empty";
        }
        return true;
      },
    },
  ]);

  // Add TEXT_EDITOR_DATABASE_URL to .env file
  if (envContent && !envContent.endsWith("\n")) {
    envContent += "\n";
  }
  envContent += `TEXT_EDITOR_DATABASE_URL=${databaseUrl.trim()}\n`;
  fs.writeFileSync(envPath, envContent);
  console.log("✅ TEXT_EDITOR_DATABASE_URL has been added to .env file");
};

// Function to install text editor package
const installTextEditor = async () => {
  console.log("\n📦 Installing @digital-optimization/inline-text-editor...");
  try {
    exec("pnpm install @digital-optimization/inline-text-editor@latest", {
      silent: false,
    });
    console.log("✅ Text editor package installed successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to install text editor package");
    return false;
  }
};

// Function to initialize text editor
const initializeTextEditor = async () => {
  console.log("\n🔧 Initializing text editor...");
  try {
    exec("npx @digital-optimization/inline-text-editor@latest init --force", {
      silent: false,
    });
    console.log("✅ Text editor initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize text editor");
    return false;
  }
};

// Function to validate if text editor is installed and configured
const validateTextEditorSetup = async () => {
  const errors = [];
  const warnings = [];

  // Ensure .env is in .gitignore
  ensureEnvInGitignore();

  // Check 1: Verify text editor packages are in package.json
  const packageJsonPath = path.join(__dirname, "..", "..", "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    errors.push("package.json not found");
    return { isValid: false, errors, warnings };
  }

  let needsInstallation = false;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const hasTextEditorPackage =
      dependencies["@digital-optimization/inline-text-editor"] ||
      dependencies["inline-text-editor"];

    if (!hasTextEditorPackage) {
      needsInstallation = true;
      console.log(
        "\n⚠️  Text editor package not found. Installing @digital-optimization/inline-text-editor@latest..."
      );
      const installSuccess = await installTextEditor();
      if (!installSuccess) {
        errors.push("Failed to install text editor package");
        return { isValid: false, errors, warnings };
      }

      // After installation, run init command
      const initSuccess = await initializeTextEditor();
      if (!initSuccess) {
        errors.push("Failed to initialize text editor");
        return { isValid: false, errors, warnings };
      }

      // Prompt for TEXT_EDITOR_DATABASE_URL
      await ensureDatabaseUrl();
    }
  } catch (error) {
    errors.push(`Failed to read package.json: ${error.message}`);
  }

  // Check 2: Verify ConditionalTextEditor is used in layout.tsx
  const layoutPath = path.join(__dirname, "..", "app", "layout.tsx");
  if (!fs.existsSync(layoutPath)) {
    errors.push("layout.tsx not found");
    return { isValid: false, errors, warnings };
  }

  try {
    const layoutContent = fs.readFileSync(layoutPath, "utf8");
    const hasConditionalTextEditorImport =
      layoutContent.includes("ConditionalTextEditor") ||
      layoutContent.includes("TextEditorWrapper");
    const hasConditionalTextEditorUsage =
      layoutContent.includes("<ConditionalTextEditor") ||
      layoutContent.includes("<TextEditorWrapper");

    if (!hasConditionalTextEditorImport) {
      errors.push("ConditionalTextEditor is not imported in layout.tsx");
    } else if (!hasConditionalTextEditorUsage) {
      errors.push(
        "ConditionalTextEditor is imported but not used in layout.tsx"
      );
    }
  } catch (error) {
    errors.push(`Failed to read layout.tsx: ${error.message}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

// Function to execute shell commands
const exec = (
  command,
  { silent = false, ignoreError = false, cwd, env } = {}
) => {
  try {
    const output = execSync(command, {
      stdio: silent ? "pipe" : "inherit",
      encoding: "utf8",
      env: env || { ...process.env }, // Use provided env or fall back to process.env
      cwd: cwd || process.cwd(), // Use provided cwd or current working directory
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
      // Run the generate-static script for this specific product
      // Ensure we're running from the project root and pass environment variables
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
    // Ensure we're running from the project root
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

// Function to set Vercel environment variable programmatically
// Based on Vercel CLI documentation: https://vercel.com/docs/cli/env
// Uses pattern: echo [value] | vercel env add [name] [environment]
const setVercelEnvVar = async (
  projectId,
  key,
  value,
  environments = ["production", "preview", "development"]
) => {
  try {
    const projectRoot = path.resolve(__dirname, "..", "..");

    // Use Vercel CLI to add environment variable
    // We'll use a temporary approach with stdin piping
    for (const env of environments) {
      try {
        // Check if env var already exists
        // According to docs: vercel env ls [environment]
        // Note: --json flag may not be officially supported, so we handle both formats
        let exists = false;
        try {
          const checkCommand = `npx vercel env ls ${env}`;
          const checkOutput = execSync(checkCommand, {
            cwd: projectRoot,
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
          });

          // Try to parse as JSON first (some CLI versions support this)
          try {
            const existingVars = JSON.parse(checkOutput);
            if (Array.isArray(existingVars)) {
              exists = existingVars.some(
                (v) => v.key === key && v.target?.includes(env)
              );
            }
          } catch {
            // If not JSON, parse as text output
            // Vercel CLI typically outputs variable names, one per line
            const lines = checkOutput.split("\n");
            exists = lines.some((line) => {
              const trimmed = line.trim();
              // Match patterns like: "KEY" or KEY (for environment)
              return (
                trimmed === key ||
                trimmed.startsWith(`${key} `) ||
                trimmed.includes(`"${key}"`)
              );
            });
          }
        } catch {
          // If command fails, assume variable doesn't exist
          exists = false;
        }

        if (exists) {
          console.log(`   ℹ️  ${key} already exists for ${env} environment`);
          // According to docs, vercel env add can overwrite, but to be safe,
          // we'll remove first then add (or just skip if user prefers)
          // For automated deployments, we'll update by removing and re-adding
          try {
            execSync(`npx vercel env rm ${key} ${env} --yes`, {
              cwd: projectRoot,
              stdio: "pipe",
            });
            console.log(`   🔄 Updating existing ${key} for ${env}`);
          } catch (rmError) {
            // If removal fails, try to add anyway (may overwrite)
            console.log(
              `   ⚠️  Could not remove existing ${key}, attempting to overwrite...`
            );
          }
        }

        // Use spawn with stdin to pipe the value
        // Pattern from docs: echo [value] | vercel env add [name] [environment]
        // Note: --yes flag is not supported for vercel env add (only for vercel env rm and vercel env pull)
        const vercelProcess = spawn("npx", ["vercel", "env", "add", key, env], {
          cwd: projectRoot,
          stdio: ["pipe", "pipe", "pipe"],
        });

        // Write the value to stdin
        vercelProcess.stdin.write(value);
        vercelProcess.stdin.end();

        // Wait for the process to complete
        await new Promise((resolve, reject) => {
          let stdout = "";
          let stderr = "";

          vercelProcess.stdout.on("data", (data) => {
            stdout += data.toString();
          });

          vercelProcess.stderr.on("data", (data) => {
            stderr += data.toString();
          });

          vercelProcess.on("close", (code) => {
            if (code === 0) {
              console.log(`   ✅ Set ${key} for ${env} environment`);
              resolve();
            } else {
              reject(new Error(`Process exited with code ${code}: ${stderr}`));
            }
          });

          vercelProcess.on("error", (error) => {
            reject(error);
          });
        });
      } catch (error) {
        // If setting fails, provide helpful message
        console.warn(
          `   ⚠️  Failed to set ${key} for ${env} via CLI: ${error.message}`
        );
        console.log(
          `   💡 You may need to set ${key} manually in Vercel dashboard`
        );
        console.log(
          `   💡 Or run manually: echo "${value}" | npx vercel env add ${key} ${env}`
        );
        console.log(`   📖 See: https://vercel.com/docs/cli/env`);
      }
    }
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to set Vercel environment variable ${key}:`,
      error.message
    );
    return false;
  }
};

// Helper function to get environment variable from multiple env files
// Checks: process.env, .env, .env.local, .env.production, .env.development
const getEnvVarFromFiles = (varName, projectRoot) => {
  // First check process.env
  if (process.env[varName] && process.env[varName].trim()) {
    return process.env[varName].trim();
  }

  // List of env files to check (in order of priority)
  const envFiles = [
    ".env.local",
    ".env.production",
    ".env.development",
    ".env",
  ];

  for (const envFile of envFiles) {
    const envPath = path.join(projectRoot, envFile);
    if (fs.existsSync(envPath)) {
      try {
        const envContent = fs.readFileSync(envPath, "utf8");
        const lines = envContent.split("\n");

        // Find the line with the variable
        const varLine = lines.find((line) => {
          const trimmed = line.trim();
          // Skip comments and empty lines
          if (!trimmed || trimmed.startsWith("#")) {
            return false;
          }
          // Match VAR_NAME=value (with or without quotes, handle spaces around =)
          // Escape special regex characters in varName
          const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const trimmedMatch = trimmed.match(
            new RegExp(`^${escapedVarName}\\s*=`)
          );
          return !!trimmedMatch;
        });

        if (varLine) {
          // Extract value after the = sign (handle cases where value contains =)
          // First trim the line, then find the = sign
          const trimmedLine = varLine.trim();
          const equalIndex = trimmedLine.indexOf("=");
          if (equalIndex !== -1) {
            let value = trimmedLine.substring(equalIndex + 1).trim();
            // Remove surrounding quotes if present
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
            }
            // Return if value is not empty
            if (value) {
              return value;
            }
          }
        }
      } catch (error) {
        // If file read fails, continue to next file
        continue;
      }
    }
  }

  return null;
};

// Function to ensure Vercel environment variables are set
const ensureVercelEnvVars = async (productId, enableTextEditor = false) => {
  console.log(
    `\n🔐 Checking Vercel environment variables for ${productId}...\n`
  );

  const projectRoot = path.resolve(__dirname, "..", "..");

  // Check for DATABASE_URL if text editor is enabled
  if (enableTextEditor) {
    let databaseUrl = getEnvVarFromFiles("DATABASE_URL", projectRoot);

    // If still not found, prompt for it
    if (!databaseUrl) {
      console.log("\n📝 DATABASE_URL is required for the text editor.");
      console.log(
        "   💡 Not found in environment files (.env, .env.local, etc.)"
      );
      const { databaseUrl: inputUrl } = await inquirer.prompt([
        {
          type: "input",
          name: "databaseUrl",
          message: "Please enter your DATABASE_URL:",
          validate: (input) => {
            if (!input || !input.trim()) {
              return "DATABASE_URL cannot be empty";
            }
            return true;
          },
        },
      ]);
      databaseUrl = inputUrl.trim();
    } else {
      console.log(`   ✅ Found DATABASE_URL in environment files`);
    }

    // Set DATABASE_URL in Vercel
    console.log(`\n🔐 Setting DATABASE_URL in Vercel...`);
    await setVercelEnvVar(productId, "DATABASE_URL", databaseUrl);
  }

  // Always set SITE_ID and ENABLE_TEXT_EDITOR
  console.log(`\n🔐 Setting SITE_ID and ENABLE_TEXT_EDITOR in Vercel...`);
  await setVercelEnvVar(productId, "SITE_ID", productId);
  await setVercelEnvVar(
    productId,
    "ENABLE_TEXT_EDITOR",
    enableTextEditor ? "true" : "false"
  );

  console.log(`\n✅ Vercel environment variables configured`);
};

// Function to deploy a Next.js app (non-static) to Vercel
const deployNextJsApp = async (productId) => {
  console.log(`\n🚀 Deploying Next.js app for ${productId}...\n`);

  try {
    const projectRoot = path.resolve(__dirname, "..", "..");
    const domain = domainsToPopulate[productId];

    if (!domain) {
      console.error(`❌ No domain configured for ${productId}`);
      return false;
    }

    // Ensure project is linked
    const vercelDir = path.join(projectRoot, ".vercel");
    if (fs.existsSync(vercelDir)) {
      fs.rmSync(vercelDir, { recursive: true, force: true });
    }

    // Link to the project
    exec(`npx vercel link --yes --project ${productId}`, {
      silent: false,
      cwd: projectRoot,
    });

    // Ensure Vercel environment variables are set
    // await ensureVercelEnvVars(productId, true);

    // Deploy with environment variables
    // Vercel will automatically detect Next.js and build it server-side
    const deployEnv = {
      ...process.env,
      SITE_ID: productId,
      ENABLE_TEXT_EDITOR: "true",
      NODE_ENV: "production",
    };

    exec(`npx vercel deploy --prod --yes`, {
      silent: false,
      cwd: projectRoot,
      env: deployEnv,
    });

    console.log(`\n✅ ${productId} deployed successfully as Next.js app!`);
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to deploy Next.js app for ${productId}:`,
      error.message
    );
    return false;
  }
};

// Function to run deploy-static script for specific sites
const runDeployStatic = async (productIds) => {
  console.log("\n🚀 Running deploy-static script...\n");

  try {
    // For specific sites, we need to use the interactive mode or pass them as arguments
    // Since deploy-static.mjs supports command line arguments, we can pass them
    const productIdsArgs = productIds.join(" ");
    exec(`node src/scripts/deploy-static.mjs ${productIdsArgs}`, {
      silent: false,
    });
    return true;
  } catch (error) {
    console.error("❌ Failed to deploy static builds");
    return false;
  }
};

// Function to run deploy-static script for all sites
const runDeployStaticAll = async () => {
  console.log("\n🚀 Running deploy-static script for all sites...\n");

  try {
    exec("node src/scripts/deploy-static.mjs --all", { silent: false });
    return true;
  } catch (error) {
    console.error("❌ Failed to deploy static builds for all sites");
    return false;
  }
};

// Function to generate Vercel configuration for specific sites
const generateVercelConfig = async (productIds) => {
  console.log("\n⚙️  Generating Vercel configuration...\n");

  try {
    // Generate vercel.json for each site after its build
    for (const productId of productIds) {
      exec(`node src/scripts/generate-vercel-config.mjs ${productId}`, {
        silent: false,
      });
    }
    return true;
  } catch (error) {
    console.error("❌ Failed to generate Vercel configuration");
    return false;
  }
};

// Function to process sites (generate and deploy)
const processPageIds = async (
  productIds,
  mode = "both",
  enableTextEditor = false,
  generateLlmTxtFile = false
) => {
  console.log(
    `\n🚀 Processing ${productIds.length} product(s) in ${mode} mode...\n`
  );

  if (enableTextEditor) {
    console.log("📝 Text editor is enabled - static export will be disabled\n");
    process.env.ENABLE_TEXT_EDITOR = "true";
  } else {
    process.env.ENABLE_TEXT_EDITOR = "false";
  }

  let fetchSuccess = true;
  let vercelConfigSuccess = true;
  let generateSuccess = true;
  let deploySuccess = true;
  let sitemapSuccess = true; // Only used in generate/both mode
  let llmTxtSuccess = true; // Only used when generateLlmTxtFile is true

  // Generate sitemaps and llm.txt files BEFORE static builds
  if (mode === "generate" || mode === "both") {
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

    // Generate Vercel configuration after builds are complete
    if (generateSuccess) {
      vercelConfigSuccess = await generateVercelConfig(productIds);
    }
  }

  // Deploy if generation was successful and deployment is requested
  if (generateSuccess && (mode === "deploy" || mode === "both")) {
    if (enableTextEditor) {
      // Deploy as Next.js app (non-static) when text editor is enabled
      console.log("\n📝 Deploying as Next.js app (text editor enabled)...\n");
      const results = [];
      for (const productId of productIds) {
        const success = await deployNextJsApp(productId);
        results.push({ productId, success });
      }
      deploySuccess = results.every((result) => result.success);
    } else {
      // Deploy static builds
      if (productIds.length === Object.keys(domainsToPopulate).length) {
        // All products selected, use the all-in-one approach
        deploySuccess = await runDeployStaticAll();
      } else {
        // Specific products selected, run individually
        deploySuccess = await runDeployStatic(productIds);
      }
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("PROCESSING SUMMARY");
  console.log("=".repeat(60));

  const overallSuccess =
    mode === "generate"
      ? vercelConfigSuccess &&
        generateSuccess &&
        sitemapSuccess &&
        (!generateLlmTxtFile || llmTxtSuccess)
      : mode === "deploy"
        ? deploySuccess
        : vercelConfigSuccess &&
          generateSuccess &&
          deploySuccess &&
          sitemapSuccess &&
          (!generateLlmTxtFile || llmTxtSuccess);

  if (mode === "generate" || mode === "both") {
    console.log(`Sitemaps: ${sitemapSuccess ? "✅ Success" : "❌ Failed"}`);
    if (generateLlmTxtFile) {
      console.log(`llm.txt: ${llmTxtSuccess ? "✅ Success" : "❌ Failed"}`);
    }
    console.log(`Generate: ${generateSuccess ? "✅ Success" : "❌ Failed"}`);
    console.log(
      `Vercel Config: ${vercelConfigSuccess ? "✅ Success" : "❌ Failed"}`
    );
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
  }

  return overallSuccess;
};

// Function to prompt user for product selection and mode
const promptUserSelection = async () => {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "What would you like to do?",
      choices: [
        { name: "⚡ Generate and deploy (full pipeline)", value: "both" },
        { name: "🔨 Generate static builds only", value: "generate" },
        { name: "🚀 Deploy existing builds only", value: "deploy" },
      ],
    },
  ]);

  // Validate text editor setup before prompting
  const textEditorValidation = await validateTextEditorSetup();

  let enableTextEditor = false;
  if (!textEditorValidation.isValid) {
    console.log("\n⚠️  Text Editor Validation Failed:");
    textEditorValidation.errors.forEach((error) => {
      console.log(`   ❌ ${error}`);
    });
    console.log(
      "\n💡 The text editor cannot be enabled because it is not properly configured."
    );
    console.log(
      "   Please install the required packages and configure the layout file.\n"
    );
  } else {
    const { enableTextEditor: userChoice } = await inquirer.prompt([
      {
        type: "confirm",
        name: "enableTextEditor",
        message: "Enable text editor? (This will disable static export)",
        default: false,
      },
    ]);
    enableTextEditor = userChoice;
  }

  // Display warning in red before the prompt
  // console.log(
  //   `\x1b[31m⚠️  WARNING: This step should only be run when the content on the website changes and the website is ready for final review.\x1b[0m`
  // );

  // const { generateLlmTxtFile: firstConfirm } = await inquirer.prompt([
  //   {
  //     type: "confirm",
  //     name: "generateLlmTxtFile",
  //     message: "Generate llm.txt file? (requires OPENROUTER_API_KEY)",
  //     default: false,
  //   },
  // ]);

  // Double confirmation if user selected yes
  // let generateLlmTxtFile = firstConfirm;
  // if (firstConfirm) {
  //   const { confirmAgain } = await inquirer.prompt([
  //     {
  //       type: "confirm",
  //       name: "confirmAgain",
  //       message:
  //         "\x1b[31mAre you sure? This will incur costs, so be careful with this. This should only be run when content is finalized and ready for review.\x1b[0m",
  //       default: false,
  //     },
  //   ]);
  //   generateLlmTxtFile = confirmAgain;
  //   if (!confirmAgain) {
  //     console.log("llm.txt generation cancelled.");
  //   }
  // }
  
  // llm.txt generation disabled - set to false by default
  const generateLlmTxtFile = false;

  const { selectionMode } = await inquirer.prompt([
    {
      type: "list",
      name: "selectionMode",
      message: "How would you like to proceed?",
      choices: [
        { name: "🎯 Select specific product", value: "select" },
        { name: "🌟 Process all products", value: "all" },
      ],
    },
  ]);

  if (selectionMode === "all") {
    const productIds = Object.keys(domainsToPopulate);
    return {
      mode,
      productIds,
      enableTextEditor,
      generateLlmTxtFile,
    };
  }

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

  return {
    mode,
    productIds: selectedProducts,
    enableTextEditor,
    generateLlmTxtFile,
  };
};

// Main function
const main = async () => {
  try {
    // Check for command line arguments
    const args = process.argv.slice(2);

    if (args.length === 0) {
      // Interactive mode
      const selection = await promptUserSelection();
      await processPageIds(
        selection.productIds,
        selection.mode,
        selection.enableTextEditor,
        selection.generateLlmTxtFile
      );
      return;
    }

    // Parse command line arguments
    let mode = "both";
    let productIds = [];
    let enableTextEditor = false;
    let generateLlmTxtFile = false;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg === "--generate" || arg === "-g") {
        mode = "generate";
      } else if (arg === "--deploy" || arg === "-d") {
        mode = "deploy";
      } else if (arg === "--both" || arg === "-b") {
        mode = "both";
      } else if (arg === "--all" || arg === "-a") {
        productIds = Object.keys(domainsToPopulate);
      } else if (arg === "--text-editor" || arg === "-t") {
        // Validate text editor setup before enabling
        const textEditorValidation = await validateTextEditorSetup();
        if (!textEditorValidation.isValid) {
          console.error("\n❌ Text Editor Validation Failed:");
          textEditorValidation.errors.forEach((error) => {
            console.error(`   ❌ ${error}`);
          });
          console.error(
            "\n💡 The text editor cannot be enabled because it is not properly configured."
          );
          console.error(
            "   Please install the required packages and configure the layout file."
          );
          process.exit(1);
        }
        enableTextEditor = true;
      } else if (arg === "--generate-llm-txt" || arg === "-l") {
        generateLlmTxtFile = true;
      } else if (arg === "--help" || arg === "-h") {
        console.log("\n📖 Build and Deploy Script Usage");
        console.log("=".repeat(40));
        console.log("\nInteractive mode:");
        console.log("  pnpm build:deploy");
        console.log("\nCommand line mode:");
        console.log("  pnpm build:deploy [options] [product-ids...]");
        console.log("\nOptions:");
        console.log(
          "  --generate, -g    Generate static builds only (fetches data first)"
        );
        console.log("  --deploy, -d      Deploy existing builds only");
        console.log(
          "  --both, -b        Generate and deploy (default, fetches data first)"
        );
        console.log("  --all, -a         Process all products");
        console.log(
          "  --text-editor, -t Enable text editor (disables static export)"
        );
        console.log(
          "  --generate-llm-txt, -l Generate llm.txt file (requires OPENROUTER_API_KEY)"
        );
        console.log("  --help, -h        Show this help message");
        console.log("\nExamples:");
        console.log("  pnpm build:deploy --generate --all");
        console.log("  pnpm build:deploy --deploy bayern");
        console.log("  pnpm build:deploy bayern berlin brandenburg");
        console.log("\nAvailable Products:");
        Object.entries(domainsToPopulate).forEach(([id, domain]) => {
          console.log(`  • ${id} (${domain})`);
        });
        return;
      } else if (!arg.startsWith("-")) {
        // This should be a product ID
        if (!domainsToPopulate[arg]) {
          console.error("\n❌ Error: Invalid Product ID");
          console.error(`🚫 "${arg}" is not a valid Product identifier`);
          console.error("\n📋 Available Products:");
          Object.keys(domainsToPopulate).forEach((id) =>
            console.error(`  • ${id}`)
          );
          console.error(
            "\n💡 Usage: pnpm build:deploy [options] [product-ids...]"
          );
          console.error("   Use --help for more information");
          process.exit(1);
        }
        productIds.push(arg);
      }
    }

    // If no product IDs specified, show error
    if (productIds.length === 0) {
      console.error("\n❌ Error: No product IDs specified");
      console.error("💡 Usage: pnpm build:deploy [options] [product-ids...]");
      console.error("   Use --help for more information");
      process.exit(1);
    }

    await processPageIds(
      productIds,
      mode,
      enableTextEditor,
      generateLlmTxtFile
    );
  } catch (error) {
    console.error("\n❌ Process failed:", error.message);
    process.exit(1);
  }
};

// Run the main function
main().catch((error) => {
  console.error("\n❌ Unexpected error:", error.message);
  process.exit(1);
});
