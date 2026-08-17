import { Skeleton } from "@shared/ui";

export const ProjectTaskViewsSkeleton = () => (
	<section
		className="relative flex min-h-0 min-w-0 flex-1 flex-col"
		aria-label="Loading project tasks"
		aria-busy="true"
	>
		<div className="flex h-[54px] items-center gap-x-[16px]">
			{Array.from({ length: 4 }, (_, index) => (
				<Skeleton key={index} width="76px" height="34px" radius="10px" />
			))}
		</div>
		<div className="grid min-h-0 flex-1 grid-cols-3 gap-x-[8px] border-t-[0.50px] border-solid border-(--white-pallete-10) pt-[20px]">
			{Array.from({ length: 3 }, (_, columnIndex) => (
				<div key={columnIndex} className="rounded-[20px] bg-(--geek-blue-primary-opacity-100) p-[8px]">
					<Skeleton width="45%" height="20px" radius="8px" className="m-[12px]" />
					<div className="flex flex-col gap-y-[4px]">
						{Array.from({ length: 3 }, (_, taskIndex) => (
							<Skeleton key={taskIndex} width="100%" height="104px" radius="16px" />
						))}
					</div>
				</div>
			))}
		</div>
	</section>
);
