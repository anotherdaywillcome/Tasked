"use client";

import { DRAWER_GLOW_EFFECT_POSITIONS, DrawerGlowEffect } from "@widgets/drawer/ui/drawer-glow-effect";
import clsx from "clsx";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { DRAWER_POSITIONS } from "../config";
import { getDragAxis, getDragConstraints } from "../lib";
import { useDrawerInstance } from "../model";

type DrawerInstanceProps = {
	id: string;
	index: number;
	reversedIndex: number;
	children: ReactNode;
};

export const DrawerInstance = ({ id, index, reversedIndex, children }: Readonly<DrawerInstanceProps>) => {
	const drawerRef = useRef<HTMLElement>(null);

	const {
		drawer: { position, width, height },
		animationVariants,
		isFirstInStack,
		isLastInStack,
		handleInteractionEnd,
		handleReorder
	} = useDrawerInstance(id, reversedIndex, drawerRef);

	const renderInteractiveDrawer = () => (
		<motion.aside
			ref={drawerRef}
			id={id}
			key={id}
			drag={getDragAxis({
				drawerPosition: position!,
				isFirstInStack: isFirstInStack
			})}
			dragConstraints={getDragConstraints({
				drawerPosition: position!,
				drawerWidth: width,
				drawerHeight: height
			})}
			dragElastic={0.15}
			dragSnapToOrigin
			onDragEnd={handleInteractionEnd}
			variants={animationVariants}
			initial="initial"
			whileHover={isFirstInStack ? "" : "hover"}
			exit="exit"
			animate={isLastInStack ? "last" : "base"}
			className={clsx(
				"fixed overflow-hidden rounded-[1.5rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--white-pallete-50) p-[0.75rem] backdrop-blur-[5rem]",
				{
					"inset-y-[0.75rem] right-[0.75rem] w-[calc(100vw-1.5rem)] max-w-[30rem] origin-top-right":
						position === DRAWER_POSITIONS.Right,
					"inset-y-[0.75rem] left-[0.75rem] w-[calc(100vw-1.5rem)] max-w-[30rem] origin-top-left":
						position === DRAWER_POSITIONS.Left,
					"inset-x-[0.75rem] bottom-[0.75rem] h-[calc(100dvh-1.5rem)] max-h-[30rem] origin-bottom":
						position === DRAWER_POSITIONS.Bottom,
					"inset-x-[0.75rem] top-[0.75rem] h-[calc(100dvh-1.5rem)] max-h-[30rem] origin-top":
						position === DRAWER_POSITIONS.Top
				}
			)}
			style={{
				zIndex: index + 1,
				cursor: isFirstInStack ? "default" : "pointer"
			}}
			onClick={!isLastInStack ? handleReorder : undefined}
		>
			<DrawerGlowEffect
				className="select-none pointer-events-none absolute top-[-10%] translate-y-[10%] left-[10%] translate-x-[-10%]"
				position={DRAWER_GLOW_EFFECT_POSITIONS.Top}
			/>
			{children}
			<DrawerGlowEffect
				className="select-none pointer-events-none absolute bottom-[-5%] translate-y-[-5%] left-[50%] translate-x-[-50%]"
				position={DRAWER_GLOW_EFFECT_POSITIONS.Bottom}
			/>
		</motion.aside>
	);

	return createPortal(renderInteractiveDrawer(), document.getElementById("drawer-root")!);
};
