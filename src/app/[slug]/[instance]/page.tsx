import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPageDataWithContent } from "@/lib/config";
import { getNextJsMetadata } from "@/lib/metadata-loader";
import BlockRenderer from "@/components/BlockRenderer";
import { findInstanceBySlug, getInstanceSlug } from "@/lib/slug-utils";
import { StructuredData } from "@/components/StructuredData";

interface PageProps {
  params: Promise<{ slug: string; instance: string }>;
}

// Helper function to map slug to the correct pageKey
// Maps new route patterns (nutzungsdauer/Bochum, etc.) to their corresponding page templates
// Reads from site configuration with fallback for backward compatibility
//
// OPTIONAL CONFIGURATION: If slugToPageKeyMap is not provided in site config,
// this function returns the slug as-is (old behavior for existing sites)
function mapSlugToPageKey(
  slug: string,
  programmaticConfig?: Record<string, unknown>
): string {
  // Try to get mapping from site configuration (OPTIONAL)
  // slugToPageKeyMap is optional - old sites without this config will use slug directly
  const slugToPageKeyMap =
    (programmaticConfig?.slugToPageKeyMap as Record<string, string>) ||
    undefined;

  // If mapping exists and has entry for this slug, use it
  if (slugToPageKeyMap && slugToPageKeyMap[slug]) {
    return slugToPageKeyMap[slug];
  }

  // FALLBACK: return slug as-is (for backward compatibility with existing sites)
  // This is the default behavior for old sites without slugToPageKeyMap configuration
  // Old sites expect slug to be used directly as pageKey (e.g., "about-city" -> "about-city")
  return slug;
}

export async function generateStaticParams() {
  const { getSiteStructure, getCurrentSite } = await import("@/lib/config");
  const siteStructure = getSiteStructure();
  const currentSite = getCurrentSite();

  const programmaticConfig = (currentSite as any).programmatic as Record<
    string,
    unknown
  >;
  if (!programmaticConfig) {
    // For static export, we need to provide at least one param
    // Return a placeholder that will show 404
    return [{ slug: "placeholder", instance: "placeholder" }];
  }

  const instances =
    (programmaticConfig.programmaticInstances as string[]) || [];
  const params: Array<{ slug: string; instance: string }> = [];

  // Get route patterns from slugToPageKeyMap keys (derived from configuration)
  // This replaces the old routePatterns array - routes are now derived from the mapping keys
  // If slugToPageKeyMap is not provided, the code will fall back to generating routes from site structure
  const slugToPageKeyMap =
    (programmaticConfig.slugToPageKeyMap as Record<string, string>) ||
    undefined;
  const routePatterns =
    slugToPageKeyMap && Object.keys(slugToPageKeyMap).length > 0
      ? Object.keys(slugToPageKeyMap)
      : undefined;

  // Generate routes for configured patterns (ONLY if slugToPageKeyMap is provided)
  // This is optional - old sites without slugToPageKeyMap will skip this and use site structure instead
  if (routePatterns && routePatterns.length > 0) {
    routePatterns.forEach((routePattern) => {
      instances.forEach((instance) => {
        params.push({
          slug: routePattern,
          instance: getInstanceSlug(instance),
        });
      });
    });
  }

  // For static export, we need to provide at least one param
  // If no params generated, return a placeholder that will show 404
  if (params.length === 0) {
    return [{ slug: "placeholder", instance: "placeholder" }];
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, instance } = await params;
  const { getCurrentSite } = await import("@/lib/config");
  const currentSite = getCurrentSite();

  const programmaticConfig = (currentSite as any).programmatic as Record<
    string,
    unknown
  >;
  const instances =
    (programmaticConfig?.programmaticInstances as string[]) || [];

  // Decode URL-encoded instance parameter (handles special characters like ü in München)
  let decodedInstance = instance;
  try {
    decodedInstance = decodeURIComponent(instance);
  } catch (e) {
    // If decoding fails, use original instance
    decodedInstance = instance;
  }

  const matchedInstance = findInstanceBySlug(decodedInstance, instances);

  if (!matchedInstance) {
    return { title: "Page Not Found" };
  }

  // Map slug to the correct pageKey (using site configuration)
  const pageKey = mapSlugToPageKey(slug, programmaticConfig);

  try {
    return await getNextJsMetadata(pageKey, {}, {}, {}, matchedInstance);
  } catch (error) {
    console.error(`Error loading metadata for ${slug}/${instance}:`, error);
    return {
      title: "Page Not Found",
    };
  }
}

export default async function ProgrammaticPage({ params }: PageProps) {
  const { slug, instance } = await params;
  const { getCurrentSite } = await import("@/lib/config");
  const currentSite = getCurrentSite();

  const programmaticConfig = (currentSite as any).programmatic as Record<
    string,
    unknown
  >;
  const instances =
    (programmaticConfig?.programmaticInstances as string[]) || [];

  // Decode URL-encoded instance parameter (handles special characters like ü in München)
  let decodedInstance = instance;
  try {
    decodedInstance = decodeURIComponent(instance);
  } catch (e) {
    // If decoding fails, use original instance
    decodedInstance = instance;
  }

  const matchedInstance = findInstanceBySlug(decodedInstance, instances);

  if (!matchedInstance) {
    notFound();
  }

  // Map slug to the correct pageKey (using site configuration)
  const pageKey = mapSlugToPageKey(slug, programmaticConfig);

  const pageData = getPageDataWithContent(pageKey, matchedInstance);

  if (!pageData || pageData.components.length === 0) {
    notFound();
  }

  // Separate StructuredData blocks from regular components
  // StructuredData components use Script tags which Next.js automatically places in the head
  const structuredDataBlocks = pageData.components.filter(
    (block) => block.type === "StructuredData"
  );
  const contentBlocks = pageData.components.filter(
    (block) => block.type !== "StructuredData"
  );

  return (
    <>
      {/* Render structured data - Script components automatically go to head */}
      {structuredDataBlocks.map((block, index) => {
        const props = block.props as {
          schemaType?: string;
          data?: unknown;
        };
        if (props.schemaType && props.data) {
          return (
            <StructuredData
              key={`structured-data-${block.props.id || index}`}
              type={props.schemaType as any}
              data={props.data as any}
            />
          );
        }
        return null;
      })}
      <main className="min-h-screen">
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <BlockRenderer blocks={contentBlocks} />
        {/* </Suspense> */}
      </main>
    </>
  );
}
