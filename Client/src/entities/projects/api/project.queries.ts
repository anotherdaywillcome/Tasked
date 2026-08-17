// import { keepPreviousData, queryOptions } from "@tanstack/react-query";
//
// import type { GetProjectByIdQuery, GetProjectsQuery } from "../api";
// import { getProjectById, getAssignedProjects } from "../api";
//
// import { projectQueryKeys } from "./projects.query-keys";
//
// export const projectQueries = {
// 	list: (query?: GetProjectsQuery) =>
// 		queryOptions({
// 			queryKey: projectQueryKeys.list(query),
// 			queryFn: () => getAssignedProjects(query),
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
// 			queryKey: projectQueryKeys.detail(id),
// 			queryFn: () => getProjectById(id),
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
