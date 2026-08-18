import { GetUserInfoResponse } from "@entities/users";

import { bffBrowserApiClient } from "@shared/api";
import { BFF_ENDPOINTS } from "@shared/config";

export const getUserInfo = async () => {
	return await bffBrowserApiClient.get<GetUserInfoResponse>(BFF_ENDPOINTS.Users.Info);
};
