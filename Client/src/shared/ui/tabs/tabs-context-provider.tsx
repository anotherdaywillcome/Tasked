"use client";

import { LayoutGroup } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useId, useState } from "react";

import { TabsContext } from "./tabs-context";

type TabsContextProviderProps = {
	defaultValue?: string;
	children: ReactNode;
};

export const TabsContextProvider = ({ children, defaultValue }: Readonly<TabsContextProviderProps>) => {
	const layoutGroupId = useId();
	const [tabs, setTabs] = useState<Array<string>>([]);
	const [activeTab, setActiveTab] = useState<string | null>(defaultValue ?? null);
	const [direction, setDirection] = useState<"left" | "right" | null>(null);

	const addTab = useCallback((tab: string) => {
		setTabs((prev) => {
			if (prev.includes(tab)) return prev;
			return [...prev, tab];
		});
		setActiveTab((prev) => prev ?? tab);
	}, []);

	const setActiveTabWithDirection = useCallback(
		(nextValue: string) => {
			if (activeTab === nextValue) return;

			const currentIndex = activeTab ? tabs.indexOf(activeTab) : -1;
			const nextIndex = tabs.indexOf(nextValue);

			if (currentIndex !== -1 && nextIndex !== -1) {
				setDirection(nextIndex > currentIndex ? "right" : "left");
			} else {
				setDirection(null);
			}

			setActiveTab(nextValue);
		},
		[activeTab, tabs]
	);

	return (
		<LayoutGroup id={layoutGroupId}>
			<TabsContext value={{ addTab, activeTab, setActiveTabWithDirection, direction }}>{children}</TabsContext>
		</LayoutGroup>
	);
};
