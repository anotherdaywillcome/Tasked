import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { GetAssignedProjectsResponse } from "@entities/projects";

import { delay } from "@shared/lib/utils";

const mockData: GetAssignedProjectsResponse = [
	{ id: "da5629fb-b296-44f9-80fc-1ef35d281b66", name: "Sleekpay App", imageUrl: "/images/projects/sleekpay.svg" },
	{ id: "da5629fb-b236-44f9-80fc-1ef65d281b66", name: "PayPal App", imageUrl: "/images/projects/paypal.svg" },
	{ id: "da5629fb-b146-44f9-80fc-1ef65d281b66", name: "Dribble Posts", imageUrl: "/images/projects/dribble.svg" },
	{ id: "da5629fb-b296-46f9-80fc-1ef65d281b66", name: "Youtube", imageUrl: "/images/projects/youtube.svg" }
];

const userIdSchema = z.uuid("Invalid user ID");

export const GET = async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
	await delay(6000);

	const { id } = await params;

	const userIdValidationResult = userIdSchema.safeParse(id);

	if (!userIdValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid user ID",
				errors: z.treeifyError(userIdValidationResult.error)
			},
			{ status: 400 }
		);
	}

	// const projects = await getAssignedProjects({ id });
	// return NextResponse.json(assignedProjectsAdapter(projects));

	return NextResponse.json(mockData);
};
