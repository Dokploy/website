"use client";

import { cn } from "@/lib/utils";
import { Popover, Transition } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, type JSX, type SVGProps } from "react";
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
					{open && createPortal(
						<div className="fixed inset-0 z-40 bg-background/50" onClick={() => close()} />,
						document.body
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
								<MobileNavLink href="/features/application-deployment-platform">Application Deployment</MobileNavLink>
								<MobileNavLink href="/features/database-management-tool">Databases</MobileNavLink>
								<MobileNavLink href="/features/application-management-software">Application Management</MobileNavLink>
								<hr className="m-2 border-border" />
								<MobileNavLink href="/pricing">Pricing</MobileNavLink>
								<hr className="m-2 border-border" />
								<p className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
									Solutions
								</p>
								<MobileNavLink href="/enterprise">Enterprise</MobileNavLink>
								<MobileNavLink href="/partners">Partners</MobileNavLink>
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
								<MobileNavLink href="https://templates.dokploy.com" target="_blank">Templates</MobileNavLink>
								<MobileNavLink href="/comparison">Dokploy vs.</MobileNavLink>
								<MobileNavLink href="/blog">Blog</MobileNavLink>
								<MobileNavLink href="/#faqs">FAQ</MobileNavLink>
								<hr className="m-2 border-border" />
								<MobileNavLink href="/contact">Contact</MobileNavLink>
								<MobileNavLink
									href="https://app.dokploy.com/register"
									target="_blank"
								>
									<Button className="w-full" asChild>
										<div className="group relative mx-auto flex w-full max-w-fit flex-row items-center justify-center rounded-2xl text-sm font-medium">
											<span>Sign In</span>
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
												<ListItem href="/features/application-deployment-platform" title="Application Deployment">
													Deploy and manage applications with ease
												</ListItem>
												<ListItem href="/features/database-management-tool" title="Databases">
													Manage your databases effortlessly
												</ListItem>
												<ListItem href="/features/application-management-software" title="Application Management">
													Monitor and control your applications
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
										<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[200px] gap-1 p-2">
												<ListItem href="https://templates.dokploy.com" target="_blank" title="Templates">
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
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					<div className="flex items-center gap-x-4 md:gap-x-5">
						<GithubStars className="max-md:hidden" />

						<Link href="https://x.com/getdokploy" target="_blank">
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0"
								viewBox="0 0 512 512"
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 fill-muted-foreground hover:fill-muted-foreground/80 group-hover:fill-muted-foreground/70"
							>
								<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
							</svg>
						</Link>

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
								aria-label="Sign In Dokploy Cloud"
								target="_blank"
							>
								<div className="group relative mx-auto flex w-full max-w-fit flex-row items-center justify-center rounded-2xl text-sm font-medium">
									<span>Sign In</span>
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
