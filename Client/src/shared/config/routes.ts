export const ROUTES = {
	Home: "/",
	Registration: "/registration",
	Login: "/login",
	Overview: "/overview",
	Features: "/features",
	Pricing: "/pricing",
	About: "/about",
	Tasks: "/tasks",
	Projects: "/projects",
	Messages: "/messages",
	Settings: "/settings",
	Account: "/settings/account",
	MainSettings: "/settings/main-settings",
	Reminders: "/settings/reminders",
	Notifications: "/settings/notifications",

	Project: (id: string) => `/project/${id}`,
	Conversation: (id: string) => `/messages/${id}`
} as const;
