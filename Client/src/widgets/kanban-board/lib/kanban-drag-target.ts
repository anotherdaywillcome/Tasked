import type { KanbanDropTarget } from "../model/types";

export const getKanbanDropTargetAtPoint = (
	point: { x: number; y: number },
	activeTaskId: string
): KanbanDropTarget | null => {
	const clientX = point.x - window.scrollX;
	const clientY = point.y - window.scrollY;
	const column = document
		.elementsFromPoint(clientX, clientY)
		.find(
			(element): element is HTMLElement =>
				element instanceof HTMLElement && Boolean(element.dataset.kanbanColumnId)
		);

	if (!column?.dataset.kanbanColumnId) return null;

	const taskElements = Array.from(column.querySelectorAll<HTMLElement>("[data-kanban-task-id]")).filter(
		(element) => element.dataset.kanbanTaskId !== activeTaskId
	);
	const taskIndex = taskElements.findIndex((element) => {
		const bounds = element.getBoundingClientRect();

		return clientY < bounds.top + bounds.height / 2;
	});

	return {
		columnId: column.dataset.kanbanColumnId,
		taskIndex: taskIndex === -1 ? taskElements.length : taskIndex
	};
};
