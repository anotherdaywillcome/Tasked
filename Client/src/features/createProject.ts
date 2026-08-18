"use server";

import { CreateNewProjectResponse } from "@entities/projects";
import { bffServerApiClient } from "@shared/api";
import { BFF_ENDPOINTS } from "@shared/config";

export const createProject = async () => {
	return bffServerApiClient.post<CreateNewProjectResponse>(BFF_ENDPOINTS.Projects.Create);
};
