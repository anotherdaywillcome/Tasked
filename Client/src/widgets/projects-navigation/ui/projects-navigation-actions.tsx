import type { ReactElement } from "react";
import { Fragment } from "react";

export type ProjectsNavigationActionsProps = {
	children: ReactElement | ReactElement[];
};

export const ProjectsNavigationActions = ({ children }: Readonly<ProjectsNavigationActionsProps>) => {
	return <Fragment>{children}</Fragment>;
};
