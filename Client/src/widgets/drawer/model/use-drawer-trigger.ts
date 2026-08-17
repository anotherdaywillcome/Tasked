"use client";

import type { MouseEvent, ReactNode } from "react";
import { Children, cloneElement, isValidElement, use } from "react";

import { DrawerContext } from "./drawer-context";

type DrawerTriggerElementProps = {
	onClick?: (event: MouseEvent<Element>) => void;
};

export const useDrawerTrigger = (id: string, children: ReactNode) => {
	const { open } = use(DrawerContext);

	const childrenArray = Children.toArray(children);

	if (childrenArray.length !== 1) {
		throw new Error("<Drawer.Trigger> expects exactly one React element child.");
	}

	const child = childrenArray[0];

	if (!isValidElement<DrawerTriggerElementProps>(child)) {
		throw new Error("<Drawer.Trigger> expects a valid React element as its child.");
	}

	const trigger = cloneElement(child, {
		onClick: (event: MouseEvent<Element>) => {
			event.stopPropagation();

			child.props.onClick?.(event);

			if (!event.defaultPrevented) {
				open(id);
			}
		}
	});

	return { trigger };
};
