"use client";

import { clsx } from "clsx";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { use, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import { SelectContext } from "./context";

export type SelectContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
	children: ReactNode;
	alignItemWithTrigger?: boolean;
	align?: "start" | "center" | "end";
	portalled?: boolean;
	sideOffset?: number;
};

export const SelectContent = ({
	align = "start",
	alignItemWithTrigger = true,
	children,
	className,
	portalled = true,
	sideOffset = 4,
	style,
	...props
}: Readonly<SelectContentProps>) => {
	const { contentId, contentRef, open, position, selectedValue } = use(SelectContext);

	const [alignedTop, setAlignedTop] = useState<number | null>(null);

	useLayoutEffect(() => {
		if (!open || !position || !alignItemWithTrigger || !contentRef.current) {
			setAlignedTop(null);
			return;
		}

		const content = contentRef.current;
		const selected = content.querySelector<HTMLElement>("[data-selected=true]");
		if (!selected) {
			return;
		}

		content.scrollTop = selected.offsetTop - content.clientHeight / 2 + selected.offsetHeight / 2;

		const selectedCenter = selected.offsetTop - content.scrollTop + selected.offsetHeight / 2;
		const desiredTop = position.triggerTop + position.triggerHeight / 2 - selectedCenter;
		const viewportPadding = 8;
		const maximumTop = Math.max(viewportPadding, window.innerHeight - content.offsetHeight - viewportPadding);

		setAlignedTop(Math.min(Math.max(desiredTop, viewportPadding), maximumTop));
	}, [alignItemWithTrigger, contentRef, open, position, selectedValue]);

	const content = (
		<AnimatePresence>
			{open && position && (
				<motion.div
					ref={contentRef}
					id={contentId}
					role="listbox"
					initial={{ opacity: 0, scale: 0.98, y: -4 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.98, y: -4 }}
					transition={{ duration: 0.14, ease: "easeOut" }}
					className={clsx(
						"fixed z-[100] overflow-hidden overscroll-contain rounded-[0.625rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-200) p-[0.25rem] shadow-[0_1rem_2rem_rgba(0,0,0,0.28)] backdrop-blur-[2rem] [scrollbar-color:var(--geek-blue-6)_transparent] [scrollbar-width:thin]",
						className
					)}
					style={{
						left:
							align === "end"
								? position.left + position.width
								: align === "center"
									? position.left + position.width / 2
									: position.left,
						top: alignedTop ?? position.top + sideOffset - 4,
						width: position.width,
						transform:
							align === "center" ? "translateX(-50%)" : align === "end" ? "translateX(-100%)" : undefined,
						transformOrigin: "top",
						maxHeight: "min(14rem, calc(100dvh - 1rem))",
						...style
					}}
					{...props}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);

	if (!portalled || typeof document === "undefined") {
		return content;
	}

	return createPortal(content, document.body);
};
