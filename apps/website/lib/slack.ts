interface ContactFormData {
	inquiryType: "support" | "sales";
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	message: string;
}

interface SlackMessage {
	text?: string;
	blocks?: SlackBlock[];
}

interface SlackBlock {
	type: string;
	text?: {
		type: string;
		text: string;
	};
	fields?: Array<{
		type: string;
		text: string;
	}>;
	elements?: Array<{
		type: string;
		text: string;
	}>;
}

/**
 * Format contact form data as a Slack message with blocks
 */
function formatContactDataForSlack(
	contactData: ContactFormData,
): SlackMessage {
	// Get emoji and label based on inquiry type
	let inquiryTypeEmoji: string;
	let inquiryTypeLabel: string;

	switch (contactData.inquiryType) {
		case "sales":
			inquiryTypeEmoji = "💰";
			inquiryTypeLabel = "Sales";
			break;
		case "support":
			inquiryTypeEmoji = "🛟";
			inquiryTypeLabel = "Support";
			break;
		default:
			inquiryTypeEmoji = "📧";
			inquiryTypeLabel = "Contact";
	}

	return {
		text: `New ${contactData.inquiryType} inquiry from ${contactData.firstName} ${contactData.lastName}`,
		blocks: [
			{
				type: "header",
				text: {
					type: "plain_text",
					text: `${inquiryTypeEmoji} New ${inquiryTypeLabel} Inquiry`,
				},
			},
			{
				type: "section",
				fields: [
					{
						type: "mrkdwn",
						text: `*Name:*\n${contactData.firstName} ${contactData.lastName}`,
					},
					{
						type: "mrkdwn",
						text: `*Email:*\n${contactData.email}`,
					},
					{
						type: "mrkdwn",
						text: `*Company:*\n${contactData.company}`,
					},
					{
						type: "mrkdwn",
						text: `*Type:*\n${inquiryTypeLabel}`,
					},
				],
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `*Message:*\n${contactData.message}`,
				},
			},
			{
				type: "divider",
			},
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: "Sent from Dokploy website contact form",
					},
				],
			},
		],
	};
}

/**
 * Send a message to Slack using a webhook URL
 */
export async function sendToSlack(
	contactData: ContactFormData,
	webhookUrl: string,
): Promise<boolean> {
	try {
		if (!webhookUrl) {
			console.error("Slack webhook URL is not configured");
			return false;
		}

		const message = formatContactDataForSlack(contactData);

		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Slack webhook error:", response.status, errorText);
			return false;
		}

		console.log("Slack notification sent successfully");
		return true;
	} catch (error) {
		console.error("Error sending to Slack:", error);
		return false;
	}
}

/**
 * Send contact form notification to Slack
 * All inquiry types (sales, support, other) are sent to the same Slack channel
 */
export async function notifySlack(
	contactData: ContactFormData,
): Promise<boolean> {
	const webhookUrl = process.env.SLACK_WEBHOOK_URL;

	if (!webhookUrl) {
		console.warn(
			"Slack webhook URL is not configured (SLACK_WEBHOOK_URL)",
		);
		return false;
	}

	return await sendToSlack(contactData, webhookUrl);
}
