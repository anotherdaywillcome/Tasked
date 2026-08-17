import type { Project } from "../../model/types";

export type CreateNewProjectResponse = Omit<Project, "taskSummary">;
