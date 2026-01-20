# Template Variables in Subpage Content

You can now use template variables in your subpage JSON files to reference properties from the `multi-page-config.json`. This allows you to maintain consistent information across your site without duplicating data.

## How to Use Template Variables

Use curly braces `{}` to reference variables in any string field in your subpage JSON files. **Note: Subpage configurations are now arrays of components** to support multiple components per page:

```json
[
  {
    "type": "hero",
    "title": "Welcome to {siteName}",
    "description": "Contact us at {contactEmail} or call {contactPhone}",
    "buttons": [
      {
        "label": "Email Us",
        "href": "mailto:{contactEmail}"
      }
    ]
  },
  {
    "type": "textImage",
    "title": "Our Services",
    "image": "/images/{siteId}/services.jpg",
    "imageAlt": "Services from {siteName}"
  }
]
```

### Component Structure

Each component in the array must have a `type` field to identify what kind of component it is:

- `"type": "hero"` - Hero sections with titles, descriptions, and call-to-action buttons
- `"type": "textImage"` - Text and image sections with features and descriptions
- Additional component types can be added as needed

## Available Template Variables

### Basic Site Information

- `{siteName}` - The name of the site from multi-page-config.json
- `{siteDescription}` - The description of the site
- `{domain}` - Site domain

### Contact Information

- `{contactEmail}` - Contact email address
- `{contactPhone}` - Contact phone number

### Address Information

- `{address.street}` - Street address
- `{address.city}` - City
- `{address.postalCode}` - Postal code
- `{address.country}` - Country

### Social Media

- `{social.facebook}` - Facebook URL
- `{social.twitter}` - Twitter URL
- `{social.instagram}` - Instagram URL
- `{social.linkedin}` - LinkedIn URL

## Examples

### Home Page Example (Array Structure)

```json
[
  {
    "type": "hero",
    "title": "{siteName}",
    "subtitle": "Professional Solutions",
    "description": "Welcome to {siteName}. We provide {siteDescription}. Contact us at {contactEmail} or visit us at {address.street}, {address.city}."
  },
  {
    "type": "textImage",
    "title": "Why Choose Our Service?",
    "content": "We combine years of experience with cutting-edge technology.",
    "image": "/images/{siteId}/service-1.jpg",
    "imageAlt": "Professional {siteName} team"
  }
]
```

### Contact Page Example

```json
[
  {
    "type": "hero",
    "title": "Contact {siteName}",
    "description": "Get in touch with our team at {contactEmail} or {contactPhone}.",
    "buttons": [
      {
        "label": "Send Email",
        "href": "mailto:{contactEmail}"
      },
      {
        "label": "Call Us",
        "href": "tel:{contactPhone}"
      }
    ]
  }
]
```

### About Page Example

```json
[
  {
    "type": "hero",
    "title": "About {siteName}",
    "description": "Learn more about {siteName} and our commitment to {siteDescription}.",
    "features": [
      {
        "title": "Our Location",
        "description": "Visit us at {address.street}, {address.city}, {address.country}"
      }
    ]
  }
]
```

### Image Paths with Template Variables

You can also use template variables in image paths:

```json
[
  {
    "type": "hero",
    "title": "Welcome to {siteName}",
    "backgroundImage": "/images/{siteId}/hero-bg.jpg",
    "image": "/images/{siteId}/team-photo.jpg",
    "imageAlt": "The {siteName} team"
  },
  {
    "type": "textImage",
    "image": "/images/{siteId}/service-1.jpg",
    "imageAlt": "Professional {siteName} team"
  }
]
```

**Note**: The image copying script will automatically copy images from `data/{siteId}/images/` to `public/images/{siteId}/` while **preserving the folder structure**. For example:

- `data/nutzungsdauer/images/content/service-1.jpg` → `public/images/nutzungsdauer/content/service-1.jpg`
- `data/nutzungsdauer/images/logo/logo-light.png` → `public/images/nutzungsdauer/logo/logo-light.png`

This is particularly useful when:

- Creating multiple sites with different image directories
- Using site-specific branding images
- Maintaining consistent image organization across sites
- Organizing images in subdirectories (content, logo, hero, etc.)

## How It Works

1. When a subpage is loaded, the system reads the raw JSON content
2. Template variables are automatically processed and replaced with values from `multi-page-config.json`
3. The processed content is cached for performance
4. If a variable is not found, it remains unchanged in the output

## Image Processing

The system also processes template variables in image paths from multiple sources:

### Multi-page Configuration

Images referenced in `multi-page-config.json` (like logos and favicons) are automatically processed:

```json
{
  "logo": {
    "light": "{siteId}/images/{siteId}/{siteId}-light.svg",
    "dark": "{siteId}/images/{siteId}/{siteId}-dark.svg"
  },
  "favicon": "/favicon.ico"
}
```

### Subpage Content

Images in subpage JSON files are processed with template variables:

```json
{
  "hero": {
    "image": "/images/{siteId}/hero-bg.jpg",
    "imageAlt": "Welcome to {siteName}"
  }
}
```

### Image Copying Process

When running `pnpm dev`, the system:

1. Extracts all image references from `multi-page-config.json` and subpage files
2. Processes template variables in image paths
3. Copies the actual image files to the public directory
4. Handles different file types (favicons go to public root, images go to site-specific directories)

## Benefits

- **Consistency**: Ensure all pages use the same contact information
- **Maintainability**: Update contact details in one place (multi-page-config.json)
- **Flexibility**: Easy to create multiple sites with different configurations
- **Type Safety**: Template variables are validated against available properties

## Adding New Template Variables

To add new template variables, update the `TEMPLATE_VARIABLES` array in `/src/lib/template-variables.ts`. This is the single source of truth for all template variable definitions.

Example:

```typescript
{
  key: 'newVariable',
  description: 'Description of the new variable',
  extractor: (config) => config.newProperty?.value,
  fallback: 'default value'
}
```

The centralized system will automatically:

- Make the variable available in all template processing functions
- Include it in validation and documentation
- Ensure consistency across all scripts and components
