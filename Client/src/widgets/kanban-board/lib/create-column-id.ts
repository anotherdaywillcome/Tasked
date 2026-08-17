import type { KanbanBoardData } from "../model/types";

export const createColumnId = (board: KanbanBoardData, title: string) => {
	const baseId =
		title
			.toLocaleLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "") || "column";
	let id = baseId;
	let suffix = 2;

	while (board.columns.some((column) => column.id === id)) {
		id = `${baseId}-${suffix}`;
		suffix += 1;
	}

	return id;
};
