# Hero Component

## Description

The `Hero` component is a versatile, full-width hero section designed to create impactful landing areas for your pages. It supports multiple layouts, rich content types, and interactive elements like buttons and feature highlights. Perfect for creating compelling first impressions and driving user engagement.

## Features

- **Multiple Layouts**: Centered, split, and minimal layouts for different use cases
- **Title Highlighting**: Automatic highlighting of specific words in the title
- **Rich Content Support**: Icons, images, features, and call-to-action buttons
- **Flexible Backgrounds**: Gradient, white, or custom background options
- **Responsive Design**: Adapts beautifully across all device sizes
- **Accessibility**: Semantic HTML structure and proper heading hierarchy
- **Interactive Elements**: Buttons with icons and feature cards

## Props

| Prop                    | Type                                 | Default      | Required | Description                                |
| ----------------------- | ------------------------------------ | ------------ | -------- | ------------------------------------------ |
| `title`                 | `string`                             | -            | ✅       | Main heading for the hero section          |
| `titleHighlight`        | `string`                             | -            | ❌       | Part of title to highlight in accent color |
| `subtitle`              | `string`                             | -            | ❌       | Subtitle text displayed below the title    |
| `description`           | `string`                             | -            | ❌       | Description text for additional context    |
| `icon`                  | `LucideIcon`                         | -            | ❌       | Icon component to display above the title  |
| `image`                 | `ImageObject`                        | -            | ❌       | Image object with src, alt, width, height  |
| `layout`                | `'centered' \| 'split' \| 'minimal'` | `'centered'` | ❌       | Layout style for the hero section          |
| `background`            | `'gradient' \| 'white' \| 'custom'`  | `'gradient'` | ❌       | Background style                           |
| `customBackgroundClass` | `string`                             | -            | ❌       | Custom CSS class for background            |
| `buttons`               | `HeroButton[]`                       | `[]`         | ❌       | Array of call-to-action buttons            |
| `features`              | `HeroFeature[]`                      | `[]`         | ❌       | Array of feature highlights                |
| `titleClassName`        | `string`                             | `''`         | ❌       | Custom CSS classes for title               |
| `subtitleClassName`     | `string`                             | `''`         | ❌       | Custom CSS classes for subtitle            |
| `descriptionClassName`  | `string`                             | `''`         | ❌       | Custom CSS classes for description         |
| `children`              | `ReactNode`                          | -            | ❌       | Additional content to render               |

## Layout Types

### Centered Layout (`layout="centered"`)

- **Best for**: Landing pages, announcements, simple hero sections
- **Features**: Centered content with optional icon, features grid, and buttons
- **Use case**: When you want to focus attention on a single message

### Split Layout (`layout="split"`)

- **Best for**: Product showcases, feature presentations, detailed explanations
- **Features**: Text content on left, image on right (responsive)
- **Use case**: When you need to balance text and visual content

### Minimal Layout (`layout="minimal"`)

- **Best for**: Simple pages, blog posts, secondary sections
- **Features**: Clean, minimal design with essential content only
- **Use case**: When you want a clean, distraction-free presentation

## Content Types

### Hero Button

```typescript
interface HeroButton {
  href: string;
  label: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  icon?: LucideIcon;
}
```

**Example:**

```json
{
  "href": "/afa-rechner",
  "label": "AfA-Rechner starten",
  "variant": "accent",
  "icon": "Calculator"
}
```

### Hero Feature

```typescript
interface HeroFeature {
  icon?: LucideIcon;
  title: string;
  description?: string;
}
```

**Example:**

```json
{
  "icon": "Calculator",
  "title": "Kostenloser Rechner",
  "description": "Schnell und einfach zu bedienen"
}
```

### Image Object

```typescript
interface ImageObject {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
```

**Example:**

```json
{
  "src": "/images/afa-rechner-hero.png",
  "alt": "AfA-Rechner für Immobilien",
  "width": 600,
  "height": 600
}
```

## Usage Examples

### Basic Centered Hero

```json
{
  "type": "Hero",
  "contentRef": "home.hero"
}
```

With content in `content.json`:

```json
{
  "home": {
    "hero": {
      "title": "Welcome to Our Platform",
      "subtitle": "Building the future with modern technology",
      "description": "We create amazing digital experiences that help businesses grow and succeed.",
      "layout": "centered",
      "background": "gradient"
    }
  }
}
```

### Advanced Split Layout with Features

```json
{
  "home": {
    "afaHero": {
      "title": "AfA-Rechner für Immobilien - Kostenlos & Professionell",
      "titleHighlight": "AfA-Rechner",
      "subtitle": "Berechnen Sie Ihre Abschreibungen und optimieren Sie Ihre Steuerersparnis mit unserem kostenlosen AfA-Rechner. Einfach, schnell und präzise.",
      "layout": "split",
      "customBackgroundClass": "bg-white",
      "image": {
        "src": "/images/pages/home/afa-rechner/afa-rechner-hero.png",
        "alt": "AfA-Rechner für Immobilien",
        "width": 600,
        "height": 600
      },
      "features": [
        {
          "icon": "Calculator",
          "title": "Kostenloser Rechner"
        },
        {
          "icon": "Shield",
          "title": "Präzise Berechnungen"
        },
        {
          "icon": "TrendingUp",
          "title": "Steuerersparnis optimieren"
        }
      ],
      "buttons": [
        {
          "href": "/afa-rechner",
          "label": "AfA-Rechner starten",
          "variant": "accent",
          "icon": "Calculator"
        },
        {
          "href": "/ratgeber",
          "label": "Ratgeber lesen",
          "variant": "outline",
          "icon": "BookOpen"
        }
      ],
      "titleClassName": "bg-clip-text text-transparent"
    }
  }
}
```

### Minimal Layout with Icon

```json
{
  "home": {
    "simpleHero": {
      "title": "About Our Company",
      "subtitle": "Learn more about our story and mission",
      "description": "We are passionate about creating digital solutions that make a difference.",
      "icon": "Building",
      "layout": "minimal",
      "background": "white"
    }
  }
}
```

### Centered Layout with Features Grid

```json
{
  "home": {
    "featureHero": {
      "title": "Why Choose Our Service?",
      "subtitle": "Discover the benefits of working with us",
      "description": "We combine years of experience with cutting-edge technology to deliver exceptional results.",
      "layout": "centered",
      "background": "gradient",
      "features": [
        {
          "icon": "Zap",
          "title": "Fast Delivery",
          "description": "Quick turnaround times"
        },
        {
          "icon": "Shield",
          "title": "Secure & Reliable",
          "description": "Enterprise-grade security"
        },
        {
          "icon": "Users",
          "title": "Expert Support",
          "description": "24/7 customer assistance"
        }
      ],
      "buttons": [
        {
          "href": "/contact",
          "label": "Get Started",
          "variant": "default",
          "icon": "ArrowRight"
        }
      ]
    }
  }
}
```

## Styling Options

### Background Types

- **`gradient`** - Beautiful gradient from red-50 to orange-50 (default)
- **`white`** - Clean white background
- **`custom`** - Use `customBackgroundClass` for custom styling

### Button Variants

- **`default`** - Primary button style
- **`outline`** - Outlined button style
- **`secondary`** - Secondary button style
- **`destructive`** - Destructive action button
- **`ghost`** - Ghost button style
- **`link`** - Link-style button

### Custom Styling

You can add custom CSS classes to various elements:

```json
{
  "titleClassName": "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600",
  "subtitleClassName": "text-blue-600 font-semibold",
  "descriptionClassName": "text-gray-600 leading-relaxed"
}
```

## Title Highlighting

The component supports automatic highlighting of specific words in the title:

```json
{
  "title": "AfA-Rechner für Immobilien - Kostenlos & Professionell",
  "titleHighlight": "AfA-Rechner"
}
```

This will render as: "**AfA-Rechner** für Immobilien - Kostenlos & Professionell" with "AfA-Rechner" highlighted in the accent color.

## Responsive Behavior

### Mobile (< 768px)

- **Centered**: Single column layout with centered content
- **Split**: Image above text content
- **Minimal**: Single column with centered content

### Tablet (768px - 1024px)

- **Centered**: Maintains centered layout with better spacing
- **Split**: Maintains split layout with adjusted spacing
- **Minimal**: Single column with improved spacing

### Desktop (> 1024px)

- **Centered**: Full centered layout with feature grid
- **Split**: True split layout with text left, image right
- **Minimal**: Centered layout with optimal spacing

## Accessibility

- Uses semantic HTML (`<section>`, `<h1>`, `<p>`)
- Proper heading hierarchy with the `Heading` component
- Alt text support for images
- Screen reader friendly structure
- Keyboard navigation support for buttons
- Focus management for interactive elements

## Best Practices

1. **Keep titles concise** - Hero titles should be impactful but not overwhelming
2. **Use title highlighting sparingly** - Highlight only the most important words
3. **Choose appropriate layouts** - Match layout to your content and goals
4. **Optimize images** - Use appropriate dimensions and optimize for web
5. **Provide clear CTAs** - Make button labels action-oriented and clear
6. **Test on mobile** - Ensure your hero looks great on all devices
7. **Use consistent styling** - Maintain visual consistency across your site

## Performance Considerations

- **Image optimization**: Use Next.js Image component for automatic optimization
- **Lazy loading**: Images are loaded with priority for above-the-fold content
- **Minimal re-renders**: Component uses efficient rendering patterns
- **Bundle size**: Only imports necessary Lucide icons

## Component Registry

This component is registered in the component registry as:

```typescript
{
  name: 'Hero Section',
  description: 'A prominent hero section with title, subtitle, and call-to-action buttons',
  category: 'layout',
  tags: ['hero', 'banner', 'cta']
}
```

## Related Components

- `TextImageSection` - For content sections with text and images
- `Heading` - For consistent heading styling
- `Button` - Used internally for call-to-action buttons
- `Card` - Used internally for feature styling
