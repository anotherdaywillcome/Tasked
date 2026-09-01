import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export type SelectLabelProps = ComponentPropsWithoutRef<"div">;

export const SelectLabel = ({ className, ...props }: Readonly<SelectLabelProps>) => (
	<div
		className={clsx(
			"font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--neutrals-3)",
			className
		)}
		{...props}
	/>
);
