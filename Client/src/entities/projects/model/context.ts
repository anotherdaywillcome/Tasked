import { createContext } from "react";

import { ProjectRowVariant, ProjectRowVariants } from "../config";

type ProjectRowContextValue = {
	variant: ProjectRowVariant;
};

const ProjectRowContextDefaultValue = {
	variant: ProjectRowVariants.Compact
};

export const ProjectRowContext = createContext<ProjectRowContextValue>(ProjectRowContextDefaultValue);
