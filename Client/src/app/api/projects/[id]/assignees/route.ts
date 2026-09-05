import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { GetProjectAssigneesResponse } from "@entities/projects";

import { delay } from "@shared/lib/utils";

// const projectIdSchema = z.uuid("Invalid project ID");

// const projectIdSchema = z.uuid("Invalid project ID");
// const assignUsersSchema = z.object({
// 	userIds: z.array(z.uuid("Invalid user ID")).max(100, "A project cannot have more than 100 assignees")
// });
//
// const users: Array<AssignableUser> = [
// 	{
// 		id: "da5629fb-b296-44f9-80fc-1ef65d281b77",
// 		fullName: "Andrei Novak",
// 		email: "andrei.novak@tasked.team",
// 		imageUrl: "/images/users/andrei_novak.jpg",
// 		isAssigned: true
// 	},
// 	{
// 		id: "da5629fb-b296-44f9-80fc-1ef65d281b34",
// 		fullName: "Elena Petrova",
// 		email: "elena.petrova@tasked.team",
// 		imageUrl: "/images/users/elena_petrova.jpg",
// 		isAssigned: true
// 	},
// 	{
// 		id: "7c1e44bb-cec7-4bdb-a7a0-42895ac4812b",
// 		fullName: "Katarina Vukovic",
// 		email: "katarina.vukovic@tasked.team",
// 		imageUrl: "/images/users/katarina_vukovic.jpg",
// 		isAssigned: false
// 	},
// 	{
// 		id: "57be8cc0-9d7f-4142-a22d-8f8786516de0",
// 		fullName: "Lukas Schneider",
// 		email: "lukas.schneider@tasked.team",
// 		imageUrl: "/images/users/lukas_schneider.jpg",
// 		isAssigned: false
// 	},
// 	{
// 		id: "a65a0dd3-78b6-4da4-bf05-9a8329c69f14",
// 		fullName: "Sophie Laurent",
// 		email: "sophie.laurent@tasked.team",
// 		imageUrl: "/images/users/sophie_laurent.jpg",
// 		isAssigned: false
// 	},
// 	{
// 		id: "903f3efb-7325-4638-ad79-f1810d84db29",
// 		fullName: "Matteo Ricci",
// 		email: "matteo.ricci@tasked.team",
// 		imageUrl: "/images/users/matteo_ricci.jpg",
// 		isAssigned: false
// 	}
// ];
//
// const defaultAssignedUserIds = new Set(users.filter(({ isAssigned }) => isAssigned).map(({ id }) => id));
// const projectAssignments = new Map<string, Set<string>>();
//
// const validateProjectId = async (params: Promise<{ id: string }>) => {
// 	const { id } = await params;
// 	return projectIdSchema.safeParse(id);
// };

// This is GET FOR Assignable users, but must be users
// export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
// 	const projectIdValidation = await validateProjectId(params);
//
// 	if (!projectIdValidation.success) {
// 		return NextResponse.json({ message: "Invalid project ID" }, { status: 400 });
// 	}
//
// 	await delay(350);
// 	const assignedUserIds = projectAssignments.get(projectIdValidation.data) ?? defaultAssignedUserIds;
// 	const projectUsers = users.map((user) => ({ ...user, isAssigned: assignedUserIds.has(user.id) }));
//
// 	// Replace with a project-members service call and adapt its response here.
// 	return NextResponse.json<GetAssignableUsersResponse>({ users: projectUsers });
// };

const mockData: GetProjectAssigneesResponse = [
	{ id: "da5629fb-b296-44f9-80fc-1ef35d281b66", fullName: "John Doe", imageUrl: "/images/users/andrei_novak.jpg" },
	{ id: "da5629fb-b226-44f9-80fc-1ef35d281b66", fullName: "Jane Smith", imageUrl: "/images/users/elena_petrova.jpg" },
	{
		id: "da5339fb-b236-44f9-80fc-1ef65d281b66",
		fullName: "Jane Smith",
		imageUrl: "/images/users/katarina_vukovic.jpg"
	},
	{
		id: "da5229fb-b216-44f9-80fc-1ef65d281b66",
		fullName: "Jane Smith",
		imageUrl: "/images/users/lukas_schneider.jpg"
	},
	{ id: "da5629fb-b236-43f9-80fc-1ef65d281b66", fullName: "Jane Smith", imageUrl: "/images/users/matteo_ricci.jpg" },
	{ id: "da5629fb-b636-44f9-80fc-1ef65d281b66", fullName: "Jane Smith", imageUrl: "/images/users/sophie_laurent.jpg" }
];

const projectIdSchema = z.uuid("Invalid project ID");

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
	await delay(6000);

	const { id } = await params;

	const projectIdValidationResult = projectIdSchema.safeParse(id);

	if (!projectIdValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid project ID",
				errors: z.treeifyError(projectIdValidationResult.error)
			},
			{ status: 400 }
		);
	}

	return NextResponse.json<GetProjectAssigneesResponse>(mockData);
};

// export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
// 	const projectIdValidation = await validateProjectId(params);
//
// 	if (!projectIdValidation.success) {
// 		return NextResponse.json({ message: "Invalid project ID" }, { status: 400 });
// 	}
//
// 	let body: unknown;
//
// 	try {
// 		body = await request.json();
// 	} catch {
// 		return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
// 	}
//
// 	const assignmentValidation = assignUsersSchema.safeParse(body);
//
// 	if (!assignmentValidation.success) {
// 		return NextResponse.json(
// 			{ message: "Invalid request body", errors: z.treeifyError(assignmentValidation.error) },
// 			{ status: 400 }
// 		);
// 	}
//
// 	const knownUserIds = new Set(users.map(({ id }) => id));
// 	const unknownUserIds = assignmentValidation.data.userIds.filter((id) => !knownUserIds.has(id));
//
// 	if (unknownUserIds.length > 0) {
// 		return NextResponse.json(
// 			{ message: "One or more users do not exist", userIds: unknownUserIds },
// 			{ status: 404 }
// 		);
// 	}
//
// 	await delay(450);
//
// 	const selectedIds = new Set(assignmentValidation.data.userIds);
// 	projectAssignments.set(projectIdValidation.data, selectedIds);
// 	const assignedUsers = users.filter(({ id }) => selectedIds.has(id)).map((user) => ({ ...user, isAssigned: true }));
//
// 	// Replace with the upstream project assignment command.
// 	return NextResponse.json<AssignUsersResponse>({ assignedUsers });
// };
