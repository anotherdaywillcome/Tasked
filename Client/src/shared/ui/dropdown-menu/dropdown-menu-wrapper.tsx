import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { use } from "react";

import { DropdownMenuContext } from "./dropdown-menu-context";

type DropdownMenuWrapperProps = {
	children: ReactNode;
	name?: string;
} & ComponentPropsWithoutRef<"div">;

export const DropdownMenuWrapper = ({ children, name, ...props }: Readonly<DropdownMenuWrapperProps>) => {
	const { selectedValue } = use(DropdownMenuContext);

	return (
		<div {...props}>
			{name && <input readOnly type="hidden" name={name} value={selectedValue ?? ""} />}
			{children}
		</div>
	);
};
