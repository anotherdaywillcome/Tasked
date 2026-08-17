"use client";

import { use, useLayoutEffect } from "react";

import type { DrawerProps } from "../ui";

import { DrawerContext } from "../model/drawer-context";

export const useDrawerConfig = ({ max, position }: Required<Pick<DrawerProps, "max" | "position">>) => {
	const { setConfig } = use(DrawerContext);

	useLayoutEffect(() => {
		setConfig({
			max: max,
			position: position
		});
	}, [max, position]);
};
