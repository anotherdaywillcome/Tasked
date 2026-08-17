"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

import { Attach, Cog, Dashboard, Home, Lock, Messages, Projects, Search, Settings, Star, Tasks } from "./icons";

export const MOTION_ICON_TYPES = {
	Chevron: "Chevron",
	ChevronHorizontal: "ChevronHorizontal",
	Home: "Home",
	Tasks: "Tasks",
	Projects: "Users",
	Messages: "Messages",
	Settings: "Settings",
	Dashboard: "Dashboard",
	Star: "Star",
	Lock: "Lock",
	Cog: "Cog",
	Search: "Search",
	Attach: "Attach"
} as const;

export type MotionIconType = (typeof MOTION_ICON_TYPES)[keyof typeof MOTION_ICON_TYPES];

type MotionIconProps = ComponentProps<typeof motion.svg> & {
	type: MotionIconType;
	isActive?: boolean;
	size?: number;
};

export const MotionIcon = ({ type, isActive, size, ...props }: Readonly<MotionIconProps>) => {
	switch (type) {
		case MOTION_ICON_TYPES.Chevron:
			return (
				<motion.svg
					width={size ?? 16}
					height={size ?? 16}
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					{...props}
				>
					<path
						d="M13.2807 5.9668L8.93404 10.3135C8.4207 10.8268 7.5807 10.8268 7.06737 10.3135L2.7207 5.9668"
						stroke="white"
						strokeWidth="1.5"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</motion.svg>
			);
		case MOTION_ICON_TYPES.ChevronHorizontal:
			return (
				<motion.svg
					width={size ?? 7}
					height={size ?? 13}
					viewBox="0 0 7 13"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
					{...props}
				>
					<path
						d="M5.48167 11.31L1.135 6.96333C0.621667 6.45 0.621667 5.61 1.135 5.09667L5.48167 0.75"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</motion.svg>
			);
		case MOTION_ICON_TYPES.Home:
			return <Home isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Tasks:
			return <Tasks isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Projects:
			return <Projects isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Messages:
			return <Messages isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Settings:
			return <Settings isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Dashboard:
			return <Dashboard isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Star:
			return <Star isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Lock:
			return <Lock isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Cog:
			return <Cog isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Search:
			return <Search isActive={isActive} {...props} />;
		case MOTION_ICON_TYPES.Attach:
			return <Attach isActive={isActive} {...props} />;
	}
};
