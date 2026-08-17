import { use, useLayoutEffect } from "react";

import { DrawerContext } from "./drawer-context";

export const useDrawers = () => {
	const { drawers } = use(DrawerContext);

	useLayoutEffect(() => {
		let drawerRoot = document.getElementById("drawer-root");

		if (!drawerRoot) {
			drawerRoot = document.createElement("div");
			drawerRoot.id = "drawer-root";
			drawerRoot.className = "relative z-100";
			document.body.appendChild(drawerRoot);
		}
	}, []);

	return { drawers };
};
