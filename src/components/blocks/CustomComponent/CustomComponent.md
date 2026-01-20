# CustomComponent

A flexible wrapper component that can render any type of custom component (client, server, or hybrid). Supports dynamic imports, lazy loading, and various rendering modes. Perfect for integrating any custom component into the template system.

## Features

- **Multiple Component Types**: Supports client, server, and hybrid components
- **Flexible Rendering**: Immediate, lazy, or dynamic rendering modes
- **Dynamic Imports**: Load components on-demand from custom import paths
- **Server-side Data Fetching**: Pass data from server to any component type
- **Error Handling**: Graceful fallbacks for missing components and import errors
- **Loading States**: Built-in loading indicators for async operations
- **Type Safety**: Full TypeScript support with proper prop validation

## Usage

### Basic Usage

```typescript
import { createComponent } from "@/lib/component-schemas";

const pageContent = [
  createComponent({
    type: "CustomComponent",
    componentName: "MyCustomComponent",
    componentType: "client", // or 'server', 'hybrid'
    props: {
      // Props to pass to the custom component
      theme: "light",
      showResults: true,
    },
    serverData: {
      // Data fetched on the server
      data: await fetchData(),
      config: getConfig(),
    },
    className: "my-8",
  }),
];
```

### Advanced Usage with Different Rendering Modes

```typescript
// Immediate rendering (default)
createComponent({
  type: "CustomComponent",
  componentName: "MyComponent",
  renderMode: "immediate",
  // ... other props
});

// Lazy loading with delay
createComponent({
  type: "CustomComponent",
  componentName: "HeavyComponent",
  renderMode: "lazy",
  // ... other props
});

// Dynamic import from custom path
createComponent({
  type: "CustomComponent",
  componentName: "DynamicComponent",
  renderMode: "dynamic",
  importPath: "@/components/custom/DynamicComponent",
  // ... other props
});
```

## Props

| Prop            | Type     | Required | Description                                                         |
| --------------- | -------- | -------- | ------------------------------------------------------------------- |
| `componentName` | `string` | ✅       | Name of the custom component to render                              |
| `componentType` | `string` | ❌       | Type of component (client, server, hybrid) - defaults to 'client'   |
| `props`         | `object` | ❌       | Props to pass to the custom component                               |
| `serverData`    | `object` | ❌       | Data fetched on the server and passed to the custom component       |
| `className`     | `string` | ❌       | Additional CSS classes for the wrapper component                    |
| `importPath`    | `string` | ❌       | Custom import path for the component (for dynamic imports)          |
| `renderMode`    | `string` | ❌       | Rendering mode (immediate, lazy, dynamic) - defaults to 'immediate' |

## Component Types

### Client Components

Components that require client-side JavaScript and interactivity.

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "InteractiveChart",
  componentType: "client",
  props: {
    interactive: true,
    showTooltips: true,
  },
  serverData: {
    chartData: await fetchChartData(),
  },
});
```

### Server Components

Components that are rendered on the server for SEO and performance.

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "ServerDataTable",
  componentType: "server",
  props: {
    sortable: true,
    paginated: true,
  },
  serverData: {
    data: await fetchTableData(),
    columns: await getTableColumns(),
  },
});
```

### Hybrid Components

Components that combine server-side rendering with client-side interactivity.

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "HybridForm",
  componentType: "hybrid",
  props: {
    clientValidation: true,
    realTimeUpdates: true,
  },
  serverData: {
    formFields: await getFormFields(),
    validationRules: await getValidationRules(),
  },
});
```

## Rendering Modes

### Immediate Rendering (Default)

Components are rendered immediately when the page loads.

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "MyComponent",
  renderMode: "immediate", // default
});
```

### Lazy Loading

Components are loaded with a slight delay to improve initial page load performance.

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "HeavyComponent",
  renderMode: "lazy",
});
```

### Dynamic Import

Components are loaded on-demand from custom import paths.

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "DynamicComponent",
  renderMode: "dynamic",
  importPath: "@/components/custom/DynamicComponent",
});
```

## Registering Custom Components

To add a new custom component to the system:

1. **Create your custom component**:

```typescript
// src/components/MyCustomComponent.tsx
'use client'; // or omit for server components

interface MyCustomComponentProps {
  title: string;
  data: any[];
  onAction?: (result: any) => void;
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({
  title,
  data,
  onAction
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {/* Your component logic */}
    </div>
  );
};

export default MyCustomComponent;
```

2. **Register it in the custom component registry**:

```typescript
// src/lib/custom-component-registry.ts
import MyCustomComponent from "@/components/MyCustomComponent";

export const customComponentRegistry: CustomComponentRegistry = [
  // ... existing components
  {
    name: "MyCustomComponent",
    component: MyCustomComponent,
    description: "My custom component with flexible rendering",
    category: "interactive",
    tags: ["custom", "interactive", "flexible"],
    componentType: "client", // or 'server', 'hybrid'
    serverDataFetcher: async (props) => {
      // Optional: fetch server-side data
      return {
        data: await fetchMyData(),
      };
    },
    renderMode: "immediate", // or 'lazy', 'dynamic'
    version: "1.0.0",
  },
];
```

3. **Use it in your page content**:

```typescript
const pageContent = [
  createComponent({
    type: "CustomComponent",
    componentName: "MyCustomComponent",
    componentType: "client",
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

### 1. Component Type Selection

**Use `client` for:**

- Interactive components (forms, calculators, charts)
- Components requiring browser APIs
- Real-time updates and user interactions

**Use `server` for:**

- Static content with SEO requirements
- Data-heavy components
- Components that don't need interactivity

**Use `hybrid` for:**

- Components that need both SEO and interactivity
- Progressive enhancement scenarios
- Components with server-side data and client-side features

### 2. Rendering Mode Selection

**Use `immediate` for:**

- Critical above-the-fold content
- Small, lightweight components
- Components needed immediately

**Use `lazy` for:**

- Below-the-fold content
- Heavy components that can load later
- Performance optimization

**Use `dynamic` for:**

- Components loaded conditionally
- Large components with custom import paths
- Code splitting scenarios

### 3. Error Handling

The `CustomComponent` wrapper includes comprehensive error handling:

```typescript
// Component not found
if (!ComponentToRender) {
  return (
    <div className="error-container">
      <p>Component "{componentName}" not found</p>
      <p>Available components: {availableComponents.join(', ')}</p>
    </div>
  );
}

// Import errors
if (error) {
  return (
    <div className="error-container">
      <p>Error loading component</p>
      <p>{error}</p>
    </div>
  );
}
```

### 4. Performance Optimization

```typescript
// Use lazy loading for heavy components
createComponent({
  type: "CustomComponent",
  componentName: "HeavyChart",
  renderMode: "lazy",
  componentType: "client",
});

// Use dynamic imports for conditional components
createComponent({
  type: "CustomComponent",
  componentName: "ConditionalComponent",
  renderMode: "dynamic",
  importPath: "@/components/conditional/ConditionalComponent",
});
```

## Examples

### Calculator Component

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "AfACalculatorClient",
  componentType: "client",
  renderMode: "immediate",
  props: {
    theme: "light",
    showAdvancedOptions: true,
  },
  serverData: {
    faqData: await fetchFAQData(),
    taxRates: await fetchTaxRates(),
  },
});
```

### Data Table Component

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "ServerDataTable",
  componentType: "server",
  renderMode: "immediate",
  props: {
    sortable: true,
    paginated: true,
  },
  serverData: {
    data: await fetchTableData(),
    columns: await getTableColumns(),
  },
});
```

### Interactive Chart Component

```typescript
createComponent({
  type: "CustomComponent",
  componentName: "InteractiveChart",
  componentType: "hybrid",
  renderMode: "lazy",
  props: {
    interactive: true,
    showTooltips: true,
  },
  serverData: {
    chartData: await fetchChartData(),
    chartConfig: await getChartConfig(),
  },
});
```

## Troubleshooting

### Component Not Found

If you see "Component not found":

1. Check that the component is registered in `custom-component-registry.ts`
2. Verify the `componentName` matches exactly (case-sensitive)
3. Ensure the component is properly exported

### Import Errors

If you encounter import errors:

1. Verify the `importPath` is correct and accessible
2. Check that the component exists at the specified path
3. Ensure proper export/import syntax

### Type Errors

If you encounter TypeScript errors:

1. Make sure your component props are properly typed
2. Check that `serverData` and `props` don't have conflicting keys
3. Verify the component is marked with appropriate directives (`'use client'` for client components)

### Performance Issues

If the component loads slowly:

1. Consider using `renderMode: 'lazy'` for below-the-fold content
2. Use dynamic imports for large components
3. Optimize server data fetching
4. Consider code splitting for heavy components

## Migration from ClientComponent

If you have existing `ClientComponent` usage, you can easily migrate to `CustomComponent`:

### Before (ClientComponent)

```typescript
createComponent<ClientComponent>({
  type: "ClientComponent",
  componentName: "MyComponent",
  props: { theme: "light" },
  serverData: { data: await fetchData() },
});
```

### After (CustomComponent)

```typescript
createComponent<CustomComponent>({
  type: "CustomComponent",
  componentName: "MyComponent",
  componentType: "client", // explicit type
  renderMode: "immediate", // explicit mode
  props: { theme: "light" },
  serverData: { data: await fetchData() },
});
```

The `CustomComponent` provides more flexibility and control while maintaining backward compatibility with the `ClientComponent` pattern.
