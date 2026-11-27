import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Activity,
	Bot,
	Boxes,
	Cpu,
	FileSearch,
	FlaskConical,
	KeyRound,
	MousePointerClick,
	Network,
	Rocket,
	ShieldCheck,
	SlidersHorizontal,
	Sparkles,
	Terminal,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Deploy AI Apps Securely with Dokploy",
	description:
		"Deploy AI-built apps with Dokploy. Connect AI agents via MCP, generate Compose stacks, analyze logs, and control access with Enterprise features.",
	alternates: {
		canonical: "https://dokploy.com/deploy-ai",
	},
	openGraph: {
		title: "Deploy AI Apps Securely with Dokploy",
		description:
			"Deploy AI-built apps with Dokploy. Connect AI agents via MCP, generate Compose stacks, analyze logs, and control access with Enterprise features.",
		images: "/og.png",
		type: "website",
	},
};

const inlineLinkClassName = "text-white hover:underline";

const coreFeatures = [
	{
		icon: Bot,
		title: "Connect AI agents directly to Dokploy",
		href: "https://docs.dokploy.com/docs/core/mcp",
		description:
			"AI agents can trigger deployments, check app status, and manage services through Dokploy's MCP server. They inherit the API key owner's permissions, so give each agent only the access it needs.",
	},
	{
		icon: Boxes,
		title: "Deploy any app, from any source",
		href: "/features/application-deployment-platform",
		description:
			"Deploy apps built with generative AI from Git, a Docker image, or Docker Compose. Once engineers configure infrastructure and permissions, approved team members can manage deployments.",
	},
	{
		icon: Activity,
		title: "Catch issues before they become problems",
		href: "/features/container-server-monitoring",
		description:
			"Monitor AI-built apps and inspect deployment logs. Configure rollbacks for supported releases, or connect an AI provider to help analyze errors.",
	},
	{
		icon: Sparkles,
		title: "Generate a stack with the AI assistant",
		href: "https://docs.dokploy.com/docs/core/ai",
		description:
			"Describe the service you need and Dokploy's AI assistant generates a Docker Compose configuration to review and edit before deployment. Connect your own AI model provider to start.",
	},
	{
		icon: FileSearch,
		title: "Let AI read the logs for you",
		href: "https://docs.dokploy.com/docs/core/ai#analyzing-deployment-and-runtime-logs",
		description:
			"Use AI-assisted log analysis to investigate deployment and runtime errors. Dokploy sends selected logs to your configured AI provider. Review what your services log before sharing it.",
	},
	{
		icon: Cpu,
		title: "Bring your own model",
		href: "https://docs.dokploy.com/docs/core/ai#managing-providers",
		description:
			"Connect OpenAI, Anthropic, Ollama, or another supported provider using your own key and model settings. Dokploy does not bundle an AI model or include API usage costs.",
	},
];

const sandboxFeatures = [
	{
		icon: Terminal,
		title: "Run code before deployment",
		description:
			"Execute AI-generated scripts, test dependencies, and inspect output in temporary Docker containers. Retrieve the files you need before the sandbox expires.",
	},
	{
		icon: SlidersHorizontal,
		title: "Control execution and access",
		description:
			"Set CPU and memory limits, inactivity timeouts, and network access. For stronger isolation when running untrusted code, configure gVisor on a separate execution server.",
	},
	{
		icon: Bot,
		title: "Connect agents with MCP",
		description:
			"AI agents can create sandboxes, execute commands, and manage files through MCP. When the application is ready for users, deploy it separately through Dokploy.",
	},
];

const guardrailFeatures = [
	{
		icon: Users,
		title: "Separate every team's environment",
		description:
			"Use organizations, projects, and environments to organize AI-built apps. Assign roles and permissions so teams only access or deploy the resources they are authorized to manage, without running a separate Dokploy instance for every team.",
	},
	{
		icon: MousePointerClick,
		title: "Let approved employees deploy apps",
		description:
			"Give approved team members a simple interface to manage applications once engineers have configured the servers, deployment settings, and permissions. Users can ship internal tools without needing a command line for every change.",
	},
	{
		icon: Network,
		title: "Control access to deployed apps",
		description:
			"With Dokploy Enterprise, protect supported application domains with SSO and Traefik forward authentication. Use an OIDC identity provider to control who can sign in, and assign custom domains to deployed apps.",
	},
	{
		icon: KeyRound,
		title: "Sign in with your existing identity provider",
		description:
			"Dokploy Enterprise supports SSO through Okta, Microsoft Entra ID, and Auth0. Configure SCIM provisioning to sync access as users join or leave.",
	},
];

const testFreelyPoints = [
	"Test AI-generated code in temporary sandboxes before deployment",
	"Keep sandbox networks apart from application networks",
	"Review deployment actions in Enterprise audit logs",
	"Configure rollbacks for supported app releases",
	"Test changes in previews before they go live",
];

const empowerTeamPoints = [
	"Let approved teams deploy apps from AI-generated code",
	"Have engineers configure infrastructure and permissions",
	"Assign app domains and access controls",
	"Use Enterprise SSO and roles to manage access",
	"Promote internal demos to production when ready",
];

export default function DeployAIPage() {
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
							Empower your employees to deploy AI
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Your teams are building with AI. Dokploy gives approved employees
							a simpler way to deploy AI-built apps on infrastructure your
							engineers configure, with access controls and monitoring in place.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link href="/contact" aria-label="Contact Dokploy sales">
									Contact sales
								</Link>
							</Button>
							<Button
								className="rounded-full bg-[#5965F2] hover:bg-[#4A55E0]"
								asChild
							>
								<Link
									href="https://docs.dokploy.com/docs/core"
									aria-label="View Dokploy documentation"
									className="text-white"
								>
									View documentation
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Everything you need to start deploying AI today */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Everything you need to start deploying AI today
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Take apps from AI coding tools to a live URL with Dokploy. Connect
							AI agents, deploy from Git or containers, test in a sandbox, and
							use an external AI model for Compose generation or log analysis.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{coreFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold">
									<Link href={feature.href} className={inlineLinkClassName}>
										{feature.title}
									</Link>
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Test AI-generated code in sandboxes */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Test AI-generated code in sandboxes
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Run AI-generated code and test dependencies in temporary Docker
							containers before you deploy an application. Use Dokploy Sandboxes
							alongside your deployment workflows to test without putting your
							main codebase at risk.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{sandboxFeatures.map((feature) => (
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
					<div className="mt-12 flex justify-center">
						<Button className="rounded-full" asChild>
							<Link href="/sandbox-software">Explore Dokploy Sandboxes</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Built for teams that need guardrails, not gatekeepers */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Built for teams that need guardrails, not gatekeepers
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							AI-generated code moves fast. Dokploy Enterprise adds{" "}
							<Link
								href="https://docs.dokploy.com/docs/core/enterprise/custom-roles"
								className={inlineLinkClassName}
							>
								custom roles
							</Link>
							, SSO, audit logs, and application authentication to help your
							organization control deployment access and operations.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{guardrailFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold text-white">
									{feature.title}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
					<div className="mt-12 flex justify-center">
						<Button className="rounded-full" asChild>
							<Link href="/enterprise">Discover Dokploy Enterprise</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Test freely. Ship confidently. */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Test freely. Ship confidently.
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Test code, manage deployment workflows, and give approved
							employees the tools to ship AI-built apps. Set permissions and
							review changes before applications reach production.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
								<FlaskConical className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Test with safeguards</h3>
							<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
								{testFreelyPoints.map((point) => (
									<li key={point} className="flex gap-3">
										<ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
								<Rocket className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Empower your team</h3>
							<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
								{empowerTeamPoints.map((point) => (
									<li key={point} className="flex gap-3">
										<ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>

			{/* OpenClaw */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
							<Sparkles className="h-7 w-7" />
						</div>
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Get started with OpenClaw in one click
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							OpenClaw is an open-source AI assistant for messaging and
							automation that you can self-host using a{" "}
							<Link href="/templates/openclaw" className={inlineLinkClassName}>
								Dokploy template
							</Link>
							. Configure the AI providers, credentials, and access settings for
							your use case. Requests to connected external AI models may leave
							your infrastructure.
						</p>
						<div className="mt-10">
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/templates/openclaw">
									View the OpenClaw template
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Dokploy Cloud CTA */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Unlock Your Deployment Potential with Dokploy Cloud
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy Cloud manages the deployment control plane while your apps
							run on connected servers. Deploy and manage Docker services
							through the dashboard, with Traefik routing and managed updates
							for the Dokploy instance.
						</p>
						<div className="mt-10">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
									rel="noopener noreferrer"
								>
									Create an account
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
