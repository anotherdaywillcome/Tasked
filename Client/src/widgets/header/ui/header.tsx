import { clsx } from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Logotype, MainNavigation } from "@shared/ui";

type HeaderProps = ComponentPropsWithoutRef<"header"> & {
	className?: string;
};

export const Header = ({ className, children, ...props }: Readonly<HeaderProps>) => {
	return (
		<header className={clsx("flex items-center px-[2.5rem] relative z-[100] my-[2rem]", className)} {...props}>
			<div className="flex items-center gap-x-[3rem]">
				<Link className="focus-ring rounded-[0.375rem]" href="/" aria-label="Return to home page">
					<Logotype />
				</Link>
				<MainNavigation />
			</div>
			{children}
		</header>
	);
};
