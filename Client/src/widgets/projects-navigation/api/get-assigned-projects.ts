import type { GetAssignedProjectsQuery, GetAssignedProjectsResponse } from "@entities/projects";

import { bffServerApiClient } from "@shared/api";
import { BFF_ENDPOINTS } from "@shared/config";

export const getAssignedProjects = async ({ id }: Readonly<GetAssignedProjectsQuery>) => {
	return bffServerApiClient.get<GetAssignedProjectsResponse>(BFF_ENDPOINTS.Users.Projects.Assigned(id));
};
