"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export type DropdownMenuShortcutProps = ComponentPropsWithoutRef<"span"> & {
	shortcut: string;
};

export const DropdownMenuShortcut = ({ shortcut, className, ...props }: DropdownMenuShortcutProps) => (
	<span className={clsx("ml-auto text-[0.625rem] tracking-widest text-(--white-pallete-40)", className)} {...props}>
		{shortcut}
	</span>
);
