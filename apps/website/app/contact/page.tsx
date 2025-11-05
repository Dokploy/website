"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { trackGAEvent } from "@/components/analitycs";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

interface ContactFormData {
	inquiryType: "" | "support" | "sales" | "other";
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	message: string;
}

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState<ContactFormData>({
		inquiryType: "",
		firstName: "",
		lastName: "",
		email: "",
		company: "",
		message: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.inquiryType) {
			newErrors.inquiryType = "Please select what we can help you with";
		}
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}
		if (!formData.company.trim()) {
			newErrors.company = "Company name is required";
		}
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				trackGAEvent({
					action: "Contact Form Submitted",
					category: "Contact",
					label: formData.inquiryType,
				});

				setFormData({
					inquiryType: "",
					firstName: "",
					lastName: "",
					email: "",
					company: "",
					message: "",
				});
				setErrors({});
				setIsSubmitted(true);
			} else {
				throw new Error("Failed to submit form");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("There was an error sending your message. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: keyof ContactFormData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

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
							<Button onClick={() => setIsSubmitted(false)} variant="outline">
								Send Another Message
							</Button>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="bg-background py-24 sm:py-32 relative">
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
				<div className="mx-auto max-w-3xl border border-border rounded-lg p-8 bg-black z-10 relative">
					<div className="text-center">
						<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Contact Us
						</h1>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							Get in touch with our team. We're here to help with any questions
							about Dokploy.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="mt-16 space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="inquiryType"
								className="block text-sm font-medium text-foreground"
							>
								What can we help you with today?{" "}
								<span className="text-red-500">*</span>
							</label>
							<Select
								value={formData.inquiryType}
								onValueChange={(value) =>
									handleInputChange(
										"inquiryType",
										value as "support" | "sales" | "other",
									)
								}
							>
								<SelectTrigger className="bg-input">
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="support">Support</SelectItem>
									<SelectItem value="sales">Sales</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
							{errors.inquiryType && (
								<p className="text-sm text-red-600">{errors.inquiryType}</p>
							)}
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div className="space-y-2">
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-foreground"
								>
									First Name <span className="text-red-500">*</span>
								</label>
								<Input
									id="firstName"
									type="text"
									value={formData.firstName}
									onChange={(e) =>
										handleInputChange("firstName", e.target.value)
									}
									placeholder="Your first name"
								/>
								{errors.firstName && (
									<p className="text-sm text-red-600">{errors.firstName}</p>
								)}
							</div>

							<div className="space-y-2">
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-foreground"
								>
									Last Name <span className="text-red-500">*</span>
								</label>
								<Input
									id="lastName"
									type="text"
									value={formData.lastName}
									onChange={(e) =>
										handleInputChange("lastName", e.target.value)
									}
									placeholder="Your last name"
								/>
								{errors.lastName && (
									<p className="text-sm text-red-600">{errors.lastName}</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-foreground"
							>
								Email <span className="text-red-500">*</span>
							</label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								placeholder="your.email@company.com"
							/>
							{errors.email && (
								<p className="text-sm text-red-600">{errors.email}</p>
							)}
						</div>

						<div className="space-y-2">
							<label
								htmlFor="company"
								className="block text-sm font-medium text-foreground"
							>
								Company Name <span className="text-red-500">*</span>
							</label>
							<Input
								id="company"
								type="text"
								value={formData.company}
								onChange={(e) => handleInputChange("company", e.target.value)}
								placeholder="Your company name"
							/>
							{errors.company && (
								<p className="text-sm text-red-600">{errors.company}</p>
							)}
						</div>

						<div className="space-y-2">
							<label
								htmlFor="message"
								className="block text-sm font-medium text-foreground"
							>
								How can we help? <span className="text-red-500">*</span>
							</label>
							<textarea
								id="message"
								value={formData.message}
								onChange={(e) => handleInputChange("message", e.target.value)}
								placeholder="Tell us more about your inquiry..."
								rows={6}
								className="flex w-full rounded-md bg-input border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
							/>
							{errors.message && (
								<p className="text-sm text-red-600">{errors.message}</p>
							)}
						</div>

						<div className="flex justify-end">
							<Button
								type="submit"
								disabled={isSubmitting}
								className="min-w-[120px]"
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</Button>
						</div>
					</form>
				</div>
			</Container>
		</div>
	);
}
