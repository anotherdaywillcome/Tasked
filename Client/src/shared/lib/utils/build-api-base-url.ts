type BuildApiBaseUrlParams = {
	baseUrl: string;
	version?: string;
};

export const buildApiBaseUrl = ({ baseUrl, version }: BuildApiBaseUrlParams): string => {
	const url = new URL(baseUrl);

	const normalizedVersion = version?.replace(/^\/+|\/+$/g, "");

	url.pathname = [url.pathname.replace(/\/+$/, ""), normalizedVersion].filter(Boolean).join("/");

	return `${url.toString().replace(/\/+$/, "")}/`;
};
