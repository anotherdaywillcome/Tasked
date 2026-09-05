"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { use, useEffect } from "react";

import { animationVariants } from "./animations";
import { TabsContext } from "./tabs-context";

type TabsContentProps = {
	value: string;
	className?: string;
	children: ReactNode;
};

export const TabsContent = ({ children, value, className }: Readonly<TabsContentProps>) => {
	const { addTab, activeTab, direction } = use(TabsContext);

	useEffect(() => {
		addTab(value);
	}, [addTab, value]);

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			{activeTab === value && (
				<motion.div
					key={value}
					custom={direction}
					variants={animationVariants}
					initial={direction ? "enter" : false}
					animate="center"
					exit="exit"
					className={clsx("h-full min-h-0 min-w-0 w-full shrink-0 grow-0", className)}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
