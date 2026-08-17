import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { delay } from "@shared/lib/utils";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const imageSchema = z
	.instanceof(File, {
		message: "Image is required"
	})
	.refine((file) => file.size > 0, {
		message: "Image cannot be empty"
	})
	.refine((file) => file.size <= MAX_IMAGE_SIZE, {
		message: "Image must be smaller than 5 MB"
	})
	.refine((file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type), {
		message: "Unsupported image type"
	});

const projectIdSchema = z.uuid("Invalid project ID");

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

	const contentType = request.headers.get("content-type");

	if (!contentType?.startsWith("multipart/form-data")) {
		return NextResponse.json(
			{
				message: "Content-Type must be multipart/form-data"
			},
			{ status: 415 }
		);
	}

	const formData = await request.formData();
	const image = formData.get("image");

	const imageValidationResult = imageSchema.safeParse(image);

	if (!imageValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid image",
				errors: z.treeifyError(imageValidationResult.error)
			},
			{ status: image instanceof File && image.size > MAX_IMAGE_SIZE ? 413 : 400 }
		);
	}

	// const response = await updateProjectImage({
	// 	id: idResult.data,
	// 	image: imageValidationResult.data
	// });

	return new NextResponse(null, { status: 204 });
};
