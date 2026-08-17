import { Fragment, Suspense } from "react";

import { AssigneeTasks, AssigneeTasksSkeleton } from "@widgets/assignee-tasks";
import { CompletedProjects, CompletedProjectsSkeleton } from "@widgets/completed-projects";
import { CompletedTasks, CompletedTasksSkeleton } from "@widgets/completed-tasks";
import { GridLayoutManager, GridLayoutManagerControls } from "@widgets/grid-layout-manager";
import { OverdueTasks, OverdueTasksSkeleton } from "@widgets/overdue-tasks";
import { ProjectsList, ProjectsListSkeleton } from "@widgets/projects-list";
import { TodayTasks, TodayTasksSkeleton } from "@widgets/today-tasks";
import { TotalProjects, TotalProjectsSkeleton } from "@widgets/total-projects";
import { TotalTasks, TotalTasksSkeleton } from "@widgets/total-tasks";
import { TotalUsers, TotalUsersSkeleton } from "@widgets/total-users";
import { ViewHeader } from "@widgets/view-header";

import { CREATE_PROJECT_TRIGGER_VARIANT, CreateProject } from "@features/create-project";
import { DeleteProject } from "@features/delete-project";
import { EditProject } from "@features/edit-project";
import { Search } from "@features/search";

import { ICON_TYPES } from "@shared/ui";

const ProjectsPage = () => {
	return (
		<Fragment>
			<ViewHeader title="Projects" icon={ICON_TYPES.Projects}>
				<ViewHeader.Tools>
					<Search />
					<CreateProject triggerVariant={CREATE_PROJECT_TRIGGER_VARIANT.Button} />
					<GridLayoutManagerControls />
				</ViewHeader.Tools>
			</ViewHeader>
			<main>
				<div className="h-[4.75rem]">
					<GridLayoutManager rows={3}>
						<GridLayoutManager.Component
							type="total-tasks"
							label="Total Tasks"
							x={0}
							y={10}
							w={6}
							h={2}
							minW={4}
							minH={2}
						>
							<Suspense fallback={<TotalTasksSkeleton />}>
								<TotalTasks />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="assignee-tasks"
							label="Assignee Tasks"
							x={6}
							y={10}
							w={6}
							h={2}
							minW={4}
							minH={2}
						>
							<Suspense fallback={<AssigneeTasksSkeleton />}>
								<AssigneeTasks />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="completed-tasks"
							label="Completed Tasks"
							x={12}
							y={10}
							w={6}
							h={2}
							minW={4}
							minH={2}
						>
							<Suspense fallback={<CompletedTasksSkeleton />}>
								<CompletedTasks />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="overdue-tasks"
							label="Overdue Tasks"
							x={18}
							y={10}
							w={6}
							h={2}
							minW={4}
							minH={2}
						>
							<Suspense fallback={<OverdueTasksSkeleton />}>
								<OverdueTasks />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="total-projects"
							label="Total Projects"
							x={0}
							y={13}
							w={6}
							h={2}
							minW={4}
							minH={2}
							defaultVisible={false}
						>
							<Suspense fallback={<TotalProjectsSkeleton />}>
								<TotalProjects />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="today-tasks"
							label="Today Tasks"
							x={6}
							y={13}
							w={6}
							h={2}
							minW={4}
							minH={2}
							defaultVisible={false}
						>
							<Suspense fallback={<TodayTasksSkeleton />}>
								<TodayTasks />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="completed-projects"
							label="Completed Projects"
							x={6}
							y={13}
							w={6}
							h={2}
							minW={4}
							minH={2}
							defaultVisible={false}
						>
							<Suspense fallback={<CompletedProjectsSkeleton />}>
								<CompletedProjects />
							</Suspense>
						</GridLayoutManager.Component>
						<GridLayoutManager.Component
							type="total-users"
							label="Total Users"
							x={6}
							y={13}
							w={6}
							h={2}
							minW={4}
							minH={2}
							defaultVisible={false}
						>
							<Suspense fallback={<TotalUsersSkeleton />}>
								<TotalUsers />
							</Suspense>
						</GridLayoutManager.Component>
					</GridLayoutManager>
				</div>
				<div className="mt-[1.25rem]">
					<Suspense fallback={<ProjectsListSkeleton />}>
						<ProjectsList>
							<ProjectsList.Actions>
								{(projectId: string) => (
									<Fragment>
										<EditProject id={projectId} />
										<DeleteProject id={projectId} />
									</Fragment>
								)}
							</ProjectsList.Actions>
						</ProjectsList>
					</Suspense>
				</div>
			</main>
		</Fragment>
	);
};

export default ProjectsPage;
