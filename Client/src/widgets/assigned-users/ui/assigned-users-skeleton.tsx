import { type AvatarStackDirectionVariant, AvatarStackDirectionVariants, Skeleton } from "@shared/ui";
import { ASSIGNED_USERS_SKELETON_DEFAULT_SETTINGS } from "@widgets/assigned-users/config";

type AssignedUsersSkeletonProps = {
	max?: number;
	direction?: AvatarStackDirectionVariant;
};

export const AssignedUsersSkeleton = ({
	max = ASSIGNED_USERS_SKELETON_DEFAULT_SETTINGS.max,
	direction = ASSIGNED_USERS_SKELETON_DEFAULT_SETTINGS.direction
}: Readonly<AssignedUsersSkeletonProps>) => {
	return (
		<div className="relative flex items-center">
			{Array.from({ length: max }).map((_, index) => (
				<div
					key={index}
					style={{ zIndex: direction === AvatarStackDirectionVariants.LeftToRight ? index : -index }}
					className="relative border border-[0.031rem] border-solid border-(--white-pallete-10) ml-[-0.5rem] rounded-full"
				>
					<Skeleton className="w-[2rem]! h-[2rem]! rounded-full! bg-[#111A41]!" />
				</div>
			))}
		</div>
	);
};
