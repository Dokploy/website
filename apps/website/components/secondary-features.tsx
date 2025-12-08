"use client";

import { Tab } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const features = [
	{
		title: "Applications & Databases",
		description:
			"Centralize control of your applications and databases for enhanced security and efficiency, simplifying access and management across your infrastructure.",
		image: "/dashboard.png",
	},
	{
		title: "Docker Compose",
		description:
			"Native Docker Compose support so you can manage complex applications and services with ease.",
		image: "/compose.png",
	},
	{
		title: "Multiserver",
		description:
			"Deploy applications to multiple servers without the extra effort.",
		image: "/remote.png",
	},
	{
		title: "Logs",
		description:
			"Monitor and manage your applications' logs with ease, ensuring efficient troubleshooting and optimal performance.",
		image: "/logs.png",
	},
	{
		title: "Monitoring",
		description:
			"Monitor your systems' performance and health in real time, ensuring continuous and uninterrupted operation.",
		image: "/primary/monitoring.png",
	},
	{
		title: "Backups",
		description:
			"Implement automatic and secure backup solutions to protect your critical data and restore it quickly when necessary.",
		image: "/backups.png",
	},
	{
		title: "Traefik",
		description:
			"Manage Traefik via File Editor to configure your own domain names, certificates, and more.",
		image: "/traefik.png",
	},
	{
		title: "Templates",
		description: "Deploy open source templates with one click.",
		image: "/templates.png",
	},
];

export function SecondaryFeaturesSections() {
	const [tabOrientation, setTabOrientation] = useState<
		"horizontal" | "vertical"
	>("horizontal");

	useEffect(() => {
		const lgMediaQuery = window.matchMedia("(min-width: 1024px)");

		function onMediaQueryChange({ matches }: { matches: boolean }) {
			setTabOrientation(matches ? "vertical" : "horizontal");
		}

		onMediaQueryChange(lgMediaQuery);
		lgMediaQuery.addEventListener("change", onMediaQueryChange);

		return () => {
			lgMediaQuery.removeEventListener("change", onMediaQueryChange);
		};
	}, []);

	const [isMounted, setIsMounted] = useState(false);

	// Cambiar isMounted a true después del primer render
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<section
			id="features"
			aria-label="Features for running your books"
			className="relative overflow-hidden bg-black pb-28 pt-20 sm:py-32"
		>
			<div className="relative mx-auto max-w-7xl max-lg:px-4">
				<div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
					<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
						Comprehensive Control of Your Digital Ecosystem
					</h2>
					<p className="mt-6 text-lg tracking-tight text-muted-foreground">
						Simplify your project and data management, ensure robust monitoring,
						and secure your backups—all without the fuss over minute details.
					</p>
				</div>
				<Tab.Group
					as="div"
					className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20"
					vertical={false}
				>
					{({ selectedIndex }) => (
						<>
							<div className="-mx-4 flex overflow-visible overflow-x-auto pb-4 sm:mx-0 sm:pb-0">
								<Tab.List
									aria-description="primary feature tabs"
									aria-roledescription="primary feature tabs"
									className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 "
								>
									{features.map((feature, featureIndex) => (
										<motion.div
											layout
											initial={false}
											key={`feature-${featureIndex}`}
											className={cn(
												"group relative rounded-full px-4 py-1 transition-colors ",
											)}
										>
											<AnimatePresence>
												{selectedIndex === featureIndex && (
													<motion.span
														layoutId="tab"
														className="absolute inset-0 z-10 rounded-full bg-white/5 mix-blend-difference"
														initial={{ opacity: 1 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														transition={{
															type: "spring",
															bounce: 0.2,
															duration: 0.5,
														}}
													/>
												)}
											</AnimatePresence>
											<h3>
												<Tab
													className={cn(
														"font-display text-lg text-primary ui-not-focus-visible:outline-none",
													)}
												>
													<span className="absolute inset-0 rounded-full" />
													{feature.title}
												</Tab>
											</h3>
											<p
												className={cn(
													"mt-2 hidden text-sm text-muted-foreground ",
												)}
											>
												{feature.description}
											</p>
										</motion.div>
									))}
								</Tab.List>
							</div>
							<Tab.Panels className="">
								{features.map((feature, index) => (
									<Tab.Panel key={`panel-${index}`}>
										<div className="relative sm:px-6 ">
											<div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-card/60 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
											<p className="relative mx-auto mb-10 max-w-2xl text-base text-white sm:text-center">
												{feature.description}
											</p>
										</div>

										<motion.div
											key={feature.title}
											initial={isMounted ? { opacity: 0.4 } : {}}
											animate={isMounted ? { opacity: 1 } : {}}
											exit={{ opacity: 0, x: -50 }}
											transition={{
												type: "spring",
												bounce: 0.2,
												duration: 0.8,
											}}
											className="mt-10 h-[24rem] w-[45rem] overflow-hidden rounded-xl border shadow-xl sm:w-auto  lg:mt-0 lg:h-[40rem] "
										>
											<div className="relative w-full">
												<div className="mx-auto">
													<div className="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg bg-card px-3">
														<span className="h-3 w-3 rounded-full bg-red-400" />
														<span className="h-3 w-3 rounded-full bg-yellow-400" />
														<span className="h-3 w-3 rounded-full bg-green-400" />
													</div>
													<div className="h-96 w-full bg-gray-100">
														<img src={feature.image} alt={feature.title} />
													</div>
												</div>
											</div>
										</motion.div>
									</Tab.Panel>
								))}
							</Tab.Panels>
						</>
					)}
				</Tab.Group>
			</div>
		</section>
	);
}
