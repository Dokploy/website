import clsx from "clsx";
import { Inter, Lexend } from "next/font/google";
import "@/styles/tailwind.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://dokploy.com"),
	title: {
		default: "Dokploy - Effortless Deployment Solutions",
		template: "%s | Simplify Your DevOps",
	},
	icons: {
		icon: "icon.svg",
		apple: "apple-touch-icon.png",
	},
	alternates: {
		canonical: "https://dokploy.com",
		languages: {
			en: "https://dokploy.com",
		},
	},
	description:
		"Streamline your deployment process with Dokploy. Effortlessly manage applications and databases on any VPS using Docker and Traefik for improved performance and security.",
	applicationName: "Dokploy",
	keywords: [
		"Dokploy",
		"Docker",
		"Traefik",
		"deployment",
		"VPS",
		"application management",
		"database management",
		"DevOps",
		"cloud infrastructure",
		"UI Self hosted",
	],
	referrer: "origin",
	robots: "index, follow",
	openGraph: {
		type: "website",
		url: "https://dokploy.com",
		title: "Dokploy - Effortless Deployment Solutions",
		description:
			"Simplify your DevOps with Dokploy. Deploy applications and manage databases efficiently on any VPS.",
		siteName: "Dokploy",
		images: [
			{
				url: "https://dokploy.com/og.png",
			},
			{
				url: "https://dokploy.com/icon.svg",
				width: 24,
				height: 24,
				alt: "Dokploy Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@Dokploy",
		creator: "@Dokploy",
		title: "Dokploy - Simplify Your DevOps",
		description:
			"Deploy applications and manage databases with ease using Dokploy. Learn how our platform can elevate your infrastructure management.",
		images: "https://dokploy.com/og.png",
	},
};

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
});

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { locale } = params;
	const messages = await getMessages();
	return (
		<html
			lang={locale}
			className={clsx("h-full scroll-smooth", inter.variable, lexend.variable)}
		>
			<head>
				<script
					defer
					src="https://umami.dokploy.com/script.js"
					data-website-id="7d1422e4-3776-4870-8145-7d7b2075d470"
				/>
			</head>
			{/* <GoogleAnalytics /> */}
			<body className="flex h-full flex-col">
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
