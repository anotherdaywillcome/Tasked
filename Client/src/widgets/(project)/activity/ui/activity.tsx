import { ActivityDrawerContent } from "./activity-drawer-content";
import { ActivityDrawerTrigger } from "./activity-drawer-trigger";

type ActivityComponents = {
	DrawerTrigger: typeof ActivityDrawerTrigger;
	DrawerContent: typeof ActivityDrawerContent;
};

type Activity = (() => null) & ActivityComponents;

export const Activity = () => {
	return null;
};

Activity.DrawerTrigger = ActivityDrawerTrigger;
Activity.DrawerContent = ActivityDrawerContent;
