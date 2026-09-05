"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";

import { Drawer } from "@widgets/drawer";
import { DrawerContext } from "@widgets/drawer/model";

import { ChangeDescription } from "@features/(projects)/change-description";
import { ChangePrivacy } from "@features/(projects)/change-privacy";
import { Rename } from "@features/(projects)/rename";
import { UploadImage } from "@features/(projects)/upload-image";
import { CreateProjectDrawerSkeleton } from "@features/create-project-drawer-skeleton";

import { projectMutations } from "@entities/projects/api/project.mutations";
import { AvatarStackDirectionVariants, AvatarStackVariants, Icon, ICON_TYPES, Tabs } from "@shared/ui";
import { AssignedUsers } from "@widgets/assigned-users";
import { AssignMembers } from "./(projects)/assign-members";

export const CreateProjectDrawer = () => {
	const { isOpen } = use(DrawerContext);

	const [assigneesLoaded, setAssigneesLoaded] = useState<boolean>(false);

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

	const tabIndicatorClassName = "h-[0.125rem] rounded-full bg-(--geek-blue-6)";

	return (
		<section className="relative flex h-full min-h-0 flex-col">
			<h2 className="sr-only">Basic project information</h2>
			<div className="flex items-center gap-x-[1rem] p-[0.75rem]">
				<UploadImage project={project} />
				<Rename project={project} />
			</div>
			<ChangeDescription project={project} />
			<div className="grid grid-cols-[auto_auto] gap-x-[1.5rem] items-center px-[0.75rem] pb-[0.75rem]">
				<ChangePrivacy project={project} />
				<div className="flex flex-col w-full gap-y-[0.25rem]">
					<span className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
						Assignee
					</span>
					<div className="flex items-center">
						{assigneesLoaded && (
							<Drawer.Trigger id="assign-user">
								<div className="relative">
									<AssignMembers.Trigger
										id={project.id}
										triggerSize="2rem"
										className="relative ml-[0rem] mr-[-0.5rem] z-[1000]"
									/>
								</div>
							</Drawer.Trigger>
						)}
						<AssignedUsers
							onLoadSuccess={() => setAssigneesLoaded(true)}
							project={project}
							variant={AvatarStackVariants.UltraCompact}
							direction={AvatarStackDirectionVariants.RightToLeft}
						/>
					</div>
				</div>
			</div>
			<Tabs className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden mx-[-1.5rem]" defaultValue="activity">
				<Tabs.List className="flex gap-x-[1rem] px-[1.5rem]">
					<Tabs.Trigger value="activity" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[0.5rem] border-b-[0.125rem] border-solid border-transparent bg-transparent px-[0.75rem] pt-[1.063rem] pb-[1.125rem] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_0.125rem_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[0.75rem] leading-[133%] font-bold tracking-[0.01em]">
								Activity
							</span>
							<Icon type={ICON_TYPES.Kanban} size={14} />
						</button>
					</Tabs.Trigger>
					<Tabs.Trigger value="last-views" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[0.5rem] border-b-[0.125rem] border-solid border-transparent bg-transparent px-[0.75rem] pt-[1.063rem] pb-[1.125rem] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_0.125rem_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[0.75rem] leading-[133%] font-bold tracking-[0.01em]">
								Last Views
							</span>
							<Icon type={ICON_TYPES.Calendar} size={14} />
						</button>
					</Tabs.Trigger>
				</Tabs.List>
				<div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden border-t-[0.031rem] border-solid border-(--white-pallete-10) px-[0.75rem]">
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
