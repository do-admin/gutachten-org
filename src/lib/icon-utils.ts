import React from "react";
import * as LucideIcons from "lucide-react";

// Type for valid Lucide icon names
export type LucideIconName = keyof typeof LucideIcons;

// List of all available Lucide icon names
export const LUCIDE_ICON_NAMES: LucideIconName[] = Object.keys(
  LucideIcons
) as LucideIconName[];

// Function to validate if an icon name is valid
export function isValidIconName(iconName: string): iconName is LucideIconName {
  return iconName.charAt(0).toUpperCase() + iconName.slice(1) in LucideIcons;
}

// Function to get an icon component by name
export function getIconComponent(
  iconName: string
): React.ComponentType<any> | null {
  if (!isValidIconName(iconName)) {
    console.warn(`Invalid icon name: ${iconName}`);
    return null;
  }

  return LucideIcons[iconName] as React.ComponentType<any>;
}

// Function to validate icon names in an object
export function validateIconNames(
  obj: any,
  componentType?: string,
  path: string = ""
): string[] {
  const errors: string[] = [];

  // Skip icon validation for components that use image paths instead of icon names
  const skipIconValidation = componentType === "ServiceOffers";
  const isInCardsArray =
    path.includes("cards") || (path.includes("[") && path.includes("cards"));

  if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (key === "icon" && typeof value === "string") {
        // Skip validation for ServiceOffers component or cards array items
        if (!skipIconValidation && !isInCardsArray && !isValidIconName(value)) {
          errors.push(`Invalid icon name '${value}' at ${currentPath}`);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            errors.push(
              ...validateIconNames(
                item,
                componentType,
                `${currentPath}[${index}]`
              )
            );
          }
        });
      } else if (typeof value === "object" && value !== null) {
        errors.push(...validateIconNames(value, componentType, currentPath));
      }
    }
  }

  return errors;
}

// React component for dynamic icon rendering
export function DynamicIcon({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) {
  const IconComponent = getIconComponent(name);

  if (!IconComponent) {
    console.warn(`Icon '${name}' not found`);
    return null;
  }

  return React.createElement(IconComponent, props);
}
