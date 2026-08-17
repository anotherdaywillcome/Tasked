import { withFallback } from "@shared/lib/hofs";

import { FeaturedClient, GetFeaturedClientsResponse } from "../../api";

const getFullName = withFallback("Unknown users", {
	entity: "User",
	field: "fullName"
});

const getImageUrl = withFallback("/images/avatar-placeholder.png", {
	entity: "User",
	field: "imageUrl"
});

export const featuredClientsAdapter = (clients: Array<FeaturedClient>): GetFeaturedClientsResponse => {
	return clients.map((client) => ({
		fullName: getFullName(client.fullName),
		imageUrl: getImageUrl(client.imageUrl)
	}));
};
