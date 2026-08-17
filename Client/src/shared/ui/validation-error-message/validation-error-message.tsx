"use client";

import { AnimatePresence } from "motion/react";
import type { ReactElement } from "react";
import { isValidElement } from "react";

import { ValidationErrorMessageContent } from "./validation-error-message-content";

export type ValidationErrorMessageProps = {
	children: ReactElement<ValidationErrorMessageProps, typeof ValidationErrorMessageContent>;
};

type ValidationErrorMessageComponents = {
	Content: typeof ValidationErrorMessageContent;
};

type ValidationErrorMessage = ((props: Readonly<ValidationErrorMessageProps>) => ReactElement) &
	ValidationErrorMessageComponents;

export const ValidationErrorMessage = (({ children }: Readonly<ValidationErrorMessageProps>) => {
	let validationErrorMessageContent: ReactElement<
		ValidationErrorMessageProps,
		typeof ValidationErrorMessageContent
	> | null = null;

	if (isValidElement(children) && children.type === ValidationErrorMessageContent) {
		validationErrorMessageContent = children;
	} else {
		throw new Error(
			`<ValidationErrorMessage> only accepts <ValidationErrorMessage.Content> as its child. ` +
				`Received: <${typeof children!.type === "string" ? children!.type : (children!.type.name ?? "Unknown")}>.`
		);
	}

	return <AnimatePresence>{validationErrorMessageContent}</AnimatePresence>;
}) as ValidationErrorMessage;

ValidationErrorMessage.Content = ValidationErrorMessageContent;
