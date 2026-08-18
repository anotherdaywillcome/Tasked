import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { CreateNewProjectResponse } from "@entities/projects";
import { Privacy } from "@entities/projects/model/types";

import { delay } from "@shared/lib/utils";

export const mockData: CreateNewProjectResponse = {
	id: "da5629fb-b296-44f9-80fc-1ef65d281b66",
	imageUrl: "",
	name: "Untitled project",
	description: "project description",
	privacy: Privacy.Private,
	createdAt: "2023-12-25T18:00:00Z",
	createdBy: {
		id: "3296137b-2f7a-4b1a-819f-b5e6df7ccd19",
		imageUrl: "https://i.pravatar.cc/96?img=1",
		fullName: "Di Smolskii"
	},
	assignees: [
		{
			id: "da5629fb-b296-44f9-80fc-1ef65d281b77",
			imageUrl: "https://i.pravatar.cc/96?img=1",
			fullName: "Di Smolskii"
		},
		{
			id: "da5629fb-b296-44f9-80fc-1ef65d281b34",
			imageUrl: "https://i.pravatar.cc/96?img=2",
			fullName: "John Smith"
		}
	]
};

export const POST = async (request: NextRequest) => {
	await delay(6000);

	// const project = await createNewProject();
	// return NextResponse.json(createNewProjectAdapter(project));

	return NextResponse.json(mockData);
};
