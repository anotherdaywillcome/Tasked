import { API_ENDPOINTS } from "@shared/config";
import { serverApiClient } from "@shared/api";

import { GetProjectAssigneesQuery } from "./get-project-assignees-query";
import { GetProjectAssigneesResponse } from "./get-project-assignees-response";

export const getProjectAssignees = async ({
	id
}: Readonly<GetProjectAssigneesQuery>): Promise<GetProjectAssigneesResponse> => {
	return await serverApiClient.get<GetProjectAssigneesResponse>(API_ENDPOINTS.Projects.Assignees(id));
};
