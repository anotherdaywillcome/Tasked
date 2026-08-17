"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { use, useEffect } from "react";

import { TabsContext } from "./tabs-context";

type TabDirection = "left" | "right" | null;

const getEnterX = (direction: TabDirection) => {
	if (direction === "right") return "100%";
	if (direction === "left") return "-100%";
	return 0;
};

const getExitX = (direction: TabDirection) => {
	if (direction === "right") return "-100%";
	if (direction === "left") return "100%";
	return 0;
};

type TabsContentProps = {
	value: string;
	className?: string;
	children: ReactNode;
};

export const TabsContent = ({ children, value, className }: Readonly<TabsContentProps>) => {
	const { addTab, activeTab, direction } = use(TabsContext);

	const variants = {
		enter: (tabDirection: TabDirection) => ({
			x: getEnterX(tabDirection),
			opacity: 0
		}),
		center: {
			x: 0,
			opacity: 1
		},
		exit: (tabDirection: TabDirection) => ({
			x: getExitX(tabDirection),
			opacity: 0
		})
	};

	useEffect(() => {
		addTab(value);
	}, [addTab, value]);

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			{activeTab === value && (
				<motion.div
					key={value}
					custom={direction}
					variants={variants}
					initial={direction ? "enter" : false}
					animate="center"
					exit="exit"
					transition={{
						duration: 0.8
					}}
					className={clsx("h-full min-h-0 min-w-0 w-full shrink-0 grow-0", className)}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
