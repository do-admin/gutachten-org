// Template variable processor for subpage content
// Allows using variables like {siteName}, {contactEmail}, etc. in JSON files

import { getCurrentSite } from "./config";
import {
  createTemplateContext as createCentralizedContext,
  createSiteTemplateContext,
  processTemplate as processCentralizedTemplate,
  processTemplateObject as processCentralizedTemplateObject,
  getNestedValue,
  validateTemplate as validateCentralizedTemplate,
  getAvailableTemplateVariables,
} from "./template-variables";

export interface TemplateContext {
  siteName: string;
  siteId: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  domain: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  [key: string]: any;
}

/**
 * Creates a template context from the current site configuration
 * Uses centralized template variable definitions (site variables only)
 */
export function createTemplateContext(): TemplateContext {
  const currentSite = getCurrentSite();
  return createSiteTemplateContext(currentSite) as TemplateContext;
}

/**
 * Processes a string template with variable substitution
 * Supports nested object access with dot notation (e.g., {address.city})
 * Uses centralized template processing
 */
export function processTemplate(
  template: string,
  context: TemplateContext
): string {
  return processCentralizedTemplate(template, context);
}

/**
 * Processes an object recursively, applying template variables to all string values
 * Uses centralized template processing
 */
export function processTemplateObject(
  obj: any,
  context: TemplateContext | Record<string, any>
): any {
  return processCentralizedTemplateObject(obj, context);
}

/**
 * Gets a nested value from an object using dot notation
 * Example: getNestedValue(obj, 'address.city') returns obj.address.city
 * Uses centralized implementation
 */
export { getNestedValue };

/**
 * Available template variables for documentation
 * Uses centralized definitions
 */
export const AVAILABLE_TEMPLATE_VARIABLES = getAvailableTemplateVariables();

/**
 * Validates that all template variables in a string are available
 * Uses centralized validation
 */
export function validateTemplate(
  template: string,
  context: TemplateContext
): {
  isValid: boolean;
  missingVariables: string[];
  availableVariables: string[];
} {
  return validateCentralizedTemplate(template, context);
}
