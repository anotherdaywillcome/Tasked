import type { ProjectTask, ProjectTasksData } from "./project-tasks";

const createTask = (
	id: string,
	number: number,
	title: string,
	priority: ProjectTask["priority"],
	date: ProjectTask["dueDate"],
	assignees: ProjectTask["assignees"]
): ProjectTask => ({ id, number, title, priority, dueDate: date, assignees });

const users = {
	wade: { id: "users-1", fullName: "Wade Warren", imageUrl: "/images/users/wade_warren.jpg" },
	jenny: { id: "users-2", fullName: "Jenny Wilson", imageUrl: "/images/users/jenny_wilson.jpg" },
	kristin: { id: "users-3", fullName: "Kristin Watson", imageUrl: "/images/users/kristin_watson.jpg" },
	cody: { id: "users-4", fullName: "Cody Fisher", imageUrl: "/images/users/cody_fisher.jpg" },
	esther: { id: "users-5", fullName: "Esther Howard", imageUrl: "/images/users/esther_howard.jpg" },
	di: { id: "users-6", fullName: "Di Smolskii", imageUrl: "/images/users/di_smolskii.png" }
};

export const mockProjectTasks: ProjectTasksData = {
	id: "projects-tasks",
	projectId: "1",
	title: "Project tasks",
	groups: [
		{
			id: "backlog",
			title: "Backlog",
			tasks: [
				createTask(
					"task-2683",
					2683,
					"Analytics Creation: Installing tools for data collection.",
					"medium",
					{ value: "2026-07-23", label: "Jul 23", accessibleLabel: "July 23, 2026" },
					[users.wade, users.jenny]
				),
				createTask(
					"task-2682",
					2682,
					"Data Security: Protecting users' personal information.",
					"high",
					{ value: "2026-07-25", label: "Jul 25", accessibleLabel: "July 25, 2026" },
					[users.kristin]
				),
				createTask(
					"task-2681",
					2681,
					"Multi-User Support: Implementing interaction between users.",
					"low",
					{ value: "2026-07-28", label: "Jul 28", accessibleLabel: "July 28, 2026" },
					[users.cody]
				)
			]
		},
		{
			id: "todo",
			title: "To Do",
			tasks: [
				createTask(
					"task-2679",
					2679,
					"Function Implementation: Programming the main features.",
					"high",
					{ value: "2026-07-24", label: "Jul 24", accessibleLabel: "July 24, 2026" },
					[users.esther]
				),
				createTask(
					"task-2678",
					2678,
					"API Integration: Connecting external services.",
					"high",
					{ value: "2026-07-29", label: "Jul 29", accessibleLabel: "July 29, 2026" },
					[users.jenny]
				),
				createTask(
					"task-2677",
					2677,
					"Pre-Publishing: Collecting documents for app stores.",
					"medium",
					{ value: "2026-08-03", label: "Aug 03", accessibleLabel: "August 3, 2026" },
					[users.wade, users.cody]
				)
			]
		},
		{
			id: "in-progress",
			title: "In Progress",
			tasks: [
				createTask(
					"task-2666",
					2666,
					"Create a design system with a choice of colors, fonts, and icons.",
					"low",
					{ value: "2026-07-22", label: "Today", accessibleLabel: "July 22, 2026" },
					[users.wade, users.di]
				),
				createTask(
					"task-2664",
					2664,
					"Creating an interactive prototype in Figma.",
					"medium",
					{ value: "2026-07-26", label: "Jul 26", accessibleLabel: "July 26, 2026" },
					[users.di]
				),
				createTask(
					"task-2661",
					2661,
					"Performance Optimization: Improving speed and smoothness.",
					"low",
					{ value: "2026-07-31", label: "Jul 31", accessibleLabel: "July 31, 2026" },
					[users.kristin, users.esther]
				)
			]
		}
	]
};
