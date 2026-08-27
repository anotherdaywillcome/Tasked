"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

import { DropdownMenuContext, type DropdownMenuContextValue } from "./dropdown-menu-context";
import {
	getElementById,
	getFirstEnabledItem,
	getLastEnabledItem,
	getNextEnabledItem,
	getShortcutBindings,
	matchesShortcut
} from "./lib";
import type { DropdownMenuItemRecord, DropdownMenuPosition } from "./types";

type DropdownMenuProviderProps = {
	children: ReactNode;
	defaultOpen?: boolean;
	defaultValue?: string;
	disabled?: boolean;
	id?: string;
	name?: string;
	onOpenChange?: (open: boolean) => void;
	onValueChange?: (value: string) => void;
	open?: boolean;
	value?: string;
};

export const DropdownMenuProvider = ({
	children,
	defaultOpen = false,
	defaultValue,
	disabled,
	id,
	name,
	onOpenChange,
	onValueChange,
	open,
	value
}: Readonly<DropdownMenuProviderProps>) => {
	const generatedId = useId();
	const triggerId = id ?? generatedId;
	const contentId = `${triggerId}-content`;

	const isOpenControlled = open !== undefined;
	const isValueControlled = value !== undefined;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
	const [selectedLabel, setSelectedLabel] = useState<ReactNode>(null);
	const [activeItemId, setActiveItemId] = useState<string | null>(null);
	const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
	const [position, setPosition] = useState<DropdownMenuPosition | null>(null);

	const itemsRef = useRef<DropdownMenuItemRecord[]>([]);
	const submenuClosersRef = useRef<Map<string, () => void>>(new Map());
	const submenuOpenersRef = useRef<Map<string, () => void>>(new Map());
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const isOpen = isOpenControlled ? (open ?? false) : uncontrolledOpen;
	const selectedValue = isValueControlled ? value : uncontrolledValue;

	const shortcutBindings = useMemo(() => getShortcutBindings(children), [children]);

	const setOpen = useCallback(
		(nextOpen: boolean) => {
			if (disabled && nextOpen) {
				return;
			}

			if (!isOpenControlled) {
				setUncontrolledOpen(nextOpen);
			}

			if (!nextOpen) {
				setActiveItemId(null);
				setActiveSubmenuId(null);
				submenuClosersRef.current.forEach((close) => close());
			}

			onOpenChange?.(nextOpen);
		},
		[disabled, isOpenControlled, onOpenChange]
	);

	const updatePosition = useCallback(() => {
		const triggerElement = triggerRef.current ?? getElementById<HTMLButtonElement>(triggerId);
		if (!triggerElement) {
			return;
		}

		const rect = triggerElement.getBoundingClientRect();
		setPosition({
			left: rect.left,
			top: rect.bottom + 4,
			width: rect.width
		});
	}, [triggerId]);

	const setSelectedValue = useCallback(
		(nextValue: string) => {
			if (!isValueControlled) setUncontrolledValue(nextValue);
			onValueChange?.(nextValue);
		},
		[isValueControlled, onValueChange]
	);

	const registerItem = useCallback((item: DropdownMenuItemRecord) => {
		itemsRef.current = [...itemsRef.current.filter((c) => c.id !== item.id), item];
		return () => {
			itemsRef.current = itemsRef.current.filter((c) => c.id !== item.id);
		};
	}, []);

	const registerSubmenu = useCallback((submenuId: string, _parentSubmenuId: string | null, close: () => void) => {
		submenuClosersRef.current.set(submenuId, close);
		return () => {
			submenuClosersRef.current.delete(submenuId);
		};
	}, []);

	const registerSubmenuOpener = useCallback((submenuId: string, openFn: () => void) => {
		submenuOpenersRef.current.set(submenuId, openFn);
		return () => {
			submenuOpenersRef.current.delete(submenuId);
		};
	}, []);

	const setSubmenuOpen = useCallback(
		(submenuId: string, parentSubmenuId: string | null, nextOpen: boolean) => {
			if (nextOpen) {
				itemsRef.current
					.filter(
						(item) =>
							item.parentSubmenuId === parentSubmenuId && item.submenuId && item.submenuId !== submenuId
					)
					.forEach((item) => {
						submenuClosersRef.current.get(item.submenuId!)?.();
					});
				setActiveSubmenuId(submenuId);
			} else if (activeSubmenuId === submenuId) {
				setActiveSubmenuId(parentSubmenuId);
			}
		},
		[activeSubmenuId]
	);

	const getItems = useCallback(
		(submenuId: string | null) => itemsRef.current.filter((i) => i.parentSubmenuId === submenuId),
		[]
	);

	const setNextItemActive = useCallback(
		(direction: 1 | -1) => {
			const next = getNextEnabledItem(itemsRef.current, activeItemId, direction, activeSubmenuId);
			setActiveItemId(next?.id ?? null);
		},
		[activeItemId, activeSubmenuId]
	);

	const setFirstItemActive = useCallback(() => {
		const first = getFirstEnabledItem(itemsRef.current, activeSubmenuId);
		setActiveItemId(first?.id ?? null);
	}, [activeSubmenuId]);

	const setLastItemActive = useCallback(() => {
		const last = getLastEnabledItem(itemsRef.current, activeSubmenuId);
		setActiveItemId(last?.id ?? null);
	}, [activeSubmenuId]);

	const openActiveSubmenu = useCallback(() => {
		const active = itemsRef.current.find((i) => i.id === activeItemId);
		if (!active?.submenuId) {
			return;
		}

		const openFn = submenuOpenersRef.current.get(active.submenuId);
		if (!openFn) {
			return;
		}

		openFn();
		setActiveSubmenuId(active.submenuId);

		requestAnimationFrame(() => {
			const first = getFirstEnabledItem(itemsRef.current, active.submenuId!);
			setActiveItemId(first?.id ?? null);

			const subSurface = document.querySelector(
				`[data-dropdown-submenu-content="${active.submenuId}"]`
			) as HTMLElement | null;

			subSurface?.focus();
		});
	}, [activeItemId]);

	const closeActiveSubmenu = useCallback(() => {
		if (!activeSubmenuId) {
			return;
		}

		const openerItem = itemsRef.current.find((i) => i.submenuId === activeSubmenuId);
		const parentId = openerItem?.parentSubmenuId ?? null;

		submenuClosersRef.current.get(activeSubmenuId)?.();

		setActiveSubmenuId(parentId);

		if (openerItem) {
			setActiveItemId(openerItem.id);
		}

		requestAnimationFrame(() => {
			if (parentId === null) {
				contentRef.current?.focus();
				return;
			}

			const parentSurface = document.querySelector(
				`[data-dropdown-submenu-content="${parentId}"]`
			) as HTMLElement | null;

			parentSurface?.focus();
		});
	}, [activeSubmenuId]);

	const selectItem = useCallback(
		(item: DropdownMenuItemRecord, label: ReactNode) => {
			if (item.disabled) {
				return;
			}

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

	const selectActiveItem = useCallback(() => {
		const active = itemsRef.current.find((i) => i.id === activeItemId);
		if (!active) {
			return;
		}

		if (active.submenuId) {
			openActiveSubmenu();
			return;
		}

		selectItem(active, active.label);
	}, [activeItemId, openActiveSubmenu, selectItem]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const binding = shortcutBindings.find(({ shortcut }) => matchesShortcut(event, shortcut));
			if (!binding || binding.disabled) {
				return;
			}

			event.preventDefault();
			binding.onSelect?.();

			if (binding.value !== undefined) {
				setSelectedValue(binding.value);
				setSelectedLabel(binding.label);
			}

			if (isOpen) {
				setOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown, true);
		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [isOpen, setOpen, setSelectedValue, shortcutBindings]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;
			if (!(target instanceof Node)) {
				return;
			}

			const triggerElement = triggerRef.current ?? getElementById<HTMLButtonElement>(triggerId);
			if (triggerElement?.contains(target) || contentRef.current?.contains(target)) {
				return;
			}

			const openSubContents = document.querySelectorAll('[data-dropdown-submenu-content="true"]');
			for (const el of openSubContents) {
				if (el.contains(target)) {
					return;
				}
			}

			setOpen(false);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [isOpen, setOpen, triggerId]);

	useLayoutEffect(() => {
		if (!isOpen) {
			return;
		}

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [isOpen, updatePosition]);

	const contextValue = useMemo<DropdownMenuContextValue>(
		() => ({
			activeItemId,
			activeSubmenuId,
			contentId,
			contentRef,
			disabled,
			isControlled: isValueControlled,
			name,
			open: isOpen,
			position,
			selectedLabel,
			selectedValue,
			triggerId,
			triggerRef,
			setActiveItemId,
			setActiveSubmenuId,
			setOpen,
			setSelectedLabel,
			setSelectedValue,
			updatePosition,
			registerItem,
			registerSubmenu,
			registerSubmenuOpener,
			setSubmenuOpen,
			getItems,
			setFirstItemActive,
			setLastItemActive,
			setNextItemActive,
			openActiveSubmenu,
			closeActiveSubmenu,
			selectActiveItem,
			selectItem
		}),
		[
			activeItemId,
			activeSubmenuId,
			contentId,
			disabled,
			isValueControlled,
			name,
			isOpen,
			position,
			selectedLabel,
			selectedValue,
			triggerId,
			setOpen,
			setSelectedValue,
			updatePosition,
			registerItem,
			registerSubmenu,
			registerSubmenuOpener,
			setSubmenuOpen,
			getItems,
			setFirstItemActive,
			setLastItemActive,
			setNextItemActive,
			openActiveSubmenu,
			closeActiveSubmenu,
			selectActiveItem,
			selectItem
		]
	);

	return <DropdownMenuContext.Provider value={contextValue}>{children}</DropdownMenuContext.Provider>;
};
