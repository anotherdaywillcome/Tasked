"use client";

import { Button, Icon, ICON_TYPES } from "@shared/ui";
import { motion } from "motion/react";

type CreateTaskProps = {
	projectId?: string;
	columnId?: string;
	variant?: "default" | "icon";
};

export const CreateTask = ({ projectId, columnId, variant = "default" }: Readonly<CreateTaskProps>) => {
	if (variant === "icon") {
		return (
			<motion.button
				className="cursor-pointer rounded-[8px] p-[4px] text-(--neutrals-3) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
				type="button"
				aria-label={`Add task to ${columnId ?? "column"}`}
				data-project-id={projectId}
				data-column-id={columnId}
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.92 }}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
			>
				<Icon type={ICON_TYPES.AddCircle} size={16} />
			</motion.button>
		);
	}

	return (
		<Button className="flex items-center gap-x-[4px] rounded-[12px]" data-project-id={projectId}>
			<Icon type={ICON_TYPES.AddCircle} size={16} />
			<span className="font-(family-name:--font-barlow) font-bold text-(--white-pallete-100)">New Task</span>
		</Button>
	);
};
