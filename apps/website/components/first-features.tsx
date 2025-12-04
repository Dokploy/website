'use client'
import { cn } from '@/lib/utils'
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
} from '@tabler/icons-react'
import { Layers, Lock, UnlockIcon } from 'lucide-react'

export function FirstFeaturesSection() {
	const features = [
		{
			title: 'Flexible Application Deployment',
			description:
				'Deploy any application using Nixpacks, Heroku Buildpacks, or your custom Dockerfile, tailored to your stack.',
			icon: <IconRocket />,
		},
		{
			title: 'Native Docker Compose Support',
			description:
				'Deploy complex applications natively with full Docker Compose integration for seamless orchestration.',
			icon: <Layers />,
		},
		{
			title: 'Multi-server Support',
			description:
				'Effortlessly deploy your applications on remote servers, with zero configuration hassle.',
			icon: <IconCloud />,
		},
		{
			title: 'Advanced User Management',
			description:
				'Control user access with detailed roles and permissions, keeping your deployments secure and organized.',
			icon: <IconUsers />,
		},
		{
			title: 'Database Management with Backups',
			description:
				'Manage and back up MySQL, PostgreSQL, MongoDB, MariaDB, Redis directly from Dokploy.',
			icon: <IconDatabase />,
		},
		{
			title: 'API & CLI Access',
			description:
				'Need custom functionality? Dokploy offers complete API and CLI access to fit your needs.',
			icon: <IconTerminal />,
		},
		{
			title: 'Docker Swarm Clusters',
			description:
				'Scale your deployments seamlessly with built-in Docker Swarm support for robust, multi-node applications.',
			icon: <IconUsers />,
		},
		{
			title: 'Open Source Templates',
			description:
				'Get started quickly with pre-configured templates for popular tools like Supabase, Cal.com, and PocketBase.',
			icon: <IconTemplate />,
		},
		{
			title: 'No Vendor Lock-In',
			description:
				'Experience complete freedom to modify, scale, and customize Dokploy to suit your specific needs.',
			icon: <UnlockIcon />,
		},
		{
			title: 'Real-time Monitoring & Alerts',
			description:
				'Monitor CPU, memory, and network usage in real-time across your deployments for full visibility.',
			icon: <IconActivity />,
		},
		{
			title: 'Built for Developers',
			description:
				'Designed specifically for engineers and developers seeking control and flexibility.',
			icon: <IconTerminal2 />,
		},
		{
			title: 'Self-hosted & Open Source',
			description:
				'Dokploy provides complete control with self-hosting capabilities and open-source transparency.',
			icon: <IconEaseInOut />,
		},
	]
	return (
		<div className="mt-20 flex flex-col items-center  justify-center px-4">
			<h2 className="text-center font-display text-3xl tracking-tight text-primary sm:text-4xl">
				Powerful Deployment Tailored to You
			</h2>
			<p className="mt-4 text-center text-lg  tracking-tight text-muted-foreground">
				Unlock seamless multi-server deployments, advanced user control,
				and flexible database management—all with Dokploy’s
				developer-focused features.
			</p>
			<div className="relative z-10 mx-auto mt-10 grid  max-w-7xl grid-cols-1 py-10 max-sm:mx-0 max-sm:w-full max-sm:p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{features.map((feature, index) => (
					<Feature key={feature.title} {...feature} index={index} />
				))}
			</div>
		</div>
	)
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string
	description: string
	icon: React.ReactNode
	index: number
}) => {
	return (
		<div
			className={cn(
				'group/feature relative flex  flex-col border-neutral-800 py-10 lg:border-r',
				(index === 0 || index === 4 || index === 8) &&
					'dark:border-neutral-800 lg:border-l',
				(index < 4 || index < 8) &&
					'dark:border-neutral-800 lg:border-b',
			)}
		>
			{index < 4 && (
				<div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
			)}
			{index >= 4 && (
				<div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
			)}
			<div className="relative z-10 mb-4 px-10 text-neutral-400">
				{icon}
			</div>
			<div className="relative z-10 mb-2 px-10 text-lg font-bold">
				<div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-700 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-white" />
				<span className="inline-block text-neutral-100 transition duration-200 group-hover/feature:translate-x-2">
					{title}
				</span>
			</div>
			<p className="relative z-10 px-10 text-sm text-neutral-300 lg:max-w-xs">
				{description}
			</p>
		</div>
	)
}
