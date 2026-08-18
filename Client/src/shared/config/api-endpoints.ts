export const API_ENDPOINTS = {
	Users: {
		Featured: (limit: number) => `users/featured?limit=${limit}`,
		Me: "users/me",
		Projects: (userId: string) => `users/${userId}/projects`
	},
	Projects: {
		Update: {
			Name: (id: string) => `projects/${id}`,
			Description: (id: string) => `projects/${id}`
		},
		Upload: {
			Image: (id: string) => `projects/${id}/image`,
			Attachments: (projectId: string) => `projects/${projectId}/attachments`
		},
		Create: "projects"
	}
};
