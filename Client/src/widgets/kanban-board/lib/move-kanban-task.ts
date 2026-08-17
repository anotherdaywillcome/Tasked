import type { KanbanBoardData } from "../model/types";

export type KanbanTaskLocation = {
	columnIndex: number;
	taskIndex: number;
};

export const findTaskLocation = (board: KanbanBoardData, taskId: string): KanbanTaskLocation | null => {
	for (const [columnIndex, column] of board.columns.entries()) {
		const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

		if (taskIndex !== -1) return { columnIndex, taskIndex };
	}

	return null;
};

export const moveKanbanTask = (
	board: KanbanBoardData,
	taskId: string,
	destinationColumnId: string,
	destinationTaskIndex: number
): KanbanBoardData => {
	const source = findTaskLocation(board, taskId);
	const destinationColumnIndex = board.columns.findIndex((column) => column.id === destinationColumnId);

	if (!source || destinationColumnIndex === -1) return board;

	const isSameColumn = source.columnIndex === destinationColumnIndex;
	const maximumIndex = board.columns[destinationColumnIndex].tasks.length - (isSameColumn ? 1 : 0);
	const nextTaskIndex = Math.max(0, Math.min(destinationTaskIndex, maximumIndex));

	if (isSameColumn && nextTaskIndex === source.taskIndex) return board;

	const columns = board.columns.map((column) => ({ ...column, tasks: [...column.tasks] }));
	const [task] = columns[source.columnIndex].tasks.splice(source.taskIndex, 1);

	columns[destinationColumnIndex].tasks.splice(nextTaskIndex, 0, task);

	return { ...board, columns };
};

export const removeKanbanTask = (board: KanbanBoardData, taskId: string): KanbanBoardData => {
	const source = findTaskLocation(board, taskId);

	if (!source) return board;

	return {
		...board,
		columns: board.columns.map((column, index) =>
			index === source.columnIndex
				? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
				: column
		)
	};
};
