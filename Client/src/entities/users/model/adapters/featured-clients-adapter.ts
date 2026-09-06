import { withFallback } from "@shared/lib/hofs";

import { GetFeaturedClientsResponse } from "../../api";
import { User } from "../../model";

const getId = withFallback("Unknown id", {
	entity: "User",
	field: "id"
});

const getFullName = withFallback("Unknown user", {
	entity: "User",
	field: "fullName"
});

const getImageUrl = withFallback("/images/avatar-placeholder.png", {
	entity: "User",
	field: "imageUrl"
});

const getRole = withFallback("Unknown role", {
	entity: "User",
	field: "role"
});

export const featuredClientsAdapter = (clients: Array<User>): GetFeaturedClientsResponse => {
	return clients.map((client) => ({
		id: getId(client.id),
		fullName: getFullName(client.fullName),
		imageUrl: getImageUrl(client.imageUrl),
		role: getRole(client.role)
	}));
};
