"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Popover, Transition } from "@headlessui/react";
import { ChevronRight, HeartIcon } from "lucide-react";
import { Fragment, type JSX, type SVGProps } from "react";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { trackGAEvent } from "./analitycs";
import { Logo } from "./shared/Logo";
import AnimatedGradientText from "./ui/animated-gradient-text";
import { Button, buttonVariants } from "./ui/button";
import GithubStars from "./GithubStars";

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

const I18nIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="currentColor"
		stroke="currentColor"
		strokeWidth={0}
		viewBox="0 0 512 512"
		{...props}
	>
		<path
			stroke="none"
			d="m478.33 433.6-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362 368 281.65 401.17 362zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z"
		/>
	</svg>
);

function MobileNavigation() {
	return (
		<Popover>
			<Popover.Button
				className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
				aria-label="Toggle Navigation"
			>
				{({ open }) => <MobileNavIcon open={open} />}
			</Popover.Button>
			<Transition.Root>
				<Transition.Child
					as={Fragment as any}
					enter="duration-150 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Popover.Overlay className="fixed inset-0 bg-background/50" />
				</Transition.Child>

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
						className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl border border-border bg-background p-4 text-lg tracking-tight  text-primary shadow-xl ring-1 ring-border/5"
					>
						<MobileNavLink href="/#pricing">Pricing</MobileNavLink>
						<MobileNavLink href="/#faqs">FAQ</MobileNavLink>
						<MobileNavLink
							href="https://docs.dokploy.com/docs/core"
							target="_blank"
						>
							Docs
						</MobileNavLink>
						<MobileNavLink href="/blog">Blog</MobileNavLink>
						<MobileNavLink href="/contact">Contact</MobileNavLink>
						<MobileNavLink
							href="https://docs.dokploy.com/docs/core"
							target="_blank"
						>
							<Button className=" w-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Sign In Dokploy Cloud"
									target="_blank"
								>
									<div className="group flex-row relative mx-auto flex max-w-fit items-center justify-center rounded-2xl text-sm font-medium w-full">
										<span>Sign In</span>
										<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
									</div>
								</Link>
							</Button>
						</MobileNavLink>
					</Popover.Panel>
				</Transition.Child>
			</Transition.Root>
		</Popover>
	);
}

export function Header() {
	return (
		<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 py-5">
			<Container>
				<nav className="relative z-50 flex justify-between">
					<div className="flex items-center md:gap-x-12">
						<Link href="/" aria-label="Home">
							<Logo className="h-10 w-auto" />
						</Link>
						<div className="hidden md:flex md:gap-x-6">
							<NavLink href="/#pricing">Pricing</NavLink>
							<NavLink href="/#faqs">FAQ</NavLink>
							<NavLink
								href="https://docs.dokploy.com/docs/core"
								target="_blank"
							>
								Docs
							</NavLink>
							<NavLink href="/blog">Blog</NavLink>
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
								className="h-5 w-5 fill-muted-foreground group-hover:fill-muted-foreground/70 hover:fill-muted-foreground/80"
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

						{/* <Link
							className={buttonVariants({
								variant: "outline",
								className: " flex items-center gap-2 !rounded-full",
							})}
							href="https://opencollective.com/dokploy"
							target="_blank"
						>
							<span className="text-sm font-semibold">
								{t("navigation.support")}{" "}
							</span>
							<HeartIcon className="animate-heartbeat size-4 fill-red-600 text-red-500 " />
						</Link> */}

						<Button className="rounded-full max-md:hidden" asChild>
							<Link
								href="https://app.dokploy.com/register"
								aria-label="Sign In Dokploy Cloud"
								target="_blank"
							>
								<div className="group flex-row relative mx-auto flex max-w-fit items-center justify-center rounded-2xl text-sm font-medium w-full">
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
