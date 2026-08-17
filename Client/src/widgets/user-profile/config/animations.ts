import type { Transition, Variants } from "motion/react";

export const TRANSITION_LAYOUT: Transition = { type: "spring", stiffness: 400, damping: 30 };
export const TRANSITION_CHEVRON: Transition = { type: "spring", stiffness: 300, damping: 25 };
export const TRANSITION_HOVER: Transition = { duration: 0.15, ease: "easeOut" };
export const TRANSITION_HIGHLIGHT: Transition = { type: "spring", stiffness: 500, damping: 40 };

export const USER_PROFILE_CONTAINER_VARIANTS: Variants = {
	closed: {
		borderColor: "var(--white-pallete-10)",
		backgroundColor: "var(--geek-blue-primary-opacity-150)",
		boxShadow: "0 0 0 0 rgba(29, 57, 196, 0)",
		transition: { ...TRANSITION_LAYOUT }
	},
	opened: {
		borderColor: "var(--white-pallete-10)",
		backgroundColor: "rgba(1, 0, 9, 0.34)",
		boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.32)",
		transition: { ...TRANSITION_LAYOUT }
	},
	hovered: {
		borderColor: "var(--white-pallete-20)",
		backgroundColor: "var(--geek-blue-primary-opacity-200)",
		boxShadow: "0 0 0 0 rgba(29, 57, 196, 0)",
		transition: { ...TRANSITION_HOVER }
	}
};

export const USER_PROFILE_CHEVRON_VARIANTS: Variants = {
	closed: { rotate: 0, transition: TRANSITION_CHEVRON },
	opened: { rotate: 180, transition: TRANSITION_CHEVRON }
};

export const USER_PROFILE_NAVIGATION_VARIANTS: Variants = {
	closed: {
		height: 0,
		opacity: 0,
		borderTopColor: "rgba(255, 255, 255, 0)",
		filter: "blur(8px)",
		transition: TRANSITION_LAYOUT
	},
	opened: {
		height: "auto",
		opacity: 1,
		borderTopColor: "var(--white-pallete-10)",
		filter: "blur(0px)",
		transition: TRANSITION_LAYOUT
	}
};
