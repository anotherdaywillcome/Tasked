import { envServer } from "../config/env/server-env";
import { buildApiBaseUrl } from "../lib/utils";

export type BffApiRequestOptions = Omit<RequestInit, "method" | "body"> & {
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: unknown;
};

export class BffApiClient {
	constructor(private readonly baseUrl: string) {}

	async request<T>(path: string, options: BffApiRequestOptions = {}): Promise<T> {
		const { body, headers, ...fetchOptions } = options;

		const requestHeaders = new Headers(headers);

		let requestBody: BodyInit | undefined;

		if (body !== undefined && body !== null) {
			if (
				body instanceof FormData ||
				body instanceof URLSearchParams ||
				body instanceof Blob ||
				body instanceof ArrayBuffer ||
				ArrayBuffer.isView(body)
			) {
				requestBody = body as BodyInit;
			} else {
				requestBody = JSON.stringify(body);

				if (!requestHeaders.has("Content-Type")) {
					requestHeaders.set("Content-Type", "application/json");
				}
			}
		}

		const response = await fetch(this.buildUrl(path), {
			...fetchOptions,
			method: options.method ?? "GET",
			body: requestBody,
			headers: requestHeaders,
			credentials: "include"
		});

		if (response.status === 204 || response.status === 205) {
			return undefined as T;
		}

		return response.json() as Promise<T>;
	}

	get<T>(path: string, options?: Omit<BffApiRequestOptions, "method" | "body">): Promise<T> {
		console.log(envServer.BFF_URL);
		console.log(new URL(path, this.baseUrl).toString());
		return this.request<T>(path, {
			...options,
			method: "GET"
		});
	}

	post<T>(path: string, body?: unknown, options?: Omit<BffApiRequestOptions, "method" | "body">): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: "POST",
			body
		});
	}

	put<T>(path: string, body?: unknown, options?: Omit<BffApiRequestOptions, "method" | "body">): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: "PUT",
			body
		});
	}

	patch<T>(path: string, body?: unknown, options?: Omit<BffApiRequestOptions, "method" | "body">): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: "PATCH",
			body
		});
	}

	delete<T>(path: string, options?: Omit<BffApiRequestOptions, "method" | "body">): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: "DELETE"
		});
	}

	private buildUrl(path: string): string {
		return new URL(path, this.baseUrl).toString();
	}
}

export const bffApiClient = new BffApiClient(
	buildApiBaseUrl({
		baseUrl: envServer.BFF_URL
	})
);
