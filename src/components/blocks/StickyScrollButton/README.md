# StickyScrollButton Component

## Description

The `StickyScrollButton` component is a specialized button that provides smooth scrolling to a target element on the page while automatically accounting for sticky headers. It dynamically calculates the sticky header height and adjusts the scroll position accordingly, ensuring the target element is properly visible below the sticky header.

## Features

- **Automatic Sticky Header Detection**: Dynamically calculates sticky header height and position
- **Multiple Variants**: Default, button, link, and ghost styles
- **Custom Sizes**: Small, medium, and large size options
- **Icon Support**: Left or right positioned Lucide icons
- **Custom Scroll Behavior**: Smooth, auto, or instant scrolling
- **Configurable Selector**: Custom CSS selector for sticky header element
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Client-Side**: Uses 'use client' for browser API access
- **Flexible Styling**: Custom CSS classes and built-in variants

## Props

| Prop                  | Type                                         | Default                                          | Required | Description                                       |
| --------------------- | -------------------------------------------- | ------------------------------------------------ | -------- | ------------------------------------------------- |
| `targetId`            | `string`                                     | -                                                | ✅       | ID of the target element to scroll to (without #) |
| `children`            | `ReactNode`                                  | -                                                | ✅       | Button content/text                               |
| `icon`                | `LucideIcon`                                 | -                                                | ❌       | Lucide icon component to display                  |
| `iconPosition`        | `'left' \| 'right'`                          | `'left'`                                         | ❌       | Position of the icon relative to text             |
| `className`           | `string`                                     | `''`                                             | ❌       | Additional CSS classes for styling               |
| `variant`             | `'default' \| 'button' \| 'link' \| 'ghost'` | `'default'`                                      | ❌       | Visual variant style                              |
| `size`                | `'sm' \| 'md' \| 'lg'`                       | `'md'`                                           | ❌       | Size of the button                                |
| `stickyHeaderSelector`| `string`                                     | `'[data-hero-page-element-id="810473075558"]'`  | ❌       | CSS selector for the sticky header element        |
| `scrollBehavior`      | `'smooth' \| 'auto' \| 'instant'`            | `'smooth'`                                       | ❌       | Scroll behavior type                              |
| `title`               | `string`                                     | -                                                | ❌       | Custom title attribute for the button             |
| `ariaLabel`           | `string`                                     | -                                                | ❌       | Custom ARIA label for accessibility               |

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

- **Style**: Transparent button with hover effect
- **Use case**: Subtle interactive elements

## Sizes

- **Small (`sm`)**: Compact button for tight spaces
- **Medium (`md`)**: Default size, balanced appearance
- **Large (`lg`)**: Prominent button for emphasis

## How It Works

The component automatically:

1. Finds the sticky header element using the provided selector
2. Calculates the header's height and top position
3. Determines the target element's position
4. Scrolls to the target position minus the sticky header offset
5. Ensures the target element is fully visible below the sticky header

## Usage Examples

### Basic Usage

```tsx
import { StickyScrollButton } from "@/components/blocks/StickyScrollButton";

<StickyScrollButton targetId="section-1">
  Scroll to Section
</StickyScrollButton>
```

### With Custom Sticky Header Selector

```tsx
<StickyScrollButton
  targetId="section-2"
  stickyHeaderSelector=".my-custom-sticky-header"
  variant="button"
>
  Go to Section
</StickyScrollButton>
```

### With Icon

```tsx
import { ArrowDown } from "lucide-react";

<StickyScrollButton
  targetId="contact"
  variant="button"
  icon={ArrowDown}
  iconPosition="right"
>
  Contact Us
</StickyScrollButton>
```

### Table of Contents Navigation

```tsx
{alphabet.map((letter) => {
  const anchorId = getFirstTermForLetter(letter);
  return (
    <StickyScrollButton
      key={letter}
      targetId={anchorId || ""}
      className="rounded-md px-3 py-2 text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200"
    >
      {letter}
    </StickyScrollButton>
  );
})}
```

## Differences from SmoothScrollButton

- **Sticky Header Awareness**: Automatically accounts for sticky headers
- **Button Element**: Uses `<button>` instead of `<Link>` for better control
- **Dynamic Offset Calculation**: Calculates offset based on actual sticky header dimensions
- **No scroll-margin Dependency**: Works without CSS scroll-margin properties

## Accessibility

- Proper semantic HTML with `<button>` element
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management

## Best Practices

1. **Use for Sticky Headers**: Specifically designed for pages with sticky navigation or headers
2. **Provide Clear Labels**: Use descriptive text or ARIA labels
3. **Test Scroll Position**: Verify target elements are fully visible after scroll
4. **Custom Selector**: Use `stickyHeaderSelector` if your sticky header uses a different selector
5. **Combine with Variants**: Use appropriate variant for your design system

## Performance Considerations

- **Client-Side Only**: Requires browser APIs, must be used in client components
- **Dynamic Calculation**: Calculates header dimensions on each click (minimal overhead)
- **Smooth Scrolling**: Uses native browser smooth scrolling for best performance

## Related Components

- `SmoothScrollButton` - For scrolling without sticky header considerations
- `Lexikon` - Uses StickyScrollButton for table of contents navigation

