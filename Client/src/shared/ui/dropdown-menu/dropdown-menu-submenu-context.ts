"use client";

import { createContext, type RefObject } from "react";

import { DropdownMenuPosition } from "./dropdown-menu";

export type DropdownMenuSubmenuContextValue = {
	id: string;
	parentSubmenuId: string | null;
	open: boolean;
	setOpen: (open: boolean) => void;
	position: DropdownMenuPosition | null;
	updatePosition: () => void;
	triggerId: string;
	triggerRef: RefObject<HTMLButtonElement | null>;
	contentRef: RefObject<HTMLDivElement | null>;
};

const dropdownMenuSubmenuContextInitialValues: DropdownMenuSubmenuContextValue = {
	id: "",
	parentSubmenuId: null,
	open: false,
	setOpen: () => {},
	position: null,
	updatePosition: () => {},
	triggerId: "",
	triggerRef: { current: null },
	contentRef: { current: null }
};

export const DropdownMenuSubmenuContext = createContext<DropdownMenuSubmenuContextValue>(
	dropdownMenuSubmenuContextInitialValues
);
