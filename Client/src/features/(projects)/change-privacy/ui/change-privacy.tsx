import { Project } from "@entities/projects/model/types";

import { DropdownMenu } from "@shared/ui";

type ChangePrivacyProps = {
	project: Omit<Project, "taskSummary">;
};

export const ChangePrivacy = ({ project }: Readonly<ChangePrivacyProps>) => {
	return (
		// <DropdownMenu>
		// 	<DropdownMenuTrigger>
		// 		<span>Privacy</span>
		// 	</DropdownMenuTrigger>
		// 	<DropdownMenuContent>
		// 		<DropdownMenuItem>Public</DropdownMenuItem>
		// 		<DropdownMenuItem>Private</DropdownMenuItem>
		// 	</DropdownMenuContent>
		// </DropdownMenu>
		<DropdownMenu>
			<DropdownMenu.Trigger>Large Button Tests</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item>Team</DropdownMenu.Item>
					<DropdownMenu.Submenu>
						<DropdownMenu.SubmenuTrigger>Invite users</DropdownMenu.SubmenuTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubmenuContent>
								<DropdownMenu.Item>Email</DropdownMenu.Item>
								<DropdownMenu.Item>Message</DropdownMenu.Item>
								<DropdownMenu.Submenu>
									<DropdownMenu.SubmenuTrigger>More options</DropdownMenu.SubmenuTrigger>
									<DropdownMenu.Portal>
										<DropdownMenu.SubmenuContent>
											<DropdownMenu.Item>Calendly</DropdownMenu.Item>
											<DropdownMenu.Item>Slack</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item>Webhook</DropdownMenu.Item>
										</DropdownMenu.SubmenuContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Submenu>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>Advanced...</DropdownMenu.Item>
							</DropdownMenu.SubmenuContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Submenu>
					<DropdownMenu.Item>
						New Team
						<DropdownMenu.Shortcut shortcut="⌘+X" />
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
