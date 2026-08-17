import { z } from "zod";

export const uploadProjectImageSchema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size <= 5 * 1024 * 1024, "Image must be smaller than 5MB")
		.refine((file) => file.type.startsWith("image/"), "File must be an image")
});

export type UploadProjectImageFormValues = z.infer<typeof uploadProjectImageSchema>;
