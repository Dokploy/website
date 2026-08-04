"use client";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { CheckIcon, CopyIcon } from "lucide-react";
import { type JSX, useLayoutEffect, useState } from "react";
import * as react from "react";
import * as jsxRuntime from "react/jsx-runtime";
// Full shiki bundle (languages are still lazy-loaded): the blog's
// shiki/bundle/web build lacks toml and other infra languages
import { type BundledLanguage, codeToHast } from "shiki";

async function highlight(code: string, lang: string) {
	const out = await codeToHast(code, {
		lang: lang as BundledLanguage,
		theme: "houston",
	}).catch(() => codeToHast(code, { lang: "txt", theme: "houston" }));
	return toJsxRuntime(out, {
		Fragment: react.Fragment,
		jsx: jsxRuntime.jsx,
		jsxs: jsxRuntime.jsxs,
	}) as JSX.Element;
}

export function TrafficLights() {
	return (
		<div className="flex shrink-0 items-center gap-1.5">
			<span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
			<span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
			<span className="h-3 w-3 rounded-full bg-[#28C840]" />
		</div>
	);
}

export function EditorCopyButton({ text }: { text: string }) {
	const [isCopied, setIsCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
			aria-label="Copy code"
		>
			{isCopied ? (
				<CheckIcon className="h-4 w-4 text-green-500" />
			) : (
				<CopyIcon className="h-4 w-4" />
			)}
		</button>
	);
}

function CodeArea({ code, lang }: { code: string; lang: string }) {
	const [nodes, setNodes] = useState<JSX.Element | undefined>(undefined);

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
			<div className="animate-pulse space-y-2.5 p-4">
				<div className="h-3.5 w-3/4 rounded bg-white/10" />
				<div className="h-3.5 w-1/2 rounded bg-white/10" />
				<div className="h-3.5 w-2/3 rounded bg-white/10" />
				<div className="h-3.5 w-2/5 rounded bg-white/10" />
			</div>
		);
	}

	return (
		<div className="code-editor max-h-[32rem] overflow-auto px-4">{nodes}</div>
	);
}

interface TemplateCodeBlockProps {
	code: string;
	lang: string;
	fileName?: string;
	// Render only the code area, for embedding inside an editor window shell
	bare?: boolean;
}

export function TemplateCodeBlock({
	code,
	lang,
	fileName,
	bare,
}: TemplateCodeBlockProps) {
	if (bare) {
		return <CodeArea code={code} lang={lang} />;
	}

	return (
		<div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#17191E] shadow-lg">
			<div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2">
				<TrafficLights />
				<span className="font-mono text-xs text-zinc-500">
					{fileName ?? lang}
				</span>
				<div className="ml-auto">
					<EditorCopyButton text={code} />
				</div>
			</div>
			<CodeArea code={code} lang={lang} />
		</div>
	);
}
