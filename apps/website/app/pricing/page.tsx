'use client'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PricingPage() {
	const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
	const [servers, setServers] = useState(1)

	const calculatePrice = () => {
		const basePrice = 0
		const serverPrice = 3.5
		const additionalServers = Math.max(0, servers - 1)
		const monthlyTotal = basePrice + additionalServers * serverPrice

		if (billing === 'annual') {
			return (monthlyTotal * 12 * 0.8).toFixed(2) // 20% discount
		}
		return monthlyTotal.toFixed(2)
	}

	return (
		<div className="bg-black">
			<main>
				{/* Hero Section */}
				<section className="relative overflow-hidden bg-black px-4 py-20 lg:py-32">
					<div className="bottom-0 flex w-full items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
						<div className="relative px-4">
							<Container>
								<div className="mx-auto max-w-4xl text-center">
									<h1 className="font-display text-4xl font-medium tracking-tight text-white sm:text-6xl">
										Start for Free, Scale Pricing as You Build
									</h1>
									<p className="mt-6 text-lg tracking-tight text-muted-foreground">
										Pricing plans for all your deployment and
										development needs.
									</p>

									{/* Billing Toggle */}
									<div className="mt-10 flex items-center justify-center gap-4">
										<button
											type="button"
											onClick={() => setBilling('monthly')}
											className={cn(
												'rounded-full px-6 py-2 text-sm font-medium transition-colors',
												billing === 'monthly'
													? 'bg-primary text-black'
													: 'text-muted-foreground hover:text-white',
											)}
										>
											Monthly
										</button>
										<span className="text-muted-foreground">|</span>
										<button
											type="button"
											onClick={() => setBilling('annual')}
											className={cn(
												'rounded-full px-6 py-2 text-sm font-medium transition-colors',
												billing === 'annual'
													? 'bg-primary text-black'
													: 'text-muted-foreground hover:text-white',
											)}
										>
											Annual
										</button>
									</div>
								</div>
							</Container>
						</div>
						<AnimatedGridPattern
							numSquares={30}
							maxOpacity={0.1}
							height={40}
							width={40}
							duration={3}
							repeatDelay={1}
							className={cn(
								'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
								'absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
							)}
						/>
					</div>
				</section>

				{/* Pricing Cards */}
				<section className="py-20">
					<Container>
						<div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
							{/* Open Source Plan */}
							<div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-muted/10 to-transparent p-8">
								<div className="relative z-10">
									<div className="mb-6">
										<h3 className="text-2xl font-bold text-white">
											Open source
										</h3>
										<p className="mt-2 text-sm text-muted-foreground">
											Free Forever
										</p>
									</div>

									<p className="mb-8 text-muted-foreground">
										Install and manage Dokploy UI on your own
										server.
									</p>

									<div className="mb-8 space-y-4">
										{openSourceFeatures.map((feature, index) => (
											<div
												key={index}
												className="flex items-start gap-3"
											>
												<Check className="h-5 w-5 shrink-0 text-primary" />
												<span className="text-sm text-muted-foreground">
													{feature}
												</span>
											</div>
										))}
									</div>

									<Button className="w-full rounded-full" asChild>
										<Link
											href="https://docs.dokploy.com/docs/core/get-started/installation"
											target="_blank"
										>
											Start deploying →
										</Link>
									</Button>
								</div>
							</div>
							{/* Scale Plan */}
							<div className="relative overflow-hidden rounded-2xl border-2 border-primary/50 bg-gradient-to-b from-primary/10 to-transparent p-8">
								<div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">
									Popular
								</div>
								<div className="relative z-10">
									<div className="mb-6">
										<h3 className="text-2xl font-bold text-primary">
											Plan
										</h3>
										<p className="mt-2 text-sm text-white">
											Scale as You Build
										</p>
									</div>

									<p className="mb-8 text-muted-foreground">
										The same features as OSS, just managed by us.
									</p>

									<div className="mb-8 space-y-4">
										{scaleFeatures.map((feature, index) => (
											<div
												key={index}
												className="flex items-start gap-3"
											>
												<Check className="h-5 w-5 shrink-0 text-primary" />
												<span className="text-sm text-muted-foreground">
													{feature}
												</span>
											</div>
										))}
									</div>

									{/* Server Selector */}
									<div className="mb-6 rounded-xl border border-border/30 bg-black/20 p-6">
										<label
											htmlFor="servers"
											className="mb-4 block text-sm font-medium text-white"
										>
											No. of Servers (You bring the servers)
										</label>
										<input
											id="servers"
											type="range"
											min="1"
											max="20"
											value={servers}
											onChange={(e) =>
												setServers(Number(e.target.value))
											}
											className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted-foreground/20"
											style={{
												background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((servers - 1) / 19) * 100}%, rgb(255 255 255 / 0.2) ${((servers - 1) / 19) * 100}%, rgb(255 255 255 / 0.2) 100%)`,
											}}
										/>
										<div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
											<span>1 server</span>
											<span className="font-semibold text-white">
												{servers}{' '}
												{servers === 1 ? 'server' : 'servers'}
											</span>
											<span>20 servers</span>
										</div>

										<div className="mt-6 border-t border-border/30 pt-6">
											<div className="flex items-baseline justify-between">
												<span className="text-sm text-muted-foreground">
													{billing === 'annual'
														? 'Annual'
														: 'Monthly'}{' '}
													total
												</span>
												<div className="text-right">
													<span className="text-3xl font-bold text-white">
														${calculatePrice()}
													</span>
													<span className="text-sm text-muted-foreground">
														/{billing === 'annual' ? 'year' : 'month'}
													</span>
												</div>
											</div>
											{billing === 'annual' && (
												<p className="mt-2 text-xs text-primary">
													Save 20% with annual billing
												</p>
											)}
											<p className="mt-2 text-xs text-muted-foreground">
												$3.50 per additional server
											</p>
										</div>
									</div>

									<Button
										className="w-full rounded-full bg-primary hover:bg-primary/90"
										asChild
									>
										<Link href="/contact">Contact sales</Link>
									</Button>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* FAQ or Additional Info Section */}
				<section className="border-t border-border/30 py-20">
					<Container>
						<div className="mx-auto max-w-3xl text-center">
							<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
								Questions about pricing?
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Our team is here to help you choose the right plan for
								your needs.
							</p>
							<Button className="mt-8 rounded-full" asChild>
								<Link href="/contact">Get in touch</Link>
							</Button>
						</div>
					</Container>
				</section>
			</main>
		</div>
	)
}

// Data
const openSourceFeatures = [
	'Self-hosted Infrastructure',
	'Community support',
	'Access to core features',
	'Access to all updates',
	'Unlimited servers',
]

const scaleFeatures = [
	'Managed hosting',
	'Unlimited deployments',
	'Unlimited databases',
	'Unlimited applications',
	'Unlimited users',
	'Remote servers monitoring',
	'Priority support',
]

