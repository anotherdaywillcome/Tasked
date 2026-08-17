import { ReactElement, use } from "react";

import { ProjectRowVariants } from "../../config";
import type { Project } from "../../model";
import { ProjectRowContext } from "../../model";

import { ProjectRowCompact } from "./project-row-compact";
import { ProjectRowExtended } from "./project-row-extended";

type ProjectRowContentProps = {
	project: Project;
	children?: ReactElement | ReactElement[];
};

export const ProjectRowContent = ({
	project: { name, imageUrl, taskSummary, assignedUsers },
	children
}: Readonly<ProjectRowContentProps>) => {
	const { variant } = use(ProjectRowContext);

	switch (variant) {
		case ProjectRowVariants.Compact:
			return (
				<ProjectRowCompact name={name} imageUrl={imageUrl} taskSummary={taskSummary}>
					{children}
				</ProjectRowCompact>
			);
		case ProjectRowVariants.Extended:
			return (
				<ProjectRowExtended
					name={name}
					imageUrl={imageUrl}
					taskSummary={taskSummary}
					assignedUsers={assignedUsers}
				>
					{children}
				</ProjectRowExtended>
			);
	}
};
