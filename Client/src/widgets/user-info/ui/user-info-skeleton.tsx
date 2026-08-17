import { Skeleton } from "@shared/ui";

export const UserInfoSkeleton = () => {
	return (
		<div className="flex items-center gap-x-[0.5rem] pt-[1rem] pb-[1.063rem] mx-[0.75rem] transition-[margin] duration-300 ease-out group-data-[collapsed=true]/sidebar:mx-0 group-data-[collapsed=true]/sidebar:justify-center">
			<Skeleton width="2.5rem" height="2.5rem" radius="6.25rem" />
			<div className="flex min-w-0 flex-col gap-y-[0.25rem] overflow-hidden transition-[opacity,width] duration-200 ease-out group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:opacity-0">
				<Skeleton width="4.5rem" height="1.313rem" radius="1rem" />
				<Skeleton width="5.75rem" height="0.938rem" radius="1rem" />
			</div>
		</div>
	);
};
