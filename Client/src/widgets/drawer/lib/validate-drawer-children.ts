import type { ReactElement } from "react";
import { Children, isValidElement } from "react";

import { DrawerContent } from "../ui/drawer-content";
import { DrawerGroup } from "../ui/drawer-group";
import { DrawerTrigger } from "../ui/drawer-trigger";

export const validateDrawerChildren = (children: ReactElement | Array<ReactElement>) => {
	let triggerCount = 0;
	let contentCount = 0;
	let contentGroupCount = 0;

	Children.forEach(children, (child) => {
		if (!isValidElement(child)) {
			throw new Error(`<Drawer> children must be valid React elements. Invalid child detected: ${child}`);
		}

		const { type } = child;

		if (type !== DrawerTrigger && type !== DrawerContent && type !== DrawerGroup) {
			throw new Error(`
				<Drawer> children must be a valid <Drawer.Content>, <Drawer.Trigger> or <Drawer.Group> components.
				Invalid child detected: ${type}.
				Ensure all children are instances of <Drawer.Content>.`);
		}

		if (type === DrawerTrigger) triggerCount++;
		if (type === DrawerContent) contentCount++;
		if (type === DrawerGroup) contentGroupCount++;
	});

	if (triggerCount > 1) {
		throw new Error(
			"<Drawer> can only have one <Drawer.Trigger> child. If multiple triggers are necessary, consider placing them inside <Drawer.Content> component."
		);
	}

	if (contentCount > 1) {
		throw new Error(
			"<Drawer> can only have one <Drawer.Content> child. If multiple drawer contents are necessary, consider nesting them under the <Drawer.Group> component."
		);
	}

	if (contentGroupCount > 1) {
		throw new Error("<Drawer> can only have one <Drawer.Group> component.");
	}

	if (contentCount > 0 && contentGroupCount > 0) {
		throw new Error(`
			<Drawer> cannot have both <Drawer.Content> and <Drawer.Group> components.
			Please remove one of the components to avoid conflicts.
		`);
	}
};
