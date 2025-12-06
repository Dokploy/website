import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600 // Revalidate every hour

interface GitHubRelease {
	tag_name: string
	name: string
	published_at: string
	body: string
	html_url: string
	prerelease: boolean
	draft: boolean
}

interface ParsedRelease {
	version: string
	date: string
	title: string
	body: string
	url: string
}

export async function GET() {
	try {
		const response = await fetch(
			'https://api.github.com/repos/Dokploy/dokploy/releases?per_page=100',
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					'User-Agent': 'Dokploy-Website',
				},
				next: {
					revalidate: 3600,
				},
			},
		)

		if (!response.ok) {
			throw new Error(`GitHub API responded with ${response.status}`)
		}

		const releases: GitHubRelease[] = await response.json()

		// Filter out drafts and prereleases, and format the releases
		const parsedReleases: ParsedRelease[] = releases
			.filter((release) => !release.draft && !release.prerelease)
			.map((release) => ({
				version: release.tag_name,
				date: new Date(release.published_at).toLocaleDateString(
					'en-US',
					{
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					},
				),
				title: release.name || release.tag_name,
				body: release.body,
				url: release.html_url,
			}))

		return NextResponse.json(parsedReleases)
	} catch (error) {
		console.error('Error fetching releases:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch releases' },
			{ status: 500 },
		)
	}
}

