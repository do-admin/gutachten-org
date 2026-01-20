// Types required for the text editor module
// Extracted from database-types.ts

export interface ElementContext {
  elementTag: string;
  elementClasses?: string[];
  elementId?: string;
  heroPageElementId?: string | null;
  cssSelector?: string;
  elementPath?: string;
}

export interface PageContext {
  pageUrl: string;
  pageTitle?: string;
  fullUrl?: string;
}

export interface PuppeteerTextEdit {
  id?: string;
  projectId: string;
  originalText: string;
  newText: string;
  status: "pending" | "processing" | "applied" | "failed" | "conflict";
  elementContext: ElementContext;
  pageContext: PageContext;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

