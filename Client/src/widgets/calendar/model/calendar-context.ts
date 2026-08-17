import { createContext, use } from "react";

import type { CalendarTask } from "./types";

export type CalendarContextValue = {
	visibleTasks: ReadonlyArray<CalendarTask>;
	activeTaskId: string | null;
	dropTargetDateKey: string | null;
	selectedMonth: number;
	selectedYear: number;
	availableYears: ReadonlyArray<number>;
	headingId: string;
	selectMonth: (month: number) => void;
	selectYear: (year: number) => void;
	showPreviousMonth: () => void;
	showNextMonth: () => void;
	showToday: () => void;
	beginTaskDrag: (taskId: string) => void;
	previewTaskDrop: (dateKey: string | null) => void;
	finishTaskDrag: (taskId: string, dateKey: string | null) => void;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export const useCalendar = () => {
	const context = use(CalendarContext);

	if (!context) throw new Error("Calendar components must be used inside Calendar.");

	return context;
};
