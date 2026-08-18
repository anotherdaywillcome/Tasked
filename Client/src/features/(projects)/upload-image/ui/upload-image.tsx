"use client";

import Image from "next/image";
import { useId } from "react";

import { Icon, ICON_TYPES } from "@shared/ui";

import { useUploadImage } from "../model";
import { Project } from "@entities/projects/model/types";

type UploadProjectImageProps = {
	project: Omit<Project, "taskSummary">;
};

export const UploadImage = ({ project: { id, imageUrl } }: Readonly<UploadProjectImageProps>) => {
	const uploadImageId = useId();

	const {
		handleImageChange,
		register,
		previewUrl,
		isPending,
		isError,
		errors: { image: imageValidationError }
	} = useUploadImage({ id });

	const displayedImageUrl = previewUrl ?? imageUrl;

	return (
		<section className="relative">
			<h2 className="sr-only">Project image</h2>
			<form className="relative">
				<label htmlFor={uploadImageId} className="block cursor-pointer">
					{displayedImageUrl ? (
						<Image
							src={displayedImageUrl}
							width={56}
							height={56}
							alt="Project logo"
							unoptimized={Boolean(previewUrl)}
							className="object-cover w-[3.5rem] h-[3.5rem] rounded-[1rem]"
						/>
					) : (
						<span className="flex flex-col items-center justify-center gap-[0.25rem] w-[3.5rem] h-[3.5rem] rounded-[1rem] border-[0.031rem] border-dashed border-(--geek-blue-4) bg-(--geek-blue-primary-opacity-300) text-(--white-pallete-100)">
							<Icon type={ICON_TYPES.ImportOutline} size={16} />
							<span className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em]">
								Add logo
							</span>
						</span>
					)}
				</label>
				<input
					{...register("image", {
						onChange: handleImageChange
					})}
					id={uploadImageId}
					type="file"
					accept="image/*"
					className="sr-only"
				/>
				{imageValidationError && (
					<small
						className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
						role="alert"
					>
						{imageValidationError.message}
					</small>
				)}
				{isPending && (
					<small
						className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
						role="status"
					>
						Uploading image…
					</small>
				)}
				{isError && (
					<small
						className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
						role="alert"
					>
						Unable to upload project image.
					</small>
				)}
			</form>
		</section>
	);
};
