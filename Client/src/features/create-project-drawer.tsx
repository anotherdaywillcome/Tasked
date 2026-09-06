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
import { AvatarStackDirectionVariants, AvatarStackVariants, Tabs } from "@shared/ui";
import { AssignedUsers } from "@widgets/assigned-users";
import { AssignMembers } from "./(projects)/assign-members";
import { Activity } from "@widgets/(project)/activity";
import { LastViews } from "@widgets/(project)/last-views";

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

	return (
		<section className="relative flex h-full min-h-0 flex-col">
			<h2 className="sr-only">Basic project information</h2>
			<div className="flex items-center gap-x-[1rem] p-[0.75rem]">
				<UploadImage project={project} />
				<Rename project={project} />
			</div>
			<ChangeDescription project={project} />
			<div className="grid grid-cols-[1fr_1fr] gap-x-[1.5rem] items-center px-[0.75rem] pb-[0.75rem]">
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
			<Tabs
				className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden mx-[-1.5rem] pt-[1rem]"
				defaultValue="activity"
			>
				<Tabs.List className="flex gap-x-[1rem] px-[1.5rem]">
					<Tabs.Trigger value="activity">
						<Activity.DrawerTrigger />
					</Tabs.Trigger>
					<Tabs.Trigger value="last-views">
						<LastViews.DrawerTrigger />
					</Tabs.Trigger>
				</Tabs.List>
				<div className="bg-[rgba(1,0,9,0.25)] flex h-full min-h-0 min-w-0 flex-1 overflow-hidden border-t-[0.031rem] border-solid border-(--white-pallete-10) px-[0.75rem]">
					<Tabs.Content className="h-full min-h-0 min-w-0 overflow-hidden" value="activity">
						<Activity.DrawerContent project={project} />
					</Tabs.Content>
					<Tabs.Content className="h-full min-h-0 min-w-0 overflow-hidden" value="last-views">
						<LastViews.DrawerContent project={project} />
					</Tabs.Content>
				</div>
			</Tabs>
		</section>
	);
};
