"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

import { DropdownMenuSubContext, useDropdownMenu } from "./context";
import { getElementById } from "./lib";
import type { DropdownMenuPosition, DropdownMenuSubContextValue } from "./types";

type DropdownMenuSubProps = {
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const DropdownMenuSub = ({
	children,
	defaultOpen = false,
	onOpenChange,
	open
}: Readonly<DropdownMenuSubProps>) => {
	const generatedId = useId();
	const { registerSubmenu } = useDropdownMenu("DropdownMenuSub");

	const isControlled = open !== undefined;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [position, setPosition] = useState<Omit<DropdownMenuPosition, "width"> | null>(null);

	const triggerRef = useRef<HTMLButtonElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const isOpen = isControlled ? open : uncontrolledOpen;

	const setOpen = useCallback(
		(nextOpen: boolean) => {
			if (!isControlled) {
				setUncontrolledOpen(nextOpen);
			}

			onOpenChange?.(nextOpen);
		},
		[isControlled, onOpenChange]
	);

	useEffect(() => registerSubmenu(() => setOpen(false)), [registerSubmenu, setOpen]);

	const updatePosition = useCallback(() => {
		const triggerElement = triggerRef.current ?? getElementById<HTMLButtonElement>(generatedId);

		if (!triggerElement) return;

		const triggerRect = triggerElement.getBoundingClientRect();

		setPosition({
			left: triggerRect.right - 4,
			top: triggerRect.top
		});
	}, [generatedId]);

	useLayoutEffect(() => {
		if (!isOpen) return;

		updatePosition();
	}, [isOpen, updatePosition]);

	const contextValue = useMemo<DropdownMenuSubContextValue>(
		() => ({
			contentRef,
			open: isOpen,
			position,
			setOpen,
			triggerId: generatedId,
			triggerRef,
			updatePosition
		}),
		[generatedId, isOpen, position, setOpen, updatePosition]
	);

	return (
		<DropdownMenuSubContext.Provider value={contextValue}>
			<div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
				{children}
			</div>
		</DropdownMenuSubContext.Provider>
	);
};
