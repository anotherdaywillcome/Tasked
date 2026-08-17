"use client";

import { motion } from "motion/react";

import { Button, Icon, ICON_TYPES } from "@shared/ui";

import type { CreateUserTriggerVariant } from "../config";
import { CREATE_USER_TRIGGER_VARIANT } from "../config";

type CreateUserProps = {
	triggerVariant?: CreateUserTriggerVariant;
};

export const CreateUser = ({ triggerVariant = CREATE_USER_TRIGGER_VARIANT.Icon }: Readonly<CreateUserProps>) => {
	switch (triggerVariant) {
		case CREATE_USER_TRIGGER_VARIANT.Icon:
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
					aria-label="Create new user"
					className="cursor-pointer text-(--neutrals-2)"
				>
					<Icon className="w-[1rem] h-[1rem]" type={ICON_TYPES.AddCircle} />
					<span className="sr-only">Create New User</span>
				</motion.button>
			);
		case CREATE_USER_TRIGGER_VARIANT.Button:
			return (
				<Button
					variant="secondary"
					className="w-[2rem]! h-[2rem]! p-[0.5rem]! rounded-[0.625rem]"
					leadingIcon={<Icon className="w-[1rem] h-[1rem]" type={ICON_TYPES.Add} />}
				>
					<span className="sr-only">Create New User</span>
				</Button>
			);
	}
};
