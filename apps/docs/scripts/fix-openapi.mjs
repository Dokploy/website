import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const openapiPath = join(process.cwd(), 'public', 'openapi.json');

console.log('Fixing OpenAPI schema...');

try {
	const openapi = JSON.parse(readFileSync(openapiPath, 'utf8'));

	let fixed = 0;
	let securityFixed = false;
	
	// Fix missing Authorization security scheme
	if (!openapi.components) {
		openapi.components = {};
	}
	if (!openapi.components.securitySchemes) {
		openapi.components.securitySchemes = {};
	}
	if (!openapi.components.securitySchemes.Authorization) {
		openapi.components.securitySchemes.Authorization = {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'API key authentication using Authorization header'
		};
		securityFixed = true;
	}
	
	// Fix empty response schemas
	for (const [path, pathItem] of Object.entries(openapi.paths || {})) {
		for (const [method, operation] of Object.entries(pathItem)) {
			if (operation.responses) {
				for (const [status, response] of Object.entries(operation.responses)) {
					if (response.content && response.content['application/json']) {
						const content = response.content['application/json'];
						// Check if schema is completely empty or missing
						if (Object.keys(content).length === 0 || !content.schema) {
							response.content['application/json'] = {
								schema: {
									type: 'object',
									description: 'Successful response'
								}
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
		if (securityFixed) console.log(`✓ Added missing Authorization security scheme`);
	} else {
		console.log('✓ No fixes needed');
	}
} catch (error) {
	console.error('Error fixing OpenAPI schema:', error.message);
	process.exit(1);
}

