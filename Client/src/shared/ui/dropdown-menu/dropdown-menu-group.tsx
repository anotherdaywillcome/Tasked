"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type DropdownMenuGroupProps = ComponentPropsWithoutRef<"div">;

export const DropdownMenuGroup = ({ children, className, ...props }: Readonly<DropdownMenuGroupProps>) => {
	return (
		<div className={clsx("flex flex-col gap-y-[0.125rem]", className)} role="group" {...props}>
			{children}
		</div>
	);
};
