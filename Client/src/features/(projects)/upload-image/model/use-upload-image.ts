import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { projectMutations } from "@entities/projects/api/project.mutations";

import type { UploadImageFormValues } from "./schema";
import { uploadImageSchema } from "./schema";

type UseUploadImageParams = {
	id: string;
};

export const useUploadImage = ({ id }: Readonly<UseUploadImageParams>) => {
	const queryClient = useQueryClient();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const { mutate: updateProjectImage, isError, isPending } = useMutation(projectMutations(queryClient).updateImage());

	const {
		register,
		handleSubmit: handleFormSubmit,
		setValue,
		formState: { errors }
	} = useForm<UploadImageFormValues>({
		resolver: zodResolver(uploadImageSchema)
	});

	const onValidFormSubmit = ({ image }: UploadImageFormValues) => {
		updateProjectImage({
			id,
			image
		});
	};

	const onInvalidFormSubmit = () => {
		setPreviewUrl(null);
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			setPreviewUrl(null);
			return;
		}

		setValue("image", file, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true
		});

		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);

		handleFormSubmit(onValidFormSubmit, onInvalidFormSubmit)();
	};

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	return {
		register,
		handleImageChange,
		previewUrl,
		errors,
		isPending,
		isError
	};
};
