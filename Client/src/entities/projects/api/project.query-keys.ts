export type ProjectsQuery = {
	search?: string;
	page?: number;
	pageSize?: number;
};

export const projectQueryKeys = {
	all: () => ["projects"] as const,
	lists: () => [...projectQueryKeys.all(), "list"] as const,
	list: (query: ProjectsQuery) => [...projectQueryKeys.lists(), query] as const,
	details: () => [...projectQueryKeys.all(), "detail"] as const,
	detail: (projectId: string) => [...projectQueryKeys.details(), projectId] as const
};
