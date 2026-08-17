import { UserRowSkeleton } from "@entities/users";

import { USERS_SKELETON_COUNT } from "../config";

export const UsersListSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-[0.5rem]">
			{Array.from({ length: USERS_SKELETON_COUNT }, (_, index) => (
				<UserRowSkeleton key={index} />
			))}
		</div>
	);
};
