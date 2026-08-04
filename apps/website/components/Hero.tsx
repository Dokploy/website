"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedGradientText from "./ui/animated-gradient-text";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { Button } from "./ui/button";
import HeroVideoDialog from "./ui/hero-video-dialog";

// const ProductHunt = () => {
// 	return (
// 		<Link
// 			href="https://www.producthunt.com/posts/dokploy"
// 			target="_blank"
// 			className="relative opacity-70 hover:opacity-100"
// 		>
// 			<svg
// 				xmlns="http://www.w3.org/2000/svg"
// 				width="154.881"
// 				height="35"
// 				viewBox="0 0 122.881 29"
// 			>
// 				<g fill="none">
// 					<path
// 						d="M28.744 14.372c0 7.937 -6.435 14.372 -14.372 14.372C6.434 28.744 0 22.309 0 14.372 0 6.434 6.435 0 14.372 0c7.937 0 14.372 6.435 14.372 14.372"
// 						fill="#DA552F"
// 					/>
// 					<path
// 						d="M16.288 14.372h-4.072v-4.312h4.072a2.156 2.156 0 1 1 0 4.312m0 -7.186H9.342v14.372h2.874v-4.312h4.072c2.778 0 5.03 -2.252 5.03 -5.03S19.066 7.186 16.288 7.186"
// 						fill="#FFF"
// 					/>
// 					<path
// 						d="M43.842 12.615c0 -0.791 -0.608 -1.27 -1.397 -1.27H40.33v2.525h2.117c0.789 0 1.397 -0.479 1.397 -1.255zm-5.517 6.547V9.581h4.402c2.047 0 3.16 1.383 3.16 3.034 0 1.637 -1.128 3.019 -3.16 3.019H40.33v3.528h-2.003zm8.782 0V12.178h1.791v0.917c0.494 -0.593 1.327 -1.086 2.174 -1.086v1.749c-0.128 -0.028 -0.283 -0.042 -0.494 -0.042 -0.593 0 -1.384 0.338 -1.68 0.777v4.67h-1.791zm9.993 -3.584c0 -1.058 -0.622 -1.975 -1.751 -1.975 -1.115 0 -1.735 0.917 -1.735 1.976 0 1.072 0.62 1.989 1.735 1.989 1.129 0 1.75 -0.917 1.75 -1.99m-5.349 0c0 -1.933 1.355 -3.57 3.598 -3.57 2.258 0 3.613 1.637 3.613 3.57s-1.355 3.584 -3.613 3.584c-2.244 0 -3.598 -1.651 -3.598 -3.584m13.241 1.214v-2.413c-0.296 -0.452 -0.945 -0.776 -1.538 -0.776 -1.029 0 -1.735 0.804 -1.735 1.976 0 1.185 0.706 1.989 1.735 1.989 0.593 0 1.242 -0.324 1.538 -0.777zm0 2.371v-1.044c-0.537 0.677 -1.27 1.044 -2.103 1.044 -1.707 0 -3.019 -1.298 -3.019 -3.584 0 -2.215 1.284 -3.57 3.019 -3.57 0.804 0 1.566 0.339 2.103 1.044v-3.471h1.806v9.581zm8.189 0V18.132c-0.465 0.508 -1.283 1.03 -2.399 1.03 -1.495 0 -2.201 -0.818 -2.201 -2.145v-4.84h1.791v4.135c0 0.946 0.494 1.256 1.256 1.256 0.691 0 1.242 -0.381 1.552 -0.777v-4.614h1.792v6.985zm3.138 -3.584c0 -2.088 1.524 -3.57 3.613 -3.57 1.397 0 2.243 0.607 2.695 1.228l-1.172 1.1c-0.324 -0.48 -0.818 -0.733 -1.439 -0.733 -1.087 0 -1.848 0.79 -1.848 1.976 0 1.185 0.761 1.989 1.848 1.989 0.621 0 1.115 -0.282 1.439 -0.748l1.172 1.101c-0.452 0.621 -1.298 1.242 -2.695 1.242 -2.089 0 -3.613 -1.481 -3.613 -3.584m7.849 1.708v-3.542h-1.129v-1.566h1.129v-1.863h1.793v1.863h1.382v1.566h-1.382v3.062c0 0.437 0.225 0.762 0.62 0.762 0.267 0 0.523 -0.099 0.62 -0.211l0.382 1.368c-0.268 0.241 -0.748 0.438 -1.496 0.438 -1.256 0 -1.919 -0.649 -1.919 -1.877m14.653 1.877v-4.135h-4.445v4.135h-2.002V9.581h2.002v3.697h4.445v-3.696h2.018v9.581zm8.431 0V18.132c-0.465 0.508 -1.284 1.03 -2.399 1.03 -1.496 0 -2.201 -0.818 -2.201 -2.145v-4.84h1.791v4.135c0 0.946 0.494 1.256 1.256 1.256 0.691 0 1.242 -0.381 1.552 -0.777v-4.614h1.792v6.985zm8.173 0V14.874c0 -0.946 -0.493 -1.27 -1.255 -1.27 -0.705 0 -1.241 0.395 -1.552 0.79v4.769h-1.791V12.178h1.791v0.875c0.438 -0.508 1.284 -1.044 2.385 -1.044 1.51 0 2.23 0.846 2.23 2.173v4.982zm3.942 -1.877v-3.542h-1.128v-1.566h1.128v-1.863h1.793v1.863h1.382v1.566h-1.382v3.062c0 0.437 0.225 0.762 0.62 0.762 0.268 0 0.523 -0.099 0.621 -0.211l0.38 1.368c-0.267 0.241 -0.748 0.438 -1.496 0.438 -1.256 0 -1.919 -0.649 -1.919 -1.877"
// 						fill="#DA552F"
// 					/>
// 				</g>
// 			</svg>
// 		</Link>
// 	);
// };

export function Hero() {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsCopied(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [isCopied]);
	return (
		<div className="h-[1100px] bg-black pt-20 sm:h-[1100px] lg:pt-32">
			<div className=" bottom-0 flex w-full items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
				<div className="relative px-4">
					<div className="text-center">
						{/* <motion.a
							href="#pricing"
							className="relative z-10 mb-4 inline-block"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="z-10 flex items-center justify-center">
								<AnimatedGradientText>
									🎉{' '}
									<hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{' '}
									<span
										className={cn(
											'inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent',
										)}
									>
										Introducing Dokploy Cloud
									</span>
									<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
								</AnimatedGradientText>
							</div>
						</motion.a> */}

						<motion.h1
							className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-muted-foreground sm:text-7xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							Simplify{" "}
							<span className="relative whitespace-normal lg:whitespace-nowrap text-primary">
								<svg
									aria-hidden="true"
									viewBox="0 0 418 42"
									className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary"
									preserveAspectRatio="none"
								>
									<path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
								</svg>
								<span className="relative">Application and Database</span>
							</span>{" "}
							Deployments
						</motion.h1>
						<motion.p
							className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}
						>
							Manage containerized deployments and AI-built apps across multiple
							servers with ease, thanks to our all-in-one platform for
							developers.
						</motion.p>
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.4 }}
						>
							<div className="flex flex-col gap-6">
								<div className="mx-auto mt-6 flex w-full max-w-sm flex-wrap items-center justify-center gap-3 md:flex-nowrap">
									<Button className="w-full rounded-full" asChild>
										<Link
											href="https://app.dokploy.com/register"
											aria-label="Get Started with Dokploy"
											target="_blank"
										>
											Get Started
										</Link>
									</Button>
									<Button
										className="w-full rounded-full bg-[#5965F2]  hover:bg-[#4A55E0]"
										asChild
									>
										<Link
											href="/contact"
											aria-label="Contact Us"
											className="text-white"
										>
											Contact Us
										</Link>
									</Button>
								</div>
								<div className="flex flex-wrap items-center justify-center gap-6 md:flex-nowrap">
									<code className="flex flex-row items-center gap-4 rounded-xl border p-3 font-sans">
										curl --fail --show-error --location
										https://dokploy.com/install.sh | sudo bash
										<button
											type="button"
											onClick={() =>
												navigator.clipboard
													.writeText(
														"curl --fail --show-error --location https://dokploy.com/install.sh | sudo bash",
													)
													.then(() => setIsCopied(true))
													.catch(() => setIsCopied(false))
											}
										>
											{isCopied ? (
												<Check className="h-4 w-4 text-muted-foreground" />
											) : (
												<Copy className="h-4 w-4 text-muted-foreground" />
											)}
										</button>
									</code>
								</div>
							</div>
						</motion.div>
					</div>
					<motion.div
						className="mx-auto mt-10 max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.6 }}
					>
						<div className="mt-10 flex flex-row justify-center gap-x-8 rounded-lg sm:gap-x-0  sm:gap-y-10 xl:gap-x-12 xl:gap-y-0">
							<HeroVideoDialog
								className="block w-full max-w-md rounded-xl"
								animationStyle="top-in-bottom-out"
								videoSrc="https://www.youtube.com/embed/x2s_Y5ON-ms?si=i6gntgMmyPDLuPih"
								thumbnailSrc="https://dokploy.com/banner.png"
								thumbnailAlt="Hero Video"
							/>
						</div>
					</motion.div>
				</div>
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
			</div>
		</div>
	);
}
