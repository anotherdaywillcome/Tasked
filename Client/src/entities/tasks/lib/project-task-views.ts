import type { ProjectTasksData } from "../model";

export const toKanbanBoardData = (data: ProjectTasksData) => ({
	id: data.id,
	title: data.title,
	columns: data.groups
});

export const toGroupedListData = (data: ProjectTasksData) => ({
	id: data.id,
	title: data.title,
	groups: data.groups
});

export const toCalendarTasks = (data: ProjectTasksData) =>
	data.groups.flatMap((group) =>
		group.tasks.map((task) => ({
			...task,
			status: { id: group.id, title: group.title }
		}))
	);
