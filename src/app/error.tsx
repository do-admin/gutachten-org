"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  // Log error for debugging
  useEffect(() => {
    console.error("Error caught by error boundary:", error);

    // Redirect to 404 page to use the same content from not-found.ts
    // This ensures we use the latest version of the 404 page
    router.replace("/404");
  }, [error, router]);

  // Show loading state while redirecting
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <p className="text-muted-foreground">Weiterleitung...</p>
      </div>
    </main>
  );
}
