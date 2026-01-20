import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as fs from "fs";

import { getDatabase } from "@text-editor/lib/database-client";
import { PuppeteerTextEdit } from "@text-editor/lib/types";
import { findAndUpdateComponent } from "@text-editor/lib/component-text-editor";

// Configure for static export - API routes are excluded from static builds
export const revalidate = false;

// Simplified schema using herokitId as primary identifier
const EditRequestSchema = z.object({
  originalText: z.string(),
  newText: z.string(), // Can contain HTML with anchor tags
  herokitId: z.string(),
  componentId: z.string().optional(),
  elementTag: z.string(),
  pageUrl: z.string(),
  pageTitle: z.string().optional(),
  containsHtmlLinks: z.boolean().optional(),
  linkMetadata: z.record(z.string(), z.unknown()).optional(),
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
    console.error("Origin not allowed:", origin);
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  try {
    const body = await request.json();

    // Validate that zod is available
    if (!z || typeof z.object !== "function") {
      throw new Error("Zod is not properly imported");
    }

    const editData = EditRequestSchema.parse(body);
    console.log("editData", editData);

    const database = getDatabase();
    const isProduction = process.env.NODE_ENV === "production";

    // Construct element context from simplified request
    const elementContext = {
      elementTag: editData.elementTag,
      heroPageElementId: editData.herokitId,
      cssSelector: `[herokit-id="${editData.herokitId}"]`,
      elementPath: `[herokit-id="${editData.herokitId}"]`,
    };

    const pageUrl = editData.pageUrl
      .replace("?editor=true", "")
      .replace("?editor", "");
    const pageContext = {
      pageUrl: pageUrl,
      pageTitle: editData.pageTitle,
      fullUrl: pageUrl,
    };

    // Detect if newText contains HTML links
    const containsHtmlLinks =
      editData.containsHtmlLinks !== undefined
        ? editData.containsHtmlLinks
        : /<a\s+[^>]*href\s*=/i.test(editData.newText);

    // Extract link metadata if HTML links are present
    let linkMetadata: Record<string, unknown> | undefined =
      editData.linkMetadata;
    if (containsHtmlLinks && !linkMetadata) {
      const linkMatches = editData.newText.matchAll(
        /<a\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*>(.*?)<\/a>/gi
      );
      const links: Array<{ href: string; text: string }> = [];
      for (const match of linkMatches) {
        links.push({
          href: match[1],
          text: match[2],
        });
      }
      if (links.length > 0) {
        linkMetadata = { links, linkCount: links.length };
      }
    }

    const editRecord: PuppeteerTextEdit = {
      originalText: editData.originalText,
      newText: editData.newText,
      status: "processing",
      projectId: "default", // Legacy field, not used anymore
      elementContext,
      pageContext,
      metadata: {
        userAgent: request.headers.get("user-agent"),
        timestamp: new Date().toISOString(),
        origin: origin || "unknown",
        componentId: editData.componentId,
        containsHtmlLinks,
        linkMetadata,
      },
    };

    const editId = await database.saveEdit(editRecord);

    let result: { success: boolean; errorMessage?: string };
    let finalStatus: PuppeteerTextEdit["status"];

    if (isProduction) {
      result = {
        success: true,
      };

      finalStatus = "pending";
    } else {
      // Use the same component editing logic as apply-edits.js
      if (!editData.componentId) {
        result = {
          success: false,
          errorMessage: "componentId is required to apply edits",
        };
        finalStatus = "failed";
      } else {
        const editResult = await findAndUpdateComponent(
          editData.componentId,
          editData.originalText,
          editData.newText
        );

        if (
          editResult.success &&
          editResult.updatedContent &&
          editResult.filePath
        ) {
          // Write updated content to file
          fs.writeFileSync(
            editResult.filePath,
            editResult.updatedContent,
            "utf8"
          );
          result = {
            success: true,
          };
          finalStatus = "applied";
        } else {
          result = {
            success: false,
            errorMessage: editResult.errorMessage || "Failed to apply edit",
          };
          finalStatus = "failed";
        }
      }
    }

    // Update status in database
    await database.updateEditStatus(editId, finalStatus);

    // Simplified response - frontend only needs success status and message
    const responseData = {
      success: result.success,
      editId,
      message: result.success
        ? isProduction
          ? "✅ Edit saved to database. UI updated temporarily. To apply to source code, run: npm run apply-edits"
          : "✅ Text successfully updated"
        : result.errorMessage || "Edit failed",
      isProduction,
    };

    const response = NextResponse.json(responseData, {
      status: result.success ? 200 : 400,
    });

    return addCorsHeaders(response, origin || undefined);
  } catch (error) {
    console.error("[API ERROR] Error processing text edit:", error);

    let errorMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      console.error("[API ERROR] Zod validation errors:", error.issues);
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
