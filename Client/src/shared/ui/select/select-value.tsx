"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { useSelect } from "./context";

export type SelectValueProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
	placeholder?: ReactNode;
};

export const SelectValue = ({ placeholder = "Select an option", ...props }: Readonly<SelectValueProps>) => {
	const { selectedLabel, selectedValue } = useSelect("SelectValue");

	return (
		<span data-placeholder={!selectedValue || undefined} {...props}>
			{selectedLabel ?? <span className="text-(--neutrals-3)">{placeholder}</span>}
		</span>
	);
};
