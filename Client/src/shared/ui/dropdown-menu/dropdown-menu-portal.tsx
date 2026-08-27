"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type DropdownMenuPortalProps = {
	children: ReactNode;
	container?: HTMLElement | null;
};

export const DropdownMenuPortal = ({ children, container }: DropdownMenuPortalProps) => {
	if (typeof document === "undefined") {
		return null;
	}

	return createPortal(children, container ?? document.body);
};
