"use client";

import type { ReactNode } from "react";

import { DropdownMenuSubmenuProvider } from "./dropdown-menu-submenu-provider";

export type DropdownMenuSubProps = {
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const DropdownMenuSubmenu = ({
	children,
	defaultOpen = false,
	open,
	onOpenChange
}: Readonly<DropdownMenuSubProps>) => (
	<DropdownMenuSubmenuProvider defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
		{children}
	</DropdownMenuSubmenuProvider>
);
