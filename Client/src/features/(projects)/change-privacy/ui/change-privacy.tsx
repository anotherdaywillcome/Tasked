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
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent>
								<DropdownMenu.Item>Email</DropdownMenu.Item>
								<DropdownMenu.Item>Message</DropdownMenu.Item>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger>More options</DropdownMenu.SubTrigger>
									<DropdownMenu.Portal>
										<DropdownMenu.SubContent>
											<DropdownMenu.Item>Calendly</DropdownMenu.Item>
											<DropdownMenu.Item>Slack</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item>Webhook</DropdownMenu.Item>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Sub>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>Advanced...</DropdownMenu.Item>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>
					<DropdownMenu.Item>
						New Team
						<DropdownMenu.Shortcut shortcut="⌘+X" />
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
