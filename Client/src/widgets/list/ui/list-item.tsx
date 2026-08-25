"use client";

import { getFormattedId, getPriority, getPriorityBadgeVariant } from "@entities/tasks";
import { AvatarStack, Badge, Icon, ICON_TYPES } from "@shared/ui";
import { clsx } from "clsx";
import { animate, motion, useDragControls, useMotionValue } from "motion/react";
import type { KeyboardEvent, ReactNode } from "react";

import { getListDropTargetAtPoint } from "../lib";
import { useGroupedList } from "../model/grouped-list-context";
import type { ListTask } from "../model/types";

export type ListItemProps = {
	task: ListTask;
	children?: ReactNode | ((task: ListTask) => ReactNode);
};

const DragHandleIcon = () => (
	<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path
			d="M5.094 14.188a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188Zm5.333 0a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188ZM5.094 8.854a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188Zm5.333 0a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188ZM5.094 3.521a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188Zm5.333 0a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188Z"
			fill="currentColor"
		/>
	</svg>
);

const DefaultListItemContent = ({ task, headingId }: Readonly<{ task: ListTask; headingId: string }>) => {
	const priority = getPriority(task.priority);
	const assigneeNames = task.assignees.map(({ fullName }) => fullName).join(", ");

	return (
		<>
			<h4
				className="min-w-0 font-(family-name:--font-barlow) text-[14px] leading-[129%] font-medium tracking-[0.01em] text-(--geek-blue-1)"
				id={headingId}
			>
				{task.title}
			</h4>
			{task.assignees.length > 0 && (
				<div className="shrink-0" aria-label={`Assigned to ${assigneeNames}`}>
					<AvatarStack variant="extended" users={task.assignees} />
				</div>
			)}
			<p className="flex shrink-0 items-center gap-x-[4px]">
				<span className="sr-only">Due </span>
				<time dateTime={task.dueDate.value}>
					<span
						className="font-(family-name:--font-barlow) text-[10px] leading-[140%] font-bold tracking-[0.01em] text-(--neutrals-2) uppercase"
						aria-hidden="true"
					>
						{task.dueDate.label}
					</span>
					<span className="sr-only">{task.dueDate.accessibleLabel}</span>
				</time>
				<Icon type={ICON_TYPES.Clock} size={10} className="text-(--neutrals-2)" />
			</p>
			<Badge classes="block shrink-0">{getFormattedId(String(task.number))}</Badge>
			<Badge classes="block shrink-0" variant={getPriorityBadgeVariant(priority)}>
				{priority}
			</Badge>
		</>
	);
};

export const ListItem = ({ task, children }: Readonly<ListItemProps>) => {
	const {
		activeTaskId,
		beginDragging,
		cancelDragging,
		dragInput,
		finishDragging,
		list,
		moveTaskWithKeyboard,
		previewTaskMove,
		removeTask
	} = useGroupedList();
	const isDragging = activeTaskId === task.id;
	const headingId = `${list.id}-${task.id}-title`;
	const instructionsId = `${list.id}-drag-instructions`;
	const dragControls = useDragControls();
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);

	const resetDragPosition = () => {
		const transition = { type: "spring", stiffness: 480, damping: 34 } as const;

		animate(dragX, 0, transition);
		animate(dragY, 0, transition);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();

			if (isDragging && dragInput === "keyboard") finishDragging();
			else if (!activeTaskId) {
				const row = event.currentTarget.closest<HTMLElement>("[data-list-task-id]");

				beginDragging(task.id, "keyboard", row?.getBoundingClientRect().height);
			}

			return;
		}

		if (!isDragging || dragInput !== "keyboard") return;

		const direction = {
			ArrowUp: "up",
			ArrowDown: "down",
			ArrowLeft: "left",
			ArrowRight: "right"
		} as const;

		if (event.key in direction) {
			event.preventDefault();
			moveTaskWithKeyboard(task.id, direction[event.key as keyof typeof direction]);
		} else if (event.key === "Escape") {
			event.preventDefault();
			cancelDragging();
		}
	};

	return (
		<motion.li
			layout="position"
			style={{ x: dragX, y: dragY }}
			className={clsx(
				"relative list-none rounded-[16px]",
				isDragging ? "z-30 cursor-grabbing" : "cursor-default"
			)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			whileDrag={{ scale: 1.015, opacity: 0.86, zIndex: 40 }}
			transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.7 }}
			drag
			dragControls={dragControls}
			dragListener={false}
			dragMomentum={false}
			dragElastic={0.06}
			data-list-task-id={task.id}
			onDragStart={(_, info) => {
				const row = document.querySelector<HTMLElement>(`[data-list-task-id="${task.id}"]`);

				beginDragging(task.id, "pointer", row?.getBoundingClientRect().height);
				const target = getListDropTargetAtPoint(info.point, task.id);

				if (target) previewTaskMove(target.groupId, target.taskIndex);
			}}
			onDrag={(_, info) => {
				const target = getListDropTargetAtPoint(info.point, task.id);

				if (target) previewTaskMove(target.groupId, target.taskIndex);
			}}
			onDragEnd={(_, info) => {
				const target = getListDropTargetAtPoint(info.point, task.id);

				finishDragging(target);
				resetDragPosition();
			}}
		>
			<motion.article
				className="grid min-h-[48px] grid-cols-[auto_minmax(180px,1fr)_auto_auto_auto_auto_auto] items-center gap-x-[12px] rounded-[16px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-200) px-[12px] py-[12px] backdrop-blur-[32px]"
				aria-label={children ? task.title : undefined}
				aria-labelledby={children ? undefined : headingId}
			>
				<button
					className="cursor-grab rounded-[6px] p-[2px] text-[#95ACCB] active:cursor-grabbing focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-400)]"
					type="button"
					aria-describedby={instructionsId}
					aria-keyshortcuts="Space Enter ArrowUp ArrowDown ArrowLeft ArrowRight Escape"
					aria-label={`Move ${task.title}`}
					aria-pressed={isDragging}
					onPointerDown={(event) => dragControls.start(event)}
					onKeyDown={handleKeyDown}
				>
					<DragHandleIcon />
				</button>
				{children ? (
					typeof children === "function" ? (
						children(task)
					) : (
						children
					)
				) : (
					<DefaultListItemContent task={task} headingId={headingId} />
				)}
				<motion.button
					className="cursor-pointer rounded-[8px] p-[4px] text-(--neutrals-3) hover:bg-(--volcano-150) hover:text-(--volcano-1000) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--volcano-200)]"
					type="button"
					aria-label={`Remove ${task.title}`}
					whileHover={{ scale: 1.08 }}
					whileTap={{ scale: 0.92 }}
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
					onClick={() => removeTask(task.id)}
				>
					<Icon type={ICON_TYPES.TrashBold} size={16} />
				</motion.button>
			</motion.article>
		</motion.li>
	);
};
