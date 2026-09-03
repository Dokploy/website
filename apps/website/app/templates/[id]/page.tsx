import { Badge } from "@/components/ui/badge";
import {
	getRelatedTemplates,
	getTemplate,
	getTemplateFiles,
	getTemplateLogoUrl,
	getTemplates,
	templateToBase64,
} from "@/lib/templates";
import { ArrowLeft, BookOpen, Github, Globe } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplateCard } from "../components/TemplateCard";
import {
	EditorCopyButton,
	TrafficLights,
} from "../components/TemplateCodeBlock";
import { TemplateConfigTabs } from "../components/TemplateConfigTabs";
import { TemplateMarkdown } from "../components/TemplateMarkdown";

type Props = {
	params: { id: string };
};

// buttonVariants lives in a client module, so mirror its classes here
const buttonBaseClasses =
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all";
const primaryButtonClasses = `${buttonBaseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
const outlineButtonClasses = `${buttonBaseClasses} border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2`;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
	const templates = await getTemplates();
	return templates.map((template) => ({ id: template.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const template = await getTemplate(id);

	if (!template) {
		return { title: "Template Not Found" };
	}

	const title = `Deploy ${template.name} on Dokploy`;
	const description = `${template.description} Deploy ${template.name} on your own server with one click using Dokploy's open source template.`;
	const url = `https://dokploy.com/templates/${template.id}`;

	const ogUrl = new URL(
		"/api/og",
		process.env.NODE_ENV === "production"
			? "https://dokploy.com"
			: "http://localhost:3001",
	);
	ogUrl.searchParams.set("template", template.id);

	return {
		title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description,
			type: "website",
			url,
			images: [
				{
					url: ogUrl.toString(),
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogUrl.toString()],
		},
	};
}

export default async function TemplatePage({ params }: Props) {
	const { id } = await params;
	const [template, templates, files] = await Promise.all([
		getTemplate(id),
		getTemplates(),
		getTemplateFiles(id),
	]);

	if (!template) {
		notFound();
	}

	const relatedTemplates = getRelatedTemplates(template, templates);
	const base64 = templateToBase64(files.dockerCompose, files.templateToml);
	const logoUrl = getTemplateLogoUrl(template);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: template.name,
		description: template.description,
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Docker",
		url: `https://dokploy.com/templates/${template.id}`,
		image: logoUrl,
		softwareVersion: template.version,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
	};

	return (
		<div className="container mx-auto max-w-5xl px-4 py-12 mt-14">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<Link
				href="/templates"
				className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Templates
			</Link>

			<div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
				<div className="flex items-start gap-4">
					<img
						src={logoUrl}
						alt={`${template.name} logo`}
						width={64}
						height={64}
						className="h-16 w-16 shrink-0 rounded-xl border border-border object-contain p-1"
					/>
					<div>
						<div className="flex flex-wrap items-center gap-3">
							<h1 className="text-3xl font-bold">{template.name}</h1>
							<Badge variant="secondary">v{template.version}</Badge>
						</div>
						<p className="mt-2 max-w-2xl text-muted-foreground">
							{template.description}
						</p>
						<div className="mt-3 flex flex-wrap gap-1.5">
							{template.tags.map((tag) => (
								<Link
									key={tag}
									href={`/templates?tag=${encodeURIComponent(tag)}`}
									className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
								>
									{tag}
								</Link>
							))}
						</div>
					</div>
				</div>
				<a href="#deploy" className={`${primaryButtonClasses} h-11 px-8`}>
					Deploy on Dokploy
				</a>
			</div>

			<div className="mt-4 flex flex-wrap gap-3">
				{template.links.website && (
					<a
						href={template.links.website}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<Globe className="h-4 w-4" /> Website
					</a>
				)}
				{template.links.github && (
					<a
						href={template.links.github}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<Github className="h-4 w-4" /> GitHub
					</a>
				)}
				{template.links.docs && (
					<a
						href={template.links.docs}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<BookOpen className="h-4 w-4" /> Documentation
					</a>
				)}
			</div>

			<section id="deploy" className="mt-12 scroll-mt-24">
				<h2 className="text-2xl font-semibold">
					Deploy {template.name} on Dokploy
				</h2>
				<ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">
					<li>
						<a
							href="https://docs.dokploy.com/docs/core/installation"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-500/80"
						>
							Install Dokploy
						</a>{" "}
						on your server if you haven't already.
					</li>
					<li>
						In your Dokploy panel, open a project and click{" "}
						<strong>Create Service → Template</strong>.
					</li>
					<li>
						Search for <strong>{template.name}</strong> and click{" "}
						<strong>Create</strong> — Dokploy configures domains, environment
						variables, and volumes for you.
					</li>
				</ol>
				<p className="mt-4 text-muted-foreground">
					Alternatively, create a <strong>Compose</strong> service, go to{" "}
					<strong>Advanced → Import from Base64</strong>, and paste this
					payload:
				</p>
				<div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#17191E] shadow-lg">
					<div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2">
						<TrafficLights />
						<span className="font-mono text-xs text-zinc-500">base64</span>
						<div className="ml-auto">
							<EditorCopyButton text={base64} />
						</div>
					</div>
					<pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-xs text-zinc-500">
						{base64}
					</pre>
				</div>
			</section>

			<section className="mt-12">
				<h2 className="text-2xl font-semibold">Configuration</h2>
				<p className="mt-2 text-muted-foreground">
					The exact Docker Compose and template configuration this template
					deploys.
				</p>
				<TemplateConfigTabs
					dockerCompose={files.dockerCompose}
					templateToml={files.templateToml}
				/>
			</section>

			{files.instructions && (
				<section className="mt-12">
					<h2 className="text-2xl font-semibold">Instructions</h2>
					<div className="mt-4">
						<TemplateMarkdown content={files.instructions} />
					</div>
				</section>
			)}

			{relatedTemplates.length > 0 && (
				<section className="mt-12">
					<h2 className="text-2xl font-semibold">Related Templates</h2>
					<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{relatedTemplates.map((related) => (
							<TemplateCard key={related.id} template={related} />
						))}
					</div>
				</section>
			)}

			<section className="mt-12 flex flex-col items-start gap-3 rounded-lg border border-border bg-muted/30 p-6">
				<h2 className="text-xl font-semibold">
					Self-host {template.name} in minutes
				</h2>
				<p className="text-muted-foreground">
					Dokploy is a free, open source deployment platform. Deploy{" "}
					{template.name} and {templates.length - 1}+ other templates on your
					own infrastructure with a single click.
				</p>
				<div className="flex flex-wrap gap-3">
					<a
						href="https://docs.dokploy.com/docs/core/installation"
						target="_blank"
						rel="noopener noreferrer"
						className={`${primaryButtonClasses} h-10 px-4 py-2`}
					>
						Get Started
					</a>
					<Link href="/templates" className={outlineButtonClasses}>
						Browse All Templates
					</Link>
				</div>
			</section>
		</div>
	);
}
