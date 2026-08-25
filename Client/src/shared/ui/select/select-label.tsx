import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export type SelectLabelProps = ComponentPropsWithoutRef<"div">;

export const SelectLabel = ({ className, ...props }: Readonly<SelectLabelProps>) => (
	<div
		className={clsx(
			"px-[0.5rem] py-[0.375rem] font-(family-name:--font-barlow) text-[0.625rem] leading-[140%] font-bold tracking-[0.04em] text-(--neutrals-2) uppercase",
			className
		)}
		{...props}
	/>
);
