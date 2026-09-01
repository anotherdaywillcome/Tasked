"use client";

import { createContext, ReactNode, RefObject } from "react";

import { SelectOption, SelectPosition } from "@shared/ui";

type SelectContextValue = {
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
	registerItem: (item: SelectOption) => () => void;
	selectItem: (item: SelectOption) => void;
	setActiveItemId: (id: string | null) => void;
	setFirstItemActive: () => void;
	setLastItemActive: () => void;
	setNextItemActive: (direction: 1 | -1) => void;
	setOpen: (open: boolean) => void;
	selectActiveItem: () => void;
	typeahead: (character: string) => void;
	updatePosition: () => void;
};

const selectContextInitialValues: SelectContextValue = {
	activeItemId: null,
	contentId: "",
	contentRef: { current: null },
	disabled: false,
	open: false,
	position: null,
	required: false,
	selectedLabel: null,
	selectedValue: undefined,
	triggerId: "",
	triggerRef: { current: null },
	registerItem: () => () => {},
	selectItem: () => {},
	setActiveItemId: () => {},
	setFirstItemActive: () => {},
	setLastItemActive: () => {},
	setNextItemActive: () => {},
	setOpen: () => {},
	selectActiveItem: () => {},
	typeahead: () => {},
	updatePosition: () => {}
};

export const SelectContext = createContext<SelectContextValue>(selectContextInitialValues);
