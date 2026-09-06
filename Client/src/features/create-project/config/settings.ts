import type { CreateProjectTriggerVariant } from "./variants";
import { CREATE_PROJECT_TRIGGER_VARIANTS } from "./variants";

type CreateProjectTriggerSettings = {
	variant: CreateProjectTriggerVariant;
};

export const CREATE_PROJECT_TRIGGER_DEFAULT_SETTINGS = {
	variant: CREATE_PROJECT_TRIGGER_VARIANTS.Button
} satisfies CreateProjectTriggerSettings;
