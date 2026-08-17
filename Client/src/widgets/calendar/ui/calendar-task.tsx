"use client";

import { getFormattedId, getPriority } from "@entities/tasks";
import { AvatarStack } from "@shared/ui";
import { clsx } from "clsx";
import { animate, motion, useMotionValue } from "motion/react";
import type { KeyboardEvent, ReactNode } from "react";

import { isDateInPeriod, shiftDateKey } from "../lib";
import { useCalendar } from "../model/calendar-context";
import type { CalendarTask as CalendarTaskData } from "../model/types";

export type CalendarTaskProps = {
	task: CalendarTaskData;
	children?: ReactNode | ((task: CalendarTaskData) => ReactNode);
};

const PRIORITY_COLORS = {
	low: "var(--cyan-1000)",
	medium: "var(--sunrise-yellow-101)",
	high: "var(--volcano-1000)"
} as const;

const KEYBOARD_DAY_OFFSETS = {
	ArrowLeft: -1,
	ArrowRight: 1,
	ArrowUp: -7,
	ArrowDown: 7
} as const;

const getDropTargetAtPoint = (point: { x: number; y: number }) => {
	const clientX = point.x - window.scrollX;
	const clientY = point.y - window.scrollY;
	const dropTarget = document
		.elementsFromPoint(clientX, clientY)
		.find(
			(element): element is HTMLElement => element instanceof HTMLElement && Boolean(element.dataset.calendarDate)
		);

	return dropTarget?.dataset.calendarDate ?? null;
};

export const CalendarTask = ({ task, children }: Readonly<CalendarTaskProps>) => {
	const {
		activeTaskId,
		beginTaskDrag,
		dropTargetDateKey,
		finishTaskDrag,
		previewTaskDrop,
		selectedMonth,
		selectedYear
	} = useCalendar();
	const headingId = `calendar-${task.id}-title`;
	const isDragging = activeTaskId === task.id;
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);

	const resetDragPosition = () => {
		const transition = { type: "spring", stiffness: 480, damping: 34 } as const;

		animate(dragX, 0, transition);
		animate(dragY, 0, transition);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();

			if (isDragging) finishTaskDrag(task.id, dropTargetDateKey);
			else if (!activeTaskId) beginTaskDrag(task.id);

			return;
		}

		if (!isDragging) return;

		if (event.key === "Escape") {
			event.preventDefault();
			finishTaskDrag(task.id, null);
			return;
		}

		if (event.key in KEYBOARD_DAY_OFFSETS) {
			event.preventDefault();
			const nextDateKey = shiftDateKey(
				dropTargetDateKey ?? task.dueDate.value,
				KEYBOARD_DAY_OFFSETS[event.key as keyof typeof KEYBOARD_DAY_OFFSETS]
			);

			if (isDateInPeriod(nextDateKey, selectedYear, selectedMonth)) previewTaskDrop(nextDateKey);
		}
	};

	return (
		<motion.li
			layout="position"
			style={{ x: dragX, y: dragY }}
			className={clsx(
				"relative list-none rounded-[8px] outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-400)]",
				isDragging ? "z-20 cursor-grabbing" : "cursor-grab"
			)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 0.97 }}
			whileHover={{ y: -1, scale: 1.01 }}
			whileDrag={{ scale: 1.04, opacity: 0.82, zIndex: 30 }}
			transition={{ type: "spring", stiffness: 480, damping: 34 }}
			drag
			dragMomentum={false}
			dragElastic={0.08}
			tabIndex={0}
			aria-label={`${task.title}. Press Space to pick up, arrow keys to choose a day, and Space to drop.`}
			aria-keyshortcuts="Space ArrowUp ArrowDown ArrowLeft ArrowRight Escape"
			onDragStart={() => beginTaskDrag(task.id)}
			onDrag={(_, info) => previewTaskDrop(getDropTargetAtPoint(info.point))}
			onDragEnd={(_, info) => {
				const dateKey = getDropTargetAtPoint(info.point);

				if (!dateKey || dateKey === task.dueDate.value) resetDragPosition();
				finishTaskDrag(task.id, dateKey);
			}}
			onKeyDown={handleKeyDown}
		>
			{children ? (
				typeof children === "function" ? (
					children(task)
				) : (
					children
				)
			) : (
				<article
					className="relative overflow-hidden rounded-[8px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-200) px-[7px] py-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
					aria-labelledby={headingId}
				>
					<span
						className="absolute inset-y-[5px] left-[3px] w-[2px] rounded-full"
						style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
						aria-hidden="true"
					/>
					<div className="pl-[4px]">
						<div className="flex items-start justify-between gap-x-[4px]">
							<h4
								className="line-clamp-2 font-(family-name:--font-barlow) text-[11px] leading-[127%] font-medium tracking-[0.01em] text-(--white-pallete-100)"
								id={headingId}
							>
								{task.title}
							</h4>
							{task.assignees.length > 0 && (
								<AvatarStack className="shrink-0" max={1} variant="extended" users={task.assignees} />
							)}
						</div>
						<footer className="mt-[5px] flex min-w-0 items-center justify-between gap-x-[6px]">
							<span className="shrink-0 font-(family-name:--font-barlow) text-[9px] leading-[140%] font-bold tracking-[0.01em] text-(--geek-blue-4) uppercase">
								{getFormattedId(String(task.number))}
							</span>
							<span className="min-w-0 truncate font-(family-name:--font-barlow) text-[9px] leading-[140%] font-bold tracking-[0.01em] text-(--neutrals-2) uppercase">
								{task.status?.title ?? getPriority(task.priority)}
							</span>
						</footer>
					</div>
				</article>
			)}
		</motion.li>
	);
};
