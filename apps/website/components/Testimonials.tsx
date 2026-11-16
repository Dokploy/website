"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";

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
	return (
		<section
			id="testimonials"
			aria-label="What our customers are saying"
			className=" py-20 sm:py-32"
		>
			<div className="mx-auto max-w-2xl px-4 md:text-center">
				<h2 className="text-center font-display text-3xl  tracking-tight sm:text-4xl">
					Why Developers Love Dokploy
				</h2>
				<p className="mt-4 text-center text-lg tracking-tight text-muted-foreground">
					Think we’re bragging? Hear from the devs who once doubted too—until
					Dokploy made their lives (and deployments) surprisingly easier.
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
