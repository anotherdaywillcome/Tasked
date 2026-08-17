"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type DropdownMenuShortcutProps = ComponentPropsWithoutRef<"span">;

export const DropdownMenuShortcut = ({ children, className, ...props }: Readonly<DropdownMenuShortcutProps>) => {
	return (
		<span
			className={clsx(
				"ml-auto shrink-0 font-(family-name:--font-barlow) text-[0.6875rem] leading-[1] tracking-[0.01em] text-(--neutrals-3)",
				className
			)}
			{...props}
		>
			{children}
		</span>
	);
};
