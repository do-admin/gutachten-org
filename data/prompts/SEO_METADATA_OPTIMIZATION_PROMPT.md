# SEO Metadata Optimization Prompt

You are an expert SEO engineer for a Next.js App Router project.

You have full read/write access to this codebase.

## GOAL

Iterate over all subpage configuration files inside the `src/data/{siteId}/subpages` directory and ensure that every file exports proper SEO metadata following the rules defined below.

**IMPORTANT: DOMAIN SOURCE**

- The canonical base domain MUST be loaded from `src/data/multi-page-config.json`.
- Before doing anything:
  - Check if `src/data/multi-page-config.json` exists.
  - If it does NOT exist: STOP IMMEDIATELY and ask the user:
    "Which file contains the domain to be used for canonical, OpenGraph, and Twitter URLs?"
- Do NOT continue until that file is found.
- Extract the domain from the `sites[].domain` field (e.g., "gutachten.org").
- Construct full URLs as: `https://${domain}${canonicalPath}`

## SCOPE

- Work on all subpage configuration files:
  - `src/data/{siteId}/subpages/*.ts` (main subpages)
  - `src/data/{siteId}/subpages/programmatic/*.ts` (programmatic subpages)
- Each file exports a `metadata` object of type `SubpageMetadata`.
- The canonical path is derived from the filename:
  - `home.ts` → `/`
  - `kontakt.ts` → `/kontakt`
  - `angebot.ts` → `/angebot`
  - `programmatic/home.ts` → `/` (for programmatic instances)
  - `programmatic/nutzungsdauer-city.ts` → `/nutzungsdauer-city` (for programmatic instances)

────────────────────────────────────────────
SEO METADATA RULES (MUST FOLLOW EXACTLY)
────────────────────────────────────────────

### 1. ANALYSE PAGE CONTENT

- Read the page's content (components, text, headings).
- Identify the main topic and main keyword(s).
- If NO clear topic appears, STOP IMMEDIATELY and ask the user for keywords.

### 2. TITLE (max 60 characters)

- Must be concise and contain the main keyword(s).
- Format: `{Main Keyword} | {Secondary Keyword} | {Brand Name}`
- Hard limit: 60 characters.
- Count characters carefully (including spaces and pipes).

### 3. DESCRIPTION (max 155 characters)

- MUST include relevant keywords from the title.
- Keep it natural, accurate, and within 155 characters.
- Should be compelling and include a call-to-action when appropriate.
- Count characters carefully.

### 4. AUTHOR & PUBLISHER

- Always set:
  - `authors: [{ name: "{Brand Name}" }]`
  - `creator: "{Brand Name}"`
  - `publisher: "{Brand Name}"`
- Extract brand name from `multi-page-config.json` → `sites[].name` or use the domain name.

### 5. CANONICAL URL

- Derive the canonical path from the filename:
  - Remove `.ts` extension
  - `home.ts` → `/`
  - `kontakt.ts` → `/kontakt`
  - `programmatic/nutzungsdauer-city.ts` → `/nutzungsdauer-city`
- Build full canonical URL:
  ```
  canonical: "/{path}"
  ```
- The full URL will be constructed as: `https://${domain}${canonical}`

### 6. OPENGRAPH

- Use SAME title and SAME description as the metadata title & description.
- Build full URL: `https://${domain}${canonical}`
- Add an OpenGraph image with an `alt` tag describing the page content.
- Ensure `siteName` matches the brand name.
- Example:
  ```
  openGraph: {
    title: "{same as metadata.title}",
    description: "{same as metadata.description}",
    url: "https://${domain}${canonical}",
    siteName: "{Brand Name}",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "{imageUrl}",
        width: 1200,
        height: 630,
        alt: "{descriptive alt text based on page content}"
      }
    ]
  }
  ```

### 7. TWITTER

- Same title and description as canonical metadata.
- Same canonical URL.
- Add an image with an appropriate `alt`.
- Example:
  ```
  twitter: {
    card: "summary_large_image",
    title: "{same as metadata.title}",
    description: "{same as metadata.description}",
    images: [
      {
        url: "{imageUrl}",
        width: 1200,
        height: 630,
        alt: "{descriptive alt text}"
      }
    ]
  }
  ```

### 8. REMOVE GOOGLE VERIFICATION

- If any metadata object includes `googleVerification`, remove it entirely.
- If `verification: { google: ... }` exists, remove the Google field(s).

────────────────────────────────────────────
IMPLEMENTATION RULES
────────────────────────────────────────────

- For every `src/data/{siteId}/subpages/**/*.ts`:
  1. Read the file and locate the `export const metadata: SubpageMetadata` object.
  2. Determine canonical path from filename (see rules above).
  3. Parse `src/data/multi-page-config.json` to get:
     - Domain: `sites[].domain`
     - Brand name: `sites[].name`
  4. Analyze the page content to identify keywords and topic.
  5. Generate/update:
     - `title` (max 60 chars)
     - `description` (max 155 chars)
     - `canonical` (relative path, e.g., `/kontakt`)
     - `openGraph.url` (full URL: `https://${domain}${canonical}`)
     - `openGraph.title` (same as metadata.title)
     - `openGraph.description` (same as metadata.description)
     - `twitter.title` (same as metadata.title)
     - `twitter.description` (same as metadata.description)
  6. Ensure all required fields are present.
  7. Remove any `googleVerification` fields.
  8. Ensure TypeScript types compile.
  9. Ensure the project builds.

────────────────────────────────────────────
EXECUTION STEPS
────────────────────────────────────────────

1. **Confirm the existence of `src/data/multi-page-config.json`**.
   - If missing, STOP and ask which file contains the domain.
2. **Parse `src/data/multi-page-config.json`** to retrieve:
   - Domain (e.g., "gutachten.org")
   - Brand name (e.g., "Gutachten.org")
   - Site ID (e.g., "gutachten-org")

3. **Find all subpage files**:
   - List all `*.ts` files in `src/data/{siteId}/subpages/`
   - List all `*.ts` files in `src/data/{siteId}/subpages/programmatic/`

4. **For each subpage file**:
   - Read the file content
   - Locate the `export const metadata` object
   - Derive canonical path from filename
   - Analyze page content for keywords
   - Generate/optimize SEO metadata following all rules
   - Update the metadata export
   - Remove all `googleVerification` fields
   - Ensure character limits are respected

5. **Build/Type-check** and ensure no errors:
   - Run TypeScript compiler check
   - Verify all metadata objects conform to `SubpageMetadata` type
   - Ensure no build errors

────────────────────────────────────────────
SPECIAL CONSIDERATIONS
────────────────────────────────────────────

- **Programmatic Pages**: Programmatic subpages may have dynamic canonical paths based on the instance name. Check if the canonical should include the instance (e.g., `/hamburg/nutzungsdauer-city` vs `/nutzungsdauer-city`).
- **Image Paths**: Existing image paths may use template variables like `{{siteId}}`. Preserve these patterns when updating image URLs.
- **Template Variables**: Some metadata may use helper functions like `getTemplateVariables()` or `getImagePath()`. Preserve these patterns.
- **Character Counting**: Be strict about character limits. Count every character including spaces, pipes, and special characters.

────────────────────────────────────────────
EXAMPLE TRANSFORMATION
────────────────────────────────────────────

**Before:**

```typescript
export const metadata: SubpageMetadata = {
  title: "Kontakt | Gutachten anfragen", // 47 chars ✓
  description:
    "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.", // 155 chars ✓
  canonical: "/kontakt",
  openGraph: {
    url: "https://gutachten.org/kontakt", // ✓
    // ... rest
  },
};
```

**After (if optimization needed):**

```typescript
export const metadata: SubpageMetadata = {
  title: "Kontakt | Gutachten anfragen", // Keep if within limit
  description:
    "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.", // Keep if within limit
  canonical: "/kontakt", // ✓
  openGraph: {
    title: "Kontakt | Gutachten anfragen", // Must match metadata.title
    description:
      "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.", // Must match metadata.description
    url: "https://gutachten.org/kontakt", // Full URL from domain + canonical
    // ... rest
  },
  twitter: {
    title: "Kontakt | Gutachten anfragen", // Must match metadata.title
    description:
      "Unverbindliche Beratung für Immobiliengutachten. Kostenlose Ersteinschätzung und persönliche Beratung zu Verkehrswert, Nutzungsdauer und mehr.", // Must match metadata.description
    // ... rest
  },
};
```

Now begin by verifying whether `src/data/multi-page-config.json` exists.
