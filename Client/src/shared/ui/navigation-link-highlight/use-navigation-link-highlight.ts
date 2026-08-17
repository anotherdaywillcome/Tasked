"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

type NavigationItem = {
	id: string;
	match?: (pathname: string) => boolean;
};

export const useNavigationLinkHighlight = (items: NavigationItem[]) => {
	const pathname = usePathname();

	const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);

	const routeActiveLinkId = items.find((item) => item.match?.(pathname))?.id ?? null;

	const activeLinkId = hoveredLinkId ?? routeActiveLinkId;

	return {
		activeLinkId,
		routeActiveLinkId,

		handleLinkSelection: setHoveredLinkId,
		handleLinkUnselection: () => setHoveredLinkId(null)
	};
};
