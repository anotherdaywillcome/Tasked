import { getAssignedProjects } from "../api";

import { ProjectsNavigationLinksList } from "./projects-navigation-links-list";

const mockUserId = "e0603458-b76d-4602-b130-151e71d56b11";

export const ProjectsNavigationLinks = async () => {
	const projects = await getAssignedProjects({ id: mockUserId });
	// TODO
	// If error we show toast, right now app just crashes

	return <ProjectsNavigationLinksList projects={projects} />;
};
