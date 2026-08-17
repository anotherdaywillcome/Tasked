import type { ReactElement } from "react";
import { Fragment } from "react";

import { validateDrawerGroupChildren } from "../lib/validate-drawer-group-children";

type DrawerGroupProps = {
	children: Array<ReactElement>;
};

export const DrawerGroup = ({ children }: Readonly<DrawerGroupProps>) => {
	validateDrawerGroupChildren(children);

	return <Fragment>{children}</Fragment>;
};
