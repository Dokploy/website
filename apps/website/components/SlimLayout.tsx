import Link from 'next/link'

export function SlimLayout() {
	return (
		<>
			<main className="flex flex-auto items-center justify-center text-center">
				<div>
					<h1 className="mb-4 text-6xl font-semibold text-primary">
						404
					</h1>
					<p className="mb-4 text-lg text-muted-foreground">
						Not found.
					</p>
					<p className="mt-4 text-muted-foreground">
						Go back to home
						<Link href="/" className="text-primary">
							Go back to home
						</Link>
						.
					</p>
				</div>
			</main>
		</>
	)
}
