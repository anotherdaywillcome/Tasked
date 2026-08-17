"use client";

import { createContext, useContext } from "react";

import type { DropdownMenuContextValue, DropdownMenuSubContextValue } from "./types";

export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);
export const DropdownMenuSubContext = createContext<DropdownMenuSubContextValue | null>(null);

export const useDropdownMenu = (componentName: string) => {
	const context = useContext(DropdownMenuContext);

	if (!context) {
		throw new Error(`${componentName} must be used within <DropdownMenu>.`);
	}

	return context;
};

export const useDropdownMenuSub = (componentName: string) => {
	const context = useContext(DropdownMenuSubContext);

	if (!context) {
		throw new Error(`${componentName} must be used within <DropdownMenuSub>.`);
	}

	return context;
};
