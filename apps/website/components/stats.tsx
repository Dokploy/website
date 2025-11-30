'use client'

import { HandCoins, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useId } from 'react'
import NumberTicker from './ui/number-ticker'

const statsValues = {
	githubStars: 26000,
	dockerDownloads: 4000000,
	contributors: 200,
	sponsors: 50,
}

export function StatsSection() {
	const [githubStars, setGithubStars] = useState(statsValues.githubStars)

	useEffect(() => {
		const fetchGitHubStars = async () => {
			try {
				const response = await fetch(
					'/api/github-stars?owner=dokploy&repo=dokploy',
				)

				if (response.ok) {
					const data = await response.json()
					setGithubStars(data.stargazers_count)
				}
			} catch (error) {
				console.error('Error fetching GitHub stars:', error)
				// Keep default value on error
			}
		}

		fetchGitHubStars()
	}, [])

	return (
		<div className="flex flex-col gap-10 px-4 py-20 lg:py-40 ">
			<div className="mx-auto max-w-2xl md:text-center">
				<h2 className="text-center font-display text-3xl  tracking-tight sm:text-4xl">
					Stats You Didn't Ask For (But Secretly Love to See)
				</h2>
				<p className="mt-4 text-center text-lg tracking-tight text-muted-foreground">
					Just a few numbers to show we're not *completely* making
					this up. Turns out, Dokploy has actually helped a few
					people—who knew?
				</p>
			</div>
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-4">
				{grid.map((feature, index) => (
					<div
						key={feature.title}
						className="relative overflow-hidden rounded-3xl bg-gradient-to-b  from-neutral-900 to-neutral-950 p-6"
					>
						<Grid size={20} />

						<p className="relative z-20 flex flex-row items-center gap-4 text-base font-bold text-white">
							{feature.title}
							{feature.icon}
						</p>
						<p className="relative z-20 mt-4 text-base font-normal text-neutral-400">
							{typeof feature.description === 'function'
								? feature.description(githubStars)
								: feature.description}
						</p>
						{typeof feature.component === 'function'
							? feature.component(githubStars)
							: feature.component}
					</div>
				))}
			</div>
		</div>
	)
}

const grid = [
	{
		title: 'GitHub Stars',
		description: (stars: number) =>
			`With over ${(stars / 1000).toFixed(1)}k stars on GitHub, Dokploy is trusted by developers worldwide. Explore our repositories and join our community!`,
		icon: (
			<svg aria-hidden="true" className="h-6 w-6 fill-white">
				<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
			</svg>
		),
		component: (stars: number) => (
			<p className="mt-4 whitespace-pre-wrap text-2xl  !font-semibold  tracking-tighter">
				<NumberTicker value={stars} />+
			</p>
		),
	},
	{
		title: 'DockerHub Downloads',
		description: `Downloaded over ${(statsValues.dockerDownloads / 1000000).toFixed(2).split('.')[0]}M times, Dokploy has become a go-to solution for seamless deployments. Discover our presence on DockerHub.`,
		icon: (
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 640 512"
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 fill-white"
			>
				<path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z" />
			</svg>
		),
		component: (
			<p className="mt-4 whitespace-pre-wrap text-2xl  !font-semibold  tracking-tighter">
				<NumberTicker value={statsValues.dockerDownloads} />+
			</p>
		),
	},
	{
		title: 'Community Contributors',
		description: `Thanks to a growing base of over ${statsValues.contributors} contributors, Dokploy continues to thrive with valuable contributions from developers around the world.`,
		icon: <Users className="h-6 w-6 stroke-white" />,
		component: (
			<p className="mt-4 whitespace-pre-wrap text-2xl !font-semibold  tracking-tighter">
				<NumberTicker value={statsValues.contributors} />+
			</p>
		),
	},
	{
		title: 'Sponsors',
		description: `More than ${statsValues.sponsors} companies/individuals have sponsored Dokploy, ensuring a steady flow of support and resources. Join our community!`,
		icon: <HandCoins className="h-6 w-6 stroke-white" />,
		component: (
			<p className="mt-4 whitespace-pre-wrap text-2xl  !font-semibold tracking-tighter">
				<NumberTicker value={statsValues.sponsors} />+
			</p>
		),
	},
]

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][]
	size?: number
}) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	]
	return (
		<div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r  from-zinc-900/30 to-zinc-900/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
				<GridPattern
					width={size ?? 20}
					height={size ?? 20}
					x="-12"
					y="4"
					squares={p}
					className="absolute inset-0 h-full w-full  fill-white/10 stroke-white/10 mix-blend-overlay  "
				/>
			</div>
		</div>
	)
}

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
	const patternId = useId()

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				strokeWidth={0}
				fill={`url(#${patternId})`}
			/>
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y]: any) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}`}
							width={width + 1}
							height={height + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	)
}
