"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { ContactFormModal } from "./ContactFormModal";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { PricingFeatureTable } from "./pricing/PricingFeatureTable";

const CLOUD_APP_URL = "https://app.dokploy.com";

function SwirlyDoodle(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 281 40"
			preserveAspectRatio="none"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
			/>
		</svg>
	);
}

const hobbyFeatures = [
	"Unlimited Deployments",
	"Unlimited Databases",
	"Unlimited Applications",
	"1 Server Included",
	"1 Organization",
	"1 User",
	"2 Environments",
	"1 Volume Backup per Application",
	"1 Backup per Database",
	"1 Scheduled Job per Application",
	"Community Support (Discord)",
];

const startupFeatures = [
	"All the features of Hobby, plus…",
	"3 Servers Included",
	"3 Organizations",
	"Unlimited Users",
	"Unlimited Environments",
	"Unlimited Volume Backups",
	"Unlimited Database Backups",
	"Unlimited Scheduled Jobs",
	"Basic RBAC (Admin, Developer)",
	"2FA",
	"Email and Chat Support",
];

const enterpriseFeatures = [
	"All the features of Startup, plus…",
	"Up to Unlimited Servers",
	"Up to Unlimited Organizations",
	"Fine-grained RBAC",
	"Complete Hosting Flexibility",
	"SSO / SAML (Azure, OKTA, etc)",
	"Audit Logs",
	"MSA/SLA",
	"White Labeling",
	"Priority Support and Services",
];

export function Pricing() {
	const [isAnnual, setIsAnnual] = useState(false);
	const [hostingType, setHostingType] = useState<"cloud" | "self-hosted">(
		"cloud",
	);
	const [openContactModal, setOpenContactModal] = useState(false);
	const [openPartnerModal, setOpenPartnerModal] = useState(false);

	const hobbyMonthlyPrice = 4.5;
	const hobbyAnnualPrice = hobbyMonthlyPrice * 12 * 0.8; // 20% discount
	const startupBaseMonthly = 15;
	const startupBaseAnnual = startupBaseMonthly * 12 * 0.8;

	return (
		<section
			id="pricing"
			aria-label="Pricing"
			className="border-t border-border/30 bg-black py-20 sm:py-32"
		>
			<div className="absolute inset-0 pointer-events-none">
				<svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
					<mask id="b" x="0" y="0" width="2000" height="1000">
						<path fill="url(#a)" d="M0 0h2000v1000H0z" />
					</mask>
					<path d="M0 0h2000v1000H0z" />
					<g stroke="#22222233" strokeWidth=".4" fill="none" mask="url(#b)">
						<path d="M0 0h50v50H0z" />
					</g>
					<defs>
						<radialGradient id="a">
							<stop offset="50%" stopColor="#fff" stopOpacity="0" />
							<stop offset="1" stopColor="#fff" stopOpacity="1" />
						</radialGradient>
					</defs>
				</svg>
			</div>
			<Container className="relative">
				<div className="text-center">
					<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
						<span className="relative whitespace-nowrap">
							<SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-muted-foreground" />
							<span className="relative">Simple Affordable</span>
						</span>{" "}
						Pricing.
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Infrastructure, we take care of it for you.
					</p>
				</div>

				{/* Billing toggle */}
				<div className="mx-auto mt-10 flex flex-col items-center gap-6">
					<Tabs
						defaultValue="monthly"
						value={isAnnual ? "annual" : "monthly"}
						onValueChange={(v) => setIsAnnual(v === "annual")}
					>
						<TabsList className=" w-full ">
							<TabsTrigger value="annual">
								Yearly (20% discount)
							</TabsTrigger>
							<TabsTrigger value="monthly">Monthly</TabsTrigger>
						</TabsList>
					</Tabs>

					{/* Cloud vs Self-Hosted */}
					<Tabs
						defaultValue="cloud"
						value={hostingType}
						onValueChange={(v) =>
							setHostingType(v as "cloud" | "self-hosted")
						}
					>
						<TabsList>
							<TabsTrigger value="cloud">Cloud</TabsTrigger>
							<TabsTrigger value="self-hosted">Self-Hosted</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{hostingType === "cloud" && (
					<div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8">
						{/* Hobby, Startup, Enterprise - 3 column grid */}
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{/* Hobby */}
						<section
							className={clsx(
								"flex flex-col rounded-3xl border-2 border-dashed border-border/50 bg-black/50 px-6 py-8",
							)}
						>
							<h3 className="text-lg font-medium text-white">Hobby</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								Everything an individual developer needs
							</p>
							<div className="mt-4">
								<span className="text-2xl font-semibold text-primary">
									$
									{isAnnual
										? hobbyAnnualPrice.toFixed(2)
										: hobbyMonthlyPrice.toFixed(2)}
									/mo
								</span>
								{isAnnual && (
									<span className="ml-2 text-sm text-muted-foreground">
										per server
									</span>
								)}
								{!isAnnual && (
									<span className="ml-2 text-sm text-muted-foreground">
										per server (add as many servers as you&apos;d like for $4.50/mo)
									</span>
								)}
							</div>
							<ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
								{hobbyFeatures.map((f) => (
									<li key={f} className="flex gap-2">
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
										{f}
									</li>
								))}
							</ul>
							<div className="mt-auto pt-6">
								<Link
									href={`${CLOUD_APP_URL}/register`}
									target="_blank"
									className={buttonVariants({
										variant: "default",
										className: "w-full",
									})}
								>
									Get Started
								</Link>
							</div>
						</section>

						{/* Startup */}
						<section
							className={clsx(
								"relative flex flex-col rounded-3xl border-2 border-primary/50 bg-black/80 px-6 py-8",
							)}
						>
							<Badge className="absolute -top-2.5 left-6">
								Recommended
							</Badge>
							<h3 className="text-lg font-medium text-white">Startup</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								Perfect for small to mid-size teams
							</p>
							<div className="mt-4">
								<span className="text-2xl font-semibold text-primary">
									Starting @ $
									{isAnnual
										? (startupBaseAnnual / 12).toFixed(2)
										: startupBaseMonthly.toFixed(0)}
									/mo
								</span>
								<p className="mt-1 text-xs text-muted-foreground">
									Add more servers as you&apos;d like for $4.50/mo
								</p>
							</div>
							<ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
								{startupFeatures.map((f) => (
									<li key={f} className="flex gap-2">
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
										{f}
									</li>
								))}
							</ul>
							<div className="mt-auto pt-6">
								<Link
									href={`${CLOUD_APP_URL}/register`}
									target="_blank"
									className={buttonVariants({
										variant: "default",
										className: "w-full",
									})}
								>
									Get Started
								</Link>
							</div>
						</section>

						{/* Enterprise */}
						<section
							className={clsx(
								"flex flex-col rounded-3xl border-2 border-dashed border-border/50 bg-black/50 px-6 py-8",
							)}
						>
							<h3 className="text-lg font-medium text-white">Enterprise</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								For large organizations who want more control
							</p>
							<div className="mt-4">
								<span className="text-xl font-semibold text-primary">
									Contact Sales
								</span>
							</div>
							<ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
								{enterpriseFeatures.map((f) => (
									<li key={f} className="flex gap-2">
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
										{f}
									</li>
								))}
							</ul>
							<div className="mt-auto pt-6">
								<Button
									onClick={() => setOpenContactModal(true)}
									className="w-full"
								>
									Contact Sales
								</Button>
							</div>
						</section>
						</div>

						{/* Agency - below the 3 main plans */}
						<section
							className={clsx(
								"flex flex-col rounded-3xl border-2 border-dashed border-border/50 bg-black/50 px-6 py-8",
							)}
						>
							<h3 className="text-lg font-medium text-white">Agency</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								Our Agency plan is uniquely tailored to the needs of agencies.
								Please contact us below to learn more about this option, as well
								as about becoming a certified Dokploy partner.{" "}
								<Link
									href="/partners"
									className="text-primary hover:underline"
								>
									Learn more here
								</Link>
							</p>
							<div className="mt-6">
								<Button
									onClick={() => setOpenPartnerModal(true)}
									className="w-full sm:w-auto"
									variant="outline"
								>
									Contact The Partner Team
								</Button>
							</div>
						</section>
					</div>
				)}

				{hostingType === "self-hosted" && (
					<div className="mx-auto mt-12 flex max-w-lg flex-col items-center rounded-3xl border-2 border-dashed border-border/50 bg-black/50 px-8 py-12 text-center">
						<h3 className="text-xl font-medium text-white">
							Dokploy Open Source
						</h3>
						<p className="mt-2 text-muted-foreground">
							Install and manage Dokploy UI on your own server. Free forever,
							unlimited servers.
						</p>
						<Link
							href="https://docs.dokploy.com/docs/core/installation#docker"
							target="_blank"
							className={buttonVariants({
								variant: "default",
								className: "mt-6",
							})}
						>
							Get Started
						</Link>
					</div>
				)}

				{/* Feature breakdown */}
				{hostingType === "cloud" && (
					<div className="mx-auto mt-24 max-w-6xl">
						<h3 className="text-center text-2xl font-semibold text-white">
							Feature breakdown by plan
						</h3>
						<div className="mt-8">
							<PricingFeatureTable />
						</div>
					</div>
				)}
			</Container>

			<ContactFormModal
				open={openContactModal}
				onOpenChange={setOpenContactModal}
				defaultInquiryType="sales"
			/>
			<ContactFormModal
				open={openPartnerModal}
				onOpenChange={setOpenPartnerModal}
				defaultInquiryType="sales"
			/>
		</section>
	);
}
