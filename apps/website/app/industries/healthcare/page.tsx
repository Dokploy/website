import {
	IndustryPage,
	type IndustryPageData,
} from "@/components/industries/IndustryPage";
import { Activity, Bot, Eye, KeyRound, Layers, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Healthcare Deployment Software for Teams",
	description:
		"Use healthcare deployment software to release patient portals, clinical tools, and internal apps in private environments your team controls.",
	alternates: {
		canonical: "https://dokploy.com/industries/healthcare",
	},
};

const data: IndustryPageData = {
	hero: {
		title: "Healthcare deployment software for safer clinical apps",
		description:
			"Deploy patient-facing apps, clinical operations tools, and healthcare technology in environments your IT teams can govern. Dokploy supports private deployment in healthcare with self-hostable infrastructure, access control, and review workflows.",
	},
	features: {
		heading: "Release healthcare technology without exposing infrastructure",
		description:
			"Healthcare technology deployment needs a balance between speed and control. Dokploy enables developers to publish apps efficiently while IT teams keep infrastructure, access, and operational visibility in one place.",
		items: [
			{
				icon: Lock,
				title: "Deploy clinical apps inside controlled environments",
				description:
					"Run patient portals, care team tools, internal dashboards, and service APIs in environments managed by you with self-hosted Dokploy.",
			},
			{
				icon: KeyRound,
				title: "Protect access with SSO and roles",
				description:
					"Separate administrator, developer, and reviewer permissions. Enterprise teams can add SSO, custom roles, and audit logs for stronger operational control.",
			},
			{
				icon: Eye,
				title: "Review changes before they affect care teams",
				description:
					"Use preview deployments or staging environments to test changes before they reach staff or patients. Teams can check the running application, not just a branch or ticket.",
			},
			{
				icon: Layers,
				title: "Support full-stack healthcare tools",
				description:
					"Deploy frontends, APIs, background services, and Docker Compose stacks. We also support common databases used in healthcare technology projects.",
			},
			{
				icon: Activity,
				title: "Monitor applications and servers centrally",
				description:
					"View logs, deployments, and monitoring from one platform. IT teams get a clearer view of application health without manually checking each server.",
			},
			{
				icon: Bot,
				title: "Ship AI-powered tools securely",
				description:
					"Build AI sandboxes where even your non-technical team members can test vibe-coded and AI-enabled software in a secure, controlled environment.",
			},
		],
	},
	comparison: {
		heading: "Private deployment in healthcare on one platform",
		description:
			"Dokploy gives teams a more consistent way to release and operate healthcare software, rather than a mix of internal servers, cloud projects, vendor portals, and one-off deployment scripts.",
		without: {
			title: "Ad hoc healthcare deployments",
			items: [
				"Different teams may use different hosting accounts and release scripts.",
				"Clinical tools can be hard to monitor after launch.",
				"Access reviews depend on the process behind each app.",
				"Rollbacks and backups may not be planned consistently.",
				"Internal apps can become difficult for IT teams to support.",
			],
		},
		withDokploy: {
			title: "Dokploy for healthcare deployment",
			items: [
				"Applications deploy through one governed platform.",
				"Teams can use Git, Docker, Docker Compose, and supported databases.",
				"Enterprise controls include SSO, custom roles, audit logs, and whitelabeling.",
				"Preview deployments help teams review changes before release.",
				"Monitoring, logs, backups, and rollbacks sit closer to the deployment workflow.",
			],
		},
	},
	workflow: {
		heading: "From healthcare app repository to governed release",
		description:
			"Dokploy gives healthcare technology teams a repeatable path from code to a running application. Developers can keep working from Git while IT teams manage the release environment.",
		steps: [
			{
				title: "Create the application environment",
				description:
					"Set up a project for a patient portal, internal tool, integration service, or care operations app. Use separate environments for review, staging, and production.",
				flow: "Create project → Add environment → Assign team",
			},
			{
				title: "Connect the codebase",
				description:
					"Connect a Git provider or bring a Docker-based configuration. Dokploy supports common deployment methods, so teams can match the workflow to the application stack.",
				flow: "Select provider → Choose repository → Set branch",
			},
			{
				title: "Test before release",
				description:
					"Deploy changes into a preview or staging environment. Product owners, IT, and clinical operations teams can review the running application before it is promoted.",
				flow: "Open preview → Review service → Approve release",
			},
			{
				title: "Deploy with visibility",
				description:
					"Publish the approved version, then monitor logs, deployments, and server metrics. Rollback options help teams respond if a release needs to be restored.",
				flow: "Deploy → Watch logs → Roll back if needed",
			},
		],
	},
	builtFor: {
		heading: "Built for patient-facing apps and internal healthcare platforms",
		paragraphs: [
			"Dokploy gives healthcare technology teams a practical deployment layer for apps that need tighter operational control.",
			"Teams can deploy services from Git or Docker, manage domains and environments, and keep logs, monitoring, and releases close to the application.",
			"For organizations with stricter infrastructure needs, Dokploy can be self-hosted. Teams that want Dokploy to manage the control plane can use Dokploy Cloud while connecting their own servers for application workloads.",
		],
		screenshotAlt:
			"Dokploy dashboard for a healthcare technology project with environments for clinical-review, staging, and production, plus deployment logs, monitoring, domains, and database services",
	},
	detailRows: [
		{
			area: "Deployment methods",
			support:
				"Git, Docker, Docker Compose, Nixpacks, Heroku Buildpacks, and custom Dockerfiles",
		},
		{
			area: "Healthcare workflows",
			support:
				"Preview deployments, staging environments, webhook deploys, and production releases",
		},
		{
			area: "Access control",
			support: "Owner, Admin, and Member roles, with custom Enterprise roles",
		},
		{
			area: "Governance options",
			support:
				"Enterprise SSO, audit logs, whitelabeling, and role-based access control",
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
		heading: "Healthcare deployment software FAQs",
		items: [
			{
				question: "What is healthcare deployment?",
				answer:
					"Healthcare deployment is the process of releasing healthcare applications, internal tools, patient portals, clinical software, and supporting services into environments that healthcare IT teams can manage.",
			},
			{
				question:
					"How is healthcare technology deployment different from general software deployment?",
				answer:
					"Healthcare technology deployment often needs tighter control over access, infrastructure, review workflows, and operational visibility. Dokploy helps by keeping releases, environments, logs, monitoring, and access management closer together, while also offering self-hosted deployment.",
			},
			{
				question: "Can Dokploy support private deployment in healthcare?",
				answer:
					"Yes. Dokploy can be self-hosted, and Dokploy Cloud lets teams connect their own servers while Dokploy manages the control plane. This gives healthcare teams options for private deployment in healthcare environments.",
			},
			{
				question: "Can healthcare teams review apps before release?",
				answer:
					"Yes. Preview deployments and staging environments help teams test a running application before it reaches staff, patients, or operational users.",
			},
			{
				question: "Does Dokploy support healthcare app databases?",
				answer:
					"Yes. Dokploy supports common databases, including PostgreSQL, MySQL, MongoDB, Redis, and MariaDB, along with backup options for supported services.",
			},
		],
	},
};

export default function HealthcarePage() {
	return <IndustryPage data={data} />;
}
