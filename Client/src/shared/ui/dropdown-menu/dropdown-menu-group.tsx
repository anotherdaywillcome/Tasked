"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DropdownMenuGroupProps = ComponentPropsWithoutRef<"div"> & {
	children: ReactNode;
};

export const DropdownMenuGroup = ({ children, className, ...props }: DropdownMenuGroupProps) => (
	<div role="group" className={clsx("flex flex-col", className)} {...props}>
		{children}
	</div>
);
