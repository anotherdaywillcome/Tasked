import { Suspense } from "react";

import { Icon, ICON_TYPES } from "@shared/ui";

import { TasksCount } from "./tasks-count";
import { TasksCountSkeleton } from "./tasks-count-skeleton";
import { TasksList } from "./tasks-list";
import { TasksListSkeleton } from "./tasks-list-skeleton";

export const Tasks = () => {
	return (
		<section className="px-[1rem] border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1.25rem] bg-(--geek-blue-primary-opacity-100) h-full overflow-y-auto">
			<header className="flex items-center justify-between py-[0.75rem] border-b-[0.031rem] border-solid border-(--white-pallete-10)">
				<div className="flex items-center gap-x-[0.5rem]">
					<h2 className="font-(family-name:--font-barlow) font-bold text-[0.875rem] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)">
						My Tasks
					</h2>
					<Suspense fallback={<TasksCountSkeleton />}>
						<TasksCount />
					</Suspense>
				</div>
				<button
					className="border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[0.625rem] px-[0.5rem] py-[0.438rem] bg-(--geek-blue-primary-opacity-100) cursor-pointer flex items-center gap-x-[0.5rem]"
					type="button"
				>
					<span className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
						All Projects
					</span>
					<Icon className="text-(--neutrals-3) rotate-90" type={ICON_TYPES.Chevron} size={16} />
				</button>
			</header>
			<Suspense fallback={<TasksListSkeleton />}>
				<TasksList />
			</Suspense>
		</section>
	);
};
