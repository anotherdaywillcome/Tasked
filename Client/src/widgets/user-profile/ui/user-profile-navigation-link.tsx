"use client";

import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

import type { MotionIconType } from "@shared/ui";
import { MotionIcon } from "@shared/ui";

type UserProfileLinkProps = {
	href: string;
	icon: MotionIconType;
	isActive: boolean;
	children: ReactNode;
};

export const UserProfileNavigationLink = ({ href, icon, isActive, children }: UserProfileLinkProps) => {
	return (
		<Link
			href={href}
			className={clsx(
				"relative z-20 flex items-center gap-x-[0.5rem] font-(family-name:--font-barlow) font-medium text-[0.875rem] leading-[129%] tracking-[0.01em] rounded-[0.75rem] p-[0.375rem] focus-ring",
				isActive ? "text-(--white-pallete-100)" : "text-(--neutrals-3)"
			)}
		>
			<span aria-hidden={true} className="w-[1.5rem] h-[1.5rem] flex items-center justify-center">
				<MotionIcon isActive={isActive} className="w-[1rem] h-[1rem]" type={icon} />
			</span>
			<span>{children}</span>
		</Link>
	);
};
