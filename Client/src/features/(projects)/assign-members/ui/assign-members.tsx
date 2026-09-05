import { AssignMembersDrawerContent } from "./assign-members-drawer-content";
import { AssignMembersTrigger } from "./assign-members-trigger";

type AssignMemberComponents = {
	Trigger: typeof AssignMembersTrigger;
	DrawerContent: typeof AssignMembersDrawerContent;
};

type AssignMembers = (() => null) & AssignMemberComponents;

export const AssignMembers = (() => {
	return null;
}) as AssignMembers;

AssignMembers.Trigger = AssignMembersTrigger;
AssignMembers.DrawerContent = AssignMembersDrawerContent;
