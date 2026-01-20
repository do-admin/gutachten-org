# Heading Component

## Description

The `Heading` component is a flexible, semantic heading component that maintains proper heading hierarchy while providing extensive customization options. It automatically handles sizing, spacing, and accessibility while allowing for visual overrides and custom styling.

## Features

- **Semantic HTML**: Proper heading tags (h1-h6) with accessibility
- **Flexible Sizing**: Automatic size mapping based on heading level
- **Visual Variants**: Multiple color and style options
- **Custom Rendering**: Override rendered tag while keeping semantics
- **Underline Support**: Optional decorative underline
- **Responsive Design**: Different sizes for mobile and desktop
- **Smart Spacing**: Automatic margins with override capability
- **Center Alignment**: Optional center alignment

## Props

| Prop                 | Type                                            | Default                                          | Required | Description                |
| -------------------- | ----------------------------------------------- | ------------------------------------------------ | -------- | -------------------------- |
| `level`              | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                    | `1`                                              | ❌       | Semantic heading level     |
| `variant`            | `'default' \| 'primary' \| 'accent' \| 'muted'` | `'primary'`                                      | ❌       | Visual color variant       |
| `as`                 | `keyof React.JSX.IntrinsicElements`             | -                                                | ❌       | Override rendered HTML tag |
| `underline`          | `boolean`                                       | `false`                                          | ❌       | Show decorative underline  |
| `underlineClassName` | `string`                                        | `'w-24 h-1 bg-accent rounded-full mx-auto mt-2'` | ❌       | Custom underline styling   |
| `center`             | `boolean`                                       | `false`                                          | ❌       | Center align the heading   |
| `className`          | `string`                                        | -                                                | ❌       | Additional CSS classes     |

## Heading Levels

### Level 1 (H1)

- **Size**: `text-4xl md:text-6xl`
- **Use case**: Page titles, main headings
- **Margins**: `mt-6 md:mt-12 mb-6 md:mb-12`

### Level 2 (H2)

- **Size**: `text-3xl md:text-4xl`
- **Use case**: Section headings, major subsections
- **Margins**: `mt-6 md:mt-12 mb-6 md:mb-12`

### Level 3 (H3)

- **Size**: `text-2xl md:text-3xl`
- **Use case**: Subsection headings
- **Margins**: `mt-6 mb-6`

### Level 4 (H4)

- **Size**: `text-xl md:text-2xl`
- **Use case**: Minor headings, card titles
- **Margins**: `mt-4 mb-4`

### Level 5 (H5)

- **Size**: `text-lg md:text-xl`
- **Use case**: Small headings, list titles
- **Margins**: `mt-2 mb-2`

### Level 6 (H6)

- **Size**: `text-base md:text-lg`
- **Use case**: Smallest headings, labels
- **Margins**: `mt-1 mb-1`

## Visual Variants

### Default

- **Color**: `text-foreground`
- **Use case**: Standard headings

### Primary

- **Color**: `text-primary`
- **Use case**: Main headings, important titles

### Accent

- **Color**: `text-accent-foreground`
- **Use case**: Highlighted headings, call-to-action titles

### Muted

- **Color**: `text-muted-foreground`
- **Use case**: Secondary headings, less important titles

## Usage Examples

### Basic Usage

```tsx
import { Heading } from '@/components/blocks/Heading';

// Simple page title
<Heading level={1}>Welcome to Our Website</Heading>

// Section heading
<Heading level={2}>About Our Services</Heading>

// Subsection heading
<Heading level={3}>Key Features</Heading>
```

### With Variants

```tsx
// Primary heading (default)
<Heading level={1} variant="primary">Main Title</Heading>

// Accent heading
<Heading level={2} variant="accent">Special Section</Heading>

// Muted heading
<Heading level={3} variant="muted">Secondary Info</Heading>
```

### With Underline

```tsx
// Default underline
<Heading level={2} underline={true}>Section Title</Heading>

// Custom underline styling
<Heading
  level={2}
  underline={true}
  underlineClassName="w-32 h-2 bg-blue-500 rounded-full mx-auto mt-4"
>
  Custom Underline
</Heading>
```

### Center Aligned

```tsx
<Heading level={1} center={true}>
  Centered Title
</Heading>
```

### Custom Tag Override

```tsx
// Render as h3 but with h1 styling
<Heading level={1} as="h3">
  Styled as H1, Semantically H3
</Heading>
```

### Custom Styling

```tsx
<Heading level={2} className="font-extrabold tracking-wide text-blue-600">
  Custom Styled Heading
</Heading>
```

## Advanced Examples

### Hero Section Title

```tsx
<Heading
  level={1}
  variant="primary"
  center={true}
  underline={true}
  className="mb-8"
>
  Welcome to Our Platform
</Heading>
```

### Section with Custom Underline

```tsx
<Heading
  level={2}
  variant="accent"
  underline={true}
  underlineClassName="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-3"
>
  Our Services
</Heading>
```

### Card Title

```tsx
<Heading level={4} variant="default" className="mb-4 text-left">
  Feature Title
</Heading>
```

## Responsive Behavior

### Mobile (< 768px)

- **Smaller font sizes** for better mobile readability
- **Reduced margins** for compact layouts
- **Maintained hierarchy** with appropriate scaling

### Desktop (≥ 768px)

- **Larger font sizes** for better desktop presence
- **Increased margins** for better spacing
- **Enhanced visual impact** with larger typography

## Smart Spacing System

The component automatically applies appropriate margins based on heading level:

### Top Margins

- **H1/H2**: `mt-6 md:mt-12` (large spacing for main headings)
- **H3**: `mt-6` (medium spacing)
- **H4**: `mt-4` (small spacing)
- **H5**: `mt-2` (minimal spacing)
- **H6**: `mt-1` (very minimal spacing)

### Bottom Margins

- **H1/H2**: `mb-6 md:mb-12` (large spacing)
- **H3**: `mb-6` (medium spacing)
- **H4**: `mb-4` (small spacing)
- **H5**: `mb-2` (minimal spacing)
- **H6**: `mb-1` (very minimal spacing)

### Override Behavior

- **Custom margins** in `className` override automatic margins
- **Underline** affects bottom margin calculation
- **Flexible spacing** for different layout needs

## Accessibility Features

- **Semantic HTML** with proper heading tags
- **Heading hierarchy** maintained for screen readers
- **ARIA compliance** with proper heading structure
- **Keyboard navigation** support
- **Screen reader friendly** with proper semantics

## Best Practices

1. **Maintain hierarchy** - Use heading levels in proper order (h1 → h2 → h3)
2. **One H1 per page** - Use only one h1 per page for SEO and accessibility
3. **Use appropriate levels** - Match heading level to content importance
4. **Consistent styling** - Use variants consistently across your site
5. **Test responsive** - Ensure headings look good on all devices
6. **Consider underline** - Use underlines sparingly for emphasis

## Performance Considerations

- **Lightweight component** with minimal overhead
- **Efficient rendering** with proper React patterns
- **CSS-in-JS optimization** with Tailwind classes
- **No external dependencies** for core functionality

## Component Registry

This component is registered in the component registry as:

```typescript
{
  name: 'Heading',
  description: 'A flexible heading component with semantic HTML and customizable styling',
  category: 'typography',
  tags: ['heading', 'title', 'typography', 'semantic']
}
```

## Related Components

- `Hero` - Often uses Heading for titles
- `TextImageSection` - Uses Heading for section titles
- `Card` - May use Heading for card titles
