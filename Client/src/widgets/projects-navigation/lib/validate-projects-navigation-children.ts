import type { ReactElement } from "react";
import { isValidElement } from "react";

import type { ProjectsNavigationActionsProps } from "../ui/projects-navigation-actions";
import { ProjectsNavigationActions } from "../ui/projects-navigation-actions";

export const validateProjectsNavigationChildren = (
	child: ReactElement<ProjectsNavigationActionsProps, typeof ProjectsNavigationActions>
) => {
	if (!(isValidElement(child) && child.type === ProjectsNavigationActions)) {
		throw new Error(
			`<ProjectsNavigation> only accepts <ProjectsNavigation.Actions> as its child. ` +
				`Received: <${typeof child!.type === "string" ? child!.type : (child!.type.name ?? "Unknown")}>.`
		);
	}
};
