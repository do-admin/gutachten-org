import fs from "fs";
import path from "path";
import { parseLlmTxt, LlmTxtSection, extractParagraphs } from "./llm-txt-parser";

export interface CompleteGroundingContent {
  siteOverview: string[];
  coreEntities: Array<{
    name: string;
    type: string;
    description: string;
    relationships: string[];
    context?: string;
  }>;
  siteStructure: string[];
  pageContent: Array<{
    pageTitle: string;
    paragraphs: string[];
  }>;
  faqContent: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
  lexikon: Array<{
    term: string;
    definition: string;
  }>;
  articles: Array<{
    title: string;
    content: string;
  }>;
  servicesFeatures: string[];
  legalCompliance: string[];
  contactOrganization: string[];
}

/**
 * Extract ALL entities from Core Entities section (no filtering)
 */
function extractAllEntities(
  entitiesSection: LlmTxtSection
): CompleteGroundingContent["coreEntities"] {
  const entities: CompleteGroundingContent["coreEntities"] = [];
  const content = entitiesSection.content;

  // Split by ENTITY: markers
  const entityBlocks = content.split(/ENTITY:\s*/).filter((block) => block.trim());

  for (const block of entityBlocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter((l) => l);
    if (lines.length === 0) continue;

    const nameLine = lines[0];
    if (!nameLine) continue;

    const entity: CompleteGroundingContent["coreEntities"][0] = {
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
 * Extract ALL FAQs from FAQ section (no filtering)
 */
function extractAllFaqs(faqSection: LlmTxtSection): CompleteGroundingContent["faqContent"] {
  const faqs: CompleteGroundingContent["faqContent"] = [];
  const content = faqSection.content;

  // Try different FAQ patterns
  const patterns = [
    /(?:^|\n)(?:QUESTION|Q|Frage):\s*(.+?)(?:\n(?:ANSWER|A|Antwort):\s*(.+?))(?=\n(?:QUESTION|Q|Frage):|$)/gis,
    /(?:^|\n)(?:Q:|Frage:)\s*(.+?)(?:\n(?:A:|Antwort:)\s*(.+?))(?=\n(?:Q:|Frage:)|$)/gis,
  ];

  for (const pattern of patterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const question = match[1]?.trim();
      const answer = match[2]?.trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  // Fallback: simple line-based extraction
  if (faqs.length === 0) {
    const lines = content.split("\n");
    let currentQuestion = "";
    let currentAnswer: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.match(/^(?:QUESTION|Q|Frage):/i)) {
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({
            question: currentQuestion,
            answer: currentAnswer.join(" ").trim(),
          });
        }
        currentQuestion = trimmed.replace(/^(?:QUESTION|Q|Frage):\s*/i, "").trim();
        currentAnswer = [];
      } else if (trimmed.match(/^(?:ANSWER|A|Antwort):/i)) {
        // Answer line
        const answerText = trimmed.replace(/^(?:ANSWER|A|Antwort):\s*/i, "").trim();
        if (answerText) {
          currentAnswer.push(answerText);
        }
      } else if (currentQuestion && trimmed) {
        currentAnswer.push(trimmed);
      }
    }

    // Save last FAQ
    if (currentQuestion && currentAnswer.length > 0) {
      faqs.push({
        question: currentQuestion,
        answer: currentAnswer.join(" ").trim(),
      });
    }
  }

  return faqs;
}

/**
 * Extract ALL Lexikon terms (no filtering)
 */
function extractAllLexikon(
  lexikonSection: LlmTxtSection
): CompleteGroundingContent["lexikon"] {
  const terms: CompleteGroundingContent["lexikon"] = [];
  const content = lexikonSection.content;

  // Split by paragraphs
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim());

  for (const para of paragraphs) {
    const lines = para.split("\n").map((l) => l.trim()).filter((l) => l);
    if (lines.length < 2) continue;

    // Try to identify term and definition
    // Pattern: "Term (English): Definition text"
    const firstLine = lines[0];
    const termMatch = firstLine.match(/^(.+?)(?:\s*\([^)]+\))?:\s*(.+)$/);
    if (termMatch) {
      terms.push({
        term: termMatch[1].trim(),
        definition: termMatch[2].trim() + " " + lines.slice(1).join(" "),
      });
    } else if (firstLine.length < 100) {
      // Likely a term if first line is short
      const definition = lines.slice(1).join(" ").trim();
      if (definition) {
        terms.push({
          term: firstLine.replace(/^[-*]\s*/, "").trim(),
          definition,
        });
      }
    }
  }

  return terms;
}

/**
 * Extract ALL content from llm.txt (comprehensive, no filtering)
 */
export function extractAllContent(
  llmTxtContent: string
): CompleteGroundingContent {
  const sections = parseLlmTxt(llmTxtContent);

  const result: CompleteGroundingContent = {
    siteOverview: [],
    coreEntities: [],
    siteStructure: [],
    pageContent: [],
    faqContent: [],
    lexikon: [],
    articles: [],
    servicesFeatures: [],
    legalCompliance: [],
    contactOrganization: [],
  };

  for (const section of sections) {
    const sectionTitle = section.title.toLowerCase();

    // Site Overview
    if (sectionTitle.includes("site overview")) {
      result.siteOverview = extractParagraphs(section.content);
    }

    // Core Entities - extract ALL
    if (sectionTitle.includes("core entities")) {
      result.coreEntities = extractAllEntities(section);
    }

    // Site Structure
    if (sectionTitle.includes("site structure")) {
      result.siteStructure = extractParagraphs(section.content);
    }

    // Page Content - extract ALL pages
    if (sectionTitle.includes("page content")) {
      // Extract all subsections (each is a page)
      for (const subsection of section.subsections) {
        const paragraphs = extractParagraphs(subsection.content);
        if (paragraphs.length > 0) {
          result.pageContent.push({
            pageTitle: subsection.title,
            paragraphs,
          });
        }
      }
      // Also include main section content if any
      if (section.content.trim() && section.subsections.length === 0) {
        const paragraphs = extractParagraphs(section.content);
        if (paragraphs.length > 0) {
          result.pageContent.push({
            pageTitle: "General",
            paragraphs,
          });
        }
      }
    }

    // FAQ Content - extract ALL
    if (sectionTitle.includes("faq")) {
      result.faqContent = extractAllFaqs(section);
    }

    // Lexikon - extract ALL
    if (sectionTitle.includes("lexikon") || sectionTitle.includes("glossary")) {
      result.lexikon = extractAllLexikon(section);
    }

    // Articles - extract ALL
    if (sectionTitle.includes("article") || sectionTitle.includes("ratgeber")) {
      for (const subsection of section.subsections) {
        const paragraphs = extractParagraphs(subsection.content);
        result.articles.push({
          title: subsection.title,
          content: paragraphs.join(" "),
        });
      }
      // Also include main section content if any
      if (section.content.trim() && section.subsections.length === 0) {
        const paragraphs = extractParagraphs(section.content);
        if (paragraphs.length > 0) {
          result.articles.push({
            title: "General Articles",
            content: paragraphs.join(" "),
          });
        }
      }
    }

    // Services & Features
    if (
      sectionTitle.includes("services") ||
      sectionTitle.includes("features")
    ) {
      result.servicesFeatures = extractParagraphs(section.content);
    }

    // Legal & Compliance
    if (
      sectionTitle.includes("legal") ||
      sectionTitle.includes("compliance")
    ) {
      result.legalCompliance = extractParagraphs(section.content);
    }

    // Contact & Organization
    if (
      sectionTitle.includes("contact") ||
      sectionTitle.includes("organization")
    ) {
      result.contactOrganization = extractParagraphs(section.content);
    }
  }

  return result;
}
