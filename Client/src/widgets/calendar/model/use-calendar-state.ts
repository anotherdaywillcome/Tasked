import { useCallback, useId, useMemo, useState } from "react";

import { getCalendarYears, getTasksForPeriod, moveCalendarTask } from "../lib";
import type { CalendarContextValue } from "./calendar-context";
import type { CalendarPeriod, CalendarTask } from "./types";

type UseCalendarStateOptions = {
	tasks: ReadonlyArray<CalendarTask>;
	initialPeriod?: CalendarPeriod;
	onPeriodChange?: (period: CalendarPeriod) => void;
	onTasksChange?: (tasks: ReadonlyArray<CalendarTask>) => void;
};

const getInitialPeriod = (initialPeriod?: CalendarPeriod): CalendarPeriod => {
	const today = new Date();

	return {
		month:
			initialPeriod && initialPeriod.month >= 0 && initialPeriod.month <= 11
				? initialPeriod.month
				: today.getMonth(),
		year: initialPeriod && Number.isInteger(initialPeriod.year) ? initialPeriod.year : today.getFullYear()
	};
};

export const useCalendarState = ({
	initialPeriod,
	onPeriodChange,
	onTasksChange,
	tasks
}: Readonly<UseCalendarStateOptions>) => {
	const headingId = `project-calendar-${useId().replaceAll(":", "")}`;
	const [period, setPeriod] = useState<CalendarPeriod>(() => getInitialPeriod(initialPeriod));
	const [calendarTasks, setCalendarTasks] = useState<ReadonlyArray<CalendarTask>>(tasks);
	const [sourceTasks, setSourceTasks] = useState(tasks);
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
	const [dropTargetDateKey, setDropTargetDateKey] = useState<string | null>(null);
	const [announcement, setAnnouncement] = useState("");

	if (tasks !== sourceTasks) {
		setSourceTasks(tasks);
		setCalendarTasks(tasks);
		setActiveTaskId(null);
		setDropTargetDateKey(null);
	}
	const availableYears = useMemo(() => getCalendarYears(calendarTasks, period.year), [calendarTasks, period.year]);
	const visibleTasks = useMemo(
		() => getTasksForPeriod(calendarTasks, period.year, period.month),
		[calendarTasks, period.month, period.year]
	);

	const updatePeriod = useCallback(
		(nextPeriod: CalendarPeriod) => {
			setPeriod(nextPeriod);
			onPeriodChange?.(nextPeriod);
		},
		[onPeriodChange]
	);

	const selectMonth = useCallback(
		(month: number) => {
			if (month < 0 || month > 11 || month === period.month) return;

			updatePeriod({ ...period, month });
		},
		[period, updatePeriod]
	);

	const selectYear = useCallback(
		(year: number) => {
			if (!Number.isInteger(year) || year === period.year) return;

			updatePeriod({ ...period, year });
		},
		[period, updatePeriod]
	);

	const changeMonth = useCallback(
		(offset: number) => {
			const nextMonth = new Date(period.year, period.month + offset, 1);

			updatePeriod({ month: nextMonth.getMonth(), year: nextMonth.getFullYear() });
		},
		[period.month, period.year, updatePeriod]
	);

	const showToday = useCallback(() => {
		const today = new Date();
		const todayPeriod = { month: today.getMonth(), year: today.getFullYear() };

		if (todayPeriod.month === period.month && todayPeriod.year === period.year) return;

		updatePeriod(todayPeriod);
	}, [period.month, period.year, updatePeriod]);

	const beginTaskDrag = useCallback(
		(taskId: string) => {
			const task = calendarTasks.find(({ id }) => id === taskId);

			if (!task) return;

			setActiveTaskId(taskId);
			setDropTargetDateKey(task.dueDate.value);
			setAnnouncement(`Picked up ${task.title}. Choose another day.`);
		},
		[calendarTasks]
	);

	const previewTaskDrop = useCallback((dateKey: string | null) => {
		setDropTargetDateKey((currentDateKey) => (currentDateKey === dateKey ? currentDateKey : dateKey));
	}, []);

	const finishTaskDrag = useCallback(
		(taskId: string, dateKey: string | null) => {
			const task = calendarTasks.find(({ id }) => id === taskId);
			const nextTasks = dateKey ? moveCalendarTask(calendarTasks, taskId, dateKey) : calendarTasks;

			setActiveTaskId(null);
			setDropTargetDateKey(null);

			if (!task || nextTasks === calendarTasks) {
				setAnnouncement(task ? `${task.title} stayed on ${task.dueDate.accessibleLabel}.` : "Move cancelled.");
				return;
			}

			const movedTask = nextTasks.find(({ id }) => id === taskId);

			setCalendarTasks(nextTasks);
			setSourceTasks(nextTasks);
			onTasksChange?.(nextTasks);
			setAnnouncement(`${task.title} moved to ${movedTask?.dueDate.accessibleLabel ?? dateKey}.`);
		},
		[calendarTasks, onTasksChange]
	);

	const contextValue = useMemo<CalendarContextValue>(
		() => ({
			visibleTasks,
			activeTaskId,
			dropTargetDateKey,
			selectedMonth: period.month,
			selectedYear: period.year,
			availableYears,
			headingId,
			selectMonth,
			selectYear,
			showPreviousMonth: () => changeMonth(-1),
			showNextMonth: () => changeMonth(1),
			showToday,
			beginTaskDrag,
			previewTaskDrop,
			finishTaskDrag
		}),
		[
			activeTaskId,
			availableYears,
			beginTaskDrag,
			changeMonth,
			dropTargetDateKey,
			finishTaskDrag,
			headingId,
			period.month,
			period.year,
			previewTaskDrop,
			selectMonth,
			selectYear,
			showToday,
			visibleTasks
		]
	);

	return { announcement, contextValue, period, visibleTasks };
};
