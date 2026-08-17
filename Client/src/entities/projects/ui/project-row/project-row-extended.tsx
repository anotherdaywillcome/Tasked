import type { ReactNode } from "react";

import { AvatarStack, AvatarStackVariants, ProgressBar, ProjectImage } from "@shared/ui";

import { TaskSummary, User } from "../../model";

type ProjectRowExtendedProps = {
	name: string;
	imageUrl: string;
	taskSummary: TaskSummary;
	assignedUsers: Array<User>;
	children?: ReactNode;
};

export const ProjectRowExtended = ({
	name,
	imageUrl,
	taskSummary: { total, completed },
	assignedUsers,
	children
}: Readonly<ProjectRowExtendedProps>) => {
	return (
		<article className="relative flex items-center justify-between border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1rem] p-[0.75rem] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[2rem]">
			<div className="relative flex items-center gap-x-[0.75rem]">
				<ProjectImage
					iconClasses="w-[1.25rem]! h-[1.25rem]!"
					imageSize={32}
					imageClasses="p-[0.375rem]! rounded-[0.5rem]!"
					name={name}
					imageUrl={imageUrl}
				/>
				<h3 className="font-(family-name:--font-barlow) font-semibold text-[0.875rem] leading-[129%] tracking-[0.01em] text-(--geek-blue-1)">
					{name}
				</h3>
			</div>
			<div className="relative flex items-center h-[32px]">
				<div className="flex justify-end items-center pr-[16px] pl-[16px] h-full w-[156px] border-l-[0.50px] border-l-solid border-l-(--white-pallete-10) border-r-[0.50px] border-r-solid border-r-(--white-pallete-10)">
					<AvatarStack users={assignedUsers} max={6} variant={AvatarStackVariants.Extended} />
				</div>
				<div className="w-[92px] h-full flex items-center justify-center border-r-[0.50px] border-r-solid border-r-(--white-pallete-10)">
					<p className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] uppercase text-(--neutrals-3)">
						{total} Tasks
					</p>
				</div>
				<div className="w-[240px] h-full flex items-center justify-center pr-[16px] pl-[16px] border-r-[0.50px] border-r-solid border-r-(--white-pallete-10)">
					<ProgressBar total={total} completed={completed} />
				</div>
				<div className="pr-[2px] pl-[14px]">{children}</div>
			</div>
		</article>
	);
};
