/**
 * Normalizes OpenAPI path references in API docs MDX files.
 * Converts dot notation (/tag.operation) to slash notation (/tag/operation)
 * to match the OpenAPI schema paths.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const API_DOCS_DIR = join(process.cwd(), "content", "docs", "api");

let totalFixed = 0;
for (const name of readdirSync(API_DOCS_DIR)) {
	if (!name.endsWith(".mdx")) continue;
	const file = join(API_DOCS_DIR, name);
	const content = readFileSync(file, "utf8");
	const newContent = content.replace(/"path":"(\/[^"]+)"/g, (_, path) => {
		if (path.includes(".")) {
			totalFixed++;
			return `"path":"${path.replace(/\./g, "/")}"`;
		}
		return `"path":"${path}"`;
	});
	if (newContent !== content) writeFileSync(file, newContent);
}
if (totalFixed > 0) {
	console.log(`✓ Normalized ${totalFixed} API path(s) in MDX (dot → slash)`);
}
