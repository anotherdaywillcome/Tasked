import { Skeleton } from "@shared/ui";

import { PROJECTS_NAVIGATION_SKELETON_DEFAULT_SETTINGS } from "../config";

type ProjectsNavigationSkeletonProps = {
	count?: number;
};

export const ProjectsNavigationSkeleton = ({
	count = PROJECTS_NAVIGATION_SKELETON_DEFAULT_SETTINGS.count
}: ProjectsNavigationSkeletonProps) => {
	return (
		<div className="relative flex flex-col gap-y-[0.25rem]">
			{Array.from({ length: count }, (_, index) => (
				<Skeleton key={index} width="100%" height="2.25rem" radius="0.75rem" />
			))}
		</div>
	);
};
