import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { projectMutations } from "@entities/projects/api/project.mutations";

import type { ChangePrivacyFormValues } from "./schema";
import { changePrivacySchema } from "./schema";

type UseChangePrivacyParams = {
	id: string;
};

export const useChangePrivacy = ({ id }: Readonly<UseChangePrivacyParams>) => {
	const queryClient = useQueryClient();

	const { mutate: changePrivacy, isError, isPending } = useMutation(projectMutations(queryClient).changePrivacy());

	const {
		register,
		formState: { errors }
	} = useForm<ChangePrivacyFormValues>({
		resolver: zodResolver(changePrivacySchema)
	});

	const handlePrivacyChange = ({ privacy }: ChangePrivacyFormValues) => {
		changePrivacy({
			id,
			privacy
		});
	};

	return {
		register,
		handlePrivacyChange,
		errors,
		isPending,
		isError
	};
};
