export const ProjectRowVariants = {
	Compact: "compact",
	Extended: "extended"
} as const;

export type ProjectRowVariant = (typeof ProjectRowVariants)[keyof typeof ProjectRowVariants];
