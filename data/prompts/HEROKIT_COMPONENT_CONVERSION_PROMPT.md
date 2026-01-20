# HeroKit Component Conversion Prompt

## Overview

This prompt guides the conversion of components from the `./repo-to-convert/src/components` folder into reusable HeroKit components. It includes special handling for FAQ and Lexikon components to preserve their existing functionality while updating their design.

### Pre-Conversion Setup

**IMPORTANT:** Before converting any components, complete the following setup steps:

#### Step 1: Copy UI Components

Copy the UI components from the source repository to ensure consistency:

1. **Copy UI components**: Copy all files from `./repo-to-convert/src/components/ui/` to `./src/components/ui/`
2. **Override existing files**: If a file already exists in `./src/components/ui/`, override it with the version from `./repo-to-convert/src/components/ui/`
3. **Preserve custom components**: Keep any custom components in `./src/components/ui/` that don't exist in the source (e.g., `optimized-image.tsx`, `scroll-button.tsx`, `scroll-link.tsx`, `section.tsx`)
4. **Replace CSS class names**: After copying, replace all instances of `rounded-pill` with `rounded-full` in the copied UI components (this converts Bootstrap-style classes to Tailwind equivalents)

This ensures that all UI primitives (Button, Card, Accordion, etc.) are consistent with the components being converted.

#### Step 2: Extract and Apply Colors to Config

Extract the color values from `./repo-to-convert/src/index.css` and apply them to `./src/data/multi-page-config.json`:

1. **Read the source CSS file**: Open `./repo-to-convert/src/index.css` and locate the `:root` CSS variables section
2. **Extract color values**: The CSS uses HSL format without the `hsl()` wrapper (e.g., `--primary: 174 70% 14%;`)
3. **Convert to full HSL format**: Convert values to `hsl(H S% L%)` format for the config file
4. **Update the config file**: Replace the `colors` object in `./src/data/multi-page-config.json` → `sharedConfig.colors`

**Color Mapping Reference:**

| CSS Variable               | Config Key               | Example Conversion                     |
| -------------------------- | ------------------------ | -------------------------------------- |
| `--primary`                | `primary`                | `174 70% 14%` → `hsl(174 70% 14%)`     |
| `--primary-foreground`     | `primaryForeground`      | `0 0% 100%` → `hsl(0 0% 100%)`         |
| `--secondary`              | `secondary`              | `172 44% 92%` → `hsl(172 44% 92%)`     |
| `--secondary-foreground`   | `secondaryForeground`    | `174 70% 14%` → `hsl(174 70% 14%)`     |
| `--accent`                 | `accent`                 | `177 41% 76%` → `hsl(177 41% 76%)`     |
| `--accent-foreground`      | `accentForeground`       | `174 70% 14%` → `hsl(174 70% 14%)`     |
| `--background`             | `background`             | `0 0% 100%` → `hsl(0 0% 100%)`         |
| `--foreground`             | `foreground`             | `0 0% 12%` → `hsl(0 0% 12%)`           |
| `--muted`                  | `muted`                  | `180 14% 98%` → `hsl(180 14% 98%)`     |
| `--muted-foreground`       | `mutedForeground`        | `0 0% 33%` → `hsl(0 0% 33%)`           |
| `--border`                 | `border`                 | `0 0% 90%` → `hsl(0 0% 90%)`           |
| `--input`                  | `input`                  | `0 0% 90%` → `hsl(0 0% 90%)`           |
| `--ring`                   | `ring`                   | `174 70% 14%` → `hsl(174 70% 14%)`     |
| `--destructive`            | `destructive`            | `0 84.2% 60.2%` → `hsl(0 84.2% 60.2%)` |
| `--destructive-foreground` | `destructive-foreground` | `0 0% 100%` → `hsl(0 0% 100%)`         |
| `--card`                   | `card`                   | `0 0% 100%` → `hsl(0 0% 100%)`         |
| `--card-foreground`        | `card-foreground`        | `0 0% 12%` → `hsl(0 0% 12%)`           |
| `--popover`                | `popover`                | `0 0% 100%` → `hsl(0 0% 100%)`         |
| `--popover-foreground`     | `popover-foreground`     | `0 0% 12%` → `hsl(0 0% 12%)`           |
| `--radius`                 | `radius`                 | `1.75rem` → `1.75rem`                  |

**Example Config Update:**

```json
{
  "sharedConfig": {
    "colors": {
      "primary": "hsl(174 70% 14%)",
      "primaryForeground": "hsl(0 0% 100%)",
      "secondary": "hsl(172 44% 92%)",
      "secondaryForeground": "hsl(174 70% 14%)",
      "accent": "hsl(177 41% 76%)",
      "accentForeground": "hsl(174 70% 14%)",
      "background": "hsl(0 0% 100%)",
      "foreground": "hsl(0 0% 12%)",
      "muted": "hsl(180 14% 98%)",
      "mutedForeground": "hsl(0 0% 33%)",
      "border": "hsl(0 0% 90%)",
      "input": "hsl(0 0% 90%)",
      "ring": "hsl(174 70% 14%)",
      "destructive": "hsl(0 84.2% 60.2%)",
      "destructive-foreground": "hsl(0 0% 100%)",
      "radius": "1.75rem",
      "card": "hsl(0 0% 100%)",
      "card-foreground": "hsl(0 0% 12%)",
      "popover": "hsl(0 0% 100%)",
      "popover-foreground": "hsl(0 0% 12%)"
    }
  }
}
```

This ensures the design system colors are consistent across the application and match the source design.

---

# Sitemap.xml Generation Prompt

## Overview

This prompt guides the creation of a `sitemap.xml` file for a Next.js application using static HTML rendering. The sitemap should include all pages that are statically generated at build time.

---

## Task

Create a `sitemap.xml` file in the `public/` directory that includes all static pages for the current site.

---

## Context

- **Framework**: Next.js with App Router
- **Rendering**: Static HTML export (`output: 'export'` in production)
- **Route Structure**:
  - Home page: `/` (or `/[slug]` where slug is "home")
  - Dynamic pages: `/[slug]` (e.g., `/about`, `/contact`)
  - Programmatic pages: `/[slug]` where slug matches programmatic instances (e.g., `/hamburg`)
  - Nested programmatic pages: `/[slug]/[instance]` (e.g., `/about/hamburg`)
  - Ratgeber pages: `/ratgeber` and `/ratgeber/[slug]`

---

## Requirements

### 1. Discover All Pages

Use the following methods to discover all pages:

- **Site Structure**: Use `getSiteStructure()` from `@/lib/config` to get all pages from the subpages directory
- **Current Site**: Use `getCurrentSite()` from `@/lib/config` to get the current site configuration
- **Programmatic Pages**: Check for `programmatic.programmaticInstances` in the site config
- **Static Routes**: Include `/ratgeber` if it exists
- **Dynamic Routes**: Check `src/app/[slug]/page.tsx` and `src/app/[slug]/[instance]/page.tsx` for `generateStaticParams()` functions

### 2. Base URL

- Get the base URL from `currentSite.domain` in the site configuration
- Format: `https://${domain}` (ensure it includes the protocol)
- If domain doesn't start with `https://` prepend `https://`

### 3. XML Format

Follow the XML sitemap protocol (https://www.sitemaps.org/protocol.html):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

### 4. URL Requirements

For each page, include:

- **`<loc>`**: Full absolute URL (e.g., `https://example.com/about`)
- **`<lastmod>`**: Current date in YYYY-MM-DD format (use today's date or build date)
- **`<changefreq>`**: Appropriate frequency (`always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`)
  - Home page: `weekly`
  - Content pages: `monthly`
  - Static pages: `yearly`
- **`<priority>`**: Number between 0.0 and 1.0
  - Home page: `1.0`
  - Important pages: `0.8`
  - Regular pages: `0.5`
  - Less important pages: `0.3`

### 5. Path Formatting

- Ensure all paths start with `/`
- Home page should be `/` (not `/home`)
- Remove trailing slashes unless the site uses them (check `next.config.ts` for `trailingSlash`)
- If `trailingSlash: true`, ensure all URLs end with `/`

### 6. Exclude Pages

Do NOT include:

- 404 pages
- Error pages
- API routes
- Pages that return `notFound()` in their page component
- Pages marked as `enabled: false` in subpage config

---

## Implementation Steps

1. **Get Site Configuration**:

   ```typescript
   import { getCurrentSite, getSiteStructure } from "@/lib/config";
   const currentSite = getCurrentSite();
   const siteStructure = getSiteStructure();
   ```

2. **Build Base URL**:

   ```typescript
   const baseUrl = currentSite.domain.startsWith("http")
     ? currentSite.domain
     : `https://${currentSite.domain}`;
   ```

3. **Collect All URLs**:
   - Regular pages from `siteStructure.pages`
   - Programmatic pages from `currentSite.programmatic?.programmaticInstances`
   - Ratgeber pages (if applicable)
   - Nested programmatic pages (if applicable)

4. **Generate XML**:
   - Create the XML structure
   - Sort URLs by priority (home first, then by importance)
   - Format dates correctly
   - Ensure proper XML encoding

5. **Write to File**:
   - Save as `public/sitemap.xml`
   - Ensure UTF-8 encoding

---

## Example Output Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

---

## Validation

After generating the sitemap:

- ✅ Verify XML is well-formed (no syntax errors)
- ✅ Check all URLs are absolute (start with `https://`)
- ✅ Ensure no duplicate URLs
- ✅ Verify dates are in YYYY-MM-DD format
- ✅ Check that priority values are between 0.0 and 1.0
- ✅ Test that all URLs in the sitemap are accessible
- ✅ Validate using an online sitemap validator (e.g., XML Sitemap Validator)

---

## Notes

- The sitemap should be generated at build time (not runtime)
- For multi-site setups, generate a separate sitemap for each site
- Update `lastmod` dates when pages are actually modified (consider using file modification dates if available)
- Keep the sitemap under 50,000 URLs (if larger, split into multiple sitemaps)

---

## Completion Criteria

The task is complete when:

1. ✅ `public/sitemap.xml` file exists
2. ✅ All static pages are included
3. ✅ All URLs are absolute and valid
4. ✅ XML is well-formed and valid
5. ✅ Sitemap follows the sitemap.org protocol
6. ✅ No duplicate URLs
7. ✅ Home page has priority 1.0
8. ✅ All required XML elements are present

## Part 1: Standard Component Conversion

### Task

Please iterate over all of the components within the `./repo-to-convert/src/components` folder **except FAQ, Lexikon (glossary), navigation, and header components**.

Your task is to adjust these components to match the structure and functionality that we have in the `data/herokit_conversion/example_component` component.

The goal is to be able to have reusable components which are customizable via their props.

### Requirements for Standard Components

1. **Component Structure**: Match the structure and functionality of the example component
2. **Zod Schema**: Create a Zod schema file (`ComponentName.schema.ts`) next to the component file
3. **Component Registration**: Register the component in `src/lib/component-schemas.ts`
4. **Manifest.json**: Create a `manifest.json` which matches the structure of the `example_component` manifest
5. **Index File**: Create an `index` file which exports the component and the types
6. **Accessibility**: Ensure all components meet WCAG 2.1 Level AA guidelines (see comprehensive accessibility requirements below)
7. **Design Tokens**: Ensure all components use primary, secondary, accent colors
8. **CSS Conversion**: Convert and migrate styles from `data/herokit_conversion/css` folder (see CSS Conversion Process below)
9. **Image Handling**: All components requiring images MUST use the `<OptimizedImage>` component (see Image Handling Requirements below)

---

## CSS Conversion Process

### Overview

When converting components from `./repo-to-convert/src/components`, you **MUST** respect and convert the CSS styles placed within the files in the `data/herokit_conversion/css` folder. The goal is to:

1. **Convert CSS variables** from HSL format to shadcn CSS variables (oklch format) used in `src/app/globals.css`
2. **Move reusable styles** to `src/app/globals.css` in appropriate layers
3. **Replace custom CSS classes** with Tailwind utility classes directly in components
4. **Remove component-specific styles** and replace with Tailwind classes

### Step 1: Review CSS Files

Before converting any component:

1. **Read all CSS files** in `data/herokit_conversion/css/` folder (e.g., `index.css`)
2. **Identify**:
   - CSS custom properties (CSS variables) defined in `:root` or `.dark`
   - Reusable utility classes (e.g., `.container`, `.section-padding`, `.shadow-*`)
   - Component-specific classes that should be converted to Tailwind
   - Typography scales and font definitions
   - Layout utilities (grids, flexbox patterns)
   - Animation and transition definitions

### Step 2: Convert CSS Variables

#### Variable Mapping Strategy

The CSS files in `data/herokit_conversion/css` use **HSL format** variables (e.g., `--teal: 174 70% 14%`), while `src/app/globals.css` uses **oklch format** variables (e.g., `--primary: oklch(0.205 0 0)`).

**DO NOT** add new HSL variables to `globals.css`. Instead:

1. **Map existing variables** to shadcn variables:
   - `--teal` / `--teal-rich` → `--primary` (if they match the primary color)
   - `--mint` / `--mint-light` → `--secondary` or `--accent` (if appropriate)
   - `--grey-*` → `--muted`, `--muted-foreground`, `--foreground` (based on usage)
   - `--off-white` → `--background` or `--card` (if appropriate)

2. **For color variables that don't map directly**:
   - If the color is used for a specific semantic purpose (primary, secondary, accent), use the corresponding shadcn variable
   - If the color is truly unique and needed, convert HSL to oklch format and add to `:root` in `globals.css` (use a color conversion tool)
   - **Prefer using existing shadcn variables** over creating new ones

3. **Update variable references** in components:
   - Replace `hsl(var(--teal))` with `hsl(var(--primary))` or use Tailwind classes like `bg-primary`
   - Replace `var(--mint)` with `var(--secondary)` or `var(--accent)` as appropriate
   - Use Tailwind color utilities (e.g., `bg-primary`, `text-primary-foreground`) instead of CSS variables when possible

#### Example Variable Conversion

**Before (HSL format from conversion CSS):**

```css
:root {
  --teal: 174 70% 14%;
  --mint: 177 41% 76%;
  --grey-dark: 0 0% 12%;
}
```

**After (Use existing shadcn variables in globals.css):**

```css
:root {
  /* Use existing --primary, --secondary, --foreground variables */
  /* No new variables needed if they map to existing shadcn variables */
}
```

**In components:**

- Replace `hsl(var(--teal))` → `bg-primary` or `hsl(var(--primary))`
- Replace `hsl(var(--mint))` → `bg-secondary` or `bg-accent`
- Replace `hsl(var(--grey-dark))` → `text-foreground` or `bg-foreground`

### Step 3: Move Reusable Styles to globals.css

#### What to Move

Move the following types of styles to `src/app/globals.css`:

1. **Utility classes** that are used across multiple components:
   - Container classes (`.container`, `.content-width`)
   - Spacing utilities (`.section-padding`, `.section-spacing`)
   - Typography utilities (`.heading-hero`, `.heading-section`, `.text-body`)
   - Shadow utilities (`.shadow-soft`, `.shadow-card`, `.shadow-hover`)
   - Layout utilities (`.expert-grid`, `.card-padding`)

2. **Typography scales** and font definitions:
   - Font family definitions
   - Typography size variables (`.page-home`, `.page-sub` CSS custom properties)
   - Line height and letter spacing utilities

3. **Reusable component patterns**:
   - Gradient utilities (`.gradient-mint`, `.gradient-hero`)
   - Card hover effects (`.card-hover`)
   - Background utilities (`.bg-teal-dark`)
   - Hero section utilities (`.hero-shape`, `.hero-shape-1`, `.hero-shape-2`, `.hero-shape-3`)

#### Where to Place in globals.css

Follow the existing structure in `src/app/globals.css`:

1. **CSS Variables** → Add to `:root` or `.dark` sections (convert HSL to oklch if needed)
2. **Base styles** → Add to `@layer base { ... }`
3. **Component utilities** → Add to `@layer components { ... }`
4. **Utility classes** → Add to `@layer utilities { ... }`

#### Example: Moving a Utility Class

**Before (in conversion CSS):**

```css
.shadow-soft {
  box-shadow: 0 4px 20px -4px hsl(174 70% 14% / 0.06);
}
```

**After (in globals.css, using shadcn variables):**

```css
@layer components {
  .shadow-soft {
    box-shadow: 0 4px 20px -4px hsl(var(--primary) / 0.06);
  }
}
```

**Or better (using Tailwind):**
Replace the class usage in components with Tailwind's shadow utilities or create a custom shadow using Tailwind's theme.

#### Preserving Exact Design Values

**CRITICAL**: When converting CSS from the original design, you **MUST preserve exact color values, gradients, and shadow values** that are design-specific, even if they don't match the shadcn design tokens. This ensures visual fidelity to the original design.

**Examples of values that MUST be preserved exactly:**

1. **Gradient backgrounds** - Preserve exact hex or HSL values:

   ```css
   /* Original CSS */
   .gradient-hero {
     background: linear-gradient(180deg, #e9f6f4 0%, #ffffff 100%);
   }

   /* In globals.css - PRESERVE EXACT VALUES */
   @layer components {
     .gradient-hero {
       background: linear-gradient(180deg, #e9f6f4 0%, #ffffff 100%);
     }
   }
   ```

2. **Hero shape backgrounds** - Preserve exact HSL values:

   ```css
   /* Original CSS */
   .hero-shape {
     background: linear-gradient(
       135deg,
       hsl(174 41% 76% / 0.08),
       hsl(174 41% 76% / 0.03)
     );
   }

   /* In globals.css - PRESERVE EXACT VALUES */
   @layer components {
     .hero-shape {
       background: linear-gradient(
         135deg,
         hsl(174 41% 76% / 0.08),
         hsl(174 41% 76% / 0.03)
       );
     }
   }
   ```

3. **Component-specific colors** - Preserve exact hex values in component classes:

   ```tsx
   // In component - PRESERVE EXACT COLOR VALUES
   <Button className="bg-[#004D46] hover:bg-[#003D38] text-white">
   <Heading className="text-[#1A1F1C]">
   ```

4. **Exact shadow values** - Preserve exact rgba/hsl shadow values:

   ```tsx
   // In component - PRESERVE EXACT SHADOW VALUES
   className =
     "shadow-[0_4px_14px_rgba(0,77,70,0.25)] hover:shadow-[0_6px_20px_rgba(0,77,70,0.35)]";
   ```

5. **Radial gradients** - Preserve exact HSL values in inline styles:
   ```tsx
   // In component - PRESERVE EXACT GRADIENT VALUES
   style={{
     background: "radial-gradient(circle, hsl(174 41% 76% / 0.12) 0%, transparent 65%)",
   }}
   ```

**When to preserve vs. convert:**

- ✅ **PRESERVE** exact values for: gradients, shadows, specific brand colors, design-specific opacity values
- ✅ **CONVERT** to shadcn variables for: semantic colors (primary, secondary, accent) that match the design system
- ✅ **PRESERVE** font families like `font-serif` when used in original design
- ✅ **PRESERVE** exact spacing, sizing, and layout values from the original design

### Step 4: Replace Custom CSS with Tailwind Classes

#### Component-Specific Styles

For styles that are **component-specific** (not reusable across multiple components):

1. **Remove** the CSS class definition from the CSS file
2. **Replace** class usage in the component with Tailwind utility classes
3. **Use** Tailwind's design tokens (colors, spacing, typography) instead of custom CSS

#### Conversion Examples

**Before (Custom CSS class):**

```css
.hero-section {
  padding: 3.5rem 0;
  background: linear-gradient(
    180deg,
    hsl(var(--mint-light)) 0%,
    hsl(var(--background)) 100%
  );
}
```

**After (Tailwind classes in component):**

```tsx
<section className="from-secondary to-background bg-gradient-to-b py-14">
  {/* component content */}
</section>
```

**Before (Custom CSS with variables):**

```css
.expert-name {
  font-size: 1.25rem;
  font-weight: 600;
}
```

**After (Tailwind classes):**

```tsx
<h3 className="text-xl font-semibold">{/* expert name */}</h3>
```

### Step 5: Typography and Font Handling

#### Font Families

1. **Check** if custom fonts are defined in the conversion CSS
2. **Verify** font loading in `src/lib/fonts.ts` or layout files
3. **Use** Tailwind's font utilities (`font-primary`, `font-heading`) if they exist in `globals.css`
4. **Map** font variables:
   - If conversion CSS uses `font-family: 'Inter'` → use `font-primary` or `font-sans`
   - If conversion CSS uses `font-family: 'Playfair Display'` → use `font-heading` or appropriate serif utility
   - **PRESERVE** `font-serif` class when used in original design (e.g., `className="font-serif"`)

#### Preserving Typography Values

When the original component uses specific typography classes or values, preserve them exactly:

```tsx
// Original: <h1 className="font-serif text-[1.625rem] leading-[1.15] font-bold tracking-tight text-[#1A1F1C]">
// Preserve: Use exact same classes and values
<Heading className="font-serif text-[1.625rem] leading-[1.15] font-bold tracking-tight text-[#1A1F1C]">
```

#### Typography Scales

If the conversion CSS defines typography scales (e.g., `.page-home`, `.page-sub`):

1. **Preserve** the CSS custom properties in `globals.css` if they're used across multiple components
2. **Use** the variables in components via Tailwind's arbitrary values: `text-[var(--h1-size)]`
3. **Or** replace with Tailwind's typography scale: `text-3xl lg:text-4xl`

### Step 6: Responsive Design Conversion

#### Media Queries

Convert CSS media queries to Tailwind responsive utilities:

**Before (CSS):**

```css
@media (min-width: 1024px) {
  .heading-hero {
    font-size: 3.75rem;
  }
}
```

**After (Tailwind in component):**

```tsx
<h1 className="text-3xl lg:text-[3.75rem]">{/* heading */}</h1>
```

### Step 7: Animation and Transitions

#### CSS Animations

1. **Check** if animations are defined in conversion CSS
2. **Use** Tailwind's animation utilities (`animate-*`) when possible
3. **For custom animations**, add to `globals.css` in `@layer utilities` or use Tailwind's `@keyframes` in `tailwind.config.ts`
4. **Respect** `prefers-reduced-motion` (use Tailwind's `motion-safe:` and `motion-reduce:` variants)

### Step 8: Verification Checklist

After CSS conversion:

- [ ] All CSS variables from conversion CSS are either:
  - Mapped to existing shadcn variables, OR
  - Converted to oklch format and added to `globals.css` (only if truly needed)
- [ ] No HSL-format variables remain in `globals.css` (except for shadows/opacity that use `hsl(var(--variable))`)
- [ ] Reusable utility classes are moved to `globals.css` in appropriate layers
- [ ] Component-specific CSS classes are removed and replaced with Tailwind classes
- [ ] **Exact design values are preserved** (gradients, shadows, specific colors like `#004D46`, `#1A1F1C`)
- [ ] All color references use shadcn variables (`--primary`, `--secondary`, `--accent`, etc.) **OR** exact design values when design-specific
- [ ] Typography uses Tailwind utilities or CSS custom properties from `globals.css` **OR** exact values from original design
- [ ] Font families are preserved (e.g., `font-serif` when used in original)
- [ ] Responsive breakpoints use Tailwind's responsive utilities
- [ ] No unused CSS remains in the conversion CSS files
- [ ] Components use Tailwind classes instead of custom CSS classes
- [ ] **Visual appearance matches the original design exactly** after conversion
- [ ] Gradient backgrounds (`.gradient-hero`) use exact hex/HSL values from original
- [ ] Hero shapes (`.hero-shape-*`) use exact HSL values from original
- [ ] Button colors and shadows match original design exactly
- [ ] Text colors match original design exactly

### Important Rules

1. **DO NOT** add HSL-format color variables to `globals.css` - convert to oklch or map to existing variables
2. **DO NOT** create component-specific CSS classes - use Tailwind utilities instead
3. **DO** preserve reusable utility classes in `globals.css` if they're used across multiple components
4. **DO** use Tailwind's design system (colors, spacing, typography) as the primary styling method
5. **DO** convert CSS custom properties to use shadcn variable names when possible
6. **DO** remove all component-specific styles from CSS files and replace with Tailwind classes in components
7. **DO** preserve exact design values (colors, gradients, shadows) when they are design-specific and don't match shadcn tokens

### Example: HeroSection CSS Conversion

Here's a complete example of converting a HeroSection component's CSS:

**Original CSS (from `data/herokit_conversion/css/index.css`):**

```css
.gradient-hero {
  background: linear-gradient(180deg, #e9f6f4 0%, #ffffff 100%);
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    hsl(174 41% 76% / 0.08),
    hsl(174 41% 76% / 0.03)
  );
  filter: blur(40px);
  pointer-events: none;
}

.hero-shape-1 {
  width: 500px;
  height: 500px;
  top: -100px;
  right: 10%;
}

.hero-shape-2 {
  width: 300px;
  height: 300px;
  bottom: 10%;
  left: 5%;
}

.hero-shape-3 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: 30%;
}
```

**Converted to `src/app/globals.css`:**

```css
@layer components {
  /* Hero gradient background - PRESERVE EXACT VALUES */
  .gradient-hero {
    background: linear-gradient(180deg, #e9f6f4 0%, #ffffff 100%);
  }

  /* Organic background shapes for hero sections - PRESERVE EXACT VALUES */
  .hero-shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      hsl(174 41% 76% / 0.08),
      hsl(174 41% 76% / 0.03)
    );
    filter: blur(40px);
    pointer-events: none;
  }

  .hero-shape-1 {
    width: 500px;
    height: 500px;
    top: -100px;
    right: 10%;
  }

  .hero-shape-2 {
    width: 300px;
    height: 300px;
    bottom: 10%;
    left: 5%;
  }

  .hero-shape-3 {
    width: 200px;
    height: 200px;
    top: 40%;
    right: 30%;
  }
}
```

**Component usage (preserving exact design values):**

```tsx
// Section uses gradient-hero class
<section className="gradient-hero relative h-[52vh] min-h-[360px] overflow-hidden lg:h-auto lg:min-h-0">

// Heading preserves exact typography and color
<Heading className="font-serif text-[1.625rem] leading-[1.15] font-bold tracking-tight text-[#1A1F1C]">

// Description preserves exact color
<p className="text-sm leading-relaxed font-normal text-[#1A1F1C]/80">

// Button preserves exact colors and shadows
<Button className="bg-[#004D46] hover:bg-[#003D38] text-white shadow-[0_4px_14px_rgba(0,77,70,0.25)] hover:shadow-[0_6px_20px_rgba(0,77,70,0.35)]">

// Radial gradient preserves exact HSL values
<div style={{
  background: "radial-gradient(circle, hsl(174 41% 76% / 0.12) 0%, transparent 65%)",
}} />
```

**Key takeaways:**

- ✅ Preserved exact gradient hex values (`#E9F6F4`, `#FFFFFF`)
- ✅ Preserved exact HSL values for hero shapes (`hsl(174 41% 76% / 0.08)`)
- ✅ Preserved exact button colors (`#004D46`, `#003D38`)
- ✅ Preserved exact text colors (`#1A1F1C`)
- ✅ Preserved exact shadow values (`rgba(0,77,70,0.25)`)
- ✅ Preserved `font-serif` class
- ✅ Used `gradient-hero` class in component instead of inline styles

---

## Image Handling Requirements

### Overview

**CRITICAL**: All components that display images **MUST** use the `<OptimizedImage>` component from `@/components/ui/optimized-image`. **NEVER** use raw HTML `<img>` tags or the Next.js `<Image>` component directly.

### Why Use OptimizedImage

The `OptimizedImage` component provides:

1. **Responsive Images**: Automatically uses mobile and desktop optimized versions when available
2. **Performance**: Uses HTML `<picture>` element for proper responsive image loading
3. **Auto-detection**: Automatically detects optimized versions with `-mobile` and `-desktop` suffixes
4. **LCP Optimization**: Proper `loading` and `fetchPriority` attributes for Core Web Vitals
5. **Graceful Fallback**: Falls back to base image if optimized versions don't exist
6. **Server-side Rendering**: Works as an async server component for SSR compatibility

### Import Statement

```typescript
import { OptimizedImage } from "@/components/ui/optimized-image";
```

### Component Props

```typescript
interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string; // Required: Path to the image
  alt: string; // Required: Alt text for accessibility
  siteId?: string; // Optional: Site identifier
  className?: string; // Optional: CSS classes
  mobileSrc?: string; // Optional: Custom mobile image source
  desktopSrc?: string; // Optional: Custom desktop image source
  originalWidth?: number; // Optional: Original image width
  originalHeight?: number; // Optional: Original image height
  title?: string; // Optional: Image title attribute
  priority?: boolean; // Optional: Set to true for above-the-fold images (LCP)
  // ...all other Next.js Image props
}
```

### Usage Examples

**❌ WRONG - Don't use raw HTML img tags:**

```tsx
<img src="/images/hero.jpg" alt="Hero image" className="h-auto w-full" />
```

**❌ WRONG - Don't use Next.js Image directly:**

```tsx
import Image from "next/image";

<Image src="/images/hero.jpg" alt="Hero image" width={1200} height={800} />;
```

**✅ CORRECT - Use OptimizedImage component:**

```tsx
import { OptimizedImage } from "@/components/ui/optimized-image";

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  className="h-auto w-full"
  priority={true} // For above-the-fold images
/>;
```

### Common Use Cases

#### Hero Section Images (Above the Fold)

```tsx
<OptimizedImage
  src={imageSrc}
  alt={imageAlt}
  className="h-full w-full object-cover"
  priority={true} // Important for LCP
  sizes="100vw"
/>
```

#### Card Images

```tsx
<OptimizedImage
  src={cardImage}
  alt={cardTitle}
  className="h-48 w-full rounded-t-lg object-cover"
  sizes="(max-width: 767px) 100vw, 33vw"
/>
```

#### Responsive Images with Custom Sources

```tsx
<OptimizedImage
  src={defaultImage}
  mobileSrc={mobileImage}
  desktopSrc={desktopImage}
  alt={imageDescription}
  className="h-auto w-full"
/>
```

#### Images with Known Dimensions

```tsx
<OptimizedImage
  src={productImage}
  alt={productName}
  originalWidth={800}
  originalHeight={600}
  className="h-auto max-w-full"
/>
```

### Important Rules

1. **ALWAYS** use `OptimizedImage` for any image in components
2. **ALWAYS** provide meaningful `alt` text for accessibility
3. **SET** `priority={true}` for above-the-fold images (hero sections, first visible images)
4. **USE** appropriate `sizes` attribute for responsive behavior
5. **INCLUDE** `className` for styling (the component passes it through)
6. **NEVER** use raw `<img>` tags or Next.js `<Image>` component directly

### Verification Checklist

When converting or creating components with images:

- [ ] All `<img>` tags replaced with `<OptimizedImage>`
- [ ] All `<Image>` (Next.js) components replaced with `<OptimizedImage>`
- [ ] All images have descriptive `alt` text
- [ ] Above-the-fold images have `priority={true}`
- [ ] Appropriate `sizes` attribute is set for responsive images
- [ ] Decorative images have `alt=""` (empty string)
- [ ] Images have proper aspect ratio handling via CSS classes

---

### Zod Schema Creation (CRITICAL)

**Every component MUST have a Zod schema file** located next to the component file.

#### Step 1: Create Schema File

Create a file named `ComponentName.schema.ts` in the same directory as your component (e.g., `src/components/blocks/ComponentName/ComponentName.schema.ts`).

#### Step 2: Define Zod Schema

The schema file should follow this structure:

```typescript
import { z } from "zod";

/**
 * ComponentName Zod Schema
 * This is the single source of truth for ComponentName props
 *
 * Define props once here, and get:
 * - TypeScript types (via z.infer)
 * - Runtime validation (via Zod)
 * - ComponentSchema generation (via zodSchemaToComponentSchema)
 */
export const ComponentNameZodSchema = z.object({
  // Required props
  title: z.string().describe("Main heading for the component"),

  // Optional props
  id: z
    .string()
    .optional()
    .describe("Optional unique identifier for the component"),

  description: z.string().optional().describe("Optional description text"),

  // Enums
  variant: z
    .enum(["default", "secondary"])
    .optional()
    .default("default")
    .describe("Visual variant of the component"),

  // Arrays
  items: z.array(z.any()).optional().describe("Array of items to display"),

  // Numbers with defaults
  maxWidth: z
    .number()
    .optional()
    .default(1200)
    .describe("Maximum width in pixels"),

  // Strings with defaults
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes for custom styling"),
});

// Infer TypeScript type from Zod schema
// This is the TypeScript type - automatically generated from the Zod schema above!
export type ComponentNamePropsFromZod = z.infer<
  typeof ComponentNameZodSchema
> & { type: "ComponentName" };
```

#### Step 3: Use Zod-Inferred Types in Component

In your component file (`ComponentName.tsx`), import and use the Zod-inferred type:

```typescript
import type { ComponentNamePropsFromZod } from "./ComponentName.schema";

// Use the Zod-inferred type instead of manually defining props
const ComponentName: React.FC<Omit<ComponentNamePropsFromZod, "type">> = ({
  title,
  description,
  // ... other props
}) => {
  // Component implementation
};
```

**DO NOT** manually define a props interface. Use the Zod-inferred type as the single source of truth.

#### Step 4: Export Type in Index File

In your `index.ts` file, export the Zod-inferred type:

```typescript
export { default } from "./ComponentName";
export type { ComponentNamePropsFromZod } from "./ComponentName.schema";
```

### Component Registration in component-schemas.ts (CRITICAL)

**Every component MUST be registered** in `src/lib/component-schemas.ts` to enable validation and documentation.

#### Step 1: Import Zod Schema

At the top of `src/lib/component-schemas.ts`, add the import:

```typescript
import { ComponentNameZodSchema } from "@/components/blocks/ComponentName/ComponentName.schema";
import type { ComponentNamePropsFromZod } from "@/components/blocks/ComponentName/ComponentName.schema";
```

#### Step 2: Add to Type Exports

In the `export type { ... }` block, add:

```typescript
export type {
  // ... existing types
  ComponentNamePropsFromZod,
};
```

#### Step 3: Register in componentSchemaRegistry

Add an entry to the `componentSchemaRegistry` array:

```typescript
const componentSchemaRegistry: ComponentSchemaConfig[] = [
  // ... existing entries
  {
    type: "ComponentName",
    name: "Component Name", // Human-readable name
    description:
      "A clear, concise description of what this component does and when to use it. Include key features and use cases.",
    zodSchema: ComponentNameZodSchema,
  },
];
```

**Important Notes:**

- The `type` must match the component type string exactly (e.g., "ComponentName")
- The `name` should be a human-readable display name (e.g., "Component Name")
- The `description` should be comprehensive and explain the component's purpose
- The `zodSchema` must reference the imported Zod schema

#### Step 4: Update Component Interface (if needed)

If the component has an interface in `component-schemas.ts`, update it to extend the Zod-inferred type:

```typescript
export interface ComponentNameComponent
  extends ComponentNamePropsFromZod,
    BaseComponent {
  type: "ComponentName";
}
```

### Schema Best Practices

1. **Use Descriptive Names**: Choose clear, descriptive names for schema exports (e.g., `ComponentNameZodSchema`, `ComponentNamePropsFromZod`)

2. **Add Descriptions**: Use `.describe()` on all schema fields to document what each prop does

3. **Set Defaults**: Use `.default()` for props that have default values

4. **Mark Required vs Optional**:
   - Required: `z.string().describe("...")`
   - Optional: `z.string().optional().describe("...")`

5. **Use Appropriate Types**:
   - Strings: `z.string()`
   - Numbers: `z.number()`
   - Booleans: `z.boolean()`
   - Arrays: `z.array(z.any())` or `z.array(z.object({...}))`
   - Enums: `z.enum(["option1", "option2"])`
   - Objects: `z.object({...})`

6. **Complex Types**: For complex nested objects, use `z.any()` or define nested schemas

7. **Always Include `type` Field**: The inferred type should always include `& { type: "ComponentName" }` to match the component type system

### Components to Skip

- ❌ FAQ components
- ❌ Lexikon (glossary) components
- ❌ Navigation components
- ❌ Header components

**Note**: FAQ and Lexikon components are handled separately in Part 2 below.

---

## Part 2: Special Handling for FAQ and Lexikon Components

### Overview

For **FAQ** and **Lexikon** components, we use a different approach:

- **Reuse** the existing components from `src/components/blocks/FAQ/FAQ.tsx` and `src/components/blocks/Lexikon/Lexikon.tsx`
- **Transfer** the visual design from the new components to the existing ones
- **Preserve** all existing functionality, logic, and features

---

## FAQ Component Design Transfer

### Existing Component Location

- **File**: `src/components/blocks/FAQ/FAQ.tsx`
- **Component**: `FAQ`

### Critical Functionality to Preserve

#### 1. **Component Interface & Props**

- **DO NOT MODIFY** the `FaqProps` interface
- **DO NOT REMOVE** any props from the component
- All existing props must remain functional:
  - `title`, `subtitle`, `underline`
  - `items` (supports both `FaqItem[]` and `FaqGroup[]`)
  - All className props (for styling flexibility)
  - `showTitle`, `sectionId`, `enableAnchorLinks`
  - `ariaLabel`, `ariaDescribedBy`
  - `renderAsH1`, `pageUrl`, `pageTitle`, `enableSchema`

#### 2. **Core Logic Functions (DO NOT MODIFY)**

- **`getAllFaqItems()`**: Handles both grouped and ungrouped FAQ items
- **`generateFAQSchema()`**: Generates FAQPage schema.org structured data
- **`createSlug()`**: Creates URL-friendly slugs for anchor links
- **Group detection logic**: `isGrouped` check for `FaqGroup[]` vs `FaqItem[]`

#### 3. **Structured Data (Schema.org)**

- **FAQPage schema generation**: Must be preserved
- **Script injection**: Next.js Script component for JSON-LD
- **HTML stripping**: For clean schema data

#### 4. **Accessibility Features**

- **ARIA labels**: `aria-label`, `aria-labelledby`, `aria-describedby`
- **Semantic HTML**: Section element with proper IDs
- **Heading component**: Must use `@/components/blocks/Heading` (not raw HTML)
- **Anchor links**: URL hash updates for deep linking

#### 5. **Component Structure**

- **Accordion component**: Uses shadcn/ui Accordion
- **Grouped FAQs**: Support for `FaqGroup[]` with group headings
- **Conditional rendering**: Based on `showTitle`, `enableSchema`, etc.

### Design Transfer Process for FAQ

#### Step 1: Analyze the New Design

Identify all visual elements:

- Title and subtitle styling
- Accordion container appearance
- Accordion item styling (borders, spacing, background)
- Accordion trigger/button appearance
- Accordion content/answer styling
- Group heading appearance (if applicable)
- Typography (fonts, sizes, weights, colors)
- Spacing and padding
- Borders, shadows, rounded corners
- Hover states and transitions
- Active/expanded states
- Responsive breakpoints

#### Step 2: Map Design Elements to Existing Structure

| New Design Element  | Existing Component Section | What Can Change                      |
| ------------------- | -------------------------- | ------------------------------------ |
| Section container   | Lines 209-319              | Background, padding, spacing         |
| Title wrapper       | Lines 220-238              | Layout, alignment, spacing           |
| Title heading       | Lines 221-228              | Typography, colors, size             |
| Subtitle            | Lines 229-236              | Typography, colors, spacing          |
| Accordion container | Lines 243-316              | Background, padding, spacing         |
| Group heading       | Lines 269-276              | Typography, colors, border, spacing  |
| Accordion item      | Lines 278-312              | Border, padding, spacing, background |
| Accordion trigger   | Lines 282-297              | Typography, colors, hover states     |
| Accordion content   | Lines 298-311              | Typography, colors, spacing          |
| Answer text         | Lines 306-309              | Typography, colors, line-height      |

#### Step 3: Apply Design Changes

**ONLY modify:**

- CSS classes (className props and inline styles)
- Component structure for layout (divs, flexbox, grid) - but keep semantic meaning
- Visual styling (colors, fonts, spacing, borders, shadows)
- Responsive breakpoints
- Default className values (lines 74-98)

**DO NOT modify:**

- Function logic
- Props interface
- Data processing (getAllFaqItems, generateFAQSchema)
- Event handlers (onClick for anchor links)
- Component imports (unless adding new UI components)
- Function signatures
- Conditional rendering logic (only styling within conditions)
- Schema generation logic
- HTML content handling

#### Step 4: Verification Checklist

- [ ] All props still work as expected
- [ ] Grouped FAQs display correctly with group headings
- [ ] Ungrouped FAQs display correctly
- [ ] Anchor links work (hash navigation in URL)
- [ ] Accordion expand/collapse works
- [ ] Schema.org structured data is generated correctly
- [ ] Schema includes all FAQ items (grouped and ungrouped)
- [ ] HTML content in questions/answers renders correctly
- [ ] Heading hierarchy is correct (check HTML output)
- [ ] ARIA attributes are intact
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] Focus indicators are visible and high contrast
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Content is readable at 200% zoom

---

## Lexikon Component Design Transfer

### Existing Component Location

- **File**: `src/components/blocks/Lexikon/Lexikon.tsx`
- **Component**: `Lexikon`

### Critical Functionality to Preserve

#### 1. **Component Interface & Props**

- **DO NOT MODIFY** the `LexikonProps` interface
- **DO NOT REMOVE** any props from the component
- All existing props must remain functional:
  - `lexicon` (required)
  - `title`, `subtitle`, `icon`, `iconAriaLabel`, `iconOnTop`
  - `imageSrc`, `imageAlt`
  - `showHero`, `showImage`, `showTableOfContents`
  - `headingLevel`
  - All className props (for styling flexibility)
  - `tableOfContentsTitle`, `sortBy`, `locale`
  - `children`

#### 2. **Core Logic Functions (DO NOT MODIFY)**

- **`createAnchorId(term: string)`**: Creates URL-friendly anchor IDs
- **`getFirstTermForLetter(letter: string)`**: Finds first term for alphabet navigation
- **`renderTextWithLinks(text: string, currentTerm: string)`**:
  - Automatically detects lexicon terms within definitions
  - Creates clickable links to other entries
  - Handles overlapping matches correctly
  - Uses SmoothScrollButton for smooth scrolling

#### 3. **Data Processing**

- **Alphabetical sorting**: `sortedLexiconEntries` and `sortedLexicon` logic
- **Alphabet generation**: `alphabet` array for navigation
- **Locale-aware sorting**: Uses `locale` prop

#### 4. **Navigation & Smooth Scrolling**

- **SmoothScrollButton components**: For alphabet navigation and cross-references
- **Scroll offset**: `scrollOffset={80}` must be preserved
- **Anchor IDs**: All entries must have proper `id` attributes

#### 5. **SEO & Accessibility Features**

- **Heading component**: Must use `@/components/blocks/Heading`
- **Heading hierarchy**: Proper level calculation
- **ARIA labels**: Icon accessibility attributes
- **Semantic HTML**: Section, div structure

#### 6. **Component Structure**

- **Hero section**: Conditional rendering based on `showHero`
- **Image display**: Conditional based on `showImage`
- **Table of contents**: Conditional based on `showTableOfContents`
- **Card wrapper**: Uses `Card` and `CardContent` from `@/components/ui/card`
- **Children rendering**: Support for additional content

### Design Transfer Process for Lexikon

#### Step 1: Analyze the New Design

Identify all visual elements:

- Hero section layout and styling
- Image placement and styling
- Table of contents appearance
- Entry card/item styling
- Typography (fonts, sizes, weights)
- Colors and color schemes
- Spacing and padding
- Borders, shadows, rounded corners
- Hover states and transitions
- Responsive breakpoints

#### Step 2: Map Design Elements to Existing Structure

| New Design Element          | Existing Component Section | What Can Change                      |
| --------------------------- | -------------------------- | ------------------------------------ |
| Hero section                | Lines 213-288              | Styling, layout, spacing             |
| Image                       | Lines 216-232              | Size, position, styling              |
| Title/Subtitle              | Lines 254-270              | Typography, colors, spacing          |
| Icon                        | Lines 241-252, 271-283     | Size, color, position                |
| Table of Contents container | Lines 304-342              | Background, padding, border-radius   |
| Alphabet buttons            | Lines 323-339              | Colors, size, hover states, spacing  |
| Entry container             | Lines 350-368              | Border, padding, spacing, background |
| Term heading                | Line 356-361               | Typography, color, size              |
| Definition text             | Lines 362-367              | Typography, color, spacing           |
| Links in definitions        | Lines 180-189              | Colors, hover states, underline      |

#### Step 3: Apply Design Changes

**ONLY modify:**

- CSS classes (className props and inline styles)
- Component structure for layout (divs, flexbox, grid) - but keep semantic meaning
- Visual styling (colors, fonts, spacing, borders, shadows)
- Responsive breakpoints

**DO NOT modify:**

- Function logic
- Props interface
- Event handlers
- Data processing
- Component imports (unless adding new UI components)
- Function signatures
- Conditional rendering logic (only styling within conditions)

#### Step 4: Verification Checklist

- [ ] All props still work as expected
- [ ] Alphabet navigation buttons still scroll to correct sections
- [ ] Cross-references in definitions are still clickable and scroll correctly
- [ ] Smooth scrolling works with proper offset
- [ ] Entries are sorted alphabetically
- [ ] Anchor IDs are generated correctly (check browser console for hash navigation)
- [ ] Hero section shows/hides based on `showHero` prop
- [ ] Image shows/hides based on `showImage` prop
- [ ] Table of contents shows/hides based on `showTableOfContents` prop
- [ ] Icon positioning works with `iconOnTop` prop
- [ ] Heading hierarchy is correct (check HTML output, no skipped levels)
- [ ] Children prop still renders additional content
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Keyboard navigation works (Tab, Enter, Space, Arrow keys)
- [ ] Focus indicators are visible and high contrast
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text, 3:1 for UI)
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Content is readable at 200% zoom
- [ ] Images have descriptive alt text

---

## Implementation Workflow

### Step 1: Identify Component Type

For each component in `./repo-to-convert/src/components`:

1. **Check if it's FAQ or Lexikon**:
   - If **FAQ** → Go to Part 2: FAQ Design Transfer
   - If **Lexikon** → Go to Part 2: Lexikon Design Transfer
   - If **Navigation/Header** → Skip
   - Otherwise → Go to Part 1: Standard Conversion

### Step 2: Execute Appropriate Process

#### For Standard Components:

1. **Review CSS Files**:
   - Read all CSS files in `data/herokit_conversion/css/` folder
   - Identify CSS variables, utility classes, and component-specific styles
   - Plan variable mapping and style migration

2. **Convert CSS Variables and Styles**:
   - Map HSL format variables to shadcn variables (oklch format)
   - Move reusable utility classes to `src/app/globals.css`
   - Convert component-specific styles to Tailwind classes

3. **Create Zod Schema File**:
   - Create `ComponentName.schema.ts` next to the component file
   - Define all props using Zod with proper types, defaults, and descriptions
   - Export `ComponentNameZodSchema` and `ComponentNamePropsFromZod` type

4. **Read the Example Component Structure**:
   - Review `data/herokit_conversion/example_component` for structure reference
   - Understand the component pattern and prop usage

5. **Convert the New Component**:
   - Match the structure and functionality of the example component
   - Use the Zod-inferred type (`ComponentNamePropsFromZod`) instead of manually defining props
   - Import type from `./ComponentName.schema`
   - **Replace all custom CSS classes with Tailwind utility classes**
   - **Use shadcn CSS variables** (e.g., `bg-primary`, `text-foreground`) instead of custom variables

6. **Register Component in component-schemas.ts**:
   - Import the Zod schema and type in `src/lib/component-schemas.ts`
   - Add the type to the `export type { ... }` block
   - Add entry to `componentSchemaRegistry` array with type, name, description, and zodSchema
   - Update component interface if it exists

7. **Create manifest.json**:
   - Create `manifest.json` matching the structure of the example component manifest

8. **Create index.ts File**:
   - Export the component as default
   - Export the `ComponentNamePropsFromZod` type from the schema file

9. **Ensure Accessibility Compliance**:
   - Follow WCAG 2.1 Level AA guidelines
   - Use semantic HTML
   - Add proper ARIA attributes
   - Test keyboard navigation

10. **Apply Design Tokens**:
    - Use primary, secondary, accent colors from shadcn variables
    - Follow design system patterns
    - Verify all styles use Tailwind classes or shadcn variables

#### For FAQ Component:

1. **Review CSS Files**:
   - Read CSS files in `data/herokit_conversion/css/` for FAQ-related styles
   - Identify CSS variables and utility classes used by FAQ component

2. **Convert CSS Variables and Styles**:
   - Map HSL format variables to shadcn variables
   - Move reusable FAQ styles to `src/app/globals.css` if needed
   - Convert FAQ-specific styles to Tailwind classes

3. Locate existing component: `src/components/blocks/FAQ/FAQ.tsx`
4. Read the new FAQ design from `./repo-to-convert/src/components/FAQ`
5. Follow the Design Transfer Process for FAQ (see above)
6. Transfer visual design only (styling, classes, layout)
   - **Replace custom CSS classes with Tailwind utilities**
   - **Use shadcn CSS variables** for colors
7. Preserve all functionality (see verification checklist above)
8. Test thoroughly

#### For Lexikon Component:

1. **Review CSS Files**:
   - Read CSS files in `data/herokit_conversion/css/` for Lexikon-related styles
   - Identify CSS variables and utility classes used by Lexikon component

2. **Convert CSS Variables and Styles**:
   - Map HSL format variables to shadcn variables
   - Move reusable Lexikon styles to `src/app/globals.css` if needed
   - Convert Lexikon-specific styles to Tailwind classes

3. Locate existing component: `src/components/blocks/Lexikon/Lexikon.tsx`
4. Read the new Lexikon design from `./repo-to-convert/src/components/Lexikon`
5. Follow the Design Transfer Process for Lexikon (see above)
6. Transfer visual design only (styling, classes, layout)
   - **Replace custom CSS classes with Tailwind utilities**
   - **Use shadcn CSS variables** for colors
7. Preserve all functionality (see verification checklist above)
8. Test thoroughly

### Step 3: Testing

For **all components** (standard, FAQ, Lexikon):

1. **Visual Testing**: Compare with new design
2. **Functional Testing**:
   - Test all props and configurations
   - Test responsive breakpoints
   - Test interactive elements
3. **Accessibility Testing**:
   - Check heading hierarchy
   - Verify ARIA labels
   - Test keyboard navigation
   - Test screen reader compatibility
   - Verify focus management
   - Check color contrast ratios
   - Test with zoom (up to 200%)
   - Verify touch target sizes
   - Run automated accessibility audit (axe, WAVE, Lighthouse)
   - Test with actual assistive technologies
4. **SEO Testing** (for FAQ/Lexikon):
   - Verify structured data (FAQ schema)
   - Check semantic HTML

---

## Important Rules

### For Standard Components:

- ✅ **Review and convert CSS** from `data/herokit_conversion/css/` folder
- ✅ **Convert CSS variables** from HSL to shadcn format (oklch) or map to existing variables
- ✅ **Move reusable styles** to `src/app/globals.css` in appropriate layers
- ✅ **Replace custom CSS classes** with Tailwind utility classes in components
- ✅ **Create Zod schema file** (`ComponentName.schema.ts`) with all props defined
- ✅ **Register component** in `src/lib/component-schemas.ts` in the `componentSchemaRegistry` array
- ✅ **Use Zod-inferred types** (`ComponentNamePropsFromZod`) - DO NOT manually define props interfaces
- ✅ Match example component structure
- ✅ Create manifest.json and index.ts
- ✅ Use design tokens (primary, secondary, accent) from shadcn variables
- ✅ Meet WCAG guidelines
- ✅ **Use `<OptimizedImage>`** for all images - NEVER use raw `<img>` or Next.js `<Image>` directly

### For FAQ and Lexikon:

- ✅ **Review and convert CSS** from `data/herokit_conversion/css/` folder
- ✅ **Convert CSS variables** to shadcn format or map to existing variables
- ✅ **Replace custom CSS classes** with Tailwind utilities
- ✅ **Reuse existing components** (don't create new ones)
- ✅ **Transfer design only** (styling, classes, layout)
- ✅ **Preserve all functionality** (logic, props, features)
- ❌ **DO NOT modify** function logic
- ❌ **DO NOT modify** props interface
- ❌ **DO NOT remove** any features

### General:

- ✅ Use `@/components/blocks/Heading` instead of raw HTML headings
- ✅ Use `@/components/ui/optimized-image` (`<OptimizedImage>`) instead of raw `<img>` or Next.js `<Image>`
- ✅ Maintain semantic HTML structure
- ✅ Ensure TypeScript types are correct
- ✅ Test thoroughly before completing

---

## Completion Criteria

The task is complete when:

1. ✅ All CSS files in `data/herokit_conversion/css/` have been reviewed
2. ✅ All CSS variables have been converted from HSL to shadcn format (oklch) or mapped to existing variables
3. ✅ Reusable utility classes have been moved to `src/app/globals.css` in appropriate layers
4. ✅ All component-specific CSS classes have been removed and replaced with Tailwind classes
5. ✅ All standard components are converted (except FAQ, Lexikon, Navigation, Header)
6. ✅ **Every component has a Zod schema file** (`ComponentName.schema.ts`) with all props defined
7. ✅ **Every component is registered** in `src/lib/component-schemas.ts` in the `componentSchemaRegistry` array
8. ✅ **All components use Zod-inferred types** (`ComponentNamePropsFromZod`) instead of manually defined props interfaces
9. ✅ All Zod schemas are properly imported and exported in `component-schemas.ts`
10. ✅ FAQ component design is transferred to existing component (with CSS conversion)
11. ✅ Lexikon component design is transferred to existing component (with CSS conversion)
12. ✅ All components meet accessibility standards
13. ✅ All components use design tokens from shadcn variables (primary, secondary, accent)
14. ✅ All functionality is preserved
15. ✅ All tests pass
16. ✅ TypeScript compiles without errors
17. ✅ No duplicate prop definitions exist (Zod schema is the single source of truth)
18. ✅ No unused CSS remains in conversion CSS files
19. ✅ Visual appearance matches the original design after CSS conversion
20. ✅ All images use `<OptimizedImage>` component - no raw `<img>` or Next.js `<Image>` components

**Do not stop until your task is done.**

---

## Comprehensive Accessibility Requirements

All components must meet **WCAG 2.1 Level AA** standards. This includes but is not limited to:

### 1. **Semantic HTML**

- ✅ Use proper HTML5 semantic elements (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<aside>`)
- ✅ Use appropriate heading hierarchy (H1 → H2 → H3 → H4 → H5 → H6) - never skip levels
- ✅ Use `<button>` for interactive buttons, not `<div>` or `<span>`
- ✅ Use `<a>` for links, not clickable divs
- ✅ Use form elements (`<input>`, `<select>`, `<textarea>`, `<label>`) correctly
- ✅ Use list elements (`<ul>`, `<ol>`, `<li>`) for lists
- ✅ Use `<table>` elements with proper headers for tabular data

### 2. **ARIA (Accessible Rich Internet Applications)**

- ✅ Use ARIA labels when text labels are not visible (`aria-label`)
- ✅ Use `aria-labelledby` to reference visible labels
- ✅ Use `aria-describedby` for additional descriptions
- ✅ Use `aria-hidden="true"` for decorative elements only
- ✅ Use `role` attributes when semantic HTML is not available
- ✅ Use `aria-expanded` for collapsible content (accordions, dropdowns)
- ✅ Use `aria-controls` to link controls to their content
- ✅ Use `aria-current` for current page/step indicators
- ✅ Use `aria-live` regions for dynamic content updates
- ✅ Use `aria-required` and `aria-invalid` for form validation
- ✅ **DO NOT** use ARIA when native HTML provides the same functionality

### 3. **Keyboard Navigation**

- ✅ All interactive elements must be keyboard accessible
- ✅ Tab order should follow visual order and logical flow
- ✅ Focus indicators must be visible (minimum 2px outline, high contrast)
- ✅ Focus should not be trapped unless necessary (modals, dropdowns)
- ✅ Escape key should close modals, dropdowns, and overlays
- ✅ Arrow keys should work for navigation in lists, menus, carousels
- ✅ Enter/Space should activate buttons and links
- ✅ Skip links should be provided for main content navigation
- ✅ Focus management for dynamic content (focus moves to new content)

### 4. **Color and Contrast**

- ✅ Text contrast ratio: **4.5:1** for normal text (14px+), **3:1** for large text (18px+)
- ✅ UI component contrast: **3:1** for non-text content (buttons, form controls, icons)
- ✅ **DO NOT** rely solely on color to convey information
- ✅ Use icons, text, or patterns in addition to color
- ✅ Ensure focus indicators have sufficient contrast
- ✅ Test with color blindness simulators (protanopia, deuteranopia, tritanopia)

### 5. **Images and Media**

- ✅ **ALWAYS use `<OptimizedImage>`** from `@/components/ui/optimized-image` for all images
- ✅ **NEVER use** raw `<img>` tags or Next.js `<Image>` component directly
- ✅ All images must have descriptive `alt` text
- ✅ Decorative images should have `alt=""` (empty string)
- ✅ Complex images (charts, graphs) need detailed descriptions
- ✅ Video content must have captions
- ✅ Audio content must have transcripts
- ✅ Provide controls for auto-playing media
- ✅ Set `priority={true}` for above-the-fold images (LCP optimization)

### 6. **Forms and Inputs**

- ✅ All form inputs must have associated `<label>` elements
- ✅ Use `aria-describedby` for help text and error messages
- ✅ Use `aria-required="true"` for required fields
- ✅ Use `aria-invalid="true"` for fields with errors
- ✅ Error messages must be announced to screen readers
- ✅ Provide clear instructions and validation feedback
- ✅ Group related fields with `<fieldset>` and `<legend>`

### 7. **Interactive Components**

- ✅ Buttons must have accessible names (text content or `aria-label`)
- ✅ Links must have descriptive text (avoid "click here", "read more")
- ✅ Disabled buttons should be announced as disabled
- ✅ Loading states should be announced (`aria-busy="true"`)
- ✅ Status changes should be announced (`aria-live` regions)
- ✅ Accordions must have proper `aria-expanded` states
- ✅ Modals must trap focus and restore it on close
- ✅ Dropdowns must be keyboard navigable

### 8. **Responsive and Mobile**

- ✅ Touch targets must be at least **44x44 pixels** (iOS) or **48x48 pixels** (Android)
- ✅ Ensure sufficient spacing between interactive elements
- ✅ Content must be readable at 200% zoom without horizontal scrolling
- ✅ Text should not require horizontal scrolling at 320px width
- ✅ Interactive elements should not overlap

### 9. **Screen Reader Compatibility**

- ✅ Test with screen readers (NVDA, JAWS, VoiceOver, TalkBack)
- ✅ Ensure all content is announced in logical order
- ✅ Provide skip links for repetitive content
- ✅ Use `aria-hidden="true"` for decorative elements
- ✅ Ensure dynamic content updates are announced
- ✅ Provide text alternatives for all non-text content

### 10. **Motion and Animation**

- ✅ Respect `prefers-reduced-motion` media query
- ✅ Provide option to disable animations
- ✅ Ensure animations don't cause seizures (no flashing >3 times/second)
- ✅ Pause, stop, or hide auto-updating content

### 11. **Language and Content**

- ✅ Use `lang` attribute on `<html>` element
- ✅ Mark language changes with `lang` attribute
- ✅ Use clear, simple language
- ✅ Provide definitions for abbreviations and jargon
- ✅ Ensure text is readable (appropriate font size, line height, spacing)

### 12. **Testing Checklist**

Before completing any component, verify:

- [ ] ✅ All interactive elements are keyboard accessible
- [ ] ✅ Focus indicators are visible and high contrast
- [ ] ✅ All images use `<OptimizedImage>` component (no raw `<img>` or Next.js `<Image>`)
- [ ] ✅ All images have appropriate alt text
- [ ] ✅ Color contrast meets WCAG AA standards (4.5:1 for text, 3:1 for UI)
- [ ] ✅ Heading hierarchy is correct (no skipped levels)
- [ ] ✅ ARIA attributes are used correctly
- [ ] ✅ Forms have proper labels and error handling
- [ ] ✅ Content is readable at 200% zoom
- [ ] ✅ Touch targets are at least 44x44px
- [ ] ✅ Screen reader announces content correctly
- [ ] ✅ No keyboard traps (except intentional ones like modals)
- [ ] ✅ Dynamic content updates are announced
- [ ] ✅ Reduced motion preferences are respected
- [ ] ✅ Automated accessibility audit passes (axe, WAVE, Lighthouse)

### 13. **Tools for Testing**

- **Automated Testing**:
  - axe DevTools browser extension
  - WAVE browser extension
  - Lighthouse (Chrome DevTools)
  - Pa11y command-line tool
  - ESLint with eslint-plugin-jsx-a11y

- **Manual Testing**:
  - Keyboard-only navigation
  - Screen readers (NVDA, JAWS, VoiceOver, TalkBack)
  - Color contrast checkers
  - Zoom testing (up to 200%)
  - Mobile device testing

- **Browser DevTools**:
  - Accessibility tree inspection
  - ARIA attribute verification
  - Color contrast calculation
  - Focus indicator testing
