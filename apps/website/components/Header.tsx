"use client";

import { cn } from "@/lib/utils";
import { Popover, Transition } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, type JSX, type SVGProps, useEffect } from "react";
import { createPortal } from "react-dom";
import { Container } from "./Container";
import GithubStars from "./GithubStars";
import { trackGAEvent } from "./analitycs";
import { Logo } from "./shared/Logo";
import { Button } from "./ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

function MobileNavLink({
	href,
	children,
	target,
}: {
	href: string;
	children: React.ReactNode;
	target?: string;
}) {
	return (
		<Popover.Button
			onClick={() => {
				trackGAEvent({
					action: "Nav Link Clicked",
					category: "Navigation",
					label: href,
				});
			}}
			as={Link}
			href={href}
			target={target}
			className="block w-full p-2"
		>
			{children}
		</Popover.Button>
	);
}

function MobileNavIcon({ open }: { open: boolean }) {
	return (
		<svg
			aria-hidden="true"
			className="h-3.5 w-3.5 overflow-visible stroke-muted-foreground"
			fill="none"
			strokeWidth={2}
			strokeLinecap="round"
		>
			<path
				d="M0 1H14M0 7H14M0 13H14"
				className={cn("origin-center transition", open && "scale-90 opacity-0")}
			/>
			<path
				d="M2 2L12 12M12 2L2 12"
				className={cn(
					"origin-center transition",
					!open && "scale-90 opacity-0",
				)}
			/>
		</svg>
	);
}

function BodyScrollLock({ lock }: { lock: boolean }) {
	useEffect(() => {
		document.body.style.overflow = lock ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [lock]);
	return null;
}

function MobileNavigation() {
	return (
		<Popover>
			{({ open, close }) => (
				<>
					<BodyScrollLock lock={open} />
					<Popover.Button
						className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
						aria-label="Toggle Navigation"
					>
						<MobileNavIcon open={open} />
					</Popover.Button>
					{open &&
						createPortal(
							<div
								className="fixed inset-0 z-40 bg-background/50"
								onClick={() => close()}
							/>,
							document.body,
						)}
					<Transition.Root>
						<Transition.Child
							as={Fragment as any}
							enter="duration-150 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-100 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Popover.Panel
								as="div"
								className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl border border-border bg-background p-4 text-lg tracking-tight text-primary shadow-xl ring-1 ring-border/5 max-h-[80vh] overflow-y-auto"
							>
								<p className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
									Features
								</p>
								<MobileNavLink href="/features/application-deployment-platform">
									Application Deployment
								</MobileNavLink>
								<MobileNavLink href="/features/database-management-tool">
									Databases
								</MobileNavLink>
								<MobileNavLink href="/features/application-management-software">
									Application Management
								</MobileNavLink>
								<MobileNavLink href="/features/container-server-monitoring">
									Monitoring
								</MobileNavLink>
								<MobileNavLink href="/features/security">
									Security
								</MobileNavLink>
								<MobileNavLink href="/sandbox-software">
									Sandbox Software
								</MobileNavLink>
								<MobileNavLink href="/deploy-ai">AI Deployment</MobileNavLink>
								<hr className="m-2 border-border" />
								<MobileNavLink href="/pricing">Pricing</MobileNavLink>
								<hr className="m-2 border-border" />
								<p className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
									Solutions
								</p>
								<MobileNavLink href="/enterprise">Enterprise</MobileNavLink>
								<MobileNavLink href="/partners">Partners</MobileNavLink>
								<MobileNavLink href="/self-hosted-paas">
									Self-Hosted
								</MobileNavLink>
								<MobileNavLink href="/industries">Industries</MobileNavLink>
								<MobileNavLink href="/industries/higher-education">
									Education
								</MobileNavLink>
								<hr className="m-2 border-border" />
								<MobileNavLink
									href="https://docs.dokploy.com/docs/core"
									target="_blank"
								>
									Docs
								</MobileNavLink>
								<hr className="m-2 border-border" />
								<p className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
									Resources
								</p>
								<MobileNavLink href="/templates">Templates</MobileNavLink>
								<MobileNavLink href="/comparison">Dokploy vs.</MobileNavLink>
								<MobileNavLink href="/blog">Blog</MobileNavLink>
								<MobileNavLink href="/#faqs">FAQ</MobileNavLink>
								<MobileNavLink href="/jobs">Jobs</MobileNavLink>
								<hr className="m-2 border-border" />
								<MobileNavLink href="/jobs">Careers</MobileNavLink>
								<MobileNavLink href="/contact">Contact</MobileNavLink>
								<MobileNavLink href="https://app.dokploy.com/" target="_blank">
									Sign In
								</MobileNavLink>
								<MobileNavLink
									href="https://app.dokploy.com/register"
									target="_blank"
								>
									<Button className="w-full" asChild>
										<div className="group relative mx-auto flex w-full max-w-fit flex-row items-center justify-center rounded-2xl text-sm font-medium">
											<span>Sign Up</span>
											<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
										</div>
									</Button>
								</MobileNavLink>
							</Popover.Panel>
						</Transition.Child>
					</Transition.Root>
				</>
			)}
		</Popover>
	);
}

function ListItem({
	className,
	title,
	href,
	target,
	children,
}: {
	className?: string;
	title: string;
	href: string;
	target?: string;
	children?: React.ReactNode;
}) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					target={target}
					onClick={() =>
						trackGAEvent({
							action: "Nav Link Clicked",
							category: "Navigation",
							label: href,
						})
					}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					{children && (
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
					)}
				</Link>
			</NavigationMenuLink>
		</li>
	);
}

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 py-5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<Container>
				<nav className="relative z-50 flex justify-between">
					<div className="flex items-center md:gap-x-12">
						<Link href="/" aria-label="Home">
							<Logo className="h-10 w-auto" />
						</Link>
						<div className="hidden md:flex">
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuTrigger>Features</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[200px] gap-1 p-2">
												<ListItem
													href="/features/application-deployment-platform"
													title="Application Deployment"
												>
													Deploy and manage applications with ease
												</ListItem>
												<ListItem
													href="/features/database-management-tool"
													title="Databases"
												>
													Manage your databases effortlessly
												</ListItem>
												<ListItem
													href="/features/application-management-software"
													title="Application Management"
												>
													Monitor and control your applications
												</ListItem>
												<ListItem
													href="/features/container-server-monitoring"
													title="Monitoring"
												>
													Keep your systems running
												</ListItem>
												<ListItem href="/features/security" title="Security">
													Access control, SSO, RBAC, and audit logs
												</ListItem>
												<ListItem
													href="/sandbox-software"
													title="Sandbox Software"
												>
													Build and ship internal apps safely
												</ListItem>
												<ListItem href="/deploy-ai" title="AI Deployment">
													Empower your team to deploy AI tools
												</ListItem>
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link
												href="/pricing"
												onClick={() =>
													trackGAEvent({
														action: "Nav Link Clicked",
														category: "Navigation",
														label: "/pricing",
													})
												}
											>
												Pricing
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[200px] gap-1 p-2">
												<ListItem href="/enterprise" title="Enterprise">
													Enterprise-grade deployment platform
												</ListItem>
												<ListItem href="/partners" title="Partners">
													Partner program and integrations
												</ListItem>
												<ListItem href="/self-hosted-paas" title="Self-Hosted">
													Self-hosted PaaS built for developers
												</ListItem>
												<ListItem href="/industries" title="Industries">
													Deployment solutions by industry
												</ListItem>
												<ListItem
													href="/industries/higher-education"
													title="Education"
												>
													How Dokploy supports universities and colleges
												</ListItem>
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link
												href="https://docs.dokploy.com/docs/core"
												target="_blank"
												onClick={() =>
													trackGAEvent({
														action: "Nav Link Clicked",
														category: "Navigation",
														label: "https://docs.dokploy.com/docs/core",
													})
												}
											>
												Docs
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link
												href="/jobs"
												onClick={() =>
													trackGAEvent({
														action: "Nav Link Clicked",
														category: "Navigation",
														label: "/jobs",
													})
												}
											>
												Careers
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[200px] gap-1 p-2">
												<ListItem href="/templates" title="Templates">
													Ready-to-deploy templates
												</ListItem>
												<ListItem href="/comparison" title="Dokploy vs.">
													Compare Dokploy to alternatives
												</ListItem>
												<ListItem href="/blog" title="Blog">
													Latest news and updates
												</ListItem>
												<ListItem href="/#faqs" title="FAQ">
													Frequently asked questions
												</ListItem>
												<ListItem href="/jobs" title="Jobs">
													See open positions at Dokploy
												</ListItem>
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					<div className="flex items-center gap-x-4 md:gap-x-5">
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full text-muted-foreground hover:text-foreground"
							asChild
						>
							<Link
								href="https://discord.gg/2tBnJ3jDJc"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Join Dokploy on Discord"
							>
								<svg
									aria-hidden="true"
									className="h-5 w-5 fill-current"
									viewBox="0 0 24 24"
								>
									<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
								</svg>
							</Link>
						</Button>
						<GithubStars className="max-md:hidden" />

						<Button
							variant="ghost"
							className="rounded-full max-md:hidden"
							asChild
						>
							<Link
								href="https://app.dokploy.com/"
								aria-label="Sign In Dokploy Cloud"
								target="_blank"
							>
								Sign In
							</Link>
						</Button>

						<Button
							variant="outline"
							className="rounded-full max-md:hidden"
							asChild
						>
							<Link
								href="/contact"
								onClick={() => {
									trackGAEvent({
										action: "Contact Button Clicked",
										category: "Contact",
										label: "Header",
									});
								}}
							>
								Contact
							</Link>
						</Button>

						<Button className="rounded-full max-md:hidden" asChild>
							<Link
								href="https://app.dokploy.com/register"
								aria-label="Sign Up Dokploy Cloud"
								target="_blank"
							>
								<div className="group relative mx-auto flex w-full max-w-fit flex-row items-center justify-center rounded-2xl text-sm font-medium">
									<span>Sign Up</span>
									<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
								</div>
							</Link>
						</Button>
						<div className="-mr-1 md:hidden">
							<MobileNavigation />
						</div>
					</div>
				</nav>
			</Container>
		</header>
	);
}
