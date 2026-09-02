import { MOTION_ICON_TYPES } from "@shared/ui";

export type Filter = "all" | "users" | "projects" | "tasks";

export type SearchResult = {
	id: number;
	title: string;
	type: Exclude<Filter, "all">;
	description: string;
	shortcut?: string;
	icon: keyof typeof MOTION_ICON_TYPES;
};

export type SearchGroup = Exclude<Filter, "all">;

export type SearchState = {
	query: string;
	filter: Filter;
	results: Array<SearchResult>;
};
