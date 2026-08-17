// import { mutationOptions, type QueryClient } from "@tanstack/react-query";
//
// import type { CreateProjectInput, UpdateProjectInput } from "../api";
//
// import { userQueryKeys } from "./users.query-keys";
// import { userQueryKeys } from "./users.query-keys";
//
// export const userMutations = (queryClient: QueryClient) => ({
// 	create: () =>
// 		mutationOptions({
// 			mutationFn: (input: CreateProjectInput) => createUser(input),
// 			onSuccess: () => {
// 				void queryClient.invalidateQueries({
// 					queryKey: userQueryKeys.all()
// 				});
// 			}
// 		}),
// 	update: () =>
// 		mutationOptions({
// 			mutationFn: ({ id, data }: UpdateProjectInput) => updateUser(id, data),
// 			onSuccess: (projects) => {
// 				queryClient.setQueryData(userQueryKeys.detail(projects.id), projects);
//
// 				void queryClient.invalidateQueries({
// 					queryKey: userQueryKeys.list()
// 				});
// 			}
// 		}),
// 	delete: () =>
// 		mutationOptions({
// 			mutationFn: (id: string) => deleteUser(id),
// 			onSuccess: (_, projectId) => {
// 				queryClient.removeQueries({
// 					queryKey: userQueryKeys.detail(projectId)
// 				});
//
// 				void queryClient.invalidateQueries({
// 					queryKey: userQueryKeys.list()
// 				});
// 			}
// 		})
// });
