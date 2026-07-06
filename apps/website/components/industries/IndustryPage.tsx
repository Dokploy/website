import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface IndustryFeature {
	icon: LucideIcon;
	title: string;
	description: string;
}

export interface IndustryStep {
	title: string;
	description: string;
	flow: string;
}

export interface IndustryPageData {
	hero: {
		title: string;
		description: string;
	};
	features: {
		heading: string;
		description: string;
		items: IndustryFeature[];
	};
	comparison: {
		heading: string;
		description: string;
		without: { title: string; items: string[] };
		withDokploy: { title: string; items: string[] };
	};
	workflow: {
		heading: string;
		description: string;
		steps: IndustryStep[];
	};
	builtFor: {
		heading: string;
		paragraphs: string[];
		screenshotAlt: string;
	};
	detailRows: { area: string; support: string }[];
	faqs: {
		heading: string;
		items: { question: string; answer: string }[];
	};
}

export function IndustryPage({ data }: { data: IndustryPageData }) {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative overflow-hidden border-b border-border/30 bg-black py-20 sm:py-32">
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.1}
					height={40}
					width={40}
					duration={3}
					repeatDelay={1}
					className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
				/>
				<Container className="relative z-10">
					<div className="mx-auto max-w-4xl text-center">
						<h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
							{data.hero.title}
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							{data.hero.description}
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
									rel="noopener noreferrer"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Contact Sales</Link>
							</Button>
						</div>
						<p className="mt-6 text-sm text-muted-foreground">
							Deploy with one line of code
						</p>
					</div>
				</Container>
			</section>

			{/* Core features */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							{data.features.heading}
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							{data.features.description}
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{data.features.items.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold">{feature.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Comparison */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							{data.comparison.heading}
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							{data.comparison.description}
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-8">
							<h3 className="text-xl font-semibold text-white">
								{data.comparison.without.title}
							</h3>
							<ul className="mt-6 space-y-4">
								{data.comparison.without.items.map((item) => (
									<li key={item} className="flex items-start gap-3">
										<AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
										<span className="text-sm text-muted-foreground">
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-primary/40 bg-card p-8">
							<h3 className="text-xl font-semibold text-primary">
								{data.comparison.withDokploy.title}
							</h3>
							<ul className="mt-6 space-y-4">
								{data.comparison.withDokploy.items.map((item) => (
									<li key={item} className="flex items-start gap-3">
										<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
										<span className="text-sm text-muted-foreground">
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>

			{/* Workflow steps */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							{data.workflow.heading}
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							{data.workflow.description}
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{data.workflow.steps.map((step, index) => (
							<div
								key={step.title}
								className="flex flex-col rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-lg font-semibold text-primary">
									{index + 1}
								</div>
								<h3 className="text-lg font-semibold">{step.title}</h3>
								<p className="mt-3 flex-1 text-sm text-muted-foreground">
									{step.description}
								</p>
								<p className="mt-4 font-mono text-xs text-primary">
									{step.flow}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Built for + screenshot */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-center">
						<div className="flex-1">
							<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
								{data.builtFor.heading}
							</h2>
							{data.builtFor.paragraphs.map((paragraph) => (
								<p key={paragraph} className="mt-5 text-muted-foreground">
									{paragraph}
								</p>
							))}
						</div>
						<div className="flex-1">
							<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
								<Image
									src="/images/dokploy-projects-dashboard.png"
									alt={data.builtFor.screenshotAlt}
									fill
									className="object-cover object-top"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Platform details */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Platform details at a glance
						</h2>
					</div>
					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Area</th>
									<th className="px-4 py-4 text-left font-semibold">
										What Dokploy supports
									</th>
								</tr>
							</thead>
							<tbody>
								{data.detailRows.map((row) => (
									<tr key={row.area} className="border-b border-border/50">
										<td className="px-4 py-3 font-medium">{row.area}</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.support}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* FAQs */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							{data.faqs.heading}
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						className="mx-auto mt-12 w-full max-w-3xl"
					>
						{data.faqs.items.map((faq, index) => (
							<AccordionItem value={`faq-${index}`} key={faq.question}>
								<AccordionTrigger className="text-left text-white">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>
									<p>{faq.answer}</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Container>
			</section>

			{/* Final CTA */}
			<CallToAction />
		</div>
	);
}
