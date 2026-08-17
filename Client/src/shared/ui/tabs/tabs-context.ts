import { createContext } from "react";

type TabsContextValue = {
	addTab: (tab: string) => void;
	activeTab: string | null;
	setActiveTabWithDirection: (tab: string) => void;
	direction: "left" | "right" | null;
};

export const TabsContext = createContext<TabsContextValue>({} as TabsContextValue);
