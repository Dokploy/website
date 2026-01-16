"use client";
import React from "react";

import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";
interface RippleProps {
	mainCircleSize?: number;
	mainCircleOpacity?: number;
	numCircles?: number;
	className?: string;
}

type AvatarItem = {
	name: string;
	image: string;
	link: string;
	type: "hero" | "premium" | "elite" | "supporting" | "community";
};

const Ripple = React.memo(function Ripple({
	mainCircleSize = 210,
	mainCircleOpacity = 0.24,
	numCircles = 8,
	className,
}: RippleProps) {
	const heroSponsors: AvatarItem[] = [
		{
			name: "Hostinger",
			image: "https://avatars.githubusercontent.com/u/2630767?s=200&v=4",
			link: "https://www.hostinger.com/vps-hosting?ref=dokploy",
			type: "hero",
		},
		{
			name: "LinkDR",
			image: "linkdr-logo.svg",
			link: "https://linkdr.com/?ref=dokploy",
			type: "supporting",
		},
		{
			name: "Lxaer",
			image:
				"https://raw.githubusercontent.com/Dokploy/dokploy/canary/.github/sponsors/lxaer.png",
			link: "https://www.lxaer.com?ref=dokploy",
			type: "hero",
		},
		{
			name: "LambdaTest",
			image: "https://www.lambdatest.com/blue-logo.png",
			link: "https://www.lambdatest.com/?utm_source=dokploy&utm_medium=sponsor",
			type: "premium",
		},
	];
	const premiumSponsors = [
		{
			name: "Supafort",
			image: "supafort.png",
			link: "https://supafort.com/?ref=dokploy",
			type: "premium",
		},
		{
			name: "AgentDock",
			image:
				"https://raw.githubusercontent.com/Dokploy/dokploy/refs/heads/canary/.github/sponsors/agentdock.png",
			link: "https://agentdock.ai/?ref=dokploy",
			type: "premium",
		},
	];

	const eliteSponsors = [
		{
			name: "AmericanCloud",
			image:
				"https://media.licdn.com/dms/image/v2/D560BAQGQ0rVfEgLUMQ/company-logo_200_200/company-logo_200_200/0/1722459194382/americancloud_logo?e=2147483647&v=beta&t=990H-OldnorPQbgbN3jHihJijOb2aDmhwFl8DU_d680",
			link: "https://americancloud.com/?ref=dokploy",
			type: "elite",
		},
		{
			name: "Tolgee",
			image: "tolgee-logo.png",
			link: "https://tolg.ee/hrszh9",
			type: "elite",
		},
	];

	const supportingSponsors = [
		{
			name: "Cloudblast",
			image: "https://cloudblast.io/img/logo-icon.193cf13e.svg",
			link: "https://cloudblast.io/?ref=dokploy",
			type: "supporting",
		},
		
		{
			name: "Synexa",
			image:
				"https://raw.githubusercontent.com/Dokploy/dokploy/refs/heads/canary/.github/sponsors/synexa.png",
			link: "https://synexa.ai/?ref=dokploy",
			type: "supporting",
		},
		{
			name: "HahuCloud",
			image: "hahucloud_logo_1.png",
			link: "https://www.hahucloud.com/?ref=dokploy",
			type: "supporting",
		},
		{
			name: "Teramont",
			image: "terramont.ico",
			link: "https://teramont.net/dokploy",
			type: "supporting",
		},
	];

	const communitySponsors = [];

	return (
		<div
			className={cn(
				// "pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
				className,
			)}
		>
			<div>
				{Array.from({ length: numCircles }, (_, i) => {
					const size = mainCircleSize + i * 70;
					const opacity = mainCircleOpacity - i * 0.03;
					const animationDelay = `${i * 0.06}s`;
					const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
					const borderOpacity = 5 + i * 5;

					return (
						<div
							key={i}
							className={`absolute animate-ripple rounded-full border bg-foreground/25 shadow-xl [--i:${i}]`}
							style={{
								width: `${size}px`,
								height: `${size}px`,
								opacity,
								animationDelay,
								borderStyle,
								borderWidth: "1px",
								borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%) scale(1)",
							}}
						/>
					);
				})}
				{Array.from({ length: numCircles }, (_, i) => {
					const size = mainCircleSize + i * 70;
					const opacity = mainCircleOpacity - i * 0.03;
					const animationDelay = `${i * 0.06}s`;
					const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
					const borderOpacity = 5 + i * 5;

					return (
						<div
							key={i}
							className={`absolute z-30 animate-ripple rounded-full  border shadow-xl [--i:${i}]`}
							style={{
								animationDelay,
								borderStyle,
								borderWidth: "1px",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%) scale(1)",
							}}
						>
							{i === 0 && (
								<div className="relative flex h-full w-full items-center justify-center">
									{heroSponsors.map((item, index) => {
										const angle = (360 / heroSponsors.length) * index;
										const radius = mainCircleSize / 2;
										const x = radius * Math.cos((angle * Math.PI) / 180);
										const y = radius * Math.sin((angle * Math.PI) / 180);
										const initials = item.name
											.split(" ")
											.map((n) => n[0])
											.join("");

										return (
											<div
												key={index}
												className="absolute"
												style={{
													top: "50%",
													left: "50%",
													transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
												}}
											>
												<TooltipProvider delayDuration={100}>
													<Tooltip>
														<TooltipTrigger>
															<Link href={item.link} target="_blank">
																<Avatar className="border-2 border-red-600">
																	<AvatarImage
																		src={item.image}
																		alt={item.name}
																		className="object-contain"
																	/>
																	<AvatarFallback>{initials}</AvatarFallback>
																</Avatar>
															</Link>
														</TooltipTrigger>
														<TooltipPrimitive.Portal>
															<TooltipContent>
																<p className="text-xs font-semibold ">
																	{item.name}
																</p>
															</TooltipContent>
														</TooltipPrimitive.Portal>
													</Tooltip>
												</TooltipProvider>
											</div>
										);
									})}
								</div>
							)}

							{i === 1 && (
								<div className="relative flex h-full w-full items-center justify-center">
									{premiumSponsors.map((item, index) => {
										const angle = (360 / premiumSponsors.length) * index;
										const radius = mainCircleSize / 2 + 70;
										const x = radius * Math.cos((angle * Math.PI) / 180);
										const y = radius * Math.sin((angle * Math.PI) / 180);
										const initials = item.name
											.split(" ")
											.map((n) => n[0])
											.join("");
										return (
											<div
												key={index}
												className="absolute"
												style={{
													top: "50%",
													left: "50%",
													transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
												}}
											>
												<TooltipProvider delayDuration={100}>
													<Tooltip>
														<TooltipTrigger>
															<Link href={item.link} target="_blank">
																<Avatar className="border-2 border-yellow-500">
																	<AvatarImage
																		src={item.image}
																		alt={item.name}
																	/>
																	<AvatarFallback>{initials}</AvatarFallback>
																</Avatar>
															</Link>
														</TooltipTrigger>
														<TooltipPrimitive.Portal>
															<TooltipContent>
																<p className="text-xs font-semibold ">
																	{item.name}
																</p>
															</TooltipContent>
														</TooltipPrimitive.Portal>
													</Tooltip>
												</TooltipProvider>
											</div>
										);
									})}
								</div>
							)}

							{i === 2 && (
								<div className="relative flex h-full w-full items-center justify-center">
									{eliteSponsors.map((item, index) => {
										const angle = (360 / eliteSponsors.length) * index;
										const radius = mainCircleSize / 2 + 100;
										const x = radius * Math.cos((angle * Math.PI) / 180);
										const y = radius * Math.sin((angle * Math.PI) / 180);
										const initials = item.name
											.split(" ")
											.map((n) => n[0])
											.join("");
										return (
											<div
												key={index}
												className="absolute"
												style={{
													top: "50%",
													left: "50%",
													transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
												}}
											>
												<TooltipProvider delayDuration={100}>
													<Tooltip>
														<TooltipTrigger>
															<Link href={item.link} target="_blank">
																<Avatar className="border-2 border-yellow-900">
																	<AvatarImage
																		src={item.image}
																		alt={item.name}
																	/>
																	<AvatarFallback>{initials}</AvatarFallback>
																</Avatar>
															</Link>
														</TooltipTrigger>
														<TooltipPrimitive.Portal>
															<TooltipContent>
																<p className="text-xs font-semibold ">
																	{item.name}
																</p>
															</TooltipContent>
														</TooltipPrimitive.Portal>
													</Tooltip>
												</TooltipProvider>
											</div>
										);
									})}
								</div>
							)}
							{i === 3 && (
								<div className="relative flex h-full w-full items-center justify-center">
									{supportingSponsors.map((item, index) => {
										const angle = (360 / supportingSponsors.length) * index;
										const radius = mainCircleSize / 2 + 140;
										const x = radius * Math.cos((angle * Math.PI) / 180);
										const y = radius * Math.sin((angle * Math.PI) / 180);
										const initials = item.name
											.split(" ")
											.map((n) => n[0])
											.join("");
										return (
											<div
												key={index}
												className="absolute"
												style={{
													top: "50%",
													left: "50%",
													transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
												}}
											>
												<TooltipProvider delayDuration={100}>
													<Tooltip>
														<TooltipTrigger>
															<Link href={item.link} target="_blank">
																<Avatar className="border-2 border-yellow-900">
																	<AvatarImage
																		src={item.image}
																		alt={item.name}
																	/>
																	<AvatarFallback>{initials}</AvatarFallback>
																</Avatar>
															</Link>
														</TooltipTrigger>
														<TooltipPrimitive.Portal>
															<TooltipContent>
																<p className="text-xs font-semibold ">
																	{item.name}
																</p>
															</TooltipContent>
														</TooltipPrimitive.Portal>
													</Tooltip>
												</TooltipProvider>
											</div>
										);
									})}
								</div>
							)}

							{i === 4 && (
								<div className="relative flex h-full w-full items-center justify-center">
									{communitySponsors.map((item, index) => {
										const angle = (360 / communitySponsors.length) * index;
										const radius = mainCircleSize / 2 + 180;
										const x = radius * Math.cos((angle * Math.PI) / 180);
										const y = radius * Math.sin((angle * Math.PI) / 180);
										const initials = item.name
											.split(" ")
											.map((n) => n[0])
											.join("");
										return (
											<div
												key={index}
												className="absolute"
												style={{
													top: "50%",
													left: "50%",
													transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
												}}
											>
												<TooltipProvider delayDuration={100}>
													<Tooltip>
														<TooltipTrigger>
															<Link href={item.link} target="_blank">
																<Avatar className="border-2 border-yellow-500">
																	<AvatarImage
																		src={item.image}
																		alt={item.name}
																	/>
																	<AvatarFallback>{initials}</AvatarFallback>
																</Avatar>
															</Link>
														</TooltipTrigger>
														<TooltipContent>
															<p className="text-xs font-semibold ">
																{item.name}
															</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
});

Ripple.displayName = "Ripple";

export default Ripple;
