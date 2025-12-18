import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import type { JSX } from "react";
import * as react from "react";
import * as jsxRuntime from "react/jsx-runtime";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";

export async function highlight(code: string, lang: BundledLanguage) {
	const out = await codeToHast(code, {
		lang,
		theme: "houston",
	});
	return toJsxRuntime(out, { 
		Fragment: react.Fragment, 
		jsx: jsxRuntime.jsx, 
		jsxs: jsxRuntime.jsxs 
	}) as JSX.Element;
}
