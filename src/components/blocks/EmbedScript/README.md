# EmbedScript Component

A reusable client-side component for embedding external scripts and widgets into your pages. Perfect for integrating third-party services like job boards, calendars, booking forms, and other external widgets.

## Features

- ✅ Client-side script loading with React hooks
- ✅ Customizable script attributes (data-\* attributes, etc.)
- ✅ Support for defer and async loading
- ✅ Optional title and subtitle sections
- ✅ Flexible styling with Tailwind CSS classes
- ✅ TypeScript support with full type safety
- ✅ Cleanup on unmount to prevent memory leaks

## Usage

### Basic Example

```tsx
import { createComponent } from "@/lib/component-schemas";
import type { EmbedScriptComponent } from "@/lib/component-schemas";

createComponent<EmbedScriptComponent>({
  type: "EmbedScript",
  id: "my-widget",
  scriptSrc: "https://example.com/widget.js",
  mountId: "my-widget",
  title: "My Widget",
  subtitle: "This is a description of my widget",
});
```

### Join.com Job Board Example

```tsx
createComponent<EmbedScriptComponent>({
  type: "EmbedScript",
  id: "join-widget-section",
  scriptSrc: "https://join.com/api/widget/bundle/YOUR_TOKEN_HERE",
  mountId: "join-widget",
  title: "Offene Stellen",
  subtitle: "Entdecken Sie unsere aktuellen Karrieremöglichkeiten",
  titleLevel: 2,
  scriptAttributes: {
    "data-mount-in": "#join-widget",
  },
  defer: true,
  scriptType: "text/javascript",
  className: "bg-background",
  titleClassName: "text-3xl font-bold md:text-4xl",
  subtitleClassName: "text-base md:text-lg",
  embedContainerClassName: "min-h-[400px]",
});
```

### Google Calendar Embed Example

```tsx
createComponent<EmbedScriptComponent>({
  type: "EmbedScript",
  id: "calendar-widget",
  scriptSrc: "https://calendar.google.com/calendar/embed.js",
  mountId: "calendar-container",
  title: "Event Calendar",
  subtitle: "View our upcoming events",
  defer: true,
  className: "py-16",
  embedContainerClassName: "min-h-[600px]",
});
```

## Props

| Prop                      | Type      | Required | Default             | Description                                           |
| ------------------------- | --------- | -------- | ------------------- | ----------------------------------------------------- |
| `id`                      | `string`  | ✅ Yes   | -                   | Unique identifier for the component section           |
| `scriptSrc`               | `string`  | ✅ Yes   | -                   | URL of the external script to load                    |
| `mountId`                 | `string`  | ✅ Yes   | -                   | ID of the div where the script will mount its content |
| `title`                   | `string`  | No       | -                   | Optional section title                                |
| `subtitle`                | `string`  | No       | -                   | Optional section subtitle/description                 |
| `titleLevel`              | `1-6`     | No       | `2`                 | Semantic heading level for the title                  |
| `scriptAttributes`        | `object`  | No       | `{}`                | Additional script attributes (e.g., `data-mount-in`)  |
| `className`               | `string`  | No       | -                   | Custom classes for the section container              |
| `titleContainerClassName` | `string`  | No       | -                   | Custom classes for the title container                |
| `titleClassName`          | `string`  | No       | -                   | Custom classes for the title                          |
| `subtitleClassName`       | `string`  | No       | -                   | Custom classes for the subtitle                       |
| `embedContainerClassName` | `string`  | No       | -                   | Custom classes for the embed container                |
| `defer`                   | `boolean` | No       | `true`              | Whether to defer script loading                       |
| `async`                   | `boolean` | No       | `false`             | Whether to load script asynchronously                 |
| `scriptType`              | `string`  | No       | `"text/javascript"` | Script MIME type                                      |

## Styling

The component uses Tailwind CSS for styling. You can customize the appearance using the provided className props:

- `className`: Overall section styling (padding, background, etc.)
- `titleContainerClassName`: Title section container styling
- `titleClassName`: Title text styling
- `subtitleClassName`: Subtitle text styling
- `embedContainerClassName`: The div where the widget loads (useful for setting min-height)

## Best Practices

### 1. Set Minimum Height

Always set a minimum height for the embed container to prevent layout shifts:

```tsx
embedContainerClassName: "min-h-[400px]";
```

### 2. Use Defer for Better Performance

Enable `defer` to improve page load performance:

```tsx
defer: true;
```

### 3. Provide Title and Subtitle

Help users understand what the widget does:

```tsx
title: "Offene Stellen",
subtitle: "Entdecken Sie unsere aktuellen Karrieremöglichkeiten"
```

### 4. Use Design System Colors

Follow the project's color system by using Tailwind color tokens:

```tsx
className: "bg-background",
titleClassName: "text-foreground",
subtitleClassName: "text-mutedForeground"
```

## Common Use Cases

### Job Board Widget

- Join.com
- Workable
- Greenhouse
- Lever

### Booking Systems

- Calendly
- Acuity Scheduling
- Doodle

### Forms

- Typeform
- Google Forms
- Jotform

### Live Chat

- Intercom
- Drift
- Zendesk Chat

### Social Media Feeds

- Twitter embeds
- Instagram feeds
- LinkedIn embeds

## Implementation Notes

- The component is client-side only (uses `"use client"` directive)
- Scripts are loaded dynamically using `useEffect`
- Prevents duplicate script loading by checking for existing scripts
- Automatically cleans up scripts on component unmount
- Uses React refs to manage DOM elements

## SEO Considerations

While the component uses client-side rendering, consider these SEO tips:

1. Always provide a meaningful `title` and `subtitle`
2. Use semantic heading levels with `titleLevel`
3. The component renders a section with proper HTML structure
4. Consider adding a loading state or placeholder content

## Troubleshooting

### Widget Not Loading

1. Check browser console for script errors
2. Verify `scriptSrc` URL is correct and accessible
3. Ensure `mountId` matches the widget's expected mount point
4. Check if `scriptAttributes` are correctly formatted

### Layout Shifts

Set a `min-h-[XXXpx]` on `embedContainerClassName` to reserve space before the widget loads.

### Multiple Instances

If you need multiple widgets on the same page, ensure each has a unique `id` and `mountId`.

## TypeScript Support

The component is fully typed with TypeScript. Import the props type for type-safe usage:

```tsx
import type {
  EmbedScriptProps,
  EmbedScriptComponent,
} from "@/lib/component-schemas";
```

## Related Components

- `ClientComponent`: For rendering client-side React components
- `CustomComponent`: For custom React components with full control

## Version History

- **v1.0.0** (2024): Initial release
