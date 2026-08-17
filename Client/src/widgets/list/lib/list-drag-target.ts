import type { ListDropTarget } from "../model/types";

export const getListDropTargetAtPoint = (
	point: { x: number; y: number },
	activeTaskId: string
): ListDropTarget | null => {
	const clientX = point.x - window.scrollX;
	const clientY = point.y - window.scrollY;
	const group = document
		.elementsFromPoint(clientX, clientY)
		.find(
			(element): element is HTMLElement => element instanceof HTMLElement && Boolean(element.dataset.listGroupId)
		);

	if (!group?.dataset.listGroupId) return null;

	const taskElements = Array.from(group.querySelectorAll<HTMLElement>("[data-list-task-id]")).filter(
		(element) => element.dataset.listTaskId !== activeTaskId
	);
	const taskIndex = taskElements.findIndex((element) => {
		const bounds = element.getBoundingClientRect();

		return clientY < bounds.top + bounds.height / 2;
	});

	return {
		groupId: group.dataset.listGroupId,
		taskIndex: taskIndex === -1 ? taskElements.length : taskIndex
	};
};
