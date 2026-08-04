import { type Template, getTemplateLogoUrl } from "@/lib/templates";
import Link from "next/link";

interface TemplateCardProps {
	template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
	return (
		<Link
			href={`/templates/${template.id}`}
			className="group flex flex-col gap-3 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary/50 hover:bg-muted/30"
		>
			<div className="flex items-center gap-3">
				<img
					src={getTemplateLogoUrl(template)}
					alt={`${template.name} logo`}
					width={40}
					height={40}
					loading="lazy"
					decoding="async"
					className="h-10 w-10 shrink-0 rounded-md object-contain"
				/>
				<div className="min-w-0">
					<h3 className="truncate font-semibold text-foreground group-hover:text-primary">
						{template.name}
					</h3>
					<p className="text-xs text-muted-foreground">
						Version: {template.version}
					</p>
				</div>
			</div>
			<p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
				{template.description}
			</p>
			{template.tags.length > 0 && (
				<div className="mt-auto flex flex-wrap gap-1.5">
					{template.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</Link>
	);
}
