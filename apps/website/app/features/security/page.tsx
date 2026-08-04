import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	EyeOff,
	Fingerprint,
	KeyRound,
	Link2,
	Lock,
	Plug,
	Rocket,
	ScrollText,
	Server,
	Shield,
	ShieldCheck,
	SlidersHorizontal,
	UserCog,
	UserMinus,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Security, Access Control, & Governance",
	description:
		"Dokploy gives teams enterprise-grade security with SSO, fine-grained RBAC, audit logs, and 2FA – built for compliance and infrastructure control.",
};

const ssoFeatures = [
	{
		icon: Link2,
		title: "Integrate with OIDC and SAML",
		description:
			"Dokploy's SSO supports both OpenID Connect and SAML 2.0, so it works with virtually any enterprise IdP—no custom engineering work required.",
	},
	{
		icon: Plug,
		title: "Connect the providers you use",
		description:
			"Pre-configured integrations with Okta, Microsoft Entra ID, Auth0, Keycloak, and Zitadel. Any other compatible provider can be configured.",
	},
	{
		icon: UserMinus,
		title: "Centralize user provisioning",
		description:
			"When you add or remove a user in your IdP, it's reflected in Dokploy. No parallel user management, no accounts lingering after someone leaves.",
	},
	{
		icon: ShieldCheck,
		title: "Enforce your auth policies",
		description:
			"MFA requirements, session timeouts, and conditional access rules configured in your IdP apply to Dokploy automatically so your security posture stays consistent.",
	},
];

const rbacFeatures = [
	{
		icon: Users,
		plan: "All plans",
		title: "Assign built-in roles",
		description:
			"Every paid plan includes built-in Owner, Admin, and Member roles, giving you immediate control over who can manage the platform and who simply uses it, with no configuration needed.",
	},
	{
		icon: UserCog,
		plan: "Enterprise",
		title: "Build custom roles from scratch",
		description:
			"Go beyond the defaults by creating roles with the permissions each function needs: a “deployer” who can trigger releases but can't touch infrastructure, or a “viewer” who can just read logs.",
	},
	{
		icon: SlidersHorizontal,
		plan: "Enterprise",
		title: "Set permissions at the resource level",
		description:
			"Permissions span users, projects, services, servers, certificates, environment variables, domains, backups, and more—each with granular read, write, create, and delete controls.",
	},
	{
		icon: Rocket,
		plan: "Enterprise",
		title: "Control deployment access independently",
		description:
			"Deployment permissions are separate from service configuration permissions. A team member might be able to trigger a deploy without access to edit environment variables or infrastructure settings.",
	},
	{
		icon: EyeOff,
		plan: "Enterprise",
		title: "Restrict environment variable visibility",
		description:
			"Sensitive configuration values stay hidden from users whose roles don't include environment variable read access, even if they can deploy and manage the service itself.",
	},
	{
		icon: ScrollText,
		plan: "Enterprise",
		title: "Scope access to logs and monitoring",
		description:
			"Read access to application logs, audit entries, and server metrics—each one has separate permissions, so teams get the visibility they need without exposure to production configuration.",
	},
];

const auditLogItems = [
	{
		title: "Authentication events",
		description:
			"every login, logout, and session change, with timestamps and the user responsible",
	},
	{
		title: "User management",
		description: "role assignments, invitations, and member removals",
	},
	{
		title: "Deployments",
		description:
			"every deploy triggered, cancelled, or queued, with the user and resource named",
	},
	{
		title: "Infrastructure changes",
		description:
			"servers, certificates, SSH keys, registries, and S3 destinations",
	},
	{
		title: "Configuration changes",
		description:
			"environment variables, domains, backups, and scheduled jobs",
	},
	{
		title: "Powerful filtering",
		description:
			"filter by user, action type, resource type, or resource name to zero in on exactly what you need",
	},
];

const startupPlanFeatures = [
	"Built-in roles, including Admin and Developer",
	"Two-factor authentication (2FA)",
	"SSH key management",
	"SSL/TLS certificate management",
	"API key authentication",
	"Server security audit checks",
	"UFW firewall guidance",
	"Email and chat support",
];

const enterprisePlanFeatures = [
	"SSO/SAML (Okta, Azure AD, Auth0, Keycloak, Zitadel, and more)",
	"Fine-grained RBAC with custom roles",
	"Audit logs",
	"MSA/SLA",
	"Complete hosting flexibility (on-prem or your own cloud)",
	"Priority support",
];

const infrastructureFeatures = [
	{
		icon: Fingerprint,
		title: "Enable two-factor authentication",
		description:
			"Startup plans and above include 2FA for all users: an extra layer of protection on top of passwords, without needing SSO.",
	},
	{
		icon: Lock,
		title: "Automate SSL/TLS certificate management",
		description:
			"Dokploy handles certificate provisioning and renewal automatically via Traefik, so your services stay encrypted without manual intervention or renewal tracking.",
	},
	{
		icon: KeyRound,
		title: "Authenticate with SSH keys, not passwords",
		description:
			"Dokploy's built-in security checks recommend disabling password authentication on your servers and switching to key-based SSH. You can manage your keys directly within the platform.",
	},
	{
		icon: Server,
		title: "Keep your data on your own infrastructure",
		description:
			"Self-hosted Dokploy means your deployments, credentials, and configurations stay on servers you control. No vendor accesses your environment.",
	},
];

const relatedFeatures = [
	{
		icon: KeyRound,
		title: "SSO",
		description:
			"Centralize authentication with your existing identity provider for secure, seamless access across your organization.",
		href: "/features/single-sign-on",
	},
	{
		icon: Shield,
		title: "RBAC",
		description:
			"Define exactly what each user can do once they're in Dokploy, with granular role and permission controls across projects, services, and features.",
		href: "/features/role-based-access-control",
	},
	{
		icon: ScrollText,
		title: "Audit logs",
		description:
			"Keep a full record of every login, logout, and action taken across your Dokploy environment for compliance and accountability.",
		href: "/features/audit-logs",
	},
];

const faqs = [
	{
		question: "What SSO providers does Dokploy support?",
		answer:
			"Dokploy supports any OIDC or SAML 2.0 provider. Pre-configured integrations are available for Okta, Azure AD (now Microsoft Entra ID), Auth0, Keycloak, and Zitadel. If your provider isn't listed, you can configure it manually using standard endpoints.",
	},
	{
		question: "Is RBAC available on every plan?",
		answer:
			"Basic role-based access control—Owner, Admin, and Member roles—is available from the Startup plan. There are Admin and Developer roles on the Startup plan. Custom roles with granular, resource-level permissions are an Enterprise feature.",
	},
	{
		question: "What does the audit log record?",
		answer:
			"Every meaningful action: logins and logouts, user and role changes, deployments, domain and certificate changes, environment variable edits, backup events, and infrastructure modifications.",
	},
	{
		question: "Does Dokploy support SOC 2 or GDPR compliance?",
		answer:
			"Dokploy's Enterprise features—SSO, custom RBAC, and audit logs—are designed to support compliance with SOC 2, GDPR, and internal governance requirements. For MSA/SLA and compliance documentation, contact the Dokploy team.",
	},
	{
		question: "Can I use SSO on Dokploy Cloud and self-hosted?",
		answer:
			"SSO is available on both Dokploy Cloud and self-hosted Enterprise instances. Contact sales for configuration support.",
	},
];

export default function SecurityPage() {
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
							Lock down your deployments without blocking your team
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Dokploy gives you layered security at every level, from how your
							team authenticates to exactly what each user can access. Get SSO,
							custom roles, a complete audit trail, and host in your own secure
							environment.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Get Started with Dokploy"
									target="_blank"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Contact sales</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* SSO */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Connect any identity provider
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Enterprise users can authenticate through any OIDC or SAML
							2.0-compatible identity provider. If your organization already
							runs Okta, Azure AD, or Keycloak, Dokploy connects to it.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{ssoFeatures.map((feature) => (
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

			{/* RBAC */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Control exactly what each user can access
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Role-based access control ships with every paid plan. Enterprise
							extends it with fully custom roles built from individual
							permissions across every resource type in the platform.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{rbacFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex items-center justify-between">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
										<feature.icon className="h-6 w-6" />
									</div>
									<span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
										{feature.plan}
									</span>
								</div>
								<h3 className="text-lg font-semibold text-white">
									{feature.title}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
					<div className="mt-12 text-center">
						<Button variant="outline" className="rounded-full" asChild>
							<Link href="/enterprise">Discover Enterprise</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Audit Logs */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Know exactly who did what and when
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Audit Logs give Enterprise organizations a complete, filterable
							record of every action taken across the platform&mdash;essential
							for SOC 2, GDPR, and internal change management processes.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{auditLogItems.map((item) => (
							<div
								key={item.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<h3 className="text-lg font-semibold">{item.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Security features by plan */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Security features by plan
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Core access controls come with every paid plan. Enterprise adds
							the layers that compliance-conscious teams and larger
							organizations need.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-8">
							<h3 className="text-xl font-semibold text-white">
								Startup and above
							</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								A great starting point:
							</p>
							<ul className="mt-6 space-y-3">
								{startupPlanFeatures.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-3 text-sm text-muted-foreground"
									>
										<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
										{feature}
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-primary/50 bg-card p-8">
							<h3 className="text-xl font-semibold text-white">Enterprise</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Everything in Startup, plus:
							</p>
							<ul className="mt-6 space-y-3">
								{enterprisePlanFeatures.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-3 text-sm text-muted-foreground"
									>
										<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
										{feature}
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>

			{/* Infrastructure security */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Security from the infrastructure up
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Access control is only one part of the picture. Dokploy is built
							with server-level security in mind, including built-in guidance to
							keep your infrastructure hardened alongside your access policies.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{infrastructureFeatures.map((feature) => (
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

			{/* FAQs */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Security and governance FAQs
						</h2>
					</div>
					<div className="mx-auto mt-16 max-w-3xl space-y-8">
						{faqs.map((faq) => (
							<div
								key={faq.question}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<h3 className="text-lg font-semibold text-white">
									{faq.question}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Related Features */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Explore Dokploy&apos;s security features in depth
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dive deeper into the access control and governance features that
							keep your organization secure.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
						{relatedFeatures.map((feature) => (
							<Link
								key={feature.title}
								href={feature.href}
								className="rounded-xl border border-border/50 bg-card p-6 transition hover:border-border"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold">{feature.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Deploy securely with Dokploy
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Start shipping applications today with Dokploy, safe in the
							knowledge that your environment is secure. For additional
							governance, choose our Enterprise plan.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Get Started with Dokploy"
									target="_blank"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Contact sales</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
