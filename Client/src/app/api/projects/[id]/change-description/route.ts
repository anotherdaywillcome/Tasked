import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { delay } from "@shared/lib/utils";

const projectIdSchema = z.uuid("Invalid project ID");

const updateProjectDescriptionSchema = z.object({
	description: z
		.string()
		.trim()
		.min(1, "Project description is required")
		.max(216, "Project description must be less than 216 characters")
});

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
	await delay(6000);

	const { id } = await params;

	const idValidationResult = projectIdSchema.safeParse(id);

	if (!idValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid project ID",
				errors: z.treeifyError(idValidationResult.error)
			},
			{ status: 400 }
		);
	}

	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
	}

	const projectDescriptionValidationResult = updateProjectDescriptionSchema.safeParse(body);

	if (!projectDescriptionValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid request body",
				errors: z.treeifyError(projectDescriptionValidationResult.error)
			},
			{ status: 400 }
		);
	}

	const { description } = projectDescriptionValidationResult.data;

	// await updateProjectDescription({ id, description });

	return NextResponse.json(null, { status: 204 });
};
