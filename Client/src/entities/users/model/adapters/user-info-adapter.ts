import { withFallback } from "@shared/lib/hofs";

import type { User } from "../../../users";
import type { GetUserInfoResponse } from "../../api";

const getProjectId = withFallback("Unknown id", {
	entity: "User",
	field: "id"
});

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
	id: getProjectId(user.id),
	fullName: getFullName(user.fullName),
	role: getRole(user.role),
	imageUrl: getImageUrl(user.imageUrl)
});
