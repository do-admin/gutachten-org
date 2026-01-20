# SmoothScrollButton Component

## Description

The `SmoothScrollButton` component is a versatile button that provides smooth scrolling to a target element on the page. It supports multiple visual variants, sizes, custom scroll behavior, and accessibility features. Perfect for navigation within long pages, table of contents, and improving user experience.

## Features

- **Multiple Variants**: Default, button, link, and ghost styles
- **Custom Sizes**: Small, medium, and large size options
- **Icon Support**: Left or right positioned Lucide icons
- **Custom Scroll Behavior**: Smooth, auto, or instant scrolling
- **Scroll Offset**: Configurable offset from target element
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Client-Side**: Uses 'use client' for browser API access
- **Flexible Styling**: Custom CSS classes and built-in variants

## Props

| Prop             | Type                                         | Default     | Required | Description                                       |
| ---------------- | -------------------------------------------- | ----------- | -------- | ------------------------------------------------- |
| `targetId`       | `string`                                     | -           | ✅       | ID of the target element to scroll to (without #) |
| `children`       | `ReactNode`                                  | -           | ✅       | Button content/text                               |
| `icon`           | `LucideIcon`                                 | -           | ❌       | Lucide icon component to display                  |
| `iconPosition`   | `'left' \| 'right'`                          | `'left'`    | ❌       | Position of the icon relative to text             |
| `className`      | `string`                                     | `''`        | ❌       | Additional CSS classes for styling                |
| `variant`        | `'default' \| 'button' \| 'link' \| 'ghost'` | `'default'` | ❌       | Visual variant style                              |
| `size`           | `'sm' \| 'md' \| 'lg'`                       | `'md'`      | ❌       | Size of the button                                |
| `scrollOffset`   | `number`                                     | `0`         | ❌       | Offset in pixels from the target element          |
| `scrollBehavior` | `'smooth' \| 'auto' \| 'instant'`            | `'smooth'`  | ❌       | Scroll behavior type                              |
| `title`          | `string`                                     | -           | ❌       | Custom title attribute for the button             |
| `ariaLabel`      | `string`                                     | -           | ❌       | Custom ARIA label for accessibility               |

## Variants

### Default

- **Style**: Simple cursor pointer with transition
- **Use case**: Inline text links, minimal styling

### Button

- **Style**: Styled button with background and padding
- **Use case**: Primary action buttons, call-to-action elements

### Link

- **Style**: Underlined text link
- **Use case**: Navigation links, secondary actions

### Ghost

- **Style**: Transparent button with hover effects
- **Use case**: Subtle actions, icon buttons

## Sizes

### Small (`sm`)

- **Text**: `text-sm`
- **Padding**: `px-2 py-1`
- **Use case**: Compact spaces, secondary actions

### Medium (`md`)

- **Text**: `text-base`
- **Padding**: `px-4 py-2`
- **Use case**: Standard buttons, most common use

### Large (`lg`)

- **Text**: `text-lg`
- **Padding**: `px-6 py-3`
- **Use case**: Primary actions, prominent buttons

## Usage Examples

### Basic Usage

```tsx
import { SmoothScrollButton } from "@/components/blocks/SmoothScrollButton/SmoothScrollButton";

// Simple scroll to section
<SmoothScrollButton targetId="section-1">Go to Section 1</SmoothScrollButton>;
```

### Button Variant with Icon

```tsx
import { ArrowDown } from "lucide-react";

<SmoothScrollButton
  targetId="features"
  variant="button"
  icon={ArrowDown}
  iconPosition="right"
  size="lg"
>
  View Features
</SmoothScrollButton>;
```

### Link Variant

```tsx
<SmoothScrollButton targetId="contact" variant="link" scrollOffset={80}>
  Contact Us
</SmoothScrollButton>
```

### Ghost Variant with Custom Styling

```tsx
import { ChevronUp } from "lucide-react";

<SmoothScrollButton
  targetId="top"
  variant="ghost"
  icon={ChevronUp}
  className="fixed right-4 bottom-4 z-50"
  ariaLabel="Scroll to top"
>
  Back to Top
</SmoothScrollButton>;
```

### Custom Scroll Behavior

```tsx
<SmoothScrollButton
  targetId="section-2"
  scrollBehavior="instant"
  scrollOffset={100}
  title="Jump to section 2"
>
  Instant Jump
</SmoothScrollButton>
```

## Advanced Examples

### Table of Contents Navigation

```tsx
const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

{
  tocItems.map((item) => (
    <SmoothScrollButton
      key={item.id}
      targetId={item.id}
      variant="ghost"
      size="sm"
      className="block w-full text-left hover:bg-gray-100"
    >
      {item.label}
    </SmoothScrollButton>
  ));
}
```

### Floating Action Button

```tsx
import { ArrowUp } from "lucide-react";

<SmoothScrollButton
  targetId="top"
  variant="button"
  icon={ArrowUp}
  size="lg"
  className="fixed right-6 bottom-6 z-50 rounded-full shadow-lg"
  scrollOffset={0}
  ariaLabel="Scroll to top of page"
>
  Top
</SmoothScrollButton>;
```

### Navigation Menu

```tsx
const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Settings },
  { id: "contact", label: "Contact", icon: Mail },
];

{
  navItems.map((item) => (
    <SmoothScrollButton
      key={item.id}
      targetId={item.id}
      variant="ghost"
      icon={item.icon}
      className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100"
    >
      {item.label}
    </SmoothScrollButton>
  ));
}
```

## Scroll Behavior Options

### Smooth (`smooth`)

- **Effect**: Animated scrolling with easing
- **Use case**: Most common, provides smooth user experience
- **Browser support**: Modern browsers

### Auto (`auto`)

- **Effect**: Browser default scrolling behavior
- **Use case**: When you want browser to decide
- **Browser support**: All browsers

### Instant (`instant`)

- **Effect**: Immediate jump to target
- **Use case**: Quick navigation, accessibility preferences
- **Browser support**: All browsers

## Scroll Offset

The `scrollOffset` prop allows you to adjust the final scroll position:

```tsx
// Account for fixed header (80px height)
<SmoothScrollButton
  targetId="section"
  scrollOffset={80}
>
  Go to Section
</SmoothScrollButton>

// Scroll to element with some padding
<SmoothScrollButton
  targetId="content"
  scrollOffset={-20}
>
  View Content
</SmoothScrollButton>
```

## Accessibility Features

- **Semantic HTML**: Uses proper `<a>` tag with href
- **ARIA Labels**: Custom or auto-generated aria-label
- **Title Attributes**: Custom or auto-generated title
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper semantic structure

## Styling Customization

### Custom CSS Classes

```tsx
<SmoothScrollButton
  targetId="section"
  className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md hover:bg-blue-600"
>
  Custom Styled Button
</SmoothScrollButton>
```

### Variant Combinations

```tsx
// Large button with custom styling
<SmoothScrollButton
  targetId="cta"
  variant="button"
  size="lg"
  className="w-full max-w-xs mx-auto"
>
  Get Started
</SmoothScrollButton>

// Small ghost button for compact spaces
<SmoothScrollButton
  targetId="details"
  variant="ghost"
  size="sm"
  icon={Info}
>
  Details
</SmoothScrollButton>
```

## Best Practices

1. **Use descriptive target IDs** - Make IDs meaningful and unique
2. **Consider scroll offset** - Account for fixed headers/navigation
3. **Provide clear labels** - Use descriptive text and ARIA labels
4. **Test on mobile** - Ensure touch targets are appropriate size
5. **Consider accessibility** - Provide alternative navigation methods
6. **Use appropriate variants** - Match the visual style to context
7. **Test scroll behavior** - Ensure smooth scrolling works as expected

## Performance Considerations

- **Client-side only** - Uses browser APIs, requires 'use client'
- **Efficient scrolling** - Uses native `window.scrollTo` API
- **Minimal re-renders** - Optimized React component structure
- **Lightweight** - Small bundle size with minimal dependencies

## Browser Compatibility

- **Modern browsers** - Full support for smooth scrolling
- **Fallback behavior** - Graceful degradation for older browsers
- **Mobile support** - Works on all mobile devices
- **Touch friendly** - Appropriate touch targets for mobile

## Component Registry

This component is registered in the component registry as:

```typescript
{
  name: 'Smooth Scroll Button',
  description: 'A versatile button component that provides smooth scrolling to a target element on the page',
  category: 'interaction',
  tags: ['button', 'scroll', 'navigation', 'smooth']
}
```

## Related Components

- `Lexikon` - Uses SmoothScrollButton for internal navigation
- `Header` - May use for navigation menu items
- `Footer` - May use for back-to-top functionality
