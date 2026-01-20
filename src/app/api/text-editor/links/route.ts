import { NextRequest, NextResponse } from "next/server";
import { getLinksForDropdown } from "@/lib/link-extractor";
import { addCorsHeaders, isAllowedOrigin } from "@/app/api/cors-config";

// Configure for static export - API routes are excluded from static builds
export const revalidate = false;

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !(await isAllowedOrigin(origin))) {
    return new NextResponse(null, { status: 403 });
  }

  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response, origin || undefined);
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !(await isAllowedOrigin(origin))) {
    console.error("Origin not allowed:", origin);
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  try {
    const { categories, allLinks } = getLinksForDropdown();

    const response = NextResponse.json(
      {
        success: true,
        categories,
        allLinks,
      },
      { status: 200 }
    );

    return addCorsHeaders(response, origin || undefined);
  } catch (error) {
    console.error("[API ERROR] Error fetching links:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    const response = NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );

    return addCorsHeaders(response, origin || undefined);
  }
}
