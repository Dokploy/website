"use client";
import { PlusCircleIcon } from "lucide-react";
import { useTranslations } from "@/lib/intl";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Ripple from "./ui/ripple";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

export const Sponsors = () => {
	const t = useTranslations("HomePage");
	return (
		<div className="mt-20 flex flex-col justify-center gap-y-10 w-full ">
			<div className="flex flex-col justify-start gap-4  px-4">
				<h3 className="mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight  text-primary  sm:text-5xl text-center">
					{t("hero.sponsors.title")}
				</h3>
				<p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground text-center">
					{t("hero.sponsors.description")}
				</p>
			</div>
			<div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
				<TooltipProvider delayDuration={100}>
					<Tooltip>
						<TooltipTrigger className="z-10 m-0 p-0">
							<Link
								href={"https://opencollective.com/dokploy"}
								target="_blank"
								className={buttonVariants({
									variant: "secondary",
									size: "sm",
									className: "bg-transparent !rounded-full  w-fit !p-0 m-0",
								})}
							>
								<PlusCircleIcon className="size-10 text-muted-foreground hover:text-primary transition-colors" />
							</Link>
						</TooltipTrigger>
						<TooltipContent className="bg-black rounded-lg border-0 text-center w-[200px] z-[200] text-white font-semibold">
							Become a sponsor 🤑
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<Ripple />
			</div>
		</div>
	);
};
