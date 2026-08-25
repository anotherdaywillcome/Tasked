"use client";

import { Icon, ICON_TYPES } from "@shared/ui";
import { motion } from "motion/react";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

import { useKanbanBoard, useKanbanColumnId } from "../model/kanban-board-context";

type KanbanBoardColumnActionsProps = {
	children?: ReactNode | ((columnId: string) => ReactNode);
};

export const KanbanBoardColumnActions = ({ children }: Readonly<KanbanBoardColumnActionsProps>) => {
	const columnId = useKanbanColumnId();
	const { requestColumnDeletion } = useKanbanBoard();
	const createTaskAction = children ? (
		typeof children === "function" ? (
			children(columnId)
		) : isValidElement(children) ? (
			cloneElement(children as ReactElement<{ columnId?: string }>, { columnId })
		) : (
			children
		)
	) : (
		<motion.button
			className="cursor-pointer rounded-[8px] p-[4px] text-(--neutrals-3) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
			type="button"
			aria-label={`Add task to ${columnId}`}
			whileHover={{ scale: 1.08 }}
			whileTap={{ scale: 0.92 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
		>
			<Icon type={ICON_TYPES.AddCircle} size={16} />
		</motion.button>
	);

	return (
		<div className="flex shrink-0 items-center gap-x-[2px]">
			{createTaskAction}
			<motion.button
				className="cursor-pointer rounded-[8px] p-[4px] text-(--neutrals-3) hover:bg-(--volcano-150) hover:text-(--volcano-1000) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--volcano-200)]"
				type="button"
				aria-label={`Delete ${columnId} column`}
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.92 }}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
				onClick={() => requestColumnDeletion(columnId)}
			>
				<Icon type={ICON_TYPES.TrashBold} size={16} />
			</motion.button>
		</div>
	);
};
