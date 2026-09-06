import { Project } from "@entities/projects";

type LastViewsDrawerContentProps = {
	project: Omit<Project, "taskSummary">;
};

export const LastViewsDrawerContent = ({ project }: Readonly<LastViewsDrawerContentProps>) => {
	return <h1 className="text-red-600">LastViews</h1>;
};
