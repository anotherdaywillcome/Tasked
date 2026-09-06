import { clsx } from "clsx";
import Image from "next/image";
import type { ReactElement } from "react";

import type { User } from "@entities/users";
import type { Assignee } from "@entities/tasks";

import type { AvatarStackDirectionVariant } from "./avatar-stack";
import { AvatarStackDirectionVariants } from "./avatar-stack";
import type { AvatarStackDescriptionProps } from "./avatar-stack-description";
import { AvatarStackDescription } from "./avatar-stack-description";

type AvatarStackUltraCompactProps = {
	direction: AvatarStackDirectionVariant;
	visibleUsers: Array<Assignee> | Array<User>;
	remainingUsers: number;
	avatarStackDescription: ReactElement<AvatarStackDescriptionProps, typeof AvatarStackDescription> | null;
	className?: string;
};

export const AvatarStackUltraCompact = ({
	direction,
	visibleUsers,
	remainingUsers,
	avatarStackDescription,
	className
}: Readonly<AvatarStackUltraCompactProps>) => {
	return (
		<p className={clsx("flex flex-row gap-x-[0.875rem]", className)}>
			<span className="flex flex-row items-center shrink-0" aria-hidden="true">
				{visibleUsers.map(({ imageUrl, fullName }, index) => (
					<span
						key={index + "-" + fullName}
						className={clsx(
							"relative grow-0 shrink-0 w-[2rem] h-[2rem] rounded-full shadow-[0_0_1.5rem_0_var(--geek-blue-primary-opacity-200)] bg-(--geek-blue-7)",
							index !== 0 && "ml-[-0.5rem]"
						)}
						style={{ zIndex: direction === AvatarStackDirectionVariants.LeftToRight ? index : -index }}
					>
						<Image
							src={imageUrl}
							alt={fullName}
							className="w-[2rem] h-[2rem] rounded-full object-cover"
							width={32}
							height={32}
						/>
					</span>
				))}
				{remainingUsers > 0 && (
					<span className="font-(family-name:--font-barlow) font-semibold leading-[1.125rem] tracking-[0.01em] text-(--desert-storm)">
						+{remainingUsers}
					</span>
				)}
			</span>
			{avatarStackDescription}
		</p>
	);
};
