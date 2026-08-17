"use client";

import { ICON, Icon } from "@shared/ui";
import { AnimatePresence, motion } from "motion/react";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

import { findListTaskLocation } from "../lib";
import { useGroupedList, useListGroup } from "../model/grouped-list-context";
import { ListItem, type ListItemProps } from "./list-item";
import { ListTaskPlaceholder } from "./list-task-placeholder";

type ListGroupItemsProps = {
	children: ReactNode;
};

export const ListGroupItems = ({ children }: Readonly<ListGroupItemsProps>) => {
	const { activeTaskId, addTask, draggedTaskHeight, dropTarget, list } = useGroupedList();
	const group = useListGroup();
	const childItems = Children.toArray(children).filter(
		(child): child is ReactElement<ListItemProps> => isValidElement(child) && child.type === ListItem
	);
	const source = activeTaskId ? findListTaskLocation(list, activeTaskId) : null;
	const sourceGroupId = source ? list.groups[source.groupIndex].id : null;
	const showDestinationPlaceholder =
		activeTaskId &&
		dropTarget?.groupId === group.id &&
		(sourceGroupId !== group.id || source?.taskIndex !== dropTarget.taskIndex);
	const rows: Array<ReactNode> = [];
	const destinationPlaceholder = activeTaskId ? (
		<ListTaskPlaceholder key={`drop-${activeTaskId}`} height={draggedTaskHeight} />
	) : null;
	let destinationTaskIndex = 0;

	for (const task of group.tasks) {
		if (showDestinationPlaceholder && task.id !== activeTaskId && destinationTaskIndex === dropTarget.taskIndex) {
			rows.push(destinationPlaceholder);
		}

		const suppliedItem = childItems.find((item) => item.props.task.id === task.id);

		rows.push(
			suppliedItem ? cloneElement(suppliedItem, { key: task.id, task }) : <ListItem key={task.id} task={task} />
		);
		if (task.id !== activeTaskId) destinationTaskIndex += 1;
	}

	if (showDestinationPlaceholder && destinationTaskIndex === dropTarget.taskIndex) {
		rows.push(destinationPlaceholder);
	}

	return (
		<ol
			className="flex min-h-[48px] flex-col gap-y-[4px] rounded-[16px]"
			aria-label={`${group.title} tasks`}
			data-list-group-id={group.id}
		>
			<AnimatePresence initial={false}>{rows}</AnimatePresence>
			<motion.li layout className="list-none">
				<motion.button
					className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-x-[8px] rounded-[16px] border border-dashed border-(--geek-blue-6) bg-(--geek-blue-primary-opacity-100) px-[16px] py-[12px] text-(--neutrals-3) hover:border-(--geek-blue-5) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
					type="button"
					aria-label={`Add new row to ${group.title}`}
					whileHover={{ scale: 1.005 }}
					whileTap={{ scale: 0.995 }}
					transition={{ type: "spring", stiffness: 500, damping: 34 }}
					onClick={() => addTask(group.id)}
				>
					<Icon type={ICON.Add} size={16} />
					<span className="font-(family-name:--font-barlow) text-[12px] font-bold tracking-[0.01em]">
						Add new row
					</span>
				</motion.button>
			</motion.li>
		</ol>
	);
};
