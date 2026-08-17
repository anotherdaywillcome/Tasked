export const BFF_ENDPOINTS = {
	Clients: {
		Featured: (limit: number) => `clients/featured?limit=${limit}`
	},
	Users: {
		Info: "users/info",
		Projects: {
			Assigned: (userId: string) => `users/${userId}/assigned-projects`
		}
	},
	Projects: {
		Update: {
			Name: (id: string) => `projects/${id}/rename`
		},
		Upload: {
			Image: (id: string) => `projects/${id}/upload-image`,
			Attachments: (projectId: string) => `projects/${projectId}/upload-attachments`
		},
		Create: "projects/create"
	}
};
