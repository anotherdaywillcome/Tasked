"use client";

import { LayoutGroup } from "motion/react";
import type { ReactNode } from "react";
import { useId, useState } from "react";

import { TabsContext } from "./tabs-context";
import { TabDirection } from "./tabs";

type TabsContextProviderProps = {
	defaultValue?: string;
	children: ReactNode;
};

export const TabsContextProvider = ({ children, defaultValue }: Readonly<TabsContextProviderProps>) => {
	const layoutGroupId = useId();

	const [tabs, setTabs] = useState<Array<string>>([]);
	const [activeTab, setCurrentActiveTab] = useState<string | null>(defaultValue ?? null);
	const [direction, setDirection] = useState<TabDirection>(null);

	const addTab = (tab: string) => {
		setTabs((previousTabs) => {
			if (previousTabs.includes(tab)) {
				return previousTabs;
			}

			return [...previousTabs, tab];
		});

		setCurrentActiveTab((previousTab) => previousTab ?? tab);
	};

	const setActiveTab = (nextValue: string) => {
		if (activeTab === nextValue) {
			return;
		}

		const currentIndex = activeTab ? tabs.indexOf(activeTab) : -1;
		const nextIndex = tabs.indexOf(nextValue);

		if (currentIndex !== -1 && nextIndex !== -1) {
			setDirection(nextIndex > currentIndex ? "right" : "left");
		} else {
			setDirection(null);
		}

		setCurrentActiveTab(nextValue);
	};

	return (
		<LayoutGroup id={layoutGroupId}>
			<TabsContext value={{ addTab, activeTab, setActiveTab, direction }}>{children}</TabsContext>
		</LayoutGroup>
	);
};
