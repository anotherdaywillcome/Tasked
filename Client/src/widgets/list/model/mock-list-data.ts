import { mockProjectTasks, toGroupedListData } from "@entities/tasks";

import type { GroupedListData } from "./types";

export const mockListData: GroupedListData = toGroupedListData(mockProjectTasks);
