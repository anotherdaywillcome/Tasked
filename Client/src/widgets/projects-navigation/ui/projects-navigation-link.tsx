"use client";

import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

import { ROUTES } from "@shared/config";
import { ProjectImage } from "@shared/ui";

type ProjectNavigationLinkProps = {
	id: string;
	name: string;
	isActive: boolean;
	isCurrent: boolean;
	imageUrl: string;
	children: ReactNode;
};

export const ProjectsNavigationLink = ({
	id,
	name,
	imageUrl,
	isActive,
	isCurrent,
	children
}: Readonly<ProjectNavigationLinkProps>) => {
	return (
		<Link
			aria-current={isCurrent ? "page" : undefined}
			href={ROUTES.Project(id)}
			className={clsx(
				"flex items-center gap-x-[0.5rem] font-(family-name:--font-barlow) font-medium text-[0.875rem] leading-[129%] tracking-[0.01em] rounded-[0.75rem] p-[0.375rem] transition-[gap] duration-300 ease-out group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:gap-x-0",
				isActive && "text-(--white-pallete-100)",
				!isActive && "text-(--neutrals-3)"
			)}
		>
			<ProjectImage name={name} imageUrl={imageUrl} />
			<span className="overflow-hidden whitespace-nowrap transition-[opacity,width] duration-200 ease-out group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:opacity-0">
				{children}
			</span>
		</Link>
	);
};
