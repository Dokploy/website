"use client";

import { CopyButton } from "@/components/ui/copy-button";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as yaml from "prettier/plugins/yaml";
import * as prettier from "prettier/standalone";
import { type JSX, useLayoutEffect, useState } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { highlight } from "./shared";

interface CodeBlockProps {
	code: string;
	lang: BundledLanguage;
	initial?: JSX.Element;
}

async function formatCode(code: string, lang: string) {
	try {
		let parser: string;
		let plugins = [] as any[];
		switch (lang.toLowerCase()) {
			case "yaml":
			case "yml":
				parser = "yaml";
				plugins = [yaml];
				break;
			case "javascript":
			case "typescript":
			case "jsx":
			case "tsx":
				parser = "babel-ts";
				plugins = [babel, estree];
				break;
			default:
				return code;
		}
		const formatted = await prettier.format(code, {
			parser,
			plugins,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			useTabs: false,
			printWidth: 120,
		});
		return formatted;
	} catch (error) {
		console.error("Error formatting code:", error);
		return code;
	}
}

export function CodeBlock({ code, lang, initial }: CodeBlockProps) {
	const [nodes, setNodes] = useState<JSX.Element | undefined>(initial);
	const [formattedCode, setFormattedCode] = useState(code);

	useLayoutEffect(() => {
		async function formatAndHighlight() {
			try {
				const formatted = await formatCode(code, lang);
				setFormattedCode(formatted);
				const highlighted = await highlight(formatted, lang);
				setNodes(highlighted);
			} catch (error) {
				const highlighted = await highlight(code, lang);
				setNodes(highlighted);
			}
		}
		void formatAndHighlight();
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
			<CopyButton text={formattedCode} />
			<div className="overflow-auto rounded-lg bg-[#18191F] p-4 text-sm">
				{nodes}
			</div>
		</div>
	);
}
