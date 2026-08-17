"use client";

import { ICON, Icon } from "@shared/ui";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { KanbanColumn } from "../model/types";

type KanbanBoardDeleteColumnDialogProps = {
	column: KanbanColumn;
	onCancel: () => void;
	onConfirm: () => void;
};

const buttonMotion = {
	hover: { scale: 1.03 },
	pressed: { scale: 0.97 }
};

export const KanbanBoardDeleteColumnDialog = ({
	column,
	onCancel,
	onConfirm
}: Readonly<KanbanBoardDeleteColumnDialogProps>) => {
	const cancelButtonRef = useRef<HTMLButtonElement>(null);
	const titleId = `${column.id}-delete-title`;
	const descriptionId = `${column.id}-delete-description`;

	useEffect(() => {
		cancelButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onCancel();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onCancel]);

	if (typeof document === "undefined") return null;

	return createPortal(
		<motion.div
			className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(1,0,9,0.72)] p-[20px] backdrop-blur-[6px]"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.18, ease: "easeOut" }}
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) onCancel();
			}}
		>
			<motion.section
				className="w-full max-w-[420px] rounded-[20px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--black-pearl) p-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
				role="alertdialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				initial={{ opacity: 0, scale: 0.94, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.96, y: 10 }}
				transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.7 }}
			>
				<div className="mb-[18px] flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-(--volcano-150) text-(--volcano-1000)">
					<Icon type={ICON.TrashBold} size={22} />
				</div>
				<h2
					className="font-(family-name:--font-barlow) text-[18px] leading-[130%] font-bold text-(--white-pallete-100)"
					id={titleId}
				>
					Delete “{column.title}”?
				</h2>
				<p
					className="mt-[8px] font-(family-name:--font-barlow) text-[13px] leading-[150%] text-(--neutrals-3)"
					id={descriptionId}
				>
					{column.tasks.length > 0
						? `This column contains ${column.tasks.length} ${column.tasks.length === 1 ? "task" : "tasks"}. Deleting it will also remove those tasks from this board.`
						: "This empty column will be removed from the board."}{" "}
					This action cannot be undone.
				</p>
				<div className="mt-[24px] flex justify-end gap-x-[8px]">
					<motion.button
						ref={cancelButtonRef}
						className="cursor-pointer rounded-[10px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-150) px-[16px] py-[10px] font-(family-name:--font-barlow) text-[12px] font-bold text-(--neutrals-4) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
						type="button"
						whileHover="hover"
						whileTap="pressed"
						variants={buttonMotion}
						onClick={onCancel}
					>
						Cancel
					</motion.button>
					<motion.button
						className="cursor-pointer rounded-[10px] bg-(--accent-color-dengerous-1) px-[16px] py-[10px] font-(family-name:--font-barlow) text-[12px] font-bold text-(--white-pallete-100) shadow-[0_0_24px_rgba(196,29,29,0.24)] hover:bg-(--accent-color-dengerous-3) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--volcano-400)]"
						type="button"
						whileHover="hover"
						whileTap="pressed"
						variants={buttonMotion}
						onClick={onConfirm}
					>
						Delete column
					</motion.button>
				</div>
			</motion.section>
		</motion.div>,
		document.body
	);
};
