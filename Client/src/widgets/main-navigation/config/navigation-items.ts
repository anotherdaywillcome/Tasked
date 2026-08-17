import { ROUTES } from "@shared/config";
import type { MotionIconType } from "@shared/ui";
import { MOTION_ICON_TYPES } from "@shared/ui";

type MainNavigationItem = {
	id: string;
	href: string;
	icon: MotionIconType;
	label: string;
	match: (pathname: string) => boolean;
};

export const MAIN_NAVIGATION_ITEMS: Array<MainNavigationItem> = [
	{
		id: "Home",
		href: ROUTES.Home,
		icon: MOTION_ICON_TYPES.Home,
		label: "Home",
		match: (pathname: string) => pathname === ROUTES.Home
	},
	{
		id: "Tasks",
		href: ROUTES.Tasks,
		icon: MOTION_ICON_TYPES.Tasks,
		label: "My Tasks",
		match: (pathname: string) => pathname.startsWith(ROUTES.Tasks)
	},
	{
		id: "Projects",
		href: ROUTES.Projects,
		icon: MOTION_ICON_TYPES.Projects,
		label: "Projects",
		match: (pathname: string) => pathname.startsWith(ROUTES.Projects)
	},
	{
		id: "Messages",
		href: ROUTES.Messages,
		icon: MOTION_ICON_TYPES.Messages,
		label: "Messages",
		match: (pathname: string) => pathname.startsWith(ROUTES.Messages)
	},
	{
		id: "Account",
		href: ROUTES.Account,
		icon: MOTION_ICON_TYPES.Settings,
		label: "Settings",
		match: (pathname: string) => pathname.startsWith(ROUTES.Settings)
	}
];
