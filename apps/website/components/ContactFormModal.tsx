"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

interface ContactFormModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultInquiryType?: "support" | "sales" | "other";
}

export function ContactFormModal({
	open,
	onOpenChange,
	defaultInquiryType = "sales",
}: ContactFormModalProps) {
	const handleSuccess = () => {
		// Close modal after a short delay to show success message
		setTimeout(() => {
			onOpenChange(false);
		}, 2000);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Contact Sales</DialogTitle>
					<DialogDescription>
						Get in touch with our team. We're here to help with any questions
						about Dokploy Enterprise Services.
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4">
					<ContactForm
						defaultInquiryType={defaultInquiryType}
						onSuccess={handleSuccess}
						onCancel={() => onOpenChange(false)}
						showCancelButton={true}
						hideInquiryType={true}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}

