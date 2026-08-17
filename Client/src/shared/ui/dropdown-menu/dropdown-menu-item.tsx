"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useId, useMemo } from "react";

import { useDropdownMenu } from "./context";
import { callAll, getTextContent } from "./lib";
import type { DropdownMenuItemRecord } from "./types";

type DropdownMenuItemProps = Omit<ComponentPropsWithoutRef<"button">, "onSelect" | "value"> & {
	onSelect?: () => void;
	value?: string;
};

export const DropdownMenuItem = ({
	children,
	className,
	disabled,
	id,
	onClick,
	onMouseEnter,
	onSelect,
	value,
	...props
}: Readonly<DropdownMenuItemProps>) => {
	const generatedId = useId();
	const itemId = id ?? generatedId;
	const { activeItemId, registerItem, selectItem, selectedValue, setActiveItemId } =
		useDropdownMenu("DropdownMenuItem");
	const label = getTextContent(children);
	const selected = value !== undefined && value === selectedValue;
	const active = activeItemId === itemId;

	const item = useMemo<DropdownMenuItemRecord>(
		() => ({
			disabled,
			id: itemId,
			label,
			onSelect,
			value
		}),
		[disabled, itemId, label, onSelect, value]
	);

	useEffect(() => registerItem(item), [item, registerItem]);

	return (
		<button
			id={itemId}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.75rem] rounded-[0.5rem] px-[0.5rem] pt-[0.438rem] pb-[0.563rem] text-left font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) transition-[background-color,color] duration-150 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
				active && "bg-(--geek-blue-primary-opacity-300)",
				selected && "text-(--daybreak-blue-200)",
				!selected && !active && "hover:bg-(--geek-blue-primary-opacity-150)",
				className
			)}
			type="button"
			role="menuitem"
			aria-disabled={disabled}
			disabled={disabled}
			onMouseEnter={callAll(onMouseEnter, () => setActiveItemId(itemId))}
			onClick={callAll(onClick, (event) => {
				if (event.defaultPrevented) return;

				selectItem(item, label);
			})}
			{...props}
		>
			<span className="truncate">{children}</span>
			{selected && <span className="h-[0.375rem] w-[0.375rem] rounded-full bg-(--daybreak-blue-200)" />}
		</button>
	);
};
