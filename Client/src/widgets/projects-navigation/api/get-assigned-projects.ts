import { GetAssignedProjectsQuery, GetAssignedProjectsResponse } from "@entities/projects/api";

import { bffApiClient } from "@shared/api/bff-api-client";
import { BFF_ENDPOINTS } from "@shared/config";

export const getAssignedProjects = async ({ id }: Readonly<GetAssignedProjectsQuery>) => {
	return bffApiClient.get<GetAssignedProjectsResponse>(BFF_ENDPOINTS.Users.Projects.Assigned(id));
};
