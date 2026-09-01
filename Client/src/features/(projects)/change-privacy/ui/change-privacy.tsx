"use client";

import { useEffect, useState } from "react";

import type { Project } from "@entities/projects/model/types";
import { Privacy, privacyOptions } from "@entities/projects/model/types";

import { Select } from "@shared/ui";

type ChangePrivacyProps = {
	project: Omit<Project, "taskSummary">;
};

export const ChangePrivacy = ({ project }: Readonly<ChangePrivacyProps>) => {
	const [privacy, setPrivacy] = useState<string | null>(null);

	useEffect(() => {
		console.log(privacy);
	});

	return (
		<Select defaultValue={Privacy[project.privacy]} onValueChange={(value) => setPrivacy(value)}>
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