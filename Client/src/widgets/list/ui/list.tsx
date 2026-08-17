"use client";

import type { GroupedListProps } from "./grouped-list";
import { GroupedList } from "./grouped-list";

export type ListProps = Omit<GroupedListProps, "children">;

export const List = (props: Readonly<ListProps>) => {
	return (
		<GroupedList {...props}>
			{({ groups }) =>
				groups.map((group) => (
					<GroupedList.Group key={group.id} group={group}>
						<GroupedList.Header>
							<GroupedList.Title />
							<GroupedList.Count />
							<GroupedList.Action />
						</GroupedList.Header>
						<GroupedList.Items>
							{group.tasks.map((task) => (
								<GroupedList.Item key={task.id} task={task} />
							))}
						</GroupedList.Items>
					</GroupedList.Group>
				))
			}
		</GroupedList>
	);
};
