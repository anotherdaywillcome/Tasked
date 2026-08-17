"use client";

import { motion } from "motion/react";
import type { ReactElement } from "react";

import { Icon, ICON_TYPES } from "@shared/ui";

type ProjectRowActionsProps = {
	children?: ReactElement | ReactElement[];
};

export const UserRowActions = ({ children }: Readonly<ProjectRowActionsProps>) => {
	return (
		<motion.button
			whileHover={{ scale: 1.2, color: "#fff" }}
			whileTap={{ scale: 0.95 }}
			transition={{
				type: "spring",
				stiffness: 650,
				damping: 28,
				mass: 0.8
			}}
			type="button"
			className="ml-auto mr-0 w-[1rem] h-[1rem] cursor-pointer text-(--neutrals-3) flex items-center justify-center"
		>
			<Icon className="shrink-0 grow-0" size={24} type={ICON_TYPES.More} />
			<span className="sr-only">Project Actions</span>
		</motion.button>
	);
};
