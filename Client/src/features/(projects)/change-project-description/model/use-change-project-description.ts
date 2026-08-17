import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { projectMutations } from "@entities/projects/api/project.mutations";

import type { ChangeProjectDescriptionFormValues } from "./schema";
import { changeProjectDescriptionSchema } from "./schema";

type UseChangeProjectDescriptionParams = {
	id: string;
};

export const useChangeProjectDescription = ({ id }: Readonly<UseChangeProjectDescriptionParams>) => {
	const queryClient = useQueryClient();

	const {
		mutate: changeDescription,
		isError,
		isPending
	} = useMutation(projectMutations(queryClient).changeDescription());

	const {
		register,
		formState: { errors }
	} = useForm<ChangeProjectDescriptionFormValues>({
		resolver: zodResolver(changeProjectDescriptionSchema)
	});

	const handleDescriptionChange = ({ description }: ChangeProjectDescriptionFormValues) => {
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
