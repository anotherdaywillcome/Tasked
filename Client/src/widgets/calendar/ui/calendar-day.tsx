"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { cloneElement, type ReactElement, useState } from "react";

import { MAX_VISIBLE_TASKS_PER_DAY } from "../config";
import { useCalendar } from "../model/calendar-context";
import type { CalendarDayData, CalendarTask as CalendarTaskData } from "../model/types";
import { CalendarTask, type CalendarTaskProps } from "./calendar-task";

type CalendarDayProps = {
	day: CalendarDayData;
	tasks: ReadonlyArray<CalendarTaskData>;
	taskTemplates: ReadonlyArray<ReactElement<CalendarTaskProps>>;
};

const dateLabelFormatter = new Intl.DateTimeFormat("en-US", {
	weekday: "long",
	month: "long",
	day: "numeric",
	year: "numeric"
});

export const CalendarDay = ({ day, tasks, taskTemplates }: Readonly<CalendarDayProps>) => {
	const { activeTaskId, dropTargetDateKey } = useCalendar();
	const [expanded, setExpanded] = useState(false);
	const visibleTasks = expanded ? tasks : tasks.slice(0, MAX_VISIBLE_TASKS_PER_DAY);
	const hiddenTaskCount = tasks.length - visibleTasks.length;
	const isDropTarget = day.isCurrentMonth && activeTaskId !== null && dropTargetDateKey === day.dateKey;

	return (
		<motion.section
			layout
			className={clsx(
				"relative flex min-h-[124px] min-w-0 flex-col bg-(--geek-blue-primary-opacity-50) p-[6px]",
				!day.isCurrentMonth && "bg-[rgba(1,0,9,0.18)]",
				day.isToday && "z-1 shadow-[inset_0_0_0_1px_var(--geek-blue-5)]",
				isDropTarget &&
					"z-2 bg-(--geek-blue-primary-opacity-150) shadow-[inset_0_0_0_2px_var(--daybreak-blue-200)]"
			)}
			data-calendar-date={day.isCurrentMonth ? day.dateKey : undefined}
			role="gridcell"
			aria-label={`${dateLabelFormatter.format(day.date)}, ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: day.isCurrentMonth ? 1 : 0.5 }}
			transition={{ duration: 0.18, ease: "easeOut" }}
		>
			<AnimatePresence>
				{isDropTarget && (
					<motion.span
						className="pointer-events-none absolute inset-[4px] rounded-[8px] border border-dashed border-(--geek-blue-4)"
						initial={{ opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.97 }}
						transition={{ duration: 0.14, ease: "easeOut" }}
						aria-hidden="true"
					/>
				)}
			</AnimatePresence>
			<header className="mb-[5px] flex min-h-[22px] items-center justify-between">
				<time
					className={clsx(
						"flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-[5px] font-(family-name:--font-barlow) text-[10px] leading-none font-bold text-(--neutrals-3)",
						day.isToday && "bg-(--geek-blue-6) text-(--white-pallete-100) shadow-geek-blue"
					)}
					dateTime={day.dateKey}
				>
					{day.dayNumber}
				</time>
				{tasks.length > 0 && (
					<span className="font-(family-name:--font-barlow) text-[9px] leading-none font-bold text-(--neutrals-2)">
						{tasks.length}
					</span>
				)}
			</header>
			<ol
				className="flex min-w-0 flex-1 flex-col gap-y-[3px]"
				aria-label={`Tasks due ${dateLabelFormatter.format(day.date)}`}
			>
				<AnimatePresence initial={false}>
					{visibleTasks.map((task) => {
						const template = taskTemplates.find(({ props }) => props.task.id === task.id);

						return template ? (
							cloneElement(template, { key: task.id, task })
						) : (
							<CalendarTask key={task.id} task={task} />
						);
					})}
				</AnimatePresence>
			</ol>
			{(hiddenTaskCount > 0 || expanded) && tasks.length > MAX_VISIBLE_TASKS_PER_DAY && (
				<motion.button
					className="mt-[4px] w-full cursor-pointer rounded-[6px] py-[3px] text-left font-(family-name:--font-barlow) text-[9px] font-bold text-(--geek-blue-4) hover:bg-(--geek-blue-primary-opacity-150) hover:text-(--geek-blue-3) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
					type="button"
					whileHover={{ x: 2 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setExpanded((current) => !current)}
				>
					{expanded ? "Show less" : `+${hiddenTaskCount} more`}
				</motion.button>
			)}
		</motion.section>
	);
};
