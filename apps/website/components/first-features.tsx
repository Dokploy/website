"use client";
import { cn } from "@/lib/utils";
import {
	IconActivity,
	IconCloud,
	IconDatabase,
	IconEaseInOut,
	IconRocket,
	IconTemplate,
	IconTerminal,
	IconTerminal2,
	IconUsers,
} from "@tabler/icons-react";
import { Layers, UnlockIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function FirstFeaturesSection() {
	const t = useTranslations("HomePage");

	const features = [
		{
			title: t("firstFeatures.features.f1.title"),
			description: t("firstFeatures.features.f1.description"),
			icon: <IconRocket />,
		},
		{
			title: t("firstFeatures.features.f2.title"),
			description: t("firstFeatures.features.f2.description"),
			icon: <Layers />,
		},
		{
			title: t("firstFeatures.features.f3.title"),
			description: t("firstFeatures.features.f3.description"),
			icon: <IconCloud />,
		},
		{
			title: t("firstFeatures.features.f4.title"),
			description: t("firstFeatures.features.f4.description"),
			icon: <IconUsers />,
		},
		{
			title: t("firstFeatures.features.f5.title"),
			description: t("firstFeatures.features.f5.description"),
			icon: <IconDatabase />,
		},
		{
			title: t("firstFeatures.features.f6.title"),
			description: t("firstFeatures.features.f6.title"),
			icon: <IconTerminal />,
		},
		{
			title: t("firstFeatures.features.f7.title"),
			description: t("firstFeatures.features.f7.description"),
			icon: <IconUsers />,
		},
		{
			title: t("firstFeatures.features.f8.title"),
			description: t("firstFeatures.features.f8.description"),
			icon: <IconTemplate />,
		},
		{
			title: t("firstFeatures.features.f9.title"),
			description: t("firstFeatures.features.f9.description"),
			icon: <UnlockIcon />,
		},
		{
			title: t("firstFeatures.features.f10.title"),
			description: t("firstFeatures.features.f10.description"),
			icon: <IconActivity />,
		},
		{
			title: t("firstFeatures.features.f11.title"),
			description: t("firstFeatures.features.f11.description"),
			icon: <IconTerminal2 />,
		},
		{
			title: t("firstFeatures.features.f12.title"),
			description: t("firstFeatures.features.f12.description"),
			icon: <IconEaseInOut />,
		},
	];
	return (
		<div className="flex flex-col justify-center items-center  mt-20 px-4">
			<h2 className="font-display text-3xl tracking-tight text-primary sm:text-4xl text-center">
				{t("firstFeatures.title")}
			</h2>
			<p className="mt-4 text-lg tracking-tight  text-muted-foreground text-center">
				{t("firstFeatures.description")}
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto mt-10 max-sm:p-0 max-sm:mx-0 max-sm:w-full">
				{features.map((feature, index) => (
					<Feature key={feature.title} {...feature} index={index} />
				))}
			</div>
		</div>
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800",
				(index === 0 || index === 4 || index === 8) &&
					"lg:border-l dark:border-neutral-800",
				(index < 4 || index < 8) && "lg:border-b dark:border-neutral-800",
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10 text-neutral-400">{icon}</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-white transition-all duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
					{title}
				</span>
			</div>
			<p className="text-sm text-neutral-300 lg:max-w-xs relative z-10 px-10">
				{description}
			</p>
		</div>
	);
};
