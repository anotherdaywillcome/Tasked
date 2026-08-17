"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import { DROPDOWN_MENU_SUB_CONTENT_ANIMATION_VARIANTS, DROPDOWN_MENU_TRANSITION } from "./animations";
import { useDropdownMenuSub } from "./context";

type DropdownMenuSubContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
	children: ReactNode;
};

export const DropdownMenuSubContent = ({
	children,
	className,
	style,
	...props
}: Readonly<DropdownMenuSubContentProps>) => {
	const { contentRef, open, position } = useDropdownMenuSub("DropdownMenuSubContent");

	return (
		<AnimatePresence>
			{open && position && (
				<motion.div
					ref={contentRef}
					variants={DROPDOWN_MENU_SUB_CONTENT_ANIMATION_VARIANTS}
					initial="initial"
					animate="visible"
					exit="exit"
					transition={DROPDOWN_MENU_TRANSITION}
					className={clsx(
						"fixed z-[110] max-h-[14rem] min-w-[10rem] overflow-y-auto rounded-[0.625rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-200) p-[0.25rem] shadow-[0_1rem_2rem_rgba(0,0,0,0.28)] backdrop-blur-[2rem]",
						className
					)}
					style={{
						left: position.left,
						top: position.top,
						...style
					}}
					role="menu"
					{...props}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
