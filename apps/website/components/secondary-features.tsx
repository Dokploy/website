'use client'

import { Tab } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { useTranslations } from '@/lib/intl'

const features = [
	{
		title: 'primaryFeatures.applications',
		description: 'primaryFeatures.applicationsDes',
		image: '/dashboard.png',
	},
	{
		title: 'primaryFeatures.compose',
		description: 'primaryFeatures.composeDes',
		image: '/compose.png',
	},
	{
		title: 'primaryFeatures.multiserver',
		description: 'primaryFeatures.multiserverDes',
		image: '/remote.png',
	},
	{
		title: 'primaryFeatures.logs',
		description: 'primaryFeatures.logsDes',
		image: '/logs.png',
	},
	{
		title: 'primaryFeatures.monitoring',
		description: 'primaryFeatures.monitoringDes',
		image: '/primary/monitoring.png',
	},
	{
		title: 'primaryFeatures.backups',
		description: 'primaryFeatures.backupsDes',
		image: '/backups.png',
	},
	{
		title: 'primaryFeatures.traefik',
		description: 'primaryFeatures.traefikDes',
		image: '/traefik.png',
	},
	{
		title: 'primaryFeatures.templates',
		description: 'primaryFeatures.templatesDes',
		image: '/templates.png',
	},
]

export function SecondaryFeaturesSections() {
	const t = useTranslations('HomePage')
	const [tabOrientation, setTabOrientation] = useState<
		'horizontal' | 'vertical'
	>('horizontal')

	useEffect(() => {
		const lgMediaQuery = window.matchMedia('(min-width: 1024px)')

		function onMediaQueryChange({ matches }: { matches: boolean }) {
			setTabOrientation(matches ? 'vertical' : 'horizontal')
		}

		onMediaQueryChange(lgMediaQuery)
		lgMediaQuery.addEventListener('change', onMediaQueryChange)

		return () => {
			lgMediaQuery.removeEventListener('change', onMediaQueryChange)
		}
	}, [])

	const [isMounted, setIsMounted] = useState(false)

	// Cambiar isMounted a true después del primer render
	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<section
			id="features"
			aria-label="Features for running your books"
			className="relative overflow-hidden bg-black pb-28 pt-20 sm:py-32"
		>
			{/* <div class="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" /> */}

			{/* <Image
				className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
				src={backgroundImage}
				alt=""
				width={2245}
				height={1636}
				unoptimized
			/> */}
			<div className="relative mx-auto max-w-7xl max-lg:px-4">
				<div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
					<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
						{t('primaryFeatures.title')}
					</h2>
					<p className="mt-6 text-lg tracking-tight text-muted-foreground">
						{t('primaryFeatures.des')}
					</p>
				</div>
				<Tab.Group
					as="div"
					className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20"
					vertical={false}
				>
					{({ selectedIndex }) => (
						<>
							<div className="-mx-4 flex overflow-visible overflow-x-auto pb-4 sm:mx-0 sm:pb-0">
								<Tab.List
									aria-description="primary feature tabs"
									aria-roledescription="primary feature tabs"
									className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 "
								>
									{features.map((feature, featureIndex) => (
										<motion.div
											layout
											initial={false}
											key={`feature-${featureIndex}`}
											className={cn(
												'group relative rounded-full px-4 py-1 transition-colors ',
											)}
										>
											<AnimatePresence>
												{selectedIndex ===
													featureIndex && (
													<motion.span
														layoutId="tab"
														className="absolute inset-0 z-10 rounded-full bg-white/5 mix-blend-difference"
														initial={{ opacity: 1 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														transition={{
															type: 'spring',
															bounce: 0.2,
															duration: 0.5,
														}}
													/>
												)}
											</AnimatePresence>
											<h3>
												<Tab
													className={cn(
														'font-display text-lg text-primary ui-not-focus-visible:outline-none',
													)}
												>
													<span className="absolute inset-0 rounded-full" />
													{t(feature.title)}
												</Tab>
											</h3>
											<p
												className={cn(
													'mt-2 hidden text-sm text-muted-foreground ',
												)}
											>
												{t(feature.description)}
											</p>
										</motion.div>
									))}
								</Tab.List>
							</div>
							<Tab.Panels className="">
								{features.map((feature, index) => (
									<Tab.Panel key={`panel-${index}`}>
										<div className="relative sm:px-6 ">
											<div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-card/60 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
											<p className="relative mx-auto mb-10 max-w-2xl text-base text-white sm:text-center">
												{t(feature.description)}
											</p>
										</div>

										<motion.div
											key={feature.title}
											initial={
												isMounted
													? { opacity: 0.4 }
													: {}
											}
											animate={
												isMounted ? { opacity: 1 } : {}
											}
											exit={{ opacity: 0, x: -50 }}
											transition={{
												type: 'spring',
												bounce: 0.2,
												duration: 0.8,
											}}
											className="mt-10 h-[24rem] w-[45rem] overflow-hidden rounded-xl border shadow-xl sm:w-auto  lg:mt-0 lg:h-[40rem] "
										>
											<div className="relative w-full">
												<div className="mx-auto">
													<div className="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg bg-card px-3">
														<span className="h-3 w-3 rounded-full bg-red-400" />
														<span className="h-3 w-3 rounded-full bg-yellow-400" />
														<span className="h-3 w-3 rounded-full bg-green-400" />
													</div>
													<div className="h-96 w-full bg-gray-100">
														<img
															src={feature.image}
															alt={feature.title}
														/>
													</div>
												</div>
											</div>
										</motion.div>
									</Tab.Panel>
								))}
							</Tab.Panels>
						</>
					)}
				</Tab.Group>
			</div>
		</section>
	)
}
