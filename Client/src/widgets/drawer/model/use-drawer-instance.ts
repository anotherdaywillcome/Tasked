import type { PanInfo, Variants } from "motion/react";
import type { RefObject } from "react";
import { use, useEffect, useLayoutEffect, useState } from "react";

import { DRAWER_POSITIONS, getDrawerAnimationVariantsConfig } from "../config";

import { DrawerContext } from "./drawer-context";

export const useDrawerInstance = (id: string, reversedIndex: number, drawerRef: RefObject<HTMLElement | null>) => {
	const {
		config: { position, max },
		close,
		reorder
	} = use(DrawerContext);

	const [drawerSize, setDrawerSize] = useState({
		width: 0,
		height: 0
	});

	useLayoutEffect(() => {
		const drawerElement = drawerRef.current;
		if (!drawerElement) return;

		const updateDrawerSize = () => {
			setDrawerSize({
				width: drawerElement.offsetWidth,
				height: drawerElement.offsetHeight
			});
		};

		updateDrawerSize();

		const resizeObserver = new ResizeObserver(updateDrawerSize);
		resizeObserver.observe(drawerElement);

		return () => resizeObserver.disconnect();
	}, [drawerRef]);

	useEffect(() => {
		const handleEscapeKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") close(id);
		};

		window.addEventListener("keydown", handleEscapeKeyDown);
		return () => window.removeEventListener("keydown", handleEscapeKeyDown);
	}, [close, id]);

	const isFirstInStack = reversedIndex === 0;
	const isLastInStack = reversedIndex > (max ?? 0) - 1;

	const { initial, base, last, exit, hover } = getDrawerAnimationVariantsConfig({
		width: drawerSize.width,
		height: drawerSize.height,
		max: max ?? 1,
		reversedIndex
	});

	const animationVariants: Variants = {
		initial: initial[position!],
		base: base[position!],
		last: last[position!],
		exit: exit[position!],
		hover: hover[position!]
	};

	const handleInteractionEnd = (_: Event, { offset, velocity }: PanInfo) => {
		switch (position) {
			case DRAWER_POSITIONS.Left:
				if (offset.x < 100 || velocity.x < 0.4) close(id);
				break;
			case DRAWER_POSITIONS.Right:
				if (offset.x > 100 || velocity.x > 0.4) close(id);
				break;
			case DRAWER_POSITIONS.Bottom:
				if (offset.y > 150 || velocity.y > 400) close(id);
				break;
			case DRAWER_POSITIONS.Top:
				if (offset.y < -150 || velocity.y < -400) close(id);
				break;
		}
	};

	return {
		drawer: { position: position, width: drawerSize.width, height: drawerSize.height },
		animationVariants,
		isFirstInStack,
		isLastInStack,
		handleInteractionEnd,
		handleReorder: () => reorder(id)
	};
};
