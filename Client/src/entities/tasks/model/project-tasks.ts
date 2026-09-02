// TODO
// Refactor, used in Kanban board

export type ProjectTaskPriority = "low" | "medium" | "high";

export type ProjectTaskAssignee = {
	id: string;
	fullName: string;
	imageUrl: string;
};

export type ProjectTask = {
	id: string;
	number: number;
	title: string;
	priority: ProjectTaskPriority;
	dueDate: {
		value: string;
		label: string;
		accessibleLabel: string;
	};
	assignees: Array<ProjectTaskAssignee>;
};

export type ProjectTaskGroup = {
	id: string;
	title: string;
	tasks: Array<ProjectTask>;
};

export type ProjectTasksData = {
	id: string;
	projectId: string;
	title: string;
	groups: Array<ProjectTaskGroup>;
};
