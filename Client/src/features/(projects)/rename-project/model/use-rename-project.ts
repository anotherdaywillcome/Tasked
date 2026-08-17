import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { projectMutations } from "@entities/projects/api/project.mutations";

import type { RenameProjectFormValues } from "./schema";
import { renameProjectSchema } from "./schema";

type UseRenameProjectParams = {
	id: string;
};

export const useRenameProject = ({ id }: Readonly<UseRenameProjectParams>) => {
	const queryClient = useQueryClient();

	const { mutate: renameProject, isError, isPending } = useMutation(projectMutations(queryClient).rename());

	const {
		register,
		formState: { errors }
	} = useForm<RenameProjectFormValues>({
		resolver: zodResolver(renameProjectSchema)
	});

	const handleNameChange = ({ name }: RenameProjectFormValues) => {
		renameProject({
			id,
			name
		});
	};

	return {
		register,
		handleNameChange,
		errors,
		isPending,
		isError
	};
};
