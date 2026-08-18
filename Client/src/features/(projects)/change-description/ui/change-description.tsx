"use client";

import type { ChangeEvent } from "react";
import { useEffect, useId, useState } from "react";

import { Project } from "@entities/projects/model/types";

import { useDebounce } from "@shared/lib/hooks";

import { useChangeDescription } from "../model";

type ChangeDescriptionProps = {
	project: Omit<Project, "taskSummary">;
};

export const ChangeDescription = ({ project: { id, description } }: Readonly<ChangeDescriptionProps>) => {
	const changeDescriptionId = useId();

	const [projectDescription, setProjectDescription] = useState<string>(description);
	const debouncedProjectDescription = useDebounce<string>(projectDescription, 600);

	const {
		handleDescriptionChange,
		register,
		isPending,
		isError,
		errors: { description: descriptionValidationError }
	} = useChangeDescription({ id });

	useEffect(() => {
		if (debouncedProjectDescription === description) {
			return;
		}

		handleDescriptionChange({
			description: debouncedProjectDescription
		});
	}, [debouncedProjectDescription, description]);

	return (
		<div className="px-[0.75rem] pt-[1.75rem] pb-[1rem]">
			<form className="relative w-full flex flex-col gap-y-[0.25rem]">
				<label
					className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--neutrals-3)"
					htmlFor={changeDescriptionId}
				>
					Description
				</label>
				<textarea
					{...register("description", {
						onChange: (event: ChangeEvent<HTMLInputElement>) => {
							setProjectDescription(event.target.value);
						}
					})}
					className="resize-none w-full h-[4rem] py-[0.5rem] px-[0.375rem] border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[0.5rem] bg-(--geek-blue-primary-opacity-100) font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) focus:outline-none"
					name="description"
					id={changeDescriptionId}
					disabled={isPending}
					autoComplete="off"
					defaultValue={description}
					value={projectDescription}
				/>
			</form>
			{descriptionValidationError && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="alert"
				>
					{descriptionValidationError.message}
				</small>
			)}
			{isPending && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="status"
				>
					Changing project description...
				</small>
			)}
			{isError && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="alert"
				>
					Unable to change project description.
				</small>
			)}
		</div>
	);
};
