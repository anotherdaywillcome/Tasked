import type { ReactElement } from "react";

import Dribble from "@public/images/projects/dribble.svg";
import Paypal from "@public/images/projects/paypal.svg";
import Sleekpay from "@public/images/projects/sleekpay.svg";
import Youtube from "@public/images/projects/youtube.svg";

import { Privacy, Project, ProjectRow, ProjectRowActions } from "@entities/projects";

type ProjectsListProps = {
	renderActions?: (projectId: string) => ReactElement;
};

const getProjects = (): Promise<Array<Project>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: String(1),
					name: "Sleekpay App",
					imageUrl: Sleekpay,
					description:
						"A modern payment application designed to make online payments simple, secure, and accessible.",
					taskSummary: { total: 21, completed: 8 },
					privacy: Privacy.Private,
					createdAt: "2026-01-15T10:30:00Z",
					createdBy: {
						id: String(1),
						imageUrl: "/images/users/jensen_ackles.jpg",
						fullName: "Jensen Ackles"
					},
					assignees: [
						{
							id: String(1),
							imageUrl: "/images/users/jensen_ackles.jpg",
							fullName: "Jensen Ackles"
						},
						{
							id: String(2),
							imageUrl: "/images/users/jared_padalecki.jpg",
							fullName: "Jared Padalecki"
						},
						{
							id: String(3),
							imageUrl: "/images/users/robert_palka.jpg",
							fullName: "Robert Palka"
						},
						{
							id: String(4),
							imageUrl: "/images/users/bartozs_zmarzlik.jpg",
							fullName: "Bartozs Zmarzlik"
						},
						{
							id: String(5),
							imageUrl: "/images/users/rupert_grind.jpg",
							fullName: "Rupert Grind"
						},
						{
							id: String(6),
							imageUrl: "/images/users/john_block.jpg",
							fullName: "John Block"
						}
					]
				},
				{
					id: String(2),
					name: "PayPal App",
					imageUrl: Paypal,
					description:
						"A payment management platform focused on fast, reliable, and secure digital transactions.",
					taskSummary: { total: 48, completed: 48 },
					privacy: Privacy.Public,
					createdAt: "2026-02-03T14:15:00Z",
					createdBy: {
						id: String(2),
						imageUrl: "/images/users/jared_padalecki.jpg",
						fullName: "Jared Padalecki"
					},
					assignees: [
						{
							id: String(1),
							imageUrl: "/images/users/jensen_ackles.jpg",
							fullName: "Jensen Ackles"
						},
						{
							id: String(2),
							imageUrl: "/images/users/jared_padalecki.jpg",
							fullName: "Jared Padalecki"
						},
						{
							id: String(3),
							imageUrl: "/images/users/robert_palka.jpg",
							fullName: "Robert Palka"
						},
						{
							id: String(4),
							imageUrl: "/images/users/bartozs_zmarzlik.jpg",
							fullName: "Bartozs Zmarzlik"
						}
					]
				},
				{
					id: String(3),
					name: "Dribble Posts",
					imageUrl: Dribble,
					description:
						"A creative design project for planning, creating, and publishing engaging Dribbble content.",
					taskSummary: { total: 16, completed: 9 },
					privacy: Privacy.Public,
					createdAt: "2026-02-21T09:45:00Z",
					createdBy: {
						id: String(3),
						imageUrl: "/images/users/robert_palka.jpg",
						fullName: "Robert Palka"
					},
					assignees: [
						{
							id: String(1),
							imageUrl: "/images/users/jensen_ackles.jpg",
							fullName: "Jensen Ackles"
						},
						{
							id: String(2),
							imageUrl: "/images/users/jared_padalecki.jpg",
							fullName: "Jared Padalecki"
						},
						{
							id: String(3),
							imageUrl: "/images/users/robert_palka.jpg",
							fullName: "Robert Palka"
						},
						{
							id: String(4),
							imageUrl: "/images/users/bartozs_zmarzlik.jpg",
							fullName: "Bartozs Zmarzlik"
						},
						{
							id: String(5),
							imageUrl: "/images/users/rupert_grind.jpg",
							fullName: "Rupert Grind"
						}
					]
				},
				{
					id: String(4),
					name: "Youtube",
					imageUrl: Youtube,
					description:
						"A video content project covering channel strategy, production, publishing, and audience growth.",
					taskSummary: { total: 21, completed: 0 },
					privacy: Privacy.Private,
					createdAt: "2026-03-10T16:20:00Z",
					createdBy: {
						id: String(4),
						imageUrl: "/images/users/bartozs_zmarzlik.jpg",
						fullName: "Bartozs Zmarzlik"
					},
					assignees: [
						{
							id: String(1),
							imageUrl: "/images/users/jensen_ackles.jpg",
							fullName: "Jensen Ackles"
						},
						{
							id: String(2),
							imageUrl: "/images/users/jared_padalecki.jpg",
							fullName: "Jared Padalecki"
						},
						{
							id: String(3),
							imageUrl: "/images/users/robert_palka.jpg",
							fullName: "Robert Palka"
						},
						{
							id: String(4),
							imageUrl: "/images/users/bartozs_zmarzlik.jpg",
							fullName: "Bartozs Zmarzlik"
						},
						{
							id: String(5),
							imageUrl: "/images/users/rupert_grind.jpg",
							fullName: "Rupert Grind"
						},
						{
							id: String(6),
							imageUrl: "/images/users/john_block.jpg",
							fullName: "John Block"
						}
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
			{projects.map((project) => (
				<li key={project.id}>
					<ProjectRow project={project}>
						<ProjectRowActions>{renderActions?.(project.id)}</ProjectRowActions>
					</ProjectRow>
				</li>
			))}
		</ul>
	);
};
