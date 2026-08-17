import { clsx } from "clsx";
import Image from "next/image";
import type { ReactElement } from "react";

import type { GetFeaturedClientsResponse } from "@entities/users";

import type { AvatarStackDescriptionProps } from "./avatar-stack-description";
import { AvatarStackDescription } from "./avatar-stack-description";

type AvatarStackExtended = {
	visibleUsers: GetFeaturedClientsResponse;
	remainingUsers: number;
	avatarStackDescription: ReactElement<AvatarStackDescriptionProps, typeof AvatarStackDescription> | null;
	className?: string;
};

export const AvatarStackExtended = ({
	visibleUsers,
	remainingUsers,
	avatarStackDescription,
	className
}: Readonly<AvatarStackExtended>) => {
	return (
		<p className={clsx("flex flex-row gap-x-[0.875rem]", className)}>
			<span className="flex flex-row items-center shrink-0" aria-hidden="true">
				{visibleUsers.map(({ imageUrl, fullName }, index) => (
					<span
						key={index + "-" + fullName}
						className={clsx(
							"relative block w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden border border-solid border-(--black-pearl) shrink-0",
							index !== 0 && "-ml-[0.25rem]"
						)}
						style={{ zIndex: index }}
					>
						<Image className="object-cover" src={imageUrl} alt={fullName} width={24} height={24} />
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
