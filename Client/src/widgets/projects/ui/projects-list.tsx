import type { ReactElement } from "react";

import Dribble from "@public/images/projects/dribble.svg";
import Paypal from "@public/images/projects/paypal.svg";
import Sleekpay from "@public/images/projects/sleekpay.svg";
import Youtube from "@public/images/projects/youtube.svg";

import { ProjectRow, ProjectRowActions } from "@entities/projects";

type ProjectsListProps = {
	renderActions?: (projectId: string) => ReactElement;
};

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

export const ProjectsList = async ({ renderActions }: Readonly<ProjectsListProps>) => {
	const projects = await getProjects();

	return (
		<ul className="flex flex-col gap-y-[0.5rem]">
			{projects.map(({ id, ...project }) => (
				<li key={id}>
					<ProjectRow project={project}>
						<ProjectRowActions>{renderActions?.(id)}</ProjectRowActions>
					</ProjectRow>
				</li>
			))}
		</ul>
	);
};
