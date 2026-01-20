#!/usr/bin/env node

/**
 * Generate llm.txt file for LLM context chunking using OpenRouter API with Gemini
 * This script collects all website content and passes it to an AI
 * to generate a comprehensive llm.txt file based on the prompt.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import dotenv from "dotenv";
import OpenAI from "openai";
import ora from "ora";

// Load environment variables
dotenv.config({ path: ".env.local", quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

// Load the multi-site config
const configPath = path.join(
  projectRoot,
  "src",
  "data",
  "multi-page-config.json"
);
const multiSiteConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

// Initialize OpenRouter client (OpenAI-compatible API)
const openrouterApiKey = process.env.OPENROUTER_API_KEY;
if (!openrouterApiKey) {
  console.error(
    "❌ OPENROUTER_API_KEY not found in environment variables. Please set it in .env.local"
  );
  process.exit(1);
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: openrouterApiKey,
  defaultHeaders: {
    "HTTP-Referer":
      process.env.OPENROUTER_REFERER_URL || "https://gutachten.org",
    "X-Title": "Gutachten.org LLM Text Generator",
  },
});

/**
 * Clean text by removing template variables and normalizing
 */
function cleanText(text) {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .replace(/\{\{[^}]+\}\}/g, "") // Remove template variables
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/:\s*$/, "") // Remove trailing colons
    .replace(/^\s*:\s*/, "") // Remove leading colons
    .trim();
}

/**
 * Extract text strings from TypeScript file content
 * Uses regex to find string literals in common text fields
 */
function extractTextFromTypeScript(content) {
  const texts = new Set();

  // Common text field patterns
  const textFieldPatterns = [
    /(?:title|subtitle|description|content|text|label|heading|name|h1Text|subtitleHighlight|mission|headline):\s*["']([^"']{20,})["']/g,
    /(?:title|subtitle|description|content|text|label|heading|name|h1Text|subtitleHighlight|mission|headline):\s*`([^`]{20,})`/g,
  ];

  // Extract from string literals
  for (const pattern of textFieldPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const text = cleanText(match[1]);
      if (text.length > 20) {
        texts.add(text);
      }
    }
  }

  // Extract from array items (like usps, features, etc.)
  const arrayPatterns = [
    /(?:title|description|text|label):\s*["']([^"']{20,})["']/g,
    /(?:title|description|text|label):\s*`([^`]{20,})`/g,
  ];

  for (const pattern of arrayPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const text = cleanText(match[1]);
      if (text.length > 20) {
        texts.add(text);
      }
    }
  }

  // Extract question and answer from FAQ components
  const faqPatterns = [
    /question:\s*["']([^"']{10,})["']/gi,
    /answer:\s*["']([^"']{20,})["']/gi,
  ];

  for (const pattern of faqPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const text = cleanText(match[1]);
      if (text.length > 10) {
        texts.add(text);
      }
    }
  }

  return Array.from(texts);
}

/**
 * Load subpage content from TypeScript file
 * Extracts text content using regex patterns
 */
function loadSubpageContent(pageKey, siteId) {
  const subpagePath = path.join(
    projectRoot,
    "src",
    "data",
    siteId,
    "subpages",
    `${pageKey}.ts`
  );

  if (!fs.existsSync(subpagePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(subpagePath, "utf8");

    // Extract metadata
    let metadata = {};
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    if (titleMatch) {
      metadata.title = cleanText(titleMatch[1]);
    }
    if (descMatch) {
      metadata.description = cleanText(descMatch[1]);
    }

    // Extract all text content
    const texts = extractTextFromTypeScript(content);

    // Clean and deduplicate texts
    const cleanedTexts = Array.from(
      new Set(texts.map((t) => cleanText(t)).filter((t) => t.length > 20))
    );

    return {
      key: pageKey,
      metadata,
      components: cleanedTexts,
    };
  } catch (error) {
    console.warn(`Error loading subpage ${pageKey}:`, error.message);
    return null;
  }
}

/**
 * Load all FAQ content
 */
function loadFAQContent(siteId) {
  const faqDir = path.join(projectRoot, "src", "data", siteId, "json", "faq");

  if (!fs.existsSync(faqDir)) {
    return [];
  }

  const faqs = [];
  const files = fs.readdirSync(faqDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    try {
      const filePath = path.join(faqDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

      if (data.faq_groups) {
        // Grouped FAQs
        for (const group of data.faq_groups) {
          for (const faq of group.faqs || []) {
            faqs.push({
              category: group.group_name,
              question: faq.question,
              answer: faq.answer,
            });
          }
        }
      } else if (Array.isArray(data)) {
        // Array of FAQs
        for (const faq of data) {
          faqs.push({
            category: faq.category || "Allgemein",
            question: faq.question,
            answer: faq.answer,
          });
        }
      }
    } catch (error) {
      console.warn(`Error loading FAQ file ${file}:`, error.message);
    }
  }

  return faqs;
}

/**
 * Load all Lexikon content
 */
function loadLexikonContent(siteId) {
  const lexikonDir = path.join(
    projectRoot,
    "src",
    "data",
    siteId,
    "json",
    "lexikon"
  );

  if (!fs.existsSync(lexikonDir)) {
    return [];
  }

  const terms = [];
  const files = fs.readdirSync(lexikonDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    try {
      const filePath = path.join(lexikonDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

      for (const [term, definition] of Object.entries(data)) {
        terms.push({
          term,
          definition:
            typeof definition === "string"
              ? definition
              : JSON.stringify(definition),
        });
      }
    } catch (error) {
      console.warn(`Error loading Lexikon file ${file}:`, error.message);
    }
  }

  return terms;
}

/**
 * Load all article content
 */
function loadArticleContent(siteId) {
  const articlesDir = path.join(projectRoot, "src", "data", siteId, "articles");

  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  const articles = [];
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    try {
      const filePath = path.join(articlesDir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      articles.push({
        title: data.title || "",
        author: data.author || "",
        datePublished: data["date-published"] || "",
        category: data.category || "",
        content: content.trim(),
      });
    } catch (error) {
      console.warn(`Error loading article ${file}:`, error.message);
    }
  }

  return articles;
}

/**
 * Collect all website content into a structured format
 */
function collectAllContent(siteId) {
  const currentSite = multiSiteConfig.sites.find((site) => site.id === siteId);

  if (!currentSite) {
    throw new Error(`Site with id ${siteId} not found`);
  }

  console.log(`Collecting content for site: ${currentSite.name} (${siteId})`);

  // Load subpages
  const subpages = [];
  const subpagesDir = path.join(projectRoot, "src", "data", siteId, "subpages");

  if (fs.existsSync(subpagesDir)) {
    const files = fs.readdirSync(subpagesDir);
    for (const file of files) {
      if (file.endsWith(".ts") && !file.includes("programmatic")) {
        const pageKey = file.replace(".ts", "");
        const content = loadSubpageContent(pageKey, siteId);
        if (content) {
          subpages.push(content);
        }
      }
    }
  }

  // Load other content
  const faqs = loadFAQContent(siteId);
  const lexikonTerms = loadLexikonContent(siteId);
  const articles = loadArticleContent(siteId);

  return {
    site: {
      id: siteId,
      name: currentSite.name,
      description: currentSite.description,
      domain: currentSite.domain,
      contact: currentSite.contact || {},
      social: currentSite.social || {},
    },
    subpages,
    faqs,
    lexikonTerms,
    articles,
  };
}

/**
 * Load the prompt from the markdown file
 */
function loadPrompt() {
  const promptPath = path.join(
    projectRoot,
    "data",
    "prompts",
    "LLM_TXT_GENERATION_PROMPT.md"
  );

  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt file not found: ${promptPath}`);
  }

  return fs.readFileSync(promptPath, "utf8");
}

/**
 * Format content for the AI prompt
 */
function formatContentForPrompt(content) {
  let formatted = `# Website Content Data\n\n`;
  formatted += `## Site Information\n\n`;
  formatted += `- Name: ${content.site.name}\n`;
  formatted += `- Domain: ${content.site.domain}\n`;
  formatted += `- Description: ${content.site.description}\n`;
  formatted += `- Contact Email: ${content.site.contact.email || "N/A"}\n`;
  formatted += `- Contact Phone: ${content.site.contact.phone || "N/A"}\n`;
  if (content.site.contact.address) {
    const addr = content.site.contact.address;
    formatted += `- Address: ${addr.street || ""}, ${addr.postalCode || ""} ${addr.location || ""}, ${addr.country || ""}\n`;
  }
  formatted += `\n`;

  formatted += `## Subpages (${content.subpages.length} pages)\n\n`;
  for (const page of content.subpages) {
    formatted += `### Page: ${page.key}\n`;
    if (page.metadata?.title) {
      formatted += `Title: ${page.metadata.title}\n`;
    }
    if (page.metadata?.description) {
      formatted += `Description: ${page.metadata.description}\n`;
    }
    if (page.components && page.components.length > 0) {
      formatted += `Content:\n`;
      page.components.slice(0, 20).forEach((text, idx) => {
        formatted += `${idx + 1}. ${text}\n`;
      });
      if (page.components.length > 20) {
        formatted += `... (${page.components.length - 20} more content items)\n`;
      }
    }
    formatted += `\n`;
  }

  formatted += `## FAQ Content (${content.faqs.length} questions)\n\n`;
  const faqsByCategory = {};
  content.faqs.forEach((faq) => {
    const category = faq.category || "Allgemein";
    if (!faqsByCategory[category]) {
      faqsByCategory[category] = [];
    }
    faqsByCategory[category].push(faq);
  });

  for (const [category, categoryFaqs] of Object.entries(faqsByCategory)) {
    formatted += `### ${category}\n\n`;
    categoryFaqs.forEach((faq) => {
      formatted += `Q: ${faq.question}\n`;
      formatted += `A: ${faq.answer}\n\n`;
    });
  }

  formatted += `## Lexikon Terms (${content.lexikonTerms.length} terms)\n\n`;
  content.lexikonTerms.forEach((term) => {
    formatted += `**${term.term}**: ${term.definition}\n\n`;
  });

  formatted += `## Articles (${content.articles.length} articles)\n\n`;
  content.articles.forEach((article) => {
    formatted += `### ${article.title}\n`;
    if (article.author) formatted += `Author: ${article.author}\n`;
    if (article.datePublished)
      formatted += `Published: ${article.datePublished}\n`;
    if (article.category) formatted += `Category: ${article.category}\n`;
    formatted += `\nContent:\n${article.content.substring(0, 2000)}${article.content.length > 2000 ? "...\n" : "\n"}\n\n`;
  });

  return formatted;
}

/**
 * Model pricing per million tokens (input, output)
 * Prices are approximate and may vary. Update as needed.
 */
const MODEL_PRICING = {
  "google/gemini-1.5-pro": {
    input: 1.25, // $1.25 per million input tokens
    output: 5.0, // $5.00 per million output tokens
  },
  "google/gemini-1.5-flash": {
    input: 0.075, // $0.075 per million input tokens
    output: 0.3, // $0.30 per million output tokens
  },
  "google/gemini-2.0-flash-exp": {
    input: 0.075, // $0.075 per million input tokens
    output: 0.3, // $0.30 per million output tokens
  },
  "google/gemini-3-pro-preview": {
    input: 2, // $0.50 per million input tokens
    output: 12, // $1.50 per million output tokens
  },
};

/**
 * Estimate token count from text
 * Rough approximation: ~1 token = 4 characters for English text
 */
function estimateTokens(text) {
  if (!text || typeof text !== "string") {
    return 0;
  }
  // Rough approximation: 1 token ≈ 4 characters for English
  // This is a conservative estimate
  return Math.ceil(text.length / 4);
}

/**
 * Get pricing for a model, with fallback to default pricing
 */
function getModelPricing(model) {
  const pricing = MODEL_PRICING[model];
  if (pricing) {
    return pricing;
  }
  // Default fallback pricing (use Gemini 1.5 Pro as default)
  console.warn(`⚠️  Unknown model pricing for ${model}, using default pricing`);
  return MODEL_PRICING["google/gemini-1.5-pro"];
}

/**
 * Calculate cost from token count and price per million
 * (Used for estimates only - actual costs come from API)
 */
function calculateCost(tokens, pricePerMillion) {
  return (tokens / 1_000_000) * pricePerMillion;
}

/**
 * Format cost for display
 */
function formatCost(cost) {
  if (cost < 0.01) {
    return `$${(cost * 1000).toFixed(2)} (${(cost * 100).toFixed(4)}¢)`;
  }
  return `$${cost.toFixed(4)}`;
}

/**
 * Fetch generation stats from OpenRouter API
 * This provides precise cost and token information
 */
async function fetchGenerationStats(generationId) {
  try {
    const response = await fetch(
      `https://openrouter.ai/api/v1/generation?id=${generationId}`,
      {
        headers: {
          Authorization: `Bearer ${openrouterApiKey}`,
          "HTTP-Referer":
            process.env.OPENROUTER_REFERER_URL || "https://gutachten.org",
          "X-Title": "Gutachten.org LLM Text Generator",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch generation stats: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`⚠️  Could not fetch generation stats: ${error.message}`);
    return null;
  }
}

/**
 * Generate llm.txt using OpenRouter API with Gemini
 */
async function generateLlmTxtWithAI(content) {
  console.log("Loading prompt...");
  const promptTemplate = loadPrompt();

  console.log("Formatting content for AI...");
  const formattedContent = formatContentForPrompt(content);

  //write content to file for debugging if needed
  // fs.writeFileSync(
  //   path.join(projectRoot, "public", "formattedContent.txt"),
  //   formattedContent,
  //   "utf8"
  // );
  // console.log("✅ Successfully wrote formatted content to file");
  // console.log(
  //   `   File size: ${(formattedContent.length / 1024).toFixed(2)} KB`
  // );
  // console.log(
  //   `   File path: ${path.join(projectRoot, "public", "formattedContent.txt")}`
  // );

  const systemPrompt = `You are an expert technical writer specializing in creating comprehensive documentation files optimized for LLM context chunking. Follow the instructions in the prompt exactly.`;

  const userPrompt = `${promptTemplate}

---

# ACTUAL WEBSITE CONTENT TO PROCESS

${formattedContent}

---

Please generate the llm.txt file following all the requirements and guidelines from the prompt above. Ensure each paragraph contains exactly one idea, all entities are properly defined, and the content is well-structured and comprehensive.`;

  // Use Gemini 1.5 Pro for large context window (2M tokens)
  const model = process.env.OPENROUTER_MODEL_LLM_TXT || "google/gemini-1.5-pro";

  // Estimate tokens and costs before API call
  const inputText = `${systemPrompt}\n\n${userPrompt}`;
  const estimatedInputTokens = estimateTokens(inputText);

  // Estimate output tokens based on typical llm.txt generation (roughly 50-100% of input)
  // For comprehensive documentation, estimate higher output
  const estimatedOutputTokens = Math.ceil(estimatedInputTokens * 0.8);

  const pricing = getModelPricing(model);
  const estimatedInputCost = calculateCost(estimatedInputTokens, pricing.input);
  const estimatedOutputCost = calculateCost(
    estimatedOutputTokens,
    pricing.output
  );
  const estimatedTotalCost = estimatedInputCost + estimatedOutputCost;

  // Display cost estimate
  console.log("\n💰 Cost Estimate:");
  console.log(`   Model: ${model}`);
  console.log(
    `   Estimated Input Tokens: ${estimatedInputTokens.toLocaleString()}`
  );
  console.log(`   Estimated Input Cost: ${formatCost(estimatedInputCost)}`);
  console.log(
    `   Estimated Output Tokens: ${estimatedOutputTokens.toLocaleString()}`
  );
  console.log(`   Estimated Output Cost: ${formatCost(estimatedOutputCost)}`);
  console.log(`   Estimated Total Cost: ${formatCost(estimatedTotalCost)}`);
  console.log("");

  const spinner = ora({
    text: `Calling OpenRouter API (${model})...`,
    spinner: "dots",
  }).start();

  const startTime = Date.now();

  try {
    // Update spinner text periodically to show it's still working
    const spinnerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      spinner.text = `Generating llm.txt with ${model}... (${elapsed}s)`;
    }, 1000);

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.3, // Lower temperature for more consistent, factual output
    });

    clearInterval(spinnerInterval);
    spinner.text = "Processing response...";

    const generatedText = completion.choices[0]?.message?.content;

    if (!generatedText) {
      spinner.fail("No content generated by OpenRouter API");
      throw new Error("No content generated by OpenRouter API");
    }

    // Get token counts from response
    const usage = completion.usage || {};
    const actualInputTokens = usage.prompt_tokens || 0;
    const actualOutputTokens = usage.completion_tokens || 0;
    const actualTotalTokens = usage.total_tokens || 0;

    // Fetch precise cost information from OpenRouter generation API
    // See: https://openrouter.ai/docs/api/reference/overview#querying-cost-and-stats
    let actualTotalCost = null;
    let actualInputCost = null;
    let actualOutputCost = null;
    let costFromAPI = false;

    if (completion.id) {
      spinner.text = "Fetching cost information from OpenRouter...";
      const generationStats = await fetchGenerationStats(completion.id);

      if (generationStats?.usage) {
        // Get actual cost from OpenRouter API
        actualTotalCost = generationStats.usage.cost;
        costFromAPI = actualTotalCost !== null && actualTotalCost !== undefined;

        // Generation API may provide detailed breakdown
        if (generationStats.usage.prompt_tokens_cost !== undefined) {
          actualInputCost = generationStats.usage.prompt_tokens_cost;
        }
        if (generationStats.usage.completion_tokens_cost !== undefined) {
          actualOutputCost = generationStats.usage.completion_tokens_cost;
        }
      }
    }

    // Fallback to calculated costs if API didn't provide them
    if (!costFromAPI) {
      actualInputCost = calculateCost(actualInputTokens, pricing.input);
      actualOutputCost = calculateCost(actualOutputTokens, pricing.output);
      actualTotalCost = actualInputCost + actualOutputCost;
      console.warn(
        "⚠️  Cost not available from OpenRouter API, using calculated estimate"
      );
    } else {
      // If we have total cost but not breakdown, calculate breakdown for display
      if (actualInputCost === null || actualInputCost === undefined) {
        actualInputCost = calculateCost(actualInputTokens, pricing.input);
      }
      if (actualOutputCost === null || actualOutputCost === undefined) {
        actualOutputCost = calculateCost(actualOutputTokens, pricing.output);
      }
    }

    const contentSize = (generatedText.length / 1024).toFixed(2);

    spinner.succeed(
      `Generated ${contentSize} KB of content (${actualTotalTokens.toLocaleString()} tokens)`
    );

    // Display actual costs
    const costSource = costFromAPI
      ? "from OpenRouter API"
      : "calculated estimate";
    console.log(`\n💰 Actual Cost (${costSource}):`);
    console.log(`   Input Tokens: ${actualInputTokens.toLocaleString()}`);
    console.log(`   Input Cost: ${formatCost(actualInputCost)}`);
    console.log(`   Output Tokens: ${actualOutputTokens.toLocaleString()}`);
    console.log(`   Output Cost: ${formatCost(actualOutputCost)}`);
    console.log(`   Total Tokens: ${actualTotalTokens.toLocaleString()}`);
    console.log(`   Total Cost: ${formatCost(actualTotalCost)}`);

    // Show comparison if estimates were provided
    if (estimatedTotalCost > 0) {
      const costDifference = actualTotalCost - estimatedTotalCost;
      const percentDifference = (
        (costDifference / estimatedTotalCost) *
        100
      ).toFixed(1);
      console.log(`\n   Comparison to Estimate:`);
      console.log(
        `   Difference: ${costDifference >= 0 ? "+" : ""}${formatCost(costDifference)} (${percentDifference >= 0 ? "+" : ""}${percentDifference}%)`
      );
    }

    return generatedText;
  } catch (error) {
    spinner.fail(`Error calling OpenRouter API: ${error.message}`);
    if (error.response) {
      console.error("API Response:", error.response);
    }
    throw error;
  }
}

/**
 * Generate llm.txt for a specific site
 */
async function generateLlmTxtForSite(siteId) {
  try {
    // Collect all content
    const content = collectAllContent(siteId);
    console.log(`✅ Collected content:`);
    console.log(`   - ${content.subpages.length} subpages`);
    console.log(`   - ${content.faqs.length} FAQs`);
    console.log(`   - ${content.lexikonTerms.length} Lexikon terms`);
    console.log(`   - ${content.articles.length} articles`);

    // Generate llm.txt using AI
    const llmTxtContent = await generateLlmTxtWithAI(content);

    // Write file - always use llm.txt (will override existing file if present)
    const publicDir = path.join(projectRoot, "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, "llm.txt");
    fs.writeFileSync(outputPath, llmTxtContent, "utf8");
    console.log(`✅ Successfully generated llm.txt at ${outputPath}`);
    console.log(`   File size: ${(llmTxtContent.length / 1024).toFixed(2)} KB`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating llm.txt for ${siteId}:`, error);
    return false;
  }
}

// Main execution
async function main() {
  try {
    // Get siteId from command line argument (required)
    const selectedSite = process.argv[2];

    // Require siteId argument
    if (!selectedSite) {
      console.error("❌ Error: siteId argument is required");
      console.error("\nUsage:");
      console.error("  node src/scripts/generate-llm-txt.mjs <siteId>");
      console.error("  node src/scripts/generate-llm-txt.mjs all");
      console.error("\nAvailable sites:");
      const sites = multiSiteConfig.sites || [];
      sites.forEach((site) => {
        console.error(`  - ${site.id} (${site.name})`);
      });
      process.exit(1);
    }

    // Check if "all" was selected
    if (selectedSite === "all") {
      console.log("\n📝 Generating llm.txt for all sites...\n");
      console.log(
        "⚠️  Note: Each site will overwrite the previous llm.txt file.\n"
      );
      const sites = multiSiteConfig.sites || [];
      const results = [];

      for (const site of sites) {
        const success = await generateLlmTxtForSite(site.id);
        results.push({ siteId: site.id, success });
      }

      const successCount = results.filter((r) => r.success).length;
      const totalCount = results.length;

      console.log(
        `\n✅ Generated llm.txt for ${successCount}/${totalCount} sites`
      );
      console.log(
        "⚠️  Note: llm.txt now contains content from the last successfully processed site."
      );

      if (successCount < totalCount) {
        console.log("\n❌ Failed sites:");
        results
          .filter((r) => !r.success)
          .forEach((r) => console.log(`   - ${r.siteId}`));
        process.exit(1);
      }
    } else {
      // Generate for single site
      await generateLlmTxtForSite(selectedSite);
    }
  } catch (error) {
    console.error("❌ Error generating llm.txt:", error);
    process.exit(1);
  }
}

main();
