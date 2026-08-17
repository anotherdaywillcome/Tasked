import { ProjectRowSkeleton } from "@entities/projects";
import { PROJECTS_SKELETON_COUNT } from "@widgets/projects/config";

type ProjectsListSkeletonProps = {
	count?: number;
};

export const ProjectsListSkeleton = ({ count = PROJECTS_SKELETON_COUNT }: ProjectsListSkeletonProps) => {
	return (
		<div className="flex flex-col gap-y-[0.5rem]">
			{Array.from({ length: PROJECTS_SKELETON_COUNT }, (_, index) => (
				<ProjectRowSkeleton key={index} />
			))}
		</div>
	);
};
