import { createContext } from "react";

import { TabDirection } from "./tabs";

type TabsContextValue = {
	addTab: (tab: string) => void;
	activeTab: string | null;
	setActiveTab: (tab: string) => void;
	direction: TabDirection;
};

const tabsContextInitialValues = {
	addTab: () => {},
	activeTab: null,
	setActiveTab: () => {},
	direction: null
};

export const TabsContext = createContext<TabsContextValue>(tabsContextInitialValues);
