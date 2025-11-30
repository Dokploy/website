import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Container } from './Container'

const faqs = [
	{
		question: 'What is Dokploy?',
		answer: 'Dokploy is a stable, easy-to-use deployment solution designed to simplify the application management process. Think of Dokploy as a free alternative self-hostable solution to platforms like Heroku, Vercel, and Netlify.',
	},
	{
		question: "How does Dokploy's Open Source plan work?",
		answer: 'You can host Dokploy UI on your own infrastructure and you will be responsible for the maintenance and updates.',
	},
	{
		question: 'Do I need to provide my own server for the managed plan?',
		answer: 'Yes, in the managed plan, you provide your own server (e.g., Hetzner, Hostinger, AWS, etc.) VPS, and we manage the Dokploy UI infrastructure for you.',
	},
	{
		question: 'What happens if I need more than one server?',
		answer: 'The first server costs $4.50/month, if you buy more than one it will be $3.50/month per server.',
	},
	{
		question: 'Is there a limit on the number of deployments?',
		answer: 'No, there is no limit on the number of deployments in any of the plans.',
	},
	{
		question: 'What happens if I exceed my purchased server limit?',
		answer: "The most recently added servers will be deactivated. You won't be able to create services on inactive servers until they are reactivated.",
	},
	{
		question: 'What kind of support do you offer?',
		answer: 'We offer community support for the open source version and priority support for paid plans (via Discord or Email at support@dokploy.com).',
	},
	{
		question: "What's the catch on the Paid Plan?",
		answer: 'Nothing, once you link your server (VPS) to your account, you can deploy unlimited applications, databases, and users, and you get unlimited updates, deployments, backups, and more.',
	},
	{
		question: 'Why Choose Dokploy?',
		answer: 'Dokploy offers simplicity, flexibility, and speed in application deployment and management.',
	},
	{
		question: 'Is it open source?',
		answer: 'Yes, Dokploy is open source and free to use.',
	},
	{
		question: 'What types of languages can I deploy with Dokploy?',
		answer: 'Dokploy does not restrict programming languages. You are free to choose your preferred language and framework.',
	},
	{
		question: 'How do I request a feature or report a bug?',
		answer: 'To request a feature or report a bug, please create an issue on our GitHub repository or ask in our Discord channel.',
	},
	{
		question: 'Do you track the usage of Dokploy?',
		answer: "No, we don't track any usage data.",
	},
	{
		question:
			'Are there any user forums or communities where I can interact with other users?',
		answer: 'Yes, we have active GitHub discussions and Discord where you can share ideas, ask for help, and connect with other users.',
	},
	{
		question: 'Do you offer a refunds?',
		answer: 'We do not offer refunds. However, you can cancel your subscription at any time. Feel free to try our open-source version for free before making a purchase.',
	},
	{
		question: 'What types of applications can I deploy with Dokploy?',
		answer: 'You can deploy any application that can be Dockerized, with no limits. Dokploy supports builds from Git repositories, Dockerfiles, Nixpacks, and Buildpacks like Heroku and Paketo.',
	},
	{
		question: 'How does Dokploy handle database management?',
		answer: 'Dokploy supports multiple database systems including Postgres, MySQL, MariaDB, MongoDB, and Redis, providing tools for easy deployment and management and backups directly from the dashboard.',
	},
]

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
						If you can't find what you're looking for, please submit
						an issue through our GitHub repository or ask questions
						on our Discord.
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="mx-auto  w-full max-w-3xl"
				>
					{faqs.map((faq, columnIndex) => (
						<AccordionItem
							value={`${columnIndex}`}
							key={columnIndex}
						>
							<AccordionTrigger className="text-left">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Container>
		</section>
	)
}
