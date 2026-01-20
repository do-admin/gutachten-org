import BlockRenderer from "@/components/BlockRenderer";
import { getPageDataWithContent } from "@/lib/config";

// Server component that renders the not-found.ts page content
// This is used by error.tsx since error boundaries must be client components
export default function NotFoundContent() {
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
