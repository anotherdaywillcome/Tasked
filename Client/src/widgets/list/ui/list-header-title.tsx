"use client";

import type { ReactNode } from "react";

import { useGroupedList, useListGroup } from "../model/grouped-list-context";

type ListHeaderTitleProps = {
	children?: ReactNode;
};

export const ListHeaderTitle = ({ children }: Readonly<ListHeaderTitleProps>) => {
	const { list } = useGroupedList();
	const group = useListGroup();

	return (
		<h3
			className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em] text-(--neutrals-3)"
			id={`${list.id}-${group.id}-heading`}
		>
			{children ?? group.title}
		</h3>
	);
};
