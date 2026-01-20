# TableOfContents Component

## Description

The `TableOfContents` component is a sticky sidebar navigation that automatically displays headings from your content and highlights the active section as users scroll. It provides smooth scrolling navigation and matches the design pattern from gutachten.org. Perfect for long-form articles, documentation, and blog posts.

## Features

- **Automatic Heading Extraction**: Works with headings extracted from markdown content
- **Active Section Highlighting**: Automatically highlights the current section using Intersection Observer
- **Smooth Scrolling**: Smooth scroll navigation to sections with configurable offset
- **Sticky Positioning**: Stays visible while scrolling through content
- **Customizable Styling**: Flexible CSS classes for all elements
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Client-Side**: Uses 'use client' for browser API access
- **Responsive**: Works on desktop and mobile (hidden on mobile by default in typical layouts)

## Props

| Prop                      | Type       | Default              | Required | Description                                           |
| ------------------------- | ---------- | -------------------- | -------- | ----------------------------------------------------- |
| `headings`                | `Heading[]`| -                    | ✅       | Array of heading objects with id, text, and level    |
| `className`                | `string`   | `''`                 | ❌       | Additional CSS classes for the wrapper                |
| `title`                    | `string`   | `'Themenübersicht'`  | ❌       | Title text for the table of contents                  |
| `titleClassName`           | `string`   | `''`                 | ❌       | Additional CSS classes for the title                  |
| `containerClassName`      | `string`   | `''`                 | ❌       | Additional CSS classes for the container              |
| `stickyTop`                | `string`   | `'top-24'`           | ❌       | CSS class for sticky positioning                      |
| `scrollOffset`             | `number`   | `100`                | ❌       | Offset in pixels from target element when scrolling   |
| `activeHeadingClassName`   | `string`   | `''`                 | ❌       | Custom CSS classes for active heading links           |
| `inactiveHeadingClassName`| `string`   | `''`                 | ❌       | Custom CSS classes for inactive heading links         |
| `ariaLabel`                | `string`   | `'Table of contents'`| ❌       | ARIA label for accessibility                         |

## Heading Interface

The `headings` prop expects an array of objects with the following structure:

```typescript
interface Heading {
  id: string;      // URL-friendly ID (e.g., "section-1")
  text: string;    // Display text (e.g., "Introduction")
  level: number;   // Heading level (2-6 for H2-H6)
}
```

## Usage Examples

### Basic Usage

```tsx
import { TableOfContents } from "@/components/blocks/TableOfContents";
import { extractHeadings } from "@/lib/extract-headings";

// In your component
const headings = extractHeadings(articleContent);

<TableOfContents headings={headings} />
```

### With Custom Title

```tsx
<TableOfContents
  headings={headings}
  title="Contents"
/>
```

### Custom Styling

```tsx
<TableOfContents
  headings={headings}
  title="Table of Contents"
  stickyTop="top-20"
  scrollOffset={80}
  containerClassName="shadow-lg"
  titleClassName="text-lg"
/>
```

### With Custom Active/Inactive Styles

```tsx
<TableOfContents
  headings={headings}
  activeHeadingClassName="font-bold text-primary"
  inactiveHeadingClassName="text-gray-600 hover:text-primary"
/>
```

### Full Example in Article Page

```tsx
import { TableOfContents } from "@/components/blocks/TableOfContents";
import { extractHeadings } from "@/lib/extract-headings";

export default function ArticlePage({ article }) {
  const headings = extractHeadings(article.content);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      <aside className="hidden lg:block">
        <TableOfContents headings={headings} />
      </aside>
      <article>
        <MarkdownRenderer content={article.content} />
      </article>
    </div>
  );
}
```

## Integration with MarkdownRenderer

The component works seamlessly with the `MarkdownRenderer` component, which automatically adds IDs to headings:

```tsx
// MarkdownRenderer adds IDs to headings automatically
<MarkdownRenderer content={content} />

// Extract headings for TOC
const headings = extractHeadings(content);

// Display TOC
<TableOfContents headings={headings} />
```

## Styling

### Default Styles

- **Container**: White background with rounded corners and padding
- **Title**: Bold, dark gray text
- **Active Link**: Semibold, dark gray
- **Inactive Link**: Normal weight, medium gray with hover effect
- **Indentation**: Nested headings are indented based on level

### Customization

You can customize any aspect using the provided className props:

```tsx
<TableOfContents
  headings={headings}
  className="max-w-xs" // Wrapper
  containerClassName="bg-gray-50 border border-gray-200" // Container
  titleClassName="text-xl text-primary" // Title
  activeHeadingClassName="text-primary font-bold" // Active links
  inactiveHeadingClassName="text-gray-500" // Inactive links
/>
```

## Behavior

### Active Section Detection

The component uses Intersection Observer to detect which section is currently visible:

- **Root Margin**: `-20% 0px -60% 0px` (triggers when heading is in top 20% of viewport)
- **Threshold**: `0` (triggers as soon as any part is visible)
- **Initial State**: Sets the first heading as active if it's already in view

### Smooth Scrolling

When a heading is clicked:

1. Prevents default anchor behavior
2. Calculates scroll position with offset
3. Smoothly scrolls to the target
4. Updates URL hash without triggering additional scroll

### Sticky Positioning

The component uses CSS `sticky` positioning:

- Default: `top-24` (96px from top)
- Adjustable via `stickyTop` prop
- Only works when parent container has enough height

## Accessibility

- **Semantic HTML**: Uses `<nav>` and proper heading structure
- **ARIA Labels**: Configurable `ariaLabel` prop
- **Keyboard Navigation**: Standard anchor link keyboard support
- **Screen Readers**: Properly announced as navigation landmark

## Performance

- **Intersection Observer**: Efficient scroll detection without scroll listeners
- **Minimal Re-renders**: Only updates active state when section changes
- **Client-Side Only**: No server-side overhead

## Best Practices

1. **Extract Headings on Server**: Use `extractHeadings()` in server components
2. **Hide on Mobile**: Typically hide TOC on mobile using `hidden lg:block`
3. **Limit Heading Levels**: Only include H2-H6 in TOC (H1 is usually the page title)
4. **Consistent IDs**: Ensure heading IDs match between content and TOC
5. **Appropriate Offset**: Set `scrollOffset` to account for fixed headers

## Troubleshooting

### TOC Not Showing

- Check that `headings` array is not empty
- Verify headings are extracted correctly from content
- Ensure heading IDs match IDs in rendered content

### Active Section Not Highlighting

- Verify headings have matching IDs in the DOM
- Check that Intersection Observer is working (browser support)
- Ensure content is rendered before TOC mounts

### Scroll Not Working

- Verify heading IDs exist in the DOM
- Check that `scrollOffset` is appropriate for your layout
- Ensure smooth scrolling is enabled in browser

## Related Components

- `MarkdownRenderer` - Renders markdown with heading IDs
- `extractHeadings` - Utility to extract headings from markdown
- `SmoothScrollButton` - Alternative scroll navigation component

## Component Registry

This component can be registered in the component registry for use in the CMS:

```typescript
{
  name: "TableOfContents",
  component: TableOfContents,
  schema: tableOfContentsSchema,
  category: "navigation",
  tags: ["toc", "navigation", "sidebar", "table-of-contents"]
}
```

