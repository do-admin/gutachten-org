import { SubpageContent } from "./component-schemas";

/**
 * Options for merging programmatic content with base content
 */
export interface MergeProgrammaticOptions {
  /**
   * Override specific properties by component type
   * Example: { Hero: { h1Text: 'New Title' } }
   */
  overrides?: Record<string, Partial<any>>;

  /**
   * Override specific properties by component ID
   * Example: { 'hero-main': { h1Text: 'New Title' } }
   * This is the recommended approach as it's stable even when component order changes.
   */
  overridesById?: Record<string, Partial<any>>;

  /**
   * Insert components before a specific index
   */
  insertBefore?: { index: number; components: any[] };

  /**
   * Insert components after a specific index
   */
  insertAfter?: { index: number; components: any[] };

  /**
   * Remove components by index
   */
  remove?: number[];

  /**
   * Replace entire component at index
   */
  replace?: Record<number, any>;
}

/**
 * Merges programmatic content overrides with base content
 * Allows selective overriding, insertion, and removal of components
 *
 * @param baseConfig - The base content configuration
 * @param options - Override options
 * @returns Merged content configuration
 *
 * @example
 * // Override Hero component by ID (recommended - stable reference)
 * mergeProgrammaticContent(originalConfig, {
 *   overridesById: {
 *     'hero-main': { h1Text: 'New Title in {{programmaticInstanceName}}' }
 *   }
 * })
 *
 * @example
 * // Override multiple components by ID
 * mergeProgrammaticContent(originalConfig, {
 *   overridesById: {
 *     'hero-main': { h1Text: 'New Title' },
 *     'usps-section': { title: 'Updated USPs' }
 *   }
 * })
 *
 * @example
 * // Override by component type (affects all components of that type)
 * mergeProgrammaticContent(originalConfig, {
 *   overrides: {
 *     Hero: { h1Text: 'New Title in {{programmaticInstanceName}}' }
 *   }
 * })
 *
 * @example
 * // Override by ID and insert new component
 * mergeProgrammaticContent(originalConfig, {
 *   overridesById: {
 *     'hero-main': { h1Text: 'New Title' }
 *   },
 *   insertAfter: {
 *     index: 0,
 *     components: [newComponent]
 *   }
 * })
 */
export function mergeProgrammaticContent(
  baseConfig: SubpageContent,
  options: MergeProgrammaticOptions
): SubpageContent {
  let result = [...baseConfig];

  // Apply component overrides by type
  if (options.overrides) {
    result = result.map((component: any) => {
      const override = options.overrides![component.type];
      if (override) {
        return {
          ...component,
          ...override,
        };
      }
      return component;
    });
  }

  // Apply component overrides by ID (stable references)
  if (options.overridesById) {
    result = result.map((component: any) => {
      if (component.id) {
        const override = options.overridesById![component.id];
        if (override) {
          return {
            ...component,
            ...override,
          };
        }
      }
      return component;
    });
  }

  // Replace entire components
  if (options.replace) {
    result = result.map((component: any, index: number) => {
      const replacement = options.replace![index];
      return replacement || component;
    });
  }

  // Remove components (process in reverse to maintain indices)
  if (options.remove) {
    const sortedIndices = [...options.remove].sort((a, b) => b - a);
    sortedIndices.forEach((index) => {
      result.splice(index, 1);
    });
  }

  // Insert before
  if (options.insertBefore) {
    result.splice(
      options.insertBefore.index,
      0,
      ...options.insertBefore.components
    );
  }

  // Insert after
  if (options.insertAfter) {
    result.splice(
      options.insertAfter.index + 1,
      0,
      ...options.insertAfter.components
    );
  }

  return result;
}

/**
 * Deep merge helper for nested objects
 * Used when you need to override deeply nested properties
 *
 * @param target - Target object
 * @param source - Source object to merge
 * @returns Merged object
 */
export function deepMerge(target: any, source: any): any {
  if (typeof target !== "object" || typeof source !== "object") {
    return source;
  }

  const result = { ...target };

  Object.keys(source).forEach((key) => {
    if (
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      source[key] !== null
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

/**
 * Override component by its unique ID
 * This is the recommended approach as it's stable even when component order changes.
 *
 * @param baseConfig - The base content configuration
 * @param componentId - Unique ID of the component to override
 * @param overrides - Properties to override
 * @returns Content with overridden component
 * @throws Error if component with the given ID is not found
 *
 * @example
 * overrideComponentById(originalConfig, 'hero-main', {
 *   h1Text: 'About {{siteName}} in {{programmaticInstanceName}}'
 * })
 */
export function overrideComponentById(
  baseConfig: SubpageContent,
  componentId: string,
  overrides: Partial<any>
): SubpageContent {
  let found = false;
  const result = baseConfig.map((component: any) => {
    if (component.id === componentId) {
      found = true;
      return { ...component, ...overrides };
    }
    return component;
  });

  if (!found) {
    throw new Error(
      `Component with id "${componentId}" not found. Available IDs: ${baseConfig
        .map((c: any) => c.id || "(no id)")
        .join(", ")}`
    );
  }

  return result;
}

/**
 * Override component by ID with deep merge for nested properties
 *
 * @param baseConfig - The base content configuration
 * @param componentId - Unique ID of the component to override
 * @param overrides - Properties to deep merge
 * @returns Content with deep merged component
 * @throws Error if component with the given ID is not found
 *
 * @example
 * overrideComponentByIdDeep(originalConfig, 'hero-main', {
 *   buttons: [{ text: 'New Button', href: '/contact' }]
 * })
 */
export function overrideComponentByIdDeep(
  baseConfig: SubpageContent,
  componentId: string,
  overrides: Partial<any>
): SubpageContent {
  let found = false;
  const result = baseConfig.map((component: any) => {
    if (component.id === componentId) {
      found = true;
      return deepMerge(component, overrides);
    }
    return component;
  });

  if (!found) {
    throw new Error(
      `Component with id "${componentId}" not found. Available IDs: ${baseConfig
        .map((c: any) => c.id || "(no id)")
        .join(", ")}`
    );
  }

  return result;
}
