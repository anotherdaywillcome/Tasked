"use client";

import type { ChangeEvent } from "react";
import { useEffect, useId, useState } from "react";

import type { Project } from "@entities/projects";

import { useDebounce } from "@shared/lib/hooks";
import { formatDate } from "@shared/lib/utils";

import { useRename } from "../model";

type RenameProps = {
	project: Omit<Project, "taskSummary">;
};

export const Rename = ({
	project: {
		id,
		name,
		createdAt,
		createdBy: { fullName }
	}
}: Readonly<RenameProps>) => {
	const renameId = useId();

	const [projectName, setProjectName] = useState<string>(name);
	const debouncedProjectName = useDebounce<string>(projectName, 600);

	const {
		handleNameChange,
		register,
		isPending,
		isError,
		errors: { name: nameValidationError }
	} = useRename({ id });

	useEffect(() => {
		if (debouncedProjectName === name) {
			return;
		}

		handleNameChange({
			name: debouncedProjectName
		});
	}, [debouncedProjectName, name]);

	return (
		<div className="flex flex-col gap-y-[0.125rem] w-full">
			<form className="relative w-full">
				<label htmlFor={renameId} className="sr-only">
					Project name
				</label>
				<input
					{...register("name", {
						onChange: (event: ChangeEvent<HTMLInputElement>) => {
							setProjectName(event.target.value);
						}
					})}
					id={renameId}
					className="font-(family-name:--font-barlow) font-bold text-[1.25rem] leading-[130%] tracking-[0.01em] text-(--white-pallete-100) border-b-[0.031rem] border-solid border-(--white-pallete-100) pb-[0.25rem] w-full focus:outline-none"
					type="text"
					name="name"
					disabled={isPending}
					autoComplete="off"
					value={projectName}
				/>
			</form>
			<small className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[133%] tracking-[0.01em] text-(--geek-blue-4)">
				By {fullName} on <time dateTime={createdAt}>{formatDate(createdAt)}</time>
			</small>
			{nameValidationError && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="alert"
				>
					{nameValidationError.message}
				</small>
			)}
			{isPending && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="status"
				>
					Changing project name...
				</small>
			)}
			{isError && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="alert"
				>
					Unable to rename project.
				</small>
			)}
		</div>
	);
};
