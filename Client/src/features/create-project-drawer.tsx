"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use, useEffect } from "react";

import { Drawer } from "@widgets/drawer";
import { DrawerContext } from "@widgets/drawer/model";

import { ChangeDescription } from "@features/(projects)/change-description";
import { ChangePrivacy } from "@features/(projects)/change-privacy";
import { Rename } from "@features/(projects)/rename";
import { UploadImage } from "@features/(projects)/upload-image";
import { CreateProjectDrawerSkeleton } from "@features/create-project-drawer-skeleton";

import { projectMutations } from "@entities/projects/api/project.mutations";

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

	return (
		<section className="relative">
			<h2 className="sr-only">Basic project information</h2>
			<div className="flex items-center gap-x-[1rem] p-[0.75rem]">
				<UploadImage project={project} />
				<Rename project={project} />
			</div>
			<ChangeDescription project={project} />
			<div className="flex">
				<ChangePrivacy project={project} />
				<div>
					<button>Assign User</button>
					<div>
						{/* Avatar stack */}
						<img src="" alt="" />
						<img src="" alt="" />
						<img src="" alt="" />
						<img src="" alt="" />
						<img src="" alt="" />
					</div>
				</div>
			</div>
			<div className="pt-[200px]">
				<Drawer.Trigger id="assign-user">
					<button className="w-full h-[2.5rem] bg-blue-400 cursor-pointer">Assign User</button>
				</Drawer.Trigger>
			</div>
		</section>
	);
};
