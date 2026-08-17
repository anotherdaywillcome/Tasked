import { useRef, useState } from "react";

import { createColumnId, findTaskLocation, moveKanbanTask, removeKanbanTask } from "../lib";
import type { KanbanBoardContextValue, KanbanDragInput, KanbanMoveDirection } from "./kanban-board-context";
import type { KanbanBoardData, KanbanDropTarget } from "./types";

type UseKanbanBoardStateOptions = {
	data: KanbanBoardData;
	onDataChange?: (board: KanbanBoardData) => void;
};

export const useKanbanBoardState = ({ data, onDataChange }: Readonly<UseKanbanBoardStateOptions>) => {
	const [board, setBoard] = useState(data);
	const [sourceData, setSourceData] = useState(data);
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
	const [dragInput, setDragInput] = useState<KanbanDragInput | null>(null);
	const [draggedTaskHeight, setDraggedTaskHeight] = useState<number | null>(null);
	const [dropTarget, setDropTarget] = useState<KanbanDropTarget | null>(null);
	const [announcement, setAnnouncement] = useState("");
	const [columnPendingDeletionId, setColumnPendingDeletionId] = useState<string | null>(null);
	const dropCommitted = useRef(false);

	if (data !== sourceData) {
		setSourceData(data);
		setBoard(data);
		setActiveTaskId(null);
		setDragInput(null);
		setDraggedTaskHeight(null);
		setDropTarget(null);
	}

	const commitBoard = (nextBoard: KanbanBoardData) => {
		if (nextBoard === board) return;

		setSourceData(nextBoard);
		setBoard(nextBoard);
		onDataChange?.(nextBoard);
	};

	const clearDragState = () => {
		setActiveTaskId(null);
		setDragInput(null);
		setDraggedTaskHeight(null);
		setDropTarget(null);
	};

	const addColumn = (title: string) => {
		commitBoard({
			...board,
			columns: [...board.columns, { id: createColumnId(board, title), title, tasks: [] }]
		});
		setAnnouncement(`${title} column added.`);
	};

	const removeTask = (taskId: string) => {
		const task = board.columns.flatMap((column) => column.tasks).find(({ id }) => id === taskId);
		const nextBoard = removeKanbanTask(board, taskId);

		commitBoard(nextBoard);
		if (nextBoard !== board) setAnnouncement(`${task?.title ?? "Task"} removed.`);
		if (activeTaskId === taskId) clearDragState();
	};

	const requestColumnDeletion = (columnId: string) => {
		if (board.columns.some((column) => column.id === columnId)) setColumnPendingDeletionId(columnId);
	};

	const cancelColumnDeletion = () => setColumnPendingDeletionId(null);

	const confirmColumnDeletion = () => {
		const column = board.columns.find(({ id }) => id === columnPendingDeletionId);

		if (!column) return;

		commitBoard({ ...board, columns: board.columns.filter(({ id }) => id !== column.id) });
		clearDragState();
		setColumnPendingDeletionId(null);
		setAnnouncement(`${column.title} column deleted.`);
	};

	const previewTaskMove = (destinationColumnId: string, taskIndex: number) => {
		if (!activeTaskId) return;

		const source = findTaskLocation(board, activeTaskId);
		const destinationColumn = board.columns.find((column) => column.id === destinationColumnId);

		if (!source || !destinationColumn) return;

		const isSameColumn = board.columns[source.columnIndex].id === destinationColumnId;
		const maximumIndex = destinationColumn.tasks.length - (isSameColumn ? 1 : 0);
		const nextTarget = {
			columnId: destinationColumnId,
			taskIndex: Math.max(0, Math.min(taskIndex, maximumIndex))
		};

		setDropTarget((currentTarget) =>
			currentTarget?.columnId === nextTarget.columnId && currentTarget.taskIndex === nextTarget.taskIndex
				? currentTarget
				: nextTarget
		);
	};

	const beginDragging = (taskId: string, input: KanbanDragInput, taskHeight?: number) => {
		const source = findTaskLocation(board, taskId);

		if (!source) return;

		const task = board.columns[source.columnIndex].tasks[source.taskIndex];

		dropCommitted.current = false;
		setActiveTaskId(taskId);
		setDragInput(input);
		setDraggedTaskHeight(taskHeight ?? null);
		setDropTarget({ columnId: board.columns[source.columnIndex].id, taskIndex: source.taskIndex });
		setAnnouncement(`Picked up ${task.title}.`);
	};

	const moveTaskWithKeyboard = (taskId: string, direction: KanbanMoveDirection) => {
		if (activeTaskId !== taskId) return;

		const source = findTaskLocation(board, taskId);
		const currentTarget =
			dropTarget ?? (source && { columnId: board.columns[source.columnIndex].id, taskIndex: source.taskIndex });

		if (!currentTarget) return;

		if (direction === "up" || direction === "down") {
			previewTaskMove(currentTarget.columnId, currentTarget.taskIndex + (direction === "up" ? -1 : 1));
			return;
		}

		const currentColumnIndex = board.columns.findIndex((column) => column.id === currentTarget.columnId);
		const columnOffset = direction === "left" ? -1 : 1;
		const destinationColumn = board.columns[currentColumnIndex + columnOffset];

		if (destinationColumn) previewTaskMove(destinationColumn.id, currentTarget.taskIndex);
	};

	const finishDragging = (target?: KanbanDropTarget | null) => {
		dropCommitted.current = true;
		const finalTarget = target === undefined ? dropTarget : target;

		if (!activeTaskId || !finalTarget) {
			clearDragState();
			setAnnouncement("Move cancelled.");
			return;
		}

		const task = board.columns.flatMap((column) => column.tasks).find(({ id }) => id === activeTaskId);
		const nextBoard = moveKanbanTask(board, activeTaskId, finalTarget.columnId, finalTarget.taskIndex);

		commitBoard(nextBoard);
		clearDragState();
		setAnnouncement(nextBoard === board ? "Task stayed in place." : `${task?.title ?? "Task"} moved.`);
	};

	const cancelDragging = () => {
		if (dropCommitted.current) {
			dropCommitted.current = false;
			return;
		}

		clearDragState();
		setAnnouncement("Move cancelled.");
	};

	const contextValue: KanbanBoardContextValue = {
		board,
		activeTaskId,
		dragInput,
		draggedTaskHeight,
		dropTarget,
		announcement,
		addColumn,
		removeTask,
		requestColumnDeletion,
		confirmColumnDeletion,
		cancelColumnDeletion,
		beginDragging,
		previewTaskMove,
		moveTaskWithKeyboard,
		finishDragging,
		cancelDragging
	};
	const columnPendingDeletion = board.columns.find(({ id }) => id === columnPendingDeletionId) ?? null;

	return { columnPendingDeletion, contextValue };
};
