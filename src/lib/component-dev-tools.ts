import ComponentRegistryService from "./component-registry";
import {
  listComponents,
  searchComponents,
  generateComponentDocs,
} from "./component-utils";
import logger from "./logger";

/**
 * Development tools for component registry management
 * These functions are only available in development mode
 */

/**
 * Log all registered components to console
 */
export function logComponents(): void {
  if (process.env.NODE_ENV !== "development") {
    logger.warn("Component dev tools are only available in development mode");
    return;
  }

  const components = listComponents();
  logger.group("🔧 Component Registry");
  logger.log(`Total components: ${components.length}`);

  components.forEach((component) => {
    logger.group(`📦 ${component.displayName} (${component.name})`);
    logger.log(`Description: ${component.description}`);
    logger.log(`Category: ${component.category || "Uncategorized"}`);
    logger.log(`Tags: ${component.tags?.join(", ") || "None"}`);
    logger.log(`Props: ${component.propCount}`);
    logger.groupEnd();
  });

  logger.groupEnd();
}

/**
 * Search and log components matching a query
 */
export function searchAndLogComponents(query: string): void {
  if (process.env.NODE_ENV !== "development") {
    logger.warn("Component dev tools are only available in development mode");
    return;
  }

  const results = searchComponents(query);
  logger.group(`🔍 Search Results for "${query}"`);

  if (results.length === 0) {
    logger.log("No components found");
  } else {
    results.forEach((component) => {
      logger.log(
        `📦 ${component.displayName} (${component.name}) - Score: ${component.matchScore}`
      );
      logger.log(`   ${component.description}`);
    });
  }

  logger.groupEnd();
}

/**
 * Validate a component's props
 */
export function validateComponentProps(
  componentName: string,
  props: Record<string, unknown>
): void {
  if (process.env.NODE_ENV !== "development") {
    logger.warn("Component dev tools are only available in development mode");
    return;
  }

  const validation = ComponentRegistryService.validateProps(
    componentName,
    props
  );

  logger.group(`✅ Props Validation for "${componentName}"`);
  logger.log(`Valid: ${validation.valid ? "✅" : "❌"}`);

  if (validation.errors.length > 0) {
    logger.group("❌ Errors:");
    validation.errors.forEach((error) => logger.log(`  - ${error}`));
    logger.groupEnd();
  }

  logger.groupEnd();
}

/**
 * Get component schema and log it
 */
export function logComponentSchema(componentName: string): void {
  if (process.env.NODE_ENV !== "development") {
    logger.warn("Component dev tools are only available in development mode");
    return;
  }

  const schema = ComponentRegistryService.getSchema(componentName);

  if (!schema) {
    logger.error(`❌ Component "${componentName}" not found in registry`);
    return;
  }

  logger.group(`📋 Schema for "${componentName}"`);
  logger.log(`Name: ${schema.name}`);
  logger.log(`Description: ${schema.description}`);

  logger.group("Props:");
  Object.entries(schema.props).forEach(([propName, propSchema]) => {
    logger.log(`  ${propName}:`);
    logger.log(`    Type: ${propSchema.type}`);
    logger.log(`    Required: ${propSchema.required ? "✅" : "❌"}`);
    if (propSchema.description) {
      logger.log(`    Description: ${propSchema.description}`);
    }
    if (propSchema.default !== undefined) {
      logger.log(`    Default: ${JSON.stringify(propSchema.default)}`);
    }
  });
  logger.groupEnd();

  logger.groupEnd();
}

/**
 * Generate and log component documentation
 */
export function logComponentDocs(): void {
  if (process.env.NODE_ENV !== "development") {
    logger.warn("Component dev tools are only available in development mode");
    return;
  }

  const docs = generateComponentDocs();
  logger.log("📚 Component Documentation:");
  logger.log(docs);
}

/**
 * Get registry statistics
 */
export function getRegistryStats(): {
  totalComponents: number;
  categories: Record<string, number>;
  totalProps: number;
  averagePropsPerComponent: number;
} {
  if (process.env.NODE_ENV !== "development") {
    console.warn("Component dev tools are only available in development mode");
    return {
      totalComponents: 0,
      categories: {},
      totalProps: 0,
      averagePropsPerComponent: 0,
    };
  }

  const components = listComponents();
  const categories: Record<string, number> = {};
  let totalProps = 0;

  components.forEach((component) => {
    const category = component.category || "Uncategorized";
    categories[category] = (categories[category] || 0) + 1;
    totalProps += component.propCount;
  });

  return {
    totalComponents: components.length,
    categories,
    totalProps,
    averagePropsPerComponent:
      components.length > 0 ? totalProps / components.length : 0,
  };
}

/**
 * Log registry statistics
 */
export function logRegistryStats(): void {
  if (process.env.NODE_ENV !== "development") {
    logger.warn("Component dev tools are only available in development mode");
    return;
  }

  const stats = getRegistryStats();

  logger.group("📊 Component Registry Statistics");
  logger.log(`Total Components: ${stats.totalComponents}`);
  logger.log(`Total Props: ${stats.totalProps}`);
  logger.log(
    `Average Props per Component: ${stats.averagePropsPerComponent.toFixed(1)}`
  );

  logger.group("Categories:");
  Object.entries(stats.categories).forEach(([category, count]) => {
    logger.log(`  ${category}: ${count}`);
  });
  logger.groupEnd();

  logger.groupEnd();
}

/**
 * Make dev tools available globally in development
 */
export function enableDevTools(): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // Make dev tools available on window object for easy access in browser console
  if (typeof window !== "undefined") {
    (window as any).componentDevTools = {
      logComponents,
      searchAndLogComponents,
      validateComponentProps,
      logComponentSchema,
      logComponentDocs,
      logRegistryStats,
      getRegistryStats,
    };

    logger.log(
      "🔧 Component dev tools enabled! Use window.componentDevTools to access them."
    );
  }
}

const componentDevTools = {
  logComponents,
  searchAndLogComponents,
  validateComponentProps,
  logComponentSchema,
  logComponentDocs,
  logRegistryStats,
  getRegistryStats,
  enableDevTools,
};

export default componentDevTools;
