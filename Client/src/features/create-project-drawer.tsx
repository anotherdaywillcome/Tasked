"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Suspense, use, useEffect } from "react";

import { Drawer } from "@widgets/drawer";
import { DrawerContext } from "@widgets/drawer/model";

import { ChangeDescription } from "@features/(projects)/change-description";
import { ChangePrivacy } from "@features/(projects)/change-privacy";
import { Rename } from "@features/(projects)/rename";
import { UploadImage } from "@features/(projects)/upload-image";
import { CreateProjectDrawerSkeleton } from "@features/create-project-drawer-skeleton";

import { projectMutations } from "@entities/projects/api/project.mutations";
import { AssignUser } from "@features/assign-user";
import { AssignedUsers, AssignedUsersSkeleton } from "@widgets/assigned-users";
import { Icon, ICON_TYPES, Tabs } from "@shared/ui";

export const CreateProjectDrawer = () => {
	const { isOpen } = use(DrawerContext);
	const queryClient = useQueryClient();

	const {
		isSuccess,
		isPending,
		isError,
		error,
		mutate: createProject,
		data: project
	} = useMutation(projectMutations(queryClient).create());

	useEffect(() => {
		if (!isOpen("create-project")) return;
		if (isPending || isSuccess) return;

		createProject();
	}, [isOpen, isPending, isSuccess, createProject]);

	if (isPending) {
		return <CreateProjectDrawerSkeleton />;
	}

	if (isError) {
		return <div>Something went wrong: {error.message}</div>;
	}

	if (!project) {
		return <div>Unhandled error</div>;
	}
	const tabIndicatorClassName = "h-[2px] rounded-full bg-(--geek-blue-6)";
	return (
		<section className="relative flex h-full min-h-0 flex-col">
			<h2 className="sr-only">Basic project information</h2>
			<div className="flex items-center gap-x-[1rem] p-[0.75rem]">
				<UploadImage project={project} />
				<Rename project={project} />
			</div>
			<ChangeDescription project={project} />
			<div className="grid grid-cols-[auto_auto] gap-x-[24px] items-center">
				<ChangePrivacy project={project} />
				<div className="flex items-center w-full">
					<Drawer.Trigger id="assign-user">
						<div className="relative">
							<AssignUser projectId={project.id} />
						</div>
					</Drawer.Trigger>
					<Suspense fallback={<AssignedUsersSkeleton />}>
						<AssignedUsers projectId={project.id} />
					</Suspense>
				</div>
			</div>
			<Tabs className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden" defaultValue="activity">
				<Tabs.List className="flex gap-x-[16px]">
					<Tabs.Trigger value="activity" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[8px] border-b-[2px] border-solid border-transparent bg-transparent px-[12px] pt-[17px] pb-[18px] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em]">
								Activity
							</span>
							<Icon type={ICON_TYPES.Kanban} size={14} />
						</button>
					</Tabs.Trigger>
					<Tabs.Trigger value="last-views" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[8px] border-b-[2px] border-solid border-transparent bg-transparent px-[12px] pt-[17px] pb-[18px] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em]">
								Last Views
							</span>
							<Icon type={ICON_TYPES.Calendar} size={14} />
						</button>
					</Tabs.Trigger>
				</Tabs.List>
				<div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden border-t-[0.50px] border-solid border-(--white-pallete-10) pt-[20px]">
					<Tabs.Content className="bg-blue-600 h-full min-h-0 min-w-0 overflow-hidden" value="activity">
						<h1 className="text-red-600">Content</h1>
					</Tabs.Content>
					<Tabs.Content className="bg-yellow-700 h-full min-h-0 min-w-0 overflow-hidden" value="last-views">
						<h1 className="text-red-600">Content</h1>
					</Tabs.Content>
				</div>
			</Tabs>
		</section>
	);
};
