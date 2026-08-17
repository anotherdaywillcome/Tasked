"use client";

import { getFormattedId, getPriority, getPriorityBadgeVariant } from "@entities/tasks";
import { AvatarStack, Badge, ICON, Icon } from "@shared/ui";
import { clsx } from "clsx";
import { animate, motion, useDragControls, useMotionValue } from "motion/react";
import type { KeyboardEvent, ReactNode } from "react";

import { getKanbanDropTargetAtPoint } from "../lib";
import { useKanbanBoard, useKanbanColumnId } from "../model/kanban-board-context";
import type { KanbanTask } from "../model/types";

export type KanbanBoardColumnCardProps = {
	task: KanbanTask;
	children?: ReactNode | ((task: KanbanTask) => ReactNode);
};

const DefaultTaskCardContent = ({ task, headingId }: Readonly<{ task: KanbanTask; headingId: string }>) => {
	return (
		<article
			className="flex flex-col rounded-[16px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-200) px-[12px] pt-[12px] pb-[14.5px] backdrop-filter-[32px]"
			aria-labelledby={headingId}
		>
			<header className="relative mb-[14px] pr-[28px]">
				<h4
					className="font-(family-name:--font-barlow) text-[14px] leading-[129%] font-medium tracking-[0.01em] text-(--white-pallete-100)"
					id={headingId}
				>
					{task.title}
				</h4>
			</header>
			<div className="flex items-center gap-x-[4px]">
				<Badge classes="block" variant={getPriorityBadgeVariant(getPriority(task.priority))}>
					{getPriority(task.priority)}
				</Badge>
				<Badge classes="block">{getFormattedId(String(task.number))}</Badge>
			</div>
			<footer className="mt-[16.5px] flex items-center justify-between">
				{task.assignees.length > 0 && <AvatarStack variant="extended" users={task.assignees} />}
				<p className="flex items-center gap-x-[4px]">
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
					<Icon type={ICON.Clock} size={10} className="text-(--neutrals-2)" />
				</p>
			</footer>
		</article>
	);
};

export const KanbanBoardColumnCard = ({ task, children }: Readonly<KanbanBoardColumnCardProps>) => {
	const columnId = useKanbanColumnId();
	const {
		activeTaskId,
		beginDragging,
		cancelDragging,
		dragInput,
		finishDragging,
		moveTaskWithKeyboard,
		previewTaskMove,
		removeTask
	} = useKanbanBoard();
	const isDragging = activeTaskId === task.id;
	const headingId = `${columnId}-${task.id}-title`;
	const dragControls = useDragControls();
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

			if (isDragging && dragInput === "keyboard") finishDragging();
			else if (!activeTaskId)
				beginDragging(task.id, "keyboard", event.currentTarget.getBoundingClientRect().height);

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
				"relative cursor-grab list-none rounded-[16px] outline-none active:cursor-grabbing focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-400)]",
				isDragging && "z-30 cursor-grabbing"
			)}
			transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.7 }}
			whileDrag={{ scale: 1.035, opacity: 0.86, zIndex: 40 }}
			drag
			dragControls={dragControls}
			dragListener={false}
			dragMomentum={false}
			dragElastic={0.06}
			tabIndex={0}
			aria-label={`${task.title}. Press Space to pick up, arrow keys to move, and Space to drop.`}
			aria-keyshortcuts="Space ArrowUp ArrowDown ArrowLeft ArrowRight Escape"
			data-kanban-task-id={task.id}
			onDragStart={(_, info) => {
				const card = document.querySelector<HTMLElement>(`[data-kanban-task-id="${task.id}"]`);

				beginDragging(task.id, "pointer", card?.getBoundingClientRect().height);
				const target = getKanbanDropTargetAtPoint(info.point, task.id);

				if (target) previewTaskMove(target.columnId, target.taskIndex);
			}}
			onDrag={(_, info) => {
				const target = getKanbanDropTargetAtPoint(info.point, task.id);

				if (target) previewTaskMove(target.columnId, target.taskIndex);
			}}
			onDragEnd={(_, info) => {
				const target = getKanbanDropTargetAtPoint(info.point, task.id);

				finishDragging(target);
				resetDragPosition();
			}}
			onKeyDown={handleKeyDown}
		>
			<div onPointerDown={(event) => dragControls.start(event)}>
				{children ? (
					typeof children === "function" ? (
						children(task)
					) : (
						children
					)
				) : (
					<DefaultTaskCardContent task={task} headingId={headingId} />
				)}
			</div>
			<motion.button
				className="absolute top-[8px] right-[8px] z-10 cursor-pointer rounded-[8px] p-[4px] text-(--neutrals-3) hover:bg-(--volcano-150) hover:text-(--volcano-1000) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--volcano-200)]"
				type="button"
				aria-label={`Remove ${task.title}`}
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.92 }}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
				onClick={() => removeTask(task.id)}
			>
				<Icon type={ICON.TrashBold} size={16} />
			</motion.button>
		</motion.li>
	);
};
