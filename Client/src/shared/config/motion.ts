import type { MotionConfigProps } from "motion/react";

export const MOTION_CONFIG_DEFAULT: MotionConfigProps = {
	reducedMotion: "user",
	transition: { type: "spring", duration: 0.25 }
};

export const MOTION_CONFIG_SNAPPY: MotionConfigProps = {
	reducedMotion: "user",
	transition: { type: "spring", stiffness: 420, damping: 30, mass: 0.6 }
};

// trigger
export const MOTION_CONFIG_BOUNCY: MotionConfigProps = {
	reducedMotion: "user",
	transition: { type: "spring", stiffness: 650, damping: 28, mass: 0.8 }
};

export const MOTION_CONFIG_DRAWER: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 380,
		damping: 38,
		mass: 0.8
	}
};

export const MOTION_CONFIG_TABS: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 280,
		damping: 30,
		mass: 0.75
	}
};
