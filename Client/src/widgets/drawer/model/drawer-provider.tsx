"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";

import type { Drawer, DrawerConfig } from "./drawer-context";
import { DrawerContext } from "./drawer-context";

type DrawerContent = {
	id: string;
	content: ReactNode;
};

type DrawerProviderProps = {
	children: ReactNode;
};

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
	const [drawers, setDrawers] = useState<Array<Drawer> | []>([]);
	const [config, setConfig] = useState<DrawerConfig>({
		max: null,
		position: null
	});

	const drawersContent = useRef<Array<DrawerContent>>([]);

	const isOpen = (id: string) => drawers.some((drawer) => drawer.id === id);

	const open = (id: string) => {
		if (drawers.some((drawer) => drawer.id === id)) {
			return;
		}

		const target = drawersContent.current.find((item) => item.id === id);

		if (!target) {
			console.error("No content found for trigger id:", id);
			return;
		}

		setDrawers((prev) => [
			...prev,
			{
				id,
				content: target.content
			}
		]);
	};

	const close = (id: string) => {
		setDrawers((prev) => prev.filter((drawer) => drawer.id !== id));
	};

	const closeAll = () => {
		setDrawers([]);
	};

	const reorder = (id: string) => {
		setDrawers((prev) => {
			const drawerToReorder = prev.find((drawer) => drawer.id === id);
			if (!drawerToReorder) return prev;

			const otherDrawers = prev.filter((drawer) => drawer.id !== id);
			return [...otherDrawers, drawerToReorder];
		});
	};

	const setContent = (id: string, content: ReactNode) => {
		drawersContent.current.push({
			id,
			content
		});
	};

	return (
		<DrawerContext
			value={{
				isOpen,
				drawers,
				config,
				open,
				close,
				closeAll,
				reorder,
				setConfig,
				setContent
			}}
		>
			{children}
		</DrawerContext>
	);
};
