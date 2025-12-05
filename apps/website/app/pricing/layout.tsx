import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Pricing - Dokploy',
	description:
		'Start for Free, Scale Pricing as You Build. Pricing plans for all your deployment and development needs.',
}

export default function PricingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}

