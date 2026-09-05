import type { AvatarStackDirectionVariant, AvatarStackVariant } from "@shared/ui";
import { AvatarStackDirectionVariants, AvatarStackVariants } from "@shared/ui";

type AssignedUsersSettings = {
	max: number;
	direction: AvatarStackDirectionVariant;
	variant: AvatarStackVariant;
};

export const ASSIGNED_USERS_DEFAULT_SETTINGS = {
	direction: AvatarStackDirectionVariants.LeftToRight,
	max: 7,
	variant: AvatarStackVariants.Extended
} satisfies AssignedUsersSettings;

type AssignedUsersSkeletonSettings = {
	max: number;
	direction: AvatarStackDirectionVariant;
};

export const ASSIGNED_USERS_SKELETON_DEFAULT_SETTINGS = {
	direction: AvatarStackDirectionVariants.LeftToRight,
	max: 6
} satisfies AssignedUsersSkeletonSettings;
