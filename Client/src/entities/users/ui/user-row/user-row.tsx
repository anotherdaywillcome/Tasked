import Image, { StaticImageData } from "next/image";
import type { ReactElement } from "react";

import { UserRowActions } from "./user-row-actions";

type UserRowVariant = "compact" | "extended";

type UserRowComponents = {
	Actions: typeof UserRowActions;
};

type UserRowProps = {
	fullName: string;
	image: StaticImageData;
	email: string;
	variant?: UserRowVariant;
	children?: ReactElement | ReactElement[];
};

type UserRow = ((props: Readonly<UserRowProps>) => ReactElement) & UserRowComponents;

export const UserRow = (({ fullName, image, email, variant = "extended", children }: Readonly<UserRowProps>) => {
	return (
		<article className="flex border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1rem] p-[0.375rem] bg-(--geek-blue-primary-opacity-100)">
			<Image
				src={image}
				width={48}
				height={48}
				alt={fullName}
				className="w-[3rem] h-[3rem] object-cover rounded-full"
			/>
			<div className="flex flex-col gap-y-[0.25rem] items-start justify-center ml-[0.5rem]">
				<h3 className="font-(family-name:--font-barlow) font-bold text-[1rem] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
					{fullName}
				</h3>
				<p className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
					{email}
				</p>
			</div>
			{children}
		</article>
	);
}) as UserRow;

UserRow.Actions = UserRowActions;
