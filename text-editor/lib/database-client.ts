import { Pool } from "pg";
import { PuppeteerTextEdit } from "./types";

export class TextEditsDatabase {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.TEXT_EDITOR_DATABASE_URL,
    });
  }

  async saveEdit(data: PuppeteerTextEdit): Promise<string> {
    const client = await this.pool.connect();
    try {
      // Extract herokit-id from element context
      const herokitId =
        data.elementContext.heroPageElementId ||
        data.elementContext.cssSelector?.match(/herokit-id="([^"]+)"/)?.[1];

      if (!herokitId) {
        throw new Error(
          "herokit-id is required but not found in element context"
        );
      }

      // Extract componentId from metadata
      const componentId = data.metadata?.componentId as string | undefined;

      // Extract link-related metadata
      const containsHtmlLinks = data.metadata?.containsHtmlLinks === true;
      const linkMetadata = data.metadata?.linkMetadata
        ? JSON.stringify(data.metadata.linkMetadata)
        : null;

      const result = await client.query(
        `INSERT INTO inline_text_edits (
          original_text, 
          new_text, 
          status, 
          page_url,
          herokit_id,
          component_id,
          metadata,
          contains_html_links,
          link_metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING id`,
        [
          data.originalText,
          data.newText,
          data.status,
          data.pageContext.pageUrl,
          herokitId,
          componentId || null,
          JSON.stringify({
            userAgent: data.metadata?.userAgent,
            timestamp: data.metadata?.timestamp,
            origin: data.metadata?.origin,
            componentId: data.metadata?.componentId,
            // Don't duplicate link metadata in general metadata
            ...Object.fromEntries(
              Object.entries(data.metadata || {}).filter(
                ([key]) => key !== "containsHtmlLinks" && key !== "linkMetadata"
              )
            ),
          }),
          containsHtmlLinks,
          linkMetadata,
        ]
      );
      return result.rows[0].id.toString();
    } finally {
      client.release();
    }
  }

  async getOriginalText(context: {
    pageUrl: string;
    heroPageElementId?: string;
  }): Promise<string | null> {
    const client = await this.pool.connect();
    try {
      let query = `
        SELECT original_text
        FROM inline_text_edits 
        WHERE page_url = $1`;

      const params: unknown[] = [context.pageUrl];

      // If heroPageElementId is provided, use it as the primary lookup
      if (context.heroPageElementId) {
        query += ` AND herokit_id = $2`;
        params.push(context.heroPageElementId);
      }

      query += ` ORDER BY created_at DESC LIMIT 1`;

      const result = await client.query(query, params);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0].original_text;
    } finally {
      client.release();
    }
  }

  async updateEditStatus(
    editId: string,
    status: PuppeteerTextEdit["status"]
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(
        `UPDATE inline_text_edits 
         SET status = $1, 
             updated_at = NOW() 
         WHERE id = $2`,
        [status, editId]
      );
    } finally {
      client.release();
    }
  }

  async getEditHistory(
    pageUrl?: string,
    limit: number = 50
  ): Promise<PuppeteerTextEdit[]> {
    const client = await this.pool.connect();
    try {
      let query = `SELECT * FROM inline_text_edits`;
      const params: unknown[] = [];

      if (pageUrl) {
        query += ` WHERE page_url = $1`;
        params.push(pageUrl);
      }

      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
      params.push(limit);

      const result = await client.query(query, params);
      return result.rows.map((row) => this.mapRowToTextEdit(row));
    } finally {
      client.release();
    }
  }

  private mapRowToTextEdit(row: Record<string, unknown>): PuppeteerTextEdit {
    const metadata = row.metadata ? JSON.parse(row.metadata as string) : {};

    // Include link-related fields in metadata
    if (row.contains_html_links !== undefined) {
      metadata.containsHtmlLinks = row.contains_html_links;
    }
    if (row.link_metadata) {
      metadata.linkMetadata =
        typeof row.link_metadata === "string"
          ? JSON.parse(row.link_metadata)
          : row.link_metadata;
    }

    return {
      id: row.id as string,
      projectId: "unknown", // Legacy field, not stored in DB anymore
      originalText: row.original_text as string,
      newText: row.new_text as string,
      status: row.status as PuppeteerTextEdit["status"],
      elementContext: {
        elementTag: "unknown", // Not stored anymore, but required by type
        heroPageElementId: row.herokit_id as string,
        cssSelector: `[herokit-id="${row.herokit_id}"]`,
        elementPath: `[herokit-id="${row.herokit_id}"]`,
      },
      pageContext: {
        pageUrl: row.page_url as string,
        pageTitle: "Unknown",
        fullUrl: row.page_url as string,
      },
      metadata: metadata,
      createdAt: row.created_at as Date,
      updatedAt: row.updated_at as Date,
    };
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

let dbInstance: TextEditsDatabase | null = null;

export function getDatabase(): TextEditsDatabase {
  if (!dbInstance) {
    dbInstance = new TextEditsDatabase();
  }
  return dbInstance;
}
