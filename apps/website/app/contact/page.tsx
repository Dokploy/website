"use client";

import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ContactPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);

	if (isSubmitted) {
		return (
			<div className="bg-background py-24 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Thank you for contacting us!
						</h1>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							We've received your message and will get back to you as soon as
							possible.
						</p>
						<div className="mt-10">
							<button
								type="button"
								onClick={() => setIsSubmitted(false)}
								className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
							>
								Send Another Message
							</button>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="relative bg-background py-24 sm:py-32">
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				height={40}
				width={40}
				duration={3}
				repeatDelay={1}
				className={cn(
					"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
					"absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
				)}
			/>
			<Container>
				<div className="relative z-10 mx-auto max-w-3xl rounded-lg border border-border bg-black p-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Contact Us
						</h1>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							Get in touch with our team. We're here to help with any questions
							about Dokploy.
						</p>
					</div>

					<div className="mt-16">
						<ContactForm onSuccess={() => setIsSubmitted(true)} />
					</div>
				</div>
			</Container>
		</div>
	);
}
