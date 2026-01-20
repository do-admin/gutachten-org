const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

try {
  require("ts-node").register({
    transpileOnly: true,
    compilerOptions: {
      module: "commonjs",
      moduleResolution: "node",
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      target: "ES2017",
    },
  });
} catch (error) {
  console.error("❌ Failed to register ts-node:", error.message);
  console.error("   Please ensure ts-node is installed: pnpm install");
  process.exit(1);
}

try {
  const envContent = fs.readFileSync(".env.local", "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      let value = valueParts.join("=").trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key.trim()] = value;
    }
  });
} catch (error) {
  console.log("⚠️  Could not load .env.local file");
}

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const applyAll = args.includes("--apply-all");
const urlArg = args.find((arg) => arg.startsWith("--url="));
const url = urlArg ? urlArg.split("=")[1] : null;

if (!url) {
  console.error("❌ --url parameter is required");
  console.error(
    "   Usage: node apply-edits.js --url=<page-url> [--dry-run] [--apply-all]"
  );
  console.error(
    "   Example: node apply-edits.js --url=https://example.com/page"
  );
  process.exit(1);
}

console.log(`🚀 Applying edits for URL: ${url}`);
console.log(
  `📋 Mode: ${isDryRun ? "DRY RUN (no changes will be applied)" : "LIVE RUN"}`
);
console.log(
  `📝 Edit filter: ${applyAll ? "ALL edits (including already applied)" : "Only pending/processing/failed edits"}`
);

const databaseUrl =
  process.env.TEXT_EDITOR_DATABASE_URL || process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error(
    "❌ TEXT_EDITOR_DATABASE_URL or DATABASE_URL environment variable is required"
  );
  console.error(
    "   Please set TEXT_EDITOR_DATABASE_URL in your .env.local file"
  );
  process.exit(1);
}

console.log(`🔗 Using database: ${databaseUrl.substring(0, 30)}...`);

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

async function getPendingEdits(url, includeApplied = false) {
  const client = await pool.connect();
  try {
    let statusFilter = "";
    if (!includeApplied) {
      statusFilter = `AND (status = 'processing' OR status = 'failed' OR status = 'pending')`;
    }

    const query = `
      SELECT 
        id,
        original_text,
        new_text,
        status,
        page_url,
        herokit_id,
        component_id,
        metadata
      FROM inline_text_edits 
      WHERE 
        page_url = $1
        ${statusFilter}
      ORDER BY created_at ASC
    `;

    const result = await client.query(query, [url]);
    return result.rows;
  } finally {
    client.release();
  }
}

async function updateEditStatus(editId, status) {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE inline_text_edits 
      SET 
        status = $2,
        updated_at = NOW()
      WHERE id = $1
    `;
    await client.query(query, [editId, status]);
  } finally {
    client.release();
  }
}

// Import shared component editing logic
let findAndUpdateComponent;
try {
  const componentTextEditor = require("../lib/component-text-editor.ts");
  findAndUpdateComponent = componentTextEditor.findAndUpdateComponent;
} catch (error) {
  console.error("❌ Failed to load component-text-editor:", error.message);
  console.error(
    "   Make sure you're running from the project root and the path is correct"
  );
  process.exit(1);
}

async function applyEdit(edit) {
  console.log(`\n📝 Processing edit ${edit.id} (Status: ${edit.status}):`);
  console.log(`   Original: "${edit.original_text}"`);
  console.log(`   New: "${edit.new_text}"`);

  if (!edit?.component_id) {
    console.log(`   ❌ No component_id found`);
    await updateEditStatus(edit.id, "failed");
    return {
      success: false,
      error: "No component_id found in edit",
    };
  }

  console.log(`   🔍 Looking for component with id: ${edit.component_id}`);

  if (isDryRun) {
    console.log(`   🔍 DRY RUN: Would apply this edit`);
    return { success: true, isDryRun: true };
  }

  try {
    const result = await findAndUpdateComponent(
      edit.component_id,
      edit.original_text,
      edit.new_text
    );

    if (result.success) {
      // Write updated content to file
      fs.writeFileSync(result.filePath, result.updatedContent, "utf8");

      const wasAlreadyApplied = edit.status === "applied";
      const statusMessage = wasAlreadyApplied
        ? "Re-applied successfully"
        : "Applied successfully";

      console.log(`   ✅ ${statusMessage}!`);
      console.log(`      - File: ${result.filePath}`);
      console.log(`      - Line: ${result.lineNumber}`);

      await updateEditStatus(edit.id, "applied");

      return {
        success: true,
        file: result.filePath,
        line: result.lineNumber,
        wasAlreadyApplied,
      };
    } else {
      console.log(`   ❌ Failed to apply edit`);
      console.log(`      - Reason: ${result.errorMessage}`);

      const wasAlreadyApplied = edit.status === "applied";
      if (wasAlreadyApplied) {
        console.log(
          `      ⚠️  Edit was already applied - preserving 'applied' status`
        );
        return {
          success: true,
          error: result.errorMessage,
          wasAlreadyApplied: true,
          preservedStatus: true,
        };
      }

      await updateEditStatus(edit.id, "failed");
      return {
        success: false,
        error: result.errorMessage,
      };
    }
  } catch (error) {
    const wasAlreadyApplied = edit.status === "applied";
    console.log(`   ❌ Error: ${error.message}`);

    if (wasAlreadyApplied) {
      console.log(
        `      ⚠️  Edit was already applied - preserving 'applied' status`
      );
      return {
        success: true,
        error: error.message,
        wasAlreadyApplied: true,
        preservedStatus: true,
      };
    }

    await updateEditStatus(edit.id, "failed");
    return {
      success: false,
      error: error.message,
    };
  }
}

async function main() {
  try {
    console.log(
      `\n📊 Fetching ${applyAll ? "all" : "pending"} edits from database...`
    );

    const pendingEdits = await getPendingEdits(url, applyAll);

    console.log("pendingEdits", pendingEdits);
    if (pendingEdits.length === 0) {
      console.log(
        `✅ No ${applyAll ? "" : "pending "}edits found for URL: ${url}`
      );
      return;
    }

    console.log(
      `📋 Found ${pendingEdits.length} ${applyAll ? "total" : "pending"} edits`
    );

    if (applyAll) {
      const statusCounts = pendingEdits.reduce((acc, edit) => {
        acc[edit.status] = (acc[edit.status] || 0) + 1;
        return acc;
      }, {});
      console.log(`   Status breakdown:`, statusCounts);
    }

    let successCount = 0;
    let failureCount = 0;
    let reAppliedCount = 0;

    for (const edit of pendingEdits) {
      const result = await applyEdit(edit);

      if (result.success && !result.isDryRun) {
        successCount++;
        if (result.wasAlreadyApplied) {
          reAppliedCount++;
        }
      } else if (!result.success) {
        failureCount++;
      }
    }

    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total edits: ${pendingEdits.length}`);
    console.log(`   ✅ Applied: ${successCount}`);
    if (reAppliedCount > 0) {
      console.log(`      - Newly applied: ${successCount - reAppliedCount}`);
      console.log(`      - Re-applied: ${reAppliedCount}`);
    }
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(
      `   🔄 Skipped (dry run): ${pendingEdits.length - successCount - failureCount}`
    );

    if (successCount > 0 && !isDryRun) {
      console.log(
        `\n🎉 Successfully applied ${successCount} edits to codebase!`
      );
      console.log(`📝 Review changes with: git diff`);
      console.log(
        `💾 Commit changes with: git add . && git commit -m "Apply text edits"`
      );
    }

    if (failureCount > 0) {
      console.log(`\n⚠️  ${failureCount} edit(s) failed.`);
      console.log(`   Check the logs above for details.`);
      console.log(`   Common issues:`);
      console.log(`   - herokit-id not found in source files`);
      console.log(`   - Text content doesn't match exactly`);
      console.log(`   - Element structure changed`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
