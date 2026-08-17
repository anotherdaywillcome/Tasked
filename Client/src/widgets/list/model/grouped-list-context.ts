"use client";

import { createContext, use } from "react";

import type { GroupedListData, ListDropTarget, ListGroup } from "./types";

export type ListDragInput = "pointer" | "keyboard";

export type ListMoveDirection = "up" | "down" | "left" | "right";

export type GroupedListContextValue = {
	list: GroupedListData;
	activeTaskId: string | null;
	dragInput: ListDragInput | null;
	draggedTaskHeight: number | null;
	dropTarget: ListDropTarget | null;
	announcement: string;
	addTask: (groupId: string) => void;
	removeTask: (taskId: string) => void;
	beginDragging: (taskId: string, input: ListDragInput, taskHeight?: number) => void;
	previewTaskMove: (destinationGroupId: string, taskIndex: number) => void;
	moveTaskWithKeyboard: (taskId: string, direction: ListMoveDirection) => void;
	finishDragging: (target?: ListDropTarget | null) => void;
	cancelDragging: () => void;
};

export const GroupedListContext = createContext<GroupedListContextValue | null>(null);

export const ListGroupContext = createContext<string | null>(null);

export const useGroupedList = () => {
	const context = use(GroupedListContext);

	if (!context) throw new Error("GroupedList components must be used inside GroupedList.");

	return context;
};

export const useListGroup = (): ListGroup => {
	const groupId = use(ListGroupContext);
	const { list } = useGroupedList();
	const group = list.groups.find(({ id }) => id === groupId);

	if (!group) throw new Error("GroupedList group components must be used inside GroupedList.Group.");

	return group;
};

export const useListGroupId = () => useListGroup().id;
