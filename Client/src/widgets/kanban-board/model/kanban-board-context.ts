import { createContext, use } from "react";

import type { KanbanBoardData, KanbanDropTarget } from "./types";

export type KanbanDragInput = "pointer" | "keyboard";

export type KanbanMoveDirection = "up" | "down" | "left" | "right";

export type KanbanBoardContextValue = {
	board: KanbanBoardData;
	activeTaskId: string | null;
	dragInput: KanbanDragInput | null;
	draggedTaskHeight: number | null;
	dropTarget: KanbanDropTarget | null;
	announcement: string;
	addColumn: (title: string) => void;
	removeTask: (taskId: string) => void;
	requestColumnDeletion: (columnId: string) => void;
	confirmColumnDeletion: () => void;
	cancelColumnDeletion: () => void;
	beginDragging: (taskId: string, input: KanbanDragInput, taskHeight?: number) => void;
	previewTaskMove: (destinationColumnId: string, taskIndex: number) => void;
	moveTaskWithKeyboard: (taskId: string, direction: KanbanMoveDirection) => void;
	finishDragging: (target?: KanbanDropTarget | null) => void;
	cancelDragging: () => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContextValue | null>(null);

export const KanbanColumnContext = createContext<string | null>(null);

export const useKanbanBoard = () => {
	const context = use(KanbanBoardContext);

	if (!context) throw new Error("Kanban board components must be used inside KanbanBoard.");

	return context;
};

export const useKanbanColumnId = () => {
	const columnId = use(KanbanColumnContext);

	if (!columnId) throw new Error("Kanban column components must be used inside KanbanBoard.Column.");

	return columnId;
};
