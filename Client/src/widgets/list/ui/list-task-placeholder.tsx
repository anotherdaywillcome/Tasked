"use client";

import { motion } from "motion/react";

type ListTaskPlaceholderProps = {
	height: number | null;
};

export const ListTaskPlaceholder = ({ height }: Readonly<ListTaskPlaceholderProps>) => {
	return (
		<motion.li
			layout
			className="pointer-events-none min-h-[48px] list-none rounded-[16px] border border-dashed border-(--geek-blue-4) bg-(--geek-blue-primary-opacity-150) shadow-[inset_0_0_0_1px_var(--daybreak-blue-200)]"
			style={height ? { height } : undefined}
			initial={{ opacity: 0, scale: 0.99 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.99 }}
			transition={{ duration: 0.14, ease: "easeOut" }}
			aria-hidden="true"
		/>
	);
};
