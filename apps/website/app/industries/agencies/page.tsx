import {
	IndustryPage,
	type IndustryPageData,
} from "@/components/industries/IndustryPage";
import {
	Bot,
	Eye,
	FolderKanban,
	GitBranch,
	Globe,
	Paintbrush,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Deployment Agency Platform for Client Apps",
	description:
		"Run client apps, previews, and production releases from one deployment agency platform that supports Git, Docker, domains, logs, and databases.",
	alternates: {
		canonical: "https://dokploy.com/industries/agencies",
	},
};

const data: IndustryPageData = {
	hero: {
		title: "A deployment agency platform for faster client launches",
		description:
			"Launch client websites, SaaS products, internal tools, vibe-coded software, and campaign apps without rebuilding the deployment process every time. Dokploy gives agencies a repeatable release platform with previews, domains, logs, databases, and client-ready governance.",
	},
	features: {
		heading: "Ship client projects faster without messy hosting handoffs",
		description:
			"Agencies need a deployment model that works across clients, stacks, domains, and production requirements. Dokploy helps teams move from repo to live app with less manual setup and more visibility after launch.",
		items: [
			{
				icon: GitBranch,
				title: "Launch client projects from Git",
				description:
					"Connect GitHub, GitLab, Bitbucket, Gitea, generic Git, Docker, or Docker Compose. Teams can deploy new client apps without writing custom server instructions each time.",
			},
			{
				icon: FolderKanban,
				title: "Separate each client into projects",
				description:
					"Organize services by client, brand, product, or retainer. Clear project structures make it easier to manage access, environments, and ownership as your portfolio grows.",
			},
			{
				icon: Eye,
				title: "Preview work before client signoff",
				description:
					"Use preview deployments to show working application changes before they’re merged. Account teams and clients can review the app in context.",
			},
			{
				icon: Globe,
				title: "Manage domains and production releases",
				description:
					"Configure domains, environment variables, logs, and deployment history from one platform. Keep launch tasks close to the service, not spread across tools.",
			},
			{
				icon: Bot,
				title: "Enable AI workflows with the MCP",
				description:
					"Connect your AI agent to Dokploy with the MCP, so team members and clients can manage deployments with prompts, or even autonomously.",
			},
			{
				icon: Paintbrush,
				title: "Whitelabel for a single brand experience",
				description:
					"Enterprise whitelabeling can help agencies present a branded deployment experience, while giving clients more security.",
			},
		],
	},
	comparison: {
		heading: "Client deployments without a patchwork of hosting accounts",
		description:
			"Dokploy gives your software building and deployment agency a single operating model to build, review, launch, and support client apps.",
		without: {
			title: "Traditional agency deployment tools",
			items: [
				"Every client can use a different provider or server setup.",
				"Launch checklists depend on whoever configured the project.",
				"Preview links, logs, domains, and backups sit in different places.",
				"Support teams need to learn each client’s hosting account.",
				"Handoffs can create confusion over access and ownership.",
			],
		},
		withDokploy: {
			title: "Dokploy for agencies",
			items: [
				"One platform for client projects, environments, services, and servers.",
				"Git and Docker workflows support a wide range of project stacks.",
				"Preview deployments make sign-off easier before production release.",
				"Domains, logs, monitoring, backups, and rollbacks are managed close to the app.",
				"Enterprise options support SSO, custom roles, audit logs, and whitelabeling.",
			],
		},
	},
	workflow: {
		heading: "From client repository to production launch",
		description:
			"Dokploy helps agencies turn deployment into a repeatable client delivery process. New projects can follow the same workflow, even when the technology stack changes.",
		steps: [
			{
				title: "Create the client project",
				description:
					"Set up a project for the client, campaign, product, or retainer. Add environments for development, preview, staging, and production as needed.",
				flow: "Create project → Add environments → Invite team",
			},
			{
				title: "Connect the repository",
				description:
					"Connect the client app from Git or configure a Docker-based deployment. Dokploy can trigger releases from webhooks when changes are pushed.",
				flow: "Select provider → Choose repository → Set branch",
			},
			{
				title: "Share a preview",
				description:
					"Deploy a preview environment so account teams and clients can review the live app before release. Keep feedback tied to the version under review.",
				flow: "Open preview → Share URL → Collect signoff",
			},
			{
				title: "Launch and support",
				description:
					"Assign domains, deploy to production, and monitor logs and metrics after launch. Rollbacks and deployment history help support teams respond quickly.",
				flow: "Add domain → Deploy → Monitor",
			},
		],
	},
	builtFor: {
		heading: "Built for agencies managing many client apps",
		paragraphs: [
			"Dokploy gives agencies a cleaner way to manage multiple apps, clients, and release workflows.",
			"Teams can deploy from common Git providers, use Docker Compose for more advanced projects, and keep client services visible after the initial launch.",
			"For larger agencies, Enterprise features add SSO, custom roles, audit logs, and whitelabeling, making it easier to give internal teams and client stakeholders the right level of access without handing over raw server credentials.",
		],
		screenshotAlt:
			"Dokploy dashboard showing an agency project with web, API, database and worker services, and an environment selector with production and staging",
	},
	detailRows: [
		{
			area: "Deployment methods",
			support:
				"Git, Docker, Docker Compose, Nixpacks, Heroku Buildpacks, and custom Dockerfiles",
		},
		{
			area: "Client workflows",
			support:
				"Preview deployments, environments, templates, domains, and webhook-based auto deploys",
		},
		{
			area: "Access control",
			support: "Owner, Admin, and Member roles, with custom Enterprise roles",
		},
		{
			area: "Agency options",
			support:
				"Enterprise SSO, audit logs, whitelabeling, and client-friendly role management",
		},
		{
			area: "Databases",
			support: "PostgreSQL, MySQL, MongoDB, Redis, and MariaDB",
		},
		{
			area: "Operations",
			support:
				"Monitoring, logs, backups, rollbacks, remote servers, MCP, and multi-server management",
		},
	],
	faqs: {
		heading: "Deployment agency platform FAQs",
		items: [
			{
				question: "What is a deployment agency platform?",
				answer:
					"A deployment agency platform is software that helps agencies deploy, manage, and support client applications across multiple projects. Dokploy gives teams one place for apps, environments, domains, logs, databases, and deployments.",
			},
			{
				question: "Can Dokploy handle multiple client projects?",
				answer:
					"Yes. Agencies can organize projects around clients, products, campaigns, or retainers. Each service can have its own environment variables, domains, deployments, logs, monitoring, and backups where relevant.",
			},
			{
				question: "Can clients review apps before production?",
				answer:
					"Yes. Preview deployments help agencies share live versions of changes before they are merged or released. This makes signoff easier for websites, SaaS products, and custom apps.",
			},
			{
				question: "Does Dokploy support whitelabeling?",
				answer:
					"Dokploy Enterprise includes whitelabeling for self-hosted setups, along with SSO, custom roles, and audit logs.",
			},
			{
				question: "Can agencies deploy Docker Compose apps?",
				answer:
					"Yes. Dokploy supports Docker Compose for multi-service applications, which is useful when client projects include APIs, databases, workers, queues, or supporting services.",
			},
		],
	},
};

export default function AgenciesPage() {
	return <IndustryPage data={data} />;
}
