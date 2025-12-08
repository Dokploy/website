"use client";
import { PlusCircleIcon } from "lucide-react";
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
	return (
		<div className="mt-20 flex w-full flex-col justify-center gap-y-10 ">
			<div className="flex flex-col justify-start gap-4  px-4">
				<h3 className="mx-auto max-w-2xl text-center font-display text-3xl font-medium  tracking-tight  text-primary sm:text-5xl">
					Sponsors
				</h3>
				<p className="mx-auto max-w-2xl text-center text-lg tracking-tight text-muted-foreground">
					Dokploy is an open source project that is maintained by a community of
					volunteers. We would like to thank our sponsors for their support and
					contributions to the project, which help us to continue to develop and
					improve Dokploy.
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
									className: "m-0 w-fit  !rounded-full bg-transparent !p-0",
								})}
							>
								<PlusCircleIcon className="size-10 text-muted-foreground transition-colors hover:text-primary" />
							</Link>
						</TooltipTrigger>
						<TooltipContent className="z-[200] w-[200px] rounded-lg border-0 bg-black text-center font-semibold text-white">
							Become a sponsor 🤑
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<Ripple />
			</div>
		</div>
	);
};
