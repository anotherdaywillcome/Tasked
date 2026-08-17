"use client";

import { useListGroup } from "../model/grouped-list-context";

export const ListHeaderCount = () => {
	const { tasks } = useListGroup();
	const label = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;

	return (
		<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em] text-(--neutrals-3)">
			<span aria-hidden="true">{tasks.length}</span>
			<span className="sr-only">{label}</span>
		</span>
	);
};
