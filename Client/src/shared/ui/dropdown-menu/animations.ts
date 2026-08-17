import type { Transition, Variants } from "motion/react";

export const DROPDOWN_MENU_CONTENT_ANIMATION_VARIANTS: Variants = {
	initial: {
		opacity: 0,
		scale: 0.98,
		y: -4
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0
	},
	exit: {
		opacity: 0,
		scale: 0.98,
		y: -4
	}
};

export const DROPDOWN_MENU_SUB_CONTENT_ANIMATION_VARIANTS: Variants = {
	initial: {
		opacity: 0,
		scale: 0.98,
		x: -4
	},
	visible: {
		opacity: 1,
		scale: 1,
		x: 0
	},
	exit: {
		opacity: 0,
		scale: 0.98,
		x: -4
	}
};

export const DROPDOWN_MENU_TRANSITION: Transition = { duration: 0.16, ease: "easeOut" };
