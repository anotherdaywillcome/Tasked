// import { keepPreviousData, queryOptions } from "@tanstack/react-query";
//
// import type { GetProjectsQuery } from "../api";
//
// import { userQueryKeys } from "./users.query-keys";
//
// export const userQueries = {
// 	list: (query?: GetProjectsQuery) =>
// 		queryOptions({
// 			queryKey: userQueryKeys.list(query),
// 			queryFn: () => getUsers(query),
// 			placeholderData: keepPreviousData,
// 			staleTime: 2 * 60 * 1000,
// 			retry: (failureCount, error) => {
// 				const status = (error as ApiError).response?.status;
//
// 				if (status && status >= 400 && status < 500) {
// 					return status === 429 && failureCount < 3;
// 				}
//
// 				return failureCount < 3;
// 			},
// 			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000)
// 		}),
// 	detail: (id: string) =>
// 		queryOptions({
// 			queryKey: userQueryKeys.detail(id),
// 			queryFn: () => getUserById(id),
// 			staleTime: 5 * 60 * 1000,
// 			retry: (failureCount, error) => {
// 				const status = (error as ApiError).response?.status;
//
// 				if (status === 404) {
// 					return false;
// 				}
//
// 				return failureCount < 2;
// 			}
// 		})
// };
