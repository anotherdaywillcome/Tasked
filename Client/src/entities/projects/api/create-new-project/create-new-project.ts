import { serverApiClient } from "@shared/api";
import { API_ENDPOINTS } from "@shared/config";

import type { CreateNewProjectResponse } from "./create-new-project-response";

export const createNewProject = async () => {
	return serverApiClient.post<CreateNewProjectResponse>(API_ENDPOINTS.Projects.Create);
};
