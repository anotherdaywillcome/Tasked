"use client";

import type { ReactNode } from "react";
import { use, useCallback, useId, useLayoutEffect, useRef, useState } from "react";

import { DropdownMenuContext } from "./dropdown-menu-context";
import type { DropdownMenuPosition } from "./dropdown-menu";
import { DropdownMenuSubmenuContext } from "./dropdown-menu-submenu-context";

type DropdownMenuSubProviderProps = {
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const DropdownMenuSubmenuProvider = ({
	children,
	defaultOpen = false,
	open,
	onOpenChange
}: Readonly<DropdownMenuSubProviderProps>) => {
	const generatedId = useId();
	const submenuId = generatedId;
	const triggerId = `${generatedId}-trigger`;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [position, setPosition] = useState<DropdownMenuPosition | null>(null);

	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const parentMenu = use(DropdownMenuContext)!;
	const parentSub = use(DropdownMenuSubmenuContext);

	const parentSubmenuId = parentSub?.id ?? null;

	const isControlled = open !== undefined;
	const isOpen = isControlled ? (open ?? false) : uncontrolledOpen;

	const setOpen = useCallback(
		(nextOpen: boolean) => {
			if (!isControlled) setUncontrolledOpen(nextOpen);
			onOpenChange?.(nextOpen);
			parentMenu.setSubmenuOpen(submenuId, parentSubmenuId, nextOpen);
		},
		[isControlled, onOpenChange, parentMenu, submenuId, parentSubmenuId]
	);

	const updatePosition = useCallback(() => {
		const trigger = triggerRef.current;
		if (!trigger) {
			return;
		}
		const rect = trigger.getBoundingClientRect();
		setPosition({
			left: rect.right - 4,
			top: rect.top,
			width: rect.width
		});
	}, []);

	useLayoutEffect(() => {
		const unregisterCloser = parentMenu.registerSubmenu(submenuId, parentSubmenuId, () => setOpen(false));
		const unregisterOpener = parentMenu.registerSubmenuOpener(submenuId, () => {
			updatePosition();
			setOpen(true);
		});
		return () => {
			unregisterCloser();
			unregisterOpener();
		};
	}, [parentMenu, submenuId, parentSubmenuId, setOpen, updatePosition]);

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

	// useLayoutEffect(() => {
	// 	if (!parentMenu.open && isOpen) {
	// 		setOpen(false);
	// 	}
	// }, [parentMenu.open, isOpen, setOpen]);

	if (!parentMenu.open && isOpen) {
		setOpen(false);
	}

	return (
		<DropdownMenuSubmenuContext
			value={{
				id: submenuId,
				parentSubmenuId,
				open: isOpen,
				setOpen,
				position,
				updatePosition,
				triggerId,
				triggerRef,
				contentRef
			}}
		>
			{children}
		</DropdownMenuSubmenuContext>
	);
};
