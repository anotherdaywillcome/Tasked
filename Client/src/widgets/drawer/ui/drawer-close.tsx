"use client";

import { motion, MotionConfig } from "motion/react";
import { use } from "react";

import { Icon, ICON_TYPES } from "@shared/ui";
import { MOTION_CONFIG_BOUNCY } from "@shared/config";

import { drawerCloseAnimationVariants } from "../config";
import { DrawerContext } from "../model";

type DrawerCloseProps = {
	id: string;
};

export const DrawerClose = ({ id }: Readonly<DrawerCloseProps>) => {
	const { close } = use(DrawerContext);

	return (
		<MotionConfig {...MOTION_CONFIG_BOUNCY}>
			<motion.button
				whileHover="hover"
				whileTap="tap"
				variants={drawerCloseAnimationVariants}
				type="button"
				aria-label="Close drawer"
				className="cursor-pointer text-(--geek-blue-4)"
				onClickCapture={() => close(id)}
			>
				<Icon size={20} type={ICON_TYPES.CloseCircleBold} />
			</motion.button>
		</MotionConfig>
	);
};
