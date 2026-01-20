# BlockRenderer Integration

To use the text editor, your `BlockRenderer` component needs to wrap each rendered component with a `data-component-id` attribute.

## Required Changes to BlockRenderer

Add this code to your `BlockRenderer` component where you render each block:

```tsx
// Extract componentId from props (the 'id' field from component config)
const componentId = cleanedProps.id as string | undefined;
// Remove 'id' from props to avoid conflicts
const { id, ...propsWithoutId } = cleanedProps;

// Wrap component in a div with data-component-id for text editor identification
// This is semantically valid - divs are flow containers and don't affect
// the semantic meaning of wrapped elements (e.g., <section>)
return (
  <div
    key={`${block.type}-${index}`}
    {...(componentId && { "data-component-id": componentId })}
  >
    <Component {...propsWithoutId} />
  </div>
);
```

## Component Configuration

Your component configuration files should include an `id` field:

```typescript
createComponent<FAQComponent>({
  type: "FAQ",
  id: "faq-section", // This ID will be used as componentId
  // ... other props
});
```

This `id` will be:

1. Passed as `data-component-id` to the rendered component wrapper
2. Used by the text editor to identify which component is being edited
3. Used by the apply-edits script to find the component in source files

