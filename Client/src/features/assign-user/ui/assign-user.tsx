import { Button, Icon, ICON_TYPES } from "@shared/ui";

export const AssignUser = () => {
	return (
		<Button className="w-[1.5rem]! h-[1.5rem]! p-[0.25rem]! rounded-full! ml-[-0.625rem] z-10 text-[white]">
			<span className="sr-only">Assign User</span>
			<Icon type={ICON_TYPES.Add} size={16} />
		</Button>
	);
};
