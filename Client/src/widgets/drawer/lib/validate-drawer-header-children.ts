import { DrawerClose } from "@widgets/drawer/ui/drawer-close";
import { DrawerDescription } from "@widgets/drawer/ui/drawer-description";
import { DrawerTitle } from "@widgets/drawer/ui/drawer-title";
import { Children, isValidElement, ReactElement } from "react";

export const validateDrawerHeaderChildren = (children: ReactElement | Array<ReactElement>) => {
	let titleCount = 0;
	let descriptionCount = 0;
	let closeCount = 0;

	Children.forEach(children, (child) => {
		if (!isValidElement(child)) {
			throw new Error(`<Drawer.Header> children must be valid React elements. Invalid child detected: ${child}`);
		}

		const { type } = child;

		if (type !== DrawerTitle && type !== DrawerDescription && type !== DrawerClose) {
			throw new Error(`
				<Drawer> children must be a valid <Drawer.Title>, <Drawer.Description> or <Drawer.Close> components.
				Invalid child detected: ${type}.
			`);
		}

		if (type === DrawerTitle) titleCount++;
		if (type === DrawerDescription) descriptionCount++;
		if (type === DrawerClose) closeCount++;
	});

	if (titleCount > 1) {
		throw new Error("<Drawer.Header> expected to have only one <Drawer.Title> component.");
	}

	if (descriptionCount > 1) {
		throw new Error("<Drawer.Header> expected to have only one <Drawer.Description> component.");
	}

	if (closeCount > 1) {
		throw new Error("<Drawer.Header> expected to have only one <Drawer.Close> component.");
	}
};
