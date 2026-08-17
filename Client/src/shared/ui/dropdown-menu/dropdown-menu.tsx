"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

import { DropdownMenuContext } from "./context";
import { getElementById, getFirstEnabledItem, getLastEnabledItem, getNextEnabledItem } from "./lib";
import type { DropdownMenuContextValue, DropdownMenuItemRecord, DropdownMenuPosition } from "./types";

type DropdownMenuProps = ComponentPropsWithoutRef<"div"> & {
	children: ReactNode;
	defaultOpen?: boolean;
	defaultValue?: string;
	disabled?: boolean;
	name?: string;
	onOpenChange?: (open: boolean) => void;
	onValueChange?: (value: string) => void;
	open?: boolean;
	value?: string;
};

export const DropdownMenu = ({
	children,
	className,
	defaultOpen = false,
	defaultValue,
	disabled,
	id,
	name,
	onOpenChange,
	onValueChange,
	open,
	value,
	...props
}: Readonly<DropdownMenuProps>) => {
	const generatedId = useId();
	const triggerId = id ?? generatedId;
	const contentId = `${triggerId}-content`;
	const isOpenControlled = open !== undefined;
	const isValueControlled = value !== undefined;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
	const [selectedLabel, setSelectedLabel] = useState<ReactNode>(null);
	const [activeItemId, setActiveItemId] = useState<string | null>(null);
	const [position, setPosition] = useState<DropdownMenuPosition | null>(null);
	const itemsRef = useRef<DropdownMenuItemRecord[]>([]);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const isOpen = isOpenControlled ? open : uncontrolledOpen;
	const selectedValue = isValueControlled ? value : uncontrolledValue;

	const setOpen = useCallback(
		(nextOpen: boolean) => {
			if (disabled && nextOpen) return;

			if (!nextOpen) {
				setActiveItemId(null);
			}

			if (!isOpenControlled) {
				setUncontrolledOpen(nextOpen);
			}

			onOpenChange?.(nextOpen);
		},
		[disabled, isOpenControlled, onOpenChange]
	);

	const updatePosition = useCallback(() => {
		const triggerElement = triggerRef.current ?? getElementById<HTMLButtonElement>(triggerId);

		if (!triggerElement) return;

		const triggerRect = triggerElement.getBoundingClientRect();

		setPosition({
			left: triggerRect.left,
			top: triggerRect.bottom + 4,
			width: triggerRect.width
		});
	}, [triggerId]);

	const setSelectedValue = useCallback(
		(nextValue: string) => {
			if (!isValueControlled) {
				setUncontrolledValue(nextValue);
			}

			onValueChange?.(nextValue);
		},
		[isValueControlled, onValueChange]
	);

	const registerItem = useCallback(
		(item: DropdownMenuItemRecord) => {
			itemsRef.current = [...itemsRef.current.filter((currentItem) => currentItem.id !== item.id), item];

			if (isOpen && !item.disabled && (item.value === selectedValue || activeItemId === null)) {
				setActiveItemId(item.id);
			}

			return () => {
				itemsRef.current = itemsRef.current.filter((currentItem) => currentItem.id !== item.id);
			};
		},
		[activeItemId, isOpen, selectedValue]
	);

	const selectItem = useCallback(
		(item: DropdownMenuItemRecord, label: ReactNode) => {
			if (item.disabled) return;

			item.onSelect?.();

			if (item.value !== undefined) {
				setSelectedValue(item.value);
				setSelectedLabel(label);
			}

			setOpen(false);
			queueMicrotask(() => {
				(triggerRef.current ?? getElementById<HTMLButtonElement>(triggerId))?.focus();
			});
		},
		[setOpen, setSelectedValue, triggerId]
	);

	const setNextItemActive = useCallback(
		(direction: 1 | -1) => {
			const nextItem = getNextEnabledItem(itemsRef.current, activeItemId, direction);

			setActiveItemId(nextItem?.id ?? null);
		},
		[activeItemId]
	);

	const setFirstItemActive = useCallback(() => {
		setActiveItemId(getFirstEnabledItem(itemsRef.current)?.id ?? null);
	}, []);

	const setLastItemActive = useCallback(() => {
		setActiveItemId(getLastEnabledItem(itemsRef.current)?.id ?? null);
	}, []);

	const selectActiveItem = useCallback(() => {
		const activeItem = itemsRef.current.find((item) => item.id === activeItemId);

		if (!activeItem) return;

		selectItem(activeItem, activeItem.label);
	}, [activeItemId, selectItem]);

	useLayoutEffect(() => {
		if (!isOpen) return;

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [isOpen, updatePosition]);

	useEffect(() => {
		if (!isOpen) return;

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;

			if (!(target instanceof Node)) return;

			const triggerElement = triggerRef.current ?? getElementById<HTMLButtonElement>(triggerId);

			if (triggerElement?.contains(target) || contentRef.current?.contains(target)) return;

			setOpen(false);
		};

		document.addEventListener("pointerdown", handlePointerDown);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
		};
	}, [isOpen, setOpen, triggerId]);

	const contextValue = useMemo<DropdownMenuContextValue>(
		() => ({
			activeItemId,
			contentId,
			contentRef,
			disabled,
			isControlled: isValueControlled,
			name,
			open: isOpen,
			position,
			selectedLabel,
			selectedValue,
			setActiveItemId,
			setOpen,
			setSelectedLabel,
			setSelectedValue,
			triggerId,
			triggerRef,
			updatePosition,
			registerItem,
			selectActiveItem,
			selectItem,
			setFirstItemActive,
			setLastItemActive,
			setNextItemActive
		}),
		[
			activeItemId,
			contentId,
			disabled,
			isOpen,
			isValueControlled,
			name,
			position,
			registerItem,
			selectActiveItem,
			selectItem,
			selectedLabel,
			selectedValue,
			setOpen,
			setFirstItemActive,
			setLastItemActive,
			setNextItemActive,
			setSelectedValue,
			triggerId,
			updatePosition
		]
	);

	return (
		<DropdownMenuContext.Provider value={contextValue}>
			<div className={clsx("flex flex-col gap-y-[0.25rem]", className)} {...props}>
				{name && <input readOnly type="hidden" name={name} value={selectedValue ?? ""} />}
				{children}
			</div>
		</DropdownMenuContext.Provider>
	);
};
