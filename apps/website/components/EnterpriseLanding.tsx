"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
	Check,
	Cloud,
	Headphones,
	Lock,
	Server,
	Shield,
	Users,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { ContactFormModal } from "./ContactFormModal";
import AnimatedGradientText from "./ui/animated-gradient-text";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { Button } from "./ui/button";

const features = [
	{
		icon: Lock,
		title: "SSO / SAML",
		description:
			"Seamless authentication with enterprise identity providers for secure, centralized access control.",
	},
	{
		icon: Shield,
		title: "Audit Logs",
		description:
			"Comprehensive tracking of all system activities for compliance, security, and accountability.",
	},
	{
		icon: Users,
		title: "Fine-Grained RBAC",
		description:
			"Granular role-based access controls to ensure the right people have the right permissions.",
	},
	{
		icon: Headphones,
		title: "Custom Support & SLAs",
		description:
			"Dedicated support team with guaranteed response times and service level agreements.",
	},
	{
		icon: Server,
		title: "Flexible Hosting",
		description:
			"Deploy on-premises for maximum security or in the cloud for scalability—your infrastructure, your choice.",
	},
];

const hostingOptions = [
	{
		icon: Server,
		title: "On-Premises Deployment",
		benefits: [
			"Complete data sovereignty",
			"Maximum security control",
			"Compliance with strict regulations",
			"No external dependencies",
		],
	},
	{
		icon: Cloud,
		title: "Cloud Deployment",
		benefits: [
			"Rapid scaling capabilities",
			"Reduced infrastructure overhead",
			"Global availability",
			"Managed infrastructure",
		],
	},
];

export function EnterpriseLanding() {
	const [contactOpen, setContactOpen] = useState(false);

	return (
		<div className="bg-black">
			<ContactFormModal open={contactOpen} onOpenChange={setContactOpen} />
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-background pt-20 pb-16 lg:pt-32">
				<div className="relative">
					<AnimatedGridPattern
						numSquares={30}
						maxOpacity={0.1}
						height={40}
						width={40}
						duration={3}
						repeatDelay={1}
						className={cn(
							"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
							"absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
						)}
					/>
					<Container className="relative z-10">
						<div className="text-center">
							<motion.div
								className="relative z-10 mb-6 inline-block"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<AnimatedGradientText>
									<span
										className={cn(
											"inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
										)}
									>
										Enterprise
									</span>
								</AnimatedGradientText>
							</motion.div>

							<motion.h1
								className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-muted-foreground sm:text-7xl"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								{"Enterprise-Grade "}
								<span className="relative whitespace-normal text-primary lg:whitespace-nowrap">
									<svg
										aria-hidden="true"
										viewBox="0 0 418 42"
										className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary"
										preserveAspectRatio="none"
									>
										<path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
									</svg>
									<span className="relative">Deployment, Your Way</span>
								</span>
							</motion.h1>

							<motion.p
								className="mx-auto mt-6 max-w-3xl text-lg tracking-tight text-muted-foreground"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.2 }}
							>
								Scale with confidence. Deploy on-premises or in the cloud with
								enterprise security, compliance, and support built for
								organizations that demand the best.
							</motion.p>

							<motion.div
								className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.4 }}
							>
								<Button className="rounded-full" onClick={() => setContactOpen(true)}>
									Contact sales
								</Button>
								<Button variant="outline" className="rounded-full" asChild>
									<Link href="https://docs.dokploy.com" target="_blank">
										View documentation
									</Link>
								</Button>
							</motion.div>
						</div>
					</Container>
				</div>
			</div>

			{/* Features Grid */}
			<section className="py-20">
				<Container>
					<div className="text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Built for Enterprise Teams
						</h2>
						<p className="mx-auto mt-4 mb-16 max-w-2xl text-muted-foreground">
							Everything you need to deploy, manage, and scale mission-critical
							applications with confidence and security.
						</p>
					</div>

					<div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="group rounded-2xl border border-border/30 bg-gradient-to-b from-gray-900/50 to-black p-8 transition hover:border-border/60"
							>
								<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 transition group-hover:bg-green-500/20">
									<feature.icon className="h-6 w-6 text-green-400" />
								</div>
								<h3 className="mb-3 text-xl font-semibold text-white">
									{feature.title}
								</h3>
								<p className="leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Hosting Flexibility Section */}
			<section className="py-20">
				<Container>
					<div className="mb-16 text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Deploy Anywhere, Without Compromise
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
							The flexibility to host Dokploy exactly where your business needs
							it—on your infrastructure or ours.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2">
						{hostingOptions.map((option) => (
							<div
								key={option.title}
								className="rounded-2xl border border-border/30 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 p-10"
							>
								<div className="mb-6 flex items-center gap-4">
									<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/10">
										<option.icon className="h-7 w-7 text-green-400" />
									</div>
									<h3 className="text-2xl font-semibold text-white">
										{option.title}
									</h3>
								</div>
								<ul className="space-y-4">
									{option.benefits.map((benefit) => (
										<li key={benefit} className="flex items-start gap-3">
											<Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
											<span className="text-gray-300">{benefit}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="mt-12 rounded-2xl border border-border/30 bg-gradient-to-r from-green-500/5 to-blue-500/5 p-8 text-center">
						<h3 className="mb-3 text-2xl font-semibold text-white">
							Hybrid Deployments
						</h3>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							Need the best of both worlds? Deploy Dokploy across multiple
							environments with centralized management and unified monitoring.
						</p>
					</div>
				</Container>
			</section>

			{/* CTA Section */}
			<section className="py-20">
				<Container>
					<div className="rounded-3xl border border-border/30 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 p-12 text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Ready to Scale Enterprise?
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
							Talk to our team about your deployment needs and discover how
							Dokploy Enterprise can transform your infrastructure.
						</p>
						<Button className="mt-8 rounded-full" onClick={() => setContactOpen(true)}>
							Schedule a call with sales
						</Button>
						<p className="mt-6 text-sm text-gray-500">
							Questions? Email us at{" "}
							<a
								href="mailto:sales@dokploy.com"
								className="text-green-400 hover:underline"
							>
								sales@dokploy.com
							</a>
						</p>
					</div>
				</Container>
			</section>
		</div>
	);
}
