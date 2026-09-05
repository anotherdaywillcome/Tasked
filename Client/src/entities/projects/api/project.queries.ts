import { queryOptions } from "@tanstack/react-query";

import { ApiError } from "@shared/api";
import { bffBrowserApiClient } from "@shared/api/browser-api-client";
import { BFF_ENDPOINTS } from "@shared/config";

import { GetProjectAssigneesResponse } from "../../projects";

import { projectQueryKeys } from "./project.query-keys";

export const projectQueries = {
	// list: (query?: GetProjectsQuery) =>
	// 	queryOptions({
	// 		queryKey: projectQueryKeys.list(query),
	// 		queryFn: () =>
	// 			bffBrowserApiClient.get<GetProjectsResponse>(BFF_ENDPOINTS.Projects.List, {
	// 				params: query
	// 			}),
	// 		placeholderData: keepPreviousData,
	// 		staleTime: 2 * 60 * 1000,
	// 		retry: (failureCount, error) => {
	// 			const status = (error as ApiError).status;
	//
	// 			if (status && status >= 400 && status < 500) {
	// 				return status === 429 && failureCount < 3;
	// 			}
	//
	// 			return failureCount < 3;
	// 		},
	// 		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000)
	// 	}),
	// detail: (id: string) =>
	// 	queryOptions({
	// 		queryKey: projectQueryKeys.detail(id),
	// 		queryFn: () => bffBrowserApiClient.get<GetProjectByIdResponse>(BFF_ENDPOINTS.Projects.Detail(id)),
	// 		staleTime: 5 * 60 * 1000,
	// 		retry: (failureCount, error) => {
	// 			const status = (error as ApiError).status;
	//
	// 			if (status === 404) {
	// 				return false;
	// 			}
	//
	// 			return failureCount < 2;
	// 		}
	// 	}),
	assignees: (id: string) =>
		queryOptions({
			queryKey: projectQueryKeys.assignees(id),
			queryFn: () => bffBrowserApiClient.get<GetProjectAssigneesResponse>(BFF_ENDPOINTS.Projects.Assignees(id)),
			staleTime: 5 * 60 * 1000,
			retry: (failureCount, error) => {
				const status = (error as ApiError).status;

				if (status && status >= 400 && status < 500) {
					return status === 429 && failureCount < 3;
				}

				return failureCount < 3;
			},

			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000)
		})
};
