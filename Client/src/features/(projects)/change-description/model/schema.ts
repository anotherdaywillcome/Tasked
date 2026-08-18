import { z } from "zod";

export const changeDescriptionSchema = z.object({
	description: z.string().min(1, { message: "Description is required " })
});

export type ChangeDescriptionFormValues = z.infer<typeof changeDescriptionSchema>;
