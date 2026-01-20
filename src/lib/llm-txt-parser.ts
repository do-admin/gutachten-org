import fs from "fs";
import path from "path";

export interface LlmTxtSection {
  title: string;
  content: string;
  subsections: LlmTxtSection[];
}

export interface ExtractedContent {
  pageOverview: string[];
  coreEntities: Array<{
    name: string;
    type: string;
    description: string;
    relationships: string[];
    context?: string;
  }>;
  pageContent: string[];
  relatedFaq: Array<{
    question: string;
    answer: string;
  }>;
  relatedLexikon: Array<{
    term: string;
    definition: string;
  }>;
  relatedArticles: Array<{
    title: string;
    content: string;
  }>;
  entityRelationships: string[];
}

/**
 * Check if llm.txt file exists
 */
export function checkLlmTxtExists(): boolean {
  const llmTxtPath = path.join(process.cwd(), "public", "llm.txt");
  return fs.existsSync(llmTxtPath);
}

/**
 * Read llm.txt file content
 */
export function readLlmTxt(): string | null {
  const llmTxtPath = path.join(process.cwd(), "public", "llm.txt");
  if (!fs.existsSync(llmTxtPath)) {
    return null;
  }
  return fs.readFileSync(llmTxtPath, "utf-8");
}

/**
 * Parse markdown structure from llm.txt
 */
export function parseLlmTxt(content: string): LlmTxtSection[] {
  const lines = content.split("\n");
  const sections: LlmTxtSection[] = [];
  let currentSection: LlmTxtSection | null = null;
  let currentSubsection: LlmTxtSection | null = null;
  let currentContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      // Save previous section
      if (currentSection) {
        if (currentSubsection) {
          currentSubsection.content = currentContent.join("\n").trim();
          currentSection.subsections.push(currentSubsection);
          currentSubsection = null;
        }
        currentSection.content = currentContent.join("\n").trim();
        sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        title: h2Match[1].trim(),
        content: "",
        subsections: [],
      };
      currentContent = [];
      currentSubsection = null;
    } else if (h3Match && currentSection) {
      // Save previous subsection
      if (currentSubsection) {
        currentSubsection.content = currentContent.join("\n").trim();
        currentSection.subsections.push(currentSubsection);
      }

      // Start new subsection
      currentSubsection = {
        title: h3Match[1].trim(),
        content: "",
        subsections: [],
      };
      currentContent = [];
    } else if (line.trim()) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    if (currentSubsection) {
      currentSubsection.content = currentContent.join("\n").trim();
      currentSection.subsections.push(currentSubsection);
    }
    currentSection.content = currentContent.join("\n").trim();
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Extract entity definitions from Core Entities section
 */
function extractEntities(
  entitiesSection: LlmTxtSection,
  pageKeywords: string[]
): ExtractedContent["coreEntities"] {
  const entities: ExtractedContent["coreEntities"] = [];
  const content = entitiesSection.content;

  // Split by ENTITY: markers
  const entityBlocks = content.split(/ENTITY:\s*/).filter((block) => block.trim());

  for (const block of entityBlocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter((l) => l);
    if (lines.length === 0) continue;

    const nameLine = lines[0];
    if (!nameLine) continue;

    // Check if entity is relevant to page
    const isRelevant =
      pageKeywords.some((keyword) =>
        nameLine.toLowerCase().includes(keyword.toLowerCase())
      ) ||
      block.toLowerCase().includes(pageKeywords.join(" ").toLowerCase());

    if (!isRelevant) continue;

    const entity: ExtractedContent["coreEntities"][0] = {
      name: nameLine,
      type: "",
      description: "",
      relationships: [],
    };

    let currentField = "";
    let currentValue: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("TYPE:")) {
        if (currentField && currentValue.length > 0) {
          if (currentField === "DESCRIPTION") {
            entity.description = currentValue.join(" ").trim();
          } else if (currentField === "RELATIONSHIPS") {
            entity.relationships = currentValue
              .filter((v) => v.startsWith("-"))
              .map((v) => v.substring(1).trim());
          } else if (currentField === "CONTEXT") {
            entity.context = currentValue.join(" ").trim();
          }
        }
        currentField = "TYPE";
        currentValue = [line.substring(5).trim()];
      } else if (line.startsWith("DESCRIPTION:")) {
        if (currentField && currentValue.length > 0) {
          if (currentField === "RELATIONSHIPS") {
            entity.relationships = currentValue
              .filter((v) => v.startsWith("-"))
              .map((v) => v.substring(1).trim());
          } else if (currentField === "CONTEXT") {
            entity.context = currentValue.join(" ").trim();
          }
        }
        currentField = "DESCRIPTION";
        currentValue = [line.substring(12).trim()];
      } else if (line.startsWith("RELATIONSHIPS:")) {
        if (currentField === "DESCRIPTION" && currentValue.length > 0) {
          entity.description = currentValue.join(" ").trim();
        } else if (currentField === "CONTEXT" && currentValue.length > 0) {
          entity.context = currentValue.join(" ").trim();
        }
        currentField = "RELATIONSHIPS";
        currentValue = [];
      } else if (line.startsWith("CONTEXT:")) {
        if (currentField === "DESCRIPTION" && currentValue.length > 0) {
          entity.description = currentValue.join(" ").trim();
        } else if (currentField === "RELATIONSHIPS" && currentValue.length > 0) {
          entity.relationships = currentValue
            .filter((v) => v.startsWith("-"))
            .map((v) => v.substring(1).trim());
        }
        currentField = "CONTEXT";
        currentValue = [line.substring(8).trim()];
      } else if (currentField === "TYPE") {
        entity.type = currentValue.join(" ").trim() || line;
      } else if (line.trim()) {
        currentValue.push(line);
      }
    }

    // Save last field
    if (currentField === "DESCRIPTION" && currentValue.length > 0) {
      entity.description = currentValue.join(" ").trim();
    } else if (currentField === "RELATIONSHIPS" && currentValue.length > 0) {
      entity.relationships = currentValue
        .filter((v) => v.startsWith("-"))
        .map((v) => v.substring(1).trim());
    } else if (currentField === "CONTEXT" && currentValue.length > 0) {
      entity.context = currentValue.join(" ").trim();
    }

    if (entity.name && entity.description) {
      entities.push(entity);
    }
  }

  return entities;
}

/**
 * Extract paragraphs from content (one idea per paragraph)
 */
export function extractParagraphs(content: string): string[] {
  // Split by double newlines (paragraph breaks)
  const paragraphs = content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // Further split long paragraphs that might contain multiple ideas
  let singleIdeaParagraphs: string[] = [];
  for (const para of paragraphs) {
    // If paragraph is very long, try to split by sentence boundaries
    if (para.length > 500) {
      const sentences = para.split(/(?<=[.!?])\s+/);
      let currentPara = "";
      for (const sentence of sentences) {
        if (currentPara.length + sentence.length > 400) {
          if (currentPara) singleIdeaParagraphs.push(currentPara.trim());
          currentPara = sentence;
        } else {
          currentPara += (currentPara ? " " : "") + sentence;
        }
      }
      if (currentPara) singleIdeaParagraphs.push(currentPara.trim());
    } else {
      singleIdeaParagraphs.push(para);
    }
  }

  singleIdeaParagraphs = singleIdeaParagraphs.map((p) => p.replace('```', ''));
  return singleIdeaParagraphs;
}

/**
 * Extract page-specific content from llm.txt
 */
export function extractPageContent(
  llmTxtContent: string,
  pageKey: string,
  pageTitle: string,
  programmaticInstance?: string
): ExtractedContent {
  const sections = parseLlmTxt(llmTxtContent);
  const pageKeywords = [
    pageKey,
    pageTitle,
    ...(programmaticInstance ? [programmaticInstance] : []),
  ]
    .filter(Boolean)
    .map((k) => k.toLowerCase());

  const result: ExtractedContent = {
    pageOverview: [],
    coreEntities: [],
    pageContent: [],
    relatedFaq: [],
    relatedLexikon: [],
    relatedArticles: [],
    entityRelationships: [],
  };

  // Find relevant sections
  for (const section of sections) {
    const sectionTitle = section.title.toLowerCase();

    // Extract Core Entities
    if (sectionTitle.includes("core entities")) {
      result.coreEntities = extractEntities(section, pageKeywords);
    }

    // Extract Page Content
    if (sectionTitle.includes("page content")) {
      // Find subsection for this specific page
      for (const subsection of section.subsections) {
        const subsectionTitle = subsection.title.toLowerCase();
        if (
          subsectionTitle.includes(pageKey.toLowerCase()) ||
          subsectionTitle.includes(pageTitle.toLowerCase()) ||
          (programmaticInstance &&
            subsectionTitle.includes(programmaticInstance.toLowerCase()))
        ) {
          result.pageContent = extractParagraphs(subsection.content);
        }
      }

      // If no specific subsection found, check if general content mentions page keywords
      if (result.pageContent.length === 0) {
        const generalContent = extractParagraphs(section.content);
        result.pageContent = generalContent.filter((para) =>
          pageKeywords.some((keyword) =>
            para.toLowerCase().includes(keyword)
          )
        );
      }
    }

    // Extract FAQ Content
    if (sectionTitle.includes("faq")) {
      const faqContent = section.content;
      // Simple FAQ extraction - look for Q: and A: patterns
      const faqBlocks = faqContent.split(/(?:^|\n)(?:Q:|Frage:)/i);
      for (const block of faqBlocks) {
        if (!block.trim()) continue;
        const lines = block.split("\n").map((l) => l.trim());
        const question = lines[0]?.replace(/^[QA]:\s*/i, "").trim();
        if (!question) continue;

        // Check if FAQ is relevant
        const isRelevant = pageKeywords.some((keyword) =>
          (question + block).toLowerCase().includes(keyword)
        );
        if (!isRelevant) continue;

        // Extract answer (everything after question until next Q: or end)
        const answerLines = lines.slice(1).filter((l) => !l.match(/^[QA]:/i));
        const answer = answerLines.join(" ").trim();

        if (question && answer) {
          result.relatedFaq.push({ question, answer });
        }
      }
    }

    // Extract Lexikon Terms
    if (sectionTitle.includes("lexikon") || sectionTitle.includes("glossary")) {
      // Look for term definitions
      const termBlocks = section.content.split(/\n\n+/);
      for (const block of termBlocks) {
        const lines = block.split("\n").map((l) => l.trim());
        if (lines.length < 2) continue;

        // Check if term is relevant
        const isRelevant = pageKeywords.some((keyword) =>
          block.toLowerCase().includes(keyword)
        );
        if (!isRelevant) continue;

        // Try to extract term and definition
        const firstLine = lines[0];
        if (firstLine && firstLine.length < 100) {
          // Likely a term
          const definition = lines.slice(1).join(" ").trim();
          if (definition) {
            result.relatedLexikon.push({
              term: firstLine.replace(/^[-*]\s*/, "").trim(),
              definition,
            });
          }
        }
      }
    }

    // Extract Articles
    if (sectionTitle.includes("article") || sectionTitle.includes("ratgeber")) {
      for (const subsection of section.subsections) {
        const articleContent = subsection.content;
        const isRelevant = pageKeywords.some((keyword) =>
          (subsection.title + articleContent).toLowerCase().includes(keyword)
        );
        if (isRelevant) {
          const paragraphs = extractParagraphs(articleContent);
          result.relatedArticles.push({
            title: subsection.title,
            content: paragraphs.join(" "),
          });
        }
      }
    }
  }

  // Extract page overview from site overview or page content
  const siteOverviewSection = sections.find(
    (s) => s.title.toLowerCase().includes("site overview")
  );
  if (siteOverviewSection) {
    const overviewParagraphs = extractParagraphs(siteOverviewSection.content);
    result.pageOverview = overviewParagraphs.filter((para) =>
      pageKeywords.some((keyword) => para.toLowerCase().includes(keyword))
    );
  }

  // Extract entity relationships
  for (const entity of result.coreEntities) {
    if (entity.relationships.length > 0) {
      result.entityRelationships.push(
        `${entity.name} relates to: ${entity.relationships.join(", ")}`
      );
    }
  }

  return result;
}
