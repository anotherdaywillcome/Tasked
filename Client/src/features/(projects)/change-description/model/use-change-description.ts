import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { projectMutations } from "@entities/projects/api/project.mutations";

import type { ChangeDescriptionFormValues } from "./schema";
import { changeDescriptionSchema } from "./schema";

type UseChangeDescriptionParams = {
	id: string;
};

export const useChangeDescription = ({ id }: Readonly<UseChangeDescriptionParams>) => {
	const queryClient = useQueryClient();

	const {
		mutate: changeDescription,
		isError,
		isPending
	} = useMutation(projectMutations(queryClient).changeDescription());

	const {
		register,
		formState: { errors }
	} = useForm<ChangeDescriptionFormValues>({
		resolver: zodResolver(changeDescriptionSchema)
	});

	const handleDescriptionChange = ({ description }: ChangeDescriptionFormValues) => {
		changeDescription({
			id,
			description
		});
	};

	return {
		register,
		handleDescriptionChange,
		errors,
		isPending,
		isError
	};
};
