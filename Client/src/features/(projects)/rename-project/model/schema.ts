import { z } from "zod";

export const renameProjectSchema = z.object({
	name: z.string().trim().min(1, { message: "Name is required" })
});

export type RenameProjectFormValues = z.infer<typeof renameProjectSchema>;
