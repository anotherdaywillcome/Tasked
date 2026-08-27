"use client";

import { createContext } from "react";
import type { DropdownMenuSubContextValue } from "./types";

export const DropdownMenuSubContext = createContext<DropdownMenuSubContextValue | null>(null);
