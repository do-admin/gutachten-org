# Schema.org Structured Data Optimization Prompt

You are an expert in schema.org structured data and Next.js (App Router).

## CONTEXT

- The project uses a `StructuredDataComponent` in subpage configuration files (`data/*/subpages/*.ts`) via:
  `createComponent<StructuredDataComponent>({ type: "StructuredData", id, schemaType, data })`.
- StructuredData supports the following schema types:
  - `"organization"` → OrganizationData
  - `"website"` → WebsiteData
  - `"article"` → ArticleData
  - `"donation"` → DonationData
  - `"faq"` → FAQData (array of question/answer or FAQPageData object)
  - `"course"` → CourseData
  - `"learningResource"` → LearningResourceData

- Important client data (name, domain, URLs, contact, social links, etc.) is stored in `src/data/multi-page-config.json`.

**VERY IMPORTANT: DOMAIN & CLIENT DATA SOURCE**

- Before doing anything:
  1. Locate and read `src/data/multi-page-config.json`.
  2. Use it as the **single source of truth** for:
     - site / organization name (`sites[].name`)
     - base URL / domain (`sites[].domain` - construct as `https://${domain}`)
     - logo URL (`sites[].logo.dark` or `sites[].logo.light`)
     - social URLs (`sites[].social.facebook`, `sites[].social.linkedin`, `sites[].social.instagram`)
     - contact info (`sites[].contact.email`, `sites[].contact.phone`, `sites[].contact.address`)
     - any other important client fields
- If `src/data/multi-page-config.json` does NOT exist, STOP and ask:
  "Which file contains the domain and client data (name, URLs, etc.)?"

Do NOT hardcode the domain or name if they are available in `multi-page-config.json`.

────────────────────────────────────────
GOAL
────────────────────────────────────────

Iterate over all subpage configuration files in `src/data/{siteId}/subpages` and ensure each file includes appropriate `StructuredDataComponent` instances with rich schema.org data.

**Target Files:**

- `src/data/{siteId}/subpages/*.ts` (main subpages)
- `src/data/{siteId}/subpages/programmatic/*.ts` (programmatic subpages)

**Pattern:**
Each subpage file exports a `SubpageContent` array via `validateContent([...])`. Add `StructuredDataComponent` instances to this array using `createComponent<StructuredDataComponent>`.

────────────────────────────────────────
IMPLEMENTATION PATTERN
────────────────────────────────────────

### 1. Required Imports

```typescript
import type {
  StructuredDataComponent,
  SubpageContent,
} from "@/lib/component-schemas";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath } from "@/lib/site-config-helper";
```

### 2. Get Template Variables

```typescript
const templateVariables = getTemplateVariables();
```

**Available template variables:**

- `templateVariables.siteName` - Organization name
- `templateVariables.siteUrl` - Full site URL (e.g., "https://gutachten.org")
- `templateVariables.siteDescription` - Site description
- `templateVariables.contactEmail` - Contact email
- `templateVariables.contactPhone` - Contact phone
- `templateVariables.contactStreet` - Street address
- `templateVariables.contactLocation` - City/location
- `templateVariables.contactPostalCode` - Postal code
- `templateVariables.contactCountry` - Country
- `templateVariables.facebookUrl` - Facebook URL (from `sites[].social.facebook`)
- `templateVariables.linkedinUrl` - LinkedIn URL (from `sites[].social.linkedin`)
- `templateVariables.instagramUrl` - Instagram URL (from `sites[].social.instagram`)

**Note:** If social URLs are not in template variables, extract them directly from `multi-page-config.json`:

```typescript
import multiPageConfig from "@/data/multi-page-config.json";
const currentSite = multiPageConfig.sites.find((s) => s.id === "{siteId}");
const facebookUrl = currentSite?.social?.facebook;
const linkedinUrl = currentSite?.social?.linkedin;
const instagramUrl = currentSite?.social?.instagram;
```

### 3. Add Structured Data Components

Add `StructuredDataComponent` instances to the `validateContent` array. Place them at the beginning of the array (before other components).

**Example structure:**

```typescript
const pageContent: SubpageContent = validateContent([
  // Organization structured data (recommended for most pages)
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-organization",
    schemaType: "organization",
    data: {
      name: templateVariables.siteName,
      alternateName: "{Alternate Name}",
      description: templateVariables.siteDescription,
      url: templateVariables.siteUrl,
      logo: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/{logo-filename}")}`,
      sameAs: [
        templateVariables.facebookUrl,
        templateVariables.linkedinUrl,
        templateVariables.instagramUrl,
      ],
      address: {
        addressCountry: "DE",
        addressRegion: "{Region}",
        addressLocality: templateVariables.contactLocation,
        postalCode: templateVariables.contactPostalCode,
        streetAddress: templateVariables.contactStreet,
      },
      contactPoint: {
        telephone: templateVariables.contactPhone,
        email: templateVariables.contactEmail,
        contactType: "customer service",
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      serviceArea: {
        "@type": "Country",
        name: "Deutschland",
      },
      foundingDate: "{Year}",
      mission: "{Mission statement}",
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "{Service Catalog Name}",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "{Service Name}",
              description: "{Service Description}",
            },
          },
          // Add more services...
        ],
      },
    },
  }),

  // Website structured data (recommended for home page)
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-website",
    schemaType: "website",
    data: {
      name: `${templateVariables.siteName} - {Page-specific description}`,
      url: templateVariables.siteUrl,
      description: templateVariables.siteDescription,
      inLanguage: "de-DE",
      publisher: {
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
        logo: {
          url: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/{logo-filename}")}`,
          width: 200,
          height: 60,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${templateVariables.siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  }),

  // FAQ structured data (for pages with FAQ sections)
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: faqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: templateVariables.siteUrl,
      name: `${templateVariables.siteName} - {FAQ Page Title}`,
    },
  }),

  // ... other components
]);
```

────────────────────────────────────────
SCHEMA TYPE SELECTION GUIDE
────────────────────────────────────────

### Organization Schema

**Use for:** Most pages (home, about, contact, service pages)
**Required fields:**

- `name`, `description`, `url`
  **Recommended fields:**
- `logo`, `sameAs` (social links), `address`, `contactPoint`, `areaServed`, `hasOfferCatalog`

### Website Schema

**Use for:** Home page, main landing pages
**Required fields:**

- `name`, `url`
  **Recommended fields:**
- `description`, `publisher`, `potentialAction` (SearchAction)

### FAQ Schema

**Use for:** Pages with FAQ sections
**Data format:**

```typescript
// Option 1: Array of items
data: {
  items: [
    { question: "...", answer: "..." },
    { question: "...", answer: "..." }
  ],
  url: "...",
  name: "..."
}

// Option 2: FAQPageData object
data: {
  items: [...],
  url: "...",
  name: "..."
}
```

### Article Schema

**Use for:** Blog posts, articles, news pages
**Required fields:**

- `headline`
  **Recommended fields:**
- `description`, `image`, `author`, `publisher`, `datePublished`, `dateModified`, `url`, `articleSection`

### Course Schema

**Use for:** Educational courses, training programs
**Required fields:**

- `name`, `description`, `provider`, `url`
  **Recommended fields:**
- `educationalLevel`, `inLanguage`, `teaches`, `timeRequired`, `isAccessibleForFree`

### Learning Resource Schema

**Use for:** Educational content, guides, tutorials
**Required fields:**

- `name`, `description`, `learningResourceType`, `author`, `url`
  **Recommended fields:**
- `educationalUse`, `typicalAgeRange`, `timeRequired`, `inLanguage`, `teaches`, `isAccessibleForFree`

### Donation Schema

**Use for:** Donation pages, fundraising
**Required fields:**

- `name`, `description`, `url`
  **Recommended fields:**
- `organization`, `donationAmount`

────────────────────────────────────────
EXECUTION STEPS
────────────────────────────────────────

1. **Confirm the existence of `src/data/multi-page-config.json`**.
   - If missing, STOP and ask which file contains the domain and client data.

2. **Parse `src/data/multi-page-config.json`** to retrieve:
   - Site ID (e.g., "gutachten-org")
   - Domain (e.g., "gutachten.org")
   - Organization name
   - Social URLs
   - Contact information
   - Logo paths

3. **Find all subpage files**:
   - List all `*.ts` files in `src/data/{siteId}/subpages/`
   - List all `*.ts` files in `src/data/{siteId}/subpages/programmatic/`

4. **For each subpage file**:
   - Read the file content
   - Locate the `validateContent([...])` array
   - Analyze page content to determine appropriate schema types:
     - Home page → `organization` + `website`
     - Service pages → `organization` (with `hasOfferCatalog`)
     - FAQ pages → `organization` + `faq`
     - Article/blog pages → `organization` + `article`
   - Check if `StructuredDataComponent` already exists:
     - If missing: Add appropriate schema components
     - If exists: Extend/refine with more complete data
   - Use `getTemplateVariables()` for all dynamic values
   - Use `getImagePath()` for image paths with template variables
   - Ensure all required fields are present
   - Add as many meaningful optional fields as possible

5. **Best Practices:**
   - **Always include Organization schema** on pages that represent the business
   - **Use Website schema** on the home page
   - **Add FAQ schema** when FAQ data is available (check for FAQ JSON files in `src/data/{siteId}/json/faq/`)
   - **Use `hasOfferCatalog`** in Organization schema to list services/products
   - **Place structured data components at the beginning** of the `validateContent` array
   - **Use unique IDs** for each structured data component (e.g., `"structured-data-organization"`, `"structured-data-website"`)

6. **Type-check and build:**
   - Ensure TypeScript compiles without errors
   - Verify all `data` objects match the TypeScript interfaces
   - Ensure the project builds successfully

────────────────────────────────────────
EXAMPLE: Complete Subpage with Structured Data
────────────────────────────────────────

```typescript
import type {
  StructuredDataComponent,
  SubpageContent,
  HeroWithFeatureCardsComponent,
} from "@/lib/component-schemas";
import type { SubpageMetadata } from "@/lib/metadata-types";
import { createComponent, validateContent } from "@/lib/component-schemas";
import { getTemplateVariables, getImagePath } from "@/lib/site-config-helper";
import faqData from "../json/faq/gutachten-org-faq.json";

const templateVariables = getTemplateVariables();

// Export metadata for this page
export const metadata: SubpageMetadata = {
  title: "Home | Gutachten.org",
  description: "...",
  // ... rest of metadata
};

const homeContent: SubpageContent = validateContent([
  // Organization structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-organization",
    schemaType: "organization",
    data: {
      name: templateVariables.siteName,
      alternateName: "Gutachten Org",
      description: templateVariables.siteDescription,
      url: templateVariables.siteUrl,
      logo: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
      sameAs: [
        templateVariables.facebookUrl,
        templateVariables.linkedinUrl,
        templateVariables.instagramUrl,
      ],
      address: {
        addressCountry: "DE",
        addressRegion: "Niedersachsen",
        addressLocality: templateVariables.contactLocation,
        postalCode: templateVariables.contactPostalCode,
        streetAddress: templateVariables.contactStreet,
      },
      contactPoint: {
        telephone: templateVariables.contactPhone,
        email: templateVariables.contactEmail,
        contactType: "customer service",
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      foundingDate: "2020",
      mission:
        "Immobilieneigentümern durch professionelle Gutachten zu Steuerersparnis verhelfen.",
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Immobiliengutachten-Dienstleistungen",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Restnutzungsdauergutachten",
              description:
                "Gutachten zur verkürzten Abschreibungsdauer von Immobilien.",
            },
          },
        ],
      },
    },
  }),

  // Website structured data
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-website",
    schemaType: "website",
    data: {
      name: `${templateVariables.siteName} - Professionelle Immobiliengutachten`,
      url: templateVariables.siteUrl,
      description: templateVariables.siteDescription,
      inLanguage: "de-DE",
      publisher: {
        name: templateVariables.siteName,
        url: templateVariables.siteUrl,
        logo: {
          url: `${templateVariables.siteUrl}${getImagePath("/images/{{siteId}}/logo/gutachten-org-logo-dark.svg")}`,
          width: 200,
          height: 60,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${templateVariables.siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  }),

  // FAQ structured data (if FAQ data exists)
  createComponent<StructuredDataComponent>({
    type: "StructuredData",
    id: "structured-data-faq",
    schemaType: "faq",
    data: {
      items: faqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      url: templateVariables.siteUrl,
      name: `${templateVariables.siteName} - Häufig gestellte Fragen`,
    },
  }),

  // Other page components...
  createComponent<HeroWithFeatureCardsComponent>({
    // ... component props
  }),
]);

export default homeContent;
```

────────────────────────────────────────
IMPORTANT NOTES
────────────────────────────────────────

- **Image Paths:** Always use `getImagePath()` helper for image paths to support template variable replacement (e.g., `{{siteId}}`)
- **URLs:** Always use `templateVariables.siteUrl` for base URLs, never hardcode
- **Social Links:** Extract from `multi-page-config.json` → `sites[].social` if not in template variables
- **Contact Info:** Use template variables from `getTemplateVariables()` which extracts from config
- **FAQ Data:** Check for FAQ JSON files in `src/data/{siteId}/json/faq/` directory
- **Service Catalog:** For service pages, populate `hasOfferCatalog.itemListElement` with relevant services
- **Unique IDs:** Use descriptive, unique IDs for each structured data component to avoid conflicts

Now begin by verifying whether `src/data/multi-page-config.json` exists.
