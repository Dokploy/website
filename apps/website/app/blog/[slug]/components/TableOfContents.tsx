"use client";

import { useEffect, useState } from "react";

interface Heading {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeId, setActiveId] = useState<string>();

	useEffect(() => {
		const elements = Array.from(document.querySelectorAll("h1, h2, h3"))
			.filter((element) => element.id)
			.map((element) => ({
				id: element.id,
				text: element.textContent || "",
				level: Number(element.tagName.charAt(1)),
			}));
		setHeadings(elements);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "-100px 0px -66%" },
		);

		for (const { id } of elements) {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<nav className="space-y-2 text-sm">
			<p className="font-medium mb-4">Table of Contents</p>
			<ul className="space-y-2">
				{headings.length > 0 ? (
					headings.map((heading) => (
						<li
							key={heading.id}
							style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
						>
							<a
								href={`#${heading.id}`}
								onClick={(e) => {
									e.preventDefault();
									document
										.getElementById(heading.id)
										?.scrollIntoView({ behavior: "smooth" });
								}}
								className={`hover:text-primary transition-colors block ${activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground"}`}
							>
								{heading.text}
							</a>
						</li>
					))
				) : (
					<li>
						<p className="text-muted-foreground">No headings found</p>
					</li>
				)}
			</ul>
		</nav>
	);
}
