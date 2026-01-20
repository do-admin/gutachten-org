#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to articles directory (script is in src/scripts/, so go up one level to src/, then to data/)
const articlesDir = path.join(__dirname, "../data/gutachten-org/articles");
// Output file in project root (go up two levels from src/scripts/ to project root)
const outputFile = path.join(__dirname, "../../internal-links-report.md");

/**
 * Extract frontmatter from markdown file
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  if (match) {
    return {
      frontmatter: match[0],
      body: content.slice(match[0].length),
    };
  }
  return {
    frontmatter: "",
    body: content,
  };
}

/**
 * Extract all markdown links from text
 * Matches [text](url) and [text](url "title") patterns
 */
function extractLinks(content) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    // Remove optional title from URL (e.g., "title" in [text](url "title"))
    const cleanUrl = linkUrl.split(" ")[0].replace(/"/g, "");
    links.push({
      text: linkText,
      url: cleanUrl,
    });
  }

  return links;
}

/**
 * Check if a link is internal (points to /ratgeber/ or gutachten.org/ratgeber/)
 */
function isInternalLink(url) {
  if (!url) return false;

  // Internal links: /ratgeber/... or https://www.gutachten.org/ratgeber/...
  // Also check for relative paths that might be internal
  const internalPatterns = [
    /^\/ratgeber\//,
    /^https?:\/\/(www\.)?gutachten\.org\/ratgeber\//,
    /^ratgeber\//, // relative path
  ];

  return internalPatterns.some((pattern) => pattern.test(url));
}

/**
 * Normalize URL to a consistent format for deduplication
 */
function normalizeUrl(url) {
  // Remove protocol and www
  let normalized = url.replace(/^https?:\/\/(www\.)?/, "");
  // Remove trailing slash
  normalized = normalized.replace(/\/$/, "");
  // Convert to /ratgeber/... format
  if (normalized.startsWith("gutachten.org/ratgeber/")) {
    normalized = normalized.replace("gutachten.org", "");
  }
  return normalized;
}

/**
 * Extract slug from URL
 */
function extractSlugFromUrl(url) {
  const normalized = normalizeUrl(url);
  // Extract slug from /ratgeber/slug format
  const match = normalized.match(/\/ratgeber\/(.+)/);
  return match ? match[1] : null;
}

/**
 * Check if article file exists for a given slug
 */
function articleExists(slug, articlesDir) {
  if (!slug) return false;
  const filePath = path.join(articlesDir, `${slug}.md`);
  return fs.existsSync(filePath);
}

/**
 * Extract slug from frontmatter
 */
function extractSlug(frontmatter) {
  const slugMatch = frontmatter.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
  return slugMatch ? slugMatch[1] : null;
}

/**
 * Extract title from frontmatter
 */
function extractTitle(frontmatter) {
  const titleMatch = frontmatter.match(/^title:\s*["']?([^"'\n]+)["']?/m);
  return titleMatch ? titleMatch[1] : null;
}

/**
 * Main function
 */
function main() {
  console.log("🔍 Extracting internal links from markdown files...\n");

  // Get all markdown files
  const files = fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const articleLinks = [];
  const allLinksSet = new Set(); // For deduplication
  const linkStatusMap = new Map(); // Track which links exist

  // Process each file
  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const { frontmatter, body } = extractFrontmatter(content);
    const slug = extractSlug(frontmatter) || file.replace(".md", "");
    const title = extractTitle(frontmatter) || slug;

    // Extract all links from the body
    const allLinks = extractLinks(body);

    // Filter for internal links and check if they exist
    const internalLinks = allLinks
      .filter((link) => isInternalLink(link.url))
      .map((link) => {
        const normalized = normalizeUrl(link.url);
        const targetSlug = extractSlugFromUrl(link.url);
        const exists = articleExists(targetSlug, articlesDir);

        // Track link status
        if (!linkStatusMap.has(normalized)) {
          linkStatusMap.set(normalized, {
            slug: targetSlug,
            exists,
            url: link.url,
            linkedFrom: [],
          });
        }
        // Track which article links to this
        const linkInfo = linkStatusMap.get(normalized);
        if (linkInfo && !linkInfo.linkedFrom.includes(slug)) {
          linkInfo.linkedFrom.push(slug);
        }

        return {
          ...link,
          normalized,
          targetSlug,
          exists,
        };
      });

    if (internalLinks.length > 0) {
      // Normalize and add to deduplication set
      internalLinks.forEach((link) => {
        allLinksSet.add(link.normalized);
      });

      articleLinks.push({
        file,
        slug,
        title,
        links: internalLinks,
      });
    }
  }

  // Count missing articles
  const missingLinks = Array.from(linkStatusMap.values()).filter(
    (link) => !link.exists
  );
  const existingLinks = Array.from(linkStatusMap.values()).filter(
    (link) => link.exists
  );

  // Generate markdown report
  let report = "# Internal Links Report\n\n";
  report += `**Generated:** ${new Date().toLocaleString("de-DE")}\n\n`;
  report += `**Total articles processed:** ${files.length}\n`;
  report += `**Articles with internal links:** ${articleLinks.length}\n`;
  report += `**Total unique internal links:** ${allLinksSet.size}\n`;
  report += `**✅ Links to existing articles:** ${existingLinks.length}\n`;
  report += `**⚠️ Links to missing articles:** ${missingLinks.length}\n\n`;

  if (missingLinks.length > 0) {
    report +=
      "> ⚠️ **WARNING:** Some articles are linked but do not exist in the articles directory!\n\n";
  }

  report += "---\n\n";

  // Group links by article
  report += "## Links by Article\n\n";

  for (const article of articleLinks) {
    report += `### ${article.title}\n\n`;
    report += `**File:** \`${article.file}\`\n`;
    report += `**Slug:** \`${article.slug}\`\n\n`;
    report += `**Internal Links (${article.links.length}):**\n\n`;

    for (const link of article.links) {
      const statusIcon = link.exists ? "✅" : "⚠️ **MISSING**";
      const statusText = link.exists
        ? `(exists: \`${link.targetSlug}.md\`)`
        : `(missing: \`${link.targetSlug}.md\`)`;
      report += `- ${statusIcon} [${link.text}](${link.url}) → \`${link.normalized}\` ${statusText}\n`;
    }

    report += "\n---\n\n";
  }

  // Deduplicated list
  report += "## All Unique Internal Links\n\n";
  report += `**Total unique links:** ${allLinksSet.size}\n\n`;

  const sortedLinks = Array.from(allLinksSet).sort();
  for (const link of sortedLinks) {
    const status = linkStatusMap.get(link);
    const statusIcon = status && status.exists ? "✅" : "⚠️";
    const statusText = status
      ? status.exists
        ? `(exists)`
        : `(missing: \`${status.slug}.md\`)`
      : "";
    report += `- ${statusIcon} \`${link}\` ${statusText}\n`;
  }

  // Missing articles section
  if (missingLinks.length > 0) {
    report += "\n---\n\n";
    report += "## ⚠️ Missing Articles\n\n";
    report +=
      "The following articles are linked but do not exist in the articles directory:\n\n";
    for (const link of missingLinks) {
      const linkedFromText =
        link.linkedFrom && link.linkedFrom.length > 0
          ? `linked from: ${link.linkedFrom.map((s) => `\`${s}.md\``).join(", ")}`
          : "no source found";
      report += `- \`${link.slug}.md\` (${linkedFromText})\n`;
    }
  }

  // Write report
  fs.writeFileSync(outputFile, report, "utf-8");

  console.log(`✅ Report generated: ${outputFile}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Articles processed: ${files.length}`);
  console.log(`   - Articles with internal links: ${articleLinks.length}`);
  console.log(`   - Total unique internal links: ${allLinksSet.size}`);
  console.log(`   - ✅ Links to existing articles: ${existingLinks.length}`);
  console.log(`   - ⚠️  Links to missing articles: ${missingLinks.length}`);
  if (missingLinks.length > 0) {
    console.log(
      `\n⚠️  WARNING: ${missingLinks.length} linked article(s) are missing!`
    );
    missingLinks.forEach((link) => {
      console.log(`   - Missing: ${link.slug}.md`);
    });
  }
  console.log(`\n📄 Full report saved to: ${outputFile}`);
}

// Run the script
main();
