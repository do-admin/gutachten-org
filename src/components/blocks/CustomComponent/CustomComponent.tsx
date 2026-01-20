"use client";

import React, { Suspense, useState, useEffect } from "react";
import CustomComponentRegistryService from "@/lib/custom-component-registry";
import { CustomComponent as CustomComponentType } from "@/lib/component-schemas";

export interface CustomComponentProps extends CustomComponentType {
  // Additional props can be added here if needed
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  componentName,
  componentType = "client",
  props = {},
  serverData = {},
  className = "",
  importPath,
  renderMode = "immediate",
}) => {
  // Get the component from the registry
  const registryEntry = CustomComponentRegistryService.getEntry(componentName);
  const RegistryComponent = registryEntry?.component;

  const [ComponentToRender, setComponentToRender] =
    useState<React.ComponentType<any> | null>(RegistryComponent || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle different rendering modes
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === "undefined") {
      return;
    }

    const loadComponent = async () => {
      if (renderMode === "immediate" && RegistryComponent) {
        setComponentToRender(RegistryComponent);
        return;
      }

      if (renderMode === "lazy" && RegistryComponent) {
        setLoading(true);
        try {
          // Simulate lazy loading delay
          await new Promise((resolve) => setTimeout(resolve, 100));
          setComponentToRender(RegistryComponent);
        } catch (err) {
          setError(`Failed to load component: ${err}`);
        } finally {
          setLoading(false);
        }
        return;
      }

      if (renderMode === "dynamic" && importPath) {
        setLoading(true);
        try {
          // For dynamic imports, we need to handle them differently
          // Since Next.js can't resolve variable import paths at build time,
          // we'll use a registry-based approach instead
          const dynamicEntry =
            CustomComponentRegistryService.getComponentByImportPath(importPath);

          if (dynamicEntry && dynamicEntry.component) {
            // Simulate dynamic loading delay
            await new Promise((resolve) => setTimeout(resolve, 100));
            setComponentToRender(dynamicEntry.component);
          } else {
            throw new Error(
              `No component found for import path: ${importPath}`
            );
          }
        } catch (err) {
          setError(
            `Failed to load dynamic component from ${importPath}: ${err}`
          );
        } finally {
          setLoading(false);
        }
        return;
      }

      // Fallback to registry component
      if (RegistryComponent) {
        setComponentToRender(RegistryComponent);
      }
    };

    loadComponent();
  }, [componentName, renderMode, importPath, RegistryComponent]);

  // Error handling
  if (error) {
    return (
      <div
        className={`rounded-lg border border-red-300 bg-red-50 p-4 ${className}`}
      >
        <p
          className="font-semibold text-red-600"
          herokit-id="0d3b4639-0580-44cb-ac63-4bd19410a8c4"
        >
          Error loading component
        </p>
        <p
          className="mt-1 text-sm text-red-500"
          herokit-id="7fe36981-41e8-4470-ab2c-fe1147e67710"
        >
          {error}
        </p>
        <p
          className="mt-2 text-xs text-red-400"
          herokit-id="83d6e2f5-3911-4e61-a33e-e458307de4a8"
        >
          Component: {componentName} | Type: {componentType} | Mode:{" "}
          {renderMode}
        </p>
      </div>
    );
  }

  if (!ComponentToRender && !loading) {
    return (
      <div
        className={`rounded-lg border border-red-300 bg-red-50 p-4 ${className}`}
      >
        <p
          className="font-semibold text-red-600"
          herokit-id="554ec3bb-78fb-4168-87db-57608f237d82"
        >
          Component "{componentName}" not found
        </p>
        <p
          className="mt-1 text-sm text-red-500"
          herokit-id="c14abf82-340b-4a81-8464-5e54162e0332"
        >
          Available components:{" "}
          {CustomComponentRegistryService.getAllComponents()
            .map((c) => c.name)
            .join(", ")}
        </p>
        <p
          className="mt-2 text-xs text-red-400"
          herokit-id="ebbd92c5-00e9-43a9-8841-04289d994408"
        >
          Type: {componentType} | Mode: {renderMode}
          {importPath && ` | Import Path: ${importPath}`}
        </p>
      </div>
    );
  }

  // Merge server data with props
  const mergedProps = {
    ...props,
    ...serverData,
  };

  // Loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <span
          className="ml-2 text-gray-600"
          herokit-id="e2f67f9e-e3b2-4968-bc3c-a6c00db955ac"
        >
          Loading {componentName}...
        </span>
      </div>
    );
  }

  // Render the component
  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <span
              className="ml-2 text-gray-600"
              herokit-id="4435ec96-17fe-451e-a4cb-0abf7328b93a"
            >
              Loading {componentName}...
            </span>
          </div>
        }
      >
        {ComponentToRender && <ComponentToRender {...mergedProps} />}
      </Suspense>
    </div>
  );
};

export default CustomComponent;
