import { serverApiClient } from "@shared/api";
import { API_ENDPOINTS } from "@shared/config";

import { UpdateProjectNameCommand } from "./update-project-name-command";
import { UpdateProjectNameResponse } from "./update-project-name-response";

export const updateProjectName = ({ id, name }: Readonly<UpdateProjectNameCommand>) => {
	return serverApiClient.patch<UpdateProjectNameResponse>(API_ENDPOINTS.Projects.Update.Name(id), { name });
};
