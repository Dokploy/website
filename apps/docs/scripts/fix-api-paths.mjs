/**
 * Normalizes OpenAPI path references in API docs MDX files.
 * Converts slash notation (/tag/operation) to dot notation (/tag.operation)
 * so they match our OpenAPI schema paths and display the real API path.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const API_DOCS_DIR = join(process.cwd(), "content", "docs", "api");

let totalFixed = 0;
for (const name of readdirSync(API_DOCS_DIR)) {
	if (!name.endsWith(".mdx")) continue;
	const file = join(API_DOCS_DIR, name);
	const content = readFileSync(file, "utf8");
	// Match path in both orders: "path":"/x/y" and "path":"/a/b"
	const newContent = content.replace(/"path":"(\/[^"]+)"/g, (_, path) => {
		// Convert /tag/operation or /tag/op/subop to /tag.operation or /tag.op.subop to match schema
		if (path.includes("/") && !path.includes(".")) {
			const dotPath = "/" + path.slice(1).replace(/\//g, ".");
			totalFixed++;
			return `"path":"${dotPath}"`;
		}
		return `"path":"${path}"`;
	});
	if (newContent !== content) writeFileSync(file, newContent);
}
if (totalFixed > 0) {
	console.log(`✓ Normalized ${totalFixed} API path(s) in MDX (slash → dot)`);
}
