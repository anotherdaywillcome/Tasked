import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

import { MotionIcon, type MotionIconType } from "@shared/ui";

type MainNavigationLinkProps = {
	href: string;
	icon: MotionIconType;
	isActive: boolean;
	isCurrent: boolean;
	children: ReactNode;
};

export const MainNavigationLink = ({
	href,
	icon,
	isActive,
	isCurrent,
	children
}: Readonly<MainNavigationLinkProps>) => {
	return (
		<Link
			aria-current={isCurrent ? "page" : undefined}
			className={clsx(
				"flex items-center gap-x-[0.5rem] font-(family-name:--font-barlow) font-medium text-[0.875rem] leading-[129%] tracking-[0.01em] rounded-[0.75rem] p-[0.375rem] transition-[gap] duration-300 ease-out group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:gap-x-0",
				isActive ? "text-(--white-pallete-100)" : "text-(--neutrals-3)"
			)}
			href={href}
		>
			<span className="w-[1.5rem] h-[1.5rem] shrink-0 flex items-center justify-center" aria-hidden="true">
				<MotionIcon isActive={isActive} className="w-[1rem] h-[1rem]" type={icon} />
			</span>
			<span className="overflow-hidden whitespace-nowrap transition-[opacity,width] duration-200 ease-out group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:opacity-0">
				{children}
			</span>
		</Link>
	);
};
