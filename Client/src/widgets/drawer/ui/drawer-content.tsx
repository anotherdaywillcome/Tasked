"use client";

import type { ReactNode } from "react";

import { useDrawerContent } from "../model";

export type DrawerContentProps = {
	children: ReactNode;
	id: string;
};

export const DrawerContent = ({ children, id }: Readonly<DrawerContentProps>) => {
	useDrawerContent(id, children);

	return null;
};
