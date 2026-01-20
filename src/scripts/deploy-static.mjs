#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import domainsToPopulate from "./config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to execute shell commands
const exec = (command, { silent = false, ignoreError = false } = {}) => {
  try {
    const output = execSync(command, {
      stdio: silent ? "pipe" : "inherit",
      encoding: "utf8",
    });
    return output ? output.toString().trim() : "";
  } catch (error) {
    if (!silent && !ignoreError) {
      console.error(`Error executing command: ${command}`);
      console.error(error.message);
      process.exit(1);
    }
    // If ignoreError is true, throw the error so the caller can handle it
    if (ignoreError) {
      throw error;
    }
    return "";
  }
};

// Function to ensure project is linked
const ensureProjectLinked = (projectName) => {
  try {
    // Remove existing .vercel directory if it exists
    const vercelDir = path.join(process.cwd(), ".vercel");
    if (fs.existsSync(vercelDir)) {
      fs.rmSync(vercelDir, { recursive: true, force: true });
    }

    // Link to the project
    // Note: Framework can be set to "other" in Vercel project settings after linking
    exec(`npx vercel link --yes --project ${projectName}`, {
      ignoreError: true,
    });

    // Verify the link was successful
    if (!fs.existsSync(path.join(vercelDir, "project.json"))) {
      throw new Error("Project linking failed");
    }

    return true;
  } catch (error) {
    console.error(`Failed to link project ${projectName}: ${error.message}`);
    return false;
  }
};

// Function to deploy a single static folder
const deployStaticFolder = async (folderName, folderPath, team = null) => {
  console.log(`\nDeploying ${folderName}...\n`);

  const domain = domainsToPopulate[folderName];
  if (!domain) {
    console.error(`❌ No domain configured for ${folderName}`);
    return false;
  }

  // Store the original working directory before try block so it's accessible in catch
  const originalCwd = process.cwd();

  try {
    // Change to the folder directory
    process.chdir(folderPath);

    // Remove package.json if it exists to prevent Vercel from detecting a framework
    // and triggering a build process. For pure static hosting, no package.json is needed.
    const packageJsonPath = path.join(folderPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      fs.unlinkSync(packageJsonPath);
      console.log(`🗑️  Removed package.json to ensure pure static deployment`);
    }

    // Ensure project is linked AFTER changing directory
    if (!ensureProjectLinked(`${folderName}`)) {
      throw new Error(`Failed to link project ${folderName}`);
    }

    // Deploy using vercel CLI
    // --archive=tgz: Compresses deployment to avoid rate limits with many files
    // --with-cache: Retains build cache for faster subsequent deployments
    console.log(`Deploying ${folderName}... with cache and archive`);
    const deployCommand = `npx vercel deploy --prod --yes --archive=tgz --with-cache`;
    exec(deployCommand);

    // Change back to original directory
    process.chdir(originalCwd);

    console.log(`\n✅ ${folderName} deployed successfully!`);
    return true;
  } catch (error) {
    // Ensure we change back to original directory even on error
    try {
      process.chdir(originalCwd);
    } catch (chdirError) {
      // Ignore chdir errors if we're already in the right directory
    }
    console.error(`❌ Failed to deploy ${folderName}:`, error.message);
    return false;
  }
};

// Function to deploy all static folders
const deployAllStatic = async (team = null) => {
  console.log("Starting static deployments...\n");

  try {
    const staticBuildsPath = path.join(process.cwd(), "static-builds");
    if (!fs.existsSync(staticBuildsPath)) {
      console.error("\n❌ Error: static-builds directory not found");
      console.error("💡 Please run `pnpm build:static` first");
      process.exit(1);
    }

    // Get all directories in static-builds
    const items = fs.readdirSync(staticBuildsPath, { withFileTypes: true });
    const folders = items
      .filter((item) => item.isDirectory() && !item.name.startsWith("."))
      .map((item) => item.name);

    if (folders.length === 0) {
      console.error("\n❌ Error: No static build folders found");
      console.error("💡 Please run `pnpm build:static` first");
      process.exit(1);
    }

    console.log(
      `Found ${folders.length} folders to deploy:\n${folders.join("\n")}\n`
    );

    // Track results
    const results = [];

    // Deploy each folder
    for (const folder of folders) {
      const folderPath = path.join(staticBuildsPath, folder);
      const success = await deployStaticFolder(folder, folderPath, team);
      results.push({ folder, success });
    }

    // Print summary
    console.log("\nDeployment Summary:");
    console.log("------------------");
    for (const result of results) {
      const status = result.success ? "✅ Success" : "❌ Failed";
      console.log(`${result.folder}: ${status}`);
    }

    // Check if any deployments failed
    const anyFailed = results.some((result) => !result.success);
    if (anyFailed) {
      console.error(
        "\nSome deployments failed. Please check the logs above for details."
      );
      process.exit(1);
    } else {
      console.log("\nAll static folders deployed successfully! 🎉");
    }
  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
  }
};

// Function to deploy multiple selected sites
const deploySelectedPages = async (selectedPages, team = null) => {
  console.log("\n🚀 Deploying selected sites...\n");

  try {
    const staticBuildsPath = path.join(process.cwd(), "static-builds");
    const results = [];

    for (const siteId of selectedPages) {
      const sitePath = path.join(staticBuildsPath, siteId);

      if (!fs.existsSync(sitePath)) {
        console.error(`\n⚠️ Warning: Static build not found for ${siteId}`);
        console.error(`🚫 Directory not found: ${sitePath}`);
        console.error(`💡 Please run 'pnpm build:static' for ${siteId} first`);
        results.push({ siteId, success: false });
        continue;
      }

      const domain = domainsToPopulate[siteId];
      if (!domain) {
        console.error(`❌ No domain configured for ${siteId}`);
        results.push({ siteId, success: false });
        continue;
      }

      const success = await deployStaticFolder(siteId, sitePath, team);
      results.push({ siteId, success });
    }

    // Print summary
    console.log("\nDeployment Summary:");
    console.log("------------------");
    for (const result of results) {
      const status = result.success ? "✅ Success" : "❌ Failed";
      console.log(`${result.siteId}: ${status}`);
    }

    const anyFailed = results.some((result) => !result.success);
    if (anyFailed) {
      console.error(
        "\nSome deployments failed. Please check the logs above for details."
      );
      process.exit(1);
    } else {
      console.log("\nAll selected deployments completed successfully! 🎉");
    }
  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
  }
};

// Function to prompt user for site selection
const promptPageSelection = async () => {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "How would you like to proceed?",
      choices: [
        { name: "🎯 Select specific sites", value: "select" },
        { name: "🌟 Deploy all sites", value: "all" },
      ],
    },
  ]);

  if (mode === "all") {
    return { mode: "all" };
  }

  const { selectedPages } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedPages",
      message: "Select the sites to deploy:",
      choices: Object.entries(domainsToPopulate).map(([id, domain]) => ({
        name: `${id} (${domain})`,
        value: id,
      })),
      validate: (answer) =>
        answer.length > 0 ? true : "Please select at least one site",
    },
  ]);

  return { mode: "select", selectedPages };
};

// Function to parse command line arguments for team
const parseTeamFromArgs = () => {
  const args = process.argv;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--team" && i + 1 < args.length) {
      return args[i + 1];
    }
  }
  return null;
};

// Main function
const main = async () => {
  try {
    // Parse team from command line arguments
    const team = parseTeamFromArgs();

    // Check if --all flag is provided to bypass the prompt
    if (process.argv.includes("--all")) {
      console.log("\n🚀 Deploying all static sites (--all flag used)...\n");
      await deployAllStatic(team);
      return;
    }

    // Check if a specific site ID was provided as an argument
    const providedBundeslandId = process.argv[2];
    if (providedBundeslandId && providedBundeslandId !== "--all") {
      if (!domainsToPopulate[providedBundeslandId]) {
        console.error("\n❌ Error: Invalid Bundesland ID");
        console.error(
          `🚫 "${providedBundeslandId}" is not a valid Bundesland identifier`
        );
        console.error("\n Available sites:");
        Object.keys(domainsToPopulate).forEach((id) =>
          console.error(`  • ${id}`)
        );
        console.error(
          "\n Usage: node deploy-static.mjs [site-id | --all] [--team team-name]"
        );
        process.exit(1);
      }
      await deploySelectedPages([providedBundeslandId], team);
      return;
    }

    // If no arguments provided, show interactive prompt
    const selection = await promptPageSelection();

    if (selection.mode === "all") {
      await deployAllStatic(team);
    } else {
      await deploySelectedPages(selection.selectedPages, team);
    }
  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
  }
};

// Run the deployment
main().catch((error) => {
  console.error("\n❌ Unexpected error:", error.message);
  process.exit(1);
});
