import { TaskRowSkeleton } from "@entities/tasks";

import { TASKS_SKELETON_COUNT } from "../config";

export const TasksListSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-[0.5rem] py-[0.75rem]">
			{Array.from({ length: TASKS_SKELETON_COUNT }, (_, index) => (
				<TaskRowSkeleton key={index} />
			))}
		</div>
	);
};
