# TextImageSection Component

## Description

The `TextImageSection` component is a flexible, content-rich section that displays text content alongside an image. It supports various content types including paragraphs with text highlighting, feature lists, and highlight boxes. The component is perfect for creating engaging sections that combine textual information with visual elements.

## Features

- **Flexible Layout**: Text and image can be positioned left or right
- **Rich Content Support**: Paragraphs with text highlighting, feature lists, and highlight boxes
- **Responsive Design**: Adapts to different screen sizes with proper grid layouts
- **Customizable Styling**: Background colors, text positioning, and custom CSS classes
- **Accessibility**: Proper semantic HTML structure and alt text support
- **Image Optimization**: Uses Next.js Image component for optimized loading

## Props

| Prop              | Type                | Default      | Required | Description                                                 |
| ----------------- | ------------------- | ------------ | -------- | ----------------------------------------------------------- |
| `title`           | `string`            | -            | ✅       | Main heading for the section                                |
| `description`     | `string`            | -            | ❌       | Optional description text displayed above content blocks    |
| `contentBlocks`   | `ContentBlock[]`    | `[]`         | ❌       | Array of content blocks (paragraphs and highlight boxes)    |
| `features`        | `FeatureItem[]`     | `[]`         | ❌       | Array of feature items with icons, titles, and descriptions |
| `imageSrc`        | `string`            | -            | ❌       | Path to the image file                                      |
| `imageAlt`        | `string`            | -            | ❌       | Alt text for the image (accessibility)                      |
| `imageWidth`      | `number`            | `500`        | ❌       | Width of the image in pixels                                |
| `imageHeight`     | `number`            | `500`        | ❌       | Height of the image in pixels                               |
| `textPosition`    | `'left' \| 'right'` | `'left'`     | ❌       | Position of text content relative to image                  |
| `backgroundColor` | `string`            | `'bg-white'` | ❌       | Background color class for the section                      |
| `className`       | `string`            | `''`         | ❌       | Additional CSS classes for custom styling                   |

## Content Block Types

### Paragraph Block

```typescript
interface Paragraph {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  allowMarkup?: boolean;
  customStyles?: Record<string, string>;
}
```

**Example:**

```json
{
  "type": "paragraph",
  "content": {
    "text": "Die AfA (Absetzung für Abnutzung) ist ein wichtiger Bestandteil der Steuererklärung für Immobilienbesitzer.",
    "className": "text-lg text-muted-foreground mb-6",
    "highlightWords": ["AfA", "Steuererklärung", "Steuer absetzen"],
    "highlightClassName": "font-semibold text-accent"
  }
}
```

### Highlight Box Block

```typescript
interface HighlightBox {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  subline?: string;
}
```

**Example:**

```json
{
  "type": "highlightBox",
  "content": {
    "icon": "Calculator",
    "title": "Kostenloser AfA-Rechner",
    "description": "Berechnen Sie Ihre Abschreibungen in wenigen Minuten",
    "subline": "Schnell und einfach"
  }
}
```

## Feature Items

```typescript
interface FeatureItem {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
```

**Example:**

```json
{
  "icon": "Calculator",
  "title": "Einfache Berechnung",
  "description": "Geben Sie nur die wichtigsten Daten ein und erhalten Sie sofort Ihr Ergebnis"
}
```

## Usage Examples

### Basic Usage

```json
{
  "type": "TextImageSection",
  "contentRef": "home.about"
}
```

With content in `content.json`:

```json
{
  "home": {
    "about": {
      "title": "About Our Company",
      "description": "We are passionate about creating digital solutions that make a difference.",
      "imageSrc": "/images/about-image.jpg",
      "imageAlt": "About our company",
      "textPosition": "left",
      "backgroundColor": "bg-white"
    }
  }
}
```

### Advanced Usage with Content Blocks

```json
{
  "home": {
    "afaCalculator": {
      "title": "Warum ist die AfA-Berechnung wichtig?",
      "contentBlocks": [
        {
          "type": "paragraph",
          "content": {
            "text": "Die AfA (Absetzung für Abnutzung) ist ein wichtiger Bestandteil der Steuererklärung für Immobilienbesitzer. Mit unserem AfA-Rechner können Sie schnell und einfach ermitteln, wie viel Sie jährlich von der Steuer absetzen können.",
            "className": "text-lg text-muted-foreground mb-6",
            "highlightWords": ["AfA", "Steuererklärung", "Steuer absetzen"],
            "highlightClassName": "font-semibold text-accent"
          }
        },
        {
          "type": "highlightBox",
          "content": {
            "icon": "Calculator",
            "title": "Kostenloser AfA-Rechner",
            "description": "Berechnen Sie Ihre Abschreibungen in wenigen Minuten"
          }
        }
      ],
      "imageSrc": "/images/afa-calculator.png",
      "imageAlt": "AfA Calculator Interface",
      "textPosition": "right",
      "backgroundColor": "bg-gray-50"
    }
  }
}
```

### With Features List

```json
{
  "home": {
    "features": {
      "title": "Was ist ein AfA-Rechner?",
      "description": "Ein AfA-Rechner (Absetzung für Abnutzung) hilft Ihnen dabei, die jährlichen Abschreibungen für Ihre Immobilie zu berechnen.",
      "features": [
        {
          "icon": "Calculator",
          "title": "Einfache Berechnung",
          "description": "Geben Sie nur die wichtigsten Daten ein und erhalten Sie sofort Ihr Ergebnis"
        },
        {
          "icon": "Shield",
          "title": "Steuerlich korrekt",
          "description": "Berechnungen basieren auf den aktuellen AfA-Tabellen des Bundesfinanzministeriums"
        },
        {
          "icon": "TrendingUp",
          "title": "Steuerersparnis maximieren",
          "description": "Optimieren Sie Ihre Abschreibungen und sparen Sie Steuern"
        }
      ],
      "imageSrc": "/images/calculator-features.png",
      "imageAlt": "Calculator Features",
      "textPosition": "left",
      "backgroundColor": "bg-white"
    }
  }
}
```

## Styling

### Background Colors

The component supports various background color classes:

- `bg-white` - White background (default)
- `bg-gray-50` - Light gray background
- `bg-gray-100` - Slightly darker gray
- `bg-accent/5` - Very light accent color
- Custom Tailwind classes

### Text Positioning

- `left` - Text appears on the left, image on the right
- `right` - Text appears on the right, image on the left

### Custom Styling

You can add custom CSS classes via the `className` prop:

```json
{
  "className": "custom-section my-8 border-t border-gray-200"
}
```
