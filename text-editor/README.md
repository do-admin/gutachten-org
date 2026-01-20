# Text Editor Module

This directory contains all files related to the text editor functionality. You can copy this entire directory to a new repository to reuse the text editor system.

## Directory Structure

```
text-editor/
├── api/                    # Next.js API routes
│   ├── route.ts           # Main text editor API endpoint (POST /api/text-editor)
│   └── original/
│       └── route.ts       # Get original text API endpoint (GET/POST /api/text-editor/original)
├── components/            # React components
│   └── TextEditorWrapper.tsx  # Frontend text editor wrapper component
├── database/             # Database schema
│   └── schema.sql        # PostgreSQL schema for inline_text_edits table
├── lib/                  # Core library files
│   ├── component-text-editor.ts  # Component finding and text updating logic
│   └── database-client.ts        # Database client for text edits
├── scripts/              # Utility scripts
│   └── apply-edits.js    # Script to apply pending edits from database to source files
└── README.md             # This file
```

## Integration Guide

### 1. Copy Files to Your Project

Copy the entire `text-editor/` directory to your project root.

### 2. Update File Paths

After copying, you'll need to update import paths in the files:

#### `text-editor/api/route.ts`

- Update: `import { getDatabase } from "@/app/api/text-editor/database-client";`
- To: `import { getDatabase } from "../lib/database-client";`
- Update: `import { PuppeteerTextEdit } from "@/lib/types/database-types";`
- To: `import { PuppeteerTextEdit } from "../lib/types";` (see step 3)
- Update: `import { findAndUpdateComponent } from "@/lib/component-text-editor";`
- To: `import { findAndUpdateComponent } from "../lib/component-text-editor";`

#### `text-editor/api/original/route.ts`

- Update: `import { getDatabase } from "@/app/api/text-editor/database-client";`
- To: `import { getDatabase } from "../../lib/database-client";`

#### `text-editor/lib/database-client.ts`

- Update: `import { PuppeteerTextEdit } from "../../../lib/types/database-types";`
- To: `import { PuppeteerTextEdit } from "./types";` (see step 3)

#### `text-editor/scripts/apply-edits.js`

- Update: `require("./src/lib/component-text-editor.ts")`
- To: `require("./text-editor/lib/component-text-editor.ts")` (or adjust path based on your structure)

### 3. Create Types File

Create `text-editor/lib/types.ts` with the following types (extracted from your `src/lib/types/database-types.ts`):

```typescript
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
```

### 4. Move Files to Your Project Structure

Move files to match your project structure:

- **API Routes**: Move `text-editor/api/route.ts` to `src/app/api/text-editor/route.ts`
- **API Routes**: Move `text-editor/api/original/route.ts` to `src/app/api/text-editor/original/route.ts`
- **Components**: Move `text-editor/components/TextEditorWrapper.tsx` to `src/components/TextEditorWrapper.tsx`
- **Library**: Move `text-editor/lib/*` to `src/lib/` (or your lib directory)
- **Scripts**: Move `text-editor/scripts/apply-edits.js` to project root
- **Database**: Move `text-editor/database/schema.sql` to project root

### 5. Update BlockRenderer Component

Your `BlockRenderer` component needs to wrap each component with a `data-component-id` attribute. Add this to your component renderer:

```tsx
// Extract componentId from props (the 'id' field from component config)
const componentId = cleanedProps.id as string | undefined;
// Remove 'id' from props to avoid conflicts
const { id, ...propsWithoutId } = cleanedProps;

// Wrap component in a div with data-component-id for text editor identification
return (
  <div
    key={`${block.type}-${index}`}
    {...(componentId && { "data-component-id": componentId })}
  >
    <Component {...propsWithoutId} />
  </div>
);
```

### 6. Database Setup

Run the SQL schema to create the required table:

```bash
psql -d your_database -f text-editor/database/schema.sql
```

Or copy `text-editor/database/schema.sql` to your database setup scripts.

### 7. Environment Variables

Add to your `.env.local`:

```env
TEXT_EDITOR_DATABASE_URL=postgresql://user:password@host:port/database
```

### 8. Dependencies

Ensure these packages are installed:

```json
{
  "dependencies": {
    "pg": "^8.x",
    "zod": "^3.x",
    "glob": "^10.x"
  },
  "devDependencies": {
    "ts-node": "^10.x",
    "@types/pg": "^8.x"
  }
}
```

### 9. Update TextEditorWrapper Imports

In `TextEditorWrapper.tsx`, update the API endpoint if needed:

```typescript
const API_ENDPOINT = config.apiEndpoint || "/api/text-editor";
```

### 10. Usage

Wrap your app content with the TextEditorWrapper:

```tsx
import { TextEditorWrapper } from "@/components/TextEditorWrapper";

<TextEditorWrapper config={{ projectId: "your-project-id" }}>
  {children}
</TextEditorWrapper>;
```

## Features

- **Component-based editing**: Edits are tracked by component ID
- **Automatic source updates**: In development, edits are applied directly to source files
- **Database tracking**: All edits are stored in PostgreSQL
- **JSON file support**: Can edit text in JSON FAQ files and other JSON data files
- **TypeScript config support**: Can edit text in TypeScript component configuration files

## Script Usage

Apply pending edits from database:

```bash
node apply-edits.js --url=https://example.com/page
```

Options:

- `--url=<page-url>`: Required. The page URL to apply edits for
- `--dry-run`: Preview changes without applying
- `--apply-all`: Apply all edits (including already applied ones)

## Notes

- The text editor uses `herokit-id` attributes on HTML elements for identification
- Components must have an `id` field in their config that gets passed as `componentId`
- The editor searches both TypeScript config files and JSON data files for text
- In production, edits are saved to the database but not applied automatically (use the script)

