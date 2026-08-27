import type { ReactNode, RefObject } from "react";

export type DropdownMenuPosition = {
	left: number;
	top: number;
	width: number;
};

export type DropdownMenuItemRecord = {
	id: string;
	label: ReactNode;
	value?: string;
	disabled?: boolean;
	parentSubmenuId: string | null;
	submenuId?: string;
	onSelect?: () => void;
};

export type DropdownMenuSubContextValue = {
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
