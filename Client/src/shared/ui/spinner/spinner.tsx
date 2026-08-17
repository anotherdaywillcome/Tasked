"use client";

import { motion } from "motion/react";

type SpinnerProps = {
	size?: number;
	spinDuration?: number;
	spinStiffness?: number;
	spinDamping?: number;
	backgroundColor?: string;
	trackColor?: string;
	activeColor?: string;
	className?: string;
};

type SpinnerSettings = {
	size: number;
	spinDuration: number;
	spinStiffness: number;
	spinDamping: number;
	backgroundColor: string;
	trackColor: string;
	activeColor: string;
};

const SPINNER_DEFAULT_SETTINGS = {
	size: 48,
	spinDuration: 1.35,
	spinStiffness: 78,
	spinDamping: 16,
	backgroundColor: "var(--geek-blue-primary-opacity-100)",
	trackColor: "var(--geek-blue-primary-opacity-200)",
	activeColor: "var(--geek-blue-5)"
} satisfies SpinnerSettings;

export const Spinner = ({
	size = SPINNER_DEFAULT_SETTINGS.size,
	spinDuration = SPINNER_DEFAULT_SETTINGS.spinDuration,
	spinStiffness = SPINNER_DEFAULT_SETTINGS.spinStiffness,
	spinDamping = SPINNER_DEFAULT_SETTINGS.spinDamping,
	backgroundColor = SPINNER_DEFAULT_SETTINGS.backgroundColor,
	trackColor = SPINNER_DEFAULT_SETTINGS.trackColor,
	activeColor = SPINNER_DEFAULT_SETTINGS.activeColor,
	className
}: Readonly<SpinnerProps>) => {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
			width={size}
			height={size}
			className={className}
			aria-hidden="true"
			style={{
				display: "block",
				background: "transparent"
			}}
		>
			<circle cx="50" cy="50" r="38" fill={backgroundColor} />
			<circle cx="50" cy="50" r="30" fill="none" stroke={trackColor} strokeWidth="8" />
			<motion.g
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{
					type: "tween",
					ease: "linear",
					duration: spinDuration,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "loop"
				}}
				style={{ transformOrigin: "3.125rem 3.125rem" }}
			>
				<motion.circle
					cx="50"
					cy="50"
					r="30"
					fill="none"
					stroke={activeColor}
					strokeWidth="8"
					strokeLinecap="round"
					initial={{ strokeDasharray: "22 166", strokeDashoffset: 0, opacity: 0.98 }}
					animate={{
						strokeDasharray: ["22 166", "112 76", "22 166"],
						strokeDashoffset: [0, -94, -188],
						opacity: [0.94, 1, 0.94]
					}}
					transition={{
						type: "tween",
						ease: "linear",
						duration: Math.max(
							0.85,
							Math.min(2.1, 1.25 + (spinDamping - 16) * 0.012 - (spinStiffness - 78) * 0.0035)
						),
						times: [0, 0.5, 1],
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop"
					}}
				/>
			</motion.g>
		</motion.svg>
	);
};
