import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
	label: string;
	name: string;
	placeholder?: string;
};

type InputSettings = {
	placeholder: string;
};

const INPUT_DEFAULT_SETTINGS = {
	placeholder: "Please write data"
} satisfies InputSettings;

export const Input = ({
	label,
	name,
	placeholder = INPUT_DEFAULT_SETTINGS.placeholder,
	...props
}: Readonly<InputProps>) => {
	const inputId = useId();

	return (
		<div className="flex flex-col gap-y-[0.5rem]">
			<label
				className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[1rem] tracking-[0.01em] text-(--neutrals-3) capitalize"
				htmlFor={inputId}
			>
				{label}
			</label>
			<input
				className="border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[0.625rem] px-[0.75rem] pt-[0.438rem] pb-[0.5rem] bg-(--geek-blue-primary-opacity-150) font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) placeholder:text-(--neutrals-3) caret-(--geek-blue-4) transition-[border-color,background-color,box-shadow,color] duration-200 ease-out hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200) selection:bg-(--daybreak-blue-400) selection:text-(--white-pallete-100) focus-visible:outline-none focus-visible:border-(--geek-blue-4) focus-visible:bg-(--geek-blue-primary-opacity-200) focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)]"
				id={inputId}
				name={name}
				placeholder={placeholder}
				{...props}
			/>
		</div>
	);
};
