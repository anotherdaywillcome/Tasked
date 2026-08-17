import type { ReactElement } from "react";

import EstherHoward from "@public/images/users/bartozs_zmarzlik.jpg";
import JennyWilson from "@public/images/users/jared_padalecki.jpg";
import GuyHawkins from "@public/images/users/katarina_vukovic.jpg";
import WadeWarren from "@public/images/users/matteo_ricci.jpg";

import { UserRow } from "@entities/users";
import { StaticImageData } from "next/image";

type User = {
	id: string;
	fullName: string;
	image: StaticImageData;
	email: string;
};

type UsersListProps = {
	renderActions?: (userId: string) => ReactElement;
};

const getUsers = (): Promise<Array<User>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: String(1), fullName: "Wade Warren", image: WadeWarren, email: "wade.warren@gmail.com" },
				{ id: String(2), fullName: "Esther Howard", image: EstherHoward, email: "esther.howard@gmail.com" },
				{ id: String(3), fullName: "Jenny Wilson", image: JennyWilson, email: "jenny.wilson@gmail.com" },
				{ id: String(4), fullName: "Guy Hawkins", image: GuyHawkins, email: "guy.hawkins@gmail.com" }
			]);
		}, 6000);
	});
};

export const UsersList = async ({ renderActions }: Readonly<UsersListProps>) => {
	const users = await getUsers();

	return (
		<ul className="flex flex-col gap-y-[0.5rem]">
			{users.map(({ id, fullName, image, email }) => (
				<li key={id}>
					<UserRow fullName={fullName} image={image} email={email} variant="compact">
						<UserRow.Actions>{renderActions?.(id)}</UserRow.Actions>
					</UserRow>
				</li>
			))}
		</ul>
	);
};
