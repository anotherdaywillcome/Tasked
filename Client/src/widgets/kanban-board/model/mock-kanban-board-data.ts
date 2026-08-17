import { mockProjectTasks, toKanbanBoardData } from "@entities/tasks";

import type { KanbanBoardData } from "./types";

export const mockKanbanBoardData: KanbanBoardData = toKanbanBoardData(mockProjectTasks);
