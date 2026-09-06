import type { ReactElement } from "react";
import { isValidElement } from "react";

import type { User } from "@entities/users";
import type { Assignee } from "@entities/tasks";

import { AvatarStackCompact } from "./avatar-stack-compact";
import type { AvatarStackDescriptionProps } from "./avatar-stack-description";
import { AvatarStackDescription } from "./avatar-stack-description";
import { AvatarStackExtended } from "./avatar-stack-extended";
import { AvatarStackUltraCompact } from "./avatar-stack-ultra-compact";

export const AvatarStackVariants = {
	UltraCompact: "ultra-compact",
	Compact: "compact",
	Extended: "extended"
} as const;

export const AvatarStackDirectionVariants = {
	RightToLeft: "right-to-left",
	LeftToRight: "left-to-right"
} as const;

export type AvatarStackDirectionVariant =
	(typeof AvatarStackDirectionVariants)[keyof typeof AvatarStackDirectionVariants];

export type AvatarStackVariant = (typeof AvatarStackVariants)[keyof typeof AvatarStackVariants];

type AvatarStackSettings = {
	variant: AvatarStackVariant;
	direction: AvatarStackDirectionVariant;
	max: number;
};

type AvatarStackProps = {
	users: Array<Assignee> | Array<User>;
	max?: number;
	className?: string;
	variant?: AvatarStackVariant;
	direction?: AvatarStackDirectionVariant;
	children?: ReactElement<AvatarStackDescriptionProps, typeof AvatarStackDescription>;
};

type AvatarStackComponents = {
	Description: typeof AvatarStackDescription;
};

type AvatarStack = ((props: Readonly<AvatarStackProps>) => ReactElement) & AvatarStackComponents;

const AVATAR_STACK_DEFAULT_SETTINGS = {
	variant: AvatarStackVariants.Compact,
	direction: AvatarStackDirectionVariants.LeftToRight,
	max: 6
} satisfies AvatarStackSettings;

export const AvatarStack = (({
	users,
	max = AVATAR_STACK_DEFAULT_SETTINGS.max,
	className,
	direction = AVATAR_STACK_DEFAULT_SETTINGS.direction,
	variant = AVATAR_STACK_DEFAULT_SETTINGS.variant,
	children
}: Readonly<AvatarStackProps>) => {
	const visibleUsers = max ? users.slice(0, max) : users;
	const remainingUsers = max ? Math.max(users.length - max, 0) : 0;

	let avatarStackDescription: ReactElement<AvatarStackDescriptionProps, typeof AvatarStackDescription> | null = null;

	if (children && isValidElement(children) && children.type === AvatarStackDescription) {
		avatarStackDescription = children;
	}
	// else {
	// 	throw new Error(
	// 		`<AvatarStack> only accepts <AvatarStack.Description> as its child. ` +
	// 			`Received: <${typeof children!.type === "string" ? children!.type : (children!.type.name ?? "Unknown")}>.`
	// 	);
	// }

	switch (variant) {
		case AvatarStackVariants.UltraCompact:
			return (
				<AvatarStackUltraCompact
					direction={direction}
					visibleUsers={visibleUsers}
					remainingUsers={remainingUsers}
					avatarStackDescription={avatarStackDescription}
					className={className}
				/>
			);
		case AvatarStackVariants.Compact:
			return (
				<AvatarStackCompact
					direction={direction}
					visibleUsers={visibleUsers}
					remainingUsers={remainingUsers}
					avatarStackDescription={avatarStackDescription}
					className={className}
				/>
			);
		case AvatarStackVariants.Extended:
			return (
				<AvatarStackExtended
					direction={direction}
					visibleUsers={visibleUsers}
					remainingUsers={remainingUsers}
					avatarStackDescription={avatarStackDescription}
					className={className}
				/>
			);
	}
}) as AvatarStack;

AvatarStack.Description = AvatarStackDescription;
