import { serverApiClient } from "@shared/api/server-api-client";
import { API_ENDPOINTS } from "@shared/config";

import { GetFeaturedClientsQuery } from "./get-featured-clients-query";
import { GetFeaturedClientsResponse } from "./get-featured-clients-response";

export const getFeaturedClients = async ({ limit }: Readonly<GetFeaturedClientsQuery>) => {
	return await serverApiClient.get<GetFeaturedClientsResponse>(API_ENDPOINTS.Users.Featured(limit ?? 6));
};
