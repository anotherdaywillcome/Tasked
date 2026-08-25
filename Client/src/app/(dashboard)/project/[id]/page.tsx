import { cacheLife } from "next/cache";
import { Fragment, Suspense } from "react";

import { AssignedUsers, AssignedUsersSkeleton } from "@widgets/assigned-users";
import { ViewHeader } from "@widgets/view-header";

import { AssignUser } from "@features/assign-user";
import { CreateTask } from "@features/create-task";
import { MakeProjectPrivate } from "@features/make-project-private";
import { PinProject } from "@features/pin-project";
import { ProjectSettings } from "@features/project-settings";
import { Search } from "@features/search";

import { getProjectTasks } from "@entities/tasks";
import Dribble from "@public/images/projects/dribble.svg";
import Paypal from "@public/images/projects/paypal.svg";
import Sleekpay from "@public/images/projects/sleekpay.svg";
import Youtube from "@public/images/projects/youtube.svg";
import { ProjectTaskViews } from "./project-task-views";
import { ProjectTaskViewsSkeleton } from "./project-task-views-skeleton";

type ProjectPageProps = {
	params: Promise<{ id: string }>;
};

type Project = {
	id: string;
	name: string;
	imageUrl: string;
};

const getProject = async (id: string): Promise<Project> => {
	"use cache";

	cacheLife("days");

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const mockProjects: Record<string, Project> = {
				"1": { id: "1", name: "Sleekpay App", imageUrl: Sleekpay },
				"2": { id: "2", name: "PayPal App", imageUrl: Paypal },
				"3": { id: "3", name: "Dribble Posts", imageUrl: Dribble },
				"4": { id: "4", name: "Youtube", imageUrl: Youtube }
			};
			const project = mockProjects[id];

			if (project) resolve(project);
			else reject(new Error(`Project with id "${id}" not found`));
		});
	});
};

const ProjectTasksContent = async ({ projectId }: Readonly<{ projectId: string }>) => {
	const tasks = await getProjectTasks({ projectId });

	return <ProjectTaskViews initialData={tasks} projectId={projectId} />;
};

const ProjectContent = async ({ params }: Readonly<ProjectPageProps>) => {
	const { id: projectId } = await params;
	const { id, name, imageUrl } = await getProject(projectId);

	return (
		<Fragment>
			<ViewHeader title={name} imageUrl={imageUrl}>
				<ViewHeader.Info>
					<Suspense fallback={<AssignedUsersSkeleton />}>
						<AssignedUsers projectId={id} />
					</Suspense>
					<AssignUser projectId={id} />
				</ViewHeader.Info>
				<ViewHeader.Actions>
					<PinProject projectId={id} />
					<MakeProjectPrivate projectId={id} />
					<ProjectSettings projectId={id} />
				</ViewHeader.Actions>
				<ViewHeader.Tools>
					<Search />
					<CreateTask projectId={id} />
				</ViewHeader.Tools>
			</ViewHeader>
			<Suspense fallback={<ProjectTaskViewsSkeleton />}>
				<ProjectTasksContent projectId={id} />
			</Suspense>
		</Fragment>
	);
};

const ProjectPageFallback = () => (
	<div
		className="flex min-h-0 flex-1 items-center justify-center font-(family-name:--font-barlow) text-[14px] text-(--neutrals-3)"
		role="status"
	>
		Loading project…
	</div>
);

const ProjectPage = ({ params }: Readonly<ProjectPageProps>) => (
	<Suspense fallback={<ProjectPageFallback />}>
		<ProjectContent params={params} />
	</Suspense>
);

export default ProjectPage;
