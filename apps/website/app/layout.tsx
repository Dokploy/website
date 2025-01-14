import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

// export const metadata: Metadata = {
// 	metadataBase: new URL("https://dokploy.com"),
// 	title: "Dokploy - Deploy your applications with ease",
// 	description: "Deploy your applications with ease using Dokploy",
// 	icons: {
// 		icon: "icon.svg",
// 		apple: "apple-touch-icon.png",
// 	},
// 	openGraph: {
// 		title: "Dokploy - Deploy your applications with ease",
// 		description: "Deploy your applications with ease using Dokploy",
// 		images: "favicon.ico",
// 		type: "website",
// 	},
// 	twitter: {
// 		card: "summary_large_image",
// 		title: "Dokploy - Deploy your applications with ease",
// 		description: "Deploy your applications with ease using Dokploy",
// 		images: ["/og.png"],
// 	},
// };

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
