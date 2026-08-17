import { envClient } from "../config/env/client-env";
import { buildApiBaseUrl } from "../lib/utils";

import type { ApiRequestOptions } from "./base-api-client";
import { BaseApiClient } from "./base-api-client";

export class BrowserApiClient extends BaseApiClient {
	protected override async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
		return super.request<T>(path, {
			...options,
			credentials: options.credentials ?? "include"
		});
	}
}

export const browserApiClient = new BrowserApiClient(
	buildApiBaseUrl({
		baseUrl: envClient.NEXT_PUBLIC_API_BASE_URL,
		version: envClient.NEXT_PUBLIC_API_VERSION
	})
);

export const bffBrowserApiClient = new BrowserApiClient(
	buildApiBaseUrl({
		baseUrl: envClient.NEXT_PUBLIC_BFF_URL
	})
);
