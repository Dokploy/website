import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dokploy Vs. Coolify Comparison',
	description:
		'Dokploy vs. Coolify at a glance: How to choose the right self-hosted open deployment option for your applications.',
}

export default function DokployVsCoolifyLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}

