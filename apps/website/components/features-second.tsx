import { cn } from "@/lib/utils";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

export function FeaturesSectionDemo() {
	const features = [
		{
			title: "Track issues effectively",
			description:
				"Track and manage your project issues with ease using our intuitive interface.",
			skeleton: <SkeletonOne />,
			className:
				"col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
		},
		{
			title: "Capture pictures with AI",
			description:
				"Capture stunning photos effortlessly using our advanced AI technology.",
			skeleton: <SkeletonTwo />,
			className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
		},
		{
			title: "Watch our AI on YouTube",
			description:
				"Whether its you or Tyler Durden, you can get to know about our product on YouTube",
			skeleton: <SkeletonThree />,
			className:
				"col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
		},
		{
			title: "Deploy in seconds",
			description:
				"With our blazing fast, state of the art, cutting edge, we are so back cloud servies (read AWS) - you can deploy your model in seconds.",
			skeleton: <SkeletonFour />,
			className: "col-span-1 lg:col-span-3 border-b lg:border-none",
		},
	];
	return (
		<div className="relative z-20 mx-auto max-w-7xl py-10 lg:py-40">
			<div className="px-8">
				<h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black dark:text-white lg:text-5xl lg:leading-tight">
					Packed with thousands of features
				</h4>

				<p className="mx-auto my-4  max-w-2xl  text-center text-sm font-normal text-neutral-500 dark:text-neutral-300 lg:text-base">
					From Image generation to video generation, Everything AI has APIs for
					literally everything. It can even create this website copy for you.
				</p>
			</div>

			<div className="relative ">
				<div className="mt-12 grid grid-cols-1 rounded-md dark:border-neutral-800 lg:grid-cols-6 xl:border">
					{features.map((feature) => (
						<FeatureCard key={feature.title} className={feature.className}>
							<FeatureTitle>{feature.title}</FeatureTitle>
							<FeatureDescription>{feature.description}</FeatureDescription>
							<div className=" h-full w-full">{feature.skeleton}</div>
						</FeatureCard>
					))}
				</div>
			</div>
		</div>
	);
}

const FeatureCard = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("relative overflow-hidden p-4 sm:p-8", className)}>
			{children}
		</div>
	);
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
	return (
		<p className=" mx-auto max-w-5xl text-left text-xl tracking-tight text-black dark:text-white md:text-2xl md:leading-snug">
			{children}
		</p>
	);
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
	return (
		<p
			className={cn(
				"mx-auto max-w-4xl  text-left text-sm md:text-base",
				"text-center font-normal text-neutral-500 dark:text-neutral-300",
				"mx-0 my-2 max-w-sm text-left md:text-sm",
			)}
		>
			{children}
		</p>
	);
};

export const SkeletonOne = () => {
	return (
		<div className="relative flex h-full gap-10 px-2 py-8">
			<div className="group  mx-auto  h-full w-full bg-white p-5 shadow-2xl dark:bg-neutral-900">
				<div className="flex h-full w-full flex-1 flex-col space-y-2  ">
					{/* TODO */}
					<Image
						src="/linear.webp"
						alt="header"
						width={800}
						height={800}
						className="aspect-square h-full w-full rounded-sm object-cover object-left-top"
					/>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
			<div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent dark:from-black" />
		</div>
	);
};

export const SkeletonThree = () => {
	return (
		<Link
			href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
			target="__blank"
			className="group/image relative flex  h-full gap-10"
		>
			<div className="group  mx-auto h-full w-full bg-transparent dark:bg-transparent">
				<div className="relative flex h-full w-full flex-1 flex-col  space-y-2">
					{/* TODO */}
					<IconBrandYoutubeFilled className="absolute inset-0 z-10 m-auto h-20 w-20 text-red-500 " />
					<Image
						src="https://assets.aceternity.com/fireship.jpg"
						alt="header"
						width={800}
						height={800}
						className="aspect-square h-full w-full rounded-sm object-cover object-center blur-none transition-all duration-200 group-hover/image:blur-md"
					/>
				</div>
			</div>
		</Link>
	);
};

export const SkeletonTwo = () => {
	const images = [
		"https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	];

	const imageVariants = {
		whileHover: {
			scale: 1.1,
			rotate: 0,
			zIndex: 100,
		},
		whileTap: {
			scale: 1.1,
			rotate: 0,
			zIndex: 100,
		},
	};
	return (
		<div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
			{/* TODO */}
			<div className="-ml-20 flex flex-row">
				{images.map((image, idx) => (
					<motion.div
						variants={imageVariants}
						key={`images-first${idx}`}
						style={{
							rotate: Math.random() * 20 - 10,
						}}
						whileHover="whileHover"
						whileTap="whileTap"
						className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
					>
						<Image
							src={image}
							alt="bali images"
							width="500"
							height="500"
							className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
						/>
					</motion.div>
				))}
			</div>
			<div className="flex flex-row">
				{images.map((image, idx) => (
					<motion.div
						key={`images-second${idx}`}
						style={{
							rotate: Math.random() * 20 - 10,
						}}
						variants={imageVariants}
						whileHover="whileHover"
						whileTap="whileTap"
						className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
					>
						<Image
							src={image}
							alt="bali images"
							width="500"
							height="500"
							className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
						/>
					</motion.div>
				))}
			</div>

			<div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-white  to-transparent dark:from-black" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l  from-white to-transparent dark:from-black" />
		</div>
	);
};

export const SkeletonFour = () => {
	return (
		<div className="relative mt-10  flex h-60 flex-col items-center bg-transparent dark:bg-transparent md:h-60">
			{/* <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" /> */}
		</div>
	);
};
