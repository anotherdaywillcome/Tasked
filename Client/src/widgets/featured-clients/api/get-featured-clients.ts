import type { GetFeaturedClientsQuery, GetFeaturedClientsResponse } from "@entities/users";

import { bffBrowserApiClient } from "@shared/api";
import { BFF_ENDPOINTS } from "@shared/config";

export const getFeaturedClients = async ({ limit }: Readonly<GetFeaturedClientsQuery>) => {
	return await bffBrowserApiClient.get<GetFeaturedClientsResponse>(BFF_ENDPOINTS.Clients.Featured(limit ?? 6));
};
