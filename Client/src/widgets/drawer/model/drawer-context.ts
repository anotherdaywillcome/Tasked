"use client";

import type { ReactNode } from "react";
import { createContext } from "react";

import { DrawerPosition } from "../config";

export type Drawer = {
	id: string;
	content: ReactNode;
};

export type DrawerConfig = {
	max: number | null;
	position: DrawerPosition | null;
};

export type DrawerContextValue = {
	isOpen: (id: string) => boolean;
	drawers: Array<Drawer> | [];
	config: DrawerConfig;
	open: (id: string) => void;
	close: (id: string) => void;
	closeAll: () => void;
	reorder: (id: string) => void;
	setContent: (id: string, content: ReactNode) => void;
	setConfig: (config: DrawerConfig) => void;
};

const drawerContextInitialValues = {
	drawers: [],
	config: {
		max: null,
		position: null
	},
	isOpen: (id: string) => false,
	open: () => {},
	close: () => {},
	closeAll: () => {},
	reorder: () => {},
	setContent: () => {},
	setConfig: () => {}
};

export const DrawerContext = createContext<DrawerContextValue>(drawerContextInitialValues);
