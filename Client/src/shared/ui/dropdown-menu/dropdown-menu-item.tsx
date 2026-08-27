"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { Children, isValidElement, use, useEffect, useId, useMemo } from "react";

import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuShortcut } from "./dropdown-menu-shortcut";

import { DropdownMenuSubContext } from "@shared/ui/dropdown-menu/dropdown-menu-submenu-context";
import { callAll, getTextContent } from "./lib";

export type DropdownMenuItemProps = Omit<ComponentPropsWithoutRef<"button">, "onSelect" | "value"> & {
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

	const {
		activeItemId,
		activeSubmenuId,
		registerItem,
		selectItem,
		selectedValue,
		setActiveItemId,
		closeActiveSubmenu
	} = use(DropdownMenuContext)!;

	const subCtx = use(DropdownMenuSubContext);
	const parentSubmenuId = subCtx?.id ?? null;

	const childNodes = Children.toArray(children);
	const shortcut = childNodes.find((child) => isValidElement(child) && child.type === DropdownMenuShortcut);
	const labelChildren = childNodes.filter((child) => child !== shortcut);
	const label = getTextContent(labelChildren);

	const selected = value !== undefined && value === selectedValue;
	const active = activeItemId === itemId;

	const item = useMemo(
		() => ({
			id: itemId,
			label,
			disabled,
			onSelect,
			value,
			parentSubmenuId
		}),
		[itemId, label, disabled, onSelect, value, parentSubmenuId]
	);

	useEffect(() => registerItem(item), [item, registerItem]);

	return (
		<button
			{...props}
			id={itemId}
			type="button"
			role="menuitem"
			aria-disabled={disabled}
			disabled={disabled}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.75rem] rounded-[0.5rem] px-[0.5rem] pt-[0.438rem] pb-[0.563rem] text-left font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) transition-[background-color,color] duration-150 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
				active && "bg-red-600",
				selected && "text-(--daybreak-blue-200)",
				!selected && !active && "hover:bg-(--geek-blue-primary-opacity-150)",
				className
			)}
			onMouseEnter={callAll(onMouseEnter, () => {
				setActiveItemId(itemId);

				if (activeSubmenuId && parentSubmenuId !== activeSubmenuId) {
					closeActiveSubmenu();
				}
			})}
			onClick={callAll(onClick, (event) => {
				if (event.defaultPrevented) return;
				selectItem(item, label);
			})}
		>
			<span className="min-w-0 flex-1 truncate">{labelChildren}</span>
			{shortcut}
			{selected && <span className="h-[0.375rem] w-[0.375rem] rounded-full bg-(--daybreak-blue-200)" />}
		</button>
	);
};
