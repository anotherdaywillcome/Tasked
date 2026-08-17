import { clsx } from "clsx";
import { Children, cloneElement, isValidElement, ReactElement } from "react";

import { Icon, IconType, ProjectImage } from "@shared/ui";

import { ViewHeaderActions } from "./view-header-actions";
import { ViewHeaderInfo } from "./view-header-info";
import { ViewHeaderTools } from "./view-header-tools";

type ViewHeaderComponents = {
	Info: typeof ViewHeaderInfo;
	Actions: typeof ViewHeaderActions;
	Tools: typeof ViewHeaderTools;
};

type ViewHeaderProps = {
	title: string;
	icon?: IconType;
	imageUrl?: string;
	children?: ReactElement | ReactElement[];
};

type ViewHeader = ((props: Readonly<ViewHeaderProps>) => ReactElement) & ViewHeaderComponents;

const validateViewHeaderChildren = (children: ReactElement | ReactElement[]) => {
	Children.forEach(children, (child) => {
		if (!(
			(isValidElement(child) && child.type === ViewHeader.Info) ||
			child.type === ViewHeader.Actions ||
			child.type === ViewHeader.Tools
		)) {
			throw new Error(`
				Component <ViewHeader> can only accept children of type <ViewHeader.Info>, <ViewHeader.Actions> and <ViewHeader.Tools>.
				Received child of type ${child.type}.
				Please ensure that all children of <ViewHeader> are of the correct type. 
			`);
		}
	});
};

export const ViewHeader = (({ title, imageUrl, icon, children }: Readonly<ViewHeaderProps>) => {
	let ViewHeaderInfo = null;
	let ViewHeaderActions = null;
	let ViewHeaderTools = null;

	if (children) {
		validateViewHeaderChildren(children);
	}

	Children.forEach(children, (child) => {
		if (child?.type === ViewHeader.Info) {
			ViewHeaderInfo = child;
		} else if (child?.type === ViewHeader.Actions) {
			ViewHeaderActions = child;
		} else if (child?.type === ViewHeader.Tools) {
			ViewHeaderTools = child;
		}
	});

	if (ViewHeaderInfo) {
		ViewHeaderInfo = cloneElement(ViewHeaderInfo, {
			isActionsPresent: !!ViewHeaderActions
		});
	}

	return (
		<div className="flex justify-between items-center pb-[1rem] border-b-[0.031rem] border-solid border-(--white-pallete-10)">
			<div className="flex items-center">
				<div
					className={clsx(
						"flex items-center gap-x-[0.75rem] pr-[1rem]",
						ViewHeaderInfo && "border-r-[0.031rem] border-solid border-(--white-pallete-10)"
					)}
				>
					{icon && !imageUrl && (
						<div className="w-[2rem] h-[2rem] p-[0.375rem] rounded-[0.5rem] bg-(--geek-blue-7) text-[white] flex items-center justify-center">
							<Icon type={icon} size={20} className="shrink-0" />
						</div>
					)}
					{imageUrl && (
						<ProjectImage
							name={title}
							imageUrl={imageUrl}
							imageSize={32}
							iconSize={20}
							imageClasses="p-[0.375rem]"
						/>
					)}
					<h1 className="font-(family-name:--font-barlow) font-bold text-[1.25rem] leading-[130%] tracking-[0.01em] text-(--white-pallete-100)">
						{title}
					</h1>
				</div>
				{ViewHeaderInfo}
				{ViewHeaderActions}
			</div>
			{ViewHeaderTools}
		</div>
	);
}) as ViewHeader;

ViewHeader.Info = ViewHeaderInfo;
ViewHeader.Actions = ViewHeaderActions;
ViewHeader.Tools = ViewHeaderTools;
