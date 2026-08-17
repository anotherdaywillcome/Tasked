import { formatMonthDay } from "@shared/lib/utils";
import { Badge, Icon, ICON_TYPES, ProjectImage } from "@shared/ui";

import { getFormattedId, getPriority, getPriorityBadgeVariant } from "../../lib";

type TaskRowProps = {
	imageUrl: string;
	description: string;
	projectName: string;
	dueDate: string;
	id: string;
	priority: string;
};

export const TaskRow = ({ imageUrl, projectName, description, dueDate, id, priority }: Readonly<TaskRowProps>) => {
	return (
		<article className="flex items-center justify-between border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1rem] px-[0.75rem] py-[0.5rem] bg-(--geek-blue-primary-opacity-200) backdrop-blur-[2rem]">
			<div className="flex items-center gap-x-[0.75rem]">
				<ProjectImage imageUrl={imageUrl} imageSize={24} iconSize={16} name={projectName} />
				<h3 className="font-(family-name:--font-barlow) font-semibold text-[0.875rem] leading-[129%] tracking-[0.01em] text-(--geek-blue-1)">
					{description}
				</h3>
			</div>
			<div className="flex items-center">
				<div className="py-[0.375rem] border-r-[0.031rem] border-solid border-(--white-pallete-10) pl-[0.875rem] pr-[0.875rem]">
					<div className="text-(--neutrals-2)">
						<time className="font-(family-name:--font-barlow) font-bold text-[0.625rem] leading-[140%] tracking-[0.01em] uppercase">
							{formatMonthDay(dueDate as unknown as Date, { locale: "en-US", timeZone: "Europe/Riga" })}
						</time>
						<Icon className="ml-[0.25rem] inline" type={ICON_TYPES.Clock} size={10} />
					</div>
				</div>
				<div className="px-[0.813rem] py-[0.375rem] border-r-[0.031rem] border-solid border-(--white-pallete-10)">
					<Badge classes="block">{getFormattedId(id)}</Badge>
				</div>
				<div className="pl-[1rem] py-[0.375rem]">
					<Badge classes="block" variant={getPriorityBadgeVariant(getPriority(priority))}>
						{getPriority(priority)}
					</Badge>
				</div>
			</div>
		</article>
	);
};
