import { APIPage } from "@/lib/source";
import { Callout } from "fumadocs-ui/components/callout";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		ImageZoom,
		Callout,
		Tab,
		Tabs,
		APIPage,
		...components,
		p: ({ children }) => (
			<p className="text-[#3E4342] dark:text-muted-foreground">{children}</p>
		),
		li: ({ children, id }) => (
			<li {...{ id }} className="text-[#3E4342] dark:text-muted-foreground">
				{children}
			</li>
		),
	};
}
