"use client";

import { useEffect, useState } from "react";

import type { Project } from "@entities/projects";
import { Privacy, privacyOptions } from "@entities/projects/model/types";

import { Select } from "@shared/ui";
import { useDebounce } from "@shared/lib/hooks";

import { useChangePrivacy } from "../model";

type ChangePrivacyProps = {
	project: Omit<Project, "taskSummary">;
};

export const ChangePrivacy = ({ project: { id, privacy } }: Readonly<ChangePrivacyProps>) => {
	const [projectPrivacy, setProjectPrivacy] = useState<Privacy>(privacy);
	const debouncedProjectPrivacy = useDebounce<Privacy>(projectPrivacy, 600);

	const {
		handlePrivacyChange,
		register,
		isPending,
		isError,
		errors: { privacy: privacyValidationError }
	} = useChangePrivacy({ id });

	useEffect(() => {
		if (debouncedProjectPrivacy === projectPrivacy) {
			return;
		}

		handlePrivacyChange({
			privacy: debouncedProjectPrivacy
		});
	}, [debouncedProjectPrivacy, projectPrivacy]);

	return (
		<div className="relative">
			<form className="relative">
				<Select
					{...register("privacy")}
					defaultValue={Privacy[privacy]}
					onValueChange={(value) => setProjectPrivacy(Privacy[value as keyof typeof Privacy])}
				>
					<Select.Label>Privacy</Select.Label>
					<Select.Trigger>
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{privacyOptions.map((option) => (
								<Select.Item key={option} value={option}>
									{option}
								</Select.Item>
							))}
						</Select.Group>
					</Select.Content>
				</Select>
			</form>
			{privacyValidationError && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="alert"
				>
					{privacyValidationError.message}
				</small>
			)}
			{isPending && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="status"
				>
					Changing project privacy...
				</small>
			)}
			{isError && (
				<small
					className="font-(family-name:--font-barlow) font-medium text-[0.625rem] leading-[140%] tracking-[0.01em] text-red-600"
					role="alert"
				>
					Unable to change project privacy.
				</small>
			)}
		</div>
	);
};

// <DropdownMenu>
// 	<DropdownMenu.Trigger>Large Button Tests</DropdownMenu.Trigger>
// 	<DropdownMenu.Content>
// 		<DropdownMenu.Group>
// 			<DropdownMenu.Item>Team</DropdownMenu.Item>
// 			<DropdownMenu.Submenu>
// 				<DropdownMenu.SubmenuTrigger>Invite users</DropdownMenu.SubmenuTrigger>
// 				<DropdownMenu.Portal>
// 					<DropdownMenu.SubmenuContent>
// 						<DropdownMenu.Item>Email</DropdownMenu.Item>
// 						<DropdownMenu.Item>Message</DropdownMenu.Item>
// 						<DropdownMenu.Submenu>
// 							<DropdownMenu.SubmenuTrigger>More options</DropdownMenu.SubmenuTrigger>
// 							<DropdownMenu.Portal>
// 								<DropdownMenu.SubmenuContent>
// 									<DropdownMenu.Item>Calendly</DropdownMenu.Item>
// 									<DropdownMenu.Item>Slack</DropdownMenu.Item>
// 									<DropdownMenu.Separator />
// 									<DropdownMenu.Item>Webhook</DropdownMenu.Item>
// 								</DropdownMenu.SubmenuContent>
// 							</DropdownMenu.Portal>
// 						</DropdownMenu.Submenu>
// 						<DropdownMenu.Separator />
// 						<DropdownMenu.Item>Advanced...</DropdownMenu.Item>
// 					</DropdownMenu.SubmenuContent>
// 				</DropdownMenu.Portal>
// 			</DropdownMenu.Submenu>
// 			<DropdownMenu.Item>
// 				New Team
// 				<DropdownMenu.Shortcut shortcut="⌘+X" />
// 			</DropdownMenu.Item>
// 		</DropdownMenu.Group>
// 	</DropdownMenu.Content>
// </DropdownMenu>