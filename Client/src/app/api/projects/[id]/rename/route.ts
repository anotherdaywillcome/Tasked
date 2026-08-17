import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// import { updateProjectName } from "@entities/projects";
import { delay } from "@shared/lib/utils";

const projectIdSchema = z.uuid("Invalid project ID");

const updateProjectNameSchema = z.object({
	name: z.string().trim().min(1, "Project name is required").max(100, "Project name must be less than 100 characters")
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

	const projectNameValidationResult = updateProjectNameSchema.safeParse(body);

	if (!projectNameValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid request body",
				errors: z.treeifyError(projectNameValidationResult.error)
			},
			{ status: 400 }
		);
	}

	const { name } = projectNameValidationResult.data;

	// await updateProjectName({ id, name });

	return NextResponse.json(null, { status: 204 });
};
