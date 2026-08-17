"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";

import { SidebarTrigger } from "./sidebar-trigger";

type SidebarRootProps = {
	background: ReactNode;
	children: ReactNode;
};

const SIDEBAR_WIDTH_EXPANDED = "14.25rem" as const;
const SIDEBAR_WIDTH_COLLAPSED = "4.25rem" as const;
const SIDEBAR_WIDTH_TRANSITION = { type: "spring", stiffness: 380, damping: 34, mass: 0.8 } as const;

export const SidebarRoot = ({ background, children }: Readonly<SidebarRootProps>) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<motion.aside
			className="dashboard-sidebar group/sidebar relative my-[0.75rem] ml-[0.75rem]"
			initial={false}
			animate={{ width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED }}
			transition={SIDEBAR_WIDTH_TRANSITION}
			data-collapsed={isCollapsed}
			aria-labelledby="dashboard-sidebar-title"
		>
			<SidebarTrigger isCollapsed={isCollapsed} onToggle={() => setIsCollapsed((prev) => !prev)} />
			<div className="relative flex h-full flex-col overflow-hidden border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1.5rem] bg-(--white-pallete-50)">
				<h2 id="dashboard-sidebar-title" className="sr-only">
					Dashboard sidebar
				</h2>
				{background}
				{children}
			</div>
		</motion.aside>
	);
};
