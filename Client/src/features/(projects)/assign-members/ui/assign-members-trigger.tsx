import { clsx } from "clsx";
import type { CSSProperties } from "react";

import { Button, Icon, ICON_TYPES } from "@shared/ui";

import { ASSIGN_MEMBERS_TRIGGER_DEFAULT_SETTINGS } from "../config";

type AssignMembersTriggerProps = {
	id: string;
	triggerSize?: string;
	triggerIconSize?: number;
	className?: string;
};

export const AssignMembersTrigger = ({
	id,
	triggerSize = ASSIGN_MEMBERS_TRIGGER_DEFAULT_SETTINGS.triggerSize,
	triggerIconSize = ASSIGN_MEMBERS_TRIGGER_DEFAULT_SETTINGS.triggerIconSize,
	className
}: Readonly<AssignMembersTriggerProps>) => {
	return (
		<Button
			type="button"
			style={{ "--assign-members-trigger-size": triggerSize } as CSSProperties}
			className={clsx(
				"!w-[var(--assign-members-trigger-size)] !h-[var(--assign-members-trigger-size)] p-[0.25rem]! rounded-full! ml-[-0.625rem] z-10 text-[white] flex! items-center! justify-center!",
				className
			)}
		>
			<span className="sr-only">Assign User</span>
			<Icon type={ICON_TYPES.Add} size={triggerIconSize} />
		</Button>
	);
};
