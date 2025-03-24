import Link from "next/link";
import { useParams } from "next/navigation";

export const SERVER_LICENSE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:4002/api"
		: "https://licenses.dokploy.com";

const LicenseCard = ({ license, stripeSuscription }: any) => {
	return (
		<div className="bg-card backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-lg shadow-xl p-6 border border-border h-full">
			<div className="space-y-6">
				{/* License Information Section */}
				<div>
					<h2 className="text-xl font-bold text-foreground mb-4">
						License Information
					</h2>
					<div className="grid grid-cols-1 gap-4">
						<div>
							<p className="text-sm font-semibold text-muted-foreground">
								License Key
							</p>
							<p className="text-foreground break-all">{license.licenseKey}</p>
						</div>
						<div>
							<p className="text-sm font-semibold text-muted-foreground">
								Server IPs
							</p>
							{license.serverIps && license.serverIps.length > 0 ? (
								<div className="space-y-1">
									{license.serverIps.map((ip: string, index: number) => (
										<p key={ip} className="text-foreground">
											{ip}
										</p>
									))}
								</div>
							) : (
								<p className="text-muted-foreground italic">
									Not activated on any machine
								</p>
							)}
						</div>
						<div>
							<p className="text-sm font-semibold text-muted-foreground">
								Last Verification
							</p>
							<p className="text-foreground">
								{license.lastVerifiedAt || "Not Verified"}
							</p>
						</div>
						<div>
							<p className="text-sm font-semibold text-muted-foreground">
								Created At
							</p>
							<p className="text-foreground">
								{new Date(license.createdAt).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>

				<div>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold text-foreground">
							Subscription Information
						</h2>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<div>
							<p className="text-sm font-semibold text-muted-foreground">
								Quantity
							</p>
							<p className="text-foreground">
								{stripeSuscription.quantity} licenses
							</p>
						</div>
						<div>
							<p className="text-sm font-semibold text-muted-foreground">
								Billing Type
							</p>
							<p className="text-foreground capitalize">
								{stripeSuscription.billingType}
							</p>
						</div>
					</div>
				</div>

				<div className="pt-4">
					<button
						type="button"
						className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
					>
						<span>Manage Subscription</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export const ViewLicensePage = async ({
	searchParams,
}: {
	searchParams: Promise<{ temporalId: string }>;
}) => {
	const newParams = await searchParams;
	const temporalId = newParams.temporalId;
	const licences = await fetch(
		`${SERVER_LICENSE_URL}/license/all?temporalId=${temporalId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const data = await licences.json();

	if (!data.success) {
		return (
			<div className="container mx-auto py-8 px-4">
				<h1 className="text-3xl font-bold text-foreground mb-8 text-center">
					License Details
				</h1>
				<span className="text-destructive text-center flex flex-col gap-2">
					{data.error}, Please try again in
					<Link
						href="/reset-license"
						className="text-primary hover:text-primary/90"
					>
						Reset License
					</Link>
				</span>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="flex flex-col gap-6">
				<h1 className="text-3xl font-bold text-foreground text-center">
					License Details
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{data?.licenses?.map((item: any) => (
						<LicenseCard
							key={item.license.id}
							license={item.license}
							stripeSuscription={item.stripeSuscription}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ViewLicensePage;
