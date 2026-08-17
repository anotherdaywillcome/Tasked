"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import { ReactElement, use } from "react";

import { Icon, ICON_TYPES } from "@shared/ui";

import { ProjectRowVariants } from "../../config";
import { ProjectRowContext } from "../../model";

type ProjectRowActionsProps = {
	children?: ReactElement | ReactElement[];
};

export const ProjectRowActions = ({ children }: Readonly<ProjectRowActionsProps>) => {
	const { variant } = use(ProjectRowContext);

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
			className={clsx(
				"ml-auto mr-0 cursor-pointer text-(--neutrals-3) flex items-center justify-center",
				variant === ProjectRowVariants.Compact && "w-[1rem] h-[1rem]",
				variant === ProjectRowVariants.Extended && "w-[2rem] h-[2rem]"
			)}
		>
			<Icon
				className="shrink-0 grow-0"
				size={variant === ProjectRowVariants.Compact ? 24 : 32}
				type={ICON_TYPES.More}
			/>
			<span className="sr-only">Project Actions</span>
		</motion.button>
	);
};
