"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export type DropdownMenuShortcutProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
	shortcut: string;
};

export const DropdownMenuShortcut = ({ className, shortcut, ...props }: Readonly<DropdownMenuShortcutProps>) => {
	return (
		<span
			className={clsx(
				"ml-auto shrink-0 font-(family-name:--font-barlow) text-[0.6875rem] leading-[1] tracking-[0.01em] text-(--neutrals-3)",
				className
			)}
			{...props}
		>
			{shortcut}
		</span>
	);
};
