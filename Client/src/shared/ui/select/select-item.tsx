"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useId, useMemo } from "react";

import { useSelect } from "./context";
import { getTextContent } from "./lib";
import type { SelectItemRecord } from "./types";

export type SelectItemProps = Omit<ComponentPropsWithoutRef<"button">, "value"> & {
	value: string;
};

type SelectItemComponent = ((props: Readonly<SelectItemProps>) => React.ReactElement) & {
	__selectItem?: boolean;
};

export const SelectItem = (({
	children,
	className,
	disabled = false,
	id,
	onClick,
	onMouseEnter,
	value,
	...props
}: Readonly<SelectItemProps>) => {
	const generatedId = useId();
	const itemId = id ?? generatedId;
	const { activeItemId, registerItem, selectItem, selectedValue, setActiveItemId } = useSelect("SelectItem");
	const label = getTextContent(children);
	const active = activeItemId === itemId;
	const selected = selectedValue === value;

	const item = useMemo<SelectItemRecord>(
		() => ({ disabled, id: itemId, label, value }),
		[disabled, itemId, label, value]
	);

	useEffect(() => registerItem(item), [item, registerItem]);

	return (
		<button
			id={itemId}
			type="button"
			role="option"
			tabIndex={-1}
			aria-disabled={disabled}
			aria-selected={selected}
			data-selected={selected}
			disabled={disabled}
			onMouseEnter={(event) => {
				onMouseEnter?.(event);
				if (!event.defaultPrevented && !disabled) setActiveItemId(itemId);
			}}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) selectItem(item);
			}}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.75rem] rounded-[0.5rem] px-[0.5rem] pt-[0.438rem] pb-[0.563rem] text-left font-(family-name:--font-barlow) text-[0.75rem] leading-[133%] font-medium tracking-[0.01em] text-(--white-pallete-100) transition-[background-color,color] duration-150 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
				active && "bg-(--geek-blue-primary-opacity-300)",
				selected && "text-(--daybreak-blue-200)",
				!active && !selected && "hover:bg-(--geek-blue-primary-opacity-150)",
				className
			)}
			{...props}
		>
			<span className="min-w-0 flex-1 truncate">{children}</span>
			<span className="flex h-[1rem] w-[1rem] shrink-0 items-center justify-center" aria-hidden="true">
				{selected && (
					<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
						<path
							d="m1.5 5 3 3 6-6"
							stroke="currentColor"
							strokeWidth="1.75"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</span>
		</button>
	);
}) as SelectItemComponent;

SelectItem.__selectItem = true;
