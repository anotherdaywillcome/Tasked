import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { Privacy } from "@entities/projects/model/types";

import { delay } from "@shared/lib/utils";

const projectIdSchema = z.uuid("Invalid project ID");

const updateProjectPrivacySchema = z.object({
	privacy: z.enum(Privacy, {
		error: "Invalid privacy value"
	})
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

	const projectPrivacyValidationResult = updateProjectPrivacySchema.safeParse(body);

	if (!projectPrivacyValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid request body",
				errors: z.treeifyError(projectPrivacyValidationResult.error)
			},
			{ status: 400 }
		);
	}

	const { privacy } = projectPrivacyValidationResult.data;

	// await updateProjectPrivacy({ id, privacy });

	return NextResponse.json(null, { status: 204 });
};
