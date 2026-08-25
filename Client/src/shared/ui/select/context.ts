"use client";

import { createContext, useContext } from "react";

import type { SelectContextValue } from "./types";

export const SelectContext = createContext<SelectContextValue | null>(null);

export const useSelect = (componentName: string) => {
	const context = useContext(SelectContext);

	if (!context) {
		throw new Error(`${componentName} must be used within <Select>.`);
	}

	return context;
};
