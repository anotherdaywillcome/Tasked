import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

export const validateDrawerContentChildren = (children: ReactNode) => {
	return Children.toArray(children).map((child) => {
		if (!isValidElement(child)) {
			throw new Error(
				`<Drawer.Content> only accepts valid React elements as children. ` +
					`Encountered an invalid child: ${typeof child}.`
			);
		}

		return child;
	});
};
