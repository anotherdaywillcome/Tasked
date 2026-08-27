"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ComponentType } from "react";
import { use, useEffect, useId, useMemo } from "react";

import { DropdownMenuContext } from "./dropdown-menu-context";
import { callAll, getTextContent } from "./lib";
import type { DropdownMenuItemRecord } from "./types";
import { DropdownMenuSubContext } from "@shared/ui/dropdown-menu/dropdown-menu-submenu-context";
import { Icon, ICON_TYPES } from "@shared/ui";

export type DropdownMenuSubTriggerChevronProps = {
	className?: string;
	open: boolean;
};

type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<"button"> & {
	renderChevron?: ComponentType<DropdownMenuSubTriggerChevronProps> | null;
};

const DefaultChevron = ({ className }: Readonly<DropdownMenuSubTriggerChevronProps>) => (
	<Icon type={ICON_TYPES.Chevron} size={16} className={className} />
);

export const DropdownMenuSubTrigger = ({
	children,
	className,
	onClick,
	onKeyDown,
	onMouseEnter,
	renderChevron,
	disabled,
	...props
}: Readonly<DropdownMenuSubTriggerProps>) => {
	const generatedItemId = useId();
	const { activeItemId, registerItem, setActiveItemId, setActiveSubmenuId } = use(DropdownMenuContext)!;

	const { open, setOpen, triggerId, triggerRef, updatePosition, id: submenuId } = use(DropdownMenuSubContext)!;

	const parentSub = use(DropdownMenuSubContext);
	const parentSubmenuId = parentSub?.parentSubmenuId ?? null;

	const itemParentSubmenuId = use(DropdownMenuSubContext)?.parentSubmenuId ?? null;

	const Chevron = renderChevron === undefined ? DefaultChevron : renderChevron;
	const label = getTextContent(children);
	const active = activeItemId === generatedItemId;

	const item = useMemo<DropdownMenuItemRecord>(
		() => ({
			id: generatedItemId,
			label,
			disabled,
			submenuId,
			parentSubmenuId: itemParentSubmenuId
		}),
		[generatedItemId, label, disabled, submenuId, itemParentSubmenuId]
	);

	useEffect(() => registerItem(item), [item, registerItem]);

	const openSubmenu = () => {
		if (disabled) {
			return;
		}

		setActiveItemId(generatedItemId);
		setActiveSubmenuId(submenuId);
		updatePosition();
		setOpen(true);

		requestAnimationFrame(() => {
			const subContent = document.querySelector('[data-dropdown-submenu-content="true"]') as HTMLElement | null;
			subContent?.focus();
		});
	};

	return (
		<button
			{...props}
			ref={triggerRef}
			id={triggerId}
			type="button"
			role="menuitem"
			aria-expanded={open}
			aria-haspopup="menu"
			aria-disabled={disabled}
			disabled={disabled}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.75rem] rounded-[0.5rem] px-[0.5rem] pt-[0.438rem] pb-[0.563rem] text-left font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) transition-[background-color,color] duration-150 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
				active && "bg-red-600",
				!active && "hover:bg-(--geek-blue-primary-opacity-150)",
				className
			)}
			onMouseEnter={callAll(onMouseEnter, openSubmenu)}
			onClick={callAll(onClick, (event) => {
				if (event.defaultPrevented) return;
				if (open) {
					setOpen(false);
					return;
				}
				openSubmenu();
			})}
			onKeyDown={callAll(onKeyDown, (event) => {
				if (event.defaultPrevented) return;
				if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					openSubmenu();
				}
			})}
		>
			<span className="min-w-0 flex-1 truncate">{children}</span>
			{Chevron && <Chevron open={open} className="text-[#95ACCB]" />}
		</button>
	);
};
