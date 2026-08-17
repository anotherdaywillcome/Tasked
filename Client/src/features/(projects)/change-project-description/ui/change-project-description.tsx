"use client";

import type { ChangeEvent } from "react";
import { useEffect, useId, useState } from "react";

import { Project } from "@entities/projects/model/types";

import { useDebounce } from "@shared/lib/hooks";

import { useChangeProjectDescription } from "../model";

type ChangeProjectDescriptionProps = {
	project: Omit<Project, "taskSummary">;
};

export const ChangeProjectDescription = ({ project: { id, description } }: Readonly<ChangeProjectDescriptionProps>) => {
	const changeProjectDescriptionId = useId();

	const [projectDescription, setProjectDescription] = useState<string>(description);
	const debouncedProjectDescription = useDebounce<string>(projectDescription, 600);

	const {
		handleDescriptionChange,
		register,
		isPending,
		isError,
		errors: { description: descriptionValidationError }
	} = useChangeProjectDescription({ id });

	useEffect(() => {
		if (debouncedProjectDescription === description) {
			return;
		}

		handleDescriptionChange({
			description: debouncedProjectDescription
		});
	}, [debouncedProjectDescription, description]);

	return (
		<div className="flex flex-col gap-y-[4px] px-[12px] pt-[28px] pb-[16px]">
			<label
				className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)"
				htmlFor={changeProjectDescriptionId}
			>
				Description
			</label>
			<textarea
				{...register("description", {
					onChange: (event: ChangeEvent<HTMLInputElement>) => {
						setProjectDescription(event.target.value);
					}
				})}
				className="resize-none w-full h-[64px] py-[8px] px-[6px] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[8px] bg-(--geek-blue-primary-opacity-100) font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) focus:outline-none"
				name="description"
				id={changeProjectDescriptionId}
				disabled={isPending}
				autoComplete="off"
				defaultValue={description}
				value={projectDescription}
			/>
		</div>
	);
};
