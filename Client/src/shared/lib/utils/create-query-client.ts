import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending"
			}
		}
	});
};
