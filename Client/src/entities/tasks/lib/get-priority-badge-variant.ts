import type { PriorityBadgeVariant } from "@shared/ui";

import { priorityLabelVariants } from "../config";
import { TaskPriority } from "../model";

export const getPriorityBadgeVariant = (priority: TaskPriority | "Unknown") => {
	return priorityLabelVariants[priority] as PriorityBadgeVariant;
};
