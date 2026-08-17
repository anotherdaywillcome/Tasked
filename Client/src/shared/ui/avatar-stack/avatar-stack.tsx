import type { ReactElement } from "react";
import { isValidElement } from "react";

import type { GetFeaturedClientsResponse } from "@entities/users";

import { AvatarStackCompact } from "./avatar-stack-compact";
import type { AvatarStackDescriptionProps } from "./avatar-stack-description";
import { AvatarStackDescription } from "./avatar-stack-description";
import { AvatarStackExtended } from "./avatar-stack-extended";

export const AvatarStackVariants = {
	Compact: "compact",
	Extended: "extended"
} as const;

export type AvatarStackVariant = (typeof AvatarStackVariants)[keyof typeof AvatarStackVariants];

type AvatarStackSettings = {
	variant: AvatarStackVariant;
	max: number;
};

type AvatarStackProps = {
	users: GetFeaturedClientsResponse;
	max?: number;
	className?: string;
	variant?: AvatarStackVariant;
	children?: ReactElement<AvatarStackDescriptionProps, typeof AvatarStackDescription>;
};

type AvatarStackComponents = {
	Description: typeof AvatarStackDescription;
};

type AvatarStack = ((props: Readonly<AvatarStackProps>) => ReactElement) & AvatarStackComponents;

const AVATAR_STACK_DEFAULT_SETTINGS = {
	variant: AvatarStackVariants.Compact,
	max: 6
} satisfies AvatarStackSettings;

export const AvatarStack = (({
	users,
	max = AVATAR_STACK_DEFAULT_SETTINGS.max,
	className,
	variant = AVATAR_STACK_DEFAULT_SETTINGS.variant,
	children
}: Readonly<AvatarStackProps>) => {
	const visibleUsers = max ? users.slice(0, max) : users;
	const remainingUsers = max ? Math.max(users.length - max, 0) : 0;

	let avatarStackDescription: ReactElement<AvatarStackDescriptionProps, typeof AvatarStackDescription> | null = null;

	if (children && isValidElement(children) && children.type === AvatarStackDescription) {
		avatarStackDescription = children;
	} else {
		throw new Error(
			`<AvatarStack> only accepts <AvatarStack.Description> as its child. ` +
				`Received: <${typeof children!.type === "string" ? children!.type : (children!.type.name ?? "Unknown")}>.`
		);
	}

	switch (variant) {
		case AvatarStackVariants.Compact:
			return (
				<AvatarStackCompact
					visibleUsers={visibleUsers}
					remainingUsers={remainingUsers}
					avatarStackDescription={avatarStackDescription}
					className={className}
				/>
			);
		case AvatarStackVariants.Extended:
			return (
				<AvatarStackExtended
					visibleUsers={visibleUsers}
					remainingUsers={remainingUsers}
					avatarStackDescription={avatarStackDescription}
					className={className}
				/>
			);
	}
}) as AvatarStack;

AvatarStack.Description = AvatarStackDescription;
