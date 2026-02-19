"use client";

import { trackGAEvent } from "@/components/analitycs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const PROGRAM_OPTIONS = [
	{ value: "agency", label: "Agency Plan" },
	{ value: "referral", label: "Referral Program" },
	{ value: "reseller", label: "Reseller Program" },
	{ value: "all", label: "All Programs" },
] as const;

interface PartnerFormData {
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	programInterest: string;
	message: string;
}

export function PartnerForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState<PartnerFormData>({
		firstName: "",
		lastName: "",
		email: "",
		company: "",
		programInterest: "",
		message: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = (): boolean => {
		const newErrors: Record<string, string> = {};
		if (!formData.firstName.trim()) newErrors.firstName = "Required";
		if (!formData.lastName.trim()) newErrors.lastName = "Required";
		if (!formData.email.trim()) newErrors.email = "Required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email";
		}
		if (!formData.company.trim()) newErrors.company = "Required";
		if (!formData.programInterest) newErrors.programInterest = "Required";
		if (!formData.message.trim()) newErrors.message = "Required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsSubmitting(true);
		try {
			const programLabel =
				PROGRAM_OPTIONS.find((o) => o.value === formData.programInterest)
					?.label ?? formData.programInterest;
			const fullMessage = `Program Interest: ${programLabel}\n\n${formData.message}`;

			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					inquiryType: "sales",
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					company: formData.company,
					message: fullMessage,
				}),
			});

			if (response.ok) {
				trackGAEvent({
					action: "Partner Form Submitted",
					category: "Partners",
					label: formData.programInterest,
				});
				setIsSubmitted(true);
			} else {
				throw new Error("Failed to submit");
			}
		} catch {
			setErrors({ message: "Something went wrong. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<div className="rounded-xl border border-border/50 bg-muted/10 p-8 text-center">
				<h3 className="text-xl font-semibold text-foreground">
					Thank you for your interest
				</h3>
				<p className="mt-2 text-muted-foreground">
					We&apos;ve received your message and will get back to you soon.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid gap-6 sm:grid-cols-2">
				<div className="space-y-2">
					<label htmlFor="firstName" className="text-sm font-medium">
						First Name <span className="text-destructive">*</span>
					</label>
					<Input
						id="firstName"
						placeholder="First name"
						value={formData.firstName}
						onChange={(e) => {
							setFormData((p) => ({ ...p, firstName: e.target.value }));
							if (errors.firstName) setErrors((p) => ({ ...p, firstName: "" }));
						}}
					/>
					{errors.firstName && (
						<p className="text-sm text-destructive">{errors.firstName}</p>
					)}
				</div>
				<div className="space-y-2">
					<label htmlFor="lastName" className="text-sm font-medium">
						Last Name <span className="text-destructive">*</span>
					</label>
					<Input
						id="lastName"
						placeholder="Last name"
						value={formData.lastName}
						onChange={(e) => {
							setFormData((p) => ({ ...p, lastName: e.target.value }));
							if (errors.lastName) setErrors((p) => ({ ...p, lastName: "" }));
						}}
					/>
					{errors.lastName && (
						<p className="text-sm text-destructive">{errors.lastName}</p>
					)}
				</div>
			</div>
			<div className="space-y-2">
				<label htmlFor="email" className="text-sm font-medium">
					Email <span className="text-destructive">*</span>
				</label>
				<Input
					id="email"
					type="email"
					placeholder="you@company.com"
					value={formData.email}
					onChange={(e) => {
						setFormData((p) => ({ ...p, email: e.target.value }));
						if (errors.email) setErrors((p) => ({ ...p, email: "" }));
					}}
				/>
				{errors.email && (
					<p className="text-sm text-destructive">{errors.email}</p>
				)}
			</div>
			<div className="space-y-2">
				<label htmlFor="company" className="text-sm font-medium">
					Company <span className="text-destructive">*</span>
				</label>
				<Input
					id="company"
					placeholder="Your company"
					value={formData.company}
					onChange={(e) => {
						setFormData((p) => ({ ...p, company: e.target.value }));
						if (errors.company) setErrors((p) => ({ ...p, company: "" }));
					}}
				/>
				{errors.company && (
					<p className="text-sm text-destructive">{errors.company}</p>
				)}
			</div>
			<div className="space-y-2">
				<label htmlFor="programInterest" className="text-sm font-medium">
					Program Interest <span className="text-destructive">*</span>
				</label>
				<Select
					value={formData.programInterest}
					onValueChange={(value) => {
						setFormData((p) => ({ ...p, programInterest: value }));
						if (errors.programInterest)
							setErrors((p) => ({ ...p, programInterest: "" }));
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select program" />
					</SelectTrigger>
					<SelectContent>
						{PROGRAM_OPTIONS.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.programInterest && (
					<p className="text-sm text-destructive">
						{errors.programInterest}
					</p>
				)}
			</div>
			<div className="space-y-2">
				<label htmlFor="message" className="text-sm font-medium">
					Message <span className="text-destructive">*</span>
				</label>
				<textarea
					id="message"
					rows={4}
					placeholder="Tell us about your goals..."
					value={formData.message}
					onChange={(e) => {
						setFormData((p) => ({ ...p, message: e.target.value }));
						if (errors.message) setErrors((p) => ({ ...p, message: "" }));
					}}
					className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				/>
				{errors.message && (
					<p className="text-sm text-destructive">{errors.message}</p>
				)}
			</div>
			<Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
				{isSubmitting ? "Sending..." : "Submit"}
			</Button>
		</form>
	);
}
