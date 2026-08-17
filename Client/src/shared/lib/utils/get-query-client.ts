import { environmentManager, QueryClient } from "@tanstack/react-query";

import { createQueryClient } from "./create-query-client";

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
	if (environmentManager.isServer()) {
		// Server: always make a new query client
		return createQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = createQueryClient();
		return browserQueryClient;
	}
};
