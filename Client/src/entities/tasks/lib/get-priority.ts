import { TaskPriority } from "../model";

export const getPriority = (priority: string) => {
	if (Object.values(TaskPriority).find((p) => p.trim().toLowerCase() === priority.trim().toLowerCase())) {
		return (priority.charAt(0).toUpperCase() + priority.slice(1)) as TaskPriority;
	}

	return "Unknown";
};
