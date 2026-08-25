"use client";

import { Icon, ICON_TYPES } from "@shared/ui";
import { motion } from "motion/react";

import { useGroupedList, useListGroup } from "../model/grouped-list-context";

export const ListHeaderActions = () => {
	const group = useListGroup();
	const { addTask } = useGroupedList();

	return (
		<motion.button
			className="ml-auto cursor-pointer rounded-[8px] p-[4px] text-[#95ACCB] hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
			type="button"
			aria-label={`Add task to ${group.title}`}
			whileHover={{ scale: 1.08 }}
			whileTap={{ scale: 0.92 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
			onClick={() => addTask(group.id)}
		>
			<Icon type={ICON_TYPES.AddCircle} size={16} />
		</motion.button>
	);
};
