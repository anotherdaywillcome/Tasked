"use client";

import { DropdownMenuSubProvider } from "@shared/ui/dropdown-menu/dropdown-menu-submenu-provider";
import type { ReactNode } from "react";

export type DropdownMenuSubProps = {
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const DropdownMenuSub = ({
	children,
	defaultOpen = false,
	open,
	onOpenChange
}: Readonly<DropdownMenuSubProps>) => (
	<DropdownMenuSubProvider defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
		{children}
	</DropdownMenuSubProvider>
);
