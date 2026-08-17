import { clsx } from "clsx";
import type { Variants } from "motion";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type ValidationErrorMessageContentProps = {
	children: string;
	id?: string;
	validationId?: string;
	className?: string;
};

const VALIDATION_ERROR_MESSAGE_VARIANTS: Variants = {
	initial: {
		opacity: 0,
		x: 12
	},
	visible: {
		opacity: 1,
		x: 0
	},
	shake: {
		opacity: 1,
		x: [0, -8, 8, -6, 6, 0],
		transition: {
			type: "tween",
			ease: "easeInOut"
		}
	},
	exit: {
		opacity: 0,
		x: 12
	}
};

export const ValidationErrorMessageContent = ({
	children,
	id,
	validationId,
	className
}: Readonly<ValidationErrorMessageContentProps>) => {
	const lastValidationIdRef = useRef<string | null>(null);
	const [shouldShake, setShouldShake] = useState(false);

	useEffect(() => {
		if (!children) return;
		if (!validationId) return;

		if (lastValidationIdRef.current) {
			setShouldShake(true);
			lastValidationIdRef.current = validationId;

			const timeout = setTimeout(() => {
				setShouldShake(false);
			}, 250);

			return () => clearTimeout(timeout);
		}

		lastValidationIdRef.current = validationId;
	}, [validationId]);

	useEffect(() => {
		return () => {
			lastValidationIdRef.current = null;
		};
	}, []);

	if (!children) return null;

	return (
		<motion.small
			id={id}
			role="alert"
			variants={VALIDATION_ERROR_MESSAGE_VARIANTS}
			initial="initial"
			animate={shouldShake ? "shake" : "visible"}
			exit="exit"
			className={clsx(
				"block relative z-20 font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[1rem] tracking-[0.01em] text-(--accent-color-dengerous-1)",
				className
			)}
		>
			{children}
		</motion.small>
	);
};
