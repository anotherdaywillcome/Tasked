import { GridLayoutManagerControls } from "@widgets/grid-layout-manager";
import { ViewHeader } from "@widgets/view-header";

import { CreateTask } from "@features/create-task";
import { Search } from "@features/search";

import { ICON_TYPES } from "@shared/ui";
import { TestWrapper } from "@features/test-wrapper";

const HomePage = () => {
	return (
		<div className="flex h-full flex-col">
			<ViewHeader title="Dashboard" icon={ICON_TYPES.Home}>
				<ViewHeader.Tools>
					<Search />
					<CreateTask />
					<GridLayoutManagerControls />
				</ViewHeader.Tools>
			</ViewHeader>
			<TestWrapper />
			{/*<GridLayoutManager rows={20}>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="private-notepad"*/}
			{/*		label="Private notepad"*/}
			{/*		x={0}*/}
			{/*		y={0}*/}
			{/*		w={12}*/}
			{/*		h={10}*/}
			{/*		minW={4}*/}
			{/*		minH={4}*/}
			{/*	>*/}
			{/*		<PrivateNotepad />*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="projects"*/}
			{/*		label="Projects"*/}
			{/*		x={12}*/}
			{/*		y={0}*/}
			{/*		w={6}*/}
			{/*		h={10}*/}
			{/*		minW={4}*/}
			{/*		minH={4}*/}
			{/*	>*/}
			{/*		<Projects>*/}
			{/*			<Projects.HeaderActions>*/}
			{/*				<CreateProject triggerVariant={CREATE_PROJECT_TRIGGER_VARIANT.IconButton} />*/}
			{/*			</Projects.HeaderActions>*/}
			{/*			<Projects.Actions>*/}
			{/*				{(projectId: string) => (*/}
			{/*					<Fragment>*/}
			{/*						<EditProject id={projectId} />*/}
			{/*						<DeleteProject id={projectId} />*/}
			{/*					</Fragment>*/}
			{/*				)}*/}
			{/*			</Projects.Actions>*/}
			{/*		</Projects>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component type="users" label="Users" x={18} y={0} w={6} h={11} minW={4} minH={4}>*/}
			{/*		<Users>*/}
			{/*			<Users.HeaderActions>*/}
			{/*				<CreateUser triggerVariant={CREATE_USER_TRIGGER_VARIANT.Button} />*/}
			{/*			</Users.HeaderActions>*/}
			{/*			<Users.Actions>*/}
			{/*				{(userId: string) => (*/}
			{/*					<Fragment>*/}
			{/*						<EditUser id={userId} />*/}
			{/*						<DeleteUser id={userId} />*/}
			{/*					</Fragment>*/}
			{/*				)}*/}
			{/*			</Users.Actions>*/}
			{/*		</Users>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="total-tasks"*/}
			{/*		label="Total Tasks"*/}
			{/*		x={0}*/}
			{/*		y={10}*/}
			{/*		w={6}*/}
			{/*		h={2}*/}
			{/*		minW={4}*/}
			{/*		minH={2}*/}
			{/*	>*/}
			{/*		<Suspense fallback={<TotalTasksSkeleton />}>*/}
			{/*			<TotalTasks />*/}
			{/*		</Suspense>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="assignee-tasks"*/}
			{/*		label="Assignee Tasks"*/}
			{/*		x={6}*/}
			{/*		y={10}*/}
			{/*		w={6}*/}
			{/*		h={2}*/}
			{/*		minW={4}*/}
			{/*		minH={2}*/}
			{/*	>*/}
			{/*		<Suspense fallback={<AssigneeTasksSkeleton />}>*/}
			{/*			<AssigneeTasks />*/}
			{/*		</Suspense>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="completed-tasks"*/}
			{/*		label="Completed Tasks"*/}
			{/*		x={12}*/}
			{/*		y={10}*/}
			{/*		w={6}*/}
			{/*		h={2}*/}
			{/*		minW={4}*/}
			{/*		minH={2}*/}
			{/*	>*/}
			{/*		<Suspense fallback={<CompletedTasksSkeleton />}>*/}
			{/*			<CompletedTasks />*/}
			{/*		</Suspense>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="overdue-tasks"*/}
			{/*		label="Overdue Tasks"*/}
			{/*		x={18}*/}
			{/*		y={10}*/}
			{/*		w={6}*/}
			{/*		h={2}*/}
			{/*		minW={4}*/}
			{/*		minH={2}*/}
			{/*	>*/}
			{/*		<Suspense fallback={<OverdueTasksSkeleton />}>*/}
			{/*			<OverdueTasks />*/}
			{/*		</Suspense>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="total-projects"*/}
			{/*		label="Total Projects"*/}
			{/*		x={0}*/}
			{/*		y={13}*/}
			{/*		w={6}*/}
			{/*		h={2}*/}
			{/*		minW={4}*/}
			{/*		minH={2}*/}
			{/*		defaultVisible={false}*/}
			{/*	>*/}
			{/*		<Suspense fallback={<TotalProjectsSkeleton />}>*/}
			{/*			<TotalProjects />*/}
			{/*		</Suspense>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component*/}
			{/*		type="today-tasks"*/}
			{/*		label="Today Tasks"*/}
			{/*		x={6}*/}
			{/*		y={13}*/}
			{/*		w={6}*/}
			{/*		h={2}*/}
			{/*		minW={4}*/}
			{/*		minH={2}*/}
			{/*		defaultVisible={false}*/}
			{/*	>*/}
			{/*		<Suspense fallback={<TodayTasksSkeleton />}>*/}
			{/*			<TodayTasks />*/}
			{/*		</Suspense>*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*	<GridLayoutManager.Component type="tasks" label="Tasks" x={0} y={13} w={24} h={8} minW={4} minH={4}>*/}
			{/*		<Tasks />*/}
			{/*	</GridLayoutManager.Component>*/}
			{/*</GridLayoutManager>*/}
		</div>
	);
};

export default HomePage;
