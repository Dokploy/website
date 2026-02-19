"use client";

import Link from "next/link";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { Logo } from "./shared/Logo";

const footerSections = [
	{
		title: "Product",
		ariaLabel: "Product and features",
		links: [
			{ href: "/", label: "Home" },
			{ href: "/#features", label: "Features" },
			{ href: "/#pricing", label: "Pricing" },
			{
				href: "/features/application-deployment-platform",
				label: "Application Deployment Platform",
			},
			{ href: "/contact", label: "Contact" },
		],
	},
	{
		title: "Compare & Learn",
		ariaLabel: "Comparisons and guides",
		links: [
			{
				href: "/dokploy-vs-coolify",
				label: "Dokploy vs. Coolify",
			},
			{ href: "/blog", label: "Blog" },
			{
				href: "https://docs.dokploy.com/docs/core",
				label: "Documentation",
				external: true,
			},
		],
	},
	{
		title: "Legal",
		ariaLabel: "Legal and policies",
		links: [
			{ href: "/terms-of-service", label: "Terms of Service" },
			{ href: "/privacy", label: "Privacy Policy" },
		],
	},
] as const;

export function Footer() {
	return (
		<footer className="bg-black" role="contentinfo">
			<Container>
				<div className="py-12 md:py-16">
					{/* Logo + name + tagline */}
					<div className="flex flex-col items-center gap-2 text-center md:items-start">
						<Link
							href="/"
							aria-label="Dokploy - Home"
							className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
						>
							<Logo className="h-10 w-auto" />
							<span className="text-xl font-semibold text-primary">Dokploy</span>
						</Link>
						<span className="text-sm font-medium text-muted-foreground">
							Deploy your applications with ease
						</span>
					</div>

					{/* Link columns - SEO-friendly grouping */}
					<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{footerSections.map((section) => (
							<nav
								key={section.title}
								aria-label={section.ariaLabel}
								className="flex flex-col"
							>
								<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									{section.title}
								</h3>
								<ul className="mt-4 space-y-3">
									{section.links.map((item) => (
										<li key={item.href + item.label}>
											{"external" in item && item.external ? (
												<NavLink
													href={item.href}
													target="_blank"
												>
													{item.label}
												</NavLink>
											) : (
												<NavLink href={item.href}>{item.label}</NavLink>
											)}
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>
				</div>

				{/* Bottom bar: social + copyright */}
				<div className="flex flex-col items-center border-t border-slate-400/10 py-8 sm:flex-row sm:justify-between sm:items-center gap-6">
					<p className="text-sm text-muted-foreground order-2 sm:order-1">
						© {new Date().getFullYear()} Dokploy. All rights reserved.
					</p>
					<div className="flex items-center gap-6 order-1 sm:order-2" aria-label="Social links">
						<Link
							href="https://x.com/getdokploy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-muted-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
							aria-label="Dokploy on X (Twitter)"
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0"
								viewBox="0 0 512 512"
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
							>
								<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
							</svg>
						</Link>
						<Link
							href="https://github.com/dokploy/dokploy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-muted-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
							aria-label="Dokploy on GitHub"
						>
							<svg
								aria-hidden="true"
								className="h-6 w-6 fill-current"
								viewBox="0 0 24 24"
							>
								<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
							</svg>
						</Link>
					</div>
				</div>
			</Container>
		</footer>
	);
}
