"use client";

import type { ReactNode } from "react";
import { Fragment } from "react";

type SidebarHeaderProps = {
	children: ReactNode;
};

export const SidebarHeader = ({ children }: Readonly<SidebarHeaderProps>) => {
	return <Fragment>{children}</Fragment>;
};
