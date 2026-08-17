import type { ReactElement } from "react";
import { Children } from "react";

import type { DrawerContentProps } from "../ui/drawer-content";
import { DrawerContent } from "../ui/drawer-content";
import type { DrawerTriggerProps } from "../ui/drawer-trigger";
import { DrawerTrigger } from "../ui/drawer-trigger";

// Not used
// Sits here just for example
export const getDrawerElements = (children: ReactElement | Array<ReactElement>) => {
	const drawerTriggerElements: Array<ReactElement<DrawerTriggerProps, typeof DrawerTrigger>> = [];
	const drawerContentElements: Array<ReactElement<DrawerContentProps, typeof DrawerContent>> = [];

	Children.forEach(children, (child) => {
		if (child.type === DrawerTrigger) {
			drawerTriggerElements.push(child as ReactElement<DrawerTriggerProps, typeof DrawerTrigger>);
		} else if (child.type === DrawerContent) {
			drawerContentElements.push(child as ReactElement<DrawerContentProps, typeof DrawerContent>);
		}
	});

	return { drawerTriggerElements, drawerContentElements };
};
