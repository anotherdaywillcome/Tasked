"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { Icon, ICON_TYPES } from "../icon";
import { useDropdownMenuSub } from "./context";
import { callAll } from "./lib";

type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<"button">;

export const DropdownMenuSubTrigger = ({
	children,
	className,
	onClick,
	onKeyDown,
	...props
}: Readonly<DropdownMenuSubTriggerProps>) => {
	const { open, setOpen, triggerId, triggerRef, updatePosition } = useDropdownMenuSub("DropdownMenuSubTrigger");

	return (
		<button
			ref={triggerRef}
			id={triggerId}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.75rem] rounded-[0.5rem] px-[0.5rem] pt-[0.438rem] pb-[0.563rem] text-left font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) transition-[background-color,color] duration-150 ease-out hover:bg-(--geek-blue-primary-opacity-150) focus-visible:outline-none",
				className
			)}
			type="button"
			role="menuitem"
			aria-expanded={open}
			aria-haspopup="menu"
			onClick={callAll(onClick, (event) => {
				if (event.defaultPrevented) return;

				updatePosition();
				setOpen(!open);
			})}
			onKeyDown={callAll(onKeyDown, (event) => {
				if (event.key !== "ArrowRight" && event.key !== "Enter" && event.key !== " ") return;

				event.preventDefault();
				updatePosition();
				setOpen(true);
			})}
			{...props}
		>
			<span className="truncate">{children}</span>
			<Icon type={ICON_TYPES.Chevron} size={16} className="-rotate-90 text-[#95ACCB]" />
		</button>
	);
};
