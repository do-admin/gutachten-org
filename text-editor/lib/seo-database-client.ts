import { Pool } from "pg";

export interface SEOEdit {
  id?: string;
  pageKey: string;
  pageUrl: string;
  programmaticInstance?: string;
  editType: "metadata" | "structured_data";
  fieldPath: string;
  originalValue: any;
  newValue: any;
  status: "pending" | "processing" | "applied" | "failed";
  componentId?: string;
  schemaType?: string;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SEODatabase {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.TEXT_EDITOR_DATABASE_URL,
    });
  }

  async saveEdit(data: SEOEdit): Promise<string> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO inline_seo_metadata_edits (
          page_key,
          page_url,
          programmatic_instance,
          edit_type,
          field_path,
          original_value,
          new_value,
          status,
          component_id,
          schema_type,
          metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING id`,
        [
          data.pageKey,
          data.pageUrl,
          data.programmaticInstance || null,
          data.editType,
          data.fieldPath,
          JSON.stringify(data.originalValue),
          JSON.stringify(data.newValue),
          data.status,
          data.componentId || null,
          data.schemaType || null,
          JSON.stringify(data.metadata || {}),
        ]
      );
      return result.rows[0].id.toString();
    } finally {
      client.release();
    }
  }

  async saveEdits(edits: SEOEdit[]): Promise<string[]> {
    const client = await this.pool.connect();
    try {
      const editIds: string[] = [];

      for (const edit of edits) {
        const result = await client.query(
          `INSERT INTO inline_seo_metadata_edits (
            page_key,
            page_url,
            programmatic_instance,
            edit_type,
            field_path,
            original_value,
            new_value,
            status,
            component_id,
            schema_type,
            metadata
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
          RETURNING id`,
          [
            edit.pageKey,
            edit.pageUrl,
            edit.programmaticInstance || null,
            edit.editType,
            edit.fieldPath,
            JSON.stringify(edit.originalValue),
            JSON.stringify(edit.newValue),
            edit.status,
            edit.componentId || null,
            edit.schemaType || null,
            JSON.stringify(edit.metadata || {}),
          ]
        );
        editIds.push(result.rows[0].id.toString());
      }

      return editIds;
    } finally {
      client.release();
    }
  }

  async updateEditStatus(
    editId: string,
    status: SEOEdit["status"]
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(
        `UPDATE inline_seo_metadata_edits 
         SET status = $1, 
             updated_at = NOW() 
         WHERE id = $2`,
        [status, editId]
      );
    } finally {
      client.release();
    }
  }

  async updateEditsStatus(
    editIds: string[],
    status: SEOEdit["status"]
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(
        `UPDATE inline_seo_metadata_edits 
         SET status = $1, 
             updated_at = NOW() 
         WHERE id = ANY($2)`,
        [status, editIds]
      );
    } finally {
      client.release();
    }
  }

  async getEditHistory(
    pageKey?: string,
    pageUrl?: string,
    limit: number = 50
  ): Promise<SEOEdit[]> {
    const client = await this.pool.connect();
    try {
      let query = `SELECT * FROM inline_seo_metadata_edits WHERE 1=1`;
      const params: unknown[] = [];
      let paramCount = 0;

      if (pageKey) {
        paramCount++;
        query += ` AND page_key = $${paramCount}`;
        params.push(pageKey);
      }

      if (pageUrl) {
        paramCount++;
        query += ` AND page_url = $${paramCount}`;
        params.push(pageUrl);
      }

      paramCount++;
      query += ` ORDER BY created_at DESC LIMIT $${paramCount}`;
      params.push(limit);

      const result = await client.query(query, params);
      return result.rows.map((row) => this.mapRowToSEOEdit(row));
    } finally {
      client.release();
    }
  }

  async getPendingEdits(pageKey?: string): Promise<SEOEdit[]> {
    const client = await this.pool.connect();
    try {
      let query = `SELECT * FROM inline_seo_metadata_edits WHERE status = 'pending'`;
      const params: unknown[] = [];

      if (pageKey) {
        query += ` AND page_key = $1`;
        params.push(pageKey);
        query += ` ORDER BY created_at DESC`;
      } else {
        query += ` ORDER BY created_at DESC`;
      }

      const result = await client.query(query, params);
      return result.rows.map((row) => this.mapRowToSEOEdit(row));
    } finally {
      client.release();
    }
  }

  private mapRowToSEOEdit(row: Record<string, unknown>): SEOEdit {
    return {
      id: row.id as string,
      pageKey: row.page_key as string,
      pageUrl: row.page_url as string,
      programmaticInstance: row.programmatic_instance as string | undefined,
      editType: row.edit_type as "metadata" | "structured_data",
      fieldPath: row.field_path as string,
      originalValue: row.original_value
        ? JSON.parse(row.original_value as string)
        : null,
      newValue: row.new_value ? JSON.parse(row.new_value as string) : null,
      status: row.status as SEOEdit["status"],
      componentId: row.component_id as string | undefined,
      schemaType: row.schema_type as string | undefined,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
      createdAt: row.created_at as Date,
      updatedAt: row.updated_at as Date,
    };
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

let dbInstance: SEODatabase | null = null;

export function getSEODatabase(): SEODatabase {
  if (!dbInstance) {
    dbInstance = new SEODatabase();
  }
  return dbInstance;
}

