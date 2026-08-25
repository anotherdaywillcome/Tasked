import { queryOptions } from "@tanstack/react-query";

import { bffBrowserApiClient } from "@shared/api/browser-api-client";
import { BFF_ENDPOINTS } from "@shared/config";

import type { AssignUsersCommand, AssignUsersResponse, GetAssignableUsersResponse } from "../model";

export const getAssignableUsers = (projectId: string) =>
	bffBrowserApiClient.get<GetAssignableUsersResponse>(BFF_ENDPOINTS.Projects.Assignees(projectId));

export const assignmentUsersQueryKey = (projectId: string) => ["projects", projectId, "assignable-users"] as const;

export const assignableUsersQueryOptions = (projectId: string) =>
	queryOptions({
		queryKey: assignmentUsersQueryKey(projectId),
		queryFn: () => getAssignableUsers(projectId)
	});

export const assignUsers = ({ projectId, userIds }: Readonly<AssignUsersCommand>) =>
	bffBrowserApiClient.patch<AssignUsersResponse>(BFF_ENDPOINTS.Projects.Assignees(projectId), { userIds });
