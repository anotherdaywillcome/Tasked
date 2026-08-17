"use client";

import { AnimatePresence, motion } from "motion/react";
import { Children, isValidElement, type ReactElement, type ReactNode, useMemo } from "react";

import { CALENDAR_MONTHS, CALENDAR_WEEKDAYS } from "../config";
import { getCalendarDays } from "../lib";
import { useCalendar } from "../model/calendar-context";
import { CalendarDay } from "./calendar-day";
import { CalendarTask, type CalendarTaskProps } from "./calendar-task";

type CalendarGridProps = {
	children?: ReactNode;
};

export const CalendarGrid = ({ children }: Readonly<CalendarGridProps>) => {
	const { selectedMonth, selectedYear, visibleTasks } = useCalendar();
	const days = useMemo(() => getCalendarDays(selectedYear, selectedMonth), [selectedMonth, selectedYear]);
	const tasksByDate = useMemo(() => {
		return visibleTasks.reduce<Map<string, typeof visibleTasks>>((groups, task) => {
			groups.set(task.dueDate.value, [...(groups.get(task.dueDate.value) ?? []), task]);
			return groups;
		}, new Map());
	}, [visibleTasks]);
	const taskTemplates = Children.toArray(children).filter(
		(child): child is ReactElement<CalendarTaskProps> => isValidElement(child) && child.type === CalendarTask
	);

	return (
		<div className="min-h-0 min-w-0 flex-1 overflow-auto rounded-[16px] [scrollbar-color:var(--geek-blue-6)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[8px] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--geek-blue-6) [&::-webkit-scrollbar-track]:bg-transparent">
			<AnimatePresence initial={false} mode="wait">
				<motion.div
					key={`${selectedYear}-${selectedMonth}`}
					className="grid min-h-full min-w-[840px] grid-cols-7 grid-rows-[34px_repeat(6,minmax(124px,1fr))] gap-px overflow-hidden rounded-[16px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--white-pallete-10)"
					role="grid"
					aria-label={`${CALENDAR_MONTHS[selectedMonth]} ${selectedYear} calendar`}
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					{CALENDAR_WEEKDAYS.map((weekday) => (
						<div
							key={weekday}
							className="sticky top-0 z-10 flex items-center bg-[rgba(2,21,40,0.96)] px-[10px] font-(family-name:--font-barlow) text-[10px] leading-[140%] font-bold tracking-[0.04em] text-(--neutrals-3) uppercase backdrop-blur-[12px]"
							role="columnheader"
						>
							<span className="hidden sm:inline">{weekday}</span>
							<span className="sm:hidden">{weekday.slice(0, 3)}</span>
						</div>
					))}
					{days.map((day) => (
						<CalendarDay
							key={day.dateKey}
							day={day}
							tasks={day.isCurrentMonth ? (tasksByDate.get(day.dateKey) ?? []) : []}
							taskTemplates={taskTemplates}
						/>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
