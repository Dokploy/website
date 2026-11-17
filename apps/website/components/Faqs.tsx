import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "./Container";

const faqs = [
	{
		question: "What is Dokploy?",
		answer:
			"Dokploy is a stable, easy-to-use deployment solution designed to simplify the application management process. Think of Dokploy as an open source, self-hostable alternative to platforms like Heroku, Vercel, and Netlify.",
	},
	{
		question: "How does the self-hosted version of Dokploy work?",
		answer:
			"Dokploy is open source and free to self-host. You run the Dokploy UI on your own infrastructure and you are responsible for its maintenance and updates.",
	},
	{
		question: "Do I need to provide my own server for Dokploy Cloud?",
		answer:
			"Yes. With Dokploy Cloud you provide your own server (e.g., a VPS from Hetzner, Hostinger, AWS, etc.), and we manage the Dokploy UI infrastructure for you.",
	},
	{
		question: "What happens if I need more than one server?",
		answer:
			"You can add as many servers as you need. Each additional server costs $4.50/month on the Hobby plan. On the Startup plan, 3 servers are included in the base price, and you can add more at $4.50/month each.",
	},
	{
		question: "Is there a limit on the number of deployments?",
		answer:
			"No, there is no limit on the number of deployments in any of the plans.",
	},
	{
		question: "What happens if I exceed my purchased server limit?",
		answer:
			"The most recently added servers will be deactivated. You won't be able to create services on inactive servers until they are reactivated.",
	},
	{
		question: "What kind of support do you offer?",
		answer:
			"The open source version and the Hobby plan include community support via Discord. The Startup plan adds email and chat support, and the Enterprise plan includes priority support and dedicated services.",
	},
	{
		question: "What's the catch on the paid plans?",
		answer:
			"Nothing. Once you link your server (VPS) to your account, you can deploy unlimited applications and databases with unlimited deployments on every plan. The Hobby plan is limited to 1 user, 1 organization, and 1 backup per database, while Startup and Enterprise remove those limits.",
	},
	{
		question: "Why Choose Dokploy?",
		answer:
			"Dokploy offers simplicity, flexibility, and speed in application deployment and management.",
	},
	{
		question: "Is it open source?",
		answer:
			"Yes. Dokploy is open source and free to self-host. Dokploy Cloud and the Enterprise features are paid options.",
	},
	{
		question: "Can I use Dokploy to deploy AI-built apps?",
		answer:
			"Yes. Dokploy works with code from any source, including apps built with AI coding tools. You can deploy using your existing Git, Docker, and Compose workflows, or create a sandbox environment to give teams a governed space where they can ship AI-built apps with SSO, audit logs, and multitenancy built in.",
	},
	{
		question: "What types of languages can I deploy with Dokploy?",
		answer:
			"Dokploy does not restrict programming languages. You are free to choose your preferred language and framework.",
	},
	{
		question: "How do I request a feature or report a bug?",
		answer:
			"To request a feature or report a bug, please create an issue on our GitHub repository or ask in our Discord channel.",
	},
	{
		question: "Do you track the usage of Dokploy?",
		answer:
			"The self-hosted version of Dokploy does not send any telemetry. Dokploy Cloud uses product analytics to understand how the platform is used and improve it.",
	},
	{
		question:
			"Are there any user forums or communities where I can interact with other users?",
		answer:
			"Yes, we have active GitHub discussions and Discord where you can share ideas, ask for help, and connect with other users.",
	},
	{
		question: "Do you offer refunds?",
		answer:
			"We do not offer refunds. However, you can cancel your subscription at any time. Feel free to try our open-source version for free before making a purchase.",
	},
	{
		question: "What types of applications can I deploy with Dokploy?",
		answer:
			"You can deploy any application that can be Dockerized, with no limits. Dokploy supports builds from Git repositories and Docker images using Dockerfiles, Nixpacks, Railpack, Heroku and Paketo Buildpacks, or static site builds.",
	},
	{
		question: "How does Dokploy handle database management?",
		answer:
			"Dokploy supports multiple database systems including Postgres, MySQL, MariaDB, MongoDB, Redis, and libSQL, providing tools for easy deployment, management, and scheduled backups directly from the dashboard.",
	},
];

export function Faqs() {
	return (
		<section
			id="faqs"
			aria-labelledby="faq-title"
			className="relative overflow-hidden bg-black py-20 sm:py-32"
		>
			<Container className="relative flex flex-col gap-10">
				<div className="mx-auto w-full justify-center lg:mx-0">
					<h2
						id="faq-title"
						className="text-center font-display text-3xl tracking-tight text-primary sm:text-4xl"
					>
						Frequently asked questions
					</h2>
					<p className="mt-4 text-center text-lg tracking-tight text-muted-foreground">
						If you can't find what you're looking for, please submit an issue
						through our GitHub repository or ask questions on our Discord.
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="mx-auto  w-full max-w-3xl"
				>
					{faqs.map((faq, columnIndex) => (
						<AccordionItem value={`${columnIndex}`} key={columnIndex}>
							<AccordionTrigger className="text-left">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Container>
		</section>
	);
}
