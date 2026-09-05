import { serverApiClient } from "@shared/api";
import { API_ENDPOINTS } from "@shared/config";

import { UpdateProjectImageCommand } from "./update-project-image-command";
import { UpdateProjectImageResponse } from "./update-project-image-response";

export const updateProjectImage = async ({
	id,
	image
}: Readonly<UpdateProjectImageCommand>): UpdateProjectImageResponse => {
	const formData = new FormData();
	formData.append("image", image);

	return await serverApiClient.patch(API_ENDPOINTS.Projects.Upload.Image(id), formData);
};
