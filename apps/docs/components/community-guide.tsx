import { Callout } from "fumadocs-ui/components/callout";

interface CommunityGuideProps {
	/** GitHub username of the guide's author */
	contributor: string;
	/** Dokploy version and/or date the guide was last verified against, e.g. "v0.28.6 (May 2026)" */
	lastTested?: string;
}

export function CommunityGuide({
	contributor,
	lastTested,
}: CommunityGuideProps) {
	return (
		<Callout type="info" title="Community Guide">
			This guide was contributed by{" "}
			<a
				href={`https://github.com/${contributor}`}
				target="_blank"
				rel="noreferrer noopener"
			>
				@{contributor}
			</a>{" "}
			and is maintained by the community. It is not officially supported by the
			Dokploy team, and steps may vary depending on your environment.
			{lastTested ? (
				<>
					{" "}
					Last tested with Dokploy <code>{lastTested}</code>.
				</>
			) : null}
		</Callout>
	);
}
