"use client";

import { AnimatePresence, motion } from "motion/react";
import { use } from "react";
import { createPortal } from "react-dom";

import { drawerBackdropAnimationVariants } from "../config";
import { DrawerContext } from "../model";

type DrawerBackdropProps = {
	showBackdrop: boolean;
};

export const DrawerBackdrop = ({ showBackdrop }: Readonly<DrawerBackdropProps>) => {
	const { isAnyOpen } = use(DrawerContext);

	const isDrawerRootCreated = typeof document !== "undefined" && !!document.getElementById("drawer-root");

	if (!showBackdrop || !isDrawerRootCreated) {
		return null;
	}

	const renderBackdrop = () => {
		return (
			<AnimatePresence>
				{isAnyOpen && (
					<motion.div
						initial="initial"
						animate="base"
						exit="exit"
						variants={drawerBackdropAnimationVariants}
						className="fixed inset-0 z-[1] bg-[rgba(1,0,9,0.4)]"
					></motion.div>
				)}
			</AnimatePresence>
		);
	};

	return createPortal(renderBackdrop(), document.getElementById("drawer-root")!);
};
