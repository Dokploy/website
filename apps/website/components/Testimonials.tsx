"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import { useTranslations } from "next-intl";

// const testimonials = [
// 	[
// 		{
// 			content:
// 				"This application has revolutionized the way we handle deployments. The integration of Docker and Traefik through such a user-friendly interface has saved us countless hours.",
// 			author: {
// 				name: "Emily R.",
// 				role: "Full Stack Developer",
// 				image: "/avatars/avatar-1.png",
// 			},
// 		},
// 		{
// 			content:
// 				"As a fast-paced startup, efficiency and reliability are paramount. This software delivered on both, allowing us to focus more on development and less on operations.",
// 			author: {
// 				name: "Mark T.",
// 				role: "CTO, Tech Innovations Inc.",
// 				image: "/avatars/avatar-2.png",
// 			},
// 		},
// 	],
// 	[
// 		{
// 			content:
// 				"The comprehensive monitoring and robust backup solutions have given us the peace of mind we need to operate at our best 24/7. Highly recommended!",
// 			author: {
// 				name: "Sarah L.",
// 				role: "IT Director, Creative Solutions Agency",
// 				image: "/avatars/avatar-3.png",
// 			},
// 		},
// 		{
// 			content:
// 				"Upgrading to this platform was a game-changer for our agency. The user permission controls and real-time updates have greatly enhanced our team's efficiency.",
// 			author: {
// 				name: "James P.",
// 				role: "Lead Developer, Dynamic Web Solutions",
// 				image: "/avatars/avatar-4.png",
// 			},
// 		},
// 	],
// 	[
// 		{
// 			content:
// 				"Fantastic tool! The direct container access and dynamic Traefik configuration features have made it so easy to manage our services. It's like having a DevOps team in a box!",
// 			author: {
// 				name: "Ana D.",
// 				role: "Full Stack Developer, Independent Contractor",
// 				image: "/avatars/avatar-7.png",
// 			},
// 		},
// 		{
// 			content:
// 				"his tool has been indispensable for managing my client projects. It has streamlined my workflow and dramatically increased my productivity, allowing me to take on more clients without sacrificing quality.",
// 			author: {
// 				name: "Carlos M.",
// 				role: "Freelance Full Stack Developer",
// 				image: "/avatars/avatar-6.png",
// 			},
// 		},
// 	],
// ];

// function QuoteIcon(props: React.ComponentPropsWithoutRef<"svg">) {
// 	return (
// 		<svg aria-hidden="true" width={105} height={78} {...props}>
// 			<path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
// 		</svg>
// 	);
// }

const reviews = [
	{
		name: "Duras",
		username: "@duras",
		body: "This app convinced me to try something beyond pure Docker Compose. It’s a pleasure to contribute to such an awesome project!",
		img: "https://avatar.vercel.sh/duras",
	},
	{
		name: "apis",
		username: "@apis",
		body: "I replaced my previous setup with Dokploy today. It’s stable, easy to use, and offers excellent support!",
		img: "https://avatar.vercel.sh/apis",
	},
	{
		name: "yayza_",
		username: "@yayza_",
		body: "Migrated all my services to Dokploy—it worked seamlessly! The level of configuration is perfect for all kinds of projects.",
		img: "https://avatar.vercel.sh/yayza",
	},
	{
		name: "Vaurion",
		username: "@vaurion",
		body: "Dokploy makes my deployments incredibly easy. I just test locally, push a preview to GitHub, and Dokploy takes care of the rest.",
		img: "https://avatar.vercel.sh/vaurion",
	},
	{
		name: "vinum?",
		username: "@vinum",
		body: "Dokploy is everything I wanted in a PaaS. The functionality is impressive, and it's completely free!",
		img: "https://avatar.vercel.sh/vinum",
	},
	{
		name: "vadzim",
		username: "@vadzim",
		body: "Dokploy is fantastic! I rarely encounter any deployment issues, and the community support is top-notch.",
		img: "https://avatar.vercel.sh/vadzim",
	},
	{
		name: "Slurpy Beckerman",
		username: "@slurpy",
		body: "This is exactly what I want in a deployment system. I’ve restructured my dev process around Dokploy!",
		img: "https://avatar.vercel.sh/slurpy",
	},
	{
		name: "lua",
		username: "@lua",
		body: "Dokploy is genuinely so nice to use. The hard work behind it really shows.",
		img: "https://avatar.vercel.sh/lua",
	},
	{
		name: "johnnygri",
		username: "@johnnygri",
		body: "Dokploy is a complete joy to use. I’m running a mix of critical and low-priority services seamlessly across servers.",
		img: "https://avatar.vercel.sh/johnnygri",
	},
	{
		name: "HiJoe",
		username: "@hijoe",
		body: "Setting up Dokploy was great—simple, intuitive, and reliable. Perfect for small to medium-sized businesses.",
		img: "https://avatar.vercel.sh/hijoe",
	},
	{
		name: "johannes0910",
		username: "@johannes0910",
		body: "Dokploy has been a game-changer for my side projects. Solid UI, straightforward Docker abstraction, and great design.",
		img: "https://avatar.vercel.sh/johannes0910",
	},
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
				// light styles
				// "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"hover:bg-gray-50/[.15]",
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<img className="rounded-full" width="32" height="32" alt="" src={img} />
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium text-white/40">{username}</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
};

export function Testimonials() {
	const t = useTranslations("HomePage");

	return (
		<section
			id="testimonials"
			aria-label="What our customers are saying"
			className=" py-20 sm:py-32"
		>
			<div className="mx-auto max-w-2xl md:text-center px-4">
				<h2 className="font-display text-3xl tracking-tight  sm:text-4xl text-center">
					{t("testimonials.title")}
				</h2>
				<p className="mt-4 text-lg tracking-tight text-muted-foreground text-center">
					{t("testimonials.description")}
				</p>
			</div>

			<div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden  bg-background md:shadow-xl">
				<Marquee pauseOnHover className="[--duration:20s]">
					{firstRow.map((review) => (
						<ReviewCard key={review.username} {...review} />
					))}
				</Marquee>
				<Marquee reverse pauseOnHover className="[--duration:20s]">
					{secondRow.map((review) => (
						<ReviewCard key={review.username} {...review} />
					))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r  from-background" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l  from-background" />
			</div>
		</section>
	);
}
