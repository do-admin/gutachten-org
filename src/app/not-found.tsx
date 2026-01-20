import { Metadata } from "next";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageDataWithContent } from "@/lib/config";
import { getNextJsMetadata } from "@/lib/metadata-loader";

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await getNextJsMetadata("not-found");
  } catch (error) {
    console.error("Error loading metadata for not-found page:", error);
    return {
      title: "404 - Seite nicht gefunden",
      description: "Die angeforderte Seite konnte nicht gefunden werden.",
    };
  }
}

export default function NotFound() {
  const pageData = getPageDataWithContent("not-found");

  // If pageData is empty or has no components, render a basic fallback
  if (!pageData || pageData.components.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <p className="mb-8 text-xl">Seite nicht gefunden</p>
          <a
            href="/"
            className="bg-primary hover:bg-primary/90 inline-block rounded-lg px-6 py-3 text-white"
          >
            Zur Startseite
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <BlockRenderer blocks={pageData.components} />
    </main>
  );
}
