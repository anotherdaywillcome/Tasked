import { ProjectRowSkeleton, ProjectRowVariants } from "@entities/projects";

import { PROJECTS_LIST_SKELETON_COUNT } from "../config";

export const ProjectsListSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-[0.5rem]">
			{Array.from({ length: PROJECTS_LIST_SKELETON_COUNT }, (_, index) => (
				<ProjectRowSkeleton variant={ProjectRowVariants.Extended} key={index} />
			))}
		</div>
	);
};
