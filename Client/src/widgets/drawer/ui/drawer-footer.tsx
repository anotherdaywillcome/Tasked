import type { ReactElement } from "react";

type DrawerFooterProps = {
	children: ReactElement | Array<ReactElement>;
};

export const DrawerFooter = ({ children }: Readonly<DrawerFooterProps>) => {
	return <footer className="relative w-full">{children}</footer>;
};
