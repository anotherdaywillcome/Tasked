import { withFallback } from "@shared/lib/hofs";

import { AssignedProject, GetAssignedProjectsResponse } from "../../api";

const getProjectId = withFallback("Unknown id", {
	entity: "Project",
	field: "id"
});

const getProjectName = withFallback("Unknown name", {
	entity: "Project",
	field: "name"
});

const getProjectImageUrl = withFallback("/images/projects-placeholder.png", {
	entity: "Project",
	field: "imageUrl"
});

export const assignedProjectsAdapter = (projects: Array<AssignedProject>): GetAssignedProjectsResponse => {
	return projects.map((project) => ({
		id: getProjectId(project.id),
		name: getProjectName(project.name),
		imageUrl: getProjectImageUrl(project.imageUrl)
	}));
};
