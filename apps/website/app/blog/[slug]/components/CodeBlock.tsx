"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { type JSX, useLayoutEffect, useState } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { highlight } from "./shared";

interface CodeBlockProps {
	code: string;
	lang: BundledLanguage;
	initial?: JSX.Element;
}

export function CodeBlock({ code, lang, initial }: CodeBlockProps) {
	const [nodes, setNodes] = useState<JSX.Element | undefined>(initial);

	useLayoutEffect(() => {
		async function highlightCode() {
			try {
				const highlighted = await highlight(code, lang);
				setNodes(highlighted);
			} catch (error) {
				console.error("Error highlighting code:", error);
			}
		}
		void highlightCode();
	}, [code, lang]);

	if (!nodes) {
		return (
			<div className="group relative">
				<div className="animate-pulse overflow-auto rounded-lg bg-[#18191F] p-4 text-sm">
					<div className="mb-2 h-4 w-3/4 rounded bg-gray-700" />
					<div className="h-4 w-1/2 rounded bg-gray-700" />
				</div>
			</div>
		);
	}

	return (
		<div className="group relative">
			<CopyButton text={code} />
			<div className="overflow-auto rounded-lg bg-[#18191F] p-4 text-sm">
				{nodes}
			</div>
		</div>
	);
}
