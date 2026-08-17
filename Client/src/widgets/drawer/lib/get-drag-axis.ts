import { DRAWER_POSITIONS, DrawerPosition } from "../config";

type getDragAxisParameters = {
	drawerPosition: DrawerPosition;
	isFirstInStack: boolean;
};

export const getDragAxis = ({ drawerPosition, isFirstInStack }: getDragAxisParameters) => {
	if (!isFirstInStack) return false;

	switch (drawerPosition) {
		case DRAWER_POSITIONS.Left:
		case DRAWER_POSITIONS.Right: {
			return "x";
		}
		case DRAWER_POSITIONS.Top:
		case DRAWER_POSITIONS.Bottom: {
			return "y";
		}
		default:
			return undefined;
	}
};
