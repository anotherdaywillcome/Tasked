"use client";

import { clsx } from "clsx";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { use } from "react";

import { DROPDOWN_MENU_SUB_CONTENT_ANIMATION_VARIANTS, DROPDOWN_MENU_TRANSITION } from "./animations";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuSubmenuContext } from "./dropdown-menu-submenu-context";

type DropdownMenuSubContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
	children: ReactNode;
};

export const DropdownMenuSubmenuContent = ({
	children,
	className,
	style,
	...props
}: Readonly<DropdownMenuSubContentProps>) => {
	const {
		setNextItemActive,
		setFirstItemActive,
		setLastItemActive,
		selectActiveItem,
		openActiveSubmenu,
		closeActiveSubmenu
	} = use(DropdownMenuContext);

	const { open, position, contentRef, id: submenuId } = use(DropdownMenuSubmenuContext);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.defaultPrevented) {
			return;
		}

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				event.stopPropagation();
				setNextItemActive(1);
				break;
			case "ArrowUp":
				event.preventDefault();
				event.stopPropagation();
				setNextItemActive(-1);
				break;
			case "Home":
				event.preventDefault();
				event.stopPropagation();
				setFirstItemActive();
				break;
			case "End":
				event.preventDefault();
				event.stopPropagation();
				setLastItemActive();
				break;
			case "ArrowRight":
				event.preventDefault();
				event.stopPropagation();
				openActiveSubmenu();
				break;
			case "ArrowLeft":
				event.preventDefault();
				event.stopPropagation();
				closeActiveSubmenu();
				break;
			case "Escape":
				event.preventDefault();
				event.stopPropagation();
				closeActiveSubmenu();
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				event.stopPropagation();
				selectActiveItem();
				break;
		}
	};

	return (
		<AnimatePresence>
			{open && position && (
				<motion.div
					ref={contentRef}
					data-dropdown-submenu-content={submenuId}
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
					tabIndex={-1}
					onKeyDown={handleKeyDown}
					{...props}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
