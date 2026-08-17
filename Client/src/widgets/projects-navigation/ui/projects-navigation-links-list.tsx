"use client";

import { ROUTES } from "@shared/config";
import { NavigationLinkHighlight, useNavigationLinkHighlight } from "@shared/ui";

import { GetAssignedProjectsResponse } from "@entities/projects";

import { ProjectsNavigationLink } from "./projects-navigation-link";

type ProjectsNavigationLinksListProps = {
	projects: GetAssignedProjectsResponse;
};

export const ProjectsNavigationLinksList = ({ projects }: Readonly<ProjectsNavigationLinksListProps>) => {
	const { activeLinkId, routeActiveLinkId, handleLinkSelection, handleLinkUnselection } = useNavigationLinkHighlight(
		projects.map((project) => ({
			id: project.id,
			match: (pathname: string) => pathname === ROUTES.Project(project.id)
		}))
	);

	return (
		<ul
			className="relative flex flex-col gap-y-[0.25rem]"
			onPointerLeave={handleLinkUnselection}
			onBlurCapture={handleLinkUnselection}
		>
			{projects.map(({ id, name, imageUrl }) => {
				{
					const isActive = activeLinkId === id;
					const isCurrent = routeActiveLinkId === id;

					return (
						<li
							className="relative"
							key={id}
							onPointerEnter={() => handleLinkSelection(id)}
							onFocusCapture={() => handleLinkSelection(id)}
						>
							{isActive && <NavigationLinkHighlight layoutId="projects-navigation-link-highlight" />}
							<ProjectsNavigationLink
								id={id}
								name={name}
								imageUrl={imageUrl}
								isActive={isActive}
								isCurrent={isCurrent}
							>
								{name}
							</ProjectsNavigationLink>
						</li>
					);
				}
			})}
		</ul>
	);
};
