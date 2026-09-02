import { z } from "zod";

import { Privacy } from "@entities/projects/model/types";

export const changePrivacySchema = z.object({
	privacy: z.enum(Privacy, {
		error: "Invalid privacy value"
	})
});

export type ChangePrivacyFormValues = z.infer<typeof changePrivacySchema>;
