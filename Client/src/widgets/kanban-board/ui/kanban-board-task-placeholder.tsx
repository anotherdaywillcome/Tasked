"use client";

import { motion } from "motion/react";

type KanbanBoardTaskPlaceholderProps = {
	height: number | null;
};

export const KanbanBoardTaskPlaceholder = ({ height }: Readonly<KanbanBoardTaskPlaceholderProps>) => {
	return (
		<motion.li
			layout
			className="pointer-events-none min-h-[96px] list-none rounded-[16px] border border-dashed border-(--geek-blue-4) bg-(--geek-blue-primary-opacity-150) shadow-[inset_0_0_0_1px_var(--daybreak-blue-200)]"
			style={height ? { height } : undefined}
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ duration: 0.14, ease: "easeOut" }}
			aria-hidden="true"
		/>
	);
};
