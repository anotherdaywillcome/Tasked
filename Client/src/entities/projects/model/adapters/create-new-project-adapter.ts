import { CreateNewProjectResponse } from "@entities/projects";

import { withFallback } from "@shared/lib/hofs";

import { Assignee, Privacy, Project } from "@entities/projects/model/types";

const getProjectId = withFallback("Unknown id", {
	entity: "Project",
	field: "id"
});

const getProjectName = withFallback("Unknown name", {
	entity: "Project",
	field: "name"
});

const getProjectDescription = withFallback("No description", {
	entity: "Project",
	field: "description"
});

const getProjectPrivacy = withFallback(Privacy.Private, {
	entity: "Project",
	field: "privacy"
});

const getProjectAssignees = withFallback<Array<Assignee>>([], {
	entity: "Project",
	field: "assignees"
});

const getAssigneeId = withFallback("Unknown id", {
	entity: "Assignee",
	field: "id"
});

// TODO: Replace with a default image for assignees when the imageUrl is not provided
const getAssigneeImageUrl = withFallback("https://i.pravatar.cc/96?img=1", {
	entity: "Assignee",
	field: "imageUrl"
});

const getAssigneeFullName = withFallback("Unknown assignee", {
	entity: "Assignee",
	field: "fullName"
});

const adaptAssignee = (assignee: Project["assignees"][number]): Assignee => ({
	id: getAssigneeId(assignee.id),
	imageUrl: getAssigneeImageUrl(assignee.imageUrl),
	fullName: getAssigneeFullName(assignee.fullName)
});

export const createNewProjectAdapter = (project: Omit<Project, "taskSummary">): CreateNewProjectResponse => ({
	id: getProjectId(project.id),
	imageUrl: project.imageUrl,
	name: getProjectName(project.name),
	description: getProjectDescription(project.description),
	privacy: getProjectPrivacy(project.privacy),
	assignees: getProjectAssignees(project.assignees).map(adaptAssignee)
});
