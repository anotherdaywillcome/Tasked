import { serverApiClient } from "@shared/api";
import { API_ENDPOINTS } from "@shared/config";

import { GetAssignedProjectsQuery } from "./get-assigned-projects-query";
import { GetAssignedProjectsResponse } from "./get-assigned-projects-response";

export const getAssignedProjects = async ({
	id
}: Readonly<GetAssignedProjectsQuery>): Promise<GetAssignedProjectsResponse> => {
	return await serverApiClient.get<GetAssignedProjectsResponse>(API_ENDPOINTS.Users.Projects(id));
};
