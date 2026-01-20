import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDatabase } from "../../lib/database-client";

// Configure for static export - API routes are excluded from static builds
export const revalidate = false;

const OriginalTextRequestSchema = z.object({
  pageUrl: z.string(),
  herokitId: z.string(),
});

const ALLOWED_ORIGINS = [`${process.env.NEXT_PUBLIC_SITE_URL}`];

async function isAllowedOrigin(origin: string): Promise<boolean> {
  return true;
}

function addCorsHeaders(response: NextResponse, origin?: string): NextResponse {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !(await isAllowedOrigin(origin))) {
    return new NextResponse(null, { status: 403 });
  }

  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response, origin || undefined);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !(await isAllowedOrigin(origin))) {
    console.error("Origin not allowed for POST:", origin);
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const requestData = OriginalTextRequestSchema.parse(body);

    const database = getDatabase();

    const originalText = await database.getOriginalText({
      pageUrl: requestData.pageUrl,
      heroPageElementId: requestData.herokitId,
    });

    if (originalText) {
      const response = NextResponse.json({
        originalText,
        success: true,
      });
      return addCorsHeaders(response, origin || undefined);
    } else {
      const response = NextResponse.json(
        {
          error: "No original text found in database",
          success: false,
        },
        { status: 404 }
      );
      return addCorsHeaders(response, origin || undefined);
    }
  } catch (error) {
    console.error("Error fetching original text:", error);

    let errorMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      console.error("Zod validation errors:", error.issues);
      errorMessage =
        "Invalid request format: " +
        error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      statusCode = 400;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const response = NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: statusCode }
    );

    return addCorsHeaders(response, origin || undefined);
  }
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !(await isAllowedOrigin(origin))) {
    console.error("Origin not allowed for GET:", origin);
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const pageUrl = searchParams.get("pageUrl");
    const herokitId = searchParams.get("herokitId");

    if (!pageUrl || !herokitId) {
      const response = NextResponse.json(
        {
          error: "pageUrl and herokitId parameters are required",
        },
        { status: 400 }
      );
      return addCorsHeaders(response, origin || undefined);
    }

    const database = getDatabase();

    const originalText = await database.getOriginalText({
      pageUrl,
      heroPageElementId: herokitId,
    });

    if (originalText) {
      const response = NextResponse.json({
        originalText,
        success: true,
      });
      return addCorsHeaders(response, origin || undefined);
    } else {
      const response = NextResponse.json(
        {
          error: "No original text found in database",
          success: false,
        },
        { status: 404 }
      );
      return addCorsHeaders(response, origin || undefined);
    }
  } catch (error) {
    console.error("Error fetching original text:", error);

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
