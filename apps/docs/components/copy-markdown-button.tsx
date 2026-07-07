"use client";

import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Copy } from "lucide-react";

export function CopyMarkdownButton({ markdown }: { markdown: string }) {
	const [checked, onClick] = useCopyButton(() => {
		navigator.clipboard.writeText(markdown);
	});

	return (
		<button
			type="button"
			className="inline-flex items-center gap-1.5 rounded-md border bg-fd-secondary px-3 py-1.5 text-xs font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
			onClick={onClick}
		>
			{checked ? (
				<>
					<Check className="size-3.5" />
					Copied!
				</>
			) : (
				<>
					<Copy className="size-3.5" />
					Copy as Markdown
				</>
			)}
		</button>
	);
}
