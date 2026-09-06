import { Project } from "@entities/projects";

type ActivityDrawerContentProps = {
	project: Omit<Project, "taskSummary">;
};

export const ActivityDrawerContent = ({ project }: Readonly<ActivityDrawerContentProps>) => {
	return <h1 className="text-red-600">Activity</h1>;
};
