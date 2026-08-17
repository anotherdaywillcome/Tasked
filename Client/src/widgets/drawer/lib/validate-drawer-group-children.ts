import type { ReactElement } from "react";
import { Children, isValidElement } from "react";

import { DrawerContent } from "../ui/drawer-content";

export const validateDrawerGroupChildren = (children: Array<ReactElement>) => {
	Children.forEach(children, (child) => {
		if (!isValidElement(child)) {
			throw new Error(
				`<Drawer.ContentGroup> children must be valid React elements. Invalid child detected: ${child}`
			);
		}

		const { type } = child;

		if (type !== DrawerContent) {
			throw new Error(`
				<Drawer.ContentGroup> children must be a valid <Drawer.Content> components.
				Invalid child detected: ${type}.
				Ensure all children are instances of <Drawer.Content>.`);
		}
	});
};
