import { GetFeaturedClientsQuery, GetFeaturedClientsResponse } from "@entities/users";
import { BFF_ENDPOINTS } from "@shared/config";
import { bffApiClient } from "@shared/api/bff-api-client";

export const getFeaturedClients = async ({ limit }: Readonly<GetFeaturedClientsQuery>) => {
	return await bffApiClient.get<GetFeaturedClientsResponse>(BFF_ENDPOINTS.Clients.Featured(limit ?? 6));
};
