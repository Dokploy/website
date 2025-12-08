import { generateFiles } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";

const openapi = createOpenAPI({
	input: ["./public/openapi.json"],
});

try {
	await generateFiles({
		input: openapi,
		output: "./content/docs/api",
		per: "tag",
		includeDescription: true,
	});
	console.log("✓ Generated API documentation files");
} catch (error) {
	console.error("Error generating docs:", error.message);
	process.exit(1);
}
