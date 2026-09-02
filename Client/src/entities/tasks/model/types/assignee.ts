import type { User } from "../../../users";

export type Assignee = Omit<User, "role">;
