import type { ReactNode } from "react";

import { ProjectImage } from "@shared/ui";

import { TaskSummary } from "../../model";

type ProjectRowCompactProps = {
	name: string;
	imageUrl: string;
	taskSummary: TaskSummary;
	children: ReactNode;
};

export const ProjectRowCompact = ({
	name,
	imageUrl,
	taskSummary: { total },
	children
}: Readonly<ProjectRowCompactProps>) => {
	return (
		<article className="flex border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1rem] p-[0.375rem] bg-(--geek-blue-primary-opacity-100)">
			<ProjectImage
				iconClasses="w-[2rem]! h-[2rem]!"
				imageSize={48}
				imageClasses="p-[0.5rem]! rounded-[0.75rem]!"
				name={name}
				imageUrl={imageUrl}
			/>
			<div className="flex flex-col gap-y-[0.25rem] items-start justify-center ml-[0.5rem]">
				<h3 className="font-(family-name:--font-barlow) font-bold text-[1rem] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
					{name}
				</h3>
				{total > 0 && (
					<p className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
						{total} Tasks
					</p>
				)}
			</div>
			{children}
		</article>
	);
};
