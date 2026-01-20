import { Suspense } from "react";
import { getPageDataWithContent, getCurrentSite } from "@/lib/config";
import { getNextJsMetadata } from "@/lib/metadata-loader";
import BlockRenderer from "@/components/BlockRenderer";
import { StructuredData } from "@/components/StructuredData";
import { getAllArticles } from "@/lib/article-loader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return await getNextJsMetadata("ratgeber");
}

export default async function RatgeberPage() {
  const pageData = getPageDataWithContent("ratgeber");

  if (!pageData || pageData.components.length === 0) {
    notFound();
  }

  const currentSite = getCurrentSite();
  const siteUrl = currentSite.domain || "https://example.com";
  const articles = getAllArticles();

  // Get metadata from page configuration
  const pageMetadata = await getNextJsMetadata("ratgeber");
  const pageDescription =
    pageMetadata?.description || "Hilfreiche Artikel und Ratgeber";

  // Prepare publisher logo data
  const publisherLogo = currentSite.logo?.light
    ? {
        url: `${siteUrl}${currentSite.logo.light}`,
      }
    : undefined;

  return (
    <>
      {/* Structured Data for Blog/Ratgeber Collection */}
      <StructuredData
        type="website"
        data={{
          name: `${currentSite.name} - Ratgeber`,
          url: `${siteUrl}/ratgeber`,
          description: pageDescription,
          publisher: {
            name: currentSite.name,
            url: siteUrl,
            logo: publisherLogo,
          },
        }}
      />

      <main className="min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <BlockRenderer
            blocks={pageData.components}
          />
        </Suspense>
      </main>
    </>
  );
}
