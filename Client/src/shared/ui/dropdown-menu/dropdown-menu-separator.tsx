"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<"div">;

export const DropdownMenuSeparator = ({ className, ...props }: Readonly<DropdownMenuSeparatorProps>) => {
	return <div className={clsx("my-[0.25rem] h-px bg-(--white-pallete-10)", className)} role="separator" {...props} />;
};
