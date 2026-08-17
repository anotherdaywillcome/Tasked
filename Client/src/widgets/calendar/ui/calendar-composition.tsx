"use client";

import type { ReactNode } from "react";

import { CalendarContext } from "../model/calendar-context";
import type { CalendarPeriod, CalendarTask as CalendarTaskData } from "../model/types";
import { useCalendarState } from "../model/use-calendar-state";

type CalendarRenderState = CalendarPeriod & {
	visibleTasks: ReadonlyArray<CalendarTaskData>;
};

export type CalendarCompositionProps = {
	tasks: ReadonlyArray<CalendarTaskData>;
	children: ReactNode | ((state: CalendarRenderState) => ReactNode);
	initialPeriod?: CalendarPeriod;
	onPeriodChange?: (period: CalendarPeriod) => void;
	onTasksChange?: (tasks: ReadonlyArray<CalendarTaskData>) => void;
};

export const CalendarComposition = ({
	children,
	initialPeriod,
	onPeriodChange,
	onTasksChange,
	tasks
}: Readonly<CalendarCompositionProps>) => {
	const { announcement, contextValue, period, visibleTasks } = useCalendarState({
		initialPeriod,
		onPeriodChange,
		onTasksChange,
		tasks
	});
	const content = typeof children === "function" ? children({ ...period, visibleTasks }) : children;

	return (
		<CalendarContext.Provider value={contextValue}>
			<section
				className="flex h-full min-h-0 w-full min-w-0 flex-col gap-y-[12px]"
				aria-labelledby={contextValue.headingId}
			>
				{content}
				<p className="sr-only" aria-live="assertive" aria-atomic="true">
					{announcement}
				</p>
			</section>
		</CalendarContext.Provider>
	);
};
