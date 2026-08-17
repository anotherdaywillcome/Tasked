import type { ReactElement } from "react";
import { Suspense } from "react";

import { validateProjectsNavigationChildren } from "../lib";

import type { ProjectsNavigationActionsProps } from "./projects-navigation-actions";
import { ProjectsNavigationActions } from "./projects-navigation-actions";
import { ProjectsNavigationLinks } from "./projects-navigation-links";
import { ProjectsNavigationSkeleton } from "./projects-navigation-skeleton";

type ProjectsNavigationComponents = {
	Actions: typeof ProjectsNavigationActions;
};

type ProjectsNavigationProps = {
	children?: ReactElement<ProjectsNavigationActionsProps, typeof ProjectsNavigationActions>;
};

type ProjectsNavigation = ((props: Readonly<ProjectsNavigationProps>) => ReactElement) & ProjectsNavigationComponents;

export const ProjectsNavigation = (({ children }: Readonly<ProjectsNavigationProps>) => {
	if (children) {
		validateProjectsNavigationChildren(children);
	}

	return (
		<nav className="relative mx-[0.75rem] py-[1rem] transition-[margin] duration-300 ease-out group-data-[collapsed=true]/sidebar:mx-[0.5rem]">
			<div className="flex items-center justify-between mb-[0.5rem] transition-[justify-content] duration-300 ease-out group-data-[collapsed=true]/sidebar:justify-center">
				<h3 className="font-(family-name:--font-barlow) font-bold text-[0.625rem] leading-[140%] tracking-[0.01em] uppercase text-(--neutrals-2) overflow-hidden transition-[opacity,width] duration-200 ease-out group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:opacity-0">
					Projects <span className="sr-only">navigation</span>
				</h3>
				{children}
			</div>
			<Suspense fallback={<ProjectsNavigationSkeleton />}>
				<ProjectsNavigationLinks />
			</Suspense>
		</nav>
	);
}) as ProjectsNavigation;

ProjectsNavigation.Actions = ProjectsNavigationActions;
