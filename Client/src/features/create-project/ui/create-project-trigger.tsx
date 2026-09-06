"use client";

import { motion, MotionConfig } from "motion/react";

import { MOTION_CONFIG_BOUNCY } from "@shared/config";
import { Button, Icon, ICON_TYPES } from "@shared/ui";

import {
	CREATE_PROJECT_TRIGGER_DEFAULT_SETTINGS,
	CREATE_PROJECT_TRIGGER_VARIANTS,
	CreateProjectTriggerVariant
} from "../config";

type CreateProjectTriggerProps = {
	variant?: CreateProjectTriggerVariant;
};

export const CreateProjectTrigger = ({
	variant = CREATE_PROJECT_TRIGGER_DEFAULT_SETTINGS.variant
}: Readonly<CreateProjectTriggerProps>) => {
	switch (variant) {
		case CREATE_PROJECT_TRIGGER_VARIANTS.Icon:
			return (
				<MotionConfig {...MOTION_CONFIG_BOUNCY}>
					<motion.button
						whileHover={{ scale: 1.2, color: "#fff" }}
						whileTap={{ scale: 0.95 }}
						type="button"
						aria-label="Create new project"
						className="cursor-pointer text-(--neutrals-2)"
					>
						<Icon className="w-[1rem] h-[1rem]" type={ICON_TYPES.AddCircle} />
						<span className="sr-only">Create New Project</span>
					</motion.button>
				</MotionConfig>
			);
		case CREATE_PROJECT_TRIGGER_VARIANTS.IconButton:
			return (
				<Button
					variant="secondary"
					className="w-[2rem]! h-[2rem]! p-[0.5rem]! rounded-[0.625rem]"
					leadingIcon={<Icon className="w-[1rem] h-[1rem]" type={ICON_TYPES.Add} />}
				>
					<span className="sr-only">Create New Project</span>
				</Button>
			);
		case CREATE_PROJECT_TRIGGER_VARIANTS.Button:
			return (
				<Button className="flex items-center gap-x-[4px] rounded-[12px]">
					<Icon type={ICON_TYPES.AddCircle} size={16} />
					<span className="font-(family-name:--font-barlow) font-bold!s text-(--white-pallete-100)">
						New Project
					</span>
				</Button>
			);
	}
};
