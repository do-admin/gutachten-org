# CTA Component

A flexible call-to-action component that displays a title, description, button, and optional disclaimer. Supports multiple variants, sizes, and styling options.

## Features

- **Flexible Content**: Customizable title, description, button text, and disclaimer
- **Multiple Variants**: Default, primary, secondary, and accent color schemes
- **Responsive Sizing**: Small, medium, and large size options
- **Custom Styling**: Extensive className props for custom styling
- **Accessibility**: Semantic HTML and proper ARIA attributes
- **SEO Friendly**: Server-side rendered with proper heading hierarchy

## Usage

### Basic Usage

```tsx
import { createComponent } from "@/lib/component-schemas";

const ctaExample = createComponent({
  type: "Cta",
  title: "Get Started Today",
  description: "Join thousands of satisfied customers.",
  button: {
    text: "Start Free Trial",
    href: "/signup",
    variant: "accent",
  },
  variant: "primary",
  size: "lg",
});
```

### Banner Variant Usage

```tsx
const bannerExample = createComponent({
  type: "Cta",
  variant: "banner",
  title: "Ready to get started?",
  description: "Join over 10,000 happy customers",
  icon: "Calculator",
  features: [
    {
      icon: "Calculator",
      title: "Free Tool",
      description: "No hidden costs",
    },
  ],
  button: {
    text: "Get Started",
    href: "/signup",
  },
  trustText: "✨ Trusted by 10,000+ users",
});
```

## Props

### Content Props

- `title` (required): Main heading for the CTA section
- `description` (optional): Description text displayed below the title
- `button` (required): Button configuration object with:
  - `text` (required): Text displayed on the button
  - `href` (required): URL or path for the button link
  - `alt` (optional): Alt text for accessibility
  - `icon` (optional): Lucide icon name (e.g., "ArrowRight", "Calculator")
  - `variant` (optional): Button visual variant
  - `size` (optional): Button size
- `disclaimerTitle` (optional): Title for the disclaimer section (default: "Rechtlicher Hinweis")
- `disclaimerContent` (optional): Custom disclaimer content

### Banner Variant Props

When using `variant: 'banner'`, the following props become **required**:

- `icon` (required): Lucide icon name (e.g., "Calculator", "Shield", "TrendingUp")
- `features` (required): Array of feature objects with:
  - `icon`: Lucide icon name (e.g., "Calculator", "Shield", "TrendingUp")
  - `title`: Feature title
  - `description`: Feature description
  - `className`: Optional CSS classes for the feature card
- `trustText` (required): Trust-building text displayed below the CTA button

### Styling Props

- `variant`: Visual variant (`default`, `primary`, `secondary`, `accent`, `banner`)
- `size`: Size variant (`sm`, `md`, `lg`)
- `buttonVariant`: Button variant (all button variants supported)
- `buttonSize`: Button size (`default`, `sm`, `lg`, `icon`)

### Layout Props

- `maxWidth`: Maximum width (`sm`, `md`, `lg`, `xl`, `2xl`, `4xl`, `6xl`, `full`)
- `textAlign`: Text alignment (`left`, `center`, `right`)
- `showDisclaimer`: Whether to show disclaimer (default: `true`)

### Custom Styling Props

- `className`: Additional CSS classes for the main container
- `containerClassName`: CSS classes for the inner container
- `contentClassName`: CSS classes for the content area
- `buttonClassName`: CSS classes for the button
- `disclaimerClassName`: CSS classes for the disclaimer section
- `backgroundColor`: Custom background color class
- `padding`: Padding size (`sm`, `md`, `lg`, `xl`)
- `margin`: Margin size (`sm`, `md`, `lg`, `xl`)

## Variants

### Default

- Clean, minimal styling with subtle borders
- Uses theme colors for text and backgrounds

### Primary

- Emphasizes primary brand colors
- Higher contrast for important CTAs

### Secondary

- Uses secondary theme colors
- Good for supporting actions

### Accent

- Uses accent colors for highlights
- Perfect for special promotions

### Banner

- Full-width gradient background with accent colors
- **Requires**: `icon`, `features` array, and `trustText` props
- Supports large icon display at the top
- Features grid for showcasing 3 key benefits
- Includes trust text at the bottom
- Perfect for hero CTAs or important conversions
- White text on gradient background for high visibility

## Examples

See `/src/examples/cta-examples.ts` for comprehensive usage examples including:

- Basic CTA with default styling
- Primary variant for important actions
- Secondary variant with custom styling
- Accent variant with custom disclaimer
- Custom styled CTA without disclaimer
- Small CTA for inline use
- Large CTA for hero sections
- Banner variant with icon and features

### Banner Variant Example

```tsx
import { createComponent } from "@/lib/component-schemas";

const bannerCta = createComponent({
  type: "Cta",
  variant: "banner",
  title:
    "Bereit für Ihre AfA-Berechnung? Starten Sie jetzt mit unserem kostenlosen Rechner.",
  description:
    "Über 10.000 Immobilienbesitzer haben bereits ihre Abschreibungen mit unserem Rechner optimiert.",
  icon: "Calculator",
  features: [
    {
      icon: "Calculator",
      title: "Kostenloser Rechner",
      description: "Keine versteckten Kosten oder Abos",
    },
    {
      icon: "TrendingUp",
      title: "Steuerersparnis",
      description: "Optimieren Sie Ihre Abschreibungen",
    },
    {
      icon: "Shield",
      title: "Steuerlich korrekt",
      description: "Basiert auf aktuellen AfA-Tabellen",
    },
  ],
  button: {
    text: "AfA-Rechner starten",
    href: "/afa-rechner",
    variant: "default",
    size: "lg",
  },
  trustText:
    "✨ Über 10.000 Immobilienbesitzer vertrauen bereits auf unseren AfA-Rechner",
});
```

## Color System

The component uses the design system's color tokens:

- `primary`: Main brand color
- `secondary`: Secondary brand color
- `accent`: Accent/highlight color
- `muted`: Subtle text and backgrounds
- `foreground`: Main text color
- `background`: Main background color

All variants automatically adapt to light/dark themes when configured.
