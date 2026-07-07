import { source } from "@/lib/source";

export const revalidate = false;

const baseUrl = "https://docs.dokploy.com";

export function GET() {
	const pages = source.getPages();
	const docsPages = pages.filter(
		(page) => !page.url.startsWith("/docs/api/"),
	);

	const lines = [
		"# Dokploy Documentation",
		"",
		"> Dokploy is an open-source, self-hostable Platform as a Service (PaaS) that simplifies the deployment and management of applications, databases, and services.",
		"",
		"## Docs",
		"",
		...docsPages.map(
			(page) =>
				`- [${page.data.title}](${baseUrl}${page.url})${page.data.description ? `: ${page.data.description}` : ""}`,
		),
		"",
		"## API Reference",
		"",
		`- [OpenAPI Specification](${baseUrl}/openapi.json): Complete API reference in OpenAPI format`,
		"",
		"## Full Documentation",
		"",
		`- [llms-full.txt](${baseUrl}/llms-full.txt): All documentation pages as plain text`,
	];

	return new Response(lines.join("\n"));
}
