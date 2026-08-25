import type { ReactNode, Ref } from "react";

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
	onSelect?: () => void;
};

export type DropdownMenuContextValue = {
	activeItemId: string | null;
	contentId: string;
	contentRef: Ref<HTMLDivElement>;
	disabled?: boolean;
	isControlled: boolean;
	name?: string;
	open: boolean;
	position: DropdownMenuPosition | null;
	selectedLabel: ReactNode;
	selectedValue?: string;
	setActiveItemId: (itemId: string | null) => void;
	setOpen: (open: boolean) => void;
	setSelectedLabel: (label: ReactNode) => void;
	setSelectedValue: (value: string) => void;
	triggerId: string;
	triggerRef: Ref<HTMLButtonElement>;
	updatePosition: () => void;
	registerItem: (item: DropdownMenuItemRecord) => () => void;
	registerSubmenu: (close: () => void) => () => void;
	selectActiveItem: () => void;
	selectItem: (item: DropdownMenuItemRecord, label: ReactNode) => void;
	setFirstItemActive: () => void;
	setLastItemActive: () => void;
	setNextItemActive: (direction: 1 | -1) => void;
};

export type DropdownMenuSubContextValue = {
	contentRef: Ref<HTMLDivElement>;
	open: boolean;
	position: Omit<DropdownMenuPosition, "width"> | null;
	setOpen: (open: boolean) => void;
	triggerId: string;
	triggerRef: Ref<HTMLButtonElement>;
	updatePosition: () => void;
};
