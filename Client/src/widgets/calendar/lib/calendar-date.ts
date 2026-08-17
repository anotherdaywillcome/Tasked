import type { CalendarDayData, CalendarTask } from "../model/types";

const padDatePart = (value: number) => String(value).padStart(2, "0");

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "2-digit"
});

const accessibleDateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "numeric",
	year: "numeric"
});

const getDateFromKey = (dateKey: string) => {
	const [year, month, day] = dateKey.split("-").map(Number);

	return new Date(year, month - 1, day);
};

export const getDateKey = (date: Date) => {
	return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;
};

export const getCalendarDays = (year: number, month: number): Array<CalendarDayData> => {
	const firstDay = new Date(year, month, 1);
	const mondayBasedOffset = (firstDay.getDay() + 6) % 7;
	const gridStart = new Date(year, month, 1 - mondayBasedOffset);
	const todayKey = getDateKey(new Date());

	return Array.from({ length: 42 }, (_, index) => {
		const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
		const dateKey = getDateKey(date);

		return {
			date,
			dateKey,
			dayNumber: date.getDate(),
			isCurrentMonth: date.getFullYear() === year && date.getMonth() === month,
			isToday: dateKey === todayKey
		};
	});
};

export const getCalendarYears = (tasks: ReadonlyArray<CalendarTask>, selectedYear: number) => {
	const taskYears = tasks
		.map((task) => Number(task.dueDate.value.slice(0, 4)))
		.filter((year) => Number.isInteger(year));
	const minimumYear = Math.min(selectedYear - 1, ...taskYears);
	const maximumYear = Math.max(selectedYear + 1, ...taskYears);

	return Array.from({ length: maximumYear - minimumYear + 1 }, (_, index) => minimumYear + index);
};

export const getTasksForPeriod = (tasks: ReadonlyArray<CalendarTask>, year: number, month: number) => {
	const periodPrefix = `${year}-${padDatePart(month + 1)}-`;

	return tasks.filter((task) => task.dueDate.value.startsWith(periodPrefix));
};

export const isDateInPeriod = (dateKey: string, year: number, month: number) => {
	return dateKey.startsWith(`${year}-${padDatePart(month + 1)}-`);
};

export const shiftDateKey = (dateKey: string, days: number) => {
	const date = getDateFromKey(dateKey);

	date.setDate(date.getDate() + days);

	return getDateKey(date);
};

export const moveCalendarTask = (
	tasks: ReadonlyArray<CalendarTask>,
	taskId: string,
	dateKey: string
): ReadonlyArray<CalendarTask> => {
	const task = tasks.find(({ id }) => id === taskId);

	if (!task || task.dueDate.value === dateKey) return tasks;

	const date = getDateFromKey(dateKey);

	if (Number.isNaN(date.getTime()) || getDateKey(date) !== dateKey) return tasks;

	return tasks.map((currentTask) =>
		currentTask.id === taskId
			? {
					...currentTask,
					dueDate: {
						value: dateKey,
						label: shortDateFormatter.format(date),
						accessibleLabel: accessibleDateFormatter.format(date)
					}
				}
			: currentTask
	);
};
