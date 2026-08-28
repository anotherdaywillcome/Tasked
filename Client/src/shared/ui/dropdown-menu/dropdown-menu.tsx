"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import { DropdownMenuContent } from "./dropdown-menu-content";
import { DropdownMenuGroup } from "./dropdown-menu-group";
import { DropdownMenuItem } from "./dropdown-menu-item";
import { DropdownMenuPortal } from "./dropdown-menu-portal";
import { DropdownMenuProvider } from "./dropdown-menu-provider";
import { DropdownMenuSeparator } from "./dropdown-menu-separator";
import { DropdownMenuShortcut } from "./dropdown-menu-shortcut";
import { DropdownMenuSubmenu } from "./dropdown-menu-submenu";
import { DropdownMenuSubmenuContent } from "./dropdown-menu-submenu-content";
import { DropdownMenuSubmenuTrigger } from "./dropdown-menu-submenu-trigger";
import { DropdownMenuTrigger } from "./dropdown-menu-trigger";
import { DropdownMenuWrapper } from "./dropdown-menu-wrapper";

export type DropdownMenuPosition = {
	left: number;
	top: number;
	width: number;
};

export type DropdownMenuItemRecord = {
	id: string;
	label: ReactNode;
	value?: string;
	disabled?: boolean;
	parentSubmenuId: string | null;
	submenuId?: string;
	onSelect?: () => void;
};

type DropdownMenuComponents = {
	Trigger: typeof DropdownMenuTrigger;
	Content: typeof DropdownMenuContent;
	Item: typeof DropdownMenuItem;
	Group: typeof DropdownMenuGroup;
	Submenu: typeof DropdownMenuSubmenu;
	SubmenuTrigger: typeof DropdownMenuSubmenuTrigger;
	SubmenuContent: typeof DropdownMenuSubmenuContent;
	Portal: typeof DropdownMenuPortal;
	Separator: typeof DropdownMenuSeparator;
	Shortcut: typeof DropdownMenuShortcut;
};

type DropdownMenuProps = ComponentPropsWithoutRef<"div"> & {
	children: ReactNode;
	defaultOpen?: boolean;
	defaultValue?: string;
	disabled?: boolean;
	name?: string;
	onOpenChange?: (open: boolean) => void;
	onValueChange?: (value: string) => void;
	open?: boolean;
	value?: string;
};

type DropdownMenu = ((props: Readonly<DropdownMenuProps>) => ReactElement) & DropdownMenuComponents;

export const DropdownMenu = (({
	children,
	className,
	defaultOpen = false,
	defaultValue,
	disabled,
	id,
	name,
	onOpenChange,
	onValueChange,
	open,
	value,
	...props
}: Readonly<DropdownMenuProps>) => {
	return (
		<DropdownMenuProvider
			id={id}
			disabled={disabled}
			defaultOpen={defaultOpen}
			defaultValue={defaultValue}
			name={name}
			open={open}
			value={value}
			onOpenChange={onOpenChange}
			onValueChange={onValueChange}
		>
			<DropdownMenuWrapper name={name} className={clsx("flex flex-col gap-y-[0.25rem]", className)} {...props}>
				{children}
			</DropdownMenuWrapper>
		</DropdownMenuProvider>
	);
}) as DropdownMenu;

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.Submenu = DropdownMenuSubmenu;
DropdownMenu.SubmenuTrigger = DropdownMenuSubmenuTrigger;
DropdownMenu.SubmenuContent = DropdownMenuSubmenuContent;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Shortcut = DropdownMenuShortcut;
