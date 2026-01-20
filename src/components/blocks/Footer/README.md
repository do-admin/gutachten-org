# Footer Component

## Description

The `Footer` component is a comprehensive site footer that displays company information, navigation links, social media links, contact details, and legal information. It automatically pulls data from the site configuration and provides a professional, organized footer layout for your website.

## Features

- **Automatic Data Integration**: Pulls navigation and contact info from site config
- **Social Media Links**: Displays social media icons with hover effects
- **Contact Information**: Email and phone links with proper formatting
- **Navigation Sections**: Organized navigation and legal links
- **Theme Variants**: Light and dark theme support
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Professional Layout**: Multi-column grid with proper spacing

## Props

| Prop      | Type                | Default  | Required | Description                  |
| --------- | ------------------- | -------- | -------- | ---------------------------- |
| `variant` | `'light' \| 'dark'` | `'dark'` | ❌       | Theme variant for the footer |

## Data Sources

The Footer component automatically pulls data from the site configuration:

### Navigation Items

- **Main Navigation**: Items with `section: "navigation"`
- **Legal Links**: Items with `section: "legal"`

### Contact Information

- **Email**: `siteConfig.contact.email`
- **Phone**: `siteConfig.contact.phone` (optional)

### Social Media

- **Social Links**: `siteConfig.social` object with platform URLs

### Site Information

- **Logo**: `siteConfig.site.logo.light` and `siteConfig.site.logo.dark`
- **Company Name**: Used in copyright notice

## Usage Examples

### Basic Footer

```json
{
  "type": "Footer",
  "contentRef": "site.footer"
}
```

With content in `content.json`:

```json
{
  "site": {
    "footer": {
      "variant": "dark"
    }
  }
}
```

### Light Theme Footer

```json
{
  "site": {
    "footer": {
      "variant": "light"
    }
  }
}
```

## Site Configuration Requirements

The Footer component requires specific data in your site configuration:

### Navigation Structure

```json
{
  "navigation": {
    "main": [
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
        "name": "Services",
        "href": "/services",
        "section": "navigation"
      },
      {
        "name": "Privacy Policy",
        "href": "/privacy",
        "section": "legal"
      },
      {
        "name": "Terms of Service",
        "href": "/terms",
        "section": "legal"
      }
    ]
  }
}
```

### Contact Information

```json
{
  "contact": {
    "email": "info@example.com",
    "phone": "+49 123 456 789"
  }
}
```

### Social Media Links

```json
{
  "social": {
    "youtube": "https://youtube.com/@example",
    "instagram": "https://instagram.com/example",
    "spotify": "https://open.spotify.com/user/example"
  }
}
```

### Logo Configuration

```json
{
  "site": {
    "logo": {
      "light": "/images/logo-light.svg",
      "dark": "/images/logo-dark.svg"
    }
  }
}
```

## Footer Layout Structure

### Desktop Layout (4 columns)

1. **Company Info** (2 columns)
   - Logo
   - Company tagline/quote
   - Company description
2. **Navigation** (1 column)
   - Main navigation links
3. **Legal & Social** (1 column)
   - Legal links
   - Social media icons

### Mobile Layout

- **Single column** with stacked sections
- **Responsive spacing** and typography
- **Touch-friendly** social media icons

## Styling Options

### Theme Variants

- **`dark`** - Dark background with light text (default)
- **`light`** - Light background with dark text

### Color Schemes

#### Dark Theme

- Background: `bg-gray-900`
- Text: `text-white`
- Secondary text: `text-gray-300`
- Muted text: `text-gray-400`
- Accent: `text-red-400`

#### Light Theme

- Background: `bg-white`
- Text: `text-gray-900`
- Secondary text: `text-gray-600`
- Muted text: `text-gray-500`
- Accent: `text-accent`

## Content Sections

### Company Information

- **Logo display** with theme-appropriate variant
- **Company tagline** in blockquote format
- **Company description** with professional copy

### Navigation Links

- **Main navigation** items grouped together
- **Legal links** in separate section
- **Hover effects** for better interactivity

### Social Media

- **Social icons** with hover animations
- **Accessible labels** for screen readers
- **Consistent styling** across platforms

### Contact Information

- **Email link** with mailto: protocol
- **Phone link** with tel: protocol (if provided)
- **Proper formatting** and accessibility

### Copyright Notice

- **Dynamic year** using DateDisplay component
- **Company name** from site configuration
- **Professional formatting**

## Accessibility Features

- **Semantic HTML** with proper `<footer>` and `<nav>` elements
- **ARIA labels** for navigation sections
- **Screen reader friendly** structure
- **Keyboard navigation** support
- **Proper link formatting** for email and phone

## Best Practices

1. **Complete site configuration** - Ensure all required data is provided
2. **Test both themes** - Verify light and dark variants work correctly
3. **Optimize images** - Use appropriate logo sizes and formats
4. **Keep navigation organized** - Use proper section categorization
5. **Provide contact information** - Include email and phone when available
6. **Test social links** - Ensure all social media URLs are valid

## Performance Considerations

- **Automatic data loading** from site configuration
- **Optimized image rendering** with Next.js Image component
- **Efficient social icon rendering** with react-social-icons
- **Minimal re-renders** with proper data structure

## Component Registry

This component is registered in the component registry as:

```typescript
{
  name: 'Footer',
  description: 'A comprehensive site footer with navigation, contact info, and social links',
  category: 'layout',
  tags: ['footer', 'navigation', 'contact', 'social']
}
```

## Related Components

- `Header` - For site navigation header
- `DateDisplay` - Used internally for copyright year
- `Button` - Used internally for CTA buttons
- `Image` - Used internally for logo display
