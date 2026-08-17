import { cacheLife } from "next/cache";

import { AvatarStack } from "@shared/ui";

import { getFeaturedClients } from "../api";

export const FeaturedClients = async () => {
	"use cache";

	cacheLife("weeks");

	const featuredClients = await getFeaturedClients({ limit: 6 });

	return (
		<AvatarStack users={featuredClients} className="mt-[1.5rem] mr-[5.188rem]">
			<AvatarStack.Description>Over 2568+ Designers & Creators Love Our Platform</AvatarStack.Description>
		</AvatarStack>
	);
};
