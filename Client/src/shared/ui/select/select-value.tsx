"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { use } from "react";

import { motion } from "motion/react";
import { SelectContext } from "./context";

export type SelectValueProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
	placeholder?: ReactNode;
};

export const SelectValue = ({ placeholder = "Select an option", ...props }: Readonly<SelectValueProps>) => {
	const { selectedLabel, selectedValue, activeItemId } = use(SelectContext);

	return (
		<span data-placeholder={!selectedValue || undefined} {...props}>
			{selectedLabel ?? (
				<motion.span layout className="text-(--neutrals-3)">
					{placeholder}
				</motion.span>
			)}
		</span>
	);
};
