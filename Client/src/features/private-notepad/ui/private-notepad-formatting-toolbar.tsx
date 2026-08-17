"use client";

import { motion } from "motion/react";

import { Icon, ICON_TYPES } from "@shared/ui";

export const PrivateNotepadFormattingToolbar = () => {
	return (
		<div className="flex items-center m-[0.75rem]">
			<div
				className="relative flex items-center gap-x-[0.5rem] pr-[0.5rem] after:absolute after:content-[''] after:w-[0.063rem] after:h-[1rem] after:bg-(--neutrals-2) after:top-[50%] after:translate-y-[-50%] after:right-0"
				aria-label="Text formatting"
			>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextBold} />
					<span className="sr-only">Bold text</span>
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextItalic} />
					<span className="sr-only">Italic text</span>
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextUnderline} />
					<span className="sr-only">Underline text</span>
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.LinkSquare} />
					<span className="sr-only">Insert link</span>
				</motion.button>
			</div>
			<div className="flex items-center gap-x-[0.5rem] pl-[0.5rem]" aria-label="Text alignment">
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextAlignLeft} />
					<span className="sr-only">Align left</span>
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextAlignCenter} />
					<span className="sr-only">Align center</span>
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextAlignRight} />
					<span className="sr-only">Align right</span>
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon width={20} height={20} type={ICON_TYPES.TextAlignJustifyCenter} />
					<span className="sr-only">Justify text</span>
				</motion.button>
			</div>
		</div>
	);
};
