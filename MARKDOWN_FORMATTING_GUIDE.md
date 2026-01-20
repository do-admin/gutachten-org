# Markdown Article Formatting Guide

This guide defines the formatting standards and conventions for creating markdown article files in this project. Follow these rules to ensure consistency and proper rendering.

## Table of Contents

1. [Frontmatter Structure](#frontmatter-structure)
2. [Headings and Spacing](#headings-and-spacing)
3. [Paragraph Formatting](#paragraph-formatting)
4. [Special Content Boxes](#special-content-boxes)
5. [Video Embedding](#video-embedding)
6. [Table Formatting](#table-formatting)
7. [Links](#links)
8. [Text Formatting](#text-formatting)
9. [Lists](#lists)
10. [Flowcharts](#flowcharts)
11. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## Frontmatter Structure

**REQUIRED**: Every markdown file MUST start with frontmatter in YAML format, enclosed by `---` delimiters.

### Required Fields

```yaml
---
title: "Article Title in Quotes"
slug: "url-friendly-slug"
meta-description: "SEO meta description (max 160 characters recommended)"
meta-keywords: "comma, separated, keywords, for, seo"
date-published: "DD.MM.YYYY"
date-written: "DD.MM.YYYY"
isFeatured: "true" or "false"
category: "Category Name"
author: "Author Full Name"
author-image: "author-image-filename.webp"
article-image: "article-image-filename.webp"
focus-keyphrase: "Main SEO Keyword"
---
```

### Field Guidelines

- **title**: Use title case, keep it descriptive and SEO-friendly
- **slug**: URL-friendly, lowercase, hyphens for spaces (e.g., `anleitung-baulastenauszug-nach-bundesland`)
- **meta-description**: Should be compelling and include the focus keyphrase
- **meta-keywords**: Comma-separated, relevant keywords
- **date-published**: Format: `DD.MM.YYYY` (e.g., `13.06.2025`)
- **date-written**: Format: `DD.MM.YYYY`
- **isFeatured**: String `"true"` or `"false"` (not boolean)
- **category**: Common values: `"Ratgeber"`, `"Immobilienbewertung"`, `"Immobiliengutachten"`
- **author**: Full name as string
- **author-image**: Filename only (e.g., `gerrit-kolweyh.webp`)
- **article-image**: Filename only (e.g., `anleitung-baulastenauszug-nach-bundesland.webp`)
- **focus-keyphrase**: Main SEO keyword for the article

### Example

```yaml
---
title: "Antragsstellung Baulastenauszug je nach Bundesland"
slug: "anleitung-baulastenauszug-nach-bundesland"
meta-description: "Ihr Antrag für einen Baulastenauszug je nach Bundesland -- eine Schritt-für-Schritt-Anleitung, Infos zu Behörden und Kostenüberblick."
meta-keywords: "baulastenauszug, baulastenverzeichnis, baulast beantragen, grundstück baulast, untere bauaufsichtsbehörde"
date-published: "13.06.2025"
date-written: "13.06.2025"
isFeatured: "false"
category: "Ratgeber"
author: "Gerrit Kolweyh"
author-image: "gerrit-kolweyh.webp"
article-image: "anleitung-baulastenauszug-nach-bundesland.webp"
focus-keyphrase: "Baulastenauszug"
---
```

---

## Headings and Spacing

### Heading Hierarchy

- **H1 (`# `)**: Main article title (appears in frontmatter, skip in body)
- **H2 (`## `)**: Major sections
- **H3 (`### `)**: Subsections
- **H4 (`#### `)**: Sub-subsections (use sparingly)

### Spacing Rules

1. **Before headings**: One blank line before all headings
2. **After headings**: One blank line after all headings
3. **Between sections**: One blank line between major sections
4. **No extra spacing**: Don't add multiple blank lines unnecessarily

### Examples

```markdown
## Major Section Title

Content starts here after one blank line.

### Subsection Title

More content here.
```

---

## Paragraph Formatting

### Key Rules

1. **Continuous text**: Write paragraphs as continuous text, NOT broken into multiple lines
2. **One paragraph per block**: Each paragraph should be a single continuous line
3. **Natural line breaks**: Only break lines for new paragraphs, lists, headings, or special blocks
4. **No hard breaks**: Don't add line breaks within a paragraph unless starting a new paragraph

### ✅ CORRECT

```markdown
Ein **Eigentümer** ist durch die Baubehörde **rechtlich verpflichtet**, sein Grundstück auf bestimmte Weise zu behandeln. Dabei geht es um verpflichtende Umsetzungen, aber auch Verbote, die eine faire Nutzung des Grundstücks ermöglichen sollen.
```

### ❌ INCORRECT

```markdown
Ein **Eigentümer** ist durch die Baubehörde **rechtlich verpflichtet**,
sein Grundstück auf bestimmte Weise zu behandeln. Dabei geht es um
verpflichtende Umsetzungen, aber auch Verbote, die eine faire Nutzung
des Grundstücks ermöglichen sollen.
```

---

## Special Content Boxes

Special content boxes use blockquote syntax with special character markers. These are rendered as styled callout boxes.

### Available Box Types

1. `[!SUMMARY]` - Summary/overview box
2. `[!TIP]` - Tips and helpful information
3. `[!FACT]` - Compact knowledge snippets
4. `[!HIGHLIGHT_BOX_WITH_IMAGE_AND_CTA]` - Highlight box with image and CTA button

### Format

```markdown
> [!TYPE]
>
> Content goes here. This can span multiple paragraphs.
>
> Additional paragraphs if needed.
```

### Examples

```markdown
> [!TIP]
>
> Sie zahlen für ein Gutachten, **weil Sie eine hochwertige, objektive und verwertbare Bewertung erhalten**, die vor Fehlentscheidungen schützt.
```

```markdown
> [!FACT]
>
> Für den geplanten Verkauf ist eine **kostenlose Maklerbewertung** ein guter erster Schritt. **Sobald jedoch Genauigkeit, Unparteilichkeit oder Rechtssicherheit gefragt sind, führt kein Weg am Gutachten vorbei.**
```

### Highlight Box with Image and CTA

The `[!HIGHLIGHT_BOX_WITH_IMAGE_AND_CTA]` box is a special promotional block that includes a title, description, feature list, CTA button, and an image.

#### Format

```markdown
> [!HIGHLIGHT_BOX_WITH_IMAGE_AND_CTA]
> title: Your Title Here
> description: Your description text here. Can include **bold** and [links](url).
> features:

> - First feature point
> - Second feature point
> - Third feature point
>   cta: Button Text
>   ctaUrl: /relative-path or https://external-url.com
>   image: /images/gutachten-org/highlight-boxes/your-image.webp
>   background-color: #78a09a (optional)
>   border-color: #78a09a (optional)
```

#### Example

```markdown
> [!HIGHLIGHT_BOX_WITH_IMAGE_AND_CTA]
> title: Verkehrswertgutachten
> description: Ein objektives Gutachten vom zertifizierten Gutachter: für Kauf, Verkauf oder Finanzierung – rechtssicher und marktgerecht
> features:

> - Sicherheit und Transparenz beim Immobilienwert
> - Anerkannt & rechtskonform bei Banken und Behörden
> - Schnell und digital verfügbar: inklusive unverbindlichem Angebot
>   cta: Unverbindlich anfragen
>   ctaUrl: /verkehrswertgutachten-anfrage/
>   image: /images/gutachten-org/highlight-boxes/verkehrswertgutachten.webp
```

#### Field Requirements

- **title** (required): The main heading of the highlight box
- **description** (required): Descriptive text explaining the offer/service
- **features** (required): List of feature points (use `-` for each item)
- **cta** (required): Text for the call-to-action button
- **ctaUrl** (required): URL for the CTA button (can be relative path or full URL)
- **image** (required): Path to the image file (should be in `/images/gutachten-org/highlight-boxes/`)
- **background-color** (optional): Hex color code for background (default: `#78a09a`)
- **border-color** (optional): Hex color code for border (default: `#78a09a`)

#### Notes

- Images should be placed in `/public/images/gutachten-org/highlight-boxes/`
- Use `.webp` format for optimal performance
- The CTA button automatically handles internal vs external links
- Feature list items can include markdown formatting (bold, links, etc.)

### Notes

- Always use `> [!TYPE]` format where TYPE is SUMMARY, TIP, FACT, or HIGHLIGHT_BOX_WITH_IMAGE_AND_CTA
- The marker `[!TYPE]` must be on the first line of the blockquote
- Content should be indented with `> ` on each line
- Can contain multiple paragraphs (for SUMMARY, TIP, FACT)
- Can include markdown formatting (bold, links, etc.)
- The actual text content (like "AUF EINEN BLICK", "GOOD TO KNOW", "WISSEN KOMPAKT") can appear in the content area - these are just regular text, not special markers

---

## Video Embedding

**EXCEPTION**: Videos are the ONLY HTML tags allowed in markdown files.

### Format

```markdown
<iframe title="Video Title" width="500" height="500" src="https://www.youtube.com/embed/VIDEO_ID?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
```

### Standard Attributes

- `title`: Descriptive title for accessibility
- `width="500"`: Standard width
- `height="500"`: Standard height
- `src`: YouTube embed URL with `?feature=oembed`
- `frameborder="0"`: No border
- `allow`: Standard permissions string
- `referrerpolicy="strict-origin-when-cross-origin"`: Security setting
- `allowfullscreen=""`: Allow fullscreen

### Example

```markdown
> <iframe title="📈🏡📉Hauswert bestimmen: Gutachter oder Makler?📈🏡📉" width="500" height="500" src="https://www.youtube.com/embed/R8YSODNK9lY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
```

### Placement

- Videos can be placed within special content boxes (with `> ` prefix)
- Videos can be standalone (without blockquote)
- Always add blank lines before and after video iframes

---

## Table Formatting

### Standard Markdown Table Syntax

```markdown
| Column 1 Header | Column 2 Header | Column 3 Header |
| --------------- | --------------- | --------------- |
| Row 1 Cell 1    | Row 1 Cell 2    | Row 1 Cell 3    |
| Row 2 Cell 1    | Row 2 Cell 2    | Row 2 Cell 3    |
```

### Rules

1. **Header row**: First row contains column headers
2. **Separator row**: Second row uses dashes (`---`) to separate header from data
3. **Alignment**: No alignment specified (defaults to left)
4. **Spacing**: One blank line before and after tables
5. **Cell content**: Can contain markdown (bold, links, etc.)

### Example

```markdown
| Bundesland        | Baulastenverzeichnis vorhanden? | Rechtsgrundlage (LBO §) |
| ----------------- | ------------------------------- | ----------------------- |
| Baden-Württemberg | Ja                              | § 71 ff. LBO BW         |
| Bayern            | Nein (Grundbuch)                | --                      |
| Berlin            | Ja                              | § 84 BauO Bln           |
```

### Notes

- Keep tables simple and readable
- Use consistent spacing in cells
- Don't use HTML table tags (use markdown only)

---

## Links

### Format

```markdown
[Link Text](URL)
```

### Rules

1. **External links**: Use full URLs starting with `https://`
2. **Internal links**: Use relative paths (e.g., `/ratgeber/article-slug`)
3. **Link text**: Should be descriptive and natural
4. **No HTML**: Don't use `<a>` tags

### Examples

```markdown
Erfahren Sie mehr in unserem [Artikel über Immobilienbewertung](https://www.gutachten.org/ratgeber/immobilienbewertung-verfahren-vergleichswert-ertragswert-sachwert/).

Weitere Informationen finden Sie auf [www.haus.de](http://www.haus.de/).
```

### In Lists

```markdown
- [www.haus.de](http://www.haus.de/)
- [de.wikipedia.org](https://de.wikipedia.org/wiki/Baulastenverzeichnis)
```

---

## Text Formatting

### Bold Text

```markdown
**This is bold text**
```

### Italic Text

```markdown
_This is italic text_
```

or

```markdown
_This is italic text_
```

### Combined Formatting

```markdown
**Bold text with _italic_ inside**
```

### Rules

- Use `**` for bold (double asterisks)
- Use `*` or `_` for italic (single asterisk or underscore)
- Don't mix markdown and HTML formatting
- No `<strong>`, `<em>`, `<b>`, or `<i>` tags

---

## Lists

### Unordered Lists

```markdown
- First item
- Second item
- Third item
```

### Nested Lists

```markdown
- Main item
  - Sub-item
  - Another sub-item
- Another main item
```

### List Rules

1. Use `-` (hyphen) for unordered lists
2. Indent nested items with 2 spaces
3. One blank line before lists
4. One blank line after lists
5. Can contain markdown formatting (bold, links, etc.)

### Example

```markdown
Um einen Antrag zu stellen, benötigen Sie:

- Ein **formloses Schreiben** oder das online bereitgestellte Formular.
- Angaben zum **Flurstück** (Adresse, Katasternummer).
- Nachweis eines **berechtigten Interesses** (z. B. Eigentümer, Kaufinteressent, Notar).
```

---

## Flowcharts

Flowcharts are special visual elements that show step-by-step processes.

### Format

```markdown
** [!SUMMARY] **

**1. First Step**

**↓**

**2. Second Step**

**↓**

**3. Third Step**

**BEISPIEL**
```

### Rules

1. Start with `** [!SUMMARY] **` on its own line (uses special character marker)
2. Each step: `**NUMBER. Step description**`
3. Arrows between steps: `**↓**` or just `↓`
4. End with `**BEISPIEL**` (or any non-flowchart content)
5. One blank line between elements

### Example

```markdown
** [!SUMMARY] **

**1. Sammlung von Vergleichsobjekten**

**↓**

**2. Analyse der Vergleichsobjekte**

**↓**

**3. Ermittlung des Vergleichswerts**

**BEISPIEL**
```

---

## Common Mistakes to Avoid

### ❌ DON'T: Break paragraphs into multiple lines

```markdown
# BAD

Ein **Eigentümer** ist durch die Baubehörde
**rechtlich verpflichtet**, sein Grundstück auf
bestimmte Weise zu behandeln.
```

### ✅ DO: Write continuous paragraphs

```markdown
# GOOD

Ein **Eigentümer** ist durch die Baubehörde **rechtlich verpflichtet**, sein Grundstück auf bestimmte Weise zu behandeln.
```

### ❌ DON'T: Use HTML tags (except iframes)

```markdown
# BAD

<strong>Bold text</strong>
<em>Italic text</em>
<a href="url">Link</a>
```

### ✅ DO: Use markdown syntax

```markdown
# GOOD

**Bold text**
_Italic text_
[Link](url)
```

### ❌ DON'T: Add extra blank lines

```markdown
# BAD

## Heading

Content here.
```

### ✅ DO: Use single blank lines

```markdown
# GOOD

## Heading

Content here.
```

### ❌ DON'T: Mix formatting styles

```markdown
# BAD

**Bold** and <strong>also bold</strong>
```

### ✅ DO: Use consistent markdown

```markdown
# GOOD

**Bold** and **also bold**
```

### ❌ DON'T: Forget frontmatter fields

```markdown
# BAD

---

title: "Article"
slug: "article"

---
```

### ✅ DO: Include all required fields

```markdown
# GOOD

---

title: "Article Title"
slug: "article-slug"
meta-description: "Description"
meta-keywords: "keywords"
date-published: "13.06.2025"
date-written: "13.06.2025"
isFeatured: "false"
category: "Ratgeber"
author: "Author Name"
author-image: "author.webp"
article-image: "article.webp"
focus-keyphrase: "Keyword"

---
```

---

## Quick Reference Checklist

Before submitting a markdown file, verify:

- [ ] Frontmatter is complete with all required fields
- [ ] Frontmatter uses correct date format (DD.MM.YYYY)
- [ ] All paragraphs are continuous (not broken into multiple lines)
- [ ] Headings have proper spacing (one blank line before/after)
- [ ] Special content boxes use `> [!TYPE]` format (where TYPE is SUMMARY, TIP, FACT, or HIGHLIGHT_BOX_WITH_IMAGE_AND_CTA)
- [ ] Videos use iframe tags with all required attributes
- [ ] Tables use markdown syntax (not HTML)
- [ ] Links use markdown syntax `[text](url)`
- [ ] No HTML tags except iframes
- [ ] Bold uses `**text**`, italic uses `*text*`
- [ ] Lists use `-` for unordered lists
- [ ] Flowcharts follow the correct format
- [ ] No extra blank lines between sections
- [ ] All external links include protocol (http:// or https://)

---

## Example Complete Article Structure

```markdown
---
title: "Article Title"
slug: "article-slug"
meta-description: "SEO description"
meta-keywords: "keyword1, keyword2, keyword3"
date-published: "13.06.2025"
date-written: "13.06.2025"
isFeatured: "false"
category: "Ratgeber"
author: "Author Name"
author-image: "author.webp"
article-image: "article.webp"
focus-keyphrase: "Main Keyword"
---

# Article Title

Opening paragraph with continuous text. This paragraph explains the main topic and provides context for the reader. It should be engaging and informative.

## Major Section

Content for this section continues here. Each paragraph should be written as continuous text without unnecessary line breaks.

### Subsection

More detailed content here.

> [!TIP]
>
> This is a special content box with helpful information. It can contain **bold text** and [links](https://example.com).

## Another Major Section

More content here with **bold text** and _italic text_.

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

## Conclusion

Final paragraph summarizing the article content.
```

---

**Last Updated**: Based on analysis of existing articles and MarkdownRenderer.tsx
**Version**: 1.0
