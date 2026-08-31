"use client";

import { Privacy, Project, projectPrivacyOptions } from "@entities/projects/model/types";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@shared/ui";
import { useEffect, useState } from "react";

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
			<SelectLabel>Privacy</SelectLabel>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{projectPrivacyOptions.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
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