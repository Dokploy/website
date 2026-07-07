import { getLLMText, source } from "@/lib/source";

export const revalidate = false;

const baseUrl = "https://docs.dokploy.com";

export async function GET() {
	const pages = source
		.getPages()
		.filter((page) => !page.url.startsWith("/docs/api/"));

	const scan = pages.map(getLLMText);
	const scanned = await Promise.all(scan);

	const content = [
		...scanned,
		"# API Reference",
		"",
		`For the complete API reference, see the OpenAPI specification: ${baseUrl}/openapi.json`,
	];

	return new Response(content.join("\n\n"));
}
