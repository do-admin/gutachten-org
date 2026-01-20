# HTML Grounding Page Generation Prompt

## Overview

This prompt guides the creation of a single, comprehensive HTML grounding page that documents all website content, entities, and structure in a structured HTML format optimized for LLM context chunking and AI system grounding. The HTML page should follow the **Grounding Page Standard v1.4** principles, providing stable, machine-readable facts that AI systems can reliably interpret.

**CRITICAL**: This is a **single grounding page per repository** that contains **all** information from the `llm.txt` file. It is not page-specific but rather a comprehensive repository-wide grounding document.

Each paragraph should contain a single, self-contained idea to maximize retrieval effectiveness and semantic stability in RAG systems and Grounding APIs (Gemini, Perplexity, Claude, Qwen, etc.).

**CRITICAL**: The resulting HTML page must be **completely in German**. This includes:

- All UI text, labels, and headings
- All section titles and metadata
- All status messages and warnings
- All structural elements (headings, labels, etc.)

The content from `llm.txt` is already in German, but all HTML structure elements, labels, and UI text must also be in German. Use semantic HTML5 elements for optimal SEO and accessibility.

---

## Grounding Page Standard Alignment

The HTML grounding page serves as a **Grounding Page** - a stable foundation of machine-readable facts for AI systems. This aligns with the Grounding Page Standard v1.4 (published November 20, 2025, updated December 14, 2025).

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

The HTML grounding page creates a stable semantic anchor that:

- Improves interpretation in ChatGPT, Google AI Search, Perplexity, and other LLMs
- Addresses AI hallucinations and missing facts
- Provides stable entity interpretation
- Serves as brand-owned data for AI systems
- Functions as a machine-readable API for AI retrieval
- Is accessible via standard web browsers and crawlers
- Provides semantic HTML structure for better parsing

---

## Task

Create a single, comprehensive HTML grounding page for the entire repository that documents all website content, entities, and structure in clearly structured HTML optimized for context chunking and AI grounding. The HTML should provide stable, factual definitions that AI systems can reliably retrieve and interpret in German language.

**IMPORTANT**: This is a **single page per repository**, not per individual page. It should contain **all** information from the `llm.txt` file as specified in the LLM_TXT_GENERATION_PROMPT.md.

The HTML page should be generated as a Next.js page component that can be server-side rendered and placed at a route like `/grounding` (single route for the entire repository).

---

## Context

- **Framework**: Next.js with App Router and static HTML rendering
- **Content Structure**: Block-based architecture with reusable components
- **Standard**: Grounding Page Standard v1.4 (stable, machine-readable facts for AI systems)
- **Target Systems**: RAG systems, Grounding APIs (Gemini, Perplexity, Claude, Qwen, ChatGPT, Google AI Search), web crawlers
- **Primary Content Source**: The `llm.txt` file located in the `public/` directory
  - **CRITICAL**: All content for the HTML grounding page must be derived from `public/llm.txt`
  - If `llm.txt` does not exist, the HTML page must clearly indicate this
  - The `llm.txt` file contains comprehensive site-wide grounding information
  - **IMPORTANT**: Include **ALL** content from `llm.txt` - do not filter or extract page-specific content. This is a comprehensive repository-wide grounding page.
- **Additional Sources** (for site metadata only):
  - Site configuration (`src/data/multi-page-config.json`) for site name, domain, etc.

---

## Requirements

### 1. HTML Structure

The HTML grounding page should follow this semantic structure:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grounding Page: [Site Name]</title>
    <meta
      name="description"
      content="Comprehensive grounding information for [Site Name] - machine-readable facts for AI systems"
    />
    <link rel="canonical" href="[Site URL]/grounding" />
  </head>
  <body>
    <main>
      <article>
        <header>
          <h1>Grounding-Informationen: [Site Name]</h1>
          <p>Erstellt am: [Date]</p>
          <p>Website-URL: <a href="[Site URL]">[Site URL]</a></p>
        </header>

        <section id="llm-txt-status">
          <h2>Quelleninformationen</h2>
          <p>
            Diese Grounding-Seite basiert auf der <code>llm.txt</code>-Datei im
            Verzeichnis <code>public/</code>.
          </p>
          <p id="llm-txt-status-message">
            [Status: llm.txt-Datei gefunden und verarbeitet]
          </p>
          <!-- If llm.txt doesn't exist, show: -->
          <!-- <p id="llm-txt-status-message" class="warning">⚠️ WARNUNG: Die llm.txt-Datei wurde im public/-Verzeichnis nicht gefunden. Diese Grounding-Seite kann ohne die Quelldatei nicht erstellt werden. Bitte generiere zuerst die llm.txt-Datei mit dem LLM_TXT_GENERATION_PROMPT.</p> -->
        </section>

        <section id="site-overview">
          <h2>Website-Übersicht</h2>
          [Komplette Website-Übersicht aus llm.txt - alle Absätze]
        </section>

        <section id="core-entities">
          <h2>Kern-Entitäten</h2>
          [ALLE Entitätsdefinitionen aus llm.txt - vollständiger Core
          Entities-Bereich]
        </section>

        <section id="site-structure">
          <h2>Website-Struktur</h2>
          [Vollständige Website-Strukturinformationen aus llm.txt]
        </section>

        <section id="page-content">
          <h2>Seiteninhalte</h2>
          [ALLE Seiteninhalte aus llm.txt - alle Seiten, alle Inhalte]
        </section>

        <section id="faq-content">
          <h2>FAQ-Inhalte</h2>
          [ALLE FAQ-Fragen und -Antworten aus llm.txt - vollständiger
          FAQ-Bereich]
        </section>

        <section id="lexikon">
          <h2>Lexikon (Glossar)</h2>
          [ALLE Glossarbegriffe und -definitionen aus llm.txt - vollständiger
          Lexikon-Bereich]
        </section>

        <section id="articles">
          <h2>Artikel & Ratgeber</h2>
          [ALLE Artikelinhalte aus llm.txt - vollständiger Artikel-Bereich]
        </section>

        <section id="services-features">
          <h2>Services & Features</h2>
          [ALLE Servicedeskriptionen aus llm.txt - vollständiger
          Services-Bereich]
        </section>

        <section id="legal-compliance">
          <h2>Rechtliches & Compliance</h2>
          [ALLE rechtlichen Informationen aus llm.txt - vollständiger
          Legal-Bereich]
        </section>

        <section id="contact-organization">
          <h2>Kontakt & Organisation</h2>
          [ALLE Kontaktdaten und Organisationsinformationen aus llm.txt]
        </section>
      </article>
    </main>
  </body>
</html>
```

### 2. Paragraph Structure for Context Chunking

**CRITICAL**: Each paragraph must contain **exactly one idea** and be self-contained. Use semantic HTML `<p>` tags for each paragraph.

**✅ CORRECT - Single Idea Per Paragraph:**

```html
<p>
  The Hausverwaltung (property management) service handles all administrative
  tasks for residential properties. This includes managing tenant relationships,
  coordinating maintenance work, and ensuring compliance with local regulations.
  Property managers act as intermediaries between property owners and tenants,
  handling rent collection, utility bill distribution, and property inspections.
</p>

<p>
  The Nebenkostenabrechnung (utility cost statement) is prepared annually by the
  property management company. This document breaks down all operating costs for
  the property, including heating, water, garbage collection, and building
  insurance. Each tenant receives a detailed statement showing their
  proportional share of these costs based on their apartment size or
  consumption.
</p>
```

**❌ WRONG - Multiple Ideas in One Paragraph:**

```html
<p>
  The Hausverwaltung handles administrative tasks, prepares the
  Nebenkostenabrechnung annually, and organizes the Eigentümerversammlung where
  owners vote on renovations and budgets. Property managers also coordinate
  maintenance work and ensure regulatory compliance.
</p>
```

### 3. Entity Definitions (Grounding Page Core)

Entity definitions are the foundation of the Grounding Page approach. Clearly define and describe all entities relevant to this page in a dedicated section using stable, factual language. Each entity should be wrapped in semantic HTML with proper structure.

**HTML Structure for Entity Definitions:**

```html
<section id="core-entities">
  <h2>Core Entities</h2>

  <article class="entity">
    <h3>Hausverwaltung (Property Management)</h3>
    <dl>
      <dt>Type</dt>
      <dd>Service</dd>

      <dt>Description</dt>
      <dd>
        <p>
          Professional property management service for residential and
          commercial properties. The service includes administrative tasks such
          as rent collection, utility cost accounting, maintenance coordination,
          and legal compliance. Property managers act as intermediaries between
          property owners, tenants, and service providers. The service is
          available for properties in Hannover and surrounding areas.
        </p>
      </dd>

      <dt>Relationships</dt>
      <dd>
        <ul>
          <li>Provides Nebenkostenabrechnung (utility cost statements)</li>
          <li>Organizes Eigentümerversammlung (owners' meetings)</li>
          <li>Coordinates with Hausmeister (building caretakers)</li>
          <li>
            Works with Eigentümergemeinschaft (property owners' association)
          </li>
        </ul>
      </dd>

      <dt>Context</dt>
      <dd>
        Featured on this page in the hero section and services overview.
        Detailed information available in related Lexikon entries.
      </dd>
    </dl>
  </article>
</section>
```

**Critical Requirements for Entity Definitions:**

- Use semantic HTML (`<article>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<li>`)
- Use factual, objective language - avoid marketing claims
- Provide stable definitions that won't change frequently
- Include disambiguation information when entities could be confused
- Document relationships clearly for AI system understanding
- Make definitions citable and verifiable
- Use proper heading hierarchy (H2 for section, H3 for each entity)

**Entity Classes to Consider:**
The Grounding Page Standard recognizes 16 entity classes. When identifying entities for this page, consider all relevant types:

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

### 4. Content Extraction (Complete from llm.txt)

**CRITICAL**: All content must be extracted from `public/llm.txt`. If the file does not exist, the HTML page must clearly indicate this.

**IMPORTANT**: This is a **comprehensive repository-wide grounding page**. Include **ALL** content from `llm.txt` - do not filter or extract page-specific content.

#### A. Check for llm.txt File

1. **First, check if `public/llm.txt` exists**:

   ```typescript
   import fs from "fs";
   import path from "path";

   const llmTxtPath = path.join(process.cwd(), "public", "llm.txt");
   const llmTxtExists = fs.existsSync(llmTxtPath);
   ```

2. **If `llm.txt` does NOT exist**:
   - Display a clear warning message in the HTML page
   - Include instructions to generate `llm.txt` first using the `LLM_TXT_GENERATION_PROMPT`
   - Do not attempt to generate content from other sources
   - Example HTML:
     ```html
     <section id="llm-txt-status">
       <h2>Source Information</h2>
       <p class="warning">
         ⚠️ WARNING: The llm.txt file was not found in the public/ directory.
       </p>
       <p>
         This grounding page cannot be generated without the source file. Please
         generate llm.txt first using the LLM_TXT_GENERATION_PROMPT located at
         <code>data/prompts/LLM_TXT_GENERATION_PROMPT.md</code>.
       </p>
     </section>
     ```

3. **If `llm.txt` exists**:
   - Read the file content
   - Extract **ALL** sections from `llm.txt` (no filtering)
   - Include complete content from all sections

#### B. Extract ALL Content from llm.txt

The `llm.txt` file is structured with sections. Extract **ALL** content from each section:

1. **Site Overview** (from llm.txt):
   - Extract the complete "Site Overview" section
   - Include all paragraphs from this section

2. **Core Entities** (from llm.txt):
   - Extract **ALL** entity definitions from the "Core Entities" section
   - Include every entity definition - do not filter
   - Preserve entity structure (ENTITY:, TYPE:, DESCRIPTION:, RELATIONSHIPS:, CONTEXT:)

3. **Site Structure** (from llm.txt):
   - Extract the complete "Site Structure" section
   - Include all paragraphs about page hierarchy and navigation

4. **Page Content** (from llm.txt):
   - Extract **ALL** page content from the "Page Content" section
   - Include content for **ALL** pages (not just one page)
   - Preserve page subsections (### Page Name)
   - Include all paragraphs for each page

5. **FAQ Content** (from llm.txt):
   - Extract **ALL** FAQs from the "FAQ Content" section
   - Include every question and answer - do not filter
   - Preserve FAQ categories if present

6. **Lexikon Terms** (from llm.txt):
   - Extract **ALL** terms from the "Lexikon (Glossary)" section
   - Include every term and definition - do not filter
   - Preserve term structure

7. **Articles** (from llm.txt):
   - Extract **ALL** articles from the "Articles & Ratgeber" section
   - Include every article - do not filter
   - Preserve article structure

8. **Services & Features** (from llm.txt):
   - Extract the complete "Services & Features" section
   - Include all service descriptions

9. **Legal & Compliance** (from llm.txt):
   - Extract the complete "Legal & Compliance" section
   - Include all legal information

10. **Contact & Organization** (from llm.txt):
    - Extract the complete "Contact & Organization" section
    - Include all contact details and organizational information

#### C. No Content Filtering

**CRITICAL**: This is a comprehensive repository-wide grounding page. Do **NOT** filter content:

- Include **ALL** entities (not just page-specific ones)
- Include **ALL** page content (not just one page)
- Include **ALL** FAQs (not just relevant ones)
- Include **ALL** Lexikon terms (not just mentioned ones)
- Include **ALL** articles (not just related ones)
- Include **ALL** sections from `llm.txt`

### 5. Content Organization

Organize content in the following order within semantic HTML sections, matching the structure from `llm.txt`:

1. **Site Overview** (`<section id="site-overview">`)
   - Complete site overview from llm.txt
   - All paragraphs from the Site Overview section
   - Site purpose, mission, target audience, value proposition

2. **Core Entities** (dedicated `<section id="core-entities">`)
   - **ALL** entity definitions from llm.txt
   - Every entity in the Core Entities section
   - Group related entities together
   - Use semantic HTML structure (`<article>`, `<dl>`, etc.)

3. **Site Structure** (`<section id="site-structure">`)
   - Complete site structure information from llm.txt
   - Page hierarchy and navigation
   - All paragraphs from the Site Structure section

4. **Page Content** (detailed `<section id="page-content">`)
   - **ALL** page content from llm.txt
   - Content for **ALL** pages (not just one page)
   - Organized by page (preserve ### Page Name subsections)
   - Each page's content as separate paragraphs

5. **FAQ Content** (`<section id="faq-content">`)
   - **ALL** FAQs from llm.txt
   - Every question and answer
   - Group FAQs by category if present in llm.txt
   - Each Q&A as separate paragraph with semantic structure

6. **Lexikon** (`<section id="lexikon">`)
   - **ALL** glossary terms from llm.txt
   - Every term and definition
   - Each term-definition as separate paragraph
   - Use semantic HTML (`<dl>` for definitions)

7. **Articles & Ratgeber** (`<section id="articles">`)
   - **ALL** articles from llm.txt
   - Every article in the Articles section
   - Article summaries and key content

8. **Services & Features** (`<section id="services-features">`)
   - Complete Services & Features section from llm.txt
   - All service descriptions

9. **Legal & Compliance** (`<section id="legal-compliance">`)
   - Complete Legal & Compliance section from llm.txt
   - All legal information

10. **Contact & Organization** (`<section id="contact-organization">`)
    - Complete Contact & Organization section from llm.txt
    - All contact details and organizational information

### 6. HTML Writing Guidelines (Grounding Page Standards)

#### Semantic HTML Requirements

- Use semantic HTML5 elements: `<main>`, `<article>`, `<section>`, `<header>`, `<nav>`, `<aside>`, `<footer>`
- Use proper heading hierarchy: H1 → H2 → H3 → H4
- Use `<p>` tags for paragraphs (one idea per paragraph)
- Use `<dl>`, `<dt>`, `<dd>` for definitions
- Use `<ul>` and `<ol>` for lists
- Use `<strong>` for emphasis (not `<b>`)
- Use `<em>` for emphasis (not `<i>`)
- Include proper `id` attributes on sections for linking
- Include `lang="de"` on the `<html>` tag

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

- Use semantic HTML structure
- Use proper heading hierarchy
- Use line breaks between paragraphs (separate `<p>` tags)
- Structure content for easy AI parsing and retrieval
- Include proper indentation for readability

### 7. Entity Extraction Process (Complete)

1. **Extract ALL Entities from llm.txt**:
   - Extract **ALL** entities from the Core Entities section
   - Do not filter - include every entity definition
   - Preserve entity structure (ENTITY:, TYPE:, DESCRIPTION:, RELATIONSHIPS:, CONTEXT:)

2. **Preserve Entity Definitions**:
   - Keep entity definitions exactly as they appear in llm.txt
   - Maintain entity relationships
   - Preserve context information

3. **Group Related Entities** (optional, for better organization):
   - Financial entities (costs, payments, accounting)
   - Legal entities (contracts, regulations, compliance)
   - Operational entities (maintenance, management, services)
   - Organizational entities (meetings, associations, roles)
   - Note: Grouping is optional - preserving llm.txt structure is more important

### 8. Implementation Steps

Following the Grounding Page Standard three-step approach:

**Step 1: Extract ALL Entities from llm.txt**

- Extract **ALL** entities from the Core Entities section in llm.txt
- Do not filter - include every entity definition
- Preserve entity structure and relationships

**Step 2: Create Comprehensive Grounding Page Content**

- Extract and structure **ALL** content from llm.txt using HTML format
- Include every section from llm.txt (Site Overview, Core Entities, Site Structure, Page Content, FAQ Content, Lexikon, Articles, Services, Legal, Contact)
- Ensure machine-readable HTML structure
- Use semantic HTML5 elements
- Preserve paragraph structure from llm.txt (one idea per paragraph)

**Step 3: Establish as Authoritative Source**

- Generate HTML page as a Next.js page component
- Place at route `/grounding` (single route for the entire repository)
- Ensure proper HTML formatting and structure
- The page serves as the authoritative grounding source for the entire repository

#### Detailed Technical Steps

1. **Check for llm.txt File**:

   ```typescript
   import fs from "fs";
   import path from "path";

   const llmTxtPath = path.join(process.cwd(), "public", "llm.txt");
   const llmTxtExists = fs.existsSync(llmTxtPath);

   if (!llmTxtExists) {
     // Return HTML with warning message
     // Do not proceed with content extraction
   }
   ```

2. **Load Site Configuration** (for metadata only):

   ```typescript
   import { getCurrentSite } from "@/lib/config";
   import multiPageConfig from "@/data/multi-page-config.json";

   const currentSite = getCurrentSite();
   const siteConfig = multiPageConfig.sites[0];
   // Use only for site name, domain - not for content extraction
   ```

3. **Read and Parse llm.txt**:

   ```typescript
   import fs from "fs";
   import path from "path";

   const llmTxtPath = path.join(process.cwd(), "public", "llm.txt");
   const llmTxtContent = fs.readFileSync(llmTxtPath, "utf-8");

   // Parse llm.txt structure
   // Split by markdown headers (##, ###)
   // Identify sections: Site Overview, Core Entities, Site Structure, Page Content, FAQ Content, etc.
   ```

4. **Extract ALL Content from llm.txt**:
   - Parse `llm.txt` markdown structure
   - Extract **ALL** content from each section (do not filter):
     - Site Overview: Extract all paragraphs
     - Core Entities: Extract **ALL** entity definitions
     - Site Structure: Extract all paragraphs
     - Page Content: Extract **ALL** pages (not just one)
     - FAQ Content: Extract **ALL** FAQs
     - Lexikon: Extract **ALL** terms
     - Articles: Extract **ALL** articles
     - Services & Features: Extract all content
     - Legal & Compliance: Extract all content
     - Contact & Organization: Extract all content

5. **Extract ALL Entities** (from llm.txt):
   - Extract **ALL** entity definitions from "Core Entities" section
   - Do not filter - include every entity
   - Preserve entity structure (ENTITY:, TYPE:, DESCRIPTION:, RELATIONSHIPS:, CONTEXT:)
   - Extract relationship information from all entity definitions

6. **Structure Content as HTML**:
   - Organize **ALL** extracted content by sections following Grounding Page structure
   - Convert markdown paragraphs to HTML `<p>` tags (one idea per paragraph)
   - Convert **ALL** entity definitions to semantic HTML structure (`<article>`, `<dl>`, etc.)
   - Convert **ALL** FAQ content to semantic HTML structure
   - Convert **ALL** Lexikon terms to semantic HTML (`<dl>` structure)
   - Convert **ALL** page content to HTML (preserve page subsections)
   - Ensure citable structure with proper IDs
   - Use proper heading hierarchy
   - Add "Source Information" section indicating llm.txt was used

7. **Create Next.js Page Component**:
   - Generate HTML as a Next.js page component
   - Place at `/grounding` (single route for entire repository)
   - Ensure server-side rendering
   - Include proper metadata
   - Include llm.txt status information
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
- [ ] HTML is optimized for RAG systems and Grounding APIs

#### HTML Quality

- [ ] Valid HTML5 structure
- [ ] Semantic HTML elements used correctly
- [ ] Proper heading hierarchy (H1 → H2 → H3 → H4)
- [ ] All sections have proper `id` attributes
- [ ] `lang="de"` attribute on `<html>` tag
- [ ] Proper meta tags in `<head>`
- [ ] Canonical URL included
- [ ] Accessible markup (proper use of ARIA where needed)

#### Content Quality

- [ ] llm.txt file was checked and status is displayed
- [ ] If llm.txt doesn't exist, warning message is clearly displayed
- [ ] All content is derived from llm.txt (not from other sources)
- [ ] **ALL** content from llm.txt is included (no filtering)
- [ ] Each paragraph contains exactly one idea
- [ ] All paragraphs are self-contained and understandable in isolation
- [ ] **ALL** entities from llm.txt are included in the Core Entities section
- [ ] Entity relationships are clearly documented
- [ ] **ALL** page content from llm.txt is included (all pages)
- [ ] **ALL** FAQ questions and answers from llm.txt are included
- [ ] **ALL** Lexikon terms from llm.txt are included
- [ ] **ALL** article content from llm.txt is included
- [ ] **ALL** sections from llm.txt are included (Site Overview, Site Structure, Services, Legal, Contact)
- [ ] No duplicate content across paragraphs
- [ ] Terminology is consistent with llm.txt
- [ ] German terms have English translations on first use
- [ ] Paragraphs are properly separated with `<p>` tags
- [ ] Section headers are clear and descriptive
- [ ] Content is organized logically matching llm.txt structure
- [ ] HTML is readable and well-formatted

#### SEO Best Practices

- [ ] Proper heading hierarchy
- [ ] Semantic HTML structure
- [ ] Meta description included
- [ ] Canonical URL set correctly
- [ ] Content is server-side rendered
- [ ] No unnecessary interactivity
- [ ] Proper use of semantic elements

### 10. Example Output Structure

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grounding-Seite: Immobilien Hannover</title>
    <meta
      name="description"
      content="Umfassende Grounding-Informationen für Immobilien Hannover - maschinenlesbare Fakten für KI-Systeme"
    />
    <link rel="canonical" href="https://immobilien-hannover.online/grounding" />
  </head>
  <body>
    <main>
      <article>
        <header>
          <h1>Grounding-Informationen: Immobilien Hannover</h1>
          <p>Erstellt am: 2024-01-15</p>
          <p>
            Website-URL:
            <a href="https://immobilien-hannover.online"
              >https://immobilien-hannover.online</a
            >
          </p>
        </header>

        <section id="llm-txt-status">
          <h2>Quelleninformationen</h2>
          <p>
            Diese Grounding-Seite basiert auf der <code>llm.txt</code>-Datei im
            Verzeichnis <code>public/</code>.
          </p>
          <p>Status: ✅ llm.txt-Datei gefunden und verarbeitet</p>
        </section>

        <section id="site-overview">
          <h2>Website-Übersicht</h2>
          <p>
            Immobilien Hannover bietet professionelle
            Hausverwaltungsdienstleistungen für Wohn- und Gewerbeimmobilien in
            der Region Hannover. Die Website richtet sich an Eigentümer,
            Hausverwaltungsunternehmen und Mieter, die Informationen über
            Hausverwaltung, rechtliche Anforderungen und Best Practices suchen.
          </p>
          <p>
            Die Website bietet umfassende Ressourcen einschließlich
            detaillierter FAQ-Bereiche, einem Glossar mit
            Hausverwaltungsbegriffen und praktischen Leitfäden für Eigentümer.
            Inhalte sind in klare Bereiche gegliedert, die Services, rechtliche
            Informationen, Steuerthemen und allgemeine Hausverwaltungsberatung
            abdecken.
          </p>
        </section>

        <section id="core-entities">
          <h2>Kern-Entitäten</h2>

          <article class="entity">
            <h3>Hausverwaltung (Property Management)</h3>
            <dl>
              <dt>Typ</dt>
              <dd>Service</dd>

              <dt>Beschreibung</dt>
              <dd>
                <p>
                  Professioneller Service zur Verwaltung von Wohn- und
                  Gewerbeimmobilien. Hausverwalter übernehmen administrative
                  Aufgaben, koordinieren Wartungsarbeiten, verwalten
                  Mietbeziehungen und gewährleisten rechtliche Compliance.
                  Services sind für Immobilien in ganz Hannover und Umgebung
                  verfügbar.
                </p>
              </dd>

              <dt>Beziehungen</dt>
              <dd>
                <ul>
                  <li>
                    Erstellt Nebenkostenabrechnung (Nebenkostenabrechnungen)
                  </li>
                  <li>
                    Organisiert Eigentümerversammlung (Eigentümerversammlungen)
                  </li>
                </ul>
              </dd>

              <dt>Kontext</dt>
              <dd>
                Erscheint auf der Startseite, Serviceseite und in FAQ-Bereichen.
                Detaillierte Informationen sind in Lexikon-Einträgen verfügbar.
              </dd>
            </dl>
          </article>

          <!-- ALLE anderen Entitäten aus llm.txt würden hier eingefügt -->
        </section>

        <section id="site-structure">
          <h2>Website-Struktur</h2>
          <p>
            Die Website besteht aus einer Startseite, Serviceseiten,
            Informationsseiten und rechtlichen Seiten. Die Startseite stellt die
            Hausverwaltungsdienstleistungen vor und bietet einen Überblick über
            verfügbare Angebote.
          </p>
          <p>
            Die FAQ-Seite enthält häufig gestellte Fragen, die nach
            Themenkategorien organisiert sind, einschließlich Kosten,
            Verantwortlichkeiten, rechtlichen Angelegenheiten und technischen
            Fragen. Jede Kategorie gruppiert verwandte Fragen für einfache
            Navigation.
          </p>
        </section>

        <section id="page-content">
          <h2>Seiteninhalte</h2>

          <h3>Startseite</h3>
          <p>
            Die Startseite verfügt über einen Hero-Bereich, der professionelle
            Hausverwaltungsdienstleistungen in Hannover hervorhebt. Das
            Hauptversprechen betont transparente Verwaltung, rechtlich konforme
            Abrechnung und kompetente Immobilienpflege.
          </p>

          <h3>Hausverwaltung-Seite</h3>
          <p>
            Die Hausverwaltung-Seite bietet detaillierte Informationen über
            Hausverwaltungsdienstleistungen. Der Hero-Bereich hebt
            professionelle Hausverwaltungsdienstleistungen in Hannover hervor.
          </p>

          <!-- ALLE anderen Seiten aus llm.txt würden hier eingefügt -->
        </section>

        <section id="faq-content">
          <h2>FAQ-Inhalte</h2>

          <article class="faq-item">
            <h3>Was kostet Hausverwaltung?</h3>
            <p>
              Die Kosten für Hausverwaltung variieren je nach Region und
              Serviceumfang. Typischerweise liegen die Kosten zwischen 20 und 30
              Euro pro Wohneinheit pro Monat. Zusätzliche Services wie
              rechtliche Unterstützung oder umfangreiche Renovierungen können
              den Preis erhöhen. Der Vergleich mehrerer Angebote sorgt für
              Transparenz.
            </p>
          </article>

          <!-- ALLE anderen FAQs aus llm.txt würden hier eingefügt -->
        </section>

        <section id="lexikon">
          <h2>Lexikon (Glossar)</h2>

          <dl>
            <dt>Nebenkostenabrechnung (Utility Cost Statement)</dt>
            <dd>
              <p>
                Jährliche Abrechnung, die Nebenkosten den Mietern zuweist. Sie
                muss transparent sein und gemäß rechtlichen Anforderungen
                erstellt werden. Die Abrechnung gliedert Kosten für Heizung,
                Wasser, Müllabfuhr und Gebäudeversicherung auf.
              </p>
            </dd>

            <!-- ALLE anderen Lexikon-Begriffe aus llm.txt würden hier eingefügt -->
          </dl>
        </section>

        <section id="articles">
          <h2>Artikel & Ratgeber</h2>
          <!-- ALLE Artikel aus llm.txt würden hier eingefügt -->
        </section>

        <section id="services-features">
          <h2>Services & Features</h2>
          <!-- ALLE Services aus llm.txt würden hier eingefügt -->
        </section>

        <section id="legal-compliance">
          <h2>Rechtliches & Compliance</h2>
          <!-- ALLE rechtlichen Informationen aus llm.txt würden hier eingefügt -->
        </section>

        <section id="contact-organization">
          <h2>Kontakt & Organisation</h2>
          <!-- ALLE Kontaktdaten aus llm.txt würden hier eingefügt -->
        </section>
      </article>
    </main>
  </body>
</html>
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
6. ✅ HTML is optimized for RAG systems and Grounding APIs

### HTML Quality

7. ✅ Valid HTML5 structure with semantic elements
8. ✅ Proper heading hierarchy (H1 → H2 → H3 → H4)
9. ✅ All sections have proper `id` attributes
10. ✅ `lang="de"` attribute on `<html>` tag
11. ✅ Proper meta tags and canonical URL
12. ✅ Accessible markup

### Content Completeness

13. ✅ Next.js page component exists at `/grounding` (single route for entire repository)
14. ✅ llm.txt file was checked and status is displayed in HTML
15. ✅ If llm.txt doesn't exist, clear warning message is displayed
16. ✅ All content is derived from llm.txt (not from other sources)
17. ✅ **ALL** content from llm.txt is included (no filtering, comprehensive repository-wide page)
18. ✅ **ALL** page content is comprehensively documented (all pages from llm.txt)
19. ✅ **ALL** entities from llm.txt are clearly defined in Core Entities section
20. ✅ Each paragraph contains exactly one idea
21. ✅ All paragraphs are self-contained
22. ✅ Content is organized logically matching llm.txt structure
23. ✅ **ALL** FAQ content from llm.txt is included
24. ✅ **ALL** Lexikon content from llm.txt is included
25. ✅ **ALL** article content from llm.txt is included
26. ✅ **ALL** sections from llm.txt are included (Site Overview, Site Structure, Services, Legal, Contact)
27. ✅ Entity relationships are documented
28. ✅ HTML is well-formatted and readable
29. ✅ Terminology is consistent with llm.txt
30. ✅ German terms have English translations

---

## Notes

### Grounding Page Standard Compliance

- The HTML grounding page serves as a Grounding Page following Standard v1.4
- It provides stable, machine-readable facts for AI systems (RAG, Grounding APIs)
- Focus on factual content rather than marketing language
- Create a stable semantic anchor that improves AI interpretation accuracy
- Address AI hallucinations by providing clear, verifiable entity definitions
- Function as brand-owned data that AI systems can reliably retrieve
- HTML format allows for better semantic structure and web crawler accessibility

### Content Guidelines

- **CRITICAL**: All content must be derived from `public/llm.txt`
- If `llm.txt` doesn't exist, display a clear warning message
- **IMPORTANT**: This is a **comprehensive repository-wide grounding page** - include **ALL** content from `llm.txt`
- **DO NOT filter** `llm.txt` content - include everything
- Preserve important technical terms and their definitions from `llm.txt`
- Ensure content matches the structure and terminology used in `llm.txt`
- Use stable definitions from `llm.txt` that won't require frequent updates
- Update the page when `llm.txt` is regenerated, but maintain stability of core entity definitions
- Include **ALL** sections from `llm.txt` (Site Overview, Core Entities, Site Structure, Page Content, FAQ Content, Lexikon, Articles, Services, Legal, Contact)
- Do not extract content from source files directly - always use `llm.txt` as the source

### HTML Best Practices

- Use semantic HTML5 elements for better parsing and accessibility
- Ensure proper heading hierarchy for SEO
- Include proper meta tags for discoverability
- Use server-side rendering for optimal SEO
- Structure content for both human readers and AI systems
- Include proper IDs on sections for linking and citation

### AI System Optimization

- Optimize for RAG systems and Grounding APIs (Gemini, Perplexity, Claude, Qwen)
- Structure HTML for reliable retrieval and interpretation
- Provide clear disambiguation rules for entities
- Create citable, verifiable fact structures
- Ensure each paragraph can be understood in isolation for better chunking
- Semantic HTML structure improves parsing accuracy

### Next.js Implementation

- Create as a Next.js page component for server-side rendering
- Use a single route `/grounding` (not dynamic routes - this is a single repository-wide page)
- Ensure proper metadata generation
- Follow Next.js best practices for static generation
- Include proper error handling for missing llm.txt file
