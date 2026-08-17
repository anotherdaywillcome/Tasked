export type KanbanTaskPriority = "low" | "medium" | "high";

export type KanbanAssignee = {
	id: string;
	fullName: string;
	imageUrl: string;
};

export type KanbanTask = {
	id: string;
	number: number;
	title: string;
	priority: KanbanTaskPriority;
	dueDate: {
		value: string;
		label: string;
		accessibleLabel: string;
	};
	assignees: Array<KanbanAssignee>;
};

export type KanbanColumn = {
	id: string;
	title: string;
	tasks: Array<KanbanTask>;
};

export type KanbanBoardData = {
	id: string;
	title: string;
	columns: Array<KanbanColumn>;
};

export type KanbanDropTarget = {
	columnId: string;
	taskIndex: number;
};
