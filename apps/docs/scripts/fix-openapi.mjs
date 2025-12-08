import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const openapiPath = join(process.cwd(), "public", "openapi.json");

console.log("Fixing OpenAPI schema...");

try {
	const openapi = JSON.parse(readFileSync(openapiPath, "utf8"));

	let fixed = 0;
	let securityFixed = false;

	// Remove Authorization security scheme and add x-api-key
	if (!openapi.components) {
		openapi.components = {};
	}
	if (!openapi.components.securitySchemes) {
		openapi.components.securitySchemes = {};
	}

	// Remove old Authorization scheme
	if (openapi.components.securitySchemes["Authorization"]) {
		delete openapi.components.securitySchemes["Authorization"];
		securityFixed = true;
	}

	// Add x-api-key scheme
	openapi.components.securitySchemes["x-api-key"] = {
		type: "apiKey",
		in: "header",
		name: "x-api-key",
		description: "API key authentication. Use YOUR-GENERATED-API-KEY",
		"x-default": "your-key",
	};
	securityFixed = true;

	// Replace global security from Authorization to x-api-key
	if (openapi.security) {
		openapi.security = openapi.security.filter((sec) => !sec["Authorization"]);
	} else {
		openapi.security = [];
	}

	const hasApiKeySecurity = openapi.security.some((sec) => sec["x-api-key"]);
	if (!hasApiKeySecurity) {
		openapi.security.push({ "x-api-key": [] });
		securityFixed = true;
	}

	// Replace Authorization with x-api-key in all operation security
	for (const [path, pathItem] of Object.entries(openapi.paths || {})) {
		for (const [method, operation] of Object.entries(pathItem)) {
			if (operation && operation.security) {
				// Replace Authorization with x-api-key
				operation.security = operation.security.map((sec) => {
					if (sec["Authorization"] !== undefined) {
						securityFixed = true;
						return { "x-api-key": [] };
					}
					return sec;
				});
			}
		}
	}

	// Fix empty response schemas
	for (const [path, pathItem] of Object.entries(openapi.paths || {})) {
		for (const [method, operation] of Object.entries(pathItem)) {
			if (operation.responses) {
				for (const [status, response] of Object.entries(operation.responses)) {
					if (response.content && response.content["application/json"]) {
						const content = response.content["application/json"];
						// Check if schema is completely empty or missing
						if (Object.keys(content).length === 0 || !content.schema) {
							response.content["application/json"] = {
								schema: {
									type: "object",
									description: "Successful response",
								},
							};
							fixed++;
						}
					}
				}
			}
		}
	}

	if (fixed > 0 || securityFixed) {
		writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));
		if (fixed > 0) console.log(`✓ Fixed ${fixed} empty response schemas`);
		if (securityFixed) console.log("✓ Added x-api-key security scheme");
	} else {
		console.log("✓ No fixes needed");
	}
} catch (error) {
	console.error("Error fixing OpenAPI schema:", error.message);
	process.exit(1);
}
