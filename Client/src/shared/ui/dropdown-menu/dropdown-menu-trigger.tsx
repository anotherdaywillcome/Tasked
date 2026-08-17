"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, KeyboardEvent, MouseEvent, ReactElement, ReactNode, Ref } from "react";
import { cloneElement, useCallback } from "react";

import { Icon, ICON_TYPES } from "../icon";
import { DROPDOWN_MENU_TRANSITION } from "./animations";
import { useDropdownMenu } from "./context";
import { mergeRefs } from "./lib";

type DropdownMenuTriggerRenderProps = ComponentPropsWithoutRef<"button"> & {
	ref?: Ref<HTMLButtonElement>;
};

type DropdownMenuTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
	children?: ReactNode;
	placeholder?: ReactNode;
	render?: ReactElement<DropdownMenuTriggerRenderProps>;
};

export const DropdownMenuTrigger = ({
	children,
	className,
	disabled,
	onClick,
	onKeyDown,
	placeholder = "Select option",
	render,
	...props
}: Readonly<DropdownMenuTriggerProps>) => {
	const {
		contentId,
		disabled: menuDisabled,
		open,
		selectActiveItem,
		selectedLabel,
		setFirstItemActive,
		setLastItemActive,
		setNextItemActive,
		setOpen,
		triggerId,
		triggerRef,
		updatePosition
	} = useDropdownMenu("DropdownMenuTrigger");
	const isDisabled = disabled ?? menuDisabled;

	const openMenu = useCallback(() => {
		if (isDisabled) return;

		updatePosition();
		setOpen(true);
	}, [isDisabled, setOpen, updatePosition]);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);

		if (event.defaultPrevented) return;

		if (open) {
			setOpen(false);
			return;
		}

		openMenu();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDown?.(event);

		if (event.defaultPrevented || isDisabled) return;

		if (event.key === "Escape") {
			setOpen(false);
			return;
		}

		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();

			if (open) {
				selectActiveItem();
				return;
			}

			openMenu();
			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();

			if (!open) {
				openMenu();
				setFirstItemActive();
				return;
			}

			setNextItemActive(1);
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();

			if (!open) {
				openMenu();
				setLastItemActive();
				return;
			}

			setNextItemActive(-1);
			return;
		}

		if (event.key === "Home") {
			event.preventDefault();
			setFirstItemActive();
			return;
		}

		if (event.key === "End") {
			event.preventDefault();
			setLastItemActive();
		}
	};

	const triggerProps: DropdownMenuTriggerRenderProps = {
		...props,
		ref: mergeRefs(triggerRef, render?.props.ref),
		id: triggerId,
		type: props.type ?? "button",
		disabled: isDisabled,
		"aria-controls": contentId,
		"aria-expanded": open,
		"aria-haspopup": "menu",
		onClick: handleClick,
		onKeyDown: handleKeyDown
	};

	if (render) {
		return cloneElement(render, {
			...triggerProps,
			className: clsx(render.props.className, className)
		});
	}

	return (
		<button
			{...triggerProps}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.5rem] border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[0.625rem] bg-(--geek-blue-primary-opacity-100) px-[0.5rem] pt-[0.438rem] pb-[0.563rem] text-left font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) transition-[border-color,background-color,box-shadow,color] duration-200 ease-out hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200) focus-visible:outline-none focus-visible:border-(--geek-blue-4) focus-visible:bg-(--geek-blue-primary-opacity-200) focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)] disabled:cursor-not-allowed disabled:opacity-60",
				className
			)}
		>
			<span className={clsx("truncate", !selectedLabel && !children && "text-(--neutrals-3)")}>
				{selectedLabel ?? children ?? placeholder}
			</span>
			<motion.span animate={{ rotate: open ? 180 : 0 }} transition={DROPDOWN_MENU_TRANSITION}>
				<Icon type={ICON_TYPES.Chevron} size={16} className="text-[#95ACCB]" />
			</motion.span>
		</button>
	);
};
