import { ROUTES } from "../../config";

import { MainNavigationItem } from "./main-navigation-item";

export const MAIN_NAVIGATION_ITEMS = [
	{ label: "Overview", href: ROUTES.Overview },
	{ label: "Features", href: ROUTES.Features },
	{ label: "Pricing", href: ROUTES.Pricing },
	{ label: "About", href: ROUTES.About }
] as const;

export const MainNavigation = () => {
	return (
		<nav className="max-md:hidden" aria-label="Primary">
			<ul className="flex items-center gap-x-[3.236rem] font-(family-name:--font-barlow) text-(--white-pallete-100) font-bold text-[0.875rem] leading-[1rem] tracking-[0.01em]">
				{MAIN_NAVIGATION_ITEMS.map(({ href, label }) => (
					<MainNavigationItem key={href} href={href} label={label} />
				))}
			</ul>
		</nav>
	);
};
