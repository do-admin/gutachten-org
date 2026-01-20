# ClientComponent

A wrapper component that renders custom client-side components with server-side data fetching capabilities. Perfect for interactive components like calculators, forms, or any component requiring client-side JavaScript.

## Features

- **Server-side data fetching**: Pass data from server to client components
- **Component registry**: Centralized management of client components
- **Error handling**: Graceful fallbacks for missing components
- **Loading states**: Built-in Suspense with loading indicators
- **Type safety**: Full TypeScript support with proper prop validation

## Usage

### Basic Usage

```typescript
import { createComponent } from "@/lib/component-schemas";

const pageContent = [
  createComponent({
    type: "ClientComponent",
    componentName: "AfACalculatorClient",
    props: {
      // Props to pass to the client component
      theme: "light",
      showResults: true,
    },
    serverData: {
      // Data fetched on the server
      faqData: await fetchFAQData(),
      siteConfig: getCurrentSiteConfig(),
    },
    className: "my-8",
  }),
];
```

### Advanced Usage with Server Data Fetching

```typescript
// In your page component
const pageContent = [
  createComponent({
    type: "ClientComponent",
    componentName: "CustomForm",
    serverData: {
      // This data is fetched on the server
      formFields: await getFormFields(),
      validationRules: await getValidationRules(),
      userPreferences: await getUserPreferences(),
    },
    props: {
      // Client-side props
      onSubmit: "handleSubmit",
      theme: "dark",
    },
  }),
];
```

## Props

| Prop            | Type     | Required | Description                                                                                  |
| --------------- | -------- | -------- | -------------------------------------------------------------------------------------------- |
| `componentName` | `string` | ✅       | Name of the client component to render (must be registered in the client component registry) |
| `props`         | `object` | ❌       | Props to pass to the client component                                                        |
| `serverData`    | `object` | ❌       | Data fetched on the server and passed to the client component                                |
| `className`     | `string` | ❌       | Additional CSS classes for the wrapper component                                             |

## Registering Client Components

To add a new client component to the system:

1. **Create your client component**:

```typescript
// src/components/MyCustomComponent.tsx
'use client';

interface MyCustomComponentProps {
  title: string;
  data: any[];
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({ title, data }) => {
  return (
    <div>
      <h2>{title}</h2>
      {/* Your component logic */}
    </div>
  );
};

export default MyCustomComponent;
```

2. **Register it in the client component registry**:

```typescript
// src/lib/client-component-registry.ts
import MyCustomComponent from "@/components/MyCustomComponent";

export const clientComponentRegistry: ClientComponentRegistry = [
  // ... existing components
  {
    name: "MyCustomComponent",
    component: MyCustomComponent,
    description: "My custom interactive component",
    category: "interactive",
    tags: ["custom", "interactive", "form"],
    serverDataFetcher: async (props) => {
      // Optional: fetch server-side data
      return {
        data: await fetchMyData(),
      };
    },
  },
];
```

3. **Use it in your page content**:

```typescript
const pageContent = [
  createComponent({
    type: "ClientComponent",
    componentName: "MyCustomComponent",
    props: {
      title: "My Custom Component",
    },
    serverData: {
      data: await fetchMyData(),
    },
  }),
];
```

## Best Practices

### 1. Server-Side Data Fetching

- Use `serverData` for data that needs to be fetched on the server (SEO, performance)
- Use `props` for client-side configuration and event handlers

### 2. Error Handling

- Always provide fallback UI for missing components
- Use proper TypeScript types for your component props

### 3. Performance

- Use `Suspense` boundaries for loading states
- Consider code splitting for large client components

### 4. SEO Considerations

- Ensure critical content is available in `serverData`
- Use proper meta tags and structured data

## Examples

### Calculator Component

```typescript
createComponent({
  type: "ClientComponent",
  componentName: "AfACalculatorClient",
  serverData: {
    faqData: await getFAQData(),
    taxRates: await getTaxRates(),
  },
  props: {
    theme: "light",
    showAdvancedOptions: true,
  },
});
```

### Form Component

```typescript
createComponent({
  type: "ClientComponent",
  componentName: "ContactForm",
  serverData: {
    formFields: await getFormFields(),
    validationRules: await getValidationRules(),
  },
  props: {
    onSubmit: "handleSubmit",
    showProgress: true,
  },
});
```

### Interactive Chart

```typescript
createComponent({
  type: "ClientComponent",
  componentName: "DataVisualization",
  serverData: {
    chartData: await getChartData(),
    chartConfig: await getChartConfig(),
  },
  props: {
    interactive: true,
    showTooltips: true,
  },
});
```

## Troubleshooting

### Component Not Found

If you see "Client component not found in registry":

1. Check that the component is registered in `client-component-registry.ts`
2. Verify the `componentName` matches exactly (case-sensitive)
3. Ensure the component is properly exported

### Type Errors

If you encounter TypeScript errors:

1. Make sure your component props are properly typed
2. Check that `serverData` and `props` don't have conflicting keys
3. Verify the component is marked with `'use client'` directive

### Performance Issues

If the component loads slowly:

1. Consider code splitting for large components
2. Optimize server data fetching
3. Use proper loading states and Suspense boundaries
