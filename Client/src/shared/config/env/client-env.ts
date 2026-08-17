import { z } from "zod";

const clientEnvSchema = z.object({
	NEXT_PUBLIC_API_BASE_URL: z.url(),
	NEXT_PUBLIC_API_VERSION: z.string().trim().min(1),
	NEXT_PUBLIC_BFF_URL: z.url()
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const envClient: ClientEnv = clientEnvSchema.parse({
	NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	NEXT_PUBLIC_API_VERSION: process.env.NEXT_PUBLIC_API_VERSION,
	NEXT_PUBLIC_BFF_URL: process.env.NEXT_PUBLIC_BFF_URL
});
