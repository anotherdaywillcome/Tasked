"use client";

import type { ReactNode } from "react";
import { Fragment } from "react";

import { useDrawerTrigger } from "../model";

export type DrawerTriggerProps = {
	id: string;
	onClick?: () => void;
	children: ReactNode;
};

export const DrawerTrigger = ({ id, children }: Readonly<DrawerTriggerProps>) => {
	const { trigger } = useDrawerTrigger(id, children);

	return <Fragment>{trigger}</Fragment>;
};
