"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, KeyboardEvent, MouseEvent } from "react";

import { Icon, ICON_TYPES } from "../icon";
import { useSelect } from "./context";

export type SelectTriggerProps = ComponentPropsWithoutRef<"button">;

export const SelectTrigger = ({
	children,
	className,
	disabled,
	onClick,
	onKeyDown,
	...props
}: Readonly<SelectTriggerProps>) => {
	const {
		activeItemId,
		contentId,
		disabled: selectDisabled,
		open,
		required,
		selectActiveItem,
		setFirstItemActive,
		setLastItemActive,
		setNextItemActive,
		setOpen,
		triggerId,
		triggerRef,
		typeahead,
		updatePosition
	} = useSelect("SelectTrigger");
	const isDisabled = disabled ?? selectDisabled;

	const openSelect = () => {
		if (isDisabled) return;
		updatePosition();
		setOpen(true);
	};

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);
		if (event.defaultPrevented) return;

		if (open) setOpen(false);
		else openSelect();
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
			if (open) selectActiveItem();
			else openSelect();
			return;
		}

		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			if (!open) {
				openSelect();
				if (event.key === "ArrowDown") setFirstItemActive();
				else setLastItemActive();
			} else {
				setNextItemActive(event.key === "ArrowDown" ? 1 : -1);
			}
			return;
		}

		if (event.key === "Home" || event.key === "End") {
			event.preventDefault();
			if (event.key === "Home") setFirstItemActive();
			else setLastItemActive();
			return;
		}

		if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) typeahead(event.key);
	};

	return (
		<button
			ref={triggerRef}
			id={triggerId}
			type="button"
			role="combobox"
			aria-activedescendant={open ? (activeItemId ?? undefined) : undefined}
			aria-controls={contentId}
			aria-expanded={open}
			aria-haspopup="listbox"
			aria-required={required || undefined}
			disabled={isDisabled}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className={clsx(
				"flex w-full cursor-pointer items-center justify-between gap-x-[0.5rem] rounded-[0.625rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-150) px-[0.75rem] pt-[0.438rem] pb-[0.5rem] text-left font-(family-name:--font-barlow) text-[0.75rem] leading-[133%] font-medium tracking-[0.01em] text-(--white-pallete-100) transition-[border-color,background-color,box-shadow,color] duration-200 ease-out hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200) focus-visible:border-(--geek-blue-4) focus-visible:bg-(--geek-blue-primary-opacity-200) focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60",
				className
			)}
			{...props}
		>
			<span className="min-w-0 flex-1 truncate">{children}</span>
			<Icon
				type={ICON_TYPES.Chevron}
				size={16}
				className={clsx("shrink-0 text-(--neutrals-3) transition-transform", open ? "-rotate-90" : "rotate-90")}
			/>
		</button>
	);
};
