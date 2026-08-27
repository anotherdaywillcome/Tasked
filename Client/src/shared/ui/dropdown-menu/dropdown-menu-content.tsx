"use client";

import { clsx } from "clsx";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type { KeyboardEvent, ReactNode } from "react";
import { use } from "react";
import { createPortal } from "react-dom";

import { DROPDOWN_MENU_CONTENT_ANIMATION_VARIANTS, DROPDOWN_MENU_TRANSITION } from "./animations";
import { DropdownMenuContext } from "./dropdown-menu-context";

type DropdownMenuContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
	align?: "start" | "center" | "end";
	children: ReactNode;
	portalled?: boolean;
};

export const DropdownMenuContent = ({
	align = "start",
	children,
	className,
	portalled = true,
	style,
	...props
}: Readonly<DropdownMenuContentProps>) => {
	const {
		contentId,
		contentRef,
		open,
		position,
		setNextItemActive,
		setFirstItemActive,
		setLastItemActive,
		selectActiveItem,
		openActiveSubmenu,
		closeActiveSubmenu,
		setOpen
	} = use(DropdownMenuContext)!;

	const alignOffset = align === "center" ? "-50%" : align === "end" ? "-100%" : undefined;

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.defaultPrevented) {
			return;
		}

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setNextItemActive(1);
				break;
			case "ArrowUp":
				event.preventDefault();
				setNextItemActive(-1);
				break;
			case "Home":
				event.preventDefault();
				setFirstItemActive();
				break;
			case "End":
				event.preventDefault();
				setLastItemActive();
				break;
			case "ArrowLeft":
				event.preventDefault();
				event.stopPropagation();
				closeActiveSubmenu();
				break;
			case "ArrowRight":
				event.preventDefault();
				event.stopPropagation();
				openActiveSubmenu();
				break;
			case "Escape":
				event.preventDefault();
				setOpen(false);
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				selectActiveItem();
				break;
		}
	};

	const content = (
		<AnimatePresence>
			{open && position && (
				<motion.div
					ref={contentRef}
					variants={DROPDOWN_MENU_CONTENT_ANIMATION_VARIANTS}
					initial="initial"
					animate="visible"
					exit="exit"
					transition={DROPDOWN_MENU_TRANSITION}
					className={clsx(
						"fixed z-[100] max-h-[14rem] overflow-y-auto rounded-[0.625rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-200) p-[0.25rem] shadow-[0_1rem_2rem_rgba(0,0,0,0.28)] backdrop-blur-[2rem]",
						className
					)}
					style={{
						left:
							align === "end"
								? position.left + position.width
								: align === "center"
									? position.left + position.width / 2
									: position.left,
						top: position.top,
						width: position.width,
						transform: alignOffset ? `translateX(${alignOffset})` : undefined,
						...style
					}}
					id={contentId}
					role="menu"
					tabIndex={-1}
					onKeyDown={handleKeyDown}
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
