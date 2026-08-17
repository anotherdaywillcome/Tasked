"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import type { ReactElement } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../button";
import { Spinner } from "../spinner";

export const SUBMIT_BUTTON_VARIANTS = {
	Primary: "primary",
	Secondary: "secondary"
} as const;

type SubmitButtonVariant = (typeof SUBMIT_BUTTON_VARIANTS)[keyof typeof SUBMIT_BUTTON_VARIANTS];

type SubmitButtonProps = {
	children: ReactElement | string;
	variant?: SubmitButtonVariant;
	className?: string;
	spinnerClasses?: string;
	childrenDisplayedWhenPending?: boolean;
};

type SubmitButtonSettings = {
	variant: SubmitButtonVariant;
	childrenDisplayedWhenPending: boolean;
};

const SUBMIT_BUTTON_DEFAULT_SETTINGS = {
	variant: SUBMIT_BUTTON_VARIANTS.Primary,
	childrenDisplayedWhenPending: true
} satisfies SubmitButtonSettings;

export const SubmitButton = ({
	variant = SUBMIT_BUTTON_DEFAULT_SETTINGS.variant,
	children,
	className,
	spinnerClasses,
	childrenDisplayedWhenPending = SUBMIT_BUTTON_DEFAULT_SETTINGS.childrenDisplayedWhenPending
}: Readonly<SubmitButtonProps>) => {
	const { pending } = useFormStatus();

	const displayChildren = !pending || childrenDisplayedWhenPending;

	const spinnerColors =
		variant === SUBMIT_BUTTON_VARIANTS.Secondary
			? {
					backgroundColor: "var(--white-pallete-10)",
					trackColor: "var(--white-pallete-20)",
					activeColor: "var(--white-pallete-90)"
				}
			: {
					backgroundColor: "var(--white-pallete-10)",
					trackColor: "var(--white-pallete-20)",
					activeColor: "var(--white-pallete-100)"
				};

	return (
		<Button disabled={pending} aria-disabled={pending} variant={variant} className={className} type="submit">
			<motion.span className="relative">
				{displayChildren && children}
				{pending && (
					<Spinner
						className={clsx("inline-block! ml-[4px]", { "ml-[unset]!": !displayChildren }, spinnerClasses)}
						size={24}
						{...spinnerColors}
					/>
				)}
			</motion.span>
		</Button>
	);
};
