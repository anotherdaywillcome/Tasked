import { PRIORITY_BADGE_VARIANTS } from "@shared/ui";

import { TaskPriority } from "../model";

export const priorityLabelVariants: Record<TaskPriority | "Unknown", string> = {
	Low: PRIORITY_BADGE_VARIANTS.RichBlueGreen,
	Medium: PRIORITY_BADGE_VARIANTS.NewYorkGold,
	High: PRIORITY_BADGE_VARIANTS.Heliconia,
	Unknown: PRIORITY_BADGE_VARIANTS.SunsetBlue
};
