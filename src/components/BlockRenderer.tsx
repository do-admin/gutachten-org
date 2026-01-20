import React from "react";
import ComponentRegistryService from "@/lib/component-registry";
import logger from "@/lib/logger";
import { detectHtmlInProps } from "@/lib/html-detector";

export interface BlockComponent {
  type: string;
  props: Record<string, unknown>;
}

interface BlockRendererProps {
  blocks: BlockComponent[];
  className?: string;
  validateProps?: boolean;
  onError?: (error: string, block: BlockComponent) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  blocks,
  className = "",
  validateProps = false,
  onError,
}) => {
  return (
    <div
      className={className}
      herokit-id="694e8845-73e5-4d33-a7fa-4de6aeecf041"
    >
      {blocks.map((block, index) => {
        // Get component from registry
        const Component = ComponentRegistryService.getComponent(block.type);

        if (!Component) {
          const error = `Block component "${block.type}" not found in registry`;
          logger.warn(error);
          onError?.(error, block);
          return null;
        }

        // Validate props if requested
        if (validateProps) {
          const validation = ComponentRegistryService.validateProps(
            block.type,
            block.props
          );
          if (!validation.valid) {
            const error = `Invalid props for component "${block.type}": ${validation.errors.join(", ")}`;
            logger.warn(error);
            onError?.(error, block);
            // Continue rendering even with validation errors (non-blocking)
          }
        }

        // Clean props to prevent invalid children prop
        // If props contains a 'children' property that's a plain object (not ReactNode), remove it
        const cleanedProps = { ...block.props };
        if (cleanedProps.children) {
          const children = cleanedProps.children;
          // Check if children is a plain object (not a valid React element)
          if (
            typeof children === "object" &&
            children !== null &&
            !React.isValidElement(children) &&
            !Array.isArray(children) &&
            children.constructor === Object
          ) {
            logger.error(
              `‼️ Component "${block.type}" received invalid children prop (plain object). Removing it to prevent React error.`
            );
            delete cleanedProps.children;
          }
        }

        // Extract componentId from props (the 'id' field from component config)
        const componentId = cleanedProps.id as string | undefined;
        // Remove 'id' from props to avoid conflicts
        const { id, ...propsWithoutId } = cleanedProps;

        // Detect HTML in props and add metadata
        const htmlPropsMap = detectHtmlInProps(cleanedProps);
        const propsWithHtmlMetadata = {
          ...propsWithoutId,
          ...(Object.keys(htmlPropsMap).length > 0 && {
            _htmlProps: htmlPropsMap,
          }),
        };

        // Wrap component in a div with data-component-id for text editor identification
        // This is semantically valid - divs are flow containers and don't affect
        // the semantic meaning of wrapped elements (e.g., <section>)
        return (
          <div
            key={`${block.type}-${index}`}
            {...(componentId && { "data-component-id": componentId })}
          >
            <Component {...propsWithHtmlMetadata} />
          </div>
        );
      })}
    </div>
  );
};

export default BlockRenderer;
