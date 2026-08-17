"use client";

import { ReactElement } from "react";

import { ProjectRowContent } from "./project-row-content";
import { ProjectRowRoot } from "./project-row-root";

import { ProjectRowVariant, ProjectRowVariants } from "../../config";
import type { Project } from "../../model";

type ProjectRowProps = {
	project: Project;
	variant?: ProjectRowVariant;
	children?: ReactElement | ReactElement[];
};

export const ProjectRow = ({ project, variant = ProjectRowVariants.Compact, children }: Readonly<ProjectRowProps>) => {
	return (
		<ProjectRowRoot variant={variant}>
			<ProjectRowContent project={project}>{children}</ProjectRowContent>
		</ProjectRowRoot>
	);
};
