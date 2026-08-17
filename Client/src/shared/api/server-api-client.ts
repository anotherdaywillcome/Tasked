import "server-only";

import { cookies } from "next/headers";

import { envServer } from "../config/env/server-env";
import { buildApiBaseUrl } from "../lib/utils";

import type { ApiRequestOptions } from "./base-api-client";
import { BaseApiClient } from "./base-api-client";

export class ServerApiClient extends BaseApiClient {
	protected override async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
		const cookieStore = await cookies();

		const cookieHeader = cookieStore
			.getAll()
			.map(({ name, value }) => `${name}=${value}`)
			.join("; ");

		const headers = new Headers(options.headers);

		if (cookieHeader) {
			headers.set("cookie", cookieHeader);
		}

		return super.request<T>(path, {
			...options,
			headers
		});
	}
}

export const serverApiClient = new ServerApiClient(
	buildApiBaseUrl({
		baseUrl: envServer.NEXT_PUBLIC_API_BASE_URL,
		version: envServer.NEXT_PUBLIC_API_VERSION
	})
);

export const bffServerApiClient = new ServerApiClient(
	buildApiBaseUrl({
		baseUrl: envServer.BFF_URL
	})
);
