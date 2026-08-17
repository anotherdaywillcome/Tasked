"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type DropdownMenuLabelProps = ComponentPropsWithoutRef<"label">;

export const DropdownMenuLabel = ({ children, className, ...props }: Readonly<DropdownMenuLabelProps>) => {
	return (
		<label
			className={clsx(
				"font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--neutrals-3)",
				className
			)}
			{...props}
		>
			{children}
		</label>
	);
};
