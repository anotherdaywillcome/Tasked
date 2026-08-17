import type { ReactElement } from "react";
import { MotionConfig } from "motion/react";

import { MOTION_CONFIG_DRAWER } from "@shared/config";

import type { DrawerPosition } from "../config";
import { DRAWER_DEFAULT_SETTINGS } from "../config";
import { validateDrawerChildren } from "../lib/validate-drawer-children";
import { DrawerProvider } from "../model/drawer-provider";

import { DrawerClose } from "./drawer-close";
import { DrawerContent } from "./drawer-content";
import { DrawerDescription } from "./drawer-description";
import { DrawerFooter } from "./drawer-footer";
import { DrawerGroup } from "./drawer-group";
import { DrawerHeader } from "./drawer-header";
import { DrawerRoot } from "./drawer-root";
import { DrawerTitle } from "./drawer-title";
import { DrawerTrigger } from "./drawer-trigger";
import { DrawerBackdrop } from "./drawer-backdrop";

type DrawerComponents = {
	Trigger: typeof DrawerTrigger;
	Content: typeof DrawerContent;
	Group: typeof DrawerGroup;
	Header: typeof DrawerHeader;
	Footer: typeof DrawerFooter;
	Close: typeof DrawerClose;
	Title: typeof DrawerTitle;
	Description: typeof DrawerDescription;
};

export type DrawerProps = {
	children: ReactElement | Array<ReactElement>;
	max?: number;
	position?: DrawerPosition;
	showBackdrop?: boolean;
};

type Drawer = ((props: Readonly<DrawerProps>) => ReactElement) & DrawerComponents;

export const Drawer = (({
	max = DRAWER_DEFAULT_SETTINGS.max,
	position = DRAWER_DEFAULT_SETTINGS.position,
	showBackdrop = DRAWER_DEFAULT_SETTINGS.showBackdrop,
	children
}: Readonly<DrawerProps>) => {
	validateDrawerChildren(children);

	return (
		<MotionConfig {...MOTION_CONFIG_DRAWER}>
			<DrawerProvider>
				<DrawerBackdrop showBackdrop={showBackdrop} />
				<DrawerRoot max={max} position={position} />
				{children}
			</DrawerProvider>
		</MotionConfig>
	);
}) as Drawer;

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Group = DrawerGroup;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Close = DrawerClose;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
