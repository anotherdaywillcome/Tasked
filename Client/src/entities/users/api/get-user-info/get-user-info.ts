import { serverApiClient } from "@shared/api/server-api-client";
import { API_ENDPOINTS } from "@shared/config";

import { GetUserInfoResponse } from "./get-user-info-response";

export const getUserInfo = async () => {
	return await serverApiClient.get<GetUserInfoResponse>(API_ENDPOINTS.Users.Me);
};
