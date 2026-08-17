import { clsx } from "clsx";
import type { CSSProperties } from "react";

import { toCssUnit } from "../../lib/utils";

type DividerProps = {
	width?: number | string;
	height?: number | string;
	className?: string;
};

type DividerSettings = {
	width: number;
	height: number;
};

const DIVIDER_DEFAULT_SETTINGS = {
	width: 229,
	height: 5
} satisfies DividerSettings;

export const Divider = ({
	width = DIVIDER_DEFAULT_SETTINGS.width,
	height = DIVIDER_DEFAULT_SETTINGS.height,
	className
}: Readonly<DividerProps>) => {
	return (
		<div
			className={clsx(
				"rounded-[2.5rem] w-(--divider-width) h-(--divider-height) bg-[linear-gradient(90deg,_#40f_0%,_rgba(68,0,255,0)_100%)]",
				className
			)}
			style={
				{
					"--divider-width": toCssUnit(width),
					"--divider-height": toCssUnit(height)
				} as CSSProperties
			}
		/>
	);
};
