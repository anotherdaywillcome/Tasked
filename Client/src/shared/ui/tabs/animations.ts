import { TabDirection } from "./tabs";

const getEnterAnimation = (direction: TabDirection) => {
	if (direction === "right") {
		return {
			x: "100%",
			opacity: 0
		};
	}

	if (direction === "left") {
		return {
			x: "-100%",
			opacity: 0
		};
	}

	return {
		x: 0,
		opacity: 0
	};
};

const getExitAnimation = (direction: TabDirection) => {
	if (direction === "right") {
		return {
			x: "-100%",
			opacity: 0
		};
	}

	if (direction === "left") {
		return {
			x: "100%",
			opacity: 0
		};
	}

	return {
		x: 0,
		opacity: 0
	};
};

export const animationVariants = {
	enter: (tabDirection: TabDirection) => getEnterAnimation(tabDirection),
	center: {
		x: 0,
		opacity: 1
	},
	exit: (tabDirection: TabDirection) => getExitAnimation(tabDirection)
};
