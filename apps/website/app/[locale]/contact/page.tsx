"use client";

import { Container } from "@/components/Container";
import { trackGAEvent } from "@/components/analitycs";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ContactFormData {
	inquiryType: "" | "support" | "sales" | "other";
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	message: string;
}

export default function ContactPage() {
	const t = useTranslations("Contact");
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
			newErrors.inquiryType = t("errors.inquiryTypeRequired");
		}
		if (!formData.firstName.trim()) {
			newErrors.firstName = t("errors.firstNameRequired");
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = t("errors.lastNameRequired");
		}
		if (!formData.email.trim()) {
			newErrors.email = t("errors.emailRequired");
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = t("errors.emailInvalid");
		}
		if (!formData.company.trim()) {
			newErrors.company = t("errors.companyRequired");
		}
		if (!formData.message.trim()) {
			newErrors.message = t("errors.messageRequired");
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
				// Track successful form submission
				trackGAEvent({
					action: "Contact Form Submitted",
					category: "Contact",
					label: formData.inquiryType,
				});

				// Reset form and show success
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
			alert(t("errorMessage"));
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: keyof ContactFormData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
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
							{t("successTitle")}
						</h1>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							{t("successMessage")}
						</p>
						<div className="mt-10">
							<Button onClick={() => setIsSubmitted(false)} variant="outline">
								{t("buttons.sendAnother")}
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
							{t("title")}
						</h1>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							{t("description")}
						</p>
					</div>

					<form onSubmit={handleSubmit} className="mt-16 space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="inquiryType"
								className="block text-sm font-medium text-foreground"
							>
								{t("fields.inquiryType.label")}{" "}
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
									<SelectValue
										placeholder={t("fields.inquiryType.placeholder")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="support">
										{t("fields.inquiryType.options.support")}
									</SelectItem>
									<SelectItem value="sales">
										{t("fields.inquiryType.options.sales")}
									</SelectItem>
									<SelectItem value="other">
										{t("fields.inquiryType.options.other")}
									</SelectItem>
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
									{t("fields.firstName.label")}{" "}
									<span className="text-red-500">*</span>
								</label>
								<Input
									id="firstName"
									type="text"
									value={formData.firstName}
									onChange={(e) =>
										handleInputChange("firstName", e.target.value)
									}
									placeholder={t("fields.firstName.placeholder")}
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
									{t("fields.lastName.label")}{" "}
									<span className="text-red-500">*</span>
								</label>
								<Input
									id="lastName"
									type="text"
									value={formData.lastName}
									onChange={(e) =>
										handleInputChange("lastName", e.target.value)
									}
									placeholder={t("fields.lastName.placeholder")}
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
								{t("fields.email.label")}{" "}
								<span className="text-red-500">*</span>
							</label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								placeholder={t("fields.email.placeholder")}
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
								{t("fields.company.label")}{" "}
								<span className="text-red-500">*</span>
							</label>
							<Input
								id="company"
								type="text"
								value={formData.company}
								onChange={(e) => handleInputChange("company", e.target.value)}
								placeholder={t("fields.company.placeholder")}
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
								{t("fields.message.label")}{" "}
								<span className="text-red-500">*</span>
							</label>
							<textarea
								id="message"
								value={formData.message}
								onChange={(e) => handleInputChange("message", e.target.value)}
								placeholder={t("fields.message.placeholder")}
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
								{isSubmitting ? t("buttons.sending") : t("buttons.send")}
							</Button>
						</div>
					</form>
				</div>
			</Container>
		</div>
	);
}
