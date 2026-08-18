import { serverApiClient } from "@shared/api";
import { API_ENDPOINTS } from "@shared/config";

import { UpdateProjectDescriptionCommand } from "./update-project-description-command";
import { UpdateProjectDescriptionResponse } from "./update-project-description-response";

export const updateProjectDescription = ({ id, description }: Readonly<UpdateProjectDescriptionCommand>) => {
	return serverApiClient.patch<UpdateProjectDescriptionResponse>(API_ENDPOINTS.Projects.Update.Description(id), {
		description
	});
};
