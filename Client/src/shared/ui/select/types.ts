import type { ReactNode, RefObject } from "react";

export type SelectItemRecord = {
	disabled: boolean;
	id: string;
	label: string;
	value: string;
};

export type SelectPosition = {
	left: number;
	top: number;
	triggerHeight: number;
	triggerTop: number;
	width: number;
};

export type SelectContextValue = {
	activeItemId: string | null;
	contentId: string;
	contentRef: RefObject<HTMLDivElement | null>;
	disabled: boolean;
	open: boolean;
	position: SelectPosition | null;
	required: boolean;
	selectedLabel: ReactNode;
	selectedValue?: string;
	triggerId: string;
	triggerRef: RefObject<HTMLButtonElement | null>;
	registerItem: (item: SelectItemRecord) => () => void;
	selectItem: (item: SelectItemRecord) => void;
	setActiveItemId: (id: string | null) => void;
	setFirstItemActive: () => void;
	setLastItemActive: () => void;
	setNextItemActive: (direction: 1 | -1) => void;
	setOpen: (open: boolean) => void;
	selectActiveItem: () => void;
	typeahead: (character: string) => void;
	updatePosition: () => void;
};
