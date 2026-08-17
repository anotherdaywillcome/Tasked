import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
	WEBSITE_URL: z.url(),
	BFF_URL: z.url(),
	AUTH_URL: z.url(),
	AUTH_SECRET: z.string().trim().min(1),
	KEYCLOAK_CLIENT_ID: z.string().trim().min(1),
	KEYCLOAK_CLIENT_SECRET: z.string().trim().min(1),
	KEYCLOAK_ISSUER: z.url(),
	NEXT_PUBLIC_API_BASE_URL: z.url(),
	NEXT_PUBLIC_API_VERSION: z.string().trim().min(1)
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const envServer: ServerEnv = serverEnvSchema.parse({
	WEBSITE_URL: process.env.WEBSITE_URL,
	BFF_URL: process.env.BFF_URL,
	AUTH_URL: process.env.AUTH_URL,
	AUTH_SECRET: process.env.AUTH_SECRET,
	KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
	KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
	KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
	NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	NEXT_PUBLIC_API_VERSION: process.env.NEXT_PUBLIC_API_VERSION
});
