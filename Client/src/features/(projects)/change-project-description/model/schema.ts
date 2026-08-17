import { z } from "zod";

export const changeProjectDescriptionSchema = z.object({
	description: z.string().min(1, { message: "Description is required " })
});

export type ChangeProjectDescriptionFormValues = z.infer<typeof changeProjectDescriptionSchema>;
