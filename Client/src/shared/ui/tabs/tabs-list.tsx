import { clsx } from "clsx";
import type { ReactNode } from "react";

type TabsListProps = {
	className?: string;
	children: ReactNode;
};

export const TabsList = ({ children, className }: Readonly<TabsListProps>) => {
	return <ul className={clsx("flex items-center", className)}>{children}</ul>;
};
