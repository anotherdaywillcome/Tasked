"use client";

import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

import { GroupedListContext } from "../model/grouped-list-context";
import { mockListData } from "../model/mock-list-data";
import type { GroupedListData, ListGroup as ListGroupData } from "../model/types";
import { useGroupedListState } from "../model/use-grouped-list-state";
import { ListGroup } from "./list-group";
import { ListGroupItems } from "./list-group-items";
import { ListHeader } from "./list-header";
import { ListHeaderActions } from "./list-header-actions";
import { ListHeaderCount } from "./list-header-count";
import { ListHeaderTitle } from "./list-header-title";
import { ListItem } from "./list-item";

export type GroupedListRenderState = {
	groups: ReadonlyArray<ListGroupData>;
};

export type GroupedListProps = {
	data?: GroupedListData;
	children?: ReactNode | ((state: GroupedListRenderState) => ReactNode);
	onDataChange?: (list: GroupedListData) => void;
};

type GroupedListComponent = ((props: Readonly<GroupedListProps>) => ReactNode) & {
	Group: typeof ListGroup;
	Header: typeof ListHeader;
	Title: typeof ListHeaderTitle;
	Count: typeof ListHeaderCount;
	Action: typeof ListHeaderActions;
	Items: typeof ListGroupItems;
	Item: typeof ListItem;
};

const DefaultGroupedListContent = ({ groups }: Readonly<GroupedListRenderState>) => (
	<>
		{groups.map((group) => (
			<ListGroup key={group.id} group={group}>
				<ListHeader>
					<ListHeaderTitle />
					<ListHeaderCount />
					<ListHeaderActions />
				</ListHeader>
				<ListGroupItems>
					{group.tasks.map((task) => (
						<ListItem key={task.id} task={task} />
					))}
				</ListGroupItems>
			</ListGroup>
		))}
	</>
);

const GroupedListRoot = ({ children, data = mockListData, onDataChange }: Readonly<GroupedListProps>) => {
	const contextValue = useGroupedListState({ data, onDataChange });
	const { list } = contextValue;
	const renderState = { groups: list.groups };
	const content =
		typeof children === "function"
			? children(renderState)
			: (children ?? <DefaultGroupedListContent groups={list.groups} />);

	return (
		<GroupedListContext.Provider value={contextValue}>
			<section
				className="relative h-full min-h-0 w-full min-w-0 overflow-auto overscroll-contain pb-[8px] [scrollbar-color:var(--geek-blue-6)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[8px] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--geek-blue-6) [&::-webkit-scrollbar-track]:bg-transparent"
				aria-labelledby={`${list.id}-heading`}
			>
				<h2 className="sr-only" id={`${list.id}-heading`}>
					{list.title}
				</h2>
				<p className="sr-only" id={`${list.id}-drag-instructions`}>
					Press Space or Enter on a task move handle to pick it up. Use the arrow keys to move it, then press
					Space or Enter to drop it. Press Escape to cancel.
				</p>
				<p className="sr-only" aria-live="assertive" aria-atomic="true">
					{contextValue.announcement}
				</p>
				<ol className="flex flex-col gap-y-[8px]" aria-label="Task status groups">
					<AnimatePresence initial={false}>{content}</AnimatePresence>
				</ol>
			</section>
		</GroupedListContext.Provider>
	);
};

export const GroupedList = Object.assign(GroupedListRoot, {
	Group: ListGroup,
	Header: ListHeader,
	Title: ListHeaderTitle,
	Count: ListHeaderCount,
	Action: ListHeaderActions,
	Items: ListGroupItems,
	Item: ListItem
}) as GroupedListComponent;
