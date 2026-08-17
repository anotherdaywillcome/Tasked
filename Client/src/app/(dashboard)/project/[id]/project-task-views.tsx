"use client";

import { useState } from "react";

import { CalendarComposition, CalendarGrid, CalendarHeader, CalendarTask } from "@widgets/calendar";
import { KanbanBoard } from "@widgets/kanban-board";
import { GroupedList } from "@widgets/list";

import { CreateTask } from "@features/create-task";

import { type ProjectTasksData, toCalendarTasks, toGroupedListData, toKanbanBoardData } from "@entities/tasks";
import { Icon, ICON_TYPES, Tabs } from "@shared/ui";

type ProjectTaskViewsProps = {
	initialData: ProjectTasksData;
	projectId: string;
};

const tabIndicatorClassName = "h-[2px] rounded-full bg-(--geek-blue-6)";

export const ProjectTaskViews = ({ initialData, projectId }: Readonly<ProjectTaskViewsProps>) => {
	const [tasksData, setTasksData] = useState(initialData);
	const kanbanData = toKanbanBoardData(tasksData);
	const listData = toGroupedListData(tasksData);
	const calendarTasks = toCalendarTasks(tasksData);

	return (
		<section className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
			<Tabs className="flex min-h-0 min-w-0 flex-col overflow-hidden" defaultValue="kanban">
				<Tabs.List className="flex gap-x-[16px]">
					<Tabs.Trigger value="kanban" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[8px] border-b-[2px] border-solid border-transparent bg-transparent px-[12px] pt-[17px] pb-[18px] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em]">
								Kanban
							</span>
							<Icon type={ICON_TYPES.Kanban} size={14} />
						</button>
					</Tabs.Trigger>
					<Tabs.Trigger value="list" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[8px] border-b-[2px] border-solid border-transparent bg-transparent px-[12px] pt-[17px] pb-[18px] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em]">
								List
							</span>
							<Icon type={ICON_TYPES.List} size={14} />
						</button>
					</Tabs.Trigger>
					<Tabs.Trigger value="calendar" indicatorClassName={tabIndicatorClassName}>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[8px] border-b-[2px] border-solid border-transparent bg-transparent px-[12px] pt-[17px] pb-[18px] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em]">
								Calendar
							</span>
							<Icon type={ICON_TYPES.Calendar} size={14} />
						</button>
					</Tabs.Trigger>
					<Tabs.Trigger>
						<button
							type="button"
							className="flex cursor-pointer flex-row-reverse items-center gap-x-[8px] border-b-[2px] border-solid border-transparent bg-transparent px-[12px] pt-[17px] pb-[18px] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
						>
							<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em]">
								Files
							</span>
							<Icon type={ICON_TYPES.Folder} size={14} />
						</button>
					</Tabs.Trigger>
				</Tabs.List>
				<div className="flex min-h-0 min-w-0 flex-1 overflow-hidden border-t-[0.50px] border-solid border-(--white-pallete-10) pt-[20px]">
					<Tabs.Content className="min-h-0 min-w-0 overflow-hidden" value="kanban">
						<KanbanBoard
							data={kanbanData}
							onDataChange={(board) =>
								setTasksData((current) => ({
									...current,
									id: board.id,
									title: board.title,
									groups: board.columns
								}))
							}
						>
							{kanbanData.columns.map((column) => (
								<KanbanBoard.Column key={column.id} column={column}>
									{column.tasks.map((task) => (
										<KanbanBoard.ColumnCard key={task.id} task={task} />
									))}
									<KanbanBoard.ColumnActions>
										<CreateTask projectId={projectId} variant="icon" />
									</KanbanBoard.ColumnActions>
								</KanbanBoard.Column>
							))}
						</KanbanBoard>
					</Tabs.Content>
					<Tabs.Content value="list">
						<GroupedList
							data={listData}
							onDataChange={(list) =>
								setTasksData((current) => ({
									...current,
									id: list.id,
									title: list.title,
									groups: list.groups
								}))
							}
						>
							{listData.groups.map((group) => (
								<GroupedList.Group key={group.id} group={group}>
									<GroupedList.Header>
										<GroupedList.Title />
										<GroupedList.Count />
										<GroupedList.Action />
									</GroupedList.Header>
									<GroupedList.Items>
										{group.tasks.map((task) => (
											<GroupedList.Item key={task.id} task={task} />
										))}
									</GroupedList.Items>
								</GroupedList.Group>
							))}
						</GroupedList>
					</Tabs.Content>
					<Tabs.Content className="min-h-0 min-w-0 overflow-hidden" value="calendar">
						<CalendarComposition
							tasks={calendarTasks}
							onTasksChange={(tasks) => {
								const tasksById = new Map(tasks.map((task) => [task.id, task]));

								setTasksData((current) => ({
									...current,
									groups: current.groups.map((group) => ({
										...group,
										tasks: group.tasks.map((task) => {
											const movedTask = tasksById.get(task.id);

											return movedTask ? { ...task, dueDate: movedTask.dueDate } : task;
										})
									}))
								}));
							}}
						>
							<CalendarHeader />
							<CalendarGrid>
								{calendarTasks.map((task) => (
									<CalendarTask key={task.id} task={task} />
								))}
							</CalendarGrid>
						</CalendarComposition>
					</Tabs.Content>
				</div>
			</Tabs>
		</section>
	);
};
