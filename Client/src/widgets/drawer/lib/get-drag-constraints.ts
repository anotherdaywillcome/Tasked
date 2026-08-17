import type { DrawerPosition } from "../config";
import { DRAWER_POSITIONS } from "../config";

type getDragConstraintsParameters = {
	drawerPosition: DrawerPosition;
	drawerWidth: number;
	drawerHeight: number;
};

export const getDragConstraints = ({ drawerPosition, drawerWidth, drawerHeight }: getDragConstraintsParameters) => {
	switch (drawerPosition) {
		case DRAWER_POSITIONS.Left: {
			return {
				left: drawerWidth,
				right: 10
			};
		}
		case DRAWER_POSITIONS.Right: {
			return {
				left: 10,
				right: drawerWidth
			};
		}
		case DRAWER_POSITIONS.Bottom: {
			return {
				top: 10,
				bottom: drawerHeight
			};
		}
		case DRAWER_POSITIONS.Top: {
			return {
				top: drawerHeight,
				bottom: 10
			};
		}
	}
};
