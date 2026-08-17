export const DRAWER_POSITIONS = {
	Top: "top",
	Bottom: "bottom",
	Left: "left",
	Right: "right"
} as const;

export type DrawerPosition = (typeof DRAWER_POSITIONS)[keyof typeof DRAWER_POSITIONS];

type DrawerSettings = {
	max: number;
	position: DrawerPosition;
	showBackdrop: boolean;
};

export const DRAWER_DEFAULT_SETTINGS = {
	max: 3,
	position: DRAWER_POSITIONS.Right,
	showBackdrop: true
} satisfies DrawerSettings;
