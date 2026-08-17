import type { GroupedListData, ListTask } from "../model/types";

export type ListTaskLocation = {
	groupIndex: number;
	taskIndex: number;
};

export const findListTaskLocation = (list: GroupedListData, taskId: string): ListTaskLocation | null => {
	for (const [groupIndex, group] of list.groups.entries()) {
		const taskIndex = group.tasks.findIndex((task) => task.id === taskId);

		if (taskIndex !== -1) return { groupIndex, taskIndex };
	}

	return null;
};

export const moveListTask = (
	list: GroupedListData,
	taskId: string,
	destinationGroupId: string,
	destinationTaskIndex: number
): GroupedListData => {
	const source = findListTaskLocation(list, taskId);
	const destinationGroupIndex = list.groups.findIndex((group) => group.id === destinationGroupId);

	if (!source || destinationGroupIndex === -1) return list;

	const isSameGroup = source.groupIndex === destinationGroupIndex;
	const maximumIndex = list.groups[destinationGroupIndex].tasks.length - (isSameGroup ? 1 : 0);
	const nextTaskIndex = Math.max(0, Math.min(destinationTaskIndex, maximumIndex));

	if (isSameGroup && nextTaskIndex === source.taskIndex) return list;

	const groups = list.groups.map((group) => ({ ...group, tasks: [...group.tasks] }));
	const [task] = groups[source.groupIndex].tasks.splice(source.taskIndex, 1);

	groups[destinationGroupIndex].tasks.splice(nextTaskIndex, 0, task);

	return { ...list, groups };
};

export const removeListTask = (list: GroupedListData, taskId: string): GroupedListData => {
	const source = findListTaskLocation(list, taskId);

	if (!source) return list;

	return {
		...list,
		groups: list.groups.map((group, index) =>
			index === source.groupIndex ? { ...group, tasks: group.tasks.filter((task) => task.id !== taskId) } : group
		)
	};
};

export const createListTask = (list: GroupedListData): ListTask => {
	const taskNumbers = list.groups.flatMap((group) => group.tasks.map((task) => task.number));
	const number = Math.max(0, ...taskNumbers) + 1;
	const now = new Date();
	const value = now.toISOString().slice(0, 10);

	return {
		id: `list-task-${number}`,
		number,
		title: "New task",
		priority: "medium",
		dueDate: {
			value,
			label: now.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
			accessibleLabel: now.toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric"
			})
		},
		assignees: []
	};
};

export const addListTask = (list: GroupedListData, groupId: string): GroupedListData => {
	if (!list.groups.some((group) => group.id === groupId)) return list;

	const task = createListTask(list);

	return {
		...list,
		groups: list.groups.map((group) => (group.id === groupId ? { ...group, tasks: [...group.tasks, task] } : group))
	};
};
