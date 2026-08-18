import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { projectMutations } from "@entities/projects/api/project.mutations";

import type { RenameFormValues } from "./schema";
import { renameSchema } from "./schema";

type UseRenameParams = {
	id: string;
};

export const useRename = ({ id }: Readonly<UseRenameParams>) => {
	const queryClient = useQueryClient();

	const { mutate: renameProject, isError, isPending } = useMutation(projectMutations(queryClient).rename());

	const {
		register,
		formState: { errors }
	} = useForm<RenameFormValues>({
		resolver: zodResolver(renameSchema)
	});

	const handleNameChange = ({ name }: RenameFormValues) => {
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
