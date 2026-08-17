export type ListTaskPriority = "low" | "medium" | "high";

export type ListAssignee = {
	id: string;
	fullName: string;
	imageUrl: string;
};

export type ListTask = {
	id: string;
	number: number;
	title: string;
	priority: ListTaskPriority;
	dueDate: {
		value: string;
		label: string;
		accessibleLabel: string;
	};
	assignees: Array<ListAssignee>;
};

export type ListGroup = {
	id: string;
	title: string;
	tasks: Array<ListTask>;
};

export type GroupedListData = {
	id: string;
	title: string;
	groups: Array<ListGroup>;
};

export type ListDropTarget = {
	groupId: string;
	taskIndex: number;
};
