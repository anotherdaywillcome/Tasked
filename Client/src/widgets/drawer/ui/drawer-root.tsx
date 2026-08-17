"use client";

import { AnimatePresence } from "motion/react";

import type { DrawerPosition } from "../config";
import { useDrawerConfig } from "../lib";
import { useDrawers } from "../model";

import { DrawerInstance } from "./drawer-instance";

type DrawerRootProps = {
	max: number;
	position: DrawerPosition;
};

export const DrawerRoot = ({ max, position }: Readonly<DrawerRootProps>) => {
	useDrawerConfig({ max, position });

	const { drawers } = useDrawers();

	return (
		<AnimatePresence mode="popLayout">
			{drawers.map(({ id, content }, index) => (
				<DrawerInstance key={id} id={id} index={index} reversedIndex={drawers.length - 1 - index}>
					{content}
				</DrawerInstance>
			))}
		</AnimatePresence>
	);
};
