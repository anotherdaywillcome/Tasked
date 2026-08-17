import type { ReactNode } from "react";
import { use, useLayoutEffect } from "react";

import { DrawerContext } from "./drawer-context";

import { validateDrawerContentChildren } from "../lib";

export const useDrawerContent = (id: string, children: ReactNode) => {
	const { setContent } = use(DrawerContext);

	useLayoutEffect(() => {
		setContent(id, validateDrawerContentChildren(children));
	}, [children]);
};
