import { clsx } from "clsx";
import { ReactElement } from "react";

import { TabsContent } from "./tabs-content";
import { TabsContextProvider } from "./tabs-context-provider";
import { TabsList } from "./tabs-list";
import { TabsTrigger } from "./tabs-trigger";

type TabsComponents = {
	List: typeof TabsList;
	Trigger: typeof TabsTrigger;
	Content: typeof TabsContent;
};

type TabsProps = {
	defaultValue?: string;
	className?: string;
	children: ReactElement | Array<ReactElement>;
};

type Tabs = ((props: Readonly<TabsProps>) => ReactElement) & TabsComponents;

export const Tabs = (({ children, defaultValue, className }: Readonly<TabsProps>) => {
	return (
		<TabsContextProvider defaultValue={defaultValue}>
			<div className={clsx("relative h-full min-h-0 min-w-0", className)}>{children}</div>
		</TabsContextProvider>
	);
}) as Tabs;

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
