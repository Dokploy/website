import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";
import type { InferPageType } from "fumadocs-core/source";

export const { GET } = createFromSource(source, {
	// https://docs.orama.com/docs/orama-js/supported-languages
	language: "english",
	// Configure tag filter based on the first slug (core, cli, api)
	buildIndex(page: InferPageType<typeof source>) {
		const tag = page.slugs[0] || "all";
		return {
			title: page.data.title,
			description: page.data.description,
			url: page.url,
			id: page.url,
			structuredData: page.data.structuredData,
			// Assign tag based on the first slug (core, cli, api)
			tag,
		} as any;
	},
});
