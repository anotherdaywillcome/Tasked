"use client";

import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { use } from "react";

import { DropdownMenuContent } from "./dropdown-menu-content";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuGroup } from "./dropdown-menu-group";
import { DropdownMenuItem } from "./dropdown-menu-item";
import { DropdownMenuPortal } from "./dropdown-menu-portal";
import { DropdownMenuProvider } from "./dropdown-menu-provider";
import { DropdownMenuSeparator } from "./dropdown-menu-separator";
import { DropdownMenuShortcut } from "./dropdown-menu-shortcut";
import { DropdownMenuSub } from "./dropdown-menu-sub";
import { DropdownMenuSubContent } from "./dropdown-menu-sub-content";
import { DropdownMenuSubTrigger } from "./dropdown-menu-sub-trigger";
import { DropdownMenuTrigger } from "./dropdown-menu-trigger";

export type { DropdownMenuItemRecord, DropdownMenuPosition } from "./types";

type DropdownMenuComponents = {
	Trigger: typeof DropdownMenuTrigger;
	Content: typeof DropdownMenuContent;
	Item: typeof DropdownMenuItem;
	Group: typeof DropdownMenuGroup;
	Sub: typeof DropdownMenuSub;
	SubTrigger: typeof DropdownMenuSubTrigger;
	SubContent: typeof DropdownMenuSubContent;
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

const DropdownMenuValue = ({
	children,
	name,
	...props
}: {
	children: ReactNode;
	name?: string;
} & ComponentPropsWithoutRef<"div">) => {
	const { selectedValue } = use(DropdownMenuContext)!;

	return (
		<div {...props}>
			{name && <input readOnly type="hidden" name={name} value={selectedValue ?? ""} />}
			{children}
		</div>
	);
};

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
			<DropdownMenuValue name={name} className={clsx("flex flex-col gap-y-[0.25rem]", className)} {...props}>
				{children}
			</DropdownMenuValue>
		</DropdownMenuProvider>
	);
}) as DropdownMenu;

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;
DropdownMenu.SubContent = DropdownMenuSubContent;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Shortcut = DropdownMenuShortcut;
