import { withFallback } from "@shared/lib/hofs";

import { GetUserInfoResponse, User } from "../../api";

const getFullName = withFallback("Unknown users", {
	entity: "User",
	field: "fullName"
});

const getRole = withFallback("Unknown role", {
	entity: "User",
	field: "role"
});

const getImageUrl = withFallback("/images/avatar-placeholder.png", {
	entity: "User",
	field: "imageUrl"
});

export const userInfoAdapter = (user: User): GetUserInfoResponse => ({
	fullName: getFullName(user.fullName),
	role: getRole(user.role),
	imageUrl: getImageUrl(user.imageUrl)
});
