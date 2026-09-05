"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { use } from "react";

import { TabsContext } from "./tabs-context";

type TabsTriggerProps = {
	value?: string;
	indicatorClassName?: string;
	children: ReactNode;
};

export const TabsTrigger = ({
	children,
	value,
	indicatorClassName = "h-[0.125rem] bg-(--geek-blue-6)"
}: Readonly<TabsTriggerProps>) => {
	const { activeTab, setActiveTab } = use(TabsContext);

	const state = value ? (activeTab === value ? "active" : "inactive") : undefined;

	const handleActiveTabChange = () => {
		if (value) {
			setActiveTab(value);
		}
	};

	return (
		<li onClick={handleActiveTabChange} className="group/tab relative" data-state={state}>
			{children}
			{state === "active" && indicatorClassName && (
				<motion.span
					aria-hidden="true"
					className={clsx("pointer-events-none absolute right-0 bottom-0 left-0 z-10", indicatorClassName)}
					layoutId="active-tab-indicator"
					initial={false}
					transition={{ type: "spring", stiffness: 500, damping: 38 }}
				/>
			)}
		</li>
	);
};
