"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, ChevronRight, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
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
	const t = useTranslations("HomePage");
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
						<motion.a
							href="#pricing"
							className="relative z-10 mb-4 inline-block"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="z-10 flex items-center justify-center">
								<AnimatedGradientText>
									🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
									<span
										className={cn(
											"inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
										)}
									>
										{t("hero.cloud")}
									</span>
									<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
								</AnimatedGradientText>
							</div>
						</motion.a>

						<motion.h1
							className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-muted-foreground sm:text-7xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							{t("hero.deploy")}{" "}
							<span className="relative whitespace-nowrap  text-primary">
								<svg
									aria-hidden="true"
									viewBox="0 0 418 42"
									className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary"
									preserveAspectRatio="none"
								>
									<path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
								</svg>
								<span className="relative"> {t("hero.anywhere")}</span>
							</span>{" "}
							{t("hero.with")}
						</motion.h1>
						<motion.p
							className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}
						>
							{t("hero.des")}
						</motion.p>
						<motion.div
							className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.4 }}
						>
							<div className="flex flex-col gap-6">
								<div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:flex-nowrap">
									<code className="flex flex-row items-center gap-4 rounded-xl border p-3 font-sans">
										curl -sSL https://dokploy.com/install.sh | sh
										<button
											type="button"
											onClick={() =>
												navigator.clipboard
													.writeText(
														"curl -sSL https://dokploy.com/install.sh | sh",
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
								<div className="mx-auto flex w-full max-w-sm flex-wrap items-center justify-center gap-3 md:flex-nowrap">
									<Button className="w-full  rounded-full" asChild>
										<Link
											href="https://github.com/dokploy/dokploy"
											aria-label="Dokploy on GitHub"
											target="_blank"
											className="flex flex-row items-center gap-2"
										>
											<svg aria-hidden="true" className="h-6 w-6 fill-black">
												<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
											</svg>
											Github
										</Link>
									</Button>
									<Button
										className="w-full rounded-full bg-[#5965F2]  hover:bg-[#4A55E0]"
										asChild
									>
										<Link
											href="https://discord.gg/2tBnJ3jDJc"
											aria-label="Dokploy on GitHub"
											target="_blank"
											className="flex flex-row items-center gap-2 text-white"
										>
											<svg
												role="img"
												className="h-6 w-6 fill-white"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
											</svg>
											{t("navigation.discord")}
										</Link>
									</Button>
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
