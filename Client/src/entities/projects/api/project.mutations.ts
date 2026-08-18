"use client";

import { mutationOptions, type QueryClient } from "@tanstack/react-query";

import { bffBrowserApiClient } from "@shared/api/browser-api-client";
import { BFF_ENDPOINTS } from "@shared/config";

import { Project } from "../model/types";

import { projectQueryKeys } from "./project.query-keys";
import type { CreateNewProjectResponse } from "./create-new-project";
import type { UpdateProjectImageCommand, UpdateProjectImageResponse } from "./update-project-image";
import type { UpdateProjectNameCommand, UpdateProjectNameResponse } from "./update-project-name";
import type { UpdateProjectDescriptionCommand, UpdateProjectDescriptionResponse } from "./update-project-description";

export const projectMutations = (queryClient: QueryClient) => ({
	create: () =>
		mutationOptions({
			mutationFn: () => bffBrowserApiClient.post<CreateNewProjectResponse>(BFF_ENDPOINTS.Projects.Create),
			onSuccess: (project) => {
				void queryClient.setQueryData(projectQueryKeys.detail(project.id), project);

				void queryClient.invalidateQueries({
					queryKey: projectQueryKeys.lists()
				});
			}
		}),
	rename: () =>
		mutationOptions({
			mutationFn: ({ id, name }: Readonly<UpdateProjectNameCommand>) =>
				bffBrowserApiClient.patch<UpdateProjectNameResponse>(BFF_ENDPOINTS.Projects.Update.Name(id), { name }),
			onMutate: async (updatedProject, context) => {
				await context.client.cancelQueries({
					queryKey: projectQueryKeys.detail(updatedProject.id)
				});

				const previousProject = context.client.getQueryData<Project>(
					projectQueryKeys.detail(updatedProject.id)
				);

				context.client.setQueryData<Project>(projectQueryKeys.detail(updatedProject.id), (oldProject) => {
					if (!oldProject) {
						return oldProject;
					}

					return {
						...oldProject,
						name: updatedProject.name
					};
				});

				return {
					previousProject
				};
			},
			onError: (error, updatedProject, onMutateResult, context) => {
				if (!onMutateResult) {
					return;
				}

				context.client.setQueryData<Project>(
					projectQueryKeys.detail(updatedProject.id),
					onMutateResult.previousProject
				);
			},
			onSettled: async (data, error, variables, onMutateResult, context) => {
				await Promise.all([
					context.client.invalidateQueries({
						queryKey: projectQueryKeys.detail(variables.id)
					}),

					context.client.invalidateQueries({
						queryKey: projectQueryKeys.lists()
					})
				]);
			}
		}),
	changeDescription: () =>
		mutationOptions({
			mutationFn: ({ id, description }: Readonly<UpdateProjectDescriptionCommand>) =>
				bffBrowserApiClient.patch<UpdateProjectDescriptionResponse>(
					BFF_ENDPOINTS.Projects.Update.Description(id),
					{ description }
				),
			onMutate: async (updatedProject, context) => {
				await context.client.cancelQueries({
					queryKey: projectQueryKeys.detail(updatedProject.id)
				});

				const previousProject = context.client.getQueryData<Project>(
					projectQueryKeys.detail(updatedProject.id)
				);

				context.client.setQueryData<Project>(projectQueryKeys.detail(updatedProject.id), (oldProject) => {
					if (!oldProject) {
						return oldProject;
					}

					return {
						...oldProject,
						description: updatedProject.description
					};
				});

				return {
					previousProject
				};
			},
			onError: (error, updatedProject, onMutateResult, context) => {
				if (!onMutateResult) {
					return;
				}

				context.client.setQueryData<Project>(
					projectQueryKeys.detail(updatedProject.id),
					onMutateResult.previousProject
				);
			},
			onSettled: async (data, error, variables, onMutateResult, context) => {
				await Promise.all([
					context.client.invalidateQueries({
						queryKey: projectQueryKeys.detail(variables.id)
					}),

					context.client.invalidateQueries({
						queryKey: projectQueryKeys.lists()
					})
				]);
			}
		}),
	// update: () =>
	// 	mutationOptions({
	// 		mutationFn: ({ id, data }: UpdateProjectInput) => updateProject(id, data),
	// 		onSuccess: (projects) => {
	// 			queryClient.setQueryData(projectQueryKeys.detail(projects.id), projects);
	//
	// 			void queryClient.invalidateQueries({
	// 				queryKey: projectQueryKeys.list()
	// 			});
	// 		}
	// 	}),
	// delete: () =>
	// 	mutationOptions({
	// 		mutationFn: (id: string) => deleteProject(id),
	// 		onSuccess: (_, projectId) => {
	// 			queryClient.removeQueries({
	// 				queryKey: projectQueryKeys.detail(projectId)
	// 			});
	//
	// 			void queryClient.invalidateQueries({
	// 				queryKey: projectQueryKeys.list()
	// 			});
	// 		}
	// 	}) // bffApiClient.patch(BFF_ENDPOINTS.Projects.Upload.Image(projectId), image)
	updateImage: () =>
		mutationOptions({
			mutationFn: ({ id, image }: UpdateProjectImageCommand) => {
				const formData = new FormData();

				formData.append("image", image);

				return bffBrowserApiClient.patch<UpdateProjectImageResponse>(
					BFF_ENDPOINTS.Projects.Upload.Image(id),
					formData
				);
			},
			onSuccess: (_, variables) => {
				void queryClient.invalidateQueries({
					queryKey: projectQueryKeys.detail(variables.id)
				});

				void queryClient.invalidateQueries({
					queryKey: projectQueryKeys.lists()
				});
			}
		})
});
