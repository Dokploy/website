const TEMPLATES_BASE_URL = "https://templates.dokploy.com";
const REVALIDATE_SECONDS = 3600;

export interface TemplateLinks {
	github?: string;
	website?: string;
	docs?: string;
}

export interface Template {
	id: string;
	name: string;
	version: string;
	description: string;
	logo: string;
	links: TemplateLinks;
	tags: string[];
}

export interface TemplateFiles {
	dockerCompose: string | null;
	templateToml: string | null;
	instructions: string | null;
}

export async function getTemplates(): Promise<Template[]> {
	try {
		const response = await fetch(`${TEMPLATES_BASE_URL}/meta.json`, {
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!response.ok) return [];
		const templates: Template[] = await response.json();
		return templates.sort((a, b) => a.name.localeCompare(b.name));
	} catch {
		return [];
	}
}

export async function getTemplate(id: string): Promise<Template | null> {
	const templates = await getTemplates();
	return templates.find((template) => template.id === id) ?? null;
}

export function getTemplateLogoUrl(template: Template): string {
	return `${TEMPLATES_BASE_URL}/blueprints/${template.id}/${template.logo}`;
}

async function getBlueprintFile(
	id: string,
	fileName: string,
): Promise<string | null> {
	try {
		const response = await fetch(
			`${TEMPLATES_BASE_URL}/blueprints/${id}/${fileName}`,
			{ next: { revalidate: REVALIDATE_SECONDS } },
		);
		if (!response.ok) return null;
		const text = await response.text();
		// The templates host serves the SPA's index.html for missing files
		if (/^\s*(<!doctype|<html\b)/i.test(text)) return null;
		return text.trim() || null;
	} catch {
		return null;
	}
}

export async function getTemplateFiles(id: string): Promise<TemplateFiles> {
	const [dockerCompose, templateToml, instructions] = await Promise.all([
		getBlueprintFile(id, "docker-compose.yml"),
		getBlueprintFile(id, "template.toml"),
		getBlueprintFile(id, "instructions.md"),
	]);
	return { dockerCompose, templateToml, instructions };
}

// Same payload format the Dokploy UI expects for Compose → Advanced → Base64 import
export function templateToBase64(
	dockerCompose: string | null,
	config: string | null,
): string {
	const jsonString = JSON.stringify(
		{ compose: dockerCompose ?? "", config: config ?? "" },
		null,
		2,
	);
	return Buffer.from(jsonString, "utf-8").toString("base64");
}

export function getRelatedTemplates(
	template: Template,
	allTemplates: Template[],
	limit = 6,
): Template[] {
	return allTemplates
		.filter((candidate) => candidate.id !== template.id)
		.map((candidate) => ({
			candidate,
			shared: candidate.tags.filter((tag) => template.tags.includes(tag))
				.length,
		}))
		.filter(({ shared }) => shared > 0)
		.sort(
			(a, b) =>
				b.shared - a.shared || a.candidate.name.localeCompare(b.candidate.name),
		)
		.slice(0, limit)
		.map(({ candidate }) => candidate);
}

export function getTopTags(templates: Template[], limit = 30): string[] {
	const counts = new Map<string, number>();
	for (const template of templates) {
		for (const tag of template.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.slice(0, limit)
		.map(([tag]) => tag);
}
