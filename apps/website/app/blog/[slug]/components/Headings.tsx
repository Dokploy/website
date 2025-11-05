"use client";

import { useRouter } from "next/navigation";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import slugify from "slugify";

type HeadingProps = DetailedHTMLProps<
	HTMLAttributes<HTMLHeadingElement>,
	HTMLHeadingElement
>;

function LinkIcon() {
	return (
		<svg
			className="inline-block w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
			/>
		</svg>
	);
}

export function H1({ children, ...props }: HeadingProps) {
	const router = useRouter();
	const id = slugify(children?.toString() || "", { lower: true, strict: true });
	const handleClick = () => {
		router.push(`#${id}`);
	};
	return (
		<h1
			id={id}
			onClick={handleClick}
			className="group text-xl md:text-2xl xl:text-3xl text-primary font-bold mt-8 mb-4 cursor-pointer hover:text-primary/80 transition-colors"
			{...props}
		>
			{children}
			<LinkIcon />
		</h1>
	);
}

export function H2({ children, ...props }: HeadingProps) {
	const router = useRouter();
	const id = slugify(children?.toString() || "", { lower: true, strict: true });
	const handleClick = () => {
		router.push(`#${id}`);
	};
	return (
		<h2
			id={id}
			onClick={handleClick}
			className="group text-2xl text-primary/90 font-semibold mt-6 mb-3 cursor-pointer hover:text-primary/80 transition-colors"
			{...props}
		>
			{children}
			<LinkIcon />
		</h2>
	);
}

export function H3({ children, ...props }: HeadingProps) {
	const router = useRouter();
	const id = slugify(children?.toString() || "", { lower: true, strict: true });
	const handleClick = () => {
		router.push(`#${id}`);
	};
	return (
		<h3
			id={id}
			onClick={handleClick}
			className="group text-xl text-primary/90 font-semibold mt-4 mb-2 cursor-pointer hover:text-primary/80 transition-colors"
			{...props}
		>
			{children}
			<LinkIcon />
		</h3>
	);
}
