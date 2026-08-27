"use client";

import type { ReactNode, RefObject } from "react";
import { createContext } from "react";
import type { DropdownMenuItemRecord, DropdownMenuPosition } from "./types";

export type DropdownMenuContextValue = {
	activeItemId: string | null;
	activeSubmenuId: string | null;
	contentId: string;
	contentRef: RefObject<HTMLDivElement | null>;
	disabled?: boolean;
	isControlled: boolean;
	name?: string;
	open: boolean;
	position: DropdownMenuPosition | null;
	selectedLabel: ReactNode;
	selectedValue?: string;
	triggerId: string;
	triggerRef: RefObject<HTMLButtonElement | null>;
	setActiveItemId: (id: string | null) => void;
	setActiveSubmenuId: (id: string | null) => void;
	setOpen: (open: boolean) => void;
	setSelectedLabel: (label: ReactNode) => void;
	setSelectedValue: (value: string) => void;
	updatePosition: () => void;
	registerItem: (item: DropdownMenuItemRecord) => () => void;
	registerSubmenu: (submenuId: string, parentSubmenuId: string | null, close: () => void) => () => void;
	registerSubmenuOpener: (submenuId: string, open: () => void) => () => void;
	setSubmenuOpen: (submenuId: string, parentSubmenuId: string | null, open: boolean) => void;
	getItems: (submenuId: string | null) => DropdownMenuItemRecord[];
	setFirstItemActive: () => void;
	setLastItemActive: () => void;
	setNextItemActive: (direction: 1 | -1) => void;
	openActiveSubmenu: () => void;
	closeActiveSubmenu: () => void;
	selectActiveItem: () => void;
	selectItem: (item: DropdownMenuItemRecord, label: ReactNode) => void;
};

export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);
