"use server";

import { cacheLife } from "next/cache";

import { mockProjectTasks, type ProjectTasksData } from "../../model";
import type { GetProjectTasksQuery } from "./get-project-tasks-query";

const getTasksEndpoint = (apiUrl: string, projectId: string) =>
	`${apiUrl.replace(/\/$/, "")}/api/projects/${encodeURIComponent(projectId)}/tasks`;

export const getProjectTasks = async ({ projectId }: GetProjectTasksQuery): Promise<ProjectTasksData> => {
	"use cache";

	cacheLife("minutes");

	const apiUrl = process.env.TASKED_API_URL;

	if (!apiUrl) return { ...mockProjectTasks, projectId };

	const response = await fetch(getTasksEndpoint(apiUrl, projectId), {
		headers: { Accept: "application/json" }
	});

	if (!response.ok) throw new Error(`Unable to load project tasks (${response.status}).`);

	return (await response.json()) as ProjectTasksData;
};
