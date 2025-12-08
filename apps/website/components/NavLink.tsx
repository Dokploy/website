"use client";

import Link from "next/link";
import { trackGAEvent } from "./analitycs";

export function NavLink({
	href,
	children,
	target,
}: {
	href: string;
	children: React.ReactNode;
	target?: string;
}) {
	return (
		<div>
			<Link
				href={href}
				onClick={() =>
					trackGAEvent({
						action: "Nav Link Clicked",
						category: "Navigation",
						label: href,
					})
				}
				target={target}
				className="inline-block self-center rounded-lg px-2.5 py-1.5 text-sm font-medium  text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
			>
				{children}
			</Link>
		</div>
	);
}
