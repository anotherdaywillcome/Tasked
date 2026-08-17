export type CalendarTaskPriority = "low" | "medium" | "high";

export type CalendarTaskAssignee = {
	id: string;
	fullName: string;
	imageUrl: string;
};

export type CalendarTask = {
	id: string;
	number: number;
	title: string;
	priority: CalendarTaskPriority;
	dueDate: {
		value: string;
		label: string;
		accessibleLabel: string;
	};
	assignees: Array<CalendarTaskAssignee>;
	status?: {
		id: string;
		title: string;
	};
};

export type CalendarPeriod = {
	month: number;
	year: number;
};

export type CalendarDayData = {
	date: Date;
	dateKey: string;
	dayNumber: number;
	isCurrentMonth: boolean;
	isToday: boolean;
};
