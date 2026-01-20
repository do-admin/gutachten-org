import ComponentRegistryService from "./component-registry";
import { ComponentSchema, componentSchemas } from "./component-schemas";

/**
 * Utility functions for working with the component registry
 */

/**
 * Auto-register a component with basic schema
 */
export function autoRegisterComponent(
  name: string,
  component: React.ComponentType<any>,
  description?: string,
  category?: string,
  tags?: string[]
): void {
  const schema: ComponentSchema = {
    type: name,
    name: name.replace(/([A-Z])/g, " $1").trim(), // Convert PascalCase to readable name
    description: description || `Auto-registered component: ${name}`,
    props: {}, // Will be populated by component introspection if needed
  };

  ComponentRegistryService.registerComponent(
    name,
    component,
    schema,
    category,
    tags
  );
}

/**
 * Register multiple components at once
 */
export function registerComponents(components: {
  [name: string]: {
    component: React.ComponentType<any>;
    schema: ComponentSchema;
    category?: string;
    tags?: string[];
  };
}): void {
  Object.entries(components).forEach(([name, config]) => {
    ComponentRegistryService.registerComponent(
      name,
      config.component,
      config.schema,
      config.category,
      config.tags
    );
  });
}

/**
 * Get component info for debugging
 */
export function getComponentInfo(name: string): {
  exists: boolean;
  schema?: ComponentSchema;
  category?: string;
  tags?: string[];
} {
  const schema = ComponentRegistryService.getSchema(name);
  const allComponents = ComponentRegistryService.getAllComponents();
  const entry = allComponents.find((comp) => comp.name === name);

  return {
    exists: !!schema,
    schema: schema || undefined,
    category: entry?.category,
    tags: entry?.tags,
  };
}

/**
 * List all available components with their info
 */
export function listComponents(): Array<{
  name: string;
  displayName: string;
  description: string;
  category?: string;
  tags?: string[];
  propCount: number;
}> {
  const allComponents = ComponentRegistryService.getAllComponents();

  return Object.entries(allComponents).map(([name, entry]) => ({
    name,
    displayName: entry.schema.name,
    description: entry.schema.description,
    category: entry.category,
    tags: entry.tags,
    propCount: Object.keys(entry.schema.props).length,
  }));
}

/**
 * Search components by name, description, or tags
 */
export function searchComponents(query: string): Array<{
  name: string;
  displayName: string;
  description: string;
  category?: string;
  tags?: string[];
  matchScore: number;
}> {
  const allComponents = listComponents();
  const lowerQuery = query.toLowerCase();

  return allComponents
    .map((component) => {
      let score = 0;

      // Exact name match
      if (component.name.toLowerCase() === lowerQuery) score += 100;

      // Name contains query
      if (component.name.toLowerCase().includes(lowerQuery)) score += 50;

      // Display name contains query
      if (component.displayName.toLowerCase().includes(lowerQuery)) score += 30;

      // Description contains query
      if (component.description.toLowerCase().includes(lowerQuery)) score += 20;

      // Tags contain query
      if (component.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)))
        score += 10;

      return { ...component, matchScore: score };
    })
    .filter((component) => component.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Validate a page structure against available components
 */
export function validatePageStructure(pageStructure: {
  components: Array<{ type: string; contentRef: string }>;
}): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  pageStructure.components.forEach((component, index) => {
    const componentInfo = getComponentInfo(component.type);

    if (!componentInfo.exists) {
      errors.push(
        `Component "${component.type}" at index ${index} is not registered`
      );
    }

    if (!component.contentRef) {
      warnings.push(
        `Component "${component.type}" at index ${index} has no contentRef`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generate component documentation in markdown format
 */
export function generateComponentDocs(): string {
  const components = listComponents();
  const categories = [
    ...new Set(components.map((c) => c.category).filter(Boolean)),
  ];

  let docs = "# Component Registry Documentation\n\n";
  docs += `Total components: ${components.length}\n\n`;

  if (categories.length > 0) {
    docs += "## Categories\n\n";
    categories.forEach((category) => {
      const categoryComponents = components.filter(
        (c) => c.category === category
      );
      docs += `### ${category} (${categoryComponents.length})\n\n`;

      categoryComponents.forEach((component) => {
        docs += `- **${component.displayName}** (${component.name})\n`;
        docs += `  - ${component.description}\n`;
        if (component.tags && component.tags.length > 0) {
          docs += `  - Tags: ${component.tags.join(", ")}\n`;
        }
        docs += `  - Props: ${component.propCount}\n\n`;
      });
    });
  }

  docs += "## All Components\n\n";
  components.forEach((component) => {
    docs += `### ${component.displayName}\n\n`;
    docs += `**Name:** \`${component.name}\`\n\n`;
    docs += `**Description:** ${component.description}\n\n`;
    if (component.category) {
      docs += `**Category:** ${component.category}\n\n`;
    }
    if (component.tags && component.tags.length > 0) {
      docs += `**Tags:** ${component.tags.join(", ")}\n\n`;
    }
    docs += `**Props:** ${component.propCount}\n\n`;
    docs += "---\n\n";
  });

  return docs;
}

const componentUtils = {
  autoRegisterComponent,
  registerComponents,
  getComponentInfo,
  listComponents,
  searchComponents,
  validatePageStructure,
  generateComponentDocs,
};

export default componentUtils;
