"use client";

import { motion } from "motion/react";

import { Button, Icon, ICON_TYPES } from "@shared/ui";

import type { CreateProjectTriggerVariant } from "../config";
import { CREATE_PROJECT_TRIGGER_VARIANT } from "../config";

type CreateProjectProps = {
	triggerVariant?: CreateProjectTriggerVariant;
};

export const CreateProject = ({
	triggerVariant = CREATE_PROJECT_TRIGGER_VARIANT.Icon
}: Readonly<CreateProjectProps>) => {
	switch (triggerVariant) {
		case CREATE_PROJECT_TRIGGER_VARIANT.Icon:
			return (
				<motion.button
					whileHover={{ scale: 1.2, color: "#fff" }}
					whileTap={{ scale: 0.95 }}
					transition={{
						type: "spring",
						stiffness: 650,
						damping: 28,
						mass: 0.8
					}}
					type="button"
					aria-label="Create new project"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon className="w-[1rem] h-[1rem]" type={ICON_TYPES.AddCircle} />
					<span className="sr-only">Create New Project</span>
				</motion.button>
			);
		case CREATE_PROJECT_TRIGGER_VARIANT.IconButton:
			return (
				<Button
					variant="secondary"
					className="w-[2rem]! h-[2rem]! p-[0.5rem]! rounded-[0.625rem]"
					leadingIcon={<Icon className="w-[1rem] h-[1rem]" type={ICON_TYPES.Add} />}
				>
					<span className="sr-only">Create New Project</span>
				</Button>
			);
		case CREATE_PROJECT_TRIGGER_VARIANT.Button:
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
