"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { SelectProvider } from "./select-provider";

export type SelectItemRecord = {
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

export const Select = ({
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
};
