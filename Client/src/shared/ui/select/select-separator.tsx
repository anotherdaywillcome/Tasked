import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export type SelectSeparatorProps = ComponentPropsWithoutRef<"div">;

export const SelectSeparator = ({ className, ...props }: Readonly<SelectSeparatorProps>) => (
	<div role="separator" className={clsx("my-[0.25rem] h-px bg-(--white-pallete-10)", className)} {...props} />
);
