import type { Variants } from "motion/react";

import { createAnimationVariants } from "../lib";

type GetDrawerAnimationVariantsConfigParameters = {
	width: number;
	height: number;
	max: number;
	reversedIndex: number;
};

export const getDrawerAnimationVariantsConfig = ({
	width,
	height,
	max,
	reversedIndex
}: Readonly<GetDrawerAnimationVariantsConfigParameters>) => {
	const sideDrawerOffsetY = (index: number) => (height * index) / 20;

	const initialAnimationVariants: Variants = {
		right: createAnimationVariants({ x: "100%", y: 0, opacity: 0, blur: "0.3rem", reversedIndex }),
		left: createAnimationVariants({ x: "-100%", y: 0, opacity: 0, blur: "0.3rem", reversedIndex }),
		bottom: createAnimationVariants({ x: 0, y: "100%", opacity: 0, blur: "0.3rem", reversedIndex }),
		top: createAnimationVariants({ x: 0, y: "-100%", opacity: 0, blur: "0.3rem", reversedIndex })
	};

	const baseAnimationVariants: Variants = {
		right: createAnimationVariants({
			x: -70 * reversedIndex,
			y: sideDrawerOffsetY(reversedIndex),
			reversedIndex
		}),
		left: createAnimationVariants({
			x: 70 * reversedIndex,
			y: sideDrawerOffsetY(reversedIndex),
			reversedIndex
		}),
		bottom: createAnimationVariants({
			x: 0,
			y: -70 * reversedIndex,
			reversedIndex
		}),
		top: createAnimationVariants({
			x: 0,
			y: 70 * reversedIndex,
			reversedIndex
		})
	};

	const lastAnimationVariants: Variants = {
		right: createAnimationVariants({
			x: -70 * max,
			y: sideDrawerOffsetY(max),
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		}),
		left: createAnimationVariants({
			x: 70 * max,
			y: sideDrawerOffsetY(max),
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		}),
		bottom: createAnimationVariants({
			x: 0,
			y: -70 * max,
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		}),
		top: createAnimationVariants({
			x: 0,
			y: 70 * max,
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		})
	};

	const exitAnimationVariants: Variants = {
		right: createAnimationVariants({
			x: width,
			y: sideDrawerOffsetY(reversedIndex),
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		}),
		left: createAnimationVariants({
			x: -width,
			y: sideDrawerOffsetY(reversedIndex),
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		}),
		bottom: createAnimationVariants({
			x: 0,
			y: height,
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		}),
		top: createAnimationVariants({
			x: 0,
			y: -height,
			opacity: 0,
			blur: "0.3rem",
			reversedIndex
		})
	};

	const hoverAnimationVariants: Variants = {
		right: { x: -70 * reversedIndex - 20 * reversedIndex },
		left: { x: 70 * reversedIndex + 20 * reversedIndex },
		bottom: { y: -70 * reversedIndex - 20 * reversedIndex },
		top: { y: 70 * reversedIndex + 20 * reversedIndex }
	};

	return {
		initial: initialAnimationVariants,
		base: baseAnimationVariants,
		last: lastAnimationVariants,
		exit: exitAnimationVariants,
		hover: hoverAnimationVariants
	};
};

export const drawerBackdropAnimationVariants: Variants = {
	initial: { opacity: 0 },
	base: { opacity: 1 },
	exit: { opacity: 0 }
};

export const drawerCloseAnimationVariants: Variants = {
	hover: {
		scale: 1.2,
		color: "#fff"
	},
	tap: { scale: 0.95 }
};
