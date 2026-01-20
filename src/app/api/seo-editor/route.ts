import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as fs from "fs";

import { getDatabase } from "@text-editor/lib/database-client";
import { getSEODatabase } from "@text-editor/lib/seo-database-client";
import {
  updateMetadataInFile,
  updateStructuredDataInFile,
  MetadataEdit,
  StructuredDataEdit,
} from "@text-editor/lib/seo-metadata-editor";
import { getCurrentSite } from "@/lib/config";

// Configure for static export - API routes are excluded from static builds
export const revalidate = false;

const MetadataEditSchema = z.object({
  field: z.string(),
  originalValue: z.any(),
  newValue: z.any(),
});

const StructuredDataEditSchema = z.object({
  componentId: z.string(),
  field: z.string(),
  originalValue: z.any(),
  newValue: z.any(),
});

const SEOEditRequestSchema = z.object({
  pageKey: z.string(),
  pageUrl: z.string(),
  programmaticInstance: z.string().optional(),
  metadataEdits: z.array(MetadataEditSchema).optional(),
  structuredDataEdits: z.array(StructuredDataEditSchema).optional(),
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
    const editData = SEOEditRequestSchema.parse(body);
    console.log("SEO edit data", editData);

    const database = getDatabase();
    const seoDatabase = getSEODatabase();
    const isProduction = process.env.NODE_ENV === "production";
    const currentSite = getCurrentSite();
    const siteId = currentSite.id || "gutachten-org";

    let metadataResult: { success: boolean; errorMessage?: string } = {
      success: true,
    };
    let structuredDataResult: { success: boolean; errorMessage?: string } = {
      success: true,
    };

    // Process metadata edits
    if (editData.metadataEdits && editData.metadataEdits.length > 0) {
      const metadataEditResult = await updateMetadataInFile(
        editData.pageKey,
        editData.metadataEdits as MetadataEdit[],
        editData.programmaticInstance,
        siteId
      );

      if (metadataEditResult.success && metadataEditResult.updatedContent) {
        if (!isProduction && metadataEditResult.filePath) {
          // Write updated content to file in development
          fs.writeFileSync(
            metadataEditResult.filePath,
            metadataEditResult.updatedContent,
            "utf8"
          );
        }
        metadataResult = { success: true };
      } else {
        metadataResult = {
          success: false,
          errorMessage:
            metadataEditResult.errorMessage || "Failed to update metadata",
        };
      }
    }

    // Process structured data edits
    if (
      editData.structuredDataEdits &&
      editData.structuredDataEdits.length > 0
    ) {
      const structuredDataEditResult = await updateStructuredDataInFile(
        editData.pageKey,
        editData.structuredDataEdits as StructuredDataEdit[],
        editData.programmaticInstance,
        siteId
      );

      if (
        structuredDataEditResult.success &&
        structuredDataEditResult.updatedContent
      ) {
        if (!isProduction && structuredDataEditResult.filePath) {
          // Write updated content to file in development
          fs.writeFileSync(
            structuredDataEditResult.filePath,
            structuredDataEditResult.updatedContent,
            "utf8"
          );
        }
        structuredDataResult = { success: true };
      } else {
        structuredDataResult = {
          success: false,
          errorMessage:
            structuredDataEditResult.errorMessage ||
            "Failed to update structured data",
        };
      }
    }

    const overallSuccess =
      metadataResult.success && structuredDataResult.success;

    // Save to database for tracking
    const savedEditIds: string[] = [];
    if (editData.metadataEdits && editData.metadataEdits.length > 0) {
      const metadataEditRecords = editData.metadataEdits.map((edit) => ({
        pageKey: editData.pageKey,
        pageUrl: editData.pageUrl,
        programmaticInstance: editData.programmaticInstance,
        editType: "metadata" as const,
        fieldPath: edit.field,
        originalValue: edit.originalValue,
        newValue: edit.newValue,
        status: (isProduction ? "pending" : "applied") as const,
        metadata: {
          userAgent: request.headers.get("user-agent"),
          timestamp: new Date().toISOString(),
          origin: origin || "unknown",
        },
      }));

      const ids = await seoDatabase.saveEdits(metadataEditRecords);
      savedEditIds.push(...ids);
    }

    if (
      editData.structuredDataEdits &&
      editData.structuredDataEdits.length > 0
    ) {
      const structuredDataEditRecords = editData.structuredDataEdits.map(
        (edit) => {
          // Extract schema type from component if available
          // We'll need to get this from the component data
          return {
            pageKey: editData.pageKey,
            pageUrl: editData.pageUrl,
            programmaticInstance: editData.programmaticInstance,
            editType: "structured_data" as const,
            fieldPath: edit.field,
            originalValue: edit.originalValue,
            newValue: edit.newValue,
            status: (isProduction ? "pending" : "applied") as const,
            componentId: edit.componentId,
            schemaType: undefined, // Could be extracted from component data
            metadata: {
              userAgent: request.headers.get("user-agent"),
              timestamp: new Date().toISOString(),
              origin: origin || "unknown",
            },
          };
        }
      );

      const ids = await seoDatabase.saveEdits(structuredDataEditRecords);
      savedEditIds.push(...ids);
    }

    // Update status for saved edits if they were applied
    if (!isProduction && savedEditIds.length > 0 && overallSuccess) {
      await seoDatabase.updateEditsStatus(savedEditIds, "applied");
    }

    const responseData = {
      success: overallSuccess,
      message: overallSuccess
        ? isProduction
          ? "✅ SEO edits saved. UI updated temporarily. To apply to source code, run: npm run apply-seo-edits"
          : "✅ SEO metadata and structured data successfully updated"
        : `❌ Some edits failed. Metadata: ${metadataResult.success ? "✅" : "❌"} Structured Data: ${structuredDataResult.success ? "✅" : "❌"}`,
      errors: {
        metadata: metadataResult.errorMessage,
        structuredData: structuredDataResult.errorMessage,
      },
      isProduction,
    };

    const response = NextResponse.json(responseData, {
      status: overallSuccess ? 200 : 400,
    });

    return addCorsHeaders(response, origin || undefined);
  } catch (error) {
    console.error("[API ERROR] Error processing SEO edit:", error);

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
