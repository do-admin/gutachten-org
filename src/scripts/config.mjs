// Import multi-site configuration
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON file directly to avoid assert syntax issues
const multiPageConfigPath = path.join(
  __dirname,
  "..",
  "data",
  "multi-page-config.json"
);

const multiSiteConfig = JSON.parse(
  fs.readFileSync(multiPageConfigPath, "utf8")
);

// Convert multi-site config to domains format for compatibility
const domains = {};
multiSiteConfig.sites.forEach((site) => {
  domains[site.id] = site.domain;
});

// Export both formats for compatibility
export default domains;
