import { CreateNewProjectResponse } from "@entities/projects";

import { withFallback } from "@shared/lib/hofs";

import type { Project } from "../../../projects";
import { Privacy } from "../../../projects";
import type { Assignee } from "../../../tasks";
import type { User } from "../../../users";

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

const getProjectCreatedAt = withFallback("", {
	entity: "Project",
	field: "createdAt"
});

const getProjectCreatedBy = withFallback<Omit<User, "role">>(
	{
		id: "Unknown id",
		imageUrl: "/images/users/default.jpg",
		fullName: "Unknown user"
	},
	{
		entity: "Project",
		field: "createdBy"
	}
);

export const createNewProjectAdapter = (project: Omit<Project, "taskSummary">): CreateNewProjectResponse => ({
	id: getProjectId(project.id),
	imageUrl: project.imageUrl,
	name: getProjectName(project.name),
	description: getProjectDescription(project.description),
	privacy: getProjectPrivacy(project.privacy),
	createdAt: getProjectCreatedAt(project.createdAt),
	createdBy: getProjectCreatedBy(project.createdBy),
	assignees: getProjectAssignees(project.assignees).map(adaptAssignee)
});
