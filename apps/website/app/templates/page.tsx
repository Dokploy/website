import { getTemplates, getTopTags } from "@/lib/templates";
import type { Metadata } from "next";
import { SearchAndFilter } from "../blog/components/SearchAndFilter";
import { TemplateCard } from "./components/TemplateCard";

export const metadata: Metadata = {
	title: "Open Source Templates - One-Click Self-Hosted Deployments",
	description:
		"Browse 500+ open source templates ready to deploy on Dokploy with one click. Self-host databases, CMS, analytics, AI tools, and more with Docker Compose.",
	alternates: {
		canonical: "https://dokploy.com/templates",
	},
	openGraph: {
		title: "Dokploy Open Source Templates",
		description:
			"Browse 500+ open source templates ready to deploy on Dokploy with one click.",
		type: "website",
		url: "https://dokploy.com/templates",
	},
};

export default async function TemplatesPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const resolvedParams = await searchParams;
	const templates = await getTemplates();
	const topTags = getTopTags(templates);

	const search =
		typeof resolvedParams.search === "string" ? resolvedParams.search : "";
	const selectedTag =
		typeof resolvedParams.tag === "string" ? resolvedParams.tag : "";

	const filteredTemplates = templates.filter((template) => {
		const matchesSearch =
			search === "" ||
			template.name.toLowerCase().includes(search.toLowerCase()) ||
			template.description.toLowerCase().includes(search.toLowerCase());

		const matchesTag =
			selectedTag === "" || template.tags.includes(selectedTag);

		return matchesSearch && matchesTag;
	});

	return (
		<div className="container mx-auto max-w-7xl px-4 py-12 mt-14">
			<div className="mb-8">
				<p className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
					TEMPLATES
				</p>
				<h1 className="text-4xl font-bold">Open Source Templates</h1>
				<p className="mt-3 max-w-2xl text-lg text-muted-foreground">
					{templates.length}+ pre-configured open source templates you can
					deploy on Dokploy with a single click.
				</p>
			</div>

			<SearchAndFilter
				tags={topTags.map((tag) => ({ id: tag, name: tag, slug: tag }))}
				initialSearch={search}
				initialTag={selectedTag}
				searchPlaceholder="Search templates..."
				allTagsText="All Tags"
			/>

			{filteredTemplates.length === 0 ? (
				<div className="flex min-h-[20vh] items-center justify-center py-12 text-center">
					<p className="text-xl text-muted-foreground">
						{search || selectedTag
							? "No templates found matching your criteria"
							: "No templates available"}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredTemplates.map((template) => (
						<TemplateCard key={template.id} template={template} />
					))}
				</div>
			)}
		</div>
	);
}
