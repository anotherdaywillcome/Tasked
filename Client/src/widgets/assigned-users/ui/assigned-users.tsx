import Image from "next/image";

type AssignedUsersProps = {
	projectId: string;
	maxCount?: number;
};

type AssignedUser = {
	id: string;
	fullName: string;
	imageUrl: string;
};

const getAssignedUsers = async (projectId: string): Promise<Array<AssignedUser>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve([
				{ id: "1", fullName: "John Doe", imageUrl: "/images/users/andrei_novak.jpg" },
				{ id: "2", fullName: "Jane Smith", imageUrl: "/images/users/elena_petrova.jpg" },
				{ id: "3", fullName: "Jane Smith", imageUrl: "/images/users/katarina_vukovic.jpg" },
				{ id: "4", fullName: "Jane Smith", imageUrl: "/images/users/lukas_schneider.jpg" },
				{ id: "5", fullName: "Jane Smith", imageUrl: "/images/users/matteo_ricci.jpg" },
				{ id: "6", fullName: "Jane Smith", imageUrl: "/images/users/sophie_laurent.jpg" }
			]);
		}, 6000);
	});
};

// Refactor to client component

export const AssignedUsers = async ({ projectId, maxCount = 6 }: Readonly<AssignedUsersProps>) => {
	const assignedUsers = await getAssignedUsers(projectId);

	const users = assignedUsers.slice(0, maxCount);

	return (
		<ul
			className="relative flex items-center ml-[0.625rem]! h-[2rem]!"
			role="list"
			aria-label={`Assigned users for project with id ${projectId}`}
		>
			{users.map(({ id, fullName, imageUrl }, index) => {
				return (
					<li
						key={id}
						className="relative grow-0 shrink-0 w-[1.5rem] h-[1.5rem] border border-[0.031rem] border-solid border-(--white-pallete-10) rounded-full ml-[-0.625rem]"
						style={{ zIndex: index }}
					>
						<Image
							src={imageUrl}
							alt={fullName}
							className="w-[1.5rem] h-[1.5rem] rounded-full object-cover"
							width={24}
							height={24}
						/>
					</li>
				);
			})}
		</ul>
	);
};
