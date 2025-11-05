import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "@/lib/intl";
import { Container } from "./Container";

const faqs = [
	{
		question: "faq.q1",
		answer: "faq.a1",
	},
	{
		question: "faq.q11",
		answer: "faq.a11",
	},
	{
		question: "faq.q12",
		answer: "faq.a12",
	},
	{
		question: "faq.q13",
		answer: "faq.a13",
	},
	{
		question: "faq.q14",
		answer: "faq.a14",
	},
	{
		question: "faq.q15",
		answer: "faq.a15",
	},
	{
		question: "faq.q17",
		answer: "faq.a17",
	},
	{
		question: "faq.q18",
		answer: "faq.a18",
	},
	{
		question: "faq.q2",
		answer: "faq.a2",
	},
	{
		question: "faq.q4",
		answer: "faq.a4",
	},
	{
		question: "faq.q5",
		answer: "faq.a5",
	},
	{
		question: "faq.q6",
		answer: "faq.a6",
	},
	{
		question: "faq.q7",
		answer: "faq.a7",
	},
	{
		question: "faq.q8",
		answer: "faq.a8",
	},
	{
		question: "faq.q16",
		answer: "faq.a16",
	},
	{
		question: "faq.q9",
		answer: "faq.a9",
	},
	{
		question: "faq.q10",
		answer: "faq.a10",
	},
];

export function Faqs() {
	const t = useTranslations("HomePage");
	return (
		<section
			id="faqs"
			aria-labelledby="faq-title"
			className="relative overflow-hidden bg-black py-20 sm:py-32"
		>
			<Container className="relative flex flex-col gap-10">
				<div className="mx-auto lg:mx-0 justify-center w-full">
					<h2
						id="faq-title"
						className="font-display text-3xl tracking-tight text-primary sm:text-4xl text-center"
					>
						{t("faq.title")}
					</h2>
					<p className="mt-4 text-lg tracking-tight text-muted-foreground text-center">
						{t("faq.des")}
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="w-full  max-w-3xl mx-auto"
				>
					{faqs.map((column, columnIndex) => (
						<AccordionItem value={`${columnIndex}`} key={columnIndex}>
							<AccordionTrigger className="text-left">
								{t(column.question)}
							</AccordionTrigger>
							<AccordionContent>{t(column.answer)}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Container>
		</section>
	);
}
