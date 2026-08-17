"use client";

import { NavigationLinkHighlight, useNavigationLinkHighlight } from "@shared/ui";

import { MAIN_NAVIGATION_ITEMS } from "../config";

import { MainNavigationLink } from "./main-navigation-link";

export const MainNavigation = () => {
	const { activeLinkId, routeActiveLinkId, handleLinkSelection, handleLinkUnselection } =
		useNavigationLinkHighlight(MAIN_NAVIGATION_ITEMS);

	return (
		<nav className="relative mx-[0.75rem] py-[1rem] transition-[margin] duration-300 ease-out group-data-[collapsed=true]/sidebar:mx-[0.5rem]">
			<h3 className="font-(family-name:--font-barlow) font-bold text-[0.625rem] leading-[140%] tracking-[0.01em] uppercase text-(--neutrals-2) mb-[0.5rem] overflow-hidden transition-[opacity,height,margin] duration-200 ease-out group-data-[collapsed=true]/sidebar:h-0 group-data-[collapsed=true]/sidebar:mb-0 group-data-[collapsed=true]/sidebar:opacity-0">
				Main <span className="sr-only">navigation</span>
			</h3>
			<ul
				className="flex flex-col gap-y-[0.25rem]"
				onPointerLeave={handleLinkUnselection}
				onBlurCapture={handleLinkUnselection}
			>
				{MAIN_NAVIGATION_ITEMS.map(({ id, href, icon, label }) => {
					const isActive = activeLinkId === id;
					const isCurrent = routeActiveLinkId === id;

					return (
						<li
							className="relative"
							key={id}
							onPointerEnter={() => handleLinkSelection(id)}
							onFocusCapture={() => handleLinkSelection(id)}
						>
							{isActive && <NavigationLinkHighlight layoutId="main-navigation-link-highlight" />}
							<MainNavigationLink href={href} icon={icon} isActive={isActive} isCurrent={isCurrent}>
								{label}
							</MainNavigationLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
