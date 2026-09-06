import { LastViewsDrawerTrigger } from "./last-views-drawer-trigger";
import { LastViewsDrawerContent } from "./last-views-drawer-content";

type LastViewsComponents = {
	DrawerTrigger: typeof LastViewsDrawerTrigger;
	DrawerContent: typeof LastViewsDrawerContent;
};

type LastViews = (() => null) & LastViewsComponents;

export const LastViews = () => {
	return null;
};

LastViews.DrawerTrigger = LastViewsDrawerTrigger;
LastViews.DrawerContent = LastViewsDrawerContent;
