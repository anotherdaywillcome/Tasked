import { useState } from "react";

import { addListTask, findListTaskLocation, moveListTask, removeListTask } from "../lib";
import type { GroupedListContextValue, ListDragInput, ListMoveDirection } from "./grouped-list-context";
import type { GroupedListData, ListDropTarget } from "./types";

type UseGroupedListStateOptions = {
	data: GroupedListData;
	onDataChange?: (list: GroupedListData) => void;
};

export const useGroupedListState = ({ data, onDataChange }: Readonly<UseGroupedListStateOptions>) => {
	const [list, setList] = useState(data);
	const [sourceData, setSourceData] = useState(data);
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
	const [dragInput, setDragInput] = useState<ListDragInput | null>(null);
	const [draggedTaskHeight, setDraggedTaskHeight] = useState<number | null>(null);
	const [dropTarget, setDropTarget] = useState<ListDropTarget | null>(null);
	const [announcement, setAnnouncement] = useState("");

	if (data !== sourceData) {
		setSourceData(data);
		setList(data);
		setActiveTaskId(null);
		setDragInput(null);
		setDraggedTaskHeight(null);
		setDropTarget(null);
	}

	const commitList = (nextList: GroupedListData) => {
		if (nextList === list) return;

		setSourceData(nextList);
		setList(nextList);
		onDataChange?.(nextList);
	};

	const clearDragState = () => {
		setActiveTaskId(null);
		setDragInput(null);
		setDraggedTaskHeight(null);
		setDropTarget(null);
	};

	const addTask = (groupId: string) => {
		const group = list.groups.find(({ id }) => id === groupId);
		const nextList = addListTask(list, groupId);

		commitList(nextList);
		if (nextList !== list) setAnnouncement(`Task added to ${group?.title ?? "group"}.`);
	};

	const removeTask = (taskId: string) => {
		const task = list.groups.flatMap((group) => group.tasks).find(({ id }) => id === taskId);
		const nextList = removeListTask(list, taskId);

		commitList(nextList);
		if (nextList !== list) setAnnouncement(`${task?.title ?? "Task"} removed.`);
		if (activeTaskId === taskId) clearDragState();
	};

	const previewTaskMove = (destinationGroupId: string, taskIndex: number) => {
		if (!activeTaskId) return;

		const source = findListTaskLocation(list, activeTaskId);
		const destinationGroup = list.groups.find((group) => group.id === destinationGroupId);

		if (!source || !destinationGroup) return;

		const isSameGroup = list.groups[source.groupIndex].id === destinationGroupId;
		const maximumIndex = destinationGroup.tasks.length - (isSameGroup ? 1 : 0);
		const nextTarget = {
			groupId: destinationGroupId,
			taskIndex: Math.max(0, Math.min(taskIndex, maximumIndex))
		};
		const targetChanged =
			dropTarget?.groupId !== nextTarget.groupId || dropTarget.taskIndex !== nextTarget.taskIndex;

		setDropTarget((currentTarget) =>
			currentTarget?.groupId === nextTarget.groupId && currentTarget.taskIndex === nextTarget.taskIndex
				? currentTarget
				: nextTarget
		);

		if (targetChanged && dragInput === "keyboard") {
			const task = list.groups[source.groupIndex].tasks[source.taskIndex];

			setAnnouncement(
				`${task.title} will move to position ${nextTarget.taskIndex + 1} in ${destinationGroup.title}.`
			);
		}
	};

	const beginDragging = (taskId: string, input: ListDragInput, taskHeight?: number) => {
		const source = findListTaskLocation(list, taskId);

		if (!source) return;

		const task = list.groups[source.groupIndex].tasks[source.taskIndex];

		setActiveTaskId(taskId);
		setDragInput(input);
		setDraggedTaskHeight(taskHeight ?? null);
		setDropTarget({ groupId: list.groups[source.groupIndex].id, taskIndex: source.taskIndex });
		setAnnouncement(`Picked up ${task.title}.`);
	};

	const moveTaskWithKeyboard = (taskId: string, direction: ListMoveDirection) => {
		if (activeTaskId !== taskId) return;

		const source = findListTaskLocation(list, taskId);
		const currentTarget =
			dropTarget ?? (source && { groupId: list.groups[source.groupIndex].id, taskIndex: source.taskIndex });

		if (!currentTarget) return;

		if (direction === "up" || direction === "down") {
			previewTaskMove(currentTarget.groupId, currentTarget.taskIndex + (direction === "up" ? -1 : 1));
			return;
		}

		const currentGroupIndex = list.groups.findIndex((group) => group.id === currentTarget.groupId);
		const groupOffset = direction === "left" ? -1 : 1;
		const destinationGroup = list.groups[currentGroupIndex + groupOffset];

		if (destinationGroup) previewTaskMove(destinationGroup.id, currentTarget.taskIndex);
	};

	const finishDragging = (target?: ListDropTarget | null) => {
		const finalTarget = target === undefined ? dropTarget : target;

		if (!activeTaskId || !finalTarget) {
			clearDragState();
			setAnnouncement("Move cancelled.");
			return;
		}

		const task = list.groups.flatMap((group) => group.tasks).find(({ id }) => id === activeTaskId);
		const nextList = moveListTask(list, activeTaskId, finalTarget.groupId, finalTarget.taskIndex);

		commitList(nextList);
		clearDragState();
		setAnnouncement(nextList === list ? "Task stayed in place." : `${task?.title ?? "Task"} moved.`);
	};

	const cancelDragging = () => {
		clearDragState();
		setAnnouncement("Move cancelled.");
	};

	const contextValue: GroupedListContextValue = {
		list,
		activeTaskId,
		dragInput,
		draggedTaskHeight,
		dropTarget,
		announcement,
		addTask,
		removeTask,
		beginDragging,
		previewTaskMove,
		moveTaskWithKeyboard,
		finishDragging,
		cancelDragging
	};

	return contextValue;
};
