import { Skeleton } from "@shared/ui";

import { ProjectRowVariant, ProjectRowVariants } from "../../config";

type ProjectRowSkeletonProps = {
	variant?: ProjectRowVariant;
};

export const ProjectRowSkeleton = ({ variant = ProjectRowVariants.Compact }: Readonly<ProjectRowSkeletonProps>) => {
	switch (variant) {
		case ProjectRowVariants.Compact:
			return <Skeleton width="100%" height="3.875rem" radius="1rem" />;
		case ProjectRowVariants.Extended:
			return <Skeleton width="100%" height="3.625rem" radius="1rem" />;
	}
};
