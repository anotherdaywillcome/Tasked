export const CREATE_PROJECT_TRIGGER_VARIANTS = {
	Icon: "Icon",
	IconButton: "IconButton",
	Button: "Button"
} as const;

export type CreateProjectTriggerVariant = keyof typeof CREATE_PROJECT_TRIGGER_VARIANTS;
