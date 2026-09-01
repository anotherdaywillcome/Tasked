// TODO
// Need refactor, some should stay here some should go to other types - model

export enum Privacy {
	Public,
	Private
}

export const privacyOptions = Object.values(Privacy).filter((value) => typeof value === "string");

export type User = {
	id: string;
	imageUrl: string;
	fullName: string;
};

export type Assignee = User;

export type TaskSummary = {
	total: number;
	completed: number;
};

export type Project = {
	id: string;
	imageUrl: string;
	name: string;
	description: string;
	taskSummary: TaskSummary;
	privacy: Privacy;
	createdAt: string;
	createdBy: User;
	assignees: Array<Assignee>;
};
