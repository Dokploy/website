import {
	IndustryPage,
	type IndustryPageData,
} from "@/components/industries/IndustryPage";
import {
	Activity,
	Boxes,
	Factory,
	GitBranch,
	History,
	Workflow,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Manufacturing Technology Deployment Software",
	description:
		"Use manufacturing technology deployment software to release plant-floor apps, integrations, and internal tools in controlled environments.",
	alternates: {
		canonical: "https://dokploy.com/industries/manufacturing",
	},
};

const data: IndustryPageData = {
	hero: {
		title: "Manufacturing technology deployment that keeps plants moving",
		description:
			"Deploy plant-floor apps, integration services, dashboards, and internal tools without relying on unmanaged servers or manual release steps. Dokploy gives manufacturing technology teams a repeatable platform for controlled deployments.",
	},
	features: {
		heading: "Release operational software without disrupting production teams",
		description:
			"Manufacturing software supports people, equipment, logistics, and production workflows. Ship changes through a controlled deployment layer with clear environments, monitoring, logs, and rollback options.",
		items: [
			{
				icon: Factory,
				title: "Deploy factory apps without server handoffs",
				description:
					"Run dashboards, internal tools, APIs, and service interfaces from a platform your team can manage.",
			},
			{
				icon: Boxes,
				title: "Isolate plant, line, and region environments",
				description:
					"Create projects and environments around sites, regions, product lines, or operational systems.",
			},
			{
				icon: GitBranch,
				title: "Connect Git and Docker workflows",
				description:
					"Dokploy supports Git providers, Docker, Docker Compose, Nixpacks, Buildpacks, and custom Dockerfiles.",
			},
			{
				icon: Workflow,
				title: "Support integrations and internal APIs",
				description:
					"Deploy background services, internal APIs, and multi-container systems with Docker Compose, useful for applications that connect operational systems.",
			},
			{
				icon: Activity,
				title: "Monitor workloads across sites",
				description:
					"Track logs, deployments, server metrics, and application health. Platform teams can support plant software without manually checking every host.",
			},
			{
				icon: History,
				title: "Roll back failed releases quickly",
				description:
					"Use rollback and deployment history when a release affects an internal tool or operational workflow. Teams can recover faster while they investigate the issue.",
			},
		],
	},
	comparison: {
		heading: "Modern plant software without unmanaged servers",
		description:
			"Manufacturing teams often run critical internal software on local servers, one-off scripts, and legacy handoff processes. Dokploy creates a more consistent deployment model without forcing teams into a heavy platform build.",
		without: {
			title: "Manual plant deployments",
			items: [
				"Apps may depend on local server knowledge or individual operators.",
				"Release steps can differ by site, team, or vendor.",
				"Logs, domains, backups, and rollbacks may be handled manually.",
				"Developers may need server access to ship basic changes.",
				"Production support becomes harder as internal tools multiply.",
			],
		},
		withDokploy: {
			title: "Dokploy for manufacturing",
			items: [
				"Applications deploy through a controlled platform with familiar workflows.",
				"Projects and environments can map to sites, teams, or production systems.",
				"Git, Docker, Docker Compose, and database services are supported.",
				"Monitoring, logs, backups, and rollback options support day-to-day operations.",
				"Remote servers and multi-server management help teams grow across locations.",
			],
		},
	},
	workflow: {
		heading: "From manufacturing app repository to site-ready release",
		description:
			"Dokploy helps manufacturing technology teams make releases more repeatable. The same workflow can support a plant dashboard, integration service, internal API, or operations tool.",
		steps: [
			{
				title: "Create the site environment",
				description:
					"Set up a project for a plant, operational system, integration service, or regional team. Add development, staging, and production environments as needed.",
				flow: "Create project → Add environment → Assign team",
			},
			{
				title: "Connect the application",
				description:
					"Connect a Git repository, Docker image, Docker Compose file, or supported build method. Dokploy can automate deployment when approved changes are pushed.",
				flow: "Select provider → Choose service → Configure build",
			},
			{
				title: "Deploy safely",
				description:
					"Release the app to a controlled environment before production. Teams can review logs, variables, domains, and service settings before promotion.",
				flow: "Deploy staging → Validate → Promote",
			},
			{
				title: "Monitor and recover",
				description:
					"Watch logs and metrics after deployment, then use rollback options if a release affects an operational workflow. Keep the deployment record tied to the service.",
				flow: "Monitor → Alert team → Roll back if needed",
			},
		],
	},
	builtFor: {
		heading: "Built for plant-floor tools and industrial platforms",
		paragraphs: [
			"Dokploy gives manufacturing technology teams a way to standardize application deployment without removing flexibility.",
			"Teams can run single-service apps, Docker Compose stacks, databases, and internal APIs through the same platform.",
			"Remote servers and multi-server management help teams support workloads across sites or infrastructure zones.",
			"Self-hosted and cloud deployment options let organizations choose a model that fits their operational and IT requirements.",
		],
		screenshotAlt:
			"Dokploy dashboard for a manufacturing operations project with environments for plant-a-staging, plant-a-production, and regional-demo, plus logs, monitoring, domains, and server status",
	},
	detailRows: [
		{
			area: "Deployment methods",
			support:
				"Git, Docker, Docker Compose, Nixpacks, Heroku Buildpacks, and custom Dockerfiles",
		},
		{
			area: "Industrial workflows",
			support:
				"Site environments, preview releases, webhook deploys, scheduled jobs, and service templates",
		},
		{
			area: "Access control",
			support: "Owner, Admin, and Member roles, with custom Enterprise roles",
		},
		{
			area: "Infrastructure options",
			support:
				"Self-hosted Dokploy, Dokploy Cloud, remote servers, and multi-server management",
		},
		{
			area: "Databases",
			support: "PostgreSQL, MySQL, MongoDB, Redis, and MariaDB",
		},
		{
			area: "Operations",
			support:
				"Monitoring, logs, backups, rollbacks, domains, MCP, and deployment history",
		},
	],
	faqs: {
		heading: "Manufacturing technology deployment FAQs",
		items: [
			{
				question: "What is manufacturing technology deployment?",
				answer:
					"Manufacturing technology deployment is the process of releasing plant-floor apps, integration services, dashboards, internal tools, and operational software into controlled environments.",
			},
			{
				question: "Can Dokploy support plant-floor apps?",
				answer:
					"Yes. Dokploy can deploy web apps, APIs, Docker Compose services, background workers, and databases that support manufacturing operations and internal tooling.",
			},
			{
				question: "Can teams separate deployments by plant or region?",
				answer:
					"Yes. Teams can organize projects and environments around sites, regions, product lines, or operational systems. Remote servers and multi-server management can also support distributed infrastructure needs.",
			},
			{
				question: "Can manufacturing teams self-host Dokploy?",
				answer:
					"Yes. Dokploy can be self-hosted, and Dokploy Cloud can manage the control plane while applications run on servers connected by your team.",
			},
		],
	},
};

export default function ManufacturingPage() {
	return <IndustryPage data={data} />;
}
