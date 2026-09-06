import { Icon, ICON_TYPES } from "@shared/ui";

export const ActivityDrawerTrigger = () => {
	return (
		<button
			type="button"
			className="flex cursor-pointer flex-row-reverse items-center gap-x-[0.5rem] border-b-[0.125rem] border-solid border-transparent bg-transparent px-[0.75rem] pt-[1.063rem] pb-[1.125rem] text-(--neutrals-3) transition-[background-color,box-shadow,color] duration-200 ease-out hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:bg-(--geek-blue-primary-opacity-100) focus-visible:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_0.125rem_var(--daybreak-blue-200)] group-data-[state=active]/tab:text-(--white-pallete-100)"
		>
			<span className="font-(family-name:--font-barlow) text-[0.75rem] leading-[133%] font-bold tracking-[0.01em]">
				Activity
			</span>
			<Icon className="rotate-[-90deg]" type={ICON_TYPES.EditBold} size={14} />
		</button>
	);
};
