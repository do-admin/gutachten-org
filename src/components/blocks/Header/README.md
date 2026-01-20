# Header Component

## Description

The `Header` component is a responsive, fixed navigation header that provides site navigation, logo display, and call-to-action buttons. It features a mobile-friendly hamburger menu, dropdown navigation support, and automatic scroll effects. The component is designed to be the primary navigation element for your website.

## Features

- **Responsive Design**: Desktop and mobile-optimized layouts
- **Fixed Positioning**: Stays at the top of the page with scroll effects
- **Dropdown Navigation**: Support for nested navigation items
- **Mobile Menu**: Hamburger menu with smooth animations
- **Logo Support**: Light and dark logo variants
- **Scroll Effects**: Background blur and shadow on scroll
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Theme Variants**: Light and dark theme support

## Props

| Prop         | Type                | Default   | Required | Description                                     |
| ------------ | ------------------- | --------- | -------- | ----------------------------------------------- |
| `variant`    | `'light' \| 'dark'` | `'light'` | ❌       | Theme variant for the header                    |
| `logo`       | `LogoObject`        | -         | ❌       | Logo configuration with light and dark variants |
| `navigation` | `NavigationItem[]`  | `[]`      | ❌       | Array of navigation items                       |
| `className`  | `string`            | `''`      | ❌       | Additional CSS classes for custom styling       |

## Content Types

### Logo Object

```typescript
interface LogoObject {
  light: string; // Path to light theme logo
  dark: string; // Path to dark theme logo
}
```

**Example:**

```json
{
  "light": "/images/logo-light.svg",
  "dark": "/images/logo-dark.svg"
}
```

### Navigation Item

```typescript
interface NavigationItem {
  name: string;
  href: string;
  section: string;
  children?: NavigationItem[];
}
```

**Example:**

```json
{
  "name": "Services",
  "href": "/services",
  "section": "navigation",
  "children": [
    {
      "name": "Web Development",
      "href": "/services/web-development",
      "section": "navigation"
    },
    {
      "name": "SEO Services",
      "href": "/services/seo",
      "section": "navigation"
    }
  ]
}
```

## Usage Examples

### Basic Header

```json
{
  "type": "Header",
  "contentRef": "site.header"
}
```

With content in `content.json`:

```json
{
  "site": {
    "header": {
      "variant": "light",
      "logo": {
        "light": "/images/logo-light.svg",
        "dark": "/images/logo-dark.svg"
      },
      "navigation": [
        {
          "name": "Home",
          "href": "/",
          "section": "navigation"
        },
        {
          "name": "About",
          "href": "/about",
          "section": "navigation"
        },
        {
          "name": "Contact",
          "href": "/contact",
          "section": "navigation"
        }
      ]
    }
  }
}
```

### Header with Dropdown Navigation

```json
{
  "site": {
    "header": {
      "variant": "light",
      "logo": {
        "light": "/images/logo-light.svg",
        "dark": "/images/logo-dark.svg"
      },
      "navigation": [
        {
          "name": "Home",
          "href": "/",
          "section": "navigation"
        },
        {
          "name": "Services",
          "href": "/services",
          "section": "navigation",
          "children": [
            {
              "name": "Web Development",
              "href": "/services/web-development",
              "section": "navigation"
            },
            {
              "name": "SEO Services",
              "href": "/services/seo",
              "section": "navigation"
            },
            {
              "name": "Consulting",
              "href": "/services/consulting",
              "section": "navigation"
            }
          ]
        },
        {
          "name": "About",
          "href": "/about",
          "section": "navigation"
        },
        {
          "name": "Contact",
          "href": "/contact",
          "section": "navigation"
        }
      ]
    }
  }
}
```

### Dark Theme Header

```json
{
  "site": {
    "header": {
      "variant": "dark",
      "logo": {
        "light": "/images/logo-light.svg",
        "dark": "/images/logo-dark.svg"
      },
      "navigation": [
        {
          "name": "Home",
          "href": "/",
          "section": "navigation"
        },
        {
          "name": "Products",
          "href": "/products",
          "section": "navigation"
        },
        {
          "name": "Support",
          "href": "/support",
          "section": "navigation"
        }
      ]
    }
  }
}
```

## Styling Options

### Theme Variants

- **`light`** - Light background with dark text (default)
- **`dark`** - Dark background with light text

### Custom Styling

You can add custom CSS classes via the `className` prop:

```json
{
  "className": "custom-header border-b-2 border-accent"
}
```

## Responsive Behavior

### Desktop (> 768px)

- **Full navigation** displayed horizontally
- **Dropdown menus** on hover for items with children
- **CTA button** visible in the top right
- **Logo** displayed on the left

### Mobile (< 768px)

- **Hamburger menu** button replaces navigation
- **Mobile menu** slides down when opened
- **Nested navigation** displayed as indented items
- **CTA button** moved to mobile menu footer

## Scroll Effects

The header automatically applies visual effects based on scroll position:

- **Background blur** (`backdrop-blur-sm`) for modern glass effect
- **Shadow** appears when scrolled down
- **Smooth transitions** for all visual changes

## Accessibility Features

- **Semantic HTML** with proper `<header>` and `<nav>` elements
- **ARIA labels** for navigation and mobile menu
- **Keyboard navigation** support for all interactive elements
- **Focus management** for dropdown menus
- **Screen reader friendly** structure

## Best Practices

1. **Keep navigation concise** - Limit to 5-7 main items for usability
2. **Use clear labels** - Navigation items should be self-explanatory
3. **Provide fallback logo** - Always include both light and dark variants
4. **Test mobile experience** - Ensure mobile menu works smoothly
5. **Consider scroll effects** - Test how the header looks when scrolled
6. **Use consistent styling** - Match header theme with your site design

## Performance Considerations

- **Fixed positioning** with optimized CSS transforms
- **Event listeners** properly cleaned up on unmount
- **Image optimization** for logos using Next.js Image component
- **Minimal re-renders** with efficient state management

## Component Registry

This component is registered in the component registry as:

```typescript
{
  name: 'Header',
  description: 'A responsive navigation header with logo, menu, and CTA button',
  category: 'layout',
  tags: ['navigation', 'header', 'menu']
}
```

## Related Components

- `Footer` - For site footer with additional navigation
- `Button` - Used internally for CTA buttons
- `Image` - Used internally for logo display
