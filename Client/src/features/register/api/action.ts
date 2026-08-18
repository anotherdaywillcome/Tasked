"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { ApiError, resolveApiError, serverApiClient } from "@shared/api";
import { ROUTES } from "@shared/config";

import type { RegistrationFormData, RegistrationState } from "../model";
import { RegistrationSchema } from "../model";

export const registrationAction = async (
	_prevState: RegistrationState,
	formData: FormData
): Promise<RegistrationState> => {
	const registerFormData = Object.fromEntries(formData.entries());
	const validationResult = RegistrationSchema.safeParse(registerFormData);

	if (!validationResult.success) {
		return {
			fieldErrors: {
				...z.flattenError(validationResult.error).fieldErrors
			},
			validationId: "registration_" + Date.now()
		};
	}

	const payload: RegistrationFormData = validationResult.data;

	try {
		await serverApiClient.post<void>(ROUTES.Registration, payload);
	} catch (error) {
		if (error instanceof ApiError) {
			const resolved = resolveApiError(error);

			if (resolved.shouldLog) {
				console.error(error);
			}

			return {
				error: resolved.message,
				validationId: "api_registration_" + Date.now()
			};
		}

		return {
			error: "Network error. Please check your connection and try again.",
			validationId: "network_registration_" + Date.now()
		};
	}

	redirect(ROUTES.Home);
};
