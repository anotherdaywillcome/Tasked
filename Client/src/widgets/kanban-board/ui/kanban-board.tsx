"use client";

import { AnimatePresence } from "motion/react";
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { KanbanBoardContext } from "../model/kanban-board-context";
import { mockKanbanBoardData } from "../model/mock-kanban-board-data";
import type { KanbanBoardData } from "../model/types";
import { useKanbanBoardState } from "../model/use-kanban-board-state";
import { KanbanBoardAddColumn } from "./kanban-board-add-column";
import { KanbanBoardColumn, type KanbanBoardColumnProps } from "./kanban-board-column";
import { KanbanBoardColumnActions } from "./kanban-board-column-actions";
import { KanbanBoardColumnCard } from "./kanban-board-column-card";
import { KanbanBoardDeleteColumnDialog } from "./kanban-board-delete-column-dialog";

type KanbanBoardChildren = ReactNode | ((board: KanbanBoardData) => ReactNode);

export type KanbanBoardProps = {
	data?: KanbanBoardData;
	children?: KanbanBoardChildren;
	onDataChange?: (board: KanbanBoardData) => void;
};

type KanbanBoardComponent = ((props: Readonly<KanbanBoardProps>) => ReactNode) & {
	Column: typeof KanbanBoardColumn;
	ColumnCard: typeof KanbanBoardColumnCard;
	ColumnActions: typeof KanbanBoardColumnActions;
};

const KanbanBoardRoot = ({ data = mockKanbanBoardData, children, onDataChange }: Readonly<KanbanBoardProps>) => {
	const { columnPendingDeletion, contextValue } = useKanbanBoardState({ data, onDataChange });
	const { board, cancelColumnDeletion, confirmColumnDeletion } = contextValue;
	const staticChildren = typeof children === "function" ? [] : Children.toArray(children);
	const columnTemplates = staticChildren.filter(
		(child): child is ReactElement<KanbanBoardColumnProps> =>
			isValidElement(child) && child.type === KanbanBoardColumn
	);
	const fallbackActions = columnTemplates
		.flatMap((column) => Children.toArray(column.props.children))
		.find((child) => isValidElement(child) && child.type === KanbanBoardColumnActions);
	const boardContent =
		typeof children === "function"
			? children(board)
			: board.columns.map((column) => {
					const template = columnTemplates.find(({ props }) => props.column.id === column.id);

					if (template) return cloneElement(template, { key: column.id, column });

					return (
						<KanbanBoardColumn key={column.id} column={column}>
							{fallbackActions}
						</KanbanBoardColumn>
					);
				});

	return (
		<KanbanBoardContext.Provider value={contextValue}>
			<section
				className="relative h-full max-h-full min-h-0 w-full min-w-0 overflow-auto overscroll-contain pb-[8px] [scrollbar-color:var(--geek-blue-6)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[8px] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--geek-blue-6) [&::-webkit-scrollbar-track]:bg-transparent"
				aria-labelledby={`${board.id}-heading`}
			>
				<h2 id={`${board.id}-heading`} className="sr-only">
					{board.title}
				</h2>
				<p className="sr-only" aria-live="assertive" aria-atomic="true">
					{contextValue.announcement}
				</p>
				<ol
					aria-label="Workflow columns"
					className="grid min-h-full w-full min-w-0 grid-flow-col auto-cols-[minmax(240px,1fr)] items-start gap-x-[8px] pr-[8px]"
				>
					<AnimatePresence initial={false}>{boardContent}</AnimatePresence>
					<KanbanBoardAddColumn />
				</ol>
			</section>
			<AnimatePresence>
				{columnPendingDeletion && (
					<KanbanBoardDeleteColumnDialog
						key={columnPendingDeletion.id}
						column={columnPendingDeletion}
						onCancel={cancelColumnDeletion}
						onConfirm={confirmColumnDeletion}
					/>
				)}
			</AnimatePresence>
		</KanbanBoardContext.Provider>
	);
};

export const KanbanBoard = Object.assign(KanbanBoardRoot, {
	Column: KanbanBoardColumn,
	ColumnCard: KanbanBoardColumnCard,
	ColumnActions: KanbanBoardColumnActions
}) as KanbanBoardComponent;
