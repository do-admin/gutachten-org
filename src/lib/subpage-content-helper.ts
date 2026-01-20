import type { SubpageContent, MetadataComponent } from "./component-schemas";
import type { SubpageMetadata } from "./metadata-types";
import { createComponent } from "./component-schemas";

/**
 * Create subpage content with metadata
 * This helper function allows you to define metadata within subpage files
 */
export function createSubpageContentWithMetadata(
  pageKey: string,
  metadata: SubpageMetadata,
  components: SubpageContent
): SubpageContent {
  // Create metadata component
  const metadataComponent: MetadataComponent =
    createComponent<MetadataComponent>({
      type: "Metadata",
      metadata,
      pageKey,
    });

  // Return components with metadata at the beginning
  return [metadataComponent, ...components];
}

/**
 * Extract metadata from subpage content
 * This function extracts metadata components from the content array
 */
export function extractMetadataFromContent(content: SubpageContent): {
  metadata: SubpageMetadata | null;
  components: SubpageContent;
} {
  const metadataComponent = content.find(
    (component) => component.type === "Metadata"
  ) as MetadataComponent | undefined;

  if (!metadataComponent) {
    return { metadata: null, components: content };
  }

  const components = content.filter(
    (component) => component.type !== "Metadata"
  );

  return {
    metadata: metadataComponent.metadata,
    components,
  };
}

/**
 * Helper function to create metadata for a page
 */
export function createPageMetadata(
  title: string,
  description: string,
  options: Partial<SubpageMetadata> = {}
): SubpageMetadata {
  return {
    title,
    description,
    ...options,
  };
}
