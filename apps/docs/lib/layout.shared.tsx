import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<div className="flex items-center gap-2">
					<Logo />
					<span>Dokploy</span>
				</div>
			),
			url: "https://dokploy.com",
			children: <NavLinks />,
		},
		githubUrl: "https://github.com/Dokploy/dokploy",
	};
}
