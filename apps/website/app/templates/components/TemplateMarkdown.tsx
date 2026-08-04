import type React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { H2, H3 } from "../../blog/[slug]/components/Headings";
import { TemplateCodeBlock } from "./TemplateCodeBlock";

const components: Partial<Components> = {
	h1: H2,
	h2: H2,
	h3: H3,
	p: ({ node, children, ...props }) => (
		<p
			className="mb-4 text-base leading-relaxed text-muted-foreground"
			{...props}
		>
			{children}
		</p>
	),
	a: ({ node, href, ...props }) => (
		<a
			href={href}
			className="text-blue-500 transition-colors hover:text-blue-500/80"
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	),
	ul: ({ node, ...props }) => (
		<ul
			className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground"
			{...props}
		/>
	),
	ol: ({ node, ...props }) => (
		<ol
			className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground"
			{...props}
		/>
	),
	li: ({ node, ...props }) => (
		<li className="ml-2 text-base leading-relaxed" {...props} />
	),
	blockquote: ({ node, ...props }) => (
		<blockquote
			className="my-4 border-l-4 border-primary bg-muted/50 py-2 pl-4"
			{...props}
		/>
	),
	table: ({ node, ...props }) => (
		<div className="my-6 w-full overflow-x-auto rounded-lg border">
			<table className="w-full border-collapse" {...props} />
		</div>
	),
	thead: ({ node, ...props }) => (
		<thead className="border-b border-border bg-muted" {...props} />
	),
	tbody: ({ node, ...props }) => (
		<tbody className="divide-y divide-border" {...props} />
	),
	tr: ({ node, ...props }) => (
		<tr className="transition-colors hover:bg-muted/50" {...props} />
	),
	th: ({ node, ...props }) => (
		<th className="p-4 text-left font-semibold" {...props} />
	),
	td: ({ node, ...props }) => (
		<td className="p-4 text-muted-foreground" {...props} />
	),
	code: ({
		className,
		children,
		inline,
	}: {
		className?: string;
		children?: React.ReactNode;
		inline?: boolean;
	}) => {
		if (inline || !className || !/language-(\w+)/.test(className)) {
			return (
				<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
					{children}
				</code>
			);
		}
		const match = /language-(\w+)/.exec(className);
		return (
			<TemplateCodeBlock
				lang={match ? match[1] : "ts"}
				code={children?.toString() || ""}
			/>
		);
	},
};

export function TemplateMarkdown({ content }: { content: string }) {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
			{content}
		</ReactMarkdown>
	);
}
