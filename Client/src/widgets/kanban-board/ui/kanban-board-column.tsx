"use client";

import { AnimatePresence, motion } from "motion/react";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

import { findTaskLocation } from "../lib";
import { KanbanColumnContext, useKanbanBoard } from "../model/kanban-board-context";
import type { KanbanColumn, KanbanTask } from "../model/types";
import { KanbanBoardColumnActions } from "./kanban-board-column-actions";
import { KanbanBoardColumnCard, type KanbanBoardColumnCardProps } from "./kanban-board-column-card";
import { KanbanBoardTaskPlaceholder } from "./kanban-board-task-placeholder";

export type KanbanBoardColumnProps = {
	column: KanbanColumn;
	children?: ReactNode;
};

export const KanbanBoardColumn = ({ column: suppliedColumn, children }: Readonly<KanbanBoardColumnProps>) => {
	const { activeTaskId, board, draggedTaskHeight, dropTarget } = useKanbanBoard();
	const column = board.columns.find(({ id }) => id === suppliedColumn.id) ?? suppliedColumn;
	const childItems = Children.toArray(children);
	const suppliedActions = childItems.filter(
		(child) => isValidElement(child) && child.type === KanbanBoardColumnActions
	);
	const suppliedCards = childItems.filter(
		(child): child is ReactElement<KanbanBoardColumnCardProps> =>
			isValidElement(child) && child.type === KanbanBoardColumnCard
	);
	const actions = children ? suppliedActions : <KanbanBoardColumnActions />;
	const headingId = `${board.id}-${column.id}-heading`;
	const source = activeTaskId ? findTaskLocation(board, activeTaskId) : null;
	const sourceColumnId = source ? board.columns[source.columnIndex].id : null;
	const showDestinationPlaceholder =
		activeTaskId &&
		dropTarget?.columnId === column.id &&
		(sourceColumnId !== column.id || source?.taskIndex !== dropTarget.taskIndex);

	const renderCard = (task: KanbanTask) => {
		const template = suppliedCards.find((card) => card.props.task.id === task.id);

		return template ? (
			cloneElement(template, { key: task.id, task })
		) : (
			<KanbanBoardColumnCard key={task.id} task={task} />
		);
	};

	const cards: Array<ReactNode> = [];
	const destinationPlaceholder = activeTaskId ? (
		<KanbanBoardTaskPlaceholder key={`drop-${activeTaskId}`} height={draggedTaskHeight} />
	) : null;
	let destinationTaskIndex = 0;

	for (const task of column.tasks) {
		if (showDestinationPlaceholder && task.id !== activeTaskId && destinationTaskIndex === dropTarget.taskIndex) {
			cards.push(destinationPlaceholder);
		}

		cards.push(renderCard(task));
		if (task.id !== activeTaskId) destinationTaskIndex += 1;
	}

	if (showDestinationPlaceholder && destinationTaskIndex === dropTarget.taskIndex) {
		cards.push(destinationPlaceholder);
	}

	return (
		<motion.li
			layout
			className="relative min-w-[240px] list-none self-stretch"
			initial={{ opacity: 0, scale: 0.97 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.96 }}
			transition={{ type: "spring", stiffness: 420, damping: 34 }}
		>
			<KanbanColumnContext.Provider value={column.id}>
				<section
					className="flex min-h-[116px] flex-col rounded-[20px] bg-(--geek-blue-primary-opacity-100) p-[8px]"
					aria-labelledby={headingId}
				>
					<header className="flex items-center justify-between gap-x-[8px] px-[20px] pt-[14px] pb-[14px]">
						<div className="flex min-w-0 items-center gap-x-[6px]">
							<h3
								className="truncate font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em] text-(--neutrals-3) capitalize"
								id={headingId}
							>
								{column.title}
							</h3>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold text-(--neutrals-3)">
								<span aria-hidden="true">{column.tasks.length}</span>
								<span className="sr-only">
									{column.tasks.length} {column.tasks.length === 1 ? "task" : "tasks"}
								</span>
							</span>
						</div>
						{actions}
					</header>
					<ol
						className="flex min-h-[48px] flex-1 flex-col gap-y-[4px] rounded-[16px]"
						id={`${board.id}-${column.id}-tasks`}
						aria-label={`${column.title} tasks`}
						data-kanban-column-id={column.id}
					>
						<AnimatePresence initial={false}>{cards}</AnimatePresence>
					</ol>
				</section>
			</KanbanColumnContext.Provider>
		</motion.li>
	);
};
