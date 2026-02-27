"use client";

import React from "react";
import { Check } from "lucide-react";
import { pricingFeatures, type FeatureValue } from "./pricing-data";

function FeatureCell({ value }: { value: FeatureValue }) {
	if (value === true) {
		return (
			<div className="flex justify-center">
				<Check className="h-5 w-5 text-primary" />
			</div>
		);
	}
	if (value === false) {
		return <div className="text-center text-muted-foreground">—</div>;
	}
	return (
		<div className="text-center text-sm text-muted-foreground">{value}</div>
	);
}

export function PricingFeatureTable() {
	const grouped = pricingFeatures.reduce(
		(acc, row) => {
			if (!acc[row.category]) {
				acc[row.category] = [];
			}
			acc[row.category].push(row);
			return acc;
		},
		{} as Record<string, typeof pricingFeatures>,
	);

	return (
		<div className="overflow-x-auto rounded-lg border border-border/50">
			<div className="min-w-[600px]">
				{/* Header */}
				<div className="grid grid-cols-4 border-b border-border/50 bg-muted/10">
					<div className="p-3 text-sm font-medium text-muted-foreground">
						Features
					</div>
					<div className="p-3 text-center text-sm font-medium">Hobby</div>
					<div className="p-3 text-center text-sm font-medium">Startup</div>
					<div className="p-3 text-center text-sm font-medium">Enterprise</div>
				</div>
				{Object.entries(grouped).map(([category, rows]) => (
					<React.Fragment key={category}>
						<div className="border-b border-border/50 bg-muted/20 px-3 py-2">
							<span className="text-sm font-semibold">{category}</span>
						</div>
						{rows.map((row) => (
							<div
								key={`${row.category}-${row.feature}`}
								className="grid grid-cols-4 border-b border-border/30 items-center px-3 py-2 last:border-b-0 hover:bg-muted/5"
							>
								<div className="text-sm text-muted-foreground">
									{row.feature}
								</div>
								<div className="py-2">
									<FeatureCell value={row.hobby as FeatureValue} />
								</div>
								<div className="py-2">
									<FeatureCell value={row.startup as FeatureValue} />
								</div>
								<div className="py-2">
									<FeatureCell value={row.enterprise as FeatureValue} />
								</div>
							</div>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
