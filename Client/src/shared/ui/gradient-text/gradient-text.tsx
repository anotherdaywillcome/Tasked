"use client";

import clsx from "clsx";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export const ANIMATION_DIRECTION_VARIANTS = {
	Horizontal: "horizontal",
	Vertical: "vertical",
	Diagonal: "diagonal"
} as const;

export type AnimationDirectionVariant =
	(typeof ANIMATION_DIRECTION_VARIANTS)[keyof typeof ANIMATION_DIRECTION_VARIANTS];

type GradientTextProps = {
	children: ReactNode;
	className?: string;
	colors?: string[];
	animationSpeed?: number;
	showBorder?: boolean;
	direction?: AnimationDirectionVariant;
	pauseOnHover?: boolean;
	yoyo?: boolean;
};

type GradientTextSettings = {
	colors: Array<string>;
	animationSpeed: number;
	showBorder: boolean;
	direction: AnimationDirectionVariant;
	pauseOnHover: boolean;
	yoyo: boolean;
};

const GRADIENT_TEXT_DEFAULT_SETTINGS = {
	colors: ["#3254ff", "#cda2ff"],
	animationSpeed: 4,
	showBorder: false,
	direction: ANIMATION_DIRECTION_VARIANTS.Horizontal,
	pauseOnHover: false,
	yoyo: true
} satisfies GradientTextSettings;

export const GradientText = ({
	children,
	className = "",
	// colors = ["#6872FF", "#A268FF", "#DC68FF", "#190DC0", "#6CB3FF"],
	colors = GRADIENT_TEXT_DEFAULT_SETTINGS.colors,
	animationSpeed = GRADIENT_TEXT_DEFAULT_SETTINGS.animationSpeed,
	showBorder = GRADIENT_TEXT_DEFAULT_SETTINGS.showBorder,
	direction = GRADIENT_TEXT_DEFAULT_SETTINGS.direction,
	pauseOnHover = GRADIENT_TEXT_DEFAULT_SETTINGS.pauseOnHover,
	yoyo = GRADIENT_TEXT_DEFAULT_SETTINGS.yoyo
}: Readonly<GradientTextProps>) => {
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const progress = useMotionValue<number>(0);
	const elapsedRef = useRef<number>(0);
	const lastTimeRef = useRef<number | null>(null);

	const animationDuration = animationSpeed * 1000;

	useAnimationFrame((time: number) => {
		if (isPaused) {
			lastTimeRef.current = null;
			return;
		}

		if (lastTimeRef.current === null) {
			lastTimeRef.current = time;
			return;
		}

		const deltaTime = time - lastTimeRef.current;
		lastTimeRef.current = time;
		elapsedRef.current += deltaTime;

		if (yoyo) {
			const fullCycle = animationDuration * 2;
			const cycleTime = elapsedRef.current % fullCycle;

			if (cycleTime < animationDuration) {
				progress.set((cycleTime / animationDuration) * 100);
			} else {
				progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
			}
		} else {
			progress.set((elapsedRef.current / animationDuration) * 100);
		}
	});

	useEffect(() => {
		elapsedRef.current = 0;
		progress.set(0);
	}, [animationSpeed, yoyo]);

	const backgroundPosition = useTransform(progress, (p) => {
		if (direction === "horizontal") {
			return `${p}% 50%`;
		} else if (direction === "vertical") {
			return `50% ${p}%`;
		} else {
			return `${p}% 50%`;
		}
	});

	const handleMouseEnter = useCallback(() => {
		if (pauseOnHover) setIsPaused(true);
	}, [pauseOnHover]);

	const handleMouseLeave = useCallback(() => {
		if (pauseOnHover) setIsPaused(false);
	}, [pauseOnHover]);

	const gradientAngle =
		direction === "horizontal" ? "to right" : direction === "vertical" ? "to bottom" : "to bottom right";

	const gradientColors = [...colors, colors[0]].join(", ");

	const gradientStyle = {
		backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
		backgroundSize: direction === "horizontal" ? "300% 100%" : direction === "vertical" ? "100% 300%" : "300% 300%",
		backgroundRepeat: "repeat"
	};

	return (
		<motion.span
			className={clsx(
				"relative flex max-w-fit flex-row items-center justify-center",
				"transition-shadow duration-500 overflow-hidden",
				showBorder && "py-1 px-2 backdrop-blur",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{showBorder && (
				<motion.span
					className="absolute inset-0 z-0 pointer-events-none"
					style={{ ...gradientStyle, backgroundPosition }}
				>
					<div
						className="absolute bg-black z-[-1]"
						style={{
							width: "calc(100% - 2px)",
							height: "calc(100% - 2px)",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)"
						}}
					/>
				</motion.span>
			)}
			<motion.span
				className={clsx("inline-block relative z-10 text-transparent bg-clip-text")}
				style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: "text" }}
			>
				{children}
			</motion.span>
		</motion.span>
	);
};
