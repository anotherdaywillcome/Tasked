import { CreateProjectDrawerContent } from "./create-project-drawer-content";
import { CreateProjectTrigger } from "./create-project-trigger";

type CreateProjectComponents = {
	Trigger: typeof CreateProjectTrigger;
	DrawerContent: typeof CreateProjectDrawerContent;
};

type CreateProject = (() => null) & CreateProjectComponents;

export const CreateProject = () => {
	return null;
};

CreateProject.Trigger = CreateProjectTrigger;
CreateProject.DrawerContent = CreateProjectDrawerContent;
