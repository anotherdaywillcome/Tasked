import type { ReactNode } from "react";

type ListHeaderProps = {
	children: ReactNode;
};

export const ListHeader = ({ children }: Readonly<ListHeaderProps>) => {
	return <header className="mb-[4px] flex items-center gap-x-[8px] px-[12px] py-[10px]">{children}</header>;
};
