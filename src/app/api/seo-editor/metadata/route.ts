import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentSite } from "@/lib/config";

export const revalidate = false;

const MetadataRequestSchema = z.object({
  pageKey: z.string(),
  programmaticInstance: z.string().optional(),
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
  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response, origin || undefined);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !(await isAllowedOrigin(origin))) {
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { pageKey, programmaticInstance } =
      MetadataRequestSchema.parse(body);

    const currentSite = getCurrentSite();
    const siteId = currentSite.id || "gutachten-org";

    // Load the subpage file
    let module: any = null;

    // Try programmatic file first if instance provided
    if (programmaticInstance) {
      try {
        module = await import(
          `@/data/${siteId}/subpages/programmatic/${pageKey}`
        );
      } catch (error) {
        // Fall back to base file
      }
    }

    // Try base file if programmatic not found
    if (!module) {
      try {
        module = await import(`@/data/${siteId}/subpages/${pageKey}`);
      } catch (error) {
        return NextResponse.json(
          {
            error: `Page not found: ${pageKey}`,
            success: false,
          },
          { status: 404 }
        );
      }
    }

    // Extract metadata
    const metadata = module.metadata || {};

    // Extract structured data components from the content
    const structuredDataComponents: Array<{
      id: string;
      schemaType: string;
      data: any;
    }> = [];

    // The default export is the validateContent array (e.g., homeContent)
    const content = module.default;
    if (Array.isArray(content)) {
      content.forEach((component: any) => {
        if (
          component &&
          component.type === "StructuredData" &&
          component.id &&
          component.schemaType &&
          component.data
        ) {
          structuredDataComponents.push({
            id: component.id,
            schemaType: component.schemaType,
            data: component.data,
          });
        }
      });
    }

    const responseData = {
      success: true,
      metadata,
      structuredDataComponents,
    };

    const response = NextResponse.json(responseData, { status: 200 });
    return addCorsHeaders(response, origin || undefined);
  } catch (error) {
    console.error("[API ERROR] Error fetching metadata:", error);

    let errorMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      errorMessage =
        "Invalid data format: " +
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

