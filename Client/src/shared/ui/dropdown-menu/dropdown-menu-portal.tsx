"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type DropdownMenuPortalProps = {
	children: ReactNode;
};

export const DropdownMenuPortal = ({ children }: Readonly<DropdownMenuPortalProps>) => {
	if (typeof document === "undefined") {
		return null;
	}

	return createPortal(children, document.body);
};
