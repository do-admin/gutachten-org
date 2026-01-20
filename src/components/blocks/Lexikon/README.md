# Lexikon Component

## Description

The `Lexikon` component is a comprehensive glossary/lexicon component that displays terms and definitions in an organized, searchable format. It features automatic cross-linking between terms, alphabetical navigation, and customizable styling. Perfect for educational content, reference materials, and knowledge bases.

## Features

- **Automatic Cross-Linking**: Terms in definitions automatically link to other entries
- **Alphabetical Navigation**: Table of contents with letter-based navigation
- **Customizable Styling**: Extensive styling options for all elements
- **Responsive Design**: Works beautifully on all device sizes
- **Accessibility**: Proper ARIA labels and semantic HTML structure
- **Internationalization**: Configurable locale for sorting and text processing
- **Flexible Content**: Support for additional content via children prop

## Props

| Prop                       | Type                         | Default                                                                      | Required | Description                                                           |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `lexicon`                  | `LexikonEntry`               | -                                                                            | ✅       | Object containing terms as keys and definitions as values             |
| `title`                    | `string`                     | -                                                                            | ❌       | Main title for the lexicon section (shown when showHero is true)      |
| `subtitle`                 | `string`                     | -                                                                            | ❌       | Subtitle or description for the lexicon (shown when showHero is true) |
| `icon`                     | `LucideIcon`                 | -                                                                            | ❌       | Lucide icon component to display in hero                              |
| `iconAriaLabel`            | `string`                     | -                                                                            | ❌       | Accessibility label for the icon                                      |
| `iconOnTop`                | `boolean`                    | `false`                                                                      | ❌       | Whether to display icon above the title                               |
| `imageSrc`                 | `string`                     | -                                                                            | ❌       | Path to the image file in hero section                                |
| `imageAlt`                 | `string`                     | -                                                                            | ❌       | Alt text for the image                                                |
| `showHero`                 | `boolean`                    | `true`                                                                       | ❌       | Whether to show the hero section (title, subtitle, icon, image)       |
| `showImage`                | `boolean`                    | `true`                                                                       | ❌       | Whether to display the image in hero section                          |
| `showTableOfContents`      | `boolean`                    | `true`                                                                       | ❌       | Whether to show the table of contents                                 |
| `headingLevel`             | `number`                     | `1`                                                                          | ❌       | Heading level for the title (1-6)                                     |
| `className`                | `string`                     | `''`                                                                         | ❌       | Additional CSS classes for the main container                         |
| `containerClassName`       | `string`                     | `''`                                                                         | ❌       | CSS classes for the container element                                 |
| `cardClassName`            | `string`                     | `''`                                                                         | ❌       | CSS classes for the card element                                      |
| `contentClassName`         | `string`                     | `''`                                                                         | ❌       | CSS classes for the content area                                      |
| `titleClassName`           | `string`                     | `''`                                                                         | ❌       | CSS classes for the title element                                     |
| `backgroundClassName`      | `string`                     | `'min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 pt-16'` | ❌       | CSS classes for the background styling                                |
| `tableOfContentsClassName` | `string`                     | `'mb-12 p-6 bg-gray-50 rounded-lg'`                                          | ❌       | CSS classes for the table of contents container                       |
| `entryClassName`           | `string`                     | `'border-l-4 border-amber-500 pl-4 scroll-mt-20'`                            | ❌       | CSS classes for individual lexicon entries                            |
| `tableOfContentsTitle`     | `string`                     | `'Inhaltsverzeichnis'`                                                       | ❌       | Title for the table of contents section                               |
| `sortBy`                   | `'alphabetical' \| 'custom'` | `'alphabetical'`                                                             | ❌       | Sorting method for lexicon entries                                    |
| `locale`                   | `string`                     | `'de'`                                                                       | ❌       | Locale for sorting and text processing                                |
| `children`                 | `ReactNode`                  | -                                                                            | ❌       | Additional content to render within the lexicon                       |

## Content Types

### LexikonEntry

```typescript
interface LexikonEntry {
  [key: string]: string;
}
```

**Example:**

```json
{
  "AfA": "Absetzung für Abnutzung - Steuerliche Abschreibung von Anlagegängern",
  "Nutzungsdauer": "Zeitraum, über den ein Wirtschaftsgut abgeschrieben wird",
  "Abschreibung": "Buchhalterische Verteilung der Anschaffungskosten über die Nutzungsdauer"
}
```

## Usage Examples

### Basic Usage

```json
{
  "type": "Lexikon",
  "contentRef": "content.lexikon"
}
```

With content in `content.json`:

```json
{
  "content": {
    "lexikon": {
      "title": "Immobilien Lexikon",
      "subtitle": "Wichtige Begriffe rund um Immobilien und Steuern",
      "lexicon": {
        "AfA": "Absetzung für Abnutzung - Steuerliche Abschreibung von Anlagegängern",
        "Nutzungsdauer": "Zeitraum, über den ein Wirtschaftsgut abgeschrieben wird",
        "Abschreibung": "Buchhalterische Verteilung der Anschaffungskosten über die Nutzungsdauer"
      }
    }
  }
}
```

### Advanced Usage with Custom Styling

```json
{
  "content": {
    "advancedLexikon": {
      "title": "Technisches Glossar",
      "subtitle": "Begriffe aus der Softwareentwicklung",
      "lexicon": {
        "API": "Application Programming Interface - Schnittstelle für Softwarekomponenten",
        "Framework": "Programmiergerüst mit vorgefertigten Funktionen",
        "Library": "Sammlung von Funktionen und Klassen für spezifische Aufgaben"
      },
      "icon": "BookOpen",
      "iconAriaLabel": "Buch Icon",
      "iconOnTop": true,
      "imageSrc": "/images/tech-glossary.jpg",
      "imageAlt": "Technisches Glossar",
      "showImage": true,
      "showTableOfContents": true,
      "tableOfContentsTitle": "Alphabetische Navigation",
      "backgroundClassName": "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16",
      "tableOfContentsClassName": "mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200",
      "entryClassName": "border-l-4 border-blue-500 pl-4 scroll-mt-20 bg-white p-4 rounded-r-lg shadow-sm",
      "locale": "en"
    }
  }
}
```

### Minimal Lexikon (No Hero Section)

```json
{
  "content": {
    "minimalLexikon": {
      "lexicon": {
        "Begriff 1": "Definition des ersten Begriffs",
        "Begriff 2": "Definition des zweiten Begriffs"
      },
      "showHero": false,
      "showTableOfContents": false,
      "backgroundClassName": "bg-white py-8",
      "cardClassName": "shadow-none border-0"
    }
  }
}
```

### Lexikon with Hero Section

```json
{
  "content": {
    "lexikonWithHero": {
      "title": "Quick Reference",
      "subtitle": "Wichtige Begriffe im Überblick",
      "lexicon": {
        "Begriff 1": "Definition des ersten Begriffs",
        "Begriff 2": "Definition des zweiten Begriffs"
      },
      "showHero": true,
      "showTableOfContents": true
    }
  }
}
```

### Lexikon with Additional Content

```json
{
  "content": {
    "lexikonWithContent": {
      "title": "Wissensdatenbank",
      "subtitle": "Umfassende Sammlung von Fachbegriffen",
      "lexicon": {
        "Begriff A": "Definition A",
        "Begriff B": "Definition B"
      },
      "children": {
        "type": "div",
        "content": "<p>Zusätzliche Informationen und Links zu verwandten Themen.</p>"
      }
    }
  }
}
```

## Styling Options

### Background Styling

```json
{
  "backgroundClassName": "min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 pt-16"
}
```

### Table of Contents Styling

```json
{
  "tableOfContentsClassName": "mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200"
}
```

### Entry Styling

```json
{
  "entryClassName": "border-l-4 border-amber-500 pl-4 scroll-mt-20 bg-white p-4 rounded-r-lg shadow-sm"
}
```

### Custom Color Themes

#### Blue Theme

```json
{
  "backgroundClassName": "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16",
  "tableOfContentsClassName": "mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200",
  "entryClassName": "border-l-4 border-blue-500 pl-4 scroll-mt-20"
}
```

#### Green Theme

```json
{
  "backgroundClassName": "min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-16",
  "tableOfContentsClassName": "mb-12 p-6 bg-green-50 rounded-lg border border-green-200",
  "entryClassName": "border-l-4 border-green-500 pl-4 scroll-mt-20"
}
```

## Cross-Linking Features

The component automatically creates links between terms:

- **Automatic Detection**: Terms mentioned in definitions are automatically detected
- **Smart Linking**: Only links to terms that exist in the lexicon
- **Overlap Prevention**: Prevents overlapping links in the same text
- **Smooth Scrolling**: Uses SmoothScrollButton for smooth navigation

## Responsive Behavior

### Mobile (< 768px)

- **Single column** layout with stacked content
- **Touch-friendly** table of contents buttons
- **Optimized spacing** for mobile viewing
- **Readable typography** with appropriate sizing

### Desktop (≥ 768px)

- **Multi-column** layout with better spacing
- **Hover effects** on navigation buttons
- **Enhanced typography** with larger text
- **Better visual hierarchy** with improved spacing

## Accessibility Features

- **Semantic HTML** with proper heading structure
- **ARIA labels** for icons and interactive elements
- **Keyboard navigation** support for all interactive elements
- **Screen reader friendly** with proper content structure
- **Focus management** for smooth scrolling navigation

## Internationalization

The component supports different locales for sorting:

```json
{
  "locale": "de" // German sorting
}
```

```json
{
  "locale": "en" // English sorting
}
```

## Best Practices

1. **Keep definitions concise** - Aim for clear, understandable explanations
2. **Use consistent terminology** - Maintain consistent language throughout
3. **Provide context** - Include relevant context in definitions
4. **Test cross-linking** - Ensure all linked terms exist in the lexicon
5. **Optimize images** - Use appropriate image sizes and formats
6. **Consider mobile users** - Test on various screen sizes
7. **Use semantic markup** - Leverage the component's accessibility features

## Performance Considerations

- **Efficient sorting** with locale-aware comparison
- **Optimized rendering** with React key props
- **Image optimization** using Next.js Image component
- **Minimal re-renders** with proper component structure

## Component Registry

This component is registered in the component registry as:

```typescript
{
  name: 'Lexikon',
  description: 'A comprehensive lexicon/glossary component that displays terms and definitions in an organized, searchable format',
  category: 'content',
  tags: ['lexicon', 'glossary', 'dictionary', 'reference']
}
```

## Related Components

- `SmoothScrollButton` - Used internally for navigation
- `Heading` - Used for section titles
- `Card` - Used for content container
- `Image` - Used for visual elements
