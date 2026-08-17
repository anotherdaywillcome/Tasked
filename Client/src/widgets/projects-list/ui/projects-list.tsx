import type { ReactElement } from "react";
import { Children, isValidElement } from "react";

import Dribble from "@public/images/projects/dribble.svg";
import Paypal from "@public/images/projects/paypal.svg";
import Sleekpay from "@public/images/projects/sleekpay.svg";
import Youtube from "@public/images/projects/youtube.svg";

import { ProjectRow, ProjectRowActions, ProjectRowVariants } from "@entities/projects";

import type { ProjectsListActionsProps } from "./projects-list-actions";
import { ProjectsListActions } from "./projects-list-actions";

type User = {
	id: string;
	fullName: string;
	imageUrl: string;
};

type TaskSummary = {
	total: number;
	completed: number;
};

type Project = {
	id: string;
	name: string;
	imageUrl: string;
	taskSummary: TaskSummary;
	assignedUsers: Array<User>;
};

type ProjectsComponents = {
	Actions: typeof ProjectsListActions;
};

type ProjectsListProps = {
	children?: ReactElement | ReactElement[];
};

type ProjectsList = ((props: Readonly<ProjectsListProps>) => ReactElement) & ProjectsComponents;

const getProjects = (): Promise<Array<Project>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: String(1),
					name: "Sleekpay App",
					imageUrl: Sleekpay,
					taskSummary: { total: 21, completed: 8 },
					assignedUsers: [
						{ id: String(1), imageUrl: "/images/users/jensen_ackles.jpg", fullName: "Jensen Ackles" },
						{ id: String(2), imageUrl: "/images/users/jared_padalecki.jpg", fullName: "Jared Padalecki" },
						{ id: String(3), imageUrl: "/images/users/robert_palka.jpg", fullName: "Robert Palka" },
						{ id: String(4), imageUrl: "/images/users/bartozs_zmarzlik.jpg", fullName: "Bartozs Zmarzlik" },
						{ id: String(5), imageUrl: "/images/users/rupert_grind.jpg", fullName: "Rupert Grind" },
						{ id: String(6), imageUrl: "/images/users/john_block.jpg", fullName: "John Block" }
					]
				},
				{
					id: String(2),
					name: "PayPal App",
					imageUrl: Paypal,
					taskSummary: { total: 48, completed: 48 },
					assignedUsers: [
						{ id: String(1), imageUrl: "/images/users/jensen_ackles.jpg", fullName: "Jensen Ackles" },
						{ id: String(2), imageUrl: "/images/users/jared_padalecki.jpg", fullName: "Jared Padalecki" },
						{ id: String(3), imageUrl: "/images/users/robert_palka.jpg", fullName: "Robert Palka" },
						{ id: String(4), imageUrl: "/images/users/bartozs_zmarzlik.jpg", fullName: "Bartozs Zmarzlik" }
					]
				},
				{
					id: String(3),
					name: "Dribble Posts",
					imageUrl: Dribble,
					taskSummary: { total: 16, completed: 9 },
					assignedUsers: [
						{ id: String(1), imageUrl: "/images/users/jensen_ackles.jpg", fullName: "Jensen Ackles" },
						{ id: String(2), imageUrl: "/images/users/jared_padalecki.jpg", fullName: "Jared Padalecki" },
						{ id: String(3), imageUrl: "/images/users/robert_palka.jpg", fullName: "Robert Palka" },
						{ id: String(4), imageUrl: "/images/users/bartozs_zmarzlik.jpg", fullName: "Bartozs Zmarzlik" },
						{ id: String(5), imageUrl: "/images/users/rupert_grind.jpg", fullName: "Rupert Grind" }
					]
				},
				{
					id: String(4),
					name: "Youtube",
					imageUrl: Youtube,
					taskSummary: { total: 21, completed: 0 },
					assignedUsers: [
						{ id: String(1), imageUrl: "/images/users/jensen_ackles.jpg", fullName: "Jensen Ackles" },
						{ id: String(2), imageUrl: "/images/users/jared_padalecki.jpg", fullName: "Jared Padalecki" },
						{ id: String(3), imageUrl: "/images/users/robert_palka.jpg", fullName: "Robert Palka" },
						{ id: String(4), imageUrl: "/images/users/bartozs_zmarzlik.jpg", fullName: "Bartozs Zmarzlik" },
						{ id: String(5), imageUrl: "/images/users/rupert_grind.jpg", fullName: "Rupert Grind" },
						{ id: String(6), imageUrl: "/images/users/john_block.jpg", fullName: "John Block" }
					]
				}
			]);
		}, 6000);
	});
};

const validateProjectsListChildren = (children: ReactElement | ReactElement[]) => {
	Children.forEach(children, (child) => {
		if (!(isValidElement(child) && child.type === ProjectsList.Actions)) {
			throw new Error(`
				Component <ProjectsList> can only accept children of type <ProjectsList.Actions>.
				Received child of type ${child.type}.
				Please ensure that all children of <ProjectsList> are of the correct type. 
			`);
		}
	});
};

export const ProjectsList = (async ({ children }: Readonly<ProjectsListProps>) => {
	let ProjectsActions: ((projectId: string) => ReactElement) | null = null;

	const projects = await getProjects();

	if (children) {
		validateProjectsListChildren(children);
	}

	Children.forEach(children, (child) => {
		if (child?.type === ProjectsList.Actions) {
			ProjectsActions = (child as ReactElement<ProjectsListActionsProps>).props.children;
		}
	});

	return (
		<ul className="flex flex-col gap-y-[0.5rem]">
			{projects.map(({ id, ...project }) => (
				<li key={id}>
					<ProjectRow project={project} variant={ProjectRowVariants.Extended}>
						<ProjectRowActions>{ProjectsActions?.(id)}</ProjectRowActions>
					</ProjectRow>
				</li>
			))}
		</ul>
	);
}) as unknown as ProjectsList;

ProjectsList.Actions = ProjectsListActions;
