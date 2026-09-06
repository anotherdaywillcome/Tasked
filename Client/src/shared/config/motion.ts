import type { MotionConfigProps } from "motion/react";

export const MOTION_CONFIG_DEFAULT: MotionConfigProps = {
	reducedMotion: "user",
	transition: { type: "spring", duration: 0.25 }
};

export const MOTION_CONFIG_SNAPPY: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 420,
		damping: 30,
		mass: 0.6
	}
};

export const MOTION_CONFIG_SMOOTH: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 400,
		damping: 30
	}
};

export const MOTION_CONFIG_GENTLE: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 300,
		damping: 25
	}
};

export const MOTION_CONFIG_QUICK: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		duration: 0.15,
		ease: "easeOut"
	}
};

export const MOTION_CONFIG_CRISP: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 500,
		damping: 40
	}
};

// trigger
export const MOTION_CONFIG_BOUNCY: MotionConfigProps = {
	reducedMotion: "user",
	transition: {
		type: "spring",
		stiffness: 650,
		damping: 28,
		mass: 0.8
	}
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
