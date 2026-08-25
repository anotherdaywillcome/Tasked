"use client";

import { motion } from "motion/react";
import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { useId, useState } from "react";

type CheckboxProps = ComponentPropsWithoutRef<"input"> & {
	label: string;
	name: string;
	value: string;
};

export const Checkbox = ({
	label,
	name,
	value,
	checked: controlledChecked,
	defaultChecked = false,
	disabled,
	onChange,
	...props
}: Readonly<CheckboxProps>) => {
	const checkboxId = useId();
	const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
	const checked = controlledChecked ?? uncontrolledChecked;

	const handleCheckboxCheck = (event: ChangeEvent<HTMLInputElement>) => {
		if (controlledChecked === undefined) {
			setUncontrolledChecked(event.target.checked);
		}

		onChange?.(event);
	};

	return (
		<label
			htmlFor={checkboxId}
			className="inline-flex cursor-pointer items-center gap-2 has-disabled:cursor-not-allowed has-disabled:opacity-50"
		>
			<input
				id={checkboxId}
				type="checkbox"
				className="peer sr-only"
				name={name}
				value={value}
				checked={checked}
				onChange={handleCheckboxCheck}
				disabled={disabled}
				{...props}
			/>
			<motion.div
				animate={{
					backgroundColor: checked ? "var(--geek-blue-6)" : "rgba(1,0,9,.1)"
				}}
				className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-(--geek-blue-6) transition-shadow peer-focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)]"
				aria-hidden="true"
			>
				<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<motion.path
						d="M0.75 3.58L3.58 6.41L9.25 0.75"
						fill="none"
						stroke="white"
						strokeWidth={1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
						initial={false}
						animate={{
							pathLength: checked ? 1 : 0,
							opacity: checked ? 1 : 0
						}}
						transition={{ duration: 0.2 }}
					/>
				</svg>
			</motion.div>
			<span className="sr-only">{label}</span>
		</label>
	);
};
