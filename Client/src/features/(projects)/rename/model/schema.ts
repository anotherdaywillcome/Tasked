import { z } from "zod";

export const renameSchema = z.object({
	name: z.string().trim().min(1, { message: "Name is required" })
});

export type RenameFormValues = z.infer<typeof renameSchema>;
