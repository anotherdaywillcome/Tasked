import { Project } from "@entities/projects/model/types";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "@shared/ui";

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
			<DropdownMenuTrigger>
				<span>Large Button Tests</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>Calendly</DropdownMenuItem>
											<DropdownMenuItem>Slack</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>Webhook</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Advanced...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
