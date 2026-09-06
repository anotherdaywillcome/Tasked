import type { Variants } from "motion/react";

export const userProfileContainerVariants: Variants = {
	closed: {
		borderColor: "var(--white-pallete-10)",
		backgroundColor: "var(--geek-blue-primary-opacity-150)",
		boxShadow: "0 0 0 0 rgba(29, 57, 196, 0)"
	},
	opened: {
		borderColor: "var(--white-pallete-10)",
		backgroundColor: "rgba(1, 0, 9, 0.34)",
		boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.32)"
	},
	hovered: {
		borderColor: "var(--white-pallete-20)",
		backgroundColor: "var(--geek-blue-primary-opacity-200)",
		boxShadow: "0 0 0 0 rgba(29, 57, 196, 0)"
	}
};

export const userProfileChevronVariants: Variants = {
	closed: { rotate: 0 },
	opened: { rotate: 180 }
};

export const userProfileNavigationVariants: Variants = {
	closed: {
		height: 0,
		opacity: 0,
		borderTopColor: "rgba(255, 255, 255, 0)",
		filter: "blur(0.5rem)"
	},
	opened: {
		height: "auto",
		opacity: 1,
		borderTopColor: "var(--white-pallete-10)",
		filter: "blur(0rem)"
	}
};
