# LLM.txt Generation Prompt

## Overview

This prompt guides the creation of a comprehensive `llm.txt` file that documents the entire website's content in a structured format optimized for LLM context chunking and AI system grounding. The file should follow the **Grounding Page Standard v1.4** principles, providing stable, machine-readable facts that AI systems can reliably interpret.

Each paragraph should contain a single, self-contained idea to maximize retrieval effectiveness and semantic stability in RAG systems and Grounding APIs (Gemini, Perplexity, Claude, Qwen, etc.).

The resulting text should be in German.

Only output the actual content with no descriptive text before it. 

---

## Grounding Page Standard Alignment

The `llm.txt` file serves as a **Grounding Page** - a stable foundation of machine-readable facts for AI systems. This aligns with the Grounding Page Standard v1.4 (published November 20, 2025, updated December 14, 2025).

### Core Principles

**In Focus:**

- ✅ Grounding for RAG systems
- ✅ Grounding on entity-level
- ✅ Stable definition of facts
- ✅ Citable structure
- ✅ Disambiguation rules

**Not in Focus:**

- ❌ Marketing claims
- ❌ Subjective interpretations
- ❌ Dynamic or live data
- ❌ Regulated advice
- ❌ SEO manipulation

### Purpose

The `llm.txt` file creates a stable semantic anchor that:

- Improves interpretation in ChatGPT, Google AI Search, Perplexity, and other LLMs
- Addresses AI hallucinations and missing facts
- Provides stable entity interpretation
- Serves as brand-owned data for AI systems
- Functions as a machine-readable API for AI retrieval

---

## Task

Create an `llm.txt` file in the `public/` directory that comprehensively documents all website content, entities, and structure in clearly structured paragraphs optimized for context chunking and AI grounding. The file should provide stable, factual definitions that AI systems can reliably retrieve and interpret in German language.

---

## Context

- **Framework**: Next.js with App Router and static HTML rendering
- **Content Structure**: Block-based architecture with reusable components
- **Standard**: Grounding Page Standard v1.4 (stable, machine-readable facts for AI systems)
- **Target Systems**: RAG systems, Grounding APIs (Gemini, Perplexity, Claude, Qwen, ChatGPT, Google AI Search)
- **Content Sources**:
  - Subpage configuration files (`src/data/{siteId}/subpages/*.ts`)
  - FAQ JSON files (`src/data/{siteId}/json/faq/*.json`)
  - Lexikon JSON files (`src/data/{siteId}/json/lexikon/*.json`)
  - Article Markdown files (`src/data/{siteId}/articles/*.md`)
  - Site configuration (`src/data/multi-page-config.json`)
  - Component definitions and schemas

---

## Requirements

### 1. File Structure

The `llm.txt` file should follow this structure:

```
# Website: [Site Name]
# Domain: [Domain]
# Generated: [Date]

## Site Overview
[Site description and purpose]

## Core Entities
[Detailed entity definitions]

## Site Structure
[Page hierarchy and navigation]

## Page Content
[Detailed content for each page]

## FAQ Content
[All FAQ questions and answers]

## Lexikon (Glossary)
[All glossary terms and definitions]

## Articles & Ratgeber
[Article content]

## Services & Features
[Service descriptions]

## Legal & Compliance
[Legal information]

## Contact & Organization
[Contact details and organizational information]
```

### 2. Paragraph Structure for Context Chunking

**CRITICAL**: Each paragraph must contain **exactly one idea** and be self-contained.

**✅ CORRECT - Single Idea Per Paragraph:**

```
The Hausverwaltung (property management) service handles all administrative tasks for residential properties. This includes managing tenant relationships, coordinating maintenance work, and ensuring compliance with local regulations. Property managers act as intermediaries between property owners and tenants, handling rent collection, utility bill distribution, and property inspections.

The Nebenkostenabrechnung (utility cost statement) is prepared annually by the property management company. This document breaks down all operating costs for the property, including heating, water, garbage collection, and building insurance. Each tenant receives a detailed statement showing their proportional share of these costs based on their apartment size or consumption.

The Eigentümerversammlung (owners' meeting) is held at least once per year to discuss property matters. During these meetings, property owners vote on important decisions such as major renovations, budget approvals, and selection of service providers. The property management company organizes these meetings, prepares the agenda, and documents all resolutions.
```

**❌ WRONG - Multiple Ideas in One Paragraph:**

```
The Hausverwaltung handles administrative tasks, prepares the Nebenkostenabrechnung annually, and organizes the Eigentümerversammlung where owners vote on renovations and budgets. Property managers also coordinate maintenance work and ensure regulatory compliance.
```

### 3. Entity Definitions (Grounding Page Core)

Entity definitions are the foundation of the Grounding Page approach. Clearly define and describe all entities in a dedicated section using stable, factual language. Each entity should have:

- **Name**: Clear entity identifier
- **Type**: Category (Service, Concept, Person, Organization, Document, Location, Role, Tool, etc.)
- **Description**: Comprehensive, stable definition in 2-4 sentences using factual language
- **Relationships**: How it relates to other entities (disambiguation rules)
- **Context**: Where it appears on the website (citable structure)

**Critical Requirements for Entity Definitions:**

- Use factual, objective language - avoid marketing claims
- Provide stable definitions that won't change frequently
- Include disambiguation information when entities could be confused
- Document relationships clearly for AI system understanding
- Make definitions citable and verifiable

**Example Entity Definition:**

```
ENTITY: Hausverwaltung (Property Management)
TYPE: Service
DESCRIPTION: Professional property management service for residential and commercial properties. The service includes administrative tasks such as rent collection, utility cost accounting, maintenance coordination, and legal compliance. Property managers act as intermediaries between property owners, tenants, and service providers. The service is available for properties in Hannover and surrounding areas.

RELATIONSHIPS:
- Provides Nebenkostenabrechnung (utility cost statements)
- Organizes Eigentümerversammlung (owners' meetings)
- Coordinates with Hausmeister (building caretakers)
- Works with Eigentümergemeinschaft (property owners' association)

CONTEXT: Featured on home page, services page, and FAQ sections. Detailed information available in Lexikon entries.
```

**Entity Classes to Consider:**
The Grounding Page Standard recognizes 16 entity classes. When identifying entities, consider all relevant types:

- Services
- Concepts
- Documents
- Roles/People
- Organizations
- Locations
- Tools/Calculators
- Legal entities
- Financial entities
- Operational entities
- And other relevant categories

### 4. Content Extraction

Extract content from the following sources:

#### A. Site Configuration

- Site name, description, domain
- Contact information (email, phone, address)
- Social media links
- Programmatic instances (cities, regions)

#### B. Subpage Content

- For each page in `src/data/{siteId}/subpages/*.ts`:
  - Page title and description
  - All component content (Hero, TextImageSection, Steps, etc.)
  - Extract text from all text fields
  - Extract structured data information
  - Note component types and their purposes

#### C. FAQ Content

- For each FAQ file in `src/data/{siteId}/json/faq/*.json`:
  - Extract all questions and answers
  - Note FAQ groups/categories
  - Each Q&A pair should be a separate paragraph

#### D. Lexikon Content

- For each Lexikon file in `src/data/{siteId}/json/lexikon/*.json`:
  - Extract all terms and definitions
  - Each term-definition pair should be a separate paragraph
  - Note relationships between terms

#### E. Article Content

- For each article in `src/data/{siteId}/articles/*.md`:
  - Extract article title, author, date
  - Extract main content paragraphs
  - Preserve markdown structure but convert to plain text paragraphs

#### F. Component Content

- Extract content from all component types:
  - Hero sections (titles, subtitles, descriptions, CTAs)
  - TextImageSection (text content, image descriptions)
  - Steps (process descriptions)
  - USPs (unique selling points)
  - Services (service descriptions)
  - References (testimonials, reviews)
  - LegalSection (legal information)
  - TaxTopicSection (tax-related content)

### 5. Content Organization

Organize content in the following order:

1. **Site Overview** (1-3 paragraphs)
   - Site purpose and mission
   - Target audience
   - Main value proposition

2. **Core Entities** (dedicated section)
   - List all major entities with definitions
   - Group related entities together
   - Use clear entity markers (ENTITY: ...)

3. **Site Structure** (1-2 paragraphs per page)
   - Page hierarchy
   - Navigation structure
   - Programmatic page patterns

4. **Page Content** (organized by page)
   - Home page content
   - Service pages
   - Information pages
   - Legal pages
   - Contact pages

5. **FAQ Content** (organized by category)
   - Group FAQs by topic
   - Each Q&A as separate paragraph

6. **Lexikon** (alphabetical or by category)
   - Each term-definition as separate paragraph

7. **Articles** (chronological or by topic)
   - Article summaries and key content

8. **Services & Features** (detailed descriptions)
   - Each service as separate section

9. **Legal & Compliance**
   - Legal information
   - Privacy policy highlights
   - Terms of service highlights

10. **Contact & Organization**
    - Contact details
    - Office locations
    - Team information (if available)

### 6. Writing Guidelines (Grounding Page Standards)

#### Content Type: Stable Facts Only

**✅ Include:**

- Factual descriptions of services, concepts, and entities
- Stable definitions that won't change frequently
- Objective information about what something is and how it works
- Clear disambiguation when terms could be confused
- Verifiable, citable information

**❌ Exclude:**

- Marketing claims or promotional language
- Subjective interpretations or opinions
- Dynamic or live data (prices, availability, etc.)
- Regulated advice (legal, financial, medical)
- SEO-optimized keyword stuffing

#### Paragraph Length

- **Optimal**: 3-5 sentences per paragraph
- **Maximum**: 7 sentences per paragraph
- **Minimum**: 2 sentences per paragraph (for simple definitions)

#### Sentence Structure

- Use clear, declarative sentences
- Avoid complex nested clauses
- One main idea per sentence
- Use active voice when possible
- Prefer factual statements over persuasive language

#### Terminology

- Use German terms with English translations in parentheses on first use
- Example: "Hausverwaltung (property management)"
- After first use, either term is acceptable
- Maintain consistency throughout the document
- Include disambiguation when terms have multiple meanings

#### Context Preservation

- Each paragraph should be understandable without reading previous paragraphs
- Include necessary context within each paragraph
- Reference entities by their full names when first mentioned in a section
- Provide stable, self-contained definitions

#### Formatting

- Use clear section headers with `##` or `###`
- Use bullet points for lists
- Use bold for emphasis on key terms
- Use line breaks between paragraphs
- Structure content for easy AI parsing and retrieval

### 7. Entity Extraction Process

1. **Identify Entities**:
   - Services (Hausverwaltung, Mietverwaltung, etc.)
   - Concepts (Nebenkostenabrechnung, Eigentümerversammlung, etc.)
   - Documents (Energieausweis, Abrechnung, etc.)
   - Roles (Hausverwalter, Eigentümer, Mieter, etc.)
   - Organizations (Eigentümergemeinschaft, etc.)
   - Locations (cities, districts, regions)
   - Tools/Calculators (AFA-Rechner, etc.)

2. **Define Each Entity**:
   - What it is
   - What it does
   - Who uses it
   - When it's relevant
   - How it relates to other entities

3. **Group Related Entities**:
   - Financial entities (costs, payments, accounting)
   - Legal entities (contracts, regulations, compliance)
   - Operational entities (maintenance, management, services)
   - Organizational entities (meetings, associations, roles)

### 8. Implementation Steps

Following the Grounding Page Standard three-step approach:

**Step 1: Identify Entities**

- Identify entities that need stable definitions
- Consider all 16 entity classes (Services, Concepts, Documents, Roles, Organizations, Locations, Tools, etc.)
- Focus on entities that are core to the brand and require clear AI interpretation

**Step 2: Create Grounding Page Content**

- Extract and structure content using the standard format
- Create stable, factual definitions
- Ensure machine-readable structure

**Step 3: Establish as Authoritative Source**

- Place file in `public/llm.txt` for easy AI system access
- Ensure proper formatting and structure
- The file serves as the authoritative grounding source

#### Detailed Technical Steps

1. **Load Site Configuration**:

   ```typescript
   import { getCurrentSite, getSiteStructure } from "@/lib/config";
   const currentSite = getCurrentSite();
   const siteStructure = getSiteStructure();
   ```

2. **Extract All Pages**:
   - Iterate through `siteStructure.pages`
   - Load content from subpage files
   - Extract all component content
   - Focus on factual content, exclude marketing claims

3. **Extract FAQ Content**:
   - Load all FAQ JSON files
   - Extract questions and answers
   - Group by category
   - Ensure answers are factual and stable

4. **Extract Lexikon Content**:
   - Load Lexikon JSON files
   - Extract terms and definitions
   - Identify relationships
   - These are ideal for entity definitions

5. **Extract Article Content**:
   - Load Markdown files
   - Parse content
   - Extract key information
   - Focus on factual content, exclude opinions

6. **Identify Entities** (Grounding Page Core):
   - Scan all content for key terms
   - Create stable entity definitions
   - Map relationships for disambiguation
   - Ensure definitions are factual and verifiable

7. **Structure Content**:
   - Organize by sections following Grounding Page structure
   - Create single-idea paragraphs
   - Add entity definitions with clear markers
   - Ensure citable structure

8. **Write File**:
   - Generate `llm.txt` in `public/` directory
   - Ensure UTF-8 encoding
   - Format with clear sections
   - Verify compliance with Grounding Page Standard principles

### 9. Quality Checklist

Before finalizing, verify:

#### Grounding Page Standard Compliance

- [ ] Content focuses on stable, machine-readable facts
- [ ] Marketing claims and subjective interpretations are excluded
- [ ] Dynamic or live data is excluded
- [ ] Entity definitions are stable and factual
- [ ] Disambiguation rules are provided where needed
- [ ] Content structure is citable and verifiable
- [ ] File is optimized for RAG systems and Grounding APIs

#### Content Quality

- [ ] Each paragraph contains exactly one idea
- [ ] All paragraphs are self-contained and understandable in isolation
- [ ] All major entities are defined in the Core Entities section
- [ ] Entity relationships are clearly documented
- [ ] All page content is included (factual content only)
- [ ] All FAQ questions and answers are included
- [ ] All Lexikon terms are included
- [ ] Article content is summarized or included (factual content)
- [ ] Contact information is accurate
- [ ] No duplicate content across paragraphs
- [ ] Terminology is consistent
- [ ] German terms have English translations on first use
- [ ] Paragraphs are properly separated with line breaks
- [ ] Section headers are clear and descriptive
- [ ] Content is organized logically
- [ ] File is readable and well-formatted

### 10. Example Output Structure

```
# Website: Immobilien Hannover
# Domain: immobilien-hannover.online
# Generated: 2024-01-15

## Site Overview

Immobilien Hannover provides professional property management services for residential and commercial properties in the Hannover region. The website serves property owners, property management companies, and tenants seeking information about property management, legal requirements, and best practices.

The site offers comprehensive resources including detailed FAQ sections, a glossary of property management terms, and practical guides for property owners. Content is organized into clear sections covering services, legal information, tax topics, and general property management advice.

## Core Entities

ENTITY: Hausverwaltung (Property Management)
TYPE: Service
DESCRIPTION: Professional service for managing residential and commercial properties. Property managers handle administrative tasks, coordinate maintenance, manage tenant relationships, and ensure legal compliance. Services are available for properties throughout Hannover and surrounding areas.

[... more entities ...]

## Site Structure

The website consists of a home page, service pages, information pages, and legal pages. The home page introduces the property management services and provides an overview of available offerings.

The FAQ page contains frequently asked questions organized by topic categories including costs, responsibilities, legal matters, and technical questions. Each category groups related questions for easy navigation.

[... more structure information ...]

## Page Content

### Home Page

The home page features a hero section highlighting professional property management services in Hannover. The main value proposition emphasizes transparent administration, legally compliant accounting, and competent property care.

The hero section includes a call-to-action button directing visitors to contact the property management company. Additional sections showcase key services including utility cost accounting, property maintenance coordination, and legal support.

[... more page content ...]

## FAQ Content

### Costs & Prices

QUESTION: What does property management cost?
ANSWER: Property management costs vary by region and service scope. Typically, costs range between 20 and 30 euros per residential unit per month. Additional services such as legal support or extensive renovations can increase the price. Comparing multiple offers provides transparency.

QUESTION: What does property management cost per month?
ANSWER: Monthly costs depend on the number of residential units. Costs usually range between 20 and 40 euros per unit. Prices tend to be higher in larger cities. The agreed service scope is always the deciding factor.

[... more FAQs ...]

## Lexikon (Glossary)

Abrechnung (Accounting Statement): The accounting statement includes the annual presentation of income and expenses for a property. It is important for property owners and tenants to understand cost distribution. The statement must be formally correct and verifiable.

Nebenkostenabrechnung (Utility Cost Statement): Annual statement showing utility costs allocated to tenants. It must be transparent and created according to legal requirements. The statement breaks down costs for heating, water, garbage collection, and building insurance.

[... more terms ...]

## Articles & Ratgeber

[Article content ...]

## Services & Features

[Service descriptions ...]

## Legal & Compliance

[Legal information ...]

## Contact & Organization

[Contact details ...]
```

---

## Completion Criteria

The task is complete when:

### Grounding Page Standard Compliance

1. ✅ Content follows Grounding Page Standard v1.4 principles
2. ✅ Stable, machine-readable facts are provided
3. ✅ Marketing claims and subjective content are excluded
4. ✅ Entity definitions are factual and verifiable
5. ✅ Disambiguation rules are included where needed
6. ✅ Content is optimized for RAG systems and Grounding APIs

### Content Completeness

7. ✅ `public/llm.txt` file exists
8. ✅ All site content is comprehensively documented (factual content)
9. ✅ All entities are clearly defined in Core Entities section
10. ✅ Each paragraph contains exactly one idea
11. ✅ All paragraphs are self-contained
12. ✅ Content is organized logically
13. ✅ FAQ content is included
14. ✅ Lexikon content is included
15. ✅ Article content is included (factual content)
16. ✅ Entity relationships are documented
17. ✅ File is well-formatted and readable
18. ✅ Terminology is consistent
19. ✅ German terms have English translations

---

## Notes

### Grounding Page Standard Compliance

- The `llm.txt` file serves as a Grounding Page following Standard v1.4
- It provides stable, machine-readable facts for AI systems (RAG, Grounding APIs)
- Focus on factual content rather than marketing language
- Create a stable semantic anchor that improves AI interpretation accuracy
- Address AI hallucinations by providing clear, verifiable entity definitions
- Function as brand-owned data that AI systems can reliably retrieve

### Content Guidelines

- The file should be comprehensive but not redundant
- Preserve important technical terms and their definitions
- Ensure content is accurate and up-to-date
- Use stable definitions that won't require frequent updates
- The file may be large; ensure proper formatting for readability
- Consider splitting into sections if file becomes very large (>100KB)
- Update the file when content changes significantly, but maintain stability of core entity definitions

### AI System Optimization

- Optimize for RAG systems and Grounding APIs (Gemini, Perplexity, Claude, Qwen)
- Structure content for reliable retrieval and interpretation
- Provide clear disambiguation rules for entities
- Create citable, verifiable fact structures
- Ensure each paragraph can be understood in isolation for better chunking
