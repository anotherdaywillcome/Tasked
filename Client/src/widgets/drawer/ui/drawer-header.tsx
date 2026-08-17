import type { ReactElement } from "react";

import { validateDrawerHeaderChildren } from "../lib/validate-drawer-header-children";

type DrawerHeaderProps = {
	children: ReactElement | Array<ReactElement>;
};

export const DrawerHeader = ({ children }: Readonly<DrawerHeaderProps>) => {
	validateDrawerHeaderChildren(children);

	return <header className="relative w-full flex items-center justify-between">{children}</header>;
};
