import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";

import { getUserInfo } from "../api";

export const UserInfo = async () => {
	"use cache";

	cacheLife("weeks");
	cacheTag("user");

	const { fullName, role, imageUrl } = await getUserInfo();

	return (
		<figure className="flex items-center gap-x-[0.5rem] pt-[1rem] pb-[1.063rem] mx-[0.75rem] transition-[margin] duration-300 ease-out group-data-[collapsed=true]/sidebar:mx-0 group-data-[collapsed=true]/sidebar:justify-center">
			<div className="relative w-[2.5rem] h-[2.5rem] shrink-0 bg-[#b6c3ec] rounded-[6.25rem] overflow-hidden">
				<Image
					src={imageUrl}
					className="absolute top-[-0.45rem] right-[0.1rem] object-cover"
					alt={`${fullName}'s profile photo`}
					width={50}
					height={50}
				/>
			</div>
			<figcaption className="flex min-w-0 flex-col gap-y-[0.25rem] overflow-hidden transition-[opacity,width] duration-200 ease-out group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:opacity-0">
				<strong className="font-(family-name:--font-barlow) font-bold text-[0.875rem] tracking-[0.01em] text-(--white-pallete-100) [text-shadow:0_0_1rem_var(--white-pallete-100)]">
					{fullName}
				</strong>
				<small className="font-(family-name:--font-barlow) font-medium text-[0.625rem] tracking-[0.01em] uppercase text-(--neutrals-3)">
					{role}
				</small>
			</figcaption>
		</figure>
	);
};
