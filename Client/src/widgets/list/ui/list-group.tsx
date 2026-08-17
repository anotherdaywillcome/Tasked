"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { ListGroupContext, useGroupedList } from "../model/grouped-list-context";
import type { ListGroup as ListGroupData } from "../model/types";

export type ListGroupProps = {
	group: ListGroupData;
	children: ReactNode;
};

export const ListGroup = ({ group: suppliedGroup, children }: Readonly<ListGroupProps>) => {
	const { list } = useGroupedList();
	const group = list.groups.find(({ id }) => id === suppliedGroup.id) ?? suppliedGroup;
	const headingId = `${list.id}-${group.id}-heading`;

	return (
		<motion.li
			layout
			className="relative list-none"
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ type: "spring", stiffness: 420, damping: 34 }}
		>
			<ListGroupContext.Provider value={group.id}>
				<section
					className="relative rounded-[20px] bg-(--geek-blue-primary-opacity-100) p-[8px]"
					aria-labelledby={headingId}
				>
					{children}
				</section>
			</ListGroupContext.Provider>
		</motion.li>
	);
};
