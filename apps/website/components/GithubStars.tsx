"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type GithubStarsProps = {
	className?: string;
	repoUrl?: string;
	label?: string;
	count?: string;
};

export function GithubStars({
	className,
	repoUrl = "https://github.com/dokploy/dokploy",
	label = "GitHub Stars",
	count = "26k",
}: GithubStarsProps) {
	return (
		<Link
			href={repoUrl}
			target="_blank"
			aria-label={`${label}: ${count}`}
			className={cn(
				"group relative inline-flex items-center gap-2 rounded-full px-3 py-1",
				"shadow-[0_0_0_2px_#000_inset,0_2px_8px_rgba(0,0,0,0.35)]",
				"bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500",
				"text-black",
				"transition-transform hover:scale-[1.02] active:scale-[0.99]",
				className,
			)}
		>
			{/* sparkling stars */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-visible"
			>
				{/* top-left star */}
				<svg
					viewBox="0 0 24 24"
					className={cn(
						"absolute -top-1 -left-1 h-3 w-3 text-yellow-100",
						"drop-shadow-[0_0_6px_rgba(255,255,200,0.9)]",
						"animate-pulse [animation-duration:1.6s] [animation-delay:.2s]",
					)}
					fill="currentColor"
				>
					<path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
				</svg>
				{/* top-right star */}
				<svg
					viewBox="0 0 24 24"
					className={cn(
						"absolute -top-2 right-1 h-2.5 w-2.5 text-yellow-50",
						"drop-shadow-[0_0_6px_rgba(255,255,220,0.95)]",
						"animate-pulse [animation-duration:1.9s] [animation-delay:.7s]",
					)}
					fill="currentColor"
				>
					<path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
				</svg>
				{/* bottom-right star */}
				<svg
					viewBox="0 0 24 24"
					className={cn(
						"absolute -bottom-1 -right-1 h-3.5 w-3.5 text-yellow-200",
						"drop-shadow-[0_0_8px_rgba(255,255,180,0.85)]",
						"animate-pulse [animation-duration:2.2s] [animation-delay:1.1s]",
					)}
					fill="currentColor"
				>
					<path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
				</svg>
			</span>

			{/* subtle shine */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
			>
				<span
					className={cn(
						"absolute -inset-x-10 -top-6 h-10 rotate-12",
						"bg-white/40 blur-md",
						"opacity-0 transition-opacity duration-500",
						"group-hover:opacity-40",
					)}
				/>
			</span>

			{/* GitHub mark */}
			<span
				className={cn(
					"flex h-6 w-6 items-center justify-center rounded-full",
					"bg-black text-white",
					"shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]",
				)}
			>
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					className="h-3.5 w-3.5"
					fill="currentColor"
				>
					<path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.21 11.43c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.07-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.2-.13-.31-.54-1.56.12-3.24 0 0 1.01-.32 3.3 1.22.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.54 3.3-1.22 3.3-1.22.66 1.68.25 2.93.12 3.24.77.84 1.24 1.9 1.24 3.2 0 4.58-2.8 5.6-5.47 5.9.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.69.83.57A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
				</svg>
			</span>

			{/* copy */}
			<span className="flex items-baseline gap-1 pr-0.5">
				<span className="text-xs font-semibold">Stars</span>
				<span className="text-sm font-extrabold tracking-tight">{count}</span>
			</span>

			{/* subtle ring on hover */}
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute inset-0 rounded-full",
					"ring-1 ring-black/10 group-hover:ring-black/20",
				)}
			/>
		</Link>
	);
}

export default GithubStars;
