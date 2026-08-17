"use client";

import type { Transition } from "motion/react";
import { motion } from "motion/react";

type NavigationHighlightProps = {
	layoutId: string;
};

const TRANSITION_HIGHLIGHT: Transition = { type: "spring", stiffness: 500, damping: 40 };

export const NavigationLinkHighlight = ({ layoutId }: NavigationHighlightProps) => {
	return (
		<motion.div
			layoutId={layoutId}
			aria-hidden="true"
			className="absolute -z-10 inset-0 rounded-[0.75rem] outline-[0.031rem] outline-solid outline-(--white-pallete-50) bg-(--geek-blue-primary-opacity-400)"
			transition={TRANSITION_HIGHLIGHT}
		/>
	);
};
