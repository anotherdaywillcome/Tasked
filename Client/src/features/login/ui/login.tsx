"use client";

import { MotionConfig } from "motion/react";
import Link from "next/link";
import { useActionState } from "react";

import { MOTION_CONFIG_DEFAULT, ROUTES } from "@shared/config";
import { getActionError } from "@shared/lib/utils";
import {
	Button,
	BUTTON_VARIANTS,
	GlowEffect,
	GlowEffectPositions,
	Icon,
	ICON_TYPES,
	Input,
	SubmitButton,
	ValidationErrorMessage
} from "@shared/ui";

import { loginAction } from "../api";
import type { LoginState } from "../model";
import { initialState } from "../model";

export const Login = () => {
	const [state, action] = useActionState<LoginState, FormData>(loginAction, initialState);

	return (
		<MotionConfig {...MOTION_CONFIG_DEFAULT}>
			<section className="relative z-[100] border-[0.031rem] border-solid border-(--white-pallete-20) rounded-[1rem] px-[2rem] py-[5.25rem] backdrop-blur-[3.625rem] bg-[rgba(1,0,9,0.15)] overflow-hidden">
				<GlowEffect position={GlowEffectPositions.TopRight} />
				<h2 className="font-(family-name:--font-barlow) font-bold text-[1.375rem] leading-[1.75rem] tracking-[0.01em] text-center text-(--white-pallete-100) capitalize mb-[2rem] relative z-20">
					Sign In To Your Account
				</h2>
				<form className="relative z-20 flex flex-col gap-y-[1rem]" action={action} noValidate>
					<ValidationErrorMessage>
						<ValidationErrorMessage.Content id="network-error" validationId={state?.validationId}>
							{state?.error as string}
						</ValidationErrorMessage.Content>
					</ValidationErrorMessage>
					<div className="relative">
						<Input
							label="Email"
							name="email"
							type="email"
							aria-describedby={state?.fieldErrors?.email ? "email-error" : undefined}
						/>
						<ValidationErrorMessage>
							<ValidationErrorMessage.Content
								id="email-error"
								className="mt-[0.5rem]"
								validationId={state?.validationId}
							>
								{getActionError(state?.fieldErrors, "email") as string}
							</ValidationErrorMessage.Content>
						</ValidationErrorMessage>
					</div>
					<div className="relative">
						<Input
							label="Password"
							name="password"
							type="password"
							aria-describedby={state?.fieldErrors?.password ? "password-error" : undefined}
						/>
						<ValidationErrorMessage>
							<ValidationErrorMessage.Content
								id="password-error"
								className="mt-[0.5rem]"
								validationId={state?.validationId}
							>
								{getActionError(state?.fieldErrors, "password") as string}
							</ValidationErrorMessage.Content>
						</ValidationErrorMessage>
					</div>
					<SubmitButton
						childrenDisplayedWhenPending={false}
						className="w-full mt-[1rem] max-h-[2.5rem]!"
						spinnerClasses="mt-[-0.25rem]"
					>
						Login
					</SubmitButton>
				</form>
				<p className="relative z-20 font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[1rem] tracking-[0.01em] text-center text-(--neutrals-3) my-[1rem]">
					You don&#39;t have an account —{" "}
					<Link className="text-(--geek-blue-4) focus-ring" href={ROUTES.Registration}>
						Register Here
					</Link>
				</p>
				<Button
					leadingIcon={<Icon type={ICON_TYPES.Google} size={16} />}
					className="relative z-20 w-full"
					variant={BUTTON_VARIANTS.Secondary}
					type="button"
				>
					SignUp With Google Account
				</Button>
				<GlowEffect position={GlowEffectPositions.BottomLeft} />
			</section>
		</MotionConfig>
	);
};
