"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import { SelectProvider } from "./select-provider";
import { SelectContent } from "./select-content";
import { SelectGroup } from "./select-group";
import { SelectItem } from "./select-item";
import { SelectLabel } from "./select-label";
import { SelectSeparator } from "./select-separator";
import { SelectTrigger } from "./select-trigger";
import { SelectValue } from "./select-value";

export type SelectOption = {
	disabled: boolean;
	id: string;
	label: string;
	value: string;
};

export type SelectPosition = {
	left: number;
	top: number;
	triggerHeight: number;
	triggerTop: number;
	width: number;
};

type SelectComponents = {
	Content: typeof SelectContent;
	Group: typeof SelectGroup;
	Item: typeof SelectItem;
	Label: typeof SelectLabel;
	Separator: typeof SelectSeparator;
	Trigger: typeof SelectTrigger;
	Value: typeof SelectValue;
};

export type SelectProps = Omit<ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> & {
	children: ReactNode;
	defaultOpen?: boolean;
	defaultValue?: string;
	disabled?: boolean;
	name?: string;
	onOpenChange?: (open: boolean) => void;
	onValueChange?: (value: string) => void;
	open?: boolean;
	required?: boolean;
	value?: string;
};

type Select = ((props: Readonly<SelectProps>) => ReactElement) & SelectComponents;

export const Select = (({
	children,
	className,
	defaultOpen = false,
	defaultValue,
	disabled = false,
	id,
	name,
	onOpenChange,
	onValueChange,
	open,
	required,
	value,
	...props
}: Readonly<SelectProps>) => {
	return (
		<SelectProvider
			className={className}
			defaultOpen={defaultOpen}
			defaultValue={defaultValue}
			disabled={disabled}
			id={id}
			name={name}
			onOpenChange={onOpenChange}
			onValueChange={onValueChange}
			open={open}
			required={required}
			value={value}
			{...props}
		>
			{children}
		</SelectProvider>
	);
}) as Select;

Select.Content = SelectContent;
Select.Group = SelectGroup;
Select.Item = SelectItem;
Select.Label = SelectLabel;
Select.Separator = SelectSeparator;
Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
