export type AssignableUser = {
	id: string;
	fullName: string;
	email: string;
	imageUrl: string;
	isAssigned: boolean;
};

export type GetAssignableUsersResponse = {
	users: Array<AssignableUser>;
};

export type AssignUsersCommand = {
	projectId: string;
	userIds: Array<string>;
};

export type AssignUsersResponse = {
	assignedUsers: Array<AssignableUser>;
};
