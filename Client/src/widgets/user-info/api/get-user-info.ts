import { GetUserInfoResponse } from "@entities/users";

import { bffApiClient } from "@shared/api/bff-api-client";
import { BFF_ENDPOINTS } from "@shared/config";

export const getUserInfo = async () => {
	return await bffApiClient.get<GetUserInfoResponse>(BFF_ENDPOINTS.Users.Info);
};
