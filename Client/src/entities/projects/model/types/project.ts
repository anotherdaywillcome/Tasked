import type { Assignee, TaskSummary } from "../../../tasks";
import type { User } from "../../../users";

import type { Privacy } from "./privacy";

export type Project = {
	id: string;
	imageUrl: string;
	name: string;
	description: string;
	taskSummary: TaskSummary;
	privacy: Privacy;
	createdAt: string;
	createdBy: Omit<User, "role">;
	assignees: Array<Assignee>;
};
