import { serverApiClient } from "@shared/api";
import { API_ENDPOINTS } from "@shared/config";

import { UpdateProjectPrivacyCommand } from "./update-project-privacy-command";
import { UpdateProjectPrivacyResponse } from "./update-project-privacy-response";

export const updateProjectPrivacy = ({ id, privacy }: Readonly<UpdateProjectPrivacyCommand>) => {
	return serverApiClient.patch<UpdateProjectPrivacyResponse>(API_ENDPOINTS.Projects.Update.Privacy(id), {
		privacy
	});
};
