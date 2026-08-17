import type { ReactNode } from "react";

import type { ProjectRowVariant } from "../../config";
import { ProjectRowContext } from "../../model";

export type ProjectRowRootProps = {
	children: ReactNode;
	variant: ProjectRowVariant;
};

export const ProjectRowRoot = ({ children, variant }: Readonly<ProjectRowRootProps>) => {
	return <ProjectRowContext value={{ variant }}>{children}</ProjectRowContext>;
};
